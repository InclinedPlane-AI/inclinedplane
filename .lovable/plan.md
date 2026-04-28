# Case Study 08 — Anomalous Matter Hero

Wire up Case Study 08 ("Predictive Maintenance of EV Batteries", slug `ev-battery-predictive`) so it has the same detail-page structure as Case Study 12, but with the **Anomalous Matter Hero** (from `21st.dev/r/dhileepkumargm/anomalous-matter-hero`) replacing the GradientBlinds video hero. All existing copy is preserved verbatim.

## What you'll see

- Visiting `/case-studies/ev-battery-predictive` opens a full detail page (same layout as case study 12: Opportunity → Solution → Impact, sticky section nav, metrics strip, footer CTA).
- The hero section renders the Anomalous Matter (WebGL particle/shader) background instead of the gradient blinds.
- Centered "Case Study" eyebrow in orange, white headline, and the bouncing chevron-down arrow remain identical to case study 12.
- Content (eyebrow, title, subtitle, sections) is taken from the existing `caseStudies.ts` entry — nothing rewritten.

## Implementation

1. **Install the registry component**
   - Run: `npx shadcn@latest add https://21st.dev/r/dhileepkumargm/anomalous-matter-hero`
   - This drops the component file(s) into the project (typically under `src/components/ui/` per `components.json`).
   - Install any new deps it pulls in (e.g. `three`, `@react-three/fiber`) if the CLI prompts.

2. **Create `src/components/case-study/CaseStudyAnomalousHero.tsx`**
   - Same prop shape as `CaseStudyVideoHero` (`eyebrow`, `title`, `subtitle`, `onPrimaryCta`).
   - Layout = exact copy of `CaseStudyVideoHero.tsx`:
     - `min-h-[88vh]`, fixed dark `#0a0a0a` canvas behind.
     - Replace the `<GradientBlinds />` block with the new Anomalous Matter component, full-bleed absolute.
     - Keep the two black gradient overlays for legibility.
     - Keep `pointer-events-none` content wrapper + `pointer-events-auto` chevron button (so mouse interactions reach the WebGL canvas, matching the lag fix from case study 12).
     - Keep eyebrow `text-[#FF7A18]` "Case Study", same headline classes, same `ChevronDown` scroll button.

3. **Add Case Study 08 detail data** in `src/data/caseStudyDetails.ts`
   - New key `"ev-battery-predictive"` mirroring the case study 12 shape.
   - Reuse the existing `caseStudies.ts` content for 08 verbatim:
     - `heroEyebrow`: `"08 · Mobility / IoT"`
     - `heroTitle`: from `caseStudies[].title` / summary (kept as-is, no rewrite)
     - `heroSubtitle`: existing `summary` field
     - Three sections (`opportunity`, `solution`, `impact`) populated from the existing `Background`, `Our approach`, and outcomes copy already in `caseStudies.ts` — content moved, not changed.
   - `videoUrl` field kept as empty string (unused by the new hero).

4. **Wire the hero into `CaseStudyDetail.tsx`**
   - Detect when `slug === "ev-battery-predictive"` and render `<CaseStudyAnomalousHero />` instead of `<CaseStudyVideoHero />`. Everything else on the page (SectionNav, metrics, sections, CTA) stays identical.

## Technical notes

- The new component is rendered behind the centered text with the same z-index stack (`z-0` canvas / `z-10` content) used in case study 12.
- Mouse-pass-through fix is preserved (`pointer-events-none` on wrapper, `pointer-events-auto` on chevron) so the shader stays interactive over the headline.
- If the registry component fails to mount (e.g. WebGL unavailable), the dark `#0a0a0a` background remains — same graceful fallback approach used for `GradientBlinds`.
- No changes to `caseStudies.ts` content, no copy edits anywhere.
