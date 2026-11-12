import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { challengeById, lessonById } from '../content'
import { glossaryCategories, glossaryEntries, type GlossaryCategory } from '../content/glossary'
import { inline } from '../ui/RichText'
import { Card, PageHeader, Pill, cx, linkClass } from '../ui/primitives'

export function GlossaryPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<'All' | GlossaryCategory>('All')

  const needle = query.trim().toLowerCase()
  const filtered = glossaryEntries.filter((entry) => {
    if (category !== 'All' && entry.category !== category) return false
    if (!needle) return true
    return (
      entry.term.toLowerCase().includes(needle) ||
      entry.meaning.toLowerCase().includes(needle) ||
      entry.dayToDay.toLowerCase().includes(needle) ||
      entry.category.toLowerCase().includes(needle)
    )
  })

  const grouped = glossaryCategories
    .map((cat) => ({
      category: cat,
      entries: filtered.filter((e) => e.category === cat),
    }))
    .filter((g) => g.entries.length > 0)

  return (
    <>
      <PageHeader eyebrow="Plain-English reference" title="AI jargon, translated">
        AI teams throw around a lot of shorthand. Every term below gets one plain sentence on what
        it actually means and one sentence on how it shows up in day-to-day PM work.
      </PageHeader>

      <div className="space-y-6">
        <Card>
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div>
              <label htmlFor="jargon-search" className="block text-sm font-semibold">
                Filter terms
              </label>
              <input
                id="jargon-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try vibe coding, RAG, pass^k, diff, MCP, hallucination..."
                className="mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-indigo-500 focus:outline-2 focus:outline-offset-0 focus:outline-indigo-500 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:placeholder:text-stone-500"
              />
            </div>
            <p
              aria-live="polite"
              className="text-xs font-medium text-stone-600 tabular-nums dark:text-stone-400"
            >
              Showing {filtered.length} of {glossaryEntries.length} terms
            </p>
          </div>

          <div role="group" aria-label="Filter by category" className="mt-4 flex flex-wrap gap-2">
            {(['All', ...glossaryCategories] as const).map((cat) => {
              const active = category === cat
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategory(cat)}
                  className={cx(
                    'cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                    active
                      ? 'border-indigo-600 bg-indigo-600 text-white dark:border-indigo-400 dark:bg-indigo-400 dark:text-stone-950'
                      : 'border-stone-300 bg-white text-stone-700 hover:border-indigo-400 hover:text-stone-950 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-300 dark:hover:border-indigo-400 dark:hover:text-white',
                  )}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </Card>

        {grouped.length === 0 ? (
          <Card>
            <p className="text-sm text-stone-700 dark:text-stone-300">
              No terms matched <strong>{query}</strong>. Clear the search or switch back to{' '}
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setCategory('All')
                }}
                className={`cursor-pointer font-medium ${linkClass}`}
              >
                All categories
              </button>
              .
            </p>
          </Card>
        ) : (
          grouped.map((group) => (
            <section
              key={group.category}
              aria-labelledby={`cat-${group.category}`}
              className="space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <h2 id={`cat-${group.category}`} className="text-lg font-semibold tracking-tight">
                  {group.category}
                </h2>
                <Pill tone="neutral">{group.entries.length}</Pill>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {group.entries.map((entry) => (
                  <Card
                    key={entry.id}
                    as="article"
                    id={`term-${entry.id}`}
                    className="flex flex-col"
                  >
                    <h3 className="text-base font-semibold tracking-tight">{entry.term}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-stone-800 dark:text-stone-200">
                      {inline(entry.meaning)}
                    </p>
                    <p className="mt-2.5 rounded-xl bg-stone-100 px-3.5 py-2.5 text-sm leading-relaxed text-stone-700 dark:bg-stone-800/70 dark:text-stone-300">
                      <strong className="text-stone-900 dark:text-stone-100">
                        In day-to-day work:{' '}
                      </strong>
                      {inline(entry.dayToDay)}
                    </p>
                    <p className="mt-auto pt-3 text-xs text-stone-600 dark:text-stone-400">
                      Used in:{' '}
                      {entry.lessons.map((id, i) => {
                        const lesson = lessonById(id)
                        if (!lesson) return null
                        return (
                          <Fragment key={id}>
                            {i > 0 && ' · '}
                            <Link to={`/lessons/${id}`} className={linkClass}>
                              Session {lesson.number}: {lesson.title}
                            </Link>
                          </Fragment>
                        )
                      })}
                      {entry.challenges?.map((cid) => {
                        const ch = challengeById(cid)
                        if (!ch) return null
                        return (
                          <Fragment key={cid}>
                            {' · '}
                            <Link to={`/challenges/${cid}`} className={linkClass}>
                              Challenge: {ch.title}
                            </Link>
                          </Fragment>
                        )
                      })}
                    </p>
                  </Card>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </>
  )
}
