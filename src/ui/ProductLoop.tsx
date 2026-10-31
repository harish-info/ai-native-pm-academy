import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { productLoop } from '../content/productLoop'
import { cx } from './cx'
import { linkClass } from './primitives'

const positions = [
  [50, 8],
  [85, 30],
  [85, 70],
  [50, 92],
  [15, 70],
  [15, 30],
]

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
    <div className={cx('product-loop', compact && 'product-loop-compact')}>
      <div className="product-loop-map">
        <svg aria-hidden viewBox="0 0 600 500" className="product-loop-orbit" fill="none">
          <ellipse
            cx="300"
            cy="250"
            rx="240"
            ry="200"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="3 11"
            strokeLinecap="round"
          />
          <path
            d="m508 138 16 1-4-16M319 451l-16-8 2 16M79 361l-1-16-14 8"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        <div className="product-loop-centre" aria-hidden>
          <p className="text-sm font-semibold">One possible loop</p>
          <p className="mt-2 text-xs text-stone-600 dark:text-stone-300">
            Adapt the sequence.
            <br />
            Revisit the problem.
            <br />
            Learn into the next round.
          </p>
        </div>
        <div
          role="tablist"
          aria-label="Product loop stages"
          onKeyDown={move}
          className="product-loop-stages"
        >
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
              style={
                {
                  '--loop-x': `${positions[i]![0]}%`,
                  '--loop-y': `${positions[i]![1]}%`,
                } as CSSProperties
              }
              className={cx(
                'product-loop-node cursor-pointer rounded-xl border px-3 py-3 text-center transition-colors',
                i === active
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-950 dark:bg-indigo-950 dark:text-indigo-100'
                  : 'border-stone-300 bg-white dark:border-stone-600 dark:bg-stone-900',
              )}
            >
              <span className="mb-1 block font-mono text-xs">{i + 1}</span>
              <span className="block text-sm font-semibold leading-snug">{stage.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-stage-${active}`}
        tabIndex={0}
        className="mt-4 rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-900"
      >
        <p className="mb-3 text-base font-semibold">{step.question}</p>
        {!compact && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-1 text-xs font-semibold text-indigo-800 dark:text-indigo-200">
                The PM could help by
              </p>
              <p className="text-sm leading-relaxed">{step.pm}</p>
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold text-indigo-800 dark:text-indigo-200">
                Work together on
              </p>
              <p className="text-sm leading-relaxed">{step.together}</p>
            </div>
          </div>
        )}
        <p className="mt-4 text-sm">
          <strong>Useful output: </strong>
          {step.output}
        </p>
        {!compact && (
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">
            <strong>Watch for: </strong>
            {step.risk}
          </p>
        )}
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs">
          {step.lessons.map((id) => (
            <Link key={id} to={`/lessons/${id}`} className={linkClass}>
              Session {id.slice(1)}
            </Link>
          ))}
        </div>
      </div>
      <p className="mt-3 text-xs text-stone-600 dark:text-stone-300">
        Select a stage, or focus the loop and use ← / →. Verification and shared learning can happen
        throughout; the arrows are a guide to discussion.
      </p>
    </div>
  )
}
