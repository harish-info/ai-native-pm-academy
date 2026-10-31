import { Fragment, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

const TOKEN = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g

/** Renders the small inline subset used in course content: **bold**, `code`, [label](https://url)
 * and [label](/course-path) for a page inside the course. */
export function inline(text: string): ReactNode {
  const parts = text.split(TOKEN)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**'))
      return <strong key={i}>{part.slice(2, -2)}</strong>
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="rounded bg-stone-100 px-1 py-0.5 font-mono text-[0.9em] dark:bg-stone-800"
        >
          {part.slice(1, -1)}
        </code>
      )
    }
    const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part)
    // A path such as /field-guide is a page inside the course, so it uses the router.
    if (link && /^\/[a-z0-9/-]*$/.test(link[2]!)) {
      return (
        <Link
          key={i}
          to={link[2]!}
          className="font-medium text-indigo-700 underline underline-offset-2 dark:text-indigo-300"
        >
          {link[1]}
        </Link>
      )
    }
    if (link && /^https?:\/\//.test(link[2]!)) {
      return (
        <a
          key={i}
          href={link[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-indigo-700 underline underline-offset-2 dark:text-indigo-300"
        >
          {link[1]}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      )
    }
    return <Fragment key={i}>{part}</Fragment>
  })
}

export function Paragraphs({ items, className }: { items: string[]; className?: string }) {
  return (
    <>
      {items.map((p, i) => (
        <p key={i} className={className ?? 'leading-relaxed'}>
          {inline(p)}
        </p>
      ))}
    </>
  )
}

export function Bullets({ items, ordered }: { items: string[]; ordered?: boolean }) {
  const Tag = ordered ? 'ol' : 'ul'
  return (
    <Tag className={ordered ? 'list-decimal space-y-2 pl-5' : 'list-disc space-y-1.5 pl-5'}>
      {items.map((b, i) => (
        <li key={i} className="leading-relaxed">
          {inline(b)}
        </li>
      ))}
    </Tag>
  )
}
