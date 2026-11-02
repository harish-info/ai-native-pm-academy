import { useEffect, useState } from 'react'
import { lessonVisuals } from '../../content/illustrations'
import { cx } from '../cx'
import { Segmented, Stage, useReducedMotion } from './kit'

const data = lessonVisuals.requirements.questions

function Avatar({ agent }: { agent: boolean }) {
  return (
    <span
      aria-hidden
      className={cx(
        'grid h-7 w-7 shrink-0 place-items-center rounded-full',
        agent
          ? 'bg-stone-800 text-white dark:bg-stone-200 dark:text-stone-900'
          : 'bg-mark-200 text-stone-900',
      )}
    >
      <svg
        viewBox="0 0 20 20"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        {agent ? (
          <>
            <rect x="4" y="6" width="12" height="9" rx="3" />
            <path d="M8 10h.01M12 10h.01M10 3v3" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="10" cy="7" r="3" />
            <path d="M4 17a6 6 0 0 1 12 0" strokeLinecap="round" />
          </>
        )}
      </svg>
    </span>
  )
}

/** Interview on the left, the requirements file filling up on the right. */
export default function Requirements() {
  const [choice, setChoice] = useState(0)
  const [shown, setShown] = useState(0)
  const [written, setWritten] = useState<number[]>([0])
  const reduced = useReducedMotion()
  const typing = shown !== choice
  const write = (i: number) => {
    setShown(i)
    setWritten((w) => (w.includes(i) ? w : [...w, i]))
  }
  useEffect(() => {
    if (shown === choice) return
    const timer = window.setTimeout(() => write(choice), 650)
    return () => window.clearTimeout(timer)
  }, [choice, shown])
  const answered = typing ? null : choice
  const pick = (i: number) => {
    setChoice(i)
    if (reduced) write(i)
  }
  const q = data[choice]!
  return (
    <div className="space-y-3">
      <Segmented
        label="Explore interview questions"
        labels={data.map((x) => x.label)}
        value={choice}
        onChange={pick}
      />
      <Stage className="dot-grid p-3 sm:p-4">
        <div className="req-grid">
          <div className="space-y-2.5" aria-live="polite">
            <p className="text-[11px] font-semibold tracking-wide text-stone-500 uppercase dark:text-stone-400">
              GrillMe interview
            </p>
            <div key={`q${choice}`} className="animate-pop-in flex items-end gap-2">
              <Avatar agent />
              <p className="rounded-2xl rounded-bl-sm bg-stone-100 px-3 py-2 text-sm dark:bg-stone-800">
                {q.label}
              </p>
            </div>
            <div className="flex items-end justify-end gap-2">
              {answered === null ? (
                <p
                  className="illus-typing flex gap-1 rounded-2xl rounded-br-sm bg-indigo-50 px-3 py-3 dark:bg-indigo-950"
                  aria-label="Answering"
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-indigo-500 dark:bg-indigo-300"
                    />
                  ))}
                </p>
              ) : (
                <p
                  key={`a${answered}`}
                  className="animate-pop-in rounded-2xl rounded-br-sm bg-indigo-50 px-3 py-2 text-sm text-indigo-950 dark:bg-indigo-950 dark:text-indigo-50"
                >
                  “{data[answered]!.answer}”
                </p>
              )}
              <Avatar agent={false} />
            </div>
          </div>

          <svg
            aria-hidden
            viewBox="0 0 48 24"
            className="req-arrow text-indigo-500 dark:text-indigo-400"
            fill="none"
          >
            <path className="illus-flow" d="M2 12h38" stroke="currentColor" strokeWidth="2" />
            <path
              d="m36 6 7 6-7 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm dark:border-stone-700 dark:bg-stone-950">
            <div className="flex items-center gap-2 border-b border-stone-200 bg-stone-50 px-3 py-1.5 dark:border-stone-700 dark:bg-stone-900">
              <svg
                aria-hidden
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              >
                <path d="M4 1.5h5l3 3v10H4zM9 1.5v3h3" strokeLinejoin="round" />
              </svg>
              <span className="font-mono text-xs font-semibold">REQUIREMENTS.md</span>
            </div>
            <div className="space-y-2 p-3">
              <p className="font-mono text-xs text-stone-500 dark:text-stone-400">## Checks</p>
              <ul className="space-y-2">
                {data.map((item, i) => {
                  const done = written.includes(i)
                  const current = i === shown && !typing
                  return (
                    <li key={item.label} className="flex items-start gap-2">
                      <span
                        aria-hidden
                        className={cx(
                          'mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded border transition-colors duration-300',
                          done
                            ? 'border-emerald-500 bg-emerald-500 text-white dark:border-emerald-400 dark:bg-emerald-400 dark:text-stone-950'
                            : 'border-stone-300 dark:border-stone-600',
                        )}
                      >
                        {done && (
                          <svg
                            viewBox="0 0 12 12"
                            className="h-3 w-3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              className="illus-draw"
                              style={{ ['--len' as string]: 14 }}
                              d="m2.5 6.5 2.5 2.5 4.5-5.5"
                            />
                          </svg>
                        )}
                      </span>
                      {done ? (
                        <span
                          className={cx(
                            'text-xs leading-snug',
                            current && 'illus-flash font-medium',
                          )}
                        >
                          {item.check}
                        </span>
                      ) : (
                        <span
                          aria-hidden
                          className="mt-1 block h-2.5 w-4/5 rounded bg-stone-100 dark:bg-stone-800"
                        />
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </Stage>
      <p className="text-xs text-stone-600 dark:text-stone-300">
        Each answer becomes a check you can observe. {written.length} of {data.length} written.
      </p>
    </div>
  )
}
