import { openStore, type KeyValueStore } from './db'
import { validateLearnerData } from './backup'
import { emptyLearnerData, type LearnerData } from './schema'

export const DATA_KEY = 'learner'
export const PRE_IMPORT_KEY = 'snapshot-before-import'
export const CORRUPT_PREFIX = 'unreadable-'

export type Mode = 'real' | 'demo'

export const dbName = (mode: Mode) =>
  mode === 'demo' ? 'ai-native-pm-academy-demo' : 'ai-native-pm-academy'

export interface LoadResult {
  data: LearnerData
  persistent: boolean
  /** Set when stored data could not be read; the raw copy was kept under this key. */
  recoveredKey?: string
  isNew: boolean
}

export class Repository {
  private queue: Promise<void> = Promise.resolve()
  private constructor(readonly store: KeyValueStore) {}

  static async open(mode: Mode): Promise<Repository> {
    return new Repository(await openStore(dbName(mode)))
  }

  static withStore(store: KeyValueStore) {
    return new Repository(store)
  }

  async load(): Promise<LoadResult> {
    const raw = await this.store.get<unknown>(DATA_KEY)
    if (raw === undefined) {
      return { data: emptyLearnerData(), persistent: this.store.persistent, isNew: true }
    }
    const result = validateLearnerData(raw)
    if (result.ok) {
      if (result.migratedFrom) await this.save(result.data)
      return { data: result.data, persistent: this.store.persistent, isNew: false }
    }
    // Keep the unreadable copy instead of overwriting it, so nothing is silently lost.
    const recoveredKey = `${CORRUPT_PREFIX}${new Date().toISOString()}`
    await this.store.set(recoveredKey, raw)
    const fresh = emptyLearnerData()
    await this.store.set(DATA_KEY, fresh)
    return { data: fresh, persistent: this.store.persistent, recoveredKey, isNew: true }
  }

  /** Writes are serialized so a slow write never overwrites a newer one. */
  save(data: LearnerData): Promise<void> {
    const write = this.queue.then(() => this.store.set(DATA_KEY, data))
    this.queue = write.catch(() => undefined)
    return write
  }

  async snapshotBeforeImport(current: LearnerData) {
    await this.store.set(PRE_IMPORT_KEY, current)
  }

  async getPreImportSnapshot(): Promise<LearnerData | null> {
    const raw = await this.store.get<unknown>(PRE_IMPORT_KEY)
    if (raw === undefined) return null
    const result = validateLearnerData(raw)
    return result.ok ? result.data : null
  }

  async getRaw(key: string) {
    return this.store.get<unknown>(key)
  }

  async clearAll() {
    for (const key of await this.store.keys()) await this.store.del(key)
  }
}
