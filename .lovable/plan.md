

## The AI Imperative — Three-Column Narrative Redesign

Replace the current 5-card bento grid in the homepage's "AI Imperative" slide with a three-column narrative structure: **Opportunity → Intent → Gap**, following the design brief.

### Section Header (centred)
- Eyebrow: `THE AI IMPERATIVE` (existing mono primary tag, kept)
- Headline: **The AI Imperative — In Numbers** (orange accent on "In Numbers")
- Subheadline: *The opportunity is real. The intent is there. The infrastructure isn't.*

### Layout

```text
+----------------------------------------------------------+
|  THE OPPORTUNITY  |    THE INTENT     |     THE GAP      |
|  (green dot)      |    (amber dot)    |     (red dot)    |
|  prize is enormous|  enterprises move |  most aren't ready|
+----------------------------------------------------------+
|   $15.7T          |       78%         |       23%        |
|   PwC, 2024       |   McKinsey, 2025  |   Gartner, 2025  |
+-------------------+-------------------+------------------+
|   25–40%          |       #1          |     70–85%       |
|  McKinsey, 2025   |   Gartner, 2024   |  Sources, 2025   |
+-------------------+-------------------+------------------+
|   370%            |      $53B         |     1 in 5       |
|  Sources, 2025    |   Gartner, 2026   |  Deloitte, 2025  |
+----------------------------------------------------------+
| "Most enterprises can't get to agentic AI because they   |
|  haven't fixed the foundation. We do both."              |
+----------------------------------------------------------+
```

- Desktop: 3 columns side-by-side, each containing a column header + 3 stacked stat cards.
- Mobile: stacks vertically — Opportunity → Intent → Gap.
- Below the columns: full-width dark glass banner with the closing quote (centred, no CTA).

### Column Tone (subtle traffic-light progression)

| Column | Surface tint | Indicator dot |
|---|---|---|
| The Opportunity | Lightest (`surface-1`/glass base) | Green (`bg-green-400`) |
| The Intent | Mid-warm (slight amber tint via `bg-amber-500/[0.04]` overlay) | Amber (`bg-amber-400`) |
| The Gap | Darker / faint orange (`bg-primary/[0.06]` overlay) | Red (`bg-red-400`) |

All cards keep the existing **glass-panel** treatment, brand-orange numbers, mono source line — visually consistent with existing impact metrics (Up to 70%, 3x, etc.).

### Stat Card Anatomy
- **Number** — XL, bold, `text-gradient-orange` (matches existing impact metric treatment)
- **Descriptor** — small, `text-secondary-foreground`, 1–2 lines
- **Source** — XS, mono, `text-muted-foreground/60`, bottom of card
- Cards keep equal heights within each column.
- Cards are not links anymore (brief specifies plain stat cards); existing source links can be moved into the source line as subtle underlines if desired — defaulting to non-link to match brief.

### Closing Banner
- Full-width dark band (`bg-background/80` + `glass-panel` border, deeper shadow)
- Centred quote in semibold, medium-large, white with orange emphasis on "We do both."
- Sits inside the same section, below the 3-column grid with `mt-10` spacing.

### Files to edit
- `src/pages/Index.tsx` — replace the entire bento grid block (lines ~199–338) with the new three-column structure + closing banner. Reuse `SectionGlow`, `motion` fadeUp, `glass-panel`, `text-gradient-orange` utilities. No new dependencies.

### Out of scope
- No changes to other slides, navbar, or global styles.
- No new icons added beyond a small coloured indicator dot per column header.

