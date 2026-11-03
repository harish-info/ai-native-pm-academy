# AI-Native PM Academy

A free, hands-on course for working product managers who want to use AI in their real work: give it context, build prototypes with agents, run discovery, write PRDs that people and agents can build from, test an AI feature, launch, and set up a personal and team knowledge base.

**Take the course:** https://harish-info.github.io/ai-native-pm-academy/

It is a static site. There is no account and no backend, and your progress stays in your browser. No coding background is needed. Claude Code is used from Level 2 onward and needs paid access.

## What you do in the course

You apply every session to a product, service or workflow you know. Each session ends with something you made, not a quiz score.

| Level | Focus                          | Sessions | What you keep                                                       |
| ----- | ------------------------------ | -------- | ------------------------------------------------------------------- |
| 1     | AI foundations                 | 1 to 4   | A product context file, a checked research answer, a pitch page     |
| 2     | Build with agents              | 5 to 8   | A Claude Code workspace and a live, reviewed prototype              |
| 3     | Discover and decide            | 9 to 12  | A strategy, interview synthesis, a bets list and a PRD              |
| 4     | Hand off, ship, tell the story | 13 to 16 | A design spec, an eval report, a launch readout and a deck          |
| 5     | Your PM OS and team knowledge  | 17 to 20 | A personal wiki, a team knowledge base, skills and a pilot proposal |

- About 80 hours in total: eight weeks at about 10 hours a week, or twelve weeks at about 7.
- Ten optional challenges, a field guide on models and agents, and three fictional case studies.
- A mentor or peer reviews some tasks. Level 4 and 5 badges need their sign-off if you recorded one.
- All practice data is fictional. The course rehearses product work; it does not ship anything to real customers.

## How to help

The course is a strong first draft. It was written with AI assistance from the linked sources, and **no subject-matter expert has reviewed it yet**. The most useful help, in order:

1. **Take a level and tell us what happened.** Open an issue with the level, how long each session really took, where you got stuck, and anything that felt like filler. Time estimates have never been tested with learners.
2. **Review a topic you know well.** Expert eyes are most needed on evals and AI safety (Session 14), experiments and sample sizes (Session 15), interviews and synthesis (Session 10), and analytics (Session 11). Open an issue quoting the line and saying what is wrong and what a practitioner would do instead.
3. **Report a broken or outdated link.** Tools and docs change fast. Open an issue with the resource and what changed, or fix it in a pull request (see the resource rules below).
4. **Make the writing plainer.** If a sentence sounds like an AI wrote it (vague, hedged, a clever contrast instead of an instruction), suggest a rewrite. See the writing style below.
5. **Fix a bug or an accessibility problem** in the app.

Small fixes can go straight to a pull request. For anything bigger, such as a new session, a new challenge or a change to the course structure, open an issue first so we can agree on where it fits in the story.

**Please do not send:** text copied from courses, books or newsletters (link to them instead), real customer or employer data, learner backups, or API keys.

### Where the content lives

All course text is typed TypeScript data in `src/content/`. You do not need to know React to edit it.

| To change                                           | Edit                                          |
| --------------------------------------------------- | --------------------------------------------- |
| A session's lesson, task, prompt, checklist or quiz | `src/content/levels/level1.ts` to `level5.ts` |
| A session's example, recall and quick check         | `src/content/teaching.ts`                     |
| A link or reading                                   | `src/content/resources.ts`                    |
| The field guide                                     | `src/content/fieldGuide.ts`                   |
| The study plan                                      | `src/content/plan.ts`                         |
| Case studies                                        | `src/content/caseStudies.ts`                  |

### Content rules

`src/content/content.test.ts` enforces most of these, so `npm run check` will tell you when one breaks.

- **Never rename an id.** Sessions are `s1` to `s20` and challenges `c1` to `c10`. Learner progress is stored by id, so renaming one loses people's progress.
- **No em or en dashes.** Use commas, colons or full stops.
- **Every link is https, and every resource has a `verificationStatus` and a `verifiedOn` date.** Only mark a link verified after you have opened it yourself.
- **Prerequisites point backwards**, and the study plan schedules every session exactly once.
- **Link to third-party material; never copy it.**
- **Changing the shape of saved learner data** means bumping `CURRENT_SCHEMA_VERSION` in `src/storage/schema.ts`, adding a migration step in `src/storage/backup.ts`, and a test. Old backups must keep importing.

### Writing style

The course should read like a practitioner talking, not like a model.

- Headings say what the section is about or what to do: "Check two numbers by hand", not "Trust, but verify".
- Give an action, a number or a concrete example. "Read 50 real answers before writing test cases" beats "review a representative sample".
- When you contrast two things, give a real example of each.
- One sentence per warning, saying what goes wrong and what to do instead. No hedging in every line.
- Use British spelling, as the rest of the course does.

## Run it locally

Requires Node 22.12 or newer.

```sh
npm install
npm run dev        # http://localhost:5173/ai-native-pm-academy/
```

| Script             | Does                                       |
| ------------------ | ------------------------------------------ |
| `npm run check`    | Prettier check, ESLint, TypeScript, Vitest |
| `npm run test:e2e` | Playwright on desktop and mobile Chrome    |
| `npm run build`    | Production build into `dist/`              |
| `npm run format`   | Format with Prettier                       |

The first e2e run needs `npx playwright install chromium`.

**Before you open a pull request:** run `npm run format` and `npm run check`. For changes to the app itself, also run `npm run test:e2e`. CI runs all of these on every pull request.

### Project structure

```
src/content/    curriculum: levels, sessions, quizzes, projects, resources, plan, field guide
src/domain/     pure rules: progress, unlocking, mastery, assessment, stats, achievements
src/storage/    IndexedDB repository, zod schema, backup and migration
src/state/      the store (the only writer of learner data), hooks, demo data
src/ui/         layout, primitives, charts, illustrations
src/pages/      one component per route
e2e/            Playwright tests, including an axe accessibility audit of every route
```

Routing uses `HashRouter`, so an in-page anchor such as `href="#id"` would change the route. Move focus in code instead, as the skip link does.

## Data and privacy

- All progress lives in IndexedDB in the learner's browser. There is no backend, account, analytics or tracking.
- Clearing site data or switching browsers loses progress, so the dashboard reminds learners to export a backup (plain JSON from Settings).
- Backups (`*academy-backup*.json`) are gitignored. Never commit one.

## Deploy your own copy

`.github/workflows/deploy.yml` runs every check and the e2e suite on each push and pull request, and deploys `main` to GitHub Pages. In a fork, set **Settings > Pages > Source** to **GitHub Actions**. The base path follows the repository name automatically; set `BASE_PATH` to override it.

## Accessibility

Semantic landmarks, a skip link, labelled controls, full keyboard support, visible focus, a table view for every chart and reduced-motion support. Automated axe checks run on every route. No full screen reader audit has been done yet; reports are welcome.

## License

No license has been chosen yet, so all rights are reserved by default. Linked resources belong to their owners.
