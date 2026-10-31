import { describe, expect, it } from 'vitest'
import { levels } from '../content'
import { planWeeks } from '../content/plan'
import { fresh } from '../test/fixtures'
import {
  currentPlanWeek,
  defaultPace,
  planEndDay,
  planMinutes,
  planPace,
  weekMinutes,
  weekWindow,
  weeklyTarget,
} from './schedule'

describe('study plan schedule', () => {
  it('runs eight plan weeks over 8 calendar weeks, or 12 at the light pace', () => {
    expect(planWeeks).toHaveLength(8)
    expect(weekWindow('2026-11-02', 'standard', 1)).toEqual({
      start: '2026-11-02',
      end: '2026-11-08',
    })
    expect(planEndDay('2026-11-02', 'standard')).toBe('2026-12-27')
    expect(weekWindow('2026-11-02', 'light', 2)).toEqual({
      start: '2026-11-12',
      end: '2026-11-22',
    })
    expect(planEndDay('2026-11-02', 'light')).toBe('2027-01-24')
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
    expect(weeklyTarget('light')).toBeLessThanOrEqual(7 * 60)
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
