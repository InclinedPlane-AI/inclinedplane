# vercel.json — guardrail

**Last reviewed: 2026-05-03**

`vercel.json` configures how Vercel serves the prerendered output of this site.
It is intentionally minimal. **Do not add fields casually** — the build is
schema-validated at deploy time and unknown properties (including comment-style
`_guardrail` keys) cause the deploy to fail.

## What each field does

- `buildCommand: "npm run build"` — runs the full pipeline (vite build +
  Playwright body snapshot + sitemap + RSS). Used by `vercel build` in the
  GitHub Actions workflow (`.github/workflows/deploy.yml`). On Vercel's own
  build container this command will FAIL because Vercel cannot run a
  headless browser (missing libnspr4 etc.). For that reason Vercel's git
  auto-deploy must be DISABLED for this project — see the workflow file for
  the dashboard path. The CI builds the artifact; Vercel only hosts.
- `outputDirectory: "dist"` — tells `vercel build` where the static
  artifact lives. Required for `vercel deploy --prebuilt`.
- `cleanUrls: true` — Vercel strips `.html` from URLs (e.g. `/services`
  serves `/services/index.html`).
- `trailingSlash: false` — `/services/` redirects to `/services`. Keeps
  canonical URLs consistent with `<link rel="canonical">` in our prerendered
  HTML, which never has trailing slashes.
- `rewrites: [/((?!api/).*) → /index.html]` — SPA fallback for any URL that
  does not match a real file in `dist/`. Vercel's filesystem matching takes
  precedence, so prerendered routes (`dist/services/index.html`,
  `dist/blog/<slug>/index.html`, etc.) are served directly; only unknown
  paths fall through to `/index.html` where the React SPA's `NotFound` route
  handles them. The negative lookahead `(?!api/)` reserves `/api/*` for any
  future Vercel Functions.

## What you must not do

- **Do not remove the rewrite.** Without it, deep-linking to any unknown
  route (typos, old URLs, etc.) returns a hard 404 instead of the SPA's
  styled 404 page.
- **Do not add a property that is not in Vercel's schema.** The deploy fails
  with `should NOT have additional property "X"`. Comment-style fields like
  `_guardrail`, `_note`, `_description` are not allowed.
- **Do not set `cleanUrls: false`** — it would break the canonical URLs
  baked into our `<link rel="canonical">` tags by `scripts/prerender.mjs`.

## If you ever need inline comments

Vercel supports `vercel.ts` (TypeScript config with `@vercel/config`) which
accepts JS-style comments and dynamic logic. Migrating is a one-shot change;
keep parity with the fields above.
