import { Fragment, useState, type ReactNode } from 'react'
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

function focusSection(id: string) {
  const heading = document.getElementById(id)
  heading?.focus({ preventScroll: true })
  heading?.scrollIntoView({ block: 'start' })
}

function SectionHeading({
  id,
  children,
  aside,
}: {
  id: string
  children: string
  aside?: ReactNode
}) {
  return (
    <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
      <h2
        id={id}
        tabIndex={-1}
        className="scroll-mt-20 text-xl font-semibold tracking-tight outline-none"
      >
        {children}
      </h2>
      {aside}
    </div>
  )
}

const sections = [
  { id: 'fg-layers', label: 'Model, agent, interface' },
  { id: 'fg-models', label: 'Choose a model' },
  { id: 'fg-effort', label: 'Choose effort' },
  { id: 'fg-landscape', label: 'The wider landscape' },
  { id: 'fg-week', label: "A PM's week" },
  { id: 'fg-refresh', label: 'Keep this page honest' },
] as const

function LabTabs() {
  const [selected, setSelected] = useState(0)
  const lab = g.labs[selected]!
  const move = (to: number) => {
    const n = (to + g.labs.length) % g.labs.length
    setSelected(n)
    document.getElementById(`fg-lab-tab-${n}`)?.focus()
  }
  return (
    <>
      <div
        role="tablist"
        aria-label="Model makers"
        className="flex flex-wrap gap-1 border-b border-stone-200 dark:border-stone-800"
      >
        {g.labs.map((l, i) => (
          <button
            key={l.company}
            id={`fg-lab-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={selected === i}
            aria-controls="fg-lab-panel"
            tabIndex={selected === i ? 0 : -1}
            onClick={() => setSelected(i)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') move(i + 1)
              else if (e.key === 'ArrowLeft') move(i - 1)
              else if (e.key === 'Home') move(0)
              else if (e.key === 'End') move(g.labs.length - 1)
              else return
              e.preventDefault()
            }}
            className={cx(
              '-mb-px min-h-10 cursor-pointer border-b-2 px-4 py-2 text-sm font-medium transition-colors',
              selected === i
                ? 'border-indigo-600 text-indigo-900 dark:border-indigo-400 dark:text-indigo-100'
                : 'border-transparent text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100',
            )}
          >
            {l.company}
          </button>
        ))}
      </div>
      <div
        id="fg-lab-panel"
        role="tabpanel"
        aria-labelledby={`fg-lab-tab-${selected}`}
        className="pt-4"
      >
        <p className="max-w-3xl text-sm leading-relaxed">{lab.modelIntro}</p>
        <ul className="mt-4 grid gap-3 md:grid-cols-3">
          {lab.models.map((model) => (
            <li
              key={model.name}
              className="rounded-xl bg-stone-100 p-4 text-sm leading-relaxed dark:bg-stone-800/60"
            >
              <h3 className="text-base font-semibold tracking-tight">{model.name}</h3>
              <p className="text-xs font-medium text-stone-600 dark:text-stone-400">{model.role}</p>
              <p className="mt-2">{model.useFor}</p>
            </li>
          ))}
        </ul>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-600 dark:text-stone-400">
          {lab.also}
        </p>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-semibold">Assistant</dt>
            <dd className="mt-1 leading-relaxed">{lab.assistant}</dd>
          </div>
          <div>
            <dt className="font-semibold">Agent for building</dt>
            <dd className="mt-1 leading-relaxed">{lab.agent}</dd>
          </div>
        </dl>
        <p className="mt-4 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
          Sources: <SourceLinks ids={lab.resourceIds} />
        </p>
      </div>
    </>
  )
}

function EffortGuide() {
  const [selected, setSelected] = useState(0)
  const example = g.effort.tasks[selected]!
  return (
    <>
      <p className="max-w-3xl text-sm leading-relaxed">{g.effort.intro}</p>
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
            <h3 className="font-semibold">{level.name}</h3>
            <p className="text-sm font-medium">{level.meaning}</p>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">{level.example}</p>
          </li>
        ))}
      </ol>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed">{g.effort.extra}</p>

      <h3 className="mt-6 font-semibold">Try a PM task</h3>
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
          <h4 className="sr-only">{example.name}</h4>
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
    </>
  )
}

export function FieldGuidePage() {
  return (
    <>
      <PageHeader eyebrow="Optional reference, after Level 1" title="Field guide">
        Today&apos;s AI models and tools, how to choose a model and an effort setting, and where the
        course practises each PM job. Facts were checked on{' '}
        <time dateTime={FIELD_GUIDE_AS_OF}>{FIELD_GUIDE_AS_OF_LABEL}</time>.
      </PageHeader>

      <nav aria-label="On this page" className="mb-6">
        <ul className="flex flex-wrap gap-2">
          {sections.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => focusSection(s.id)}
                className="min-h-10 cursor-pointer rounded-full border border-stone-300 px-3.5 py-1.5 text-sm transition-colors hover:border-indigo-500 dark:border-stone-700 dark:hover:border-indigo-400"
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-6">
        <Card as="section" aria-labelledby="fg-layers">
          <SectionHeading id="fg-layers">Model, agent, interface</SectionHeading>
          <p className="mb-4 max-w-3xl leading-relaxed">{inline(g.layersIntro)}</p>
          <ol className="grid gap-3 md:grid-cols-3">
            {g.layers.map((l) => (
              <li
                key={l.name}
                className="rounded-xl bg-stone-100 p-4 text-sm leading-relaxed dark:bg-stone-800/60"
              >
                <p className="text-xs text-stone-600 dark:text-stone-400">{l.analogy}</p>
                <h3 className="text-lg font-semibold">{l.name}</h3>
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
              Practise: which layer let you down? Three short cases
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

        <Card as="section" aria-labelledby="fg-models">
          <SectionHeading
            id="fg-models"
            aside={
              <Pill tone="amber">
                <span>
                  As of <time dateTime={FIELD_GUIDE_AS_OF}>{FIELD_GUIDE_AS_OF_LABEL}</time>
                </span>
              </Pill>
            }
          >
            Choose a model
          </SectionHeading>
          <div className="mb-4 max-w-3xl text-sm leading-relaxed">
            <Paragraphs items={g.landscapeIntro} />
          </div>
          <LabTabs />
          <p className="mt-4 max-w-3xl border-t border-stone-200 pt-3 text-sm leading-relaxed text-stone-600 dark:border-stone-800 dark:text-stone-400">
            {g.modelChoiceNote}
          </p>
        </Card>

        <Card as="section" aria-labelledby="fg-effort">
          <SectionHeading id="fg-effort">Choose effort</SectionHeading>
          <EffortGuide />
        </Card>

        <Card as="section" aria-labelledby="fg-landscape">
          <SectionHeading id="fg-landscape">The wider landscape</SectionHeading>

          <h3 className="mb-3 text-lg font-semibold">{g.trendsHeading}</h3>
          <ol className="grid gap-3 md:grid-cols-2">
            {g.trends.map((t) => (
              <li
                key={t.title}
                className="rounded-xl bg-stone-100 p-4 text-sm leading-relaxed dark:bg-stone-800/60"
              >
                <h4 className="font-semibold">{t.title}</h4>
                <p className="mt-1 text-stone-700 dark:text-stone-300">{t.evidence}</p>
                <p className="mt-2">
                  <span className="font-semibold">For you: </span>
                  {t.forYou}
                </p>
                <p className="mt-2 text-xs text-stone-600 dark:text-stone-400">
                  Sources: <SourceLinks ids={t.resourceIds} />
                </p>
              </li>
            ))}
          </ol>

          <h3 className="mt-8 mb-3 text-lg font-semibold">{g.usageHeading}</h3>
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
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-600 dark:text-stone-400">
            {g.usageCaveat}
          </p>

          <h3 className="mt-8 mb-2 text-lg font-semibold">{g.othersHeading}</h3>
          <div className="max-w-3xl text-sm">
            <Bullets items={g.others} />
          </div>
        </Card>

        <Card as="section" aria-labelledby="fg-week">
          <SectionHeading id="fg-week">{g.weekHeading}</SectionHeading>
          <p className="mb-4 max-w-3xl leading-relaxed">{g.weekIntro}</p>
          <ul className="grid gap-3 md:grid-cols-2">
            {g.week.map((w) => (
              <li
                key={w.job}
                className="rounded-xl border border-stone-200 p-4 text-sm leading-relaxed dark:border-stone-800"
              >
                <h3 className="font-semibold">{w.job}</h3>
                <dl className="mt-2 space-y-2">
                  <div>
                    <dt className="text-xs font-medium text-stone-600 dark:text-stone-400">
                      Hand to AI
                    </dt>
                    <dd>{w.ai}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-stone-600 dark:text-stone-400">
                      Keep for yourself
                    </dt>
                    <dd>{w.you}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-stone-600 dark:text-stone-400">
                      Practise in
                    </dt>
                    <dd>
                      <SessionLinks lessons={w.lessons} challenges={w.challenges} />
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
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

        <Card as="section" aria-labelledby="fg-refresh">
          <SectionHeading id="fg-refresh">{g.refreshHeading}</SectionHeading>
          <p className="max-w-3xl text-sm leading-relaxed">{g.refresh}</p>
          <details className="mt-3">
            <summary className="min-h-10 cursor-pointer py-2 text-sm font-semibold">
              Show the refresh prompt
            </summary>
            <div className="mb-2 flex justify-end">
              <CopyButton text={g.refreshPrompt} label="Copy refresh prompt" />
            </div>
            <pre
              tabIndex={0}
              className="overflow-x-auto rounded-xl bg-stone-100 p-4 text-sm whitespace-pre-wrap dark:bg-stone-950"
            >
              {g.refreshPrompt}
            </pre>
          </details>
          <h3 className="mt-4 mb-2 text-sm font-semibold">
            Sources, opened on <time dateTime={FIELD_GUIDE_AS_OF}>{FIELD_GUIDE_AS_OF_LABEL}</time>
          </h3>
          <ul className="grid gap-x-6 gap-y-1 text-sm md:grid-cols-2">
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
