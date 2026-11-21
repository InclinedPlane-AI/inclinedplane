// =============================================================================
// GUARDRAIL — packages dist/ into a Vercel Build Output API v3 artifact
// Added: 2026-11-21 (revamp)
// -----------------------------------------------------------------------------
// We never let Vercel build this site (its container can't run Playwright, see
// CLAUDE.md). CI builds dist/ and then uploads it with
// `vercel deploy --prebuilt`. That needs .vercel/output/{static,config.json}.
//
// This script writes that artifact and carries the routing rules from
// vercel.json into config.json, because `--prebuilt` IGNORES vercel.json:
//   - vercel.json "redirects"  -> 301/308 routes (before the filesystem)
//   - vercel.json "headers"    -> header routes
//   - SPA fallback rewrite     -> /index.html
//
// Usage:
//   node scripts/vercel-output.mjs              # production artifact
//   node scripts/vercel-output.mjs --noindex    # staging / previews: adds
//                                               # X-Robots-Tag: noindex
//
// Used by: .github/workflows/deploy-staging.yml (and local manual deploys).
// Production's deploy.yml still writes config.json inline. Switch it to this
// script when `revamp` merges to main (tracked in docs/revamp/PROGRESS.md),
// otherwise the redirects below won't apply in production.
// =============================================================================

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const noindex = process.argv.includes("--noindex");
const dist = path.join(root, "dist");
const out = path.join(root, ".vercel", "output");

if (!fs.existsSync(path.join(dist, "index.html"))) {
  console.error("vercel-output: dist/index.html missing. Run `npm run build` first.");
  process.exit(1);
}

const vercelJson = JSON.parse(fs.readFileSync(path.join(root, "vercel.json"), "utf8"));

// path-to-regexp-lite: supports literal paths and a trailing ":slug*" / ":slug"
function toRegex(source) {
  const escaped = source
    .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\/:([a-zA-Z]+)\*/g, "(?:/(?<$1>.*))?")
    .replace(/:([a-zA-Z]+)/g, "(?<$1>[^/]+)");
  return `^${escaped}/?$`;
}
function toDest(destination) {
  return destination.replace(/:([a-zA-Z]+)\*?/g, "$$$1");
}

const routes = [];

if (noindex) {
  routes.push({
    src: "/(.*)",
    headers: { "X-Robots-Tag": "noindex, nofollow" },
    continue: true,
  });
}

for (const h of vercelJson.headers ?? []) {
  const headers = Object.fromEntries(h.headers.map((x) => [x.key, x.value]));
  routes.push({ src: toRegex(h.source), headers, continue: true });
}

for (const r of vercelJson.redirects ?? []) {
  routes.push({
    src: toRegex(r.source),
    status: r.permanent === false ? 307 : 308,
    headers: { Location: toDest(r.destination) },
  });
}

routes.push({ handle: "filesystem" });
routes.push({ src: "/((?!api/).*)", dest: "/index.html" });

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, "static"), { recursive: true });
fs.cpSync(dist, path.join(out, "static"), { recursive: true });
fs.writeFileSync(
  path.join(out, "config.json"),
  JSON.stringify({ version: 3, cleanUrls: true, trailingSlash: false, routes }, null, 2),
);

console.log(
  `vercel-output: wrote .vercel/output (${routes.length} routes${noindex ? ", noindex" : ""})`,
);
