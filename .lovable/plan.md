## Problem

Case study detail pages (Primary, Secondary, Field, and others using `CaseStudyAnomalousHero` / `CaseStudyImageHero` / `CaseStudyEVVideoHero`) all render a **fixed dark hero** (`bg-[#0a0a0a]` + dark image/video + dark gradient scrims), regardless of theme.

`Navbar.tsx` is theme-aware — in light mode the logo "Inclined" and the nav links resolve to `text-foreground` / `text-muted-foreground`, which are **dark colors**. Result: dark text on dark hero is unreadable until the user scrolls and the `glass-panel-strong` background kicks in.

## Goal

Keep the dark hero exactly as it is. Make the navbar always readable on top of it (in both light and dark mode) without changing the navbar's structure or its behavior on the rest of the site.

## Approach

Add a lightweight "force light text" mode to the navbar that activates **only** while the user is at the top of a case study detail page (i.e. while the hero is in view), and turns off as soon as they scroll past it (where the existing `glass-panel-strong` themed background already provides contrast).

### Implementation outline

1. **`src/components/Navbar.tsx`** — add an optional `forceLight?: boolean` prop.
   - When `forceLight && !scrolled`: override the logo "Inclined" word and the nav link colors to white / white-with-opacity.
   - "Plane" stays orange gradient (already readable on dark).
   - The "Build With Us" CTA (orange pill, white text) and the theme toggle already read fine on dark — leave them.
   - Once `scrolled` is true, drop the override so the themed glass panel takes over normally.

2. **`src/components/PageLayout.tsx`** — accept an optional `navbarProps` (or a simpler `forceLightNavbar` boolean) and forward to `<Navbar />`.

3. **`src/pages/CaseStudyDetail.tsx`** — pass `forceLightNavbar` to `PageLayout`. The page already knows it always shows a dark hero.

   Simple version: always `true` for case study detail pages.
   Slightly nicer (optional): use a scroll listener already present in Navbar — the `scrolled` flag — which naturally turns the override off after ~40px scroll, so we don't need a second listener.

4. **No changes** to the hero components, theme tokens, or any other page.

### Why this approach

- Doesn't touch the design system or semantic tokens (no risk to other pages).
- Doesn't change the hero visuals.
- Reverts cleanly to themed styling once the user scrolls, so dark-mode behavior on case study pages is unchanged.
- Single prop, opt-in per page — won't accidentally affect Home, Services, etc.

### Files to edit

- `src/components/Navbar.tsx` — add `forceLight` prop + conditional classes
- `src/components/PageLayout.tsx` — forward the flag
- `src/pages/CaseStudyDetail.tsx` — set the flag to `true`

No new files, no structural changes, no token changes.