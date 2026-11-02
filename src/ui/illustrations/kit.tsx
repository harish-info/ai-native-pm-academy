// Shared parts for the lesson illustrations: a canvas, a segmented control, a stepper and the
// hooks that keep motion polite. Scenes are line art in the theme tokens, like art.tsx.
import {
  useEffect,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from 'react'
import { cx } from '../cx'

/** Stroke and fill classes shared by every scene, so they read as one family. */
export const tone = {
  ink: 'stroke-stone-700 dark:stroke-stone-300',
  line: 'stroke-stone-300 dark:stroke-stone-600',
  faint: 'stroke-stone-200 dark:stroke-stone-700',
  paper: 'fill-white dark:fill-stone-900',
  well: 'fill-stone-100 dark:fill-stone-800',
  tint: 'fill-indigo-50 dark:fill-indigo-950',
  accent: 'fill-indigo-500 dark:fill-indigo-400',
  accentStroke: 'stroke-indigo-500 dark:stroke-indigo-400',
  mark: 'fill-mark-300 dark:fill-mark-400',
  markStroke: 'stroke-mark-400 dark:stroke-mark-400',
  good: 'fill-emerald-500 dark:fill-emerald-400',
  goodStroke: 'stroke-emerald-500 dark:stroke-emerald-400',
  bad: 'fill-red-500 dark:fill-red-400',
  badStroke: 'stroke-red-500 dark:stroke-red-400',
  text: 'fill-stone-800 dark:fill-stone-100',
  muted: 'fill-stone-500 dark:fill-stone-400',
} as const

const motionQuery = '(prefers-reduced-motion: reduce)'
function subscribeMotion(onChange: () => void) {
  const media = window.matchMedia?.(motionQuery)
  media?.addEventListener('change', onChange)
  return () => media?.removeEventListener('change', onChange)
}

/** True when the learner asked for less motion. Scenes then jump straight to the end state. */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia?.(motionQuery).matches ?? false,
    () => false,
  )
}

/** Becomes true once the element has scrolled into view, so intros play when someone sees them. */
export function useInView<T extends Element>(ref: RefObject<T | null>) {
  const [seen, setSeen] = useState(() => typeof IntersectionObserver === 'undefined')
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setSeen(true)
      },
      { threshold: 0.35 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, seen])
  return seen
}

/**
 * Steps through a sequence. Play runs it once at `interval` ms per step; with reduced motion,
 * Play advances a single step instead so nothing moves on its own.
 */
export function usePlayer(length: number, interval = 1400) {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const reduced = useReducedMotion()
  useEffect(() => {
    if (!playing) return
    const timer = window.setTimeout(() => {
      if (step >= length - 1) setPlaying(false)
      else setStep(step + 1)
    }, interval)
    return () => window.clearTimeout(timer)
  }, [playing, step, length, interval])
  return {
    step,
    playing,
    goTo: (n: number) => {
      setPlaying(false)
      setStep(n)
    },
    next: () => {
      setPlaying(false)
      setStep((step + 1) % length)
    },
    play: () => {
      if (reduced) {
        setStep((step + 1) % length)
        return
      }
      setStep(0)
      setPlaying(true)
    },
    pause: () => setPlaying(false),
  }
}

/** The canvas a scene sits on: a soft dot grid, so the drawing reads as a picture, not a form. */
export function Stage({
  children,
  className,
  style,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  return (
    <div
      className={cx(
        'illus-stage relative overflow-hidden rounded-xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900',
        className,
      )}
      style={style}
    >
      {children}
    </div>
  )
}

/** An SVG scene sized by its viewBox and capped in height so it never dominates the page. */
export function Scene({
  viewBox,
  label,
  children,
  className,
}: {
  viewBox: string
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={viewBox}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cx('illus-scene mx-auto block h-auto max-h-64 w-full', className)}
    >
      {children}
    </svg>
  )
}

/**
 * Equal-width options on a track with a thumb that slides to the choice. Buttons keep
 * aria-pressed so they read as a set of toggles.
 */
export function Segmented({
  labels,
  value,
  onChange,
  label,
  className,
}: {
  labels: readonly string[]
  value: number
  onChange: (n: number) => void
  label: string
  className?: string
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cx(
        'relative grid rounded-xl border border-stone-200 bg-stone-100 p-1 dark:border-stone-700 dark:bg-stone-800',
        className,
      )}
      style={{ gridTemplateColumns: `repeat(${labels.length}, minmax(0, 1fr))` }}
    >
      <span
        aria-hidden
        className="absolute top-1 bottom-1 left-1 rounded-lg bg-white shadow-sm ring-1 ring-indigo-500/40 transition-transform duration-300 ease-out dark:bg-stone-950 dark:ring-indigo-400/50"
        style={{
          width: `calc((100% - 0.5rem) / ${labels.length})`,
          transform: `translateX(${value * 100}%)`,
        }}
      />
      {labels.map((text, i) => (
        <button
          key={text}
          type="button"
          aria-pressed={value === i}
          onClick={() => onChange(i)}
          className={cx(
            'relative z-10 min-h-9 cursor-pointer rounded-lg px-2 py-1.5 text-xs leading-tight font-medium transition-colors',
            value === i
              ? 'text-indigo-800 dark:text-indigo-200'
              : 'text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-white',
          )}
        >
          {text}
        </button>
      ))}
    </div>
  )
}

export const controlClass =
  'inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs font-medium transition-colors hover:border-indigo-500 hover:text-indigo-800 dark:border-stone-600 dark:bg-stone-900 dark:hover:border-indigo-400 dark:hover:text-indigo-200'

/** Dots that show where a sequence is and let you jump to any step. */
export function StepDots({
  count,
  value,
  onChange,
  label,
}: {
  count: number
  value: number
  onChange: (n: number) => void
  label: string
}) {
  return (
    <div role="group" aria-label={label} className="flex items-center gap-1">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Step ${i + 1}`}
          aria-pressed={i === value}
          onClick={() => onChange(i)}
          className="grid h-6 w-5 cursor-pointer place-items-center"
        >
          <span
            className={cx(
              'block h-2 rounded-full transition-all duration-300',
              i === value
                ? 'w-5 bg-indigo-500 dark:bg-indigo-400'
                : i < value
                  ? 'w-2 bg-indigo-300 dark:bg-indigo-700'
                  : 'w-2 bg-stone-300 dark:bg-stone-600',
            )}
          />
        </button>
      ))}
    </div>
  )
}

export function PlayIcon({ playing }: { playing: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
      {playing ? <path d="M4 3h3v10H4zM9 3h3v10H9z" /> : <path d="M4 2.5v11l9-5.5z" />}
    </svg>
  )
}

/** The changing sentence under a scene. Keyed by `id` so each change fades in. */
export function Note({
  id,
  children,
  className,
}: {
  id: string | number
  children: ReactNode
  className?: string
}) {
  return (
    <div aria-live="polite" className={cx('min-h-11 text-sm leading-relaxed', className)}>
      <div key={id} className="animate-pop-in">
        {children}
      </div>
    </div>
  )
}

/** A small round badge with a tick or a cross, for checks inside scenes. */
export function Verdict({ x, y, ok, r = 9 }: { x: number; y: number; ok: boolean; r?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} className={ok ? tone.good : tone.bad} />
      <path
        d={
          ok ? `M${-r * 0.4} 0l${r * 0.3} ${r * 0.3} ${r * 0.5}-${r * 0.6}` : `M-3 -3l6 6M3 -3l-6 6`
        }
        className="stroke-white dark:stroke-stone-950"
        strokeWidth={2}
      />
    </g>
  )
}
