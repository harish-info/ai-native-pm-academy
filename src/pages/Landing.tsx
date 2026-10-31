import { Link } from 'react-router-dom'
import { levels } from '../content'
import { caseStudies } from '../content/caseStudies'
import { useStore } from '../state/store'
import { BrandMark, LevelArt } from '../ui/art'
import { levelShortName } from '../ui/levelNames'
import {
  Button,
  Chevron,
  cx,
  interactiveCard,
  LinkButton,
  staticTile,
  stretchedLink,
} from '../ui/primitives'

const pillars = [
  {
    title: 'Practice first',
    body: 'About three quarters of the time goes into building real artifacts: a personal wiki, a researched product, a shipped web app and an agent that asks before it acts.',
  },
  {
    title: 'Evidence, not clicks',
    body: 'A session counts as complete only with a ticked checklist, a written reflection, an artifact and real logged time. Levels unlock through an 80% assessment and a rubric-scored project.',
  },
  {
    title: 'Taste and judgment',
    body: 'Agents can build almost anything. The hard parts are knowing what to build, specifying it well and reviewing what comes back. That is what this course trains.',
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
        <section className="dot-grid relative -mx-4 overflow-hidden px-4 py-10 sm:mx-0 sm:rounded-2xl sm:border sm:border-stone-200 sm:px-10 sm:py-14 dark:sm:border-stone-800">
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-stone-50 via-stone-50/90 to-stone-50/40 dark:from-stone-950 dark:via-stone-950/90 dark:to-stone-950/40"
          />
          <div className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <p className="mb-3 font-mono text-xs font-medium tracking-[0.14em] text-stone-600 uppercase dark:text-stone-400">
                From AI fluency to agentic product leadership
              </p>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-5xl">
                Become the product manager who knows <span className="marker">what to build</span>,
                and can build it with agents.
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-stone-600 dark:text-stone-400">
                A structured, practical course in five levels and twenty sessions, built on the best
                free material from Anthropic, OpenAI, Hugging Face, Matt Pocock and practitioners.
                In the last three levels you take one product of your choice through the whole
                cycle, from discovery to a launched, evaluated AI agent.
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
            <div aria-hidden className="hidden grid-cols-2 gap-2 lg:grid">
              {levels.slice(0, 4).map((l) => (
                <LevelArt key={l.id} levelId={l.id} className="h-24 w-24" />
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="levels-heading" className="py-10">
          <h2 id="levels-heading" className="mb-4 text-2xl font-bold tracking-tight">
            Five levels, basics to mastery
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

        <section aria-labelledby="cases-heading" className="pb-10">
          <h2 id="cases-heading" className="text-2xl font-bold tracking-tight">
            One case study, the whole product cycle
          </h2>
          <p className="mt-1 mb-4 max-w-3xl text-stone-600 dark:text-stone-400">
            From Level 3 you pick a case and run it end to end: discover, design, define, build,
            test and ship, add the agent, evaluate, launch and lead. Same skills, different hard
            problem.
          </p>
          <ul className="grid gap-3 md:grid-cols-3">
            {caseStudies.map((c) => (
              <li key={c.id} className={cx(staticTile, 'rounded-2xl p-5')}>
                <p className="font-mono text-[0.7rem] font-medium tracking-[0.12em] text-stone-600 uppercase dark:text-stone-400">
                  {c.kind}
                </p>
                <h3 className="mt-1 text-lg font-bold tracking-tight">{c.tokens.name}</h3>
                <p className="mt-1 text-sm text-stone-700 dark:text-stone-300">{c.pitch}</p>
              </li>
            ))}
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

        <section className="mt-8 rounded-2xl border-l-4 border-mark-400 bg-white p-6 dark:bg-stone-900">
          <h2 className="text-lg font-semibold">Learning with a mentor?</h2>
          <p className="mt-1 max-w-3xl text-stone-700 dark:text-stone-300">
            Every session includes a short mentor move, and every week of the study plan says what
            the mentor does, about an hour a week: project reviews, a cold read of the PRD, a real
            pull request review and a skeptical demo audience.
          </p>
        </section>
      </main>
    </div>
  )
}
