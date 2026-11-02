import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { featuredFirst, lessonById, levelById, resources } from '../content'
import {
  paces,
  planNotes,
  planWeeks,
  type PlanItem,
  type PlanPace,
  type PlanWeek,
} from '../content/plan'
import { addDays, formatMinutes, toDay } from '../domain/dates'
import { levelProjectResults, quizResults } from '../domain/progress'
import {
  currentPlanWeek,
  itemMinutes,
  planEndDay,
  planMinutes,
  planPace,
  weekMinutes,
  weekWindow,
} from '../domain/schedule'
import type { LearnerData } from '../storage/schema'
import { useStore } from '../state/store'
import { ResourceCard } from '../ui/ResourceBits'
import {
  Card,
  CheckIcon,
  Chevron,
  LinkButton,
  PageHeader,
  Pill,
  ProgressBar,
  cx,
  linkClass,
} from '../ui/primitives'

function parseDay(day: string): Date {
  const [y, m, d] = day.split('-').map(Number) as [number, number, number]
  return new Date(y, m - 1, d)
}

const longDay = (day: string) =>
  parseDay(day).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })

const shortDay = (day: string) =>
  parseDay(day).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })

const projectPartLabel = {
  whole: 'Project',
  start: 'Project start',
  continue: 'Project, continued',
  finish: 'Project finish',
} as const

type Kind = PlanItem['kind']

const kindLabel: Record<Exclude<Kind, 'lesson' | 'project'>, string> = {
  quiz: 'Assessment',
  mentor: 'With your mentor',
  review: 'Weekly review',
  prep: 'Prepare',
}

const plainTone = 'bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
const kindTone: Record<Kind, string> = {
  lesson: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300',
  quiz: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
  project: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
  mentor: plainTone,
  review: plainTone,
  prep: plainTone,
}

const kindPath: Record<Kind, string> = {
  lesson:
    'M4 4.5h4.5A1.5 1.5 0 0 1 10 6v10a1.5 1.5 0 0 0-1.5-1.5H4zM16 4.5h-4.5A1.5 1.5 0 0 0 10 6v10a1.5 1.5 0 0 1 1.5-1.5H16z',
  quiz: 'M5 10.5l3 3 7-7',
  project: 'M5 17V4m0 0h9l-2 3.5 2 3.5H5',
  mentor:
    'M7 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm6.5 0a2 2 0 1 0 0-4M2.5 16a4.5 4.5 0 0 1 9 0m2-4.5A3.5 3.5 0 0 1 17.5 15',
  review: 'M15.5 8A6 6 0 0 0 4.6 7M4.5 12a6 6 0 0 0 10.9 1M15.5 4v4h-4M4.5 16v-4h4',
  prep: 'M7 4.5h6M7 3h6v3H7zM5.5 4.5H5a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-11a1 1 0 0 0-1-1h-.5M7 10h6M7 13h4',
}

function KindIcon({ kind }: { kind: Kind }) {
  return (
    <span
      aria-hidden
      className={cx('grid h-8 w-8 shrink-0 place-items-center rounded-lg', kindTone[kind])}
    >
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d={kindPath[kind]} />
      </svg>
    </span>
  )
}

function DoneMark({ done }: { done: boolean }) {
  return done ? (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-800 dark:text-emerald-300">
      <CheckIcon className="h-4 w-4" /> Done
    </span>
  ) : (
    <span className="text-xs text-stone-500 dark:text-stone-400">To do</span>
  )
}

/** Whether a plan item is finished, for items the learner records progress on. */
function itemDone(item: PlanItem, data: LearnerData): boolean | undefined {
  switch (item.kind) {
    case 'lesson':
      return !!data.lessons[item.id]?.completedAt
    case 'quiz':
      return quizResults(data, item.levelId).passed
    case 'project': {
      const level = levelById(item.levelId)
      return level ? levelProjectResults(data, level).passed : false
    }
    default:
      return undefined
  }
}

function itemTitle(item: PlanItem): { label: string; title: ReactNode; to?: string } {
  switch (item.kind) {
    case 'lesson': {
      const lesson = lessonById(item.id)
      return {
        label: lesson ? `Session ${lesson.number}` : 'Session',
        title: lesson?.title ?? item.id,
        to: `/lessons/${item.id}`,
      }
    }
    case 'quiz':
      return {
        label: kindLabel.quiz,
        title: `Level ${item.levelId} assessment`,
        to: `/levels/${item.levelId}/quiz`,
      }
    case 'project': {
      const level = levelById(item.levelId)
      return {
        label: projectPartLabel[item.part],
        title: level?.project.title ?? `Level ${item.levelId} project`,
        to: `/levels/${item.levelId}/project`,
      }
    }
    default:
      return { label: kindLabel[item.kind], title: item.text }
  }
}

function PlanItemRow({ item, data }: { item: PlanItem; data: LearnerData }) {
  const { label, title, to } = itemTitle(item)
  const done = itemDone(item, data)
  return (
    <li className="flex items-start gap-3 py-3">
      <KindIcon kind={item.kind} />
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-stone-500 dark:text-stone-400">{label}</p>
        {to ? (
          <Link to={to} className={cx(linkClass, 'leading-snug')}>
            {title}
          </Link>
        ) : (
          <p className="text-sm leading-relaxed text-stone-800 dark:text-stone-200">{title}</p>
        )}
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1 pt-0.5">
        <span className="text-xs text-stone-500 tabular-nums dark:text-stone-400">
          {formatMinutes(itemMinutes(item))}
        </span>
        {done !== undefined && <DoneMark done={done} />}
      </div>
    </li>
  )
}

function weekProgress(week: PlanWeek, data: LearnerData) {
  const tracked = week.items.map((i) => itemDone(i, data)).filter((d) => d !== undefined)
  return { done: tracked.filter(Boolean).length, total: tracked.length }
}

const levelsLabel = (ids: number[]) => ids.map((id) => `Level ${id}`).join(' and ')

function focusWeek(n: number) {
  requestAnimationFrame(() => {
    const heading = document.getElementById(`week-${n}`)
    heading?.focus({ preventScroll: true })
    heading?.scrollIntoView({ block: 'start' })
  })
}

export function MonthPlanPage() {
  const { data, update } = useStore()
  const today = toDay(new Date())
  const start = data.settings.planStart
  const pace = planPace(data)
  const current = start ? currentPlanWeek(start, pace, today) : 0
  const focus = current || 1
  const totalMinutes = planMinutes()
  const follow = featuredFirst(
    resources.filter(
      (r) => r.format === 'community' || r.format === 'newsletter' || r.format === 'podcast',
    ),
  )
  const setPace = (p: PlanPace) => update((d) => void (d.settings.planPace = p))
  const [open, setOpen] = useState<Set<number>>(() => new Set([focus]))
  const toggle = (n: number, isOpen: boolean) =>
    setOpen((prev) => {
      if (prev.has(n) === isOpen) return prev
      const next = new Set(prev)
      if (isOpen) next.add(n)
      else next.delete(n)
      return next
    })
  const jumpTo = (n: number) => {
    toggle(n, true)
    focusWeek(n)
  }
  const allOpen = open.size === planWeeks.length

  const focusWeekData = planWeeks.find((w) => w.number === focus)!
  const focusProgress = weekProgress(focusWeekData, data)
  const nextUp = focusWeekData.items.find((i) => itemDone(i, data) === false)
  const next = nextUp ? itemTitle(nextUp) : undefined

  return (
    <>
      <PageHeader
        eyebrow="Study plan"
        title={
          start
            ? `${longDay(start)} to ${longDay(planEndDay(start, pace))}`
            : 'Eight weeks, starting when you are ready'
        }
      >
        20 sessions and 5 projects, week by week, {paces[pace].hoursPerWeek} including mentor time.
        About {Math.round(totalMinutes / 60)} hours in total.
      </PageHeader>

      <Card className="mb-6" aria-labelledby="plan-settings">
        <h2 id="plan-settings" className="sr-only">
          Start date and pace
        </h2>
        <div className="grid gap-5 md:grid-cols-[auto_1fr] md:items-end">
          <div>
            <label htmlFor="plan-start" className="mb-1 block text-sm font-medium">
              Start date
            </label>
            <div className="flex flex-wrap items-center gap-2">
              <input
                id="plan-start"
                type="date"
                value={start ?? ''}
                onChange={(e) => {
                  const v = e.target.value
                  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) update((d) => void (d.settings.planStart = v))
                }}
                className="min-h-10 rounded-lg border border-stone-300 bg-white px-3 py-1.5 dark:border-stone-700 dark:bg-stone-900"
              />
              {!start && (
                <button
                  type="button"
                  onClick={() => update((d) => void (d.settings.planStart = today))}
                  className="min-h-10 rounded-lg bg-indigo-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-800 dark:bg-indigo-500 dark:text-stone-950 dark:hover:bg-indigo-400"
                >
                  Start Week 1 today
                </button>
              )}
              {start && (
                <button
                  type="button"
                  onClick={() => update((d) => void (d.settings.planStart = addDays(start, 7)))}
                  className="min-h-10 rounded-lg border border-stone-300 px-3 py-1.5 text-sm font-medium hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-800"
                >
                  Push back a week
                </button>
              )}
            </div>
          </div>
          <fieldset>
            <legend className="mb-1 text-sm font-medium">Pace</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {(Object.keys(paces) as PlanPace[]).map((p) => (
                <label
                  key={p}
                  className="flex min-h-10 cursor-pointer items-center gap-3 rounded-xl border border-stone-300 px-3 py-2 text-sm has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-indigo-500 dark:border-stone-700 dark:has-[:checked]:border-indigo-400 dark:has-[:checked]:bg-indigo-950"
                >
                  <input
                    type="radio"
                    name="plan-pace"
                    checked={pace === p}
                    onChange={() => setPace(p)}
                    className="accent-indigo-600"
                  />
                  <span>
                    <span className="font-medium">{paces[p].label}</span>
                    <span className="text-stone-600 dark:text-stone-400">
                      , {paces[p].hoursPerWeek}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </Card>

      <section
        aria-labelledby="plan-now"
        className="mb-6 rounded-2xl border border-indigo-200 bg-indigo-50 p-5 sm:p-6 dark:border-indigo-900 dark:bg-indigo-950/60"
      >
        <p className="text-sm font-medium text-indigo-800 dark:text-indigo-300">
          {current ? `Week ${current} of ${planWeeks.length}` : 'Where to begin'}
          {start &&
            current > 0 &&
            (() => {
              const w = weekWindow(start, pace, current)
              return ` · ${shortDay(w.start)} to ${shortDay(w.end)}`
            })()}
        </p>
        <h2 id="plan-now" className="mt-1 text-2xl font-semibold tracking-tight">
          {focusWeekData.title}
        </h2>
        <div className="mt-3 flex max-w-md items-center gap-3">
          <ProgressBar
            value={focusProgress.done}
            max={focusProgress.total}
            label={`Week ${focus} progress`}
          />
          <span className="shrink-0 text-sm text-stone-700 tabular-nums dark:text-stone-300">
            {focusProgress.done} of {focusProgress.total} done
          </span>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {next?.to ? (
            <LinkButton to={next.to}>
              Next: {next.label === kindLabel.quiz ? '' : `${next.label}, `}
              {next.title}
            </LinkButton>
          ) : (
            <p className="text-sm font-medium">Everything this week is done.</p>
          )}
          <button
            type="button"
            onClick={() => jumpTo(focus)}
            className={cx(linkClass, 'cursor-pointer text-sm')}
          >
            See the whole week
          </button>
        </div>
      </section>

      <nav aria-label="Weeks" className="mb-6">
        <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {planWeeks.map((week) => {
            const { done, total } = weekProgress(week, data)
            const isCurrent = current === week.number
            const complete = total > 0 && done === total
            return (
              <li key={week.number}>
                <button
                  type="button"
                  onClick={() => jumpTo(week.number)}
                  aria-current={isCurrent ? 'step' : undefined}
                  className={cx(
                    'flex h-full w-full cursor-pointer flex-col rounded-xl border bg-white p-3 text-left transition-colors hover:border-indigo-400 dark:bg-stone-900 dark:hover:border-indigo-500',
                    isCurrent
                      ? 'border-indigo-500 ring-1 ring-indigo-500 dark:border-indigo-400 dark:ring-indigo-400'
                      : 'border-stone-200 dark:border-stone-800',
                  )}
                >
                  <span className="flex items-center justify-between gap-2 text-xs font-medium text-stone-500 dark:text-stone-400">
                    <span>
                      Week {week.number}
                      {isCurrent && <span className="sr-only">, current</span>}
                    </span>
                    {complete && (
                      <CheckIcon className="h-4 w-4 text-emerald-700 dark:text-emerald-300" />
                    )}
                  </span>
                  <span className="mt-1 text-sm leading-snug font-semibold">{week.title}</span>
                  <span className="mt-auto pt-3">
                    <span
                      aria-hidden
                      className="block h-1.5 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800"
                    >
                      <span
                        className="block h-full rounded-full bg-indigo-600 dark:bg-indigo-400"
                        style={{ width: `${total ? Math.round((done / total) * 100) : 0}%` }}
                      />
                    </span>
                    <span className="mt-1.5 block text-xs text-stone-500 dark:text-stone-400">
                      {done} of {total} done · {formatMinutes(weekMinutes(week))}
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </nav>

      <details className="mb-6 rounded-2xl border border-stone-200 bg-white px-5 py-4 text-sm dark:border-stone-800 dark:bg-stone-900">
        <summary className="cursor-pointer font-semibold">How the plan works</summary>
        <ul className="mt-3 max-w-prose list-disc space-y-1.5 pl-5 text-stone-700 dark:text-stone-300">
          {planNotes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </details>

      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Week by week</h2>
        <button
          type="button"
          onClick={() => setOpen(allOpen ? new Set() : new Set(planWeeks.map((w) => w.number)))}
          className={cx(linkClass, 'cursor-pointer text-sm')}
        >
          {allOpen ? 'Collapse all' : 'Expand all'}
        </button>
      </div>

      <div className="space-y-3">
        {planWeeks.map((week) => {
          const window = start ? weekWindow(start, pace, week.number) : undefined
          const isCurrent = current === week.number
          const { done, total } = weekProgress(week, data)
          const complete = total > 0 && done === total
          return (
            <Card
              key={week.number}
              as="section"
              aria-labelledby={`week-${week.number}`}
              aria-current={isCurrent ? 'step' : undefined}
              className={cx(
                'scroll-mt-20 !p-0',
                isCurrent && 'ring-2 ring-indigo-500 dark:ring-indigo-400',
              )}
            >
              <details
                open={open.has(week.number)}
                onToggle={(e) => toggle(week.number, e.currentTarget.open)}
                className="group"
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 p-4 sm:p-5 [&::-webkit-details-marker]:hidden">
                  <span
                    aria-hidden
                    className={cx(
                      'grid h-11 w-11 shrink-0 place-items-center rounded-full text-base font-semibold',
                      complete
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : isCurrent
                          ? 'bg-indigo-600 text-white dark:bg-indigo-400 dark:text-stone-950'
                          : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300',
                    )}
                  >
                    {complete ? <CheckIcon className="h-5 w-5" /> : week.number}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-medium text-stone-500 dark:text-stone-400">
                      Week {week.number} · {levelsLabel(week.levelIds)}
                      {window && ` · ${shortDay(window.start)} to ${shortDay(window.end)}`}
                    </span>
                    <h3
                      id={`week-${week.number}`}
                      tabIndex={-1}
                      className="text-lg leading-snug font-semibold outline-none"
                    >
                      {week.title}
                    </h3>
                    <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-600 dark:text-stone-400">
                      {isCurrent && <Pill tone="indigo">This week</Pill>}
                      <span className="tabular-nums">
                        {done} of {total} done
                      </span>
                      <span>About {formatMinutes(weekMinutes(week))}</span>
                    </span>
                  </span>
                  <Chevron className="rotate-90 group-open:-rotate-90 motion-safe:group-hover:translate-x-0" />
                </summary>
                <div className="border-t border-stone-200 px-4 pb-4 sm:px-5 dark:border-stone-800">
                  <p className="pt-4 text-sm leading-relaxed">
                    <strong>Goal:</strong> {week.goal}
                  </p>
                  <ol className="mt-1 divide-y divide-stone-200 dark:divide-stone-800">
                    {week.items.map((item, i) => (
                      <PlanItemRow key={i} item={item} data={data} />
                    ))}
                  </ol>
                  <p className="mt-2 rounded-xl bg-stone-100 p-3 text-sm leading-relaxed text-stone-700 dark:bg-stone-800/60 dark:text-stone-300">
                    <strong>What the mentor does:</strong> {week.mentor}
                  </p>
                </div>
              </details>
            </Card>
          )
        })}
      </div>

      <p className="mt-4 text-xs text-stone-500 dark:text-stone-400">
        Assessment and project times are estimates: about two minutes per quiz question plus review,
        and projects split across the weeks where they run. Work through a week in order; which day
        you do what is up to you.
      </p>

      <section aria-labelledby="follow" className="mt-8">
        <h2 id="follow" className="mb-1 text-lg font-semibold">
          Forums and updates to follow
        </h2>
        <p className="mb-3 text-sm text-stone-600 dark:text-stone-400">
          Communities, newsletters and podcasts to keep up after the course. Skim weekly; file
          anything useful into your workspace sources/ folder.
        </p>
        {follow.length > 0 ? (
          <ul className="grid gap-3 md:grid-cols-2">
            {follow.map((r) => (
              <ResourceCard key={r.id} resource={r} />
            ))}
          </ul>
        ) : (
          <p className="text-sm text-stone-500">None in the catalog yet.</p>
        )}
      </section>
    </>
  )
}
