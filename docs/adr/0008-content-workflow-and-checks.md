# ADR-0008: Content workflow and its checks

## Status

Accepted, 15 November 2026. It turns the spec's "Decided: content workflow" into tooling, and records one change to the spec's "Decided: article structure", agreed by Nikita on 15 November 2026. The workflow itself is described in [docs/content/README.md](../content/README.md).

## Context

The site's value rests on articles that are accurate, sourced and readable, written by Claude and edited by Nikita. The spec fixes the steps (an article request, research, a draft, humanizer, Nikita's edit, a pull request, merge to publish) and a minimum review checklist. It leaves open how each step is run and what checks it automatically. Nikita writes no code, so whatever runs has to explain its own failures in plain words. Hosting stays at £0.

Terms used below:

- **Issue form.** A GitHub issue template written in YAML that shows a form with fields, dropdowns and required answers, instead of a blank text box.
- **Project skill.** A set of instructions in `.claude/skills/` that Claude Code loads when it's called by name, here `/write-article`.
- **Linter.** A program that reads a file and reports rule breaks without changing it.

## Options considered

### The article request

**An issue form (chosen).** Dropdowns for the main topic and the reader problems use the same names as the site's taxonomy, so a request can't name a topic the site doesn't have. A test checks the two lists stay the same. **A plain Markdown issue template** is simpler, but free text drifts, and the skill would have to guess which topic was meant.

### Running the workflow

**A Claude Code project skill (chosen).** The spec already names it (`/write-article <issue#>`). Research, drafting and fact-checking are judgment work, which a skill describes and a script can't do. **A script** could only run the mechanical parts (branch, checks, PR) and would leave the rest undocumented.

### Automatic checks on articles

**A linter inside `npm test` (chosen).** It runs on every article on every pull request through the existing required `build` check, so no workflow file or repository setting changes. **A separate CI job** would give a clearer name in the checks list, but means editing workflow files and adding a required check in the ruleset, for the same result. **No linter, checklist only** relies on people catching an unsourced percentage or a missing section every time.

The linter checks what a machine can check reliably: the two closing sections, a bullet list under Tools and resources, three `https` links under Further reading, figures without a link or an "estimate" label, leftover markers, `http://`, local or preview links, a short list of American spellings, and the data foundations link. It can't tell whether a source supports a claim. That's the fact-check subagent's and Nikita's job.

### The audit trail

**A brief and fact-check report beside each article in `docs/content/articles/<slug>/` (chosen, plan 3 decision 2).** The claim table shows where every claim came from, so an article can be re-checked a year later. **The pull request description only**, which is what the spec's wording implies, is hard to find once the PR is merged. The repository is public, so these notes quote at most one short sentence per source and paraphrase the rest.

### Link checking

**By hand, before the PR (chosen).** `npm run check:links` checks every external link, and every internal link against the built site. **In CI on every pull request** would catch rot automatically. But external sites go down, rate-limit, or block robots with 403 and 429 answers, and a publisher's bad afternoon shouldn't block a merge or make the required checks flaky. So the checker sorts results into `ok`, `broken` (404, 410, no such site) and `check` (blocked, rate-limited, server error or slow), and only `broken` fails it. A scheduled link check of the live site is a candidate for the post-launch list.

### Article structure

**Free headings, two fixed closing sections (chosen, decided by Nikita on 15 November 2026).** Heading wording and the number of sections are free. Every article ends with `Tools and resources` (things to use, as a bullet list of links) then `Further reading` (things to read). The spec's seven-part structure becomes the template's suggested sections. **The spec's fixed shape**, checked heading by heading, makes every article read alike and forces awkward headings onto topics that don't fit them.

What moved from the checker to people: nothing checks automatically any more that a guide covers costs, limitations and when not to bother. The fact-check subagent flags it if it's missing, and the review checklist has a line for it. The spec carries a dated note pointing here.

Fixing Further reading as the last section also suits the existing styling: the article stylesheet styles the list after the last H2 as the reading list.

### Drafts

**No `draft: true` on article branches (chosen, plan 3 decision 3).** Pull request previews are built with drafts off, a setting plan 2 pins and tests, so a draft-flagged article wouldn't appear on its own preview. Articles on a branch are written unflagged, and merging the PR is the publish step, as the spec says. `draft: true` stays available for parking unfinished work on `main`; the linter skips drafts. **Drafts on for preview builds** would mean changing `ci.yml` and the test that guards it, and would put every parked draft on every preview.

## Decision

An issue form, the `/write-article` project skill with a stop for Nikita's approval after the brief, a linter run by `npm test`, a brief and fact-check report committed beside each article, a link checker run by hand, free headings with Tools and resources and Further reading fixed at the end, and no draft flag on article branches.

## Consequences

- A rule break in an article fails the pull request's `build` check with the file, line and rule named.
- Drafts are public from their first push: the branch is in a public repository, and the preview URL is public (but not indexed).
- Headings become URL anchors in the contents pane, so their wording is settled before an article merges, not changed afterwards.
- The linter's spelling list is short on purpose. It catches the usual slips, not every American spelling. Nikita's read is the backstop.
- A capitalised American spelling mid-sentence is taken as part of a name ("International Organization for Standardization") and skipped.
- Links rot after publication, and nothing watches for that yet.

## Cost impact

£0. Everything runs locally or inside the existing free CI. The link checker sends a few dozen requests per article, with a generic User-Agent (`practically-digital-linkcheck`) and at most four at a time.
