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
| `/products` | Product hub | Kept, restyled | Existing URL; hub for both products |
| `/products/inclever` | IncLever page | Kept, restructured to brief 7.4 | Existing URL ranks; `/inclever` 301s here |
| `/inclever` | (none) | **301 → `/products/inclever`** | Short URL for nav/outbound |
| `/products/pipelineiq` | PipelineIQ page | Kept, restyled; not in main nav | Brief: PipelineIQ is proposed, stays off main nav |
| `/assessment` | (none) | New: the assessment page with both booking paths | Primary conversion page; every CTA can deep-link |
| `/case-studies`, `/:slug` | 14 cases, dark heroes | Kept URLs, new index + template | Protect URLs; restructure to Opportunity/Solution/Impact |
| `/industries` | Route disabled | Re-enabled: 5 ICP industries, manufacturing first | Brief 7.8; financial services removed |
| `/learn`, `/learn/:slug` | (none) | New explainers (3 to start) | AI-assistant citation + search (brief 6.3) |
| `/blog`, `/blog/:slug` | Blog | Kept URLs, labeled "Insights" in UI | Protect URLs; brief's "insights" naming in nav only |
| `/thesis` | Long manifesto | Kept, restyled | Rationale: reuse its strongest lines |
| `/about`, `/contact`, `/careers`, `/referral` | | Kept, restyled | Contact + referral forms preserved |
| `/privacy`, `/terms`, `/cookies` | | Kept, restyled, noindex | |
| `/platforms`, `/security`, `/trust-layer` | (none) | **Not built yet** | Platforms content lives in the tools section of home + capability pages for now. Security/trust-layer are proposed pages awaiting founder sign-off |

Main nav (founder's): Context Engineering · AI Readiness · Capabilities · IncLever · Case studies · About · **Book an assessment**.
Footer carries Industries, Insights, Learn, Products, Careers, Contact, legal.

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

### Booking
- **Dialog with two paths** (form → optional calendar, or calendar now). The form keeps leads qualified (founder's rationale); the calendar path removes friction for warm prospects. The Calendly script loads only when that tab opens.
- Also available as a full page at `/assessment` (crawlable, linkable from outbound).
- `?book=1` on any URL opens the dialog (for outbound emails/LinkedIn).

### Case studies
- Home features two (founder's choice), large. Index: featured pair on top, then a filterable list (step + industry). Cards show title, industry, step tags, one headline result. No numbered markers (anti-slop).
- Step tags per case study are editorial calls, listed in `src/content/caseStudyMeta.ts` for delivery leads to correct.

### Removed from the old site
- Chat widget ("Hey!" placeholder bot), splash-style dark aesthetic, aurora/glow/orbital/three.js decoration on marketing pages, the six "layer" names, generic industry statistics, the simulated pipeline dashboard.

## 4. Needs founder sign-off (proposed blocks, toggled in `src/content/flags.ts`)

| Flag | Default on staging | What it shows |
|---|---|---|
| `agentNeutrality` | on | "Copilot, Genie, Claude or ChatGPT: we make the agent you choose work on your data." + Agent fit block on Enable |
| `twoTierAssessment` | on | Free 45-min conversation + paid fixed-scope assessment on `/assessment` |
| `runService` | on | "Keep it ready" run service block |
| `pipelineIQ` | on | PipelineIQ alongside IncLever as "the trust layer" (not in main nav) |
| `leadVertical` | on | Manufacturing and distribution first on Industries |

## 5. Verify before launch (all wrapped as `verified: false`)

Proof strip: 20+ agents · 550+ TB · 600+ dashboards · 40+ countries · 2 to 6 weeks ERP onboarding.
Footer: "Offices in the United States and India". Certified/partner badges. Capabilities and tools:
MDM, business ontologies, knowledge graphs, Purview, Databricks Genie, Copilot in Fabric,
Fabric semantic models, dbt Semantic Layer, MCP, vector databases. CEO quote must be rewritten
in Keerthana's own words (current draft uses banned words, shown as placeholder).

## 6. Open questions

- Real Calendly/HubSpot booking URL (placeholder now).
- Keerthana's headshot + team photos (December shoot): placeholders until then.
- IncLever product screenshots (only the founder's demo clip is used now).
- A context engineering / AI readiness case study (biggest proof gap).
- AI crawler policy: current `robots.txt` allows them (kept).

## 7. Baseline (before revamp)

To record: Lighthouse mobile/desktop on production `/`, `/services`, `/case-studies`.
