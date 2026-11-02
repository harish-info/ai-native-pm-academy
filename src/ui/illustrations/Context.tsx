import { useId, useState } from 'react'
import { lessonVisuals } from '../../content/illustrations'
import { cx } from '../cx'
import { Note, Scene, Segmented, Stage, tone } from './kit'

const data = lessonVisuals.context
const slots = [
  [18, 82],
  [140, 82],
  [18, 146],
  [140, 146],
] as const

/** The context window as a frame: empty slots for a vague task, filled cards for a grounded brief. */
export default function Context() {
  const [grounded, setGrounded] = useState(1)
  const uid = useId().replace(/:/g, '')
  const on = grounded === 1
  return (
    <div className="space-y-3">
      <Segmented
        label="Compare context"
        labels={['Vague task', 'Grounded brief']}
        value={grounded}
        onChange={setGrounded}
      />
      <Stage className="dot-grid px-2 py-3">
        <Scene
          viewBox="0 0 400 216"
          label={
            on
              ? 'The context window holds the request plus a product brief, the user problem, source material and constraints. The answer is specific.'
              : 'The context window holds only the request. The four slots for brief, user problem, sources and constraints are empty, and the answer is vague.'
          }
        >
          <defs>
            <marker
              id={`${uid}-arrow`}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M1 1l8 4-8 4" fill="none" strokeWidth="2" className={tone.accentStroke} />
            </marker>
          </defs>

          {/* The window */}
          <rect
            x="6"
            y="6"
            width="258"
            height="204"
            rx="14"
            className={cx(tone.paper, tone.ink)}
            strokeWidth="2"
          />
          <text x="20" y="29" className={cx(tone.text, 'text-[13px] font-semibold')}>
            Context window
          </text>
          <g className={tone.ink} strokeWidth="1.8">
            <path d="M228 23c6-7 18-7 24 0-6 7-18 7-24 0Z" />
            <circle cx="240" cy="23" r="2.6" />
          </g>
          <rect
            x="18"
            y="40"
            width="236"
            height="32"
            rx="8"
            className={cx(tone.mark, tone.ink)}
            strokeWidth="1.5"
          />
          <text x="30" y="61" className="fill-stone-900 text-[12px] font-semibold">
            Your request
          </text>
          <text x="242" y="61" textAnchor="end" className="fill-stone-700 text-[11px]">
            {on ? 'compare 3 options' : 'improve engagement'}
          </text>

          {slots.map(([x, y], i) => (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width="114"
                height="56"
                rx="8"
                className={cx(tone.line)}
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <text
                x={x + 57}
                y={y + 32}
                textAnchor="middle"
                className={cx(tone.muted, 'illus-move text-[11px]')}
                opacity={on ? 0 : 1}
              >
                Not supplied
              </text>
              <g
                className="illus-move"
                style={{
                  transform: on ? 'none' : 'translate(-24px, 10px)',
                  opacity: on ? 1 : 0,
                  transitionDelay: on ? `${i * 90}ms` : '0ms',
                }}
              >
                <rect
                  x={x}
                  y={y}
                  width="114"
                  height="56"
                  rx="8"
                  className={cx(tone.tint, tone.accentStroke)}
                  strokeWidth="1.5"
                />
                <text
                  x={x + 10}
                  y={y + 22}
                  className="fill-indigo-900 text-[12px] font-semibold dark:fill-indigo-100"
                >
                  {data.inputs[i]}
                </text>
                <path
                  d={`M${x + 10} ${y + 34}h${70 - i * 6}M${x + 10} ${y + 43}h${48 + i * 5}`}
                  className="stroke-indigo-300 dark:stroke-indigo-700"
                  strokeWidth="3"
                />
              </g>
            </g>
          ))}

          {/* Into the model, out as an answer */}
          <path
            d="M268 110H288"
            className={cx(tone.accentStroke, 'illus-flow')}
            strokeWidth="2"
            markerEnd={`url(#${uid}-arrow)`}
          />
          <rect
            x="292"
            y="40"
            width="102"
            height="142"
            rx="10"
            className={cx(tone.paper, on ? tone.accentStroke : tone.ink, 'illus-move')}
            strokeWidth="2"
          />
          <text x="304" y="61" className={cx(tone.text, 'text-[12px] font-semibold')}>
            Answer
          </text>
          <g className="illus-move" opacity={on ? 0 : 1}>
            {[82, 104, 126].map((y, i) => (
              <path
                key={y}
                d={`M304 ${y}q8-6 16 0t16 0t16 0${i < 2 ? 't16 0t10 0' : ''}`}
                className={tone.line}
                strokeWidth="2.5"
              />
            ))}
            <text
              x="343"
              y="160"
              textAnchor="middle"
              className={cx(tone.muted, 'text-[20px] font-semibold')}
            >
              ?
            </text>
          </g>
          <g className="illus-move" opacity={on ? 1 : 0}>
            {[80, 100, 120, 140, 160].map((y, i) => (
              <g key={y}>
                <circle cx="308" cy={y} r="4.5" className={tone.good} />
                <path
                  d={`M306 ${y}l1.5 1.5 3-3.2`}
                  className="stroke-white dark:stroke-stone-950"
                  strokeWidth="1.6"
                />
                <path
                  d={`M318 ${y}h${[60, 52, 64, 44, 56][i]}`}
                  className={tone.ink}
                  strokeWidth="2.5"
                />
              </g>
            ))}
          </g>
        </Scene>
      </Stage>
      <Note id={grounded}>
        <p>{data.outputs[grounded]}</p>
      </Note>
    </div>
  )
}
