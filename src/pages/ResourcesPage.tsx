import { useId, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { allChallenges, allLessons, resources } from '../content'
import { communityConsensus } from '../content/community'
import type { Resource, ResourceFormat, VerificationStatus } from '../content/types'
import { ResourceCard } from '../ui/ResourceBits'
import { Card, PageHeader, inputClass } from '../ui/primitives'

const formats: { id: ResourceFormat; label: string }[] = [
  { id: 'course', label: 'Course' },
  { id: 'article', label: 'Article' },
  { id: 'video', label: 'Video' },
  { id: 'documentation', label: 'Documentation' },
  { id: 'community', label: 'Community' },
  { id: 'repository', label: 'Repository' },
  { id: 'newsletter', label: 'Newsletter' },
  { id: 'podcast', label: 'Podcast' },
  { id: 'tool', label: 'Tool' },
]

const statuses: { id: VerificationStatus; label: string; meaning: string }[] = [
  {
    id: 'verified',
    label: 'Verified',
    meaning: 'The link opened and the content matched the description when it was checked.',
  },
  {
    id: 'redirected',
    label: 'Redirected',
    meaning:
      'The original address now forwards somewhere else. The link points to where the content lives now.',
  },
  {
    id: 'needs-review',
    label: 'Needs review',
    meaning:
      'Not fully confirmed: the page may need sign-in, may have changed, or could not be checked directly. Look before you rely on it.',
  },
  {
    id: 'unavailable',
    label: 'Unavailable',
    meaning: 'The content could not be reached. It stays listed so you know it was considered.',
  },
]

type Level = Resource['level']
type Ref = { href: string; label: string }

export function ResourcesPage() {
  const uid = useId()
  const [query, setQuery] = useState('')
  const [level, setLevel] = useState<Level | ''>('')
  const [format, setFormat] = useState<ResourceFormat | ''>('')
  const [freeOnly, setFreeOnly] = useState(false)
  const [status, setStatus] = useState<VerificationStatus | ''>('')

  const usedBy = useMemo(() => {
    const map = new Map<string, Ref[]>()
    const add = (id: string, ref: Ref) => {
      const list = map.get(id) ?? []
      if (!list.some((r) => r.href === ref.href)) list.push(ref)
      map.set(id, list)
    }
    for (const l of allLessons) {
      for (const r of l.resources)
        add(r.resourceId, { href: `/lessons/${l.id}`, label: `Session ${l.number}` })
    }
    for (const c of allChallenges) {
      for (const r of c.resources)
        add(r.resourceId, { href: `/challenges/${c.id}`, label: c.title })
    }
    return map
  }, [])

  const q = query.trim().toLowerCase()
  const results = resources.filter(
    (r) =>
      (!q || [r.title, r.provider, r.topic, r.summary].some((f) => f.toLowerCase().includes(q))) &&
      (!level || r.level === level) &&
      (!format || r.format === format) &&
      (!freeOnly || r.contentFree === true) &&
      (!status || r.status === status),
  )
  const filtered = q || level || format || freeOnly || status

  const reset = () => {
    setQuery('')
    setLevel('')
    setFormat('')
    setFreeOnly(false)
    setStatus('')
  }

  return (
    <>
      <PageHeader eyebrow="Resources" title="Resource catalog">
        Every external resource the course uses, with its cost, format and when the link was last
        checked. Free content is preferred throughout.
      </PageHeader>

      <Card className="mb-4">
        <h2 className="sr-only">Filters</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-1 sm:col-span-2 lg:col-span-4">
            <label htmlFor={`${uid}-q`} className="text-sm font-medium">
              Search
            </label>
            <input
              id={`${uid}-q`}
              type="search"
              className={inputClass}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Title, provider, topic or summary"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor={`${uid}-level`} className="text-sm font-medium">
              Level
            </label>
            <select
              id={`${uid}-level`}
              className={inputClass}
              value={level}
              onChange={(e) => setLevel(e.target.value as Level | '')}
            >
              <option value="">Any level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor={`${uid}-format`} className="text-sm font-medium">
              Format
            </label>
            <select
              id={`${uid}-format`}
              className={inputClass}
              value={format}
              onChange={(e) => setFormat(e.target.value as ResourceFormat | '')}
            >
              <option value="">Any format</option>
              {formats.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor={`${uid}-status`} className="text-sm font-medium">
              Link status
            </label>
            <select
              id={`${uid}-status`}
              className={inputClass}
              value={status}
              onChange={(e) => setStatus(e.target.value as VerificationStatus | '')}
            >
              <option value="">Any status</option>
              {statuses.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <label className="flex min-h-10 cursor-pointer items-center gap-2 text-sm font-medium">
              <input
                type="checkbox"
                className="h-5 w-5 accent-indigo-600"
                checked={freeOnly}
                onChange={(e) => setFreeOnly(e.target.checked)}
              />
              Free content only
            </label>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <p aria-live="polite" className="text-sm text-stone-600 dark:text-stone-400">
            Showing {results.length} of {resources.length} resources
          </p>
          {filtered && (
            <button
              type="button"
              onClick={reset}
              className="text-sm text-indigo-700 underline-offset-2 hover:underline dark:text-indigo-300"
            >
              Clear filters
            </button>
          )}
        </div>
      </Card>

      {results.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-stone-300 p-8 text-center text-sm dark:border-stone-700">
          No resources match these filters.
        </p>
      ) : (
        <ul className="space-y-3">
          {results.map((r) => {
            const refs = usedBy.get(r.id) ?? []
            return (
              <li key={r.id}>
                <ul role="presentation">
                  <ResourceCard resource={r} />
                </ul>
                <p className="mt-1 px-1 text-xs text-stone-500 dark:text-stone-400">
                  {r.topic} · {r.level} · {r.format}
                  {refs.length > 0 ? (
                    <>
                      {' '}
                      · Used in{' '}
                      {refs.map((ref, i) => (
                        <span key={ref.href}>
                          {i > 0 && ', '}
                          <Link
                            to={ref.href}
                            className="text-indigo-700 underline-offset-2 hover:underline dark:text-indigo-300"
                          >
                            {ref.label}
                          </Link>
                        </span>
                      ))}
                    </>
                  ) : (
                    ' · Not assigned to a session'
                  )}
                </p>
              </li>
            )
          })}
        </ul>
      )}

      <Card className="mt-8">
        <h2 className="mb-2 text-lg font-semibold">How links are checked</h2>
        <p className="mb-3 text-sm text-stone-700 dark:text-stone-300">
          Each status reflects a check made on the date shown next to it (the verifiedOn date).
          Sites change, so a link verified months ago may have moved since. If something is broken,
          tell your mentor and use the summary to find it.
        </p>
        <dl className="grid gap-x-4 gap-y-2 text-sm sm:grid-cols-[10rem_1fr]">
          {statuses.map((s) => (
            <div key={s.id} className="contents">
              <dt className="font-medium">{s.label}</dt>
              <dd className="text-stone-700 dark:text-stone-300">{s.meaning}</dd>
            </div>
          ))}
        </dl>
      </Card>

      <Card>
        <h2 className="mb-2 text-lg font-semibold">Sampled practitioner views</h2>
        <p className="mb-3 text-sm text-stone-700 dark:text-stone-300">
          Advice from a small sample of public threads on Hacker News and Reddit, paraphrased. This
          is community opinion from a handful of threads, not a survey and not fact. Sources marked
          "via a summary" were read through a third-party write-up, not the thread itself.
        </p>
        <ul className="space-y-4">
          {communityConsensus.map((c) => (
            <li key={c.point}>
              <p className="leading-relaxed">{c.point}</p>
              <ul className="mt-1 space-y-0.5 text-sm text-stone-600 dark:text-stone-400">
                {c.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noreferrer" className="underline">
                      {s.label}
                    </a>
                    {!s.fetchedDirectly && ' (via a summary)'}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Card>
    </>
  )
}
