import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { lessonById, levelById, resourceById, resources, wikiSteps } from '../content'
import { paces, planNotes, planWeeks, type PlanItem, type PlanPace } from '../content/plan'
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
import { Card, CheckIcon, PageHeader, Pill, cx, linkClass } from '../ui/primitives'

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

const textKindLabel = { mentor: 'Mentor', review: 'Review', prep: 'Prep' } as const

function Done({ done }: { done: boolean }) {
  return done ? (
    <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-emerald-800 dark:text-emerald-300">
      <CheckIcon className="h-4 w-4" /> Done
    </span>
  ) : (
    <span className="shrink-0 text-xs text-stone-500 dark:text-stone-400">To do</span>
  )
}

function Row({
  label,
  title,
  minutes,
  done,
  children,
}: {
  label: string
  title: ReactNode
  minutes: number
  done?: boolean
  children?: ReactNode
}) {
  return (
    <li className="rounded-xl border border-stone-200 p-3 dark:border-stone-800">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <span className="mr-2 text-xs font-medium tracking-wide text-stone-500 uppercase dark:text-stone-400">
            {label}
          </span>
          <span className="font-medium">{title}</span>
          <span className="ml-2 text-sm text-stone-500 dark:text-stone-400">
            {formatMinutes(minutes)}
          </span>
        </div>
        {done !== undefined && <Done done={done} />}
      </div>
      {children}
    </li>
  )
}

function PlanItemRow({ item, data }: { item: PlanItem; data: LearnerData }) {
  const minutes = itemMinutes(item)
  switch (item.kind) {
    case 'lesson': {
      const lesson = lessonById(item.id)
      if (!lesson) return <Row label="Session" title={item.id} minutes={0} />
      const required = lesson.resources
        .filter((r) => r.required)
        .map((r) => resourceById(r.resourceId))
        .filter((r) => r !== undefined)
      const step = wikiSteps[lesson.id]
      return (
        <Row
          label={`Session ${lesson.number}`}
          title={
            <Link to={`/lessons/${lesson.id}`} className={linkClass}>
              {lesson.title}
            </Link>
          }
          minutes={minutes}
          done={!!data.lessons[lesson.id]?.completedAt}
        >
          {required.length > 0 && (
            <p className="mt-2 text-xs text-stone-600 dark:text-stone-400">
              Required:{' '}
              {required.map((r, i) => (
                <span key={r.id}>
                  {i > 0 && ', '}
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {r.title}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </span>
              ))}
            </p>
          )}
          {step && step.pages.length > 0 && (
            <p className="mt-1 text-xs [overflow-wrap:anywhere] text-stone-600 dark:text-stone-400">
              Files:{' '}
              {step.pages.map((p, i) => (
                <span key={p}>
                  {i > 0 && ', '}
                  <code>{p}</code>
                </span>
              ))}
            </p>
          )}
        </Row>
      )
    }
    case 'quiz':
      return (
        <Row
          label="Assessment"
          title={
            <Link to={`/levels/${item.levelId}/quiz`} className={linkClass}>
              Level {item.levelId} assessment
            </Link>
          }
          minutes={minutes}
          done={quizResults(data, item.levelId).passed}
        />
      )
    case 'project': {
      const level = levelById(item.levelId)
      const passed = level ? levelProjectResults(data, level).passed : false
      return (
        <Row
          label={projectPartLabel[item.part]}
          title={
            <Link to={`/levels/${item.levelId}/project`} className={linkClass}>
              {level?.project.title ?? `Level ${item.levelId} project`}
            </Link>
          }
          minutes={minutes}
          done={passed}
        />
      )
    }
    default:
      return <Row label={textKindLabel[item.kind]} title={item.text} minutes={minutes} />
  }
}

export function MonthPlanPage() {
  const { data, update } = useStore()
  const today = toDay(new Date())
  const start = data.settings.planStart
  const pace = planPace(data)
  const current = start ? currentPlanWeek(start, pace, today) : 0
  const totalMinutes = planMinutes()
  const follow = resources.filter(
    (r) => r.format === 'community' || r.format === 'newsletter' || r.format === 'podcast',
  )
  const setPace = (p: PlanPace) => update((d) => void (d.settings.planPace = p))

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
        Eight plan weeks, {paces[pace].hoursPerWeek} at the {pace} pace. About{' '}
        {formatMinutes(totalMinutes)} in total, including mentor time. Titles, minutes and resources
        come from the course itself.
      </PageHeader>

      <Card className="mb-6" aria-labelledby="plan-settings">
        <h2 id="plan-settings" className="mb-3 text-lg font-semibold">
          Start date and pace
        </h2>
        <div className="flex flex-wrap items-end gap-6">
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
                className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 dark:border-stone-700 dark:bg-stone-900"
              />
              {!start && (
                <button
                  type="button"
                  onClick={() => update((d) => void (d.settings.planStart = today))}
                  className="rounded-lg bg-indigo-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-800 dark:bg-indigo-500 dark:text-stone-950 dark:hover:bg-indigo-400"
                >
                  Start Week 1 today
                </button>
              )}
              {start && (
                <button
                  type="button"
                  onClick={() => update((d) => void (d.settings.planStart = addDays(start, 7)))}
                  className="rounded-lg border border-stone-300 px-3 py-1.5 text-sm font-medium hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-800"
                >
                  Push back a week
                </button>
              )}
            </div>
          </div>
          <fieldset>
            <legend className="mb-1 text-sm font-medium">Pace</legend>
            <div className="flex flex-wrap gap-4">
              {(Object.keys(paces) as PlanPace[]).map((p) => (
                <label key={p} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="plan-pace"
                    checked={pace === p}
                    onChange={() => setPace(p)}
                  />
                  {paces[p].label}, {paces[p].hoursPerWeek}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </Card>

      <aside
        aria-label="Plan notes"
        className="mb-6 rounded-2xl border border-indigo-200 bg-indigo-50 p-5 text-sm dark:border-indigo-900 dark:bg-indigo-950"
      >
        <h2 className="mb-2 font-semibold">Before you start</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          {planNotes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </aside>

      <div className="space-y-6">
        {planWeeks.map((week) => {
          const window = start ? weekWindow(start, pace, week.number) : undefined
          const isCurrent = current === week.number
          return (
            <Card
              key={week.number}
              aria-labelledby={`week-${week.number}`}
              aria-current={isCurrent ? 'step' : undefined}
              className={cx(isCurrent && 'ring-2 ring-indigo-500 dark:ring-indigo-400')}
            >
              <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                    Week {week.number} ·{' '}
                    {week.levelIds.map((id, i) => (
                      <span key={id}>
                        {i > 0 && ' and '}
                        <Link to={`/levels/${id}`} className={linkClass}>
                          Level {id}
                        </Link>
                      </span>
                    ))}
                    {window && (
                      <span className="text-stone-600 dark:text-stone-400">
                        {' '}
                        · {shortDay(window.start)} to {shortDay(window.end)}
                      </span>
                    )}
                  </p>
                  <h2 id={`week-${week.number}`} className="text-xl font-semibold">
                    {week.title}
                  </h2>
                </div>
                <div className="flex gap-2">
                  {isCurrent && <Pill tone="indigo">This week</Pill>}
                  <Pill tone="indigo">About {formatMinutes(weekMinutes(week))}</Pill>
                </div>
              </div>
              <p className="mb-2">
                <strong>Goal:</strong> {week.goal}
              </p>
              <p className="mb-4 rounded-xl bg-stone-50 p-3 text-sm text-stone-700 dark:bg-stone-950/40 dark:text-stone-300">
                <strong>What the mentor does:</strong> {week.mentor}
              </p>
              <ol className="space-y-2">
                {week.items.map((item, i) => (
                  <PlanItemRow key={i} item={item} data={data} />
                ))}
              </ol>
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
