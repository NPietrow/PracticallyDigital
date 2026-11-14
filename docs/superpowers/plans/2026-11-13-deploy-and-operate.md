# Deploy and Operate Implementation Plan (plan 2 of 3)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task, sequentially in the main session (per project `CLAUDE.md`). Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** The site from plan 1 builds, tests and deploys itself. Every pull request is checked and gets a preview URL, merging to `main` deploys to Azure Static Web Apps (Free), and `practicallydigital.co.uk` serves it. All of this sits behind branch protection, secret hygiene, cost alerts and cookieless analytics, with a runbook for every manual step.

**Architecture:** Two GitHub Actions workflows. `ci.yml` runs on pull requests: it builds once, runs the unit and browser suites, scans for secrets, then deploys that exact build to an SWA preview environment and runs axe and Lighthouse against it. `deploy.yml` runs on merge to `main`, builds the production configuration, deploys it with the SWA deployment token and smoke-tests the live site. SWA routing (real 404 status, trailing slashes, security headers) lives in `public/staticwebapp.config.json`. Cloudflare holds DNS for both domains, DNS-only for the site and proxied only for the redirect hostnames. Everything in Azure, Cloudflare and GitHub settings is done by Nikita from runbooks in `docs/runbooks/`.

**Tech Stack:** GitHub Actions, `Azure/static-web-apps-deploy` (v1), `gitleaks/gitleaks-action` (v3) and the gitleaks 8.30 CLI, Dependabot, Playwright and `@axe-core/playwright` (existing), `@lhci/cli`, `yaml` (for config tests), Astro's Container API (`experimental_AstroContainer` from `astro/container`), Azure Static Web Apps Free, Azure Cost Management, Cloudflare DNS, Redirect Rules and Web Analytics.

**Spec:** [docs/superpowers/specs/2026-11-09-practically-digital-design.md](../specs/2026-11-09-practically-digital-design.md). Plan 1: [2026-11-09-site-foundation.md](2026-11-09-site-foundation.md) and its [ledger](2026-11-09-site-foundation-ledger.md).

**Decisions approved by Nikita on 13 November 2026** (recorded in the ADRs this plan writes):
- Node: CI reads `.nvmrc` (26); `engines` becomes `>=26`.
- Cloudflare records for the site are DNS-only; the Web Analytics beacon goes into the code (a fourth client-JS exception), production only.
- `www.practicallydigital.co.uk` redirects to the apex via a Cloudflare redirect rule.
- SWA is created with deployment source **Other** (Azure commits nothing); the workflow builds once and deploys that build with `skip_app_build`.
- No preview deploy for fork or Dependabot PRs; third-party actions pinned to commit SHAs; `main` ruleset with no bypass; gitleaks hook via committed `.githooks/`; Lighthouse thresholds below; security headers without a CSP for now; £1 budget with alerts; DNSSEC and "no email" DNS records; UK IPO trademark search as a gate before the domain is attached.

**Nikita's starting point (13 November 2026):** both domains are registered with Cloudflare Registrar, so DNS is already on Cloudflare. He has an Azure account whose free trial has ended (subscription disabled), and he hasn't checked the trademark register yet.

**Sources checked on 13 November 2026.** Providers change their pages, so Task 1 re-reads these before Nikita creates anything:
- SWA Free quotas: 100 GB bandwidth a month, 3 preview environments per app, 2 custom domains, 250 MB per environment, 500 MB in total, 15,000 files, no SLA. Overage bandwidth on Free is "Unavailable" ([quotas](https://learn.microsoft.com/en-us/azure/static-web-apps/quotas), [plans](https://learn.microsoft.com/en-us/azure/static-web-apps/plans)). Over quota, "we will not be able to serve your site", and only Standard is "billed at overage rates" ([pricing FAQ](https://azure.microsoft.com/en-gb/pricing/details/app-service/static/)).
- Preview environments are public ("Anyone can access the staged versions") and are deleted when the PR closes ([review PRs](https://learn.microsoft.com/en-us/azure/static-web-apps/review-publish-pull-requests)).
- Pay-as-you-go has no spending limit ([spending limit](https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/spending-limit)). Budgets only alert ("consumption isn't stopped"), are evaluated every 24 hours on cost data 8–24 hours old, and may not be available for 48 hours on a new subscription ([budgets](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-acm-create-budgets)). An expired trial is upgraded with **Upgrade subscription** ([upgrade](https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/upgrade-azure-subscription)).
- A skipped job "will report its status as 'Success'" for required checks ([conditions](https://docs.github.com/en/actions/using-jobs/using-conditions-to-control-job-execution)). Dependabot runs get "only ... Dependabot secrets" ([Dependabot on Actions](https://docs.github.com/en/code-security/dependabot/troubleshooting-dependabot/troubleshooting-dependabot-on-github-actions)). Fork PR runs get no secrets except `GITHUB_TOKEN` ([secrets](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions)).
- Not confirmed by any page: whether an SWA `rewrite` keeps the 404 status (so we set `statusCode` explicitly and test it on the preview), whether the portal still offers source "Other", which regions SWA offers, and whether rulesets are on GitHub Free (one page says Team and Enterprise only, another says all plans). The runbooks give a fallback for each.

## Global Constraints

- Every Global Constraint in plan 1 still applies, except the Node line, which becomes: **Node `>=26`** in `engines`, `.nvmrc` = `26`, and CI uses `node-version-file: .nvmrc`.
- **Cost:** £0/month. SWA **Free** plan only. Nothing billable is created; if a runbook screen offers a paid option (Standard plan, a support plan), the runbook names the free choice.
- **Claude never** runs state-changing git or `gh` commands, and never changes anything in Azure, Cloudflare or GitHub settings. Read-only checks are allowed: `git status/log/diff`, `git ls-remote`, `gh run view`, `gh pr checks`, `curl -I`, `nslookup`.
- **One secret:** `AZURE_STATIC_WEB_APPS_API_TOKEN`, held only in GitHub Actions secrets. The Cloudflare Web Analytics token is public (it's in every page's HTML), so it is the **repository variable** `PUBLIC_CF_WEB_ANALYTICS_TOKEN`, not a secret. Nothing else needs a credential.
- **Workflows:** top-level `permissions: contents: read`; jobs widen this only where named in this plan. Never `pull_request_target`. Every third-party action is pinned as `owner/repo@<40-char SHA> # vX.Y.Z`, with the SHA resolved from the release tag by `git ls-remote`.
- **Build switches in CI:** every build sets `PUBLIC_SHOW_DRAFTS: 'false'` and `PUBLIC_ALLOW_INDEXING: 'false'` explicitly (indexing comes on in plan 3). Only the production build reads `vars.PUBLIC_CF_WEB_ANALYTICS_TOKEN`.
- **Client JavaScript exceptions** become four: contents scroll-spy, reading-progress bar, Pagefind UI, and the Cloudflare Web Analytics beacon (rendered only when a valid token is set at build time).
- **Required check names** (the ruleset matches on these exact strings): `build`, `gitleaks`, `accessibility`.
- **Docs:** British English, written for Nikita with each term explained, humanizer pass before handover. Every fact about a provider (limits, prices, behaviour) cites that provider's own page and the date checked; no figure without a source.
- **Runbook format:** numbered steps. Each says what to click or type, *What it does*, and **Expect** (what he should see). If a screen doesn't match, he stops and tells Claude rather than guessing.
- **Git:** each task ends with a **Handover** step. Claude stops, lists the changed files and gives the commit message; Nikita commits in GitHub Desktop.

## Review Focus

1. **PRs from Dependabot or a fork** (no secrets): `build` and `gitleaks` still run and pass, the preview deploy is skipped rather than failing on a missing token, and `accessibility` shows "skipped", which GitHub counts as passing. Pinned by the workflow tests in Task 5; observed on the first Dependabot PR in Task 11.
2. **A fourth open PR** (Free allows 3 preview environments, and Microsoft doesn't say what happens at the limit): the deploy step should fail loudly, and closing a PR must free its slot. The `close-preview` job and its test are in Task 5; `docs/deployment.md` (Task 8) says what to do.
3. **A local `.env` or stray variable changing a build:** test servers and CI builds pin every `PUBLIC_` switch, so a developer's `.env` can't turn on drafts, indexing or analytics. Tested in Task 2 (Playwright env) and Task 5 (workflow env).
4. **Soft 404s and duplicate URLs on SWA:** an unknown path returns status 404 with the site's 404 page, `/about` permanently redirects to `/about/`, and files such as `/rss.xml` are never redirected. Tested against the real preview in Task 4.
5. **A merge that breaks production:** a failing build or unit test on `main` deploys nothing, and a failing post-deploy smoke test turns the run red. `docs/deployment.md` explains the rollback (GitHub's **Revert** button on the merged PR). Tested in Task 6 (deploy runs only after build and tests) and documented in Task 8.

---

### Task 0: Branch and trademark gate (Nikita)

- [ ] **Step 1: Create the working branch (GitHub Desktop).** Make sure **Current branch** shows `main`, then click **Fetch origin** (and **Pull origin** if it appears). *What it does:* brings your local `main` up to date with GitHub, so the new branch starts from the latest work. Then **Current branch → New branch**, name `deploy-and-operate`, based on `main`, **Create branch**, then **Publish branch**. **Expect** the top bar to show `deploy-and-operate`.
- [ ] **Step 2: Trademark search.** Search the UK IPO register (<https://trademarks.ipo.gov.uk/ipo-tmtext>) for "Practically Digital", then "Practically" on its own, paying most attention to classes 41 (education), 35 (business consulting) and 42 (IT services). *What it does:* checks that nobody holds a mark that the name or domain could infringe before it goes public. It's a sense check, not legal advice. **Expect** either nothing similar (tell Claude "clear") or a list of similar marks (tell Claude what you found). If anything close turns up, Task 10 waits until you've decided what to do.

### Task 1: Hosting ADR and the Azure runbooks

**Files:**
- Create: `docs/adr/0004-hosting-on-azure-static-web-apps.md`, `docs/runbooks/README.md`, `docs/runbooks/01-azure-subscription.md`, `docs/runbooks/02-cost-guardrails.md`, `docs/runbooks/03-static-web-app.md`

**Interfaces:**
- Produces names that later tasks rely on: resource group `rg-practically-digital`, Static Web App `practically-digital` (Free), GitHub secret `AZURE_STATIC_WEB_APPS_API_TOKEN`, budget `budget-practically-digital`.
- `docs/runbooks/README.md` lists every runbook in the order it's followed and links to `secret-leaked.md` (Task 7).

- [ ] **Step 1:** Re-read every page cited in this plan's "Sources checked" list. Note anything that has changed in the handover. If the Free plan now shows overage billing, or the portal no longer offers deployment source "Other", stop and tell Nikita before writing the runbooks.
- [ ] **Step 2: Write ADR-0004.** Options: Azure SWA Free (the spec's choice), GitHub Pages, Cloudflare Pages, Netlify. The criteria are PR previews, fixed quotas with no overage, the chance to learn Azure, and custom domains. Each alternative's facts come from its own provider's pages, cited; where a page gives no figure, say so. The cost impact section states the worst case plainly: Free can't bill and goes offline over quota, but the subscription has no spending limit, so the real exposure is a paid resource created by mistake or by someone who gets into the account. Its guardrails are MFA, the budget, the anomaly alert and the monthly check.
- [ ] **Step 3: Write runbook 01, Azure subscription.** Steps: turn on two-step verification for the Microsoft account. Then **Subscriptions →** the disabled Free Trial **→ Upgrade subscription** (or the upgrade banner): add a payment method, verify by phone, name it `practically-digital`, choose the **free / no technical support** option, then **Upgrade**. **Expect** status Active and offer Pay-As-You-Go. Fallback if Upgrade isn't offered: **Subscriptions → + Add →** Pay-As-You-Go. Then create resource group `rg-practically-digital` in UK South. Explain what a subscription and a resource group are, and quote the "no spending limit on pay-as-you-go" line.
- [ ] **Step 4: Write runbook 02, cost guardrails.** A budget `budget-practically-digital` at subscription scope, monthly, **£1**, alerts at **Actual 1%**, **Actual 100%** and **Forecasted 100%** to Nikita's email. A cost **Anomaly** alert (Cost Management → Cost alerts → + Add). Then a monthly two-minute check: Cost analysis shows £0.00 and **All resources** lists only the Static Web App. State the limits honestly: alerts warn and don't cap; data lags up to a day; a new subscription may wait 48 hours before budgets appear, so this runbook can follow runbook 03.
- [ ] **Step 5: Write runbook 03, Static Web App.** **Create a resource → Static Web App:** subscription `practically-digital`, resource group `rg-practically-digital`, name `practically-digital`, plan **Free**, region the nearest European one offered (expect West Europe), deployment source **Other**. Explain that "Other" means Azure doesn't touch the repo, and that picking GitHub would make Azure commit its own workflow straight to `main`. If "Other" isn't offered, stop and tell Claude. **Expect** on the Overview page a `https://<words>.azurestaticapps.net` URL showing a placeholder page, and **Hosting plan: Free**. Then **Manage deployment token → copy →** GitHub repo **Settings → Secrets and variables → Actions → New repository secret**, name `AZURE_STATIC_WEB_APPS_API_TOKEN`, paste, **Add secret**. Then copy any other text so the token isn't left on the clipboard. **Expect** the secret to be listed with no visible value. Include a Free-plan quota table with citations.
- [ ] **Step 6:** Write `docs/runbooks/README.md`. Run **humanizer:humanizer** over the ADR and all four runbook files.
- [ ] **Step 7: Handover.** `docs: add hosting ADR and Azure runbooks`. Then Nikita follows runbooks 01 and 03 now, and 02 once Cost Management lets him (up to 48 hours). He tells Claude the `*.azurestaticapps.net` URL, which isn't a secret. **Expect:** the subscription is Active, the SWA shows Free, the secret is listed in GitHub, and the budget exists (or is noted as pending).

### Task 2: SWA routing, headers and build-switch hygiene

**Files:**
- Create: `public/staticwebapp.config.json`, `.env.example`, `tests/unit/swa-config.test.ts`, `tests/unit/env-files.test.ts`
- Modify: `playwright.config.ts` (both `webServer.env` blocks)

**Interfaces:**
- Produces `public/staticwebapp.config.json` (Astro copies it to the build root, where SWA reads it):
  - `"trailingSlash": "auto"` (folders redirect 301 to the slash form; files keep their names)
  - `"responseOverrides": { "404": { "rewrite": "/404.html", "statusCode": 404 } }`
  - `"globalHeaders"`: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, `Strict-Transport-Security: max-age=31536000`
  - no `navigationFallback` (that is for single-page apps, and it would turn every unknown URL into a 200)
- Produces `.env.example` with exactly these keys, all blank: `PUBLIC_SHOW_DRAFTS`, `PUBLIC_ALLOW_INDEXING`, `PUBLIC_CF_WEB_ANALYTICS_TOKEN`, `PD_CONTENT_DIR`, `PD_OUT_DIR`, each with a one-line comment.
- Both Playwright `webServer.env` blocks gain `PUBLIC_ALLOW_INDEXING: 'false'` and `PUBLIC_CF_WEB_ANALYTICS_TOKEN: ''`.

- [ ] **Step 1: Write failing tests.** `swa-config.test.ts`: the file parses as JSON; `responseOverrides['404']` equals `{ rewrite: '/404.html', statusCode: 404 }`; `trailingSlash === 'auto'`; there is no `navigationFallback`; `globalHeaders` has the five headers with the exact values above; the file is at most 20 KB (SWA's limit). `env-files.test.ts`: `.env.example` keys equal the five above; every value is empty; `.gitignore` ignores `.env` but not `.env.example`; each Playwright `webServer.env` sets `PUBLIC_SHOW_DRAFTS: 'false'`, `PUBLIC_ALLOW_INDEXING: 'false'` and `PUBLIC_CF_WEB_ANALYTICS_TOKEN: ''` (import `playwright.config.ts`; if that import fails under Vitest, parse the file as text and note it in the ledger).
- [ ] **Step 2:** `npm test` → **Expect** FAIL (files missing, env not pinned).
- [ ] **Step 3:** Create the config and `.env.example`, and pin the env blocks.
- [ ] **Step 4:** `npm test` → **Expect** PASS. `npm run build`, then confirm `dist/staticwebapp.config.json` exists. `npm run test:e2e` → **Expect** all PASS (nothing visible changes).
- [ ] **Step 5: Handover.** `feat: add Static Web Apps routing and headers, pin test build switches`

### Task 3: Cloudflare Web Analytics beacon, DNS and analytics runbooks

**Files:**
- Create: `src/components/CloudflareAnalytics.astro`, `tests/unit/cloudflare-analytics.test.ts`, `docs/adr/0006-dns-redirects-and-analytics-on-cloudflare.md`, `docs/runbooks/07-domain-and-dns.md`, `docs/runbooks/08-web-analytics.md`
- Modify: `src/lib/env.ts`, `tests/unit/env.test.ts`, `src/layouts/BaseLayout.astro`, `tests/e2e/layout.spec.ts`, `docs/architecture/overview.md` (JavaScript list and build-switch table)

**Interfaces:**
- Produces `analyticsToken(): string | null` in `src/lib/env.ts`. It reads `import.meta.env.PUBLIC_CF_WEB_ANALYTICS_TOKEN` and trims it: unset or empty gives `null`; a value matching `/^[A-Za-z0-9]{16,64}$/` gives that value; any other non-empty value **throws** `Invalid PUBLIC_CF_WEB_ANALYTICS_TOKEN`, so a typo fails the build instead of injecting markup or silently dropping analytics.
- Produces `CloudflareAnalytics.astro`, props `{ token: string }`. Renders one `<script is:inline defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon={JSON.stringify({ token })}>`. `BaseLayout` renders it just before `</body>` only when `analyticsToken()` is non-null.
- Runbook 07 record set (TTL Auto everywhere):

  | Zone | Type | Name | Content | Proxy |
  |---|---|---|---|---|
  | co.uk | TXT | `@` | SWA validation code | DNS only |
  | co.uk | CNAME | `@` | `<app>.azurestaticapps.net` | DNS only (Cloudflare flattens it at the apex) |
  | co.uk | AAAA | `www` | `100::` | Proxied (exists only so the redirect rule can run) |
  | .uk | AAAA | `@` and `www` | `100::` | Proxied |
  | both | MX | `@` | `.` priority 0 (null MX: "no mail here") | n/a |
  | both | TXT | `@` | `v=spf1 -all` | n/a |
  | both | TXT | `_dmarc` | `v=DMARC1; p=reject;` | n/a |

  Redirect rules (one per zone, Free allows 10): `www.practicallydigital.co.uk` and all of `practicallydigital.uk` / `www.practicallydigital.uk` go to `https://practicallydigital.co.uk` with the path and query string kept, **302 while testing, 301 once verified**. DNSSEC is enabled on both domains (Registrar → Manage → Configuration), and "Always Use HTTPS" on the `.uk` zone.

- [ ] **Step 1: Write failing tests.** `env.test.ts` adds: unset gives `null`; `''` and `'  '` give `null`; a 32-character alphanumeric token is returned as is; `'abc"><script>'` throws `Invalid PUBLIC_CF_WEB_ANALYTICS_TOKEN`. `cloudflare-analytics.test.ts`, using `experimental_AstroContainer`, renders the component with a token: exactly one `<script>`, `src` is the beacon URL, it has `defer`, and `JSON.parse(data-cf-beacon)` deep-equals `{ token }`. `layout.spec.ts` adds "no analytics beacon in test builds": `script[src*="cloudflareinsights"]` count is 0 on `/`.
- [ ] **Step 2:** `npm test` → **Expect** FAIL. (The e2e guard passes at RED; it guards against the layout change.)
- [ ] **Step 3:** Implement `analyticsToken`, the component and the `BaseLayout` include. Update the overview's JavaScript list to four items and add the variable to its build-switch table.
- [ ] **Step 4:** `npm test && npm run test:e2e` → **Expect** PASS. Then `npm run build` with `$env:PUBLIC_CF_WEB_ANALYTICS_TOKEN="0123456789abcdef0123456789abcdef"` and check `dist/index.html` contains the beacon. Then set it to `bad"value`, rebuild, and **Expect** the build to fail naming the variable. Clear it with `Remove-Item Env:PUBLIC_CF_WEB_ANALYTICS_TOKEN`.
- [ ] **Step 5: Write ADR-0006.** Covers DNS-only vs proxied (Microsoft's pages say nothing about proxies; Cloudflare's automatic setup needs proxying, and DNS-only needs the snippet), redirects at Cloudflare vs a second SWA domain, Web Analytics vs no analytics (cookieless per Cloudflare's own page; capped at 10 non-proxied sites), DNSSEC, and the no-email records (they must change when domain email arrives).
- [ ] **Step 6: Write runbooks 07 and 08.** Runbook 07 order: confirm Task 0's trademark result; turn on 2FA for the Cloudflare account; check each zone's existing records; in SWA **Custom domains → + Add →** apex `practicallydigital.co.uk`, TXT, **Generate code**; add the TXT record; wait for **Validated**; add the apex CNAME; then www, the `.uk` records, the redirect rules (Cloudflare's "redirect from one domain to another" template), the email records, and DNSSEC. **Expect** lines for each, including that `http://practicallydigital.uk/about/` lands on `https://practicallydigital.co.uk/about/`. Runbook 08: **Web Analytics → Add a site →** hostname `practicallydigital.co.uk`, **manual JS snippet** (not automatic), copy the token from the snippet; GitHub **Settings → Secrets and variables → Actions → Variables → New repository variable** `PUBLIC_CF_WEB_ANALYTICS_TOKEN`; **Actions → Deploy → Run workflow** on `main`. **Expect** the beacon in the live page source and visits in Cloudflare within the hour. Explain why this is a variable, not a secret.
- [ ] **Step 7:** Humanizer pass over the ADR, both runbooks and the overview changes.
- [ ] **Step 8: Handover.** `feat: add Cloudflare Web Analytics beacon and DNS runbooks`

### Task 4: Checks against a deployed site

**Files:**
- Create: `playwright.deployed.config.ts`, `tests/deployed/site.spec.ts`, `lighthouserc.cjs`
- Modify: `package.json` (devDependency `@lhci/cli`; scripts `test:deployed` = `playwright test --config playwright.deployed.config.ts`, `test:lighthouse` = `lhci autorun --config=lighthouserc.cjs`), `.gitignore` (`lighthouse-report/`)

**Interfaces:**
- Consumes `expectNoA11yViolations` from `tests/e2e/helpers/axe.ts` and `public/staticwebapp.config.json`. Header values are imported from the config, not repeated.
- Env: `PD_DEPLOYED_URL` (required; the config throws if it's missing), `PD_EXPECT_ANALYTICS` (`'true'` means the beacon must be present; anything else means absent), `PD_EXPECT_INDEXING` (`'true'` means indexing is allowed; anything else means `noindex` everywhere. Plan 3 sets this when it launches).
- `playwright.deployed.config.ts`: `testDir: './tests/deployed'`, no `webServer`, `baseURL` from `PD_DEPLOYED_URL`, projects `desktop` (1280×800) and `mobile` (375×812), `retries: 1` on CI.
- `lighthouserc.cjs`: URLs `/`, `/insights/`, `/topics/`, `/digital-lab/`, `/about/`, `/search/` on `PD_DEPLOYED_URL`; `numberOfRuns: 3`; `settings.skipAudits: ['is-crawlable']`; assertions `categories:accessibility` ≥ 1, `categories:best-practices` ≥ 0.95, `categories:performance` ≥ 0.9, `categories:seo` ≥ 0.9, all at `error` level; upload `target: 'filesystem'`, `outputDir: './lighthouse-report'`.

- [ ] **Step 1: Write the tests** in `tests/deployed/site.spec.ts`:
  - "every page in the sitemap loads and passes axe": fetch `/sitemap-0.xml`, take each `<loc>`'s pathname (the sitemap carries production URLs), and require at least 10 of them; each returns 200 and passes `expectNoA11yViolations`.
  - "an unknown address returns the 404 page with status 404": the response status is 404, and the h1 is "Page not found".
  - "a folder address without a trailing slash redirects permanently": `/about` with `maxRedirects: 0` gives 301 and a `location` ending `/about/`.
  - "file addresses are served as they are": `/rss.xml`, `/robots.txt` and `/sitemap-index.xml` return 200 without a redirect.
  - "every response carries the security headers": on `/`, each `globalHeaders` entry matches.
  - "search engines are kept out until launch": unless `PD_EXPECT_INDEXING === 'true'`, `/` has the robots `noindex, nofollow` meta and `/robots.txt` contains `Disallow: /`.
  - "the analytics beacon matches the build": the `cloudflareinsights` script count is 1 if `PD_EXPECT_ANALYTICS === 'true'`, otherwise 0.
  - "the search page loads without console errors".
- [ ] **Step 2: Local run (RED for the SWA-only rules).** Run `npm run build`, then `npx astro preview --port 4420 --ignore-lock`, then in a second terminal `$env:PD_DEPLOYED_URL="http://localhost:4420"; npm run test:deployed`. **Expect** the headers test to FAIL, because `astro preview` doesn't apply `staticwebapp.config.json`. The trailing-slash test may pass or fail depending on how `astro preview` handles `/about`. Every other test should PASS. Record exactly which tests failed in the ledger; any that fail here must go green on the real preview in Task 8.
- [ ] **Step 3:** `npm install -D @lhci/cli` (latest; record the version), add the config and scripts, then run `npm run test:lighthouse` against the same local preview. **Expect** all assertions to pass and reports in `lighthouse-report/`. If performance falls under 0.9 locally, report the score; don't lower the threshold.
- [ ] **Step 4:** `npm test && npm run test:e2e` → **Expect** PASS (the main suite doesn't pick up `tests/deployed`).
- [ ] **Step 5: Handover.** `test: add axe, Lighthouse and routing checks for deployed sites`

### Task 5: Pull-request workflow

**Files:**
- Create: `.github/workflows/ci.yml`, `.github/actions/setup/action.yml`, `tests/unit/workflows.test.ts`
- Modify: `package.json` (`engines.node` = `>=26`; devDependency `yaml`), `README.md` (the Node line)

**Interfaces:**
- `.github/actions/setup/action.yml` (composite): `actions/setup-node` with `node-version-file: .nvmrc` and `cache: npm`, then `npm ci`. Each job checks out first and then uses `./.github/actions/setup`.
- `ci.yml`: `on: pull_request` with `types: [opened, synchronize, reopened, closed]`. Jobs:
  - `build` (`name: build`, skipped on `closed`): setup, `npm test`, `npm run build` (default configuration: no `PD_*`; env `PUBLIC_SHOW_DRAFTS: 'false'`, `PUBLIC_ALLOW_INDEXING: 'false'`, `PUBLIC_CF_WEB_ANALYTICS_TOKEN: ''`), `npx playwright install --with-deps chromium`, `npm run test:e2e`. Uploads `dist/` as artifact `site` (retention 7 days). On failure it also uploads `playwright-report/`. This default build is production's real state (no `src/content/articles/`), so the deferred plan 1 finding is covered on every PR.
  - `gitleaks` (`name: gitleaks`, skipped on `closed`): checkout with `fetch-depth: 0`, then `gitleaks/gitleaks-action` v3 with `GITHUB_TOKEN`. Turn PR comments off if the action's README offers a switch, so the job stays read-only.
  - `accessibility` (`name: accessibility`, `needs: build`): runs only when `github.event.action != 'closed' && github.event.pull_request.head.repo.full_name == github.repository && github.event.pull_request.user.login != 'dependabot[bot]'`. `permissions: contents: read, pull-requests: write` (the action comments the preview URL). `concurrency: { group: preview-<PR number>, cancel-in-progress: true }`. Steps: checkout, setup, download `site` to `dist`, `Azure/static-web-apps-deploy` (step `id: deploy`, `action: upload`, `app_location: dist`, `output_location: ''`, `skip_app_build: true`, `azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}`, `repo_token: ${{ secrets.GITHUB_TOKEN }}`), install Chromium, then `npm run test:deployed` and `npm run test:lighthouse` with `PD_DEPLOYED_URL: ${{ steps.deploy.outputs.static_web_app_url }}`. Always uploads `lighthouse-report/` and `playwright-report/`.
  - `close-preview`: runs only on `closed` from the same repository (not Dependabot); `action: close` with the token. It frees the preview slot.
- Produces `tests/unit/workflows.test.ts`, with helpers `loadWorkflow(name: string): any` and `rawWorkflows(): { file: string; text: string }[]`, reused by Tasks 6 and 7.

- [ ] **Step 1: Write failing tests** in `workflows.test.ts`:
  - "no workflow uses pull_request_target" (raw text over every file in `.github/workflows` and `.github/actions`)
  - "every third-party action is pinned to a full commit SHA with a version comment": each `uses:` line not starting `./` matches `/@[0-9a-f]{40}\s+#\s+v\d+(\.\d+)*/`
  - "workflows default to read-only contents": top-level `permissions` deep-equals `{ contents: 'read' }`
  - "the PR checks are named build, gitleaks and accessibility"
  - "the preview deploy is skipped for forks and Dependabot": the `accessibility` and `close-preview` `if` strings contain both the `head.repo.full_name == github.repository` and the `dependabot[bot]` conditions
  - "closing a PR removes its preview": `close-preview` runs only when `github.event.action == 'closed'` and calls the SWA action with `action: close`
  - "the deploy token reaches only the Static Web Apps action": every reference to `secrets.AZURE_STATIC_WEB_APPS_API_TOKEN` sits in a step whose `uses` starts `Azure/static-web-apps-deploy@`
  - "PR builds never load the analytics token": `ci.yml` has no `vars.PUBLIC_CF_WEB_ANALYTICS_TOKEN`
  - "every build pins drafts and indexing off": each step that runs `npm run build` sets both switches to `'false'`
  - "CI's Node comes from .nvmrc and engines agrees": the setup action uses `node-version-file: .nvmrc`, and `engines.node === '>=' + .nvmrc`
- [ ] **Step 2:** `npm test` → **Expect** FAIL.
- [ ] **Step 3:** Resolve each action's latest release tag to its SHA with `git ls-remote --tags https://github.com/<owner>/<repo>` (for `Azure/static-web-apps-deploy`, the commit `v1` points to). Note in ADR-0005 that the SWA action builds from a Dockerfile that pulls a floating image, so its SHA pin doesn't pin everything it runs. Write the composite action and `ci.yml`, set `engines` and run `npm install`.
- [ ] **Step 4:** `npm test` → **Expect** PASS. `npm run build` → **Expect** success with no engine warning on Node 26.
- [ ] **Step 5: Handover.** `ci: add pull-request workflow with tests, gitleaks and preview checks`

### Task 6: Production deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`
- Modify: `tests/unit/workflows.test.ts`

**Interfaces:**
- `deploy.yml`: `on: push: branches: [main]` and `workflow_dispatch`; `concurrency: { group: production, cancel-in-progress: false }`. One job `deploy-production`: checkout, setup, `npm test`, `npm run build` (env `PUBLIC_SHOW_DRAFTS: 'false'`, `PUBLIC_ALLOW_INDEXING: 'false'`, `PUBLIC_CF_WEB_ANALYTICS_TOKEN: ${{ vars.PUBLIC_CF_WEB_ANALYTICS_TOKEN }}`), the SWA action (`action: upload`, same location inputs as Task 5, step `id: deploy`), install Chromium, then `npm run test:deployed` with `PD_DEPLOYED_URL` from the deploy output and `PD_EXPECT_ANALYTICS: ${{ vars.PUBLIC_CF_WEB_ANALYTICS_TOKEN != '' && 'true' || 'false' }}`.

- [ ] **Step 1: Write failing tests:** "production deploys only from main or a manual run"; "production deploys never overlap or cancel each other"; "production runs unit tests and the build before the deploy step" (step order within the job); "production pins drafts and indexing off" (indexing comes on in plan 3); "only the production build reads the analytics variable".
- [ ] **Step 2:** `npm test` → **Expect** FAIL.
- [ ] **Step 3:** Write `deploy.yml`.
- [ ] **Step 4:** `npm test` → **Expect** PASS.
- [ ] **Step 5: Handover.** `ci: add production deploy workflow with post-deploy checks`

### Task 7: Repository security: Dependabot, gitleaks hook and GitHub settings

**Files:**
- Create: `.github/dependabot.yml`, `.githooks/pre-commit`, `tests/unit/repo-config.test.ts`, `docs/adr/0007-repository-secret-hygiene.md`, `docs/runbooks/04-github-security.md`, `docs/runbooks/05-gitleaks-hook.md`, `docs/runbooks/06-branch-protection.md`, `docs/runbooks/secret-leaked.md`
- Modify: `.gitattributes` (`.githooks/* text eol=lf`, because a CRLF shebang breaks the hook on Windows)

**Interfaces:**
- `dependabot.yml`: `npm` and `github-actions`, both at `/`, weekly on Monday, `cooldown: { default-days: 7 }` (security updates ignore cooldown). npm groups `minor-and-patch` (`update-types: [minor, patch]`), with majors as their own PRs. All github-actions updates in one group.
- `.githooks/pre-commit` (POSIX sh): if `gitleaks` isn't on `PATH`, print how to install it and exit 1; otherwise `exec gitleaks git --pre-commit --staged --redact --verbose`.
- Runbook 04 settings: **Settings → Advanced Security:** Secret Protection and Push protection **Enabled** (expected already on for public repos), Dependabot alerts and security updates **Enabled**. **Settings → Actions → General:** allow GitHub-made actions plus `Azure/static-web-apps-deploy@*` and `gitleaks/gitleaks-action@*`; **Require actions to be pinned to a full-length commit SHA** on; fork PR approval **Require approval for all external contributors**; Workflow permissions **read repository contents and packages**; **Allow GitHub Actions to create and approve pull requests** off. Confirm 2FA on the GitHub account.
- Runbook 06 ruleset: **Settings → Rules → Rulesets → New branch ruleset**, name `protect-main`, Active, bypass list empty, target the default branch. Rules: Restrict deletions; Require a pull request (0 approvals); Require status checks `build`, `gitleaks` and `accessibility` from GitHub Actions, with "Require branches to be up to date"; Block force pushes. Fallback if Rulesets isn't offered: **Settings → Branches → Add classic branch protection rule** with the same settings. Explain that checks can only be selected after they've run once (hence after Task 8), and that "up to date" means clicking **Update branch** on PRs when `main` has moved.
- `secret-leaked.md`: revoke and rotate first (SWA **Manage deployment token → Reset token**, then update the GitHub secret), then check the deploy history for anything unexpected, then clean up history only after rotation, knowing that forks and caches keep the old value. It lists what counts as a secret here (only the SWA token).

- [ ] **Step 1: Write failing tests** in `repo-config.test.ts`: Dependabot covers exactly `npm` and `github-actions` weekly with a 7-day cooldown and the `minor-and-patch` group; the hook file exists, starts `#!/bin/sh` and contains `gitleaks git --pre-commit --staged`; `.gitattributes` forces LF for `.githooks/*`; the hook has no `\r`.
- [ ] **Step 2:** `npm test` → **Expect** FAIL.
- [ ] **Step 3:** Create the files. Write ADR-0007 (hook options: committed `.githooks` vs the pre-commit framework vs husky; gitleaks hook plus the CI job as a backstop, since GitHub Desktop has a bypass; Dependabot cooldown; and gitleaks's own note that it now gets security patches only). Write runbooks 04, 05 (winget `Gitleaks.Gitleaks`; restart VS Code and GitHub Desktop; `gitleaks version`; `git config core.hooksPath .githooks`, with what it does and that it's per clone; the planted-secret test below) and 06, plus `secret-leaked.md`. Humanizer pass on all prose.
- [ ] **Step 4:** `npm test` → **Expect** PASS.
- [ ] **Step 5: Handover.** `chore: add Dependabot, gitleaks hook and GitHub security runbooks`. Then Nikita follows runbook 04 (settings) and runbook 05: install, set `hooksPath`, then the planted-secret test. Claude creates an uncommitted `scratch-leak.txt` holding `ghp_` followed by 36 random letters and digits (never written anywhere else). Nikita tries to commit it in GitHub Desktop. **Expect** the commit to be blocked with gitleaks output naming `scratch-leak.txt` and the `github-pat` rule. Don't click **Commit anyway**. Then right-click the file → **Discard changes**. **Expect** it gone from Changes. Record the result in the ledger.

### Task 8: Deployment docs, review and the first pull request

**Files:**
- Create: `docs/deployment.md`, `docs/adr/0005-ci-and-deployment-pipeline.md`
- Modify: `docs/architecture/overview.md` (hosting box, "what plan 2 added", ADR links), `README.md` (status, links to deployment docs and runbooks)

- [ ] **Step 1: Write `docs/deployment.md`:** a Mermaid diagram of PR → `build` / `gitleaks` → preview → `accessibility` and merge → `deploy-production` → smoke; what runs when; preview facts (public, 3 slots, deleted on close, none for Dependabot or fork PRs); what to do when a check fails (where the logs and report artifacts are); rollback (**Revert** on the merged PR opens a new PR; merge it); manual redeploy (**Run workflow**); quotas to watch and where; token rotation (link to `secret-leaked.md`).
- [ ] **Step 2: Write ADR-0005:** GitHub Actions; build once and deploy the tested artifact vs SWA's Oryx build; deployment token (the spec's choice) vs the action's OIDC option, kept for later; SHA pinning; preview gating; Lighthouse thresholds and why performance sits at 0.9 on shared runners; Node 26.
- [ ] **Step 3:** Update the overview and README. Humanizer pass on all three docs.
- [ ] **Step 4:** `npm test && npm run test:e2e` → **Expect** all PASS. Dispatch a fresh reviewer subagent per **superpowers:requesting-code-review** over the branch diff against `main`, with the security properties in Global Constraints as its checklist. Fix confirmed issues and re-run.
- [ ] **Step 5: Handover.** `docs: add deployment guide and pipeline ADR`.
- [ ] **Step 6: First pull request (Nikita).** Push, then in GitHub Desktop **Create Pull Request**: base `main`, compare `deploy-and-operate`, title `Deploy and operate`; Claude supplies the description. *What happens now:* opening the PR starts `ci.yml`. The **Checks** section lists `build`, `gitleaks` and `accessibility`, plus `close-preview` as skipped. **Expect** within about 10 minutes: all three green, and a comment from the SWA action with a preview URL (`https://<words>-<PR number>.<region>.azurestaticapps.net`). Open it and check the home page. Claude then reads the run with `gh run view` and confirms that the Task 4 tests that failed locally passed on SWA. If `accessibility` fails, Claude diagnoses it before anything else changes.
- [ ] **Step 7: Merge (Nikita).** On the PR page, **Merge pull request → Confirm merge**. *What it does:* adds the branch's commits to `main`. That push starts `deploy.yml`, and the closed PR starts `close-preview`. **Expect** under **Actions** a green "Deploy" run, the `*.azurestaticapps.net` URL serving the site, and the preview URL gone. In GitHub Desktop: switch to `main`, **Fetch origin**, **Pull origin**. **Expect** `main` to contain the workflows.

### Task 9: Branch protection (Nikita, after Task 8)

- [ ] **Step 1:** Follow runbook 06. **Expect** `protect-main` to be listed as Active with three required checks.
- [ ] **Step 2: Prove it works.** In GitHub Desktop on `main`, add a blank line to the end of `README.md`, commit to `main`, then **Push origin**. **Expect** the push to be rejected with a message naming the repository rules (for example "GH013"), which shows `main` only accepts PRs. Then undo it: **History**, right-click the commit → **Undo commit** (this works because it was never pushed), then right-click `README.md` in **Changes** → **Discard changes**. **Expect** no local commits ahead of `origin/main` and a clean Changes list.

### Task 10: Domain, DNS and analytics live (Nikita, Claude verifies)

- [ ] **Step 1:** Only if Task 0's trademark result is clear (or Nikita has decided to go ahead), follow runbook 07. Claude verifies read-only, after each section: `nslookup practicallydigital.co.uk`; `curl -sI https://practicallydigital.co.uk/` gives 200 with the security headers; `curl -sI https://www.practicallydigital.co.uk/about/` and `curl -sI http://practicallydigital.uk/about/?x=1` give 302 to `https://practicallydigital.co.uk/about/` (with `?x=1` kept on the second); `curl -sI https://practicallydigital.co.uk/nope/` gives 404. Once all pass, Nikita switches the redirects to 301 and Claude re-checks. DNSSEC is checked a day or two later in the Registrar (**Active**).
- [ ] **Step 2:** Follow runbook 08. **Expect** the Deploy run to go green with `PD_EXPECT_ANALYTICS` `true`, the beacon in the live page source, and a visit showing in Cloudflare Web Analytics.
- [ ] **Step 3:** Claude runs `test:deployed` locally against `https://practicallydigital.co.uk` with `PD_EXPECT_ANALYTICS=true`. **Expect** all PASS on both projects.

### Task 11: Verification record and the second pull request

**Files:**
- Modify: `docs/deployment.md` (a "Verification record" section), `README.md` (status line with the live address, still noindexed until plan 3)

- [ ] **Step 1 (Nikita): Branch.** **Current branch → New branch** `hosting-live` from an up-to-date `main`, then **Publish branch**.
- [ ] **Step 2:** Record each item of the spec's Verification section that this plan covers, with date and evidence: the PR produced a preview URL; the merge deployed; gitleaks caught the planted secret; axe and Lighthouse passed in CI against the preview (scores from the run's report artifact); the 404 status and redirects on SWA; the Azure cost check (Nikita confirms **All resources** lists only the Free Static Web App, Cost analysis shows £0.00, and the budget and anomaly alert exist). If a Dependabot PR has arrived, record whether `accessibility` showed "skipped" and `build` and `gitleaks` passed (Review Focus 1). If none has arrived, say so. Humanizer pass.
- [ ] **Step 3: Handover.** `docs: record plan 2 verification and the live address`.
- [ ] **Step 4: PR under protection (Nikita).** Push, open a PR into `main`, and wait. **Expect** **Merge pull request** to stay disabled until all three checks pass. That's the ruleset working. Then merge, pull `main` in GitHub Desktop, and delete the branch. Plan 2 is done.

## Handed to plan 3

- A short privacy note on the About page covering Cloudflare Web Analytics (no cookies; what Cloudflare says it collects).
- Turning indexing on: `PUBLIC_ALLOW_INDEXING: 'true'` in `deploy.yml` and `PD_EXPECT_INDEXING: 'true'` in its smoke step, plus a guard against `PUBLIC_SHOW_DRAFTS` and indexing both being on (plan 1 deferred finding).
- A Content Security Policy, once the beacon, Pagefind and Astro's inline scripts can be allow-listed and tested.
- Replacing the no-email DNS records when domain email is set up.
