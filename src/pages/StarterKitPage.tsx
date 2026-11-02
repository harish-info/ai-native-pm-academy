import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { lessonById, resourceById } from '../content'
import { STARTER_KIT_AS_OF, STARTER_KIT_AS_OF_LABEL, starterKit as k } from '../content/starterKit'
import { Card, PageHeader, Pill, linkClass } from '../ui/primitives'
import { Paragraphs, inline } from '../ui/RichText'

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

export function StarterKitPage() {
  return (
    <>
      <PageHeader eyebrow="What to install" title="Starter kit">
        {k.intro} Facts about apps were checked on{' '}
        <time dateTime={STARTER_KIT_AS_OF}>{STARTER_KIT_AS_OF_LABEL}</time>.
      </PageHeader>

      <div className="space-y-6">
        {k.stages.map((stage) => (
          <Card key={stage.id} as="section" aria-labelledby={`kit-${stage.id}`}>
            <p className="font-mono text-xs font-medium tracking-[0.14em] text-stone-600 uppercase dark:text-stone-400">
              {stage.when}
            </p>
            <h2 id={`kit-${stage.id}`} className="mt-1 text-xl font-semibold tracking-tight">
              {stage.title}
            </h2>
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
                    <h3 className="font-semibold">
                      <ResourceLink id={t.resourceId} label={t.name} />
                    </h3>
                    <Pill tone={t.need === 'Recommended' ? 'green' : 'neutral'}>{t.need}</Pill>
                  </div>
                  <p className="mt-2">{inline(t.what)}</p>
                  <p className="mt-2 text-stone-600 dark:text-stone-400">{inline(t.facts)}</p>
                </li>
              ))}
            </ul>
          </Card>
        ))}

        <Card as="section" aria-labelledby="kit-other">
          <h2 id="kit-other" className="mb-2 text-xl font-semibold tracking-tight">
            Other agents you may hear about
          </h2>
          <div className="max-w-3xl space-y-2 text-sm leading-relaxed">
            <Paragraphs items={k.otherAgents} />
          </div>
        </Card>
      </div>
    </>
  )
}
