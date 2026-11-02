import { useRef, useState } from 'react'
import { lessonVisuals } from '../../content/illustrations'
import { cx } from '../cx'
import { Note, Scene, Segmented, Stage, tone, useInView, Verdict } from './kit'
import './Access.css'

const { documents, steps } = lessonVisuals.access
const short = ['Decisions', 'Product notes', 'Personnel']
const startX = 16
const startY = [44, 88, 132]
// Inside the model's context, the documents stack on the right.
const endX = 264
const endY = [44, 88, 132]

function Doc({ locked, label }: { locked: boolean; label: string }) {
  return (
    <g>
      <path
        d="M0 0h22l8 8v30H0z"
        className={cx(locked ? 'fill-mark-100 dark:fill-stone-800' : tone.paper, tone.ink)}
        strokeWidth="1.8"
      />
      <path d="M22 0v8h8" className={tone.ink} strokeWidth="1.8" />
      {locked ? (
        <g className={tone.ink} strokeWidth="1.6">
          <rect
            x="8"
            y="17"
            width="14"
            height="11"
            rx="2"
            className="fill-mark-300 dark:fill-mark-400"
          />
          <path d="M11 17v-3a4 4 0 0 1 8 0v3" />
        </g>
      ) : (
        <path d="M6 16h16M6 22h12M6 28h14" className={tone.ink} strokeWidth="1.6" />
      )}
      <text x="38" y="23" className={cx(tone.text, 'text-[12px] font-medium')}>
        {label}
      </text>
    </g>
  )
}

/** Documents flow through an identity gate into the model's context; a restricted one may bounce. */
export default function Access() {
  const [access, setAccess] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref)
  return (
    <div ref={ref} className="space-y-3">
      <Segmented
        label="Explore retrieval permissions"
        labels={['Team-only access', 'Authorised specialist']}
        value={access}
        onChange={setAccess}
      />
      <Stage className="dot-grid px-2 py-2">
        <Scene
          viewBox="0 0 400 200"
          className="max-h-56!"
          label={`${steps.join(', then ')}. ${documents
            .map((d, i) => `${d}: ${i === 2 && access === 0 ? 'excluded' : 'allowed'}`)
            .join('. ')}.`}
        >
          {/* The source shelf */}
          <rect
            x="6"
            y="12"
            width="140"
            height="164"
            rx="14"
            className={cx(tone.line, 'fill-none')}
            strokeWidth="1.6"
            strokeDasharray="6 5"
          />
          <text
            x="76"
            y="32"
            textAnchor="middle"
            className={cx(tone.text, 'text-[13px] font-semibold')}
          >
            Sources
          </text>
          {seen &&
            startY.map(
              (y, i) =>
                !(i === 2 && access === 0) && (
                  <rect
                    key={y}
                    x={startX}
                    y={y}
                    width="30"
                    height="38"
                    rx="3"
                    className={cx(tone.line, 'fill-none')}
                    strokeWidth="1.4"
                    strokeDasharray="3 4"
                  />
                ),
            )}

          {/* The model's context window */}
          <rect
            x="252"
            y="12"
            width="140"
            height="164"
            rx="14"
            className={cx(tone.tint, 'stroke-indigo-300 dark:stroke-indigo-800')}
            strokeWidth="2"
            strokeDasharray="6 5"
          />
          <text
            x="322"
            y="32"
            textAnchor="middle"
            className={cx(tone.text, 'text-[13px] font-semibold')}
          >
            Model context
          </text>
          {access === 0 && (
            <g key="gap" className="illus-pop" style={{ animationDelay: '0.9s' }}>
              <rect
                x={endX}
                y={endY[2]}
                width="30"
                height="38"
                rx="3"
                className={cx(tone.line, 'fill-none')}
                strokeWidth="1.6"
                strokeDasharray="4 4"
              />
              <text
                x={endX + 38}
                y={endY[2]! + 23}
                className={cx(tone.muted, 'text-[12px] italic')}
              >
                not retrieved
              </text>
            </g>
          )}
          <text x="322" y="194" textAnchor="middle" className={cx(tone.muted, 'text-[11px]')}>
            3 Cited answer
          </text>

          {/* The gate */}
          <path d="M176 10v132" className={tone.line} strokeWidth="2" strokeDasharray="2 6" />
          <rect
            x="162"
            y="62"
            width="28"
            height="70"
            rx="10"
            className={cx(tone.paper, tone.ink)}
            strokeWidth="2"
          />
          <path
            d="m176 78 10 4v8c0 8-10 14-10 14s-10-6-10-14v-8z"
            className={cx(access ? tone.good : tone.mark, tone.ink, 'illus-move')}
            strokeWidth="1.6"
          />
          <path
            d="m171 90 4 4 6-7"
            className="stroke-white dark:stroke-stone-950"
            strokeWidth="2"
          />
          <text
            x="176"
            y="156"
            textAnchor="middle"
            className={cx(tone.text, 'text-[12px] font-semibold')}
          >
            1 Check
          </text>
          <text x="176" y="170" textAnchor="middle" className={cx(tone.muted, 'text-[11px]')}>
            identity, scope
          </text>
          <text x="221" y="92" textAnchor="middle" className={cx(tone.muted, 'text-[11px]')}>
            2 Retrieve
          </text>
          <path d="M196 102h46m-5-4 5 4-5 4" className={tone.line} strokeWidth="1.6" />

          {documents.map((doc, i) => {
            const blocked = i === 2 && access === 0
            const moved = seen && !blocked
            const x = moved ? endX : startX
            const y = moved ? endY[i]! : startY[i]!
            return (
              <g
                key={doc}
                className="illus-move"
                style={{ transform: `translate(${x}px, ${y}px)`, transitionDelay: `${i * 120}ms` }}
              >
                <g
                  key={`${access}-${seen}`}
                  className={blocked && seen ? 'access-bounce' : undefined}
                >
                  <Doc locked={i === 2} label={short[i]!} />
                </g>
              </g>
            )
          })}
          {access === 0 && seen && (
            <g key="denied" className="illus-pop" style={{ animationDelay: '0.5s' }}>
              <Verdict x={192} y={64} ok={false} />
            </g>
          )}
        </Scene>
      </Stage>
      <Note id={access}>
        <p>
          {access
            ? 'Only a verified role with the required scope may retrieve restricted records for an authorised purpose.'
            : 'The restricted record never enters the model context. The answer can cite only the first two sources.'}
        </p>
      </Note>
    </div>
  )
}
