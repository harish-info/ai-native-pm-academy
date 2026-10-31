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

  it('rejects oversized files before parsing', () => {
    expect(parseBackup('x'.repeat(5 * 1024 * 1024 + 1)).ok).toBe(false)
  })
})
