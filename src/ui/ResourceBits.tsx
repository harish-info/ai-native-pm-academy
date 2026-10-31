import { resourceById } from '../content'
import type { Resource, ResourceRef, VerificationStatus } from '../content/types'
import { formatDate } from '../domain/dates'
import { useStore } from '../state/store'
import { Button, Pill, linkClass } from './primitives'

const statusTone: Record<VerificationStatus, 'green' | 'blue' | 'amber' | 'red'> = {
  verified: 'green',
  redirected: 'blue',
  'needs-review': 'amber',
  unavailable: 'red',
}

const statusLabel: Record<VerificationStatus, string> = {
  verified: 'Verified',
  redirected: 'Redirected',
  'needs-review': 'Needs review',
  unavailable: 'Unavailable',
}

export function StatusPill({ resource }: { resource: Resource }) {
  return (
    <Pill tone={statusTone[resource.status]}>
      {statusLabel[resource.status]}
      {resource.verifiedOn && resource.status !== 'needs-review'
        ? ` ${formatDate(resource.verifiedOn)}`
        : ''}
    </Pill>
  )
}

export function costLabel(r: Resource): string {
  const content =
    r.contentFree === true ? 'Free' : r.contentFree === 'partial' ? 'Partly free' : 'Paid'
  return [content, r.signInRequired ? 'sign-in required' : null].filter(Boolean).join(', ')
}

export function BookmarkButton({ id, label }: { id: string; label: string }) {
  const { data, update } = useStore()
  const on = data.bookmarks.includes(id)
  return (
    <Button
      variant="secondary"
      className="min-h-8 gap-1.5 px-2.5 py-1 text-xs"
      aria-pressed={on}
      aria-label={`${on ? 'Bookmarked' : 'Bookmark'}: ${label}`}
      onClick={() =>
        update((d) => {
          d.bookmarks = on ? d.bookmarks.filter((b) => b !== id) : [...d.bookmarks, id]
        })
      }
    >
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        className="h-3.5 w-3.5"
        strokeWidth={1.8}
        stroke="currentColor"
        fill={on ? 'currentColor' : 'none'}
        strokeLinejoin="round"
      >
        <path d="M5.5 3.5h9v13L10 13l-4.5 3.5Z" />
      </svg>
      {on ? 'Bookmarked' : 'Bookmark'}
    </Button>
  )
}

export function ResourceCard({
  resource,
  why,
  required,
  minutes,
}: {
  resource: Resource
  why?: string
  required?: boolean
  minutes?: number
}) {
  return (
    <li className="rounded-xl border border-stone-200 p-4 dark:border-stone-800">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <a href={resource.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {resource.title}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <div className="text-sm text-stone-600 dark:text-stone-400">
            {resource.provider}
            {minutes ? ` · Assigned excerpt: about ${minutes} min` : ''}
            {resource.estimatedTime ? ` · Full resource: ${resource.estimatedTime}` : ''} ·{' '}
            {costLabel(resource)}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {required !== undefined && (
            <Pill tone={required ? 'indigo' : 'neutral'}>
              {required ? 'Core excerpt' : 'Further study'}
            </Pill>
          )}
          <StatusPill resource={resource} />
          <BookmarkButton id={resource.id} label={resource.title} />
        </div>
      </div>
      {why && <p className="mt-2 text-sm">{why}</p>}
      {!why && (
        <p className="mt-2 text-sm text-stone-700 dark:text-stone-300">{resource.summary}</p>
      )}
      {resource.practicalCost && resource.practicalCost !== 'Free' && (
        <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
          Practical cost: {resource.practicalCost}
        </p>
      )}
    </li>
  )
}

export function ResourceRefs({
  refs,
  collapseOptional = false,
}: {
  refs: ResourceRef[]
  collapseOptional?: boolean
}) {
  const items = refs
    .map((ref) => ({ ref, resource: resourceById(ref.resourceId) }))
    .filter((x) => x.resource)
  const core = items.filter((x) => x.ref.required)
  const optional = items.filter((x) => !x.ref.required)
  const render = (list: typeof items) => (
    <ul className="space-y-3">
      {list.map(({ ref, resource }) => (
        <ResourceCard
          key={ref.resourceId}
          resource={resource!}
          why={ref.why}
          required={ref.required}
          minutes={ref.minutes}
        />
      ))}
    </ul>
  )
  return (
    <div className="space-y-4">
      {render(core)}
      {optional.length > 0 &&
        (collapseOptional ? (
          <details className="rounded-xl border border-stone-200 p-4 dark:border-stone-700">
            <summary className="cursor-pointer text-sm font-medium">
              Further study ({optional.length})
            </summary>
            <div className="mt-4">{render(optional)}</div>
          </details>
        ) : (
          render(optional)
        ))}
    </div>
  )
}
