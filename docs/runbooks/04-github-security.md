# Runbook 04: GitHub security settings

**Who:** Nikita, on github.com. **When:** before the first pull request of plan 2. **Takes:** about 10 minutes.

**What this sets up.** Settings that stop secrets reaching the public repository, keep dependencies patched, and limit what GitHub Actions workflows may do ([ADR-0007](../adr/0007-repository-secret-hygiene.md)). Setting names were checked against GitHub's docs on 14 November 2026; GitHub moves things around, so the menu names may differ slightly.

If any screen doesn't match what's written here, stop and tell Claude rather than guessing.

## Steps

### Your account

1. **Two-factor authentication.** Click your avatar (top right) **→ Settings → Password and authentication**.
   *What it does:* the GitHub account can change workflows and secrets, so it needs more than a password.
   **Expect:** **Two-factor authentication** shown as enabled. If not, enable it with an authenticator app and save the recovery codes offline.

### Secret scanning and Dependabot

2. **Open the security settings.** In the repository, go to **Settings**, then **Advanced Security** in the left menu (it may be called **Code security**).
   **Expect:** a page listing Secret Protection, push protection and Dependabot options.

3. **Turn on:**
   - **Secret Protection** (secret scanning): **Enable**
   - **Push protection**: **Enable**. GitHub says this is "disabled by default" at repository level ([push protection](https://docs.github.com/en/code-security/secret-scanning/introduction/about-push-protection)).
   - **Dependabot alerts**: **Enable**
   - **Dependabot security updates**: **Enable**

   *What it does:* GitHub scans every push for known secret formats and rejects one that contains a secret. Dependabot warns about dependencies with known vulnerabilities and opens PRs to fix them. Routine version updates are configured separately, in `.github/dependabot.yml`.
   **Expect:** each one shown as enabled.

### GitHub Actions

4. **Open Actions settings.** Go to **Settings → Actions → General**.
   **Expect:** sections for Actions permissions, fork pull request approval and workflow permissions.

5. **Actions permissions.** Choose the option that allows your own actions plus selected others (labelled something like **Allow NPietrow, and select non-NPietrow, actions and reusable workflows**). Then:
   - tick **Allow actions created by GitHub**
   - in the box for specified actions, enter:
     ```
     Azure/static-web-apps-deploy@*,
     gitleaks/gitleaks-action@*
     ```
   - tick **Require actions to be pinned to a full-length commit SHA**

   Then **Save**.
   *What it does:* workflows can only use GitHub's own actions and the two named here, and only when pinned to an exact commit. A tag like `v1` can be moved to different code later; a commit SHA can't. Our workflows already pin every action this way, and a test checks it.
   **Expect:** the settings saved, with the two actions listed.

6. **Fork pull requests.** Under the approval section for fork pull request workflows, choose **Require approval for all external contributors**, then **Save**.
   *What it does:* a pull request from someone else's fork doesn't run any workflow until you approve it.
   **Expect:** that option selected.

7. **Workflow permissions.** Under **Workflow permissions**, choose the read-only option (read access to contents and packages). Untick **Allow GitHub Actions to create and approve pull requests**. **Save**.
   *What it does:* the automatic token each run gets can read the repository but not change it, unless a workflow asks for more for one job (ours do, only to comment the preview URL on a PR).
   **Expect:** read-only selected, the PR box unticked.

## Done when

- Two-factor authentication is on.
- Secret Protection, push protection, Dependabot alerts and Dependabot security updates are enabled.
- Actions allow only GitHub's actions plus the two named ones, pinned to SHAs; fork PRs need approval; the workflow token is read-only.
