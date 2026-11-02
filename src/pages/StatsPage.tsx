import { Link } from 'react-router-dom'
import { challengeById, lessonById, levels } from '../content'
import { competencies } from '../content/competencies'
import { computeOnboardingResult, isDiagnosticCurrent } from '../domain/assessment'
import { formatDate, formatMinutes, toDay } from '../domain/dates'
import { QUIZ_PASS_RATIO, levelSteps, maxXp, xpBreakdown } from '../domain/progress'
import {
  activeDays,
  competencyEvidence,
  activeWeeks,
  overview,
  timeline,
  weeklySeries,
} from '../domain/stats'
import { useLevelStatuses } from '../state/hooks'
import { useStore } from '../state/store'
import { LevelArt } from '../ui/art'
import { Columns, Meters } from '../ui/charts'
import { levelShortName } from '../ui/levelNames'
import {
  Button,
  Card,
  CheckIcon,
  EmptyState,
  LinkButton,
  LockIcon,
  PageHeader,
  ProgressBar,
  Stat,
  cx,
  linkClass,
} from '../ui/primitives'

const PASS_PCT = Math.round(QUIZ_PASS_RATIO * 100)

const detailsClass =
  'group rounded-2xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900'
const summaryClass =
  'flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl p-5 text-lg font-semibold hover:bg-stone-50 dark:hover:bg-stone-800/50 [&::-webkit-details-marker]:hidden'

function DisclosureArrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className="h-5 w-5 shrink-0 text-indigo-600 transition-transform group-open:rotate-90 dark:text-indigo-300"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.5 4.5 13 10l-5.5 5.5" />
    </svg>
  )
}

function shortDay(day: string): string {
  const [y, m, d] = day.split('-').map(Number) as [number, number, number]
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function itemTitle(id: string | undefined): string {
  if (!id) return 'General study'
  const lesson = lessonById(id)
  if (lesson) return `Session ${lesson.number}: ${lesson.title}`
  const challenge = challengeById(id)
  if (challenge) return `Challenge: ${challenge.title}`
  return id
}

function itemHref(id: string | undefined): string | undefined {
  if (!id) return undefined
  if (lessonById(id)) return `/lessons/${id}`
  if (challengeById(id)) return `/challenges/${id}`
  return undefined
}

export function StatsPage() {
  const { data, update } = useStore()
  const statuses = useLevelStatuses()
  const today = toDay(new Date())
  const ov = overview(data, levels)
  const days = activeDays(data)
  const weeksActive = activeWeeks(days)
  const weeks = weeklySeries(data, today)
  const evidence = competencyEvidence(data, levels)
  const baseline =
    data.onboarding && isDiagnosticCurrent(data.onboarding)
      ? computeOnboardingResult(data.onboarding, levels).demonstrated
      : null
  const xp = xpBreakdown(data, levels)
  const xpMax = maxXp(levels)
  const events = timeline(data, levels)
  const log = [...data.studyLog].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 20)

  const deleteEntry = (id: string, label: string) => {
    if (!window.confirm(`Delete this study log entry (${label})? This cannot be undone.`)) return
    update((d) => {
      d.studyLog = d.studyLog.filter((e) => e.id !== id)
    })
  }

  const xpRows: { label: string; value: number }[] = [
    { label: 'Core sessions', value: xp.lessons },
    { label: 'Stretch challenges', value: xp.challenges },
    { label: 'Assessments', value: xp.quizzes },
    { label: 'Projects', value: xp.projects },
    { label: 'Level mastery bonuses', value: xp.mastery },
  ]

  return (
    <>
      <PageHeader
        eyebrow="Progress"
        title="Your stats"
        actions={
          <LinkButton to="/achievements" variant="secondary">
            Badges and milestones <span aria-hidden>→</span>
          </LinkButton>
        }
      >
        How far you are, level by level. Everything is computed from work you recorded.
      </PageHeader>

      <Card className="mb-6">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Course completion</h2>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              Required sessions, the assessment and the project for each level.
            </p>
          </div>
          <p>
            <span className="text-4xl font-bold tabular-nums">{ov.completionPct}%</span>
            <span className="sr-only"> of the course complete</span>
          </p>
        </div>
        <ol className="space-y-4">
          {statuses.map((s) => {
            const steps = levelSteps(s, data)
            const done = steps.filter((x) => x.done).length
            return (
              <li key={s.level.id} className="flex items-center gap-3 sm:gap-4">
                <LevelArt
                  levelId={s.level.id}
                  className={cx('h-10 w-10 shrink-0', !s.unlocked && 'opacity-50 grayscale')}
                />
                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 flex items-baseline justify-between gap-2 text-sm">
                    <Link to={`/levels/${s.level.id}`} className={cx(linkClass, 'truncate')}>
                      Level {s.level.id}: {levelShortName[s.level.id]}
                    </Link>
                    <span className="shrink-0 text-stone-600 tabular-nums dark:text-stone-400">
                      {s.mastered ? (
                        <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-300">
                          <CheckIcon className="h-3.5 w-3.5" /> Mastered
                        </span>
                      ) : !s.unlocked ? (
                        <span className="inline-flex items-center gap-1">
                          <LockIcon /> Locked
                        </span>
                      ) : (
                        `${done} of ${steps.length} steps`
                      )}
                    </span>
                  </div>
                  <ProgressBar
                    value={done}
                    max={steps.length}
                    label={`Level ${s.level.id} progress`}
                  />
                </div>
              </li>
            )
          })}
        </ol>
      </Card>

      <section aria-labelledby="overview-heading" className="mb-6">
        <h2 id="overview-heading" className="sr-only">
          Overview
        </h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Stat
            label="Experience"
            value={`${xp.total.toLocaleString()} XP`}
            hint={`of ${xpMax.toLocaleString()} possible`}
          />
          <Stat
            label="Time logged"
            value={formatMinutes(ov.minutes)}
            hint={`${days.size} active ${days.size === 1 ? 'day' : 'days'}`}
          />
          <Stat
            label="Active weeks"
            value={`${weeksActive} ${weeksActive === 1 ? 'week' : 'weeks'}`}
            hint="Breaks never reset it"
          />
          <Stat
            label="Still to go"
            value={formatMinutes(ov.remainingMinutes)}
            hint="Required sessions left"
          />
        </div>
      </section>

      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <Columns
            title="Study time per week"
            description="Logged focused minutes over the last eight weeks."
            points={weeks.map((w) => ({
              label: shortDay(w.weekStart),
              value: w.minutes,
              detail: `${w.sessions} ${w.sessions === 1 ? 'completion' : 'completions'}`,
            }))}
            format={(v) => `${v}`}
            unitLabel="Minutes"
          />
        </Card>
        <Card>
          <Columns
            title="Best assessment score"
            description={`Your best attempt per level. The line is the ${PASS_PCT}% pass mark.`}
            points={statuses.map((s) => ({
              label: `L${s.level.id}`,
              value: s.quiz.bestRatio === null ? 0 : Math.round(s.quiz.bestRatio * 100),
              detail:
                s.quiz.attempts.length === 0
                  ? 'Not attempted'
                  : `${s.quiz.attempts.length} ${s.quiz.attempts.length === 1 ? 'attempt' : 'attempts'}${s.quiz.passed ? ', passed' : ''}`,
            }))}
            format={(v) => `${v}%`}
            max={100}
            reference={{ value: PASS_PCT, label: `Pass ${PASS_PCT}%` }}
            unitLabel="Best score"
          />
        </Card>
      </div>

      <Card className="mb-6">
        <Meters
          title="Skills"
          description={
            baseline
              ? 'How much coursework evidence you have per competency. The tick is your diagnostic result.'
              : data.onboarding
                ? 'How much coursework evidence you have per competency. The diagnostic has new scenarios: retake it to add your baseline.'
                : 'How much coursework evidence you have per competency. Take the diagnostic to add your baseline.'
          }
          valueLabel="Coursework evidence"
          markerLabel="Diagnostic baseline"
          rows={competencies.map((c) => ({
            label: c.short,
            value: evidence[c.id],
            marker: baseline ? (baseline[c.id] ?? null) : null,
          }))}
        />
      </Card>

      <div className="space-y-4">
        <details className={detailsClass}>
          <summary className={summaryClass}>
            <span>
              Where your XP came from{' '}
              <span className="text-sm font-normal text-stone-500 dark:text-stone-400">
                {xp.total.toLocaleString()} XP
              </span>
            </span>
            <DisclosureArrow />
          </summary>
          <div className="px-5 pb-5">
            <table className="w-full text-sm">
              <caption className="sr-only">Experience points by source</caption>
              <thead>
                <tr className="border-b border-stone-200 text-left text-stone-600 dark:border-stone-800 dark:text-stone-400">
                  <th scope="col" className="py-2 font-medium">
                    Source
                  </th>
                  <th scope="col" className="py-2 text-right font-medium">
                    XP
                  </th>
                </tr>
              </thead>
              <tbody>
                {xpRows.map((r) => (
                  <tr key={r.label} className="border-b border-stone-100 dark:border-stone-800/60">
                    <th scope="row" className="py-2 text-left font-normal">
                      {r.label}
                    </th>
                    <td className="py-2 text-right tabular-nums">{r.value.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>

        <details className={detailsClass}>
          <summary className={summaryClass}>
            <span>
              Study log{' '}
              <span className="text-sm font-normal text-stone-500 dark:text-stone-400">
                {data.studyLog.length} {data.studyLog.length === 1 ? 'entry' : 'entries'}
              </span>
            </span>
            <DisclosureArrow />
          </summary>
          <div className="px-5 pb-5">
            {log.length ? (
              <>
                <ul className="divide-y divide-stone-100 dark:divide-stone-800">
                  {log.map((e) => {
                    const href = itemHref(e.lessonId)
                    const title = itemTitle(e.lessonId)
                    return (
                      <li key={e.id} className="flex flex-wrap items-center gap-3 py-2 text-sm">
                        <span className="w-28 shrink-0 text-stone-500 tabular-nums dark:text-stone-400">
                          {formatDate(`${e.date}T12:00:00`)}
                        </span>
                        <span className="w-20 shrink-0 font-medium tabular-nums">
                          {formatMinutes(e.minutes)}
                        </span>
                        <span className="min-w-0 flex-1">
                          {href ? (
                            <Link to={href} className={linkClass}>
                              {title}
                            </Link>
                          ) : (
                            title
                          )}
                          {e.note ? (
                            <span className="text-stone-500 dark:text-stone-400"> · {e.note}</span>
                          ) : null}
                        </span>
                        <Button
                          variant="ghost"
                          className="min-h-8 px-2 py-1 text-xs"
                          aria-label={`Delete ${formatMinutes(e.minutes)} on ${e.date} for ${title}`}
                          onClick={() =>
                            deleteEntry(e.id, `${formatMinutes(e.minutes)} on ${e.date}`)
                          }
                        >
                          Delete
                        </Button>
                      </li>
                    )
                  })}
                </ul>
                {data.studyLog.length > log.length && (
                  <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
                    Showing the latest {log.length} of {data.studyLog.length} entries.
                  </p>
                )}
              </>
            ) : (
              <EmptyState title="No study time logged yet">
                Log time from any session page. Only real, focused time counts.
              </EmptyState>
            )}
          </div>
        </details>

        <details className={detailsClass}>
          <summary className={summaryClass}>
            <span>
              Timeline{' '}
              <span className="text-sm font-normal text-stone-500 dark:text-stone-400">
                {events.length} {events.length === 1 ? 'event' : 'events'}
              </span>
            </span>
            <DisclosureArrow />
          </summary>
          <div className="px-5 pb-5">
            {events.length ? (
              <ol className="space-y-4">
                {events.map((e, i) => (
                  <li
                    key={`${e.at}-${i}`}
                    className="border-l-2 border-stone-200 pl-3 dark:border-stone-700"
                  >
                    <div className="text-xs text-stone-500 dark:text-stone-400">
                      {formatDate(e.at)}
                    </div>
                    {e.href ? (
                      <Link to={e.href} className={linkClass}>
                        {e.title}
                      </Link>
                    ) : (
                      <span className="font-medium">{e.title}</span>
                    )}
                    {e.detail && (
                      <p className="mt-0.5 line-clamp-2 text-sm text-stone-600 dark:text-stone-400">
                        {e.detail}
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            ) : (
              <EmptyState
                title="Your timeline is empty"
                action={<LinkButton to="/dashboard">Go to the dashboard</LinkButton>}
              >
                Completed sessions, assessments, projects and weekly reflections appear here.
              </EmptyState>
            )}
          </div>
        </details>
      </div>
    </>
  )
}
