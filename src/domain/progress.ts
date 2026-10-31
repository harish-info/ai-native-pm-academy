import type { Lesson, Level, LevelId, LevelProject, RubricDimension } from '../content/types'
import type { LearnerData, LessonRecord, ProjectRecord, QuizAttempt } from '../storage/schema'
import { computeOnboardingResult, requiredLessonIds, type LevelPath } from './assessment'

export const REFLECTION_MIN_CHARS = 40
export const QUIZ_PASS_RATIO = 0.8
export const PROJECT_PASS_AVERAGE = 3
export const PROJECT_MIN_DIMENSION = 2
export const MASTERY_BONUS_XP = 200
export const QUIZ_PASS_XP = 100
export const QUIZ_PERFECT_BONUS_XP = 50

export const rubricDimensions: { id: RubricDimension; label: string; question: string }[] = [
  {
    id: 'correctness',
    label: 'Correctness',
    question: 'Does it work and are its facts and figures right?',
  },
  {
    id: 'quality',
    label: 'Quality',
    question: 'Is it clear, well structured and useful to someone else?',
  },
  {
    id: 'independence',
    label: 'Independence',
    question: 'How much did you drive it versus follow steps?',
  },
  {
    id: 'judgment',
    label: 'Judgment and verification',
    question: 'Did you check the AI output and make sound trade-offs?',
  },
]

export const rubricScale = [
  { value: 1, label: 'Beginning' },
  { value: 2, label: 'Developing' },
  { value: 3, label: 'Solid' },
  { value: 4, label: 'Exemplary' },
]

export interface Requirements {
  checklist: boolean
  reflection: boolean
  artifact: boolean
  time: boolean
}

export function minutesLoggedFor(data: LearnerData, id: string): number {
  return data.studyLog.filter((e) => e.lessonId === id).reduce((s, e) => s + e.minutes, 0)
}

export function requirementsFor(
  item: { checklist?: { id: string }[] },
  record: LessonRecord | undefined,
  minutesLogged: number,
): Requirements {
  const items = item.checklist ?? []
  return {
    checklist: items.every((c) => record?.checklist[c.id] === true),
    reflection: (record?.reflection.trim().length ?? 0) >= REFLECTION_MIN_CHARS,
    artifact: (record?.artifact.trim().length ?? 0) > 0,
    time: minutesLogged > 0,
  }
}

export const allMet = (r: Requirements) => r.checklist && r.reflection && r.artifact && r.time

export function quizResults(data: LearnerData, levelId: LevelId) {
  const attempts = data.quizAttempts.filter((a) => a.levelId === levelId)
  let best: QuizAttempt | null = null
  let firstPass: QuizAttempt | null = null
  for (const a of [...attempts].sort((x, y) => x.at.localeCompare(y.at))) {
    if (!best || a.correct / a.total > best.correct / best.total) best = a
    if (!firstPass && a.correct / a.total >= QUIZ_PASS_RATIO) firstPass = a
  }
  return {
    attempts,
    best,
    bestRatio: best ? best.correct / best.total : null,
    passed: firstPass !== null,
    passedAt: firstPass?.at,
  }
}

export function projectResults(project: LevelProject, record: ProjectRecord | undefined) {
  const scores = rubricDimensions.map((d) => record?.rubric[d.id] ?? 0)
  const assessed = scores.every((s) => s > 0)
  const avg = assessed ? scores.reduce((a, b) => a + b, 0) / scores.length : 0
  const min = Math.min(...scores)
  const deliverablesDone = project.deliverables.filter((d) => record?.deliverables[d.id]).length
  const allDeliverables = deliverablesDone === project.deliverables.length
  const evidence = (record?.evidence.trim().length ?? 0) > 0
  const passed =
    assessed &&
    allDeliverables &&
    evidence &&
    avg >= PROJECT_PASS_AVERAGE &&
    min >= PROJECT_MIN_DIMENSION
  return {
    assessed,
    avg,
    min,
    deliverablesDone,
    allDeliverables,
    evidence,
    passed,
    assessedBy: record?.assessedBy ?? 'self',
    passedAt: passed ? record?.assessedAt : undefined,
  }
}

export interface LevelStatus {
  level: Level
  path: LevelPath
  unlocked: boolean
  requiredLessons: Lesson[]
  requiredDone: number
  coreDone: number
  quiz: ReturnType<typeof quizResults>
  project: ReturnType<typeof projectResults>
  mastered: boolean
  masteredAt?: string
}

export function levelPaths(data: LearnerData, levels: Level[]): Record<LevelId, LevelPath> {
  if (!data.onboarding) {
    return Object.fromEntries(levels.map((l) => [l.id, 'full'])) as Record<LevelId, LevelPath>
  }
  return computeOnboardingResult(data.onboarding, levels).path
}

export function levelStatuses(data: LearnerData, levels: Level[]): LevelStatus[] {
  const paths = levelPaths(data, levels)
  const out: LevelStatus[] = []
  for (const level of levels) {
    const prev = out[out.length - 1]
    const path = paths[level.id]
    const unlocked = !prev || prev.mastered || prev.path === 'proof-only'
    const required = new Set(requiredLessonIds(level, path))
    const requiredLessons = level.lessons.filter((l) => required.has(l.id))
    const requiredDone = requiredLessons.filter((l) => data.lessons[l.id]?.completedAt).length
    const coreDone = level.lessons.filter((l) => data.lessons[l.id]?.completedAt).length
    const quiz = quizResults(data, level.id)
    const project = projectResults(level.project, data.projects[String(level.id)])
    const recorded = data.masteredLevels[String(level.id)]
    const earned =
      unlocked && requiredDone === requiredLessons.length && quiz.passed && project.passed
    const mastered = earned || !!recorded
    let masteredAt: string | undefined = recorded
    if (earned && !recorded) {
      const times = [
        ...requiredLessons.map((l) => data.lessons[l.id]!.completedAt!),
        quiz.passedAt!,
        project.passedAt ?? '',
      ].filter(Boolean)
      masteredAt = times.sort().at(-1)
    }
    out.push({
      level,
      path,
      unlocked,
      requiredLessons,
      requiredDone,
      coreDone,
      quiz,
      project,
      mastered,
      masteredAt,
    })
  }
  return out
}

export function currentLevel(statuses: LevelStatus[]): LevelStatus {
  return statuses.find((s) => s.unlocked && !s.mastered) ?? statuses[statuses.length - 1]!
}

export interface XpBreakdown {
  lessons: number
  challenges: number
  quizzes: number
  projects: number
  mastery: number
  total: number
}

export function xpBreakdown(data: LearnerData, levels: Level[]): XpBreakdown {
  const statuses = levelStatuses(data, levels)
  let lessons = 0
  let challenges = 0
  let quizzes = 0
  let projects = 0
  let mastery = 0
  for (const s of statuses) {
    for (const l of s.level.lessons) if (data.lessons[l.id]?.completedAt) lessons += l.xp
    for (const c of s.level.challenges) if (data.challenges[c.id]?.completedAt) challenges += c.xp
    if (s.quiz.passed) quizzes += QUIZ_PASS_XP
    if (s.quiz.bestRatio === 1) quizzes += QUIZ_PERFECT_BONUS_XP
    if (s.project.passed) projects += s.level.project.xp
    if (s.mastered) mastery += MASTERY_BONUS_XP
  }
  return {
    lessons,
    challenges,
    quizzes,
    projects,
    mastery,
    total: lessons + challenges + quizzes + projects + mastery,
  }
}

export function maxXp(levels: Level[]): number {
  return levels.reduce(
    (sum, l) =>
      sum +
      l.lessons.reduce((s, x) => s + x.xp, 0) +
      l.challenges.reduce((s, x) => s + x.xp, 0) +
      QUIZ_PASS_XP +
      QUIZ_PERFECT_BONUS_XP +
      l.project.xp +
      MASTERY_BONUS_XP,
    0,
  )
}
