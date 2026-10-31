import type { LevelId } from './types'

// The month plan: five weeks from Monday 2 November 2026, about 13 to 14 focused hours a week.
// Day items reference lessons and levels by id, so titles, minutes and resources always come from
// the course content itself.

export type PlanItem =
  | { kind: 'lesson'; id: string }
  | { kind: 'quiz'; levelId: LevelId }
  | { kind: 'project'; levelId: LevelId; part: 'start' | 'finish' }
  | { kind: 'mentor'; text: string; minutes: number }
  | { kind: 'review'; text: string; minutes: number }
  | { kind: 'prep'; text: string; minutes: number }

export interface PlanDay {
  date: string // YYYY-MM-DD
  focus: string
  items: PlanItem[]
}

export interface PlanWeek {
  number: number
  levelId: LevelId
  title: string
  goal: string
  mentorSession: string
  days: PlanDay[]
}

const weeklyReview = (week: number): PlanItem => ({
  kind: 'review',
  text: `Weekly review (Week ${week}): run your weekly-review prompt or skill, lint the wiki, set three goals for next week. Then rest.`,
  minutes: 30,
})

export const planStart = '2026-11-02'
export const planEnd = '2026-12-06'

export const planWeeks: PlanWeek[] = [
  {
    number: 1,
    levelId: 1,
    title: 'AI fluency',
    goal: 'Use AI daily with a verification habit, and start the wiki by hand.',
    mentorSession:
      'Saturday, 45 minutes: review the Level 1 project together. Ask her to show one answer she rejected and why. Set up her laptop: a code editor, a terminal she is not afraid of, and Claude or ChatGPT on a paid plan if the budget allows.',
    days: [
      { date: '2026-11-02', focus: 'How models work', items: [{ kind: 'lesson', id: 's1' }] },
      {
        date: '2026-11-03',
        focus: 'Research and verification',
        items: [{ kind: 'lesson', id: 's2' }],
      },
      {
        date: '2026-11-04',
        focus: 'Organize notes with AI',
        items: [{ kind: 'lesson', id: 's3' }],
      },
      { date: '2026-11-05', focus: 'Weekly workflow', items: [{ kind: 'lesson', id: 's4' }] },
      {
        date: '2026-11-06',
        focus: 'Assessment and project',
        items: [
          { kind: 'quiz', levelId: 1 },
          { kind: 'project', levelId: 1, part: 'start' },
        ],
      },
      {
        date: '2026-11-07',
        focus: 'Ship and review',
        items: [
          { kind: 'project', levelId: 1, part: 'finish' },
          { kind: 'mentor', text: 'Level 1 project review and laptop setup.', minutes: 45 },
        ],
      },
      { date: '2026-11-08', focus: 'Review and rest', items: [weeklyReview(1)] },
    ],
  },
  {
    number: 2,
    levelId: 2,
    title: 'Second brain and context engineering',
    goal: 'Turn the learning folder into an agent-maintained personal wiki you trust.',
    mentorSession:
      'Saturday, 45 minutes: run the fresh-agent test on her wiki together. Open a new session, ask three questions and check the quotes. Pair on her first skill if it misbehaves.',
    days: [
      {
        date: '2026-11-09',
        focus: 'Create the personal wiki',
        items: [{ kind: 'lesson', id: 's5' }],
      },
      {
        date: '2026-11-10',
        focus: 'Ingest and query',
        items: [
          { kind: 'lesson', id: 's6' },
          {
            kind: 'prep',
            text: 'Start recruiting 4 to 5 people for short money conversations next week (friends, family, a parents group). Ask for 20 minutes, no pitch.',
            minutes: 15,
          },
        ],
      },
      {
        date: '2026-11-11',
        focus: 'Schema, decisions, skills',
        items: [{ kind: 'lesson', id: 's7' }],
      },
      {
        date: '2026-11-12',
        focus: 'Weekly review and lint',
        items: [{ kind: 'lesson', id: 's8' }],
      },
      {
        date: '2026-11-13',
        focus: 'Assessment and project',
        items: [
          { kind: 'quiz', levelId: 2 },
          { kind: 'project', levelId: 2, part: 'start' },
        ],
      },
      {
        date: '2026-11-14',
        focus: 'Ship and review',
        items: [
          { kind: 'project', levelId: 2, part: 'finish' },
          { kind: 'mentor', text: 'Fresh-agent test on her wiki.', minutes: 45 },
        ],
      },
      { date: '2026-11-15', focus: 'Review and rest', items: [weeklyReview(2)] },
    ],
  },
  {
    number: 3,
    levelId: 3,
    title: 'AI-native discovery and design',
    goal: 'Decide what MoneyPilot should be, from evidence, and write a PRD an agent can build from.',
    mentorSession:
      'Saturday, 60 minutes: be the engineer reading her PRD cold. Mark every acceptance criterion you could not test and every place you would have to guess. Then argue for cutting one more thing from v1.',
    days: [
      { date: '2026-11-16', focus: 'Market map', items: [{ kind: 'lesson', id: 's9' }] },
      {
        date: '2026-11-17',
        focus: 'Conversations and opportunity tree',
        items: [{ kind: 'lesson', id: 's10' }],
      },
      { date: '2026-11-18', focus: 'Divergent prototypes', items: [{ kind: 'lesson', id: 's11' }] },
      {
        date: '2026-11-19',
        focus: 'Test and write the PRD',
        items: [{ kind: 'lesson', id: 's12' }],
      },
      {
        date: '2026-11-20',
        focus: 'Assessment and project',
        items: [
          { kind: 'quiz', levelId: 3 },
          { kind: 'project', levelId: 3, part: 'start' },
        ],
      },
      {
        date: '2026-11-21',
        focus: 'Ship and review',
        items: [
          { kind: 'project', levelId: 3, part: 'finish' },
          { kind: 'mentor', text: 'Cold read of the PRD as the engineer.', minutes: 60 },
        ],
      },
      { date: '2026-11-22', focus: 'Review and rest', items: [weeklyReview(3)] },
    ],
  },
  {
    number: 4,
    levelId: 4,
    title: 'Agentic product engineering',
    goal: 'Ship MoneyPilot v1 with coding agents through real pull requests, tests and review.',
    mentorSession:
      'Tuesday 20 minutes to unblock GitHub setup, then Saturday 60 minutes: review one of her pull requests like a real reviewer. Leave written comments, request one change, approve the second round.',
    days: [
      {
        date: '2026-11-23',
        focus: 'Git and the first pull request',
        items: [{ kind: 'lesson', id: 's13' }],
      },
      {
        date: '2026-11-24',
        focus: 'First feature with a coding agent',
        items: [
          { kind: 'lesson', id: 's14' },
          {
            kind: 'mentor',
            text: 'Unblock GitHub, Node or terminal setup if anything is stuck.',
            minutes: 20,
          },
        ],
      },
      {
        date: '2026-11-25',
        focus: 'Plan, handoffs, first screens',
        items: [{ kind: 'lesson', id: 's15' }],
      },
      { date: '2026-11-26', focus: 'Test, review, deploy', items: [{ kind: 'lesson', id: 's16' }] },
      {
        date: '2026-11-27',
        focus: 'Assessment and project',
        items: [
          { kind: 'quiz', levelId: 4 },
          { kind: 'project', levelId: 4, part: 'start' },
        ],
      },
      {
        date: '2026-11-28',
        focus: 'Ship and review',
        items: [
          { kind: 'project', levelId: 4, part: 'finish' },
          { kind: 'mentor', text: 'Real pull request review with written comments.', minutes: 60 },
        ],
      },
      { date: '2026-11-29', focus: 'Review and rest', items: [weeklyReview(4)] },
    ],
  },
  {
    number: 5,
    levelId: 5,
    title: 'Agents and AI-native leadership',
    goal: 'Add a controlled finance agent to MoneyPilot, try hard to break it, and leave with a team playbook.',
    mentorSession:
      'Thursday 15 minutes of red-teaming her agent, then Saturday 60 minutes: play the skeptical head of engineering at her demo. Would you fund the pilot? What would change your mind?',
    days: [
      { date: '2026-11-30', focus: 'Design the agent', items: [{ kind: 'lesson', id: 's17' }] },
      {
        date: '2026-12-01',
        focus: 'Build the agent slice',
        items: [{ kind: 'lesson', id: 's18' }],
      },
      {
        date: '2026-12-02',
        focus: 'Evaluate and red-team',
        items: [
          { kind: 'lesson', id: 's19' },
          {
            kind: 'mentor',
            text: 'Red-team her agent with three injection attempts.',
            minutes: 15,
          },
        ],
      },
      {
        date: '2026-12-03',
        focus: 'Demo and team workflow',
        items: [{ kind: 'lesson', id: 's20' }],
      },
      {
        date: '2026-12-04',
        focus: 'Assessment and project',
        items: [
          { kind: 'quiz', levelId: 5 },
          { kind: 'project', levelId: 5, part: 'start' },
        ],
      },
      {
        date: '2026-12-05',
        focus: 'Ship and demo',
        items: [
          { kind: 'project', levelId: 5, part: 'finish' },
          { kind: 'mentor', text: 'Demo to a skeptical head of engineering.', minutes: 60 },
        ],
      },
      {
        date: '2026-12-06',
        focus: 'Course retro',
        items: [
          weeklyReview(5),
          {
            kind: 'review',
            text: 'Write reflections/course-retro.md and goals/return-to-work-kit.md in the wiki. Pick the December stretch challenges.',
            minutes: 45,
          },
        ],
      },
    ],
  },
]

export const planNotes = [
  'Total effort is about 68 hours over five weeks, roughly 2 hours a day on six days. That is a lot alongside a baby. If a week slips, push the whole plan back a week rather than skipping verification or reflections.',
  'Light alternative: the same order over eight weeks at about 8 hours a week, finishing before Christmas. The stretch challenges fit December and January either way.',
  'Sessions are written as 75 to 150 minute blocks, but they split cleanly at the task steps. Two nap-time halves work fine; log the time for each half.',
  'Sunday is review and rest. The weekly review takes 30 minutes and keeps the wiki honest.',
  'Mentor time is about one hour a week plus short unblock calls. Each session page has a "mentor move" for when you have 15 minutes.',
]
