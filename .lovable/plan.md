## Goal

Two SEO-only changes so the Google search result card reads correctly:

1. Collapse the brand name from "Inclined Plane" → "InclinedPlane" everywhere it surfaces to crawlers / link previews.
2. Remove the visible white circle around the orange "i" mark in the Google result favicon.

Nothing visible inside the live site changes — UI copy, the Navbar/Footer Logo component, body content, and chatbot text all stay as "Inclined Plane".

## 1. Brand name → "InclinedPlane" (SEO surfaces only)

Edit only the strings that crawlers/preview bots read. Per CLAUDE.md, the build-time SEO is the source of truth (`scripts/seo-config.mjs`), and a few static files mirror it.

Files to update:

- **`scripts/seo-config.mjs`** — replace every user-visible occurrence of `Inclined Plane` with `InclinedPlane`. Affected fields: `SITE_NAME`, homepage `title`, `description`, About title/description, Blog/Careers/Contact descriptions, Privacy/Terms/Cookies descriptions, the `name: "Contact Inclined Plane"` ContactPage entry, and the comment about the `" | Inclined Plane"` title suffix (update the comment + behavior to `" | InclinedPlane"`).
- **`public/manifest.webmanifest`** — `name` and `short_name` → `InclinedPlane — AI-Native Data Engineering` / `InclinedPlane`.
- **`public/llms.txt`** — H1 and prose mentions → `InclinedPlane`.
- **`index.html`** — RSS `<link ... title="Inclined Plane Blog">` → `InclinedPlane Blog`.

Do **not** touch:

- `src/components/Logo.tsx` `alt="Inclined Plane"` (screen-reader text, matches the brand spelling the user actually says aloud).
- Any page body copy, chatbot knowledge, blog post content, or `CLAUDE.md`.

After the edits, the next production build (`npm run build`) re-bakes all 28 per-route `<title>`, `<meta description>`, OG/Twitter tags, and JSON-LD with the new name. Google will pick the change up on the next recrawl.

## 2. Favicon — remove the circle in Google results

The "circle" isn't drawn by us — Google clips every favicon into a circular badge in its result UI. The current `public/favicon.png` is a 2048×2048 PNG of the orange "i" mark on a **white background**, so Google's circular crop renders that white fill as a visible ring against its dark UI chrome.

Fix: replace `public/favicon.png` with a transparent-background version of the same mark, sized so it fills Google's circular crop edge-to-edge (the mark already sits inside the square; we'll regenerate a clean transparent PNG at 512×512 with the orange "i" filling the frame).

Approach:

- Use the existing brand "i" mark as the reference and regenerate a transparent-background PNG via `imagegen--edit_image` (input: current `public/favicon.png`, `transparent_background: true`, prompt: "isolate the orange 'i' mark on a transparent background, mark fills the frame with minimal padding").
- Overwrite `public/favicon.png` with the result.
- Leave `<link rel="icon">` and `<link rel="apple-touch-icon">` references in `index.html` unchanged — same path, same filename.
- `public/manifest.webmanifest` keeps the same `/favicon.png` icon entry; the new transparent PNG works for both browser tab and PWA install.

No code change needed; just an asset swap. Browsers will pick it up on next load (filename unchanged; cache-buster not required since Google fetches by URL on recrawl).

## Out of scope

- No changes to visible site UI, components, or copy.
- No changes to the chatbot knowledge base.
- No changes to social OG image (`/og-image.png`) — separate follow-up.

## Verification after build

```bash
grep "InclinedPlane" dist/index.html | head -3       # expect title/desc updated
grep "InclinedPlane" dist/services/index.html | head -3
grep "InclinedPlane Blog" dist/index.html            # RSS link title
```

For the favicon, open `public/favicon.png` after regeneration and confirm the background is transparent (checkerboard in the preview).

## Operational follow-up (human only)

Once deployed, the user should request a Google recrawl via Search Console (URL Inspection → Request Indexing) for the homepage so the new title + favicon appear in results within a few days instead of weeks.
