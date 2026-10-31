import { levels } from '../content'
import { achievements, type Achievement } from '../domain/achievements'
import { formatDate } from '../domain/dates'
import { useStore } from '../state/store'
import { Card, CheckIcon, cx, LockIcon, PageHeader, Pill, ProgressBar } from '../ui/primitives'

function progressText(a: Achievement): string {
  if (!a.progress) return ''
  if (a.id === 'ten-hours') {
    return `${Math.floor(a.progress.value / 60)} of ${a.progress.target / 60} hours`
  }
  return `${a.progress.value} of ${a.progress.target}`
}

function AchievementCard({ a }: { a: Achievement }) {
  return (
    <Card
      as="li"
      className={cx(
        'flex flex-col',
        a.unlocked ? 'border-emerald-300 dark:border-emerald-800' : 'opacity-90',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold">{a.title}</h3>
        {a.unlocked ? (
          <Pill tone="green">
            <CheckIcon className="h-3 w-3" /> Unlocked
          </Pill>
        ) : (
          <Pill>
            <LockIcon /> Locked
          </Pill>
        )}
      </div>
      <p className="mt-1 flex-1 text-sm text-stone-600 dark:text-stone-400">{a.description}</p>
      {a.unlocked ? (
        a.unlockedAt && (
          <p className="mt-3 text-xs text-stone-500 dark:text-stone-400">
            Earned {formatDate(a.unlockedAt)}
          </p>
        )
      ) : a.progress ? (
        <div className="mt-3">
          <ProgressBar
            value={a.progress.value}
            max={a.progress.target}
            label={`${a.title} progress`}
          />
          <p className="mt-1 text-xs text-stone-500 tabular-nums dark:text-stone-400">
            {progressText(a)}
          </p>
        </div>
      ) : null}
    </Card>
  )
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
        {earned} of {list.length} earned. Badges mark mastered levels; milestones mark habits and
        firsts along the way. All of them come from recorded work, never from clicks alone.
      </PageHeader>

      <section aria-labelledby="badges-heading" className="mb-8">
        <h2 id="badges-heading" className="mb-3 text-lg font-semibold">
          Level badges
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {badges.map((a) => (
            <AchievementCard key={a.id} a={a} />
          ))}
        </ul>
      </section>

      <section aria-labelledby="milestones-heading">
        <h2 id="milestones-heading" className="mb-3 text-lg font-semibold">
          Milestones
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {milestones.map((a) => (
            <AchievementCard key={a.id} a={a} />
          ))}
        </ul>
      </section>
    </>
  )
}
