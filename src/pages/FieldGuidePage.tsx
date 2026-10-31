import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { challengeById, lessonById, levelById, resourceById } from '../content'
import {
  FIELD_GUIDE_AS_OF,
  FIELD_GUIDE_AS_OF_LABEL,
  fieldGuide as g,
  type LayerScenario,
} from '../content/fieldGuide'
import { CopyButton } from '../ui/CopyButton'
import { Card, LinkButton, PageHeader, Pill, cx, linkClass } from '../ui/primitives'
import { Bullets, Paragraphs, inline } from '../ui/RichText'

const layerLabels: Record<LayerScenario['correct'], string> = {
  brief: 'Your brief or context',
  model: 'The model',
  agent: 'The agent',
}

function SessionLinks({ lessons, challenges }: { lessons: string[]; challenges?: string[] }) {
  const items = [
    ...lessons.map((id) => {
      const l = lessonById(id)
      return l ? { key: id, to: `/lessons/${id}`, label: `${l.number}. ${l.title}` } : null
    }),
    ...(challenges ?? []).map((id) => {
      const c = challengeById(id)
      return c ? { key: id, to: `/challenges/${id}`, label: `Challenge: ${c.title}` } : null
    }),
  ].filter((x) => x !== null)
  return (
    <ul className="space-y-0.5">
      {items.map((i) => (
        <li key={i.key}>
          <Link to={i.to} className={linkClass}>
            {i.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

function SourceLinks({ ids }: { ids: string[] }) {
  return (
    <>
      {ids.map((id, n) => {
        const r = resourceById(id)
        if (!r) return null
        return (
          <Fragment key={id}>
            {n > 0 && ', '}
            <a href={r.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {r.title}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Fragment>
        )
      })}
    </>
  )
}

function Scenario({ s, n }: { s: LayerScenario; n: number }) {
  const [choice, setChoice] = useState<LayerScenario['correct'] | null>(null)
  return (
    <li className="rounded-xl border border-stone-200 p-4 dark:border-stone-800">
      <p className="text-sm leading-relaxed">
        <span className="mr-2 font-mono text-xs text-stone-500 dark:text-stone-400">{n}</span>
        {inline(s.situation)}
      </p>
      <div
        className="mt-3 flex flex-wrap gap-2"
        role="group"
        aria-label={`Which layer let you down in situation ${n}?`}
      >
        {(['brief', 'model', 'agent'] as const).map((option) => (
          <button
            type="button"
            key={option}
            aria-pressed={choice === option}
            onClick={() => setChoice(option)}
            className={cx(
              'min-h-10 cursor-pointer rounded-lg border px-3 py-1.5 text-sm transition-colors',
              choice === option
                ? 'border-indigo-600 bg-indigo-50 text-indigo-950 dark:border-indigo-400 dark:bg-indigo-950 dark:text-indigo-100'
                : 'border-stone-300 bg-white hover:border-indigo-500 dark:border-stone-700 dark:bg-stone-950 dark:hover:border-indigo-400',
            )}
          >
            {layerLabels[option]}
          </button>
        ))}
      </div>
      <div aria-live="polite" aria-atomic="true">
        {choice && (
          <div
            key={choice}
            className="animate-pop-in mt-3 rounded-lg bg-stone-100 p-3 text-sm leading-relaxed dark:bg-stone-800"
          >
            <p className="mb-1 font-semibold">
              {choice === s.correct ? 'Good diagnosis' : 'Look at another layer'}
            </p>
            <p>{inline(s.feedback[choice])}</p>
          </div>
        )}
      </div>
    </li>
  )
}

function SectionHeading({
  id,
  eyebrow,
  children,
}: {
  id: string
  eyebrow: string
  children: string
}) {
  return (
    <div className="mb-3">
      <p className="mb-1 font-mono text-xs font-medium tracking-[0.14em] text-stone-600 uppercase dark:text-stone-400">
        {eyebrow}
      </p>
      <h2 id={id} className="text-xl font-semibold tracking-tight">
        {children}
      </h2>
    </div>
  )
}

function EffortGuide() {
  const [selected, setSelected] = useState(0)
  const example = g.effort.tasks[selected]!
  return (
    <div className="mt-6 border-t border-stone-200 pt-5 dark:border-stone-800">
      <h3 className="text-lg font-semibold">Then choose effort</h3>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed">{g.effort.intro}</p>
      <ol className="mt-4 grid gap-4 sm:grid-cols-3">
        {g.effort.levels.map((level, i) => (
          <li key={level.name}>
            <div className="mb-2 flex gap-1" aria-hidden="true">
              {[0, 1, 2].map((step) => (
                <span
                  key={step}
                  className={cx(
                    'h-1 w-8 rounded-full',
                    step <= i ? 'bg-stone-600 dark:bg-stone-300' : 'bg-stone-200 dark:bg-stone-700',
                  )}
                />
              ))}
            </div>
            <h4 className="font-semibold">{level.name}</h4>
            <p className="text-sm font-medium">{level.meaning}</p>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">{level.example}</p>
          </li>
        ))}
      </ol>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed">{g.effort.extra}</p>

      <h4 className="mt-5 font-semibold">Try a PM task</h4>
      <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
        Suggested starting points to compare, not tested rankings.
      </p>
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Choose a PM task">
        {g.effort.tasks.map((task, i) => (
          <button
            key={task.name}
            type="button"
            aria-pressed={selected === i}
            aria-controls="fg-task-example"
            onClick={() => setSelected(i)}
            className={cx(
              'min-h-10 cursor-pointer rounded-lg border px-3 py-1.5 text-sm transition-colors',
              selected === i
                ? 'border-indigo-600 bg-indigo-50 text-indigo-950 dark:border-indigo-400 dark:bg-indigo-950 dark:text-indigo-100'
                : 'border-stone-300 hover:border-indigo-500 dark:border-stone-700 dark:hover:border-indigo-400',
            )}
          >
            {task.name}
          </button>
        ))}
      </div>
      <div
        id="fg-task-example"
        aria-live="polite"
        aria-atomic="true"
        className="mt-3 rounded-xl bg-stone-100 p-4 dark:bg-stone-800/60"
      >
        <div key={selected} className="motion-safe:animate-pop-in">
          <h5 className="sr-only">{example.name}</h5>
          <dl className="grid gap-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div>
              <dt className="text-xs text-stone-600 dark:text-stone-400">Model</dt>
              <dd className="mt-1 font-semibold">{example.model}</dd>
            </div>
            <div>
              <dt className="text-xs text-stone-600 dark:text-stone-400">Effort</dt>
              <dd className="mt-1 font-semibold">{example.effort}</dd>
            </div>
          </dl>
          <p className="mt-3 text-sm leading-relaxed">{example.why}</p>
          <p className="mt-2 text-sm leading-relaxed">
            <span className="font-semibold">Check the result: </span>
            {example.check}
          </p>
        </div>
      </div>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed">{g.effort.method}</p>
      <details className="mt-4 text-sm">
        <summary className="cursor-pointer py-2 font-medium">
          Where to change it, and current defaults
        </summary>
        <p className="mt-1 max-w-3xl leading-relaxed">{inline(g.effort.defaults)}</p>
      </details>
      <p className="mt-3 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
        Official effort and model documentation: <SourceLinks ids={g.effort.resourceIds} />
      </p>
    </div>
  )
}

const th = 'py-2 pr-4 text-left align-bottom font-semibold'
const td = 'py-2 pr-4 align-top text-stone-700 dark:text-stone-300'
const row = 'border-b border-stone-100 last:border-0 dark:border-stone-800'

export function FieldGuidePage() {
  return (
    <>
      <PageHeader
        eyebrow="After Level 1, before Session 5"
        title="Field guide: models, agents and today's tools"
      >
        What you are actually using when you use AI, who makes it, and how a PM puts it to work.
        Dated facts were checked on{' '}
        <time dateTime={FIELD_GUIDE_AS_OF}>{FIELD_GUIDE_AS_OF_LABEL}</time>.
      </PageHeader>

      <div className="space-y-6">
        <Card>
          <div className="max-w-3xl space-y-3 text-stone-700 dark:text-stone-300">
            <Paragraphs items={g.intro} />
            <button
              type="button"
              className={cx(linkClass, 'min-h-10 cursor-pointer text-left text-sm')}
              onClick={() => {
                const heading = document.getElementById('fg-landscape')
                heading?.focus({ preventScroll: true })
                heading?.scrollIntoView({ block: 'start' })
              }}
            >
              Go to model choices and effort settings
            </button>
          </div>
        </Card>

        {/* 1. Quick orientation */}
        <Card as="section" aria-labelledby="fg-layers">
          <SectionHeading id="fg-layers" eyebrow="1 · Lasts">
            Quick orientation
          </SectionHeading>
          <p className="mb-4 max-w-3xl leading-relaxed">{inline(g.layersIntro)}</p>
          <ol className="grid gap-3 md:grid-cols-3">
            {g.layers.map((l) => (
              <li
                key={l.name}
                className="rounded-xl bg-stone-100 p-4 text-sm leading-relaxed dark:bg-stone-800/60"
              >
                <p className="font-mono text-xs text-stone-600 dark:text-stone-400">{l.analogy}</p>
                <h3 className="mt-1 text-lg font-semibold">{l.name}</h3>
                <p className="mt-2">{l.what}</p>
                <p className="mt-2 text-stone-600 dark:text-stone-400">
                  <span className="font-medium text-stone-800 dark:text-stone-200">Examples: </span>
                  {l.examples}
                </p>
              </li>
            ))}
          </ol>
          <details className="mt-4">
            <summary className="min-h-10 cursor-pointer py-2 font-semibold">
              Diagnose a disappointing result: three practice cases
            </summary>
            <p className="mt-2 mb-3 text-sm text-stone-600 dark:text-stone-400">
              {g.scenariosIntro} Practice only, with no grade or XP.
            </p>
            <ol className="space-y-3">
              {g.scenarios.map((s, i) => (
                <Scenario key={s.id} s={s} n={i + 1} />
              ))}
            </ol>
          </details>
        </Card>

        {/* 2. Landscape */}
        <Card as="section" aria-labelledby="fg-landscape">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="mb-1 font-mono text-xs font-medium tracking-[0.14em] text-stone-600 uppercase dark:text-stone-400">
                2 · Dates fast
              </p>
              <h2
                id="fg-landscape"
                tabIndex={-1}
                className="scroll-mt-20 text-xl font-semibold tracking-tight"
              >
                Choose a model, then choose effort
              </h2>
            </div>
            <Pill tone="amber">
              <span>
                As of <time dateTime={FIELD_GUIDE_AS_OF}>{FIELD_GUIDE_AS_OF_LABEL}</time>
              </span>
            </Pill>
          </div>
          <div className="mt-3 max-w-3xl">
            <Paragraphs items={g.landscapeIntro} />
          </div>
          <div className="mt-5 divide-y divide-stone-200 dark:divide-stone-800">
            {g.labs.map((lab) => (
              <section
                key={lab.company}
                aria-label={`${lab.company} models and tools`}
                className="py-5 first:pt-0"
              >
                <h3 className="text-lg font-semibold">{lab.company}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed">{lab.modelIntro}</p>
                <ul className="mt-3 grid gap-5 md:grid-cols-3">
                  {lab.models.map((model) => (
                    <li key={model.name}>
                      <h4 className="text-lg font-semibold tracking-tight">{model.name}</h4>
                      <p className="mt-1 text-xs font-medium text-stone-600 dark:text-stone-400">
                        {model.role}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed">{model.useFor}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                  {lab.also}
                </p>
                <dl className="mt-3 grid gap-3 rounded-lg bg-stone-100 p-3 text-sm sm:grid-cols-2 dark:bg-stone-800/60">
                  <div>
                    <dt className="font-semibold">Assistant</dt>
                    <dd className="mt-1 leading-relaxed">{lab.assistant}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Agent for building</dt>
                    <dd className="mt-1 leading-relaxed">{lab.agent}</dd>
                  </div>
                </dl>
                <p className="mt-3 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                  Sources: <SourceLinks ids={lab.resourceIds} />
                </p>
              </section>
            ))}
          </div>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-600 dark:text-stone-400">
            {g.modelChoiceNote}
          </p>

          <EffortGuide />

          <h3 className="mt-6 mb-2 text-lg font-semibold">{g.othersHeading}</h3>
          <div className="max-w-3xl text-sm">
            <Bullets items={g.others} />
          </div>

          <h3 className="mt-6 mb-2 text-lg font-semibold">{g.usageHeading}</h3>
          <ul className="grid gap-3 md:grid-cols-2">
            {g.usage.map((u) => (
              <li
                key={u.resourceId}
                className="rounded-xl bg-stone-100 p-4 text-sm leading-relaxed dark:bg-stone-800/60"
              >
                <p className="font-display text-3xl font-bold tracking-tight">{u.figure}</p>
                <p className="mt-1">{u.text}</p>
                <p className="mt-2 text-xs text-stone-600 dark:text-stone-400">
                  Source: <SourceLinks ids={[u.resourceId]} />
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-3 max-w-3xl text-sm text-stone-600 dark:text-stone-400">
            {g.usageCaveat}
          </p>

          <h3 className="mt-6 mb-2 text-lg font-semibold">{g.trendsHeading}</h3>
          <ol className="space-y-3">
            {g.trends.map((t, i) => (
              <li
                key={t.title}
                className="rounded-xl border border-stone-200 p-4 dark:border-stone-800"
              >
                <h4 className="font-semibold">
                  <span className="mr-2 font-mono text-xs text-stone-500 dark:text-stone-400">
                    {i + 1}
                  </span>
                  {t.title}
                </h4>
                <p className="mt-1 text-sm leading-relaxed">{t.evidence}</p>
                <p className="mt-2 text-sm leading-relaxed">
                  <span className="font-medium">For you: </span>
                  {t.forYou}
                </p>
                <p className="mt-2 text-xs text-stone-600 dark:text-stone-400">
                  Sources: <SourceLinks ids={t.resourceIds} />
                </p>
              </li>
            ))}
          </ol>
        </Card>

        {/* 3. A PM's week */}
        <Card as="section" aria-labelledby="fg-week">
          <SectionHeading id="fg-week" eyebrow="3 · Practise in the course">
            {g.weekHeading}
          </SectionHeading>
          <p className="mb-4 max-w-3xl leading-relaxed">{g.weekIntro}</p>
          <div className="overflow-x-auto" tabIndex={0} aria-labelledby="fg-week-caption">
            <table className="w-full min-w-[48rem] text-sm">
              <caption id="fg-week-caption" className="sr-only">
                Everyday PM work: what to hand to AI, what to keep, and where the course practises
                it
              </caption>
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800">
                  <th scope="col" className={th}>
                    PM work
                  </th>
                  <th scope="col" className={th}>
                    Hand to AI
                  </th>
                  <th scope="col" className={th}>
                    Keep for yourself
                  </th>
                  <th scope="col" className={th}>
                    Practise in
                  </th>
                </tr>
              </thead>
              <tbody>
                {g.week.map((w) => (
                  <tr key={w.job} className={row}>
                    <th scope="row" className="py-2 pr-4 text-left align-top font-semibold">
                      {w.job}
                    </th>
                    <td className={td}>{w.ai}</td>
                    <td className={td}>{w.you}</td>
                    <td className="py-2 align-top">
                      <SessionLinks lessons={w.lessons} challenges={w.challenges} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <details className="mt-5 border-t border-stone-200 pt-3 dark:border-stone-800">
            <summary className="min-h-10 cursor-pointer py-2 font-semibold">
              {g.dashboardExample.title}
            </summary>
            <p className="mt-2 mb-3 max-w-3xl text-sm leading-relaxed">
              {g.dashboardExample.context}
            </p>
            <div className="mb-2 flex justify-end">
              <CopyButton text={g.dashboardExample.prompt} label="Copy dashboard brief" />
            </div>
            <pre
              tabIndex={0}
              className="overflow-x-auto rounded-xl bg-stone-100 p-4 text-sm whitespace-pre-wrap dark:bg-stone-950"
            >
              {g.dashboardExample.prompt}
            </pre>
            <div className="mt-3 text-sm">
              <SessionLinks lessons={g.dashboardExample.lessons} />
            </div>
          </details>
        </Card>

        {/* Refresh */}
        <Card as="section" aria-labelledby="fg-refresh">
          <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
            <h2 id="fg-refresh" className="text-xl font-semibold tracking-tight">
              {g.refreshHeading}
            </h2>
            <CopyButton text={g.refreshPrompt} label="Copy refresh prompt" />
          </div>
          <p className="mb-3 max-w-3xl leading-relaxed">{g.refresh}</p>
          <pre
            tabIndex={0}
            className="overflow-x-auto rounded-xl bg-stone-100 p-4 text-sm whitespace-pre-wrap dark:bg-stone-950"
          >
            {g.refreshPrompt}
          </pre>
          <h3 className="mt-5 mb-2 text-sm font-semibold">
            Sources, opened on <time dateTime={FIELD_GUIDE_AS_OF}>{FIELD_GUIDE_AS_OF_LABEL}</time>
          </h3>
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {g.sources.map((id) => {
              const r = resourceById(id)
              return r ? (
                <li key={id}>
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {r.title}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>{' '}
                  <span className="text-stone-600 dark:text-stone-400">· {r.provider}</span>
                </li>
              ) : null
            })}
          </ul>
        </Card>

        <nav aria-label="Where next" className="flex flex-wrap gap-2">
          <LinkButton to="/levels/1" variant="secondary">
            Back to Level 1: {levelById(1)?.title}
          </LinkButton>
          <LinkButton to="/lessons/s5">On to Session 5: {lessonById('s5')?.title}</LinkButton>
        </nav>
      </div>
    </>
  )
}
