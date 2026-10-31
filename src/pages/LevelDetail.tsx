import { Link, useParams } from 'react-router-dom'
import { levelById } from '../content'
import type { LevelId } from '../content/types'
import { wikiMilestones } from '../content/wiki'
import { formatDate, formatMinutes } from '../domain/dates'
import { QUIZ_PASS_RATIO } from '../domain/progress'
import { useLevelStatus } from '../state/hooks'
import { useStore } from '../state/store'
import { Bullets } from '../ui/RichText'
import {
  Card,
  CheckIcon,
  EmptyState,
  LinkButton,
  LockIcon,
  PageHeader,
  Pill,
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
          status.mastered ? (
            <Pill tone="green">
              <CheckIcon className="h-3 w-3" /> Mastered
            </Pill>
          ) : undefined
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
            Master{' '}
            <Link to={`/levels/${level.id - 1}`} className="underline">
              Level {level.id - 1}
            </Link>{' '}
            first: complete its required sessions, score at least {QUIZ_PASS_RATIO * 100}% on its
            assessment and pass its project. You can still read everything here.
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
              <Card as="li" key={l.id} className="p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link to={`/lessons/${l.id}`} className="font-medium hover:underline">
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
                  <div className="shrink-0 text-sm">
                    {done ? (
                      <Pill tone="green">
                        <CheckIcon className="h-3 w-3" /> Done
                      </Pill>
                    ) : rec?.startedAt ? (
                      <Pill tone="amber">In progress</Pill>
                    ) : (
                      <Pill>Not started</Pill>
                    )}
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
            <Link to="/wiki" className="text-sm underline">
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
              <Card as="li" key={c.id} className="p-4">
                <Link to={`/challenges/${c.id}`} className="font-medium hover:underline">
                  {c.title}
                </Link>
                <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">{c.summary}</p>
                <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
                  <Pill>{formatMinutes(c.minutes)}</Pill>
                  <Pill>{c.suggestedWindow}</Pill>
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
