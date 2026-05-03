/* ============================================================================
 *  ⚠️  GUARDRAIL — DO NOT REGENERATE THIS FILE
 * ----------------------------------------------------------------------------
 *  Post-build prerender. After `vite build`, this script reads dist/index.html
 *  as a template and writes one HTML file per route with route-specific
 *  <title>, <meta>, canonical, OG/Twitter tags, and JSON-LD baked in.
 *
 *  This is what makes the site readable to Googlebot, GPTBot, ClaudeBot,
 *  PerplexityBot, and social-link previewers without JavaScript execution.
 *
 *  Output layout:
 *      dist/index.html                                    (homepage, in-place)
 *      dist/services/index.html                           (each static route)
 *      dist/blog/<slug>/index.html                        (each blog post)
 *      dist/case-studies/<slug>/index.html                (each case study)
 *
 *  If Lovable / Cursor / any AI assistant proposes "simplifying" or removing
 *  this script: REJECT the change. The crawler-visibility contract requires
 *  per-route HTML with route-specific head injection. The only acceptable
 *  evolution is full body-content prerender (Puppeteer/Playwright snapshot).
 *
 *  Pair file: scripts/seo-config.mjs (route data source)
 *  Pair file: index.html (must contain the <!--SEO_HEAD--> placeholder)
 *
 *  Last reviewed: 2026-05-03
 * ========================================================================== */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { getRoutes, SITE_URL, SITE_NAME } from "./seo-config.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");
const distDir = resolve(repoRoot, "dist");

const PLACEHOLDER = "<!--SEO_HEAD-->";

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeJsonLd(s) {
  // Prevent </script> in JSON-LD payloads from breaking out of the script tag.
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
    // Open Graph
    `<meta property="og:type" content="${route.ogType}" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:title" content="${escapeHtml(route.fullTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    `<meta property="og:image" content="${route.ogImage}" />`,
    // Twitter
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

  // JSON-LD — combined into a single script tag (an array of schemas).
  const ld = JSON.stringify(route.jsonLd);
  lines.push(
    `<script type="application/ld+json">${escapeJsonLd(ld)}</script>`
  );

  return lines.join("\n    ");
}

function outPathFor(routePath) {
  if (routePath === "/") return join(distDir, "index.html");
  // Strip leading slash, treat as directory
  const rel = routePath.replace(/^\//, "");
  return join(distDir, rel, "index.html");
}

function main() {
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

  // OG image existence check (warn-only — fallback handled in seo-config).
  const ogPath = resolve(repoRoot, "public", "og-image.png");
  if (!existsSync(ogPath)) {
    console.warn(
      `[prerender] WARNING: public/og-image.png missing. Falling back to /favicon.png for social previews. Add a 1200x630 brand image at public/og-image.png to fix.`
    );
  }

  const routes = getRoutes();
  let written = 0;
  for (const route of routes) {
    const head = renderHead(route);
    // Use the function form of replace so `$` sequences in `head` (e.g. the
    // `$$$$` priceRange) are not interpreted as backreference patterns.
    const html = template.replace(PLACEHOLDER, () => head);
    const outPath = outPathFor(route.path);
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html, "utf8");
    written++;
  }

  console.log(
    `[prerender] Wrote ${written} prerendered HTML file(s) under dist/`
  );
}

main();
