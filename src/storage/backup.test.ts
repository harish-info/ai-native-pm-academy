import { describe, expect, it } from 'vitest'
import { fresh, masterLevel } from '../test/fixtures'
import { BACKUP_APP, BACKUP_KIND, backupFileName, createBackup, parseBackup } from './backup'
import { CURRENT_SCHEMA_VERSION } from './schema'

describe('backup export and import', () => {
  it('round-trips learner data exactly', () => {
    const data = fresh()
    masterLevel(data, 1)
    const result = parseBackup(JSON.stringify(createBackup(data)))
    expect(result.ok).toBe(true)
    if (result.ok) expect(result.data).toEqual(data)
  })

  it('names files by date', () => {
    expect(backupFileName(new Date('2026-11-05T10:00:00Z'))).toBe(
      'ai-native-pm-academy-backup-2026-11-05.json',
    )
  })

  it('rejects invalid JSON', () => {
    expect(parseBackup('{not json')).toMatchObject({
      ok: false,
      error: 'The file is not valid JSON.',
    })
  })

  it('rejects files from another app', () => {
    const r = parseBackup(
      JSON.stringify({ app: 'other', kind: BACKUP_KIND, schemaVersion: 1, data: {} }),
    )
    expect(r.ok).toBe(false)
  })

  it('rejects a newer schema with an actionable message', () => {
    const backup = { ...createBackup(fresh()), schemaVersion: CURRENT_SCHEMA_VERSION + 1 }
    const r = parseBackup(JSON.stringify(backup))
    expect(r.ok).toBe(false)
    if (!r.ok) expect(r.error).toMatch(/newer version/)
  })

  it('rejects data that does not match the schema and reports where', () => {
    const backup = createBackup(fresh()) as unknown as { data: Record<string, unknown> }
    backup.data.studyLog = [{ id: 'x', date: 'yesterday', minutes: -5 }]
    const r = parseBackup(
      JSON.stringify({ app: BACKUP_APP, kind: BACKUP_KIND, schemaVersion: 1, data: backup.data }),
    )
    expect(r.ok).toBe(false)
    if (!r.ok) expect(r.details?.some((d) => d.startsWith('studyLog'))).toBe(true)
  })

  it('imports a schema 1 backup from the five-week plan through every migration', () => {
    const v1 = {
      schemaVersion: 1,
      createdAt: '2026-11-01T09:00:00.000Z',
      updatedAt: '2026-11-03T21:00:00.000Z',
      onboarding: null,
      lessons: {
        s1: {
          checklist: { scored: true },
          reflection: 'x'.repeat(50),
          artifact: 'notes/s1.md',
          completedAt: '2026-11-02T20:00:00.000Z',
        },
      },
      masteredLevels: { '1': '2026-11-03T21:00:00.000Z' },
      studyLog: [{ id: 'a', date: '2026-11-02', minutes: 75, lessonId: 's1' }],
      settings: { theme: 'dark' },
    }
    const r = parseBackup(
      JSON.stringify({ app: BACKUP_APP, kind: BACKUP_KIND, schemaVersion: 1, data: v1 }),
    )
    expect(r.ok).toBe(true)
    if (!r.ok) return
    expect(r.migratedFrom).toBe(1)
    expect(r.data.schemaVersion).toBe(CURRENT_SCHEMA_VERSION)
    expect(r.data.studyLog).toHaveLength(1)
    expect(r.data.settings).toEqual({ theme: 'dark' })
  })

  it('clears progress from before the storyline v2 restructure and keeps the rest', () => {
    const v3 = {
      schemaVersion: 3,
      createdAt: '2026-11-01T09:00:00.000Z',
      updatedAt: '2026-11-10T21:00:00.000Z',
      onboarding: {
        profile: { role: 'pm' },
        selfRatings: { 'ai-fundamentals': 2 },
        diagnostic: { d1: 'a' },
        completedAt: '2026-11-01T09:30:00.000Z',
      },
      lessons: { s1: { completedAt: '2026-11-02T20:00:00.000Z' } },
      challenges: { c1: { startedAt: '2026-11-03T20:00:00.000Z' } },
      quizAttempts: [
        {
          id: 'q',
          levelId: 1,
          answers: {},
          correct: 8,
          total: 8,
          at: '2026-11-03T21:00:00.000Z',
        },
      ],
      projects: { '1': { evidence: 'old pitch' } },
      masteredLevels: { '1': '2026-11-03T21:00:00.000Z' },
      bookmarks: ['s4'],
      notes: [
        {
          id: 'n',
          kind: 'note',
          title: 'Keep me',
          body: 'mine',
          createdAt: '2026-11-02T20:00:00.000Z',
          updatedAt: '2026-11-02T20:00:00.000Z',
        },
      ],
      studyLog: [{ id: 'a', date: '2026-11-02', minutes: 75, lessonId: 's1' }],
      settings: { theme: 'dark', planStart: '2026-11-02', caseStudy: 'steady' },
    }
    const r = parseBackup(
      JSON.stringify({ app: BACKUP_APP, kind: BACKUP_KIND, schemaVersion: 3, data: v3 }),
    )
    expect(r.ok).toBe(true)
    if (!r.ok) return
    expect(r.migratedFrom).toBe(3)
    expect(r.data.lessons).toEqual({})
    expect(r.data.challenges).toEqual({})
    expect(r.data.quizAttempts).toEqual([])
    expect(r.data.projects).toEqual({})
    expect(r.data.masteredLevels).toEqual({})
    expect(r.data.bookmarks).toEqual([])
    expect(r.data.onboarding?.diagnostic).toEqual({ d1: 'a' })
    expect(r.data.notes.map((n) => n.title)).toEqual(['Keep me'])
    expect(r.data.studyLog).toHaveLength(1)
    expect(r.data.settings).toEqual({ theme: 'dark', planStart: '2026-11-02', caseStudy: 'steady' })
  })

  it('keeps MoneyPilot for a schema 2 learner who already started Level 3', () => {
    const v2 = (lessons: Record<string, unknown>) => ({
      schemaVersion: 2,
      createdAt: '2026-11-01T09:00:00.000Z',
      updatedAt: '2026-11-20T21:00:00.000Z',
      lessons,
      settings: { theme: 'system', planStart: '2026-11-02' },
    })
    const started = parseBackup(
      JSON.stringify({
        app: BACKUP_APP,
        kind: BACKUP_KIND,
        schemaVersion: 2,
        data: v2({ s9: { startedAt: '2026-11-18T20:00:00.000Z' } }),
      }),
    )
    expect(started.ok && started.data.settings.caseStudy).toBe('moneypilot')
    expect(started.ok && started.data.settings.planStart).toBe('2026-11-02')

    const early = parseBackup(
      JSON.stringify({
        app: BACKUP_APP,
        kind: BACKUP_KIND,
        schemaVersion: 2,
        data: v2({ s2: { startedAt: '2026-11-03T20:00:00.000Z' } }),
      }),
    )
    expect(early.ok && early.data.settings.caseStudy).toBeUndefined()
  })

  it('rejects oversized files before parsing', () => {
    expect(parseBackup('x'.repeat(5 * 1024 * 1024 + 1)).ok).toBe(false)
  })
})
