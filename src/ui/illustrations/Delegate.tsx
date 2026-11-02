import { useId, useState } from 'react'
import { lessonVisuals } from '../../content/illustrations'
import { cx } from '../cx'
import { Note, Scene, Stage, tone, useReducedMotion } from './kit'

const data = lessonVisuals.delegate
const left = 64
const right = 384
const top = 14
const bottom = 196
// Rotated labels pivot on the canvas origin, not their own box.
const rotated = { transformBox: 'view-box' } as const
const px = (judgment: number) => left + (judgment / 100) * (right - left)
const py = (stakes: number) => bottom - (stakes / 100) * (bottom - top)

/** A two-axis map: how much judgment a task needs against how costly a mistake would be. */
export default function Delegate() {
  const [choice, setChoice] = useState(0)
  const reduced = useReducedMotion()
  const uid = useId().replace(/:/g, '')
  const task = data.tasks[choice]!
  const x = px(task.judgment)
  const y = py(task.stakes)
  const flip = x > 230
  return (
    <div className="space-y-3">
      <Stage className="dot-grid px-2 py-3">
        <Scene
          viewBox="0 0 400 234"
          label={`A map with judgment needed across and cost of a mistake upwards. ${task.label} sits ${task.judgment > 50 ? 'high' : 'low'} on both.`}
        >
          <defs>
            <marker
              id={`${uid}-axis`}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M1 1l8 4-8 4" fill="none" strokeWidth="2" className={tone.ink} />
            </marker>
          </defs>
          {/* Zones */}
          <rect
            x={left + 6}
            y={py(50)}
            width={px(44) - left}
            height={bottom - py(50) - 6}
            rx="14"
            className="fill-emerald-50 stroke-emerald-300 dark:fill-emerald-950/60 dark:stroke-emerald-800"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
          <text
            x={left + 16}
            y={py(50) + 20}
            className="fill-emerald-800 text-[12px] font-semibold dark:fill-emerald-300"
          >
            Delegate, spot-check
          </text>
          <rect
            x={px(58)}
            y={top + 4}
            width={right - px(58) - 4}
            height={py(58) - top - 4}
            rx="14"
            className="fill-mark-100 stroke-mark-300 dark:fill-mark-900/40 dark:stroke-mark-500"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
          <text
            x={right - 14}
            y={py(58) - 12}
            textAnchor="end"
            className="fill-stone-800 text-[12px] font-semibold dark:fill-mark-200"
          >
            Keep it
          </text>

          {/* Axes */}
          <path
            d={`M${left} ${bottom}H${right + 6}`}
            className={tone.ink}
            strokeWidth="1.8"
            markerEnd={`url(#${uid}-axis)`}
          />
          <path
            d={`M${left} ${bottom}V${top - 6}`}
            className={tone.ink}
            strokeWidth="1.8"
            markerEnd={`url(#${uid}-axis)`}
          />
          <text
            x={(left + right) / 2}
            y="222"
            textAnchor="middle"
            className={cx(tone.text, 'text-[13px] font-semibold')}
          >
            Judgment needed
          </text>
          <text x={left} y="222" className={cx(tone.muted, 'text-[11px]')}>
            low
          </text>
          <text x={right} y="222" textAnchor="end" className={cx(tone.muted, 'text-[11px]')}>
            high
          </text>
          <text
            transform={`translate(26 ${(top + bottom) / 2}) rotate(-90)`}
            textAnchor="middle"
            style={rotated}
            className={cx(tone.text, 'text-[13px] font-semibold')}
          >
            Cost of a mistake
          </text>
          <text
            transform={`translate(46 ${bottom}) rotate(-90)`}
            style={rotated}
            className={cx(tone.muted, 'text-[11px]')}
          >
            low
          </text>
          <text
            transform={`translate(46 ${top + 4}) rotate(-90)`}
            textAnchor="end"
            style={rotated}
            className={cx(tone.muted, 'text-[11px]')}
          >
            high
          </text>

          {/* Every task, then the selected one */}
          {data.tasks.map((t, i) => (
            <circle
              key={t.label}
              cx={px(t.judgment)}
              cy={py(t.stakes)}
              r="5"
              className={cx(
                i === choice ? 'opacity-0' : 'opacity-100',
                'illus-move fill-white stroke-stone-500 dark:fill-stone-900 dark:stroke-stone-400',
              )}
              strokeWidth="2"
            />
          ))}
          <g className="illus-move" style={{ transform: `translate(${x}px, ${y}px)` }}>
            {!reduced && <circle r="10" className={cx(tone.accent, 'illus-pulse')} />}
            <circle
              r="8"
              className={cx(tone.accent, 'stroke-white dark:stroke-stone-950')}
              strokeWidth="2.5"
            />
            <text
              key={task.label}
              x={flip ? -16 : 16}
              y="4"
              textAnchor={flip ? 'end' : 'start'}
              className="illus-pop fill-indigo-800 text-[13px] font-semibold dark:fill-indigo-200"
              stroke="none"
            >
              {task.label}
            </text>
          </g>
        </Scene>
      </Stage>
      <div role="group" aria-label="Choose a task" className="flex flex-wrap gap-1.5">
        {data.tasks.map((t, i) => (
          <button
            key={t.label}
            type="button"
            aria-pressed={i === choice}
            onClick={() => setChoice(i)}
            className={cx(
              'min-h-8 cursor-pointer rounded-full border px-3 py-1 text-xs font-medium transition-colors',
              i === choice
                ? 'border-indigo-500 bg-indigo-50 text-indigo-900 dark:border-indigo-400 dark:bg-indigo-950 dark:text-indigo-100'
                : 'border-stone-300 text-stone-700 hover:border-indigo-400 dark:border-stone-600 dark:text-stone-200',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <Note id={choice}>
        <p>
          <strong>{task.label}.</strong> {task.advice}
        </p>
      </Note>
    </div>
  )
}
