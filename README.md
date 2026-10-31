# AI-Native PM Academy

A self-paced course for product managers who want to work AI-natively: from AI fluency to directing coding agents and shipping a personal finance agent prototype. It is a static site, and progress stays in the learner's browser.

The course assumes a working PM with no coding background, studying alongside a mentor. The running case study is **MoneyPilot**, an experimental personal financial assistant that is researched in Level 3, built in Level 4 and turned into an agent in Level 5. A personal wiki is built alongside, one page per session.

## Curriculum

| Level | Title                                     | Sessions | Lesson time | Project                           |
| ----- | ----------------------------------------- | -------- | ----------- | --------------------------------- |
| 1     | AI Fluency                                | 1 to 4   | 5 h 15 min  | Personal Learning Assistant       |
| 2     | Second Brain and Context Engineering      | 5 to 8   | 6 h 20 min  | Personal Second Brain             |
| 3     | AI-Native Product Discovery and Design    | 9 to 12  | 9 h 15 min  | MoneyPilot Product Discovery      |
| 4     | Agentic Product Engineering               | 13 to 16 | 9 h 15 min  | Working MoneyPilot Web App        |
| 5     | Advanced AI Agents and Product Leadership | 17 to 20 | 10 h 30 min | MoneyPilot Personal Finance Agent |

- **Core path:** 20 sessions (about 40 h), plus 5 projects (about 26 h) and 5 quizzes. Total about 68 h, which is more than one month part-time. The month plan in the app spreads it out, and the onboarding diagnostic lets an experienced learner test out of early levels.
- **Optional:** 10 challenges (about 26 h).
- **Resources:** 89 free or freemium links, each with a verification status and date. The app links to resources but never copies them.

## What the app does

- Onboarding diagnostic: recommends a start level, effort and weekly pace, and shows confidence gaps.
- Level map with unlocking:
  - Mastering a level needs its required sessions, a quiz score of at least 80% and a project that passes a 4-dimension rubric.
  - Badges are kept once earned.
- Session pages: explanation, resources, task, a copyable agent prompt, expected output, verification, artifact, a wiki step and mentor notes.
- A session completes only with evidence: checklist, reflection, an artifact reference and logged time.
- Dashboard, progress charts (each with a table view), streaks, timeline and achievements.
- Workspace for notes and reflections, a month plan, a MoneyPilot hub and a wiki guide.
- Settings:
  - versioned JSON export and import, with validation and a pre-import snapshot
  - theme
  - demo mode with sample progress, kept in a separate database

## Run locally

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

## Deploy to GitHub Pages

`.github/workflows/deploy.yml` runs every check and the e2e suite on each push and pull request. Pushes to `main` then build and deploy to Pages.

1. Create a GitHub repository named `ai-native-pm-academy` and push `main`.
2. In the repository settings, under **Pages**, set **Source** to **GitHub Actions**.
3. The site is served at `https://<user>.github.io/ai-native-pm-academy/`.

The base path comes from the Pages configuration at build time. Locally it defaults to `/ai-native-pm-academy/`, and `BASE_PATH` overrides it. Routing uses the URL hash, so refreshing a nested page works on Pages without a 404 fallback.

## Data and privacy

- **Local only:** all progress lives in IndexedDB in the learner's browser. There is no backend, account, analytics or tracking.
- **Backups:** clearing site data or switching browsers loses progress, so the dashboard reminds the learner to export a backup. Backups are plain JSON.
  - `*academy-backup*.json` is gitignored.
  - Do not commit learner data.
- **Sensitive data:** sessions repeatedly tell the learner not to paste employer, customer or banking data into AI tools. MoneyPilot uses fictional data only, in every level.

## Project structure

```
src/content/    curriculum: levels, sessions, quizzes, projects, resources, plan, wiki thread
src/domain/     pure rules: progress, unlocking, mastery, assessment, stats, achievements
src/storage/    IndexedDB repository, zod schema, backup and migration
src/state/      React store, hooks, demo data
src/ui/         layout, primitives, charts, evidence panel
src/pages/      one component per route
e2e/            Playwright tests
```

## Content status

The structure follows the original brief. Lesson text, quizzes and projects were drafted with AI assistance from the linked sources. A later review pass checked the main tool, banking and regulatory claims against the sources it links, but not every sentence has been checked, and **no subject-matter expert has reviewed them yet**. Treat them as a strong first draft.

- **Most in need of review:** Level 5 material on regulated financial advice, consent and safety.
- **Estimates:** time estimates and quiz difficulty have not been tested with learners.
- **Link checks:** resource statuses reflect checks made on 2026-10-31. Links rot, so recheck before each cohort.

## Accessibility

Built with semantic landmarks, a skip link, labelled form controls, keyboard support (including the quiz and tabs), visible focus, dialogs that move focus in and restore it on close, a table view for every chart and respect for reduced motion. Automated checks cover keyboard paths. No full screen reader audit has been done.

## License

No license has been chosen yet, so all rights are reserved by default. Linked resources belong to their owners.
