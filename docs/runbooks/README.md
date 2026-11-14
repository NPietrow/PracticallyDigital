# Runbooks

Step-by-step instructions for everything done by hand in Azure, Cloudflare and GitHub settings. Nikita follows them; Claude writes them and checks the results where it can do that read-only.

Each step says what to click or type, what it does, and what you should see (**Expect**). If a screen doesn't match, stop and tell Claude rather than guessing. Provider screens change, and a guess is how a paid option gets picked by accident.

## In the order they're followed

| # | Runbook | What it sets up | When |
|---|---|---|---|
| 01 | [Azure subscription](01-azure-subscription.md) | Two-step verification, the pay-as-you-go subscription, the resource group | First |
| 03 | [Static Web App](03-static-web-app.md) | The Free Static Web App and its deployment token in GitHub | After 01 |
| 02 | [Cost guardrails](02-cost-guardrails.md) | The £1 budget, the anomaly alert and the monthly check | Once Cost Management is available (up to 48 hours after 01) |
| 04 | [GitHub security settings](04-github-security.md) | Secret scanning, push protection, Dependabot, Actions permissions | Before the first pull request |
| 05 | [gitleaks hook](05-gitleaks-hook.md) | The local check that blocks commits containing secrets | Before the first pull request |
| 06 | [Branch protection](06-branch-protection.md) | The `protect-main` ruleset | After the first pull request has run its checks |
| 07 | [Domain and DNS](07-domain-and-dns.md) | `practicallydigital.co.uk` on the Static Web App, redirects, no-email records, DNSSEC | After 06 |
| 08 | [Web Analytics](08-web-analytics.md) | Cloudflare Web Analytics on the live site | After 07 |

01 comes before 03 because the Static Web App needs the subscription. 02 is numbered before 03 but often has to wait, because a new subscription can take up to 48 hours to show budgets.

## When something goes wrong

- [A secret has leaked](secret-leaked.md): revoke and rotate first, then clean up.
- Deploy and preview problems: [deployment guide](../deployment.md).
