import { describe, expect, it } from 'vitest'
import { levels } from '../content'
import { completeLesson, fresh, level, masterLevel, passProject, passQuiz } from '../test/fixtures'
import {
  MASTERY_BONUS_XP,
  QUIZ_PASS_XP,
  QUIZ_PERFECT_BONUS_XP,
  allMet,
  currentLevel,
  levelStatuses,
  projectResults,
  quizResults,
  requirementsFor,
  xpBreakdown,
} from './progress'

describe('lesson requirements', () => {
  const item = { checklist: [{ id: 'a' }, { id: 'b' }] }

  it('needs every checklist item, a 40 character reflection, an artifact and logged time', () => {
    const record = {
      checklist: { a: true, b: true },
      reflection: 'x'.repeat(40),
      artifact: 'file.md',
    }
    expect(allMet(requirementsFor(item, record, 15))).toBe(true)
  })

  it('fails each requirement independently', () => {
    const record = { checklist: { a: true }, reflection: ' '.repeat(50) + 'short', artifact: '  ' }
    expect(requirementsFor(item, record, 0)).toEqual({
      checklist: false,
      reflection: false,
      artifact: false,
      time: false,
    })
  })
})

describe('quiz scoring', () => {
  it('passes at exactly 80% and records the first passing attempt', () => {
    const data = fresh()
    data.quizAttempts.push({
      id: 'a',
      levelId: 1,
      answers: {},
      correct: 7,
      total: 10,
      at: '2026-11-01T10:00:00Z',
    })
    data.quizAttempts.push({
      id: 'b',
      levelId: 1,
      answers: {},
      correct: 8,
      total: 10,
      at: '2026-11-02T10:00:00Z',
    })
    data.quizAttempts.push({
      id: 'c',
      levelId: 1,
      answers: {},
      correct: 10,
      total: 10,
      at: '2026-11-03T10:00:00Z',
    })
    const r = quizResults(data, 1)
    expect(r.passed).toBe(true)
    expect(r.passedAt).toBe('2026-11-02T10:00:00Z')
    expect(r.bestRatio).toBe(1)
  })

  it('does not pass below 80%', () => {
    const data = fresh()
    data.quizAttempts.push({
      id: 'a',
      levelId: 1,
      answers: {},
      correct: 79,
      total: 100,
      at: '2026-11-01T10:00:00Z',
    })
    expect(quizResults(data, 1).passed).toBe(false)
  })
})

describe('project scoring', () => {
  const project = level(1).project
  const record = (rubric: [number, number, number, number], evidence = 'link') => ({
    deliverables: Object.fromEntries(project.deliverables.map((d) => [d.id, true])),
    evidence,
    rubric: {
      correctness: rubric[0],
      quality: rubric[1],
      independence: rubric[2],
      judgment: rubric[3],
    },
    assessedBy: 'self' as const,
    mentorName: '',
    notes: '',
    assessedAt: '2026-11-07T10:00:00Z',
  })

  it('passes with an average of 3 and no dimension below 2', () => {
    expect(projectResults(project, record([4, 2, 3, 3])).passed).toBe(true)
  })

  it('fails when any dimension is below 2, even with a high average', () => {
    expect(projectResults(project, record([4, 4, 4, 1])).passed).toBe(false)
  })

  it('fails when unassessed, missing evidence or missing a deliverable', () => {
    expect(projectResults(project, record([0, 4, 4, 4])).passed).toBe(false)
    expect(projectResults(project, record([3, 3, 3, 3], '  ')).passed).toBe(false)
    const partial = record([3, 3, 3, 3])
    partial.deliverables[project.deliverables[0]!.id] = false
    expect(projectResults(project, partial).passed).toBe(false)
  })

  it('requires the wiki milestone deliverable', () => {
    expect(project.deliverables.some((d) => d.id === 'wiki-milestone')).toBe(true)
  })
})

describe('unlocking and mastery', () => {
  it('starts with only level 1 unlocked', () => {
    const s = levelStatuses(fresh(), levels)
    expect(s.map((x) => x.unlocked)).toEqual([true, false, false, false, false])
  })

  it('unlocks the next level once the previous sessions are done, before mastery', () => {
    const data = fresh()
    const [first, ...rest] = level(1).lessons
    completeLesson(data, first!.id)
    expect(levelStatuses(data, levels)[1]!.unlocked).toBe(false)
    for (const l of rest) completeLesson(data, l.id)
    let s = levelStatuses(data, levels)
    expect(s[0]!.mastered).toBe(false)
    expect(s[1]!.unlocked).toBe(true)
    expect(s[2]!.unlocked).toBe(false)
    expect(currentLevel(s).level.id).toBe(2)
    passQuiz(data, 1)
    passProject(data, 1)
    s = levelStatuses(data, levels)
    expect(s[0]!.mastered).toBe(true)
    expect(s[2]!.unlocked).toBe(false)
  })

  it('points back to an open project once every open level has its sessions done', () => {
    const data = fresh()
    for (const l of level(1).lessons) completeLesson(data, l.id)
    for (const l of level(2).lessons) completeLesson(data, l.id)
    masterLevel(data, 2)
    expect(currentLevel(levelStatuses(data, levels)).level.id).toBe(3)
    for (const l of level(3).lessons) completeLesson(data, l.id)
    for (const l of level(4).lessons) completeLesson(data, l.id)
    for (const l of level(5).lessons) completeLesson(data, l.id)
    expect(currentLevel(levelStatuses(data, levels)).level.id).toBe(1)
  })

  it('needs mentor sign-off on the level 4 and 5 projects when the learner has a mentor', () => {
    const data = fresh()
    for (const id of [1, 2, 3] as const) masterLevel(data, id)
    masterLevel(data, 4)
    expect(levelStatuses(data, levels)[3]!.mastered).toBe(true)
    data.onboarding = {
      profile: { mentor: 'yes' },
      selfRatings: {},
      diagnostic: {},
      completedAt: '2026-11-01T09:00:00.000Z',
    }
    let s = levelStatuses(data, levels)
    expect(s[3]!.project.mentorMissing).toBe(true)
    expect(s[3]!.mastered).toBe(false)
    expect(s[0]!.mastered).toBe(true)
    data.projects['4']!.assessedBy = 'mentor'
    s = levelStatuses(data, levels)
    expect(s[3]!.mastered).toBe(true)
  })

  it('does not master a level whose quiz is below 80%', () => {
    const data = fresh()
    for (const l of level(1).lessons) completeLesson(data, l.id)
    passQuiz(data, 1, Math.floor(level(1).quiz.length * 0.8) - 1)
    passProject(data, 1)
    expect(levelStatuses(data, levels)[0]!.mastered).toBe(false)
  })

  it('cannot master a locked level even with all the evidence', () => {
    const data = fresh()
    masterLevel(data, 2)
    expect(levelStatuses(data, levels)[1]!.mastered).toBe(false)
  })
})

describe('xp', () => {
  it('adds lesson, quiz, perfect bonus, project and mastery xp', () => {
    const data = fresh()
    masterLevel(data, 1)
    const l1 = level(1)
    const xp = xpBreakdown(data, levels)
    expect(xp.lessons).toBe(l1.lessons.reduce((s, l) => s + l.xp, 0))
    expect(xp.quizzes).toBe(QUIZ_PASS_XP + QUIZ_PERFECT_BONUS_XP)
    expect(xp.projects).toBe(l1.project.xp)
    expect(xp.mastery).toBe(MASTERY_BONUS_XP)
    expect(xp.total).toBe(xp.lessons + xp.challenges + xp.quizzes + xp.projects + xp.mastery)
  })

  it('is zero for a new learner', () => {
    expect(xpBreakdown(fresh(), levels).total).toBe(0)
  })
})

describe('sticky mastery', () => {
  it('keeps a recorded mastery after evidence is edited', () => {
    const data = fresh()
    masterLevel(data, 1)
    data.masteredLevels['1'] = '2026-11-07T10:00:00.000Z'
    delete data.projects['1']
    const s = levelStatuses(data, levels)
    expect(s[0]!.mastered).toBe(true)
    expect(s[0]!.masteredAt).toBe('2026-11-07T10:00:00.000Z')
    expect(s[1]!.unlocked).toBe(true)
  })
})
