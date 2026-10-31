import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { LevelId } from '../content/types'
import { progressText, type Achievement } from '../domain/achievements'
import { formatMinutes } from '../domain/dates'
import type { LevelStatus, levelSteps } from '../domain/progress'
import { ConfettiBurst, Icon, LevelArt } from './art'
import { levelShortName } from './levelNames'
import { CheckIcon, LockIcon, ProgressBar, ProgressRing, cx } from './primitives'

type Step = ReturnType<typeof levelSteps>[number]

/**
 * The current level as a trail of stops: each required session, the assessment, the project, and
 * the badge at the end. Done stops are filled, the next stop is highlighted, and every stop opens
 * the page where that step happens.
 */
export function StepTrail({ status, steps }: { status: LevelStatus; steps: Step[] }) {
  const done = steps.filter((s) => s.done).length
  const next = steps.findIndex((s) => !s.done)
  const left = steps.length - done
  return (
    <section aria-labelledby="trail-heading">
      <div className="mb-10 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 id="trail-heading" className="font-semibold">
          Level {status.level.id}: {levelShortName[status.level.id]}
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-400">
          {status.mastered ? (
            <>
              <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                {status.level.badge.name}
              </span>{' '}
              badge earned
            </>
          ) : (
            <>
              <span className="font-semibold text-stone-900 tabular-nums dark:text-stone-100">
                {left} {left === 1 ? 'step' : 'steps'}
              </span>{' '}
              to the {status.level.badge.name} badge
            </>
          )}
        </p>
      </div>
      <ol className="flex items-center">
        {steps.map((s, i) => {
          const isNext = i === next
          return (
            <Fragment key={s.key}>
              {i > 0 && <Connector done={steps[i - 1]!.done} />}
              <li className="relative">
                {isNext && (
                  <span
                    aria-hidden
                    className="absolute -top-7 left-1/2 -translate-x-1/2 rounded-md bg-stone-900 px-1.5 py-0.5 text-[0.65rem] font-semibold whitespace-nowrap text-white after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-stone-900 after:content-[''] dark:bg-stone-100 dark:text-stone-900 dark:after:border-t-stone-100"
                  >
                    Next
                  </span>
                )}
                <Link
                  to={s.to}
                  title={s.label}
                  aria-current={isNext ? 'step' : undefined}
                  className={cx(
                    'grid h-9 w-9 place-items-center rounded-full text-sm font-bold tabular-nums transition-transform duration-150 motion-safe:hover:scale-110 sm:h-11 sm:w-11',
                    s.done
                      ? 'bg-emerald-600 text-white shadow-[0_2px_0_var(--g-800)] dark:bg-emerald-500 dark:text-stone-950'
                      : isNext
                        ? 'trail-next bg-indigo-600 text-white shadow-[0_2px_0_var(--a-800)] dark:bg-indigo-400 dark:text-stone-950'
                        : 'border-2 border-stone-300 bg-white text-stone-600 hover:border-indigo-400 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-300',
                  )}
                >
                  {s.done ? (
                    <CheckIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : s.kind === 'lesson' ? (
                    <span aria-hidden>{s.short}</span>
                  ) : (
                    <Icon
                      name={s.kind === 'quiz' ? 'quiz' : 'flag'}
                      className="h-4 w-4 sm:h-5 sm:w-5"
                    />
                  )}
                  <span className="sr-only">
                    {s.label}, {s.done ? 'done' : isNext ? 'next' : 'to do'}
                  </span>
                </Link>
              </li>
            </Fragment>
          )
        })}
        <Connector done={status.mastered} />
        <li>
          <Link
            to="/achievements"
            title={`${status.level.badge.name} badge`}
            className={cx(
              'grid h-11 w-11 place-items-center rounded-full ring-2 transition-transform duration-150 motion-safe:hover:scale-110 sm:h-14 sm:w-14',
              status.mastered
                ? 'bg-mark-100 ring-mark-400 dark:bg-mark-900 dark:ring-mark-300'
                : 'bg-stone-100 ring-stone-300 dark:bg-stone-800 dark:ring-stone-600',
            )}
          >
            <LevelArt
              levelId={status.level.id}
              className={cx('h-8 w-8 sm:h-10 sm:w-10', !status.mastered && 'opacity-60 grayscale')}
            />
            <span className="sr-only">
              {status.level.badge.name} badge, {status.mastered ? 'earned' : 'not earned yet'}
            </span>
          </Link>
        </li>
      </ol>
      <p className="mt-3 text-xs text-stone-500 dark:text-stone-400" aria-hidden>
        Sessions, then the assessment <Icon name="quiz" className="inline h-3.5 w-3.5" />, then the
        project <Icon name="flag" className="inline h-3.5 w-3.5" />
      </p>
    </section>
  )
}

function Connector({ done }: { done: boolean }) {
  return (
    <li
      aria-hidden
      className={cx(
        'h-1 min-w-1 flex-1 rounded-full',
        done ? 'bg-emerald-500 dark:bg-emerald-400' : 'bg-stone-200 dark:bg-stone-700',
      )}
    />
  )
}

const dayLetters = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

/** Hours with one decimal, dropping a trailing .0. */
const hours = (min: number) => String(Math.round((min / 60) * 10) / 10)

const CELEBRATED_KEY = 'academy-week-celebrated'

/**
 * The weekly goal: logged minutes against the plan's weekly target, the days studied this week,
 * and XP earned since Monday. Weeks, not days: a missed day never breaks anything.
 */
export function WeeklyGoal({
  minutes,
  target,
  days,
  xpThisWeek,
  weekStart,
}: {
  minutes: number
  target: number
  days: { day: string; active: boolean; isToday: boolean; future: boolean }[]
  xpThisWeek: number
  weekStart: string
}) {
  const met = target > 0 && minutes >= target
  const [celebrate] = useState(() => met && readKey() !== weekStart)
  useEffect(() => {
    if (met) writeKey(weekStart)
  }, [met, weekStart])
  const left = Math.max(0, target - minutes)
  return (
    <div className="relative flex flex-col items-center gap-5 sm:flex-row sm:items-center">
      {celebrate && <ConfettiBurst />}
      <ProgressRing
        value={minutes}
        max={target}
        size={128}
        stroke={12}
        complete={met}
        label="Weekly goal"
        center={
          met ? (
            <span className="grid place-items-center text-emerald-700 dark:text-emerald-300">
              <CheckIcon className="h-8 w-8" />
              <span className="text-xs font-semibold">Goal met</span>
            </span>
          ) : (
            <span className="block leading-tight">
              <span className="block text-2xl font-bold tabular-nums">{hours(minutes)} h</span>
              <span className="text-xs text-stone-500 dark:text-stone-400">
                of {Math.round(target / 60)} h
              </span>
            </span>
          )
        }
      />
      <div className="min-w-0 flex-1 text-center sm:text-left">
        <h2 className="text-lg font-semibold">Weekly goal</h2>
        <p className="mt-0.5 text-sm text-stone-600 dark:text-stone-400">
          {met
            ? 'Week done. Anything more is a bonus.'
            : minutes === 0
              ? `About ${Math.round(target / 60)} h this week. Any day works.`
              : `${formatMinutes(left)} to go this week. Any day works.`}
        </p>
        <ol
          className="mt-3 flex justify-center gap-1.5 sm:justify-start"
          aria-label="Days studied this week"
        >
          {days.map((d, i) => (
            <li key={d.day} className="flex flex-col items-center gap-1">
              <span
                className={cx(
                  'grid h-7 w-7 place-items-center rounded-full text-[0.7rem] font-semibold',
                  d.active
                    ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-stone-950'
                    : d.future
                      ? 'border border-dashed border-stone-300 text-stone-500 dark:border-stone-600 dark:text-stone-400'
                      : 'bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400',
                  d.isToday &&
                    'ring-2 ring-indigo-500 ring-offset-2 ring-offset-white dark:ring-offset-stone-900',
                )}
              >
                {d.active ? (
                  <CheckIcon className="h-3.5 w-3.5" />
                ) : (
                  <span aria-hidden>{dayLetters[i]}</span>
                )}
                <span className="sr-only">
                  {dayNames[i]}
                  {d.isToday ? ', today' : ''}:{' '}
                  {d.active ? 'studied' : d.future ? 'ahead' : 'rest day'}
                </span>
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-sm">
          <span className="font-semibold text-emerald-700 tabular-nums dark:text-emerald-300">
            +{xpThisWeek.toLocaleString()} XP
          </span>{' '}
          <span className="text-stone-600 dark:text-stone-400">since Monday</span>
        </p>
      </div>
    </div>
  )
}

function readKey() {
  try {
    return localStorage.getItem(CELEBRATED_KEY)
  } catch {
    return null
  }
}

function writeKey(v: string) {
  try {
    localStorage.setItem(CELEBRATED_KEY, v)
  } catch {
    // Storage can be unavailable in private modes; the celebration just repeats.
  }
}

const milestoneIcons: Record<string, string> = {
  diagnostic: 'chart',
  'first-session': 'pencil',
  reflective: 'book',
  'steady-weeks': 'calendar',
  'ten-hours': 'clock',
  'perfect-quiz': 'star',
  'first-project': 'flag',
  'mentor-reviewed': 'users',
  stretch: 'spark',
  'all-stretch': 'spark',
  'core-complete': 'path',
  'backed-up': 'shield',
}

/** A round medal: level art for badges, a line icon for milestones. Grey with a lock until earned. */
export function Medal({ a, size = 'md' }: { a: Achievement; size?: 'sm' | 'md' | 'lg' }) {
  const levelId = a.kind === 'badge' ? (Number(a.id.split('-')[1]) as LevelId) : null
  const box = { sm: 'h-11 w-11', md: 'h-14 w-14', lg: 'h-20 w-20' }[size]
  const art = { sm: 'h-8 w-8', md: 'h-10 w-10', lg: 'h-14 w-14' }[size]
  const icon = { sm: 'h-5 w-5', md: 'h-6 w-6', lg: 'h-8 w-8' }[size]
  return (
    <span
      aria-hidden
      className={cx(
        'relative grid shrink-0 place-items-center rounded-full ring-2',
        box,
        a.unlocked
          ? levelId
            ? 'bg-mark-100 ring-mark-400 dark:bg-mark-900 dark:ring-mark-300'
            : 'bg-emerald-50 text-emerald-700 ring-emerald-400 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-600'
          : 'bg-stone-100 text-stone-500 ring-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:ring-stone-700',
      )}
    >
      {levelId ? (
        <LevelArt levelId={levelId} className={cx(art, !a.unlocked && 'opacity-50 grayscale')} />
      ) : (
        <Icon name={milestoneIcons[a.id] ?? 'trophy'} className={icon} />
      )}
      {!a.unlocked && (
        <span className="absolute -right-0.5 -bottom-0.5 grid h-5 w-5 place-items-center rounded-full bg-white text-stone-500 ring-1 ring-stone-200 dark:bg-stone-900 dark:text-stone-400 dark:ring-stone-700">
          <span className="scale-75">
            <LockIcon />
          </span>
        </span>
      )}
    </span>
  )
}

export function RewardRow({ a }: { a: Achievement }) {
  return (
    <li className="flex items-center gap-3">
      <Medal a={a} size="sm" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">
          {a.title}
          {a.kind === 'badge' && (
            <span className="font-normal text-stone-500 dark:text-stone-400"> badge</span>
          )}
        </p>
        {a.progress ? (
          <div className="mt-1.5 flex items-center gap-2">
            <ProgressBar
              value={a.progress.value}
              max={a.progress.target}
              label={`${a.title} progress`}
            />
            <span className="shrink-0 text-xs text-stone-500 tabular-nums dark:text-stone-400">
              {progressText(a)}
            </span>
          </div>
        ) : (
          <p className="text-xs text-stone-500 dark:text-stone-400">{a.description}</p>
        )}
      </div>
    </li>
  )
}

export function XpChip({ total, week }: { total: number; week: number }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full bg-mark-100 px-3.5 py-1.5 text-sm dark:bg-mark-900">
      <Icon name="star" className="h-4 w-4 text-stone-900 dark:text-mark-200" />
      <span className="font-bold tabular-nums">{total.toLocaleString()} XP</span>
      {week > 0 && (
        <span className="text-stone-700 tabular-nums dark:text-stone-300">
          +{week.toLocaleString()} this week
        </span>
      )}
    </p>
  )
}
