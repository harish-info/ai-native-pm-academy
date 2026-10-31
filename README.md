# AI-Native PM Academy

A practical course for working product managers, from AI foundations to directing agents, evaluating AI features and leading a team pilot. It is a static site, and progress stays in the learner's browser.

Apply the methods to a product, service or workflow you understand. Lessons address your PM role and use neutral names such as `workspace/` and `team-kb/`. The optional case-study area contains three fictional domain examples; viewing one never changes the curriculum. No coding background is required. Claude Code is used from Level 2 onward and needs suitable paid access. A mentor or peer can help with reviews; where onboarding records a mentor, Level 4 and 5 project badges require their assessment.

## Curriculum

| Level | Focus                              | Sessions | Evidence you keep                                     |
| ----- | ---------------------------------- | -------- | ----------------------------------------------------- |
| 1     | AI foundations                     | 1 to 4   | Sourced context and a pitch pack                      |
| 2     | Build with agents                  | 5 to 8   | A reviewed, live static prototype                     |
| 3     | Discover and decide                | 9 to 12  | A decision pack and scoped PRD                        |
| 4     | Hand off, evaluate and communicate | 13 to 16 | State spec, stand-in eval, simulated readout and deck |
| 5     | PM workspace and team practice     | 17 to 20 | Knowledge base, checked skills and a pilot proposal   |

- Each session has a worked example, a decision with feedback, recall of an earlier concept and a transfer task without AI. Examples are original invented teaching scenarios.
- One assigned external excerpt per session, budgeted at 8 to 15 minutes. Longer courses and further reading are optional.
- The plan budgets about 82 hours including projects, assessments, three research conversations, reviews and mentor time. Choose eight weeks at about 10 hours a week or twelve at about 7. Setup, extra interviews and optional challenges can add time. Estimates have not been learner-tested.
- Ten optional stretch challenges extend the core course.
- Resource records distinguish link verification, cost and full-resource duration from the assigned excerpt.
- The course rehearses product work. A static prototype, chat stand-in and simulated experiment do not establish production AI safety or real customer impact.

## What the app does

- Onboarding diagnostic: recommends a start level, effort and weekly pace, and shows confidence gaps.
- Level map with unlocking:
  - The next level opens once the previous level's required sessions are done, so a project can finish while the next level starts.
  - Mastering a level needs its required sessions, a quiz score of at least 80% and a project that passes a 4-dimension rubric.
  - Badges are kept once earned.
- Session pages: decision brief, recall, lesson explanation, visible tutorials and sources, worked example, interactive decision practice, task, optional agent prompt, verification and evidence. The lesson introduces the concepts before the links. One suggested excerpt helps with pacing; additional sources stay visible.
- A session completes only with evidence: checklist, reflection, an artifact reference and logged time.
- Dashboard, progress charts (each with a table view), weekly rhythm (no daily streaks), timeline and achievements.
- Workspace for notes and reflections, a study plan with a mentor role every week, a case-study hub and a PM workspace guide.
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
- **Sensitive data:** use public sources and fictional practice data throughout. Do not paste employer or customer information into the course tools.

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

- **Next validation:** observe a PM completing the first level, test the time budgets and seek expert review of evaluation, experimentation and domain safety.
- **Estimates:** time estimates and quiz difficulty have not been tested with learners.
- **Link checks:** resource statuses reflect checks made on 2026-10-31. Links rot, so recheck before each cohort.

## Accessibility

Built with semantic landmarks, a skip link, labelled form controls, keyboard support (including the quiz and tabs), visible focus, dialogs that move focus in and restore it on close, a table view for every chart and respect for reduced motion. Automated checks cover keyboard paths. No full screen reader audit has been done.

## License

No license has been chosen yet, so all rights are reserved by default. Linked resources belong to their owners.
