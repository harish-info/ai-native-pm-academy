import { competencyIds } from '../content/competencies'
import { diagnosticQuestions } from '../content/onboarding'
import type { CompetencyId, Level, LevelId } from '../content/types'
import type { Onboarding } from '../storage/schema'

/** How the learner did on one level's scenarios. Everyone still starts at Session 1. */
export type Standing = 'strong' | 'partial' | 'new'

export interface LevelStanding {
  correct: number
  total: number
  standing: Standing
}

export interface OnboardingResult {
  demonstrated: Record<CompetencyId, number | null>
  selfRated: Record<CompetencyId, number | null>
  levels: Record<LevelId, LevelStanding>
  weakAreas: CompetencyId[]
  confidenceGaps: CompetencyId[]
  estimatedMinutes: number
  weeklyHours: number
  estimatedWeeks: number
  firstLessonId: string
  firstProject: string
}

/** Percentage of diagnostic questions answered correctly per competency. "Not sure" counts as wrong. */
export function scoreDiagnostic(
  answers: Record<string, string>,
): Record<CompetencyId, number | null> {
  const out = {} as Record<CompetencyId, number | null>
  for (const c of competencyIds) {
    const qs = diagnosticQuestions.filter((q) => q.competency === c)
    out[c] = qs.length
      ? Math.round((qs.filter((q) => answers[q.id] === q.correct).length / qs.length) * 100)
      : null
  }
  return out
}

/** True when the saved answers cover the current questions. Answers to retired questions do not. */
export function isDiagnosticCurrent(onboarding: Onboarding): boolean {
  return diagnosticQuestions.every((q) => q.id in onboarding.diagnostic)
}

/** Correct answers per level. Strong means every scenario for that level was right. */
export function levelStandings(
  answers: Record<string, string>,
  levelIds: LevelId[],
): Record<LevelId, LevelStanding> {
  const out = {} as Record<LevelId, LevelStanding>
  for (const id of levelIds) {
    const qs = diagnosticQuestions.filter((q) => q.level === id)
    const correct = qs.filter((q) => answers[q.id] === q.correct).length
    const standing: Standing =
      qs.length > 0 && correct === qs.length ? 'strong' : correct > 0 ? 'partial' : 'new'
    out[id] = { correct, total: qs.length, standing }
  }
  return out
}

export function computeOnboardingResult(onboarding: Onboarding, levels: Level[]): OnboardingResult {
  const demonstrated = scoreDiagnostic(onboarding.diagnostic)
  const selfRated = {} as Record<CompetencyId, number | null>
  for (const c of competencyIds) selfRated[c] = onboarding.selfRatings[c] ?? null

  const weakAreas = [...competencyIds]
    .filter((c) => (demonstrated[c] ?? 0) < 50)
    .sort((a, b) => (demonstrated[a] ?? 0) - (demonstrated[b] ?? 0))
  const confidenceGaps = competencyIds.filter(
    (c) => (selfRated[c] ?? 0) >= 3 && (demonstrated[c] ?? 0) < 50,
  )

  let estimatedMinutes = 0
  for (const l of levels) {
    estimatedMinutes += l.lessons.reduce((sum, x) => sum + x.minutes, 0)
    estimatedMinutes += l.project.minutes + 20 // project plus quiz
  }
  const hoursRaw = onboarding.profile.hours
  const weeklyHours = Number(typeof hoursRaw === 'string' ? hoursRaw : 6) || 6
  const estimatedWeeks = Math.max(1, Math.ceil(estimatedMinutes / (weeklyHours * 60)))

  // The sessions build on each other's files, so everyone starts at the first one.
  const first = levels[0]!

  return {
    demonstrated,
    selfRated,
    levels: levelStandings(
      onboarding.diagnostic,
      levels.map((l) => l.id),
    ),
    weakAreas,
    confidenceGaps,
    estimatedMinutes,
    weeklyHours,
    estimatedWeeks,
    firstLessonId: first.lessons[0]!.id,
    firstProject: first.project.title,
  }
}
