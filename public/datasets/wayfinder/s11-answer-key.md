# Wayfinder analytics answer key for Session 11

Fictional practice data written for the AI-native PM academy. Wayfinder is not a real product, and all user ids, events and figures in `s11-events.csv` are invented.

Open this file only in the check step, after you have written your metric definitions, run your funnel and segment queries, and hand-checked two numbers in a spreadsheet.

## Dataset overview and data-quality traps

- Cohort window: `2026-02-01T07:02:30Z` to `2026-03-01T04:35:03Z` (February 2026 new-user cohort across four weekend planning cycles).
- Cohort users: `600` unique users (`U0001` to `U0600`). Every user in the file has at least one `app_opened` event. User properties (`trip_type`, `budget_band`, `device`, `imported_places_count`) are cohort-level attributes (`imported_places_count` ranges from `0` to `6`) joined onto each event row.
- Raw rows (excluding the CSV header): `2,773`.
- Duplicate telemetry rows: `42` exact retry rows on `event_name = "itinerary_viewed"` and `device = "android"`, where `user_id`, `timestamp` and `event_name` match an earlier row and only `event_id` differs.
- Deduplicated event rows (unique on `user_id`, `timestamp`, `event_name`): `2,731`.

### Trap 1: Event counts versus unique users (plus Android retries)

`app_opened`, `itinerary_viewed`, `stop_detail_opened` and `shared_or_saved_weekend` can fire multiple times per user across the month. Counting event rows instead of `COUNT(DISTINCT user_id)` produces impossible or inflated rates:

| Event name                | Raw rows | Deduplicated rows | Unique users | % of cohort (600) | Wrong rate if raw rows / 600 |
| ------------------------- | -------: | ----------------: | -----------: | ----------------: | ---------------------------: |
| `app_opened`              |    1,035 |             1,035 |          600 |            100.0% |                       172.5% |
| `trip_created`            |      420 |               420 |          420 |             70.0% |                        70.0% |
| `itinerary_viewed`        |      696 |               654 |          360 |             60.0% |                       116.0% |
| `stop_detail_opened`      |      388 |               388 |          234 |             39.0% |                        64.7% |
| `shared_or_saved_weekend` |      234 |               234 |          168 |             28.0% |                        39.0% |

Two common wrong calculations on `itinerary_viewed`:

- Dividing raw `itinerary_viewed` rows by raw `app_opened` rows gives `696 / 1,035 = 67.2%` instead of `60.0%`.
- Comparing raw `itinerary_viewed` rows by device makes Android look substantially heavier (`342` raw rows on `270` Android users, `126.7%`, versus `354` raw rows on `330` iOS users, `107.3%`). After deduplicating the `42` Android retry rows (`300` deduplicated Android rows) and counting unique users, iOS (`193 / 330 = 58.5%`) and Android (`167 / 270 = 61.9%`) are close, and weekend save/share conversion is virtually identical (`92 / 330 = 27.9%` on iOS versus `76 / 270 = 28.1%` on Android).

### Trap 2: Step-to-step denominator versus cohort denominator (and the `stop_detail_opened` trap)

| Core funnel step             | Unique users | % of all 600 cohort users | % of `trip_created` (420) | % of previous step |
| ---------------------------- | -----------: | ------------------------: | ------------------------: | -----------------: |
| 1. `app_opened`              |          600 |                    100.0% |                       n/a |             100.0% |
| 2. `trip_created`            |          420 |                     70.0% |                    100.0% |              70.0% |
| 3. `itinerary_viewed`        |          360 |                     60.0% |                     85.7% |              85.7% |
| 4. `shared_or_saved_weekend` |          168 |                     28.0% |                     40.0% |              46.7% |

- `360 / 420 = 85.7%` of trip creators view an itinerary, which is easy to misreport as "85.7% of users view an itinerary". Out of all `600` cohort users, the rate is `360 / 600 = 60.0%`.
- `168 / 420 = 40.0%` of trip creators (`168 / 360 = 46.7%` of itinerary viewers) save or share a weekend plan, while full-cohort conversion is `168 / 600 = 28.0%`.
- **Wrong-denominator and optional-step trap on `stop_detail_opened` (`234` unique users):**
  - Dividing `234` by `360` (`itinerary_viewed`) gives `65.0%`, whereas out of the `600` cohort it is `39.0%` (`234 / 600`, or `55.7%` of `420` `trip_created`). Reporting `"65% of users open stop details"` confuses viewers with the full cohort.
  - Opening a stop detail sheet is an optional drill-down, not a required funnel gate: of the `168` users who completed `shared_or_saved_weekend`, `123` opened a stop detail and `45` shared or saved straight from the day-plan overview. Forcing a strict five-step sequential funnel through `stop_detail_opened` undercounts completed weekend plans as `123` (`20.5%`) instead of `168` (`28.0%`).

## Segment findings and the blank-import group bottleneck

### 1. By trip type (`group` versus `solo`)

| Trip type | Cohort users |        `trip_created` |                        `itinerary_viewed` |                        `shared_or_saved_weekend` |
| --------- | -----------: | --------------------: | ----------------------------------------: | -----------------------------------------------: |
| `group`   |          420 | 300 (71.4% of cohort) | 254 (60.5% of cohort, 84.7% of `created`) | 140 (33.3% of cohort, 46.7% of `created`, 55.1%) |
| `solo`    |          180 | 120 (66.7% of cohort) | 106 (58.9% of cohort, 88.3% of `created`) |  28 (15.6% of cohort, 23.3% of `created`, 26.4%) |

Wayfinder's budget-split and clash-check value is strongest for `group` planners (`33.3%` cohort conversion versus `15.6%` for `solo`), yet `group` also hides a sharp onboarding cliff when no places get imported.

### 2. By weekend budget band

| Budget band    | Cohort users |        `trip_created` |                        `itinerary_viewed` |                       `shared_or_saved_weekend` |
| -------------- | -----------: | --------------------: | ----------------------------------------: | ----------------------------------------------: |
| `tight_budget` |          240 | 182 (75.8% of cohort) | 159 (66.3% of cohort, 87.4% of `created`) | 86 (35.8% of cohort, 47.3% of `created`, 54.1%) |
| `mid_budget`   |          240 | 170 (70.8% of cohort) | 147 (61.3% of cohort, 86.5% of `created`) | 69 (28.8% of cohort, 40.6% of `created`, 46.9%) |
| `flex_budget`  |          120 |  68 (56.7% of cohort) |  54 (45.0% of cohort, 79.4% of `created`) | 13 (10.8% of cohort, 19.1% of `created`, 24.1%) |

`flex_budget` users create fewer trips and rarely save or share a plan (`10.8%` of cohort), matching the Session 10 pattern (`P3`) where high-budget concierge travellers have little need for self-guided transit and budget-cap coordination.

### 3. The planted product bottleneck: `group` planners with `imported_places_count = 0`

Among the `180` users who never reached `trip_created`, `imported_places_count` is `0`. Among the `420` users who **did** complete `trip_created`, `90` (`21.4%`) ended up with `imported_places_count = 0` (`75` `group` planners and `15` `solo` planners) because manual venue search expects typed names while group ideas live inside chat screenshots and social links (`P4` in Session 10):

| `trip_created` users by `imported_places_count` | All `trip_created` (`420`) | `itinerary_viewed` (`360`) | Dropped before `itinerary_viewed` (`60`) | `shared_or_saved_weekend` (`168`) |
| ----------------------------------------------- | -------------------------: | -------------------------: | ---------------------------------------: | --------------------------------: |
| `imported_places_count = 0`                     |                         90 |                 44 (48.9%) |                                       46 |             3 (3.3% of `created`) |
| `imported_places_count` 1 to 2                  |                         70 |                 64 (91.4%) |                                        6 |           20 (28.6% of `created`) |
| `imported_places_count` 3 to 6                  |                        260 |                252 (96.9%) |                                        8 |          145 (55.8% of `created`) |

Inside the core `group` segment (`300` of the `420` `trip_created` users; `46` post-creation drops before `itinerary_viewed`):

| `group` `trip_created` by `imported_places_count` | `group` `trip_created` (`300`) | `itinerary_viewed` (`254`) | Dropped before `itinerary_viewed` (`46`) | `shared_or_saved_weekend` (`140`) |
| ------------------------------------------------- | -----------------------------: | -------------------------: | ---------------------------------------: | --------------------------------: |
| `imported_places_count = 0`                       |                             75 |                 37 (49.3%) |                                       38 |             3 (4.0% of `created`) |
| `imported_places_count` 1 to 2                    |                             25 |                 22 (88.0%) |                                        3 |           10 (40.0% of `created`) |
| `imported_places_count` 3 to 6                    |                            200 |                195 (97.5%) |                                        5 |          127 (63.5% of `created`) |

- **76.7% (`46 / 60`) of all drops between `trip_created` and `itinerary_viewed`** (`82.6%`, `38 / 46`, inside `group`) come from users with `imported_places_count = 0`.
- **`group` planners with `imported_places_count = 0` (`75` users) save or share at only `4.0%` (`3 / 75`)**, compared with `40.0%` (`10 / 25`) when `1 to 2` stops are imported and `63.5%` (`127 / 200`) when `3 to 6` stops are imported.
- **Strongest retaining slice:** `group` + `tight_budget` + `imported_places_count >= 3` has `88` `trip_created` users, `87` itinerary viewers (`98.9%`) and `63` shared/saved weekend plans (`71.6%` of `created`), versus `2 / 32` (`6.3%`) for `group` + `tight_budget` + `imported_places_count = 0`.

## Sanity-checked impact range (screenshot and chat-paste import for `group` planners)

Target group: the `75` `group` `trip_created` users per `600`-user cohort (`12.5%` of all new users, or `1,250` per `10,000` new users) who stall at `imported_places_count = 0` and currently convert at `4.0%` (`3 / 75`). Adding a paste-from-chat / screenshot-list importer plus a starter neighborhood template when `imported_places_count = 0` could recover part of this group:

- **Low case:** `30%` of the `75` users (`22.5` per `600` cohort; `375` per `10,000` new users) import `1 to 2` stops and convert at the `1 to 2` stop `group` rate of `40.0%` (`+36.0` pp over `4.0%`). Gain: `+8.1` saved/shared weekends per `600` cohort (`+135` per `10,000` new users), moving cohort conversion from `28.0%` (`168 / 600`) to `29.4%` (`176.1 / 600`, exact `29.35%`).
- **Base case:** `50%` of the `75` users (`37.5` per `600` cohort; `625` per `10,000` new users) import stops and convert at `44.0%` (`+40.0` pp over `4.0%`). Gain: `+15.0` saved/shared weekends per `600` cohort (`+250` per `10,000` new users), moving cohort conversion from `28.0%` to `30.5%` (`183.0 / 600`).
- **High case:** `70%` of the `75` users (`52.5` per `600` cohort; `875` per `10,000` new users) import stops and convert at `54.0%` (`+50.0` pp over `4.0%`, discounted below the `63.5%` `3+` stop rate because early speculative trips have lower group commitment than organisers who already collected three or more stops). Gain: `+26.3` saved/shared weekends per `600` cohort (`26.25` exact; `+438` per `10,000` new users, `437.5` exact), moving cohort conversion from `28.0%` to `32.4%` (`194.25 / 600`, exact `32.375%`).

Why not assume `100%` recovery at `63.5%`? Selection bias: some `imported_places_count = 0` rows come from casual browsers creating a placeholder trip months ahead with no real weekend dates yet, so assuming every blank-trip creator behaves like a committed `3+` stop group organiser overstates the ceiling.
