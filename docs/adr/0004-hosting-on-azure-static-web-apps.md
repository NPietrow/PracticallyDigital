# ADR-0004: Host the site on Azure Static Web Apps (Free)

## Status

Accepted, 14 November 2026. The [design spec](../superpowers/specs/2026-11-09-practically-digital-design.md) names Azure Static Web Apps Free as the host; this ADR records the alternatives behind that choice, the cost exposure, and how the exposure is guarded. Provider facts were checked on 14 November 2026 against each provider's own pages.

## Context

The site is a folder of static files built by Astro (ADR-0001). It needs somewhere to live on the internet. The constraints:

- **£0 a month**, and nothing that can quietly start billing as traffic grows.
- **A preview for every pull request**, so Nikita can review a change on a real URL before it reaches the live site.
- **Custom domains:** `practicallydigital.co.uk` as the main address, with `.uk` redirecting to it.
- **Learning Azure** is one of the site's three jobs (spec, "Context"), so an Azure host earns something the others don't.

Terms used below:

- **Static hosting.** The host stores files and sends them to browsers. It runs no code of ours.
- **Preview environment** (Azure calls it a "pre-production" or "staging" environment). A temporary copy of the site, built from a pull request, at its own URL.
- **Quota.** A fixed limit, such as 100 GB of data sent per month.
- **Overage.** What a provider charges for use beyond a quota. A plan with no overage either stops serving or slows down instead of billing.
- **Subscription.** Azure's billing container. Every Azure resource sits in one, and the subscription's payment method is charged for whatever is in it.

## Options considered

**Azure Static Web Apps (SWA), Free plan.** Microsoft's quota table lists, for Free: 100 GB of included bandwidth per month, 3 preview environments per app, 2 custom domains per app, 250 MB of storage per environment, 500 MB in total and 15,000 files, with overage bandwidth "Unavailable" ([quotas](https://learn.microsoft.com/en-us/azure/static-web-apps/quotas)). The pricing FAQ says that on Free, "if your site exceeds the 100 GB quota, we will not be able to serve your site", and that only Standard apps "will be billed at overage rates" ([pricing](https://azure.microsoft.com/en-gb/pricing/details/app-service/static/)). Free has no SLA ([plans](https://learn.microsoft.com/en-us/azure/static-web-apps/plans)). Previews are built from pull requests through GitHub Actions. They are public ("Anyone can access the staged versions of your application via their URL") and are deleted when the pull request closes ([review pull requests](https://learn.microsoft.com/en-us/azure/static-web-apps/review-publish-pull-requests)). Microsoft doesn't say what happens when a fourth preview is requested.

**GitHub Pages.** GitHub states a soft bandwidth limit of 100 GB a month and a 1 GB site size. Over the limits "we may not be able to serve your site, or you may receive a polite email from GitHub Support"; no billing is described ([limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)). It allows one site per repository ([about](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages)), and the pages we read describe no pull-request preview feature. Custom domains are supported; the pages give no count ([custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)). GitHub also says Pages is not "allowed to be used as a free web-hosting service to run your online business" (limits page). This site isn't a business today, but the consulting route in the spec's goals sits close to that line.

**Cloudflare Pages.** Cloudflare creates "a unique preview URL" for each pull request from the same repository, with no cap on how many are active, and allows 100 custom domains per project and 500 builds a month on Free ([limits](https://developers.cloudflare.com/pages/platform/limits/), [preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/)). Its pages give no bandwidth figure for Pages and say nothing about what happens over a limit. Requests to static files on Workers, which Cloudflare suggests in place of Pages, are "free and unlimited" ([Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/)), and the Pages overview now says "Start new projects with Workers" ([Pages](https://developers.cloudflare.com/pages/)). DNS for both domains is already on Cloudflare, so this would be the shortest route to a live site.

**Netlify.** The Free plan has 300 credits a month as a hard limit. Bandwidth uses 20 credits per GB and each production deploy uses 15 ([how credits work](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/)). Our arithmetic, not Netlify's: that is about 15 GB of traffic, or about 20 deploys, a month. When credits run out "all of your web projects (sites/apps) are paused", and the Free plan can't buy more ([resume paused projects](https://docs.netlify.com/manage/accounts-and-billing/billing/resume-paused-projects/)). Deploy previews are unlimited and cost no credits ([pricing](https://www.netlify.com/pricing/)). Custom domains are included; the page gives no count.

### How they compare

| Criterion | Azure SWA Free | GitHub Pages | Cloudflare Pages / Workers | Netlify Free |
|---|---|---|---|---|
| Pull-request previews | Yes, 3 at a time | None described | Yes, no cap | Yes, no cap |
| Over the limit | Stops serving, no overage | May stop serving, no billing described | Not stated | All sites paused |
| Can it bill on its own? | No (Free can't) | No | Not stated for Pages; static requests free on Workers | No (Free can't buy credits) |
| Custom domains | 2 per app | Supported, count not stated | 100 per project | Supported, count not stated |
| Monthly headroom | 100 GB | 100 GB (soft) | No figure for Pages | About 15 GB (our arithmetic) |
| Teaches Azure | Yes | No | No | No |

## Decision

Azure Static Web Apps, Free plan, as the spec says.

On hosting alone, Cloudflare is at least as strong: unlimited previews, no stated bandwidth figure to hit, and DNS already in the same account. We are choosing Azure anyway, because learning Azure is one of the site's stated jobs, and SWA Free is the one Azure option with fixed quotas and no overage. Of the rest, GitHub Pages has no previews and a business-use restriction, and Netlify's Free allowance is the smallest.

Three previews is the tightest limit we accept. Nikita works on one or two pull requests at a time, and closing a pull request frees its slot.

## Consequences

- An Azure subscription is needed. Nikita's free trial has ended, so it has to be upgraded to pay-as-you-go, which needs a payment card (runbook 01). See the cost section.
- The deployment comes from our own GitHub Actions workflow, using a deployment token held as a GitHub secret (ADR-0005 covers the pipeline). The app is created with deployment source "Other", so Azure never writes to the repository.
- Free has no SLA. If Azure has an outage, the site is down until it recovers, and nobody owes us anything. That's acceptable for an educational site.
- Two custom domains per app is enough: the apex `practicallydigital.co.uk` is attached to SWA, and `www` and `.uk` are redirected by Cloudflare instead (ADR-0006).
- If the site ever outgrows 100 GB a month, the choice is Standard (paid, with overage billing) or moving host. That needs a new ADR and Nikita's approval.
- Microsoft's own pages disagree in places: the pricing page says "100 GB per subscription" where the quota page says per month, and Standard's custom-domain count is 5 on one page and 6 on another. Neither affects Free's no-overage rule, which both pages state.

## Cost impact

**Now:** £0 a month. The Free plan has no charge, and its quotas can't turn into a bill.

**Worst case:** the Free app itself can't cost money. Over quota it stops serving. The real exposure is the subscription around it. Microsoft says the spending limit "isn't available for subscriptions with commitment plans or with pay-as-you-go pricing" ([spending limit](https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/spending-limit)), so there is no cap. If a paid resource is created in this subscription, by a mis-click (choosing Standard instead of Free, say) or by someone who gets into the account, its charges run, with no upper bound, until someone notices and deletes it.

**Guardrails** (none of them is a cap):

1. **Two-step verification** on the Microsoft account, so a stolen password isn't enough to get in (runbook 01).
2. **A £1 monthly budget** with alerts at 1% and 100% of actual cost and 100% of forecast (runbook 02). Microsoft is clear that budgets only warn: "Resources aren't affected, and your consumption isn't stopped" ([budgets](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-acm-create-budgets)). Cost data can be up to 24 hours old and budgets are checked every 24 hours, so a runaway charge may run for a day or two before the first email.
3. **A cost anomaly alert**, which Microsoft evaluates daily ([unexpected charges](https://learn.microsoft.com/en-us/azure/cost-management-billing/understand/analyze-unexpected-charges)).
4. **A monthly two-minute check:** Cost analysis shows £0.00, and **All resources** lists only the Static Web App (runbook 02).
