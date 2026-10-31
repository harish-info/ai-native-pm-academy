import { describe, expect, it } from 'vitest'
import { fresh } from '../test/fixtures'
import { activeDays, activeWeeks, totalMinutes, weeklySeries } from './stats'

describe('weekly rhythm', () => {
  it('counts distinct active weeks, with gaps never resetting the count', () => {
    // Sunday 1 Nov is in the week of 26 Oct; 2 to 6 Nov is one week; 23 Nov after a two-week gap.
    const days = new Set(['2026-11-01', '2026-11-02', '2026-11-03', '2026-11-06', '2026-11-23'])
    expect(activeWeeks(days)).toBe(3)
    expect(activeWeeks(new Set())).toBe(0)
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
