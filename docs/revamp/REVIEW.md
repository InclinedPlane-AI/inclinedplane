# Founder review rounds

How Keerthana's content, grammar and wording feedback reaches the site, in
batches rather than one PR per small change. Set up 2026-11-23.

## How a round works

1. **One review link per round.** Each round has a PR named "Review round N"
   from `review/round-N`. Its preview link is her review link for the whole
   round, and it doesn't change while she reviews.
2. **Share it with her once.** On the preview: Vercel Toolbar (or the
   deployment's page in the dashboard) → Share → invite her email. The Hobby
   plan allows one outside collaborator, which is her. She signs in with her
   own Vercel account (Google or email works) and uses Comment to click any
   text and write the new wording.
3. **Her changes are made locally, not pushed.** As her comments come in,
   Mohan passes them to Claude (or Claude reads them from Mohan's signed-in
   browser via the toolbar). Claude applies them as local commits on
   `review/round-N` and Mohan checks them on localhost
   (`npx vite --host 127.0.0.1 --port 8080`, main folder on that branch).
   **Nothing is pushed during a round**, so no new link is created.
4. **"Round N done."** Only then does Claude run the PR checks (typecheck,
   lint, staging build, screenshots), push once, update the PR description
   with a comment-by-comment list of what changed, and update the log below.
   The push gives the PR one new preview link.
5. **Mohan approves and merges the PR into `revamp`** (staging redeploys).
6. **Next round:** Claude opens `review/round-N+1` from the updated `revamp`
   as a new PR. Its preview link is the next review link, where she can check
   the previous round's changes and add new comments.

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
| 1 | #23 | https://inclinedplane-staging-nzqndv24z-inclined-planes-projects.vercel.app | Waiting for her comments; changes made locally |
