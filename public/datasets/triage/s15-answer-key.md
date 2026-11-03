# Triage answer key

Fictional data note: written for the AI-native PM academy. Triage and all numbers are made up. Every figure below comes from `s15-experiment-results.csv`, produced by `scripts/generate-s15-datasets.mjs`. Rates divide by exposed tickets. Tests are two-proportion z-tests, two-sided.

## Data-quality trap

- Sample ratio mismatch. From 2026-03-09 to 2026-03-12, treatment gets about 45% as many tickets as control (for example 74 versus 165 on 2026-03-09). On the other ten days the arms match to within a few tickets.
- Over all days, assigned tickets are 2,240 control and 1,878 treatment, ratio 0.838, chi2=31.8, p<0.0001. The plan said p < 0.001 means the split is broken.
- Excluding those four days, the split is fine: 1,595 control, 1,592 treatment, p=0.9700.
- Effect on the reading: the missing treatment tickets are not random. Treatment success on those days is inflated, so the naive headline overstates the gain.

## Headline result

- As delivered: primary, first response inside 30 minutes, 56.44% to 60.63%, +4.19 pp (+7.4% relative), z=2.63, p=0.0084. It looks like a win overall.
- After excluding the bad days: 57.54% to 60.54%, +3.00 pp (+5.2% relative), z=1.67, p=0.0943. Not significant, and below the +5.0 pp minimum. Exposed tickets are 1,519 control and 1,495 treatment, just short of the planned 1,531 per arm.
- Leading, drafts used with light edits: 32.13% to 45.02%, +12.89 pp, p<0.0001 after the fix.
- Guardrail overall, reopens per 1000: 57.3 to 56.9, flat (p=0.9605). This hides the segment problem below.

## Segment guardrail regression

- billing: 73.6 to 131.4 reopens per 1000, +57.8 per 1000 (+78.6% relative), z=2.59, p=0.0096, with 367 control and 373 treatment exposed tickets. This breaks the 30 per 1000 segment limit. Billing success also does not improve (50.14% to 45.04%, -5.10 pp, p=0.1652).
- how_to: 41.8 to 32.3 per 1000, p=0.3469. bug_report: 67.5 to 31.8 per 1000, p=0.0141, so reopens fall there. Averaged together, the billing rise is hidden.
- how_to carries the gain: 65.66% to 74.34%, +8.68 pp, p=0.0004.

## Decision the plan implies

Not valid, so no ship decision. The sample ratio check failed, and the clean days show a gain that is not significant. Fix assignment and rerun. Separately, the billing reopen breach is a safety rule that applies at once: turn the drafts off for billing tickets (and review every refund mistake) while the rerun happens for how_to and bug_report.

This is one reasonable reading.
