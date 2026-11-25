---
name: write-article
description: Research, brief, draft, fact-check and open a PR for a Practically Digital article from an "Article request" GitHub issue. Use as /write-article <issue-number>, or /write-article <issue-number> revise after Nikita has edited the draft.
---

# Write an article

Arguments: `$ARGUMENTS`, an issue number, optionally followed by `revise`.

The workflow and its rules are in [docs/content/README.md](../../../docs/content/README.md). Read it, `CLAUDE.md` and the spec's "Decided: content workflow" before starting. The hard content rules apply throughout: British English; no invented statistics, case studies or references; every factual claim linked to a source a reader can open; estimates labelled as estimates; nothing from client, MTC, employer or NDA work. Explain each git command in a line or two before running it.

If the arguments end in `revise`, skip to **Revise mode**.

## 1. Read the request and make the branch

1. `gh issue view <number>` and read every field. If the angle or the reader's problem is missing, ask Nikita before going further.
2. Pick the slug: short, lower case, hyphens, matching the main idea (for example `data-foundations`). It becomes the URL `/insights/<slug>/` and can't change after merge.
3. `git status` must be clean and `main` up to date with `origin/main` (`git fetch`, then compare). If not, stop and say why.
4. `git switch -c article/<slug>` from `main`.

## 2. Research and write the brief

Use **deep-research** (the `anthropic-skills:deep-research` skill). Research questions:

- the current state of the topic, in plain terms, for UK manufacturing and industry leaders;
- what's already published for this audience (government, Catapults, standards bodies, trade bodies, vendors), so the article builds on it rather than repeating it;
- public UK manufacturing and other industry examples, with stats where possible, with sources;
- what has and hasn't worked in the past for this audience, and why;
- credible further reading, and useful free tools, standards, templates or self-assessments.

Search queries name the topic only, never Nikita, the project or anything personal.

Write `docs/content/articles/<slug>/brief.md` with these sections:

- **Angle**: one paragraph, from the issue and the research.
- **What already exists, and the gap**: what's published and what this article adds.
- **Outline**: proposed H2 headings in order, each with a line on what it covers, ending with `Tools and resources` then `Further reading`. Note where costs, limitations and "when not to bother" are covered.
- **Claims**: a table, `# | Claim | Source URL | Where in the source | Type` (type is figure, fact or example). Only claims a source actually makes. "Where in the source" is a section, page or table, and at most one short quoted sentence. Paraphrase everything else (the repo is public).
- **Tools and resources candidates**: each with a link, what it's for, and free or paid.
- **Further reading candidates**: at least five, each with a link and a line on why.
- **Diagrams**: suggested diagrams, each with what it shows.
- **Open questions for Nikita**.

Commit the brief (`docs: research brief for <slug>`). Don't push yet.

## 3. Stop for Nikita's approval

Show Nikita the outline, the claim count and the open questions, and link to `brief.md`. **Do not draft until he approves.** Apply his changes to the brief and commit them.

## 4. Draft

Copy `docs/content/article-template.md` to `src/content/articles/<slug>.mdx` and write the article:

- Use only claims from the brief's table, each linked to its source at the point it's made. A new claim found while writing goes into the table first.
- Headings are free. The last two H2s are `Tools and resources` then `Further reading`. Remove the template's guidance comments.
- Cover costs, limitations and when not to bother. A technology guide links to `/insights/data-foundations/`.
- The gist (front matter) is two or three sentences: what it is, why it matters to this reader, and a one-line verdict. Nothing the body doesn't support.
- Draw each diagram as a hand-written SVG in `src/content/articles/images/<slug>-<name>.svg`, using the colours in `src/styles/tokens.css`, with real text (not outlines) and a `<title>`. Show it with the `Figure` component, with alt text that says what the diagram shows.
- If a `my-writing-style` voice profile exists, use it.
- Follow "Sources, figures and visuals" in `docs/content/README.md`. In short: link to a document's landing page, not the file.
- Aim for about 3,000 words. The pilot draft ran to 4,500 and needed cutting.
- Make the first draft visual, not only the final one: headline figures in a `StatRow`, one or two `PullQuote`s, caveats and legal duties in a `Callout`, a `BarChart` for one ranked series, and diagrams. Every figure in a component needs an `href` to its source (the linter checks). Propose any new kind of visual element to Nikita as a mockup before adding it.
- Mark passages drafted from Nikita's notes, or resting on our own judgement, with `{/* NIKITA: … */}` comments for his close review.
- No `draft: true` on the branch: the PR preview builds with drafts off, so a draft wouldn't appear on its own preview. Merging is publishing.

## 5. Humanizer

Run **humanizer:humanizer** over the whole draft, the gist and description included.

## 6. Checks

1. `npm test`: the article linter runs on every article (`tests/unit/content.test.ts`).
2. `npm run build`.
3. `npm run check:links -- src/content/articles/<slug>.mdx`. It also notes any link that goes straight to a file; swap those for the publisher's page where there is one.
4. `npm run check:spelling`: British English spell check. It reports, it doesn't fail the build. Fix real typos; add genuine names and terms to `docs/content/spelling-words.txt`.

Fix until the first three are clean and the spell check shows nothing but accepted words. `check` lines from the link checker aren't failures: open each one yourself if you can, and list the rest for Nikita.

## 7. Fact-check, by a fresh subagent

Dispatch a subagent that didn't write the draft, with the article path and the brief path. Its brief:

- Open every cited source. For each claim give a verdict (supported, partly supported, not supported, source unreachable) and where in the source it found it.
- Flag any factual sentence with no source.
- Check each Tools and resources entry is what the article says it is, is current, and is labelled paid if it is.
- Flag links that go straight to a file (PDF, spreadsheet, zip) when the publisher has a landing page for it.
- Flag the guide if it doesn't cover costs, limitations and when not to bother.
- Check the gist says nothing the body doesn't support, and that its verdict matches the body's conclusion.
- Flag passages that still read as AI-written.
- Quote at most one short sentence per source; paraphrase the rest.
- Search queries name the topic only.

Save its report as `docs/content/articles/<slug>/fact-check.md`, with the date.

## 8. Fix

Fix or remove every flagged claim. Never re-source a claim to a page that doesn't say it: if no source supports it, the claim goes. Re-run humanizer over the changed passages, then step 6 again. Add a "Resolved" note under each flag in `fact-check.md`.

## 9. Commit, push and open the PR

1. Commit the article, its images and `fact-check.md` (`feat: draft <slug> article`).
2. Push the branch: `git -c credential.helper= -c "credential.helper=!gh auth git-credential" push -u origin article/<slug>`. On Nikita's machine a plain `git push` waits for a Credential Manager sign-in; this uses the GitHub CLI's login instead. `-u` remembers where the branch goes.
3. `gh pr create` with the title `Article: <title>` and a description holding:
   - a summary of the article and its angle;
   - the preview note: the preview URL appears in a bot comment once the deploy finishes, at `/insights/<slug>/`;
   - the fact-check summary (verdict counts, and what was fixed or removed);
   - the `check` links Nikita should open by hand;
   - the review checklist from `docs/content/review-checklist.md`;
   - `Closes #<issue>`.

## 10. Hand over

Tell Nikita the PR is ready for his reading and edit. He reads the sources, edits the draft and adds his own angle, either directly or by asking for edits. Don't merge: merging is publishing, and needs his go-ahead after the checklist is ticked.

## 11. Publish (on Nikita's go-ahead)

1. Set `published` in the front matter to today's date, commit and push.
2. Wait for the required checks (`build`, `gitleaks`, `accessibility`) on that commit.
3. `gh pr merge <number> --merge --match-head-commit <sha>` (a merge commit; the sha check stops a merge if anything was pushed since).
4. `git switch main && git pull`, then confirm the Deploy run succeeded and the article answers at `/insights/<slug>/`.

## Revise mode

Run after Nikita's edits (`/write-article <issue-number> revise`), on the article's branch.

1. Read Nikita's changes and any `{/* CLAUDE: … */}` comments he left, and act on them. Fix spelling and grammar in his text yourself. Remove the review comments once each is dealt with (the linter fails while any are left).
2. Re-run the checks in step 6.
3. Fact-check only the claims added or changed since the last report, with a fresh subagent as in step 7, and append its findings to `fact-check.md` under a dated heading. Fix flags in your own text directly.
4. Run humanizer over the changed text, Nikita's included.
5. Put every proposed change to Nikita's own words in one numbered list, before and after, with the reason: group A for accuracy (from the fact-check), group B for style (from humanizer). He accepts, rejects or rewords each by number. Apply only what he accepts, and record his decisions under the fact-check report, including any claim he keeps without a source and why.
6. Set `reviewed` to today's date if the fact-check covered the whole article.
7. Update the PR description (`gh pr edit <number> --body-file <file>`) so it matches the article as it now stands: the links to open by hand, the fact-check summary and the review notes.
8. Commit (`docs: revise <slug> after review`) and push.
