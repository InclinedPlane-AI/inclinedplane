# Design notes: website revamp

Running log of design and structure decisions, options considered, and open
questions for the team. The brief asks for this file. Status and the task
checklist live in `docs/revamp/PROGRESS.md`.

> The repo is public. Never write client names, internal system names or
> unapproved figures here. Use anonymized descriptions.

---

## 1. Route map

| Route | Before | After | Why |
|---|---|---|---|
| `/` | Dark, animated slide home | Founder's light homepage, refined | Founder design is the base |
| `/capabilities` | (none) | Overview: full interactive incline | The four capabilities are the spine; buyers and AI assistants search "capabilities"/"services" |
| `/capabilities/data-engineering-governance` | (none) | Build | One page per pillar (founder open item) |
| `/capabilities/context-engineering` | (none) | Contextualize | Expanded capability, signature widget |
| `/capabilities/ai-agent-readiness` | (none) | Enable | Expanded capability, IncLever block |
| `/capabilities/agentic-analytics` | (none) | Activate | Payoff on top |
| `/services` | Six "layer" service page | **301 → `/capabilities`** | Layer names retired by founder; one concept, one URL |
| `/context-engineering` | (none) | **New (2026-11-22):** the general explainer, first item in the main nav | What it is, data modelling, ontology, the layers, interactive demos; ends on Solutions. The Contextualize pillar now covers delivery only, so the two don't compete in search |
| `/products` | Product hub | Kept URL, labeled **"Solutions"** (2026-11-22): both products briefed on top, then each demo in full | Protect the ranking URL; the nav label matches what buyers look for |
| `/products/inclever` | IncLever page | Kept, restructured to brief 7.4 | Existing URL ranks; `/inclever` 301s here |
| `/inclever` | (none) | **301 → `/products/inclever`** | Short URL for nav/outbound |
| `/products/pipelineiq` | PipelineIQ page | Kept, restyled; not in main nav | Brief: PipelineIQ is proposed, stays off main nav |
| `/assessment` | (none) | New: the assessment page with both booking paths | Primary conversion page; every CTA can deep-link |
| `/case-studies`, `/:slug` | 14 cases, dark heroes | Kept URLs, new index + template | Protect URLs; restructure to Opportunity/Solution/Impact |
| `/industries` | Route disabled | Re-enabled: 5 ICP industries, manufacturing first | Brief 7.8; financial services removed |
| `/learn`, `/learn/:slug` | (none) | Interactive explainers (context layers, ontology explorer, readiness simulator) + glossary | AI-assistant citation + search (brief 6.3) |
| `/learn/what-is-context-engineering` | (new in revamp) | **301 → `/context-engineering`** | Merged into the explainer page |
| `/insights` | (none) | **New:** industry figures by theme, each linked to its source; what leaders do about it | Brief §2.1 allows sourced industry figures on explainer pages (never home) |
| `/resources` | (none) | **New:** hub for the Resources menu | The menu label always lands on a real page |
| `/readiness-checklist` | (dialog only) | **New:** all 16 checks with a live score, plus the PDF download | Indexable lead magnet; the dialog still works |
| `/blog`, `/blog/:slug` | Blog | Kept URLs, labeled **"Blog"** (was "Insights" until 2026-11-22; Insights is now `/insights`) | Protect URLs |
| `/thesis` | Long manifesto | Kept, restyled | Rationale: reuse its strongest lines |
| `/about`, `/contact`, `/careers`, `/referral` | | Kept, restyled | Contact + referral forms preserved |
| `/privacy`, `/terms`, `/cookies` | | Kept, restyled, noindex | |
| `/platforms`, `/security`, `/trust-layer` | (none) | **Not built yet** | Platforms content lives in the tools section of home + capability pages for now. Security/trust-layer are proposed pages awaiting founder sign-off |

Main nav (restructured by Mohan's team, 2026-11-22): **Context Engineering · Capabilities ▾ · Solutions ▾ · Resources ▾ · About · Contact · Book an assessment**.
Footer: Capabilities (incl. the explainer), Solutions, Resources, Company, legal. See §3 "Navigation".

## 2. Design system (extracted from the founder's homepage)

| Token | Value | Notes |
|---|---|---|
| `--ip-orange` | `#F47920` | Actions, Contextualize/Enable, small accents. Never small text on white |
| `--ip-orange-ink` | `#A84F0E` | Only orange allowed for text (5.5:1 on white, 5.1:1 on #F5F5F5) |
| `--ip-orange-tint` | `#FDEBDD` | Highlight surfaces |
| `--ip-black` | `#000000` | Activate, headings, dark moments |
| `--ip-ink` | `#000000` / `--ip-body` `#3D3D3D` | Body text #3D3D3D on white ≈ 10.9:1 |
| `--ip-muted` | `#555555` | Secondary text ≈ 7.5:1 |
| `--ip-grey-50` | `#F5F5F5` | Build step, alternating sections |
| `--ip-rule` | `#E4E4E5` / strong `#D1D2D4` / dashed `#A7A9AC` | Thin dividers |
| Radius | 4px pills/inputs-small, 6px buttons/inputs, 8–12px frames | Hierarchy, not one radius |
| Type | Google Sans Flex 400–700 (variable); IBM Plex Mono for section labels only | Headlines −0.02 to −0.03em tracking, 1.02–1.1 leading |
| Width | 1240px max, `clamp(16px, 4vw, 40px)` gutters | From founder file |

Hover: `a:hover` colour `#5A2A06` (founder file), underline offset change; no lift-and-shadow.
Motion: one orchestrated moment per page (home: the incline rising). 150–300ms interaction
transitions; `prefers-reduced-motion` respected.

## 3. Decisions and options considered

### The incline (signature element)
- **A. Rising bar steps (founder's)**: four blocks of increasing height. Chosen: it's the founder's, reads instantly, no decoding.
- B. A literal sloped plane with steps as notches: more "clever", but harder to read on mobile and duplicates the logo's slant.
- C. Horizontal timeline: reads as a strict sequence, contradicting "recommended order, not a strict sequence". Rejected.
- Refinement: on `/capabilities`, steps are buttons (tabs); selecting one reveals scope, deliverables and related case studies. On capability pages a small incline shows the current step lit.

### Booking (updated 2026-11-22 to the founder's revised homepage)
- **Calendar first.** Every "Book an assessment" CTA opens the dialog with the founder's Calendly event embedded inline (`calendly.com/keerthana-inclinedplane/ai-data-readiness-assessment`), which collects name + work email. Calendly's own header is hidden (our dialog shows title and duration); each booking carries `utm_source=website`, `utm_medium=cta`, `utm_content=<button>` so the Calendly booking shows which CTA it came from.
- **Thank-you page on our domain.** When the embed posts `calendly.event_scheduled` (free plan, no webhook), the site navigates to `/assessment/thank-you`: "You're booked", what happens next, and the three *optional* questions (role, main data platform, biggest blocker) plus the email used to book, posted to Formspree with the Calendly event/invitee IDs. Every booking is a page view on our domain, so conversions are countable in Vercel Web Analytics (page views are free; custom events need a paid plan). Not indexed, not in the sitemap.
- **Bookings made outside the site** (someone opens the Calendly link from an email) still see Calendly's confirmation. Optional: in Calendly's event settings, set the confirmation page to redirect to `https://inclinedplane.com/assessment/thank-you` with "pass event details" on (may need a paid Calendly plan; only useful after launch, since that URL only exists on production then). The page pre-fills from Calendly's `invitee_email` / `invitee_full_name`.
- **Fallback:** "Can't find a time? Send us your details instead" → name, email, the three questions, a note → Formspree.
- **Second offer for people not ready to talk:** the one-page *AI data readiness checklist* (draft v0.1, `src/content/checklist.json` → `public/downloads/…pdf` via `scripts/build-checklist-pdf.mjs`). Work email → Formspree lead → instant download. Entry points: mid-page band, /assessment, footer, thank-you page, `?checklist=1`.
- Founder's reassurance line "Free · 45 minutes · on your own data" under the hero, final CTA, capability heroes and the /assessment booking block.
- Rejected: form-first then redirect to Calendly (puts friction before the calendar, which the founder removed); Calendly's popup widget snippet (can't hand back to our flow); HubSpot (not needed).
- `?book=1` opens the booking, `?checklist=1` the checklist; `?name=&email=&role=&platform=&blocker=` prefill.

### Case studies
- Home features two, as wide panels: title, an anonymized context line, four key numbers, step tags, and a source-to-outcome flow diagram on the right. Index: the same featured pair on top, then a filterable list (step + industry). No numbered markers (anti-slop).
- Featured since 2026-11-22: the EMEA multi-ERP platform (FTSE-listed UK industrial group) and the governed finance semantic layer with IncLever, chosen by Mohan's team. The second is the first case study that proves Contextualize and Enable.
- One engagement, one page: when a richer write-up arrives for work already on the site, it replaces the old page at the same URL rather than adding a duplicate.
- Step tags per case study are editorial calls, listed in `src/content/caseStudyMeta.ts` for delivery leads to correct.

### Client logos ("Trusted by")
- Own black band right after the homepage proof strip (and on /case-studies), heading "Companies we've engineered data foundations for."
- Logos scroll edge to edge in an infinite loop (owner's request, 2026-11-22). This is a deliberate second motion moment beside the incline; it stays calm (~3.6s per logo), pauses on hover/focus, uses only transform, and becomes a static wrapped row for reduced-motion users. Logos are uniform white marks; the duplicate loop copy is hidden from screen readers.
- All 12 logos confirmed for publication by Mohan's team (2026-11-22). New logos start unverified (hidden in production) until permission is on file.

### Product pages (2026-11-22)
- Each product page is told as a story with numbered chapters and a sticky chapter nav. PipelineIQ's spine is the four questions after a failed night, with "what failed" live today and the rest marked In development / Planned; IncLever's is check → define → answer → keep watch.
- One interactive piece per chapter, each explaining something real (brief §9): debug trail, signature collapse, adaptive thresholds and SQL guard for PipelineIQ; two assistants, readiness certificate and question flow for IncLever. All labeled sample data; all content in the HTML.
- Demo clips loop muted, play only while on screen, have a pause button (WCAG 2.2.2) and don't autoplay for reduced-motion users.

### Navigation and page flow (2026-11-22, Mohan's team)
- **Problem:** "Context Engineering", "AI Readiness" and "Capabilities" all led to the same four pillar pages; IncLever sat alone in the nav; case studies, learn and insights were scattered.
- **Nav:** Context Engineering (the concept) · Capabilities ▾ (four pillars + Learn) · Solutions ▾ (IncLever, PipelineIQ: brief, "How it works", "See the demo") · Resources ▾ (Case studies, Industries, Learn, Insights, Blog, Thesis, Readiness checklist) · About · Contact, plus the Book button. Dropdowns are full-width panels on hover/focus; the label still links to its hub page; a chevron button opens it for keyboard/touch, Escape closes. Phones get an accordion. Contents: `src/components/site/NavMenus.tsx`.
- **"AI Readiness" left the nav;** its page stays as the Enable pillar.
- **Concept vs delivery:** `/context-engineering` explains the idea; `/capabilities/context-engineering` is how we deliver it. One links to the other.
- **No dead ends:** every page ends with a `NextSteps` block (or equivalent onward links). `scripts/check-flow.mjs` runs after prerender and fails the build on a page whose content links nowhere, or an indexable page nothing links to.
- **Journey:** Home → Context Engineering → Capabilities → a pillar → Solutions → Case studies → Book.
- **PipelineIQ in the Solutions menu** goes against brief §7.5 ("unlinked from main nav until approved"): owner's call on 2026-11-22; Keerthana's sign-off still needed (flag `pipelineIQ`).
- Rejected: `/solutions` URLs with 301s (loses the ranking `/products` URLs for a label change).

### Removed from the old site
- Chat widget ("Hey!" placeholder bot), splash-style dark aesthetic, aurora/glow/orbital/three.js decoration on marketing pages, the six "layer" names, generic industry statistics, the simulated pipeline dashboard.

## 4. Needs founder sign-off (proposed blocks, toggled in `src/content/flags.ts`)

| Flag | Default on staging | What it shows |
|---|---|---|
| `agentNeutrality` | on | "Copilot, Genie, Claude or ChatGPT: we make the agent you choose work on your data." + Agent fit block on Enable |
| `twoTierAssessment` | on | Free 45-min conversation + paid fixed-scope assessment on `/assessment` |
| `runService` | on | "Keep it ready" run service block |
| `pipelineIQ` | on | PipelineIQ alongside IncLever as "the trust layer"; also in the Solutions menu since 2026-11-22 |
| `leadVertical` | on | Manufacturing and distribution first on Industries |

## 5. Verify before launch (all wrapped as `verified: false`)

Proof strip: 20+ agents · 550+ TB · 600+ dashboards · 40+ countries · 2 to 6 weeks ERP onboarding.
Certified/partner badges. (Footer office line and all client logos confirmed 2026-11-22.) Capabilities and tools:
MDM, business ontologies, knowledge graphs, Purview, Databricks Genie, Copilot in Fabric,
Fabric semantic models, dbt Semantic Layer, MCP, vector databases. CEO quote must be rewritten
in Keerthana's own words (current draft uses banned words, shown as placeholder).

## 6. Open questions

- Formspree's free plan has a monthly submission cap shared by contact, assessment answers, checklist downloads and demo requests: watch it.
- Founder review of the checklist PDF (draft v0.1).
- Keerthana's headshot + team photos (December shoot): placeholders until then.
- IncLever product screenshots (only the founder's demo clip is used now).
- A context engineering / AI readiness case study (biggest proof gap).
- AI crawler policy: current `robots.txt` allows them (kept).

## 7. Baseline (before revamp)

To record: Lighthouse mobile/desktop on production `/`, `/services`, `/case-studies`.
