import type { ComponentProps, CSSProperties, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { EmptyArt } from './art'
import { cx } from './cx'

export { cx }

/** Inline text link: always underlined so it reads as clickable without hovering. */
export const linkClass =
  'font-medium text-indigo-700 underline decoration-indigo-300 decoration-[1.5px] underline-offset-[3px] transition-colors hover:text-indigo-900 hover:decoration-indigo-700 dark:text-indigo-300 dark:decoration-indigo-700 dark:hover:text-indigo-200 dark:hover:decoration-indigo-300'

/**
 * A card that is one big link. Put `stretchedLink` on the card's main link (usually its title):
 * its overlay covers the whole card, so anywhere on the card opens it. Clickable cards have a
 * firmer border and a bottom shadow; static cards are flat, so the two never look alike. Other
 * controls inside the card need `relative z-10`.
 */
export const interactiveCard =
  'group relative cursor-pointer border border-stone-300 bg-white shadow-[0_1px_0_var(--n-300)] transition-[border-color,box-shadow,transform] duration-200 hover:border-indigo-400 hover:shadow-[0_6px_18px_-8px_rgb(0_0_0/0.22)] motion-safe:hover:-translate-y-0.5 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-indigo-500 dark:border-stone-700 dark:bg-stone-900 dark:shadow-[0_1px_0_var(--n-700)] dark:hover:border-indigo-500'

/** A card that only holds information: flat, no shadow, never mistaken for a button. */
export const staticTile = 'border border-transparent bg-stone-100 dark:bg-stone-800/50'

export const stretchedLink =
  "font-semibold text-stone-900 transition-colors after:absolute after:inset-0 after:rounded-[inherit] after:content-[''] group-hover:text-indigo-700 focus-visible:outline-none dark:text-stone-50 dark:group-hover:text-indigo-300"

/** The arrow that tells a card or row it goes somewhere. */
export function Chevron({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cx(
        'h-5 w-5 shrink-0 text-indigo-600 transition-transform duration-200 group-hover:text-indigo-800 motion-safe:group-hover:translate-x-0.5 dark:text-indigo-300 dark:group-hover:text-indigo-200',
        className,
      )}
    >
      <path d="M7.5 4.5 13 10l-5.5 5.5" />
    </svg>
  )
}

export function Card({
  children,
  className,
  as: Tag = 'section',
  interactive,
  ...rest
}: {
  children: ReactNode
  className?: string
  as?: 'section' | 'div' | 'article' | 'li'
  interactive?: boolean
} & Record<string, unknown>) {
  return (
    <Tag
      className={cx(
        'rounded-2xl p-5',
        interactive
          ? interactiveCard
          : 'border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'

const variants: Record<Variant, string> = {
  primary:
    'bg-indigo-600 text-white shadow-[0_1px_0_rgb(0_0_0/0.12)] hover:bg-indigo-700 disabled:bg-stone-200 disabled:text-stone-500 disabled:shadow-none disabled:hover:bg-stone-200 dark:bg-indigo-400 dark:text-stone-950 dark:hover:bg-indigo-300 dark:disabled:bg-stone-800 dark:disabled:text-stone-500 dark:disabled:hover:bg-stone-800',
  secondary:
    'border border-indigo-200 bg-white text-indigo-800 hover:border-indigo-400 hover:bg-indigo-50 disabled:border-stone-200 disabled:bg-stone-100 disabled:text-stone-500 disabled:hover:border-stone-200 disabled:hover:bg-stone-100 dark:disabled:border-stone-800 dark:disabled:bg-stone-900 dark:disabled:text-stone-500 dark:border-indigo-800 dark:bg-stone-900 dark:text-indigo-200 dark:hover:border-indigo-500 dark:hover:bg-indigo-950',
  ghost: 'text-indigo-800 hover:bg-indigo-50 dark:text-indigo-200 dark:hover:bg-indigo-950',
  danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300',
}

const base =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-[background-color,border-color,color,transform] duration-150 motion-safe:active:scale-[0.97] disabled:cursor-not-allowed disabled:active:scale-100 min-h-10'

export function Button({
  variant = 'primary',
  className,
  ...rest
}: ComponentProps<'button'> & { variant?: Variant }) {
  return <button type="button" className={cx(base, variants[variant], className)} {...rest} />
}

export function LinkButton({
  variant = 'primary',
  className,
  ...rest
}: LinkProps & { variant?: Variant }) {
  return <Link className={cx(base, variants[variant], className)} {...rest} />
}

type Tone = 'neutral' | 'indigo' | 'green' | 'amber' | 'red' | 'blue'

const tones: Record<Tone, string> = {
  neutral: 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300',
  // Pills are labels, never links, so they stay out of the accent color that marks clickable things.
  indigo:
    'bg-white text-stone-800 ring-1 ring-stone-300 ring-inset dark:bg-stone-900 dark:text-stone-200 dark:ring-stone-700',
  green: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
  amber: 'bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
  red: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300',
  blue: 'bg-stone-200/70 text-stone-700 dark:bg-stone-800 dark:text-stone-300',
}

export function Pill({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode
  tone?: Tone
  className?: string
}) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function ProgressBar({
  value,
  max = 100,
  label,
}: {
  value: number
  max?: number
  label: string
}) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={`${pct}%`}
      className="h-2 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800"
    >
      <div
        className="bar-grow h-full rounded-full bg-indigo-600 transition-[width] dark:bg-indigo-400"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

export function ProgressRing({
  value,
  max = 100,
  size = 96,
  label,
  center,
  complete,
  stroke = 8,
}: {
  value: number
  max?: number
  size?: number
  label: string
  /** Replaces the percentage in the middle of the ring. */
  center?: ReactNode
  /** Draws the ring in the success color. */
  complete?: boolean
  stroke?: number
}) {
  const pct = max > 0 ? Math.min(1, value / max) : 0
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} role="img" aria-label={`${label}: ${Math.round(pct * 100)}%`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          className="stroke-stone-200 dark:stroke-stone-800"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ '--ring-c': c } as CSSProperties}
          className={cx(
            'ring-draw transition-[stroke-dashoffset]',
            complete
              ? 'stroke-emerald-500 dark:stroke-emerald-400'
              : 'stroke-indigo-600 dark:stroke-indigo-400',
          )}
        />
      </svg>
      <span className="absolute text-center" aria-hidden>
        {center ?? (
          <span className="text-lg font-semibold tabular-nums">{Math.round(pct * 100)}%</span>
        )}
      </span>
    </div>
  )
}

export function PageHeader({
  eyebrow,
  title,
  children,
  actions,
}: {
  eyebrow?: string
  title: string
  children?: ReactNode
  actions?: ReactNode
}) {
  return (
    <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        {eyebrow && (
          <p className="mb-2 font-mono text-xs font-medium tracking-[0.14em] text-stone-600 uppercase dark:text-stone-400">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">{title}</h1>
        {children && <div className="mt-2 text-stone-600 dark:text-stone-400">{children}</div>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </header>
  )
}

export function Stat({ label, value, hint }: { label: string; value: ReactNode; hint?: string }) {
  return (
    <div className={cx(staticTile, 'rounded-xl p-4')}>
      <div className="font-mono text-[0.7rem] font-medium tracking-[0.12em] text-stone-600 uppercase dark:text-stone-400">
        {label}
      </div>
      <div className="mt-1.5 text-2xl font-bold tabular-nums">{value}</div>
      {hint && <div className="mt-1 text-xs text-stone-500 dark:text-stone-400">{hint}</div>}
    </div>
  )
}

export function EmptyState({
  title,
  children,
  action,
}: {
  title: string
  children?: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="rounded-2xl border border-dashed border-stone-300 p-8 text-center dark:border-stone-700">
      <EmptyArt className="mx-auto mb-3 h-16 w-16" />
      <p className="font-medium">{title}</p>
      {children && (
        <div className="mt-1 text-sm text-stone-600 dark:text-stone-400">{children}</div>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

export function Field({
  label,
  hint,
  children,
  htmlFor,
}: {
  label: string
  hint?: string
  children: ReactNode
  htmlFor: string
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-stone-500 dark:text-stone-400">{hint}</p>}
    </div>
  )
}

export const inputClass =
  'w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm placeholder:text-stone-500 dark:border-stone-700 dark:bg-stone-950'

export function LockIcon() {
  return (
    <svg aria-hidden viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
      <path d="M10 2a4 4 0 0 0-4 4v2H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-1V6a4 4 0 0 0-4-4Zm-2 6V6a2 2 0 1 1 4 0v2H8Z" />
    </svg>
  )
}

export function CheckIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" className={className} fill="currentColor">
      <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z" />
    </svg>
  )
}
