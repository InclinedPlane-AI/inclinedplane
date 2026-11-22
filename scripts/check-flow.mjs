/* ============================================================================
 *  Page-flow check: no dead ends, no orphans.
 * ----------------------------------------------------------------------------
 *  Runs after scripts/prerender.mjs (npm run build) on the prerendered HTML in
 *  dist/. Fails the build when:
 *    - DEAD END: a page's <main> links to no other page on the site (the
 *      header and footer don't count: every page should offer a next step in
 *      its own content, e.g. the NextSteps block).
 *    - ORPHAN: an indexable page is linked from no other page at all
 *      (header, footer and content all count).
 *  noindex pages (legal, thank-you) are exempt from the orphan rule.
 *
 *  Added 2026-11-22 with the navigation restructure. Run alone:
 *    node scripts/check-flow.mjs
 * ========================================================================== */

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";

const DIST = "dist";
if (!existsSync(DIST)) {
  console.error("[flow] dist/ not found: run npm run build first.");
  process.exit(1);
}

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return htmlFiles(p);
    return f === "index.html" ? [p] : [];
  });
}

const routeOf = (file) => {
  const rel = relative(DIST, file).split(sep).slice(0, -1).join("/");
  return rel ? `/${rel}` : "/";
};

const norm = (href) => {
  const path = href.split("#")[0].split("?")[0].replace(/\/$/, "") || "/";
  return path;
};

const pages = new Map();
for (const file of htmlFiles(DIST)) {
  const html = readFileSync(file, "utf8");
  const route = routeOf(file);
  const body = html.slice(html.indexOf("<body"));
  const main = (body.match(/<main[\s\S]*?<\/main>/) || [""])[0];
  const links = (s) => new Set([...s.matchAll(/href="(\/[^"]*)"/g)].map((m) => norm(m[1])).filter((h) => h !== route && !/\.(pdf|png|jpg|svg|xml|txt|mp4)$/.test(h)));
  pages.set(route, {
    noindex: /<meta name="robots" content="[^"]*noindex/.test(html),
    mainLinks: links(main),
    allLinks: links(body),
    snapshotted: main.length > 0,
  });
}

const known = new Set(pages.keys());
const deadEnds = [];
const inbound = new Map([...known].map((r) => [r, 0]));

for (const [route, p] of pages) {
  if (!p.snapshotted) continue;
  const internalMain = [...p.mainLinks].filter((h) => known.has(h));
  if (internalMain.length === 0) deadEnds.push(route);
  for (const h of p.allLinks) if (inbound.has(h)) inbound.set(h, inbound.get(h) + 1);
}

const orphans = [...inbound].filter(([r, n]) => n === 0 && r !== "/" && !pages.get(r).noindex).map(([r]) => r);

console.log("");
console.log(`[flow] ${pages.size} pages checked: ${deadEnds.length} dead end(s), ${orphans.length} orphan(s).`);
for (const r of deadEnds) console.log(`[flow]   DEAD END  ${r}  (its content links to no other page)`);
for (const r of orphans) console.log(`[flow]   ORPHAN    ${r}  (no page links to it)`);
if (deadEnds.length || orphans.length) {
  console.log("[flow] Add a NextSteps block (src/components/site/NextSteps.tsx) or a link from a related page.");
  process.exit(1);
}
