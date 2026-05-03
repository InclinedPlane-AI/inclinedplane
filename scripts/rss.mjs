/* ============================================================================
 *  GUARDRAIL — DO NOT REGENERATE THIS FILE
 * ----------------------------------------------------------------------------
 *  Generates dist/rss.xml (RSS 2.0) for the blog. Driven by the same blog
 *  metadata that scripts/seo-config.mjs parses out of src/data/blogPosts.ts —
 *  so the feed never drifts from the actual content.
 *
 *  Why this matters: LLM training crawlers, content aggregators, journalists,
 *  and Feedly-class readers all auto-discover via RSS. The link is exposed
 *  via <link rel="alternate" type="application/rss+xml"> in index.html.
 *
 *  If Lovable / Cursor / any AI assistant proposes deleting this or
 *  hand-maintaining a parallel feed file: REJECT.
 *
 *  Pair file: scripts/seo-config.mjs (route source — exposes blog routes
 *             with article.publishedTime + tags via getRoutes())
 *  Pair file: scripts/prerender.mjs (orchestrator that calls writeRss)
 *
 *  Last reviewed: 2026-05-03
 * ========================================================================== */

import { writeFileSync } from "node:fs";
import { join } from "node:path";

import { SITE_URL, SITE_NAME } from "./seo-config.mjs";

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(input) {
  if (!input) return new Date().toUTCString();
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return new Date().toUTCString();
  // The source dates are date-only strings like "February 19, 2026". Without
  // a time-of-day, they parse as local midnight, which can land on the
  // previous calendar day in UTC for users east of UTC. Pin to noon UTC of
  // the local-component date so the RFC 822 day matches the source date
  // regardless of the build host's timezone.
  const noonUtc = new Date(
    Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0)
  );
  return noonUtc.toUTCString();
}

export function buildRssXml(routes, { buildDate = new Date() } = {}) {
  // Blog post routes are the ones with og:type=article AND a path under /blog/.
  const posts = routes.filter(
    (r) => r.path.startsWith("/blog/") && r.article?.publishedTime
  );

  // Newest first.
  posts.sort((a, b) => {
    const da = new Date(a.article.publishedTime).getTime();
    const db = new Date(b.article.publishedTime).getTime();
    return db - da;
  });

  const items = posts.map((p) => {
    const url = `${SITE_URL}${p.path}`;
    const tagBlock = (p.article.tags || [])
      .map((t) => `      <category>${escapeXml(t)}</category>`)
      .join("\n");
    return [
      "    <item>",
      `      <title>${escapeXml(p.fullTitle.replace(` | ${SITE_NAME}`, ""))}</title>`,
      `      <link>${url}</link>`,
      `      <guid isPermaLink="true">${url}</guid>`,
      `      <pubDate>${toRfc822(p.article.publishedTime)}</pubDate>`,
      `      <description>${escapeXml(p.description)}</description>`,
      tagBlock,
      "    </item>",
    ]
      .filter(Boolean)
      .join("\n");
  });

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">`,
    `  <channel>`,
    `    <title>${escapeXml(SITE_NAME)} — Blog</title>`,
    `    <link>${SITE_URL}/blog</link>`,
    `    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />`,
    `    <description>Insights on data engineering, AI automation, DataOps, business intelligence, and building modern data platforms. By the Inclined Plane team.</description>`,
    `    <language>en-us</language>`,
    `    <lastBuildDate>${buildDate.toUTCString()}</lastBuildDate>`,
    ...items,
    `  </channel>`,
    `</rss>`,
    "",
  ].join("\n");
}

export function writeRss(routes, { distDir, log = console.log } = {}) {
  const xml = buildRssXml(routes);
  const outPath = join(distDir, "rss.xml");
  writeFileSync(outPath, xml, "utf8");
  const count = routes.filter(
    (r) => r.path.startsWith("/blog/") && r.article?.publishedTime
  ).length;
  log(`[rss] wrote ${outPath} (${count} blog posts)`);
}
