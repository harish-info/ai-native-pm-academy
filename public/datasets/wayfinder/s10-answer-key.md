# Wayfinder interview synthesis answer key for Session 10

Fictional practice data written for the AI-native PM academy. Wayfinder is not a real product, and all participants, venues, transit routes and figures in `s10-interviews/` are invented.

Open only in step 3 after writing your own synthesis by hand and comparing it with your agent's synthesis. Your wording and Opportunity Solution Tree grouping may differ slightly; use this reference to check whether you separated real behavioural evidence from polite noise and caught both discovery-probe comprehension findings.

## 1. Real behavioural evidence versus polite noise, contradictions and tangents

A surface summary treats every compliment, opening generalisation and off-the-cuff wish as equal signal. Across `P1` to `P5`, three traps separate rigorous PM synthesis from naive summarisation:

| Participant | What sounds convincing at first glance                                                                                                                               | What past behaviour actually shows                                                                                                                                                                                                                        | How to treat it                                                                                                                                                 |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `P3`        | "The layout and typography look super clean... I would totally download this for our October weekend in Rome!" plus a pitch for Michelin table-cancellation sniping. | Spends `$1,200` a day at five-star hotels whose concierge books private cars and indoor backups over WhatsApp; has zero budget cap, zero transit buffers and zero planning workaround.                                                                    | **Exclude from core problem evidence.** Polite aesthetic praise from an out-of-segment luxury traveller who does not experience self-guided city-trip friction. |
| `P2`        | Opening claim: "We never plan weekends, we just wing it. Over-planning ruins the magic of a city break."                                                             | Last month in Lisbon, walked 35 minutes uphill in heavy rain to a closed Monday tile museum, spent `55 minutes` arguing under an awning, wasted `$26.00` on surge rideshares, and now manually copies Monday closures and rainy backups into Apple Notes. | **Trust the specific Lisbon story and current workaround, not the opening generalisation.**                                                                     |
| `P1`        | Four-minute pitch for 3am budget-airline fare scraping, `14,000`-mile redemption alerts and credit-card lounge tracking.                                             | Already uses dedicated flight-alert sites; actual Porto trip pain was losing `$68.00` on missed cellar-tour tickets after underestimating a `45-minute` river crossing and overspending their `$200.00` cap by `$62.00`.                                  | **Park flight-scraping as an out-of-scope distraction.** Keep synthesis anchored to on-the-ground weekend timing and budget clarity.                            |

## 2. Core opportunities supported by 3 or more target-segment participants

All four target-segment planners (`P1`, `P2`, `P4`, `P5`) struggle to keep weekend timing, venue hours, group constraints and per-person spend aligned once on the ground:

1. **"I cannot tell whether back-to-back stops leave enough door-to-door transit time until we are already running late."** (`4/4` in-segment, `4/5` overall: `P1`, `P2`, `P4`, `P5`)
   - `P1` booked `14:00` and `15:30` tickets across the river in Porto without accounting for `45 minutes` of bridge walking and tram queues, forfeiting `$68.00` in non-refundable tickets.
   - `P2` burned `55 minutes` and `$26.00` crisscrossing Lisbon in heavy rain when an unplanned midday scramble hit sold-out slots.
   - `P4`'s 4-friend group in Amsterdam nearly missed a `13:00` museum slot because nobody checked the `38-minute` Noord ferry-plus-metro transfer buried behind chat screenshots.
   - `P5` lost `28 minutes` to an out-of-service metro lift in Brussels because generic `14-minute` map estimates assume stairs rather than step-free stroller routing.

2. **"Unverified Monday or bank-holiday closures and sudden rain force stressful street-corner replanning that drops group constraints."** (`3/5` direct past incidents `P2`, `P4`, `P5`, plus `P2`/`P4`/`P5` during probe review)
   - `P2` walked to a padlocked museum (`Closed Mondays`) based on a stale blog post and had no indoor alternative ready.
   - `P5` arrived at `15:20` on a bank-holiday Monday to find last entry had closed at `15:00`, triggering a `$28.00` taxi and abandoned afternoon.
   - `P4` lost `$38.00` when a friend's `tree-nut allergy` got buried 34 messages up in WhatsApp before booking an almond-paste pastry workshop, and warned that rainy-day swaps must never drop group dietary or access rules (links directly to the `imported_places_count = 0` chat-screenshot bottleneck in Session 11).

3. **"Pre-booked ticket totals look deceptively low when meals and local transit are left invisible, causing weekend budget surprises and group friction."** (`3/5` past incidents + probe misreads: `P1`, `P4`, reinforced by `P2` and `P5`)
   - `P1` saw `$92.00` of pre-booked tickets against a `$200.00` cap in Porto and overspent to `$262.00` (`+$62.00`) once dinners, coffees and airport rail hit.
   - `P4`'s Amsterdam group split over whether `$190.00` meant activities-only or all-in, landing at `$275.00` per person.
   - `P2` and `P5` both noted two casual dinners and local transit consume most of an apparent `$85.50` gap.

### Single-person tangents and out-of-scope wishes (do not promote to v1 scope)

- Airline miles redemption calculator and 3am flight price-drop scraper (`P1`, out-of-scope distraction).
- End-of-trip automated 30-second photo-reel generator (`P2`, 1 participant tangent).
- Two-Michelin-star table cancellation sniper and airport champagne-lounge tracker (`P3`, out-of-segment luxury wish).
- Automated "late friend alarm" before group brunch (`P4`, joke/tangent).
- Standardised European intercity rail stroller-icon lobbying (`P5`, external rail-operator tangent).

## 3. Level 2 static probe comprehension findings

Testing the static HTML `Day Plan & Budget Split` discovery probe (`$180.00` per-person cap, 3 booked stops totalling `$94.50`, `$85.50` headline with muted grey caption `Left after booked stops (meals and local transit not included)`, and the `16:00 ferry transfer clash` banner; **no** booking or reservation-hold CTA appears on the Level 2 static probe) surfaced **two high-priority design fixes**:

1. **Probe finding 1: `$85.50` is misread as "all-in remaining budget" when the exclusions label sits in small muted grey text (`P1` and `P4` misread it outright; `P2` and `P5` flagged the low-contrast caption).**
   - `P1` assumed Saturday dinner and airport metro passes were already inside `$94.50` until adding `$18.50 + $22.00 + $54.00 = $94.50` aloud.
   - `P4` warned that screenshotting a big `$85.50` number into a group chat would recreate their Amsterdam budget argument unless the main label itself states what is excluded.
   - **Design implication:** Never label the figure `"Remaining"` or `"All-in remaining"`. Make `Left after booked stops (meals and local transit not included)` the primary high-contrast label directly attached to `$85.50`.

2. **Probe finding 2: Users want visible provenance on verified Monday/holiday hours and transit routing assumptions (`P5` tapped `Tile Museum $22.00` three times; `P2`, `P4` and `P5` questioned hours and routing).**
   - While all five participants immediately understood the `16:00 ferry transfer clash` (`42 min` tram buffer), `P5` tapped the venue row three times looking for _when_ opening hours were verified, whether **Monday / bank-holiday** closures were checked, and whether `42 min` assumed stairs or **step-free** lift access.
   - `P2` asked whether Monday closures are explicitly flagged before moving a stop, and `P4` asked where persistent group constraints (`tree-nut allergy`, `step-free`) sit on the day card.
   - **Design implication:** Show an explicit hours status badge (`Hours verified for Sat, closed Mon` with `as_of` date), display active group tags (`tree-nut allergy`, `step-free`) at the top of the day plan, and label transit buffers clearly (`42 min door-to-door tram` versus `step-free route`).
