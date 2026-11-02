import { useEffect, useState } from 'react'
import { lessonVisuals } from '../../content/illustrations'
import { cx } from '../cx'
import { controlClass, Scene, Stage, tone, useReducedMotion } from './kit'

const data = lessonVisuals.verification
type Mark = 'ok' | 'warn' | 'bad'

function Badge({ x, y, kind }: { x: number; y: number; kind: Mark }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="illus-pop">
        <circle
          r="9"
          className={kind === 'ok' ? tone.good : kind === 'warn' ? 'fill-mark-400' : tone.bad}
        />
        {kind === 'ok' ? (
          <path d="M-4 0l3 3 5-6" className="stroke-white dark:stroke-stone-950" strokeWidth="2" />
        ) : kind === 'warn' ? (
          <path d="M0-4.5v5M0 4v.1" className="stroke-stone-900" strokeWidth="2.2" />
        ) : (
          <path
            d="M-3.5-3.5l7 7M3.5-3.5l-7 7"
            className="stroke-white dark:stroke-stone-950"
            strokeWidth="2"
          />
        )}
      </g>
    </g>
  )
}

/** A draft claim linked to a cited passage; checking it reveals the link does not hold. */
export default function Verify() {
  const [checking, setChecking] = useState(false)
  const [count, setCount] = useState(0)
  const reduced = useReducedMotion()
  useEffect(() => {
    if (!checking || count >= data.checks.length) return
    const timer = window.setTimeout(() => setCount(count + 1), count === 0 ? 250 : 650)
    return () => window.clearTimeout(timer)
  }, [checking, count])
  const shown = checking ? count : 0
  const broken = shown >= 3
  const toggle = () => {
    if (checking) {
      setChecking(false)
      setCount(0)
    } else {
      setChecking(true)
      setCount(reduced ? data.checks.length : 0)
    }
  }
  return (
    <div className="space-y-3">
      <Stage className="dot-grid px-2 py-3">
        <Scene
          viewBox="0 0 400 200"
          label={`A draft claims ${data.claim} It cites a page whose passage says ${data.passage}${broken ? ' The passage does not support the claim.' : ''}`}
        >
          {/* Draft */}
          <rect
            x="10"
            y="14"
            width="160"
            height="172"
            rx="10"
            className={cx(tone.paper, tone.ink)}
            strokeWidth="2"
          />
          <text x="24" y="38" className={cx(tone.text, 'text-[13px] font-semibold')}>
            Your draft
          </text>
          <path d="M24 54h120M24 66h96" className={tone.line} strokeWidth="3" />
          <rect
            x="18"
            y="80"
            width="144"
            height="46"
            rx="6"
            className={cx(
              broken ? 'fill-red-100 dark:fill-red-950' : 'fill-mark-200 dark:fill-mark-900',
              'illus-move',
            )}
          />
          <text
            x="26"
            y="99"
            className="fill-stone-900 text-[12px] font-medium dark:fill-stone-100"
          >
            The workflow reduced
          </text>
          <text
            x="26"
            y="116"
            className="fill-stone-900 text-[12px] font-medium dark:fill-stone-100"
          >
            errors by 12%.
          </text>
          <text
            x="112"
            y="116"
            className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300"
          >
            [1]
          </text>
          <path d="M24 142h112M24 154h124M24 166h80" className={tone.line} strokeWidth="3" />

          {/* Source page */}
          <rect
            x="230"
            y="14"
            width="160"
            height="172"
            rx="10"
            className={cx(tone.paper, tone.ink)}
            strokeWidth="2"
          />
          <path d="M230 40h160" className={tone.line} strokeWidth="2" />
          <circle cx="244" cy="27" r="3" className={tone.well} />
          <circle cx="254" cy="27" r="3" className={tone.well} />
          <rect x="266" y="21" width="92" height="12" rx="6" className={tone.well} />
          <path d="M244 58h96M244 70h120" className={tone.line} strokeWidth="3" />
          <rect
            x="238"
            y="80"
            width="144"
            height="46"
            rx="6"
            className={cx(
              shown >= 2
                ? 'fill-mark-200 dark:fill-mark-900'
                : 'fill-indigo-50 dark:fill-indigo-950',
              'illus-move',
            )}
          />
          <text
            x="246"
            y="99"
            className="fill-stone-900 text-[12px] font-medium dark:fill-stone-100"
          >
            12% more people
          </text>
          <text
            x="246"
            y="116"
            className="fill-stone-900 text-[12px] font-medium dark:fill-stone-100"
          >
            tried the workflow.
          </text>
          <path d="M244 142h104M244 154h120M244 166h72" className={tone.line} strokeWidth="3" />

          {/* The citation link */}
          {broken ? (
            <g key="broken">
              <path
                d="M162 103h22l6-6"
                className={cx(tone.badStroke)}
                strokeWidth="2.4"
                strokeDasharray="5 4"
              />
              <path
                d="M238 103h-22l-6 6"
                className={cx(tone.badStroke)}
                strokeWidth="2.4"
                strokeDasharray="5 4"
              />
            </g>
          ) : (
            <path
              d="M162 103H238"
              className={cx(tone.accentStroke, checking && 'illus-flow')}
              strokeWidth="2.4"
              strokeDasharray={checking ? undefined : '5 4'}
            />
          )}
          {shown >= 1 && <Badge x={376} y={27} kind="ok" />}
          {shown >= 2 && <Badge x={376} y={84} kind="warn" />}
          {shown >= 3 && <Badge x={200} y={103} kind="bad" />}
        </Scene>
      </Stage>
      <div className="flex flex-wrap items-start gap-x-4 gap-y-2">
        <button type="button" className={controlClass} onClick={toggle}>
          {checking ? 'Reset' : 'Check the claim'}
        </button>
        <ul aria-live="polite" className="min-h-[4.5rem] flex-1 space-y-1 text-sm">
          {shown === 0 && !checking && (
            <li className="pt-1.5 text-stone-500 dark:text-stone-400">
              Follow the citation and read what the passage actually says.
            </li>
          )}
          {data.checks.slice(0, shown).map((check, i) => (
            <li key={check} className="animate-pop-in flex items-center gap-2">
              <span
                aria-hidden
                className={cx(
                  'grid h-4 w-4 shrink-0 place-items-center rounded-full text-[10px] font-bold',
                  i === 0
                    ? 'bg-emerald-500 text-white dark:bg-emerald-400 dark:text-stone-950'
                    : i === 1
                      ? 'bg-mark-400 text-stone-900'
                      : 'bg-red-500 text-white dark:bg-red-400 dark:text-stone-950',
                )}
              >
                {i === 0 ? '✓' : i === 1 ? '!' : '×'}
              </span>
              {check}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
