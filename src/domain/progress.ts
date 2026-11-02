import type { Lesson, Level, LevelId, LevelProject, RubricDimension } from '../content/types'
import type { LearnerData, LessonRecord, ProjectRecord, QuizAttempt } from '../storage/schema'
import { isDiagnosticCurrent, levelStandings, type Standing } from './assessment'

export const REFLECTION_MIN_CHARS = 40
export const QUIZ_PASS_RATIO = 0.8
export const PROJECT_PASS_AVERAGE = 3
export const PROJECT_MIN_DIMENSION = 2
export const MASTERY_BONUS_XP = 200
export const QUIZ_PASS_XP = 100
export const QUIZ_PERFECT_BONUS_XP = 50
/** In these levels a project counts only when a mentor assessed it, if the learner said she has one. */
export const MENTOR_SIGNOFF_LEVELS: LevelId[] = [4, 5]

export function needsMentorSignoff(data: LearnerData, levelId: LevelId): boolean {
  const mentor = data.onboarding?.profile.mentor
  return MENTOR_SIGNOFF_LEVELS.includes(levelId) && (mentor === 'yes' || mentor === 'sometimes')
}

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

export function projectResults(
  project: LevelProject,
  record: ProjectRecord | undefined,
  requireMentor = false,
) {
  const scores = rubricDimensions.map((d) => record?.rubric[d.id] ?? 0)
  const assessed = scores.every((s) => s > 0)
  const avg = assessed ? scores.reduce((a, b) => a + b, 0) / scores.length : 0
  const min = Math.min(...scores)
  const deliverablesDone = project.deliverables.filter((d) => record?.deliverables[d.id]).length
  const allDeliverables = deliverablesDone === project.deliverables.length
  const evidence = (record?.evidence.trim().length ?? 0) > 0
  const mentorMissing = requireMentor && record?.assessedBy !== 'mentor'
  const passed =
    assessed &&
    allDeliverables &&
    evidence &&
    !mentorMissing &&
    avg >= PROJECT_PASS_AVERAGE &&
    min >= PROJECT_MIN_DIMENSION
  return {
    assessed,
    avg,
    min,
    deliverablesDone,
    allDeliverables,
    evidence,
    requireMentor,
    mentorMissing,
    passed,
    assessedBy: record?.assessedBy ?? 'self',
    passedAt: passed ? record?.assessedAt : undefined,
  }
}

/** Project results for a level, applying the mentor sign-off rule. */
export const levelProjectResults = (data: LearnerData, level: Level) =>
  projectResults(level.project, data.projects[String(level.id)], needsMentorSignoff(data, level.id))

export interface LevelStatus {
  level: Level
  /** Diagnostic result for this level, or null without a current diagnostic. Never unlocks anything. */
  standing: Standing | null
  unlocked: boolean
  requiredLessons: Lesson[]
  requiredDone: number
  coreDone: number
  quiz: ReturnType<typeof quizResults>
  project: ReturnType<typeof projectResults>
  mastered: boolean
  masteredAt?: string
}

export function diagnosticStandings(
  data: LearnerData,
  levels: Level[],
): Record<LevelId, Standing> | null {
  if (!data.onboarding || !isDiagnosticCurrent(data.onboarding)) return null
  const out = levelStandings(
    data.onboarding.diagnostic,
    levels.map((l) => l.id),
  )
  return Object.fromEntries(levels.map((l) => [l.id, out[l.id].standing])) as Record<
    LevelId,
    Standing
  >
}

export function levelStatuses(data: LearnerData, levels: Level[]): LevelStatus[] {
  const standings = diagnosticStandings(data, levels)
  const out: LevelStatus[] = []
  for (const level of levels) {
    const prev = out[out.length - 1]
    // A level opens once the previous level's sessions are done, so its project can finish while
    // the next level starts. The diagnostic never opens a level.
    const unlocked =
      !prev || prev.mastered || (prev.unlocked && prev.requiredDone === prev.requiredLessons.length)
    const requiredLessons = level.lessons
    const requiredDone = requiredLessons.filter((l) => data.lessons[l.id]?.completedAt).length
    const coreDone = level.lessons.filter((l) => data.lessons[l.id]?.completedAt).length
    const quiz = quizResults(data, level.id)
    const project = levelProjectResults(data, level)
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
      standing: standings?.[level.id] ?? null,
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

/** The level to work on: the first open level with sessions left, else the first one not mastered. */
export function currentLevel(statuses: LevelStatus[]): LevelStatus {
  return (
    statuses.find((s) => s.unlocked && s.requiredDone < s.requiredLessons.length) ??
    statuses.find((s) => s.unlocked && !s.mastered) ??
    statuses[statuses.length - 1]!
  )
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

/** XP earned at or after `from` (an ISO timestamp or a day). Uses the time each award was earned. */
export function xpSince(data: LearnerData, levels: Level[], from: string): number {
  const statuses = levelStatuses(data, levels)
  const after = (at: string | undefined) => !!at && at >= from
  let xp = 0
  for (const s of statuses) {
    for (const l of s.level.lessons) if (after(data.lessons[l.id]?.completedAt)) xp += l.xp
    for (const c of s.level.challenges) if (after(data.challenges[c.id]?.completedAt)) xp += c.xp
    if (after(s.quiz.passedAt)) xp += QUIZ_PASS_XP
    const perfect = s.quiz.attempts
      .filter((a) => a.correct === a.total)
      .map((a) => a.at)
      .sort()[0]
    if (after(perfect)) xp += QUIZ_PERFECT_BONUS_XP
    if (after(s.project.passedAt)) xp += s.level.project.xp
    if (after(s.masteredAt)) xp += MASTERY_BONUS_XP
  }
  return xp
}

/** The steps that earn a level's badge: its required sessions, then the assessment, then the project. */
export function levelSteps(s: LevelStatus, data: LearnerData) {
  return [
    ...s.requiredLessons.map((l) => ({
      key: l.id,
      kind: 'lesson' as const,
      label: `Session ${l.number}: ${l.title}`,
      short: String(l.number),
      to: `/lessons/${l.id}`,
      done: !!data.lessons[l.id]?.completedAt,
    })),
    {
      key: 'quiz',
      kind: 'quiz' as const,
      label: `Level ${s.level.id} assessment`,
      short: 'Quiz',
      to: `/levels/${s.level.id}/quiz`,
      done: s.quiz.passed,
    },
    {
      key: 'project',
      kind: 'project' as const,
      label: s.level.project.title,
      short: 'Project',
      to: `/levels/${s.level.id}/project`,
      done: s.project.passed,
    },
  ]
}
