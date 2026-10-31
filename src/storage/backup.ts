import { CURRENT_SCHEMA_VERSION, learnerDataSchema, type LearnerData } from './schema'

export const BACKUP_APP = 'ai-native-pm-academy'
export const BACKUP_KIND = 'learner-backup'

export interface BackupFile {
  app: typeof BACKUP_APP
  kind: typeof BACKUP_KIND
  schemaVersion: number
  exportedAt: string
  data: LearnerData
}

export type ImportResult =
  | { ok: true; data: LearnerData; migratedFrom?: number }
  | { ok: false; error: string; details?: string[] }

/**
 * Migrations upgrade raw data from version N to N+1. Add one entry per schema bump and a test
 * with a fixture of the old shape.
 */
export const migrations: Record<number, (raw: Record<string, unknown>) => Record<string, unknown>> =
  {
    // 1 to 2: the fixed five-week month plan became an eight- or twelve-week plan from a start
    // date the learner picks. Old data had no plan settings, so the start date stays unset and
    // the learner chooses one; all progress is keyed by stable ids and carries over unchanged.
    1: (raw) => raw,
    // 2 to 3: MoneyPilot became one of three case studies. Anyone who already started a Level 3
    // to 5 session did it as MoneyPilot, so they keep it; everyone else picks a case later.
    2: (raw) => {
      const lessons = (raw.lessons ?? {}) as Record<string, { startedAt?: string }>
      const started = Object.entries(lessons).some(
        ([id, r]) => Number(id.slice(1)) >= 9 && r && typeof r === 'object' && !!r.startedAt,
      )
      if (!started) return raw
      const settings = (raw.settings ?? { theme: 'system' }) as Record<string, unknown>
      return { ...raw, settings: { ...settings, caseStudy: 'moneypilot' } }
    },
    // 3 to 4: the curriculum was restructured (storyline v2). Session and challenge ids were
    // reused for different content, so old progress no longer describes the same work. Lesson,
    // challenge, quiz, project, mastery and bookmark records are cleared; onboarding, notes,
    // goals, the study log and settings are kept.
    3: (raw) => ({
      ...raw,
      lessons: {},
      challenges: {},
      quizAttempts: [],
      projects: {},
      masteredLevels: {},
      bookmarks: [],
    }),
  }

export function createBackup(data: LearnerData, now = new Date()): BackupFile {
  return {
    app: BACKUP_APP,
    kind: BACKUP_KIND,
    schemaVersion: CURRENT_SCHEMA_VERSION,
    exportedAt: now.toISOString(),
    data,
  }
}

export function backupFileName(now = new Date()): string {
  return `ai-native-pm-academy-backup-${now.toISOString().slice(0, 10)}.json`
}

const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v)

export function migrate(
  raw: Record<string, unknown>,
  fromVersion: number,
): Record<string, unknown> | null {
  let current = raw
  for (let v = fromVersion; v < CURRENT_SCHEMA_VERSION; v++) {
    const step = migrations[v]
    if (!step) return null
    current = { ...step(current), schemaVersion: v + 1 }
  }
  return current
}

export function validateLearnerData(raw: unknown): ImportResult {
  if (!isObject(raw)) return { ok: false, error: 'Progress data is not an object.' }
  const version = raw.schemaVersion
  if (typeof version !== 'number' || !Number.isInteger(version) || version < 1) {
    return { ok: false, error: 'Progress data has no valid schema version.' }
  }
  if (version > CURRENT_SCHEMA_VERSION) {
    return {
      ok: false,
      error: `This data was created by a newer version of the academy (schema ${version}). Update the app, or use a backup from this version (schema ${CURRENT_SCHEMA_VERSION}).`,
    }
  }
  let candidate = raw
  if (version < CURRENT_SCHEMA_VERSION) {
    const migrated = migrate(raw, version)
    if (!migrated) return { ok: false, error: `No migration path from schema ${version}.` }
    candidate = migrated
  }
  const parsed = learnerDataSchema.safeParse(candidate)
  if (!parsed.success) {
    return {
      ok: false,
      error: 'The progress data does not match the expected format.',
      details: parsed.error.issues
        .slice(0, 6)
        .map((i) => `${i.path.join('.') || '(root)'}: ${i.message}`),
    }
  }
  return {
    ok: true,
    data: parsed.data,
    migratedFrom: version < CURRENT_SCHEMA_VERSION ? version : undefined,
  }
}

const MAX_IMPORT_BYTES = 5 * 1024 * 1024

export function parseBackup(text: string): ImportResult {
  if (text.length > MAX_IMPORT_BYTES) return { ok: false, error: 'The file is larger than 5 MB.' }
  let json: unknown
  try {
    json = JSON.parse(text)
  } catch {
    return { ok: false, error: 'The file is not valid JSON.' }
  }
  if (!isObject(json)) return { ok: false, error: 'The file is not an academy backup.' }
  if (json.app !== BACKUP_APP || json.kind !== BACKUP_KIND) {
    return { ok: false, error: 'The file is not an AI-Native PM Academy backup.' }
  }
  if (typeof json.schemaVersion === 'number' && json.schemaVersion > CURRENT_SCHEMA_VERSION) {
    return validateLearnerData({ schemaVersion: json.schemaVersion })
  }
  return validateLearnerData(json.data)
}
