import { useState } from 'react'
import { lessonVisuals } from '../../content/illustrations'
import { cx } from '../cx'
import { Note, Scene, Segmented, Stage, tone } from './kit'

const data = lessonVisuals.team
const r = 46
const C = 2 * Math.PI * r
const hour = 60
const colours = [
  'stroke-indigo-500 dark:stroke-indigo-400',
  'stroke-mark-400 dark:stroke-mark-400',
  'stroke-red-400 dark:stroke-red-400',
]
const swatches = ['bg-indigo-500 dark:bg-indigo-400', 'bg-mark-400', 'bg-red-400']

// A clockwise arc on the dial from one minute mark to another.
const point = (x: number, minute: number) => {
  const a = (minute / hour) * 2 * Math.PI
  return `${x + Math.sin(a) * r} ${80 - Math.cos(a) * r}`
}
const arc = (x: number, from: number, to: number) =>
  `M${point(x, from)}A${r} ${r} 0 ${to - from > hour / 2 ? 1 : 0} 1 ${point(x, to)}`

function Arc({
  cx: x,
  start,
  minutes,
  className,
}: {
  cx: number
  start: number
  minutes: number
  className: string
}) {
  return (
    <circle
      cx={x}
      cy="80"
      r={r}
      className={className}
      strokeWidth="12"
      strokeLinecap="butt"
      transform={`rotate(-90 ${x} 80)`}
      style={{
        transformBox: 'view-box',
        strokeDasharray: `${Math.max(0, (minutes / hour) * C - 1.5)} ${C}`,
        strokeDashoffset: -(start / hour) * C,
        transition:
          'stroke-dasharray 0.7s cubic-bezier(0.3,0.7,0.2,1), stroke-dashoffset 0.7s cubic-bezier(0.3,0.7,0.2,1), opacity 0.3s',
      }}
    />
  )
}

function Dial({ x, label }: { x: number; label: string }) {
  return (
    <g>
      <circle cx={x} cy="80" r={r} className={tone.faint} strokeWidth="12" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * 2 * Math.PI
        return (
          <path
            key={i}
            d={`M${x + Math.sin(a) * (r + 9)} ${80 - Math.cos(a) * (r + 9)}L${x + Math.sin(a) * (r + (i % 3 ? 11 : 13))} ${80 - Math.cos(a) * (r + (i % 3 ? 11 : 13))}`}
            className={tone.line}
            strokeWidth="1.4"
          />
        )
      })}
      <rect
        x={x - 5}
        y="14"
        width="10"
        height="6"
        rx="2"
        className={cx(tone.well, tone.line)}
        strokeWidth="1.4"
      />
      <text
        x={x}
        y="160"
        textAnchor="middle"
        className={cx(tone.text, 'text-[13px] font-semibold')}
      >
        {label}
      </text>
    </g>
  )
}

/** Two stopwatches: the old workflow, and AI drafting with its review and rework. */
export default function TeamTime() {
  const [whole, setWhole] = useState(1)
  const wholeTask = data.after.reduce((n, x) => n + x.minutes, 0)
  const total = whole ? wholeTask : data.after[0]!.minutes
  const starts = data.after.map((_, i) => data.after.slice(0, i).reduce((n, x) => n + x.minutes, 0))
  const mark = (data.before / hour) * 2 * Math.PI
  return (
    <div className="space-y-3">
      <Segmented
        label="Choose which time to count"
        labels={['Draft time only', 'The whole task']}
        value={whole}
        onChange={setWhole}
      />
      <Stage className="dot-grid px-2 py-2">
        <Scene
          viewBox="0 0 400 170"
          className="max-h-52!"
          label={`Existing workflow: ${data.before} minutes. With AI drafting: ${data.after
            .map((a) => `${a.label} ${a.minutes} minutes`)
            .join(', ')}. Counted: ${total} minutes.`}
        >
          <Dial x={110} label="Existing workflow" />
          <Arc
            cx={110}
            start={0}
            minutes={data.before}
            className="stroke-stone-400 dark:stroke-stone-500"
          />
          <text
            x="110"
            y="86"
            textAnchor="middle"
            className={cx(tone.text, 'text-[22px] font-bold')}
          >
            {data.before}
          </text>
          <text x="110" y="101" textAnchor="middle" className={cx(tone.muted, 'text-[11px]')}>
            min
          </text>

          <Dial x={290} label="With AI drafting" />
          {data.after.map((part, i) => {
            const counted = whole === 1 || i === 0
            return (
              <g key={part.label}>
                <Arc
                  cx={290}
                  start={starts[i]!}
                  minutes={part.minutes}
                  className={cx(colours[i], !counted && 'opacity-0')}
                />
              </g>
            )
          })}
          {/* The uncounted part of the task, when only the draft is timed */}
          <path
            d={arc(290, starts[1]!, wholeTask)}
            className={cx(
              tone.ink,
              'transition-opacity duration-300',
              whole ? 'opacity-0' : 'opacity-70',
            )}
            strokeWidth="2"
            strokeDasharray="3 5"
          />
          {/* Where the old total ended */}
          <path
            d={`M${290 + Math.sin(mark) * (r - 9)} ${80 - Math.cos(mark) * (r - 9)}L${290 + Math.sin(mark) * (r + 9)} ${80 - Math.cos(mark) * (r + 9)}`}
            className={tone.ink}
            strokeWidth="2"
            strokeDasharray="3 3"
          />
          <path d="M293 136H336" className={tone.faint} strokeWidth="1.2" />
          <text x="340" y="140" className={cx(tone.muted, 'text-[11px]')}>
            old total
          </text>
          <text
            key={total}
            x="290"
            y="86"
            textAnchor="middle"
            className={cx(tone.text, 'illus-pop text-[22px] font-bold')}
          >
            {total}
          </text>
          <text x="290" y="101" textAnchor="middle" className={cx(tone.muted, 'text-[11px]')}>
            {whole ? 'min' : 'min counted'}
          </text>
        </Scene>
      </Stage>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-600 dark:text-stone-300">
        {data.after.map((part, i) => (
          <li
            key={part.label}
            className={cx(
              'flex items-center gap-1.5 transition-opacity',
              !whole && i > 0 && 'opacity-50',
            )}
          >
            <span aria-hidden className={cx('h-2.5 w-2.5 rounded-sm', swatches[i])} />
            {part.label} {part.minutes} min
            {!whole && i > 0 && ' (not counted)'}
          </li>
        ))}
      </ul>
      <Note id={whole} className="min-h-0">
        <p>
          {whole
            ? `${wholeTask - data.before} minutes more work at the same quality bar.`
            : `${data.before - total} minutes saved on drafting. Review and rework are still uncounted.`}
        </p>
      </Note>
    </div>
  )
}
