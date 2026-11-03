# Steady midweek check-in launch plan (written before seeing data)

Fictional data note: written for the AI-native PM academy. Steady, its users and every number in this folder are made up. Nothing here comes from a real product.

## Hypothesis

If weekly active users get an AI check-in on Wednesday, more of them complete the check-in, and more of them keep a goal moving.

## Test design

- Unit: user, split 50/50 by user id. Control gets no midweek check-in, treatment gets it.
- Segments (fixed now): `new_users` (first four weeks in the app) and `returning_users`.
- Exposed: the user was active in the app during the test. All rates divide by exposed users.

## Metrics

- Primary: share of exposed users who progress at least one goal in the 7 days after assignment. This is a short stand-in for the real outcome (progress in four of the first six weeks), which a 14 day test cannot show.
- Leading: share of exposed users who complete the midweek check-in. Control users have a baseline because they can still start one on their own.
- Guardrail: notification opt-outs plus goal deletions per 1000 exposed users. Reports of upsetting check-in messages are read by a person each week, outside this file.

## Pre-set numbers

- Baseline primary rate: 51%.
- Minimum detectable effect: +2.0 percentage points (51% to 53%).
- Significance level 5% two-sided, power 80%.
- Sample size per arm: n = (1.96 + 0.84)^2 x (p1(1-p1) + p2(1-p2)) / (p2 - p1)^2 with p1 = 0.51 and p2 = 0.53, which gives 9,792 exposed users per arm. Round up to 9,800.
- Run length: 14 days. About 750 users per arm are assigned each day and about 95% are exposed, so the sample is reached on the last day with no spare days. Any lost day means the plan is short.
- Baseline guardrail: about 10 events per 1000 exposed users overall.

## Decision rules

- Stop: the guardrail rises by 4 or more per 1000 users overall, or by 8 or more per 1000 users in a segment with at least 2,000 exposed users. Roll back for that audience.
- Ship: primary rate up by at least 2.0 pp with p < 0.05, and the guardrail within both limits.
- Iterate: the primary rate is below 2.0 pp or not significant, the guardrail holds, and you have a specific change to the check-in to test next.
- Inconclusive: planned sample not reached and the guardrail holds. Say what is still unknown and extend only if another week is worth it.
- Data checks first: before reading any metric, check for duplicates, missing days per arm and the 50/50 split.
