import { Link } from 'react-router-dom'
import { levels, resources } from '../content'
import { FIELD_GUIDE_AS_OF_LABEL } from '../content/fieldGuide'
import type { LevelId } from '../content/types'
import { useStore } from '../state/store'
import { BrandMark, LevelArt } from '../ui/art'
import { levelShortName } from '../ui/levelNames'
import { Button, Chevron, cx, interactiveCard, LinkButton, stretchedLink } from '../ui/primitives'

const builds: Record<LevelId, string> = {
  1: 'A product context file, a checked fact sheet and a live pitch page.',
  2: 'A live static prototype built with Claude Code, with pull requests you reviewed.',
  3: 'A strategy, user interviews, data and a PRD an agent can build from.',
  4: 'A design spec, an engineering handoff, evals and a launch review.',
  5: 'Your own wiki, a team knowledge base, and a tested skill and scheduled briefing.',
}

const facts = [
  {
    title: 'About 45 hours',
    body: 'Eight weeks at about 6 hours a week, or twelve at about 4. Every session assigns one short reading or video; the curated external courses and deep dives stay optional so you can go deeper at your own pace.',
  },
  {
    title: 'What it costs',
    body: "Level 1 (Sessions 1 to 4) runs on Claude's free plan. From Session 5 onward you need Claude Pro (from $20 a month) for Claude Code, or an equivalent coding agent.",
  },
  {
    title: 'Self-contained, solo or with a mentor',
    body: 'You build Wayfinder end to end across all twenty sessions (with ready-made practice datasets), or swap in your own product. No coding background is required, and every mentor step has a solo fallback.',
  },
  {
    title: 'How progress works',
    body: 'Each session asks for an artifact you made and a short reflection. A level badge takes 80% on the level quiz and a 20-minute review sign-off. Progress stays in your browser; export a backup anytime.',
  },
]

const navLink =
  'rounded-lg px-3 py-2 text-sm font-medium text-stone-700 underline decoration-stone-300 underline-offset-4 hover:bg-stone-100 hover:text-indigo-800 hover:decoration-indigo-400 dark:text-stone-300 dark:decoration-stone-600 dark:hover:bg-stone-800 dark:hover:text-indigo-200'

export function Landing() {
  const { data, switchMode } = useStore()
  return (
    <div className="min-h-screen">
      <a
        href="#main"
        onClick={(e) => {
          e.preventDefault()
          document.getElementById('main')?.focus()
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:rounded-lg focus:bg-indigo-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-5 sm:px-6">
        <span className="flex items-center gap-2.5 font-semibold tracking-tight">
          <BrandMark className="h-8 w-8" />
          <span className="hidden sm:inline">AI-Native PM Academy</span>
        </span>
        <nav aria-label="Primary" className="flex gap-1">
          <Link to="/glossary" className={navLink}>
            AI jargon
          </Link>
          <Link to="/plan" className={navLink}>
            Study plan
          </Link>
          <Link to="/levels" className={navLink}>
            Curriculum
          </Link>
        </nav>
      </header>

      <main id="main" tabIndex={-1} className="mx-auto max-w-6xl px-4 pb-20 outline-none sm:px-6">
        <section className="course-hero relative -mx-4 overflow-hidden px-4 py-10 sm:mx-0 sm:rounded-2xl sm:border sm:border-stone-200 sm:px-10 sm:py-14 dark:sm:border-stone-700">
          <div className="relative">
            <div>
              <p className="mb-3 font-mono text-xs font-medium tracking-[0.14em] text-stone-600 uppercase dark:text-stone-400">
                AI for product managers, 2026
              </p>
              <h1 className="max-w-3xl text-4xl leading-[1.1] font-bold tracking-[-0.04em] text-balance sm:text-5xl">
                A practical guide to working with AI agents as a PM.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-700 dark:text-stone-300">
                Twenty hands-on sessions take one product (Wayfinder, an AI weekend trip planner, or
                your own product) from first pitch to prototype, discovery, PRD, evals, experiment
                readout and living product wiki, paired with curated courses and sources from
                Anthropic, Teresa Torres, Simon Willison and others.
              </p>
              <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                {[
                  ['20', 'sessions'],
                  ['5', 'level sign-offs'],
                  [String(resources.length), 'curated resources'],
                  ['8 or 12', 'weeks'],
                ].map(([n, label]) => (
                  <div key={label} className="flex flex-col-reverse">
                    <dt className="text-sm text-stone-600 dark:text-stone-400">{label}</dt>
                    <dd className="text-2xl font-bold tracking-tight text-indigo-800 tabular-nums dark:text-indigo-200">
                      {n}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                {data.onboarding || Object.keys(data.lessons).length > 0 ? (
                  <LinkButton to="/dashboard">
                    Continue learning <span aria-hidden>→</span>
                  </LinkButton>
                ) : (
                  <>
                    <LinkButton to="/lessons/s1">
                      Start Session 1 <span aria-hidden>→</span>
                    </LinkButton>
                    <LinkButton to="/onboarding" variant="secondary">
                      Take the skills check (optional)
                    </LinkButton>
                  </>
                )}
                <Button variant="secondary" onClick={() => switchMode('demo')}>
                  Explore with sample progress
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="levels-heading" className="py-10">
          <h2 id="levels-heading" className="mb-4 text-2xl font-bold tracking-tight">
            What you build, level by level
          </h2>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {levels.map((l) => (
              <li key={l.id} className={cx(interactiveCard, 'flex flex-col rounded-2xl p-4')}>
                <LevelArt levelId={l.id} className="h-14 w-14" />
                <div className="mt-3 font-mono text-xs font-medium tracking-[0.12em] text-stone-600 uppercase dark:text-stone-400">
                  Level {l.id}
                </div>
                <Link to={`/levels/${l.id}`} className={cx(stretchedLink, 'mt-1 leading-snug')}>
                  {levelShortName[l.id]}
                </Link>
                <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">{l.theme}</p>
                <p className="mt-3 flex-1 border-t border-stone-200 pt-3 text-sm dark:border-stone-700">
                  <span className="font-medium">{l.project.title}:</span> {builds[l.id]}
                </p>
                <span className="mt-3 flex items-center justify-end gap-1 text-sm font-medium text-indigo-700 dark:text-indigo-300">
                  See sessions
                  <Chevron className="h-4 w-4 text-current" />
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="reference-heading" className="pb-10">
          <h2 id="reference-heading" className="mb-4 text-2xl font-bold tracking-tight">
            Reference to keep open while you work
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                to: '/glossary',
                title: 'AI jargon',
                body: 'Plain-English translations for everyday AI and dev terms, from vibe coding and meat proxy to Markdown, RAG and evals.',
              },
              {
                to: '/field-guide',
                title: 'Field guide',
                body: `Current models and agents from each lab, which to use for which PM task, and fixes for common problems. Checked ${FIELD_GUIDE_AS_OF_LABEL}.`,
              },
              {
                to: '/resources',
                title: 'Resource library',
                body: `${resources.length} guides, courses, docs and podcasts in recommended order, with summaries of what each covers.`,
              },
              {
                to: '/starter-kit',
                title: 'Starter kit',
                body: 'What to install, in the order the course needs it, plus a six-command Git rescue sheet.',
              },
              {
                to: '/case-study',
                title: 'Case studies',
                body: 'Full product briefs and practice datasets for Wayfinder, MoneyPilot and ReplyDesk.',
              },
            ].map((c) => (
              <li key={c.to} className={cx(interactiveCard, 'flex flex-col rounded-2xl p-4')}>
                <Link to={c.to} className={cx(stretchedLink, 'leading-snug')}>
                  {c.title}
                </Link>
                <p className="mt-2 flex-1 text-sm text-stone-600 dark:text-stone-400">{c.body}</p>
                <span className="mt-3 flex items-center justify-end gap-1 text-sm font-medium text-indigo-700 dark:text-indigo-300">
                  Open
                  <Chevron className="h-4 w-4 text-current" />
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="rounded-2xl border border-stone-200 p-6 dark:border-stone-700"
          aria-labelledby="before-heading"
        >
          <h2 id="before-heading" className="text-xl font-semibold">
            Before you start
          </h2>
          <ul className="mt-4 grid gap-x-10 gap-y-5 text-sm leading-relaxed sm:grid-cols-2">
            {facts.map((f) => (
              <li key={f.title}>
                <strong className="block">{f.title}</strong>
                <span className="mt-1 block text-stone-600 dark:text-stone-400">{f.body}</span>
              </li>
            ))}
          </ul>
          <Link to="/plan" className={cx(navLink, '-ml-3 mt-4 inline-block')}>
            See the week-by-week study plan
          </Link>
        </section>
      </main>
    </div>
  )
}
