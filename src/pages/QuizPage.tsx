import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { competencyById } from '../content/competencies'
import { levelById } from '../content'
import { formatDate } from '../domain/dates'
import { QUIZ_PASS_RATIO } from '../domain/progress'
import { shuffled } from '../domain/shuffle'
import type { QuizAttempt } from '../storage/schema'
import { useLevelStatus, useLevelStatuses } from '../state/hooks'
import { newId, useStore } from '../state/store'
import { Columns } from '../ui/charts'
import { inline } from '../ui/RichText'
import {
  Button,
  Card,
  CheckIcon,
  cx,
  EmptyState,
  LinkButton,
  LockIcon,
  PageHeader,
  Pill,
} from '../ui/primitives'

const PASS_PCT = Math.round(QUIZ_PASS_RATIO * 100)

const pct = (a: { correct: number; total: number }) => Math.round((a.correct / a.total) * 100)

export function QuizPage() {
  const { levelId: raw } = useParams()
  // Keyed so local form state resets when the route moves between levels.
  return <QuizPageView key={raw} levelId={Number(raw)} />
}

function QuizPageView({ levelId }: { levelId: number }) {
  const level = levelById(levelId)
  const status = useLevelStatus(levelId)
  const statuses = useLevelStatuses()
  const { update } = useStore()
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<QuizAttempt | null>(null)
  const [showMissing, setShowMissing] = useState(false)
  // Each attempt gets a new question and option order, so retakes test understanding, not recall.
  const [round, setRound] = useState(() => status?.quiz.attempts.length ?? 0)
  const resultRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (result) resultRef.current?.focus()
  }, [result])

  if (!level || !status) {
    return (
      <EmptyState
        title="Assessment not found"
        action={<LinkButton to="/levels">Back to the learning path</LinkButton>}
      >
        There is no level with that number.
      </EmptyState>
    )
  }

  const backLink = (
    <Link
      to={`/levels/${level.id}`}
      className="text-sm font-medium text-indigo-700 hover:underline dark:text-indigo-300"
    >
      Back to Level {level.id}
    </Link>
  )

  if (!status.unlocked) {
    const prev = statuses.find((s) => s.level.id === level.id - 1)
    return (
      <>
        <PageHeader eyebrow={`Level ${level.id} assessment`} title={level.title} />
        <Card>
          <p className="flex items-center gap-2 font-medium">
            <LockIcon /> This assessment is locked
          </p>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
            Level {level.id} unlocks when you finish the required sessions of Level {level.id - 1}
            {prev ? ` (${prev.level.title})` : ''}.
          </p>
          <div className="mt-4">{backLink}</div>
        </Card>
      </>
    )
  }

  const questions = shuffled(level.quiz, `${level.id}-${round}`).map((q) => ({
    ...q,
    options: shuffled(q.options, `${q.id}-${round}`),
  }))
  const answered = questions.filter((q) => answers[q.id]).length
  const complete = answered === questions.length
  const attempts = [...status.quiz.attempts].sort((a, b) => a.at.localeCompare(b.at))
  const best = status.quiz.best

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!complete) {
      setShowMissing(true)
      return
    }
    const attempt: QuizAttempt = {
      id: newId(),
      levelId: level.id,
      answers: { ...answers },
      correct: questions.filter((q) => answers[q.id] === q.correct).length,
      total: questions.length,
      at: new Date().toISOString(),
    }
    update((d) => {
      d.quizAttempts.push(attempt)
    })
    setResult(attempt)
    setShowMissing(false)
  }

  const retake = () => {
    setRound((r) => r + 1)
    setAnswers({})
    setResult(null)
    setShowMissing(false)
    window.scrollTo({ top: 0 })
  }

  const passed = result ? result.correct / result.total >= QUIZ_PASS_RATIO : false

  return (
    <>
      <PageHeader eyebrow={`Level ${level.id} assessment`} title={level.title} actions={backLink}>
        {questions.length} scenario questions. You need {PASS_PCT}% to pass, and you can retake it
        as often as you like. Every answer comes with an explanation.
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card as="div">
          <div className="text-sm text-stone-600 dark:text-stone-400">Best score</div>
          <div className="mt-1 text-2xl font-semibold tabular-nums">
            {best ? `${pct(best)}%` : 'None yet'}
          </div>
          {best && (
            <div className="mt-1 text-xs text-stone-500 dark:text-stone-400">
              {formatDate(best.at)}
            </div>
          )}
        </Card>
        <Card as="div">
          <div className="text-sm text-stone-600 dark:text-stone-400">Attempts</div>
          <div className="mt-1 text-2xl font-semibold tabular-nums">{attempts.length}</div>
        </Card>
        <Card as="div">
          <div className="text-sm text-stone-600 dark:text-stone-400">Status</div>
          <div className="mt-2">
            {status.quiz.passed ? (
              <Pill tone="green">
                <CheckIcon className="h-3 w-3" /> Passed{' '}
                {status.quiz.passedAt ? formatDate(status.quiz.passedAt) : ''}
              </Pill>
            ) : (
              <Pill tone="amber">Not passed yet</Pill>
            )}
          </div>
        </Card>
      </div>

      {result && (
        <Card
          className={cx(
            'mb-6',
            passed
              ? 'border-emerald-300 dark:border-emerald-800'
              : 'border-amber-300 dark:border-amber-800',
          )}
        >
          <h2 ref={resultRef} tabIndex={-1} className="text-xl font-semibold outline-none">
            {passed ? `Passed with ${pct(result)}%` : `${pct(result)}%: not quite yet`}
          </h2>
          <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
            {result.correct} of {result.total} correct.{' '}
            {passed
              ? result.correct === result.total
                ? 'A perfect score. Read the explanations anyway; they hold the nuance.'
                : 'Read the explanations for the ones you missed before moving on.'
              : `You need ${PASS_PCT}%. Read the explanations below, revisit the sessions they point to, then retake it.`}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant={passed ? 'secondary' : 'primary'} onClick={retake}>
              Retake the assessment
            </Button>
            {passed && (
              <LinkButton to={`/levels/${level.id}/project`}>Go to the project</LinkButton>
            )}
          </div>
        </Card>
      )}

      <form onSubmit={submit} noValidate className="space-y-4">
        {questions.map((q, i) => {
          const chosen = (result ? result.answers[q.id] : answers[q.id]) ?? ''
          const missing = showMissing && !answers[q.id]
          const correct = result ? chosen === q.correct : null
          const competency = competencyById[q.competency]
          return (
            <Card
              as="div"
              key={q.id}
              className={cx(missing && 'border-red-300 dark:border-red-800')}
            >
              <fieldset
                disabled={!!result}
                aria-describedby={missing ? `${q.id}-missing` : undefined}
              >
                <legend className="mb-3 font-medium">
                  <span className="mr-2 text-stone-500 dark:text-stone-400">
                    {i + 1}.<span className="sr-only"> of {questions.length}</span>
                  </span>
                  {inline(q.prompt)}
                </legend>
                {competency && (
                  <p className="-mt-1 mb-3 text-xs text-stone-500 dark:text-stone-400">
                    {competency.name}
                  </p>
                )}
                <div className="space-y-2">
                  {q.options.map((o) => {
                    const isChosen = chosen === o.id
                    const isCorrect = o.id === q.correct
                    return (
                      <label
                        key={o.id}
                        className={cx(
                          'flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm',
                          result && isCorrect
                            ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40'
                            : result && isChosen
                              ? 'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/40'
                              : 'border-stone-200 hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-800/50',
                          result && 'cursor-default',
                        )}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          value={o.id}
                          checked={isChosen}
                          onChange={() => setAnswers((a) => ({ ...a, [q.id]: o.id }))}
                          className="mt-0.5 h-4 w-4 shrink-0 accent-indigo-600"
                        />
                        <span className="flex-1">{inline(o.text)}</span>
                        {result && isCorrect && (
                          <span className="text-xs font-medium text-emerald-800 dark:text-emerald-300">
                            Correct answer
                          </span>
                        )}
                        {result && isChosen && !isCorrect && (
                          <span className="text-xs font-medium text-red-700 dark:text-red-300">
                            Your answer
                          </span>
                        )}
                      </label>
                    )
                  })}
                </div>
                {missing && (
                  <p id={`${q.id}-missing`} className="mt-2 text-sm text-red-700 dark:text-red-300">
                    Choose an answer for this question.
                  </p>
                )}
              </fieldset>
              {result && (
                <div className="mt-3 rounded-lg bg-stone-50 p-3 text-sm dark:bg-stone-800/50">
                  <p className="font-medium">{correct ? 'You got this one.' : 'Not this time.'}</p>
                  <p className="mt-1 text-stone-700 dark:text-stone-300">{inline(q.explanation)}</p>
                </div>
              )}
            </Card>
          )
        })}

        {!result && (
          <Card as="div">
            <p className="mb-3 text-sm text-stone-600 dark:text-stone-400" aria-live="polite">
              {answered} of {questions.length} answered.
              {showMissing && !complete ? ' Answer every question before you submit.' : ''}
            </p>
            <Button type="submit">Submit answers</Button>
          </Card>
        )}
      </form>

      {attempts.length > 0 && (
        <Card className="mt-6">
          <Columns
            title="Your attempts"
            description={`Score for each attempt, oldest first. The line marks the ${PASS_PCT}% pass mark.`}
            points={attempts.map((a, i) => ({
              label: `#${i + 1}`,
              value: pct(a),
              detail: `${a.correct} of ${a.total}, ${formatDate(a.at)}`,
            }))}
            format={(v) => `${v}%`}
            max={100}
            reference={{ value: PASS_PCT, label: `Pass ${PASS_PCT}%` }}
            unitLabel="Score"
          />
        </Card>
      )}
    </>
  )
}
