import { useState } from 'react'
import type { LessonGuide } from '../content/teaching'
import { inline, Paragraphs } from './RichText'
import { Card, cx } from './primitives'

export function SessionBrief({ guide, minutes }: { guide: LessonGuide; minutes: number }) {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 dark:border-stone-800 dark:bg-stone-900">
      <h2 className="max-w-2xl text-xl font-semibold tracking-tight">{guide.decision}</h2>
      <p className="mt-3 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
        <strong>Bring: </strong>
        {guide.bring}
      </p>
      <p className="mt-2 text-xs text-stone-600 dark:text-stone-400">
        Plan about {minutes} minutes, including {guide.reading.minutes} minutes for the assigned
        source.
      </p>
      <details className="mt-4">
        <summary className="cursor-pointer font-medium">
          Before you start: recall and compare
        </summary>
        <p className="mt-3 text-sm leading-relaxed">{guide.recall.question}</p>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-medium text-indigo-800 dark:text-indigo-200">
            Think without notes, then reveal a comparison
          </summary>
          <p className="mt-2 max-w-prose text-sm leading-relaxed text-stone-700 dark:text-stone-300">
            {guide.recall.answer}
          </p>
        </details>
      </details>
    </section>
  )
}

export function WorkedExample({ guide }: { guide: LessonGuide }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
      <div className="border-b border-stone-200 px-5 py-4 sm:px-7 dark:border-stone-700">
        <p className="text-xs font-semibold tracking-widest text-stone-600 uppercase dark:text-stone-300">
          Worked example · invented for practice
        </p>
        <h2 className="mt-1 text-xl font-semibold">{guide.example.title}</h2>
      </div>
      <div className="space-y-5 p-5 sm:p-7">
        <Paragraphs items={[guide.example.situation]} />
        <ol className="space-y-4">
          {guide.example.reasoning.map((step, i) => (
            <li key={step.label} className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-3">
              <span
                aria-hidden
                className="pt-0.5 font-mono text-xs text-stone-500 dark:text-stone-400"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-semibold">{step.label}</h3>
                <p className="mt-1 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                  {inline(step.text)}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <p className="border-t border-stone-200 pt-4 text-sm font-medium leading-relaxed dark:border-stone-700">
          {guide.example.takeaway}
        </p>
      </div>
    </section>
  )
}

export function DecisionPractice({ guide }: { guide: LessonGuide }) {
  const [choice, setChoice] = useState<string | null>(null)
  const selected = guide.checkpoint.options.find((o) => o.id === choice)
  const correct = choice === guide.checkpoint.correct
  return (
    <Card>
      <p className="mb-2 text-xs font-semibold tracking-widest text-stone-600 uppercase dark:text-stone-300">
        Your call · practise before asking AI
      </p>
      <h2 className="text-lg font-semibold">{guide.checkpoint.question}</h2>
      <div className="mt-4 grid gap-2" role="group" aria-label="Decision practice">
        {guide.checkpoint.options.map((option) => (
          <button
            type="button"
            key={option.id}
            aria-pressed={choice === option.id}
            onClick={() => setChoice(option.id)}
            className={cx(
              'flex min-h-12 cursor-pointer items-start gap-3 rounded-xl border p-3 text-left text-sm leading-relaxed transition-colors',
              choice === option.id
                ? 'border-indigo-600 bg-indigo-50 text-indigo-950 dark:border-indigo-400 dark:bg-indigo-950 dark:text-indigo-100'
                : 'border-stone-300 bg-white hover:border-indigo-500 dark:border-stone-700 dark:bg-stone-950 dark:hover:border-indigo-400',
            )}
          >
            <span aria-hidden className="pt-0.5 font-mono text-xs uppercase">
              {option.id}
            </span>
            <span>{option.text}</span>
          </button>
        ))}
      </div>
      <div aria-live="polite" aria-atomic="true" className="mt-4 min-h-24">
        {selected ? (
          <div
            key={choice}
            className="animate-pop-in rounded-xl bg-stone-100 p-4 text-sm leading-relaxed dark:bg-stone-800"
          >
            <p className="mb-1 font-semibold">
              {correct ? 'Good judgement' : 'Reconsider the evidence'}
            </p>
            <p>{selected.feedback}</p>
          </div>
        ) : (
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Choose a response to see the reasoning. This is practice, with no grade or XP.
          </p>
        )}
      </div>
    </Card>
  )
}
