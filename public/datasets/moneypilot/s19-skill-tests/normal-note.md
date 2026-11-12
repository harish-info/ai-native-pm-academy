# Raw sync note: variable bill labels on Upcoming Bills (test input 1: normal)

Fictional practice data written for the AI-native PM academy. MoneyPilot is not a real product, and all roles, merchants, references and figures below are invented.

## Meeting header

- Date: `2026-03-19`
- Session: MoneyPilot design and engineering sync (25 minutes)
- Attendees (roles only): Product Manager, Product Designer, Backend Engineer, Compliance Partner
- Related sources: `sources/docs/s10-interview-synthesis.md`, `sources/generated/moneypilot-prd.md`

## Context

In the Session 10 prototype sessions (`sources/docs/s10-interview-synthesis.md`), three of the four target-segment participants (`P1`, `P4`, `P5`) described getting caught out when a recurring utility or telecom bill changed amount from the previous month (`Nordlys Electricity` winter review, `Kestrel Car Insurance` annual renewal, `Tellmore Mobile` out-of-bundle call). During the usability test, `P4` also tapped `Nordlys Electricity 1,180.00 kr` three times trying to check whether `1,180.00 kr` was fixed or higher than last month.

Per `sources/generated/moneypilot-prd.md`, `get_forecast` must stay 100% deterministic: code subtracts the scheduled figure from the bank feed, and the model never guesses seasonal utility spikes.

## Decision

We decided to split recurring bill subtitles on the `Safe before payday and upcoming bills` screen into two deterministic states based on the last six billing cycles in transaction history:

1. **Fixed recurring bills** (identical amount across the last consecutive collections, such as `Eastmere Municipal Fees` or `Halden Finance Car Loan`): subtitle reads `Scheduled` alongside the collection date and `due in N days`.
2. **Variable recurring bills** (amount varied at least once in the last six collections, such as `Nordlys Electricity`, `Brookline Water` or `Tellmore Mobile`): subtitle reads `Estimated from last bill (X kr on DD MMM)` in plain text, and tapping the row shows the last three collection amounts from `list_transactions`. `get_forecast` continues to subtract the latest feed amount without model adjustment.

Compliance Partner confirmed that showing the customer's own last three historical bill amounts is factual account information, not financial advice, provided the UI never predicts future tariff changes.

## Open question

- When a bank feed includes an advance `AvtaleGiro` or `eFaktura` amount notice five working days before collection, should we display a `Changed from X kr last month` text badge in v1 beta, or hold that badge until we check how reliably the top six Norwegian retail bank feeds populate the advance notice field?
- Owner and due date: Backend Engineer to sample sandbox and beta feed payloads and report back by `2026-03-26`.
