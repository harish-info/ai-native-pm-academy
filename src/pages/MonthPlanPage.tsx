import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { lessonById, levelById, resourceById, resources } from '../content'
import { planEnd, planNotes, planStart, planWeeks, type PlanItem } from '../content/plan'
import { wikiSteps } from '../content/wiki'
import { formatMinutes, toDay } from '../domain/dates'
import { projectResults, quizResults } from '../domain/progress'
import type { LearnerData } from '../storage/schema'
import { useStore } from '../state/store'
import { ResourceCard } from '../ui/ResourceBits'
import { Card, CheckIcon, PageHeader, Pill, cx } from '../ui/primitives'

const linkClass = 'text-indigo-700 underline-offset-2 hover:underline dark:text-indigo-300'

function parseDay(day: string): Date {
  const [y, m, d] = day.split('-').map(Number) as [number, number, number]
  return new Date(y, m - 1, d)
}

const longDay = (day: string) =>
  parseDay(day).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })

const shortDay = (day: string) =>
  parseDay(day).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })

/** Quizzes have no stored duration; budget about two minutes a question plus review time. */
function quizMinutes(levelId: number): number {
  const n = levelById(levelId)?.quiz.length ?? 10
  return Math.max(15, Math.round((n * 2 + 10) / 5) * 5)
}

function projectMinutes(levelId: number): number {
  return Math.round((levelById(levelId)?.project.minutes ?? 120) / 2)
}

function itemMinutes(item: PlanItem): number {
  switch (item.kind) {
    case 'lesson':
      return lessonById(item.id)?.minutes ?? 0
    case 'quiz':
      return quizMinutes(item.levelId)
    case 'project':
      return projectMinutes(item.levelId)
    default:
      return item.minutes
  }
}

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
            <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
              Wiki:{' '}
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
      const passed = level
        ? projectResults(level.project, data.projects[String(item.levelId)]).passed
        : false
      return (
        <Row
          label={item.part === 'start' ? 'Project start' : 'Project finish'}
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
  const { data } = useStore()
  const today = toDay(new Date())
  const inRange = today >= planStart && today <= planEnd
  const totalMinutes = planWeeks.reduce(
    (sum, w) =>
      sum + w.days.reduce((s, d) => s + d.items.reduce((x, i) => x + itemMinutes(i), 0), 0),
    0,
  )
  const follow = resources.filter(
    (r) => r.format === 'community' || r.format === 'newsletter' || r.format === 'podcast',
  )

  return (
    <>
      <PageHeader eyebrow="Month plan" title={`${longDay(planStart)} to ${longDay(planEnd)}`}>
        Five weeks, one level a week. Titles, minutes and resources come from the course itself.
        About {formatMinutes(totalMinutes)} in total, including mentor time.
      </PageHeader>

      {!inRange && today < planStart && (
        <p className="mb-4 text-sm text-stone-600 dark:text-stone-400">
          The plan starts on {longDay(planStart)}.
        </p>
      )}

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
          const weekMinutes = week.days.reduce(
            (s, d) => s + d.items.reduce((x, i) => x + itemMinutes(i), 0),
            0,
          )
          return (
            <Card key={week.number} aria-labelledby={`week-${week.number}`}>
              <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                    Week {week.number} ·{' '}
                    <Link to={`/levels/${week.levelId}`} className={linkClass}>
                      Level {week.levelId}
                    </Link>
                  </p>
                  <h2 id={`week-${week.number}`} className="text-xl font-semibold">
                    {week.title}
                  </h2>
                </div>
                <Pill tone="indigo">About {formatMinutes(weekMinutes)}</Pill>
              </div>
              <p className="mb-2">
                <strong>Goal:</strong> {week.goal}
              </p>
              <p className="mb-4 text-sm text-stone-700 dark:text-stone-300">
                <strong>Mentor session:</strong> {week.mentorSession}
              </p>
              <ol className="space-y-4">
                {week.days.map((day) => {
                  const isToday = inRange && day.date === today
                  return (
                    <li
                      key={day.date}
                      aria-current={isToday ? 'date' : undefined}
                      className={cx(
                        'rounded-xl p-3',
                        isToday
                          ? 'bg-indigo-50 ring-2 ring-indigo-500 dark:bg-indigo-950 dark:ring-indigo-400'
                          : 'bg-stone-50 dark:bg-stone-950/40',
                      )}
                    >
                      <h3 className="mb-2 flex flex-wrap items-baseline gap-2">
                        <span className="font-semibold">{shortDay(day.date)}</span>
                        <span className="text-sm text-stone-600 dark:text-stone-400">
                          {day.focus}
                        </span>
                        {isToday && <Pill tone="indigo">Today</Pill>}
                      </h3>
                      <ul className="space-y-2">
                        {day.items.map((item, i) => (
                          <PlanItemRow key={i} item={item} data={data} />
                        ))}
                      </ul>
                    </li>
                  )
                })}
              </ol>
            </Card>
          )
        })}
      </div>

      <p className="mt-4 text-xs text-stone-500 dark:text-stone-400">
        Assessment and project times are estimates: about two minutes per quiz question, and each
        project split evenly over its two days.
      </p>

      <section aria-labelledby="follow" className="mt-8">
        <h2 id="follow" className="mb-1 text-lg font-semibold">
          Forums and updates to follow
        </h2>
        <p className="mb-3 text-sm text-stone-600 dark:text-stone-400">
          Communities, newsletters and podcasts to keep up after the course. Skim weekly; file
          anything useful into the wiki inbox.
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
