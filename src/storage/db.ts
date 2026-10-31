// Minimal IndexedDB key-value store. Falls back to memory when IndexedDB is unavailable
// (for example some private browsing modes), and reports that so the UI can warn.

const STORE = 'kv'
const OPEN_TIMEOUT_MS = 5000

export interface KeyValueStore {
  readonly persistent: boolean
  get<T>(key: string): Promise<T | undefined>
  set(key: string, value: unknown): Promise<void>
  del(key: string): Promise<void>
  keys(): Promise<string[]>
}

function promisify<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

function openDb(name: string): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('IndexedDB open timed out')), OPEN_TIMEOUT_MS)
    const req = indexedDB.open(name, 1)
    req.onupgradeneeded = () => req.result.createObjectStore(STORE)
    req.onsuccess = () => {
      clearTimeout(timer)
      resolve(req.result)
    }
    req.onerror = () => {
      clearTimeout(timer)
      reject(req.error)
    }
    req.onblocked = () => {
      clearTimeout(timer)
      reject(new Error('IndexedDB open blocked'))
    }
  })
}

class IdbStore implements KeyValueStore {
  readonly persistent = true
  constructor(private db: IDBDatabase) {}
  private store(mode: IDBTransactionMode) {
    return this.db.transaction(STORE, mode).objectStore(STORE)
  }
  get<T>(key: string) {
    return promisify(this.store('readonly').get(key)) as Promise<T | undefined>
  }
  async set(key: string, value: unknown) {
    await promisify(this.store('readwrite').put(value, key))
  }
  async del(key: string) {
    await promisify(this.store('readwrite').delete(key))
  }
  async keys() {
    return (await promisify(this.store('readonly').getAllKeys())).map(String)
  }
}

export class MemoryStore implements KeyValueStore {
  readonly persistent = false
  private map = new Map<string, unknown>()
  async get<T>(key: string) {
    return this.map.get(key) as T | undefined
  }
  async set(key: string, value: unknown) {
    this.map.set(key, structuredClone(value))
  }
  async del(key: string) {
    this.map.delete(key)
  }
  async keys() {
    return [...this.map.keys()]
  }
}

export async function openStore(name: string): Promise<KeyValueStore> {
  if (typeof indexedDB === 'undefined') return new MemoryStore()
  try {
    return new IdbStore(await openDb(name))
  } catch {
    return new MemoryStore()
  }
}
