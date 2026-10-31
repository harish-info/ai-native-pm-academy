import { levels } from '../content'
import { achievements, progressText, type Achievement } from '../domain/achievements'
import { formatDate } from '../domain/dates'
import { useStore } from '../state/store'
import { Medal } from '../ui/game'
import { levelShortName } from '../ui/levelNames'
import { Card, PageHeader, ProgressBar, cx } from '../ui/primitives'

function Status({ a }: { a: Achievement }) {
  if (a.unlocked) {
    return (
      <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
        {a.unlockedAt ? `Earned ${formatDate(a.unlockedAt)}` : 'Earned'}
      </p>
    )
  }
  if (a.progress) {
    return (
      <div className="w-full">
        <ProgressBar
          value={a.progress.value}
          max={a.progress.target}
          label={`${a.title} progress`}
        />
        <p className="mt-1 text-xs text-stone-500 tabular-nums dark:text-stone-400">
          {progressText(a)}
        </p>
      </div>
    )
  }
  return <p className="text-xs text-stone-500 dark:text-stone-400">Not yet</p>
}

export function AchievementsPage() {
  const { data } = useStore()
  const list = achievements(data, levels)
  const badges = list.filter((a) => a.kind === 'badge')
  const milestones = list.filter((a) => a.kind === 'milestone')
  const earned = list.filter((a) => a.unlocked).length

  return (
    <>
      <PageHeader eyebrow="Progress" title="Badges and milestones">
        Badges mark mastered levels; milestones mark habits and firsts along the way. All of them
        come from recorded work, never from clicks alone.
      </PageHeader>

      <Card className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <p className="shrink-0">
          <span className="text-3xl font-bold tabular-nums">{earned}</span>
          <span className="text-stone-600 dark:text-stone-400"> of {list.length} collected</span>
        </p>
        <ProgressBar value={earned} max={list.length} label="Collection progress" />
      </Card>

      <section aria-labelledby="badges-heading" className="mb-10">
        <h2 id="badges-heading" className="mb-4 text-lg font-semibold">
          Level badges
        </h2>
        <ul className="grid gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {badges.map((a, i) => (
            <li
              key={a.id}
              className={cx(
                'flex items-start gap-4 rounded-2xl border p-4 sm:flex-col sm:items-center sm:gap-2 sm:text-center',
                a.unlocked
                  ? 'border-mark-300 bg-mark-100/40 dark:border-mark-900 dark:bg-mark-900/20'
                  : 'border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900',
              )}
            >
              <Medal a={a} size="lg" />
              <div className="flex min-w-0 flex-1 flex-col gap-1 self-stretch sm:items-center sm:gap-2">
                <p className="mt-1 font-mono text-[0.65rem] tracking-[0.12em] text-stone-600 uppercase dark:text-stone-400">
                  Level {i + 1}: {levelShortName[(i + 1) as 1 | 2 | 3 | 4 | 5]}
                </p>
                <h3 className="leading-snug font-semibold">{a.title}</h3>
                <p className="text-xs text-stone-600 dark:text-stone-400">{a.description}</p>
                <div className="mt-auto w-full pt-1">
                  <Status a={a} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="milestones-heading">
        <h2 id="milestones-heading" className="mb-4 text-lg font-semibold">
          Milestones
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {milestones.map((a) => (
            <li
              key={a.id}
              className={cx(
                'flex items-start gap-4 rounded-2xl border p-4',
                a.unlocked
                  ? 'border-emerald-300 bg-emerald-50/40 dark:border-emerald-900 dark:bg-emerald-950/30'
                  : 'border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900',
              )}
            >
              <Medal a={a} />
              <div className="min-w-0 flex-1 space-y-1">
                <h3 className="font-semibold">
                  {a.title}
                  <span className="sr-only">{a.unlocked ? ', earned' : ', locked'}</span>
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-400">{a.description}</p>
                <div className="pt-1">
                  <Status a={a} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
