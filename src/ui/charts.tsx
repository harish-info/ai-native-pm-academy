import { useState, type ReactNode } from 'react'

// Chart colors come from --viz-* CSS variables in index.css; the two-series palette was validated
// for light and dark surfaces (lightness band, chroma, CVD separation, contrast).

const S1 = 'var(--viz-series-1)'
const S2 = 'var(--viz-series-2)'

function Tooltip({ children }: { children: ReactNode }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute z-10 min-w-36 rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs shadow-lg dark:border-stone-700 dark:bg-stone-900"
    >
      {children}
    </div>
  )
}

function Swatch({ color }: { color: string }) {
  return (
    <span
      aria-hidden
      className="inline-block h-2.5 w-2.5 rounded-sm"
      style={{ background: color }}
    />
  )
}

function TableView({
  caption,
  head,
  rows,
}: {
  caption: string
  head: string[]
  rows: (string | number)[][]
}) {
  return (
    <details className="mt-3 text-sm">
      <summary className="cursor-pointer text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100">
        View as table
      </summary>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-stone-200 dark:border-stone-800">
              {head.map((h) => (
                <th key={h} scope="col" className="py-1.5 pr-4 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-stone-100 dark:border-stone-800/60">
                {r.map((c, j) =>
                  j === 0 ? (
                    <th key={j} scope="row" className="py-1.5 pr-4 font-normal">
                      {c}
                    </th>
                  ) : (
                    <td key={j} className="py-1.5 pr-4 tabular-nums">
                      {c}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  )
}

export interface PairedRow {
  label: string
  a: number | null
  b: number
}

/** Horizontal paired bars on a 0..100 scale: series A (baseline) vs series B (evidence). */
export function PairedBars({
  title,
  rows,
  aLabel,
  bLabel,
  description,
}: {
  title: string
  rows: PairedRow[]
  aLabel: string
  bLabel: string
  description?: string
}) {
  const [active, setActive] = useState<number | null>(null)
  const fmt = (v: number | null) => (v === null ? 'n/a' : `${v}%`)
  return (
    <figure className="m-0">
      <figcaption className="mb-1 font-semibold">{title}</figcaption>
      {description && (
        <p className="mb-3 text-sm text-stone-600 dark:text-stone-400">{description}</p>
      )}
      <div
        className="mb-3 flex flex-wrap gap-4 text-xs text-stone-600 dark:text-stone-400"
        aria-hidden
      >
        <span className="inline-flex items-center gap-1.5">
          <Swatch color={S1} /> {aLabel}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Swatch color={S2} /> {bLabel}
        </span>
      </div>
      <div className="relative" onMouseLeave={() => setActive(null)}>
        <div
          className="pointer-events-none absolute inset-y-0 right-0 left-[38%] sm:left-[30%]"
          aria-hidden
        >
          {[0, 25, 50, 75, 100].map((t) => (
            <div
              key={t}
              className="absolute inset-y-0 border-l"
              style={{ left: `${t}%`, borderColor: 'var(--viz-grid)' }}
            />
          ))}
        </div>
        <ul className="relative space-y-1">
          {rows.map((r, i) => (
            <li
              key={r.label}
              tabIndex={0}
              aria-label={`${r.label}: ${aLabel} ${fmt(r.a)}, ${bLabel} ${fmt(r.b)}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className="relative grid grid-cols-[38%_1fr] items-center rounded-md py-1 sm:grid-cols-[30%_1fr] hover:bg-stone-100/60 focus-visible:bg-stone-100/60 dark:hover:bg-stone-800/40 dark:focus-visible:bg-stone-800/40"
            >
              <span className="truncate pr-3 text-sm text-stone-700 dark:text-stone-300">
                {r.label}
              </span>
              <span className="flex flex-col gap-[2px]">
                <span
                  className="block h-2.5 rounded-r"
                  style={{
                    width: `${Math.max(r.a ?? 0, 0.5)}%`,
                    background: S1,
                    opacity: r.a === null ? 0.25 : 1,
                  }}
                />
                <span
                  className="block h-2.5 rounded-r"
                  style={{ width: `${Math.max(r.b, 0.5)}%`, background: S2 }}
                />
              </span>
              {active === i && (
                <div className="absolute top-full right-0 z-10">
                  <Tooltip>
                    <div className="mb-1 font-medium text-stone-900 dark:text-stone-100">
                      {r.label}
                    </div>
                    <div className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300">
                      <Swatch color={S1} /> {aLabel}:{' '}
                      <span className="ml-auto tabular-nums">{fmt(r.a)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300">
                      <Swatch color={S2} /> {bLabel}:{' '}
                      <span className="ml-auto tabular-nums">{fmt(r.b)}</span>
                    </div>
                  </Tooltip>
                </div>
              )}
            </li>
          ))}
        </ul>
        <div
          className="mt-1 grid grid-cols-[38%_1fr] text-[11px] text-stone-500 sm:grid-cols-[30%_1fr] dark:text-stone-400"
          aria-hidden
        >
          <span />
          <span className="flex justify-between tabular-nums">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </span>
        </div>
      </div>
      <TableView
        caption={title}
        head={['Competency', aLabel, bLabel]}
        rows={rows.map((r) => [r.label, fmt(r.a), fmt(r.b)])}
      />
    </figure>
  )
}

export interface ColumnPoint {
  label: string
  value: number
  detail?: string
}

/** Single-series vertical bars, with an optional reference line (e.g. the 80% pass mark). */
export function Columns({
  title,
  points,
  format,
  max,
  reference,
  unitLabel,
  description,
}: {
  title: string
  points: ColumnPoint[]
  format: (v: number) => string
  max?: number
  reference?: { value: number; label: string }
  unitLabel: string
  description?: string
}) {
  const [active, setActive] = useState<number | null>(null)
  const top = Math.max(max ?? 0, ...points.map((p) => p.value), reference?.value ?? 0, 1)
  const ticks = [...new Set([0, 0.5, 1].map((f) => Math.round(top * f)))]
  return (
    <figure className="m-0">
      <figcaption className="mb-1 font-semibold">{title}</figcaption>
      {description && (
        <p className="mb-3 text-sm text-stone-600 dark:text-stone-400">{description}</p>
      )}
      <div className="flex gap-2 pt-2">
        <div
          className="relative h-44 w-10 shrink-0 text-right text-[11px] text-stone-500 tabular-nums dark:text-stone-400"
          aria-hidden
        >
          {ticks.map((t) => (
            <span
              key={t}
              className="absolute right-0 translate-y-1/2"
              style={{ bottom: `${(t / top) * 100}%` }}
            >
              {format(t)}
            </span>
          ))}
        </div>
        <div className="relative h-44 flex-1" onMouseLeave={() => setActive(null)}>
          {ticks.map((t) => (
            <div
              key={t}
              aria-hidden
              className="absolute inset-x-0 border-t"
              style={{ bottom: `${(t / top) * 100}%`, borderColor: 'var(--viz-grid)' }}
            />
          ))}
          {reference && (
            <div
              aria-hidden
              className="absolute inset-x-0 border-t-2 border-dashed border-stone-500 dark:border-stone-400"
              style={{ bottom: `${(reference.value / top) * 100}%` }}
            >
              <span className="absolute -top-5 right-0 rounded bg-white/80 px-1 text-[11px] text-stone-700 dark:bg-stone-900/80 dark:text-stone-300">
                {reference.label}
              </span>
            </div>
          )}
          <ul className="absolute inset-0 flex items-end gap-[2px]">
            {points.map((p, i) => (
              <li
                key={p.label}
                tabIndex={0}
                aria-label={`${p.label}: ${format(p.value)}${p.detail ? `, ${p.detail}` : ''}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="relative flex h-full flex-1 items-end justify-center rounded-md hover:bg-stone-100/60 focus-visible:bg-stone-100/60 dark:hover:bg-stone-800/40 dark:focus-visible:bg-stone-800/40"
              >
                <span
                  className="block w-full max-w-7 rounded-t"
                  style={{
                    height: `${Math.max((p.value / top) * 100, p.value > 0 ? 1.5 : 0)}%`,
                    background: S1,
                  }}
                />
                {active === i && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2">
                    <Tooltip>
                      <div className="font-medium text-stone-900 dark:text-stone-100">
                        {p.label}
                      </div>
                      <div className="text-stone-700 dark:text-stone-300">
                        {unitLabel}: <span className="tabular-nums">{format(p.value)}</span>
                      </div>
                      {p.detail && (
                        <div className="text-stone-500 dark:text-stone-400">{p.detail}</div>
                      )}
                    </Tooltip>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className="ml-12 flex gap-[2px] text-[11px] text-stone-500 dark:text-stone-400"
        aria-hidden
      >
        {points.map((p, i) => (
          <span
            key={p.label}
            className={
              // On narrow screens, label every other column and let it overflow into the gap.
              points.length > 6
                ? `flex-1 text-center whitespace-nowrap sm:truncate ${i % 2 ? 'invisible sm:visible' : ''}`
                : 'flex-1 truncate text-center'
            }
          >
            {p.label}
          </span>
        ))}
      </div>
      <TableView
        caption={title}
        head={['', unitLabel, ...(points.some((p) => p.detail) ? ['Detail'] : [])]}
        rows={points.map((p) => [
          p.label,
          format(p.value),
          ...(points.some((x) => x.detail) ? [p.detail ?? ''] : []),
        ])}
      />
    </figure>
  )
}

export interface MeterRow {
  label: string
  value: number
  marker: number | null
}

/**
 * One bar per row on a 0..100 scale, with an optional tick for a reference value. Used for skills:
 * the bar is coursework evidence, the tick is the diagnostic baseline. One series, so no clutter.
 */
export function Meters({
  title,
  rows,
  valueLabel,
  markerLabel,
  description,
}: {
  title: string
  rows: MeterRow[]
  valueLabel: string
  markerLabel: string
  description?: string
}) {
  const fmt = (v: number | null) => (v === null ? 'n/a' : `${v}%`)
  const hasMarker = rows.some((r) => r.marker !== null)
  return (
    <figure className="m-0">
      <figcaption className="mb-1 font-semibold">{title}</figcaption>
      {description && (
        <p className="mb-3 text-sm text-stone-600 dark:text-stone-400">{description}</p>
      )}
      <div
        className="mb-3 flex flex-wrap gap-4 text-xs text-stone-600 dark:text-stone-400"
        aria-hidden
      >
        <span className="inline-flex items-center gap-1.5">
          <Swatch color={S1} /> {valueLabel}
        </span>
        {hasMarker && (
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-3 w-0.5 rounded bg-stone-900 dark:bg-stone-100" />{' '}
            {markerLabel}
          </span>
        )}
      </div>
      <ul className="space-y-3">
        {rows.map((r) => (
          <li
            key={r.label}
            aria-label={`${r.label}: ${valueLabel} ${fmt(r.value)}${hasMarker ? `, ${markerLabel} ${fmt(r.marker)}` : ''}`}
            className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 sm:grid-cols-[30%_1fr_3rem]"
          >
            <span className="truncate text-sm text-stone-700 dark:text-stone-300" aria-hidden>
              {r.label}
            </span>
            <span
              className="text-right text-sm font-semibold tabular-nums sm:order-last"
              aria-hidden
            >
              {r.value}%
            </span>
            <span
              aria-hidden
              className="relative col-span-2 block h-3 rounded-full bg-stone-200 sm:col-span-1 dark:bg-stone-800"
            >
              <span
                className="bar-grow absolute inset-y-0 left-0 rounded-full"
                style={{ width: `${Math.max(r.value, 0)}%`, background: S1 }}
              />
              {r.marker !== null && (
                <span
                  className="absolute -top-1 -bottom-1 w-0.5 -translate-x-1/2 rounded bg-stone-900 ring-2 ring-white dark:bg-stone-100 dark:ring-stone-900"
                  style={{ left: `${Math.min(100, Math.max(r.marker, 0))}%` }}
                />
              )}
            </span>
          </li>
        ))}
      </ul>
      <TableView
        caption={title}
        head={['Competency', valueLabel, ...(hasMarker ? [markerLabel] : [])]}
        rows={rows.map((r) => [r.label, fmt(r.value), ...(hasMarker ? [fmt(r.marker)] : [])])}
      />
    </figure>
  )
}
