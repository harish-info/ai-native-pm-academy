import { levels } from '../content'
import { diagnosticQuestions } from '../content/onboarding'
import { addDays, toDay } from '../domain/dates'
import { emptyLearnerData, type LearnerData, type LessonRecord } from '../storage/schema'

/**
 * Sample progress for demo mode: a learner about two weeks in, Level 1 mastered, Level 2 underway.
 * Lives in its own database and is never mixed with real progress.
 */
export function buildDemoData(now: Date): LearnerData {
  const today = toDay(now)
  const at = (daysAgo: number, hour = 20) => {
    const [y, m, d] = addDays(today, -daysAgo).split('-').map(Number) as [number, number, number]
    return new Date(y, m - 1, d, hour, 15).toISOString()
  }
  const day = (daysAgo: number) => addDays(today, -daysAgo)
  const data = emptyLearnerData(new Date(at(14, 9)))

  const diagnostic: Record<string, string> = {}
  diagnosticQuestions.forEach((q, i) => {
    diagnostic[q.id] =
      i % 3 === 0
        ? 'unsure'
        : i % 2 === 0
          ? q.correct
          : q.options.find((o) => o.id !== q.correct && o.id !== 'unsure')!.id
  })
  data.onboarding = {
    profile: {
      name: 'Demo learner',
      'ai-experience': 'weekly',
      tools: ['chatgpt', 'claude'],
      github: 'viewed',
      'technical-confidence': '2',
      'pm-years': '6-10',
      practice: ['interviews', 'delivery', 'experiments'],
      hours: '8',
      mentor: 'yes',
      pace: 'steady',
      interests: ['knowledge', 'prototyping', 'agents'],
    },
    selfRatings: {
      'ai-fundamentals': 2,
      'prompting-context': 3,
      'knowledge-management': 2,
      'product-discovery': 4,
      'ux-prototyping': 2,
      'technical-collaboration': 1,
      'coding-agents': 1,
      'agentic-systems': 1,
      'evals-safety': 1,
      'ai-leadership': 2,
    },
    diagnostic,
    completedAt: at(14, 9),
  }

  const complete = (
    checklist: { id: string }[],
    reflection: string,
    artifact: string,
    completedDaysAgo: number,
  ): LessonRecord => ({
    checklist: Object.fromEntries(checklist.map((c) => [c.id, true])),
    reflection,
    artifact,
    startedAt: at(completedDaysAgo + 1, 19),
    completedAt: at(completedDaysAgo),
  })

  const [l1, l2] = levels as [(typeof levels)[0], (typeof levels)[0]]
  const doneLessons: { daysAgo: number; reflection: string; artifact: string }[] = [
    {
      daysAgo: 13,
      reflection:
        'Tokens and context limits explain the odd answers I saw on long policy PDFs. I now spot-check every summary against the source.',
      artifact: 'glossary.md',
    },
    {
      daysAgo: 11,
      reflection:
        'With product-context.md in the Project, the competitor summary finally talked about our users. Clever wording did nothing.',
      artifact: 'product-context.md',
    },
    {
      daysAgo: 9,
      reflection:
        'Two of the twelve claims had no real source behind them. Checking against the primary pages took five minutes and was worth it.',
      artifact: 'fact-sheet.md',
    },
    {
      daysAgo: 7,
      reflection:
        'A live pitch page in an evening. Changing one thing at a time kept it from drifting away from the context file.',
      artifact: 'pitch-notes.md',
    },
  ]
  l1.lessons.forEach((lesson, i) => {
    const d = doneLessons[i]
    if (d) data.lessons[lesson.id] = complete(lesson.checklist, d.reflection, d.artifact, d.daysAgo)
  })
  const s5 = l2.lessons[0]
  if (s5) {
    data.lessons[s5.id] = complete(
      s5.checklist,
      'My notes were scattered across three apps. One folder with a short CLAUDE.md is already easier for me and for Claude Code.',
      'CLAUDE.md',
      2,
    )
  }
  const s6 = l2.lessons[1]
  if (s6) {
    data.lessons[s6.id] = {
      checklist: Object.fromEntries(s6.checklist.slice(0, 2).map((c) => [c.id, true])),
      reflection: '',
      artifact: '',
      startedAt: at(0, 10),
    }
  }
  const c1 = l1.challenges[0]
  if (c1) {
    data.challenges[c1.id] = complete(
      c1.steps.map((_, i) => ({ id: `step-${i}` })),
      'Comparing two assistants on the same brief showed how differently they handle missing context. Neither asked a clarifying question.',
      'experiments/c1-model-lab.md',
      5,
    )
  }

  const quiz = l1.quiz
  const answers = (wrong: number) =>
    Object.fromEntries(
      quiz.map((q, i) => [
        q.id,
        i < wrong ? q.options.find((o) => o.id !== q.correct)!.id : q.correct,
      ]),
    )
  data.quizAttempts = [
    {
      id: 'demo-q1',
      levelId: 1,
      answers: answers(3),
      correct: quiz.length - 3,
      total: quiz.length,
      at: at(6, 21),
    },
    {
      id: 'demo-q2',
      levelId: 1,
      answers: answers(1),
      correct: quiz.length - 1,
      total: quiz.length,
      at: at(5, 21),
    },
  ]

  data.projects['1'] = {
    deliverables: Object.fromEntries(l1.project.deliverables.map((d) => [d.id, true])),
    evidence: 'pitch page link, product-context.md, fact-sheet.md',
    rubric: { correctness: 3, quality: 3, independence: 3, judgment: 4 },
    assessedBy: 'mentor',
    mentorName: 'Mentor',
    notes:
      'Strong verification habit. Next: mark more of the context file as Unknown instead of guessing.',
    assessedAt: at(4, 21),
  }

  const minutes = [45, 60, 0, 50, 40, 0, 75, 30, 55, 0, 60, 45, 35, 50, 40]
  data.studyLog = minutes.flatMap((m, daysAgo) => {
    if (!m) return []
    const lesson =
      daysAgo >= 13
        ? l1.lessons[0]
        : daysAgo >= 11
          ? l1.lessons[1]
          : daysAgo >= 9
            ? l1.lessons[2]
            : daysAgo >= 7
              ? l1.lessons[3]
              : daysAgo >= 2
                ? l2.lessons[0]
                : l2.lessons[1]
    return [{ id: `demo-log-${daysAgo}`, date: day(daysAgo), minutes: m, lessonId: lesson?.id }]
  })
  if (c1) data.studyLog.push({ id: 'demo-log-c1', date: day(5), minutes: 40, lessonId: c1.id })

  data.notes = [
    {
      id: 'demo-note-1',
      kind: 'weekly',
      title: 'Week 1',
      body: 'Wins: product-context.md, fact sheet with sources. Stuck: GitHub vocabulary. Next week: Claude Code workspace and the first prototype.',
      tags: ['weekly'],
      createdAt: at(7, 21),
      updatedAt: at(7, 21),
    },
    {
      id: 'demo-note-2',
      kind: 'note',
      title: 'Questions for mentor session',
      body: '- When does a context file become too long?\n- How do engineers review a PM pull request?',
      tags: ['mentor'],
      createdAt: at(3, 20),
      updatedAt: at(1, 20),
    },
  ]
  data.goals = [
    {
      id: 'demo-goal-1',
      text: 'Finish Level 2 by the end of next week',
      done: false,
      createdAt: at(4, 9),
    },
    {
      id: 'demo-goal-2',
      text: 'Book a weekly mentor slot',
      done: true,
      createdAt: at(14, 9),
      doneAt: at(13, 9),
    },
  ]
  data.bookmarks = ['anthropic-ai-fluency', 'karpathy-llm-wiki']
  data.updatedAt = at(0, 10)
  data.settings.planStart = day(9)
  return data
}
