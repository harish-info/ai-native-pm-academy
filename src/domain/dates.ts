/** Local calendar day as YYYY-MM-DD. */
export function toDay(d: Date | string): string {
  const date = typeof d === 'string' ? new Date(d) : d
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function addDays(day: string, n: number): string {
  const [y, m, d] = day.split('-').map(Number) as [number, number, number]
  const date = new Date(y, m - 1, d)
  date.setDate(date.getDate() + n)
  return toDay(date)
}

/** Monday of the week containing `day`. */
export function weekStart(day: string): string {
  const [y, m, d] = day.split('-').map(Number) as [number, number, number]
  const date = new Date(y, m - 1, d)
  const offset = (date.getDay() + 6) % 7
  return addDays(day, -offset)
}

export function formatMinutes(total: number): string {
  if (total < 60) return `${total} min`
  const h = Math.floor(total / 60)
  const m = total % 60
  return m ? `${h} h ${m} min` : `${h} h`
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
