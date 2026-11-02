import { useState } from 'react'
import { lessonVisuals } from '../../content/illustrations'
import { cx } from '../cx'
import { Note, Scene, Segmented, Stage, tone, Verdict } from './kit'
import './Skills.css'

const scenarios = lessonVisuals.skills.scenarios
const outcome = ['For review', 'Gap noted', 'Rejected']

function Page({ x, y, kind }: { x: number; y: number; kind: 'ok' | 'empty' | 'hostile' }) {
  if (kind === 'empty')
    return (
      <rect
        x={x}
        y={y}
        width="20"
        height="26"
        rx="3"
        className={cx(tone.line, 'fill-none')}
        strokeWidth="1.4"
        strokeDasharray="3 3"
      />
    )
  return (
    <g>
      <path
        d={`M${x} ${y}h14l6 6v20h-20z`}
        className={cx(
          kind === 'hostile' ? 'fill-red-50 dark:fill-red-950' : tone.paper,
          kind === 'hostile' ? tone.badStroke : tone.ink,
        )}
        strokeWidth="1.5"
      />
      {kind === 'hostile' ? (
        <path d={`M${x + 10} ${y + 8}v7m0 4v.5`} className={tone.badStroke} strokeWidth="2" />
      ) : (
        <path
          d={`M${x + 4} ${y + 11}h11M${x + 4} ${y + 16}h8M${x + 4} ${y + 21}h10`}
          className={tone.line}
          strokeWidth="1.4"
        />
      )}
    </g>
  )
}

function Outcome({ choice }: { choice: number }) {
  if (choice === 2)
    return (
      <g>
        <path
          d="M345 40l22 8v16c0 16-22 28-22 28s-22-12-22-28v-16z"
          className={cx('fill-red-50 dark:fill-red-950', tone.badStroke)}
          strokeWidth="2"
        />
        <path d="M335 60l20 0" className={tone.badStroke} strokeWidth="3" />
      </g>
    )
  return (
    <g>
      {choice === 0 && (
        <path
          d="M314 72v18h62V72"
          className={cx(tone.well, tone.ink)}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      )}
      <path d="M330 36h24l8 8v40h-32z" className={cx(tone.paper, tone.ink)} strokeWidth="1.8" />
      <path d="M336 50h18M336 57h14" className={tone.line} strokeWidth="1.6" />
      {choice === 0 ? (
        <path d="M336 64h20M336 71h12" className={tone.line} strokeWidth="1.6" />
      ) : (
        <rect
          x="335"
          y="63"
          width="22"
          height="14"
          rx="2"
          className={cx('fill-mark-100 dark:fill-stone-800', tone.markStroke)}
          strokeWidth="1.4"
          strokeDasharray="3 3"
        />
      )}
    </g>
  )
}

/** A scheduled skill runs the same bounded procedure on three kinds of input. */
export default function Skills() {
  const [choice, setChoice] = useState(0)
  const data = scenarios[choice]!
  const pages: ('ok' | 'empty' | 'hostile')[] =
    choice === 0
      ? ['ok', 'ok', 'ok']
      : choice === 1
        ? ['ok', 'ok', 'empty']
        : ['ok', 'ok', 'hostile']
  return (
    <div className="space-y-3">
      <Segmented
        label="Explore skill inputs"
        labels={scenarios.map((s) => s.label)}
        value={choice}
        onChange={setChoice}
      />
      <Stage className="dot-grid px-2 py-2">
        <Scene
          viewBox="0 0 400 128"
          className="max-h-48!"
          label={`A weekly trigger starts the skill with the same permissions. ${data.label}: ${data.log.join(', ')}. Result: ${data.result}.`}
        >
          {/* Trigger and inputs */}
          <g className={tone.ink} strokeWidth="1.8">
            <circle cx="26" cy="24" r="13" className={tone.paper} />
            <path d="M26 17v7l5 3" />
          </g>
          <text x="46" y="28" className={cx(tone.text, 'text-[12px] font-semibold')}>
            Weekly
          </text>
          {pages.map((kind, i) => (
            <Page key={`${choice}-${i}`} x={12 + i * 28} y={56} kind={kind} />
          ))}
          <text x="47" y="104" textAnchor="middle" className={cx(tone.muted, 'text-[11px]')}>
            Inputs
          </text>
          <path d="M96 69h18" className={tone.accentStroke} strokeWidth="2" />
          <path d="m110 65 4 4-4 4" className={tone.accentStroke} strokeWidth="2" />

          {/* The skill */}
          <rect
            x="120"
            y="30"
            width="150"
            height="78"
            rx="14"
            className={cx(tone.tint, 'stroke-indigo-300 dark:stroke-indigo-800')}
            strokeWidth="2"
          />
          <g key={choice} className="skills-spin">
            <circle
              cx="146"
              cy="62"
              r="11"
              className={cx(tone.paper, tone.accentStroke)}
              strokeWidth="5"
              strokeDasharray="4.3 4.3"
            />
            <circle
              cx="146"
              cy="62"
              r="4"
              className={cx(tone.paper, tone.accentStroke)}
              strokeWidth="2"
            />
          </g>
          <text x="166" y="60" className={cx(tone.text, 'text-[14px] font-semibold')}>
            Skill
          </text>
          <text x="166" y="76" className={cx(tone.muted, 'text-[11px]')}>
            Same permissions
          </text>
          <text
            x="195"
            y="98"
            textAnchor="middle"
            className={cx(tone.muted, 'font-mono text-[11px]')}
          >
            5 min · 10 files
          </text>
          <path d="M276 69h26" className={tone.accentStroke} strokeWidth="2" />
          <path d="m298 65 4 4-4 4" className={tone.accentStroke} strokeWidth="2" />

          {/* Outcome slides out of the skill, then gets its badge */}
          <g key={`out-${choice}`} className="skills-out">
            <Outcome choice={choice} />
          </g>
          <g key={`badge-${choice}`} className="illus-pop" style={{ animationDelay: '1.1s' }}>
            {choice === 1 ? (
              <g transform="translate(366 38)">
                <circle r="9" className={tone.mark} />
                <path d="M0 -4v4m0 3.5v.5" className="stroke-stone-900" strokeWidth="2" />
              </g>
            ) : (
              <Verdict x={choice === 2 ? 362 : 366} y={38} ok={choice === 0} />
            )}
          </g>
          <text
            x="345"
            y="112"
            textAnchor="middle"
            className={cx(tone.text, 'text-[12px] font-semibold')}
          >
            {outcome[choice]}
          </text>
        </Scene>
        <ol
          key={choice}
          aria-label="Example run log"
          className="mx-1 mt-2 space-y-1 border-t border-stone-200 bg-white pt-2 font-mono text-xs dark:border-stone-700 dark:bg-stone-900"
        >
          {data.log.map((line, i) => (
            <li
              key={line}
              className="skills-line flex gap-3"
              style={{ animationDelay: `${0.3 + i * 0.3}s` }}
            >
              <span className="text-stone-500 dark:text-stone-400">0{i + 1}</span>
              <span className="text-stone-700 dark:text-stone-200">{line}</span>
            </li>
          ))}
        </ol>
      </Stage>
      <Note id={choice} className="min-h-0">
        <p>
          <strong>Result:</strong> {data.result}.
        </p>
      </Note>
    </div>
  )
}
