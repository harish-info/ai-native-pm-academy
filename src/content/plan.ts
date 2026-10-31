import type { LevelId } from './types'

// The study plan: eight weeks from a start date the learner picks, about 10 hours a week, or
// the same weeks stretched to twelve at the light pace. Weeks are not tied one to one to levels:
// later levels are heavier, so they span more than a week, and a project can finish while the next
// level starts. Items reference lessons and levels by id, so titles, minutes and resources always
// come from the course content itself. Dates are computed in src/domain/schedule.ts.

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
  /** What the mentor does this week, explicitly. */
  mentor: string
  items: PlanItem[]
}

export type PlanPace = 'standard' | 'light'

export const paces: Record<
  PlanPace,
  { label: string; calendarWeeks: number; daysPerPlanWeek: number; hoursPerWeek: string }
> = {
  standard: {
    label: 'Standard: 8 weeks',
    calendarWeeks: 8,
    daysPerPlanWeek: 7,
    hoursPerWeek: 'about 10 hours a week',
  },
  light: {
    label: 'Light: 12 weeks',
    calendarWeeks: 12,
    daysPerPlanWeek: 10.5,
    hoursPerWeek: 'about 7 hours a week',
  },
}

const weeklyReview = (week: number): PlanItem => ({
  kind: 'review',
  text: `Weekly review (Week ${week}): run your weekly-review prompt or skill, lint the wiki, set three goals for next week. Then rest.`,
  minutes: 30,
})

export const planWeeks: PlanWeek[] = [
  {
    number: 1,
    levelIds: [1],
    title: 'AI fluency',
    goal: 'Use AI daily with a verification habit, and start the wiki by hand.',
    mentor:
      'Day 1, 15 minutes: agree a fixed weekly mentor slot and check she can sign in to Claude or ChatGPT; nothing else is needed to start. End of the week, 45 minutes: review the Level 1 project together and ask her to show one answer she rejected and why. Then set up her laptop for Week 2: a code editor, a terminal she is not afraid of, and git.',
    items: [
      { kind: 'mentor', text: 'Kick-off: weekly slot and a working chat account.', minutes: 15 },
      { kind: 'lesson', id: 's1' },
      { kind: 'lesson', id: 's2' },
      { kind: 'lesson', id: 's3' },
      { kind: 'lesson', id: 's4' },
      { kind: 'quiz', levelId: 1 },
      { kind: 'project', levelId: 1, part: 'whole', minutes: 180 },
      { kind: 'mentor', text: 'Level 1 project review and laptop setup.', minutes: 45 },
      weeklyReview(1),
    ],
  },
  {
    number: 2,
    levelIds: [2],
    title: 'Second brain and context engineering',
    goal: 'Build the private wiki, let an agent work from it, and pass the fresh-agent test.',
    mentor:
      '45 minutes: run the fresh-agent test on her wiki together. Open a new session, ask three questions and check the quotes. Pair on her first skill if it misbehaves. Suggest two or three people from your own network for her money conversations next week.',
    items: [
      { kind: 'lesson', id: 's5' },
      { kind: 'lesson', id: 's6' },
      { kind: 'lesson', id: 's7' },
      { kind: 'lesson', id: 's8' },
      { kind: 'quiz', levelId: 2 },
      { kind: 'project', levelId: 2, part: 'start', minutes: 120 },
      {
        kind: 'prep',
        text: 'Start recruiting 4 to 5 people for short money conversations next week (friends, family, a parents group). Ask for 20 minutes, no pitch.',
        minutes: 15,
      },
      { kind: 'mentor', text: 'Fresh-agent test on her wiki.', minutes: 45 },
      weeklyReview(2),
    ],
  },
  {
    number: 3,
    levelIds: [2, 3],
    title: 'Discovery with real people',
    goal: 'Finish the wiki project, map the market and learn from real conversations about money.',
    mentor:
      'Early in the week, 15 minutes: be a practice interviewee so her first real conversation is not her first try. End of the week, 30 minutes: score the Level 2 project with her against the rubric and record yourself as the assessor.',
    items: [
      { kind: 'project', levelId: 2, part: 'finish', minutes: 120 },
      { kind: 'lesson', id: 's9' },
      { kind: 'mentor', text: 'Practice interview before the real ones.', minutes: 15 },
      { kind: 'lesson', id: 's10' },
      { kind: 'lesson', id: 's11' },
      { kind: 'mentor', text: 'Score the Level 2 project together.', minutes: 30 },
      weeklyReview(3),
    ],
  },
  {
    number: 4,
    levelIds: [3, 4],
    title: 'Decide, specify and open the repo',
    goal: 'Write a PRD an agent can build from, finish the discovery project and open a first pull request.',
    mentor:
      'Early in the week, 20 minutes: unblock GitHub, Node or terminal setup before Session 13. End of the week, 60 minutes: be the engineer reading her PRD cold. Mark every acceptance criterion you could not test and every place you would have to guess, then argue for cutting one more thing from v1. Score the Level 3 project.',
    items: [
      { kind: 'lesson', id: 's12' },
      { kind: 'quiz', levelId: 3 },
      { kind: 'project', levelId: 3, part: 'whole', minutes: 240 },
      { kind: 'mentor', text: 'Unblock GitHub, Node or terminal setup.', minutes: 20 },
      { kind: 'lesson', id: 's13' },
      { kind: 'mentor', text: 'Cold read of the PRD as the engineer.', minutes: 60 },
      weeklyReview(4),
    ],
  },
  {
    number: 5,
    levelIds: [4],
    title: 'Build with coding agents',
    goal: 'Ship features with a coding agent, from plan to reviewed, tested and deployed pull request.',
    mentor:
      '60 minutes: review one of her pull requests like a real reviewer. Leave written comments, request one change, approve the second round.',
    items: [
      { kind: 'lesson', id: 's14' },
      { kind: 'lesson', id: 's15' },
      { kind: 'lesson', id: 's16' },
      { kind: 'project', levelId: 4, part: 'start', minutes: 120 },
      { kind: 'mentor', text: 'Real pull request review with written comments.', minutes: 60 },
      weeklyReview(5),
    ],
  },
  {
    number: 6,
    levelIds: [4, 5],
    title: 'Ship v1, then design the agent',
    goal: 'Finish your case study v1, then design an agent that never acts without approval.',
    mentor:
      '45 minutes: assess the Level 4 project with her. From Level 4 on, the project counts only with your sign-off as mentor, so check that the deployed app matches the PRD and that every change went through review. Then question the agent design: what can it do without asking?',
    items: [
      { kind: 'quiz', levelId: 4 },
      { kind: 'project', levelId: 4, part: 'finish', minutes: 180 },
      { kind: 'lesson', id: 's17' },
      { kind: 'project', levelId: 5, part: 'start', minutes: 60 },
      {
        kind: 'mentor',
        text: 'Sign off the Level 4 project; question the agent design.',
        minutes: 45,
      },
      weeklyReview(6),
    ],
  },
  {
    number: 7,
    levelIds: [5],
    title: 'Build and break the agent',
    goal: 'Build one limited agent capability, then try hard to break it with evals and red-teaming.',
    mentor:
      '15 minutes midweek: red-team her agent with three injection attempts. End of the week, 30 minutes: read the eval report and ask which failures would block a release.',
    items: [
      { kind: 'lesson', id: 's18' },
      { kind: 'project', levelId: 5, part: 'continue', minutes: 240 },
      { kind: 'mentor', text: 'Red-team her agent with three injection attempts.', minutes: 15 },
      { kind: 'lesson', id: 's19' },
      { kind: 'mentor', text: 'Read the eval report together.', minutes: 30 },
      weeklyReview(7),
    ],
  },
  {
    number: 8,
    levelIds: [5],
    title: 'Lead: demo and team workflow',
    goal: 'Finish the agent, demo it to a skeptic, and leave with a team workflow you could take back to work.',
    mentor:
      '60 minutes: play the skeptical head of engineering at her demo. Would you fund the pilot? What would change your mind? Then sign off the Level 5 project against the rubric.',
    items: [
      { kind: 'lesson', id: 's20' },
      { kind: 'project', levelId: 5, part: 'finish', minutes: 300 },
      { kind: 'quiz', levelId: 5 },
      { kind: 'mentor', text: 'Demo to a skeptical head of engineering.', minutes: 60 },
      weeklyReview(8),
      {
        kind: 'review',
        text: 'Write reflections/course-retro.md and goals/return-to-work-kit.md in the wiki. Pick one stretch challenge for after the course.',
        minutes: 45,
      },
    ],
  },
]

export const planNotes = [
  'Pick a start date and a pace. Standard is eight weeks at about 10 hours a week, including mentor time; light is the same weeks stretched to twelve at about 7 hours. You can switch pace at any time without losing progress.',
  'Sessions are written as 75 to 180 minute blocks, but they split cleanly at the task steps. Two nap-time halves work fine; log the time for each half.',
  'If a week slips, push the start date back a week rather than skipping verification or reflections. Nothing is lost.',
  "A new level opens as soon as you finish the previous level's sessions, so a project can finish while the next level starts. The level badge still needs the quiz and the project.",
  'Mentor time is about one hour a week plus short unblock calls. Each week says what the mentor does; each session page has a "mentor move" for when there are 15 minutes.',
  'The ten stretch challenges are not scheduled. They wait in each level for after the course.',
]
