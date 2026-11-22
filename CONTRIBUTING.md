# Contributing

How we work on the InclinedPlane website. Read `CLAUDE.md` for the build
pipeline and SEO contracts, and `docs/revamp/PROGRESS.md` for the current state
of the redesign.

## Setup

```bash
git clone https://github.com/InclinedPlane-AI/inclinedplane.git
cd inclinedplane
npm ci
npx playwright install chromium   # only needed for `npm run build`
npm run dev                       # http://localhost:8080
```

You don't need a Vercel account. Deploys run in GitHub Actions.

## Branches

```
main ──────────────────► inclinedplane.com            (production)
 └── revamp ───────────► staging URL (stable, noindex) (the redesign)
      └── feat/<short-name> ─► preview URL posted on the PR
```

- Branch from `revamp` for redesign work: `git checkout revamp && git pull && git checkout -b feat/assessment-page`.
- Open a PR into `revamp`. It needs one approval. The PR gets a preview link comment once the build finishes.
- Keep PRs small: one page or one component per PR.
- Never push to `revamp` or `main` directly, and don't merge your own PR. A reviewer merges.
- Production changes only once, at launch: one reviewed PR `revamp` → `main`, opened when the owner confirms everything is approved and final.
- Hotfixes to the live site: branch from `main`, PR into `main`, then merge `main` into `revamp`.

## Before you open a PR

```bash
npm run lint
npm run build    # full pipeline: Vite + prerender. Ends with "0 failed".
```

Checklist (from the brief's anti-slop list):
- Copy follows the voice rules and banned-word list (see the brief).
- No new number, client name, logo or certification without `verified: true` in `src/content/`.
- No generic icon packs, stock photos, gradient washes or fade-up-on-every-section.
- New route? Add it to `scripts/seo-config.mjs` (title, description, JSON-LD) and check it prerenders.
- Works at 375px, 768px and 1440px. Keyboard reachable. One `<h1>`.

## Where things live

| Path | What |
|---|---|
| `src/content/` | Copy, stats, capabilities, case study tags, flags (content as data) |
| `src/components/site/` | The design system. Use these, don't restyle per page |
| `src/pages/` | One file per route |
| `scripts/` | Prerender, SEO, sitemap, RSS, deploy packaging (guarded files) |
| `public/brand/` | Logos, icons, brand pattern |

## Commits

Sentence-case, imperative, scoped: `Assessment: add Calendly path to booking dialog`.
One logical change per commit.
