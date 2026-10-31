import { describe, expect, it } from 'vitest'
import { levels } from '../content'
import { levelStatuses } from '../domain/progress'
import { validateLearnerData } from '../storage/backup'
import { buildDemoData } from './demo'

describe('demo data', () => {
  const data = buildDemoData(new Date('2026-11-20T12:00:00Z'))

  it('passes schema validation', () => {
    const r = validateLearnerData(JSON.parse(JSON.stringify(data)))
    expect(r.ok).toBe(true)
  })

  it('shows level 1 mastered and level 2 underway', () => {
    const s = levelStatuses(data, levels)
    expect(s[0]!.mastered).toBe(true)
    expect(s[1]!.unlocked).toBe(true)
    expect(s[1]!.mastered).toBe(false)
  })
})
