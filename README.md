# Inclined Plane — Marketing Site

Production: **https://www.inclinedplane.com**

The website for **Inclined Plane**, an AI-native data engineering consultancy.
Built as a fully prerendered single-page React application so that humans get
a fast, animated experience and crawlers (Google, Bing, GPTBot, ClaudeBot,
PerplexityBot, social-link previewers) get full HTML content without
executing JavaScript.

This is a content site, not a product. The conversion goal is "book a
discovery call" via `/contact`. Audience: enterprise prospects and investors.

---

## Tech stack

- **Build**: Vite 5 + React 18 + TypeScript + SWC
- **Styling**: Tailwind CSS, shadcn/ui (Radix primitives), custom CSS variables
- **Routing**: react-router-dom 6 (`BrowserRouter`, client-side SPA routing)
- **Animation / 3D**: framer-motion, three.js, ogl
- **Content**: handwritten TS modules under `src/data/` (no CMS)
- **Hosting**: Vercel (host only — see "Deployment" below)
- **CI / build runner**: GitHub Actions
- **Headless browser** (build-time prerender): Playwright + bundled Chromium
- **Analytics**: `@vercel/analytics`, `@vercel/speed-insights`
- **Tests**: Vitest + Testing Library (one example test today)

---

## Architecture at a glance

The site is a Vite SPA with a build-time prerender layer wrapped around it.

```
                    ┌────────────────────────────────────────┐
                    │         GitHub Actions runner          │
                    │  (Ubuntu, sudo + apt access)           │
                    │                                        │
   git push  ─────► │  apt install Chromium libs             │
   to main          │  npm ci                                │
                    │  npx playwright install chromium       │
                    │  npm run build                         │
                    │    ├── vite build                      │
                    │    └── node scripts/prerender.mjs      │
                    │          ├── HEAD PASS  (per-route SEO)│
                    │          ├── BODY PASS  (Playwright)   │
                    │          └── SITEMAP + RSS             │
                    │  vercel deploy --prebuilt --prod ──────┼──► Vercel CDN
                    └────────────────────────────────────────┘
```

**Vercel does not build this site.** Vercel's build container can't run
headless Chromium (missing `libnspr4` / `libnss3` / `libgbm1`, no apt
access). Vercel's git auto-deploy is disabled via Project Settings → Git →
Ignored Build Step (`exit 0`); GitHub Actions does the build on a real
Ubuntu runner and pushes the prebuilt artifact to Vercel.

### What "prerender" means here

The Vite output is a normal SPA: an `index.html` shell plus JS bundles.
After `vite build` finishes, `scripts/prerender.mjs` does three passes:

1. **HEAD PASS** — for each of 28 routes (12 static + 14 case study
   detail pages + 2 blog posts), reads `dist/index.html` as a template,
   replaces a `<!--SEO_HEAD-->` placeholder with route-specific
   `<title>`, `<meta>`, canonical, OG/Twitter tags, and JSON-LD
   structured data, and writes `dist/<route>/index.html`.
2. **BODY PASS** — boots a tiny static server on a free port, launches
   headless Chromium via Playwright, and for each route waits for the
   splash screen to complete (signalled by `html[data-app-ready="true"]`)
   then captures `document.body.innerHTML`. The captured body is merged
   into the head-baked file from PASS 1; the `<head>` is preserved
   verbatim and the `<body>` open tag is stamped with
   `data-prerendered="true"`.
3. **SITEMAP + RSS** — generates `dist/sitemap.xml` (25 indexable URLs;
   noIndex routes excluded) and `dist/rss.xml` (blog posts, RFC 822
   dates) from the same `getRoutes()` source as the HEAD pass.

The `data-prerendered="true"` marker on `<body>` lets `src/main.tsx` and
`src/App.tsx` skip the splash screen entirely on production pages — the
splash existed to mask the JS-load gap on a fresh SPA, but with
prerendered HTML there is no gap to mask. Bots screenshotting at 2-5s
(Google Rich Results, LinkedIn Post Inspector, Lighthouse) catch real
content instead of the splash mid-animation.

### Discovery surface for crawlers

- `public/robots.txt` — explicit `Allow: /` for 30+ named crawlers
  (Googlebot, Bingbot, GPTBot, ClaudeBot, PerplexityBot, CCBot,
  Google-Extended, Bytespider, Applebot, etc.) plus `User-agent: *`
- `public/llms.txt` — markdown summary for AI/LLM crawlers (the
  Anthropic-pioneered standard adopted by Mintlify, Vercel docs, etc.)
- `dist/sitemap.xml` — auto-generated, 25 indexable URLs
- `dist/rss.xml` — auto-generated blog feed, linked from `<head>` via
  `<link rel="alternate" type="application/rss+xml">`
- Per-page JSON-LD with Organization + WebSite + BreadcrumbList plus
  page-specific schemas (`ProfessionalService` for `/`, `Service` for
  `/services`, `BlogPosting` with `Person` author for blog posts,
  `CaseStudy` for case study details, `ContactPage` for `/contact`)

---

## Project structure

```
inclinedplane/
├── .github/
│   └── workflows/
│       └── deploy.yml          GitHub Actions: build + Vercel deploy
├── public/                     Static assets copied verbatim into dist/
│   ├── favicon.ico, favicon.png
│   ├── og-image.png            1200×630 social preview image
│   ├── robots.txt              Crawler allow-list
│   ├── llms.txt                LLM-friendly site summary
│   └── manifest.webmanifest    PWA manifest
├── scripts/                    Build pipeline (run by `npm run build`)
│   ├── seo-config.mjs          Single source of truth: per-route SEO
│   ├── prerender.mjs           Orchestrator (HEAD, BODY, SITEMAP+RSS)
│   ├── snapshot.mjs            Playwright body capture
│   ├── static-server.mjs       Ephemeral file server for snapshot
│   ├── sitemap.mjs             dist/sitemap.xml generator
│   ├── rss.mjs                 dist/rss.xml generator
│   └── summary.mjs             Pretty-printed build report
├── src/
│   ├── main.tsx                React entrypoint, propagates prerender marker
│   ├── App.tsx                 Routes, splash logic, query client
│   ├── index.css               Tailwind + design tokens (CSS vars)
│   ├── components/
│   │   ├── SEOHead.tsx         Client-side meta updates for SPA navigation
│   │   ├── SplashScreen.tsx    Used in dev only (skipped on prerendered)
│   │   ├── ui/                 shadcn/ui primitives
│   │   └── …                   Page-level components (Navbar, Footer, etc.)
│   ├── pages/                  Route components (Index, About, Services,
│   │                           CaseStudies, CaseStudyDetail, Blog, …)
│   ├── data/                   Content modules (handwritten TS)
│   │   ├── blogPosts.ts        Blog post array (slug, title, content)
│   │   ├── caseStudies.ts      Case study summaries (id, industry, image)
│   │   ├── caseStudyDetails.ts Detail-page content per case study
│   │   ├── industries.ts
│   │   └── countries.ts
│   ├── hooks/, lib/, assets/, test/
├── index.html                  Build template with <!--SEO_HEAD--> placeholder
├── vercel.json                 Vercel hosting config (host-only)
├── vercel.json.README.md       Documentation for vercel.json
├── CLAUDE.md                   Cross-session memory for AI assistants
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── tsconfig*.json
```

---

## Local development

Requirements: Node 20+, npm.

```bash
# Install dependencies
npm install

# Start the Vite dev server (no prerender, splash screen renders)
npm run dev
# → http://localhost:8080

# Run tests
npm test

# Lint
npm run lint
```

### Full production build (locally)

```bash
# First time only — downloads Playwright's bundled Chromium (~80 MB).
# The Chromium install is intentionally NOT chained into `npm run build`
# so build also works in environments where Playwright cannot install
# binaries (Lovable's preview container, sandboxed CI, etc.). In those
# environments the build still succeeds with head-only output (route
# metadata + JSON-LD + sitemap + RSS) — only the Playwright body
# snapshot pass is skipped.
npm run install:chromium

# Build everything: vite build + head injection + Playwright body
# snapshot for all 28 routes + sitemap + RSS
npm run build

# Preview the production build
npm run preview
```

The build prints a summary table at the end:

```
PRERENDER + SNAPSHOT SUMMARY  (28 routes)
Route                                    Status  Words  Tries
/                                          ✓      1126    1
/thesis                                    ✓      2056    1
…
Totals: 28 ok, 0 warn (<50 words), 0 failed
```

Any route showing `✗` or `<50 words` is a real bug — usually a runtime
error in that page that prevents the splash from completing. Check the
`Problems:` section below the table for stack traces.

---

## Deployment

Deployment is **fully automated**. There is no manual `vercel deploy`
step in normal use.

1. Merge to `main` on `InclinedPlane-AI/inclinedplane`
2. GitHub Actions workflow `.github/workflows/deploy.yml` fires
3. The workflow installs Chromium runtime libs via apt, runs the full
   build (including the Playwright body snapshot), verifies every route
   has body content, then `vercel deploy --prebuilt --prod`
4. Vercel uploads the prebuilt artifact and aliases it to
   `www.inclinedplane.com`

Vercel's own git auto-deploy is **disabled** (Settings → Git → Ignored
Build Step is set to `exit 0`). This prevents Vercel from racing the
GitHub Actions deploy with its own (failing) build attempt.

### Required GitHub secrets

The workflow depends on three repository secrets configured at
`InclinedPlane-AI/inclinedplane`'s Settings → Secrets and variables →
Actions:

- `VERCEL_TOKEN` — from `vercel.com/account/tokens`
- `VERCEL_ORG_ID` — Vercel team/account ID (Settings → "Your ID" or Team ID)
- `VERCEL_PROJECT_ID` — from the Vercel project's Settings → General

If any of these are missing or invalid, the deploy step fails fast.

### Manual deploy (if you absolutely need it)

```bash
npm run build
npx vercel deploy --prebuilt --prod
```

Requires being authenticated via `npx vercel login` first. This is for
break-glass scenarios; the GitHub Action is the canonical path.

---

## Adding content

### A new blog post

1. Add an entry to the `blogPosts` array in `src/data/blogPosts.ts` with
   `slug`, `title`, `subtitle`, `date` (string like `"February 19, 2026"`),
   `author` (with optional `linkedin` for Person schema), `tags`, and the
   `sections` content.
2. Push. The next deploy automatically:
   - Adds the post to the prerender route list (parsed from the data file)
   - Generates `dist/blog/<slug>/index.html` with full body + JSON-LD
   - Adds the URL to `dist/sitemap.xml`
   - Adds the post to `dist/rss.xml`

### A new case study

1. Add a summary entry to the `caseStudies` array in
   `src/data/caseStudies.ts` (id, title, industry, summary, image).
2. Add a matching detail entry to `src/data/caseStudyDetails.ts` with
   the same `slug` (= the summary's `id`) and the three sections
   (`opportunity`, `solution`, `impact`).
3. Push. The deploy creates `dist/case-studies/<slug>/index.html`.

### A new top-level route

1. Add the page component under `src/pages/`.
2. Register it in `src/App.tsx`'s `<Routes>` block.
3. **Important**: add a matching entry to `staticRoutes` in
   `scripts/seo-config.mjs` with title, description, optional JSON-LD,
   and a `noscriptSummary`. Without this entry the new route won't be
   prerendered, sitemapped, or surfaced to crawlers — it'll only work
   for client-side navigation.

---

## Key architectural decisions

### Why prerender at all (instead of plain SPA)?

The audience includes investors and prospects who research via Google
and increasingly via ChatGPT/Claude/Perplexity. LLM crawlers do not
execute JavaScript. A pure client-rendered SPA shows them an empty
`<div id="root">` and one boilerplate title — the entire site is
effectively invisible to AI search. Prerendering at build time gives
every URL real HTML with real content for those crawlers.

### Why prerender bodies, not just metadata?

Per-route metadata + JSON-LD alone is a 5× improvement (crawlers see
proper entity data per page). Adding rendered bodies is another 5×:
LLM tools can quote case study text, blog prose, the thesis content
when answering questions about the company. Together that's the
difference between "Inclined Plane is a company [headline only]" and
"Inclined Plane has 14 production case studies including [specific
detail]" in an LLM answer.

### Why GitHub Actions and not Vercel for the build?

Vercel's build container lacks Chromium runtime libraries and forbids
`apt-get`. We tried `puppeteer` (default Chromium download), then
`puppeteer-core + @sparticuz/chromium`, then Playwright — all failed on
Vercel for the same root cause. GitHub Actions runs Ubuntu with full
sudo, so a 30-second `apt install` of `libnspr4`, `libnss3`, `libgbm1`
+ friends gets us a working browser. Build time is comparable; Vercel
is just the host.

### Why Playwright over Puppeteer?

Both work locally. On Vercel, `puppeteer`'s bundled Chromium and
`@sparticuz/chromium` both fail with shared-library errors. Playwright
ships its own Chromium build that integrates more cleanly with the
apt-installed system libraries — first try on Ubuntu and it works.

### Why skip the splash screen on prerendered pages?

The splash existed to mask the JS-load gap on a fresh SPA. With
prerendered HTML the body content is already in the DOM when the page
arrives — there is no gap. Showing the splash made bot screenshots
(Google Rich Results, LinkedIn previews) catch the splash mid-animation
and report a "blank with logo" page. Skipping it shipped real content
to bots and shaved 2-3 seconds off perceived load for human users too.
Splash is preserved for `npm run dev` (no `data-prerendered` marker
there).

### Why content via TS modules instead of a CMS?

Content cadence is low (occasional blog posts, occasional case study
edits). Engineering team is small. Putting everything in version-
controlled TS modules makes the build pipeline simpler, eliminates a
runtime CMS dependency, and means content changes go through the
same review/CI pipeline as code. Lovable handles the editing UX where
needed.

### Why `cleanUrls: true`?

Canonical URLs in our prerendered HTML never carry `.html` or trailing
slashes. Vercel's `cleanUrls: true` makes the URL the user sees match
the canonical exactly, avoiding split duplicate-URL signals to Google.

---

## Known follow-ups

In rough priority order:

1. **Code-split the JS bundle.** Single 1.5 MB chunk. Convert
   `src/App.tsx` route imports to `React.lazy()` + `<Suspense>`.
   Estimated ~60% reduction in initial bundle, real Lighthouse Performance
   lift on mobile.
2. **Lazy-load the heavy MP4 case-study videos.**
   `predicting-ev-battery.mp4` is 25 MB, `fmcg-sap-dms.mp4` is 14 MB.
   Use `<video preload="none">` with poster images, or move to Mux /
   Cloudflare Stream / Vercel Blob.
3. **Add a true 180×180 `apple-touch-icon-180x180.png`** instead of
   reusing `/favicon.png`.
4. **Run Lighthouse on production** and act on findings.

---

## Operational tasks (human-owned, not in code)

- Submitting `https://inclinedplane.com/sitemap.xml` to Google Search
  Console + Bing Webmaster Tools after major content changes
- Refreshing LinkedIn's preview cache via
  `linkedin.com/post-inspector` when OG images change (it's sticky for
  ~7 days otherwise)
- Validating new content with Google's Rich Results test
  (`search.google.com/test/rich-results`)
- Domain DNS records, especially SPF/DKIM/DMARC for
  `support@inclinedplane.com`
- Vercel team / project / token management

---

## For AI assistants editing this repo

There is a `CLAUDE.md` at the repo root that documents architectural
contracts, file-by-file roles, and "do not modify" surfaces. Read it
before refactoring.

The build pipeline files (`scripts/`, `.github/workflows/deploy.yml`,
`vercel.json`, `index.html`'s SEO_HEAD placeholder, `src/main.tsx`'s
prerender propagation, `src/App.tsx`'s data-app-ready logic, and
`src/components/SEOHead.tsx`) carry guardrail comments. Their structure
is load-bearing — propose changes in PRs rather than silently
"modernizing".

Lovable is also used to make content and design changes to this repo;
when its diffs touch infrastructure files, those hunks should usually
be rejected during review. See `CLAUDE.md` for the full list.

---

## License

Proprietary. Copyright Inclined Plane.
