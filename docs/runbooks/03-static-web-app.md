# Runbook 03: Create the Static Web App

**Who:** Nikita, in the Azure portal and on GitHub. **When:** after runbook 01. **Takes:** about 10 minutes.

**What this sets up.** A *Static Web App* is the Azure resource that serves the site's files. We create it empty. Our own GitHub Actions workflow sends it the built site later ([ADR-0004](../adr/0004-hosting-on-azure-static-web-apps.md); ADR-0005 covers the pipeline). The workflow proves it's allowed to deploy with a *deployment token*: a long password that belongs to this one app. It's the project's only secret, and it lives only in GitHub's encrypted secrets store.

If any screen doesn't match what's written here, stop and tell Claude rather than guessing.

## Free plan limits

From Microsoft's pages, checked 14 November 2026:

| Limit | Free plan | Source |
|---|---|---|
| Bandwidth (data sent to visitors) | 100 GB a month | [quotas](https://learn.microsoft.com/en-us/azure/static-web-apps/quotas) |
| Bandwidth overage | "Unavailable" | [quotas](https://learn.microsoft.com/en-us/azure/static-web-apps/quotas) |
| Over the quota | "we will not be able to serve your site" | [pricing](https://azure.microsoft.com/en-gb/pricing/details/app-service/static/) |
| Preview environments | 3 per app | [quotas](https://learn.microsoft.com/en-us/azure/static-web-apps/quotas) |
| Custom domains | 2 per app | [quotas](https://learn.microsoft.com/en-us/azure/static-web-apps/quotas) |
| Storage | 250 MB per environment, 500 MB in total | [quotas](https://learn.microsoft.com/en-us/azure/static-web-apps/quotas) |
| Files | 15,000 | [quotas](https://learn.microsoft.com/en-us/azure/static-web-apps/quotas) |
| SLA (uptime promise) | None | [plans](https://learn.microsoft.com/en-us/azure/static-web-apps/plans) |

Preview environments are public: "Anyone can access the staged versions of your application via their URL" ([review pull requests](https://learn.microsoft.com/en-us/azure/static-web-apps/review-publish-pull-requests)).

## Steps

### Create the app

1. **Start the form.** In <https://portal.azure.com>, select **Create a resource**, search for **Static Web App**, and select **Create**.
   **Expect:** a "Create Static Web App" form on its **Basics** tab.

2. **Fill in Basics.**
   - **Subscription:** `practically-digital`
   - **Resource group:** `rg-practically-digital`
   - **Name:** `practically-digital`
   - **Plan type:** **Free**. Not Standard: Standard is paid and can bill for overage.
   - **Deployment source** (it may be labelled **Source**): **Other**
   - **Region:** if the form asks for one (it may appear under **Azure Functions and staging details**), pick the nearest European region offered, probably **West Europe**. If there's no region field, carry on. The site's files are served worldwide either way.

   *What "Other" means:* Azure creates the app and leaves the repository alone. If you picked **GitHub**, Azure would sign in to GitHub as you and commit its own workflow file straight to `main`, and we'd end up with two pipelines fighting over the site.

   **If "Other" isn't offered,** stop here and tell Claude. Don't pick GitHub. There's another way to create the app without a source, and we'll go through it together.

3. **Create it.** Select **Review + create**, check the summary shows **Free**, then **Create**.
   **Expect:** "Your deployment is complete" after a minute or so. Select **Go to resource**.

4. **Check the Overview page.**
   **Expect:**
   - **Hosting plan: Free**
   - a **URL** like `https://<two-or-three-words>.azurestaticapps.net`. Open it and you should see a placeholder page from Azure, because we haven't deployed anything yet.

   Send Claude that URL. It isn't a secret.

### Store the deployment token in GitHub

5. **Copy the token.** On the Overview page, select **Manage deployment token**, then copy the token.
   *What it does:* anyone with this token can replace the site's content, so it goes straight into GitHub and nowhere else: not a file, an email or a chat message.
   **Expect:** a long string of letters and numbers.

6. **Add it as a GitHub secret.** In a browser, open the repository on GitHub, then **Settings → Secrets and variables → Actions → New repository secret**.
   - **Name:** `AZURE_STATIC_WEB_APPS_API_TOKEN` (exactly this; the workflows look for this name)
   - **Secret:** paste the token

   Select **Add secret**.
   *What it does:* GitHub stores it encrypted and only hands it to workflow runs, which mask it in their logs. Runs started by forks or Dependabot don't get it at all.
   **Expect:** `AZURE_STATIC_WEB_APPS_API_TOKEN` listed under Repository secrets, with no way to see its value.

7. **Clear the clipboard.** Copy any other bit of text (a word on this page will do), so the token isn't left on the clipboard. If you use Windows clipboard history (**Windows key + V**), open it and delete the token entry too.
   **Expect:** pasting into Notepad gives the harmless text, and the token isn't in the Windows + V list.

## Done when

- `practically-digital` exists in `rg-practically-digital` with **Hosting plan: Free**.
- Claude has the `*.azurestaticapps.net` URL.
- `AZURE_STATIC_WEB_APPS_API_TOKEN` is listed in the repository's Actions secrets.

If the token ever leaks, follow [secret-leaked.md](secret-leaked.md).
