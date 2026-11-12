import { useState } from 'react'
import type { LessonGuide } from '../content/teaching'
import type { PracticeFile, Resource } from '../content/types'
import { inline, Paragraphs } from './RichText'
import { Card, Pill, cx, linkClass } from './primitives'

export function SessionBrief({
  guide,
  minutes,
  whyItMatters,
  readingResource,
}: {
  guide: LessonGuide
  minutes: number
  whyItMatters: string
  readingResource?: Resource
}) {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 dark:border-stone-800 dark:bg-stone-900">
      <h2 className="text-xl font-semibold tracking-tight">{guide.decision}</h2>
      <p className="mt-2 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
        {inline(whyItMatters)}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
        <strong>Bring: </strong>
        {guide.bring}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-stone-600 dark:text-stone-400">
        <Pill tone="indigo">Assigned reading: {guide.reading.minutes} min</Pill>
        {readingResource && (
          <a
            href={readingResource.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm ${linkClass}`}
          >
            {readingResource.title}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
        <span>· Plan about {minutes} minutes total.</span>
      </div>
      <details className="mt-4 rounded-xl bg-stone-100 px-4 py-3 text-sm dark:bg-stone-800/60">
        <summary className="cursor-pointer leading-relaxed">
          <span className="font-semibold">Warm-up · </span>
          {guide.recall.question}
        </summary>
        <p className="mt-2 leading-relaxed text-stone-700 dark:text-stone-300">
          {inline(guide.recall.answer)}
        </p>
      </details>
    </section>
  )
}

export function PracticeFiles({ files }: { files: PracticeFile[] }) {
  const openFiles = files.filter((f) => !f.sealed)
  const sealedFiles = files.filter((f) => f.sealed)
  return (
    <Card>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">Practice files for this session</h2>
        <Pill tone="amber">Practice data</Pill>
      </div>
      <p className="text-sm text-stone-600 dark:text-stone-400">
        Fictional MoneyPilot files checked into this course so you can focus on the PM work rather
        than inventing sample data.
      </p>
      {openFiles.length > 0 && (
        <ul className="mt-3 space-y-2 text-sm">
          {openFiles.map((f) => (
            <li key={f.path}>
              <a
                href={`${import.meta.env.BASE_URL}${f.path}`}
                download
                className={`font-medium ${linkClass}`}
              >
                {f.label}
              </a>
              <span className="text-stone-600 dark:text-stone-400"> · {f.note}</span>
            </li>
          ))}
        </ul>
      )}
      {sealedFiles.length > 0 && (
        <details className="mt-4 rounded-xl bg-stone-100 px-4 py-3 text-sm dark:bg-stone-800/60">
          <summary className="cursor-pointer font-medium">
            Check step only: answer key (open after your own pass)
          </summary>
          <ul className="mt-2 space-y-2">
            {sealedFiles.map((f) => (
              <li key={f.path}>
                <a
                  href={`${import.meta.env.BASE_URL}${f.path}`}
                  download
                  className={`font-medium ${linkClass}`}
                >
                  {f.label}
                </a>
                <span className="text-stone-600 dark:text-stone-400"> · {f.note}</span>
              </li>
            ))}
          </ul>
        </details>
      )}
    </Card>
  )
}

export function WorkedExample({ guide }: { guide: LessonGuide }) {
  if (!guide.example) return null
  return (
    <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
      <div className="border-b border-stone-200 px-5 py-4 sm:px-7 dark:border-stone-700">
        <p className="text-xs font-semibold tracking-widest text-stone-600 uppercase dark:text-stone-300">
          Example
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
          {inline(guide.example.takeaway)}
        </p>
      </div>
    </section>
  )
}

export function DecisionPractice({ guide }: { guide: LessonGuide }) {
  const [choice, setChoice] = useState<string | null>(null)
  if (!guide.checkpoint) return null
  const checkpoint = guide.checkpoint
  const selected = checkpoint.options.find((o) => o.id === choice)
  const correct = choice === checkpoint.correct
  return (
    <Card>
      <p className="mb-2 text-xs font-semibold tracking-widest text-stone-600 uppercase dark:text-stone-300">
        Quick check
      </p>
      <h2 className="text-lg font-semibold">{inline(checkpoint.question)}</h2>
      <div className="mt-4 grid gap-2" role="group" aria-label="Quick check answers">
        {checkpoint.options.map((option) => (
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
            <span>{inline(option.text)}</span>
          </button>
        ))}
      </div>
      <div aria-live="polite" aria-atomic="true" className="mt-4 min-h-24">
        {selected ? (
          <div
            key={choice}
            className="animate-pop-in rounded-xl bg-stone-100 p-4 text-sm leading-relaxed dark:bg-stone-800"
          >
            <p className="mb-1 font-semibold">{correct ? 'Right' : 'Not quite'}</p>
            <p>{inline(selected.feedback)}</p>
          </div>
        ) : (
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Pick an answer to see why. It does not count towards your progress.
          </p>
        )}
      </div>
    </Card>
  )
}
