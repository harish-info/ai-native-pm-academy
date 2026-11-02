import { useState, type ReactNode } from 'react'
import { lessonVisuals } from '../../content/illustrations'
import { cx } from '../cx'
import { Note, Segmented, Stage } from './kit'
import './TeamAttention.css'

const data = lessonVisuals['team-attention']

const icons: ReactNode[] = [
  <>
    <circle cx="7" cy="7" r="4.5" />
    <path d="m10.5 10.5 3.5 3.5" />
  </>,
  <path d="M3 4h10M3 8h7M3 12h9" />,
  <path d="m5.5 4.5-3.5 3.5 3.5 3.5M10.5 4.5l3.5 3.5-3.5 3.5" />,
  <>
    <path d="M8 1.8 13.5 4v4c0 3.2-2.6 5.4-5.5 6.2C5.1 13.4 2.5 11.2 2.5 8V4z" />
    <path d="m5.6 8 1.7 1.7 3.2-3.4" />
  </>,
  <>
    <path d="M5.5 11.5h5M6.5 14h3" />
    <path d="M8 2a4 4 0 0 0-2.4 7.2c.6.5.9 1.1.9 1.8h3c0-.7.3-1.3.9-1.8A4 4 0 0 0 8 2Z" />
  </>,
]

/** One bar of team attention. Switching rows shows where the attention moves. */
export default function TeamAttention() {
  const [row, setRow] = useState(0)
  const current = data.rows[row]!
  return (
    <div className="team-attention space-y-3">
      <Segmented
        label="Compare where team attention goes"
        labels={data.rows.map((r) => r.label)}
        value={row}
        onChange={setRow}
      />
      <Stage className="dot-grid p-3">
        <p className="sr-only">
          {current.label}:{' '}
          {data.stages.map((s, i) => `${s} ${current.weights[i]} parts`).join(', ')}.
        </p>
        <div aria-hidden className="relative">
          <div className="flex gap-1">
            {data.stages.map((stage, i) => {
              const accent = row === 1 && (i === 0 || i === 4)
              const heavy = row === 0 && i === 2
              return (
                <div
                  key={stage}
                  className={cx(
                    'team-attention-seg flex h-16 min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-lg border',
                    accent
                      ? 'border-indigo-500 bg-indigo-100 text-indigo-950 dark:bg-indigo-900 dark:text-indigo-50'
                      : heavy
                        ? 'border-stone-400 bg-stone-300 text-stone-900 dark:border-stone-500 dark:bg-stone-600 dark:text-stone-50'
                        : 'border-stone-300 bg-white text-stone-700 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-200',
                    row === 1 && i === 2 && 'border-dashed',
                  )}
                  style={{ flexGrow: current.weights[i], flexBasis: 0 }}
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="h-4 w-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {icons[i]}
                  </svg>
                  <span className="team-attention-label truncate px-0.5 text-xs font-semibold">
                    {stage}
                  </span>
                  <span className="team-attention-number font-mono text-[11px] font-semibold">
                    {i + 1}
                  </span>
                </div>
              )
            })}
          </div>
          <p
            key={row}
            className={cx(
              'animate-pop-in mt-1.5 text-center text-[11px] text-stone-500 dark:text-stone-400',
            )}
          >
            {row
              ? 'Dashed: agents carry more of the build'
              : 'Width shows the share of team attention'}
          </p>
        </div>
        <p className="team-attention-key mt-2 flex flex-wrap gap-x-3 text-xs text-stone-600 dark:text-stone-300">
          {data.stages.map((stage, i) => (
            <span key={stage} className="whitespace-nowrap">
              {i + 1} {stage}
            </span>
          ))}
        </p>
      </Stage>
      <Note id={row} className="min-h-0">
        <p>{current.description}</p>
      </Note>
      <div className="grid gap-3 border-t border-stone-200 pt-3 sm:grid-cols-3 dark:border-stone-700">
        {data.principles.map((p) => (
          <div key={p.title}>
            <p className="text-sm font-semibold">{p.title}</p>
            <p className="mt-1 text-xs text-stone-600 dark:text-stone-300">{p.detail}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
