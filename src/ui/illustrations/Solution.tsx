import { useState } from 'react'
import { lessonVisuals } from '../../content/illustrations'
import { cx } from '../cx'
import { Note, Scene, Segmented, Stage, tone } from './kit'

const data = lessonVisuals.solution
const cores = ['Rules', 'Model', 'Agent']

// What each design adds to the evaluation load, shortened from each option's check text.
const layers = [
  ['Rules', 'Edge cases', 'Maintenance'],
  ['Retrieval', 'Claim support', 'Fallback'],
  ['Tools', 'Permissions', 'Stopping rules', 'Final state'],
]
const blocks = layers.flatMap((items, layer) =>
  items.map((label, j) => ({ label, layer, order: j })),
)
const counts = layers.map((_, i) => layers.slice(0, i + 1).flat().length)
const blockClass = [
  'border-stone-300 bg-stone-100 text-stone-800 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100',
  'border-indigo-400 bg-indigo-50 text-indigo-800 dark:border-indigo-500 dark:bg-indigo-950 dark:text-indigo-200',
  'border-mark-400 bg-mark-200 text-mark-900',
]

function show(on: boolean) {
  return { opacity: on ? 1 : 0 }
}

/** Three designs of growing capability, and the stack of things each one asks you to evaluate. */
export default function Solution() {
  const [choice, setChoice] = useState(0)
  const option = data.options[choice]!
  const count = counts[choice]!
  return (
    <div className="space-y-3">
      <Segmented
        label="Choose a design"
        labels={data.options.map((o) => o.label)}
        value={choice}
        onChange={setChoice}
      />
      <Stage className="dot-grid grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] items-center gap-3 px-3 py-3 sm:gap-6 sm:px-6">
        <Scene className="max-h-56!" viewBox="0 0 220 190" label={`${option.label}.`}>
          {/* Context document feeding in (model and agent) */}
          <g className="illus-move" style={show(choice >= 1)}>
            <path
              d="M100 18h18l8 8v24h-26z"
              className={cx(tone.paper, tone.ink)}
              strokeWidth="1.8"
            />
            <path
              d="M118 18v8h8M105 32h14M105 38h14M105 44h9"
              className={tone.line}
              strokeWidth="1.4"
            />
            <path d="M113 54v12" className={cx(tone.accentStroke, 'illus-flow')} strokeWidth="2" />
            <text x="134" y="38" className={cx(tone.muted, 'text-[13px]')}>
              Context
            </text>
          </g>

          {/* Task in, result out */}
          <circle cx="22" cy="96" r="7" className={tone.mark} />
          <text x="22" y="120" textAnchor="middle" className={cx(tone.muted, 'text-[13px]')}>
            Task
          </text>
          <path d="M32 96h30" className={cx(tone.line, 'illus-flow')} strokeWidth="2" />
          <path d="M164 96h30" className={cx(tone.line, 'illus-flow')} strokeWidth="2" />
          <path d="m188 90 7 6-7 6" className={tone.line} strokeWidth="2" />
          <rect x="196" y="89" width="14" height="14" rx="3" className={tone.good} />

          {/* The core */}
          <rect
            x="66"
            y="70"
            width="94"
            height="52"
            rx="12"
            strokeWidth="2"
            className={cx(
              'illus-move',
              choice ? cx(tone.tint, tone.accentStroke) : cx(tone.paper, tone.ink),
            )}
          />
          <g className="illus-move" style={show(choice === 0)}>
            <path d="M80 84h5M80 96h5M80 108h5" className={tone.ink} strokeWidth="2" />
            <path d="M92 84h34M92 96h48M92 108h28" className={tone.line} strokeWidth="2" />
          </g>
          <g className="illus-move" style={show(choice >= 1)}>
            <path
              d="M113 80c2 9 6 13 15 16-9 3-13 7-15 16-2-9-6-13-15-16 9-3 13-7 15-16z"
              className={tone.accent}
            />
            <circle cx="140" cy="82" r="2.6" className={tone.accent} />
            <circle cx="88" cy="110" r="2" className={tone.accent} />
          </g>

          {/* Agent loop and tools */}
          <g className="illus-move" style={show(choice === 2)}>
            <path
              d="M150 122c10 22-84 22-74 0"
              className={cx(tone.accentStroke, 'illus-flow')}
              strokeWidth="2"
            />
            <path d="M71 129l5-6 5 6" className={tone.accentStroke} strokeWidth="2" />
            <g transform="translate(92 150)">
              <rect
                width="18"
                height="18"
                rx="5"
                className={cx(tone.paper, tone.ink)}
                strokeWidth="1.6"
              />
              <path d="M6 13l5-5m-1-3a3 3 0 1 0 3 3" className={tone.ink} strokeWidth="1.6" />
            </g>
            <g transform="translate(116 150)">
              <rect
                width="18"
                height="18"
                rx="5"
                className={cx(tone.paper, tone.ink)}
                strokeWidth="1.6"
              />
              <ellipse cx="9" cy="6" rx="5" ry="2" className={tone.ink} strokeWidth="1.4" />
              <path d="M4 6v6c0 1.2 2.2 2 5 2s5-.8 5-2V6" className={tone.ink} strokeWidth="1.4" />
            </g>
            <text x="140" y="164" className={cx(tone.muted, 'text-[13px]')}>
              Tools
            </text>
          </g>
          <text
            key={choice}
            x="113"
            y={choice === 2 ? 186 : 142}
            textAnchor="middle"
            className={cx(tone.text, 'illus-pop text-[13px] font-semibold')}
          >
            {cores[choice]}
          </text>
        </Scene>
        <div>
          <p className="mb-1.5 text-center text-xs text-stone-500 dark:text-stone-400">
            To evaluate:{' '}
            <span
              key={count}
              className="animate-pop-in inline-block font-mono font-semibold text-stone-800 dark:text-stone-100"
            >
              {count}
            </span>
          </p>
          {/* The dashed outline shows how tall the stack can grow */}
          <ol className="flex flex-col-reverse gap-0.5 rounded-lg border border-dashed border-stone-300 p-1 dark:border-stone-600">
            {blocks.map((b, i) => {
              const on = i < count
              return (
                <li
                  key={b.label}
                  aria-hidden={!on}
                  className={cx(
                    'illus-move truncate rounded border px-1.5 py-0.5 text-center text-[11px] leading-4 font-medium',
                    blockClass[b.layer],
                  )}
                  style={{
                    opacity: on ? 1 : 0,
                    transform: on ? 'none' : 'translateY(-12px)',
                    transitionDelay: on ? `${b.order * 80}ms` : '0ms',
                  }}
                >
                  {b.label}
                </li>
              )
            })}
          </ol>
        </div>
      </Stage>
      <Note id={choice} className="min-h-0">
        <p className="text-stone-700 dark:text-stone-200">{option.detail}</p>
        <p className="text-stone-600 dark:text-stone-300">{option.check}</p>
      </Note>
    </div>
  )
}
