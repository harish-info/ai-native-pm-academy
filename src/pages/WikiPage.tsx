import { Link } from 'react-router-dom'
import {
  allLessons,
  levelById,
  resourceById,
  wikiMilestones,
  wikiPrompts,
  wikiRules,
  wikiSteps,
} from '../content'
import { useStore } from '../state/store'
import { CopyButton } from '../ui/CopyButton'
import { Card, CheckIcon, PageHeader, Pill, ProgressBar, linkClass } from '../ui/primitives'

const prompts: { id: keyof typeof wikiPrompts; title: string; when: string }[] = [
  { id: 'ingest', title: 'Ingest', when: 'After a session, when 00-inbox/ has new sources.' },
  {
    id: 'query',
    title: 'Query',
    when: 'When you need an answer from what you have already learned.',
  },
  { id: 'lint', title: 'Lint', when: 'In the weekly review, to keep the wiki honest.' },
]

export function WikiPage() {
  const { data } = useStore()
  const gist = resourceById('karpathy-llm-wiki')
  const filedCount = allLessons.filter((l) => data.lessons[l.id]?.checklist['wiki-filed']).length
  const reachedCount = wikiMilestones.filter(
    (m) => data.projects[String(m.levelId)]?.deliverables['wiki-milestone'],
  ).length

  return (
    <>
      <PageHeader eyebrow="Runs through every level" title="Your personal wiki">
        A private, agent-maintained knowledge base that grows with every session and stays useful
        long after the course.
      </PageHeader>

      <div className="space-y-6">
        <Card>
          <h2 className="mb-3 text-lg font-semibold">The LLM wiki pattern</h2>
          <div className="space-y-3 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
            <p>The wiki has three layers:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong>Raw sources.</strong> Articles, transcripts, notes and screenshots go into{' '}
                <code>00-inbox/</code> unchanged. They are the evidence.
              </li>
              <li>
                <strong>Agent-maintained pages.</strong> An agent reads the sources and writes or
                updates Markdown pages, quoting the source for every claim. You approve every write.{' '}
                <code>index.md</code> lists the pages and <code>log.md</code> records each change.
              </li>
              <li>
                <strong>The schema.</strong> <code>AGENTS.md</code> tells any agent how the wiki is
                organized, the page template and the rules. A fresh agent can pick it up cold.
              </li>
            </ul>
            <p>
              You start it by hand in Level 1, hand the maintenance to an agent in Level 2, and file
              into it after every session from then on. Each session has a "filed in your wiki"
              checklist item, and each level project has a wiki milestone, so the habit is part of
              completing the course rather than an extra.
            </p>
            {gist && (
              <p>
                The pattern comes from{' '}
                <a href={gist.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {gist.title}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>{' '}
                by {gist.provider.replace(/ \(.*\)$/, '')}.
              </p>
            )}
          </div>
        </Card>

        <Card>
          <h2 className="mb-3 text-lg font-semibold">Rules</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm">
            {wikiRules.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </Card>

        <section aria-labelledby="wiki-milestones">
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="wiki-milestones" className="text-lg font-semibold">
              Milestones
            </h2>
            <span className="text-sm text-stone-600 dark:text-stone-400">
              {reachedCount} of {wikiMilestones.length} reached
            </span>
          </div>
          <ol className="grid gap-4 md:grid-cols-2">
            {wikiMilestones.map((m) => {
              const reached =
                data.projects[String(m.levelId)]?.deliverables['wiki-milestone'] === true
              const level = levelById(m.levelId)
              return (
                <Card
                  as="li"
                  key={m.levelId}
                  className={reached ? 'border-emerald-300 dark:border-emerald-800' : undefined}
                >
                  <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                    <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                      <Link to={`/levels/${m.levelId}`} className={linkClass}>
                        Level {m.levelId}
                        {level ? `: ${level.title}` : ''}
                      </Link>
                    </p>
                    {reached ? (
                      <Pill tone="green">
                        <CheckIcon className="h-3 w-3" /> Reached
                      </Pill>
                    ) : (
                      <Pill>Not yet</Pill>
                    )}
                  </div>
                  <h3 className="font-semibold">{m.name}</h3>
                  <p className="mt-1 text-sm text-stone-700 dark:text-stone-300">{m.summary}</p>
                  <h4 className="mt-3 text-xs font-semibold tracking-wide text-stone-500 uppercase dark:text-stone-400">
                    Checks
                  </h4>
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
                    {m.checks.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                  {!reached && (
                    <p className="mt-3 text-xs text-stone-500 dark:text-stone-400">
                      Marked as reached when you tick the wiki milestone deliverable on the{' '}
                      <Link to={`/levels/${m.levelId}/project`} className={linkClass}>
                        Level {m.levelId} project
                      </Link>
                      .
                    </p>
                  )}
                </Card>
              )
            })}
          </ol>
        </section>

        <section aria-labelledby="wiki-prompts">
          <h2 id="wiki-prompts" className="mb-1 text-lg font-semibold">
            The three prompts
          </h2>
          <p className="mb-3 text-sm text-stone-600 dark:text-stone-400">
            Paste these into your agent from the wiki folder, or turn them into skills in Level 2.
          </p>
          <div className="space-y-4">
            {prompts.map((p) => (
              <Card key={p.id}>
                <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="text-sm text-stone-600 dark:text-stone-400">{p.when}</p>
                  </div>
                  <CopyButton
                    text={wikiPrompts[p.id]}
                    label={`Copy ${p.title.toLowerCase()} prompt`}
                  />
                </div>
                <pre
                  tabIndex={0}
                  className="overflow-x-auto rounded-xl bg-stone-100 p-4 text-sm whitespace-pre-wrap dark:bg-stone-950"
                >
                  {wikiPrompts[p.id]}
                </pre>
              </Card>
            ))}
          </div>
        </section>

        <Card>
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-lg font-semibold">What to file after each session</h2>
            <span className="text-sm text-stone-600 dark:text-stone-400">
              {filedCount} of {allLessons.length} filed
            </span>
          </div>
          <div className="mb-4 max-w-md">
            <ProgressBar
              value={filedCount}
              max={allLessons.length}
              label="Sessions filed in the wiki"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[44rem] text-left text-sm">
              <caption className="sr-only">
                For each core session: what to capture, which wiki pages it touches, and whether it
                is filed
              </caption>
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800">
                  <th scope="col" className="py-2 pr-4 font-semibold">
                    Session
                  </th>
                  <th scope="col" className="py-2 pr-4 font-semibold">
                    Capture
                  </th>
                  <th scope="col" className="py-2 pr-4 font-semibold">
                    Pages
                  </th>
                  <th scope="col" className="py-2 font-semibold">
                    Filed
                  </th>
                </tr>
              </thead>
              <tbody>
                {allLessons.map((l) => {
                  const step = wikiSteps[l.id]
                  const filed = data.lessons[l.id]?.checklist['wiki-filed'] === true
                  return (
                    <tr
                      key={l.id}
                      className="border-b border-stone-100 align-top last:border-0 dark:border-stone-800"
                    >
                      <th scope="row" className="py-2 pr-4 text-left font-medium">
                        <Link to={`/lessons/${l.id}`} className={linkClass}>
                          {l.number}. {l.title}
                        </Link>
                      </th>
                      <td className="py-2 pr-4 text-stone-700 dark:text-stone-300">
                        {step?.capture ?? 'No wiki step defined.'}
                      </td>
                      <td className="py-2 pr-4">
                        {step && step.pages.length > 0 ? (
                          <ul className="space-y-0.5">
                            {step.pages.map((p) => (
                              <li key={p}>
                                <code className="text-xs">{p}</code>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-stone-500">None</span>
                        )}
                      </td>
                      <td className="py-2">
                        {filed ? (
                          <span className="inline-flex items-center gap-1 text-emerald-800 dark:text-emerald-300">
                            <CheckIcon className="h-4 w-4" /> Filed
                          </span>
                        ) : (
                          <span className="text-stone-500 dark:text-stone-400">Not yet</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  )
}
