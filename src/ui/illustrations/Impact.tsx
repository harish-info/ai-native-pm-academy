import { useState } from 'react'
import { lessonVisuals } from '../../content/illustrations'
import { cx } from '../cx'
import { Note, Scene, Segmented, Stage, tone } from './kit'

const data = lessonVisuals.impact
const totals = data.scenarios.map((s) => Math.round((s.users * s.rate) / 100))
const most = Math.max(...totals)
const scale = (n: number) => 30 + (n / most) * 330

function Term({
  value,
  label,
  source,
  result = false,
}: {
  value: string
  label: string
  source?: string
  result?: boolean
}) {
  return (
    <div
      className={cx(
        'flex min-w-0 flex-1 flex-wrap items-center gap-x-2 rounded-lg border px-2.5 py-1.5 @md:block',
        result
          ? 'border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-950'
          : 'border-stone-200 bg-white dark:border-stone-700 dark:bg-stone-950',
      )}
    >
      <p key={value} className="animate-pop-in font-mono text-base font-semibold">
        {value}
      </p>
      <p className="text-xs leading-snug text-stone-600 dark:text-stone-300">{label}</p>
      {source && (
        <p className="inline-block rounded-full @md:mt-1 bg-mark-100 px-2 py-0.5 whitespace-nowrap text-[11px] font-medium text-mark-900">
          {source}
        </p>
      )}
    </div>
  )
}

/** The impact sum, its inputs and sources, and the range it sits in. */
export default function Impact() {
  const [choice, setChoice] = useState(1)
  const scenario = data.scenarios[choice]!
  const total = totals[choice]!
  return (
    <div className="space-y-3">
      <Segmented
        label="Choose a case"
        labels={data.scenarios.map((s) => `${s.label} case`)}
        value={choice}
        onChange={setChoice}
      />
      <Stage className="dot-grid space-y-2 p-3">
        <div className="@container">
          <div className="flex flex-col gap-1 text-sm @md:flex-row @md:items-stretch @md:gap-2">
            <Term
              value={scenario.users.toLocaleString('en-GB')}
              label="eligible users a month"
              source={data.sources.users}
            />
            <span
              aria-hidden
              className="self-center font-mono text-base leading-none text-stone-500"
            >
              ×
            </span>
            <Term
              value={`${scenario.rate} per 100`}
              label="more completions per 100 users"
              source={data.sources.rate}
            />
            <span
              aria-hidden
              className="self-center font-mono text-base leading-none text-stone-500"
            >
              =
            </span>
            <Term value={String(total)} label={data.unit} result />
          </div>
        </div>
        <Scene
          className="max-h-32!"
          viewBox="0 0 400 54"
          label={`${total} ${data.unit} in the ${scenario.label.toLowerCase()} case. The range runs from ${totals[0]} to ${totals[totals.length - 1]}.`}
        >
          <path
            d={`M${scale(totals[0]!)} 20H${scale(totals[2]!)}`}
            className="stroke-indigo-200 dark:stroke-indigo-900"
            strokeWidth="8"
          />
          <path d="M20 20H380" className={tone.faint} strokeWidth="1.4" />
          {data.scenarios.map((s, i) => {
            const x = scale(totals[i]!)
            const active = i === choice
            return (
              <g key={s.label}>
                <circle
                  cx={x}
                  cy="20"
                  r={active ? 7 : 5}
                  strokeWidth="2"
                  className={cx(
                    'illus-move',
                    active
                      ? cx(tone.accent, 'stroke-white dark:stroke-stone-900')
                      : cx(tone.paper, tone.line),
                  )}
                />
                <text
                  x={x}
                  y="46"
                  textAnchor="middle"
                  className={cx(
                    active ? tone.text : tone.muted,
                    'text-[11px]',
                    active && 'font-semibold',
                  )}
                >
                  {s.label} {totals[i]}
                </text>
              </g>
            )
          })}
        </Scene>
      </Stage>
      <Note id={choice} className="min-h-0">
        <p className="text-stone-700 dark:text-stone-200">
          {scenario.users.toLocaleString('en-GB')} × {scenario.rate} ÷ 100 ={' '}
          <strong>{total}</strong> {data.unit}: a count, not a percentage.
        </p>
      </Note>
    </div>
  )
}
