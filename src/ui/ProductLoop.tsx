import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { productLoop } from '../content/productLoop'
import { cx } from './cx'
import { Stage, tone } from './illustrations/kit'
import { linkClass } from './primitives'
import './illustrations/TeamLoop.css'

// Stages sit on a ring, clockwise from the top. Radius is a share of the ring box.
const radius = 36
const angle = (i: number) => ((-90 + (i * 360) / productLoop.length) * Math.PI) / 180
const ring = `M150 ${150 - radius * 3}a${radius * 3} ${radius * 3} 0 1 1 0 ${radius * 6}a${radius * 3} ${radius * 3} 0 1 1 0 -${radius * 6}`

export function ProductLoop({ compact = false }: { compact?: boolean }) {
  const uid = useId()
  const [active, setActive] = useState(0)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const step = productLoop[active]!
  const move = (event: KeyboardEvent) => {
    const next =
      event.key === 'ArrowRight'
        ? (active + 1) % productLoop.length
        : event.key === 'ArrowLeft'
          ? (active - 1 + productLoop.length) % productLoop.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? productLoop.length - 1
              : null
    if (next === null) return
    event.preventDefault()
    setActive(next)
    buttons.current[next]?.focus()
  }
  return (
    <div className="team-loop">
      <div className="team-loop-body">
        <Stage className="dot-grid team-loop-ring">
          <svg
            aria-hidden
            viewBox="0 0 300 300"
            className="absolute inset-0 h-full w-full"
            fill="none"
          >
            <path
              d={ring}
              className={cx(tone.accentStroke, 'team-loop-flow opacity-60')}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          <div className="team-loop-centre" aria-hidden>
            <svg
              viewBox="0 0 24 24"
              className="mx-auto mb-1 h-5 w-5 text-indigo-600 dark:text-indigo-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="9" r="3.2" />
              <circle cx="16" cy="10" r="2.6" />
              <path d="M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5M14.5 14.6c.5-.2 1-.3 1.5-.3 2.2 0 3.9 1.5 4.4 4.2" />
            </svg>
            <p className="text-xs leading-tight font-semibold">Shared team context</p>
          </div>
          <div role="tablist" aria-label="Product loop stages" onKeyDown={move}>
            {productLoop.map((stage, i) => (
              <button
                key={stage.label}
                ref={(el) => {
                  buttons.current[i] = el
                }}
                type="button"
                role="tab"
                id={`${uid}-stage-${i}`}
                aria-controls={`${uid}-panel`}
                aria-selected={i === active}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                style={{
                  left: `${50 + radius * Math.cos(angle(i))}%`,
                  top: `${50 + radius * Math.sin(angle(i))}%`,
                }}
                className={cx(
                  'team-loop-node cursor-pointer rounded-xl border px-1.5 py-1 text-center shadow-sm transition-[background-color,border-color,color,scale] duration-300',
                  i === active
                    ? 'scale-105 border-indigo-500 bg-indigo-50 text-indigo-950 dark:bg-indigo-950 dark:text-indigo-100'
                    : 'border-stone-300 bg-white hover:border-indigo-400 dark:border-stone-600 dark:bg-stone-900',
                )}
              >
                <span
                  className={cx(
                    'mx-auto mb-0.5 flex h-5 w-5 items-center justify-center rounded-full font-mono text-[11px] font-semibold transition-colors',
                    i === active
                      ? 'bg-indigo-600 text-white dark:bg-indigo-400 dark:text-stone-950'
                      : 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300',
                  )}
                >
                  {i + 1}
                </span>
                <span className="block text-xs leading-tight font-semibold">{stage.label}</span>
              </button>
            ))}
          </div>
        </Stage>
        <div
          role="tabpanel"
          id={`${uid}-panel`}
          aria-labelledby={`${uid}-stage-${active}`}
          tabIndex={0}
          className="rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-900"
        >
          <div key={active} className="animate-pop-in">
            <p className="mb-1 font-mono text-[11px] font-semibold tracking-wide text-indigo-700 uppercase dark:text-indigo-300">
              Stage {active + 1} of {productLoop.length}
            </p>
            <p className="mb-2 text-sm font-semibold">{step.question}</p>
            <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-200">
              {step.description}
            </p>
            {!compact && (
              <p className="mt-3 text-xs leading-relaxed">
                <strong>Move forward with: </strong>
                {step.output}
              </p>
            )}
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
              {step.lessons.map((id) => (
                <Link key={id} to={`/lessons/${id}`} className={linkClass}>
                  Session {id.slice(1)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-xs text-stone-600 dark:text-stone-300">
        Select a stage, or use ← / → when focused. Stages can overlap, repeat or change as the team
        learns.
      </p>
    </div>
  )
}
