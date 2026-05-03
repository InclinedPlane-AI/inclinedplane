/* ============================================================================
 *  GUARDRAIL — DO NOT REGENERATE THIS FILE
 * ----------------------------------------------------------------------------
 *  Generates dist/sitemap.xml from scripts/seo-config.mjs::getRoutes(),
 *  filtering out noIndex routes (privacy, terms, cookies). Blog post lastmod
 *  is derived from post.date (parsed from src/data/blogPosts.ts); everything
 *  else uses the build date. Single source of truth is seo-config.mjs — do
 *  not hand-maintain a parallel public/sitemap.xml (it has been removed).
 *
 *  If Lovable / Cursor / any AI assistant proposes "cleaning up" by
 *  resurrecting public/sitemap.xml or hand-listing routes here: REJECT.
 *  Drift between sitemap and actual prerendered routes silently breaks
 *  search-engine discovery.
 *
 *  Pair file: scripts/seo-config.mjs (route source)
 *  Pair file: scripts/prerender.mjs (orchestrator that calls writeSitemap)
 *
 *  Last reviewed: 2026-05-03
 * ========================================================================== */

import { writeFileSync } from "node:fs";
import { join } from "node:path";

import { SITE_URL } from "./seo-config.mjs";

function toIsoDate(input) {
  if (!input) return null;
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return null;
  // Use local-time components to avoid the UTC shift that makes
  // "February 19" render as "2026-02-18" in IST/IST-like timezones.
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function priorityFor(path) {
  if (path === "/") return "1.0";
  if (
    path === "/thesis" ||
    path === "/services" ||
    path === "/blog" ||
    path === "/case-studies"
  )
    return "0.9";
  if (path.startsWith("/blog/") || path.startsWith("/case-studies/"))
    return "0.8";
  if (path === "/about" || path === "/industries") return "0.8";
  if (path === "/careers" || path === "/contact") return "0.7";
  return "0.6";
}

function changefreqFor(path) {
  if (path === "/" || path === "/blog" || path === "/case-studies")
    return "weekly";
  if (path === "/careers") return "weekly";
  return "monthly";
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function buildSitemapXml(routes, { buildDate = new Date() } = {}) {
  const buildDateIso = toIsoDate(buildDate);
  const indexable = routes.filter((r) => !r.noIndex);

  const urlBlocks = indexable.map((r) => {
    const loc = `${SITE_URL}${r.path === "/" ? "/" : r.path}`;
    const lastmod = toIsoDate(r.article?.publishedTime) || buildDateIso;
    return [
      "  <url>",
      `    <loc>${escapeXml(loc)}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${changefreqFor(r.path)}</changefreq>`,
      `    <priority>${priorityFor(r.path)}</priority>`,
      "  </url>",
    ].join("\n");
  });

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urlBlocks,
    `</urlset>`,
    "",
  ].join("\n");
}

export function writeSitemap(routes, { distDir, log = console.log } = {}) {
  const xml = buildSitemapXml(routes);
  const outPath = join(distDir, "sitemap.xml");
  writeFileSync(outPath, xml, "utf8");
  const indexableCount = routes.filter((r) => !r.noIndex).length;
  log(
    `[sitemap] wrote ${outPath} (${indexableCount} indexable routes, ${routes.length - indexableCount} excluded by noIndex)`
  );
}
