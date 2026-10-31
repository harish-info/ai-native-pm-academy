import { useEffect, useId, useState } from 'react'
import { createBackup, backupFileName, parseBackup } from '../storage/backup'
import type { LearnerData } from '../storage/schema'
import { formatDate } from '../domain/dates'
import { useStore } from '../state/store'
import { Button, Card, Field, PageHeader, Pill, cx, inputClass } from '../ui/primitives'

type Theme = LearnerData['settings']['theme']

const themes: { id: Theme; label: string; hint: string }[] = [
  { id: 'system', label: 'System', hint: 'Follow the device setting' },
  { id: 'light', label: 'Light', hint: 'Always light' },
  { id: 'dark', label: 'Dark', hint: 'Always dark' },
]

function download(name: string, contents: string) {
  const blob = new Blob([contents], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

type ImportState =
  | { status: 'idle' }
  | { status: 'error'; error: string; details?: string[] }
  | {
      status: 'ready'
      data: LearnerData
      exportedAt?: string
      migratedFrom?: number
      fileName: string
    }
  | { status: 'done'; message: string }

function exportedAtOf(text: string): string | undefined {
  try {
    const raw: unknown = JSON.parse(text)
    if (
      raw &&
      typeof raw === 'object' &&
      'exportedAt' in raw &&
      typeof raw.exportedAt === 'string'
    ) {
      return raw.exportedAt
    }
  } catch {
    // parseBackup reports the real error
  }
  return undefined
}

export function SettingsPage() {
  const { data, mode, persistent, recoveredKey, repo, update, replaceAll, switchMode } = useStore()
  const uid = useId()
  const [importState, setImportState] = useState<ImportState>({ status: 'idle' })
  const [busy, setBusy] = useState(false)
  const [undoMessage, setUndoMessage] = useState<string | null>(null)
  const [persistResult, setPersistResult] = useState<string | null>(null)
  const [usage, setUsage] = useState<string | null>(null)
  const [resetText, setResetText] = useState('')
  const [rawMessage, setRawMessage] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    navigator.storage
      ?.estimate?.()
      .then((est) => {
        if (cancelled || est.usage === undefined) return
        const mb = (est.usage / (1024 * 1024)).toFixed(2)
        const quota = est.quota
          ? ` of about ${Math.round(est.quota / (1024 * 1024))} MB available`
          : ''
        setUsage(`${mb} MB used${quota}`)
      })
      .catch(() => setUsage('Storage estimate unavailable in this browser.'))
    return () => {
      cancelled = true
    }
  }, [data.updatedAt])

  const exportBackup = () => {
    const now = new Date()
    download(backupFileName(now), JSON.stringify(createBackup(data, now), null, 2))
    update((d) => {
      d.settings.lastBackupAt = now.toISOString()
    })
  }

  const onFile = async (file: File | undefined) => {
    setUndoMessage(null)
    if (!file) return
    const text = await file.text()
    const result = parseBackup(text)
    if (!result.ok) {
      setImportState({ status: 'error', error: result.error, details: result.details })
      return
    }
    setImportState({
      status: 'ready',
      data: result.data,
      exportedAt: exportedAtOf(text),
      migratedFrom: result.migratedFrom,
      fileName: file.name,
    })
  }

  const confirmImport = async () => {
    if (importState.status !== 'ready') return
    setBusy(true)
    try {
      await repo.snapshotBeforeImport(data)
      await replaceAll(importState.data)
      setImportState({
        status: 'done',
        message: 'Import complete. Your previous data was kept as an undo snapshot.',
      })
    } catch (e) {
      setImportState({
        status: 'error',
        error: `Import failed: ${e instanceof Error ? e.message : String(e)}`,
      })
    } finally {
      setBusy(false)
    }
  }

  const undoImport = async () => {
    setBusy(true)
    try {
      const snapshot = await repo.getPreImportSnapshot()
      if (!snapshot) {
        setUndoMessage('There is no import to undo.')
        return
      }
      await replaceAll(snapshot)
      setUndoMessage('Restored the data you had before the last import.')
      setImportState({ status: 'idle' })
    } catch (e) {
      setUndoMessage(`Undo failed: ${e instanceof Error ? e.message : String(e)}`)
    } finally {
      setBusy(false)
    }
  }

  const requestPersist = async () => {
    if (!navigator.storage?.persist) {
      setPersistResult('This browser does not support persistent storage requests.')
      return
    }
    try {
      const granted = await navigator.storage.persist()
      setPersistResult(
        granted
          ? 'Granted. The browser will not clear this data under storage pressure.'
          : 'Not granted. The browser decides this; installing the site or bookmarking it can help. Export backups regularly.',
      )
    } catch {
      setPersistResult('The request failed. Export backups regularly.')
    }
  }

  const downloadRaw = async () => {
    if (!recoveredKey) return
    try {
      const raw = await repo.getRaw(recoveredKey)
      download(
        `academy-unreadable-${new Date().toISOString().slice(0, 10)}.json`,
        JSON.stringify(raw, null, 2),
      )
      setRawMessage('Downloaded the unreadable copy.')
    } catch (e) {
      setRawMessage(`Could not read the copy: ${e instanceof Error ? e.message : String(e)}`)
    }
  }

  const reset = async () => {
    if (resetText !== 'RESET') return
    setBusy(true)
    try {
      await repo.clearAll()
    } finally {
      window.location.reload()
    }
  }

  const coreDone = (d: LearnerData) => Object.values(d.lessons).filter((l) => l?.completedAt).length
  const demo = mode === 'demo'

  return (
    <>
      <PageHeader eyebrow="Settings" title="Settings and your data">
        Theme, privacy, backups and storage. Everything on this page acts on this browser only.
      </PageHeader>

      {demo && (
        <p className="mb-6 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
          <strong>Demo mode is on.</strong> Changes on this page affect the demo data only. Your
          real progress is untouched.
        </p>
      )}

      <div className="space-y-6">
        <Card>
          <h2 className="mb-3 text-lg font-semibold">Appearance</h2>
          <fieldset>
            <legend className="mb-2 text-sm font-medium">Theme</legend>
            <div className="flex flex-wrap gap-2">
              {themes.map((t) => (
                <label
                  key={t.id}
                  className={cx(
                    'flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm',
                    data.settings.theme === t.id
                      ? 'border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-950'
                      : 'border-stone-300 dark:border-stone-700',
                  )}
                >
                  <input
                    type="radio"
                    name={`${uid}-theme`}
                    value={t.id}
                    className="accent-indigo-600"
                    checked={data.settings.theme === t.id}
                    onChange={() =>
                      update((d) => {
                        d.settings.theme = t.id
                      })
                    }
                  />
                  <span>
                    <span className="font-medium">{t.label}</span>
                    <span className="block text-xs text-stone-500 dark:text-stone-400">
                      {t.hint}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </Card>

        <Card>
          <h2 className="mb-3 text-lg font-semibold">Privacy</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-stone-700 dark:text-stone-300">
            <li>
              Local-first: your progress, notes and reflections live in this browser's IndexedDB.
            </li>
            <li>Nothing leaves the browser. There is no account, no server and no sync.</li>
            <li>
              No analytics, no tracking and no third-party scripts. External links open the resource
              site directly.
            </li>
            <li>
              Demo data is stored in a separate database, so exploring the demo never touches your
              real progress.
            </li>
            <li>To move to another device, export a backup here and import it there.</li>
          </ul>
        </Card>

        <Card>
          <h2 className="mb-1 text-lg font-semibold">Export a backup</h2>
          <p className="mb-3 text-sm text-stone-600 dark:text-stone-400">
            Downloads everything as one JSON file. Keep it somewhere private; it contains your notes
            and reflections.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={exportBackup}>Download backup</Button>
            <span className="text-sm text-stone-600 dark:text-stone-400">
              {data.settings.lastBackupAt
                ? `Last backup: ${formatDate(data.settings.lastBackupAt)}`
                : 'No backup yet.'}
            </span>
          </div>
        </Card>

        <Card>
          <h2 className="mb-1 text-lg font-semibold">Import a backup</h2>
          <p className="mb-3 text-sm text-stone-600 dark:text-stone-400">
            Importing replaces all current data. Your current data is kept as a snapshot so you can
            undo the last import.
          </p>
          <Field label="Backup file (.json)" htmlFor={`${uid}-import`}>
            <input
              id={`${uid}-import`}
              type="file"
              accept=".json,application/json"
              className="text-sm file:mr-3 file:rounded-xl file:border file:border-stone-300 file:bg-white file:px-3 file:py-2 file:text-sm dark:file:border-stone-700 dark:file:bg-stone-900 dark:file:text-stone-100"
              onChange={(e) => {
                void onFile(e.target.files?.[0])
                e.target.value = ''
              }}
            />
          </Field>

          <div aria-live="polite" className="mt-4 space-y-3">
            {importState.status === 'error' && (
              <div
                role="alert"
                className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-200"
              >
                <p className="font-medium">Error: {importState.error}</p>
                {importState.details && importState.details.length > 0 && (
                  <ul className="mt-2 list-disc pl-5">
                    {importState.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            {importState.status === 'ready' && (
              <div className="rounded-xl border border-indigo-300 bg-indigo-50 p-4 text-sm dark:border-indigo-800 dark:bg-indigo-950">
                <p className="mb-2 font-medium">Ready to import {importState.fileName}</p>
                <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
                  <dt className="text-stone-600 dark:text-stone-400">Exported</dt>
                  <dd>{importState.exportedAt ? formatDate(importState.exportedAt) : 'Unknown'}</dd>
                  <dt className="text-stone-600 dark:text-stone-400">Core sessions done</dt>
                  <dd>{coreDone(importState.data)} of 20</dd>
                  <dt className="text-stone-600 dark:text-stone-400">Notes</dt>
                  <dd>{importState.data.notes.length}</dd>
                  {importState.migratedFrom !== undefined && (
                    <>
                      <dt className="text-stone-600 dark:text-stone-400">Format</dt>
                      <dd>Upgraded from schema version {importState.migratedFrom}</dd>
                    </>
                  )}
                </dl>
                <p className="mt-3">
                  This replaces your current data ({coreDone(data)} sessions done,{' '}
                  {data.notes.length} notes).
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button onClick={() => void confirmImport()} disabled={busy}>
                    Confirm import
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setImportState({ status: 'idle' })}
                    disabled={busy}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
            {importState.status === 'done' && (
              <p className="rounded-xl border border-emerald-300 bg-emerald-50 p-3 text-sm text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
                {importState.message}
              </p>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button variant="secondary" onClick={() => void undoImport()} disabled={busy}>
              Undo last import
            </Button>
            {undoMessage && (
              <span className="text-sm" aria-live="polite">
                {undoMessage}
              </span>
            )}
          </div>
        </Card>

        <Card>
          <h2 className="mb-3 text-lg font-semibold">Storage</h2>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
            <dt className="text-stone-600 dark:text-stone-400">Persistent storage</dt>
            <dd>
              {persistent ? (
                <Pill tone="green">Yes, protected</Pill>
              ) : (
                <Pill tone="amber">No, best effort</Pill>
              )}
            </dd>
            <dt className="text-stone-600 dark:text-stone-400">Usage</dt>
            <dd>{usage ?? 'Checking...'}</dd>
          </dl>
          <p className="mt-3 text-sm text-stone-600 dark:text-stone-400">
            Without persistent storage, the browser may clear site data when the device is low on
            space. Backups are the safety net either way.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Button variant="secondary" onClick={() => void requestPersist()}>
              Request persistent storage
            </Button>
            {persistResult && (
              <span className="text-sm" aria-live="polite">
                {persistResult}
              </span>
            )}
          </div>
        </Card>

        {recoveredKey && (
          <Card className="border-amber-300 dark:border-amber-800">
            <h2 className="mb-1 text-lg font-semibold">Recovered from unreadable data</h2>
            <p className="mb-3 text-sm text-stone-700 dark:text-stone-300">
              Saved data could not be read when the app started, so it started fresh. The unreadable
              copy was kept. Download it and send it to your mentor if you want to try recovering
              it.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="secondary" onClick={() => void downloadRaw()}>
                Download unreadable copy
              </Button>
              {rawMessage && (
                <span className="text-sm" aria-live="polite">
                  {rawMessage}
                </span>
              )}
            </div>
          </Card>
        )}

        <Card>
          <h2 className="mb-1 text-lg font-semibold">Demo mode</h2>
          <p className="mb-3 text-sm text-stone-600 dark:text-stone-400">
            Demo mode loads a sample learner partway through the course, in a separate database. Use
            it to look around without touching real progress. It lasts for this browser tab only.
          </p>
          <p className="mb-3 text-sm">
            Current mode: <Pill tone={demo ? 'amber' : 'indigo'}>{demo ? 'Demo' : 'Real'}</Pill>
          </p>
          {demo ? (
            <Button onClick={() => switchMode('real')}>Exit demo mode</Button>
          ) : (
            <Button variant="secondary" onClick={() => switchMode('demo')}>
              Enter demo mode
            </Button>
          )}
        </Card>

        <Card className="border-red-200 dark:border-red-900">
          <h2 className="mb-1 text-lg font-semibold">
            {demo ? 'Clear demo data' : 'Reset all data'}
          </h2>
          <p className="mb-3 text-sm text-stone-700 dark:text-stone-300">
            {demo
              ? 'Clears the demo database only. Your real progress is not affected.'
              : 'Deletes all progress, notes, goals and the import snapshot from this browser. This cannot be undone. Export a backup first.'}
          </p>
          <form
            className="flex flex-wrap items-end gap-3"
            onSubmit={(e) => {
              e.preventDefault()
              void reset()
            }}
          >
            <div className="flex flex-col gap-1">
              <label htmlFor={`${uid}-reset`} className="text-sm font-medium">
                Type RESET to confirm
              </label>
              <input
                id={`${uid}-reset`}
                className={cx(inputClass, 'w-48')}
                autoComplete="off"
                value={resetText}
                onChange={(e) => setResetText(e.target.value)}
              />
            </div>
            <Button type="submit" variant="danger" disabled={resetText !== 'RESET' || busy}>
              {demo ? 'Clear demo data' : 'Reset everything'}
            </Button>
          </form>
        </Card>
      </div>
    </>
  )
}
