import { useEffect, useRef, useState } from 'react'
import { lessonVisuals } from '../../content/illustrations'
import { cx } from '../cx'
import { controlClass, Note, PlayIcon, Stage, usePlayer, useInView, useReducedMotion } from './kit'

const data = lessonVisuals.tokens

/** A sentence that grows one token at a time, with the candidates the model weighed at each step. */
export default function Tokens() {
  const [run, setRun] = useState(0)
  const steps = data.runs[run]!
  const { step, playing, play, pause, next, goTo } = usePlayer(steps.length, 1300)
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref)
  const started = useRef(false)
  useEffect(() => {
    if (!seen || reduced || started.current) return
    started.current = true
    const timer = window.setTimeout(play, 500)
    return () => window.clearTimeout(timer)
    // play is recreated each render; this intro should run once, when first seen
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen, reduced])
  const current = steps[step]!
  const picked = current.options[current.pick]!
  const sentence = steps.slice(0, step + 1).map((s) => s.options[s.pick]!.token)
  const sample = () => {
    const other = run === 0 ? 1 : 0
    setRun(other)
    if (reduced) goTo(data.runs[other]!.length - 1)
    else play()
  }
  const done = step === steps.length - 1
  return (
    <div className="space-y-3" ref={ref}>
      <Stage className="dot-grid space-y-4 p-4">
        <div>
          <p className="text-xs text-stone-500 dark:text-stone-400">{data.prompt}</p>
          <p
            className="mt-2 flex min-h-9 flex-wrap items-center gap-1.5"
            aria-label={`Answer so far: ${sentence.join(' ')}`}
          >
            {sentence.map((token, i) => (
              <span
                key={`${run}-${i}`}
                className={cx(
                  'rounded-md px-2 py-1 font-mono text-sm',
                  i === step
                    ? 'illus-pop bg-indigo-500 text-white dark:bg-indigo-400 dark:text-stone-950'
                    : 'bg-indigo-50 text-indigo-950 dark:bg-indigo-950 dark:text-indigo-100',
                )}
              >
                {token}
              </span>
            ))}
            {!done && (
              <span
                aria-hidden
                className="illus-typing flex gap-1 rounded-md border border-dashed border-stone-300 px-2 py-2.5 dark:border-stone-600"
              >
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-1 w-1 rounded-full bg-stone-400" />
                ))}
              </span>
            )}
          </p>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-3 dark:border-stone-700 dark:bg-stone-950">
          <p className="mb-2 text-[11px] font-semibold tracking-wide text-stone-500 uppercase dark:text-stone-400">
            Likely next tokens, step {step + 1}
          </p>
          <ul key={`${run}-${step}`} className="space-y-1.5">
            {current.options.map((option, i) => {
              const chosen = i === current.pick
              return (
                <li
                  key={option.token}
                  className="grid grid-cols-[5.5rem_minmax(0,1fr)_2.5rem] items-center gap-2 text-xs"
                >
                  <span
                    className={cx(
                      'truncate font-mono',
                      chosen ? 'font-semibold text-indigo-800 dark:text-indigo-200' : '',
                    )}
                  >
                    {option.token}
                  </span>
                  <span className="h-2.5 overflow-hidden rounded-full bg-stone-100 dark:bg-stone-800">
                    <span
                      className={cx(
                        'bar-grow block h-full rounded-full',
                        chosen
                          ? 'bg-indigo-500 dark:bg-indigo-400'
                          : 'bg-stone-300 dark:bg-stone-600',
                      )}
                      style={{ width: `${option.p}%`, animationDelay: `${i * 70}ms` }}
                    />
                  </span>
                  <span
                    className={cx(
                      'text-right font-mono',
                      chosen ? 'font-semibold' : 'text-stone-500 dark:text-stone-400',
                    )}
                  >
                    {option.p}%
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </Stage>
      <div className="flex flex-wrap gap-2">
        <button type="button" className={controlClass} onClick={playing ? pause : play}>
          <PlayIcon playing={playing} />
          {playing ? 'Pause' : 'Play'}
        </button>
        <button type="button" className={controlClass} onClick={next}>
          Next token
        </button>
        <button type="button" className={controlClass} onClick={sample}>
          Sample again
        </button>
      </div>
      <Note id={`${run}-${step}`}>
        {current.pick === 0 ? (
          <p>
            Picked <strong className="font-mono">{picked.token}</strong>, the likeliest option at{' '}
            {picked.p}%.
          </p>
        ) : (
          <p>
            Picked <strong className="font-mono">{picked.token}</strong> at {picked.p}%. Sampling
            sometimes takes a less likely token, so the same request can produce a different answer.
          </p>
        )}
      </Note>
    </div>
  )
}
