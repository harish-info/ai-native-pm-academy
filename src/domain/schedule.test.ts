import { describe, expect, it } from 'vitest'
import { allLessons, levels } from '../content'
import { planWeeks } from '../content/plan'
import { fresh } from '../test/fixtures'
import {
  currentPlanWeek,
  defaultPace,
  planEndDay,
  planFor,
  planMinutes,
  planPace,
  weekMinutes,
  weekWindow,
  weeklyTarget,
} from './schedule'

describe('study plan schedule', () => {
  it('runs 8 calendar weeks, or 12 at the light pace', () => {
    expect(planFor('standard')).toHaveLength(8)
    expect(planFor('light')).toHaveLength(12)
    expect(weekWindow('2026-11-02', 1)).toEqual({ start: '2026-11-02', end: '2026-11-08' })
    expect(weekWindow('2026-11-02', 2)).toEqual({ start: '2026-11-09', end: '2026-11-15' })
    expect(planEndDay('2026-11-02', 'standard')).toBe('2026-12-27')
    expect(planEndDay('2026-11-02', 'light')).toBe('2027-01-24')
  })

  it('keeps every item, in order, in the twelve light weeks, each ending with a review', () => {
    const notReview = (w: typeof planWeeks) =>
      w.flatMap((x) => x.items).filter((i) => i.kind !== 'review')
    const light = planFor('light')
    expect(notReview(light)).toEqual(notReview(planWeeks))
    for (const w of light) {
      expect(w.items.at(-1)?.kind, `week ${w.number}`).toBe('review')
      expect(w.items.length, `week ${w.number}`).toBeGreaterThan(1)
      expect(weekMinutes(w), `week ${w.number}`).toBeGreaterThanOrEqual(5 * 60)
      expect(weekMinutes(w), `week ${w.number}`).toBeLessThanOrEqual(9 * 60)
    }
    const lessons = light.flatMap((w) => w.items).filter((i) => i.kind === 'lesson')
    expect(lessons.map((i) => i.id)).toEqual(allLessons.map((l) => l.id))
  })

  it('finds the current plan week from any start day', () => {
    expect(currentPlanWeek('2026-11-04', 'standard', '2026-11-03')).toBe(0)
    expect(currentPlanWeek('2026-11-04', 'standard', '2026-11-04')).toBe(1)
    expect(currentPlanWeek('2026-11-04', 'standard', '2026-11-11')).toBe(2)
    expect(currentPlanWeek('2026-11-04', 'standard', '2027-01-01')).toBe(9)
  })

  it('keeps every week within a realistic load and the light pace near 7 hours', () => {
    for (const w of planWeeks)
      expect(weekMinutes(w), `week ${w.number}`).toBeLessThanOrEqual(11 * 60)
    expect(weeklyTarget('standard')).toBeLessThanOrEqual(10.5 * 60)
    // Twelve weekly reviews instead of eight put the light pace a few minutes over 7 hours.
    expect(weeklyTarget('light')).toBeLessThanOrEqual(7.25 * 60)
  })

  it('schedules each project in full and each quiz once', () => {
    for (const l of levels) {
      const parts = planWeeks
        .flatMap((w) => w.items)
        .filter((i) => i.kind === 'project' && i.levelId === l.id)
      expect(
        parts.reduce((s, i) => s + ('minutes' in i ? i.minutes : 0), 0),
        `L${l.id}`,
      ).toBe(l.project.minutes)
      const quizzes = planWeeks
        .flatMap((w) => w.items)
        .filter((i) => i.kind === 'quiz' && i.levelId === l.id)
      expect(quizzes).toHaveLength(1)
    }
    expect(planMinutes()).toBeGreaterThan(70 * 60)
  })

  it('names a mentor role every week', () => {
    for (const w of planWeeks) {
      expect(w.mentor.length, `week ${w.number}`).toBeGreaterThan(40)
      expect(w.items.some((i) => i.kind === 'mentor')).toBe(true)
    }
  })

  it('defaults to the light pace for six hours a week or less, and respects a choice', () => {
    const data = fresh()
    expect(defaultPace(data)).toBe('standard')
    data.onboarding = { profile: { hours: '6' }, selfRatings: {}, diagnostic: {}, completedAt: '' }
    expect(planPace(data)).toBe('light')
    data.settings.planPace = 'standard'
    expect(planPace(data)).toBe('standard')
  })
})
