import { useEffect, useRef, useState } from 'react'
import { cx } from '../cx'
import { Note, Segmented, Stage } from './kit'
import './Screens.css'

const states = ['Ready', 'Empty', 'Loading', 'Error'] as const
const items = ['Refund request', 'Address change', 'Plan upgrade']

// What the spec has to say for each condition.
const spec = [
  { shows: 'The list, with a count and each item’s status', next: 'Open an item to review it' },
  { shows: 'A plain reason the list is empty', next: 'Nothing to do; say when items will arrive' },
  { shows: 'Placeholders shaped like the content', next: 'Wait; the layout should not jump' },
  { shows: 'What failed, and that their data is safe', next: 'Retry without losing their place' },
]

function Ready() {
  return (
    <div className="space-y-2">
      <p className="text-[11px] text-stone-500 dark:text-stone-400">3 items · Updated just now</p>
      {items.map((label, i) => (
        <div
          key={label}
          className="screens-in flex items-center gap-2.5 rounded-lg border border-stone-200 bg-white px-2.5 py-2 dark:border-stone-700 dark:bg-stone-900"
          style={{ animationDelay: `${i * 90}ms` }}
        >
          <span
            aria-hidden
            className="h-7 w-7 shrink-0 rounded-full bg-indigo-100 dark:bg-indigo-900"
          />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-xs font-medium">{label}</span>
            <span className="mt-0.5 flex items-center gap-1 text-[10px] font-medium text-stone-600 dark:text-stone-300">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-mark-400" />
              Needs review
            </span>
          </span>
        </div>
      ))}
    </div>
  )
}

function Empty() {
  return (
    <div className="screens-in grid justify-items-center gap-1.5 pt-6 text-center">
      <svg aria-hidden viewBox="0 0 64 48" className="illus-float mb-1 h-12 w-16" fill="none">
        <path
          d="M8 26 16 8h32l8 18v14H8z"
          className="fill-indigo-50 stroke-indigo-500 dark:fill-indigo-950 dark:stroke-indigo-400"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M8 26h14l3 6h14l3-6h14"
          className="stroke-indigo-500 dark:stroke-indigo-400"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="m26 15 4 4 8-8"
          className="stroke-emerald-600 dark:stroke-emerald-400"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="text-sm font-semibold">Nothing needs review</p>
      <p className="text-xs text-stone-600 dark:text-stone-300">New items will appear here.</p>
    </div>
  )
}

function Loading() {
  return (
    <div className="space-y-2">
      <p className="text-[11px] text-stone-500 dark:text-stone-400">Loading your items…</p>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          aria-hidden
          className="flex items-center gap-2.5 rounded-lg border border-stone-200 px-2.5 py-2 dark:border-stone-700"
        >
          <span className="concept-skeleton h-7 w-7 shrink-0 rounded-full bg-stone-200 dark:bg-stone-700" />
          <span className="flex-1 space-y-1.5 py-0.5">
            <span
              className="concept-skeleton block h-3 rounded bg-stone-200 dark:bg-stone-700"
              style={{ width: `${[70, 55, 62][i]}%` }}
            />
            <span className="concept-skeleton block h-2 w-2/5 rounded bg-stone-200 dark:bg-stone-700" />
          </span>
        </div>
      ))}
    </div>
  )
}

function Failed({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="screens-in grid justify-items-center gap-1.5 pt-4 text-center">
      <svg aria-hidden viewBox="0 0 64 48" className="mb-1 h-12 w-16" fill="none">
        <path
          d="M18 38a10 10 0 0 1-1-20 14 14 0 0 1 27-3 11 11 0 0 1 3 23z"
          className="fill-red-50 stroke-red-500 dark:fill-red-950 dark:stroke-red-400"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="m27 21 10 10m0-10L27 31"
          className="stroke-red-500 dark:stroke-red-400"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <p className="text-sm font-semibold">Could not load your items</p>
      <p className="px-1 text-xs text-stone-600 dark:text-stone-300">
        Your data has not changed. Try again when the connection returns.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-1 min-h-8 cursor-pointer rounded-lg bg-indigo-600 px-3 text-xs font-semibold text-white hover:bg-indigo-700 dark:bg-indigo-400 dark:text-stone-950 dark:hover:bg-indigo-300"
      >
        Retry
      </button>
    </div>
  )
}

/** One phone screen in four conditions, with what the spec has to define for each. */
export default function Screens() {
  const [state, setState] = useState(0)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  const choose = (n: number) => {
    window.clearTimeout(timer.current)
    setState(n)
  }
  const retry = () => {
    choose(2)
    timer.current = window.setTimeout(() => setState(0), 1400)
  }
  const current = spec[state]!
  return (
    <div className="space-y-3">
      <Segmented label="Explore screen states" labels={states} value={state} onChange={choose} />
      <Stage className="dot-grid p-4">
        <div className="grid items-center gap-4 sm:grid-cols-[14.5rem_minmax(0,16rem)] sm:justify-center sm:gap-8">
          <div className="mx-auto w-full max-w-[14.5rem] rounded-[1.75rem] border-2 border-stone-300 bg-stone-100 p-1.5 shadow-sm dark:border-stone-600 dark:bg-stone-800">
            <div className="h-[16.5rem] overflow-hidden rounded-[1.35rem] bg-stone-50 dark:bg-stone-950">
              <div className="flex justify-center pt-1.5" aria-hidden>
                <span className="h-1.5 w-12 rounded-full bg-stone-300 dark:bg-stone-700" />
              </div>
              <div className="flex items-center justify-between border-b border-stone-200 px-3 py-2 dark:border-stone-800">
                <p className="text-sm font-semibold">Review queue</p>
                <span
                  aria-hidden
                  className={cx(
                    'h-2 w-2 rounded-full transition-colors',
                    state === 3
                      ? 'bg-red-500'
                      : state === 2
                        ? 'bg-mark-400'
                        : 'bg-emerald-500 dark:bg-emerald-400',
                  )}
                />
              </div>
              <div key={state} className="p-3">
                {state === 0 ? (
                  <Ready />
                ) : state === 1 ? (
                  <Empty />
                ) : state === 2 ? (
                  <Loading />
                ) : (
                  <Failed onRetry={retry} />
                )}
              </div>
            </div>
          </div>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-[11px] font-semibold tracking-wide text-stone-500 uppercase dark:text-stone-400">
                Condition
              </dt>
              <dd className="mt-0.5 font-semibold text-indigo-800 dark:text-indigo-200">
                {states[state]}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold tracking-wide text-stone-500 uppercase dark:text-stone-400">
                What appears
              </dt>
              <dd className="mt-0.5">{current.shows}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold tracking-wide text-stone-500 uppercase dark:text-stone-400">
                Next action
              </dt>
              <dd className="mt-0.5">{current.next}</dd>
            </div>
          </dl>
        </div>
      </Stage>
      <Note id={state} className="sr-only">
        <p>
          {states[state]} state. {current.shows}. {current.next}.
        </p>
      </Note>
    </div>
  )
}
