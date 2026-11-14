# Runbook 06: Branch protection

**Who:** Nikita, on github.com. **When:** after the first plan 2 pull request has run its checks at least once. GitHub only lets you pick a required check by name once it has seen that check run. **Takes:** about 5 minutes.

**What this sets up.** A *ruleset* called `protect-main`: rules GitHub enforces on the `main` branch. Changes reach `main` only through a pull request whose checks (`build`, `gitleaks`, `accessibility`) have passed, and nobody, including you, can push to `main` directly, force-push over it or delete it. You can't approve your own pull request, so the ruleset asks for 0 approvals; merging stays a deliberate click by you (or by Claude when you ask).

If any screen doesn't match what's written here, stop and tell Claude rather than guessing.

## Steps

1. **New ruleset.** In the repository, go to **Settings → Rules → Rulesets → New ruleset → New branch ruleset**.
   **Expect:** a form for the ruleset's name, enforcement, bypass list, targets and rules.
   *Fallback:* if there's no **Rulesets** option, go to **Settings → Branches → Add classic branch protection rule** with branch name pattern `main`, and apply the same settings as below (require a pull request, require status checks with the branch up to date, no force pushes, no deletions, include administrators). Tell Claude you used the fallback.

2. **Name and scope.**
   - **Ruleset name:** `protect-main`
   - **Enforcement status:** **Active**
   - **Bypass list:** leave empty
   - **Target branches:** **Add target → Include default branch**

   *What it does:* an empty bypass list means the rules apply to everyone, administrators included.
   **Expect:** target shown as the default branch (`main`).

3. **Rules.** Tick:
   - **Restrict deletions**
   - **Require a pull request before merging**, with **Required approvals** set to `0`
   - **Require status checks to pass**, then:
     - tick **Require branches to be up to date before merging**
     - **Add checks**, and add `build`, `gitleaks` and `accessibility`, each from **GitHub Actions**
   - **Block force pushes**

   *What "up to date" means:* if `main` has moved on since a PR's branch was made, GitHub asks you to click **Update branch** on the PR. That re-runs the checks against the newest `main` before merging, so two PRs that each pass alone can't break `main` together.
   **Expect:** the three checks listed under required status checks.

4. **Create.** Click **Create**.
   **Expect:** `protect-main` listed under Rulesets as **Active**.

5. **Prove it works.** Plan Task 9 Step 2 covers this: a commit pushed straight to `main` should be rejected with a message about the repository's rules, which you then undo.

## Done when

- `protect-main` is Active, with three required checks and an empty bypass list.
- A direct push to `main` is rejected.
