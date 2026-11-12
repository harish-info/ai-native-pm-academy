import type { LevelId } from './types'

export type PlanItem =
  | { kind: 'lesson'; id: string }
  | { kind: 'quiz'; levelId: LevelId }
  | {
      kind: 'project'
      levelId: LevelId
      part: 'whole' | 'start' | 'continue' | 'finish'
      minutes: number
    }
  | { kind: 'mentor'; text: string; minutes: number }
  | { kind: 'review'; text: string; minutes: number }
  | { kind: 'prep'; text: string; minutes: number }

export interface PlanWeek {
  number: number
  levelIds: LevelId[]
  title: string
  goal: string
  mentor: string
  items: PlanItem[]
}

export type PlanPace = 'standard' | 'light'

export const paces: Record<
  PlanPace,
  { label: string; calendarWeeks: number; hoursPerWeek: string }
> = {
  standard: { label: 'Standard: 8 weeks', calendarWeeks: 8, hoursPerWeek: 'about 6 hours a week' },
  light: { label: 'Light: 12 weeks', calendarWeeks: 12, hoursPerWeek: 'about 4 hours a week' },
}

const weeklyReview: PlanItem = {
  kind: 'review',
  text: 'Read your notes, update product-context.md if anything changed, and set three goals for next week.',
  minutes: 30,
}

export const planWeeks: PlanWeek[] = [
  {
    number: 1,
    levelIds: [1],
    title: 'AI foundations and first pitch',
    goal: "Understand how today's AI works, write product-context.md for MoneyPilot, verify a research brief against primary sources, and share a pitch page.",
    mentor:
      'Optional 35-minute end-of-week review: open the pitch page cold on a phone, check two Verified claims in fact-sheet.md live together, and ask which AI output you rejected.',
    items: [
      { kind: 'lesson', id: 's1' },
      { kind: 'lesson', id: 's2' },
      { kind: 'lesson', id: 's3' },
      { kind: 'lesson', id: 's4' },
      { kind: 'quiz', levelId: 1 },
      { kind: 'project', levelId: 1, part: 'whole', minutes: 20 },
      {
        kind: 'mentor',
        text: 'Optional review: cold-read the Level 1 pitch page and fact sheet (or run the solo check).',
        minutes: 35,
      },
      weeklyReview,
    ],
  },
  {
    number: 2,
    levelIds: [2],
    title: 'Workspace, prototype probe and GitHub',
    goal: 'Set up a clean git workspace, interview into a one-page requirements file, build the MoneyPilot probe and publish one pull request.',
    mentor:
      'Optional 35-minute end-of-week review: inspect your first GitHub pull request diff together with the four PM questions and check the two files you verified in a public codebase.',
    items: [
      {
        kind: 'prep',
        text: 'Follow the Before Session 5 steps in the Starter kit to install Git and Claude Code (terminal or desktop Code tab). Start lining up 3 to 5 monthly-paid interviewees for Session 10.',
        minutes: 25,
      },
      { kind: 'lesson', id: 's5' },
      { kind: 'lesson', id: 's6' },
      { kind: 'lesson', id: 's7' },
      {
        kind: 'mentor',
        text: 'Optional review: walk through your Session 7 pull request diff and codebase check.',
        minutes: 35,
      },
      weeklyReview,
    ],
  },
  {
    number: 3,
    levelIds: [2, 3],
    title: 'Review the probe and frame the strategy',
    goal: 'Run accessibility and fresh-session code review on your probe, complete the Level 2 sign-off, and frame MoneyPilot’s strategy kernel.',
    mentor:
      'Optional 40-minute review: review your Session 8 bug-fix pull request and challenge what MoneyPilot will explicitly not do in your Session 9 strategy kernel.',
    items: [
      { kind: 'lesson', id: 's8' },
      { kind: 'quiz', levelId: 2 },
      { kind: 'project', levelId: 2, part: 'whole', minutes: 20 },
      { kind: 'lesson', id: 's9' },
      {
        kind: 'prep',
        text: 'Confirm times for 3 to 5 discovery interviews for Session 10 (or set aside time to work through the five MoneyPilot practice interview notes).',
        minutes: 20,
      },
      {
        kind: 'mentor',
        text: 'Optional review: Level 2 sign-off and strategy kernel pushback.',
        minutes: 40,
      },
      weeklyReview,
    ],
  },
  {
    number: 4,
    levelIds: [3],
    title: 'User interviews and funnel math',
    goal: 'Synthesise past-story interviews by hand before comparing with AI, then audit funnel denominators on s11-events.csv and rank your bets.',
    mentor:
      'Optional 35-minute review: ask which interview story overturned an assumption in your prototype and check the denominator on your top funnel drop-off.',
    items: [
      {
        kind: 'prep',
        text: 'Run three 25-minute story interviews (or read P1.md to P5.md carefully before opening any AI session).',
        minutes: 75,
      },
      { kind: 'lesson', id: 's10' },
      { kind: 'lesson', id: 's11' },
      {
        kind: 'mentor',
        text: 'Optional review: challenge your interview synthesis and funnel bet ranking.',
        minutes: 35,
      },
      weeklyReview,
    ],
  },
  {
    number: 5,
    levelIds: [3, 4],
    title: 'Scoped PRD and one-screen design spec',
    goal: 'Write a PRD with explicit always / ask first / never contracts, sign off Level 3, and specify states and read / prepare / execute tool permissions.',
    mentor:
      'Optional 40-minute review: read the PRD and design spec as a sceptical banking engineer, marking any acceptance criterion or approval boundary that still requires guesswork.',
    items: [
      { kind: 'lesson', id: 's12' },
      { kind: 'quiz', levelId: 3 },
      { kind: 'project', levelId: 3, part: 'whole', minutes: 20 },
      { kind: 'lesson', id: 's13' },
      {
        kind: 'mentor',
        text: 'Optional review: cold engineering read of your PRD and Session 13 slice.',
        minutes: 40,
      },
      weeklyReview,
    ],
  },
  {
    number: 6,
    levelIds: [4],
    title: 'Error-driven evals and experiment readout',
    goal: 'Label 30 MoneyPilot traces by hand before writing eval checks, then audit the 14-day experiment readout against pre-set guardrails.',
    mentor:
      'Optional 35-minute review: try to break your eval rubric with two edge-case prompts and challenge your ship / iterate / stop call on s15-experiment-results.csv.',
    items: [
      { kind: 'lesson', id: 's14' },
      { kind: 'lesson', id: 's15' },
      {
        kind: 'mentor',
        text: 'Optional review: stress-test your eval failure modes and experiment decision.',
        minutes: 35,
      },
      weeklyReview,
    ],
  },
  {
    number: 7,
    levelIds: [4, 5],
    title: 'Executive QBR and your personal wiki',
    goal: 'Present a concise SCQA launch review, complete the Level 4 sign-off, and compile your MoneyPilot workspace into a cited personal wiki.',
    mentor:
      'Optional 40-minute review: play the executive in a 10-minute QBR rehearsal, interrupting on Slide 2 to test whether the recommendation and trade-off are clear.',
    items: [
      { kind: 'lesson', id: 's16' },
      { kind: 'quiz', levelId: 4 },
      { kind: 'project', levelId: 4, part: 'whole', minutes: 20 },
      { kind: 'lesson', id: 's17' },
      {
        kind: 'mentor',
        text: 'Optional review: live QBR rehearsal and unanswerable-question check on your wiki.',
        minutes: 40,
      },
      weeklyReview,
    ],
  },
  {
    number: 8,
    levelIds: [5],
    title: 'Team wiki, tested skill and team pilot',
    goal: 'Upgrade your wiki for team governance, hand-write and adversarial-test one SKILL.md, propose a bottleneck-first team pilot, and sign off Level 5.',
    mentor:
      'Optional 45-minute review: play a sceptical head of engineering reviewing your wiki trust check, hostile-export skill diff and 30-day team pilot proposal.',
    items: [
      { kind: 'lesson', id: 's18' },
      { kind: 'lesson', id: 's19' },
      { kind: 'lesson', id: 's20' },
      { kind: 'quiz', levelId: 5 },
      { kind: 'project', levelId: 5, part: 'whole', minutes: 20 },
      {
        kind: 'mentor',
        text: 'Optional review: demo your wiki, tested skill and team pilot to a sceptical reviewer.',
        minutes: 45,
      },
      {
        kind: 'review',
        text: 'Write wiki/course-retro.md and wiki/return-to-work.md, export a JSON backup from Settings, and pick one stretch challenge if you want deeper practice.',
        minutes: 30,
      },
    ],
  },
]

export const planNotes = [
  'Pick a start date and a pace. Standard runs eight weeks at about 6 hours a week; Light spreads the exact same sessions in order over twelve weeks at about 4 hours a week. Switch pace anytime without losing progress.',
  'Each session is self-contained with one short assigned reading or video (8 to 15 minutes), a MoneyPilot worked example, a quick check and a four-step task. Structured courses in Courses in order and extra links stay visible for deeper study at your own pace.',
  'Level sign-offs take 15 to 20 minutes: they verify the artifacts you already built in the four sessions rather than assigning a second multi-hour project.',
  'Recruiting real interviewees for Session 10 takes calendar days, so start reaching out in Week 2. If schedules slip, five fictional MoneyPilot interview notes are included so you never get blocked.',
  'Mentor reviews are optional in every session and sign-off (one 35 to 45 minute review slot per week if you have a mentor or peer, or a concrete solo check on every page if you study alone).',
  'The ten stretch challenges are optional extras outside this schedule.',
]
