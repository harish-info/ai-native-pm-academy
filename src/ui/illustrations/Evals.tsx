import { useState } from 'react'
import { lessonVisuals } from '../../content/illustrations'
import { cx } from '../cx'
import { controlClass, Note, Scene, Stage, tone, Verdict } from './kit'
import './Evals.css'

const cases = lessonVisuals.evals.cases
const passed = cases.filter((c) => c.result === 'Pass').length
const pct = Math.round((passed / cases.length) * 100)
const rowY = (i: number) => 22 + i * 30

// The ring arc for the pass rate, drawn clockwise from the top.
const angle = (pct / 100) * 2 * Math.PI
const ringEnd = { x: 70 + 44 * Math.sin(angle), y: 74 - 44 * Math.cos(angle) }
const ringPath = `M70 30A44 44 0 ${pct > 50 ? 1 : 0} 1 ${ringEnd.x.toFixed(1)} ${ringEnd.y.toFixed(1)}`

const trace = [
  { label: 'Polite final answer', detail: 'Reads as harmless', bad: false },
  { label: 'Unrequested tool call', detail: 'Nobody asked for it', bad: true },
  { label: 'Record changed', detail: 'The state is now wrong', bad: true },
]

function TraceIcon({ step }: { step: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className="h-5 w-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {step === 0 && <path d="M3 5h14v8H9l-4 3v-3H3z" />}
      {step === 1 && <path d="M8 12l5-5m-1.5-3a3.5 3.5 0 1 0 3.5 3.5M4 16l4-4" />}
      {step === 2 && (
        <>
          <ellipse cx="10" cy="5" rx="6" ry="2.4" />
          <path d="M4 5v10c0 1.3 2.7 2.4 6 2.4s6-1.1 6-2.4V5M4 10c0 1.3 2.7 2.4 6 2.4s6-1.1 6-2.4" />
        </>
      )}
    </svg>
  )
}

/** A good-looking pass rate, the one failure behind it, and the release gate it keeps shut. */
export default function Evals() {
  const [inspect, setInspect] = useState(false)
  const failed = cases.findIndex((c) => c.result === 'Fail')
  return (
    <div className="space-y-3">
      <Stage className="dot-grid px-2 py-3">
        <Scene
          className="max-h-52!"
          viewBox="4 0 400 140"
          label={`${pct}% of cases pass: ${cases.map((c) => `${c.label} ${c.result.toLowerCase()}`).join(', ')}. The release gate stays closed.`}
        >
          {/* Score ring */}
          <circle cx="70" cy="74" r="44" className={tone.faint} strokeWidth="10" />
          <path
            d={ringPath}
            pathLength={1}
            className="illus-draw stroke-[var(--viz-series-1)]"
            strokeWidth="10"
            style={{ ['--len' as string]: 1, animationDuration: '1s' }}
          />
          <text
            x="70"
            y="80"
            textAnchor="middle"
            className={cx(tone.text, 'font-mono text-[22px] font-semibold')}
          >
            {pct}%
          </text>
          <text x="70" y="134" textAnchor="middle" className={cx(tone.muted, 'text-[11px]')}>
            {passed} of {cases.length} pass
          </text>

          {/* Cases */}
          {cases.map((c, i) => {
            const fail = c.result === 'Fail'
            return (
              <g key={c.label}>
                <rect
                  x="136"
                  y={rowY(i) - 11}
                  width="170"
                  height="22"
                  rx="6"
                  strokeWidth="1.4"
                  className={cx(
                    'illus-move',
                    fail && inspect
                      ? 'fill-red-50 stroke-red-500 dark:fill-red-950 dark:stroke-red-400'
                      : cx(tone.paper, tone.faint),
                  )}
                />
                {fail && inspect && (
                  <circle cx="150" cy={rowY(i)} r="8" className={cx(tone.bad, 'illus-pulse')} />
                )}
                <g className="illus-pop" style={{ animationDelay: `${0.3 + i * 0.15}s` }}>
                  <Verdict x={150} y={rowY(i)} ok={!fail} r={7} />
                </g>
                <text
                  x="164"
                  y={rowY(i) + 4}
                  className={cx(
                    fail ? tone.text : tone.muted,
                    'text-[12px]',
                    fail && 'font-semibold',
                  )}
                >
                  {c.label}
                </text>
              </g>
            )
          })}

          {/* Failure holds the gate */}
          <path
            d={`M308 ${rowY(failed)}h6V64h10`}
            className={cx(tone.badStroke, 'illus-flow')}
            strokeWidth={inspect ? 2.6 : 1.6}
          />
          <path d="M328 30v74M378 30v74M318 104h70" className={tone.ink} strokeWidth="2.4" />
          <g key={String(inspect)} className={inspect ? 'evals-shake' : undefined}>
            <rect
              x="324"
              y="58"
              width="58"
              height="12"
              rx="3"
              className={cx(tone.bad, tone.badStroke)}
              strokeWidth="1"
            />
            <path
              d="M336 58l-6 12M350 58l-6 12M364 58l-6 12M378 58l-6 12"
              className="stroke-white dark:stroke-stone-950"
              strokeWidth="3"
            />
          </g>
          <text
            x="353"
            y="122"
            textAnchor="middle"
            className={cx(tone.text, 'text-[12px] font-semibold')}
          >
            Release
          </text>
          <text
            x="353"
            y="136"
            textAnchor="middle"
            className="fill-red-700 text-[11px] font-semibold dark:fill-red-300"
          >
            blocked
          </text>
        </Scene>
      </Stage>
      <button
        type="button"
        aria-expanded={inspect}
        className={controlClass}
        onClick={() => setInspect(!inspect)}
      >
        {inspect ? 'Hide failure detail' : 'Inspect the failed case'}
      </button>
      {inspect && (
        <ol aria-label="Trace of the failed case" className="grid gap-2 text-xs sm:grid-cols-3">
          {trace.map((t, i) => (
            <li
              key={t.label}
              className={cx(
                'animate-pop-in flex items-center gap-2 rounded-lg border px-2.5 py-2',
                t.bad
                  ? 'border-red-300 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200'
                  : 'border-stone-200 bg-white text-stone-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200',
              )}
              style={{ animationDelay: `${i * 0.25}s` }}
            >
              <TraceIcon step={i} />
              <span>
                <span className="block font-semibold">{t.label}</span>
                <span className="block opacity-80">{t.detail}</span>
              </span>
            </li>
          ))}
        </ol>
      )}
      <Note id={String(inspect)} className="min-h-0">
        <p className="text-stone-700 dark:text-stone-200">
          {inspect
            ? 'The final text looks harmless. The tool trace and changed record show the failure.'
            : `${passed} of ${cases.length} cases pass, and the release is still blocked.`}
        </p>
      </Note>
    </div>
  )
}
