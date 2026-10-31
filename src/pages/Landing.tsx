import { Link } from 'react-router-dom'
import { levels } from '../content'
import { useStore } from '../state/store'
import { Button, LinkButton } from '../ui/primitives'

const pillars = [
  {
    title: 'Practice first',
    body: 'About three quarters of the time goes into building real artifacts: a personal wiki, a researched product, a shipped web app and a controlled finance agent.',
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
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <span className="font-semibold tracking-tight">AI-Native PM Academy</span>
        <nav aria-label="Primary" className="flex gap-1">
          <Link
            to="/plan"
            className="rounded-lg px-3 py-2 text-sm hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            Month plan
          </Link>
          <Link
            to="/levels"
            className="rounded-lg px-3 py-2 text-sm hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            Curriculum
          </Link>
        </nav>
      </header>

      <main id="main" tabIndex={-1} className="mx-auto max-w-6xl px-4 pb-20 outline-none sm:px-6">
        <section className="py-10 sm:py-16">
          <p className="mb-3 text-sm font-medium text-indigo-700 dark:text-indigo-300">
            From AI fluency to agentic product leadership
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Become the product manager who knows what to build, and can build it with agents.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-stone-600 dark:text-stone-400">
            A structured, practical course in five levels and twenty sessions, built on the best
            free material from Anthropic, OpenAI, Hugging Face, Matt Pocock and practitioners. It
            ends with MoneyPilot, your own AI-native personal finance agent.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {data.onboarding ? (
              <LinkButton to="/dashboard">Continue learning</LinkButton>
            ) : (
              <LinkButton to="/onboarding">Start with a 10-minute diagnostic</LinkButton>
            )}
            <Button variant="secondary" onClick={() => switchMode('demo')}>
              Explore with sample progress
            </Button>
          </div>
        </section>

        <section aria-labelledby="levels-heading" className="py-6">
          <h2 id="levels-heading" className="mb-4 text-xl font-semibold">
            Five levels, basics to mastery
          </h2>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {levels.map((l) => (
              <li
                key={l.id}
                className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900"
              >
                <div className="text-xs font-medium text-stone-500 dark:text-stone-400">
                  Level {l.id}
                </div>
                <div className="mt-1 font-semibold leading-snug">{l.title}</div>
                <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">{l.theme}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="how-heading" className="py-10">
          <h2 id="how-heading" className="mb-4 text-xl font-semibold">
            How it works
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-stone-200 p-5 dark:border-stone-800"
              >
                <h3 className="font-semibold">{p.title}</h3>
                <p className="mt-1 text-stone-600 dark:text-stone-400">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-indigo-50 p-6 dark:bg-indigo-950/50">
          <h2 className="text-lg font-semibold">Learning with a mentor?</h2>
          <p className="mt-1 max-w-3xl text-stone-700 dark:text-stone-300">
            Every session includes a short mentor move, and the month plan schedules about an hour a
            week of mentor time: project reviews, a cold read of the PRD, a real pull request review
            and a skeptical demo audience.
          </p>
        </section>
      </main>
    </div>
  )
}
