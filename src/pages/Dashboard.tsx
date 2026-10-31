import { Link } from 'react-router-dom'
import { levels, lessonById, levelById } from '../content'
import { competencies } from '../content/competencies'
import { planEnd, planStart, planWeeks, type PlanItem } from '../content/plan'
import { wikiMilestones } from '../content/wiki'
import { computeOnboardingResult } from '../domain/assessment'
import { addDays, formatDate, formatMinutes, toDay, weekStart } from '../domain/dates'
import { currentLevel, maxXp, xpBreakdown, type LevelStatus } from '../domain/progress'
import {
  activeDays,
  competencyEvidence,
  currentStreak,
  overview,
  timeline,
  weeklySeries,
} from '../domain/stats'
import type { LearnerData } from '../storage/schema'
import { useLevelStatuses } from '../state/hooks'
import { useStore } from '../state/store'
import { Columns, PairedBars } from '../ui/charts'
import {
  Card,
  EmptyState,
  LinkButton,
  PageHeader,
  Pill,
  ProgressBar,
  ProgressRing,
  Stat,
} from '../ui/primitives'

const BACKUP_REMINDER_DAYS = 7

function shortDay(day: string): string {
  const [y, m, d] = day.split('-').map(Number) as [number, number, number]
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function nextAction(
  status: LevelStatus,
  data: LearnerData,
): { label: string; to: string; detail: string } {
  const lesson = status.requiredLessons.find((l) => !data.lessons[l.id]?.completedAt)
  if (lesson) {
    return {
      label: data.lessons[lesson.id]?.startedAt
        ? `Continue session ${lesson.number}`
        : `Start session ${lesson.number}`,
      to: `/lessons/${lesson.id}`,
      detail: `${lesson.title} · about ${formatMinutes(lesson.minutes)}`,
    }
  }
  if (!status.quiz.passed) {
    return {
      label: `Take the Level ${status.level.id} assessment`,
      to: `/levels/${status.level.id}/quiz`,
      detail: 'Pass mark 80%. You can retake it as often as you like.',
    }
  }
  if (!status.project.passed) {
    return {
      label: `Work on the Level ${status.level.id} project`,
      to: `/levels/${status.level.id}/project`,
      detail: status.level.project.title,
    }
  }
  return {
    label: 'Explore the stretch challenges',
    to: `/levels/${status.level.id}`,
    detail: 'Every level is mastered. The optional challenges are waiting.',
  }
}

function planItemView(item: PlanItem, data: LearnerData, statuses: LevelStatus[]) {
  switch (item.kind) {
    case 'lesson': {
      const lesson = lessonById(item.id)
      return {
        title: lesson ? `Session ${lesson.number}: ${lesson.title}` : item.id,
        to: `/lessons/${item.id}`,
        minutes: lesson?.minutes,
        done: !!data.lessons[item.id]?.completedAt,
      }
    }
    case 'quiz':
      return {
        title: `Level ${item.levelId} assessment`,
        to: `/levels/${item.levelId}/quiz`,
        minutes: undefined,
        done: !!statuses.find((s) => s.level.id === item.levelId)?.quiz.passed,
      }
    case 'project': {
      const level = levelById(item.levelId)
      return {
        title: `${item.part === 'start' ? 'Start' : 'Finish'}: ${level?.project.title ?? `Level ${item.levelId} project`}`,
        to: `/levels/${item.levelId}/project`,
        minutes: level ? Math.round(level.project.minutes / 2) : undefined,
        done: !!statuses.find((s) => s.level.id === item.levelId)?.project.passed,
      }
    }
    default:
      return {
        title: item.text,
        to: undefined,
        minutes: item.minutes,
        done: false,
        tag: item.kind === 'mentor' ? 'Mentor' : item.kind === 'review' ? 'Review' : 'Prep',
      }
  }
}

function TodayInPlan({ today }: { today: string }) {
  const { data } = useStore()
  const statuses = useLevelStatuses()
  const inPlan = today >= planStart && today <= planEnd
  const day = inPlan ? planWeeks.flatMap((w) => w.days).find((d) => d.date === today) : undefined
  return (
    <Card>
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">Today in the month plan</h2>
        <Link
          to="/plan"
          className="text-sm font-medium text-indigo-700 hover:underline dark:text-indigo-300"
        >
          Full plan
        </Link>
      </div>
      {day ? (
        <>
          <p className="mb-3 text-sm text-stone-600 dark:text-stone-400">
            {formatDate(`${day.date}T12:00:00`)} · {day.focus}
          </p>
          <ul className="space-y-2">
            {day.items.map((item, i) => {
              const v = planItemView(item, data, statuses)
              return (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-stone-200 p-3 dark:border-stone-800"
                >
                  <span className="flex-1 text-sm">
                    {'tag' in v && v.tag && (
                      <Pill tone="neutral" className="mr-2">
                        {v.tag}
                      </Pill>
                    )}
                    {v.to ? (
                      <Link
                        to={v.to}
                        className="font-medium text-indigo-700 hover:underline dark:text-indigo-300"
                      >
                        {v.title}
                      </Link>
                    ) : (
                      v.title
                    )}
                    {v.minutes ? (
                      <span className="text-stone-500 dark:text-stone-400">
                        {' '}
                        · {formatMinutes(v.minutes)}
                      </span>
                    ) : null}
                  </span>
                  {v.done && <Pill tone="green">Done</Pill>}
                </li>
              )
            })}
          </ul>
        </>
      ) : (
        <p className="text-sm text-stone-600 dark:text-stone-400">
          {today < planStart
            ? `The five-week plan starts on ${formatDate(`${planStart}T12:00:00`)}. Have a look at it now so week one has no surprises.`
            : 'The five-week plan has finished. Keep going at your own pace, and pick up the stretch challenges.'}{' '}
          <Link
            to="/plan"
            className="font-medium text-indigo-700 hover:underline dark:text-indigo-300"
          >
            Open the month plan
          </Link>
        </p>
      )}
    </Card>
  )
}

export function Dashboard() {
  const { data } = useStore()
  const statuses = useLevelStatuses()
  const today = toDay(new Date())
  const current = currentLevel(statuses)
  const action = nextAction(current, data)
  const xp = xpBreakdown(data, levels)
  const xpMax = maxXp(levels)
  const ov = overview(data, levels)
  const streak = currentStreak(activeDays(data), today)
  const weeks = weeklySeries(data, today)
  const thisWeek = weeks.find((w) => w.weekStart === weekStart(today))?.minutes ?? 0
  const evidence = competencyEvidence(data, levels)
  const baseline = data.onboarding
    ? computeOnboardingResult(data.onboarding, levels).demonstrated
    : null
  const events = timeline(data, levels).slice(0, 5)
  const openGoals = data.goals.filter((g) => !g.done)
  const milestone = wikiMilestones.find((m) => m.levelId === current.level.id)
  const name =
    typeof data.onboarding?.profile.name === 'string' ? data.onboarding.profile.name.trim() : ''

  const hasProgress = ov.coreDone > 0 || data.studyLog.length > 0 || data.quizAttempts.length > 0
  const lastBackup = data.settings.lastBackupAt
  const backupStale =
    hasProgress && (!lastBackup || toDay(lastBackup) < addDays(today, -BACKUP_REMINDER_DAYS))

  const levelUnits = current.requiredLessons.length + 2
  const levelDone =
    current.requiredDone + (current.quiz.passed ? 1 : 0) + (current.project.passed ? 1 : 0)

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={`Level ${current.level.id}: ${current.level.title}`}
        title={name ? `Welcome back, ${name}` : 'Welcome back'}
      >
        Small, real steps every day. Progress here only counts work you have actually done.
      </PageHeader>

      {!data.onboarding && (
        <Card className="border-indigo-300 dark:border-indigo-800">
          <h2 className="text-lg font-semibold">Start with the skills diagnostic</h2>
          <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
            Fifteen minutes of scenario questions sets your baseline, recommends where to start and
            may let you skip theory you already know.
          </p>
          <LinkButton to="/onboarding" className="mt-4">
            Take the diagnostic
          </LinkButton>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                Current level
              </p>
              <h2 className="text-xl font-semibold">
                Level {current.level.id}: {current.level.title}
              </h2>
              <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                {current.level.theme}
              </p>
            </div>
            {current.path === 'proof-only' && <Pill tone="blue">Theory tested out</Pill>}
            {current.mastered && <Pill tone="green">Mastered</Pill>}
          </div>
          <div className="mt-4">
            <ProgressBar
              value={levelDone}
              max={levelUnits}
              label={`Level ${current.level.id} progress`}
            />
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
              {current.requiredDone} of {current.requiredLessons.length} sessions · assessment{' '}
              {current.quiz.passed ? 'passed' : 'not passed yet'} · project{' '}
              {current.project.passed ? 'passed' : 'not passed yet'}
            </p>
          </div>
          <div className="mt-5 rounded-xl bg-stone-50 p-4 dark:bg-stone-800/50">
            <p className="text-sm text-stone-600 dark:text-stone-400">Next step</p>
            <p className="mt-0.5 font-medium">{action.detail}</p>
            <LinkButton to={action.to} className="mt-3">
              {action.label}
            </LinkButton>
          </div>
        </Card>
        <TodayInPlan today={today} />
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat
          label="Experience"
          value={`${xp.total.toLocaleString()} XP`}
          hint={`of ${xpMax.toLocaleString()} possible`}
        />
        <Stat
          label="Current streak"
          value={`${streak} ${streak === 1 ? 'day' : 'days'}`}
          hint="Days with logged study, completions or assessments"
        />
        <Stat
          label="This week"
          value={formatMinutes(thisWeek)}
          hint="Logged study time since Monday"
        />
        <div className="flex items-center gap-4 rounded-xl border border-stone-200 p-4 dark:border-stone-800">
          <ProgressRing value={ov.completionPct} size={72} label="Course completion" />
          <div>
            <div className="text-sm text-stone-600 dark:text-stone-400">Course completion</div>
            <div className="text-xs text-stone-500 dark:text-stone-400">
              Sessions, assessments and projects
            </div>
          </div>
        </div>
      </div>

      {backupStale && (
        <Card className="border-amber-300 dark:border-amber-800">
          <h2 className="font-semibold">Back up your progress</h2>
          <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
            Everything lives only in this browser.{' '}
            {lastBackup
              ? `Your last backup was on ${formatDate(lastBackup)}.`
              : 'You have not exported a backup yet.'}{' '}
            Export one now so clearing browser data cannot erase your work.
          </p>
          <LinkButton to="/settings" variant="secondary" className="mt-3">
            Go to backup
          </LinkButton>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <Columns
            title="Study minutes per week"
            description="Logged focused time over the last eight weeks."
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
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent activity</h2>
            <Link
              to="/stats"
              className="text-sm font-medium text-indigo-700 hover:underline dark:text-indigo-300"
            >
              All progress
            </Link>
          </div>
          {events.length ? (
            <ol className="space-y-3">
              {events.map((e, i) => (
                <li
                  key={`${e.at}-${i}`}
                  className="border-l-2 border-stone-200 pl-3 dark:border-stone-700"
                >
                  <div className="text-xs text-stone-500 dark:text-stone-400">
                    {formatDate(e.at)}
                  </div>
                  {e.href ? (
                    <Link to={e.href} className="font-medium hover:underline">
                      {e.title}
                    </Link>
                  ) : (
                    <span className="font-medium">{e.title}</span>
                  )}
                </li>
              ))}
            </ol>
          ) : (
            <EmptyState title="Nothing yet">
              Complete your first session and it will show up here.
            </EmptyState>
          )}
        </Card>
        <div className="space-y-6">
          <Card>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Goals</h2>
              <Link
                to="/workspace"
                className="text-sm font-medium text-indigo-700 hover:underline dark:text-indigo-300"
              >
                Manage
              </Link>
            </div>
            {openGoals.length ? (
              <ul className="list-disc space-y-1 pl-5 text-sm">
                {openGoals.slice(0, 4).map((g) => (
                  <li key={g.id}>{g.text}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-stone-600 dark:text-stone-400">
                No open goals. Set one or two for this week in your workspace.
              </p>
            )}
          </Card>
          {milestone && (
            <Card>
              <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                Wiki milestone for Level {milestone.levelId}
              </p>
              <h2 className="text-lg font-semibold">{milestone.name}</h2>
              <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">{milestone.summary}</p>
              <Link
                to="/wiki"
                className="mt-3 inline-block text-sm font-medium text-indigo-700 hover:underline dark:text-indigo-300"
              >
                Open your wiki guide
              </Link>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
