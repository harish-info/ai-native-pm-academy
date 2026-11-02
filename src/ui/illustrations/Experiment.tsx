import { useState } from 'react'
import { lessonVisuals } from '../../content/illustrations'
import { cx } from '../cx'
import { Note, Scene, Segmented, Stage, tone } from './kit'

const data = lessonVisuals.experiment
const min = -6
const max = 8
const x = (v: number) => 30 + ((v - min) / (max - min)) * 340
const zero = x(0)
const ticks = Array.from({ length: (max - min) / 2 + 1 }, (_, i) => min + i * 2)
const signed = (v: number) => (v > 0 ? `+${v}` : String(v))

// Guardrail meter: track from 140 to 370, limit at 70% of the track.
const track = { x: 140, w: 230 }
const limit = track.x + track.w * 0.7

/** An effect interval against harm and benefit, with a safety guardrail that can override it. */
export default function Experiment() {
  const [choice, setChoice] = useState(1)
  const scenario = data.scenarios[choice]!
  const [lo, hi] = scenario.range as [number, number]
  const breached = /guardrail/i.test(scenario.decision)
  const level = breached ? 0.86 : 0.42
  return (
    <div className="space-y-3">
      <Segmented
        label="Explore experiment outcomes"
        labels={data.scenarios.map((s) => s.label)}
        value={choice}
        onChange={setChoice}
      />
      <Stage className="dot-grid px-2 py-3">
        <Scene
          className="max-h-56!"
          viewBox="0 0 400 170"
          label={`Estimated change in the success metric from ${signed(lo)} to ${signed(hi)} percentage points. Safety guardrail ${breached ? 'breached' : 'within its limit'}.`}
        >
          {/* Harm and benefit regions */}
          <rect
            x="30"
            y="22"
            width={zero - 30}
            height="70"
            className="fill-red-500/10 dark:fill-red-400/10"
          />
          <rect
            x={zero}
            y="22"
            width={370 - zero}
            height="70"
            className="fill-emerald-500/10 dark:fill-emerald-400/10"
          />
          <text x="34" y="15" className="fill-red-700 text-[11px] font-semibold dark:fill-red-300">
            Potential harm
          </text>
          <text
            x="366"
            y="15"
            textAnchor="end"
            className="fill-emerald-800 text-[11px] font-semibold dark:fill-emerald-300"
          >
            Potential benefit
          </text>
          <path d={`M${zero} 22V92`} className={tone.ink} strokeWidth="1.4" strokeDasharray="3 4" />

          {/* The interval */}
          <g className="illus-move" style={{ opacity: breached ? 0.45 : 1 }}>
            <rect
              x="0"
              y="53"
              width="1"
              height="6"
              rx="0"
              className="illus-move fill-[var(--viz-series-1)]"
              style={{ transform: `translateX(${x(lo)}px) scaleX(${x(hi) - x(lo)})` }}
            />
            {[lo, hi].map((v, i) => (
              <g key={i} className="illus-move" style={{ transform: `translateX(${x(v)}px)` }}>
                <path d="M0 44V68" className="stroke-[var(--viz-series-1)]" strokeWidth="2.6" />
                <text
                  x="0"
                  y="84"
                  textAnchor="middle"
                  className={cx(tone.text, 'font-mono text-[12px] font-semibold')}
                >
                  {signed(v)}
                </text>
              </g>
            ))}
            <g className="illus-move" style={{ transform: `translateX(${x((lo + hi) / 2)}px)` }}>
              <circle
                cx="0"
                cy="56"
                r="6"
                strokeWidth="2.4"
                className="fill-[var(--viz-series-1)] stroke-white dark:stroke-stone-900"
              />
            </g>
          </g>

          {/* Axis */}
          <path d="M30 92H370" className={tone.ink} strokeWidth="1.4" />
          {ticks.map((t) => (
            <g key={t}>
              <path d={`M${x(t)} 92v4`} className={tone.ink} strokeWidth="1.2" />
              <text
                x={x(t)}
                y="107"
                textAnchor="middle"
                className={cx(t === 0 ? tone.text : tone.muted, 'text-[11px]')}
              >
                {signed(t)}
              </text>
            </g>
          ))}
          <text x="200" y="122" textAnchor="middle" className={cx(tone.muted, 'text-[11px]')}>
            Change in the success metric, percentage points
          </text>

          {/* Safety guardrail */}
          <text x="30" y="153" className={cx(tone.text, 'text-[12px] font-semibold')}>
            Safety guardrail
          </text>
          <rect
            x={track.x}
            y="146"
            width={track.w}
            height="10"
            rx="5"
            className="fill-stone-200 dark:fill-stone-800"
          />
          <rect
            x="0"
            y="146"
            width="1"
            height="10"
            className={cx('illus-move', breached ? tone.bad : tone.good)}
            style={{ transform: `translateX(${track.x}px) scaleX(${track.w * level})` }}
          />
          {breached && (
            <circle
              key={choice}
              cx={track.x + track.w * level}
              cy="151"
              r="9"
              className={cx(tone.bad, 'illus-pulse')}
            />
          )}
          <path d={`M${limit} 141v20`} className={tone.ink} strokeWidth="2" />
          <text x={limit} y="137" textAnchor="middle" className={cx(tone.muted, 'text-[11px]')}>
            Limit
          </text>
          <text
            key={String(breached)}
            x="30"
            y="168"
            className={cx(
              'illus-pop text-[11px] font-semibold',
              breached
                ? 'fill-red-700 dark:fill-red-300'
                : 'fill-emerald-800 dark:fill-emerald-300',
            )}
          >
            {breached ? 'Breached' : 'Within limit'}
          </text>
        </Scene>
      </Stage>
      <Note id={choice} className="min-h-0">
        <p className="text-stone-700 dark:text-stone-200">
          <span className="font-mono font-semibold">
            {signed(lo)} to {signed(hi)} points.
          </span>{' '}
          {scenario.decision}
        </p>
      </Note>
    </div>
  )
}
