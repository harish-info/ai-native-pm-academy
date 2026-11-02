import { useState } from 'react'
import { lessonVisuals } from '../../content/illustrations'
import { cx } from '../cx'
import { Note, Scene, Segmented, Stage, tone, Verdict } from './kit'

const data = lessonVisuals.review
const [afterStatus, afterBanner] = data.after.replace(/\.$/, '').split('. ')

/** A dashboard whose refresh fails, shown before and after the correction. */
export default function Review() {
  const [fixed, setFixed] = useState(0)
  const report = [
    { label: 'Condition', text: 'The refresh fails.' },
    {
      label: 'Actual',
      text: fixed
        ? `It keeps the last result and says “${data.after}”`
        : `It shows old data as “${data.before}”.`,
    },
    { label: 'Expected', text: data.requirement },
  ]
  return (
    <div className="space-y-3">
      <Segmented
        label="Compare bug and correction"
        labels={['Before correction', 'After correction']}
        value={fixed}
        onChange={setFixed}
      />
      <Stage className="dot-grid px-2 py-3">
        <Scene
          className="max-h-56!"
          viewBox="0 6 400 184"
          label={
            fixed
              ? 'After the correction, the dashboard keeps yesterday’s result, greys it out and shows a banner saying the refresh failed.'
              : 'Before the correction, the refresh fails but the dashboard still says it was updated today.'
          }
        >
          {/* Dashboard card */}
          <rect
            x="16"
            y="14"
            width="250"
            height="168"
            rx="14"
            className={cx(tone.paper, tone.ink)}
            strokeWidth="2"
          />
          <circle cx="36" cy="38" r="8" className={cx(tone.well, tone.ink)} strokeWidth="1.6" />
          <path d="M36 33v5l3 2" className={tone.ink} strokeWidth="1.6" />
          <text x="52" y="43" className={cx(tone.text, 'text-[13px] font-semibold')}>
            Last known result
          </text>

          {/* Amber banner after the fix */}
          <g className="illus-move" style={{ opacity: fixed ? 1 : 0 }}>
            <rect
              x="30"
              y="54"
              width="222"
              height="24"
              rx="7"
              className="fill-mark-200 stroke-mark-400"
              strokeWidth="1.4"
            />
            <path d="M42 60l7 12H35z" className="stroke-mark-900" strokeWidth="1.6" fill="none" />
            <path d="M42 64v3" className="stroke-mark-900" strokeWidth="1.6" />
            <text x="56" y="70" className="fill-mark-900 text-[12px] font-semibold">
              {afterBanner}
            </text>
          </g>

          {/* Sparkline, greyed when stale */}
          <g className="illus-move" style={{ opacity: fixed ? 0.45 : 1 }}>
            <path d="M30 150H252" className={tone.faint} strokeWidth="1.4" />
            <path
              d="M30 140 62 128 94 134 126 112 158 118 190 98 222 104 252 88"
              className={cx(fixed ? tone.line : 'stroke-[var(--viz-series-1)]', 'illus-move')}
              strokeWidth="2.6"
            />
            <path
              d="M30 140 62 128 94 134 126 112 158 118 190 98 222 104 252 88V150H30Z"
              className={
                fixed
                  ? 'fill-stone-200/40 dark:fill-stone-700/30'
                  : 'fill-[var(--viz-series-1)] opacity-10'
              }
            />
            <circle
              cx="252"
              cy="88"
              r="4"
              className={fixed ? 'fill-stone-400' : 'fill-[var(--viz-series-1)]'}
            />
          </g>
          {fixed ? (
            <g key="after" className="illus-pop">
              <rect
                x="166"
                y="104"
                width="78"
                height="20"
                rx="10"
                className={cx(tone.well, tone.line)}
                strokeWidth="1.2"
              />
              <text
                x="205"
                y="118"
                textAnchor="middle"
                className={cx(tone.muted, 'text-[11px] font-semibold')}
              >
                yesterday
              </text>
            </g>
          ) : null}

          <text
            x="30"
            y="172"
            className={cx(
              fixed ? tone.muted : 'fill-emerald-700 dark:fill-emerald-300',
              'text-[13px] font-semibold',
            )}
          >
            {fixed ? afterStatus : data.before}
          </text>
          <g key={fixed} className="illus-pop">
            <Verdict x={fixed ? 170 : 140} y={167} ok={!!fixed} r={8} />
          </g>

          {/* Failed refresh coming in from the right */}
          <path
            d="M330 104Q300 104 272 104"
            className={cx(tone.line, 'illus-flow')}
            strokeWidth="2"
          />
          <path d="M296 94l12 20M308 94l-12 20" className={tone.badStroke} strokeWidth="2.4" />
          <g className="illus-float">
            <path
              d="M322 92a14 14 0 0 1 27-6 11 11 0 0 1 18 9 9 9 0 0 1-2 18h-41a11 11 0 0 1-2-21z"
              className={cx(tone.paper, tone.ink)}
              strokeWidth="2"
            />
            <path d="M346 98l-7 10h7l-5 9" className={tone.markStroke} strokeWidth="2.4" />
          </g>
          <text
            x="344"
            y="140"
            textAnchor="middle"
            className={cx(tone.text, 'text-[13px] font-semibold')}
          >
            Refresh
          </text>
          <text x="344" y="156" textAnchor="middle" className={cx(tone.muted, 'text-[12px]')}>
            fails
          </text>
        </Scene>
      </Stage>
      <Note id={fixed}>
        <dl className="grid gap-1.5 text-xs sm:grid-cols-[5.5rem_minmax(0,1fr)]">
          {report.map((row) => (
            <div key={row.label} className="contents">
              <dt className="font-semibold text-stone-500 dark:text-stone-400">{row.label}</dt>
              <dd
                className={cx(
                  'mb-1.5 sm:mb-0',
                  row.label === 'Actual' &&
                    (fixed
                      ? 'text-emerald-800 dark:text-emerald-300'
                      : 'text-red-700 dark:text-red-300'),
                )}
              >
                {row.text}
              </dd>
            </div>
          ))}
        </dl>
      </Note>
    </div>
  )
}
