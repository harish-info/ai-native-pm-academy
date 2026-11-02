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
  {
    label: string
    calendarWeeks: number
    daysPerPlanWeek: number
    hoursPerWeek: string
    // What one of the eight plan steps is called at this pace, and how long it lasts.
    unit: 'Week' | 'Part'
    unitSpan: string
  }
> = {
  standard: {
    label: 'Standard: 8 weeks',
    calendarWeeks: 8,
    daysPerPlanWeek: 7,
    hoursPerWeek: 'about 10 hours a week',
    unit: 'Week',
    unitSpan: '1 week',
  },
  light: {
    label: 'Light: 12 weeks',
    calendarWeeks: 12,
    daysPerPlanWeek: 10.5,
    hoursPerWeek: 'about 7 hours a week',
    unit: 'Part',
    unitSpan: 'about 1.5 weeks',
  },
}

const weeklyReview: PlanItem = {
  kind: 'review',
  text: 'Read log.md, update product-context.md if anything changed, and set three goals for what comes next. Then rest.',
  minutes: 30,
}

export const planWeeks: PlanWeek[] = [
  {
    number: 1,
    levelIds: [1],
    title: 'AI foundations',
    goal: "Understand how today's AI works, write the context file every later session reads, and ship a vibe-coded pitch page.",
    mentor:
      'Day 1, 15 minutes: agree a fixed weekly mentor slot and check she can sign in to Claude; the free plan is enough this week. End of the week, 45 minutes: review the Level 1 project together and ask her to show one answer she rejected and why. Then set up Week 2 together with the Before Session 5 steps in the Starter kit.',
    items: [
      { kind: 'mentor', text: 'Kick-off: weekly slot and a working Claude account.', minutes: 15 },
      { kind: 'lesson', id: 's1' },
      { kind: 'lesson', id: 's2' },
      { kind: 'lesson', id: 's3' },
      { kind: 'lesson', id: 's4' },
      { kind: 'quiz', levelId: 1 },
      { kind: 'project', levelId: 1, part: 'whole', minutes: 180 },
      { kind: 'mentor', text: 'Level 1 project review and Claude Code setup.', minutes: 45 },
      weeklyReview,
    ],
  },
  {
    number: 2,
    levelIds: [2],
    title: 'Claude Code and a first prototype',
    goal: 'Work from a real workspace in Claude Code, build a prototype from an interview-style spec, put it live and review it.',
    mentor:
      '15 minutes early in the week: sit beside her for the first Claude Code session and check git is working. Midweek, 30 minutes: open the live prototype on your phone and file two bug reports she can fix in Session 8. Suggest two or three people from your own network for her user conversations in Week 4.',
    items: [
      {
        kind: 'prep',
        text: 'Before Session 5, install Claude Code, Warp and Git with the Starter kit steps. Optional: the Field guide, under Learn in the menu, compares current models and maps everyday PM jobs to sessions.',
        minutes: 30,
      },
      { kind: 'mentor', text: 'First Claude Code session together.', minutes: 15 },
      { kind: 'lesson', id: 's5' },
      { kind: 'lesson', id: 's6' },
      { kind: 'lesson', id: 's7' },
      { kind: 'mentor', text: 'Try the live prototype and file two bug reports.', minutes: 30 },
      { kind: 'lesson', id: 's8' },
      {
        kind: 'prep',
        text: 'Start recruiting people who experience the problem you chose. Aim for five, with three as the minimum for the learning exercise. Ask for 30 minutes, explain the prototype and agree consent before taking notes.',
        minutes: 15,
      },
      weeklyReview,
    ],
  },
  {
    number: 3,
    levelIds: [2, 3],
    title: 'Finish the prototype, frame the strategy',
    goal: 'Finish the prototype project with a real code review, then frame the strategy and map the market.',
    mentor:
      '60 minutes: walk through the prototype code review with her, as a real reviewer would. Leave written comments on one pull request, request one change, approve the second round. Then score the Level 2 project against the rubric.',
    items: [
      { kind: 'quiz', levelId: 2 },
      { kind: 'project', levelId: 2, part: 'whole', minutes: 300 },
      { kind: 'mentor', text: 'Code review walkthrough and Level 2 scoring.', minutes: 60 },
      { kind: 'lesson', id: 's9' },
      {
        kind: 'prep',
        text: 'Read the Session 10 discussion-guide steps and rehearse before the real conversations.',
        minutes: 30,
      },
      {
        kind: 'prep',
        text: 'Hold three 30-minute conversations for Session 10. Two more are optional extra time. If recruitment fails, keep the exercise labelled PRACTICE and make a dated validation plan.',
        minutes: 90,
      },
      weeklyReview,
    ],
  },
  {
    number: 4,
    levelIds: [3, 4],
    title: 'Evidence, practice analytics and a scoped PRD',
    goal: 'Synthesise the conversations, practise analytics on fictional data, choose a bounded bet and write its PRD and handoff.',
    mentor:
      'Early in the week, 15 minutes: be a practice interviewee so her first real conversation is not her first try. End of the week, 30 minutes: read the synthesis and ask which finding surprised her most, and what evidence would change her chosen bet.',
    items: [
      { kind: 'mentor', text: 'Practice interview before the real ones.', minutes: 15 },
      { kind: 'lesson', id: 's10' },
      { kind: 'lesson', id: 's11' },
      { kind: 'lesson', id: 's12' },
      { kind: 'mentor', text: 'Challenge the synthesis and the chosen bet.', minutes: 30 },
      { kind: 'lesson', id: 's13' },
      weeklyReview,
    ],
  },
  {
    number: 5,
    levelIds: [3, 4],
    title: 'Decide, then test the AI feature',
    goal: 'Finish the decision pack, evaluate a stand-in and specify the integrated evidence still needed before a real launch.',
    mentor:
      '60 minutes: be the sceptical engineer reading her PRD and design spec cold. Mark every acceptance criterion you could not test and every place you would have to guess, then argue for cutting one more thing. Score the Level 3 project. Later in the week, 15 minutes: red-team the AI feature with three attempts to make it say something unsafe.',
    items: [
      { kind: 'quiz', levelId: 3 },
      { kind: 'project', levelId: 3, part: 'whole', minutes: 300 },
      {
        kind: 'mentor',
        text: 'Cold read of the PRD and design spec as the engineer.',
        minutes: 60,
      },
      { kind: 'lesson', id: 's14' },
      { kind: 'mentor', text: 'Red-team the AI feature with three attempts.', minutes: 15 },
      weeklyReview,
    ],
  },
  {
    number: 6,
    levelIds: [4, 5],
    title: 'Launch, tell the story, start the PM OS',
    goal: 'Read out a launch result, build a deck that makes the decision obvious, and turn the workspace into a wiki.',
    mentor:
      '30 minutes at the end of the week: hear a first run-through of the deck and give one note on the story, not the slides. Ask which slide she would cut if she had half the time.',
    items: [
      { kind: 'lesson', id: 's15' },
      { kind: 'lesson', id: 's16' },
      { kind: 'project', levelId: 4, part: 'start', minutes: 120 },
      { kind: 'mentor', text: 'First deck run-through: one note on the story.', minutes: 30 },
      { kind: 'lesson', id: 's17' },
      weeklyReview,
    ],
  },
  {
    number: 7,
    levelIds: [4, 5],
    title: 'Present the launch, then the team knowledge base',
    goal: 'Present the launch review live, design a team knowledge base, and automate the routine with skills.',
    mentor:
      '60 minutes: play the executive at her launch review. Ask the questions a head of product would ask, then sign off the Level 4 project: from Level 4 on, the project counts only with your sign-off as mentor.',
    items: [
      { kind: 'project', levelId: 4, part: 'finish', minutes: 180 },
      { kind: 'quiz', levelId: 4 },
      { kind: 'mentor', text: 'Launch review as the executive; sign off Level 4.', minutes: 60 },
      { kind: 'lesson', id: 's18' },
      { kind: 'lesson', id: 's19' },
      weeklyReview,
    ],
  },
  {
    number: 8,
    levelIds: [5],
    title: 'Product teams with agents',
    goal: 'Write the team playbook, finish the PM OS project and demo it, and leave with a kit you could take back to work.',
    mentor:
      '60 minutes: play the sceptical head of engineering at her demo of the PM OS and team knowledge base. Would you let your team adopt it? What would change your mind? Then sign off the Level 5 project against the rubric.',
    items: [
      { kind: 'lesson', id: 's20' },
      { kind: 'project', levelId: 5, part: 'whole', minutes: 360 },
      { kind: 'quiz', levelId: 5 },
      { kind: 'mentor', text: 'Demo to a sceptical head of engineering.', minutes: 60 },
      {
        kind: 'review',
        text: 'Write wiki/course-retro.md and wiki/return-to-work.md. Pick one stretch challenge for after the course.',
        minutes: 45,
      },
    ],
  },
]

export const planNotes = [
  'Pick a start date and a pace. Standard is eight weeks at about 10 hours a week, including mentor time; light spreads the same eight steps over twelve weeks at about 7 hours a week, so each step is called a part and lasts about a week and a half. You can switch pace at any time without losing progress.',
  'Sessions are 75 to 150 minute planning budgets, including the short assigned source, examples and practice. Longer courses and extra resources are optional. Split a session across days and log the actual time.',
  'Recruitment takes elapsed time. Three conversations are budgeted in Week 3, before Session 10 synthesis in Week 4 (Parts 3 and 4 at the light pace). More participants and installation problems need extra time. Estimates have not been tested with learners.',
  'Start each weekly review by recalling one earlier decision without notes, then compare it with your artifact. Projects consolidate your session work; do not restart the same assignments.',
  'If a week slips, push the start date back a week rather than skipping verification or reflections. Nothing is lost.',
  "A new level opens as soon as you finish the previous level's sessions, so a project can finish while the next level starts. The level badge still needs the quiz and the project.",
  'Mentor time is about one hour a week plus short unblock calls. Each week says what the mentor does; each session page has a "mentor move" for when there are 15 minutes.',
  'The ten stretch challenges are not scheduled. They wait in each level for after the course.',
]
