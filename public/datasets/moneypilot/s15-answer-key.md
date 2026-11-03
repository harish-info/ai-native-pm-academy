# MoneyPilot answer key

Fictional data note: written for the AI-native PM academy. MoneyPilot and all numbers are made up. Every figure below comes from `s15-experiment-results.csv`, produced by `scripts/generate-s15-datasets.mjs`. Rates divide by exposed users. Tests are two-proportion z-tests, two-sided.

## Data-quality trap

- 2026-03-08 appears twice: 6 duplicate rows, every arm and segment. The sheet has 12 rows for that date instead of 6.
- Dropping the duplicates leaves 84 rows. The split is fine (assigned 21,083 control, 21,020 treatment).
- Effect on the reading: small here, because both arms are doubled equally. As delivered, the primary lift reads +1.61 pp (z=4.92); after the fix it is +1.54 pp (z=4.55). Counts and confidence are overstated, and a plan with a stricter margin could be tipped by it.

## Headline result (after the fix)

- Primary, no unplanned overdraft: control 86.08%, treatment 87.61%. Absolute +1.54 pp, relative +1.8%, z=4.55, p<0.0001. This clears the +1.0 pp minimum detectable effect and the 18,328 per arm sample (exposed 20,036 control, 19,902 treatment).
- Leading, forecast check before payday: 32.40% to 42.41%, +10.02 pp, p<0.0001.
- Guardrail overall: 10.8 to 13.3 complaints per 1000, +2.5 per 1000 (+22.9% relative), z=2.27, p=0.0230. This is under the 4 per 1000 overall stop limit.

## Segment guardrail regression

- low_balance: 17.5 to 26.8 per 1000, +9.3 per 1000 (+53.1% relative), z=3.15, p=0.0016, with 4,975 control and 5,004 treatment exposed users. This breaks the 8 per 1000 segment limit.
- mid_balance: 10.2 to 10.7 per 1000, +0.5, p=0.7299. high_balance: 6.3 to 5.9 per 1000, -0.4, p=0.7764. Both flat.
- low_balance also gained on the primary metric (70.33% to 72.68%, +2.35 pp, p=0.0093), so the feature helps these users and upsets some of them. Read the complaints before deciding why.

## Decision the plan implies

Iterate. The primary rule passes and the overall guardrail holds, but low_balance breaks the segment limit. Keep the forecast off for low_balance, find what those users complain about, and test a fix.

This is one reasonable reading.
