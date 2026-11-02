import { useState } from 'react'
import { lessonVisuals } from '../../content/illustrations'
import { cx } from '../cx'
import { Note, Scene, Segmented, Stage, tone } from './kit'

const data = lessonVisuals.strategy
const actions = [
  { label: 'Observe', y: 58, wish: -125 },
  { label: 'Simplify', y: 108, wish: 70 },
  { label: 'Compare', y: 158, wish: 155 },
]

/** Diagnosis sets a direction; coherent actions follow it, a wish list scatters. */
export default function Strategy() {
  const [coherent, setCoherent] = useState(1)
  return (
    <div className="space-y-3">
      <Segmented
        label="Compare a wish list with coherent actions"
        labels={['Wish list', 'Coherent actions']}
        value={coherent}
        onChange={setCoherent}
      />
      <Stage className="dot-grid px-2 py-3">
        <Scene
          className="max-h-40!"
          viewBox="4 40 400 130"
          label={
            coherent
              ? 'A diagnosis leads to a guiding policy, and three actions all point in the direction the policy sets.'
              : 'A diagnosis and a policy exist, but three actions point in unrelated directions.'
          }
        >
          {/* Diagnosis */}
          <circle cx="52" cy="96" r="32" className={cx(tone.tint, tone.ink)} strokeWidth="2" />
          <circle cx="48" cy="92" r="12" className={cx(tone.paper, tone.ink)} strokeWidth="2.4" />
          <path d="m57 101 10 10" className={tone.ink} strokeWidth="3.4" />
          <text
            x="52"
            y="150"
            textAnchor="middle"
            className={cx(tone.text, 'text-[13px] font-semibold')}
          >
            Diagnosis
          </text>

          <path d="M90 96h30" className={cx(tone.accentStroke, 'illus-flow')} strokeWidth="2" />
          <path d="m117 90 7 6-7 6" className={tone.accentStroke} strokeWidth="2" />

          {/* Guiding policy: a compass */}
          <g transform="translate(-14 0)">
            <circle cx="176" cy="96" r="32" className={cx(tone.paper, tone.ink)} strokeWidth="2" />
            <circle
              cx="176"
              cy="96"
              r="25"
              className={tone.faint}
              strokeWidth="1.2"
              strokeDasharray="2 4"
            />
            <path d="M176 70v5M176 117v5M150 96h5M197 96h5" className={tone.line} strokeWidth="2" />
            <path d="M176 89l26 7-26 7z" className={tone.accent} />
            <path d="M176 89l-18 7 18 7z" className={tone.well} />
            <circle cx="176" cy="96" r="3" className={cx(tone.paper, tone.ink)} strokeWidth="1.6" />
            <text
              x="176"
              y="150"
              textAnchor="middle"
              className={cx(tone.text, 'text-[13px] font-semibold')}
            >
              Guiding policy
            </text>
          </g>

          {/* Bracket out to the actions */}
          <path
            d="M198 96h34M232 58v100M232 58h18M232 108h18M232 158h18"
            className={coherent ? tone.accentStroke : tone.line}
            strokeWidth="2"
          />

          {actions.map((a) => (
            <g key={a.label}>
              <g
                className="illus-move"
                style={{
                  transform: `rotate(${coherent ? 0 : a.wish}deg)`,
                  transformOrigin: '277px ' + a.y + 'px',
                  transformBox: 'view-box',
                }}
              >
                <path
                  d={`M257 ${a.y}h40m-8-7 8 7-8 7`}
                  className={coherent ? tone.accentStroke : tone.markStroke}
                  strokeWidth="3"
                />
              </g>
              <text x="314" y={a.y + 5} className={cx(tone.text, 'text-[12px] font-semibold')}>
                {a.label}
              </text>
            </g>
          ))}
        </Scene>
      </Stage>
      <dl className="space-y-1 text-xs leading-relaxed">
        {data.steps.map((s, i) => (
          <div key={s.label} className="flex gap-2">
            <dt className="shrink-0 font-semibold">
              <span className="font-mono text-indigo-700 dark:text-indigo-300">{i + 1}</span>{' '}
              {s.label}:
            </dt>
            <dd className="text-stone-600 dark:text-stone-300">{s.detail}</dd>
          </div>
        ))}
      </dl>
      <Note id={coherent} className="min-h-0">
        <p className="text-stone-700 dark:text-stone-200">
          {coherent
            ? 'Each action tests the same diagnosis, so the results add up to one decision.'
            : 'Without the diagnosis, the same activities become a list of ambitions that pull apart.'}
        </p>
      </Note>
    </div>
  )
}
