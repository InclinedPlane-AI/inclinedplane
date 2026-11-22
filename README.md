# InclinedPlane website

**Data Engineered. Intelligence Deployed.**

| | |
|---|---|
| Production | https://www.inclinedplane.com (branch `main`) |
| Staging (the redesign) | https://inclinedplane-staging.vercel.app (branch `revamp`, not indexed by search engines) |
| Pull request previews | A link is posted as a comment on every PR into `revamp` |

This repository is the marketing website for **InclinedPlane** (formerly Sail
Analytics). The `revamp` branch holds a full redesign built on the founder's
homepage design and the website brief. This README explains the business
direction behind it, how the site is organized, how to review it, and how to
work on it.

> **Reviewers:** start with [What to look for when reviewing](#what-to-look-for-when-reviewing).
> **Engineers:** start with [Working on the site](#working-on-the-site) and `CONTRIBUTING.md`.
> **Picking up the redesign in a new session:** read `docs/revamp/PROGRESS.md` first.

---

## Contents

1. [The business in one page](#the-business-in-one-page)
2. [What the redesign changes, and why](#what-the-redesign-changes-and-why)
3. [Site map](#site-map)
4. [The design system](#the-design-system)
5. [How visitors become conversations](#how-visitors-become-conversations)
6. [Claims, proof and verification markers](#claims-proof-and-verification-markers)
7. [Search engines and AI assistants](#search-engines-and-ai-assistants)
8. [What to look for when reviewing](#what-to-look-for-when-reviewing)
9. [Working on the site](#working-on-the-site)
10. [How the build and deploys work](#how-the-build-and-deploys-work)
11. [Adding and changing content](#adding-and-changing-content)
12. [Repository map](#repository-map)
13. [Status and open items](#status-and-open-items)

---

## The business in one page

**What we do.** InclinedPlane is a data engineering and AI readiness firm. We
modernize enterprise data platforms on the stack a client already has
(Microsoft Azure and Fabric, Databricks, AWS, Snowflake), then make the data
trusted, contextualized and ready for AI agents.

**Who it's for.** CIOs, CDOs, CISOs and heads of data at mid-to-large
enterprises in the US, UK and Europe, with a delivery base in Bengaluru,
India. Lead industries: manufacturing and distribution (multi-ERP estates),
FMCG, energy and utilities, logistics and supply chain, retail.

**The thesis.** Enterprise AI agents fail in production because they lack
*business context*, not because the models are weak. For thirty years the
consumer of enterprise data was a human analyst who carried missing meaning
in their head: intercompany sales are excluded, a distributor counts as a
customer, "last quarter" means the fiscal quarter. The new consumer is an AI
agent that knows none of this. Meaning now has to be explicit, governed and
machine-readable. That is the work.

**Where we sit.** *Below the agent, above the platform.* We don't compete with
platform features (Fabric, Databricks, Snowflake now ship context tooling); we
implement them and supply what they can't: the business meaning across a
client's ERPs and operating companies, and the routine that keeps it current.
We stay neutral about which AI agent a client chooses.

**The four capabilities, on one path.** Drawn on the site as rising steps (a
literal inclined plane, which is where the name comes from). A recommended
order, not a strict sequence.

| Step | Capability | Role | Color |
|---|---|---|---|
| Build | Data Engineering and Governance | The foundation underneath | Light grey |
| Contextualize | Enterprise Context Engineering | Expanded: our clearest differentiator | Orange |
| Enable | AI and Agent Readiness (accelerated by IncLever) | Expanded: our clearest differentiator | Orange |
| Activate | Agentic Analytics and BI | The payoff on top | Black |

**Our own products** are accelerators, not a platform pitch: **IncLever**
(data readiness checks, context and governed analytics) and **PipelineIQ**
(pipeline monitoring and ETL debugging). "With or without IncLever, the
expertise is the same. It simply gets you there faster and keeps watch
afterward."

**The name.** An inclined plane is the simplest machine for moving heavy
loads with less effort. Data has gravity; we provide the leverage.

**One next step everywhere:** *Book an AI Data Readiness Assessment*: free,
45 minutes, on the visitor's own data.

---

## What the redesign changes, and why

The previous site's content was largely sound; its problem was clarity. The
message was spread out, service names ("six layers") had to be decoded, and a
dark, effects-heavy design didn't carry the positioning. The redesign keeps
what worked and rebuilds the rest around one message.

| Before | After |
|---|---|
| Dark theme with glass, aurora, orbital and 3D effects | The founder's light, restrained design: one memorable moment per page |
| Six "layer" service names | Four named capabilities on one path, one page each |
| "Book a discovery call" on /contact | One action everywhere: the AI Data Readiness Assessment, plus a free checklist for visitors not ready to talk |
| Generic industry statistics, unverifiable figures | Only claims tied to delivered work; unconfirmed items are flagged and hidden in production |
| Case studies behind video and stock-photo heroes | Outcome-led case studies with plain results and capability tags |
| Placeholder chatbot | Removed |
| One 1.5 MB JavaScript bundle and ~40 MB of unused media | About 1.0 MB, legacy components and media removed |

**Inputs.** The founder's homepage design (the visual base), the website brief
(messaging, voice, claims policy, page specs) and the brand logo files. The
brief and founder notes are kept outside this public repository; the
decisions they produced are recorded in `DESIGN_NOTES.md`.

**What is fixed and what is flexible.** The founder's confirmed messaging
(headline, tagline, supporting line, the four capability names, the CTA
wording), the brand colors and typeface, and the claims policy are fixed.
Layouts and section structure are design decisions, recorded with their
reasoning in `DESIGN_NOTES.md`.

---

## Site map

| Route | Page |
|---|---|
| `/` | Home: hero, proof strip, the incline, Contextualize and Enable in depth, IncLever, supporting capabilities, tools, featured case studies, industries, CEO note, final CTA |
| `/capabilities` | The four capabilities, with an interactive incline (select a step to see scope, deliverables and related work) and the ways to engage |
| `/capabilities/data-engineering-governance` | Build |
| `/capabilities/context-engineering` | Contextualize, with the "same question, two answers" demo |
| `/capabilities/ai-agent-readiness` | Enable, with IncLever, the agent fit assessment and the "keep it ready" run service |
| `/capabilities/agentic-analytics` | Activate |
| `/assessment` | The AI Data Readiness Assessment: what it covers, a sample findings report, how it works, booking, FAQ |
| `/products`, `/products/inclever`, `/products/pipelineiq` | Our accelerators ("the trust layer: from pipeline to answer") |
| `/case-studies`, `/case-studies/:slug` | Featured pair, then every case study, filterable by capability and industry |
| `/industries` | Manufacturing and distribution first, then FMCG, energy, logistics, retail |
| `/learn`, `/learn/:slug` | Explainers (context engineering; ontology vs semantic layer vs knowledge graph; AI readiness) and a glossary |
| `/about` | What we do, the story, the name, principles, leadership |
| `/blog`, `/blog/:slug` | Insights: articles by the team |
| `/thesis` | Our long-form thesis |
| `/contact`, `/careers`, `/referral` | Contact form, open roles, employee referrals |
| `/privacy`, `/terms`, `/cookies` | Legal (not indexed) |

Renamed pages redirect permanently: `/services` → `/capabilities`,
`/inclever` → `/products/inclever`. Existing URLs are otherwise kept to protect
search rankings.

---

## The design system

Extracted from the founder's homepage. Full token table in `DESIGN_NOTES.md`.

- **Color.** Orange `#F47920` for actions, the two expanded capabilities and
  small accents, never for small text. Text orange is the darker `#A84F0E`
  (5.5:1 on white). Brand black for headings and the Activate step, light
  grey `#F5F5F5` for the Build step and alternating sections. Light
  background throughout; dark surfaces only for deliberate moments.
- **Type.** Google Sans Flex (self-hosted, variable). Small monospace section
  labels in IBM Plex Mono, a founder detail used sparingly and never numbered.
- **Layout.** 1240px grid, thin dividing lines instead of boxes and shadows,
  the interlocked "i" brand pattern used once on the homepage and once in the
  footer.
- **Motion.** One orchestrated moment per page (the homepage incline rises
  into place on first view). Everything else moves only in response to
  interaction, and respects reduced-motion settings.
- **No AI slop.** No icon-pack grids, stock photos, gradient washes,
  fade-up-on-every-section or filler copy. The brief's anti-slop checklist is
  in `CONTRIBUTING.md`.
- **Logos** (in `public/brand/`): the stacked primary logo in the header and
  footer, the inverse version on black, the "i" mark for icons. The master
  logo with the retired tagline "Data Leveraged. Growth Accelerated." is
  deliberately not used.

Components live in `src/components/site/`. Pages compose them; they don't
restyle them.

---

## How visitors become conversations

Every "Book an assessment" button opens the same dialog. The flow follows the
founder's design:

1. **Pick a time**: an embedded Calendly calendar that asks only for name and
   work email.
2. **Three optional questions**: role, main data platform, biggest blocker.
   They're sent to our form inbox (Formspree) with the booking's ID, so the
   team reads them before the call.
3. **You're booked.**

Visitors who can't find a slot can send their details instead. Visitors not
ready to talk can download the **one-page AI data readiness checklist**
(work email, then an instant PDF download), which offers the assessment
again at the end.

Everything runs on free tiers: Calendly's embed tells the page when a booking
is made (no webhooks), and Formspree receives the answers, checklist leads,
contact messages and demo requests. Links can open the dialog directly
(`?book=1`, `?checklist=1`) and pre-fill fields
(`?name=&email=&role=&platform=&blocker=`), which is useful for outbound email.

---

## Claims, proof and verification markers

AI assistants and search engines repeat whatever the site says as fact, so the
site publishes only claims tied to delivered, approved work.

- Every number, certification, office location, client reference or listed
  capability that hasn't been confirmed carries `verified: false` in
  `src/content/`.
- **On staging** these render with a red **"Verify before launch"** badge, so
  reviewers can see exactly what still needs sign-off.
- **In production builds** they are not rendered at all, and the build prints
  how many items were hidden.
- To approve an item, a human flips it to `verified: true`.

Proposed content blocks that need founder sign-off (agent neutrality, the
two-tier assessment, the run service, PipelineIQ alongside IncLever, the lead
vertical) can each be switched off in `src/content/flags.ts`.

Client confidentiality: no client names, internal system names or
architecture details appear without written client approval. Case studies are
anonymized.

---

## Search engines and AI assistants

The site is a React single-page app, but every route ships as full HTML so
crawlers that don't run JavaScript (GPTBot, ClaudeBot, PerplexityBot, link
previewers) read the complete page:

- Per-route titles, descriptions, canonical URLs and Open Graph tags.
- Structured data: Organization (with the former name), Service for each
  capability, SoftwareApplication for the products, Article for case studies,
  Learn articles and blog posts, DefinedTermSet for the glossary, FAQPage only
  where the FAQ is visible on the page.
- `sitemap.xml`, `rss.xml`, `robots.txt` (AI crawlers allowed) and `llms.txt`
  (a factual summary for AI assistants, verified facts only).
- Learn articles open with a one-sentence, quotable definition.

---

## What to look for when reviewing

Review on the staging link. The "Verify before launch" badges are expected
there.

1. **Message.** Within ten seconds of landing, can a CIO tell what we do, who
   it's for, that we've done it at scale, that we work on their existing
   stack, and what to do next?
2. **Founder's design.** Does each page feel like the same brand as the
   homepage? Anything that looks like a generic template is a bug.
3. **Voice.** Plain, specific, engineer-confident. No "unlock", "empower",
   "seamless", "cutting-edge", "transform" as filler, "solutions", or
   exclamation marks. US spelling.
4. **Claims.** Every badge is a decision someone owes: confirm it, correct it,
   or remove it. Nothing unbadged should be unverifiable.
5. **The flows.** Book an assessment from the header, the hero, the black band
   and the final section. Download the checklist. Try the "same question, two
   answers" demo on Context Engineering.
6. **Mobile.** Check at phone width: nothing should scroll sideways, and every
   button should be easy to tap.
7. **Accessibility.** Tab through a page: focus should always be visible and
   every control reachable by keyboard.

Leave feedback as comments on the PR or in the team channel, with the page URL
and a screenshot.

---

## Working on the site

```bash
git clone https://github.com/InclinedPlane-AI/inclinedplane.git
cd inclinedplane
git checkout revamp
npm ci
npm run dev                       # http://localhost:8080 (shows verify badges)

npx playwright install chromium   # once, for the full build
npm run build                     # Vite build + prerender; ends "45 ok, 0 warn, 0 failed"
VITE_SITE_ENV=staging npm run build   # same, but keeps verify badges (as staging does)
npm run lint
```

You don't need a Vercel account; deploys run in GitHub Actions.

**Branches.** `main` is production. `revamp` is the redesign. Do work on
`feat/<short-name>` branched from `revamp` and open a pull request into
`revamp` (one approval required). The redesign reaches production in one
reviewed PR from `revamp` into `main`. Details in `CONTRIBUTING.md`.

**Tech stack.** Vite 5, React 18, TypeScript, Tailwind CSS, Radix primitives
(shadcn/ui), react-router 6, Playwright (build-time prerender only), Vercel
hosting, GitHub Actions.

---

## How the build and deploys work

```
npm run build
  ├── vite build                        app bundle → dist/
  └── node scripts/prerender.mjs
        ├── HEAD PASS   per-route <title>, meta, canonical, Open Graph, JSON-LD
        ├── BODY PASS   headless Chromium renders every route; HTML saved into dist/
        └── SITEMAP + RSS
```

Vercel's own build machines can't run headless Chromium, so **Vercel never
builds this site.** GitHub Actions builds on an Ubuntu runner and uploads the
finished `dist/` with `vercel deploy --prebuilt`. Both projects live in the
company Vercel account; nothing deploys from a personal account.

| Trigger | Workflow | Destination |
|---|---|---|
| Push to `main` | `.github/workflows/deploy.yml` | Production (inclinedplane.com) |
| Push to `revamp` | `.github/workflows/deploy-staging.yml` | Staging (stable URL, `noindex`) |
| PR into `revamp` | `.github/workflows/deploy-staging.yml` | Preview URL commented on the PR |

`scripts/vercel-output.mjs` packages `dist/` for Vercel and carries the
redirects in `vercel.json` into the deploy (prebuilt deploys ignore
`vercel.json`). Both workflows are pinned to Ubuntu 24.04 because Playwright
1.55 can't install Chromium on newer runner images.

**At launch:** production's `deploy.yml` must switch its packaging step to
`node scripts/vercel-output.mjs` so the redirects apply in production.

The prerender pipeline's contracts (the `<!--SEO_HEAD-->` placeholder, the
`data-app-ready` / `data-prerendered` signals, the guarded scripts) are
documented in `CLAUDE.md`. Don't change them without reading it.

---

## Adding and changing content

Content lives in data files, not in components, so it can be verified,
toggled and extended without touching layouts.

| To change | Edit |
|---|---|
| Site copy, nav, footer, CTAs, booking settings (Calendly link) | `src/content/site.ts` |
| Proof strip numbers, certified platforms | `src/content/stats.ts` |
| The four capabilities (copy, deliverables, FAQs) | `src/content/capabilities.ts` |
| Tools and platforms | `src/content/tools.ts` |
| Proposed blocks on/off | `src/content/flags.ts` |
| Case study stories | `src/data/caseStudies.ts`, `src/data/caseStudyDetails.ts` |
| Case study titles, tags, featured flag, headline result | `src/content/caseStudyMeta.ts` |
| Industries | `src/content/industries.ts` |
| Learn articles and glossary | `src/content/learn.ts` |
| Assessment page, IncLever, PipelineIQ copy | `src/content/assessment.ts`, `inclever.ts`, `pipelineiq.ts` |
| Blog posts | `src/data/blogPosts.ts` |
| Readiness checklist PDF | `src/content/checklist.json`, then `node scripts/build-checklist-pdf.mjs` |

New blog posts, case studies, capabilities and Learn articles are picked up
by the prerender, sitemap and structured data automatically:
`scripts/seo-config.mjs` reads the same data files. A brand-new top-level
page needs a route in `src/App.tsx` and an entry in `scripts/seo-config.mjs`.
Keep the shape of the parsed data files (`id`, `title`, `industry`,
`summary` in order; `slug:` lines), because the parser relies on it.

---

## Repository map

```
src/
  content/            copy and data for the redesign (verified flags live here)
  components/site/    the design system: layout, header, footer, incline,
                      sections, booking dialog, page-specific blocks
  pages/              one file per route
  data/               case studies, blog posts, products (parsed by seo-config)
scripts/              prerender pipeline, SEO config, sitemap, RSS,
                      Vercel packaging, checklist PDF builder
public/               brand assets, fonts, downloads, robots.txt, llms.txt
docs/revamp/          PROGRESS.md: status, decisions, open items
DESIGN_NOTES.md       route map, design tokens, options considered, sign-off list
CONTRIBUTING.md       setup, branches, PR checklist
CLAUDE.md             pipeline contracts and context for AI coding assistants
```

---

## Status and open items

The redesign is complete on staging and in review. Before launch, the team
owes (all flagged on staging, hidden in production):

- The Calendly event link, and founder review of the checklist PDF.
- Confirmation of the proof-strip figures, partner and certification list,
  office line and the capabilities and tools listed.
- The founder's note in her own words, her headshot and team photos.
- A context engineering or AI readiness case study (the biggest proof gap),
  and measured results for the case studies that show labels instead.
- Sign-off on the proposed blocks in `src/content/flags.ts`.

The live checklist with owners and technical follow-ups (route code
splitting, Lighthouse pass, per-page share images) is in
`docs/revamp/PROGRESS.md`.

---

## License

Proprietary. Copyright InclinedPlane.
