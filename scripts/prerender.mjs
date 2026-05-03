/* ============================================================================
 *  GUARDRAIL — DO NOT REGENERATE THIS FILE
 * ----------------------------------------------------------------------------
 *  Post-build orchestrator. Runs in two passes:
 *
 *    PASS 1 — HEAD INJECTION
 *      For every route from getRoutes(), reads dist/index.html as a template
 *      and writes dist/<path>/index.html with route-specific <title>, meta,
 *      canonical, OG/Twitter tags, and JSON-LD. This is what gives crawlers
 *      route-specific metadata + structured data without JavaScript.
 *
 *    PASS 2 — BODY SNAPSHOT (Puppeteer)
 *      Boots a tiny static server on dist/, launches headless Chromium, and
 *      for each route waits for the splash screen to complete (signalled by
 *      html[data-app-ready="true"]) then captures document.body.innerHTML.
 *      The captured body is merged INTO the head-baked file from PASS 1 —
 *      <head> is preserved exactly as PASS 1 wrote it; only <body> is
 *      replaced. This is what gives crawlers the actual page prose.
 *
 *  THE PUPPETEER PASS IS NON-OPTIONAL. It is what makes the site readable to
 *  GPTBot, ClaudeBot, PerplexityBot, and any other LLM crawler that does not
 *  execute JavaScript. If the pass is removed, the site becomes invisible to
 *  those crawlers regardless of how good the head metadata is. The only
 *  acceptable replacement is full SSR/SSG (Vike, Next.js) that puts body
 *  content into the static HTML by another mechanism.
 *
 *  If Lovable / Cursor / any AI assistant proposes "simplifying" by dropping
 *  the snapshot pass: REJECT.
 *
 *  Pair file: scripts/seo-config.mjs (route data source)
 *  Pair file: scripts/snapshot.mjs (Puppeteer body capture)
 *  Pair file: scripts/static-server.mjs (serves dist/ to Puppeteer)
 *  Pair file: scripts/summary.mjs (final report)
 *  Pair file: index.html (template with SEO_HEAD placeholder)
 *  Pair file: src/App.tsx (sets html[data-app-ready="true"])
 *
 *  Last reviewed: 2026-05-03
 * ========================================================================== */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { getRoutes, SITE_URL, SITE_NAME } from "./seo-config.mjs";
import { startServer } from "./static-server.mjs";
import { runSnapshot } from "./snapshot.mjs";
import { printSummary } from "./summary.mjs";
import { writeSitemap } from "./sitemap.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");
const distDir = resolve(repoRoot, "dist");

const PLACEHOLDER = "<!--SEO_HEAD-->";
const HEAD_CLOSE_RE = /<\/head>/i;
const BODY_OPEN_RE = /<body[^>]*>/i;
const BODY_CLOSE_RE = /<\/body>/i;

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeJsonLd(s) {
  return s.replace(/</g, "\\u003c");
}

function renderHead(route) {
  const canonical = `${SITE_URL}${route.path}`;
  const robots = route.noIndex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  const lines = [
    `<title>${escapeHtml(route.fullTitle)}</title>`,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
    `<meta name="author" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="${route.ogType}" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:title" content="${escapeHtml(route.fullTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    `<meta property="og:image" content="${route.ogImage}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(route.fullTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    `<meta name="twitter:image" content="${route.ogImage}" />`,
  ];

  if (route.article) {
    lines.push(
      `<meta property="article:published_time" content="${escapeHtml(route.article.publishedTime)}" />`
    );
    for (const [i, tag] of route.article.tags.entries()) {
      lines.push(
        `<meta property="article:tag:${i}" content="${escapeHtml(tag)}" />`
      );
    }
  }

  const ld = JSON.stringify(route.jsonLd);
  lines.push(
    `<script type="application/ld+json">${escapeJsonLd(ld)}</script>`
  );

  return lines.join("\n    ");
}

function renderNoscriptBlock(route) {
  // Plain-text fallback for crawlers that ignore everything else. Keep
  // markup minimal — title in <h1>, summary in <p>, link back to home.
  const summary = route.noscriptSummary || `${route.fullTitle}. ${route.description}`;
  return [
    `<noscript>`,
    `  <article>`,
    `    <h1>${escapeHtml(route.fullTitle)}</h1>`,
    `    <p>${escapeHtml(summary)}</p>`,
    `    <p><a href="${SITE_URL}">${escapeHtml(SITE_NAME)}</a></p>`,
    `  </article>`,
    `</noscript>`,
  ].join("\n");
}

function outPathFor(routePath) {
  if (routePath === "/") return join(distDir, "index.html");
  return join(distDir, routePath.replace(/^\//, ""), "index.html");
}

function injectHead(template, route) {
  const head = renderHead(route);
  return template.replace(PLACEHOLDER, () => head);
}

function injectBody(headBakedHtml, capturedBody, noscriptBlock) {
  // Replace the entire <body>...</body> contents while preserving the
  // <body> tag itself. We anchor the search AFTER </head> so literal
  // "<body>" strings appearing inside the HTML comment at the top of the
  // template do not get matched as the real body open tag.
  const headCloseMatch = headBakedHtml.match(HEAD_CLOSE_RE);
  if (!headCloseMatch) {
    throw new Error("[prerender] Could not locate </head> for body merge");
  }
  const searchFrom = headCloseMatch.index + headCloseMatch[0].length;
  const tail = headBakedHtml.slice(searchFrom);
  const open = tail.match(BODY_OPEN_RE);
  const close = tail.match(BODY_CLOSE_RE);
  if (!open || !close) {
    throw new Error("[prerender] Could not locate <body> tags for merge");
  }
  const beforeEnd = searchFrom + open.index + open[0].length;
  const afterStart = searchFrom + close.index;
  const before = headBakedHtml.slice(0, beforeEnd);
  const after = headBakedHtml.slice(afterStart);
  return `${before}\n    ${noscriptBlock}\n    ${capturedBody}\n  ${after}`;
}

async function main() {
  // ---------------------------------------------------------------------
  // PASS 1 — head injection
  // ---------------------------------------------------------------------
  const templatePath = join(distDir, "index.html");
  if (!existsSync(templatePath)) {
    console.error(
      `[prerender] dist/index.html not found. Run \`vite build\` first.`
    );
    process.exit(1);
  }
  const template = readFileSync(templatePath, "utf8");
  if (!template.includes(PLACEHOLDER)) {
    console.error(
      `[prerender] ${PLACEHOLDER} not found in dist/index.html — check index.html source.`
    );
    process.exit(1);
  }

  const ogPath = resolve(repoRoot, "public", "og-image.png");
  if (!existsSync(ogPath)) {
    console.warn(
      `[prerender] WARNING: public/og-image.png missing. Falling back to /favicon.png for social previews.`
    );
  }

  const routes = getRoutes();
  console.log(`[prerender] HEAD PASS — ${routes.length} routes`);
  for (const route of routes) {
    const html = injectHead(template, route);
    const outPath = outPathFor(route.path);
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html, "utf8");
  }
  console.log(`[prerender] HEAD PASS done — wrote ${routes.length} files\n`);

  // ---------------------------------------------------------------------
  // PASS 2 — Puppeteer body snapshot
  // ---------------------------------------------------------------------
  let server, results;
  try {
    server = await startServer({ distDir });
    console.log(`[prerender] static server on ${server.url}`);

    results = await runSnapshot(routes, { baseUrl: server.url });
  } catch (err) {
    console.error(`[prerender] BODY PASS aborted: ${err.message}`);
    console.error(
      `[prerender] head-only files remain valid; crawlers will see metadata + JSON-LD but not body prose.`
    );
    if (server) await server.close().catch(() => {});
    process.exit(1);
  }

  // Merge captured bodies into the head-baked files.
  const routeByPath = new Map(routes.map((r) => [r.path, r]));
  let merged = 0;
  for (const r of results) {
    if (!r.bodyHtml) continue; // failed snapshot — keep head-only file
    const route = routeByPath.get(r.path);
    if (!route) continue;
    const outPath = outPathFor(r.path);
    const headBaked = readFileSync(outPath, "utf8");
    const noscriptBlock = renderNoscriptBlock(route);
    const final = injectBody(headBaked, r.bodyHtml, noscriptBlock);
    writeFileSync(outPath, final, "utf8");
    merged++;
  }

  await server.close().catch(() => {});
  console.log(
    `[prerender] BODY PASS done — merged ${merged}/${results.length} routes`
  );

  // ---------------------------------------------------------------------
  // PASS 3 — sitemap
  // ---------------------------------------------------------------------
  writeSitemap(routes, { distDir });

  printSummary(results);

  // Exit 0 even on warns/failures so a single bad route doesn't fail the
  // build — the summary is the source of truth for review.
}

main().catch((err) => {
  console.error("[prerender] fatal:", err);
  process.exit(1);
});
