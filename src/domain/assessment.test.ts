import { describe, expect, it } from 'vitest'
import { levels } from '../content'
import { competencyIds } from '../content/competencies'
import { diagnosticQuestions } from '../content/onboarding'
import { levelStatuses } from './progress'
import { computeOnboardingResult, isDiagnosticCurrent, scoreDiagnostic } from './assessment'
import { completeLesson, fresh } from '../test/fixtures'

const ratings = Object.fromEntries(competencyIds.map((c) => [c, 2]))
const onboarding = (answers: Record<string, string>, hours = '14') => ({
  profile: { hours },
  selfRatings: ratings,
  diagnostic: answers,
  completedAt: '2026-11-01T09:00:00Z',
})
const allCorrect = Object.fromEntries(diagnosticQuestions.map((q) => [q.id, q.correct]))
const allUnsure = Object.fromEntries(diagnosticQuestions.map((q) => [q.id, 'unsure']))

describe('diagnostic', () => {
  it('counts "not sure" as wrong', () => {
    const scores = scoreDiagnostic(allUnsure)
    for (const c of competencyIds) expect(scores[c] ?? 0).toBe(0)
  })

  it('starts everyone at session 1, whatever they score', () => {
    for (const answers of [allUnsure, allCorrect]) {
      const r = computeOnboardingResult(onboarding(answers), levels)
      expect(r.firstLessonId).toBe(levels[0]!.lessons[0]!.id)
    }
  })

  it('calls a level strong only when every one of its scenarios is right', () => {
    expect(
      Object.values(computeOnboardingResult(onboarding(allCorrect), levels).levels).map(
        (l) => l.standing,
      ),
    ).toEqual(['strong', 'strong', 'strong', 'strong', 'strong'])
    const oneWrong = { ...allCorrect }
    const q = diagnosticQuestions.find((x) => x.level === 2)!
    oneWrong[q.id] = 'unsure'
    const r = computeOnboardingResult(onboarding(oneWrong), levels).levels
    expect(r[2]).toEqual({ correct: 2, total: 3, standing: 'partial' })
    expect(r[1]!.standing).toBe('strong')
    expect(computeOnboardingResult(onboarding(allUnsure), levels).levels[3]!.standing).toBe('new')
  })

  it('treats answers to retired questions as no diagnostic', () => {
    const old = onboarding({ d1: 'b', d2: 'c', d9: 'b' })
    expect(isDiagnosticCurrent(old)).toBe(false)
    expect(isDiagnosticCurrent(onboarding(allUnsure))).toBe(true)
    const data = fresh()
    data.onboarding = old
    expect(levelStatuses(data, levels).every((s) => s.standing === null)).toBe(true)
  })

  it('estimates weeks from the weekly hours answer', () => {
    const r = computeOnboardingResult(onboarding(allUnsure, '14'), levels)
    expect(r.weeklyHours).toBe(14)
    expect(r.estimatedWeeks).toBe(Math.ceil(r.estimatedMinutes / (14 * 60)))
  })

  it('does not open the next level or skip a session from the diagnostic alone', () => {
    const data = fresh()
    data.onboarding = onboarding(allCorrect)
    let s = levelStatuses(data, levels)
    expect(s[0]!.standing).toBe('strong')
    expect(s[0]!.requiredLessons).toEqual(levels[0]!.lessons)
    expect(s[1]!.unlocked).toBe(false)
    for (const l of levels[0]!.lessons) completeLesson(data, l.id)
    s = levelStatuses(data, levels)
    expect(s[1]!.unlocked).toBe(true)
    expect(s[0]!.mastered).toBe(false)
  })
})
