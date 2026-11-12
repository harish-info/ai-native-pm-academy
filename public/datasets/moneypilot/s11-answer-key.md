# MoneyPilot analytics answer key for Session 11

Fictional practice data written for the AI-native PM academy. MoneyPilot is not a real product, and all user ids, events and figures in `s11-events.csv` are invented.

Open this file only in the check step, after you have written your metric definitions, run your funnel and segment queries, and hand-checked two numbers in a spreadsheet.

## Dataset overview and data-quality traps

- Cohort window: `2026-02-01T07:26:34Z` to `2026-03-02T19:02:20Z` (30 calendar days, covering the 25 February monthly payday).
- Cohort users: `600` unique users (`U0001` to `U0600`). Every user in the file has at least one `app_opened` event. User properties (`pay_frequency`, `balance_band`, `device`, `bill_count`) are cohort-level attributes joined onto each event row.
- Raw rows (excluding the CSV header): `2,773`.
- Duplicate telemetry rows: `42` exact retry rows on `event_name = "forecast_viewed"` and `device = "android"`, where `user_id`, `timestamp` and `event_name` match an earlier row and only `event_id` differs.
- Deduplicated event rows (unique on `user_id`, `timestamp`, `event_name`): `2,731`.

### Trap 1: Event counts versus unique users (plus Android retries)

`app_opened`, `forecast_viewed`, `bill_detail_opened` and `returned_before_next_payday` can fire multiple times per user across the 30 days. Counting event rows instead of `COUNT(DISTINCT user_id)` produces impossible or inflated rates:

| Event name                    | Raw rows | Deduplicated rows | Unique users | % of cohort (600) | Wrong rate if raw rows / 600 |
| ----------------------------- | -------: | ----------------: | -----------: | ----------------: | ---------------------------: |
| `app_opened`                  |    1,035 |             1,035 |          600 |            100.0% |                       172.5% |
| `bills_connected`             |      420 |               420 |          420 |             70.0% |                        70.0% |
| `forecast_viewed`             |      696 |               654 |          294 |             49.0% |                       116.0% |
| `bill_detail_opened`          |      388 |               388 |          198 |             33.0% |                        64.7% |
| `returned_before_next_payday` |      234 |               234 |          168 |             28.0% |                        39.0% |

Two common wrong calculations on `forecast_viewed`:

- Dividing raw `forecast_viewed` rows by raw `app_opened` rows gives `696 / 1,035 = 67.2%` instead of `49.0%`.
- Comparing raw `forecast_viewed` rows by device makes Android look more active (`345` raw rows on `270` Android users, `127.8%`, versus `351` raw rows on `330` iOS users, `106.4%`). After deduplicating the `42` Android retry rows (`303` deduplicated Android rows) and counting unique users, iOS (`158 / 330 = 47.9%`) and Android (`136 / 270 = 50.4%`) are close, and pre-payday return is `88 / 330 = 26.7%` on iOS versus `80 / 270 = 29.6%` on Android.

### Trap 2: Step-to-step denominator versus cohort denominator

| Core funnel step                 | Unique users | % of all 600 cohort users | % of previous step |
| -------------------------------- | -----------: | ------------------------: | -----------------: |
| 1. `app_opened`                  |          600 |                    100.0% |             100.0% |
| 2. `bills_connected`             |          420 |                     70.0% |              70.0% |
| 3. `forecast_viewed`             |          294 |                     49.0% |              70.0% |
| 4. `returned_before_next_payday` |          168 |                     28.0% |              57.1% |

- `294 / 420 = 70.0%` of connected users view a forecast, which is easy to misreport as "70% of users view the forecast". Out of all `600` cohort users, the rate is `294 / 600 = 49.0%`.
- `168 / 294 = 57.1%` of forecast viewers return before their next payday (`168 / 420 = 40.0%` of connected users), while cohort retention before next payday is `168 / 600 = 28.0%`.
- Note on `bill_detail_opened` (`198` unique users, `33.0%` of cohort, `67.3%` of `forecast_viewed`): opening an individual bill row is an optional drill-down, not a required gate. Of the `168` users who returned before their next payday, `128` opened a bill detail and `40` checked the headline forecast and returned without opening one. Forcing a strict five-step sequential funnel through `bill_detail_opened` undercounts returning users as `128` (`21.3%`) instead of `168` (`28.0%`).

## Segment findings and the empty-forecast bottleneck

### 1. By pay frequency (`monthly` versus `weekly`)

| Pay frequency | Cohort users |     `bills_connected` |                         `forecast_viewed` |                              `returned_before_next_payday` |
| ------------- | -----------: | --------------------: | ----------------------------------------: | ---------------------------------------------------------: |
| `monthly`     |          450 | 330 (73.3% of cohort) | 240 (53.3% of cohort, 72.7% of connected) | 152 (33.8% of cohort, 46.1% of connected, 63.3% of viewed) |
| `weekly`      |          150 |  90 (60.0% of cohort) |  54 (36.0% of cohort, 60.0% of connected) |  16 (10.7% of cohort, 17.8% of connected, 29.6% of viewed) |

MoneyPilot's pre-payday forecast is built around a monthly bill cycle, so `monthly` users retain at more than three times the cohort rate of `weekly` users (`33.8%` versus `10.7%`).

### 2. By opening balance band

| Balance band   | Cohort users |     `bills_connected` |                         `forecast_viewed` |                             `returned_before_next_payday` |
| -------------- | -----------: | --------------------: | ----------------------------------------: | --------------------------------------------------------: |
| `low_balance`  |          240 | 183 (76.3% of cohort) | 135 (56.3% of cohort, 73.8% of connected) | 91 (37.9% of cohort, 49.7% of connected, 67.4% of viewed) |
| `mid_balance`  |          240 | 168 (70.0% of cohort) | 119 (49.6% of cohort, 70.8% of connected) | 64 (26.7% of cohort, 38.1% of connected, 53.8% of viewed) |
| `high_balance` |          120 |  69 (57.5% of cohort) |  40 (33.3% of cohort, 58.0% of connected) | 13 (10.8% of cohort, 18.8% of connected, 32.5% of viewed) |

`high_balance` users connect less often and rarely return before payday (`10.8%` of cohort), matching the Session 10 pattern (`P3`) where a large cash buffer removes the pre-payday problem.

### 3. The planted product bottleneck: `bill_count = 0` after `bills_connected`

Among the `180` users who never completed `bills_connected`, `bill_count` is naturally `0`. More importantly, among the `420` users who **did** complete `bills_connected`, `96` (`22.9%`) still got `bill_count = 0` because recurring bill auto-detection missed card-billed subscriptions, manual rent transfers or accounts with short feed history:

| Connected users by `bill_count` | Connected (`420`) | `forecast_viewed` (`294`) | Dropped before `forecast_viewed` (`126`) | `returned_before_next_payday` (`168`) |
| ------------------------------- | ----------------: | ------------------------: | ---------------------------------------: | ------------------------------------: |
| `bill_count = 0`                |                96 |                15 (15.6%) |                                       81 |                 3 (3.1% of connected) |
| `bill_count` 1 to 2             |                72 |                55 (76.4%) |                                       17 |               25 (34.7% of connected) |
| `bill_count >= 3`               |               252 |               224 (88.9%) |                                       28 |              140 (55.6% of connected) |

- **64.3% (`81 / 126`) of the entire drop between `bills_connected` and `forecast_viewed`** comes from connected users with `bill_count = 0`.
- Inside the core `monthly` connected segment (`330` users, `90` post-connection drops):
  - `bill_count = 0`: `75` connected, `12` viewed (`16.0%`), `63` dropped (`70.0%` of all monthly post-connection drops), and only `3` returned (`4.0%` of connected).
  - `bill_count` 1 to 2: `55` connected, `44` viewed (`80.0%`), `22` returned (`40.0%` of connected).
  - `bill_count >= 3`: `200` connected, `184` viewed (`92.0%`), `127` returned (`63.5%` of connected, `69.0%` of viewed).
- **Strongest retaining slice:** `monthly` + `low_balance` + `bill_count >= 3` has `90` connected users, `86` forecast viewers (`95.6%`) and `69` returning users (`76.7%` of connected, `80.2%` of viewers), compared with `10 / 30` (`33.3%` of connected) for `monthly` + `high_balance` + `bill_count >= 3` and `2 / 34` (`5.9%` of connected) for `monthly` + `low_balance` + `bill_count = 0`.

## Sanity-checked impact range (fixing `bill_count = 0` for monthly users)

Target group: the `75` connected `monthly` users per `600`-user cohort (`12.5%` of all new users, or `1,250` per `10,000` new users) whose recurring bills failed to auto-detect and who currently return at `4.0%` (`3 / 75`). Adding card-subscription detection plus a "pick your recurring bills from recent transactions" fallback when `bill_count = 0` could recover part of this group:

- **Low case:** `30%` of the `75` users (`22.5` per `600` cohort; `375` per `10,000` new users) add 1 to 2 bills and retain at the `1 to 2` bill monthly rate of `40.0%` (`+36.0` pp over `4.0%`). Gain: `+8.1` returning users per `600` cohort (`+135` per `10,000` new users), moving cohort return from `28.0%` (`168 / 600`) to `29.4%` (`176.1 / 600`, exact `29.35%`).
- **Base case:** `50%` of the `75` users (`37.5` per `600` cohort; `625` per `10,000` new users) add bills and retain at `44.0%` (`+40.0` pp over `4.0%`). Gain: `+15.0` returning users per `600` cohort (`+250` per `10,000` new users), moving cohort return from `28.0%` to `30.5%` (`183.0 / 600`).
- **High case:** `70%` of the `75` users (`52.5` per `600` cohort; `875` per `10,000` new users) add bills and retain at `54.0%` (`+50.0` pp over `4.0%`, discounted below the `63.5%` `3+` bill rate because households with fewer `AvtaleGiro` / `eFaktura` agreements have lower natural bill density). Gain: `+26.3` returning users per `600` cohort (`26.25` exact; `+438` per `10,000` new users, `437.5` exact), moving cohort return from `28.0%` to `32.4%` (`194.25 / 600`, exact `32.375%`).

Why not assume `100%` recovery at `63.5%`? Selection bias: some `bill_count = 0` users connected a secondary spending account that genuinely carries no automatic bills, so assuming all `75` behave like `3+` `AvtaleGiro` households overstates the ceiling.
