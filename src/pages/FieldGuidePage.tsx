import { Fragment, Suspense, lazy, useState } from 'react'
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

// The agent loop diagram from Session 1, reused so the learner sees the same picture again.
const LessonIllustration = lazy(() =>
  import('../ui/LessonIllustration').then((m) => ({ default: m.LessonIllustration })),
)

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
          </div>
        </Card>

        {/* 1. Three layers */}
        <Card as="section" aria-labelledby="fg-layers">
          <SectionHeading id="fg-layers" eyebrow="1 · Lasts">
            Model, agent, app
          </SectionHeading>
          <p className="mb-4 max-w-3xl leading-relaxed">{g.layersIntro}</p>
          <ol className="grid gap-3 md:grid-cols-3">
            {g.layers.map((l, i) => (
              <li
                key={l.name}
                className="rounded-xl bg-stone-100 p-4 text-sm leading-relaxed dark:bg-stone-800/60"
              >
                <p className="font-mono text-xs text-stone-600 dark:text-stone-400">
                  Layer {i + 1} · {l.analogy}
                </p>
                <h3 className="mt-1 text-lg font-semibold">{l.name}</h3>
                <p className="mt-2">{l.what}</p>
                <p className="mt-2 text-stone-600 dark:text-stone-400">
                  <span className="font-medium text-stone-800 dark:text-stone-200">Examples: </span>
                  {l.examples}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-4 max-w-3xl space-y-3">
            <Paragraphs items={g.layersAfter} />
          </div>

          <h3 className="mt-6 mb-2 text-lg font-semibold">Inside the loop</h3>
          <div className="max-w-3xl space-y-3">
            <p className="leading-relaxed">{g.loopIntro}</p>
            <Bullets items={g.loopSteps} ordered />
            <p className="leading-relaxed">{inline(g.loopAfter)}</p>
          </div>
          <div className="mt-4">
            <Suspense fallback={<p role="status">Loading illustration...</p>}>
              <LessonIllustration id="chat-agent" />
            </Suspense>
          </div>

          <h3 className="mt-6 mb-1 text-lg font-semibold">Which layer let you down?</h3>
          <p className="mb-3 text-sm text-stone-600 dark:text-stone-400">
            {g.scenariosIntro} Practice only, with no grade or XP.
          </p>
          <ol className="space-y-3">
            {g.scenarios.map((s, i) => (
              <Scenario key={s.id} s={s} n={i + 1} />
            ))}
          </ol>
        </Card>

        {/* 2. Landscape */}
        <Card as="section" aria-labelledby="fg-landscape">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <SectionHeading id="fg-landscape" eyebrow="2 · Dates fast">
              The landscape
            </SectionHeading>
            <Pill tone="amber">
              As of <time dateTime={FIELD_GUIDE_AS_OF}>{FIELD_GUIDE_AS_OF_LABEL}</time>
            </Pill>
          </div>
          <div className="max-w-3xl">
            <Paragraphs items={g.landscapeIntro} />
          </div>
          <div className="mt-4 overflow-x-auto" tabIndex={0} aria-labelledby="fg-labs-caption">
            <table className="w-full min-w-[44rem] text-sm">
              <caption id="fg-labs-caption" className="sr-only">
                The three largest labs: their models, assistant and building agent, as of{' '}
                {FIELD_GUIDE_AS_OF_LABEL}
              </caption>
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800">
                  <th scope="col" className={th}>
                    Lab
                  </th>
                  <th scope="col" className={th}>
                    Models
                  </th>
                  <th scope="col" className={th}>
                    Assistant
                  </th>
                  <th scope="col" className={th}>
                    Agent for building
                  </th>
                </tr>
              </thead>
              <tbody>
                {g.labs.map((lab) => (
                  <tr key={lab.company} className={row}>
                    <th scope="row" className="py-2 pr-4 text-left align-top font-semibold">
                      {lab.company}
                    </th>
                    <td className={td}>{lab.models}</td>
                    <td className={td}>{lab.assistant}</td>
                    <td className={td}>{lab.agent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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

        {/* 3. Why it matters */}
        <Card as="section" aria-labelledby="fg-why">
          <SectionHeading id="fg-why" eyebrow="3 · Lasts">
            {g.whyHeading}
          </SectionHeading>
          <div className="max-w-3xl">
            <Bullets items={g.why} />
          </div>
          <h3 className="mt-6 mb-2 text-lg font-semibold">{g.noPmModelHeading}</h3>
          <div className="max-w-3xl space-y-3">
            <Paragraphs items={g.noPmModel} />
          </div>
        </Card>

        {/* 4. Briefing */}
        <Card as="section" aria-labelledby="fg-brief">
          <SectionHeading id="fg-brief" eyebrow="4 · Lasts">
            {g.briefHeading}
          </SectionHeading>
          <div className="max-w-3xl space-y-3">
            <Paragraphs items={g.brief} />
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <div>
              <h3 className="mb-2 text-sm font-semibold">Weak brief</h3>
              <pre
                tabIndex={0}
                className="overflow-x-auto rounded-xl bg-stone-100 p-4 text-sm whitespace-pre-wrap dark:bg-stone-950"
              >
                {g.briefWeak}
              </pre>
            </div>
            <div>
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-semibold">Agent-ready brief</h3>
                <CopyButton text={g.briefStrong} label="Copy agent-ready brief" />
              </div>
              <pre
                tabIndex={0}
                className="overflow-x-auto rounded-xl bg-stone-100 p-4 text-sm whitespace-pre-wrap dark:bg-stone-950"
              >
                {g.briefStrong}
              </pre>
            </div>
          </div>
          <p className="mt-4 max-w-3xl leading-relaxed">{g.briefAfter}</p>
        </Card>

        {/* 5. Building */}
        <Card as="section" aria-labelledby="fg-build">
          <SectionHeading id="fg-build" eyebrow="5 · Lasts">
            {g.buildHeading}
          </SectionHeading>
          <p className="mb-4 max-w-3xl leading-relaxed">{g.buildIntro}</p>
          <ol className="grid gap-3 md:grid-cols-3">
            {g.buildLevels.map((b, i) => (
              <li
                key={b.name}
                className="flex flex-col rounded-xl bg-stone-100 p-4 text-sm leading-relaxed dark:bg-stone-800/60"
              >
                <p className="font-mono text-xs text-stone-600 dark:text-stone-400">
                  Level {i + 1}
                </p>
                <h3 className="mt-1 text-lg font-semibold">{b.name}</h3>
                <p className="mt-2">{b.goodFor}</p>
                <p className="mt-2 text-stone-600 dark:text-stone-400">{b.tools}</p>
                <p className="mt-2">
                  <span className="font-medium">You review: </span>
                  {b.youReview}
                </p>
                <div className="mt-3 border-t border-stone-200 pt-2 dark:border-stone-700">
                  <SessionLinks lessons={b.lessons} />
                </div>
              </li>
            ))}
          </ol>
        </Card>

        {/* 6. A PM's week */}
        <Card as="section" aria-labelledby="fg-week">
          <SectionHeading id="fg-week" eyebrow="6 · Lasts">
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
