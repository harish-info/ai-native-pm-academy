# Steady answer key

Fictional data note: written for the AI-native PM academy. Steady and all numbers are made up. Every figure below comes from `s15-experiment-results.csv`, produced by `scripts/generate-s15-datasets.mjs`. Rates divide by exposed users. Tests are two-proportion z-tests, two-sided.

## Data-quality trap

- 2026-03-10 has no treatment rows (control has 762 assigned users that day, treatment has none). That date has 2 rows instead of 4.
- As delivered, assigned users are 10,553 control and 9,813 treatment, a sample ratio of 0.930 (chi2=26.9, p<0.0001). The cause is the missing day, not a broken split.
- Fix: drop 2026-03-10 for both arms. The remaining 13 days are balanced (9,791 control, 9,813 treatment assigned).
- Effect on the reading: the rates barely move, but the treatment arm has only 9,330 exposed users, below the planned 9,792. The plan is short by one lost day.

## Headline result (after the fix)

- Primary, progressed a goal in 7 days: control 51.47%, treatment 54.51%. Absolute +3.04 pp, relative +5.9%, z=4.16, p<0.0001. This clears the +2.0 pp minimum detectable effect.
- Leading, midweek check-in completed: 39.02% to 50.24%, +11.22 pp, p<0.0001.
- Guardrail overall, opt-outs plus deletions: 10.4 to 17.1 per 1000, +6.8 per 1000 (+65.1% relative), z=3.96, p<0.0001. This breaks the 4 per 1000 overall limit.

## Segment guardrail regression

- new_users: 14.6 to 29.9 per 1000, +15.4 per 1000 (+105.4% relative), z=4.52, p<0.0001, with 3,775 control and 3,743 treatment exposed users. This breaks the 8 per 1000 segment limit.
- returning_users: 7.6 to 8.6 per 1000, +1.0, p=0.5394. Flat.
- The primary gain also sits mostly with returning users (57.37% to 61.20%, +3.82 pp, p<0.0001). For new users it is +1.76 pp, p=0.1250, not significant and below the +2.0 pp minimum.

## Decision the plan implies

Stop, and roll back the check-in for new users. The guardrail rule is broken overall and in new_users, and the headline win does not outweigh it. The missing day weakens the sample but does not change this, because safety rules apply every day regardless of sample size. A later iteration could test a gentler check-in for new users only.

This is one reasonable reading.
