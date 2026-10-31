import { Link } from 'react-router-dom'
import type { LevelStatus } from '../domain/progress'
import { LevelArt } from './art'
import { levelShortName } from './levelNames'
import { CheckIcon, LockIcon, cx } from './primitives'

/** The five levels as a row of stops. Every stop opens its level, locked ones included. */
export function LevelPath({ statuses, currentId }: { statuses: LevelStatus[]; currentId: number }) {
  return (
    <nav aria-label="Levels" className="relative -mx-1 overflow-x-auto px-1 pb-1">
      <ol className="grid min-w-[40rem] grid-cols-5 gap-3">
        {statuses.map((s, i) => {
          const isCurrent = s.level.id === currentId
          const state = s.mastered
            ? 'Mastered'
            : isCurrent
              ? 'You are here'
              : s.unlocked
                ? 'Open'
                : 'Locked'
          return (
            <li key={s.level.id} className="relative">
              {i > 0 && (
                <span
                  aria-hidden
                  className={cx(
                    'absolute top-9 -left-3 h-0.5 w-3',
                    statuses[i - 1]!.mastered ? 'bg-emerald-500' : 'bg-stone-300 dark:bg-stone-700',
                  )}
                />
              )}
              <Link
                to={`/levels/${s.level.id}`}
                aria-current={isCurrent ? 'step' : undefined}
                className={cx(
                  'group flex h-full flex-col items-center rounded-xl border px-2 pt-3 pb-3 text-center transition-[border-color,box-shadow,transform] duration-200 hover:shadow-[0_6px_20px_-8px_rgb(0_0_0/0.18)] motion-safe:hover:-translate-y-0.5',
                  isCurrent
                    ? 'border-indigo-400 bg-white ring-1 ring-indigo-400 dark:border-indigo-500 dark:bg-stone-900 dark:ring-indigo-500'
                    : 'border-stone-200 bg-white hover:border-indigo-300 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-indigo-700',
                )}
              >
                <LevelArt
                  levelId={s.level.id}
                  className={cx('h-12 w-12', !s.unlocked && 'opacity-50 grayscale')}
                />
                <span className="mt-2 font-mono text-[0.65rem] tracking-[0.12em] text-stone-600 uppercase dark:text-stone-400">
                  Level {s.level.id}
                </span>
                <span className="mt-0.5 text-sm leading-snug font-semibold text-stone-900 group-hover:text-indigo-700 dark:text-stone-50 dark:group-hover:text-indigo-300">
                  {levelShortName[s.level.id]}
                </span>
                <span
                  className={cx(
                    'mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.7rem] font-semibold',
                    s.mastered
                      ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : isCurrent
                        ? 'bg-mark-200 text-stone-900 dark:bg-mark-900 dark:text-mark-200'
                        : s.unlocked
                          ? 'bg-indigo-50 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200'
                          : 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300',
                  )}
                >
                  {s.mastered ? (
                    <CheckIcon className="h-3 w-3" />
                  ) : !s.unlocked ? (
                    <LockIcon />
                  ) : isCurrent ? (
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full bg-stone-900 dark:bg-mark-300"
                    />
                  ) : null}
                  {state}
                </span>
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
