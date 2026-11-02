import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { lessonById, resourceById } from '../content'
import { STARTER_KIT_AS_OF, STARTER_KIT_AS_OF_LABEL, starterKit as k } from '../content/starterKit'
import { Card, PageHeader, Pill, cx, linkClass } from '../ui/primitives'
import { Bullets, Paragraphs, inline } from '../ui/RichText'

const sections = [
  { id: 'kit-install', label: 'What to install, and when' },
  { id: 'kit-terminal', label: 'The terminal without fear' },
  { id: 'kit-markdown', label: 'Markdown in five minutes' },
  { id: 'kit-formats', label: 'Markdown, HTML or something else?' },
  { id: 'kit-tips', label: 'Small things that save time' },
]

function jumpTo(id: string) {
  // HashRouter: an in-page anchor would change the route, so move focus in code.
  const heading = document.getElementById(id)
  heading?.focus({ preventScroll: true })
  heading?.scrollIntoView({ block: 'start' })
}

function SectionHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} tabIndex={-1} className="mb-3 text-xl font-semibold tracking-tight">
      {children}
    </h2>
  )
}

function ResourceLink({ id, label }: { id: string; label: string }) {
  const r = resourceById(id)
  if (!r) return <>{label}</>
  return (
    <a href={r.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

function SessionLinks({ ids }: { ids: string[] }) {
  return (
    <>
      {ids.map((id, n) => {
        const l = lessonById(id)
        if (!l) return null
        return (
          <Fragment key={id}>
            {n > 0 && ', '}
            <Link to={`/lessons/${id}`} className={linkClass}>
              Session {l.number}
            </Link>
          </Fragment>
        )
      })}
    </>
  )
}

const row = 'border-b border-stone-100 last:border-0 dark:border-stone-800'

export function StarterKitPage() {
  return (
    <>
      <PageHeader eyebrow="Set up once" title="Starter kit">
        The apps worth installing, the terminal explained, and Markdown and HTML in plain words.
        Facts about apps were checked on{' '}
        <time dateTime={STARTER_KIT_AS_OF}>{STARTER_KIT_AS_OF_LABEL}</time>.
      </PageHeader>

      <div className="space-y-6">
        <Card>
          <div className="max-w-3xl space-y-3 text-stone-700 dark:text-stone-300">
            <Paragraphs items={k.intro} />
          </div>
          <nav aria-label="On this page" className="mt-4">
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    className={cx(linkClass, 'min-h-10 cursor-pointer text-left text-sm')}
                    onClick={() => jumpTo(s.id)}
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </Card>

        <Card as="section" aria-labelledby="kit-install">
          <SectionHeading id="kit-install">What to install, and when</SectionHeading>
          <p className="mb-4 max-w-3xl leading-relaxed">{inline(k.installIntro)}</p>
          <ol className="space-y-6">
            {k.stages.map((stage) => (
              <li key={stage.id}>
                <p className="font-mono text-xs font-medium tracking-[0.14em] text-stone-600 uppercase dark:text-stone-400">
                  {stage.when}
                </p>
                <h3 className="mt-1 text-lg font-semibold">{stage.title}</h3>
                <p className="mt-1 max-w-3xl text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                  {inline(stage.intro)} Used from <SessionLinks ids={stage.lessons} />.
                </p>
                <ul className="mt-3 grid gap-3 md:grid-cols-2">
                  {stage.tools.map((t) => (
                    <li
                      key={t.name}
                      className="rounded-xl bg-stone-100 p-4 text-sm leading-relaxed dark:bg-stone-800/60"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-semibold">
                          {t.resourceId ? (
                            <ResourceLink id={t.resourceId} label={t.name} />
                          ) : (
                            t.name
                          )}
                        </h4>
                        <Pill tone={t.need === 'Recommended' ? 'green' : 'neutral'}>{t.need}</Pill>
                      </div>
                      <p className="mt-2">{inline(t.what)}</p>
                      <p className="mt-2 text-stone-600 dark:text-stone-400">{inline(t.facts)}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <div className="mt-5 max-w-3xl space-y-2 border-t border-stone-200 pt-4 text-sm leading-relaxed dark:border-stone-800">
            <Paragraphs items={k.otherAgents} />
          </div>
        </Card>

        <Card as="section" aria-labelledby="kit-terminal">
          <SectionHeading id="kit-terminal">The terminal without fear</SectionHeading>
          <div className="max-w-3xl space-y-3">
            <Paragraphs items={k.terminal.intro} />
          </div>

          <h3 className="mt-5 text-lg font-semibold">Five words you will hear</h3>
          <dl className="mt-2 grid max-w-3xl gap-x-6 gap-y-2 text-sm sm:grid-cols-[10rem_1fr]">
            {k.terminal.terms.map((t) => (
              <Fragment key={t.term}>
                <dt className="font-semibold">{t.term}</dt>
                <dd className="text-stone-700 dark:text-stone-300">{inline(t.meaning)}</dd>
              </Fragment>
            ))}
          </dl>

          <h3 className="mt-5 text-lg font-semibold">Start Claude Code in a terminal</h3>
          <ol className="mt-2 max-w-3xl list-decimal space-y-1 pl-5 text-sm leading-relaxed">
            {k.terminal.start.map((s) => (
              <li key={s}>{inline(s)}</li>
            ))}
          </ol>

          <h3 className="mt-5 text-lg font-semibold">The keys that matter</h3>
          <div className="mt-2 max-w-3xl overflow-x-auto">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Keys to know in Claude Code</caption>
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-700">
                  <th scope="col" className="py-2 pr-4 font-semibold">
                    Press
                  </th>
                  <th scope="col" className="py-2 font-semibold">
                    To
                  </th>
                </tr>
              </thead>
              <tbody>
                {k.terminal.keys.map((r) => (
                  <tr key={r.keys} className={row}>
                    <td className="py-2 pr-4 align-top font-mono whitespace-nowrap">{r.keys}</td>
                    <td className="py-2">{inline(r.does)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-stone-100 p-4 text-sm leading-relaxed dark:bg-stone-800/60">
              <h3 className="font-semibold">Ask instead of typing commands</h3>
              <Bullets items={k.terminal.ask} />
            </div>
            <div className="rounded-xl bg-stone-100 p-4 text-sm leading-relaxed dark:bg-stone-800/60">
              <h3 className="font-semibold">When something looks wrong</h3>
              <Bullets items={k.terminal.stuck} />
            </div>
          </div>
        </Card>

        <Card as="section" aria-labelledby="kit-markdown">
          <SectionHeading id="kit-markdown">Markdown in five minutes</SectionHeading>
          <div className="max-w-3xl space-y-3">
            <Paragraphs items={k.markdown.intro} />
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">Markdown marks and what they produce</caption>
                <thead>
                  <tr className="border-b border-stone-200 dark:border-stone-700">
                    <th scope="col" className="py-2 pr-4 font-semibold">
                      You type
                    </th>
                    <th scope="col" className="py-2 font-semibold">
                      You get
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {k.markdown.marks.map((m) => (
                    <tr key={m.type} className={row}>
                      <td className="py-2 pr-4 align-top font-mono whitespace-nowrap">{m.type}</td>
                      <td className="py-2">{m.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <figure>
              <pre className="overflow-x-auto rounded-xl bg-stone-100 p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap dark:bg-stone-800/60">
                {k.markdown.example}
              </pre>
              <figcaption className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                {k.markdown.exampleCaption}
              </figcaption>
            </figure>
          </div>
        </Card>

        <Card as="section" aria-labelledby="kit-formats">
          <SectionHeading id="kit-formats">Markdown, HTML or something else?</SectionHeading>
          <p className="max-w-3xl leading-relaxed">{inline(k.formats.intro)}</p>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {k.formats.rows.map((f) => (
              <li
                key={f.format}
                className="rounded-xl bg-stone-100 p-4 text-sm leading-relaxed dark:bg-stone-800/60"
              >
                <h3 className="text-base font-semibold">{f.format}</h3>
                <p className="mt-1">{inline(f.use)}</p>
                <p className="mt-2 text-stone-600 dark:text-stone-400">
                  <span className="font-medium text-stone-800 dark:text-stone-200">
                    For example:{' '}
                  </span>
                  {inline(f.examples)}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed">{inline(k.formats.rule)}</p>
        </Card>

        <Card as="section" aria-labelledby="kit-tips">
          <SectionHeading id="kit-tips">Small things that save time</SectionHeading>
          <ul className="max-w-3xl space-y-4">
            {k.tips.map((t) => (
              <li key={t.title} className="text-sm leading-relaxed">
                <h3 className="text-base font-semibold">{t.title}</h3>
                <p className="mt-1">{inline(t.text)}</p>
                {t.resourceIds && (
                  <p className="mt-1 text-stone-600 dark:text-stone-400">
                    {t.resourceIds.map((id, n) => (
                      <Fragment key={id}>
                        {n > 0 && ', '}
                        <ResourceLink id={id} label={resourceById(id)?.title ?? id} />
                      </Fragment>
                    ))}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  )
}
