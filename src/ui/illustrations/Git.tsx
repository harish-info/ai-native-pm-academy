import { type CSSProperties } from 'react'
import { lessonVisuals } from '../../content/illustrations'
import { cx } from '../cx'
import {
  controlClass,
  Note,
  PlayIcon,
  Scene,
  Segmented,
  Stage,
  tone,
  usePlayer,
  useReducedMotion,
} from './kit'
import './Git.css'

const data = lessonVisuals.git
const main = 48
const lane = 112
const len = (n: number) => ({ '--len': n }) as CSSProperties

function Commit({ x, y, live }: { x: number; y: number; live?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle
        r="7"
        className={cx(
          'illus-pop',
          live ? tone.accent : tone.paper,
          live ? tone.accentStroke : tone.ink,
        )}
        strokeWidth="2.5"
      />
    </g>
  )
}

/** A feature branch leaves main, gains a commit, passes checks and merges back. */
export default function Git() {
  const { step, playing, play, pause, goTo } = usePlayer(data.steps.length, 1800)
  const reduced = useReducedMotion()
  const current = data.steps[step]!
  const at = (n: number) => step === n
  const stroke = (n: number) => (at(n) ? tone.accentStroke : tone.ink)
  return (
    <div className="space-y-3">
      <Segmented
        label="Branch stages"
        labels={data.steps.map((s) => s.label)}
        value={step}
        onChange={goTo}
      />
      <Stage className="dot-grid px-2 py-3">
        <Scene
          viewBox="0 0 400 150"
          label={`A feature branch leaves main and returns through a reviewed merge. Current stage: ${current.label}. ${current.detail}`}
        >
          {/* main */}
          <path d={`M20 ${main}H384`} className={tone.line} strokeWidth="3" strokeLinecap="round" />
          <text x="20" y={main - 16} className={cx(tone.text, 'text-[13px] font-semibold')}>
            main
          </text>
          <Commit x={44} y={main} />
          <Commit x={92} y={main} />

          {/* Branch */}
          <path
            key={`b-${step >= 0}`}
            d={`M92 ${main}C122 ${main} 112 ${lane} 142 ${lane}`}
            className={cx(stroke(0), 'illus-draw')}
            style={len(90)}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <Commit x={142} y={lane} live={at(0)} />
          <text
            x="142"
            y={lane + 28}
            textAnchor="middle"
            className={cx(
              at(0) ? 'fill-indigo-700 dark:fill-indigo-300' : tone.muted,
              'font-mono text-[11px]',
            )}
          >
            feature
          </text>

          {/* Change */}
          {step >= 1 && (
            <g key="change">
              <path
                d={`M149 ${lane}H200`}
                className={cx(stroke(1), 'illus-draw')}
                style={len(52)}
                strokeWidth="3"
              />
              <Commit x={207} y={lane} live={at(1)} />
              <g className="illus-pop">
                <rect
                  x="186"
                  y={lane - 38}
                  width="42"
                  height="20"
                  rx="6"
                  className={cx(tone.paper, at(1) ? tone.accentStroke : tone.line)}
                  strokeWidth="1.5"
                />
                <text
                  x="196"
                  y={lane - 24}
                  className="fill-emerald-700 font-mono text-[11px] dark:fill-emerald-300"
                >
                  +3
                </text>
                <text
                  x="212"
                  y={lane - 24}
                  className="fill-red-600 font-mono text-[11px] dark:fill-red-300"
                >
                  -1
                </text>
              </g>
            </g>
          )}

          {/* Check */}
          {step >= 2 && (
            <g key="check">
              <path
                d={`M214 ${lane}H256`}
                className={cx(stroke(2), 'illus-draw')}
                style={len(44)}
                strokeWidth="3"
              />
              <circle
                cx="270"
                cy={lane}
                r="13"
                className={cx(tone.paper, at(2) ? tone.accentStroke : tone.ink)}
                strokeWidth="2.5"
              />
              {at(2) && !reduced && (
                <circle
                  cx="270"
                  cy={lane}
                  r="7"
                  className={cx(tone.accentStroke, 'git-spinner')}
                  strokeWidth="2.5"
                  strokeDasharray="30 14"
                  strokeLinecap="round"
                />
              )}
              <g className={cx('illus-pop', at(2) && 'git-after')}>
                <circle cx="270" cy={lane} r="9" className={tone.good} />
                <path
                  d={`M265.5 ${lane}l3 3 5.5-6`}
                  className="stroke-white dark:stroke-stone-950"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <text
                x="270"
                y={lane + 32}
                textAnchor="middle"
                className={cx(
                  at(2) ? 'fill-indigo-700 dark:fill-indigo-300' : tone.muted,
                  'text-[11px]',
                )}
              >
                checks and review
              </text>
            </g>
          )}

          {/* Merge */}
          {step >= 3 && (
            <g key="merge">
              <path
                d={`M283 ${lane}C318 ${lane} 304 ${main} 336 ${main}`}
                className={cx(tone.accentStroke, 'illus-draw')}
                style={len(90)}
                strokeWidth="3"
                strokeLinecap="round"
              />
              <g transform={`translate(344 ${main})`}>
                {!reduced && <circle r="11" className={cx(tone.accent, 'illus-pulse')} />}
                <circle
                  r="9"
                  className={cx(tone.accent, tone.accentStroke, 'illus-pop')}
                  strokeWidth="2"
                />
              </g>
              <text
                x="344"
                y={main - 18}
                textAnchor="middle"
                className="illus-pop fill-indigo-700 text-[12px] font-semibold dark:fill-indigo-300"
              >
                Merged
              </text>
            </g>
          )}
        </Scene>
      </Stage>
      <div className="flex flex-wrap items-start gap-3">
        <button type="button" className={controlClass} onClick={playing ? pause : play}>
          <PlayIcon playing={playing} />
          {playing ? 'Pause' : 'Play'}
        </button>
        <Note id={step} className="flex-1">
          <p>
            <strong>{current.label}.</strong> {current.detail}
          </p>
        </Note>
      </div>
    </div>
  )
}
