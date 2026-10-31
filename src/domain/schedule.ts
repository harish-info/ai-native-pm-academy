import { lessonById, levelById } from '../content'
import { paces, planWeeks, type PlanItem, type PlanPace, type PlanWeek } from '../content/plan'
import type { LearnerData } from '../storage/schema'
import { addDays } from './dates'

/** Quizzes have no stored duration; budget about two minutes a question plus review time. */
export function quizMinutes(levelId: number): number {
  const n = levelById(levelId)?.quiz.length ?? 10
  return Math.max(15, Math.round((n * 2 + 10) / 5) * 5)
}

export function itemMinutes(item: PlanItem): number {
  switch (item.kind) {
    case 'lesson':
      return lessonById(item.id)?.minutes ?? 0
    case 'quiz':
      return quizMinutes(item.levelId)
    default:
      return item.minutes
  }
}

export const weekMinutes = (week: PlanWeek) =>
  week.items.reduce((sum, item) => sum + itemMinutes(item), 0)

export const planMinutes = () => planWeeks.reduce((sum, w) => sum + weekMinutes(w), 0)

/** Light pace for learners who said they have about 6 hours a week or less. */
export function defaultPace(data: LearnerData): PlanPace {
  const hours = Number(data.onboarding?.profile.hours)
  return hours > 0 && hours <= 6 ? 'light' : 'standard'
}

export const planPace = (data: LearnerData): PlanPace => data.settings.planPace ?? defaultPace(data)

/** First and last calendar day of a plan week, given the start day and pace. */
export function weekWindow(start: string, pace: PlanPace, week: number) {
  const span = paces[pace].daysPerPlanWeek
  return {
    start: addDays(start, Math.floor((week - 1) * span)),
    end: addDays(start, Math.floor(week * span) - 1),
  }
}

export const planEndDay = (start: string, pace: PlanPace) =>
  weekWindow(start, pace, planWeeks.length).end

/** The plan week containing `today`: 0 before the start, length + 1 after the end. */
export function currentPlanWeek(start: string, pace: PlanPace, today: string): number {
  if (today < start) return 0
  for (const w of planWeeks) if (today <= weekWindow(start, pace, w.number).end) return w.number
  return planWeeks.length + 1
}

/** Average planned minutes per calendar week at a pace. */
export const weeklyTarget = (pace: PlanPace) =>
  Math.round(planMinutes() / paces[pace].calendarWeeks)
