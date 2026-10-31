import { Link } from 'react-router-dom'
import { levels, lessonById, levelById, wikiMilestones } from '../content'
import { competencies } from '../content/competencies'
import { planWeeks, type PlanItem } from '../content/plan'
import { computeOnboardingResult } from '../domain/assessment'
import { addDays, formatDate, formatMinutes, toDay, weekStart } from '../domain/dates'
import { currentLevel, maxXp, xpBreakdown, type LevelStatus } from '../domain/progress'
import {
  currentPlanWeek,
  itemMinutes,
  planPace,
  weekWindow,
  weeklyTarget,
} from '../domain/schedule'
import {
  activeDays,
  activeWeeks,
  competencyEvidence,
  overview,
  timeline,
  weeklySeries,
} from '../domain/stats'
import type { LearnerData } from '../storage/schema'
import { useLevelStatuses } from '../state/hooks'
import { useStore } from '../state/store'
import { LevelArt } from '../ui/art'
import { Columns, PairedBars } from '../ui/charts'
import { LevelPath } from '../ui/LevelPath'
import {
  Button,
  Card,
  Chevron,
  cx,
  interactiveCard,
  staticTile,
  EmptyState,
  LinkButton,
  PageHeader,
  Pill,
  ProgressRing,
  Stat,
  linkClass,
  stretchedLink,
  CheckIcon,
} from '../ui/primitives'

const BACKUP_REMINDER_DAYS = 7

function shortDay(day: string): string {
  const [y, m, d] = day.split('-').map(Number) as [number, number, number]
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function nextAction(
  status: LevelStatus,
  data: LearnerData,
): { label: string; to: string; detail: string; heading: string } {
  const lesson = status.requiredLessons.find((l) => !data.lessons[l.id]?.completedAt)
  if (lesson) {
    return {
      heading: lesson.title,
      label: data.lessons[lesson.id]?.startedAt
        ? `Continue session ${lesson.number}`
        : `Start session ${lesson.number}`,
      to: `/lessons/${lesson.id}`,
      detail: `Session ${lesson.number} of Level ${status.level.id} · about ${formatMinutes(lesson.minutes)}`,
    }
  }
  if (!status.quiz.passed) {
    return {
      heading: `Level ${status.level.id} assessment`,
      label: `Take the Level ${status.level.id} assessment`,
      to: `/levels/${status.level.id}/quiz`,
      detail: 'Pass mark 80%. You can retake it as often as you like.',
    }
  }
  if (!status.project.passed) {
    return {
      heading: status.level.project.title,
      label: `Work on the Level ${status.level.id} project`,
      to: `/levels/${status.level.id}/project`,
      detail: status.level.project.title,
    }
  }
  return {
    heading: 'Stretch challenges',
    label: 'Explore the stretch challenges',
    to: `/levels/${status.level.id}`,
    detail: 'Every level is mastered. The optional challenges are waiting.',
  }
}

const projectPartLabel = {
  whole: 'Project',
  start: 'Start',
  continue: 'Continue',
  finish: 'Finish',
} as const

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
        minutes: itemMinutes(item),
        done: !!statuses.find((s) => s.level.id === item.levelId)?.quiz.passed,
      }
    case 'project': {
      const level = levelById(item.levelId)
      return {
        title: `${projectPartLabel[item.part]}: ${level?.project.title ?? `Level ${item.levelId} project`}`,
        to: `/levels/${item.levelId}/project`,
        minutes: item.minutes,
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

function ThisWeekInPlan({ today }: { today: string }) {
  const { data, update } = useStore()
  const statuses = useLevelStatuses()
  const start = data.settings.planStart
  const pace = planPace(data)
  const n = start ? currentPlanWeek(start, pace, today) : 1
  const week = planWeeks.find((w) => w.number === Math.max(1, n))
  const window = start && week ? weekWindow(start, pace, week.number) : undefined
  return (
    <Card>
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">
          {week && n <= planWeeks.length ? `This week: Week ${week.number}` : 'Your plan'}
        </h2>
        <Link to="/plan" className={`text-sm ${linkClass}`}>
          Full plan
        </Link>
      </div>
      {n > planWeeks.length ? (
        <p className="text-sm text-stone-600 dark:text-stone-400">
          The plan has finished. Keep going at your own pace, and pick up the stretch challenges.
        </p>
      ) : week ? (
        <>
          <p className="mb-3 text-sm text-stone-600 dark:text-stone-400">
            {week.title}
            {window
              ? ` · ${formatDate(`${window.start}T12:00:00`)} to ${formatDate(`${window.end}T12:00:00`)}`
              : ''}
          </p>
          {!start && (
            <div className="mb-3 flex flex-wrap items-center gap-3 rounded-lg bg-indigo-50 p-3 text-sm dark:bg-indigo-950">
              <span className="flex-1">
                Week 1 needs only a chat account. Start whenever you are ready.
              </span>
              <Button onClick={() => update((d) => void (d.settings.planStart = today))}>
                Start Week 1 today
              </Button>
            </div>
          )}
          {start && n === 0 && (
            <p className="mb-3 text-sm text-stone-600 dark:text-stone-400">
              Week 1 starts on {formatDate(`${start}T12:00:00`)}.
            </p>
          )}
          <ul className="space-y-2">
            {week.items.map((item, i) => {
              const v = planItemView(item, data, statuses)
              return (
                <li
                  key={i}
                  className={cx(
                    'flex items-center gap-3 rounded-lg p-3',
                    v.to ? interactiveCard : staticTile,
                  )}
                >
                  <span
                    aria-hidden
                    className={cx(
                      'grid h-6 w-6 shrink-0 place-items-center rounded-full border',
                      v.done
                        ? 'border-emerald-600 bg-emerald-600 text-white dark:border-emerald-400 dark:bg-emerald-400 dark:text-stone-950'
                        : 'border-stone-300 dark:border-stone-600',
                    )}
                  >
                    {v.done && <CheckIcon className="h-3.5 w-3.5" />}
                  </span>
                  <span className="flex-1 text-sm">
                    {'tag' in v && v.tag && (
                      <Pill tone="neutral" className="mr-2">
                        {v.tag}
                      </Pill>
                    )}
                    {v.to ? (
                      <Link to={v.to} className={cx(stretchedLink, 'font-medium')}>
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
                  {v.done && <span className="sr-only">Done</span>}
                  {v.to && <Chevron className="h-4 w-4" />}
                </li>
              )
            })}
          </ul>
        </>
      ) : null}
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
  const weeksActive = activeWeeks(activeDays(data))
  const target = weeklyTarget(planPace(data))
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
        Small, real steps. Progress here only counts work you have actually done.
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

      <Card interactive className="dot-grid overflow-hidden p-0">
        <div className="flex flex-col gap-6 bg-gradient-to-r from-white via-white/95 to-white/40 p-6 sm:flex-row sm:items-center sm:p-8 dark:from-stone-900 dark:via-stone-900/95 dark:to-stone-900/40">
          <div className="min-w-0 flex-1">
            <p className="font-mono text-xs font-medium tracking-[0.14em] text-stone-600 uppercase dark:text-stone-400">
              Next step · Level {current.level.id}
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-balance sm:text-3xl">
              {action.heading}
            </h2>
            <p className="mt-1.5 text-stone-600 dark:text-stone-400">{action.detail}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <LinkButton
                to={action.to}
                className="after:absolute after:inset-0 after:rounded-[inherit] after:content-['']"
              >
                {action.label}
                <span aria-hidden>→</span>
              </LinkButton>
              {current.path === 'proof-only' && <Pill tone="blue">Theory tested out</Pill>}
              {current.mastered && <Pill tone="green">Mastered</Pill>}
            </div>
          </div>
          <div className="flex items-center gap-5 sm:flex-col sm:items-center sm:gap-2">
            <div className="relative hidden sm:block">
              <ProgressRing
                value={levelDone}
                max={levelUnits}
                size={112}
                label={`Level ${current.level.id} progress`}
              />
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              {current.requiredDone} of {current.requiredLessons.length} sessions
              <br className="hidden sm:block" />
              <span className="sm:hidden"> · </span>
              assessment {current.quiz.passed ? 'passed' : 'to do'} · project{' '}
              {current.project.passed ? 'passed' : 'to do'}
            </p>
          </div>
          <LevelArt levelId={current.level.id} className="hidden h-36 w-36 lg:block" />
        </div>
      </Card>

      <section aria-labelledby="path-heading">
        <div className="mb-3 flex items-baseline justify-between gap-2">
          <h2 id="path-heading" className="text-lg font-semibold">
            Your path
          </h2>
          <Link to="/levels" className={`text-sm ${linkClass}`}>
            All levels
          </Link>
        </div>
        <LevelPath statuses={statuses} currentId={current.level.id} />
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <ThisWeekInPlan today={today} />
        <div className="grid grid-cols-2 content-start gap-4">
          <Stat
            label="Experience"
            value={`${xp.total.toLocaleString()} XP`}
            hint={`of ${xpMax.toLocaleString()} possible`}
          />
          <Stat
            label="Active weeks"
            value={`${weeksActive} ${weeksActive === 1 ? 'week' : 'weeks'}`}
            hint="Weeks with any study. Missed days never reset it."
          />
          <Stat
            label="This week"
            value={formatMinutes(thisWeek)}
            hint={`Logged since Monday, of about ${Math.round(target / 60)} h planned`}
          />
          <Stat
            label="Course"
            value={`${ov.completionPct}%`}
            hint="Sessions, assessments and projects done"
          />
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
            <Link to="/stats" className={`text-sm ${linkClass}`}>
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
                    <Link to={e.href} className={linkClass}>
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
              <Link to="/workspace" className={`text-sm ${linkClass}`}>
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
              <Link to="/wiki" className={`mt-3 inline-block text-sm ${linkClass}`}>
                Open your wiki guide
              </Link>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
