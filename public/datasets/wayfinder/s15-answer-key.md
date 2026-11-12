# Wayfinder experiment answer key for Session 15

Fictional practice data written for the AI-native PM academy. Wayfinder and all numbers in `s15-experiment-results.csv` are invented. Rates divide by exposed users; statistical tests use two-sided two-proportion z-tests.

Open this file only after you have audited the CSV for data-quality issues, checked sample-ratio balance, computed overall and segment metrics, and written your launch decision against `s15-plan.md`.

## 1. Data-quality trap (`2026-03-08` duplicate batch)

- Raw CSV rows (excluding header): `90` rows across `14` dates (`2026-03-02` to `2026-03-15`).
- `2026-03-08` appears twice: all `6` arm-by-segment rows for Sunday `2026-03-08` were exported twice (`12` rows for that date instead of `6`).
- Deduplicating `2026-03-08` leaves **`84` clean rows** (`14 days x 2 arms x 3 segments`).
- Assignment split check (SRM): `21,083` `control` versus `21,020` `treatment` (`50.07%` vs `49.93%`, `p = 0.756`, healthy `50/50` split).
- Effect of the duplicate date if missed: because both arms were doubled on a strong weekend day, the uncleaned sheet inflates sample counts and reads `+1.61 pp` (`z = 4.92`) on the primary metric instead of the true **`+1.54 pp` (`z = 4.55`)**.

## 2. Headline results (after deduplicating `2026-03-08`)

- **Exposed sample:** `20,036` `control`, `19,902` `treatment` (clears the pre-registered `18,328` per-arm requirement).
- **Primary metric (weekend completed with zero missed timed bookings or closed-venue arrivals):** `86.08%` (`17,246 / 20,036`) in `control` to `87.61%` (`17,437 / 19,902`) in `treatment`. Absolute lift **`+1.54 pp`** (`+1.8%` relative), `z = 4.55`, `p < 0.0001`. Clears the `+1.0 pp` minimum detectable effect.
- **Leading metric (pre-departure hours, transit or rainy-day check):** `32.40%` (`6,491 / 20,036`) to `42.41%` (`8,441 / 19,902`), **`+10.02 pp`**, `p < 0.0001`.
- **Guardrail overall (routing/replan complaints per 1,000 exposed):** `10.8` (`216 / 20,036`) to `13.3` (`264 / 19,902`) per `1,000` exposed, **`+2.5 / 1,000`** (`+22.9%` relative), `z = 2.27`, `p = 0.0230`. Below the `+4.0 / 1,000` overall stop limit, yet a clear warning to inspect segments.

## 3. Segment breakdown and guardrail breach in `family_accessibility`

| Segment                | Exposed (`control` / `treatment`) | Primary (`control` to `treatment`) | Guardrail per 1,000 (`control` to `treatment`) | Guardrail delta and p-value                  |
| ---------------------- | --------------------------------: | ---------------------------------: | ---------------------------------------------: | -------------------------------------------- |
| `solo_couple`          |                   `9,042` / 8,974 |        `88.00%` to `90.14%` (+2.1) |                               `10.2` to `10.7` | `+0.5 / 1,000`, `z = 0.35`, `p = 0.7299`     |
| `small_group`          |                   `6,019` / 5,924 |        `96.20%` to `96.40%` (+0.2) |                                 `6.3` to `5.9` | `-0.4 / 1,000`, `z = -0.28`, `p = 0.7764`    |
| `family_accessibility` |                   `4,975` / 5,004 |        `70.33%` to `72.68%` (+2.4) |                               `17.5` to `26.8` | **`+9.3 / 1,000`**, `z = 3.15`, `p = 0.0016` |

- **`family_accessibility` breaches the pre-set `+8.0 / 1,000` segment guardrail limit:** complaints jump from `17.5` (`87 / 4,975`) to `26.8` (`134 / 5,004`) per `1,000` exposed (`+9.3 / 1,000`, `+53.1%` relative, `p = 0.0016`, well above the `3,000` exposed-user segment floor).
- Notice that `family_accessibility` **also** gained `+2.35 pp` on the primary metric (`70.33%` to `72.68%`, `p = 0.0093`). Why did it help many families while triggering complaints for others? Ticket logs show rainy-day subway reroutes used static station accessibility flags and missed **live station lift outages** (sending stroller and wheelchair users down routes with broken interchange lifts, the exact failure mode from Session 14 Conversation 10).

## 4. Decision required by `s15-plan.md`

**Iterate (segmented holdback + targeted fix, not a blanket ship).**

- Primary lift (`+1.54 pp`, `p < 0.0001`) and overall guardrail (`+2.5 / 1,000 < +4.0`) pass, and `solo_couple` and `small_group` have flat complaint rates.
- Per the pre-registered **Iterate** rule, disable automatic subway/rail rainy-day reroutes for `family_accessibility` (or hold `family_accessibility` on control), wire live municipal lift-outage feeds plus low-floor bus fallbacks into `get_transit_time`, add a deterministic eval gate for `step_free` lift alerts, and re-run validation on `family_accessibility` before full rollout.
