import { useEffect, useState } from 'react'
import { lessonVisuals } from '../../content/illustrations'
import { cx } from '../cx'
import { controlClass, Note, Stage, useReducedMotion } from './kit'

const data = lessonVisuals.review
const screenTotal = data.tasks.filter((t) => t.screen).length
const handTotal = data.tasks.filter((t) => t.overdue).length

function Mark({ on, wrong }: { on: boolean; wrong?: boolean }) {
  if (!on) return <span className="text-stone-400 dark:text-stone-500">–</span>
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={cx(
        'inline-block h-4 w-4',
        wrong ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400',
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  )
}

/** A prototype's overdue count, checked row by row against a count made by hand. */
export default function Review() {
  const [checking, setChecking] = useState(false)
  const [count, setCount] = useState(0)
  const reduced = useReducedMotion()
  const rows = data.tasks.length
  useEffect(() => {
    if (!checking || count > rows) return
    const timer = window.setTimeout(() => setCount(count + 1), 450)
    return () => window.clearTimeout(timer)
  }, [checking, count, rows])
  const shown = checking ? count : 0
  const done = shown > rows
  const toggle = () => {
    if (checking) {
      setChecking(false)
      setCount(0)
    } else {
      setChecking(true)
      setCount(reduced ? rows + 1 : 0)
    }
  }
  const cell = 'px-3 py-2'
  return (
    <div className="space-y-3">
      <Stage className="dot-grid p-3 sm:p-5">
        <div className="mx-auto max-w-md overflow-hidden rounded-xl border border-stone-300 bg-white shadow-sm dark:border-stone-700 dark:bg-stone-900">
          <div className="flex items-center justify-between border-b border-stone-200 px-3 py-2 dark:border-stone-700">
            <span className="text-sm font-semibold text-stone-800 dark:text-stone-100">
              Project tasks
            </span>
            <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-600 dark:bg-stone-800 dark:text-stone-300">
              Today: {data.today}
            </span>
          </div>
          <table className="w-full text-sm">
            <caption className="sr-only">
              Each task with its due date, whether the prototype counts it as overdue and whether
              you do.
            </caption>
            <thead>
              <tr className="text-left text-xs text-stone-500 dark:text-stone-400">
                <th scope="col" className={cx(cell, 'font-medium')}>
                  Task
                </th>
                <th scope="col" className={cx(cell, 'font-medium')}>
                  Due
                </th>
                <th scope="col" className={cx(cell, 'text-center font-medium')}>
                  Screen
                </th>
                <th scope="col" className={cx(cell, 'text-center font-medium')}>
                  You
                </th>
              </tr>
            </thead>
            <tbody>
              {data.tasks.map((task, i) => {
                const counted = shown > i
                const wrong = done && task.screen !== task.overdue
                return (
                  <tr
                    key={task.name}
                    className={cx(
                      'border-t border-stone-100 transition-colors duration-300 dark:border-stone-800',
                      wrong && 'bg-red-50 dark:bg-red-950/60',
                    )}
                  >
                    <th
                      scope="row"
                      className={cx(
                        cell,
                        'text-left font-normal text-stone-800 dark:text-stone-100',
                      )}
                    >
                      {task.name}
                    </th>
                    <td
                      className={cx(cell, 'whitespace-nowrap text-stone-600 dark:text-stone-300')}
                    >
                      {task.due}
                    </td>
                    <td className={cx(cell, 'text-center')}>
                      <Mark on={task.screen} />
                      {wrong && <span className="sr-only"> missed</span>}
                    </td>
                    <td className={cx(cell, 'text-center')}>
                      {counted ? (
                        <span className="animate-pop-in inline-block">
                          <Mark on={task.overdue} wrong={wrong} />
                        </span>
                      ) : (
                        <span className="text-stone-300 dark:text-stone-600">?</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-stone-200 font-semibold dark:border-stone-700">
                <th
                  scope="row"
                  className={cx(cell, 'text-left text-stone-800 dark:text-stone-100')}
                >
                  Overdue
                </th>
                <td className={cell} />
                <td
                  className={cx(
                    cell,
                    'text-center text-base',
                    done ? 'text-red-700 dark:text-red-300' : 'text-stone-800 dark:text-stone-100',
                  )}
                >
                  {screenTotal}
                </td>
                <td
                  className={cx(cell, 'text-center text-base text-stone-800 dark:text-stone-100')}
                >
                  {done ? (
                    <span className="animate-pop-in inline-block">{handTotal}</span>
                  ) : (
                    <span className="text-stone-300 dark:text-stone-600">?</span>
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Stage>

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" className={controlClass} onClick={toggle}>
          {checking ? 'Reset' : 'Count by hand'}
        </button>
        {!done && (
          <span className="text-sm text-stone-500 dark:text-stone-400">
            A task is overdue when its due date is before today.
          </span>
        )}
      </div>

      <Note id={done ? 'report' : 'idle'}>
        {done ? (
          <>
            <p className="text-xs font-semibold text-red-700 dark:text-red-300">
              The screen says {screenTotal}, you count {handTotal}. Write it up:
            </p>
            <dl className="mt-2 grid gap-1.5 text-sm sm:grid-cols-[5.5rem_minmax(0,1fr)]">
              {data.report.map((row) => (
                <div key={row.label} className="contents">
                  <dt className="font-semibold text-stone-500 dark:text-stone-400">{row.label}</dt>
                  <dd className="mb-1.5 sm:mb-0">{row.text}</dd>
                </div>
              ))}
            </dl>
          </>
        ) : null}
      </Note>
    </div>
  )
}
