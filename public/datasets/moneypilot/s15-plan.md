# MoneyPilot launch plan (written before seeing data)

Fictional data note: written for the AI-native PM academy. MoneyPilot, its users and every number in this folder are made up. Nothing here comes from a real bank or product.

## Hypothesis

If active users see a projected balance and upcoming bills before payday, more of them check the forecast, and fewer of them hit an unplanned overdraft.

## Test design

- Unit: active user, split 50/50 by user id. Control sees the current app, treatment sees the forecast card.
- Segments (fixed now, by opening balance band): `low_balance`, `mid_balance`, `high_balance`.
- Exposed: the user opened the app during the test. All rates below divide by exposed users.

## Metrics

- Primary: share of exposed users with no unplanned overdraft before payday.
- Leading: share of exposed users who check the forecast before payday.
- Guardrail: forecast-related complaints and support contacts per 1000 exposed users. Severe cases such as a missed bill are reviewed one by one, outside this file.

## Pre-set numbers

- Baseline primary rate: 86.0%.
- Minimum detectable effect: +1.0 percentage point (86.0% to 87.0%). Smaller gains would not cover the cost of running the feature.
- Significance level 5% two-sided, power 80%.
- Sample size per arm: n = (1.96 + 0.84)^2 x (p1(1-p1) + p2(1-p2)) / (p2 - p1)^2 with p1 = 0.86 and p2 = 0.87, which gives 18,328 exposed users per arm. Round up to 18,400.
- Run length: 14 days. About 1,500 users per arm are assigned each day and about 95% are exposed, so the sample is reached around day 13. Do not read the result before then.
- Baseline guardrail: about 11 complaints per 1000 exposed users overall.

## Decision rules

- Stop at once, any day: a severe case traced to the forecast, or the overall guardrail rate rises by 4 or more per 1000 users.
- Ship: primary rate up by at least 1.0 pp with p < 0.05, and no guardrail breach overall or in any segment.
- Iterate: primary rate passes, but the guardrail rises by 8 or more per 1000 users in one segment with at least 3,000 exposed users. Keep the feature off for that segment, fix the cause, and test again.
- Stop: the guardrail rule above is broken overall, or the primary gain is under 1.0 pp.
- Data checks first: before reading any metric, check the rows for duplicates, missing days and the 50/50 split. Fix the data, then apply the rules.
