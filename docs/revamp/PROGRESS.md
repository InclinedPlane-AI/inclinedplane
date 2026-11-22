# Website revamp: progress tracker

**Read this first when you pick up the revamp in a new session.** It records what
is finished, what is in progress, what is left, and every decision already made,
so nobody re-does or re-litigates work. Update it in the same commit as the work
it describes.

Last updated: 2026-11-22 (session 2: founder's CTA update)

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
| Staging deploy | `.github/workflows/deploy-staging.yml`: push to `revamp` → staging; PR → preview URL comment. Vercel project `inclinedplane-staging` in the **same Vercel account as production**, created on first run with the existing secrets. All staging responses are `noindex`. |
| Lovable | Retired (user, 2026-11-21). No more direct writes to `main`. |
| Old personal preview | `inclinedplane-lac.vercel.app` (user's personal Vercel Hobby account). Retire once staging is live. |

### Blocked on a human (do these, then tick)

- [ ] **Grant `workflow` scope to the GitHub CLI** so workflow files can be pushed:
      `gh auth refresh -h github.com -s workflow`. Until then, the two
      workflow commits sit on the local branches `fix/ci-pin-ubuntu-24` and
      `ci/staging-workflow` (unpushed).
- [ ] Then push the CI fix and open its PR to `main` (production deploys have failed since 16 Nov 2026
      because `ubuntu-latest` moved to 26.04; PR #9 content is not live).
- [ ] Then push `ci/staging-workflow` → PR into `revamp` → merge. The first run creates the staging project.
      If it fails with "Could not link/create Vercel project", the `VERCEL_TOKEN`
      secret is project-scoped: create an account-scoped token at
      vercel.com/account/tokens and run `gh secret set VERCEL_TOKEN -R InclinedPlane-AI/inclinedplane`.
- [ ] Add the two engineers to the GitHub org with write access (start Monday 2026-11-23).
- [ ] Protect `main` (PR + 1 approval) now that Lovable is retired.
- [ ] After staging is live, add the staging build as a required status check on `revamp`.
- [ ] Replace placeholder booking links in `src/content/site.ts` (`booking.calendlyUrl`).

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
- [x] /products, /products/inclever, /products/pipelineiq
- [x] /case-studies (filterable) + /case-studies/:slug template
- [x] /industries
- [x] /about
- [x] /learn + 3 explainers + glossary
- [x] /blog (Insights) + posts, /thesis
- [x] /contact, /careers, /referral, legal pages, 404
- [x] Legacy components, pages, media and unused packages removed (bundle ~1.5 MB → ~1.0 MB)

### Phase 3: SEO / AI indexing
- [x] `seo-config.mjs` for every route (titles, descriptions ≤155, Service/FAQPage/SoftwareApplication/Article/DefinedTermSet/ItemList JSON-LD; FAQs parsed from content files)
- [x] Redirects in `vercel.json` (/services → /capabilities, /inclever → /products/inclever) + client-side `<Navigate>`
- [x] `llms.txt`, manifest, icons, new 1200×630 `og-image.png`
- [ ] Per-page OG images (currently one shared image)
- [ ] Switch production `deploy.yml` packaging to `node scripts/vercel-output.mjs` **at launch** (else redirects won't apply in prod)

### Phase 4: QA
- [x] `VITE_SITE_ENV=staging npm run build`: **45 ok, 0 warn, 0 failed**; all routes have `<noscript>`; sitemap 42 URLs; RSS 7
- [x] Production-mode check: no verify badges, unverified stats hidden, one h1 per page, no runtime errors
- [ ] Forms tested end to end on staging (assessment form, contact, demo request, referral)
- [ ] Full anti-slop pass by a human reviewer on staging
- [ ] Lighthouse + accessibility pass; code-split routes with React.lazy (check prerender still waits for content)

## 6b. Open content items for the team (all badged on staging, hidden in production)

- Calendly event URL (one 45-minute event type on the free plan) → `src/content/site.ts` `booking.calendlyUrl`, set `calendarConfigured: true`.
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
| 2026-11-22 | (PR `feat/booking-flow-v2`) | Founder CTA update: calendar-first booking, 3 questions, checklist PDF + instant download, reassurance line |
