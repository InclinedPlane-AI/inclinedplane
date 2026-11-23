# CLAUDE.md — Inclined Plane site

**Last reviewed: 2026-11-23.** This file is the cross-session memory for
Claude when working on this repo. Read it on session start, then verify
anything here against the current code before acting on it.

---

## Redesign in progress (branch `revamp`)

A full redesign is under way on the long-lived `revamp` branch. **Read
`docs/revamp/PROGRESS.md` first** (status, decisions, what's left), then
`DESIGN_NOTES.md` (route map, tokens, sign-off items), `CONTRIBUTING.md`
(single-repo branch/PR/deploy flow) and `docs/revamp/REVIEW.md` (founder
review rounds, below). Since 2026-11-21 Lovable is retired: no
tool writes to `main` directly any more; everything goes through PRs.

## RULE — every change goes through a PR into `revamp`; `main` only at launch

This is the team's working agreement (set by the repo owner, 2026-11-22).
Follow it on every task, however small, including docs and one-line fixes.

1. **Start from the latest `revamp`:**
   `git fetch upstream && git checkout -b <type>/<short-name> upstream/revamp`
   (`feat/…`, `fix/…`, `content/…`, `docs/…`). One logical change per branch.
2. **Never push to `revamp` or `main` directly**, even though admin rights
   would allow it. Push the branch and open a PR **into `revamp`**.
3. **Never merge, approve or admin-bypass a PR yourself.** A human reviews
   and merges. Don't use `gh pr merge --admin` or change branch protection to
   get around a review.
4. Before opening the PR: `npx tsc --noEmit -p tsconfig.app.json`,
   `npm run lint`, and for anything that touches pages or the pipeline
   `VITE_SITE_ENV=staging npm run build` (must end "0 failed"). Screenshot
   changed pages at 390 and 1440 wide.
5. The PR gets a preview link automatically (staging workflow). Put what
   changed, how it was checked and anything a reviewer must decide in the PR
   description. Update `docs/revamp/PROGRESS.md` in the same PR.
6. Merged PRs redeploy **staging** (https://inclinedplane-staging.vercel.app).
   That is where the founder and reviewers sign off.
7. **Production (`main`) changes only once, at launch:** a single reviewed PR
   from `revamp` into `main`, opened only when the owner says everything is
   approved and final (all "Verify before launch" items resolved, flags
   decided). Don't open or suggest a `revamp` → `main` PR before that.
   Before it merges, switch `deploy.yml`'s packaging step to
   `node scripts/vercel-output.mjs` so redirects reach production.
8. The only exception is an urgent fix to the live site: branch from `main`,
   PR into `main` (human merges), then PR `main` into `revamp` to keep them
   in step. Ask the owner first.
9. All deploys use the company GitHub org and company Vercel account via
   GitHub Actions. Never deploy from a personal Vercel account or the CLI on
   a laptop.

## Founder review rounds (since 2026-11-23)

Keerthana (founder) reviews content, grammar and wording **in batches**, not
one PR per small change. Full process and the round log: `docs/revamp/REVIEW.md`.

- Each round is one PR, **"Review round N"**, from `review/round-N` (based on
  the latest `revamp`). The PR's preview link (posted by the staging workflow)
  is her review link and stays fixed for the round.
- She comments with **Vercel Comments** on that preview. Mohan shares it with
  her (Toolbar → Share → her email). The company Vercel account is on the
  **Hobby (free) plan**: no team seats, one outside collaborator per
  deployment, and comments only work on *preview* deployments (the stable
  staging URL is a production deployment of the staging project).
- **During a round, apply her changes as LOCAL commits only** on
  `review/round-N`, shown on localhost (main folder on that branch).
  **Do not push** until Mohan says "round N done": every push makes a new
  preview link.
- On "round N done": run the PR checks, push once, write a comment-by-comment
  change list in the PR description, update the log in `REVIEW.md`. Mohan
  approves and merges. Then open `review/round-N+1` from `revamp` as the next
  PR; its preview link is her next review link (she checks the last round's
  changes there and adds new comments).
- Her wording wins for copy, but flag conflicts with the brief's voice rules,
  banned words or claims policy instead of silently changing her text. Keep
  `scripts/seo-config.mjs` in step with any title or description change.
  Layout or structural requests go back to Mohan, not into a round.

## Working notes (learned 2026-11-22/23)

- **PRs that each touch `docs/revamp/PROGRESS.md` conflict** when merged one
  after another (the change log and the section above "## 6. Checklist").
  When several PRs are open at once, chain them (each branch merges the one
  before it) and tell Mohan the merge order. Use merge commits; force-pushes
  are blocked by the permission check.
- **Localhost** (`npx vite --host 127.0.0.1 --port 8080`) shows whatever
  branch the main folder has checked out. Keep it on the branch Mohan is
  reviewing; don't switch it away silently.
- Keep `revamp` in step with `main`: if a hotfix lands on `main`, open a
  "merge main into revamp" PR (see rule 8).
- Never commit client-identifying material (the repo and previews are public):
  client and internal system names, table names, tenant IDs. Videos and demos
  get checked frame by frame before they're added.

## IMPORTANT — before trusting anything in this file

This repo is co-edited by **Lovable** (the no-code AI tool the team uses
for content and design changes) and by humans via PRs. **Lovable does not
update this file.** Anything described here as "current state" was true on
the last review date above; it may not be true now.

Specifically: file paths, component names, route lists, and configuration
fields described here may have been moved, renamed, or deleted by a
Lovable session that this document was never told about.

Before you act on any fact in this doc:

- `ls` or `grep` to confirm the file/symbol still exists
- If you find a divergence, **trust the current code over this doc** and
  update the doc as part of your work
- If something feels load-bearing and is missing, ask the user before
  recreating it — Lovable may have intentionally moved it

The architectural decisions here are durable. The implementation details
(file paths, exact line numbers, exact wording) are not.

---

## What this site is

Marketing site for **InclinedPlane**, an AI-native data engineering
consultancy. Audience: potential clients (mid-to-large enterprises) and
investors. Primary distribution channels:

- Organic search (Google, Bing)
- AI search and citation (ChatGPT, Claude, Perplexity, Gemini)
- Social link previews (LinkedIn especially — this is B2B)
- Direct referrals

Production URL: `https://www.inclinedplane.com` (apex `inclinedplane.com`
also resolves). Origin runs on Vercel.

The site is **content-heavy and design-led**, with 14 case studies, a
long-form thesis page, blog posts, and animated/3D components (three.js,
ogl, framer-motion). Conversion is "book a discovery call" via the
`/contact` page.

---

## Tech stack

- **Build**: Vite 5 + React 18 + TypeScript + SWC
- **Styling**: Tailwind CSS + shadcn/ui (Radix primitives) + custom CSS
  variables in `src/index.css`
- **Routing**: react-router-dom 6 (BrowserRouter — client-side SPA routing)
- **Animation**: framer-motion + custom WebGL (three.js, ogl)
- **Hosting**: Vercel (host only — see deployment section; **the build
  does not run on Vercel**)
- **CI**: GitHub Actions (`.github/workflows/deploy.yml`)
- **Testing**: vitest + @testing-library/react (one example test today)
- **Analytics**: @vercel/analytics + @vercel/speed-insights

Vite build output goes to `dist/`. The full build chain extends past
`vite build` — see the SEO pipeline section.

---

## Critical architecture: SEO / crawler-visibility pipeline

This is the most important non-obvious thing about the codebase. It exists
because the React app is client-rendered, and crawlers that don't execute
JavaScript (GPTBot, ClaudeBot, PerplexityBot, social-link previewers,
Bingbot in many cases) would otherwise see only an empty `<div id="root">`.

### Build flow

```
npm run build
  └── vite build                     (Vite produces dist/index.html template + JS/CSS)
  └── node scripts/prerender.mjs
        ├── PASS 1 — HEAD INJECTION
        │   For every route from getRoutes(), reads dist/index.html as a
        │   template, replaces a <!--SEO_HEAD--> placeholder with route-
        │   specific <title>, <meta>, canonical, OG/Twitter, JSON-LD,
        │   writes dist/<path>/index.html. 36 routes today.
        ├── PASS 2 — BODY SNAPSHOT (Playwright)
        │   Boots a tiny static server on a free port in 3000-3010.
        │   Launches headless Chromium via Playwright. For each route,
        │   waits for html[data-app-ready="true"] (set by src/App.tsx
        │   when the splash screen finishes), then captures
        │   document.body.innerHTML. Merges the captured body into the
        │   head-baked file from PASS 1; <head> is preserved exactly.
        │   The merged <body> tag also gets `data-prerendered="true"`
        │   stamped on it (see "splash skip" below).
        └── PASS 3 — SITEMAP + RSS
            Writes dist/sitemap.xml (33 indexable URLs, filters out
            noIndex routes) and dist/rss.xml (blog posts, RFC 822 dates).
```

The full output: per-route HTML with correct head metadata, full body
prose for non-JS crawlers, sitemap, RSS, llms.txt, manifest.

### Why Playwright (and why not on Vercel)

Vercel's build container lacks `libnspr4`, `libnss3`, `libgbm1` and
related Chromium runtime libs, and doesn't permit `apt-get`. We tried
`puppeteer` (default Chromium download) and `puppeteer-core +
@sparticuz/chromium` — both failed on Vercel for the same root cause.

The fix was to move the build out of Vercel entirely. **GitHub Actions
runs the build on a real Ubuntu runner with sudo + apt access**, then
deploys the prebuilt `dist/` to Vercel using `vercel deploy --prebuilt`.
Vercel's own auto-deploy is **disabled** for this project via the
"Ignored Build Step" setting (`exit 0`).

Files involved (all carry guardrail headers dated 2026-05-03):

- `scripts/seo-config.mjs` — single source of truth for per-route SEO
  data. Hard-codes 12 static routes; parses `src/data/blogPosts.ts`,
  `src/data/caseStudies.ts`, `src/data/caseStudyDetails.ts` via regex to
  enumerate dynamic routes (regex was chosen because the data files
  import binary assets via Vite's `@/` alias, which Node can't evaluate).
- `scripts/prerender.mjs` — orchestrator. Runs the three passes.
- `scripts/snapshot.mjs` — Playwright body capture. Retry up to 3x per
  route, 50-word minimum threshold.
- `scripts/static-server.mjs` — tiny HTTP server on first free port in
  3000-3010 to serve dist/ to Playwright.
- `scripts/sitemap.mjs` — generates dist/sitemap.xml.
- `scripts/rss.mjs` — generates dist/rss.xml.
- `scripts/summary.mjs` — pretty-printed build report.
- `index.html` — template with `<!--SEO_HEAD-->` placeholder.
- `src/App.tsx` — sets `html[data-app-ready="true"]` when splash done;
  also reads `data-prerendered` to skip splash entirely on prerendered
  pages.
- `src/main.tsx` — propagates `body[data-prerendered]` to `<html>` before
  React mounts.

### Splash-screen skip on prerendered pages

The splash screen (`src/components/SplashScreen.tsx`) is intentionally
**not rendered on prerendered production pages**. Mechanism:

1. `scripts/prerender.mjs::injectBody` stamps `data-prerendered="true"`
   on the `<body>` open tag.
2. `src/main.tsx` reads `body.dataset.prerendered` before calling
   `createRoot.render`, propagates it to `<html>`.
3. `src/App.tsx` lazily initializes `splashDone=true` and
   `contentReady=true` if the marker is present, so `<SplashScreen>` is
   never instantiated.

The splash existed to mask the JS-load gap on a fresh SPA. With
prerendered HTML, there's no gap to mask, and bot screenshots (Google
Rich Results, LinkedIn Post Inspector, Lighthouse) used to catch the
splash mid-animation, producing blank-with-logo screenshots. The skip
removes that. Splash still works in `npm run dev` (where `data-
prerendered` is absent).

The `index.html` visibility veil (`#root:not([data-react-ready])
{visibility:hidden}`) is similarly scoped to non-prerendered pages via
`body:not([data-prerendered])` — so on production, content is visible
the moment the HTML parses.

---

## Deployment topology

There are **two GitHub repos** in play:

| Repo | Role |
|---|---|
| `mohangowdat-sail/inclinedplane` | The user's personal fork. Where the `origin` remote of local clones points. |
| `InclinedPlane-AI/inclinedplane` | The "real" repo Vercel is git-connected to. The GitHub Action also lives here. |

**The workflow file (`.github/workflows/deploy.yml`) and Vercel's git
connection are both on `InclinedPlane-AI/inclinedplane`, on `main`.** The
user's normal flow is push to fork → PR → merge to InclinedPlane-AI;
Lovable may write directly to InclinedPlane-AI.

### Vercel side

- Project: `inclined-planes-projects/inclinedplane` on Vercel
- Production domain: `www.inclinedplane.com` (also `inclinedplane.com`)
- **Auto-deploy is disabled.** Settings → Git → Ignored Build Step is
  set to `exit 0`. Vercel skips its own build on every push.
- `vercel.json` declares `buildCommand: "npm run build"` and
  `outputDirectory: "dist"` for completeness, but those only matter when
  someone explicitly runs `vercel build` — which we no longer do.
- The actual production deployments come from `vercel deploy --prebuilt`
  invocations made by GitHub Actions.

### GitHub Actions side (`.github/workflows/deploy.yml`)

Runs on every push to `main` on `InclinedPlane-AI/inclinedplane`. Steps:

1. Checkout, set up Node 20, prime the npm cache
2. `apt-get install -y libnspr4 libnss3 libgbm1` and friends (full list
   in the workflow file)
3. `npm ci`
4. `npx playwright install chromium`
5. `npm run build` — full pipeline: head + body + sitemap + RSS
6. **Verify step** — walks every `dist/**/index.html` and fails the
   build if any is missing the `<noscript>` block (the marker that body
   snapshot succeeded for that route)
7. `npm install -g vercel@latest`
8. `vercel pull --yes --environment=production --token=...` to pull
   project config into `.vercel/`
9. **Manual artifact assembly** — copies `dist/` into
   `.vercel/output/static/` and writes `.vercel/output/config.json` per
   the Build Output API v3 spec, carrying our `cleanUrls`, `trailingSlash`,
   and the SPA-fallback rewrite. We do **not** call `vercel build`
   because it would re-run `npm run build` from scratch (vercel.json's
   `buildCommand`) — wasteful, ~3 minutes of redundancy per run.
10. `vercel deploy --prebuilt --prod --token=...` uploads the artifact.

### Staging (revamp branch)

`.github/workflows/deploy-staging.yml` builds the same way and deploys to a
second Vercel project, `inclinedplane-staging`, in the same Vercel account as
production: push to `revamp` → stable staging URL; PR into `revamp` → preview
URL posted as a PR comment. It packages output with
`scripts/vercel-output.mjs --noindex`, which also carries `vercel.json`
redirects/headers into `.vercel/output/config.json` (`--prebuilt` ignores
vercel.json). When the revamp ships, switch `deploy.yml`'s packaging step to
`node scripts/vercel-output.mjs` so the redirects reach production.

`ubuntu-latest` (26.04) can't install Playwright 1.55's Chromium; workflows are
pinned to `ubuntu-24.04`.

### Three GitHub secrets the workflow needs

These are configured on `InclinedPlane-AI/inclinedplane` settings →
Secrets and variables → Actions:

- `VERCEL_TOKEN` — full-account or project-scoped token from
  `vercel.com/account/tokens`
- `VERCEL_ORG_ID` — the Vercel team/org ID for `inclined-planes-projects`
  (Vercel's "Org ID" and "Team ID" labels mean the same value)
- `VERCEL_PROJECT_ID` — from the Vercel project's Settings → General

If a future Claude is asked to set this up again, it's all in
`.github/workflows/deploy.yml`'s guardrail header.

---

## Routing

> On the `revamp` branch the route map changed: `/capabilities` and
> `/capabilities/:slug` (four pages) replace `/services` (301), plus
> `/assessment`, `/learn`, `/learn/:slug`, `/context-engineering`,
> `/insights`, `/resources`, `/readiness-checklist`, and `/industries` is live
> again. `/products` is labeled "Solutions"; `/blog` is labeled "Blog". The
> revamp nav and its dropdowns live in `src/content/site.ts` +
> `src/components/site/NavMenus.tsx`. `npm run build` also runs
> `scripts/check-flow.mjs` (fails on pages with no onward links, or pages
> nothing links to). See DESIGN_NOTES.md §1 and §3. The list below describes `main`.

App uses `react-router-dom` BrowserRouter with these routes (defined in
`src/App.tsx`):

- `/` — homepage (`Index.tsx`)
- `/thesis` — long-form manifesto
- `/services` — 5 service layers
- `/products` — hub for both products (`src/pages/Products.tsx`)
- `/products/pipelineiq`, `/products/inclever` — product pages
  (`src/pages/Product*.tsx`; sections and interactive demos in
  `src/components/products/`). Product metadata (names, audience, demo
  agenda) lives in `src/data/products.ts` and feeds the navbar Products
  hover menu, the hub and the Request-a-demo dialog (posts to the same
  Formspree form as /contact). Copy follows the Inclever claims register
  and keeps the PipelineIQ client confidential: no client names or
  unverified performance figures.
- `/industries` — 8 verticals
- `/case-studies` — index
- `/case-studies/:slug` — 14 detail pages, slugs in
  `src/data/caseStudyDetails.ts`
- `/about`
- `/blog` — index
- `/blog/:slug` — currently 7 posts in `src/data/blogPosts.ts`
- `/careers`
- `/contact`
- `/privacy`, `/terms`, `/cookies` — noIndex, excluded from sitemap
- `/*` — `NotFound.tsx`

The total of 36 prerendered routes = 15 static + 14 case study details +
7 blog posts. If new content is added (more blog posts or case studies),
the prerender pipeline picks it up automatically because
`scripts/seo-config.mjs::getRoutes()` parses the data files at build time.

---

## Data sources

- `src/data/blogPosts.ts` — array of blog posts. Each has `slug`,
  `title`, `subtitle`, `date` (string like `"February 19, 2026"`),
  `author: { name, role, linkedin? }`, `tags`, full content sections.
- `src/data/caseStudies.ts` — array of case study summaries (id, title,
  industry, summary, image).
- `src/data/caseStudyDetails.ts` — array of detail pages, keyed by `slug`
  matching the case study `id`. Has `sections` (Opportunity, Solution,
  Impact) with body + bullets.
- `src/data/industries.ts` — industry vertical metadata.
- `src/data/countries.ts` — used in contact form.

`scripts/seo-config.mjs` regex-parses these files for `slug`, `title`,
`subtitle`/`summary`, `date`, `tags`, and `author` (for Person schema).
**If the shape of these files changes** (e.g., a field is renamed, the
array structure changes), the regex parser needs updating.

---

## Files / directories that must not be casually deleted

These are load-bearing for crawler visibility and/or deployment:

- `.github/workflows/deploy.yml` — without it, no production deploys
- `scripts/seo-config.mjs`, `scripts/prerender.mjs`, `scripts/snapshot.mjs`,
  `scripts/static-server.mjs`, `scripts/sitemap.mjs`, `scripts/rss.mjs`,
  `scripts/summary.mjs` — the pipeline
- `index.html` — must contain the `<!--SEO_HEAD-->` placeholder
- `vercel.json` — Vercel project config
- `vercel.json.README.md` — guardrail doc for `vercel.json` (since JSON
  can't carry comments)
- `public/robots.txt` — explicit allow-list for 30+ crawlers
- `public/llms.txt` — markdown summary for AI/LLM crawlers
- `public/manifest.webmanifest` — PWA manifest
- `public/og-image.png` — fallback social preview image
- `src/components/SEOHead.tsx` — keeps client-side meta updates working
  for SPA navigation; runtime JSON-LD has been intentionally removed
  (build-time injection is the source of truth)

Many of these have header-comment guardrails dated 2026-05-03 explaining
their role. Do not regenerate them without preserving the contract.

---

## Things that are intentionally specific (don't "clean up")

- The `@import url(...)` for Google Fonts is at the **top** of
  `src/index.css`, **before** `@tailwind` directives. This is required
  by CSS spec; Vite warns if the import is below the tailwind directives.
- `BlogPosting.author` JSON-LD uses `Person` schema with `sameAs:
  [linkedin URL]` when the author block in `blogPosts.ts` includes a
  `linkedin` field. Removing `linkedin` from author entries removes this.
- The SEOHead component (`src/components/SEOHead.tsx`) accepts `jsonLd`
  and `article` props but **does not apply them at runtime** — they
  exist for backwards compatibility with existing page call sites. The
  build-time output in `scripts/seo-config.mjs` is the source of truth
  for JSON-LD.
- Vite build emits a "chunk larger than 500 kB" warning for the main JS
  bundle (~1.5 MB). This is a known issue and a follow-up item; not a
  build failure.

---

## Verification commands

When in doubt about whether the pipeline is healthy, run:

```bash
# Full local build — should end with "Totals: 36 ok, 0 warn, 0 failed"
npm run build

# Confirm a sample of prerendered files have body content
grep -c "Opportunity" dist/case-studies/ev-fleet-scheduling/index.html
grep -c "Inclined" dist/services/index.html

# Confirm head metadata + JSON-LD baked correctly
node -e "const fs=require('fs');const m=fs.readFileSync('dist/services/index.html','utf8').match(/<script type=\"application\\/ld\\+json\">(.*?)<\\/script>/);console.log(JSON.parse(m[1].replace(/\\\\u003c/g,'<')).map(x=>x['@type']))"

# Confirm sitemap + RSS exist
test -f dist/sitemap.xml && grep -c "<loc>" dist/sitemap.xml  # expect 33
test -f dist/rss.xml && grep -c "<item>" dist/rss.xml         # expect 7

# Confirm body has the data-prerendered marker (splash-skip mechanism)
grep -c 'data-prerendered="true"' dist/services/index.html  # expect 1
```

Production check:

```bash
curl -s https://www.inclinedplane.com/services | grep -c "Clarity Layer"
# Expect a positive number — proves body prerender is shipping.
```

---

## Known follow-ups (not done as of 2026-05-03)

In rough priority order:

1. **Code-split the JS bundle.** Single 1.5 MB chunk hurts Core Web
   Vitals on mobile → hurts ranking. Convert `src/App.tsx` route imports
   to `React.lazy()` + `<Suspense>`. Estimated 60% reduction in initial
   bundle. ~3 hours focused work.
2. **Lazy-load the heavy MP4 case-study videos** (`predicting-ev-battery
   .mp4` is 25 MB, `fmcg-sap-dms.mp4` is 14 MB). Use
   `<video preload="none" poster="...">` or move to Mux / Cloudflare
   Stream / Vercel Blob.
3. **Replace `/og-image.png`** with a properly-sized 1200×630 branded
   image. The current file works but may not be exactly that aspect.
4. **Add a true 180×180 `apple-touch-icon-180x180.png`.** Currently
   `<link rel="apple-touch-icon">` reuses `/favicon.png`.
5. **Run Lighthouse on production** and act on Performance findings.
6. **Submit sitemap to Google Search Console + Bing Webmaster Tools** if
   not already done.
7. **Validate Rich Results** on a few URLs after each major content
   change.

---

## Operational tasks the human owns

These cannot be done from the codebase:

- Submitting `https://inclinedplane.com/sitemap.xml` to Google Search
  Console + Bing Webmaster Tools after any major content shift
- Refreshing LinkedIn's preview cache via `linkedin.com/post-inspector`
  when OG images change
- Domain DNS records (in particular SPF/DKIM/DMARC for
  `support@inclinedplane.com`)
- Vercel team / project / token management

---

## Working philosophy on this repo

- **Every change is a PR into `revamp`**, reviewed and merged by a human
  (see the RULE section at the top). Production changes once, at launch.
- **Lovable is retired (2026-11-21).** Content and design changes now come
  from the team and Claude through PRs. Don't gratuitously refactor JSX or
  CSS others authored unless asked.
- **Claude owns infrastructure** — build pipeline, SEO, deploy
  automation, structured data. Defend the contracts described above.
- When a content change breaks a parser (e.g. a data file shape changes
  and breaks `seo-config.mjs`), the parser is the bug. Update the parser,
  don't push back on the content change.
- Keep guardrail comments at the top of pipeline files so anyone who
  "modernizes" them gets a clear "do not delete" signal.

---

## Referral Portal Design Contract

If the form on the **Referral Portal** (`SubmitReferralTab` in `src/pages/Referral.tsx`) needs to be modified or recreated in the future, it **must** strictly adhere to the following 2-column layout design:

### Layout Structure
- **Candidate Details (Section 1)**
  - Full name (Input, required)
  - Email address (Input, required)
  - Phone number (Input, optional)
  - Applying for (Select Dropdown, required)
- **Your Details (Referee) (Section 2)**
  - Your name (Input, required)
  - Your team / department (Input, required)
  - Relationship to candidate (Select Dropdown, required, spans full width / 2 columns)

### Aesthetics
- The form fields must be laid out in a responsive CSS Grid (`grid-cols-1 sm:grid-cols-2`).
- The Submit button must be right-aligned at the bottom of the form.
- The "Resume Box" upload UI is deliberately excluded; rely on the user attaching it in their email client instead.

---

## Careers Page / Job Listing Design Contract

If new job openings are added to the **Careers** page (`openRoles` array in `src/pages/Careers.tsx`), the data structure and UI must strictly follow these rules:

### Data Schema (`openRoles` array)
Each job position must be an object with the following fields:
```typescript
{
  title: string;             // e.g. "HR & Accounts Executive"
  department: string;        // e.g. "Operations"
  location: string;          // e.g. "On-Site" or "Remote"
  type: string;              // e.g. "Full-time"
  about: string;             // A short paragraph introducing the role
  responsibilities: string[]; // Array of strings (bullet points)
  requirements: string[];     // Array of strings (bullet points)
  applyUrl: string;          // External link (e.g., LinkedIn job post)
}
```

### UI Aesthetics (`JobCard` component)
- **Outer Card (Collapsed):** Should display the `title`, `department`, `location`, and `type`.
- **Inner Card (Expanded):** When clicked, it expands to show the `about` section, bulleted lists for `responsibilities` and `requirements`, and an "Apply Now" button at the bottom.
- **Interactivity:** It uses a smooth expanding accordion animation.
