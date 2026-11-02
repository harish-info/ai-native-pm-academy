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
const blockFill = [
  cx(tone.well, tone.line),
  cx(tone.tint, tone.accentStroke),
  'fill-mark-200 stroke-mark-400',
]
const blockText = [tone.text, 'fill-indigo-800 dark:fill-indigo-200', 'fill-mark-900']

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
      <Stage className="dot-grid px-2 py-3">
        <Scene
          className="max-h-56!"
          viewBox="0 0 400 190"
          label={`${option.label}: ${count} things to evaluate, from ${blocks
            .slice(0, count)
            .map((b) => b.label.toLowerCase())
            .join(', ')}.`}
        >
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
            <text x="134" y="38" className={cx(tone.muted, 'text-[11px]')}>
              Context
            </text>
          </g>

          {/* Task in, result out */}
          <circle cx="22" cy="96" r="7" className={tone.mark} />
          <text x="22" y="120" textAnchor="middle" className={cx(tone.muted, 'text-[11px]')}>
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
            <text x="140" y="164" className={cx(tone.muted, 'text-[11px]')}>
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

          {/* The evaluation stack */}
          <path d="M236 170h152" className={tone.ink} strokeWidth="2" />
          {/* Empty slots show how tall the stack can grow */}
          {blocks.map((b, i) => (
            <rect
              key={`slot-${b.label}`}
              x="240"
              y={152 - i * 15.6}
              width="144"
              height="13"
              rx="3.5"
              strokeWidth="1"
              strokeDasharray="3 3"
              className={tone.faint}
            />
          ))}
          {blocks.map((b, i) => {
            const on = i < count
            const y = 152 - i * 15.6
            return (
              <g
                key={b.label}
                className="illus-move"
                style={{
                  opacity: on ? 1 : 0,
                  transform: on ? 'none' : 'translateY(-18px)',
                  transitionDelay: on ? `${b.order * 80}ms` : '0ms',
                }}
              >
                <rect
                  x="240"
                  y={y}
                  width="144"
                  height="13"
                  rx="3.5"
                  strokeWidth="1.2"
                  className={blockFill[b.layer]}
                />
                <text
                  x="312"
                  y={y + 10.2}
                  textAnchor="middle"
                  className={cx(blockText[b.layer], 'text-[11px] font-medium')}
                >
                  {b.label}
                </text>
              </g>
            )
          })}
          <text x="312" y="186" textAnchor="middle" className={cx(tone.muted, 'text-[12px]')}>
            To evaluate:{' '}
            <tspan key={count} className={cx(tone.text, 'font-mono font-semibold')}>
              {count}
            </tspan>
          </text>
        </Scene>
      </Stage>
      <Note id={choice} className="min-h-0">
        <p className="text-stone-700 dark:text-stone-200">{option.detail}</p>
        <p className="text-stone-600 dark:text-stone-300">{option.check}</p>
      </Note>
    </div>
  )
}
