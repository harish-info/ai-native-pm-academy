import { useState } from 'react'
import { lessonVisuals } from '../../content/illustrations'
import { cx } from '../cx'
import { Scene, Segmented, Stage, tone, useReducedMotion } from './kit'

const data = lessonVisuals.funnel
const max = data.stages[0]!.count
const cx0 = 122
const half = (count: number) => 18 + (count / max) * 82
const bands = data.stages.map((stage, i) => {
  const top = 18 + i * 60
  const next = data.stages[i + 1]?.count ?? stage.count * 0.8
  const a = half(stage.count)
  const b = half(next)
  return {
    ...stage,
    top,
    mid: top + 25,
    d: `M${cx0 - a} ${top}H${cx0 + a}L${cx0 + b} ${top + 50}H${cx0 - b}Z`,
  }
})

// Five illustrative people: two leave after signing up, two after viewing, one completes.
const people = [
  { x: -30, exit: 0, side: -1 },
  { x: 14, exit: 1, side: 1 },
  { x: 40, exit: 0, side: 1 },
  { x: -12, exit: 1, side: -1 },
  { x: 2, exit: 2, side: 0 },
]
function personPath(p: (typeof people)[number]) {
  const startX = cx0 + p.x
  if (p.side === 0) return `M${startX} 26L${cx0} 120L${cx0} 186`
  // Leavers drop to the gap below their stage, then slide out through it.
  const y = 73 + p.exit * 60
  const inX = cx0 + p.x * (p.exit ? 0.4 : 0.6)
  return `M${startX} 26L${inX} ${y - 8}Q${inX} ${y} ${inX + p.side * 12} ${y}L${cx0 + p.side * 140} ${y}`
}

export default function Funnel() {
  const [denominator, setDenominator] = useState(0)
  const reduced = useReducedMotion()
  const completed = data.stages[2]!.count
  const baseIndex = denominator ? 0 : 1
  const base = data.stages[baseIndex]!
  const top = bands[baseIndex]!.mid
  const bottom = bands[2]!.mid
  return (
    <div className="space-y-3">
      <Segmented
        label="Choose the funnel denominator"
        labels={['Of screen viewers', 'Of all signups']}
        value={denominator}
        onChange={setDenominator}
      />
      <Stage className="dot-grid px-2 py-3">
        <Scene
          className="max-h-56!"
          viewBox="0 0 400 200"
          label={`A funnel: ${data.stages.map((s) => `${s.count} ${s.label.toLowerCase()}`).join(', ')}. The rate divides completions by ${base.label.toLowerCase()}.`}
        >
          {bands.map((band, i) => (
            <path
              key={band.label}
              d={band.d}
              strokeWidth="2"
              className={cx(
                'illus-move',
                i === 2
                  ? 'fill-[var(--viz-series-1)] stroke-[var(--viz-series-1)]'
                  : i === baseIndex
                    ? cx(tone.tint, tone.accentStroke)
                    : cx(tone.well, tone.line),
              )}
            />
          ))}
          {!reduced &&
            people.map((p, i) => (
              <circle
                key={i}
                r="4"
                opacity="0"
                className={p.side === 0 ? 'fill-mark-300' : 'fill-stone-500 dark:fill-stone-300'}
              >
                <animateMotion
                  dur="3.4s"
                  begin={`${i * 0.68}s`}
                  repeatCount="indefinite"
                  path={personPath(p)}
                />
                <animate
                  attributeName="opacity"
                  dur="3.4s"
                  begin={`${i * 0.68}s`}
                  repeatCount="indefinite"
                  values="0;1;1;0"
                  keyTimes="0;0.1;0.75;1"
                />
              </circle>
            ))}
          {bands.map((band, i) => (
            <g key={band.label}>
              <text x="262" y={band.mid - 2} className={cx(tone.muted, 'text-[12px]')}>
                {band.label}
              </text>
              <text
                x="262"
                y={band.mid + 15}
                className={cx(
                  i === 2 || i === baseIndex ? tone.text : tone.muted,
                  'font-mono text-[14px] font-semibold',
                )}
              >
                {band.count}
              </text>
            </g>
          ))}
          <g key={denominator} className="illus-pop">
            <path d={`M236 ${top}h8V${bottom}h-8`} className={tone.accentStroke} strokeWidth="2" />
            <circle
              cx="244"
              cy={(top + bottom) / 2}
              r="7"
              className={cx(tone.paper, tone.accentStroke)}
              strokeWidth="1.6"
            />
            <path
              d={`M240.5 ${(top + bottom) / 2}h7M244 ${(top + bottom) / 2 - 3.5}h.01M244 ${(top + bottom) / 2 + 3.5}h.01`}
              className={tone.accentStroke}
              strokeWidth="1.6"
            />
          </g>
        </Scene>
      </Stage>
      <div aria-live="polite" className="flex items-center gap-4">
        <p
          key={denominator}
          className="animate-pop-in font-mono text-3xl font-semibold text-indigo-700 dark:text-indigo-300"
        >
          {Math.round((completed / base.count) * 100)}%
        </p>
        <p className="text-sm">
          {completed} ÷ {base.count} {denominator ? 'signups' : 'screen viewers'}
          <br />
          <span className="text-xs text-stone-600 dark:text-stone-300">
            Same completions. Different question.
          </span>
        </p>
      </div>
    </div>
  )
}
