import { Link } from 'react-router-dom'
import { resourceById } from '../content'
import { starterKit } from '../content/starterKit'
import { Card, Pill, linkClass } from './primitives'
import { inline } from './RichText'

// Shows the starter kit tools at the top of the session that first needs them, so learners do
// not have to visit the kit page to know what to install.
export function KitCallout({ lessonId }: { lessonId: string }) {
  const stage = starterKit.stages.find((s) => s.lessons[0] === lessonId)
  if (!stage) return null
  return (
    <Card as="section" aria-labelledby="kit-callout">
      <h2 id="kit-callout" className="text-lg font-semibold">
        Install for this session
      </h2>
      <p className="mt-1 max-w-prose text-sm leading-relaxed text-stone-700 dark:text-stone-300">
        {inline(stage.intro)}
      </p>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed">
        {stage.tools.map((t) => {
          const r = resourceById(t.resourceId)
          return (
            <li key={t.name}>
              <span className="inline-flex flex-wrap items-center gap-2">
                {r ? (
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkClass} font-semibold`}
                  >
                    {t.name}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <span className="font-semibold">{t.name}</span>
                )}
                <Pill tone={t.need === 'Recommended' ? 'green' : 'neutral'}>{t.need}</Pill>
              </span>
              <span className="block">{inline(t.what)}</span>
              <span className="block text-stone-600 dark:text-stone-400">{t.facts}</span>
            </li>
          )
        })}
      </ul>
      <p className="mt-3 text-sm">
        <Link to="/starter-kit" className={linkClass}>
          Everything to install, in one list
        </Link>
      </p>
    </Card>
  )
}
