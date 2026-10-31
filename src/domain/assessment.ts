import { competencyIds } from '../content/competencies'
import {
  diagnosticQuestions,
  levelCompetencies,
  maxTestOutLevel,
  testOutThreshold,
} from '../content/onboarding'
import type { CompetencyId, Level, LevelId } from '../content/types'
import type { Onboarding } from '../storage/schema'

export type LevelPath = 'full' | 'proof-only'

export interface OnboardingResult {
  demonstrated: Record<CompetencyId, number | null>
  selfRated: Record<CompetencyId, number | null>
  startLevel: LevelId
  path: Record<LevelId, LevelPath>
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

const average = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0)

/** Levels that the diagnostic says can skip theory. Must be consecutive from level 1. */
export function testedOutLevels(demonstrated: Record<CompetencyId, number | null>): LevelId[] {
  const out: LevelId[] = []
  for (let id = 1; id <= maxTestOutLevel; id++) {
    const lvl = id as LevelId
    const scores = levelCompetencies[lvl].map((c) => demonstrated[c] ?? 0)
    if (average(scores) >= testOutThreshold) out.push(lvl)
    else break
  }
  return out
}

/** Lessons required for a level, given whether its theory was tested out. */
export function requiredLessonIds(level: Level, path: LevelPath): string[] {
  return level.lessons
    .filter((l) => path === 'full' || l.practicalProof || l.safetyCritical)
    .map((l) => l.id)
}

export function computeOnboardingResult(onboarding: Onboarding, levels: Level[]): OnboardingResult {
  const demonstrated = scoreDiagnostic(onboarding.diagnostic)
  const selfRated = {} as Record<CompetencyId, number | null>
  for (const c of competencyIds) selfRated[c] = onboarding.selfRatings[c] ?? null

  const testedOut = testedOutLevels(demonstrated)
  const startLevel = (testedOut.length + 1) as LevelId
  const path = {} as Record<LevelId, LevelPath>
  for (const l of levels) path[l.id] = testedOut.includes(l.id) ? 'proof-only' : 'full'

  const weakAreas = [...competencyIds]
    .filter((c) => (demonstrated[c] ?? 0) < 50)
    .sort((a, b) => (demonstrated[a] ?? 0) - (demonstrated[b] ?? 0))
  const confidenceGaps = competencyIds.filter(
    (c) => (selfRated[c] ?? 0) >= 3 && (demonstrated[c] ?? 0) < 50,
  )

  let estimatedMinutes = 0
  for (const l of levels) {
    const required = new Set(requiredLessonIds(l, path[l.id]))
    estimatedMinutes += l.lessons
      .filter((x) => required.has(x.id))
      .reduce((s, x) => s + x.minutes, 0)
    estimatedMinutes += l.project.minutes + 20 // project plus quiz
  }
  const hoursRaw = onboarding.profile.hours
  const weeklyHours = Number(typeof hoursRaw === 'string' ? hoursRaw : 6) || 6
  const estimatedWeeks = Math.max(1, Math.ceil(estimatedMinutes / (weeklyHours * 60)))

  const start = levels.find((l) => l.id === startLevel) ?? levels[0]!
  // Practical proof from skipped levels comes first, then the start level.
  const firstProof = levels
    .filter((l) => path[l.id] === 'proof-only')
    .flatMap((l) => l.lessons.filter((x) => x.practicalProof || x.safetyCritical))[0]

  return {
    demonstrated,
    selfRated,
    startLevel,
    path,
    weakAreas,
    confidenceGaps,
    estimatedMinutes,
    weeklyHours,
    estimatedWeeks,
    firstLessonId: firstProof?.id ?? start.lessons[0]!.id,
    firstProject: start.project.title,
  }
}
