import { useEffect, useRef, useState } from 'react'
import { lessonVisuals } from '../../content/illustrations'
import { cx } from '../cx'
import { Note, Stage, useInView } from './kit'

const data = lessonVisuals.discovery

type Wire = { d: string; branch: number; depth: number }

/** A right-angled tree connector: down, across, down, with small rounded corners. */
function elbow(x1: number, y1: number, x2: number, y2: number) {
  const mid = (y1 + y2) / 2
  const dx = x2 - x1
  if (Math.abs(dx) < 1) return `M${x1} ${y1}V${y2}`
  const r = Math.min(6, Math.abs(dx) / 2, (y2 - y1) / 2)
  const s = Math.sign(dx)
  return `M${x1} ${y1}V${mid - r}Q${x1} ${mid} ${x1 + s * r} ${mid}H${x2 - s * r}Q${x2} ${mid} ${x2} ${mid + r}V${y2}`
}

/** Measures the rendered nodes and draws the branches between them, so text can wrap freely. */
function useWires(
  root: React.RefObject<HTMLDivElement | null>,
  outcome: React.RefObject<HTMLDivElement | null>,
  opps: React.RefObject<(HTMLButtonElement | null)[]>,
  leaves: React.RefObject<(HTMLDivElement | null)[]>,
) {
  const [wires, setWires] = useState<{ w: number; h: number; list: Wire[] }>({
    w: 0,
    h: 0,
    list: [],
  })
  useEffect(() => {
    const el = root.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const measure = () => {
      const base = el.getBoundingClientRect()
      const box = (n: Element) => {
        const r = n.getBoundingClientRect()
        return {
          l: r.left - base.left,
          r: r.right - base.left,
          t: r.top - base.top,
          b: r.bottom - base.top,
          cx: r.left - base.left + r.width / 2,
          cy: r.top - base.top + r.height / 2,
        }
      }
      const list: Wire[] = []
      const o = outcome.current && box(outcome.current)
      opps.current.forEach((opp, i) => {
        if (!opp || !o) return
        const p = box(opp)
        list.push({
          d: elbow(o.cx, o.b, p.cx, p.t),
          branch: i,
          depth: 0,
        })
        const kids = [leaves.current[i * 2], leaves.current[i * 2 + 1]].filter(
          Boolean,
        ) as HTMLDivElement[]
        const boxes = kids.map(box)
        const sideBySide = boxes.length === 2 && Math.abs(boxes[0]!.t - boxes[1]!.t) < 4
        boxes.forEach((k) => {
          if (sideBySide) {
            list.push({
              d: elbow(p.cx, p.b, k.cx, k.t),
              branch: i,
              depth: 1,
            })
          } else {
            const x = p.l + 10
            list.push({ d: `M${x} ${p.b}V${k.cy - 6}q0 6 6 6H${k.l}`, branch: i, depth: 1 })
          }
        })
      })
      setWires({ w: base.width, h: base.height, list })
    }
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [root, outcome, opps, leaves])
  return wires
}

export default function Discovery() {
  const [chosen, setChosen] = useState<number | null>(null)
  const root = useRef<HTMLDivElement>(null)
  const outcome = useRef<HTMLDivElement>(null)
  const opps = useRef<(HTMLButtonElement | null)[]>([])
  const leaves = useRef<(HTMLDivElement | null)[]>([])
  const wires = useWires(root, outcome, opps, leaves)
  const seen = useInView(root)
  const dim = (branch: number) => chosen !== null && chosen !== branch
  return (
    <div className="space-y-3">
      <Stage className="dot-grid p-3 sm:p-4">
        <div ref={root} className="@container relative">
          {seen && wires.w > 0 && (
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0"
              width={wires.w}
              height={wires.h}
              fill="none"
            >
              {wires.list.map((wire) => (
                <path
                  key={wire.d}
                  d={wire.d}
                  pathLength={1}
                  strokeWidth={chosen === wire.branch ? 2.4 : 1.6}
                  className={cx(
                    'illus-draw transition-[stroke,opacity] duration-300',
                    chosen === wire.branch
                      ? 'stroke-indigo-500 dark:stroke-indigo-400'
                      : 'stroke-stone-400 dark:stroke-stone-500',
                    dim(wire.branch) && 'opacity-30',
                  )}
                  style={{
                    ['--len' as string]: 1,
                    animationDelay: `${wire.depth * 0.45}s`,
                    animationDuration: '0.5s',
                  }}
                />
              ))}
            </svg>
          )}
          <div className="relative grid gap-7">
            <div className="flex justify-center">
              <div
                ref={outcome}
                className="flex max-w-xs items-center gap-2.5 rounded-xl border-2 border-indigo-500 bg-indigo-50 px-3 py-2 shadow-sm dark:border-indigo-400 dark:bg-indigo-950"
              >
                <svg
                  aria-hidden
                  viewBox="0 0 20 20"
                  className="h-5 w-5 shrink-0 text-indigo-700 dark:text-indigo-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 18V3M5 4h10l-2.5 3.5L15 11H5" />
                </svg>
                <div>
                  <p className="text-[11px] font-semibold tracking-wide text-indigo-700 uppercase dark:text-indigo-300">
                    Outcome
                  </p>
                  <p className="text-sm leading-snug font-medium">{data.outcome}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {data.opportunities.map((opportunity, i) => (
                <div key={opportunity} className="grid content-start gap-6">
                  <button
                    ref={(el) => {
                      opps.current[i] = el
                    }}
                    type="button"
                    aria-pressed={chosen === i}
                    onClick={() => setChosen(chosen === i ? null : i)}
                    className={cx(
                      'cursor-pointer rounded-xl border bg-white px-3 py-2 text-left shadow-sm transition-all duration-300 dark:bg-stone-900',
                      chosen === i
                        ? 'border-indigo-500 ring-2 ring-indigo-500/30 dark:border-indigo-400'
                        : 'border-stone-300 hover:border-indigo-400 dark:border-stone-600',
                      dim(i) && 'opacity-40',
                    )}
                  >
                    <span className="block text-[11px] font-semibold tracking-wide text-stone-500 uppercase dark:text-stone-400">
                      Opportunity
                    </span>
                    <span className="block text-sm leading-snug">{opportunity}</span>
                  </button>
                  <div className="grid gap-2 @md:grid-cols-2">
                    {data.solutions.slice(i * 2, i * 2 + 2).map((solution, j) => (
                      <div
                        key={solution}
                        ref={(el) => {
                          leaves.current[i * 2 + j] = el
                        }}
                        className={cx(
                          'ml-5 flex items-center rounded-lg border border-dashed px-2.5 py-1.5 text-xs leading-snug transition-all duration-300 @md:ml-0 @md:min-h-12 @md:justify-center @md:text-center',
                          chosen === i
                            ? 'illus-pop border-indigo-400 bg-indigo-50 dark:border-indigo-500 dark:bg-indigo-950'
                            : 'border-stone-300 bg-white dark:border-stone-600 dark:bg-stone-900',
                          dim(i) && 'opacity-40',
                        )}
                      >
                        {solution}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Stage>
      <Note id={chosen ?? 'none'} className="min-h-0">
        <p className="text-stone-700 dark:text-stone-200">
          {chosen === null
            ? 'Select an opportunity to follow its branch.'
            : 'Each solution answers this one difficulty. Compare the alternatives before you build any of them.'}
        </p>
      </Note>
    </div>
  )
}
