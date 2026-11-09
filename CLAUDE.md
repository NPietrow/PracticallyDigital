# Practically Digital

An independent educational site that helps UK industrial leaders understand practical digital technology (data foundations, AI, digital twins, IoT, cloud). Planned domain: `practicallydigital.co.uk`.

The approved design is [docs/superpowers/specs/2026-11-09-practically-digital-design.md](docs/superpowers/specs/2026-11-09-practically-digital-design.md). Read it before planning or building anything. Don't revisit decisions already recorded there without asking.

## Roles

- **Nikita:** product owner and architect. He wants to understand every architectural decision, but he writes no code.
- **Claude:** writes and explains all code, content drafts and docs. For significant decisions, give a recommendation, the rationale, the alternatives and the implications before building.

## Hard rules

- **Git and GitHub:** Nikita does all of it himself, in GitHub Desktop and the VS Code terminal. Never run state-changing git or `gh` commands (init, add, commit, branch, checkout, merge, push, pull, PR creation, repo settings). Read-only commands (`git status`, `git log`, `git diff`, `gh issue view`) are fine. When git work is needed, stop and give numbered steps: what to do, what each step does, and what he should see afterwards.
- **Azure:** never deploy or change anything in Azure. Write step-by-step runbooks for Nikita to follow in the portal.
- **Cost:** £0/month hosting target. No paid resources without explicit approval. Explain worst-case cost exposure before recommending anything billable.
- **Public repo:** never commit secrets. Keys go in GitHub Actions secrets or a git-ignored `.env`.
- **Content:** British English. No invented statistics, case studies or references. Every factual claim has a source. Run humanizer over everything that gets published.

## Skills

- Planning: superpowers:writing-plans. Building: superpowers:executing-plans, run sequentially in this session, plus test-driven-development, verification-before-completion and requesting-code-review.
- UI: taste-skill:design-taste-frontend, with frontend-design guidance.
- Copy and articles: humanizer:humanizer. Research: deep-research.
- Subagents only for research, fact-checking drafts and code review, never for parallel implementation.
