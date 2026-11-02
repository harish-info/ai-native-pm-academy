import { useState } from 'react'
import { lessonVisuals } from '../../content/illustrations'
import { cx } from '../cx'
import { Note, Stage } from './kit'

const data = lessonVisuals.diff

// Old and new line numbers, as a code review tool shows them.
const numbered = (() => {
  let oldNo = 0
  let newNo = 0
  return data.lines.map((line) => {
    if (line.kind !== '+') oldNo += 1
    if (line.kind !== '-') newNo += 1
    return {
      ...line,
      oldNo: line.kind === '+' ? '' : oldNo,
      newNo: line.kind === '-' ? '' : newNo,
    }
  })
})()
const added = data.lines.filter((l) => l.kind === '+').length
const removed = data.lines.filter((l) => l.kind === '-').length

function Mark({ ok, className }: { ok: boolean; className?: string }) {
  return (
    <span
      aria-hidden
      className={cx(
        'grid h-4 w-4 shrink-0 place-items-center rounded-full text-[10px] font-bold',
        ok
          ? 'bg-emerald-500 text-white dark:bg-emerald-400 dark:text-stone-950'
          : 'bg-mark-400 text-stone-900',
        className,
      )}
    >
      {ok ? '✓' : '!'}
    </span>
  )
}

/** A small pull request diff, read through four questions that need no coding knowledge. */
export default function Diff() {
  const [choice, setChoice] = useState(0)
  const [asked, setAsked] = useState<number[]>([0])
  const question = data.questions[choice]!
  const focus = new Set(question.lines)
  const ask = (i: number) => {
    setChoice(i)
    if (!asked.includes(i)) setAsked([...asked, i])
  }
  return (
    <div className="space-y-3">
      <Stage className="dot-grid p-3">
        <div className="overflow-hidden rounded-lg border border-stone-200 bg-white dark:border-stone-700 dark:bg-stone-950">
          <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 px-3 py-2 dark:border-stone-700">
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
              Open
            </span>
            <p className="min-w-0 flex-1 text-xs font-semibold">{data.description}</p>
          </div>
          <div className="flex items-center justify-between gap-2 border-b border-stone-200 bg-stone-50 px-3 py-1.5 font-mono text-[11px] dark:border-stone-700 dark:bg-stone-900">
            <span>{data.file}</span>
            <span>
              <span className="text-emerald-700 dark:text-emerald-300">+{added}</span>{' '}
              <span className="text-red-700 dark:text-red-300">-{removed}</span>
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-max min-w-full border-collapse font-mono text-[11px] leading-6">
              <tbody>
                {numbered.map((line, i) => {
                  const on = focus.has(i)
                  return (
                    <tr
                      key={i}
                      className={cx(
                        'transition-colors duration-300',
                        !on && 'text-stone-500 dark:text-stone-400',
                        line.kind === '+' && 'bg-emerald-50 dark:bg-emerald-950/50',
                        line.kind === '-' && 'bg-red-50 dark:bg-red-950/40',
                      )}
                    >
                      <td
                        className={cx(
                          'w-1 p-0',
                          on && (question.ok ? 'bg-emerald-500' : 'bg-mark-400'),
                        )}
                      />
                      {[line.oldNo, line.newNo].map((n, k) => (
                        <td
                          key={k}
                          className="w-7 min-w-7 pr-1.5 pl-1 text-right text-stone-500 select-none dark:text-stone-400"
                        >
                          {n}
                        </td>
                      ))}
                      <td
                        className={cx(
                          'w-4 min-w-4 text-center select-none',
                          line.kind === '+' && 'text-emerald-700 dark:text-emerald-300',
                          line.kind === '-' && 'text-red-700 dark:text-red-300',
                        )}
                      >
                        {line.kind === ' ' ? '' : line.kind}
                      </td>
                      <td className={cx('pr-3 whitespace-pre', on && 'font-semibold')}>
                        {line.text}
                      </td>
                    </tr>
                  )
                })}
                {focus.size === 0 && (
                  <tr className="illus-pop">
                    <td colSpan={5} className="p-1.5">
                      <p className="rounded-md border border-dashed border-mark-400 px-3 py-1 font-sans text-[11px] text-stone-700 dark:text-stone-200">
                        No test file in this pull request
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Stage>
      <div role="group" aria-label="Review questions" className="grid gap-1.5 sm:grid-cols-2">
        {data.questions.map((q, i) => (
          <button
            key={q.label}
            type="button"
            aria-pressed={i === choice}
            onClick={() => ask(i)}
            className={cx(
              'flex min-h-9 cursor-pointer items-center gap-2 rounded-lg border px-3 py-1.5 text-left text-xs font-medium transition-colors',
              i === choice
                ? 'border-indigo-500 bg-indigo-50 text-indigo-900 dark:border-indigo-400 dark:bg-indigo-950 dark:text-indigo-100'
                : 'border-stone-300 bg-white text-stone-700 hover:border-indigo-400 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-200',
            )}
          >
            <span className="flex-1">{q.label}</span>
            {asked.includes(i) && <Mark ok={q.ok} className="illus-pop" />}
          </button>
        ))}
      </div>
      <Note id={choice}>
        <p className="flex items-start gap-2">
          <Mark ok={question.ok} className="mt-0.5" />
          <span>{question.verdict}</span>
        </p>
      </Note>
    </div>
  )
}
