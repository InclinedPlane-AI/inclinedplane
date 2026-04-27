## Goal

Replicate the McKinsey case study layout for case study **#01 — Retail & Manufacturing Chain**:
- Open in its **own page** (not a modal)
- **Glass video hero** at the top (using the provided MP4)
- A McKinsey-style **section navigation** ("The opportunity", "The solution", "The impact") that smooth-scrolls to those sections
- Same typography, spacing rhythm and structure as the McKinsey reference

The other 12 case studies keep the current modal behavior for now.

## What the user will see

1. On `/case-studies`, clicking card **#01** navigates to a new page `/case-studies/retail-manufacturing-chain`.
2. The new page opens with a full-bleed **video hero** (looping, muted, autoplay) overlaid with:
   - Eyebrow pill: `Case Study · 01 · Retail & Manufacturing`
   - Large headline: the case study title
   - Short subtitle drawn from the summary
   - Two CTAs: "Read the full story" (scrolls to first section) and "Talk to us" (→ /contact)
3. Below the hero, a **sticky section nav** appears with three pills:
   - The Opportunity
   - The Solution
   - The Impact
   Clicking any pill smooth-scrolls to that section; the active section's pill is highlighted as the user scrolls.
4. Three full sections follow, each with a number, label, large heading, body copy, and supporting bullets/metrics — matching McKinsey's generous spacing and serif/sans hierarchy already used on the site.
5. A closing CTA block ("Ready to build your success story?") and a back link to all case studies.

## Content mapping for #01

The existing data only has one bullet section. Re-shape into the three McKinsey buckets (no copy invented — derived from the existing summary + bullets):

- **The Opportunity** — Manual reporting drained 30% of senior personnel's time; dealer intelligence, scheme rollout and attrition were managed reactively.
- **The Solution** — Real-time reporting across Sales/Marketing, Inventory and Production; dealer intelligence at point of engagement; automated scheme implementation; market basket analysis; dealer attrition prediction model.
- **The Impact** — 30% of reporting time freed, sharper dealer conversations, faster scheme rollout, improved sell-through, proactive retention before revenue loss.

The existing card on `/case-studies` keeps its image, title, summary and metric.

## Technical changes

**New files**
- `src/components/case-study/CaseStudyVideoHero.tsx` — adapted from the provided `glass-video-hero.tsx` snippet. Uses the supplied CloudFront MP4, glass pill, headline, subtext, two CTAs. Removes the fit/full-bleed toggle (not needed in our context). Styled with existing tokens (`text-gradient-orange`, `glass-panel`, `bg-gradient-orange`).
- `src/components/case-study/SectionNav.tsx` — sticky pill nav with smooth-scroll + IntersectionObserver-based active state.
- `src/pages/CaseStudyDetail.tsx` — the new full-page layout (hero → nav → 3 sections → CTA). Uses `PageLayout`, `SEOHead`, framer-motion for section reveals.
- `src/data/caseStudyDetails.ts` — structured "opportunity / solution / impact" content for #01 only (extensible for the rest later).

**Edited files**
- `src/App.tsx` — add route `/case-studies/:slug` → `CaseStudyDetail`.
- `src/pages/CaseStudies.tsx` — for case study `id === "retail-manufacturing-chain"`, render the card as a `Link` to `/case-studies/retail-manufacturing-chain` instead of opening the modal. All other cards keep current modal behavior.

**Dependencies** — none new. `lucide-react`, `framer-motion`, `react-router-dom` are already installed.

**Video** — uses the URL from the snippet:
`https://d8j0ntlcm91z4.cloudfront.net/...d87182fb-b0af-4273-84d1-c6fd17d6bf0f.mp4`
Attributes: `autoPlay muted loop playsInline preload="metadata"` with the existing case image as `poster` for fast first paint and graceful fallback.

**SEO** — `SEOHead` with case-study title, summary as description, `ogImage` from the case image, `CaseStudy` JSON-LD (mirrors what `CaseStudies.tsx` already does for the modal view).

## Out of scope (for this round)
- Building dedicated pages for case studies #02–#13 (they keep modals).
- Any change to the video asset itself.
- Sitemap regeneration for the new route (can follow up).

Once approved, I'll implement the above end-to-end.