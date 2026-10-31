import { describe, expect, it } from 'vitest'
import { levels } from '../content'
import { competencyIds } from '../content/competencies'
import { diagnosticQuestions, levelCompetencies, maxTestOutLevel } from '../content/onboarding'
import { levelStatuses } from './progress'
import {
  computeOnboardingResult,
  requiredLessonIds,
  scoreDiagnostic,
  testedOutLevels,
} from './assessment'
import { fresh } from '../test/fixtures'

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

  it('starts a beginner at level 1 on the full path', () => {
    const r = computeOnboardingResult(onboarding(allUnsure), levels)
    expect(r.startLevel).toBe(1)
    expect(Object.values(r.path).every((p) => p === 'full')).toBe(true)
    expect(r.firstLessonId).toBe(levels[0]!.lessons[0]!.id)
  })

  it('caps test-out at the maximum level, never beyond', () => {
    const r = computeOnboardingResult(onboarding(allCorrect), levels)
    expect(r.startLevel).toBe(maxTestOutLevel + 1)
    for (const l of levels)
      expect(r.path[l.id]).toBe(l.id <= maxTestOutLevel ? 'proof-only' : 'full')
  })

  it('only tests out consecutive levels from level 1', () => {
    const demonstrated = Object.fromEntries(competencyIds.map((c) => [c, 100])) as Record<
      string,
      number
    >
    for (const c of levelCompetencies[1]) demonstrated[c] = 0
    expect(testedOutLevels(demonstrated as never)).toEqual([])
  })

  it('keeps practical-proof and safety-critical sessions required on the proof-only path', () => {
    for (const l of levels) {
      const ids = requiredLessonIds(l, 'proof-only')
      for (const lesson of l.lessons) {
        if (lesson.practicalProof || lesson.safetyCritical) expect(ids).toContain(lesson.id)
      }
    }
  })

  it('estimates weeks from the weekly hours answer', () => {
    const r = computeOnboardingResult(onboarding(allUnsure, '14'), levels)
    expect(r.weeklyHours).toBe(14)
    expect(r.estimatedWeeks).toBe(Math.ceil(r.estimatedMinutes / (14 * 60)))
  })

  it('unlocks the level after a proof-only level without mastering it', () => {
    const data = fresh()
    data.onboarding = onboarding(allCorrect)
    const s = levelStatuses(data, levels)
    expect(s.slice(0, maxTestOutLevel + 1).every((x) => x.unlocked)).toBe(true)
    expect(s[maxTestOutLevel + 1]?.unlocked ?? false).toBe(false)
  })
})
