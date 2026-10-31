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
  ProgressBar,
  staticTile,
  linkClass,
} from '../ui/primitives'

const PASS_PCT = Math.round(QUIZ_PASS_RATIO * 100)

const pct = (a: { correct: number; total: number }) => Math.round((a.correct / a.total) * 100)

function QuizSidePanel({
  questions,
  answers,
  result,
}: {
  questions: { id: string; correct: string; competency: string }[]
  answers: Record<string, string>
  result: QuizAttempt | null
}) {
  const answered = questions.filter((q) => answers[q.id]).length
  const comps = [...new Set(questions.map((q) => q.competency))]
  const jump = (id: string) => {
    const el = document.getElementById(`q-${id}`)
    if (!el) return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    el.focus({ preventScroll: true })
  }
  return (
    <aside aria-label="Assessment progress" className="lg:sticky lg:top-8">
      <Card as="div" className="space-y-5">
        <div>
          <div className="mb-2 flex items-baseline justify-between text-sm">
            <span className="font-semibold">{result ? 'Your answers' : 'Progress'}</span>
            <span className="text-stone-600 tabular-nums dark:text-stone-400">
              {result
                ? `${result.correct} of ${result.total} correct`
                : `${answered} of ${questions.length}`}
            </span>
          </div>
          <ProgressBar
            value={result ? result.correct : answered}
            max={questions.length}
            label={result ? 'Correct answers' : 'Questions answered'}
          />
        </div>
        <div>
          <p className="mb-2 font-mono text-[0.7rem] tracking-[0.12em] text-stone-600 uppercase dark:text-stone-400">
            Questions
          </p>
          <ol className="grid grid-cols-6 gap-1.5">
            {questions.map((q, i) => {
              const a = answers[q.id]
              const right = result ? a === q.correct : null
              return (
                <li key={q.id}>
                  <button
                    type="button"
                    onClick={() => jump(q.id)}
                    aria-label={`Question ${i + 1}: ${result ? (right ? 'correct' : 'incorrect') : a ? 'answered' : 'not answered'}`}
                    className={cx(
                      'grid h-8 w-full cursor-pointer place-items-center rounded-md border font-mono text-xs font-semibold transition-colors',
                      result
                        ? right
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800 dark:border-emerald-500 dark:bg-emerald-950 dark:text-emerald-200'
                          : 'border-red-500 bg-red-50 text-red-800 dark:border-red-500 dark:bg-red-950 dark:text-red-200'
                        : a
                          ? 'border-indigo-600 bg-indigo-600 text-white dark:border-indigo-400 dark:bg-indigo-400 dark:text-stone-950'
                          : 'border-stone-300 bg-white text-stone-700 shadow-[0_1px_0_var(--n-300)] hover:border-indigo-400 hover:text-indigo-800 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-300 dark:shadow-none dark:hover:text-indigo-200',
                    )}
                  >
                    {result ? (
                      right ? (
                        <CheckIcon className="h-3.5 w-3.5" />
                      ) : (
                        <svg
                          aria-hidden
                          viewBox="0 0 20 20"
                          className="h-3.5 w-3.5"
                          stroke="currentColor"
                          strokeWidth={2.2}
                          strokeLinecap="round"
                        >
                          <path d="M5.5 5.5l9 9M14.5 5.5l-9 9" />
                        </svg>
                      )
                    ) : (
                      i + 1
                    )}
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
        <div>
          <p className="mb-2 font-mono text-[0.7rem] tracking-[0.12em] text-stone-600 uppercase dark:text-stone-400">
            Competencies tested
          </p>
          <ul className="space-y-1.5 text-sm">
            {comps.map((c) => {
              const qs = questions.filter((q) => q.competency === c)
              const done = result
                ? qs.every((q) => answers[q.id] === q.correct)
                : qs.every((q) => answers[q.id])
              return (
                <li key={c} className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="grid h-4 w-4 shrink-0 place-items-center text-emerald-700 dark:text-emerald-300"
                  >
                    {done ? (
                      <CheckIcon className="h-4 w-4" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-stone-400 dark:bg-stone-500" />
                    )}
                  </span>
                  <span className={done ? '' : 'text-stone-600 dark:text-stone-400'}>
                    {competencyById[c as keyof typeof competencyById]?.name ?? c}
                  </span>
                  <span className="sr-only">
                    {done ? (result ? ': all correct' : ': answered') : ''}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </Card>
    </aside>
  )
}

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
    <Link to={`/levels/${level.id}`} className={`text-sm ${linkClass}`}>
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

      <div className="mb-6 grid grid-cols-3 gap-2 sm:gap-4">
        <div className={cx(staticTile, 'rounded-xl p-3 sm:p-4')}>
          <div className="font-mono text-[0.7rem] font-medium tracking-[0.12em] text-stone-600 uppercase dark:text-stone-400">
            Best score
          </div>
          <div className="mt-1 text-xl font-semibold tabular-nums sm:text-2xl">
            {best ? `${pct(best)}%` : 'None yet'}
          </div>
          {best && (
            <div className="mt-1 text-xs text-stone-500 dark:text-stone-400">
              {formatDate(best.at)}
            </div>
          )}
        </div>
        <div className={cx(staticTile, 'rounded-xl p-3 sm:p-4')}>
          <div className="font-mono text-[0.7rem] font-medium tracking-[0.12em] text-stone-600 uppercase dark:text-stone-400">
            Attempts
          </div>
          <div className="mt-1 text-xl font-semibold tabular-nums sm:text-2xl">
            {attempts.length}
          </div>
        </div>
        <div className={cx(staticTile, 'rounded-xl p-3 sm:p-4')}>
          <div className="font-mono text-[0.7rem] font-medium tracking-[0.12em] text-stone-600 uppercase dark:text-stone-400">
            Status
          </div>
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
        </div>
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

      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start">
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
                id={`q-${q.id}`}
                tabIndex={-1}
                className={cx(
                  'scroll-mt-24 outline-none',
                  missing && 'border-red-300 dark:border-red-800',
                )}
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
                            'flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm transition-colors',
                            result && isCorrect
                              ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40'
                              : result && isChosen
                                ? 'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/40'
                                : 'border-stone-200 hover:border-indigo-300 hover:bg-indigo-50/50 has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50 dark:border-stone-800 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/40 dark:has-[:checked]:border-indigo-400 dark:has-[:checked]:bg-indigo-950',
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
                    <p
                      id={`${q.id}-missing`}
                      className="mt-2 text-sm text-red-700 dark:text-red-300"
                    >
                      Choose an answer for this question.
                    </p>
                  )}
                </fieldset>
                {result && (
                  <div className="mt-3 rounded-lg bg-stone-50 p-3 text-sm dark:bg-stone-800/50">
                    <p className="font-medium">
                      {correct ? 'You got this one.' : 'Not this time.'}
                    </p>
                    <p className="mt-1 text-stone-700 dark:text-stone-300">
                      {inline(q.explanation)}
                    </p>
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
        <QuizSidePanel
          questions={questions}
          answers={result ? result.answers : answers}
          result={result}
        />
      </div>

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
