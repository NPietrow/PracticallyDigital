# Runbook 01: Azure subscription

**Who:** Nikita, in the Azure portal. **When:** before runbook 03. **Takes:** about 15 minutes.

**What this sets up.** A *subscription* is Azure's billing account for a set of resources: everything you create sits inside one, and its payment method pays for whatever is in it. A *resource group* is a folder inside a subscription that holds related resources, so you can see, and if needed delete, everything for this site in one place.

Your free trial has ended, so the subscription is disabled. This runbook upgrades it to pay-as-you-go. That needs a payment card, and Microsoft is plain about what that means: the spending limit "isn't available for subscriptions with commitment plans or with pay-as-you-go pricing" ([spending limit](https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/spending-limit), checked 14 November 2026). Nothing in Azure will stop a paid resource from billing. The Static Web App we create is on the Free plan, which can't bill ([ADR-0004](../adr/0004-hosting-on-azure-static-web-apps.md)), so the risk is a paid resource created by mistake or by someone else. Step 1 and runbook 02 are the guards against that.

If any screen doesn't match what's written here, stop and tell Claude rather than guessing.

## Steps

1. **Turn on two-step verification.** Go to <https://account.microsoft.com/security>, sign in with the account you use for Azure, and turn on two-step verification (it may sit under **Advanced security options** or **Manage how I sign in**). Use an authenticator app if it offers one.
   *What it does:* someone who learns your password still can't sign in without your phone. With a card on the account, this matters more than any other step here.
   **Expect:** two-step verification shown as **On**.

2. **Check for leftovers from the trial.** Sign in at <https://portal.azure.com>, search for **All resources** and open it.
   *What it does:* anything left over from the trial is paused while the subscription is disabled. Once you upgrade it starts running again, and billing.
   **Expect:** an empty list. If anything is listed, note its name and type and tell Claude before you upgrade.

3. **Open the subscription.** Search for **Subscriptions**, open it, and select your Free Trial (status **Disabled**).
   **Expect:** the subscription's overview page, with an **Upgrade subscription** button in the command bar along the top, or an upgrade banner.

4. **Start the upgrade.** Select **Upgrade subscription** (or the banner).
   *What it does:* turns the disabled trial into a pay-as-you-go subscription, which only charges for what you use.
   **Expect:** a form asking for a subscription name and a support plan, and possibly a payment method.

5. **Fill in the form.**
   - **Payment method:** add your card if asked. You may be asked to verify by phone.
   - **Subscription name:** `practically-digital`
   - **Support plan:** choose the free option, which may be labelled **No technical support** or **Basic**. Don't pick Developer, Standard or Professional Direct: those are paid monthly plans.

   Then select **Upgrade**.
   **Expect:** a confirmation, and back on **Subscriptions**, `practically-digital` with status **Active** and offer **Pay-As-You-Go**.

   *Fallback:* if there's no Upgrade option, go to **Subscriptions → + Add**, choose **Pay-As-You-Go**, and fill in the same name and the free support option. Then tell Claude, because the old trial will still be there (disabled, and harmless).

6. **Check All resources again.** Open **All resources**.
   **Expect:** still empty. If anything appeared, tell Claude now. Don't wait for the budget alerts.

7. **Create the resource group.** Search for **Resource groups → + Create**.
   - **Subscription:** `practically-digital`
   - **Resource group:** `rg-practically-digital`
   - **Region:** **(Europe) UK South**

   Select **Review + create**, then **Create**.
   *What it does:* makes the folder the Static Web App will live in. The region is only where the group's own records are kept. The site itself is served from wherever runbook 03 says.
   **Expect:** `rg-practically-digital` listed under Resource groups, with no resources in it yet. Resource groups are free.

## Done when

- Two-step verification is on.
- `practically-digital` is **Active** on **Pay-As-You-Go**, with the free support option.
- `rg-practically-digital` exists in UK South and is empty.

Next: [runbook 03](03-static-web-app.md), then [runbook 02](02-cost-guardrails.md) once Cost Management lets you create a budget.
