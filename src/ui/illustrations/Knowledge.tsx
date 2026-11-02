import { useState } from 'react'
import { lessonVisuals } from '../../content/illustrations'
import { cx } from '../cx'
import { controlClass, Note, Scene, Stage, tone } from './kit'

const layers = lessonVisuals.knowledge.layers
const folders = ['AGENTS.md', 'wiki/', 'sources/']
// Each layer is a flat square seen at an angle. Local (u, v) points map onto the page here.
const tops = [14, 80, 146]
const cx0 = 150
const iso = (u: number, v: number, top: number) =>
  [cx0 + 0.85 * u - 0.85 * v, top + 0.22 * u + 0.22 * v] as const
const plane = (top: number) => `matrix(0.85 0.22 -0.85 0.22 ${cx0} ${top})`

// Tiles on each layer, in local coordinates: one instruction file, a few wiki pages, many sources.
const tiles: [number, number, number, number][][] = [
  [[34, 34, 54, 40]],
  [
    [18, 18, 34, 30],
    [62, 18, 34, 30],
    [18, 62, 34, 30],
    [62, 62, 34, 30],
    [104, 40, 22, 30],
  ],
  [0, 1, 2, 3].flatMap((r) =>
    [0, 1, 2, 3].map((c) => [14 + c * 30, 14 + r * 30, 22, 22] as [number, number, number, number]),
  ),
]
const face = [
  'fill-mark-100 dark:fill-stone-800',
  'fill-indigo-50 dark:fill-indigo-950',
  'fill-white dark:fill-stone-900',
]
const slab = [
  'fill-mark-200 dark:fill-stone-700',
  'fill-indigo-200 dark:fill-indigo-900',
  'fill-stone-200 dark:fill-stone-700',
]
const wikiTile = 3
const sourceTile = 13

export default function Knowledge() {
  const [trace, setTrace] = useState(false)
  const centre = (layer: number, t: number) => {
    const [x, y, w, h] = tiles[layer]![t]!
    return iso(x + w / 2, y + h / 2, tops[layer]!)
  }
  const [wx, wy] = centre(1, wikiTile)
  const [sx, sy] = centre(2, sourceTile)
  return (
    <div className="space-y-3">
      <Stage className="dot-grid px-2 py-3">
        <Scene
          viewBox="0 0 400 220"
          className="max-h-56!"
          label="Three stacked layers: instructions on top, the wiki in the middle and sources at the bottom. A claim on a wiki page can be traced down to the source passage it cites."
        >
          {[2, 1, 0].map((layer) => {
            const top = tops[layer]!
            const live = trace && layer > 0
            return (
              <g key={layer}>
                <path
                  d={`M${cx0 - 119} ${top + 31}L${cx0} ${top + 62}L${cx0 + 119} ${top + 31}v7L${cx0} ${top + 69}L${cx0 - 119} ${top + 38}Z`}
                  className={cx(slab[layer], tone.line)}
                  strokeWidth="1.2"
                />
                <g transform={plane(top)}>
                  <rect
                    width="140"
                    height="140"
                    rx="10"
                    className={cx(
                      live ? tone.tint : face[layer],
                      live ? 'stroke-indigo-400 dark:stroke-indigo-600' : tone.line,
                      'illus-move',
                    )}
                    strokeWidth="1.6"
                    vectorEffect="non-scaling-stroke"
                  />
                  {tiles[layer]!.map(([x, y, w, h], t) => {
                    const hot =
                      trace &&
                      ((layer === 1 && t === wikiTile) || (layer === 2 && t === sourceTile))
                    return (
                      <rect
                        key={t}
                        x={x}
                        y={y}
                        width={w}
                        height={h}
                        rx="3"
                        className={cx(
                          hot
                            ? tone.mark
                            : layer === 0
                              ? tone.paper
                              : layer === 1
                                ? 'fill-indigo-100 dark:fill-indigo-900'
                                : tone.well,
                          hot ? tone.ink : tone.line,
                          'illus-move',
                        )}
                        strokeWidth="1.2"
                        vectorEffect="non-scaling-stroke"
                      />
                    )
                  })}
                </g>
                <text x="292" y={top + 28} className={cx(tone.text, 'text-[14px] font-semibold')}>
                  {layers[layer]!.label}
                </text>
                <text x="292" y={top + 44} className={cx(tone.muted, 'font-mono text-[11px]')}>
                  {folders[layer]}
                </text>
              </g>
            )
          })}
          {trace && (
            <g>
              <path
                d={`M${wx} ${wy}V${sy}`}
                className={cx(tone.accentStroke, 'illus-flow')}
                strokeWidth="2.4"
              />
              <circle cx={wx} cy={wy} r="4" className={tone.accent} />
              <text
                x={wx - 10}
                y={wy - 8}
                textAnchor="end"
                className="illus-pop fill-stone-800 stroke-white font-mono text-[11px] dark:fill-stone-100 dark:stroke-stone-900"
                strokeWidth="4"
                strokeLinejoin="round"
                paintOrder="stroke"
              >
                decisions.md
              </text>
              <g className="illus-pop" style={{ animationDelay: '0.25s' }}>
                <circle
                  cx={sx}
                  cy={sy}
                  r="11"
                  className={cx(tone.ink, 'fill-white/40 dark:fill-stone-900/40')}
                  strokeWidth="2.4"
                />
                <path d={`M${sx + 8} ${sy + 8}l8 8`} className={tone.ink} strokeWidth="3.5" />
              </g>
              <text
                x={sx + 22}
                y={sy + 20}
                className="illus-pop fill-stone-800 stroke-white font-mono text-[11px] dark:fill-stone-100 dark:stroke-stone-900"
                strokeWidth="4"
                strokeLinejoin="round"
                paintOrder="stroke"
                style={{ animationDelay: '0.3s' }}
              >
                review-01.md
              </text>
            </g>
          )}
        </Scene>
      </Stage>
      <ul className="grid gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        {layers.map((layer) => (
          <li key={layer.label}>
            <strong>{layer.label}.</strong>{' '}
            <span className="text-stone-600 dark:text-stone-300">{layer.detail}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-col items-start gap-2 sm:flex-row sm:gap-3">
        <button
          type="button"
          aria-pressed={trace}
          className={controlClass}
          onClick={() => setTrace(!trace)}
        >
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <circle cx="7" cy="7" r="4.5" />
            <path d="m10.5 10.5 4 4" strokeLinecap="round" />
          </svg>
          {trace ? 'Hide source trail' : 'Follow a claim'}
        </button>
        <Note id={String(trace)} className="min-w-0 sm:flex-1">
          {trace ? (
            <p>
              <span className="font-mono text-xs">wiki/decisions.md</span> cites{' '}
              <span className="font-mono text-xs">sources/review-01.md</span>. Open the original
              passage. Does it support the decision and remain current?
            </p>
          ) : (
            <p>Instructions point to the wiki. The wiki cites sources. Follow one claim down.</p>
          )}
        </Note>
      </div>
    </div>
  )
}
