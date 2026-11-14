# Runbook 08: Web Analytics

**Who:** Nikita, in the Cloudflare dashboard and on GitHub. **When:** after runbook 07, once `https://practicallydigital.co.uk` serves the site. **Takes:** about 10 minutes.

**What this sets up.** Cloudflare Web Analytics counts page views without cookies. Cloudflare says it "does not use any client-side state, such as cookies or localStorage, to collect usage metrics" ([Web Analytics](https://www.cloudflare.com/web-analytics/), checked 14 November 2026). Because the site isn't proxied through Cloudflare ([ADR-0006](../adr/0006-dns-redirects-and-analytics-on-cloudflare.md)), the counting script has to be built into the pages. The site already does that whenever the build is given a *site token*. This runbook gets the token and hands it to the production build.

**Why a variable, not a secret.** The token ends up in the HTML of every page, so anyone can read it with View Source. It's how Cloudflare knows which site a page view belongs to. Reading the dashboard still needs your Cloudflare login. GitHub secrets are for values that must stay hidden. Storing the token as a repository *variable* keeps it visible, and the workflow tests check that only the production build reads it.

If any screen doesn't match what's written here, stop and tell Claude rather than guessing.

## Steps

1. **Add the site in Cloudflare.** In the Cloudflare dashboard, open **Web Analytics → Add a site**. Under **Set up hostname**, enter `practicallydigital.co.uk`, then **Done**. If it asks how to install, choose the **manual JS snippet**, not automatic. Automatic setup only works for proxied sites ([Web Analytics FAQ](https://developers.cloudflare.com/web-analytics/faq/)).
   **Expect:** the site listed, with a **Manage site** option that shows a JavaScript snippet.

2. **Copy the token.** In **Manage site**, find the snippet. It contains `data-cf-beacon='{"token": "…"}'`. Copy only the value inside the second pair of quotes: a run of letters and digits. Don't add the snippet to any file. The site's own component writes it.
   **Expect:** a string of letters and digits with no spaces, quotes or braces. If it contains anything else, stop: the build accepts only 16 to 64 letters and digits, and fails on anything else.

3. **Store it as a repository variable.** In the GitHub repository, go to **Settings → Secrets and variables → Actions → Variables** tab **→ New repository variable**.
   - **Name:** `PUBLIC_CF_WEB_ANALYTICS_TOKEN`
   - **Value:** the token

   **Add variable**.
   **Expect:** `PUBLIC_CF_WEB_ANALYTICS_TOKEN` listed under Repository variables, with its value visible.

4. **Redeploy production.** In the repository, go to **Actions → Deploy → Run workflow**, keep **Branch: main**, then **Run workflow**.
   *What it does:* rebuilds the live site with the token, so every page now loads Cloudflare's beacon. The run's checks are told to expect the beacon this time.
   **Expect:** a green **Deploy** run after a few minutes.

5. **Check the live page.** Open <https://practicallydigital.co.uk/>, right-click **→ View page source**, and search for `cloudflareinsights`.
   **Expect:** one `<script type="module" … src="https://static.cloudflareinsights.com/beacon.min.js" …>` line near the end, with your token in it.

6. **Check the dashboard.** Visit a couple of pages on the live site, then open **Web Analytics** in Cloudflare.
   **Expect:** your visits appear after a short while. If nothing has shown after an hour, tell Claude. An ad blocker in your browser can stop the beacon, so try another browser before worrying.

Visits from the deploy checks don't count: they answer Cloudflare's beacon themselves, so nothing reaches Cloudflare. If you ever see visits from an `azurestaticapps.net` address, they're from a preview or someone testing; filter by hostname `practicallydigital.co.uk` to see real readers.

## Done when

- `PUBLIC_CF_WEB_ANALYTICS_TOKEN` is a repository variable.
- The live pages carry the beacon, and Cloudflare shows visits.

To turn analytics off, delete the variable and run **Deploy** again. The next build has no beacon.
