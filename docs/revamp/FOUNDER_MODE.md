# Keerthana mode: the founder edits the site through Claude Code

Keerthana (founder and CEO) makes website changes herself by asking Claude
Code. She isn't technical. Mohan set this up on 2026-11-27. This file is the
playbook Claude follows whenever the person at the keyboard is Keerthana.

**How to tell:** she runs `/keerthana`, or says she's Keerthana. If unsure, ask
"Am I working with Keerthana or Mohan today?"

---

## 1. How to talk to her

- **Plain English, short.** No jargon. Say "saved" not "committed", "your
  draft copy of the site" not "branch", "sent to Mohan for review" not "opened
  a PR", "the preview on your computer" not "localhost". Never paste code or
  terminal output at her unless she asks.
- **After every change:** one or two sentences on what changed and exactly
  where to look, then nudge her to check it:
  "Done: the About page headline now reads '…'. Have a look at
  http://localhost:8080/about (refresh the page)."
- **She decides.** She's the founder and can change anything: copy, images,
  layout, pages. Never refuse or quietly water down a request. When something
  clashes with what the team agreed (below), explain it once, kindly and
  briefly, with your recommendation, then do what she chooses. Note her
  decision for Mohan in the PR description.
- **Things worth a gentle word before you do it** (the team's agreed rules;
  the original brief isn't in the repo, so these are the ones that matter):
  - **Claims:** the site only publishes numbers and claims tied to delivered,
    approved work. Anything unproven is marked `verified: false` in
    `src/content/`: it shows a "Verify before launch" badge on staging and is
    hidden on the live site. If she adds a figure, ask where it comes from; if
    she confirms it's true, it can be `verified: true`.
  - **Clients:** no client names, logos or anything that identifies a client
    without their written approval. Case studies are anonymised on purpose.
  - **Voice:** plain, specific, confident; no filler. Words the team already
    flagged as banned: "unlock", "empower", "harness the full potential".
    Steer away from similar hype words; suggest a plainer alternative.
  - **Founder-confirmed lines** (marked in `src/content/site.ts`): she wrote
    or approved these, so she can change them freely.
  - **Big layout or design-system changes:** fine, but say what else they
    affect.
- **Technical files** (`.github/`, `scripts/`, `vercel.json`, `package.json`,
  the build pipeline): if a request needs them, explain in plain words, do the
  content part, and leave a note for Mohan in the PR instead of changing them.

## 2. First session only: setup, then brief her

Do these one at a time, explaining each in a sentence. Only ask her to act
when she must (logging in, accepting an invitation).

1. **Tools:** check `git --version`, `node -v` (20 or newer) and
   `gh --version`. If something is missing, tell her what it is in one line
   and how to install it (macOS: the installer from nodejs.org for Node;
   https://cli.github.com for the GitHub CLI). Wait for her to say done.
2. **GitHub login:** `gh auth status`. If not logged in, ask her to open the
   VS Code terminal (menu: Terminal → New Terminal), paste
   `gh auth login --web --git-protocol https`, press Enter to accept each
   default, copy the one-time code it shows, and approve it in the browser
   window that opens. Then run `gh auth setup-git`.
3. **Company access:** `gh api user/memberships/orgs/InclinedPlane-AI --jq .state`.
   - `active`: good.
   - `pending`: ask her permission, then accept it with
     `gh api -X PATCH user/memberships/orgs/InclinedPlane-AI -f state=active`
     (or send her to https://github.com/orgs/InclinedPlane-AI/invitation).
   - error/none: ask her to check her email for Mohan's invitation, or to ask
     Mohan to resend it.
   Then confirm write access:
   `gh api repos/InclinedPlane-AI/inclinedplane --jq .permissions.push` → `true`.
4. **Name on her saves:** if `git config --global user.name` or `user.email`
   is empty, set them (her name, and the email on her GitHub account).
5. **Get the site:** if the repo isn't already the open folder, clone it:
   `git clone https://github.com/InclinedPlane-AI/inclinedplane.git ~/Documents/InclinedPlane-website`.
   Inside it: `npm ci` (a few minutes) and `npx playwright install chromium`
   (used by the checks before sending work to Mohan).
6. **Open it in VS Code:** if you just cloned it, ask her to choose
   File → Open Folder → Documents → InclinedPlane-website, then start a new
   Claude chat there and type `/keerthana`. (Claude only picks up this
   playbook automatically once that folder is open.)
7. **Brief her** (once, in plain words, before any edits):

   > Mohan has set this up so you can change the website just by telling me
   > what you want. Here's how it works:
   >
   > - You work on your own **draft copy** of the site. Nothing you do here
   >   touches the live website, or Mohan's work, until he approves it.
   > - I keep a **preview running on your computer** at
   >   http://localhost:8080. After each change I'll tell you what I did and
   >   where to look. Just refresh that page.
   > - I **save your work as we go**, quietly, every few changes.
   > - At the end of the day, or after a good batch of changes, or whenever you
   >   say so, I'll **send everything to Mohan** with a plain list of what
   >   changed and a link where he can see it online.
   > - Mohan checks it and approves it. It then appears on the **team's
   >   staging site** (https://inclinedplane-staging.vercel.app), which is the
   >   new website before it goes live.
   > - When you're happy with the whole site, Mohan takes it live on
   >   inclinedplane.com.
   >
   > You can change anything: words, images, layout, whole pages. If something
   > clashes with what the team agreed, like a claim we can't prove yet or a
   > client's name, I'll mention it so you can decide. What would you like to
   > change first?

## 3. Every session: get ready

1. `git status` and `git remote -v`. On her clone the company repo is
   `origin`. (On Mohan's machine it's `upstream`; use whichever points at
   `InclinedPlane-AI/inclinedplane`.)
2. **Pick her draft copy (branch):**
   - `git fetch origin`. If she has a branch with unsaved or unsent work,
     carry on there.
   - Otherwise start a new one from the latest `revamp`:
     `git checkout -b content/keerthana-YYYY-MM-DD origin/revamp`.
   - If her last sent batch (PR) isn't merged yet, start the new branch **from
     that branch** instead, so her preview still shows yesterday's changes.
     Say so in the next PR ("builds on #NN; merge that first").
3. **Start the preview** in the background:
   `npx vite --host 127.0.0.1 --port 8080`, then tell her it's ready at
   http://localhost:8080. If the port is taken, check whether it's already
   this site; otherwise use 8081 and tell her the new link. (Never use ports
   8765/8766.)
4. Greet her briefly: what's ready, and ask what she'd like to change.

## 4. Making changes

- Most words live in `src/content/` (site-wide copy, nav, capabilities, case
  study titles, learn articles, insights) and `src/data/` (case study stories,
  blog posts). Pages are in `src/pages/`; shared pieces in
  `src/components/site/`. Find the exact text with a search before editing.
- Keep the design system: brand colours, Google Sans Flex, thin rules, no
  stock photos or icon packs. If she wants something outside it, do it, and
  note the departure for Mohan.
- **Images she sends:** keep originals out of the repo if they show a client
  or anything confidential; resize/compress for the web; put them in
  `public/`.
- If a change touches a page title or description, update the matching entry
  in `scripts/seo-config.mjs` (search engines read that copy).
- After each change: check the page in the preview yourself when you can,
  then tell her where to look.

## 5. Saving (commits): on your own, without asking

- Commit after every 2–3 small changes, or after each bigger one, once she's
  happy with it and moves on. Don't ask her first.
- Commit messages in plain English, e.g. "About: new headline and intro
  wording", ending with the usual Co-Authored-By line.
- Don't push while she's working. Pushing happens when her batch is sent.

## 6. Sending a batch to Mohan (the PR)

**When to offer:** at the end of her day, after roughly 30–40 changes (fewer
if they're big), or whenever she asks. Ask simply: "Shall I send today's
changes to Mohan for review?"

When she says yes:

1. Tell her it takes a few minutes, then run the checks:
   `npx tsc --noEmit -p tsconfig.app.json`, `npm run lint` (three old errors
   in `tailwind.config.ts` and two `components/ui/` files are expected; any
   new error must be fixed) and `VITE_SITE_ENV=staging npm run build` (must
   end "0 failed" and "[flow] … 0 dead end(s), 0 orphan(s)"). Fix anything
   that fails before going on.
2. `git push -u origin <her-branch>`.
3. Open the PR into `revamp`:
   `gh pr create --base revamp --title "Keerthana's changes: <date or theme>" --body "…"`.
   The description must let Mohan review without opening the code:
   - **What changed**, grouped by page, every change listed. For wording,
     show old → new.
   - **For Mohan**: anything flagged (claims, client names, banned words,
     design departures, technical requests left for him) and her decision.
   - **Checks**: the three results above.
   - **Preview**: the staging workflow posts the preview link as a PR comment
     a few minutes after the push. Wait for it
     (`gh pr view <n> --json comments`), then add it to the description.
   - End with the "🤖 Generated with Claude Code" line.
4. Tell her in plain words: it's sent, here's the link where Mohan (and she)
   can see it online, and Mohan will approve it.
5. Start her next draft copy (section 3, step 2) so new requests don't pile
   onto the batch Mohan is reviewing.

**Never:** merge a PR, push to `revamp` or `main`, force-push, or delete
branches. Mohan merges.

## 7. Notes for Mohan's sessions

- Her PRs are exempt from updating `docs/revamp/PROGRESS.md` (it caused merge
  conflicts). The PR description is the record of her changes; read her
  merged PRs to catch up (`gh pr list --state merged --search "Keerthana"`).
- Merging her PR into `revamp` redeploys staging automatically.
- When she's happy with the whole site, launch follows rule 7 in `CLAUDE.md`
  (one PR from `revamp` into `main`, opened by Mohan).
