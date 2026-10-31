import { Link, useParams } from 'react-router-dom'
import { levelById } from '../content'
import type { LevelId } from '../content/types'
import { wikiMilestones } from '../content/wiki'
import { formatDate, formatMinutes } from '../domain/dates'
import { QUIZ_PASS_RATIO } from '../domain/progress'
import { useLevelStatus } from '../state/hooks'
import { useStore } from '../state/store'
import { LevelArt } from '../ui/art'
import { Bullets } from '../ui/RichText'
import {
  Card,
  CheckIcon,
  Chevron,
  cx,
  interactiveCard,
  stretchedLink,
  EmptyState,
  LinkButton,
  LockIcon,
  PageHeader,
  Pill,
  linkClass,
} from '../ui/primitives'
import { NotFound } from './NotFound'

export function LevelDetail() {
  const { levelId } = useParams()
  const id = Number(levelId) as LevelId
  const level = levelById(id)
  const status = useLevelStatus(id)
  const { data } = useStore()
  if (!level || !status) return <NotFound />

  const required = new Set(status.requiredLessons.map((l) => l.id))
  const milestone = wikiMilestones.find((m) => m.levelId === level.id)
  const quizPct = status.quiz.bestRatio === null ? null : Math.round(status.quiz.bestRatio * 100)

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={`Level ${level.id}`}
        title={level.title}
        actions={
          <div className="flex items-center gap-3">
            {status.mastered && (
              <Pill tone="green">
                <CheckIcon className="h-3 w-3" /> Mastered
              </Pill>
            )}
            <LevelArt levelId={level.id} className="h-24 w-24" />
          </div>
        }
      >
        {level.summary}
      </PageHeader>

      {!status.unlocked && (
        <Card
          className="border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/40"
          role="note"
        >
          <p className="flex items-center gap-2 font-medium">
            <LockIcon /> This level is locked
          </p>
          <p className="mt-1 text-sm">
            Finish the required sessions of{' '}
            <Link to={`/levels/${level.id - 1}`} className={linkClass}>
              Level {level.id - 1}
            </Link>{' '}
            first. Its assessment and project can stay open while you start here. You can still read
            everything here.
          </p>
        </Card>
      )}

      {status.path === 'proof-only' && (
        <Card as="div" className="border-blue-200 dark:border-blue-900">
          <p className="text-sm">
            Your diagnostic tested you out of this level's theory. Sessions marked optional can be
            skipped; practical-proof and safety-critical sessions, the assessment and the project
            are still required.
          </p>
        </Card>
      )}

      <Card>
        <h2 className="mb-2 text-lg font-semibold">By the end of this level you can</h2>
        <Bullets items={level.outcomes} />
      </Card>

      <section aria-labelledby="sessions-heading">
        <h2 id="sessions-heading" className="mb-3 text-lg font-semibold">
          Sessions
        </h2>
        <ol className="space-y-3">
          {level.lessons.map((l) => {
            const rec = data.lessons[l.id]
            const done = !!rec?.completedAt
            return (
              <Card as="li" key={l.id} className={cx(interactiveCard, 'p-4')}>
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className={cx(
                      'grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 font-mono text-sm font-semibold',
                      done
                        ? 'border-emerald-600 bg-emerald-600 text-white dark:border-emerald-400 dark:bg-emerald-400 dark:text-stone-950'
                        : rec?.startedAt
                          ? 'border-stone-900 bg-mark-300 text-stone-900 dark:border-mark-300 dark:bg-mark-900 dark:text-mark-200'
                          : 'border-stone-300 text-stone-600 dark:border-stone-600 dark:text-stone-300',
                    )}
                  >
                    {done ? <CheckIcon className="h-5 w-5" /> : l.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <Link to={`/lessons/${l.id}`} className={stretchedLink}>
                      Session {l.number}: {l.title}
                    </Link>
                    <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">{l.goal}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
                      <Pill>{formatMinutes(l.minutes)}</Pill>
                      <Pill>{l.difficulty}</Pill>
                      {!required.has(l.id) && <Pill tone="blue">Optional for you</Pill>}
                      {l.practicalProof && <Pill tone="indigo">Practical proof</Pill>}
                      {l.safetyCritical && <Pill tone="red">Safety critical</Pill>}
                      {l.mentorReview === 'required' && <Pill tone="amber">Mentor review</Pill>}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 self-center text-sm">
                    <span
                      className={cx(
                        'hidden text-xs font-medium sm:inline',
                        done
                          ? 'text-emerald-700 dark:text-emerald-300'
                          : 'text-stone-600 dark:text-stone-400',
                      )}
                    >
                      {done ? 'Done' : rec?.startedAt ? 'In progress' : 'Not started'}
                    </span>
                    <span className="sr-only sm:hidden">
                      {done ? 'Done' : rec?.startedAt ? 'In progress' : 'Not started'}
                    </span>
                    <Chevron />
                  </div>
                </div>
              </Card>
            )
          })}
        </ol>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold">Level assessment</h2>
          <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
            {level.quiz.length} scenario questions. Pass mark {QUIZ_PASS_RATIO * 100}%. Retake as
            often as you like; every answer is explained.
          </p>
          <p className="mt-3 text-sm">
            {status.quiz.passed ? (
              <Pill tone="green">
                Passed {status.quiz.passedAt ? formatDate(status.quiz.passedAt) : ''}
              </Pill>
            ) : quizPct !== null ? (
              <>
                Best so far: {quizPct}% over {status.quiz.attempts.length} attempt
                {status.quiz.attempts.length === 1 ? '' : 's'}
              </>
            ) : (
              'Not attempted yet'
            )}
          </p>
          <div className="mt-4">
            <LinkButton
              to={`/levels/${level.id}/quiz`}
              variant={status.quiz.passed ? 'secondary' : 'primary'}
            >
              {status.quiz.attempts.length ? 'Retake assessment' : 'Take assessment'}
            </LinkButton>
          </div>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Project: {level.project.title}</h2>
          <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
            {status.project.deliverablesDone} of {level.project.deliverables.length} deliverables,
            about {formatMinutes(level.project.minutes)}. Scored on correctness, quality,
            independence and judgment.
          </p>
          <p className="mt-3 text-sm">
            {status.project.passed ? (
              <Pill tone="green">
                Passed{status.project.assessedBy === 'mentor' ? ', mentor assessed' : ''}
              </Pill>
            ) : status.project.assessed ? (
              <>Scored {status.project.avg.toFixed(1)} average, not yet passing</>
            ) : (
              'Not assessed yet'
            )}
          </p>
          <div className="mt-4">
            <LinkButton
              to={`/levels/${level.id}/project`}
              variant={status.project.passed ? 'secondary' : 'primary'}
            >
              Open project
            </LinkButton>
          </div>
        </Card>
      </div>

      {milestone && (
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-semibold">Wiki milestone: {milestone.name}</h2>
            <Link to="/wiki" className={`text-sm ${linkClass}`}>
              Your wiki guide
            </Link>
          </div>
          <p className="mt-1 text-stone-600 dark:text-stone-400">{milestone.summary}</p>
          <div className="mt-3">
            <Bullets items={milestone.checks} />
          </div>
        </Card>
      )}

      <section aria-labelledby="challenges-heading">
        <h2 id="challenges-heading" className="mb-1 text-lg font-semibold">
          Optional challenges
        </h2>
        <p className="mb-3 text-sm text-stone-600 dark:text-stone-400">
          For after the core course, or whenever you want more depth. They earn XP but never gate
          progress.
        </p>
        {level.challenges.length ? (
          <ul className="grid gap-3 md:grid-cols-2">
            {level.challenges.map((c) => (
              <Card as="li" key={c.id} className={cx(interactiveCard, 'p-4')}>
                <div className="flex items-start justify-between gap-3">
                  <Link to={`/challenges/${c.id}`} className={stretchedLink}>
                    {c.title}
                  </Link>
                  <Chevron />
                </div>
                <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">{c.summary}</p>
                <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
                  <Pill>{formatMinutes(c.minutes)}</Pill>
                  <Pill>Optional</Pill>
                  {data.challenges[c.id]?.completedAt && <Pill tone="green">Done</Pill>}
                </div>
              </Card>
            ))}
          </ul>
        ) : (
          <EmptyState title="No challenges for this level" />
        )}
      </section>
    </div>
  )
}
