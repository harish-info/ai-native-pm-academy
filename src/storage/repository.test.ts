import { describe, expect, it } from 'vitest'
import { fresh } from '../test/fixtures'
import { MemoryStore } from './db'
import { CORRUPT_PREFIX, DATA_KEY, Repository } from './repository'

describe('repository', () => {
  it('returns empty data for a new learner', async () => {
    const repo = Repository.withStore(new MemoryStore())
    const r = await repo.load()
    expect(r.isNew).toBe(true)
    expect(r.data.onboarding).toBeNull()
  })

  it('persists and reloads data', async () => {
    const store = new MemoryStore()
    const data = fresh()
    data.bookmarks.push('s1')
    await Repository.withStore(store).save(data)
    const r = await Repository.withStore(store).load()
    expect(r.isNew).toBe(false)
    expect(r.data.bookmarks).toEqual(['s1'])
  })

  it('keeps unreadable data under a recovery key instead of overwriting it', async () => {
    const store = new MemoryStore()
    await store.set(DATA_KEY, { schemaVersion: 1, lessons: 'broken' })
    const repo = Repository.withStore(store)
    const r = await repo.load()
    expect(r.recoveredKey?.startsWith(CORRUPT_PREFIX)).toBe(true)
    expect(await repo.getRaw(r.recoveredKey!)).toEqual({ schemaVersion: 1, lessons: 'broken' })
    expect(r.data.lessons).toEqual({})
  })

  it('serializes writes so the last save wins', async () => {
    const store = new MemoryStore()
    const repo = Repository.withStore(store)
    const a = fresh()
    a.bookmarks = ['first']
    const b = fresh()
    b.bookmarks = ['second']
    await Promise.all([repo.save(a), repo.save(b)])
    expect((await repo.load()).data.bookmarks).toEqual(['second'])
  })

  it('surfaces write failures and keeps working afterwards', async () => {
    const store = new MemoryStore()
    const repo = Repository.withStore(store)
    const original = store.set.bind(store)
    let fail = true
    store.set = async (k, v) => {
      if (fail) throw new Error('quota exceeded')
      return original(k, v)
    }
    await expect(repo.save(fresh())).rejects.toThrow('quota exceeded')
    fail = false
    await expect(repo.save(fresh())).resolves.toBeUndefined()
  })

  it('stores and validates a pre-import snapshot', async () => {
    const repo = Repository.withStore(new MemoryStore())
    expect(await repo.getPreImportSnapshot()).toBeNull()
    const data = fresh()
    data.bookmarks = ['before-import']
    await repo.snapshotBeforeImport(data)
    expect((await repo.getPreImportSnapshot())?.bookmarks).toEqual(['before-import'])
  })
})
