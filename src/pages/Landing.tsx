import { Link } from 'react-router-dom'
import { levels } from '../content'
import { useStore } from '../state/store'
import { BrandMark, LevelArt } from '../ui/art'
import { levelShortName } from '../ui/levelNames'
import { Button, Chevron, cx, interactiveCard, LinkButton, stretchedLink } from '../ui/primitives'

const pillars = [
  {
    title: 'Practice first',
    body: 'Study a worked example, make a decision, then apply the method in your own context. Build a prototype, a scoped PRD, an evaluation report, a simulated launch readout and a team knowledge base.',
  },
  {
    title: 'Evidence, not clicks',
    body: 'Complete sessions with an artifact, a reflection and logged practice. Sessions open the next level. An 80% assessment and a rubric-scored project earn the level badge.',
  },
  {
    title: 'Taste and judgment',
    body: 'Choose what is worth building, compare AI with simpler approaches, specify the behaviour and review the evidence. A well-supported decision to stop is a valid outcome.',
  },
  {
    title: 'Private by design',
    body: 'Everything stays in this browser. No account, no analytics, no server. Export a backup file to move devices.',
  },
]

const navLink =
  'rounded-lg px-3 py-2 text-sm font-medium text-stone-700 underline decoration-stone-300 underline-offset-4 hover:bg-stone-100 hover:text-indigo-800 hover:decoration-indigo-400 dark:text-stone-300 dark:decoration-stone-600 dark:hover:bg-stone-800 dark:hover:text-indigo-200'

export function Landing() {
  const { data, switchMode } = useStore()
  return (
    <div className="min-h-screen">
      {/* Hash routing: a plain #main link would navigate to a /main route, so move focus instead. */}
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
                A practical field course for product managers
              </p>
              <h1 className="max-w-3xl text-4xl leading-[1.1] font-bold tracking-[-0.04em] text-balance sm:text-5xl">
                Become the product manager who knows what to build, and can build it with agents.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-700 dark:text-stone-300">
                A structured, practical course in five levels and twenty sessions, built on curated
                resources selected for the work PMs actually do. Build from your own product
                context: a useful brief, a reviewed prototype, evidence-based product decisions and
                a team workflow you can explain and test.
              </p>
              <p className="mt-5 text-sm font-medium text-indigo-800 dark:text-indigo-200">
                20 sessions · 5 levels · Apply to your own PM work
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {data.onboarding ? (
                  <LinkButton to="/dashboard">
                    Continue learning <span aria-hidden>→</span>
                  </LinkButton>
                ) : (
                  <LinkButton to="/onboarding">
                    Start with a 10-minute diagnostic <span aria-hidden>→</span>
                  </LinkButton>
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
            Five levels, skills that build on each other
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
                <p className="mt-2 flex-1 text-sm text-stone-600 dark:text-stone-400">{l.theme}</p>
                <span className="mt-3 flex items-center justify-end gap-1 text-sm font-medium text-indigo-700 dark:text-indigo-300">
                  See sessions
                  <Chevron className="h-4 w-4 text-current" />
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="mb-8 rounded-2xl border border-stone-200 p-6 dark:border-stone-700"
          aria-labelledby="before-heading"
        >
          <h2 id="before-heading" className="text-xl font-semibold">
            Before you start
          </h2>
          <ul className="mt-4 grid gap-5 text-sm sm:grid-cols-3">
            <li>
              <strong className="block">A PM course, not an ML degree</strong>
              <span className="mt-1 block text-stone-600 dark:text-stone-400">
                No coding prerequisite. You will direct agents, check their work and make product
                trade-offs.
              </span>
            </li>
            <li>
              <strong className="block">About 80 hours, at your pace</strong>
              <span className="mt-1 block text-stone-600 dark:text-stone-400">
                An 8-week plan or a lighter 12-week path. Time estimates are untested; recruitment
                and setup can take longer.
              </span>
            </li>
            <li>
              <strong className="block">Free reading, some paid practice</strong>
              <span className="mt-1 block text-stone-600 dark:text-stone-400">
                Start with a free assistant. Level 2 onward uses Claude Code, which needs suitable
                paid access. Check access before subscribing.
              </span>
            </li>
          </ul>
        </section>

        <section aria-labelledby="how-heading" className="py-6">
          <h2 id="how-heading" className="mb-4 text-2xl font-bold tracking-tight">
            How it works
          </h2>
          <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <div key={p.title} className="flex gap-4">
                <span
                  aria-hidden
                  className="font-mono text-sm font-semibold text-indigo-600 tabular-nums dark:text-indigo-300"
                >
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-1 text-stone-600 dark:text-stone-400">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white p-6 dark:bg-stone-900">
          <h2 className="text-lg font-semibold">Learning with a mentor?</h2>
          <p className="mt-1 max-w-3xl text-stone-700 dark:text-stone-300">
            Every session includes a short mentor move, and every week of the study plan says what
            the mentor does, about an hour a week: project reviews, a cold read of the PRD, a real
            pull request review, an executive at the launch review and a sceptical demo audience.
          </p>
        </section>
        <section className="mt-8 border-t border-stone-200 pt-6 dark:border-stone-800">
          <h2 className="text-lg font-semibold">Want a concrete example?</h2>
          <p className="mt-2 max-w-3xl text-sm text-stone-600 dark:text-stone-400">
            The optional case-study area shows how the methods apply in three different domains.
            Explore it whenever a worked reference helps; the course stays focused on your own role.
          </p>
          <Link to="/case-study" className={cx(navLink, 'mt-3 inline-block')}>
            Explore the case studies
          </Link>
        </section>
      </main>
    </div>
  )
}
