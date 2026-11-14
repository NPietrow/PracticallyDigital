# A secret has leaked

**Who:** Nikita, with Claude. **When:** as soon as a secret is seen anywhere it shouldn't be: a commit, a PR, an issue, a log, a screenshot, a chat. **Takes:** 10 minutes for the part that matters (steps 1 to 3).

**What counts as a secret here.** Exactly one thing: the Static Web Apps **deployment token** (`AZURE_STATIC_WEB_APPS_API_TOKEN`). Anyone holding it can replace the live site's content. The Cloudflare Web Analytics token is public by design (it's in every page's HTML), so it isn't a secret. Any other password or key appearing in the repository is a mistake in itself: treat it as leaked, and rotate it with whoever issued it.

**The order matters: revoke and rotate first, clean up later.** Once something has been pushed to a public repository, assume it has been copied. Forks, clones and caches keep the old content however thoroughly history is cleaned. Only changing the token makes the leaked copy useless.

## Steps

1. **Reset the token.** In the Azure portal, open the `practically-digital` Static Web App **→ Overview → Manage deployment token → Reset token** ([deployment tokens](https://learn.microsoft.com/en-us/azure/static-web-apps/deployment-token-management)). Then copy the new token.
   **Expect:** a new token shown, different from the old one.

2. **Update the GitHub secret.** In the repository, go to **Settings → Secrets and variables → Actions**, click the pencil next to `AZURE_STATIC_WEB_APPS_API_TOKEN`, paste the new token, and **Update secret**. Then copy some other text so the token isn't left on the clipboard (and delete it from **Windows key + V** history if you use that).
   **Expect:** the secret shows "Updated just now".

3. **Prove the new token works and the site is ours.** Go to **Actions → Deploy → Run workflow** on `main`.
   *What it does:* redeploys the site from `main` with the new token, overwriting anything someone else may have deployed with the old one.
   **Expect:** a green Deploy run, and the live site looking as it should.

4. **Look for misuse.** In the Static Web App, open **Environments** and check that only production and the previews of currently open PRs are listed. Open **Activity log** and check for actions you didn't take. In GitHub, check **Actions** for runs you don't recognise. Tell Claude what you find. Anything unexpected is worth a closer look together before going further.

5. **Close the alert.** If GitHub secret scanning raised an alert (**Security → Secret scanning**), close it as **Revoked**.

6. **Only now, clean up.** If the token was committed, decide with Claude whether to remove it from history. It's optional once the token is rotated, because the old value no longer works. If you do, it's a history rewrite on a protected branch, so it needs a careful plan of its own. Expect forks and caches to keep the old value either way. If the token was in a PR comment, issue or log, delete or edit that text.

7. **Write it down.** Add a short note to the ledger or an issue: what leaked, where, when it was rotated, and anything found in step 4.

## Done when

- The old token is reset and the new one is in GitHub secrets.
- A Deploy run with the new token is green.
- The environments, activity log and Actions history have been checked.
