# Rebuild legal pages from uploaded HTML

Replace the three existing legal pages with React versions that mirror the structure, layout and copy of the uploaded HTML files (`Privacy_Policy.html`, `Terms_of_Service.html`, `Cookie_Policy.html`), but rendered using the existing site theme (dark background, molten orange primary, Inter body / Source Serif headings, glass panels, navbar + footer).

No new content is invented — every paragraph, list item, table row, contact block and section ID is copied verbatim from the uploaded files.

## Pages to rewrite

- `src/pages/PrivacyPolicy.tsx` — 14 sections, sticky TOC, 1 highlight box, contact block
- `src/pages/Terms.tsx` — 13 sections, sticky TOC, 2 highlight boxes, 2 warning boxes, contact block
- `src/pages/CookiePolicy.tsx` — 8 sections, sticky TOC, 1 highlight box, cookie table with badges, contact block

## Shared layout (built once per page, no new shared component)

```
PageLayout (existing site Navbar + Footer)
  └─ <article> max-w-[960px] mx-auto px-6 lg:px-10 pt-32 pb-20
      ├─ Hero
      │   • mono "// LEGAL" doc-label with orange leading bar
      │   • H1 title (site heading style, gradient orange accent)
      │   • mono meta row: Effective / Last Updated / Jurisdiction
      │   • bottom border (border-border)
      ├─ Layout grid
      │   • lg: [220px 1fr] gap-16
      │   • below lg: single column, TOC hidden
      │   ├─ <aside> sticky TOC
      │   │     mono labels "01 — Acceptance" with orange-on-hover left border
      │   └─ <main> sections
      │         each section: id, h2 with mono "01" sec-num + title,
      │         body paragraphs, h3 sub-headings, → bullet lists,
      │         optional highlight-box / warning-box / contact-block / cookie-table
```

## Visual mapping (uploaded → site theme)

| Uploaded var | Site equivalent |
|---|---|
| `--bg #0a0a0a` | `bg-background` |
| `--surface #111` | `bg-card` / `bg-muted/30` |
| `--border #1e1e1e` | `border-border` |
| `--accent #d97757` | `text-primary` (already molten orange) |
| `--accent-dim` | `bg-primary/10` with `border-primary/25` |
| `--text` | `text-foreground` |
| `--text-muted` | `text-muted-foreground` |
| `--mono IBM Plex Mono` | `font-mono` (existing Tailwind mono stack) |
| `--sans Syne` | site heading font (existing) |
| `--body Inter` | site body font (existing) |

All colors via semantic tokens — no hardcoded hex.

## Component-specific details

**Highlight box** — `rounded-lg border border-primary/25 bg-primary/10 p-6 my-6` with foreground text.

**Warning box** (Terms only) — `rounded-lg border border-border border-l-4 border-l-primary bg-muted/30 p-6 my-6`, mono text.

**Contact block** — `rounded-lg border border-border bg-card p-6 mt-6`, all `<p>` mono with `// ` prefix preserved.

**Cookie table** (Cookie Policy §04) — semantic `<table>` with `border-collapse`; `<th>` mono uppercase orange on `bg-muted/30`; `<td>` muted-foreground; rows separated by `border-b border-border`.

**Badges** in table — small `inline-flex font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm`. Required → `bg-primary/15 text-primary`; Analytics → `bg-muted/30 text-muted-foreground`.

**Bullet lists** — `<ul>` with custom rendering: each `<li>` has a left-aligned `→` in orange via `before:` pseudo, padding-left 5.

**Section numbers** — `font-mono text-[11px] text-primary tracking-wider` next to h2.

**TOC** — `position: sticky; top: 96px`, mono links with `border-l border-border`, hover `text-primary border-l-primary`. Smooth scroll via existing `html { scroll-behavior: smooth }` (already global). Scroll offset for hash links handled by existing `ScrollToTop` (128px offset noted in memory).

**Hero meta** — each span prefixed with `// ` in primary color.

## Things intentionally NOT carried over

- The HTML files' own `<nav>` and `<footer>` — replaced by site `<Navbar>` and `<Footer>` via `PageLayout`.
- Custom Google Font imports (Syne / IBM Plex Mono / Inter) — site already loads its own font stack; we use existing semantic font classes.
- Hardcoded color palette — replaced by theme tokens so the pages auto-adapt to dark/light theme toggle.
- The `openCookieSettings()` inline JS handler in Cookie §06 — rendered as a plain `<a href="#">` for now (matches "no new functionality" rule); can wire up later if you want it to reopen the cookie banner.

## SEO

Each page keeps its existing `<SEOHead>` call with `noIndex` (legal pages already excluded from sitemap per project knowledge). Titles updated to match new H1s.

## Files touched

- `src/pages/PrivacyPolicy.tsx` — full rewrite
- `src/pages/Terms.tsx` — full rewrite
- `src/pages/CookiePolicy.tsx` — full rewrite

No changes to routes, footer links, navbar, or any other page.
