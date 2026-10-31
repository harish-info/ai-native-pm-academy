import type { Level } from '../content/types'
import type { LearnerData } from '../storage/schema'
import { toDay } from './dates'
import { levelStatuses } from './progress'
import { activeDays, activeWeeks, totalMinutes } from './stats'

export interface Achievement {
  id: string
  title: string
  description: string
  kind: 'badge' | 'milestone'
  unlocked: boolean
  unlockedAt?: string
  progress?: { value: number; target: number }
}

const sortedTimes = (xs: (string | undefined)[]) => xs.filter((x): x is string => !!x).sort()

export function achievements(data: LearnerData, levels: Level[]): Achievement[] {
  const statuses = levelStatuses(data, levels)
  const lessonTimes = sortedTimes(
    levels.flatMap((l) => l.lessons.map((x) => data.lessons[x.id]?.completedAt)),
  )
  const challengeTimes = sortedTimes(Object.values(data.challenges).map((r) => r.completedAt))
  const reflections =
    lessonTimes.length +
    challengeTimes.length +
    data.notes.filter((n) => n.kind === 'reflection' || n.kind === 'weekly').length
  const minutes = totalMinutes(data)
  const weeks = activeWeeks(activeDays(data))
  const perfect = sortedTimes(
    data.quizAttempts.filter((a) => a.correct === a.total).map((a) => a.at),
  )
  const projectPasses = sortedTimes(statuses.map((s) => s.project.passedAt))
  const mentorReviewed = statuses.find((s) => s.project.passed && s.project.assessedBy === 'mentor')
  const totalChallenges = levels.reduce((n, l) => n + l.challenges.length, 0)

  const badges: Achievement[] = statuses.map((s) => ({
    id: `level-${s.level.id}`,
    title: s.level.badge.name,
    description: s.level.badge.description,
    kind: 'badge',
    unlocked: s.mastered,
    unlockedAt: s.masteredAt,
    progress: {
      value: s.requiredDone + (s.quiz.passed ? 1 : 0) + (s.project.passed ? 1 : 0),
      target: s.requiredLessons.length + 2,
    },
  }))

  const milestone = (
    id: string,
    title: string,
    description: string,
    unlocked: boolean,
    unlockedAt?: string,
    progress?: { value: number; target: number },
  ): Achievement => ({
    id,
    title,
    description,
    kind: 'milestone',
    unlocked,
    unlockedAt: unlocked ? unlockedAt : undefined,
    progress,
  })

  return [
    ...badges,
    milestone(
      'diagnostic',
      'Baseline set',
      'Completed the skills diagnostic.',
      !!data.onboarding,
      data.onboarding?.completedAt,
    ),
    milestone(
      'first-session',
      'First artifact',
      'Completed your first core session with evidence.',
      lessonTimes.length > 0,
      lessonTimes[0],
    ),
    milestone(
      'reflective',
      'Reflective practitioner',
      'Wrote ten reflections across sessions and weekly reviews.',
      reflections >= 10,
      undefined,
      { value: Math.min(reflections, 10), target: 10 },
    ),
    milestone(
      'steady-weeks',
      'Steady rhythm',
      'Learned in four different weeks. Missed days and weeks never reset it.',
      weeks >= 4,
      undefined,
      { value: Math.min(weeks, 4), target: 4 },
    ),
    milestone(
      'ten-hours',
      'Ten focused hours',
      'Logged ten hours of confirmed study time.',
      minutes >= 600,
      undefined,
      { value: Math.min(minutes, 600), target: 600 },
    ),
    milestone(
      'perfect-quiz',
      'Personal best: 100%',
      'Scored 100% on a level assessment.',
      perfect.length > 0,
      perfect[0],
    ),
    milestone(
      'first-project',
      'Shipped a project',
      'Passed a level project rubric.',
      projectPasses.length > 0,
      projectPasses[0],
    ),
    milestone(
      'mentor-reviewed',
      'Reviewed by a mentor',
      'A mentor assessed one of your passing projects.',
      !!mentorReviewed,
      mentorReviewed?.project.passedAt,
    ),
    milestone(
      'stretch',
      'Stretch',
      'Completed an optional stretch challenge.',
      challengeTimes.length > 0,
      challengeTimes[0],
    ),
    milestone(
      'all-stretch',
      'Beyond the core',
      'Completed all ten stretch challenges.',
      challengeTimes.length >= totalChallenges,
      challengeTimes[totalChallenges - 1],
      { value: challengeTimes.length, target: totalChallenges },
    ),
    milestone(
      'core-complete',
      'Core path complete',
      'Completed all 20 core sessions.',
      lessonTimes.length >= 20,
      lessonTimes[19],
      { value: lessonTimes.length, target: 20 },
    ),
    milestone(
      'backed-up',
      'Safe keeping',
      'Exported a backup of your progress.',
      !!data.settings.lastBackupAt,
      data.settings.lastBackupAt,
    ),
  ]
}

export const unlockedIds = (list: Achievement[]) =>
  new Set(list.filter((a) => a.unlocked).map((a) => a.id))

export const today = () => toDay(new Date())

export function progressText(a: Achievement): string {
  if (!a.progress) return ''
  if (a.id === 'ten-hours') {
    return `${Math.floor(a.progress.value / 60)} of ${a.progress.target / 60} hours`
  }
  if (a.kind === 'badge') return `${a.progress.value} of ${a.progress.target} steps`
  return `${a.progress.value} of ${a.progress.target}`
}

/** The locked achievements closest to unlocking: the current level badge first, then by progress. */
export function closestRewards(list: Achievement[], currentLevelId: number, n = 3): Achievement[] {
  const ratio = (a: Achievement) => (a.progress ? a.progress.value / a.progress.target : -1)
  const locked = list.filter((a) => !a.unlocked)
  const badge = locked.find((a) => a.id === `level-${currentLevelId}`)
  const rest = locked.filter((a) => a.kind === 'milestone').sort((x, y) => ratio(y) - ratio(x))
  return [...(badge ? [badge] : []), ...rest].slice(0, n)
}
