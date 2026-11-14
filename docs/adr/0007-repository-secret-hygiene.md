# ADR-0007: Repository secret hygiene and dependency updates

## Status

Accepted, 14 November 2026. The [design spec](../superpowers/specs/2026-11-09-practically-digital-design.md) asks for secret scanning and push protection, a gitleaks pre-commit hook, Dependabot and a "secret leaked" procedure; this records how each is set up. Facts checked on 14 November 2026.

## Context

The repository is public, so anything committed is readable by anyone, permanently: deleting a file later doesn't remove it from history, forks or caches. The project has one real secret, the Static Web Apps deployment token (ADR-0004), held in GitHub Actions secrets. The aim is to stop a secret being committed at all, catch it on GitHub if one slips through, and know what to do if one leaks anyway.

Terms used below:

- **Pre-commit hook.** A script git runs just before it records a commit. If the script fails, the commit doesn't happen.
- **gitleaks.** An open-source tool that scans text for patterns that look like keys and tokens.
- **Push protection.** A GitHub feature that rejects a push containing a recognised secret.
- **Dependabot.** GitHub's service that opens pull requests to update dependencies.

## Options considered

### The local hook

**A committed `.githooks/` folder (chosen).** The hook is a short shell script in the repository. Each clone turns it on once with `git config core.hooksPath .githooks`. Nothing extra to install apart from gitleaks itself.

**The pre-commit framework.** The route gitleaks's README documents. It needs Python and the `pre-commit` package on every machine, which is a second toolchain for one hook.

**husky.** An npm package that installs hooks when `npm install` runs. It ties the hook to Node and adds a dependency to the site's package list for something that isn't part of the site.

All three are local only, and every local hook can be skipped. GitHub Desktop "will display the hook's output and give you the option to bypass the failed hook" ([Desktop and hooks](https://docs.github.com/en/desktop/making-changes-in-a-branch/working-with-git-hooks-in-github-desktop)). So the CI `gitleaks` job scans every pull request as the backstop, and branch protection (runbook 06) makes it a required check.

### On GitHub

Secret Protection and push protection are switched on in the repository settings (runbook 04). GitHub says repository-level push protection "is disabled by default, and can be enabled by a repository administrator" ([push protection](https://docs.github.com/en/code-security/secret-scanning/introduction/about-push-protection)). GitHub also has a user-level push protection that "is enabled by default" for pushes to public repositories (same page). They're independent checks, so a secret has to get past both the local hook and GitHub to land in the repository.

### Dependency updates

**Dependabot (chosen, per the spec)**, weekly, for npm and GitHub Actions. npm minor and patch updates come grouped in one PR, and each major version gets its own. All Actions updates come in one PR. A **7-day cooldown** means Dependabot only suggests a release once it's a week old. That gives the wider community time to spot a bad or hijacked release before it reaches us. GitHub states the cooldown applies to version updates only, "not *security* updates" ([options reference](https://docs.github.com/en/code-security/dependabot/working-with-dependabot/dependabot-options-reference)), so a security fix still arrives straight away.

## Decision

- gitleaks pre-commit hook in `.githooks/pre-commit`, turned on per clone (runbook 05). If gitleaks isn't installed, the hook stops the commit and says how to install it, so a missing tool can't let a commit through unchecked.
- The CI `gitleaks` job on every pull request, as a required check.
- Secret Protection, push protection and Dependabot alerts and security updates on in the repository settings (runbook 04).
- Dependabot as above.
- A written procedure for a leak: [secret-leaked.md](../runbooks/secret-leaked.md). Revoke and rotate first, then clean up.

## Consequences

- **gitleaks is in maintenance mode.** Its README says "Gitleaks is feature complete" and "Future releases will be security patches only", and the author is moving to a new project, Betterleaks ([gitleaks README](https://github.com/gitleaks/gitleaks)). It still works and still gets security fixes. If its rules stop keeping up with new token formats, revisit this ADR.
- **gitleaks-action isn't MIT-licensed.** From v2 it ships under its own end-user licence. A licence key is needed for organisation accounts but not for personal ones ([gitleaks-action README](https://github.com/gitleaks/gitleaks-action)). This repository belongs to a personal account, so no key is needed. If it ever moves to an organisation, the CI job will need one (free) or a switch to the gitleaks CLI directly.
- `.gitleaks.toml` keeps every default rule and allowlists only the two fake analytics tokens the unit tests use, by exact value. Any other exception should be added the same way: one value, with a comment saying why.
- The hook has to be turned on in each new clone, and only scans what's staged. A secret typed into a file you never commit is never seen, which is fine.
- The hook needs Unix line endings, so `.gitattributes` forces LF for `.githooks/*`. A Windows line ending on the `#!/bin/sh` line stops it running.
- Dependabot PRs get no Actions secrets, so they skip the preview deploy. `build` and `gitleaks` still run, and the skipped `accessibility` check counts as passing (ADR-0005).

## Cost impact

£0. gitleaks and the hook are free, gitleaks-action is free for personal accounts, and Secret Protection, push protection and Dependabot are free for public repositories.
