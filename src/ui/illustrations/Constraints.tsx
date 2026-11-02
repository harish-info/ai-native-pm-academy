import { useState } from 'react'
import { lessonVisuals } from '../../content/illustrations'
import { cx } from '../cx'
import { Note, Scene, Segmented, Stage, tone, useReducedMotion } from './kit'
import './Constraints.css'

const data = lessonVisuals.constraints
const left = [40, 150, 260]
const width = 88
const mid = 88
const unit = 8 // Pipe height per item a week.

/** A three-stage pipe. Items flow at the pace of the narrowest stage. */
export default function Constraints() {
  const [selected, setSelected] = useState(0)
  const reduced = useReducedMotion()
  const scenario = data.scenarios[selected]!
  const capacity = Math.min(...scenario.capacities)
  const uneven = Math.max(...scenario.capacities) > capacity
  // The toy model has no queue at steady state; show one only where the scenario text warns of it.
  const queue = scenario.explanation.includes('queue')
  return (
    <div className="space-y-3">
      <Segmented
        label="Workflow scenario"
        labels={data.scenarios.map((s) => s.label)}
        value={selected}
        onChange={setSelected}
      />
      <Stage className="dot-grid px-2 py-2">
        <Scene
          viewBox="0 0 400 156"
          className="max-h-52!"
          label={`${data.stages.map((s, i) => `${s}: ${scenario.capacities[i]} items a week`).join(', ')}. The whole loop moves ${capacity} a week.`}
        >
          {/* Thin connectors between stages */}
          <rect
            x="10"
            y={mid - 6}
            width="350"
            height="12"
            rx="6"
            className={cx(tone.well, tone.line)}
            strokeWidth="1.2"
          />
          {data.stages.map((stage, i) => {
            const cap = scenario.capacities[i]!
            const limit = uneven && cap === capacity
            return (
              <g key={stage}>
                <rect
                  x={left[i]}
                  y={mid - 24}
                  width={width}
                  height="48"
                  rx="6"
                  className={cx(
                    'constraints-pipe',
                    limit ? 'fill-mark-100 dark:fill-stone-800' : tone.tint,
                    limit ? tone.markStroke : 'stroke-indigo-300 dark:stroke-indigo-700',
                  )}
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  style={{ transform: `scaleY(${(cap * unit) / 48})` }}
                />
                <text
                  x={left[i]! + width / 2}
                  y="30"
                  textAnchor="middle"
                  className={cx(tone.text, 'text-[12px] font-semibold')}
                >
                  {stage}
                </text>
                <text
                  key={`${selected}-${i}`}
                  x={left[i]! + width / 2}
                  y="132"
                  textAnchor="middle"
                  className={cx(
                    'illus-pop text-[12px]',
                    limit ? 'fill-mark-900 font-semibold dark:fill-mark-300' : tone.muted,
                  )}
                >
                  {cap} / week
                </text>
                {limit && (
                  <text
                    key={`limit-${selected}-${i}`}
                    x={left[i]! + width / 2}
                    y="148"
                    textAnchor="middle"
                    className="illus-pop fill-mark-900 text-[11px] dark:fill-mark-300"
                  >
                    limits flow
                  </text>
                )}
              </g>
            )
          })}

          {/* Extra generation could pile up in front of verification */}
          {queue && (
            <g key={`q-${selected}`} className="illus-pop" style={{ animationDelay: '0.4s' }}>
              {[
                [244, 58],
                [252, 58],
                [248, 51],
                [240, 51],
                [256, 51],
              ].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="3.5" className={tone.mark} />
              ))}
              <text
                x="248"
                y="42"
                textAnchor="middle"
                className="fill-mark-900 text-[11px] font-semibold dark:fill-mark-300"
              >
                could queue
              </text>
            </g>
          )}

          {/* Items in flight */}
          <g key={`f-${selected}`}>
            {Array.from({ length: capacity }, (_, i) =>
              reduced ? (
                <circle
                  key={i}
                  cx={20 + ((i + 0.5) * 330) / capacity}
                  cy={mid}
                  r="3.5"
                  className={tone.accent}
                />
              ) : (
                <circle
                  key={i}
                  cx="12"
                  cy={mid}
                  r="3.5"
                  className={cx(tone.accent, 'constraints-item')}
                  style={{ animationDelay: `${(-i * 4) / capacity}s` }}
                />
              ),
            )}
          </g>

          {/* Output */}
          <path d="M362 88h10m-4-4 4 4-4 4" className={tone.ink} strokeWidth="1.8" />
          <text
            key={`out-${selected}`}
            x="388"
            y="94"
            textAnchor="middle"
            className={cx(tone.text, 'illus-pop text-[18px] font-bold')}
          >
            {capacity}
          </text>
          <text x="388" y="110" textAnchor="middle" className={cx(tone.muted, 'text-[11px]')}>
            / wk
          </text>
        </Scene>
      </Stage>
      <Note id={selected}>
        <p>
          <strong>Whole-loop capacity: {capacity} items / week</strong>
        </p>
        <p className="mt-1 text-stone-600 dark:text-stone-300">{scenario.explanation}</p>
      </Note>
    </div>
  )
}
