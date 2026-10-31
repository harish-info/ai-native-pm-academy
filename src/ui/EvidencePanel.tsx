import { useId, useState } from 'react'
import type { ChecklistItem } from '../content/types'
import { formatDate, formatMinutes, toDay } from '../domain/dates'
import { allMet, minutesLoggedFor, REFLECTION_MIN_CHARS, requirementsFor } from '../domain/progress'
import { emptyLessonRecord, type LearnerData, type LessonRecord } from '../storage/schema'
import { newId, useStore } from '../state/store'
import { Button, Card, CheckIcon, cx, inputClass } from './primitives'
import { inline } from './RichText'

type Slice = 'lessons' | 'challenges'

function ensureRecord(draft: LearnerData, slice: Slice, id: string): LessonRecord {
  const existing = draft[slice][id]
  if (existing) return existing
  const fresh = { ...emptyLessonRecord(), startedAt: new Date().toISOString() }
  draft[slice][id] = fresh
  return fresh
}

/** Checklist, reflection, artifact, time log and completion for a core session or a challenge. */
export function EvidencePanel({
  slice,
  id,
  checklist,
  reflectionPrompts,
  artifactHint,
  locked,
}: {
  slice: Slice
  id: string
  checklist: ChecklistItem[]
  reflectionPrompts: string[]
  artifactHint: string
  locked: boolean
}) {
  const { data, update } = useStore()
  const record = data[slice][id]
  const minutes = minutesLoggedFor(data, id)
  const req = requirementsFor({ checklist }, record, minutes)
  const done = !!record?.completedAt
  const [logMinutes, setLogMinutes] = useState('')
  const [logDate, setLogDate] = useState(toDay(new Date()))
  const uid = useId()
  const reflectionLength = record?.reflection.trim().length ?? 0

  const setField = (fn: (r: LessonRecord) => void) =>
    update((d) => {
      fn(ensureRecord(d, slice, id))
    })

  const addTime = () => {
    const m = Math.round(Number(logMinutes))
    if (!Number.isFinite(m) || m < 1 || m > 1440) return
    update((d) => {
      ensureRecord(d, slice, id)
      d.studyLog.push({ id: newId(), date: logDate, minutes: m, lessonId: id })
    })
    setLogMinutes('')
  }

  const requirementRows: { ok: boolean; label: string }[] = [
    {
      ok: req.checklist,
      label: `Every checklist item ticked (${checklist.filter((c) => record?.checklist[c.id]).length} of ${checklist.length})`,
    },
    {
      ok: req.reflection,
      label: `Reflection of at least ${REFLECTION_MIN_CHARS} characters (${reflectionLength} so far)`,
    },
    {
      ok: req.artifact,
      label: 'Artifact reference added (a file path, link or short description)',
    },
    { ok: req.time, label: `Study time logged (${formatMinutes(minutes)} so far)` },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="mb-3 text-lg font-semibold">Checklist</h2>
        <ul className="space-y-2">
          {checklist.map((item) => {
            const checked = record?.checklist[item.id] === true
            return (
              <li key={item.id}>
                <label
                  className={cx(
                    'flex cursor-pointer items-start gap-3 rounded-lg p-2 hover:bg-stone-50 dark:hover:bg-stone-800/50',
                    (locked || done) && 'cursor-not-allowed opacity-80',
                  )}
                >
                  <input
                    type="checkbox"
                    className="mt-0.5 h-5 w-5 shrink-0 accent-indigo-600"
                    checked={checked}
                    disabled={locked || done}
                    onChange={(e) =>
                      setField((r) => void (r.checklist[item.id] = e.target.checked))
                    }
                  />
                  <span
                    className={cx(
                      'leading-snug',
                      checked && 'text-stone-500 line-through dark:text-stone-400',
                    )}
                  >
                    {inline(item.text)}
                  </span>
                </label>
              </li>
            )
          })}
        </ul>
      </Card>

      <Card>
        <h2 className="mb-1 text-lg font-semibold">Reflection</h2>
        <ul className="mb-3 list-disc pl-5 text-sm text-stone-600 dark:text-stone-400">
          {reflectionPrompts.map((p) => (
            <li key={p}>{inline(p)}</li>
          ))}
        </ul>
        <label htmlFor={`${uid}-reflection`} className="sr-only">
          Reflection
        </label>
        <textarea
          id={`${uid}-reflection`}
          rows={5}
          className={inputClass}
          disabled={locked}
          value={record?.reflection ?? ''}
          onChange={(e) => setField((r) => void (r.reflection = e.target.value))}
          placeholder="What did you learn, what surprised you, what would you do differently?"
        />
        <div className="mt-4 flex flex-col gap-1">
          <label htmlFor={`${uid}-artifact`} className="text-sm font-medium">
            Artifact reference
          </label>
          <input
            id={`${uid}-artifact`}
            className={inputClass}
            disabled={locked}
            value={record?.artifact ?? ''}
            onChange={(e) => setField((r) => void (r.artifact = e.target.value))}
            placeholder="e.g. learning/how-llms-work.md or a pull request link"
          />
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Expected: {inline(artifactHint.replace(/[.!?]$/, ''))}. Do not paste private content
            here; a path or link is enough.
          </p>
        </div>
      </Card>

      <Card>
        <h2 className="mb-1 text-lg font-semibold">Log your time</h2>
        <p className="mb-3 text-sm text-stone-600 dark:text-stone-400">
          Only real, focused time counts toward your stats. Log each block separately.
        </p>
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor={`${uid}-min`} className="text-sm font-medium">
              Minutes
            </label>
            <input
              id={`${uid}-min`}
              type="number"
              inputMode="numeric"
              min={1}
              max={1440}
              className={cx(inputClass, 'w-28')}
              disabled={locked}
              value={logMinutes}
              onChange={(e) => setLogMinutes(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTime()}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor={`${uid}-date`} className="text-sm font-medium">
              Date
            </label>
            <input
              id={`${uid}-date`}
              type="date"
              className={cx(inputClass, 'w-44')}
              disabled={locked}
              value={logDate}
              max={toDay(new Date())}
              onChange={(e) => setLogDate(e.target.value)}
            />
          </div>
          <Button variant="secondary" onClick={addTime} disabled={locked || !logMinutes}>
            Add time
          </Button>
        </div>
        <p className="mt-3 text-sm" aria-live="polite">
          Logged for this item: <strong className="tabular-nums">{formatMinutes(minutes)}</strong>
        </p>
      </Card>

      <Card className={done ? 'border-emerald-300 dark:border-emerald-800' : undefined}>
        {done ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="flex items-center gap-2 font-medium text-emerald-800 dark:text-emerald-300">
              <CheckIcon className="h-5 w-5" /> Completed on {formatDate(record!.completedAt!)}
            </p>
            <Button variant="ghost" onClick={() => setField((r) => void delete r.completedAt)}>
              Reopen
            </Button>
          </div>
        ) : (
          <>
            <h2 className="mb-2 text-lg font-semibold">Complete</h2>
            <ul className="mb-4 space-y-1 text-sm">
              {requirementRows.map((r) => (
                <li key={r.label} className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className={cx(
                      'grid h-5 w-5 place-items-center rounded-full text-xs',
                      r.ok
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-stone-100 text-stone-400 dark:bg-stone-800',
                    )}
                  >
                    {r.ok ? <CheckIcon className="h-3 w-3" /> : ''}
                  </span>
                  <span className={r.ok ? '' : 'text-stone-600 dark:text-stone-400'}>
                    <span className="sr-only">{r.ok ? 'Done: ' : 'Not yet: '}</span>
                    {r.label}
                  </span>
                </li>
              ))}
            </ul>
            <Button
              disabled={locked || !allMet(req)}
              onClick={() => setField((r) => void (r.completedAt = new Date().toISOString()))}
            >
              Mark complete
            </Button>
            {locked && (
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                This level is locked, so progress cannot be recorded yet.
              </p>
            )}
          </>
        )}
      </Card>
    </div>
  )
}
