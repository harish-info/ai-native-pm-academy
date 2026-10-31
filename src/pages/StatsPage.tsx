import { Link } from 'react-router-dom'
import { challengeById, lessonById, levels } from '../content'
import { competencies } from '../content/competencies'
import { computeOnboardingResult } from '../domain/assessment'
import { formatDate, formatMinutes, toDay } from '../domain/dates'
import { QUIZ_PASS_RATIO, xpBreakdown, maxXp } from '../domain/progress'
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
import { Columns, PairedBars } from '../ui/charts'
import { Button, Card, EmptyState, LinkButton, PageHeader, Stat } from '../ui/primitives'

const PASS_PCT = Math.round(QUIZ_PASS_RATIO * 100)

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
  const baseline = data.onboarding
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
      <PageHeader eyebrow="Progress" title="Your stats">
        Everything here is computed from work you recorded: completed sessions, assessments,
        assessed projects and logged time.
      </PageHeader>

      <section aria-labelledby="overview-heading" className="mb-6">
        <h2 id="overview-heading" className="sr-only">
          Overview
        </h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Stat
            label="Core sessions"
            value={`${ov.coreDone} / ${ov.coreTotal}`}
            hint={`${ov.completionPct}% of the course overall`}
          />
          <Stat label="Stretch challenges" value={`${ov.challengesDone} / ${ov.challengesTotal}`} />
          <Stat label="Assessments passed" value={`${ov.quizzesPassed} / ${levels.length}`} />
          <Stat label="Projects passed" value={`${ov.projectsPassed} / ${levels.length}`} />
          <Stat label="Levels mastered" value={`${ov.levelsMastered} / ${levels.length}`} />
          <Stat label="Time logged" value={formatMinutes(ov.minutes)} />
          <Stat
            label="Estimated remaining"
            value={formatMinutes(ov.remainingMinutes)}
            hint="Required sessions and projects not yet done"
          />
          <Stat
            label="Active weeks"
            value={`${weeksActive} ${weeksActive === 1 ? 'week' : 'weeks'}`}
            hint={`${days.size} active ${days.size === 1 ? 'day' : 'days'} in total`}
          />
        </div>
      </section>

      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <Columns
            title="Study minutes per week"
            description="Logged focused time over the last eight weeks, by week starting Monday."
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
          <PairedBars
            title="Competencies"
            description={
              baseline
                ? 'Diagnostic baseline against evidence from completed sessions and your best assessment answers.'
                : 'Take the diagnostic to see your baseline next to your coursework evidence.'
            }
            aLabel="Diagnostic baseline"
            bLabel="Coursework evidence"
            rows={competencies.map((c) => ({
              label: c.short,
              a: baseline ? (baseline[c.id] ?? null) : null,
              b: evidence[c.id],
            }))}
          />
        </Card>
        <Card>
          <Columns
            title="Best assessment score per level"
            description={`Your best attempt at each level assessment. The line marks the ${PASS_PCT}% pass mark.`}
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
        <Card>
          <h2 className="mb-3 text-lg font-semibold">Experience points</h2>
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
            <tfoot>
              <tr>
                <th scope="row" className="py-2 text-left font-semibold">
                  Total
                </th>
                <td className="py-2 text-right font-semibold tabular-nums">
                  {xp.total.toLocaleString()}{' '}
                  <span className="font-normal text-stone-500 dark:text-stone-400">
                    of {xpMax.toLocaleString()}
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </Card>
      </div>

      <Card className="mb-6">
        <h2 className="mb-3 text-lg font-semibold">Study log</h2>
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
                        <Link to={href} className="hover:underline">
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
                      onClick={() => deleteEntry(e.id, `${formatMinutes(e.minutes)} on ${e.date}`)}
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
      </Card>

      <Card>
        <h2 className="mb-3 text-lg font-semibold">Timeline</h2>
        {events.length ? (
          <ol className="space-y-4">
            {events.map((e, i) => (
              <li
                key={`${e.at}-${i}`}
                className="border-l-2 border-stone-200 pl-3 dark:border-stone-700"
              >
                <div className="text-xs text-stone-500 dark:text-stone-400">{formatDate(e.at)}</div>
                {e.href ? (
                  <Link to={e.href} className="font-medium hover:underline">
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
      </Card>
    </>
  )
}
