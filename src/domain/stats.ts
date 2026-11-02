import { competencyIds } from '../content/competencies'
import type { CompetencyId, Level } from '../content/types'
import type { LearnerData } from '../storage/schema'
import { addDays, toDay, weekStart } from './dates'
import { levelStatuses } from './progress'

/** Days with real learning activity: logged study time, completions or quiz attempts. */
export function activeDays(data: LearnerData): Set<string> {
  const days = new Set<string>()
  for (const e of data.studyLog) days.add(e.date)
  for (const r of [...Object.values(data.lessons), ...Object.values(data.challenges)]) {
    if (r.completedAt) days.add(toDay(r.completedAt))
  }
  for (const a of data.quizAttempts) days.add(toDay(a.at))
  return days
}

/** Distinct calendar weeks (Monday start) with any learning activity. Breaks never reset it. */
export function activeWeeks(days: Set<string>): number {
  return new Set([...days].map(weekStart)).size
}

export interface WeekPoint {
  weekStart: string
  minutes: number
  sessions: number
}

export function weeklySeries(data: LearnerData, today: string, weeks = 8): WeekPoint[] {
  const thisWeek = weekStart(today)
  const points: WeekPoint[] = []
  for (let i = weeks - 1; i >= 0; i--) {
    points.push({ weekStart: addDays(thisWeek, -7 * i), minutes: 0, sessions: 0 })
  }
  const index = new Map(points.map((p) => [p.weekStart, p]))
  for (const e of data.studyLog) {
    const p = index.get(weekStart(e.date))
    if (p) p.minutes += e.minutes
  }
  for (const r of [...Object.values(data.lessons), ...Object.values(data.challenges)]) {
    if (!r.completedAt) continue
    const p = index.get(weekStart(toDay(r.completedAt)))
    if (p) p.sessions++
  }
  return points
}

export function totalMinutes(data: LearnerData): number {
  return data.studyLog.reduce((s, e) => s + e.minutes, 0)
}

export interface Overview {
  coreDone: number
  coreTotal: number
  challengesDone: number
  challengesTotal: number
  projectsPassed: number
  quizzesPassed: number
  levelsMastered: number
  completionPct: number
  remainingMinutes: number
  minutes: number
}

export function overview(data: LearnerData, levels: Level[]): Overview {
  const statuses = levelStatuses(data, levels)
  const lessons = levels.flatMap((l) => l.lessons)
  const challenges = levels.flatMap((l) => l.challenges)
  const coreDone = lessons.filter((l) => data.lessons[l.id]?.completedAt).length
  const challengesDone = challenges.filter((c) => data.challenges[c.id]?.completedAt).length
  const projectsPassed = statuses.filter((s) => s.project.passed).length
  const quizzesPassed = statuses.filter((s) => s.quiz.passed).length
  const units = lessons.length + levels.length * 2
  const completionPct = Math.round(((coreDone + projectsPassed + quizzesPassed) / units) * 100)
  let remainingMinutes = 0
  for (const s of statuses) {
    if (s.mastered) continue
    remainingMinutes += s.requiredLessons
      .filter((l) => !data.lessons[l.id]?.completedAt)
      .reduce((sum, l) => sum + l.minutes, 0)
    if (!s.project.passed) remainingMinutes += s.level.project.minutes
    if (!s.quiz.passed) remainingMinutes += 20
  }
  return {
    coreDone,
    coreTotal: lessons.length,
    challengesDone,
    challengesTotal: challenges.length,
    projectsPassed,
    quizzesPassed,
    levelsMastered: statuses.filter((s) => s.mastered).length,
    completionPct,
    remainingMinutes,
    minutes: totalMinutes(data),
  }
}

/**
 * Coursework evidence per competency: completed core lessons that develop it, plus correct answers
 * to its questions in the best attempt of each level quiz. Unattempted work counts as zero.
 */
export function competencyEvidence(
  data: LearnerData,
  levels: Level[],
): Record<CompetencyId, number> {
  const statuses = levelStatuses(data, levels)
  const done = Object.fromEntries(competencyIds.map((c) => [c, 0])) as Record<CompetencyId, number>
  const total = { ...done }
  for (const level of levels) {
    for (const lesson of level.lessons) {
      for (const c of lesson.competencies) {
        total[c]++
        if (data.lessons[lesson.id]?.completedAt) done[c]++
      }
    }
    const best = statuses.find((s) => s.level.id === level.id)?.quiz.best
    for (const q of level.quiz) {
      total[q.competency]++
      if (best && best.answers[q.id] === q.correct) done[q.competency]++
    }
  }
  const out = {} as Record<CompetencyId, number>
  for (const c of competencyIds) out[c] = total[c] ? Math.round((done[c] / total[c]) * 100) : 0
  return out
}

export type TimelineEvent = {
  at: string
  kind: 'onboarding' | 'lesson' | 'challenge' | 'quiz' | 'project' | 'mastery' | 'weekly'
  title: string
  detail?: string
  href?: string
}

export function timeline(data: LearnerData, levels: Level[]): TimelineEvent[] {
  const events: TimelineEvent[] = []
  if (data.onboarding) {
    events.push({
      at: data.onboarding.completedAt,
      kind: 'onboarding',
      title: 'Completed the skills check',
      href: '/onboarding/result',
    })
  }
  for (const level of levels) {
    for (const l of level.lessons) {
      const r = data.lessons[l.id]
      if (r?.completedAt) {
        events.push({
          at: r.completedAt,
          kind: 'lesson',
          title: `Session ${l.number}: ${l.title}`,
          detail: r.reflection.slice(0, 220),
          href: `/lessons/${l.id}`,
        })
      }
    }
    for (const c of level.challenges) {
      const r = data.challenges[c.id]
      if (r?.completedAt) {
        events.push({
          at: r.completedAt,
          kind: 'challenge',
          title: `Stretch challenge: ${c.title}`,
          detail: r.reflection.slice(0, 220),
          href: `/challenges/${c.id}`,
        })
      }
    }
  }
  for (const a of data.quizAttempts) {
    const pct = Math.round((a.correct / a.total) * 100)
    events.push({
      at: a.at,
      kind: 'quiz',
      title: `Level ${a.levelId} assessment: ${pct}%`,
      detail: pct >= 80 ? 'Passed' : 'Below the 80% pass mark',
      href: `/levels/${a.levelId}/quiz`,
    })
  }
  for (const s of levelStatuses(data, levels)) {
    const p = data.projects[String(s.level.id)]
    if (p?.assessedAt) {
      events.push({
        at: p.assessedAt,
        kind: 'project',
        title: `${s.level.project.title} assessed (${p.assessedBy === 'mentor' ? 'mentor' : 'self'})`,
        detail: s.project.assessed ? `Rubric average ${s.project.avg.toFixed(1)} of 4` : undefined,
        href: `/levels/${s.level.id}/project`,
      })
    }
    if (s.masteredAt) {
      events.push({
        at: s.masteredAt,
        kind: 'mastery',
        title: `Level ${s.level.id} mastered: ${s.level.badge.name}`,
        href: `/levels/${s.level.id}`,
      })
    }
  }
  for (const n of data.notes.filter((x) => x.kind === 'weekly')) {
    events.push({
      at: n.createdAt,
      kind: 'weekly',
      title: `Weekly reflection: ${n.title}`,
      detail: n.body.slice(0, 220),
      href: '/workspace',
    })
  }
  return events.sort((a, b) => b.at.localeCompare(a.at))
}

/** Monday to Sunday of the week containing `today`, with whether each day had learning activity. */
export function weekDays(data: LearnerData, today: string) {
  const days = activeDays(data)
  const monday = weekStart(today)
  return Array.from({ length: 7 }, (_, i) => {
    const day = addDays(monday, i)
    return { day, active: days.has(day), isToday: day === today, future: day > today }
  })
}
