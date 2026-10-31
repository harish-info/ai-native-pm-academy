import { describe, expect, it } from 'vitest'
import { fresh } from '../test/fixtures'
import { activeDays, currentStreak, longestStreak, totalMinutes, weeklySeries } from './stats'

describe('streaks', () => {
  const days = new Set(['2026-11-01', '2026-11-02', '2026-11-03', '2026-11-05', '2026-11-06'])

  it('counts the current streak ending today or yesterday', () => {
    expect(currentStreak(days, '2026-11-06')).toBe(2)
    expect(currentStreak(days, '2026-11-07')).toBe(2)
    expect(currentStreak(days, '2026-11-08')).toBe(0)
  })

  it('finds the longest streak', () => {
    expect(longestStreak(days)).toBe(3)
    expect(longestStreak(new Set())).toBe(0)
  })
})

describe('activity', () => {
  it('builds weekly minutes and totals from the study log', () => {
    const data = fresh()
    data.studyLog.push({ id: 'a', date: '2026-11-02', minutes: 30 })
    data.studyLog.push({ id: 'b', date: '2026-11-04', minutes: 45 })
    data.studyLog.push({ id: 'c', date: '2026-10-28', minutes: 20 })
    const weeks = weeklySeries(data, '2026-11-05', 2)
    expect(weeks).toHaveLength(2)
    expect(weeks.at(-1)!.minutes).toBe(75)
    expect(weeks[0]!.minutes).toBe(20)
    expect(totalMinutes(data)).toBe(95)
    expect(activeDays(data).size).toBe(3)
  })
})
