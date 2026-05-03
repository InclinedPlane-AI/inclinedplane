/* ============================================================================
 *  GUARDRAIL — DO NOT REGENERATE THIS FILE
 * ----------------------------------------------------------------------------
 *  Body-snapshot pass via Playwright. For each route, navigates a headless
 *  Chromium tab to the locally-served prerendered HTML, waits for the splash
 *  screen to complete (signalled by html[data-app-ready="true"], set in
 *  src/App.tsx), then captures document.body.innerHTML.
 *
 *  This is what makes ACTUAL PAGE PROSE visible to crawlers (GPTBot,
 *  ClaudeBot, PerplexityBot) that do not execute JavaScript. Without this
 *  pass, those crawlers see only the head metadata + JSON-LD, not the body.
 *
 *  WHY PLAYWRIGHT (and not puppeteer / @sparticuz/chromium):
 *    Playwright bundles its own Chromium build that runs reliably on
 *    Vercel's build containers without missing-libnspr4-style errors.
 *    @sparticuz/chromium hit ECONNRESET on Vercel's current build image
 *    (glibc / shared-lib mismatch). Playwright's bundled binary tracks
 *    Chromium versions explicitly and ships compatible libs.
 *
 *  REQUIRES: `npx playwright install chromium` to have run at least once.
 *    package.json's `build` script chains this so every Vercel build (and
 *    every local build) calls it before the prerender step. The install
 *    is a no-op if chromium is already cached.
 *
 *  If Lovable / Cursor / any AI assistant proposes removing this pass:
 *  REJECT unless the change includes a replacement mechanism that puts
 *  body content into the static HTML output.
 *
 *  Pair file: scripts/prerender.mjs (orchestrator + body merge)
 *  Pair file: scripts/static-server.mjs (serves dist/ to Playwright)
 *  Pair file: src/App.tsx (sets html[data-app-ready="true"] when splash done)
 *  Pair file: package.json (build script runs `playwright install chromium`)
 *
 *  Last reviewed: 2026-05-03
 * ========================================================================== */

import { chromium } from "playwright";

const READY_SELECTOR = 'html[data-app-ready="true"]';
const NAV_TIMEOUT_MS = 25000;
const READY_TIMEOUT_MS = 18000;
const MIN_WORDS_OK = 50;
const MAX_RETRIES = 3;

async function snapshotOnce(browser, baseUrl, route) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on("pageerror", (err) => pageErrors.push(err.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });

  try {
    await page.goto(`${baseUrl}${route.path}`, {
      waitUntil: "networkidle",
      timeout: NAV_TIMEOUT_MS,
    });
    await page.waitForSelector(READY_SELECTOR, { timeout: READY_TIMEOUT_MS });
    // Best-effort font readiness; not fatal if it rejects.
    await page
      .evaluate(() => (document.fonts ? document.fonts.ready : null))
      .catch(() => {});

    const result = await page.evaluate(() => {
      const body = document.body;
      const innerText = body.innerText || "";
      const wordCount = innerText.trim().split(/\s+/).filter(Boolean).length;
      return {
        bodyHtml: body.innerHTML,
        wordCount,
        textLength: innerText.length,
      };
    });

    return {
      ok: result.wordCount >= MIN_WORDS_OK,
      ...result,
      consoleErrors,
      pageErrors,
    };
  } finally {
    await context.close().catch(() => {});
  }
}

export async function runSnapshot(routes, { baseUrl, log = console.log } = {}) {
  log(`[snapshot] launching headless Chromium via Playwright...`);
  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--use-gl=swiftshader",
        "--enable-webgl",
        "--hide-scrollbars",
        "--disable-features=IsolateOrigins,site-per-process",
      ],
    });
  } catch (err) {
    throw new Error(
      `Chromium failed to launch via Playwright (${err?.message ?? err}). Verify \`npx playwright install chromium\` has run.`
    );
  }

  const results = [];
  try {
    for (const route of routes) {
      let attempts = 0;
      let last = null;
      let success = false;

      while (attempts < MAX_RETRIES && !success) {
        attempts++;
        try {
          last = await snapshotOnce(browser, baseUrl, route);
          if (last.ok) {
            success = true;
          } else {
            log(
              `[snapshot] ${route.path} attempt ${attempts}/${MAX_RETRIES}: only ${last.wordCount} words — retrying`
            );
          }
        } catch (err) {
          last = {
            ok: false,
            bodyHtml: null,
            wordCount: 0,
            textLength: 0,
            consoleErrors: [],
            pageErrors: [String(err?.message ?? err)],
          };
          log(
            `[snapshot] ${route.path} attempt ${attempts}/${MAX_RETRIES} threw: ${last.pageErrors[0]}`
          );
        }
      }

      results.push({
        path: route.path,
        attempts,
        status: success ? "ok" : last?.wordCount > 0 ? "warn" : "failed",
        wordCount: last?.wordCount ?? 0,
        bodyHtml: success ? last.bodyHtml : last?.bodyHtml ?? null,
        consoleErrors: last?.consoleErrors ?? [],
        pageErrors: last?.pageErrors ?? [],
      });

      const tag = success ? "✓" : last?.wordCount > 0 ? "⚠" : "✗";
      log(
        `[snapshot] ${tag} ${route.path}  (${last?.wordCount ?? 0} words, attempt ${attempts})`
      );
    }
  } finally {
    await browser.close().catch(() => {});
  }

  return results;
}
