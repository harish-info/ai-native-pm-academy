import { Link } from 'react-router-dom'
import { formatDate, formatMinutes } from '../domain/dates'
import { useLevelStatuses } from '../state/hooks'
import { LevelArt } from '../ui/art'
import { courseArc } from '../content/teaching'
import {
  Card,
  CheckIcon,
  Chevron,
  LockIcon,
  PageHeader,
  Pill,
  ProgressBar,
  cx,
  stretchedLink,
} from '../ui/primitives'

export function LevelMap() {
  const statuses = useLevelStatuses()
  return (
    <>
      <PageHeader eyebrow="Course" title="From foundations to independent practice">
        Each level unlocks once you finish the required sessions of the one before it, so you can
        start the next level while a project is still open. Mastering a level needs every required
        session, at least 80% on the assessment and a passing project.
      </PageHeader>
      <ol className="space-y-4">
        {statuses.map((s) => {
          const minutes =
            s.level.lessons.reduce((n, l) => n + l.minutes, 0) + s.level.project.minutes
          const parts = s.requiredLessons.length + 2
          const doneParts = s.requiredDone + (s.quiz.passed ? 1 : 0) + (s.project.passed ? 1 : 0)
          return (
            <li key={s.level.id}>
              <Card as="div" interactive>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <LevelArt
                    levelId={s.level.id}
                    className={cx('h-16 w-16', !s.unlocked && 'opacity-60 grayscale')}
                  />
                  <div className="max-w-2xl flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2 text-sm">
                      <span className="font-medium text-stone-500 dark:text-stone-400">
                        Level {s.level.id}
                      </span>
                      {s.mastered ? (
                        <Pill tone="green">
                          <CheckIcon className="h-3 w-3" /> Mastered{' '}
                          {s.masteredAt ? formatDate(s.masteredAt) : ''}
                        </Pill>
                      ) : s.unlocked ? (
                        <Pill tone="indigo">Unlocked</Pill>
                      ) : (
                        <Pill>
                          <LockIcon /> Locked
                        </Pill>
                      )}
                      {s.path === 'proof-only' && <Pill tone="blue">Theory tested out</Pill>}
                    </div>
                    <h2 className="text-xl font-semibold">
                      <Link to={`/levels/${s.level.id}`} className={stretchedLink}>
                        {s.level.title}
                      </Link>
                    </h2>
                    <p className="mt-2 font-medium text-indigo-800 dark:text-indigo-200">
                      {courseArc[s.level.id].question}
                    </p>
                    <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                      {s.level.summary}
                    </p>
                    <p className="mt-3 text-sm">
                      <span className="font-semibold">Evidence you keep: </span>
                      {courseArc[s.level.id].proof}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                      {courseArc[s.level.id].boundary}
                    </p>
                    {!s.unlocked && (
                      <p className="mt-2 text-sm">
                        Unlocks when you finish the required sessions of Level {s.level.id - 1}.
                      </p>
                    )}
                  </div>
                  <div className="w-full shrink-0 sm:w-56">
                    <div className="mb-1 flex justify-between text-sm">
                      <span>
                        {doneParts} of {parts} parts
                      </span>
                      <span className="text-stone-500 dark:text-stone-400">
                        {formatMinutes(minutes)}
                      </span>
                    </div>
                    <ProgressBar
                      value={doneParts}
                      max={parts}
                      label={`Level ${s.level.id} progress`}
                    />
                    <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
                      Badge: {s.level.badge.name}
                    </p>
                    <p className="mt-3 flex items-center justify-end gap-1 text-sm font-semibold whitespace-nowrap text-indigo-700 dark:text-indigo-300">
                      Open level <Chevron className="h-4 w-4 text-current" />
                    </p>
                  </div>
                </div>
              </Card>
            </li>
          )
        })}
      </ol>
    </>
  )
}
