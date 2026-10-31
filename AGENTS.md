# AGENTS.md

A static React and TypeScript course site for PMs, deployed to GitHub Pages. Progress lives only in the learner's browser (IndexedDB). See README.md for the product overview.

## Commands

- `npm run check`: Prettier check, ESLint, TypeScript and Vitest. Run before every commit.
- `npm run test:e2e`: Playwright, desktop and mobile. It builds and serves the app itself.
- `npm run dev`: dev server at `/ai-native-pm-academy/`.

## Layout

- `src/content/`: all curriculum data.
  - Typed in `types.ts`.
  - One file per level in `levels/`.
  - `index.ts` assembles them and adds the wiki thread.
- `src/domain/`: pure functions for progress, unlocking, mastery, assessment, stats and achievements. Keep React out of it.
- `src/storage/`: IndexedDB repository, zod schema, and backup export, import and migration.
- `src/state/`: the store (the only writer of learner data), hooks, demo data.
- `src/ui/`, `src/pages/`: components; one page per route in `App.tsx`.

## Rules

- **Content invariants:** `src/content/content.test.ts` enforces them.
  - Ids are unique and stable (`s1` to `s20`, `c1` to `c10`). Learner progress is keyed by id, so never rename one.
  - Every quiz answer is valid.
  - Every resource ref exists and every link is https.
  - Prerequisites point backwards.
  - The month plan schedules every session once.
  - No em or en dashes.
- **Resources:** new resources need a `verificationStatus` and a `verifiedOn` date. Never mark a link verified without opening it. Link to third-party material; never copy it.
- **Learner data schema:** changing the shape means bumping `CURRENT_SCHEMA_VERSION` in `src/storage/schema.ts`, adding a step to `migrations` in `src/storage/backup.ts`, and a test for it. Old backups must keep importing.
- **Mastery:** mastery is recorded in `masteredLevels` and is sticky. Do not make badges disappear when evidence is edited.
- **Routing:** routing uses `HashRouter`, so in-page anchors (`href="#id"`) would navigate. Move focus in code instead, as the skip link does.
- **Data and secrets:**
  - Never commit learner backups, personal data or API keys.
  - `private/` is gitignored and must stay that way.
- **Style:** Prettier settings in `.prettierrc` (no semicolons, single quotes, width 100). Match the surrounding code.

## Content review

The curriculum text was drafted by an agent from a generated brief and has not been expert-reviewed. Before reviewing or rewriting content, read `private/origin/README.md` if it exists. It records:

- the original brief, verbatim
- what came from where
- deviations from the brief
- what was never verified
- review questions per session

It is local only and not in git.
