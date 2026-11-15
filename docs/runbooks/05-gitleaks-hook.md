# Runbook 05: gitleaks pre-commit hook

**Who:** Nikita, in the VS Code terminal and GitHub Desktop, with Claude for the test. **When:** before the first pull request of plan 2. **Takes:** about 10 minutes.

**What this sets up.** A check that runs every time you (or Claude) commit in this folder. gitleaks looks at the changes being committed, and if anything looks like a secret, the commit is stopped and the output says which file and which rule matched ([ADR-0007](../adr/0007-repository-secret-hygiene.md)). The hook itself is already in the repository as `.githooks/pre-commit`. This runbook installs gitleaks and tells git to use the hook.

If any screen doesn't match what's written here, stop and tell Claude rather than guessing.

## Steps

1. **Install gitleaks.** In a VS Code terminal:

   ```powershell
   winget install Gitleaks.Gitleaks
   ```

   *What it does:* winget is Windows' package installer. It downloads gitleaks from its publisher and adds it to your PATH (the list of folders Windows searches for commands).
   **Expect:** "Successfully installed". Accept any prompt from winget about the source agreement.

2. **Restart VS Code and GitHub Desktop.** Close both completely and reopen them.
   *What it does:* programs read PATH when they start, so already-open ones can't see gitleaks yet.
   **Expect:** both reopen on this repository.

3. **Check gitleaks runs.** In a new VS Code terminal:

   ```powershell
   gitleaks version
   ```

   **Expect:** a version number of 8.30 or later.

4. **Turn the hook on for this clone.** In the VS Code terminal, in the repository folder:

   ```powershell
   git config core.hooksPath .githooks
   ```

   *What it does:* tells git to look for hook scripts in the committed `.githooks` folder instead of its private `.git/hooks` folder. The setting is stored in this clone's `.git/config`, so it applies to this copy of the repository only. A fresh clone, on this machine or another, needs the same command.
   **Expect:** no output. Then `git config --get core.hooksPath` prints `.githooks`.

5. **Planted-secret test.** Tell Claude you're ready. Claude creates `scratch-leak.txt` in the repository folder, holding a fake GitHub token (`ghp_` followed by 36 random letters and digits). It's random, so it doesn't open anything, but it matches gitleaks's `github-pat` rule. Claude doesn't commit it.
   In GitHub Desktop, tick `scratch-leak.txt` in **Changes**, type any summary, and click **Commit to deploy-and-operate**.
   **Expect:** the commit is blocked. GitHub Desktop shows the hook's output, naming `scratch-leak.txt` and the rule `github-pat`, with the secret shown as `REDACTED`.

   GitHub Desktop will offer **Commit anyway**. **Don't click it.** That's the bypass, and it's the reason the CI `gitleaks` job exists as a backstop.

6. **Clean up.** Close the hook dialog. In **Changes**, right-click `scratch-leak.txt` **→ Discard changes**, and confirm.
   **Expect:** `scratch-leak.txt` gone from Changes and from the folder. Tell Claude the result so it goes in the verification record.

## Done when

- `gitleaks version` works in a new terminal.
- `git config --get core.hooksPath` prints `.githooks`.
- The planted-secret commit was blocked, and the file is discarded.
