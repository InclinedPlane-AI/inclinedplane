# Founder review rounds

How Keerthana's content, grammar and wording feedback reaches the site, in
batches rather than one PR per small change. Set up 2026-11-23.

## How a round works

1. **One review link per round.** Claude opens a PR named "Review round N"
   from `review/round-N` (based on the latest `revamp`). The PR's preview link
   is the review link for the whole round. Nothing is pushed to it while she
   reviews, so the link doesn't change under her.
2. **Share it with her once.** On the preview: Vercel Toolbar (or the
   deployment's page in the dashboard) → Share → invite her email. The Hobby
   plan allows one outside collaborator, which is her. She signs in with her
   own Vercel account (Google or email works) and uses Comment to click any
   text and write the new wording.
3. **"Round N done."** Mohan tells Claude. Claude collects every comment
   (from Mohan's signed-in browser via the toolbar, or pasted), applies all of
   them in one batch on the same branch, runs the checks, pushes, and posts
   the new preview link with a list mapping each comment to its fix.
4. **She verifies on the new link**, resolves what's done, and adds the next
   batch of comments there.
5. **Round accepted → Mohan merges the PR into `revamp`.** The next round
   starts from the updated `revamp`.

Bigger changes (layout, new sections) are flagged back to Mohan instead of
being made inside a review round.

## Rules for edits in a round

- Her wording wins for copy, but the brief's voice rules, banned words and
  claims policy still apply; Claude flags any conflict instead of silently
  changing her text.
- Founder-confirmed lines (brief §3.1, marked in `src/content/site.ts`) can be
  changed by her directly.
- If a change touches a title or description, `scripts/seo-config.mjs` is
  updated to match.

## Log

| Round | PR | Review link | Status |
|---|---|---|---|
| 1 | #23 | see the PR's preview comment (first link: inclinedplane-staging-4kuennxy0) | Waiting for her comments |
