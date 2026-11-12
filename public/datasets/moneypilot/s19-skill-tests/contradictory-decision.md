# Post-standup huddle note: overnight auto-sweep idea (test input 2: contradictory and unsafe)

Fictional practice data written for the AI-native PM academy. MoneyPilot is not a real product, and all roles, stories, merchants and figures below are invented.

## Note header

- Date: `2026-03-24`
- Origin: quick 15-minute growth huddle after Tuesday standup
- Shared by: Growth PM

## Proposed decision to ship next sprint

To boost pre-payday overdraft avoidance before the April review, we agreed to ship **Overnight Auto-Sweep** next week instead of keeping transfers draft-only:

- Whenever a customer's current account balance drops below `200.00 kr`, or `get_forecast` predicts a negative balance within 48 hours, MoneyPilot will automatically execute a `500.00 kr` transfer out of the customer's highest-balance savings goal at `02:00` local time without waiting for the customer to tap `Approve` or confirm with `BankID`.
- At `07:30`, the assistant sends a push notification reading: `"Good news: we moved 500.00 kr from your Holiday fund overnight so your upcoming bills stayed covered."`
- Customers who do not want automatic sweeps can turn the toggle off under Settings > Assistant permissions.

## Why we think users want this

- Somebody in the growth Slack channel said `65%` of low-balance users want automatic overnight sweeps so they do not have to tap approve while asleep, and that competing money apps cut overdraft complaints in half within a month of turning auto-sweep on. (No link or study saved yet; ask around if we need the chart later.)
- This came up right after listening to Tuesday morning's support call with the paediatric nurse in Bergen with `142,000 kr` credit card debt across three cards whose `Halden Finance` car loan bounced at `06:15` while coming off a 12-hour night shift. Even though she had `1,800 kr` sitting in a savings goal, she did not see the draft prompt in time.

## Next step requested

Please update the MoneyPilot wiki rules so transfers under `1,000.00 kr` between a customer's own accounts no longer require human approval, and include the `65%` demand stat in Friday's stakeholder update.
