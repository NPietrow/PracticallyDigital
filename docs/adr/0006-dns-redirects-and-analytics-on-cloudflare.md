# ADR-0006: DNS, redirects and analytics on Cloudflare

## Status

Accepted, 14 November 2026. The [design spec](../superpowers/specs/2026-11-09-practically-digital-design.md) chose Cloudflare for DNS, the `.uk` redirect and Web Analytics; Nikita approved the details below on 13 November 2026. Provider facts were checked on 14 November 2026.

## Context

Both domains, `practicallydigital.co.uk` and `practicallydigital.uk`, are registered with Cloudflare Registrar, so their DNS is already on Cloudflare. The site is served by Azure Static Web Apps (ADR-0004). Five things need deciding:

1. Whether Cloudflare *proxies* the site's traffic or only answers DNS lookups.
2. How `www.practicallydigital.co.uk` and the whole `.uk` domain reach the main address.
3. Which analytics, if any.
4. DNSSEC.
5. What to publish for email, given that neither domain sends or receives any yet.

Terms used below:

- **DNS.** The internet's address book. A browser asks "where is `practicallydigital.co.uk`?" and DNS answers with a server address.
- **DNS-only vs proxied** (Cloudflare's grey and orange clouds). With **DNS-only**, Cloudflare answers the lookup and the browser then talks straight to Azure. With **proxied**, the browser talks to Cloudflare, which fetches the page from Azure and passes it on. That lets Cloudflare change, cache or redirect the traffic.
- **Apex.** The bare domain with nothing in front of it (`practicallydigital.co.uk`), as opposed to a subdomain such as `www`.
- **CNAME flattening.** DNS rules don't allow a CNAME ("this name is an alias for that one") at the apex. Cloudflare works around this by looking up the target itself and answering with its addresses. It "occurs by default for all plans when your domain uses a CNAME record for its zone apex" ([CNAME flattening](https://developers.cloudflare.com/dns/cname-flattening/set-up-cname-flattening/)).
- **DNSSEC.** Signatures on DNS answers, so a resolver can tell a genuine answer from a forged one.

## Options considered

### 1. Proxying the site

**DNS-only (chosen).** Browsers go straight to Azure, which serves its own free certificate for custom domains ([custom domains](https://learn.microsoft.com/en-us/azure/static-web-apps/custom-domain-external)). One party handles HTTPS, caching and headers, so when something breaks there's one place to look. Microsoft's custom-domain pages say nothing about putting a proxy in front, so DNS-only is the setup they describe.

**Proxied.** Cloudflare "recommends proxying all A, AAAA, and CNAME records that serve web traffic" ([proxy status](https://developers.cloudflare.com/dns/proxy-status/)), and proxying is what makes Cloudflare's automatic analytics setup work ([Web Analytics FAQ](https://developers.cloudflare.com/web-analytics/faq/)). The cost is a second layer of caching and certificates in front of Azure's. Microsoft doesn't document that arrangement, and we'd have to debug it ourselves if Azure's certificate renewal or domain validation stopped working behind it.

### 2. `www` and `.uk`

**Redirect at Cloudflare (chosen).** A Single Redirect rule sends any request for those names to `https://practicallydigital.co.uk`, keeping the path and query string. The Free plan allows 10 rules per zone ([Single Redirects](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/)). Redirects "require that you proxy the DNS records of your domain (or subdomain) through Cloudflare" ([URL forwarding](https://developers.cloudflare.com/rules/url-forwarding/)). So the redirect-only names get a proxied placeholder record (`AAAA 100::`, an address that leads nowhere) that exists only so the rule can run.

**Add them as SWA custom domains.** Free allows 2 custom domains per app ([quotas](https://learn.microsoft.com/en-us/azure/static-web-apps/quotas)), so `www` and the `.uk` apex together would use the whole allowance, and `www.practicallydigital.uk` wouldn't fit. Each would also serve the same pages at a second address unless we configured SWA to redirect it.

### 3. Analytics

**Cloudflare Web Analytics (chosen).** Cloudflare says it "does not use any client-side state, such as cookies or localStorage, to collect usage metrics" ([Web Analytics](https://www.cloudflare.com/web-analytics/)) and that it doesn't log query strings (FAQ above). Without proxying it needs a manual JavaScript snippet, and an account can have 10 such non-proxied sites, a soft limit ([limits](https://developers.cloudflare.com/web-analytics/limits/)). This site uses one. The snippet loads a script from Cloudflare on every page, which adds a fourth piece of browser JavaScript to the plan's list.

**No analytics.** Simplest, but the spec's 12-month goal is "steady traffic of people who read and use the material", and without a count nobody can tell whether that's happening.

**Application Insights.** The spec puts it after the MVP, as Digital Lab material.

### 4. DNSSEC

**On (chosen).** "Cloudflare Registrar offers one-click DNSSEC activation" ([Registrar](https://developers.cloudflare.com/registrar/)), and Cloudflare adds the parent-zone records itself for domains it registers ([DNSSEC](https://developers.cloudflare.com/dns/dnssec/)). It costs nothing and there's no key to manage.

### 5. Email records

**Publish "this domain sends no email" records (chosen).** Without them, anyone can send mail that claims to come from the domain. The NCSC's guidance for domains that don't send email ([protecting parked domains](https://www.ncsc.gov.uk/blog-post/protecting-parked-domains)) gives four records, and we use them all:

- a null MX (`MX 0 .`), meaning "no mail is accepted here"
- SPF `v=spf1 -all`, meaning "no server may send for this domain"
- DMARC `v=DMARC1; p=reject;`, meaning "reject mail that fails those checks"
- a wildcard DKIM record with an empty key

NCSC's DMARC example also asks for reports (`rua=`) to be sent to a mailbox. We leave that out until the domain has a mailbox.

## Decision

- Site records are **DNS-only**. Only the redirect-only names are **proxied**.
- `www.practicallydigital.co.uk`, `practicallydigital.uk` and `www.practicallydigital.uk` **redirect** to `https://practicallydigital.co.uk`, keeping the path and query string. Each redirect starts as 302 (temporary, so browsers don't remember a mistake) and becomes 301 (permanent) once it's checked.
- **Cloudflare Web Analytics** with the manual snippet, built into production pages only, from the repository variable `PUBLIC_CF_WEB_ANALYTICS_TOKEN`. The token is public by design (it appears in every page's HTML), so it's a variable rather than a secret.
- **DNSSEC** on both domains, and **Always Use HTTPS** on the `.uk` zone.
- The **no-email records** on both domains.

## Consequences

- Visitors to the live site don't pass through Cloudflare, so Cloudflare's caching and firewall features don't apply to them. If the site ever needs them, revisit this ADR.
- The beacon is the fourth browser script. The build checks the token's format and fails on anything that isn't 16 to 64 letters and digits, so a pasted mistake can't inject markup into every page. Test and preview builds never load the token. A Content Security Policy that allows the beacon is left for plan 3.
- The no-email records must be **replaced** before domain email is set up, or the new mailbox will reject its own mail.
- The About page needs a short privacy note about the analytics (handed to plan 3).
- Cloudflare's manual snippet now uses `type="module"`, so browsers too old to run the beacon skip it (FAQ above). Our component sets it.

## Cost impact

£0. DNS, Single Redirects (up to 10 per zone), DNSSEC, Always Use HTTPS and Web Analytics are all on Cloudflare's Free plan, and none of them can be upgraded to a paid plan without someone choosing to. The domains themselves are paid for yearly through Cloudflare Registrar, outside this project's hosting budget.
