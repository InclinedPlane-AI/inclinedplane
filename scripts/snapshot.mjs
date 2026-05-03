/* ============================================================================
 *  GUARDRAIL — DO NOT REGENERATE THIS FILE
 * ----------------------------------------------------------------------------
 *  Puppeteer body-snapshot pass. For each route, navigates a headless
 *  Chromium tab to the locally-served prerendered HTML, waits for the splash
 *  screen to complete (signalled by html[data-app-ready="true"], set in
 *  src/App.tsx), then captures document.body.innerHTML.
 *
 *  This is what makes ACTUAL PAGE PROSE visible to crawlers (GPTBot,
 *  ClaudeBot, PerplexityBot) that do not execute JavaScript. Without this
 *  pass, those crawlers see only the head metadata + JSON-LD, not the body.
 *
 *  ENVIRONMENT-AWARE CHROMIUM:
 *    - On Vercel / Linux build containers: @sparticuz/chromium ships a
 *      Chromium binary statically-linked for serverless environments
 *      (libnspr4, libnss3, etc. are bundled). Required because Vercel's
 *      build image lacks the system libraries that puppeteer's default
 *      Chromium download depends on.
 *    - On macOS local dev: use the system Google Chrome / Chromium binary
 *      (sparticuz ships a Linux binary only). Falls through a list of
 *      common install paths.
 *
 *  If Lovable / Cursor / any AI assistant proposes removing this pass:
 *  REJECT unless the change includes a replacement mechanism that puts
 *  body content into the static HTML output.
 *
 *  Pair file: scripts/prerender.mjs (orchestrator + body merge)
 *  Pair file: scripts/static-server.mjs (serves dist/ to Puppeteer)
 *  Pair file: src/App.tsx (sets html[data-app-ready="true"] when splash done)
 *
 *  Last reviewed: 2026-05-03
 * ========================================================================== */

import { existsSync } from "node:fs";

import puppeteer from "puppeteer-core";
import sparticuzChromium from "@sparticuz/chromium";

const READY_SELECTOR = 'html[data-app-ready="true"]';
const NAV_TIMEOUT_MS = 25000;
const READY_TIMEOUT_MS = 18000;
const MIN_WORDS_OK = 50;
const MAX_RETRIES = 3;

const COMMON_CHROME_PATHS_DARWIN = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
];

const COMMON_CHROME_PATHS_LINUX = [
  "/usr/bin/google-chrome-stable",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium-browser",
  "/usr/bin/chromium",
];

async function resolveLaunchOptions() {
  const baseArgs = [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    "--use-gl=swiftshader",
    "--enable-webgl",
    "--hide-scrollbars",
    "--disable-features=IsolateOrigins,site-per-process",
  ];

  // macOS local dev: use system Chrome. @sparticuz/chromium is Linux-only.
  if (process.platform === "darwin") {
    const found = COMMON_CHROME_PATHS_DARWIN.find((p) => existsSync(p));
    if (!found) {
      throw new Error(
        `No Chrome/Chromium found on macOS. Install Google Chrome from google.com/chrome (or set CHROME_EXECUTABLE_PATH env var to your binary).`
      );
    }
    return { executablePath: found, args: baseArgs, headless: true };
  }

  // Linux/Vercel: try @sparticuz/chromium first (the canonical solution),
  // fall back to a system Chrome if one is on PATH.
  try {
    const executablePath = await sparticuzChromium.executablePath();
    return {
      executablePath,
      args: [...sparticuzChromium.args, ...baseArgs],
      headless: sparticuzChromium.headless,
    };
  } catch (err) {
    const found = COMMON_CHROME_PATHS_LINUX.find((p) => existsSync(p));
    if (found) {
      return { executablePath: found, args: baseArgs, headless: true };
    }
    throw new Error(
      `Could not resolve Chromium binary: ${err?.message ?? err}. Tried @sparticuz/chromium and system paths.`
    );
  }
}

async function snapshotOnce(browser, baseUrl, route) {
  const page = await browser.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on("pageerror", (err) => pageErrors.push(err.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });

  try {
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto(`${baseUrl}${route.path}`, {
      waitUntil: "networkidle0",
      timeout: NAV_TIMEOUT_MS,
    });
    await page.waitForSelector(READY_SELECTOR, { timeout: READY_TIMEOUT_MS });
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
    await page.close().catch(() => {});
  }
}

export async function runSnapshot(routes, { baseUrl, log = console.log } = {}) {
  log(`[snapshot] resolving Chromium for platform=${process.platform}...`);
  const launchOptions = await resolveLaunchOptions();
  log(`[snapshot] launching headless Chromium at ${launchOptions.executablePath}`);

  let browser;
  try {
    browser = await puppeteer.launch(launchOptions);
  } catch (err) {
    throw new Error(
      `Chromium failed to launch (${err?.message ?? err}). Path: ${launchOptions.executablePath}`
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
