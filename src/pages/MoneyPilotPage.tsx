import { Link } from 'react-router-dom'
import { resourceById } from '../content'
import {
  agentQuestions,
  levelArc,
  mockupCritique,
  moneypilot,
  referenceScreens,
  type ReferenceScreen,
} from '../content/moneypilot'
import { Card, PageHeader, Pill } from '../ui/primitives'

const priorityTone: Record<ReferenceScreen['priority'], 'indigo' | 'blue' | 'neutral'> = {
  'v1 core': 'indigo',
  'v1 candidate': 'blue',
  later: 'neutral',
}

const linkClass = 'text-indigo-700 underline-offset-2 hover:underline dark:text-indigo-300'

export function MoneyPilotPage() {
  return (
    <>
      <PageHeader
        eyebrow="Capstone, Levels 3 to 5"
        title={`${moneypilot.name}: ${moneypilot.tagline}`}
      >
        The end project you discover, design, build and put an agent into across the last three
        levels.
      </PageHeader>

      <div className="space-y-6">
        <Card>
          <h2 className="mb-2 text-lg font-semibold">Vision</h2>
          <blockquote className="border-l-4 border-indigo-500 pl-4 text-lg leading-relaxed dark:border-indigo-400">
            {moneypilot.vision}
          </blockquote>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="mb-3 text-lg font-semibold">Principles</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm">
              {moneypilot.principles.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h2 className="mb-3 text-lg font-semibold">Inspiration</h2>
            <ul className="space-y-3 text-sm">
              {moneypilot.inspiration.map(({ resourceId, note }) => {
                const r = resourceById(resourceId)
                return (
                  <li key={resourceId}>
                    {r ? (
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`font-medium ${linkClass}`}
                      >
                        {r.title}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      <span className="font-medium">{resourceId}</span>
                    )}
                    {r && (
                      <span className="text-stone-500 dark:text-stone-400"> · {r.provider}</span>
                    )}
                    <p className="mt-0.5 text-stone-700 dark:text-stone-300">{note}</p>
                  </li>
                )
              })}
            </ul>
          </Card>
        </div>

        <section aria-labelledby="mp-arc">
          <h2 id="mp-arc" className="mb-3 text-lg font-semibold">
            How it grows through the levels
          </h2>
          <ol className="grid gap-4 md:grid-cols-3">
            {levelArc.map((a) => (
              <Card as="li" key={a.levelId}>
                <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                  Level {a.levelId}
                </p>
                <h3 className="mb-1 font-semibold">
                  <Link to={`/levels/${a.levelId}`} className={linkClass}>
                    {a.title}
                  </Link>
                </h3>
                <p className="text-sm text-stone-700 dark:text-stone-300">{a.summary}</p>
              </Card>
            ))}
          </ol>
        </section>

        <section aria-labelledby="mp-screens">
          <h2 id="mp-screens" className="mb-1 text-lg font-semibold">
            Reference screens
          </h2>
          <p className="mb-3 text-sm text-stone-600 dark:text-stone-400">
            The reference mockups are third-party concept shots. They are described here in words
            and kept in your private second brain, not in this app or the MoneyPilot repository.
          </p>
          <ul className="grid gap-4 md:grid-cols-2">
            {referenceScreens.map((s) => (
              <Card as="li" key={s.id}>
                <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                  <h3 className="font-semibold">{s.name}</h3>
                  <Pill tone={priorityTone[s.priority]}>Priority: {s.priority}</Pill>
                </div>
                <ul className="list-disc space-y-1 pl-5 text-sm text-stone-700 dark:text-stone-300">
                  {s.shows.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-stone-500 dark:text-stone-400">
                  {s.levels.length > 0 ? (
                    <>
                      Built in{' '}
                      {s.levels.map((l, i) => (
                        <span key={l}>
                          {i > 0 && ', '}
                          <Link to={`/levels/${l}`} className={linkClass}>
                            Level {l}
                          </Link>
                        </span>
                      ))}
                    </>
                  ) : (
                    'Not built in the course'
                  )}
                </p>
              </Card>
            ))}
          </ul>
        </section>

        <Card>
          <h2 className="mb-1 text-lg font-semibold">Mockup critique: borrow or question</h2>
          <p className="mb-4 text-sm text-stone-600 dark:text-stone-400">
            Taste exercise for Session 11. Critique before you copy.
          </p>
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold">Worth borrowing</h3>
              <ul className="list-disc space-y-2 pl-5 text-sm">
                {mockupCritique.borrow.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Worth questioning</h3>
              <ul className="list-disc space-y-2 pl-5 text-sm">
                {mockupCritique.question.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-5 rounded-xl bg-indigo-50 p-4 text-sm dark:bg-indigo-950">
            <p className="mb-1 font-semibold">Exercise</p>
            <p>{mockupCritique.exercise}</p>
          </div>
        </Card>

        <Card>
          <h2 className="mb-1 text-lg font-semibold">Questions the agent must handle</h2>
          <p className="mb-3 text-sm text-stone-600 dark:text-stone-400">
            These become eval cases in Level 5. Each one names the kind of answer that is
            acceptable.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <caption className="sr-only">
                Agent questions with the expected kind of answer and behavior
              </caption>
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800">
                  <th scope="col" className="py-2 pr-4 font-semibold">
                    Question
                  </th>
                  <th scope="col" className="py-2 pr-4 font-semibold">
                    Kind
                  </th>
                  <th scope="col" className="py-2 font-semibold">
                    Expected behavior
                  </th>
                </tr>
              </thead>
              <tbody>
                {agentQuestions.map((q) => (
                  <tr
                    key={q.question}
                    className="border-b border-stone-100 align-top last:border-0 dark:border-stone-800"
                  >
                    <td className="py-2 pr-4 font-medium">{q.question}</td>
                    <td className="py-2 pr-4">
                      <Pill
                        tone={
                          q.kind === 'refuse or hand off'
                            ? 'amber'
                            : q.kind === 'prepare an action'
                              ? 'blue'
                              : q.kind === 'answer from tools'
                                ? 'green'
                                : 'neutral'
                        }
                      >
                        {q.kind}
                      </Pill>
                    </td>
                    <td className="py-2 text-stone-700 dark:text-stone-300">{q.expected}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  )
}
