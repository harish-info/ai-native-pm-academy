import { describe, expect, it } from 'vitest'
import { fresh } from '../test/fixtures'
import { activeDays, activeWeeks, totalMinutes, weekDays, weeklySeries } from './stats'

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

describe('this week', () => {
  it('marks active days from Monday to Sunday', () => {
    const data = fresh()
    data.studyLog.push({ id: 'a', date: '2026-11-03', minutes: 30 })
    data.studyLog.push({ id: 'b', date: '2026-10-30', minutes: 30 })
    const days = weekDays(data, '2026-11-04')
    expect(days.map((d) => d.day)[0]).toBe('2026-11-02')
    expect(days.filter((d) => d.active).map((d) => d.day)).toEqual(['2026-11-03'])
    expect(days.find((d) => d.isToday)!.day).toBe('2026-11-04')
    expect(days.filter((d) => d.future)).toHaveLength(4)
  })
})
