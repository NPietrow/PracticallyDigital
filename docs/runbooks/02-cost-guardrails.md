# Runbook 02: Cost guardrails

**Who:** Nikita, in the Azure portal. **When:** after runbook 01. A newly upgraded subscription can wait: Microsoft says "it might take up to 48 hours before you can use all Cost Management features" ([budgets](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-acm-create-budgets), checked 14 November 2026). If **Budgets** isn't available yet, do runbook 03 first and come back. **Takes:** about 10 minutes, then two minutes a month.

**What this sets up, and what it doesn't.** A *budget* is an amount you expect to spend in a month, with email alerts as cost approaches or passes it. An *anomaly alert* is an email when Azure spots spending that doesn't fit the usual pattern. Both are warnings only. They don't cap anything:

- "Resources aren't affected, and your consumption isn't stopped" (budgets page above).
- Cost data "is typically available within 8-24 hours", and budgets are "evaluated against these costs every 24 hours" (same page). A charge that starts today might reach your inbox tomorrow or the day after.
- Anomalies are "evaluated for subscriptions daily", and detection runs "36 hours after the end of the day (UTC)" ([unexpected charges](https://learn.microsoft.com/en-us/azure/cost-management-billing/understand/analyze-unexpected-charges)).

The alerts give you a chance to notice, and the monthly check at the end catches anything they miss.

If any screen doesn't match what's written here, stop and tell Claude rather than guessing.

## Steps

### Budget

1. **Open the subscription's budgets.** In <https://portal.azure.com>, go to **Subscriptions → `practically-digital` → Budgets** (in the left-hand menu, under Cost Management), then **+ Add**.
   **Expect:** a "Create budget" form, with the scope shown as the `practically-digital` subscription.

2. **Set the budget amount.**
   - **Name:** `budget-practically-digital`
   - **Reset period:** **Monthly**
   - **Creation date / Expiration date:** leave the defaults (the expiry is a few years out; note it somewhere so you can extend it)
   - **Amount:** `1` (pounds)

   Select **Next**.
   *What it does:* £1 is far above the expected £0.00, so any alert means something real has appeared.
   **Expect:** the alert conditions page.

3. **Add three alert conditions.** Each row has a **Type** and a **% of budget**:

   | Type | % of budget | Fires when |
   |---|---|---|
   | Actual | 1 | real spend reaches 1p, the first sign of any charge |
   | Actual | 100 | real spend reaches £1 |
   | Forecasted | 100 | Azure projects the month will reach £1 |

   Under **Alert recipients (email)**, enter your email address. Then **Create**.
   **Expect:** `budget-practically-digital` listed under Budgets, at £1.00 monthly, with current spend £0.00.

### Anomaly alert

4. **Create the anomaly alert.** From the portal home page, open **Cost Management** (under Tools), then **Cost alerts → + Add**. Set **Alert type** to **Anomaly**, check the scope is the `practically-digital` subscription (anomaly alerts only work at subscription scope), name it `anomaly-practically-digital`, enter your email address as the recipient, and select **Create**.
   **Expect:** the rule listed under **Alert rules**.

### Monthly check (two minutes, first week of each month)

5. **Cost analysis.** Go to **Subscriptions → `practically-digital` → Cost analysis**.
   **Expect:** £0.00 for the current and previous month.

6. **All resources.** Search for **All resources**.
   **Expect:** one resource: `practically-digital`, type **Static Web App**. Anything else is unexpected: tell Claude, and if you didn't create it, treat it as a possible break-in. Change your Microsoft account password, then delete the resource.

7. **Static Web App plan.** Open `practically-digital`.
   **Expect:** **Hosting plan: Free** on the Overview page.

## Done when

- `budget-practically-digital` exists with the three alerts going to your email.
- The anomaly alert rule exists.
- There's a monthly reminder in your calendar for steps 5 to 7.
