# Content and Launch Implementation Plan (plan 3 of 3)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task, sequentially in the main session (per project `CLAUDE.md`), with superpowers:test-driven-development for every piece of logic and superpowers:requesting-code-review at the milestones marked below. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** The content workflow from the spec exists as tooling, the two launch articles ("Data foundations" and the AI and analytics article, "Practical AI for Complex Industrial Data"; amended 25 November 2026, see Task 6) have been through all of it including Nikita's edit, the About page carries his real details, and the site is switched on for search engines with Search Console watching it.

**Architecture:** The workflow is a GitHub issue form, a project skill (`.claude/skills/write-article/`) that Claude runs, an article template and review checklist in `docs/content/`, and two checks: an article linter that runs inside `npm test` (so CI's `build` job enforces it on every PR), and a link checker run by hand. Each article's research brief and fact-check report are committed beside it in `docs/content/articles/<slug>/` as the audit trail for "every claim sourced". The launch is a small, revertible PR that flips `PUBLIC_ALLOW_INDEXING` and `PD_EXPECT_INDEXING` in `deploy.yml`, preceded by a launch-prep PR that adds the safety guard, the indexing checks and the runbooks.

**Tech Stack:** Astro 7 content collections (existing), Vitest, Playwright (existing deployed suite), `yaml` (existing devDependency, for front matter and the issue form), Node 26's built-in `fetch` and type stripping (for the link checker, no new dependency), GitHub issue forms, Claude Code project skills, deep-research, humanizer, Google Search Console (free).

**Spec:** [docs/superpowers/specs/2026-11-09-practically-digital-design.md](../specs/2026-11-09-practically-digital-design.md), especially "Decided: content workflow", "Decided: article structure", the launch content and the About page placeholders. Plan 2: [2026-11-13-deploy-and-operate.md](2026-11-13-deploy-and-operate.md) and its [ledger](2026-11-13-deploy-and-operate-ledger.md), whose "Handed to plan 3" list this plan works through.

**Who does what.** Every step is Claude's unless it's labelled **(Nikita)**. Nikita's steps are writing, editing, reading sources, supplying details, approvals, and anything in Azure, Cloudflare, Google Search Console or GitHub settings. Claude runs git: commits, pushes to working branches, opens PRs and merges them after Nikita's go-ahead, explaining each command in a line or two. The one exception: a commit that changes `.github/workflows/` is pushed by Nikita from GitHub Desktop (the `gh` token can't push workflow files).

## Decisions for Nikita to confirm (Claude's recommendations)

These aren't in the spec. Each has a recommendation; say if you want a different one before execution starts.

1. **Brief checkpoint.** The skill stops after the research brief and outline, and Nikita approves them before any drafting. *Why:* a wrong angle is cheap to fix at the outline and expensive after a 3,000-word draft. *Alternative:* the spec's flow, straight from research to draft. *Implication:* one extra exchange per article.
2. **Audit trail in the repo.** Each article's research brief (with a claim → source table) and the fact-check report are committed in `docs/content/articles/<slug>/`. *Why:* the PR description alone is hard to find later, and the claim table is what lets an article be re-reviewed in a year. *Alternative:* PR description only (the spec's wording). *Implication:* these notes are public, like the rest of the repo, so quotes from sources stay short (one sentence) and everything else is paraphrased.
3. **No `draft: true` on article branches.** CI builds previews with drafts off (plan 2 pins this and tests it), so a draft-flagged article wouldn't appear on its own preview. Articles on a branch are written unflagged; merging the PR is the publish step, as the spec's workflow already says. `draft: true` stays available for parking unfinished work on `main`. *Alternative:* turn drafts on for preview builds, which means changing `ci.yml` and the test that guards it. *Implication:* work-in-progress drafts are visible on the public (unindexed) preview URL and in the public repo from the first push.
4. **Free headings, two fixed closing sections (decided by Nikita, 15 November 2026).** Heading wording and the number of sections are free. The only fixed headings are the last two H2s, in this order: `Tools and resources` (a bullet list of useful resources, usually links) and `Further reading`. The spec's article structure becomes the template's *suggested* sections, not a rule. *Why:* the writing reads better, and the checker gets simpler. *What moves from machine to people:* nothing checks any more that a guide covers costs, limitations and when not to bother. The fact-check agent flags it if it's missing, and the review checklist has a line Nikita ticks. *Implication:* the spec's "fixed shape" is relaxed; Task 2 adds a dated note to the spec so a later session doesn't bring it back. Headings become URL anchors, so wording is settled before each article merges, not changed afterwards.
5. **Diagrams as hand-written SVG, no hero photos at launch.** Claude draws diagrams as SVG files using the site's colours, shown with the existing `Figure` component. No Mermaid build step (it needs a headless browser at build time) and no stock photography (licensing is one more thing to check). *Alternative:* licensed photos from a free library; add later if a guide needs one.
6. **Order:** Data foundations first, as the pilot run of the workflow, then a short retrospective that fixes the skill and linter before the AI article. The AI article must link to the data foundations one (the spec's ethos: every technology guide says it fails on untrusted data, and the linter checks the link).
7. **Content Security Policy stays out of this plan.** Plan 2 handed it over, but Nikita's scope for plan 3 doesn't include it, and allow-listing Pagefind's WebAssembly and Astro's inline scripts needs its own testing. It goes on the post-launch list. Domain email also stays out, so the no-email DNS records are unchanged.

## Global Constraints

- Every Global Constraint in plans 1 and 2 still applies, except the git rule, which is now `CLAUDE.md`'s (changed 14 November 2026): Claude commits, pushes working branches, opens and merges PRs; changes reach `main` only through a PR; no direct pushes to `main`, no force-pushes, no history rewrites.
- **Claude never** changes anything in Azure, Cloudflare, Google Search Console or GitHub settings (rulesets, secrets, variables, labels). Those are runbook steps for Nikita. Read-only checks are fine: `gh issue view`, `gh pr checks`, `gh run view`, `curl -I`, `nslookup`.
- **Workflow files:** a commit touching `.github/workflows/` is pushed by Nikita from GitHub Desktop. Claude commits it locally, stops, and says so.
- **Cost:** £0. Search Console is free; nothing in this plan is billable.
- **Content rules (spec and `CLAUDE.md`):** British English. No invented statistics, case studies or references. Every factual claim has a source a reader can open. Estimates are labelled as estimates. Examples come from public sources, never client, MTC or NDA material. Humanizer runs over everything that gets published, after the last edit. "Would I say this out loud?" is Nikita's test, not Claude's.
- **Copyright:** briefs and fact-check reports quote at most one short sentence per source; everything else is paraphrase. No copied figures or diagrams: diagrams are Claude's own SVGs, and any image is licensed with its licence recorded in the brief.
- **Privacy:** the link checker sends a generic User-Agent (`practically-digital-linkcheck`), never Nikita's name or email. Research and fact-check subagents never put project or personal details into search queries beyond the article topic.
- **Client JavaScript exceptions stay at four.** Articles add no scripts; MDX components render at build time.
- **Article files:** `src/content/articles/data-foundations.mdx` and `src/content/articles/industrial-ai.mdx`, so the URLs are `/insights/data-foundations/` and `/insights/industrial-ai/`. Diagrams in `src/content/articles/images/<slug>-<name>.svg`.
- **Docs:** British English, written for Nikita, humanizer pass before merge. Every provider fact cites the provider's own page and the date checked. Runbooks use the plan 2 format: numbered steps, each with *What it does* and **Expect**.

## Review Focus

1. **Numbers that aren't statistics.** Years (`2026`), standards (`ISO 23247`), `Industry 4.0`, `24/7` and `5G` must not trip the sourced-figure rule, while "cuts downtime by 30%" or "£2m a year" in a paragraph with no link must. Tests in Task 1.
2. **American spellings inside names.** "National Center for…" in link text, a cited report title in Further reading, a product name in Tools and resources, or a quoted phrase must not fail the British-English rule; the same word in Claude's own prose must. Tests in Task 1.
3. **Publishers that block bots.** Many report sites answer an automated request with 403 or 429. The link checker reports those as "check by hand", not broken, so Nikita isn't sent chasing working links, and a real 404 still fails. Tests in Task 2.
4. **Contents links on real headings.** With free headings, real ones will carry punctuation, quotes and possibly non-ASCII characters (`Is it right for you?`, `What "real time" means`), and plan 1 deferred a scroll-spy bug for non-ASCII slugs. Every contents-pane link on a deployed article must point at a heading that exists. Deployed test in Task 8.
5. **The default Azure hostname once indexing is on.** Production is also served at `agreeable-coast-0dc03af0f.5.azurestaticapps.net`, which will then be indexable too. Every page's canonical URL must point at `https://practicallydigital.co.uk`, so search engines treat the custom domain as the real one. Deployed test in Task 8; Task 8 also checks whether Azure lets the default hostname be turned off and writes it into runbook 10 if so.

---

### Task 0: Decisions, details and voice samples (Nikita)

- [ ] **Step 1 (Nikita):** Confirm or change the seven decisions above.
- [ ] **Step 2 (Nikita), any time before Task 7:** Supply the About details: a bio of 80 to 150 words in your own words (no employer-confidential material: naming past employers and roles is fine, project or client details are not), the public email address, and the LinkedIn profile URL. On the email: whatever you choose is published in the page source, so expect some spam. Domain email isn't set up (the domains have "no email" DNS records), so it has to be an existing address for now.
- [ ] **Step 3 (Nikita), optional, before Task 4:** If you want drafts closer to your voice, give Claude three to five pieces of your own writing (posts, emails, reports you're free to share) and Claude runs **setup-writing-style** to build a voice profile. It's stored in your user settings, not the repo.

### Task 1: Article linter

**Files:**
- Create: `src/lib/article-lint.ts`, `tests/unit/article-lint.test.ts`, `tests/unit/content.test.ts`

**Interfaces:**
- Produces `END_SECTIONS = ['Tools and resources', 'Further reading'] as const`, the two fixed closing headings in decision 4, in order.
- Produces `type LintIssue = { rule: LintRule; line: number; message: string }` with `type LintRule = 'end-sections' | 'tools-and-resources' | 'further-reading' | 'unsourced-figure' | 'leftover-marker' | 'link' | 'spelling' | 'data-foundations-link'`.
- Produces `lintArticle(source: string, opts: { topics: string[] }): LintIssue[]`. `source` is the whole file including front matter; line numbers count from the top of the file. Code blocks, MDX `import`/`export` lines and JSX tags are ignored. Rules:
  - `end-sections`: the last two H2s are exactly `END_SECTIONS`, in that order, and neither heading appears anywhere else. Every other H2 and H3 is free, and so is their number.
  - `tools-and-resources`: the section contains a bullet list with at least one item. An introductory sentence before the list is allowed. Links in it fall under the `link` rule like any other.
  - `further-reading`: at least 3 list items under `Further reading`, each containing an `https://` link.
  - `unsourced-figure`: outside `Further reading`, a paragraph or list item containing a percentage (`/\d(\.\d+)?\s?%/`), a currency amount (`/[£$€]\s?\d/`), or a number followed by `million`, `billion`, `bn` or `m` (as a word) must also contain a Markdown link or the word `estimate`/`estimated`.
  - `leftover-marker`: `TODO`, `TBC`, `FIXME`, `PLACEHOLDER`, `[citation needed]`, `[source]`, `(source?)` or `XX%` anywhere outside code.
  - `link`: no `http://` links, no `localhost`, no `azurestaticapps.net`.
  - `spelling`: a word from `US_SPELLINGS` (a short exported list: `color`, `behavior`, `center`, `analyze`, `organization`, `optimize`, `modeling`, `labeled`, `favor`, `catalog`, `defense`) in prose, with link text, URLs, inline code, text in quotation marks and the `Tools and resources` and `Further reading` sections skipped (they're mostly names and titles). Matching is case-insensitive on whole words, including simple inflections (`-s`, `-d`, `-ing`).
  - `data-foundations-link`: when `topics` doesn't include `data-foundations`, the article must link to `/insights/data-foundations/` or `/topics/data-foundations/`.
- Produces `lintArticleFile(path: string): LintIssue[]`, which reads the file, parses the front matter with `yaml`, returns `[]` for `draft: true` and otherwise calls `lintArticle` with the article's topics.

- [ ] **Step 1: Write the failing tests** in `article-lint.test.ts`, building small articles inline from a helper `article(body: string, frontMatter?: object): string` that wraps a body with valid front matter and appends a valid `Tools and resources` and `Further reading` (each part replaceable for the tests below):
  - "a complete article passes": zero issues.
  - "any number of freely worded sections is allowed": bodies with one H2, with nine H2s, and with headings such as `What a digital twin actually is` → zero issues.
  - "the two closing sections are required, in order, at the end": `Tools and resources` missing, `Further reading` missing, the two swapped, a free H2 after `Further reading`, and `Further reading` appearing twice → one `end-sections` issue each, naming the heading.
  - "Tools and resources needs a bullet list": a paragraph only → issue; an intro sentence plus one bullet → none.
  - "Further reading needs three https links": two items → issue; three items, one `http://` → issue.
  - "a percentage, currency amount or 'million' with no link is reported", one test each, issue on the right line.
  - "the same figure with a link, or labelled as an estimate, passes".
  - "years, standards and version numbers are not figures": `In 2026`, `ISO 23247`, `Industry 4.0`, `24/7`, `5G`, `OPC UA 1.05` → zero issues (Review Focus 1).
  - "leftover markers are reported, but not inside code blocks".
  - "http, localhost and preview links are reported".
  - "American spellings in prose are reported": `We optimize the color` → two issues.
  - "names, quotes, link text and the two closing sections are exempt": `[National Center for Manufacturing Sciences](https://…)`, `the report "Optimizing Assets"`, a Tools and resources item naming a product `…Color Center Toolkit`, and a Further reading item titled `…Modeling…` → zero issues (Review Focus 2).
  - "a technology article must link to the data foundations guide": `topics: ['digital-twins']` with no link → issue; with `/insights/data-foundations/` → none; `topics: ['data-foundations']` with no link → none.
  - "drafts are skipped": `lintArticleFile` on a temp file with `draft: true` and no sections → `[]`.
  - "END_SECTIONS is the agreed pair": deep-equals `['Tools and resources', 'Further reading']`.
- [ ] **Step 2:** Write `content.test.ts`: "every article in src/content/articles passes the linter", which globs `src/content/articles/*.{md,mdx}` and expects `lintArticleFile` to return `[]` for each, collecting every issue as `file:line rule message` and expecting the list to be empty, so a failure names them all. One `it` loops over the files rather than `it.each`, so the test still runs (and passes) before the first article exists.
- [ ] **Step 3:** `npm test` → **Expect** FAIL (module missing).
- [ ] **Step 4:** Implement `src/lib/article-lint.ts`. Work line by line on the body, tracking the current H2 and whether the line is inside a fenced code block; treat consecutive non-blank lines as one paragraph for the figure rule.
- [ ] **Step 5:** `npm test` → **Expect** PASS. `npm run build` → **Expect** success (nothing in the site changes).
- [ ] **Step 6:** Create branch `content-workflow` from an up-to-date `main` (`git switch -c content-workflow`: makes the branch and moves onto it), commit `feat: add article linter, run on every article in npm test`, and add this plan to the same commit.

### Task 2: Workflow kit: template, checklist, issue form, link checker, skill

**Files:**
- Create: `docs/content/README.md`, `docs/content/article-template.md`, `docs/content/review-checklist.md`, `.github/ISSUE_TEMPLATE/article-request.yml`, `src/lib/links.ts`, `scripts/check-links.ts`, `tests/unit/links.test.ts`, `tests/unit/content-kit.test.ts`, `.claude/skills/write-article/SKILL.md`, `docs/adr/0008-content-workflow-and-checks.md`
- Modify: `docs/superpowers/specs/2026-11-09-practically-digital-design.md` (a dated note under "Decided: article structure"), `package.json` (script `check:links` = `node scripts/check-links.ts`), `docs/architecture/overview.md` (folder table: `docs/content/`, `.claude/skills/`; the linter in the tests section), `README.md` (link to `docs/content/README.md`)

**Interfaces:**
- Consumes `END_SECTIONS` and `lintArticle` from Task 1; `TOPICS` and `PROBLEMS` from `src/data/taxonomy.ts`.
- Produces `extractLinks(source: string): { url: string; text: string; line: number }[]` in `src/lib/links.ts`: Markdown inline links, autolinks and `href="…"`/`src="…"` attributes in JSX, skipping code blocks. Internal links (`/…`) are returned too.
- Produces `classifyStatus(result: { status: number } | { error: string }): 'ok' | 'broken' | 'check'`: 200–399 → `ok`; 404, 410 and DNS or connection errors → `broken`; 401, 403, 429, other 4xx and 5xx, and timeouts → `check`.
- Produces `scripts/check-links.ts <file…>`: for each external link, a `HEAD` request (falling back to `GET` on 405 or 501) with a 10-second timeout, User-Agent `practically-digital-linkcheck`, at most 4 requests at a time; for each internal link, checks that `dist/<path>/index.html` exists (it tells you to run `npm run build` first if `dist/` is missing). Prints one line per link (`ok`, `broken` or `check`, then status, line and URL) and exits 1 if anything is `broken`.
- `article-template.md`: front matter with every schema field and a comment on each (`title` 10–90 characters, `description` 50–160, `gist` up to 400, with the spec's guidance in its comment: two or three sentences saying what the technology is, why it matters to this reader, and a one-line verdict; it renders in the highlighted box above the article, not as a heading, `published`, `reviewed`, `topics` up to 3 with the main one first, `problems` up to 3), then the spec's structure as *suggested* sections, marked as a starting point to reword, merge or reorder (what it is, with an analogy or example; how it works; business problems it solves; measurable value, with sourced figures or labelled estimates; challenges, costs and limitations; is it right for you, including when not to bother), then the two fixed closing headings, marked as required. A line on what every guide must cover whatever its headings: costs, limitations and when not to bother, and the data foundations link in every technology guide.
- `Tools and resources` content rules, in the template and `docs/content/README.md`: a bullet list, each item a link and one line on what it's for and who it suits; free, open and public resources first (standards bodies, government and Catapult guidance, open-source tools, free templates and self-assessments); paid products only where they're the usual choice, labelled as paid, and never one vendor alone where alternatives exist; no affiliate or tracking links; nothing from client or employer work. The difference from Further reading: Tools and resources are things to *use*; Further reading is things to *read*.
- `review-checklist.md`: the spec's minimum (every source link opened and checked; no invented numbers; "would I say this out loud?"; no client, MTC or NDA material; images licensed; British English) plus: covers costs, limitations and when not to bother (decision 4); Tools and resources is vendor-neutral, with paid items labelled; every fact-check flag resolved or the claim removed; humanizer run after the last edit; `reviewed` date set; preview read at phone width; linter and `check:links` clean.
- `article-request.yml`: an issue form, title prefix `Article: `, fields: working title (required), main topic (dropdown of `TOPICS` names, required), reader problems (multi-select dropdown of `PROBLEMS` names), angle (required), the reader's problem in their words (required), Nikita's notes and experience, sources he already trusts, out of scope. No `labels:` key (labels are a repository setting).
- `SKILL.md` for `/write-article <issue-number>`, in this order:
  1. Read the issue with `gh issue view`. Check the working tree is clean and `main` is up to date, then create branch `article/<slug>`.
  2. Research with **deep-research**: the current state of the topic, what's already published for this audience (so the article builds on it rather than repeating it), public UK manufacturing and utilities examples, credible further reading. Write `docs/content/articles/<slug>/brief.md`: angle, what already exists and the gap, an outline with proposed headings (ending in the two fixed sections), a claim table (`# | Claim | Source URL | Where in the source | Type: figure / fact / example`), tools-and-resources candidates (with free or paid noted), further-reading candidates, suggested diagrams.
  3. **Stop for Nikita's approval of the brief** (decision 1).
  4. Draft `src/content/articles/<slug>.mdx` from the template, using only claims in the table, each linked at the point it's made. Draw the diagrams as SVG. Use the voice profile if one exists.
  5. Run **humanizer:humanizer** over the draft.
  6. Run `npm test` (linter), `npm run build` and `npm run check:links -- src/content/articles/<slug>.mdx`. Fix until clean apart from `check` lines, which are listed for Nikita.
  7. Dispatch a fresh fact-check subagent that didn't write the draft. Its brief: open every cited source; for each claim give a verdict (supported, partly supported, not supported, source unreachable) with where in the source; flag any factual sentence with no source; check each Tools and resources entry is what it says it is, is current, and is labelled paid if it is; flag a guide that doesn't cover costs, limitations and when not to bother; check the gist says nothing the body doesn't support and that its verdict matches the body's conclusion; flag passages that still read as AI-written. Save its report as `docs/content/articles/<slug>/fact-check.md`.
  8. Fix or remove every flagged claim (never re-source a claim to a page that doesn't say it), re-run humanizer over changed passages, re-run step 6.
  9. Commit, push the branch, open the PR with `gh pr create`. The description holds the summary, the preview note, the fact-check summary, the `check` links and the review checklist.
  10. Hand over for Nikita's reading and edit.
  11. **Revise mode** (`/write-article <issue-number> revise`): after Nikita's edits, re-run step 6, fact-check only the claims added or changed since the last report (appending to `fact-check.md`), run humanizer over the changed text, Nikita's included, and show him every change it makes to his own words so he can reject any of them, then commit.
- ADR-0008: options and choices for the issue form vs a plain template, skill vs a script, linter in `npm test` vs a separate CI job vs none, the audit-trail location (decision 2), link checking by hand vs in CI (external sites make CI flaky, and a publisher going down shouldn't block a merge), free headings with two fixed closing sections vs the spec's fixed seven (decision 4, including what moved from the checker to the checklist), and the draft-flag semantics (decision 3).

- [ ] **Step 1: Write failing tests.** `links.test.ts`: `extractLinks` finds an inline link, an autolink, an `href` and a `src` in JSX with correct lines, and nothing inside a code block; `classifyStatus` maps 200, 301 → `ok`; 404, 410, `{ error: 'ENOTFOUND' }` → `broken`; 403, 429, 500, `{ error: 'timeout' }` → `check` (Review Focus 3). `content-kit.test.ts`: the template's last two H2s equal `END_SECTIONS`; the template's front matter lists every key in the article schema; the issue form's topic options equal the `TOPICS` names and its problem options equal the `PROBLEMS` names, in order; the form has no `labels` key; `check:links` is in `package.json`; the skill file exists and mentions `deep-research`, `humanizer:humanizer`, `fact-check.md` and `brief.md`.
- [ ] **Step 2:** `npm test` → **Expect** FAIL.
- [ ] **Step 3:** Implement `links.ts` and `check-links.ts`; write the template, checklist, issue form, skill, `docs/content/README.md` (the workflow as a Mermaid diagram, who does what at each step, where every file lives, the editorial rules in one list, the Tools and resources rules) and ADR-0008; update the overview and README. In the spec, under "Decided: article structure", add one line: *Amended 15 November 2026 (Nikita): headings and section count are free; every article ends with "Tools and resources" then "Further reading". The structure above is the template's suggestion. See ADR-0008.* Nothing else in the spec changes.
- [ ] **Step 4:** `npm test` → **Expect** PASS. Run `npm run build` then `npm run check:links -- tests/fixtures/articles/alpha-data-quality.md`. **Expect** a line per link and a sensible exit code.
- [ ] **Step 5:** Humanizer pass over `docs/content/*`, ADR-0008 and the overview changes. Commit `feat: add article workflow kit: template, checklist, issue form, link checker and skill`.

### Task 3: Review and merge the workflow kit (milestone)

- [ ] **Step 1:** Dispatch a fresh reviewer per **superpowers:requesting-code-review** over `main..content-workflow`, checking the linter rules against the spec's content rules and the Review Focus lines 1 to 3. Fix confirmed issues test-first and re-run `npm test`.
- [ ] **Step 2:** Push (`git push -u origin content-workflow`: uploads the branch and links it to GitHub's copy), open the PR (`gh pr create`), and read the checks with `gh pr checks`. **Expect** `build`, `gitleaks` and `accessibility` green.
- [ ] **Step 3 (Nikita):** Read the PR, especially `docs/content/README.md`, the template and the skill, and say "merge" or what to change.
- [ ] **Step 4:** Merge with `gh pr merge --merge` (a merge commit, same as plans 1 and 2), then `git switch main && git pull` to bring the local `main` up to date. **Expect** the Deploy run green.

### Task 4: Article 1, "Data foundations" (pilot run)

**Files:**
- Create: `src/content/articles/data-foundations.mdx`, `src/content/articles/images/data-foundations-*.svg`, `docs/content/articles/data-foundations/brief.md`, `docs/content/articles/data-foundations/fact-check.md`

- [ ] **Step 1 (Nikita):** Open an issue with the **Article request** form: main topic Data foundations, problems as you see them (likely Untrusted or siloed data), and your angle and notes. Tell Claude the issue number.
- [ ] **Step 2:** Run `/write-article <n>` steps 1 and 2. **Expect** `brief.md` on branch `article/data-foundations`, with every claim in the table carrying a URL.
- [ ] **Step 3 (Nikita):** Read the brief and outline. Approve, or say what to change; Claude revises until you approve.
- [ ] **Step 4:** Skill steps 4 to 9. **Expect** a PR with a preview URL, the linter green inside `build`, and the fact-check summary in its description.
- [ ] **Step 5 (Nikita):** Your own reading, then your edit: in VS Code on the branch, or by telling Claude what to change. Add your own angle and experience (public, non-confidential). Tell Claude when an edit round is done; Claude commits it (or you commit in GitHub Desktop, either is fine).
- [ ] **Step 6:** Skill revise mode after each of Nikita's edit rounds.
- [ ] **Step 7 (Nikita):** Work through the review checklist on the PR, ticking each box yourself, including opening every source link. Read the preview on your phone. Say "merge" when every box is ticked.
- [ ] **Step 8:** Merge, pull `main`. **Expect** the Deploy run green and the article live (still unindexed) at `/insights/data-foundations/`.

### Task 5: Pilot retrospective

- [ ] **Step 1:** With Nikita, list what went wrong or slowly in Task 4: linter false positives or misses, skill steps that were unclear, fact-check flags that were noise, anything Nikita had to fix by hand that a check could have caught.
- [ ] **Step 2:** On branch `workflow-fixes`, fix each item, test-first for linter or link-checker changes, and record each change and its reason in the ledger. If there's nothing to fix, say so in the ledger and skip to Task 6.
- [ ] **Step 3:** PR, checks green, Nikita's go-ahead, merge.

### Task 6: Article 2, "Practical AI for Complex Industrial Data"

**Files:**
- Create: `src/content/articles/industrial-ai.mdx`, `src/content/articles/images/industrial-ai-*.svg`, `docs/content/articles/industrial-ai/brief.md`, `docs/content/articles/industrial-ai/fact-check.md`

- [ ] **Steps 1 to 8:** As Task 4, on branch `article/industrial-ai`, from issue #14, main topic AI and analytics. The article links to `/insights/data-foundations/` where it explains why AI fails on untrusted data (the linter enforces the link), and reuses the Data foundations research where it still applies. *Amended 25 November 2026 (Nikita): this task was "Digital twins"; that article is deferred until his white paper is published, so it can cite it.* The fact-check in revise mode covers anything he adds that's a factual claim rather than opinion or experience.

### Task 7: About page details and privacy note

**Files:**
- Modify: `src/data/author.ts`, `tests/unit/author.test.ts`, `src/pages/about.astro`, `tests/e2e/pages.spec.ts`

**Interfaces:**
- `checkAuthorForLaunch(author, indexing)` also throws, naming the field, when `email` doesn't match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` or `linkedin` doesn't start with `https://www.linkedin.com/in/`. The check stays tied to indexing, so preview builds with placeholders keep working.
- The About page gains a "Privacy" section: the site sets no cookies and has no forms; Cloudflare Web Analytics counts visits without cookies; what Cloudflare says it collects and doesn't, in a sentence or two with a link to Cloudflare's own page (re-read and dated when written). Email and LinkedIn messages go to Nikita directly.

- [ ] **Step 1: Write failing tests.** `author.test.ts`: "rejects a malformed email in an indexable build"; "rejects a LinkedIn address that isn't a profile URL"; "the real author details are filled in": `placeholderFields(AUTHOR)` is `[]` and `checkAuthorForLaunch(AUTHOR, true)` doesn't throw. `pages.spec.ts`: the About page has a `Privacy` heading, its text says no cookies, and it links to a `cloudflare.com` page.
- [ ] **Step 2:** `npm test && npm run test:e2e` → **Expect** FAIL.
- [ ] **Step 3:** On branch `about-details`, implement the checks, fill in Nikita's details from Task 0 Step 2, and write the privacy section. Run humanizer over the bio and the privacy text, and show Nikita every change to his bio before keeping it.
- [ ] **Step 4:** `npm test && npm run test:e2e` → **Expect** PASS. `PUBLIC_ALLOW_INDEXING=true npm run build` → **Expect** success (it failed before, because of the placeholders).
- [ ] **Step 5 (Nikita):** Read the About page on the PR preview: name, bio, both links (click them), privacy text. Say "merge".
- [ ] **Step 6:** Commit, PR, checks green, merge.

This task can run while an article PR is waiting for Nikita's edit. Claude commits the article branch's work first, so switching branches never carries uncommitted changes across.

### Task 8: Launch prep: guard, indexing checks and runbooks (milestone)

Starts once Tasks 6 and 7 are merged: the indexing build in Step 5 needs the real About details, and Lighthouse needs both article pages to exist on the preview.

**Files:**
- Create: `docs/runbooks/09-search-console.md`, `docs/runbooks/10-launch-checklist.md`
- Modify: `src/lib/env.ts`, `tests/unit/env.test.ts`, `src/layouts/BaseLayout.astro`, `tests/deployed/site.spec.ts`, `lighthouserc.cjs`, `docs/runbooks/README.md`, `docs/adr/0007-repository-secret-hygiene.md`, `docs/runbooks/02-cost-guardrails.md`, `docs/runbooks/06-branch-protection.md`, `docs/runbooks/08-web-analytics.md`

**Interfaces:**
- Produces `checkSwitches(opts: { showDrafts: boolean; allowIndexing: boolean }): void` in `src/lib/env.ts`, throwing `PUBLIC_SHOW_DRAFTS and PUBLIC_ALLOW_INDEXING are both on: a public build must never show drafts.` `BaseLayout` calls it with `showDrafts()` and `allowIndexing()`, so any page build with both on fails (plan 1's deferred finding).
- Deployed tests added, run on every preview and production deploy:
  - "the sitemap lists only canonical addresses": every `<loc>` in `/sitemap-0.xml` starts with `https://practicallydigital.co.uk/` and ends with `/`, and `/sitemap-index.xml` lists `https://practicallydigital.co.uk/sitemap-0.xml`.
  - "every article in the listing is in the sitemap": each `/insights/<slug>/` link on `/insights/` appears in the sitemap.
  - "every page names the custom domain as canonical": for each sitemap path, `link[rel=canonical]` equals `https://practicallydigital.co.uk` + path (Review Focus 5).
  - "every contents link points at a heading on the page": on each `/insights/<slug>/` page, every `[data-toc-list] a` href is `#<id>` and `#<id>` exists (Review Focus 4).
  - The existing indexing test gains, when `PD_EXPECT_INDEXING === 'true'`: `/robots.txt` contains `Sitemap: https://practicallydigital.co.uk/sitemap-index.xml` and `Allow: /`.
- `lighthouserc.cjs` adds `/insights/data-foundations/` and `/insights/industrial-ai/` to `PAGES` (plan 1's Lighthouse run was against fixtures only).
- Runbook 09, Search Console: add a **Domain** property for `practicallydigital.co.uk` (covers `www`, `http` and `https`); copy the TXT verification record; add it in Cloudflare DNS for the `.co.uk` zone (DNS only, TTL Auto); **Verify**; then, after launch, **Sitemaps →** submit `https://practicallydigital.co.uk/sitemap-index.xml`, and **URL inspection →** the home page and both articles **→ Request indexing**. **Expect** lines for each, including what "Couldn't fetch" or "Blocked by robots.txt" means in the first days (cached robots.txt from before launch) and when to worry. Optional section: Bing Webmaster Tools, importing the verified property from Search Console. Every step and limit cites Google's or Microsoft's own pages, re-read and dated when written.
- Runbook 10, launch checklist, in order, each with who does it and **Expect**: both articles merged and every review-checklist box ticked on their PRs; About details live and correct; `npm run check:links` on both articles clean apart from known `check` lines; the last Deploy run green; Lighthouse on the latest preview passing including both article URLs; Nikita's browser check from the spec's Verification list (home, listing filters, contents pane and progress bar, full-width figures, search, 375px); RSS feed shows both articles; social previews checked with LinkedIn's Post Inspector (Nikita); DNSSEC still Active; Azure cost check £0.00 (runbook 02 steps 5 to 7); then the launch PR (Task 10); then runbook 09.

- [ ] **Step 1: Write failing tests:** `env.test.ts`: `checkSwitches` throws with both on and the exact message; doesn't throw for the other three combinations. Add the deployed tests above.
- [ ] **Step 2:** `npm test` → **Expect** FAIL (`checkSwitches` missing).
- [ ] **Step 3:** On branch `launch-prep`, implement `checkSwitches` and the `BaseLayout` call; add the Lighthouse URLs.
- [ ] **Step 4:** `npm test && npm run test:e2e` → **Expect** PASS. `PUBLIC_SHOW_DRAFTS=true PUBLIC_ALLOW_INDEXING=true npm run build` → **Expect** the build to fail with the message above.
- [ ] **Step 5: Local indexing run.** `PUBLIC_ALLOW_INDEXING=true npm run build`, `npx astro preview --port 4420`, then `PD_DEPLOYED_URL=http://localhost:4420 PD_EXPECT_INDEXING=true npm run test:deployed`. **Expect** every test to pass except plan 2's two known SWA-only failures (security headers, `/about` 301). Then the same with the default build and no `PD_EXPECT_INDEXING`. **Expect** the same result. Record both in the ledger.
- [ ] **Step 6:** Check Microsoft's Static Web Apps docs for a way to turn off or redirect the default `*.azurestaticapps.net` hostname on the Free plan. Cite what they say and the date. If there's a free setting, it becomes a runbook 10 step for Nikita; if not, runbook 10 says the canonical tags are the mitigation and Search Console only sees the custom domain.
- [ ] **Step 7:** Write runbooks 09 and 10 and add them to the runbook README. Optional items from Nikita's list: add to ADR-0007 that gitleaks-action scans only the first 30 commits of a PR (the API's default page size; cite the action's source or GitHub's API page) and what to do if a PR grows past that; add the missing *What it does* lines to runbooks 02, 06 and 08, and make runbook 08 step 1 describe the automatic-only screen Nikita actually saw (plan 2 ledger, Task 10 Step 2). Humanizer pass over all of it.
- [ ] **Step 8:** Dispatch a fresh reviewer per **superpowers:requesting-code-review** over `main..launch-prep`, with Review Focus 4 and 5 and the runbooks' accuracy against their cited pages as its checklist. Fix confirmed issues, re-run Step 4.
- [ ] **Step 9:** Commit, push, PR. **Expect** all three checks green, including the new deployed tests and Lighthouse on both article pages against the preview. Nikita's go-ahead, then merge.

### Task 9: Pre-launch checklist (Nikita and Claude)

- [ ] **Step 1:** Work through runbook 10 up to the launch PR. Claude runs the checks it can (link checker, `gh run view`, Lighthouse results from the preview artifact, RSS, `dig`/`nslookup` for DNSSEC); Nikita does the browser check, the Post Inspector check and the Azure cost check. Record each result with the date in the ledger.
- [ ] **Step 2 (Nikita):** If anything fails, it gets fixed through its own PR before Task 10. Say "launch" when the list is clear.

### Task 10: The launch switch

**Files:**
- Modify: `.github/workflows/deploy.yml`, `tests/unit/workflows.test.ts`, `README.md`, `docs/architecture/overview.md`, `docs/deployment.md`, `.env.example` (the indexing comment)

**Interfaces:**
- `deploy.yml`: the build step sets `PUBLIC_ALLOW_INDEXING: 'true'` (drafts stay `'false'`); the `test:deployed` step adds `PD_EXPECT_INDEXING: 'true'`. Comments updated.
- `ci.yml` is unchanged: previews stay `noindex`, because they're public addresses that must never be indexed.

- [ ] **Step 1: Write failing tests** in `workflows.test.ts`: replace "production pins drafts and indexing off" with "production builds with indexing on and drafts off"; add "production's smoke test expects indexing" (`PD_EXPECT_INDEXING: 'true'` on the `test:deployed` step); keep "every build pins drafts and indexing off" for `ci.yml` and rename it to say previews.
- [ ] **Step 2:** `npm test` → **Expect** FAIL.
- [ ] **Step 3:** On branch `launch`, change `deploy.yml`; update the "noindex until plan 3" wording in the README, overview, deployment guide and `.env.example`.
- [ ] **Step 4:** `npm test` → **Expect** PASS. Commit `feat: launch: let search engines index the production site`.
- [ ] **Step 5 (Nikita):** Push the branch from GitHub Desktop (**Push origin**). *What it does:* uploads the commit; your GitHub Desktop login can push workflow files, Claude's token can't. **Expect** the branch on GitHub.
- [ ] **Step 6:** Open the PR. **Expect** the three checks green; the preview is still `noindex` (the preview's own deployed test confirms it).
- [ ] **Step 7 (Nikita):** Say "merge". This is the launch.
- [ ] **Step 8:** Merge, pull `main`. **Expect** the Deploy run green with `PD_EXPECT_INDEXING: true`. Then Claude checks read-only: `curl -s https://practicallydigital.co.uk/robots.txt` shows `Allow: /` and the `Sitemap:` line; the home page and both articles have no robots `noindex` meta; the sitemap index and `sitemap-0.xml` return 200 and list both articles. **Rollback:** the **Revert** button on the PR (plan 2's deployment guide) puts `noindex` back; pages already indexed drop out over the following weeks.

### Task 11: Search Console, verification record and close-out

**Files:**
- Modify: `docs/deployment.md` (a plan 3 verification record), `docs/architecture/overview.md` ("what plan 3 added" and a post-launch list), plus this plan's ledger, archived as `docs/superpowers/plans/2026-11-15-content-and-launch-ledger.md`

- [ ] **Step 1 (Nikita):** Follow runbook 09. **Expect** the property verified, the sitemap status "Success" (it can take a few days to read it), and indexing requested for the three URLs.
- [ ] **Step 2:** On branch `launch-record`, write the verification record: both articles through every workflow step (links to their PRs, briefs and fact-check reports); the linter and link checker in use; About details live; the drafts-and-indexing guard tested; the launch deploy green with indexing expected; robots and sitemap checked live; Search Console verified and the sitemap submitted. Add the post-launch list: Content Security Policy, domain email (and replacing the no-email DNS records when it arrives), `<lastmod>` in the sitemap from the `reviewed` dates, the remaining plan 1 deferred findings, the value calculator and Application Insights from the spec's post-MVP list. Humanizer pass.
- [ ] **Step 3:** Commit, PR, checks green, Nikita's go-ahead, merge. Plan 3 is done.
