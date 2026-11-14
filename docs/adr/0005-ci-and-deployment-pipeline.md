# ADR-0005: CI and deployment pipeline

## Status

Accepted, 14 November 2026. The [design spec](../superpowers/specs/2026-11-09-practically-digital-design.md) asks for GitHub Actions, a preview URL on every pull request and a deploy on merge to `main`; Nikita approved the details below on 13 November 2026. How it runs day to day is in [deployment.md](../deployment.md).

## Context

The site is built by Astro (ADR-0001) and hosted on Azure Static Web Apps Free (ADR-0004). Each change goes through a pull request, which needs checking: tests, a secret scan, and accessibility and performance checks against a real deployment. Merging to `main` should then publish the change without anyone touching Azure.

Terms used below:

- **Workflow.** A YAML file in `.github/workflows/` that tells GitHub Actions what to run and when. A workflow has *jobs*, and each job runs its *steps* on a fresh virtual machine (a *runner*).
- **Action.** A reusable step published by someone else, such as `actions/checkout`.
- **Artifact.** A file or folder that a job saves so a later job (or a person) can download it.
- **Oryx.** Microsoft's build system. By default the SWA deploy action uses it to build your site inside its own container.

## Options considered

### Where the site is built

**Build once in our job, deploy that build (chosen).** The `build` job runs the tests, builds `dist/`, and runs the browser tests against the same configuration. It saves `dist/` as the `site` artifact. The preview job downloads that artifact and deploys it with `skip_app_build: true`. What gets checked on the preview is exactly what the tests passed.

**Let SWA's action build with Oryx.** The default in Microsoft's generated workflow. The site would be built a second time, by a different toolchain, with its own Node version, so a test pass wouldn't strictly cover the bytes that get deployed. It would also need our build switches passed through to Oryx.

Production rebuilds from `main` rather than reusing a PR artifact. The merge result can differ from the PR branch, and the production build is the only one that reads the analytics variable.

### How the workflow proves it may deploy

**The SWA deployment token (chosen, per the spec).** One secret, `AZURE_STATIC_WEB_APPS_API_TOKEN`, stored in GitHub, used by three steps: the preview deploy, the preview clean-up and the production deploy. If it leaks, it can be reset in the portal in a minute ([secret-leaked.md](../runbooks/secret-leaked.md)).

**OpenID Connect (OIDC).** GitHub proves the workflow's identity to Azure directly, with no stored secret. It needs an app registration and role assignments in Microsoft Entra ID, which is a chunk of identity configuration to learn and maintain for one static site. Kept for later, possibly as Digital Lab material.

### Pinning actions

Every third-party action is referenced by a full 40-character commit SHA, with the version as a comment (`actions/checkout@3d3c42e5… # v7.0.1`). A tag like `v7` can be moved to point at different code, so a compromised publisher could change what our workflow runs. A commit SHA can't be changed. A unit test checks every `uses:` line, and the repository setting that enforces SHA pinning is on (runbook 04). Dependabot proposes SHA updates weekly.

One gap: the SWA action is a Docker action whose Dockerfile starts `FROM mcr.microsoft.com/appsvc/staticappsclient:stable` (read at the pinned commit). `stable` is a moving tag, so pinning the action's SHA pins its wrapper script but not the deploy client it runs. We accept that: the client is Microsoft's own, it's the only supported way to deploy, and it only ever receives the token for this one app.

### Which PRs get a preview

Only PRs from this repository, not from forks or Dependabot, because those runs don't get Actions secrets. With the exception of `GITHUB_TOKEN`, "secrets are not passed to the runner when a workflow is triggered from a forked repository" ([secrets](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions)), and for Dependabot "the only secrets available to the workflow are Dependabot secrets" ([Dependabot on Actions](https://docs.github.com/en/code-security/dependabot/troubleshooting-dependabot/troubleshooting-dependabot-on-github-actions)). Without the condition the deploy step would fail on a missing token. With it, the job is skipped, and GitHub counts a skipped job as "Success" for required checks ([conditions](https://docs.github.com/en/actions/using-jobs/using-conditions-to-control-job-execution)). The workflows never use `pull_request_target`, the trigger that does hand secrets to fork PRs.

### Lighthouse thresholds

Accessibility must score 100, best practices 95, performance 90 and SEO 90, on the median of three runs for each of six pages. The SEO audit for "page is blocked from indexing" is skipped, because the site is deliberately `noindex` until launch. Performance gets the most headroom because GitHub's shared runners vary in speed from run to run. Locally, against `astro preview`, every page scored 100 in every category (14 November 2026). If a performance failure turns out to be runner noise rather than the site, the fix is more runs, not a lower bar.

### Node

CI reads the Node version from `.nvmrc` (26), and `package.json` requires `>=26`. A unit test keeps the two in step.

## Decision

Two workflows: `ci.yml` for pull requests (`build`, `gitleaks`, `accessibility`, `close-preview`) and `deploy.yml` for `main`. Build once per PR and deploy the tested artifact; deploy with the SWA token; pin every action to a SHA; preview only same-repository, non-Dependabot PRs; enforce the Lighthouse thresholds above. Top-level permissions are read-only; only `accessibility` can write, and only to PR comments, so the SWA action can post the preview link. `close-preview` shares the preview's concurrency group, so closing a PR cancels a deploy still in progress before deleting the preview. Manual production runs are limited to `main`, and CI runs the same gitleaks version (8.30.1) that runbook 05 installs.

## Consequences

- A PR shows three required checks. Dependabot and fork PRs show `accessibility` as skipped, which counts as passing.
- The deploy token is used by exactly three steps, all of them the SWA action, and a test checks that.
- Every action update arrives as a Dependabot PR with a new SHA. Those PRs run `build` and `gitleaks` but skip the preview, so an update to the SWA action itself is first exercised by the production deploy after merging. If that deploy fails, revert the Dependabot PR.
- The `stable` image behind the SWA action can change without a PR. If a deploy suddenly breaks with no change on our side, that's the first suspect.
- A fourth simultaneous PR may fail to get a preview (Free allows 3). [deployment.md](../deployment.md) says what to do.

## Cost impact

£0. GitHub Actions minutes are free for public repositories on standard GitHub-hosted runners ([billing for Actions](https://docs.github.com/en/billing/managing-billing-for-your-products/managing-billing-for-github-actions/about-billing-for-github-actions)), and SWA Free deploys don't cost anything (ADR-0004).
