# MoneyPilot interview synthesis answer key for Session 10

Fictional practice data written for the AI-native PM academy. MoneyPilot is not a real product, and all participants, accounts, merchants and figures in `s10-interviews/` are invented.

Open only in step 3 after writing your own synthesis by hand and comparing it with your agent's synthesis. Your wording and Opportunity Solution Tree grouping may differ slightly; use this reference to check whether you separated real behavioural evidence from polite noise and caught both prototype comprehension failures.

## 1. Real behavioural evidence versus polite noise and contradictions

A careless synthesis treats every positive quote and feature wish equally. Across `P1` to `P5`, three traps separate careful PM synthesis from surface summarisation:

| Participant | What sounds convincing at first glance                                                                                                                               | What past behaviour actually shows                                                                                                                                                                                                                                                                                                         | How to treat it                                                                                                                                                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `P3`        | "The design looks super clean... I would totally use this, I'd probably check it every week!" plus a detailed pitch for an `aksjesparekonto` index-fund recommender. | Keeps a permanent `40,000 kr` to `45,000 kr` buffer, opens their bank app twice a month, has no workaround and has not dipped below `29,000 kr` in four years.                                                                                                                                                                             | **Exclude from core problem evidence.** Polite praise from an out-of-segment `high_balance` user with zero pre-payday pain. Recommending specific funds also crosses into regulated investment advice, which MoneyPilot refuses. |
| `P2`        | Opening claim: "I open my banking app every single morning... I always know within a hundred kroner where I stand."                                                  | In February, stopped opening the app from the 21st out of dread, forgot Tellmore Mobile (`285.00 kr`) and Brookline Water (`440.00 kr`) rolled over the weekend onto Monday `23 February`, went `314.00 kr` overdrawn, and now leaves their main debit card in a drawer during payday week.                                                | **Trust the specific February story and workaround, not the opening generalisation.**                                                                                                                                            |
| `P4`        | Opening claim: "I have a bulletproof system... all my bills are predictable and I never run short before payday anymore" (uses a separate Bills account).            | Pulled `600 kr` from Emergency saver on `22 February` because recurring debit-card bills (Pulse Gym `299.90 kr`, Reelbox `109.90 kr`, Kestrel Car Insurance `985.00 kr` after an annual renewal jump from `610.00 kr`) bypass the `AvtaleGiro` Bills account, and an earlier budgeting app showed zero recurring bills on their card feed. | **Strong evidence.** Reveals why `AvtaleGiro`-only detection fails in practice (links directly to the `bill_count = 0` pattern in Session 11).                                                                                   |

## 2. Core opportunities supported by 3 or more participants

All four target-segment participants (`P1`, `P2`, `P4`, `P5`) struggle with pre-payday cash flow despite active workarounds:

1. **"I cannot tell which recurring bills are still left to leave between today and payday without piecing it together myself."** (`4/5`: `P1`, `P2`, `P4`, `P5`)
   - `P1` manually cross-checks an Apple Note of 9 bills against three weeks of bank transactions and gets tripped up by weekend date shifts (`Fenwick Broadband`).
   - `P2` relied on bus-stop mental arithmetic, missed two weekend-shifted Monday `AvtaleGiro` charges (`Tellmore Mobile` and `Brookline Water`), and went `314.00 kr` overdrawn despite having `900 kr` in a savings account.
   - `P4`'s `AvtaleGiro` Bills account misses recurring debit-card bills (`Pulse Gym`, `Reelbox`, `Kestrel Car Insurance`).
   - `P5` abandons a 14-row laptop Google Sheet mid-month because it is unusable one-handed on a phone during "the squinting week" (`18th` to `24th`).

2. **"Even when I see my raw balance, I cannot tell how much is genuinely safe after committed bills versus needed for everyday food and travel."** (`4/5`: `P1`, `P2`, `P4`, `P5`)
   - `P1` raided their Holiday fund three separate times (`300 kr`, `200 kr`, `250 kr`) between `20` and `24 February` because they could not tell if `1,400 kr` was pure grocery money or still owed to a bill.
   - `P2` locks their main card in a bedroom drawer from the 22nd and drips `150 kr` a day onto a secondary card so contactless taps cannot collide with remaining bills.
   - `P4` spent main-account grocery money without realising `1,394.80 kr` of card-billed subscriptions and renewals were still coming out before the 25th.
   - `P5` put nappies back on the supermarket shelf on `22 February` despite having `900 kr` technical headroom, out of fear `Halden Finance Car Loan` (`1,850 kr`) had not cleared.

3. **"Variable bills and annual renewals jump in amount without me connecting the supplier notice to my pre-payday balance."** (`3/5`: `P1`, `P4`, `P5`)
   - `P1`: `Nordlys Electricity` winter adjustment jumped from `820.00 kr` to `1,340.00 kr` (`+520.00 kr`) while the Apple Note still said `820 kr`.
   - `P4`: `Kestrel Car Insurance` annual renewal jumped from `610.00 kr` to `985.00 kr` (`+375.00 kr`) on `19 February`; also tapped `Nordlys Electricity 1,180.00 kr` three times in the prototype asking how it compared to last month.
   - `P5`: `Tellmore Mobile` jumped from `220.00 kr` (hardcoded in the spreadsheet) to `694.00 kr` (`+474.00 kr` roaming charge) on `20 February`, forcing an emergency `750 kr` savings transfer at the checkout.

### Single-person tangents and weak signals (1 participant each, do not promote to core themes)

- Receipt photo scanning to split pet food and cleaning items from groceries (`P1`, tangent).
- Automatic Vipps or chat bill-splitting chaser for flatmates after restaurant meals (`P2`, tangent).
- External `aksjesparekonto` net-worth tracker and index-fund recommender (`P3`, out-of-segment wish + regulated advice boundary).
- AI phone/web agent that calls broadband providers to haggle or cancels gym contracts (`P4`, hypothetical wish).
- Read-only partner widget for upcoming household bills without sharing full bank credentials (`P5`, `1` participant; reasonable follow-up question for future discovery, not yet validated across multiple households).

## 3. Prototype usability and comprehension findings

Testing the Level 2 static HTML `Safe before payday and upcoming bills` probe in its shortfall state (`4,100.00 kr` balance, `4` bills totalling `4,550.00 kr`, `-450.00 kr` on `24 March` with small grey caption `Left after scheduled bills, everyday spending not included`) alongside an early static wireframe mockup card (`Prepare 500 kr transfer from Holiday fund`, before building live transfer logic in Level 4) surfaced **two critical comprehension and trust failures**:

1. **Comprehension failure 1: Users miss the muted grey caption and assume `Safe before payday` includes everyday groceries and card spending (`P1` and `P4` misread it outright; `P2` and `P5` warned the grey caption is far too subtle).**
   - Both `P1` and `P4` initially concluded that moving `500 kr` to reach `+50.00 kr` meant food, fuel and commuting until payday were already covered, only realising `4,100 kr - 4,550 kr = -450 kr` leaves `0 kr` for groceries when they checked the arithmetic aloud.
   - `P2` paused eight seconds squinting to work out whether card spending was deducted, and `P5` warned tired parents would skip past the tiny muted grey line (`Left after scheduled bills, everyday spending not included`).
   - **Design implication:** Render `"Left after scheduled bills, everyday spending not included"` directly beside or beneath `Safe before payday` at full body size and high contrast, never in low-contrast grey footnote text.

2. **Comprehension failure 2: Fear on the static wireframe card that tapping `Prepare 500 kr transfer` would move money immediately without a separate approval step (`P2` and `P5`, `2/5`).**
   - `P2` pulled their thumb back from the wireframe CTA because internal transfers between own accounts in bank apps usually execute immediately without `BankID`.
   - `P5` hesitated over toddler accidental taps and said `"Prepare"` does not clearly state that nothing moves yet.
   - **Design implication:** When adding cover-transfer drafts in Level 4, make the two-step control model unmistakable on the button and microcopy (for example `"Preview cover transfer"` with `"Creates a draft in Ask MoneyPilot: nothing moves until you tap Approve"`).

3. **Secondary usability observation (`P4`, `1/5`):** Tapped `Nordlys Electricity 1,180.00 kr` three times expecting to see whether `1,180.00 kr` was fixed or changed from last month's bill, and asked whether recurring debit-card bills (`Pulse Gym`, `Kestrel Car Insurance`) are detected alongside `AvtaleGiro` and `eFaktura`.
