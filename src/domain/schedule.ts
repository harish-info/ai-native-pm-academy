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

type Placed = { item: PlanItem; from: PlanWeek }

/**
 * Splits items, in order, into `count` runs whose minutes are as even as possible: the partition
 * with the smallest sum of squared differences from the average week.
 */
function balancedRuns(work: Placed[], count: number): Placed[][] {
  const n = work.length
  const prefix = [0]
  for (const x of work) prefix.push(prefix[prefix.length - 1]! + itemMinutes(x.item))
  const target = prefix[n]! / count
  const cost = (i: number, j: number) => (prefix[j]! - prefix[i]! - target) ** 2
  // best[k][j]: lowest cost of splitting the first j items into k runs; cut[k][j]: where run k starts.
  const best = Array.from({ length: count + 1 }, () => new Array<number>(n + 1).fill(Infinity))
  const cut = Array.from({ length: count + 1 }, () => new Array<number>(n + 1).fill(0))
  best[0]![0] = 0
  for (let k = 1; k <= count; k++)
    for (let j = k; j <= n; j++)
      for (let i = k - 1; i < j; i++) {
        const c = best[k - 1]![i]! + cost(i, j)
        if (c < best[k]![j]!) {
          best[k]![j] = c
          cut[k]![j] = i
        }
      }
  const runs: Placed[][] = []
  for (let k = count, j = n; k > 0; k--) {
    const i = cut[k]![j]!
    runs.unshift(work.slice(i, j))
    j = i
  }
  return runs
}

/**
 * The light pace: the same items in the same order, re-split by time into twelve calendar weeks,
 * each ending with a review. A week takes its title and goal from the standard week most of its
 * time comes from.
 */
function buildLightWeeks(): PlanWeek[] {
  const review = planWeeks.flatMap((w) => w.items).find((i) => i.kind === 'review')
  const work = planWeeks.flatMap((from) =>
    from.items.filter((i) => i.kind !== 'review').map((item) => ({ item, from })),
  )
  const titles = new Map<number, number>()
  return balancedRuns(work, paces.light.calendarWeeks).map((run, index) => {
    const minutes = new Map<PlanWeek, number>()
    for (const x of run) minutes.set(x.from, (minutes.get(x.from) ?? 0) + itemMinutes(x.item))
    const main = [...minutes].sort((a, b) => b[1] - a[1])[0]![0]
    const seen = titles.get(main.number) ?? 0
    titles.set(main.number, seen + 1)
    const levelIds = [
      ...new Set(
        run.flatMap(({ item }) =>
          item.kind === 'lesson'
            ? [lessonById(item.id)?.levelId ?? main.levelIds[0]!]
            : 'levelId' in item
              ? [item.levelId]
              : [],
        ),
      ),
    ].sort()
    return {
      number: index + 1,
      levelIds: levelIds.length ? levelIds : main.levelIds,
      title: seen ? `${main.title}, continued` : main.title,
      goal: main.goal,
      // Mentor notes are timed to the standard weeks, so here only the mentor rows show.
      mentor: '',
      items: review ? [...run.map((x) => x.item), review] : run.map((x) => x.item),
    }
  })
}

let lightWeeks: PlanWeek[] | undefined

/** The weeks of the plan at a pace: eight at the standard pace, twelve at the light pace. */
export function planFor(pace: PlanPace): PlanWeek[] {
  if (pace === 'standard') return planWeeks
  return (lightWeeks ??= buildLightWeeks())
}

export const planMinutes = (pace: PlanPace = 'standard') =>
  planFor(pace).reduce((sum, w) => sum + weekMinutes(w), 0)

/** Light pace for learners who said they have about 6 hours a week or less. */
export function defaultPace(data: LearnerData): PlanPace {
  const hours = Number(data.onboarding?.profile.hours)
  return hours > 0 && hours <= 6 ? 'light' : 'standard'
}

export const planPace = (data: LearnerData): PlanPace => data.settings.planPace ?? defaultPace(data)

/** First and last calendar day of a plan week, given the start day. */
export function weekWindow(start: string, week: number) {
  return { start: addDays(start, (week - 1) * 7), end: addDays(start, week * 7 - 1) }
}

export const planEndDay = (start: string, pace: PlanPace) =>
  weekWindow(start, planFor(pace).length).end

/** The plan week containing `today`: 0 before the start, length + 1 after the end. */
export function currentPlanWeek(start: string, pace: PlanPace, today: string): number {
  if (today < start) return 0
  const weeks = planFor(pace)
  for (const w of weeks) if (today <= weekWindow(start, w.number).end) return w.number
  return weeks.length + 1
}

/** Average planned minutes per calendar week at a pace. */
export const weeklyTarget = (pace: PlanPace) =>
  Math.round(planMinutes(pace) / paces[pace].calendarWeeks)
