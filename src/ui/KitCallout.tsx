import { Link } from 'react-router-dom'
import { resourceById } from '../content'
import { starterKit } from '../content/starterKit'
import { Card, Pill, linkClass } from './primitives'

// Names the starter kit tools at the top of the session that first needs them. Setup steps live
// only on the Starter kit page, so installation is described in one place.
export function KitCallout({ lessonId }: { lessonId: string }) {
  const tools = starterKit.stages.flatMap((s) =>
    s.tools.filter((t) => (t.lesson ?? s.lessons[0]) === lessonId),
  )
  if (tools.length === 0) return null
  return (
    <Card as="section" aria-labelledby="kit-callout">
      <h2 id="kit-callout" className="text-lg font-semibold">
        Install for this session
      </h2>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {tools.map((t) => {
          const r = resourceById(t.resourceId)
          return (
            <li key={t.name} className="inline-flex items-center gap-2">
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
            </li>
          )
        })}
      </ul>
      <p className="mt-3 text-sm">
        <Link to="/starter-kit" className={linkClass}>
          Setup steps for each tool, in the Starter kit
        </Link>
      </p>
    </Card>
  )
}
