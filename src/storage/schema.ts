import { z } from 'zod'

export const CURRENT_SCHEMA_VERSION = 3

const isoDate = z.string().min(10).max(40)
const day = z.string().regex(/^\d{4}-\d{2}-\d{2}$/)

export const lessonRecordSchema = z.object({
  checklist: z.record(z.string(), z.boolean()).default({}),
  reflection: z.string().max(20000).default(''),
  artifact: z.string().max(2000).default(''),
  startedAt: isoDate.optional(),
  completedAt: isoDate.optional(),
})

export const quizAttemptSchema = z.object({
  id: z.string(),
  levelId: z.number().int().min(1).max(5),
  answers: z.record(z.string(), z.string()),
  correct: z.number().int().min(0),
  total: z.number().int().min(1),
  at: isoDate,
})

const score = z.number().int().min(0).max(4)

export const projectRecordSchema = z.object({
  deliverables: z.record(z.string(), z.boolean()).default({}),
  evidence: z.string().max(20000).default(''),
  rubric: z
    .object({ correctness: score, quality: score, independence: score, judgment: score })
    .default({ correctness: 0, quality: 0, independence: 0, judgment: 0 }),
  assessedBy: z.enum(['self', 'mentor']).default('self'),
  mentorName: z.string().max(200).default(''),
  notes: z.string().max(20000).default(''),
  assessedAt: isoDate.optional(),
})

export const noteSchema = z.object({
  id: z.string(),
  kind: z.enum(['note', 'reflection', 'weekly', 'project']),
  title: z.string().max(300),
  body: z.string().max(100000),
  lessonId: z.string().optional(),
  tags: z.array(z.string().max(60)).max(30).default([]),
  createdAt: isoDate,
  updatedAt: isoDate,
})

export const studyEntrySchema = z.object({
  id: z.string(),
  date: day,
  minutes: z
    .number()
    .int()
    .min(1)
    .max(24 * 60),
  lessonId: z.string().optional(),
  note: z.string().max(500).optional(),
})

export const goalSchema = z.object({
  id: z.string(),
  text: z.string().min(1).max(500),
  done: z.boolean(),
  createdAt: isoDate,
  doneAt: isoDate.optional(),
})

export const onboardingSchema = z.object({
  profile: z.record(z.string(), z.union([z.string(), z.array(z.string())])),
  selfRatings: z.record(z.string(), z.number().int().min(1).max(4)),
  diagnostic: z.record(z.string(), z.string()),
  completedAt: isoDate,
})

export const settingsSchema = z.object({
  theme: z.enum(['system', 'light', 'dark']).default('system'),
  lastBackupAt: isoDate.optional(),
  /** Day the learner chose to start the plan. Unset until she picks one. Added in schema 2. */
  planStart: day.optional(),
  /** Plan pace. Unset means derived from the weekly hours given in onboarding. Added in schema 2. */
  planPace: z.enum(['standard', 'light']).optional(),
  /** The case study carried through Levels 3 to 5. Unset until the learner picks one. Added in schema 3. */
  caseStudy: z.enum(['moneypilot', 'steady', 'triage']).optional(),
})

export const learnerDataSchema = z.object({
  schemaVersion: z.literal(CURRENT_SCHEMA_VERSION),
  createdAt: isoDate,
  updatedAt: isoDate,
  onboarding: onboardingSchema.nullable().default(null),
  lessons: z.record(z.string(), lessonRecordSchema).default({}),
  challenges: z.record(z.string(), lessonRecordSchema).default({}),
  quizAttempts: z.array(quizAttemptSchema).default([]),
  projects: z.record(z.string(), projectRecordSchema).default({}),
  /** Level id to the time it was first mastered. Badges are kept once earned, even if evidence is later edited. */
  masteredLevels: z.record(z.string(), isoDate).default({}),
  notes: z.array(noteSchema).default([]),
  bookmarks: z.array(z.string()).default([]),
  goals: z.array(goalSchema).default([]),
  studyLog: z.array(studyEntrySchema).default([]),
  settings: settingsSchema.default({ theme: 'system' }),
})

export type LearnerData = z.infer<typeof learnerDataSchema>
export type LessonRecord = z.infer<typeof lessonRecordSchema>
export type QuizAttempt = z.infer<typeof quizAttemptSchema>
export type ProjectRecord = z.infer<typeof projectRecordSchema>
export type Note = z.infer<typeof noteSchema>
export type StudyEntry = z.infer<typeof studyEntrySchema>
export type Goal = z.infer<typeof goalSchema>
export type Onboarding = z.infer<typeof onboardingSchema>

export function emptyLearnerData(now = new Date()): LearnerData {
  const at = now.toISOString()
  return learnerDataSchema.parse({
    schemaVersion: CURRENT_SCHEMA_VERSION,
    createdAt: at,
    updatedAt: at,
  })
}

export const emptyLessonRecord = (): LessonRecord => ({
  checklist: {},
  reflection: '',
  artifact: '',
})

export const emptyProjectRecord = (): ProjectRecord => projectRecordSchema.parse({})
