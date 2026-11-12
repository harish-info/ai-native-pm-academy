# Monday product sync note: Monday-closure badges and group-poll completion (test input 1: normal)

Fictional practice data written for the AI-native PM academy. Wayfinder is not a real product, and all roles, metrics, venues and references below are invented.

## Meeting header

- Date: `2026-03-23` (Monday sync, 25 minutes)
- Attendees (roles only): Product Manager, Product Designer, Backend Engineer, Trust and Safety Lead
- Related sources: `sources/docs/s10-interview-synthesis.md`, `sources/generated/wayfinder-prd.md`

## Context and weekly metrics

- Following the Session 10 discovery probe (`sources/docs/s10-interview-synthesis.md`), where `P2` walked to a padlocked Monday museum in Lisbon and `P5` tapped `Tile Museum $22.00` three times checking whether Monday and bank-holiday hours were verified, we shipped deterministic hours-provenance pills to internal beta on `2026-03-18`.
- Group-poll completion (`POLL-*` drafts shared from `Ask Wayfinder` after an explicit `Send poll` tap) reached `74%` (`148 / 200` shared polls receiving all 4 group votes within 6 hours) across beta weekend trips.

## Decision

We agreed to make two deterministic badge rules permanent on `Day Plan & Budget Split` (`sources/generated/wayfinder-prd.md`):

1. **Monday and public-holiday closure badge:** Whenever `check_venue_hours` returns `open: false` on a Monday or public holiday, or `last_entry` is earlier than standard weekday hours, the stop card displays a high-contrast text pill (`Closed Mondays` or `Holiday last entry HH:MM`) plus `Verified DD MMM`.
2. **Staged poll and hold boundary unchanged:** Completing a group poll highlights the winning stop on the itinerary with a `Stage hold` option; it never calls `prepare_reservation_hold` or confirms a `$20.00` restaurant hold without a separate `Confirm hold` tap from the organiser.

## Open question

- Should `check_venue_hours` mark seasonal ferry timetables stale after `30` days instead of `60` days ahead of the April holiday weekend?
- Owner and due date: Backend Engineer to audit partner feed refresh intervals and report back by `2026-03-27`.
