# Wayfinder launch plan (written before seeing data)

Fictional practice data written for the AI-native PM academy. Wayfinder, its travellers and every number in this folder are invented. Nothing here comes from a real travel app or operator.

## Hypothesis

If travellers with an active weekend trip see the **Rainy-Day & Transit Replan Drawer** (verified indoor swaps, live transit buffers and one-tap schedule clash previews), more of them check day-of transit and weather backups before setting out, and more trips complete the weekend without a missed timed booking or closed-venue wasted trip.

## Test design

- Unit: active weekend trip organiser, split 50/50 by user id (`control` sees the static `Day Plan & Budget Split` view; `treatment` also gets the Rainy-Day & Transit Replan Drawer).
- Segments (fixed before launch, by trip profile): `solo_couple`, `small_group`, `family_accessibility` (trips tagged with stroller, step-free or mobility-lift routing).
- Exposed: the organiser opened an active weekend itinerary during the test window. All rates below divide by exposed users.

## Metrics

- Primary (`successes / exposed`): share of exposed organisers whose weekend trip completes with zero missed timed stops or closed-venue arrivals (logged via itinerary check-ins and post-weekend prompt).
- Leading (`leading_events / exposed`): share of exposed organisers who run a pre-departure hours, transit-buffer or rainy-day backup check during the trip.
- Guardrail (`guardrail_events / exposed * 1000`): routing, hours or replan complaints and support contacts per 1,000 exposed users. Severe cases (such as stranding a traveller at an inaccessible stop or charging an unapproved hold) are reviewed one by one outside this file.

## Pre-set numbers

- Baseline primary rate: `86.0%`.
- Minimum detectable effect: `+1.0` percentage point (`86.0%` to `87.0%`). Smaller gains would not justify live transit and venue-hours feed costs.
- Significance level: `5%` two-sided, power `80%`.
- Sample size per arm: `n = (1.96 + 0.84)^2 x (p1(1 - p1) + p2(1 - p2)) / (p2 - p1)^2` with `p1 = 0.86` and `p2 = 0.87`, giving `18,328` exposed users per arm (rounded up to `18,400`).
- Run length: `14` days (`2026-03-02` to `2026-03-15`). About `1,500` users per arm are assigned daily and ~`95%` are exposed, reaching full sample around day 13. Do not stop or peek early.
- Baseline guardrail: about `11` replan/routing complaints per `1,000` exposed users overall.

## Decision rules

- **Stop at once, any day:** a confirmed severe safety/charging incident traced to the drawer, or the overall guardrail rises by `4.0` or more complaints per `1,000` exposed users.
- **Ship:** primary rate rises by at least `+1.0` pp with `p < 0.05`, and no guardrail breach overall (`< +4.0 / 1,000`) or in any pre-set segment (`< +8.0 / 1,000`).
- **Iterate:** primary rate passes, and overall guardrail holds, while the guardrail rises by `8.0` or more per `1,000` exposed users in one segment with at least `3,000` exposed users. Hold back or gate the feature for that segment, fix the root cause, and re-test.
- **Stop:** overall guardrail breaches `+4.0 / 1,000`, or the primary lift is below `+1.0` pp.
- **Data checks first:** before computing any lift, verify row counts, duplicate dates, missing days and sample-ratio mismatch (`50/50` assignment split). Deduplicate pipeline glitches before applying the decision rules.
