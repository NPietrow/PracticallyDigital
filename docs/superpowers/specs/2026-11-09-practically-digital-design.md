# Practically Digital: design (MVP)

*Brainstormed with Nikita and approved on 2026-11-09. This is the source document for the implementation plan.*

## Context

Nikita wants an independent educational site that helps UK industrial leaders understand practical digital technology. The name is **Practically Digital** (`practicallydigital.co.uk`, with `.uk` redirecting; Nikita registers these himself). The project folder is currently empty apart from `.claude/settings.local.json` and is not yet a git repo. This is a greenfield build. The folder is being renamed to `C:\Users\np\Documents\GitHub\PracticallyDigital` (see Next steps), and no file, code or doc should use any earlier working title.

The site has three jobs: **educate** business readers, **demonstrate** the technologies (including the site's own architecture), and let Nikita **learn** modern web architecture, Azure and AI-assisted workflows.

## Audience and intent

- **Reader:** a leader or manager in a UK industrial organisation (manufacturing, water, similar), often an SME. Lives with data that is poor quality, siloed or untrusted. Aware of AI/digital hype at a high level. Arrives mostly with a **problem** ("downtime", "can't see what's happening", "data's a mess"), sometimes with a **technology** ("we should use AI").
- **They should leave with:** enough understanding to raise it internally, one or two realistic quick wins, and honest answers on skills, tooling, cost and measurable impact.
- **Readers are time-poor:** summary first, depth after.
- **Ethos:** data foundations first. Every technology article says plainly that it fails on untrusted data.

## Goals (12 months)

- A range of articles, **depth and quality over volume** (one solid article a month beats four thin ones).
- Steady traffic of people who read and use the material.
- Every article has strong, credible further-reading resources.
- Stretch, not a priority: consulting/coaching enquiries via a low-key author/contact route.

## Non-goals (MVP)

Value calculator (wanted, post-MVP), Application Insights (post-MVP), scheduled/automated article generation, comments, newsletter, user accounts, a CMS, monetisation, interactive Digital Lab demos.

## Anti-goals (failure even if it works)

- **AI-sounding writing.** This is the biggest one.
- Invented statistics, case studies or references; hype; vendor-brochure tone.
- An unexpected Azure bill.
- A leaked secret in the public repo.

## Constraints

- **Cost:** £0/month hosting target (domain excluded). No paid Azure resources without explicit approval. Budgets and alerts are warnings, not caps; prefer services with fixed quotas.
- **Azure:** Claude never deploys or changes anything in Azure. Claude writes step-by-step runbooks; Nikita does it in the portal.
- **Roles:** Nikita is product owner and architect; he wants to understand every architectural decision but **writes no code**. Claude writes all code and explains it.
- **Git and GitHub: Nikita does all of it himself**, the same way as Azure, using **GitHub Desktop** and the **VS Code terminal**. Claude never runs state-changing git or GitHub commands (init, add, commit, branch, checkout, merge, push, pull, PR creation, repo settings). At each point where git work is needed, Claude stops and gives numbered steps: what to do in GitHub Desktop (or the exact terminal command), what each step does and why, and what he should see afterwards. That includes branches, PRs, merges, resolving conflicts and undoing mistakes, which are the areas he wants to learn. Claude may run **read-only** checks (e.g. `git status`, `git log`, `git diff`, `gh issue view`) to see the state of things.
- **Public repo** with strict secret hygiene (below).
- British English throughout. Editorial rules from the project brief apply (sources for claims, fair limitations, explain jargon, manufacturing examples).

## Decided: how it gets made

| Area | Decision |
|---|---|
| Framework | **Astro**, static output, articles as Markdown/MDX content collections |
| Hosting | **Azure Static Web Apps, Free plan**. Uses the `*.azurestaticapps.net` URL until the domain is attached. Builder verifies Free-plan quotas and that there's no overage billing before Nikita creates it. |
| Deploy | GitHub Actions: merge to `main` deploys; every PR gets an SWA **preview URL** for review |
| Search | **Pagefind** (index built at build time, no server) |
| Analytics | **Cloudflare Web Analytics** (cookieless, no consent banner). Application Insights later, as Digital Lab material, with cookies off and a daily cap. |
| Repo | **Public** on GitHub; `main` branch-protected so nothing goes live without Nikita's approval |
| Writing workflow | Run manually by Nikita in Claude Code (no schedule) |

## Decided: content workflow

1. Nikita opens a GitHub issue using an **"Article request"** template (topic, angle, reader problem, his notes).
2. Nikita runs a project skill (e.g. `/write-article <issue#>`) locally in Claude Code. It:
   - researches the topic: state of the art, existing publications, useful resources, aiming to build on existing work rather than repeat it
   - writes a research brief and outline, then a draft in the standard article structure, with suggested visuals
   - runs the **humanizer** skill over the draft
   - writes the draft files into the working folder (Nikita should already be on a new branch; the skill reminds him first) and prints the PR description, including the review checklist, ready to paste
3. Nikita commits and pushes the branch in GitHub Desktop and opens the **pull request**. This creates the preview URL.
4. In parallel, Nikita does his own reading, then edits the draft and adds his own angle (in VS Code, or by asking Claude for edits), committing as he goes.
5. Nikita merges the PR, and the site deploys.

The same pattern applies to all code work: Claude edits files on whichever branch Nikita has checked out, then hands over the commit, push and PR steps.

PR review checklist (minimum): every source link opened and checked; no invented numbers; "would I say this out loud?"; no client, MTC or NDA material; images licensed; British English.

Optional: build a voice profile from Nikita's own writing (setup-writing-style skill) so drafts start closer to his voice. This needs samples from him.

## Decided: article structure

Every article follows the brief's seven questions, under a fixed shape:

1. **The gist** (summary box at the top: what it is, why it matters, and the one-line verdict)
2. What it is (with analogy or example)
3. How it works, conceptually
4. Business problems it solves
5. Measurable value (with sourced figures or clearly labelled estimates)
6. Challenges, costs and limitations
7. Is it right for you? (when to adopt, when not to, quick wins)
8. Further reading (curated, credible, public)

Metadata: title, description, author (Nikita), published and last-reviewed dates, reading time, **topics** (technology) and **problems** (reader pain points), hero/OG image.

## Decided: visual design, "Stone and signal"

- Warm stone-grey backgrounds, near-black ink text and top bar, **signal yellow** as the single highlight (active contents item, reading-progress bar, gist accent). Yellow is never used for text on light backgrounds (contrast).
- Crisp sans-serif type, small metadata labels; should feel engineered and precise (IBM-leaning).
- Article page: **sticky left contents pane** with numbered sections and scroll highlighting, plus a reading-progress bar. On mobile the contents collapses to a dropdown.
- Figures in two sizes: **inline** and **full-width breakout** for complex diagrams and tables.
- Short paragraphs interleaved with diagrams and illustrations. Prefer diagrams (SVG/Mermaid) and licensed images over AI-generated pictures.
- The whole site (home, listings, topic pages) shares the same system. Wordmark logo for now.
- Build with the **taste skill** (design-taste-frontend) and frontend-design guidance.

## Decided: security for a public repo

- GitHub **secret scanning and push protection** on (Nikita enables; runbook provided).
- **gitleaks** pre-commit hook locally.
- Secrets only in GitHub Actions secrets (SWA deploy token). `.env` git-ignored; committed `.env.example` with blank values.
- Dependabot for dependency updates.
- A documented "secret leaked" procedure: revoke and rotate first, then clean up (history and forks persist).

## Decided: documentation

- Architecture decisions recorded as **ADRs**, each with options considered, down-select and rationale. These feed a future on-site article, "How this site is built".
- Architecture overview and deployment docs (MVP requirement).
- Runbooks for every manual step Nikita does: Azure SWA setup, budget and alerts, custom domain, Cloudflare analytics, GitHub security settings.

## MVP scope (from the brief, plus decisions above)

Responsive homepage; Insights listing (filter by topic and problem); article pages; topic pages; Digital Lab placeholder; About page with author bio and a low-key "ask a question" route; Pagefind search; SEO metadata, sitemap, Open Graph/social previews; GitHub-based deployment with PR previews; basic accessibility and performance validation; architecture and deployment documentation; the article-writing skill and issue template.

**Launch content (Nikita's decision):** two finished articles, **Data foundations** and **Digital twins**, both through the full workflow including Nikita's edit. The site can be built and deployed to the temporary URL before they're done; public launch waits for both. Build and test against these real drafts as they progress, with fixture content only in tests, never shipped.

**Taxonomy (approved by Nikita):** the topic and problem lists below are fixed for the MVP. New entries can be added later; existing ones shouldn't be renamed.

## Claude's calls (Nikita to check)

- **Initial topics:** Data foundations; AI and analytics; Digital twins; IoT and connectivity; Cloud and infrastructure; Digital strategy (Industry 4.0).
- **Initial problems:** Untrusted or siloed data; Unplanned downtime; No visibility of operations; Quality and scrap; Energy and cost; Skills and adoption.
- Homepage offers two ways in: "Start with a problem" and "Explore a technology", plus latest articles.
- "Ask a question" for the MVP is a `mailto:` plus LinkedIn link (no form, so no personal data processing). Domain email comes later.
- Until the custom domain is live, the site is `noindex` so search engines don't index the temporary URL.
- RSS feed included (cheap, useful for this audience).
- Accessibility target: WCAG 2.2 AA, checked with automated axe/Lighthouse runs in CI.
- Digital Lab placeholder explains the convention every future demo will follow: labelled as **live**, **simulated** or **conceptual**.

- **PR approval:** Nikita opens all PRs under his own account, so GitHub's "required reviewer" rule can't apply (you can't approve your own PR). Branch protection on `main` therefore means: changes only via PR, required status checks (build, gitleaks, accessibility) must pass, no force-push, and **Nikita merges manually**. A separate bot account is unnecessary while the workflow is manual.
- **DNS:** use Cloudflare's free DNS for `practicallydigital.co.uk` whichever registrar Nikita uses. It handles the apex CNAME-flattening that SWA needs and pairs with Cloudflare analytics. `.uk` redirects to `.co.uk` via a Cloudflare redirect rule. `noindex` comes off in the same PR that sets the production site URL.
- **About page and contact:** built with placeholders for the bio, public email and LinkedIn URL. Nikita supplies these before launch. No employer-confidential material.

## Plugins and skills used

| When | Skill |
|---|---|
| Planning the build | **superpowers:writing-plans** (next step after approval) |
| Building | **superpowers:executing-plans**, run sequentially in the main session (not subagent-driven: one working folder, Nikita commits each step, easier to follow); **test-driven-development** for logic (filters, search, build scripts); **verification-before-completion** before claiming anything works; **requesting-code-review** at milestones; **systematic-debugging** for any failures |
| UI and visual design | **taste-skill:design-taste-frontend** (main design skill, including its browser checks) with **frontend-design** guidance |
| Article drafts and all site copy (home, About, Digital Lab, page descriptions) | **humanizer:humanizer** pass on everything published |
| Voice (optional) | **setup-writing-style** to build Nikita's voice profile from his writing samples |
| Article research | **deep-research** inside the `/write-article` skill |
| Git-related superpowers skills (worktrees, finishing a branch) | Adapted: Claude produces the steps for Nikita instead of running git |

### Where subagents are used

- **Article research:** parallel research subagents (via deep-research) covering state of the art, publications, UK examples and further reading.
- **Draft review:** after the humanizer pass, a fresh subagent that didn't write the draft fact-checks it (opens every cited source and flags unsupported claims) and flags remaining AI-sounding passages. Its report goes into the PR description for Nikita.
- **Code review:** a fresh reviewer subagent at each build milestone (requesting-code-review).
- **Not used** for parallel implementation.

## Next steps after approval

1. **Rename the folder (Nikita).** Close this Claude Code session, rename `C:\Users\np\Documents\GitHub\DemystifyingDigital` to `PracticallyDigital` in File Explorer, then open a new Claude Code session in the renamed folder. Renaming it with the session open would pull the folder out from under the session. It isn't a git repo yet, so nothing in git breaks.
2. In the new session, Claude saves this document to `docs/superpowers/specs/2026-11-09-practically-digital-design.md` (the plan file stays in `~/.claude/plans` for reference) and adds a short `CLAUDE.md` for the project (name, roles, git and Azure rules, which skills to use).
3. **Nikita creates the repo** following Claude's steps: GitHub Desktop "Add local repository", then create, commit and publish as a public repo named `practically-digital`. The first commit contains the spec and `CLAUDE.md`.
4. Claude invokes **superpowers:writing-plans** to produce the implementation plan, with git handover points marked.
5. Nikita: register `practicallydigital.co.uk` and `.uk`; check the UK IPO trademark register for "Practically Digital".

## Left to the builder

Styling approach (e.g. Tailwind vs plain CSS), component structure, fonts (within "crisp sans"), Mermaid rendering method (build-time preferred, no client JS), OG image generation method, test tooling, repo layout, exact CI steps.

## Verification

- `npm run build` succeeds; Pagefind index is generated; automated accessibility (axe) and Lighthouse checks pass in CI against the PR preview.
- Manual check in the browser pane: homepage, listing filters, article contents pane and progress bar, full-width figures, search, mobile layout at 375px.
- Gitleaks catches a planted fake secret in a test commit (then discarded).
- A first PR produces an SWA preview URL; merging deploys to production (after Nikita completes the runbooks).
- Azure cost check: confirm only the SWA Free resource exists and the budget alert is configured.
