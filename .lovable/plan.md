## Goal
Replace the text wordmark ("InclinedPlane") with the new uploaded logo images across the site, swapping the variant based on light/dark theme.

## Assets
- `user-uploads://incpl_primarylogo_AW.png` → black text + orange mark (use in **light** theme)
- `user-uploads://incpl_primarylogo_inverseAW.png` → white text + orange mark (use in **dark** theme)

Copy both to `src/assets/` so Vite bundles + hashes them:
- `src/assets/logo-light.png` (the AW / black version, shown on light backgrounds)
- `src/assets/logo-dark.png` (the inverse / white version, shown on dark backgrounds)

## Where the wordmark currently appears
1. `src/components/Navbar.tsx` — `<span>Inclined</span><span>Plane</span>` in header (also has a `forceLight` mode for hero overlays)
2. `src/components/Footer.tsx` — small wordmark in the brand column (the giant decorative "InclinedPlane" backdrop stays as-is, it's a design element)
3. `src/components/SplashScreen.tsx` — animated fill wordmark

## Approach
Create a small `<Logo />` component in `src/components/Logo.tsx` that:
- Imports both PNGs
- Renders both `<img>` tags, toggling visibility via Tailwind `dark:` classes (`block dark:hidden` / `hidden dark:block`)
- Accepts a `className` for sizing (height-based; width auto) and an optional `forceVariant?: "light" | "dark"` prop for the navbar's `forceLight` hero state
- `alt="Inclined Plane"`, `loading="eager"` for navbar/splash, `decoding="async"`

Replace the three wordmark usages with `<Logo className="h-6 md:h-7 w-auto" />` (sizes tuned per location: ~24-28px navbar/footer, ~48-64px splash).

## Splash screen note
The current splash animates a clip-path fill from 0→100% across the wordmark text. With an image we can't fill character-by-character the same way, but we can keep the identical effect by:
- Stacking two `<img>` tags absolutely: a dim version (opacity ~0.25) underneath, and the full-color version on top clipped by `clipPath: inset(0 ${100-progress}% 0 0)`.
- For the dim layer, reuse the dark/light logo with reduced opacity (no separate asset needed).

This preserves the left-to-right "fill" reveal behavior exactly.

## Favicon / manifest
Out of scope — favicon was already updated in the previous turn. Not touching `public/favicon.png` or the manifest.

## Files changed
- **Add**: `src/assets/logo-light.png`, `src/assets/logo-dark.png`, `src/components/Logo.tsx`
- **Edit**: `src/components/Navbar.tsx` (replace wordmark span, keep `forceLight` behavior), `src/components/Footer.tsx` (replace small wordmark only — leave giant decorative text), `src/components/SplashScreen.tsx` (swap text for stacked image fill)

## Verification
- Visual check in preview at `/` (dark default) and after toggling theme via the existing ThemeToggle
- Confirm the navbar logo in `forceLight` routes (hero overlays) still shows the white variant before scroll
- Confirm splash fill animation still reads as a left-to-right reveal
