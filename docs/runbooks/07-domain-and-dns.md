# Runbook 07: Domain and DNS

**Who:** Nikita, in the Azure portal and the Cloudflare dashboard. Claude checks each section from the terminal (read-only). **When:** after runbook 06, with the site already deployed to its `*.azurestaticapps.net` address. **Takes:** about an hour of clicking, plus waiting for validation (Microsoft says apex changes "can take up to 72 hours to propagate", [apex domains](https://learn.microsoft.com/en-us/azure/static-web-apps/apex-domain-external), checked 14 November 2026).

**What this sets up** ([ADR-0006](../adr/0006-dns-redirects-and-analytics-on-cloudflare.md) has the reasons):

| Zone | Type | Name | Content | Proxy |
|---|---|---|---|---|
| `practicallydigital.co.uk` | TXT | `@` | the SWA validation code | DNS only |
| `practicallydigital.co.uk` | CNAME | `@` | `<app>.azurestaticapps.net` | DNS only (Cloudflare flattens it at the apex) |
| `practicallydigital.co.uk` | AAAA | `www` | `100::` | Proxied (only so the redirect rule can run) |
| `practicallydigital.uk` | AAAA | `@` and `www` | `100::` | Proxied |
| both | MX | `@` | `.` with priority 0 | n/a |
| both | TXT | `@` | `v=spf1 -all` | n/a |
| both | TXT | `_dmarc` | `v=DMARC1; p=reject;` | n/a |
| both | TXT | `*._domainkey` | `v=DKIM1; p=` | n/a |

TTL is **Auto** everywhere. `<app>.azurestaticapps.net` means the Static Web App's own address from runbook 03, without `https://` or a trailing slash.

*DNS only* (grey cloud) means Cloudflare answers the lookup and visitors then connect straight to Azure. *Proxied* (orange cloud) means visitors connect to Cloudflare, which can then redirect them.

If any screen doesn't match what's written here, stop and tell Claude rather than guessing.

## Steps

### Before you start

1. **Trademark check.** Task 0's UK IPO search found nothing similar ("clear", 14 November 2026). If you've since heard of a clash, stop here.

2. **Two-step verification on Cloudflare.** In the Cloudflare dashboard, open your profile (top right) **→ Authentication**, and turn on two-factor authentication with an authenticator app. Save the backup codes somewhere safe and offline.
   *What it does:* the Cloudflare account controls where both domains point. Anyone who gets in could send your visitors anywhere.
   **Expect:** two-factor authentication shown as enabled.

3. **Look at what's already there.** For each of the two domains, open it in Cloudflare and go to **DNS → Records**.
   **Expect:** an empty list, or only records you recognise. Tell Claude about anything else before deleting it.

### Attach `practicallydigital.co.uk` to the Static Web App

4. **Ask Azure for a validation code.** In the Azure portal, open the `practicallydigital` Static Web App **→ Custom domains → + Add** (if it offers a choice, pick **Custom domain on other DNS**). Enter `practicallydigital.co.uk` and select **Next**. Under **Hostname record type** choose **TXT**, then **Generate code**. Copy the code, then **Close**.
   *What it does:* Azure needs proof that you control the domain before it serves the site and issues a certificate for it. A TXT record holding its code is that proof.
   **Expect:** the domain listed under Custom domains as **Validating**.

5. **Add the TXT record.** In Cloudflare, open `practicallydigital.co.uk` **→ DNS → Records → Add record**: Type **TXT**, Name `@`, Content: the code, TTL **Auto**. **Save**.
   **Expect:** the record listed. Tell Claude, who checks it with `nslookup -type=TXT practicallydigital.co.uk`.

6. **Wait for Validated.** Back in Azure **→ Custom domains**, refresh now and then.
   **Expect:** the status changes from **Validating** to **Validated** (minutes to hours; Microsoft allows up to 72 hours).

7. **Point the apex at the Static Web App.** In Cloudflare, **Add record**: Type **CNAME**, Name `@`, Target `<app>.azurestaticapps.net`, Proxy status **DNS only** (click the orange cloud until it turns grey), TTL **Auto**. **Save**.
   *What it does:* sends visitors of `practicallydigital.co.uk` to Azure. A CNAME isn't normally allowed at the apex. Cloudflare flattens it, which means it looks up the Azure address itself and answers with that.
   **Expect:** in Azure, the custom domain shows **Ready** after a while, and <https://practicallydigital.co.uk/> shows the site with a valid padlock.
   **Claude checks:** `nslookup practicallydigital.co.uk`, and `curl -sI https://practicallydigital.co.uk/` gives `200` with the five security headers.

### Redirect `www` and the `.uk` domain

8. **Placeholder records for the redirect names.** Add, all **Proxied** (orange cloud), TTL **Auto**:
   - in `practicallydigital.co.uk`: Type **AAAA**, Name `www`, IPv6 address `100::`
   - in `practicallydigital.uk`: Type **AAAA**, Name `@`, IPv6 address `100::`
   - in `practicallydigital.uk`: Type **AAAA**, Name `www`, IPv6 address `100::`

   *What it does:* `100::` is in the block of addresses reserved for throwing traffic away ([RFC 6666](https://www.rfc-editor.org/rfc/rfc6666)). Nothing is served from it. The records exist only so the names reach Cloudflare, where the redirect rules in step 9 catch them first.
   **Expect:** three AAAA records with orange clouds.

9. **Redirect rules.** In each zone, go to **Rules → Overview → Create rule → Redirect Rule**. (If Cloudflare offers a template for redirecting one domain to another, you can start from it, but check every field against the table.) For each rule, choose **Wildcard pattern**, then:

   | Zone | Rule name | Request URL | Target URL | Status code | Preserve query string |
   |---|---|---|---|---|---|
   | `.co.uk` | `www-to-apex` | `http*://www.practicallydigital.co.uk/*` | `https://practicallydigital.co.uk/${2}` | **302** | On |
   | `.uk` | `uk-apex-to-co-uk` | `http*://practicallydigital.uk/*` | `https://practicallydigital.co.uk/${2}` | **302** | On |
   | `.uk` | `uk-www-to-co-uk` | `http*://www.practicallydigital.uk/*` | `https://practicallydigital.co.uk/${2}` | **302** | On |

   **Deploy** each one.
   *What it does:* each `*` in the Request URL captures part of the address. The first catches `s` (or nothing) from `http`/`https`, the second catches the path, and `${2}` puts that path into the target. The pattern follows Cloudflare's own example ([redirect to another domain](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-all-another-domain/)). 302 means "temporary", so if a rule is wrong, browsers won't remember it. We switch to 301 (permanent) in step 13.
   **Expect:** three active rules, one in `.co.uk` and two in `.uk`.

10. **Always Use HTTPS on `.uk`.** In `practicallydigital.uk`, go to **SSL/TLS → Edge Certificates** and turn on **Always Use HTTPS**.
    *What it does:* sends anyone typing `http://` to the `https://` version first ([Always Use HTTPS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/)).
    **Expect:** the switch is on.
    **Claude checks:** `curl -sI https://www.practicallydigital.co.uk/about/` and `curl -sI http://practicallydigital.uk/about/?x=1` both end at `https://practicallydigital.co.uk/about/`, the second keeping `?x=1`. `curl -sI https://practicallydigital.co.uk/nope/` gives `404`.

### Say "no email here"

11. **Email records, in both zones.** Add, TTL **Auto**:
    - Type **MX**, Name `@`, Mail server `.`, Priority `0`
    - Type **TXT**, Name `@`, Content `v=spf1 -all`
    - Type **TXT**, Name `_dmarc`, Content `v=DMARC1; p=reject;`
    - Type **TXT**, Name `*._domainkey`, Content `v=DKIM1; p=`

    *What it does:* these are the four records the NCSC recommends for domains that don't send email ([protecting parked domains](https://www.ncsc.gov.uk/blog-post/protecting-parked-domains)). Together they tell other mail servers that no mail comes from or goes to these domains, so mail pretending to be from them gets rejected. They must be replaced before domain email is ever set up.
    **Expect:** four records in each zone. If Cloudflare won't accept `.` as a mail server, stop and tell Claude.

### DNSSEC

12. **Turn on DNSSEC, for each domain.** In the zone, go to **DNS → Settings → Enable DNSSEC**. (Cloudflare may also show it under **Domain Registration → Manage → Configuration**.)
    *What it does:* signs the domain's DNS answers so they can't be forged. "Cloudflare Registrar offers one-click DNSSEC activation" and adds the parent-zone records itself ([Registrar](https://developers.cloudflare.com/registrar/), [DNSSEC](https://developers.cloudflare.com/dns/dnssec/)).
    **Expect:** status **Pending**. Cloudflare says this "can take one to two days". Check back after two days for **Active**.

### Make the redirects permanent

13. **Switch to 301.** Once Claude confirms every check in steps 7 and 10, edit each of the three redirect rules, change **Status code** to **301**, and save.
    **Expect:** Claude re-runs the step 10 checks and sees `301`.

## Done when

- `https://practicallydigital.co.uk/` serves the site, with a valid certificate and the security headers.
- `www.practicallydigital.co.uk`, `practicallydigital.uk` and `www.practicallydigital.uk` redirect with 301 to the same path on `https://practicallydigital.co.uk`.
- Both zones have the four no-email records.
- DNSSEC is **Active** on both domains (after a day or two).

Next: [runbook 08](08-web-analytics.md).
