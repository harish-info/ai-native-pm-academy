# Triage drafted replies launch plan (written before seeing data)

Fictional data note: written for the AI-native PM academy. Triage, its tickets and every number in this folder are made up. Nothing here comes from a real company or product.

## Hypothesis

If support agents get a drafted reply on incoming tickets, they use light edits more often, and more tickets get a first response inside the target time.

## Test design

- Unit: ticket, assigned 50/50 at creation by ticket id. Control tickets get no draft, treatment tickets get one.
- Segments (fixed now, by ticket topic): `billing`, `how_to`, `bug_report`.
- Exposed: the ticket was opened by an agent during the test. All rates divide by exposed tickets.

## Metrics

- Primary: share of exposed tickets with a first response inside 30 minutes. This stands in for a shorter median first response time, which is hard to test at this size.
- Leading: share of exposed tickets where the agent sends the drafted reply with light edits. Control tickets count a reply that matches a saved snippet.
- Guardrail: reopened tickets per 1000 exposed tickets. Every refund mistake is reviewed one by one, outside this file.

## Pre-set numbers

- Baseline primary rate: 55%.
- Minimum detectable effect: +5.0 percentage points (55% to 60%).
- Significance level 5% two-sided, power 80%.
- Sample size per arm: n = (1.96 + 0.84)^2 x (p1(1-p1) + p2(1-p2)) / (p2 - p1)^2 with p1 = 0.55 and p2 = 0.60, which gives 1,531 exposed tickets per arm. Round up to 1,540.
- Run length: 14 days. About 160 tickets per arm are assigned each day and about 95% are exposed, so the sample is reached around day 11. Run the full 14 days to cover two weekly cycles.
- Baseline guardrail: about 55 reopened tickets per 1000 overall.
- Sample ratio check: assignment is 50/50, so a chi-square test on assigned tickets with p < 0.001 means the split is broken.

## Decision rules

- Not valid: the sample ratio check fails. Do not read the result as a verdict. Exclude the affected days, say so, and ask engineering to fix assignment before any ship decision.
- Stop: the reopen rate rises by 20 or more per 1000 tickets overall, or by 30 or more per 1000 tickets in a topic with at least 300 exposed tickets. Turn the drafts off for that topic.
- Ship: primary rate up by at least 5.0 pp with p < 0.05, a valid split, and no guardrail breach.
- Iterate: the primary gain is positive but below 5.0 pp, the guardrail holds, and there is a specific change to the drafts to test.
- Inconclusive: planned sample not reached, or the gain is not significant. Say what is still unknown.
- Data checks first: before reading any metric, check for duplicates, missing days and the 50/50 split.
