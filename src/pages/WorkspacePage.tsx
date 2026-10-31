import { useId, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { allChallenges, allLessons, lessonById, resourceById } from '../content'
import { formatDate } from '../domain/dates'
import type { Note } from '../storage/schema'
import { newId, useStore } from '../state/store'
import {
  Button,
  Card,
  CheckIcon,
  EmptyState,
  Field,
  PageHeader,
  Pill,
  cx,
  inputClass,
  linkClass,
} from '../ui/primitives'

type Tab = 'notes' | 'reflections' | 'goals' | 'bookmarks'

const tabs: { id: Tab; label: string }[] = [
  { id: 'notes', label: 'Notes' },
  { id: 'reflections', label: 'Reflections' },
  { id: 'goals', label: 'Goals' },
  { id: 'bookmarks', label: 'Bookmarks' },
]

type NoteKind = 'note' | 'weekly' | 'project'

const kindLabel: Record<Note['kind'], string> = {
  note: 'Note',
  weekly: 'Weekly reflection',
  project: 'Project note',
  reflection: 'Reflection',
}

interface Draft {
  id: string | null
  kind: NoteKind
  title: string
  body: string
  tags: string
}

const emptyDraft = (): Draft => ({ id: null, kind: 'note', title: '', body: '', tags: '' })

const weeklyTemplate = `## Wins

## Stuck

## Learned

## Next week

## Wiki pages added
`

const matches = (q: string, ...fields: (string | undefined)[]) =>
  !q || fields.some((f) => f?.toLowerCase().includes(q))

interface ReflectionItem {
  id: string
  href: string
  title: string
  reflection: string
  at?: string
  kind: 'Session' | 'Challenge'
}

export function WorkspacePage() {
  const { data, update } = useStore()
  const [tab, setTab] = useState<Tab>('notes')
  const [query, setQuery] = useState('')
  const [draft, setDraft] = useState<Draft | null>(null)
  const [goalText, setGoalText] = useState('')
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const uid = useId()
  const q = query.trim().toLowerCase()

  const reflections = useMemo<ReflectionItem[]>(() => {
    const out: ReflectionItem[] = []
    for (const l of allLessons) {
      const r = data.lessons[l.id]
      if (r?.reflection.trim()) {
        out.push({
          id: l.id,
          href: `/lessons/${l.id}`,
          title: `Session ${l.number}: ${l.title}`,
          reflection: r.reflection,
          at: r.completedAt ?? r.startedAt,
          kind: 'Session',
        })
      }
    }
    for (const c of allChallenges) {
      const r = data.challenges[c.id]
      if (r?.reflection.trim()) {
        out.push({
          id: c.id,
          href: `/challenges/${c.id}`,
          title: c.title,
          reflection: r.reflection,
          at: r.completedAt ?? r.startedAt,
          kind: 'Challenge',
        })
      }
    }
    return out.sort((a, b) => (b.at ?? '').localeCompare(a.at ?? ''))
  }, [data.lessons, data.challenges])

  const notes = useMemo(
    () =>
      [...data.notes]
        .filter((n) => matches(q, n.title, n.body, n.tags.join(' ')))
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
    [data.notes, q],
  )
  const filteredReflections = reflections.filter((r) => matches(q, r.title, r.reflection))

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number
    if (e.key === 'ArrowRight') next = (index + 1) % tabs.length
    else if (e.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = tabs.length - 1
    else return
    e.preventDefault()
    setTab(tabs[next]!.id)
    tabRefs.current[next]?.focus()
  }

  const saveDraft = () => {
    if (!draft || !draft.title.trim()) return
    const tags = draft.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 30)
    const now = new Date().toISOString()
    update((d) => {
      const existing = draft.id ? d.notes.find((n) => n.id === draft.id) : undefined
      if (existing) {
        existing.kind = draft.kind
        existing.title = draft.title.trim()
        existing.body = draft.body
        existing.tags = tags
        existing.updatedAt = now
      } else {
        d.notes.push({
          id: newId(),
          kind: draft.kind,
          title: draft.title.trim(),
          body: draft.body,
          tags,
          createdAt: now,
          updatedAt: now,
        })
      }
    })
    setDraft(null)
  }

  const deleteNote = (note: Note) => {
    if (!window.confirm(`Delete "${note.title}"? This cannot be undone.`)) return
    update((d) => {
      d.notes = d.notes.filter((n) => n.id !== note.id)
    })
    if (draft?.id === note.id) setDraft(null)
  }

  const addGoal = () => {
    const text = goalText.trim()
    if (!text) return
    update((d) => {
      d.goals.push({
        id: newId(),
        text: text.slice(0, 500),
        done: false,
        createdAt: new Date().toISOString(),
      })
    })
    setGoalText('')
  }

  return (
    <>
      <PageHeader eyebrow="Workspace" title="Notes, reflections and goals">
        Everything here stays in this browser. Keep the substance in your private wiki; use this
        space for quick notes, weekly reflections and goals.
      </PageHeader>

      <div className="mb-4 flex flex-col gap-1">
        <label htmlFor={`${uid}-search`} className="text-sm font-medium">
          Search notes and reflections
        </label>
        <input
          id={`${uid}-search`}
          type="search"
          className={cx(inputClass, 'max-w-md')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search titles, text and tags"
        />
        {q && (
          <p className="text-xs text-stone-500 dark:text-stone-400" aria-live="polite">
            {notes.length} {notes.length === 1 ? 'note' : 'notes'} and {filteredReflections.length}{' '}
            {filteredReflections.length === 1 ? 'reflection' : 'reflections'} match.
          </p>
        )}
      </div>

      <div
        role="tablist"
        aria-label="Workspace sections"
        className="mb-5 flex flex-wrap gap-1 border-b border-stone-200 dark:border-stone-800"
      >
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              tabRefs.current[i] = el
            }}
            type="button"
            role="tab"
            id={`${uid}-tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`${uid}-panel-${t.id}`}
            tabIndex={tab === t.id ? 0 : -1}
            onClick={() => setTab(t.id)}
            onKeyDown={(e) => onTabKey(e, i)}
            className={cx(
              '-mb-px border-b-2 px-4 py-2 text-sm font-medium',
              tab === t.id
                ? 'border-indigo-600 text-indigo-800 dark:border-indigo-400 dark:text-indigo-200'
                : 'border-transparent text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`${uid}-panel-${tab}`}
        aria-labelledby={`${uid}-tab-${tab}`}
        tabIndex={0}
        className="outline-none"
      >
        {tab === 'notes' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => setDraft(emptyDraft())}>New note</Button>
              <Button
                variant="secondary"
                onClick={() =>
                  setDraft({
                    id: null,
                    kind: 'weekly',
                    title: `Week of ${formatDate(new Date().toISOString())}`,
                    body: weeklyTemplate,
                    tags: 'weekly',
                  })
                }
              >
                New weekly reflection
              </Button>
            </div>

            {draft && (
              <Card>
                <h2 className="mb-4 text-lg font-semibold">
                  {draft.id ? 'Edit note' : 'New note'}
                </h2>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    saveDraft()
                  }}
                >
                  <div className="grid gap-4 sm:grid-cols-[12rem_1fr]">
                    <Field label="Kind" htmlFor={`${uid}-kind`}>
                      <select
                        id={`${uid}-kind`}
                        className={inputClass}
                        value={draft.kind}
                        onChange={(e) => setDraft({ ...draft, kind: e.target.value as NoteKind })}
                      >
                        <option value="note">Note</option>
                        <option value="weekly">Weekly reflection</option>
                        <option value="project">Project note</option>
                      </select>
                    </Field>
                    <Field label="Title" htmlFor={`${uid}-title`}>
                      <input
                        id={`${uid}-title`}
                        className={inputClass}
                        required
                        maxLength={300}
                        value={draft.title}
                        onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                      />
                    </Field>
                  </div>
                  <Field
                    label="Body"
                    htmlFor={`${uid}-body`}
                    hint="Markdown is fine. Do not paste anything private you would not want in a backup file."
                  >
                    <textarea
                      id={`${uid}-body`}
                      rows={10}
                      className={cx(inputClass, 'font-mono')}
                      value={draft.body}
                      onChange={(e) => setDraft({ ...draft, body: e.target.value })}
                    />
                  </Field>
                  <Field
                    label="Tags"
                    htmlFor={`${uid}-tags`}
                    hint="Comma separated, for example: mentor, level-2"
                  >
                    <input
                      id={`${uid}-tags`}
                      className={inputClass}
                      value={draft.tags}
                      onChange={(e) => setDraft({ ...draft, tags: e.target.value })}
                    />
                  </Field>
                  <div className="flex flex-wrap gap-2">
                    <Button type="submit" disabled={!draft.title.trim()}>
                      Save note
                    </Button>
                    <Button variant="ghost" onClick={() => setDraft(null)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {notes.length === 0 ? (
              <EmptyState title={q ? 'No notes match your search' : 'No notes yet'}>
                {q
                  ? 'Try a different word.'
                  : 'Start with a weekly reflection at the end of your first week.'}
              </EmptyState>
            ) : (
              <ul className="space-y-3">
                {notes.map((n) => (
                  <Card as="li" key={n.id}>
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold">{n.title}</h3>
                        <p className="text-xs text-stone-500 dark:text-stone-400">
                          {kindLabel[n.kind]} · updated {formatDate(n.updatedAt)}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          className="min-h-8 px-2 py-1 text-xs"
                          aria-label={`Edit ${n.title}`}
                          onClick={() =>
                            setDraft({
                              id: n.id,
                              kind: n.kind === 'reflection' ? 'note' : n.kind,
                              title: n.title,
                              body: n.body,
                              tags: n.tags.join(', '),
                            })
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          className="min-h-8 px-2 py-1 text-xs text-red-700 dark:text-red-300"
                          aria-label={`Delete ${n.title}`}
                          onClick={() => deleteNote(n)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                    {n.body && (
                      <p className="mt-2 line-clamp-6 text-sm whitespace-pre-wrap text-stone-700 dark:text-stone-300">
                        {n.body}
                      </p>
                    )}
                    {n.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {n.tags.map((t) => (
                          <Pill key={t}>{t}</Pill>
                        ))}
                      </div>
                    )}
                  </Card>
                ))}
              </ul>
            )}
          </div>
        )}

        {tab === 'reflections' &&
          (filteredReflections.length === 0 ? (
            <EmptyState title={q ? 'No reflections match your search' : 'No reflections yet'}>
              Reflections you write on session and challenge pages appear here.
            </EmptyState>
          ) : (
            <ul className="space-y-3">
              {filteredReflections.map((r) => (
                <Card as="li" key={r.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <Link to={r.href} className={linkClass}>
                      {r.title}
                    </Link>
                    <span className="text-xs text-stone-500 dark:text-stone-400">
                      {r.kind}
                      {r.at ? ` · ${formatDate(r.at)}` : ''}
                    </span>
                  </div>
                  <p className="mt-2 text-sm whitespace-pre-wrap text-stone-700 dark:text-stone-300">
                    {r.reflection}
                  </p>
                </Card>
              ))}
            </ul>
          ))}

        {tab === 'goals' && (
          <div className="space-y-4">
            <form
              className="flex flex-wrap items-end gap-2"
              onSubmit={(e) => {
                e.preventDefault()
                addGoal()
              }}
            >
              <div className="flex min-w-64 flex-1 flex-col gap-1">
                <label htmlFor={`${uid}-goal`} className="text-sm font-medium">
                  New goal
                </label>
                <input
                  id={`${uid}-goal`}
                  className={inputClass}
                  maxLength={500}
                  value={goalText}
                  onChange={(e) => setGoalText(e.target.value)}
                  placeholder="e.g. Finish Level 2 by Sunday"
                />
              </div>
              <Button type="submit" disabled={!goalText.trim()}>
                Add goal
              </Button>
            </form>
            {data.goals.length === 0 ? (
              <EmptyState title="No goals yet">
                Set three small goals at each weekly review.
              </EmptyState>
            ) : (
              <ul className="space-y-2">
                {[...data.goals]
                  .sort(
                    (a, b) =>
                      Number(a.done) - Number(b.done) || b.createdAt.localeCompare(a.createdAt),
                  )
                  .map((g) => (
                    <li
                      key={g.id}
                      className="flex items-center gap-3 rounded-xl border border-stone-200 p-3 dark:border-stone-800"
                    >
                      <input
                        id={`${uid}-g-${g.id}`}
                        type="checkbox"
                        className="h-5 w-5 shrink-0 accent-indigo-600"
                        checked={g.done}
                        onChange={(e) =>
                          update((d) => {
                            const goal = d.goals.find((x) => x.id === g.id)
                            if (!goal) return
                            goal.done = e.target.checked
                            if (e.target.checked) goal.doneAt = new Date().toISOString()
                            else delete goal.doneAt
                          })
                        }
                      />
                      <label
                        htmlFor={`${uid}-g-${g.id}`}
                        className={cx(
                          'flex-1',
                          g.done && 'text-stone-500 line-through dark:text-stone-400',
                        )}
                      >
                        {g.text}
                        {g.done && g.doneAt && (
                          <span className="sr-only"> (done {formatDate(g.doneAt)})</span>
                        )}
                      </label>
                      {g.done && g.doneAt && (
                        <span
                          aria-hidden
                          className="inline-flex items-center gap-1 text-xs text-emerald-800 dark:text-emerald-300"
                        >
                          <CheckIcon className="h-3 w-3" /> {formatDate(g.doneAt)}
                        </span>
                      )}
                      <Button
                        variant="ghost"
                        className="min-h-8 px-2 py-1 text-xs"
                        aria-label={`Delete goal: ${g.text}`}
                        onClick={() =>
                          update((d) => {
                            d.goals = d.goals.filter((x) => x.id !== g.id)
                          })
                        }
                      >
                        Delete
                      </Button>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        )}

        {tab === 'bookmarks' &&
          (data.bookmarks.length === 0 ? (
            <EmptyState title="No bookmarks yet">
              Bookmark resources from the{' '}
              <Link to="/resources" className={linkClass}>
                resource catalog
              </Link>{' '}
              or session pages.
            </EmptyState>
          ) : (
            <ul className="space-y-2">
              {data.bookmarks.map((id) => {
                const resource = resourceById(id)
                const lesson = resource ? undefined : lessonById(id)
                const label =
                  resource?.title ?? (lesson ? `Session ${lesson.number}: ${lesson.title}` : id)
                return (
                  <li
                    key={id}
                    className="flex flex-wrap items-center gap-3 rounded-xl border border-stone-200 p-3 dark:border-stone-800"
                  >
                    <div className="flex-1">
                      {resource ? (
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={linkClass}
                        >
                          {resource.title}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      ) : lesson ? (
                        <Link to={`/lessons/${lesson.id}`} className={linkClass}>
                          {label}
                        </Link>
                      ) : (
                        <span className="text-stone-500">{id} (no longer in the catalog)</span>
                      )}
                      <div className="text-xs text-stone-500 dark:text-stone-400">
                        {resource
                          ? `Resource · ${resource.provider}`
                          : lesson
                            ? 'Core session'
                            : 'Unknown item'}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      className="min-h-8 px-2 py-1 text-xs"
                      aria-label={`Remove bookmark: ${label}`}
                      onClick={() =>
                        update((d) => {
                          d.bookmarks = d.bookmarks.filter((b) => b !== id)
                        })
                      }
                    >
                      Remove
                    </Button>
                  </li>
                )
              })}
            </ul>
          ))}
      </div>
    </>
  )
}
