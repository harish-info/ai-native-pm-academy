import type { ComponentProps, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

export const cx = (...xs: (string | false | null | undefined)[]) => xs.filter(Boolean).join(' ')

export function Card({
  children,
  className,
  as: Tag = 'section',
  ...rest
}: {
  children: ReactNode
  className?: string
  as?: 'section' | 'div' | 'article' | 'li'
} & Record<string, unknown>) {
  return (
    <Tag
      className={cx(
        'rounded-2xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900',
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
    'bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-300 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:disabled:bg-indigo-900',
  secondary:
    'border border-stone-300 bg-white text-stone-800 hover:bg-stone-100 disabled:text-stone-400 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:hover:bg-stone-800',
  ghost: 'text-stone-700 hover:bg-stone-100 dark:text-stone-200 dark:hover:bg-stone-800',
  danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300',
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed min-h-10'

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
  indigo: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',
  green: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
  amber: 'bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
  red: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300',
  blue: 'bg-sky-50 text-sky-800 dark:bg-sky-950 dark:text-sky-300',
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
        className="h-full rounded-full bg-indigo-600 transition-[width] dark:bg-indigo-400"
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
}: {
  value: number
  max?: number
  size?: number
  label: string
}) {
  const pct = max > 0 ? Math.min(1, value / max) : 0
  const stroke = 8
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
          className="stroke-indigo-600 transition-[stroke-dashoffset] dark:stroke-indigo-400"
        />
      </svg>
      <span className="absolute text-lg font-semibold tabular-nums" aria-hidden>
        {Math.round(pct * 100)}%
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
          <p className="mb-1 text-sm font-medium text-indigo-700 dark:text-indigo-300">{eyebrow}</p>
        )}
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
        {children && <div className="mt-2 text-stone-600 dark:text-stone-400">{children}</div>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </header>
  )
}

export function Stat({ label, value, hint }: { label: string; value: ReactNode; hint?: string }) {
  return (
    <div className="rounded-xl border border-stone-200 p-4 dark:border-stone-800">
      <div className="text-sm text-stone-600 dark:text-stone-400">{label}</div>
      <div className="mt-1 text-2xl font-semibold tabular-nums">{value}</div>
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
  'w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm placeholder:text-stone-400 dark:border-stone-700 dark:bg-stone-950'

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
