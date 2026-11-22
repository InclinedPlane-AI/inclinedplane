# Website revamp: progress tracker

**Read this first when you pick up the revamp in a new session.** It records what
is finished, what is in progress, what is left, and every decision already made,
so nobody re-does or re-litigates work. Update it in the same commit as the work
it describes.

Last updated: 2026-11-22 (end of session 2)

---

## 1. How to resume (for a new Claude / engineer session)

1. Check out `revamp` and pull: `git checkout revamp && git pull`.
2. Read, in this order:
   - this file (status and decisions)
   - `DESIGN_NOTES.md` (design decisions, route map, open questions)
   - `CLAUDE.md` (build pipeline and SEO contracts; still authoritative)
   - `CONTRIBUTING.md` (branch/PR/deploy workflow)
3. Reference inputs (kept **outside** the repo; the repo is public, so internal
   notes must not be committed). The user feeds these in:
   - `inclinedplane-website-context.md`: the brief and **source of truth** for
     messaging, voice, claims policy, design system and page specs
   - `InclinedPlane_Homepage.html`: the founder's homepage, the visual base
   - `InclinedPlane Design Docs/`: logo files (already exported into
     `public/brand/`, see section 4)
4. Pick the next unchecked item in section 6 and keep the checklist current.

## 2. Repo, branches, deploys (current state)

| Thing | State |
|---|---|
| Single repo | `InclinedPlane-AI/inclinedplane` (public). Everyone works here; no forks. |
| `main` | Production → inclinedplane.com via `.github/workflows/deploy.yml` (unchanged). |
| `revamp` | Long-lived redesign branch. Protected: PR + 1 approval (admins can bypass). |
| Feature work | `feat/<thing>` branched from `revamp` → PR into `revamp`. |
| Staging deploy | (PR #11) `.github/workflows/deploy-staging.yml`: push to `revamp` → staging; PR → preview URL comment. Vercel project `inclinedplane-staging` in the **same Vercel account as production**, created on first run with the existing secrets. All staging responses are `noindex`. |
| Lovable | Retired (user, 2026-11-21). No more direct writes to `main`. |
| Old personal preview | `inclinedplane-lac.vercel.app` (user's personal Vercel Hobby account). Retire once staging is live. |

### Blocked on a human (do these, then tick)

- [x] `workflow` scope granted to the GitHub CLI.
- [ ] **Merge PR #10** (CI fix → `main`). Production deploys have failed since 16 Nov 2026
      because `ubuntu-latest` moved to 26.04; PR #9's content is not live until this merges.
- [x] PR #11 (staging workflow → `revamp`) opened; its first run passed: the existing
      `VERCEL_TOKEN` is account-scoped, the `inclinedplane-staging` project now exists in the
      production Vercel account, previews are public, `/services` 308s, `X-Robots-Tag: noindex` set.
      First preview: https://inclinedplane-staging-co8o32k3j-inclined-planes-projects.vercel.app
- [ ] **Approve + merge PR #11** (needs a human approval; Claude may not admin-bypass reviews).
      The push to `revamp` then deploys the stable staging URL (the staging project's
      production domain, expected `https://inclinedplane-staging.vercel.app`; confirm in the Actions summary).
- [ ] Add the two engineers to the GitHub org with write access (start Monday 2026-11-23).
- [ ] Protect `main` (PR + 1 approval) now that Lovable is retired.
- [ ] Retire the personal-account preview project (`inclinedplane-lac.vercel.app`) and delete the local `.vercel/` link to it.
- [ ] After staging is live, add the staging build as a required status check on `revamp`.
- [x] Calendly connected: `calendly.com/keerthana-inclinedplane/ai-data-readiness-assessment` (2026-11-22).
- [ ] Optional: Calendly event → confirmation page → redirect to `https://inclinedplane.com/assessment/thank-you` (pass event details) for bookings made outside the site. Only after launch; may need a paid Calendly plan.

## 3. Decisions already made (don't re-ask)

- **Source of truth:** `inclinedplane-website-context.md` + the founder's homepage HTML.
  (Not the "Website_Rationale" files.)
- **Pages/URLs:** Claude decides what's best for SEO/UX. Keep existing URLs where they
  still fit; 301 anything renamed (via `vercel.json` redirects, which
  `scripts/vercel-output.mjs` carries into prebuilt deploys). Route map: `DESIGN_NOTES.md`.
- **Case studies:** use the existing 14 for now. Featured on home: EMEA multi-ERP
  manufacturing platform (`erp-unification`) and the edible oil producer
  (`fmcg-edible-oil`). All others are in the case studies index. A new set from
  recent clients plus one large enterprise data unification case study comes later.
- **Booking (revised 2026-11-22 from the founder's updated homepage file):** calendar
  first (Calendly free plan, inline embed), then three optional questions (role,
  platform, blocker) posted to Formspree (`xwvnakbz`) with the booking IDs, then
  "You're booked". Fallback "Can't find a time?" form. No HubSpot. Calendly URL is a
  placeholder in `src/content/site.ts`; set `calendarConfigured: true` when real.
- **Checklist lead magnet:** one-page PDF (draft v0.1, founder reviewing), email →
  instant download. Edit `src/content/checklist.json`, rebuild with
  `node scripts/build-checklist-pdf.mjs`, commit the PDF.
- **Name spelling:** "IncLever" (capital L) per the brief, everywhere.
- **Theme:** light only (founder decision). Dark surfaces only for deliberate moments.
- **Chat widget:** removed (rationale drops the placeholder chatbot).
- **Unverified claims:** wrapped with `verified: false` in content files. Staging
  (`VITE_SITE_ENV=staging`) shows a "Verify before launch" badge; production
  builds hide unverified items (see `src/content/verify.ts`).

## 4. Brand assets (exported, in `public/`)

| File | Source | Use |
|---|---|---|
| `brand/logo-primary.png` | `incpl_primarylogo_AW.png` | Header, light footer (the founder's template uses the stacked logo in the header) |
| `brand/logo-primary-inverse.png` | `incpl_primarylogo_inverseAW.png` | On black surfaces |
| `brand/logo-horizontal.png` | `incpl_logoHorizontal_fullcolourAW.png` | Compact/mobile header, emails |
| `brand/logo-primary-large.png` | `incpl_primarylogo_AW.png` | OG images, About |
| `brand/icon-{32,180,192,512}.png` | `incpl_favicon_AW.png` | Favicon, apple-touch, PWA |
| `brand/pattern-light.png` | founder HTML | Interlocked "i" texture (light) |
| `brand/pattern-strip.png` | founder HTML | Full-width hero/footer strip (dark + orange i) |
| `media/inclever-demo.mp4` + poster | founder HTML | IncLever demo clip (labeled "sample data") |
| `fonts/google-sans-flex.woff2` | founder HTML | Google Sans Flex (variable, subset), self-hosted |

Not used on the web: `InclinedPlane_masterlogo_fullcolourAW.png` (carries the retired
tagline "Data Leveraged. Growth Accelerated."), `incpl_primarylogo_fullcolourAW.jpg`
(non-transparent print copy).

## 5. Architecture of the revamp (where things live)

- `src/content/`: content as data (site config, nav, stats with `verified`, capabilities,
  case study tags/featured flags, tools, learn articles, feature flags).
- `src/components/site/`: the new design system (header, footer, layout, buttons,
  section label, incline, booking dialog, etc.). New pages use only these.
- Old components (`src/components/*.tsx`, `home/`, `case-study/`, `products/`) are
  legacy; delete each once nothing imports it.
- SEO: `scripts/seo-config.mjs` static routes must mirror each page's title/description.

## 5b. Where session 2 ended (2026-11-22)

- Merged into `revamp`: PRs #11 to #16. **PR #17 (logo marquee) awaits merge.**
- Staging: https://inclinedplane-staging.vercel.app (auto-deploys on merge to `revamp`).
- Production (`main`) is still the old design; it changes once, at launch (see the RULE in CLAUDE.md).
- Next up, from the team's pending list:
  1. Case studies: recent clients + the enterprise data unification case study.
  2. PipelineIQ demo video (MP4 + poster, same `DemoFrame` treatment as IncLever) and page refresh.
  3. Navbar and page-flow restructure.
  4. Logo files for Examly, GDi Partners, VSM Technologies, Noble Bioresources; client permissions; real testimonials.
  5. Keerthana's sign-offs (headshot, CEO note, checklist PDF, proposed blocks) and the claims in section 6b.
  6. Testing (real test booking, all forms), Lighthouse, protect `main`, add the two engineers.

## 5c. Session 3: navigation and page flow (2026-11-22)

Owner's brief: the nav items overlapped; make Solutions a dropdown, give context engineering its own page, put Learn inside Capabilities, add a Resources menu and an Insights evidence page, and make sure no page is a dead end. One PR.

- **Nav:** Context Engineering · Capabilities ▾ · Solutions ▾ · Resources ▾ · About · Contact + Book. Details and rationale: DESIGN_NOTES §3 "Navigation and page flow".
- **New pages:** `/context-engineering`, `/insights`, `/resources`, `/readiness-checklist`. `/learn/what-is-context-engineering` 301s to `/context-engineering`.
- **Changed:** `/products` is labeled Solutions (both products on top, both demos); `/capabilities` has clickable pillar cards + a Learn section; the Contextualize pillar links to the explainer instead of repeating it; `/learn` opens with the interactive context-layers diagram; `/blog` is labeled Blog.
- **Interactive pieces** (all sample data, all content in the HTML): context layers (`learn/ContextLayers.tsx`), ontology explorer (`learn/OntologyExplorer.tsx`), readiness check simulator (`learn/ReadinessSim.tsx`), live-scored checklist. Articles can embed them with a `widget` block in `learn.ts`.
- **New explainer:** "Why AI agents give wrong answers on enterprise data" (brief §6.3 #4).
- **Flow check:** `scripts/check-flow.mjs` runs at the end of `npm run build` and fails on dead ends or orphans. Build now ends "50 ok … 0 failed" then "[flow] 50 pages checked: 0 dead end(s), 0 orphan(s)".
- **Decisions taken by default** (owner didn't answer; change if wanted): kept `/products` URLs under the "Solutions" label; Industries added to Resources.
- **Needs sign-off:** PipelineIQ in the Solutions menu (brief §7.5 said off main nav until approved); every Insights figure (29, `verified: false`) needs a person to open its link; Gartner/McKinsey/Snowflake originals blocked automated checks, so they link to the reporting page plus the original.

## 5e. Session 3: product pages (2026-11-22)

- **PipelineIQ** rebuilt as one story, the four questions after a failed night (what failed: live → why → what does it break → how do we fix it). Hero: the recorded portal walkthrough (`public/media/pipelineiq-demo.mp4`, 27 s trimmed, 1.25×, sample client "Acme Manufacturing", labeled demo data). Chapters with one interactive piece each, ported from the old site's demos into our visual language: debug trail, signature collapse, alert storm (existing incident view), adaptive thresholds, SQL guard, persona tabs, interactive roadmap.
- **IncLever** rebuilt around four steps (check → define → answer → keep watch): demo clip in the hero, two-assistants comparison, readiness certificate, question-flow simulator (Teams chat + three gates), audit stages, tasks, surfaces, proof (finance semantic layer case study once PR #20 merges) and the trust layer with PipelineIQ.
- **Solutions hub** shows the PipelineIQ clip beside IncLever's.
- **PipelineIQ interactive sandbox** (`public/demos/pipelineiq-demo.html`, ~790 KB, self-contained, fictional client "Aldermoor Thermal Group", noindex): built in the PipelineIQ repo (`demo/build.py`, which blocks real-client words) and copied here. The page shows a screenshot and a Launch button; the file loads only on click (prefetched on hover) into a sandboxed iframe, with "open in a new tab". Rebuild there and copy again to update it. Its About page credits two team members by name (open item: team names on the site).
- Shared kit: `src/components/site/products/demoKit.tsx` (demo frame, video player that plays only on screen with a pause button and no autoplay for reduced motion, sticky chapter nav).
- **Owner's decision on the clip:** published unblurred as demo data. Some frames show real release names, Azure tenant/app IDs in error text and the real ERP list; listed in the PR for the reviewer.

## 6. Checklist

Legend: [x] done · [~] in progress · [ ] not started

### Phase 0: setup and audit
- [x] Branch `revamp` created from `feat/live-home-demos` and pushed to the org repo
- [x] Branch protection on `revamp` (PR + 1 approval, admin bypass)
- [x] Staging workflow + `scripts/vercel-output.mjs` (workflow on local branch `ci/staging-workflow`, unpushed: needs `workflow` scope)
- [x] Brand assets exported and trimmed in `public/brand/`
- [x] PROGRESS.md, DESIGN_NOTES.md, CONTRIBUTING.md, CLAUDE.md updated
- [ ] Lighthouse baseline of current production + after (record in DESIGN_NOTES §7)

### Phase 1: design system
- [x] Tokens (color, type, spacing, radii) in `src/index.css` + Tailwind `ip-*` colors
- [x] Self-hosted Google Sans Flex (from the founder file) + IBM Plex Mono via @fontsource
- [x] Content files in `src/content/` (site, stats, capabilities, tools, industries, caseStudyMeta, flags, verify, learn, assessment, inclever, pipelineiq)
- [x] Header (sticky, mobile menu), footer with pattern strip, layout with skip link
- [x] Primitives (buttons, labels, step tags, verify badge), sections (hero, CTA band, final CTA, proof strip, tools table, case study card, FAQ, IncLever card)
- [x] Verification markers: badge on staging, hidden in production; prerender prints the count
- [x] Booking dialog (form → Formspree, or Calendly), `?book=1` / `?book=calendar`, query-param prefill
- [x] Incline component (home with one rise-in, interactive tabs, mini)

### Phase 2: pages (all built; screenshots checked at 1440 and 390)
- [x] Home (founder design)
- [x] /capabilities + four capability pages (context page has "same question, two answers")
- [x] /assessment
- [x] /assessment/thank-you (booking conversion page, noindex)
- [x] /products, /products/inclever, /products/pipelineiq
- [x] /case-studies (filterable) + /case-studies/:slug template
- [x] /industries
- [x] /about
- [x] /learn + 3 explainers + glossary
- [x] /blog (Insights) + posts, /thesis
- [x] /contact, /careers, /referral, legal pages, 404
- [x] Session 3: /context-engineering, /insights, /resources, /readiness-checklist; Solutions hub; nav dropdowns; NextSteps on every page
- [x] Legacy components, pages, media and unused packages removed (bundle ~1.5 MB → ~1.0 MB)

### Phase 3: SEO / AI indexing
- [x] `seo-config.mjs` for every route (titles, descriptions ≤155, Service/FAQPage/SoftwareApplication/Article/DefinedTermSet/ItemList JSON-LD; FAQs parsed from content files)
- [x] Redirects in `vercel.json` (/services → /capabilities, /inclever → /products/inclever) + client-side `<Navigate>`
- [x] `llms.txt`, manifest, icons, new 1200×630 `og-image.png`
- [ ] Per-page OG images (currently one shared image)
- [x] SEO entries for the four new routes (Article + FAQPage on /context-engineering; Article with verified citations on /insights; CollectionPage on /resources); llms.txt updated
- [ ] Switch production `deploy.yml` packaging to `node scripts/vercel-output.mjs` **at launch** (else redirects won't apply in prod)

### Phase 4: QA
- [x] `VITE_SITE_ENV=staging npm run build`: **45 ok, 0 warn, 0 failed**; all routes have `<noscript>`; sitemap 42 URLs; RSS 7
- [x] Production-mode check: no verify badges, unverified stats hidden, one h1 per page, no runtime errors
- [ ] Forms tested end to end on staging (assessment form, contact, demo request, referral)
- [ ] Full anti-slop pass by a human reviewer on staging
- [x] Responsive pass (2026-11-22): every route audited at 320/375/414/768/1024 for horizontal overflow (0 remaining), tap targets (≥40px or enlarged invisible hit areas), and iOS input zoom (form text 16px on phones). Phones get a compact header with a Book button, a full-screen booking dialog and a taller calendar.
- [ ] Lighthouse + accessibility pass; code-split routes with React.lazy (check prerender still waits for content)

## 6b. Open content items for the team (all badged on staging, hidden in production)

- Founder review of the checklist PDF (`src/content/checklist.json`, draft v0.1).
- Proof strip figures, certified/partner list, "Offices in the United States and India", founder credentials.
- Founder quote: her draft is shown verbatim (uses banned words); she's rewriting it. Headshot + team photos (December shoot). Should Mohan Gowda T appear in the delivery bench?
- Capabilities to verify: MDM, ontologies, knowledge graphs, MCP, vector DBs; every tool in `src/content/tools.ts` is `verified: false`.
- Context Engineering proof (EMEA canonical model reframed as Contextualize) and a Contextualize/Enable case study. Until then those steps have no case-study filter.
- Case study headline values that are labels, not results (capital-equipment, vc-edtech, cultural-heritage, pharma-mnc, solar-bi): need measured figures from delivery leads.
- Learn articles cite Cognizant, Gartner (D&A Summit 2026) and Cloudera/HBR figures from the brief: add source links or remove.
- IncLever "how it runs" wording (in tenant, read-only); external demo link (claude.ai artifact) must be public.
- PipelineIQ status line, "368 raw alerts" metric, first-deployment findings: confirm OK to publish.
- Careers: "Remote-first" wording vs the Bengaluru delivery base; careers email; hiring timing.
- Proposed blocks in `src/content/flags.ts` need founder sign-off (all on for staging).
- **Insights figures** (`src/content/insights.ts`): 29 sourced figures, all `verified: false`. Open each `url` (and `primaryUrl` where given) and set `verified: true`. Until then production shows the page without figures. Gartner's "two-thirds" may be 63% on gartner.com.
- **PipelineIQ in the Solutions menu:** owner's call, founder sign-off pending.
- **Client logos** (`src/content/clients.ts`, files in `public/clients/`): 8 fetched from the companies' own sites (Revlon, Rotimatic, Duroflex, Cocoblu, Kanoria/KCIL, Tarasafe, Masoom, Golden Sands). Logo files still needed for Examly, GDi Partners, VSM Technologies, Noble Bioresources (official sites couldn't be identified/reached). All `verified: false` until each client's written permission is on file.
- **Testimonials** (`src/content/testimonials.ts`): all three are PLACEHOLDERS written for layout. Replace with approved quotes before launch (hidden in production until then).

## 6c. Known technical notes

- Commit `3222345` imports page files that only arrive in later commits (doesn't build on its own); every later commit builds.
- `src/data/caseStudies.ts` still imports the old case images (not rendered); remove the `image` field and imports when convenient (seo-config regex doesn't use it).
- Lint: remaining errors are pre-existing (`tailwind.config.ts` require, two shadcn `ui/` files).
- Vercel custom events (`assessment_open`, `assessment_submit`) are only recorded on paid plans.

## 7. Change log

| Date | Commit(s) | What |
|---|---|---|
| 2026-11-21 | `10a5f73` | Setup: assets, tracker, design notes, contributing |
| 2026-11-21 | `0254853` | Design system, booking dialog, home, capability pages |
| 2026-11-21 | `3222345` | SEO: capability routes, redirects, schema, llms.txt, OG image |
| 2026-11-21 | `3f38262` | Assessment + products |
| 2026-11-21 | `fdc0a76` | Case studies + industries |
| 2026-11-21 | `0d5369e` | About, learn, contact |
| 2026-11-21 | `0d9a5dc` | Insights, thesis, careers, referral, legal, 404 |
| 2026-11-21 | `254019f` | SEO for all new pages, CTA analytics, CLAUDE.md |
| 2026-11-21 | `cba74ef` | Legacy cleanup |
| 2026-11-22 | PR #12 | Founder CTA update: calendar-first booking, 3 questions, checklist PDF + instant download, reassurance line |
| 2026-11-22 | PR #14 | Live Calendly embed (UTM-tagged), booking → /assessment/thank-you with the three questions (conversion page) |
| 2026-11-22 | PR #15 | Mobile and responsive pass across all pages |
| 2026-11-22 | PR #16 | Client logos and placeholder testimonials; new loading screen; 'Trusted by' as its own black band |
| 2026-11-22 | PR #17 | Client logos as an edge-to-edge infinite scroll (pauses on hover, static for reduced motion) |
| 2026-11-22 | PR #21 | Product pages: PipelineIQ and IncLever rebuilt as stories with interactive chapters; PipelineIQ demo clip on product and Solutions pages |
| 2026-11-22 | PR #19 | Navigation restructure: dropdowns, /context-engineering, /insights, /resources, /readiness-checklist, Solutions hub, interactive Learn, flow check |
