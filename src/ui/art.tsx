// Original line-art illustrations and icons, drawn for this site. Colors come from the theme
// tokens, so every piece follows light, dark and the palette without extra assets.
import type { CSSProperties, JSX, ReactNode } from 'react'
import type { LevelId } from '../content/types'
import { cx } from './cx'

const ink = 'stroke-stone-800 dark:stroke-stone-200'
const blob = 'fill-indigo-50 dark:fill-indigo-950'
const accent = 'fill-indigo-500 dark:fill-indigo-400'
const soft = 'fill-white dark:fill-stone-800'
const sage = 'fill-emerald-300 dark:fill-emerald-700'
const mark = 'fill-mark-300 dark:fill-mark-500'

function Frame({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 96 96"
      aria-hidden
      focusable="false"
      className={cx('shrink-0', className)}
      fill="none"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        className={blob}
        d="M50 7c17 1 33 10 38 27 5 18-2 37-17 47S35 92 21 82 3 55 8 37 31 6 50 7Z"
        stroke="none"
      />
      {children}
    </svg>
  )
}

function Fluency() {
  return (
    <>
      <path
        className={cx(soft, ink)}
        d="M18 30a8 8 0 0 1 8-8h28a8 8 0 0 1 8 8v14a8 8 0 0 1-8 8H36l-10 8v-8a8 8 0 0 1-8-8Z"
      />
      <path
        className={cx(accent, ink)}
        d="M46 50h22a8 8 0 0 1 8 8v8a8 8 0 0 1-8 8v6l-8-6H46a8 8 0 0 1-8-8v-8a8 8 0 0 1 8-8Z"
      />
      <path className={ink} d="M28 34h22M28 41h14" />
      <path
        className={cx(mark, ink)}
        strokeWidth={2}
        d="M74 16l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5Z"
      />
    </>
  )
}

function SecondBrain() {
  return (
    <>
      <path className={ink} d="M34 34 60 26M34 34l8 30M60 26l6 34M42 64l24-4" />
      <rect className={cx(soft, ink)} x="18" y="22" width="24" height="24" rx="5" />
      <rect className={cx(accent, ink)} x="50" y="14" width="22" height="22" rx="5" />
      <rect className={cx(soft, ink)} x="30" y="56" width="22" height="22" rx="5" />
      <rect className={cx(mark, ink)} x="58" y="52" width="20" height="20" rx="5" />
      <path className={ink} d="M24 30h12M24 37h8M36 64h10M36 70h6" />
    </>
  )
}

function Discovery() {
  return (
    <>
      <rect
        className={cx(soft, ink)}
        x="16"
        y="20"
        width="30"
        height="30"
        rx="4"
        transform="rotate(-6 31 35)"
      />
      <rect
        className={cx(mark, ink)}
        x="40"
        y="16"
        width="28"
        height="28"
        rx="4"
        transform="rotate(5 54 30)"
      />
      <path className={ink} d="M22 32h16M23 39h10" />
      <circle className={cx(accent, ink)} cx="50" cy="56" r="15" />
      <circle className={soft} cx="50" cy="56" r="9" stroke="none" opacity={0.55} />
      <path className={ink} strokeWidth={4} d="M61 67l13 13" />
    </>
  )
}

function Build() {
  return (
    <>
      <rect className={cx(soft, ink)} x="14" y="18" width="62" height="46" rx="6" />
      <path className={ink} d="M14 28h62" />
      <circle className={accent} cx="21" cy="23" r="1.8" stroke="none" />
      <circle className={sage} cx="27" cy="23" r="1.8" stroke="none" />
      <path className={ink} d="M36 38l-7 7 7 7M54 38l7 7-7 7M48 36l-6 18" />
      <path className={ink} d="M64 70v-6M64 70c0 6 6 6 12 6M64 70v12" />
      <circle className={cx(accent, ink)} cx="64" cy="84" r="4" />
      <circle className={cx(sage, ink)} cx="80" cy="76" r="4" />
    </>
  )
}

function Agents() {
  return (
    <>
      <ellipse
        className={ink}
        cx="48"
        cy="50"
        rx="34"
        ry="14"
        strokeDasharray="3 5"
        transform="rotate(-18 48 50)"
      />
      <path className={cx(accent, ink)} d="M48 22l18 7v15c0 12-8 20-18 24-10-4-18-12-18-24V29Z" />
      <path className="stroke-white dark:stroke-stone-950" strokeWidth={3} d="M40 45l6 6 11-12" />
      <circle className={cx(mark, ink)} cx="17" cy="62" r="5" />
      <circle className={cx(soft, ink)} cx="80" cy="36" r="5" />
    </>
  )
}

const levelArt: Record<LevelId, () => JSX.Element> = {
  1: Fluency,
  2: SecondBrain,
  3: Discovery,
  4: Build,
  5: Agents,
}

export function LevelArt({ levelId, className }: { levelId: LevelId; className?: string }) {
  const Art = levelArt[levelId]
  return (
    <Frame className={className}>
      <Art />
    </Frame>
  )
}

/** A quiet empty-state picture: an open notebook with a pencil. */
export function EmptyArt({ className }: { className?: string }) {
  return (
    <Frame className={className}>
      <path className={cx(soft, ink)} d="M18 30c10-4 20-4 30 2v40c-10-6-20-6-30-2Z" />
      <path className={cx(soft, ink)} d="M78 30c-10-4-20-4-30 2v40c10-6 20-6 30-2Z" />
      <path className={ink} d="M25 40c6-2 11-1 16 1M25 48c6-2 11-1 16 1M55 41c5-2 10-3 16-1" />
      <path className={cx(accent, ink)} d="M60 62l16-16 5 5-16 16-7 2Z" />
    </Frame>
  )
}

export function BrandMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" aria-hidden focusable="false" className={className}>
      <rect width="36" height="36" rx="10" className="fill-indigo-600 dark:fill-indigo-400" />
      <path
        d="M9 12.5c3-1.3 6-1.1 9 .7v12c-3-1.8-6-2-9-.7Zm18 0c-3-1.3-6-1.1-9 .7v12c3-1.8 6-2 9-.7Z"
        fill="none"
        strokeWidth={1.8}
        strokeLinejoin="round"
        className="stroke-white dark:stroke-stone-950"
      />
      <path
        d="M27 5.5l1 2.4 2.4 1-2.4 1-1 2.4-1-2.4-2.4-1 2.4-1Z"
        className="fill-white dark:fill-stone-950"
      />
    </svg>
  )
}

const iconPaths: Record<string, string> = {
  home: 'M3.5 9 10 3.8 16.5 9v7a1 1 0 0 1-1 1H12v-4.5H8V17H4.5a1 1 0 0 1-1-1Z',
  path: 'M5 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10-10a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM6.5 13.5c1.5-3 7-2 7-5.5M13.6 6.4',
  calendar:
    'M4.5 5h11a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1ZM3.5 9h13M7 3v4M13 3v4',
  wallet:
    'M4.5 5.5h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-10a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1ZM12.5 11h4M3.5 6.5 13 3.5',
  cycle: 'M16.2 10a6.2 6.2 0 1 1-1.8-4.4M16.2 3.4v3h-3M7.5 10.2l1.8 1.8 3.4-3.6',
  book: 'M4 5a1.5 1.5 0 0 1 1.5-1.5H16v11H5.5A1.5 1.5 0 0 0 4 16Zm0 11a1.5 1.5 0 0 0 1.5 1.5H16M7.5 7h5',
  pencil: 'M4 16.5l.8-3.6 8.4-8.4a1.8 1.8 0 0 1 2.6 2.6l-8.4 8.4ZM12 5.8l2.4 2.4',
  library: 'M4 4h3v12.5H4ZM8.8 4h3v12.5h-3ZM13.6 5l2.8.8-3 10.8-2.8-.8',
  chart: 'M4 16.5h12.5M6 14V9.5M10 14V5.5M14 14v-6',
  trophy: 'M10 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm-2.5-.7L6.5 17.5l3.5-1.8 3.5 1.8-1-6.2',
  clock: 'M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM10 6.5V10l2.5 1.8',
  star: 'M10 3.2l2 4.3 4.6.5-3.4 3.2.9 4.6L10 13.5l-4.1 2.3.9-4.6L3.4 8l4.6-.5Z',
  spark: 'M10 3v4M10 13v4M3 10h4M13 10h4M5.5 5.5l2 2M12.5 12.5l2 2M14.5 5.5l-2 2M7.5 12.5l-2 2',
  shield: 'M10 3 4.5 5v4.5c0 3.5 2.4 6.2 5.5 7.5 3.1-1.3 5.5-4 5.5-7.5V5ZM7.5 10l1.8 1.8 3.2-3.4',
  users:
    'M7.5 9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3 16c.5-2.6 2.3-4 4.5-4s4 1.4 4.5 4M13 4.8a2.5 2.5 0 0 1 0 4.6M14.5 12.2c1.4.5 2.3 1.8 2.5 3.8',
  quiz: 'M5 3.5h10v13H5ZM7.5 7.5h5M7.5 10.5h5M7.5 13.5h3',
  flag: 'M5.5 17V3.5M5.5 4h9l-2 3.2 2 3.3h-9',
  sliders:
    'M3.5 6.5h13M3.5 13.5h13M8 6.5a1.8 1.8 0 1 1-3.6 0 1.8 1.8 0 0 1 3.6 0Zm7.6 7a1.8 1.8 0 1 1-3.6 0 1.8 1.8 0 0 1 3.6 0Z',
}

export function Icon({ name, className = 'h-5 w-5' }: { name: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden
      focusable="false"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={iconPaths[name]} />
    </svg>
  )
}

const confetti = [
  { x: -120, y: -90, r: 30, c: 'bg-indigo-500', s: 'h-2 w-3' },
  { x: 110, y: -100, r: -25, c: 'bg-emerald-500', s: 'h-3 w-2' },
  { x: -150, y: 10, r: 60, c: 'bg-mark-400', s: 'h-2 w-2 rounded-full' },
  { x: 150, y: 0, r: -60, c: 'bg-indigo-300', s: 'h-2 w-3' },
  { x: -80, y: -130, r: 15, c: 'bg-emerald-300', s: 'h-2 w-2 rounded-full' },
  { x: 70, y: -140, r: -15, c: 'bg-indigo-500', s: 'h-3 w-2' },
  { x: -130, y: 70, r: 45, c: 'bg-indigo-300', s: 'h-2 w-2 rounded-full' },
  { x: 130, y: 80, r: -45, c: 'bg-mark-400', s: 'h-2 w-3' },
  { x: 0, y: -150, r: 90, c: 'bg-emerald-500', s: 'h-2 w-2 rounded-full' },
  { x: -40, y: 110, r: 20, c: 'bg-indigo-500', s: 'h-2 w-2 rounded-full' },
  { x: 40, y: 120, r: -20, c: 'bg-emerald-300', s: 'h-2 w-3' },
]

/** A short, one-time burst behind the celebration card. Hidden when motion is reduced. */
export function ConfettiBurst() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
      {confetti.map((p, i) => (
        <span
          key={i}
          className={cx('confetti-piece absolute rounded-sm motion-reduce:hidden', p.c, p.s)}
          style={
            {
              '--x': `${p.x}px`,
              '--y': `${p.y}px`,
              '--r': `${p.r}deg`,
              animationDelay: `${(i % 4) * 40}ms`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
