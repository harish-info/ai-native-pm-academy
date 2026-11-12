import { Link } from 'react-router-dom'
import { lessonById, levelById, resourceById } from '../content'
import {
  DEFAULT_CASE_STUDY,
  caseStages,
  caseStudies,
  caseStudyById,
  type AgentQuestion,
  type CaseScreen,
} from '../content/caseStudies'
import { useLevelStatuses } from '../state/hooks'
import { useStore } from '../state/store'
import {
  Card,
  CheckIcon,
  Chevron,
  cx,
  interactiveCard,
  linkClass,
  PageHeader,
  Pill,
  staticTile,
  stretchedLink,
} from '../ui/primitives'

const priorityTone: Record<CaseScreen['priority'], 'indigo' | 'blue' | 'neutral'> = {
  'v1 core': 'indigo',
  'v1 candidate': 'blue',
  later: 'neutral',
}

const kindTone: Record<AgentQuestion['kind'], 'green' | 'blue' | 'neutral' | 'amber'> = {
  'answer from tools': 'green',
  'prepare an action': 'blue',
  'general guidance only': 'neutral',
  'refuse or hand off': 'amber',
}

interface DatasetGroup {
  lessonId: string
  lessonLabel: string
  topic: string
  fullPackOnly?: boolean
  files: { path: (slug: string) => string; label: string; note: string }[]
}

const datasetGroups: DatasetGroup[] = [
  {
    lessonId: 's10',
    lessonLabel: 'Session 10',
    topic: 'interviews',
    fullPackOnly: true,
    files: [
      ...['P1', 'P2', 'P3', 'P4', 'P5'].map((pid) => ({
        path: (slug: string) => `datasets/${slug}/s10-interviews/${pid}.md`,
        label: `s10-interviews/${pid}.md`,
        note: 'pseudonymised interview note',
      })),
      {
        path: (slug) => `datasets/${slug}/s10-answer-key.md`,
        label: 's10-answer-key.md',
        note: 'open after your own synthesis',
      },
    ],
  },
  {
    lessonId: 's11',
    lessonLabel: 'Session 11',
    topic: 'funnel analytics',
    fullPackOnly: true,
    files: [
      {
        path: (slug) => `datasets/${slug}/s11-events.csv`,
        label: 's11-events.csv',
        note: '600-user 30-day cohort event log',
      },
      {
        path: (slug) => `datasets/${slug}/s11-answer-key.md`,
        label: 's11-answer-key.md',
        note: 'open after checking denominators',
      },
    ],
  },
  {
    lessonId: 's14',
    lessonLabel: 'Session 14',
    topic: 'evals',
    files: [
      {
        path: (slug) => `datasets/${slug}/s14-conversations.md`,
        label: 's14-conversations.md',
        note: '30 sample conversations to label',
      },
      {
        path: (slug) => `datasets/${slug}/s14-reference-notes.md`,
        label: 's14-reference-notes.md',
        note: 'open after labelling',
      },
    ],
  },
  {
    lessonId: 's15',
    lessonLabel: 'Session 15',
    topic: 'experiment',
    files: [
      {
        path: (slug) => `datasets/${slug}/s15-experiment-results.csv`,
        label: 's15-experiment-results.csv',
        note: 'experiment results',
      },
      {
        path: (slug) => `datasets/${slug}/s15-plan.md`,
        label: 's15-plan.md',
        note: 'the pre-set plan',
      },
      {
        path: (slug) => `datasets/${slug}/s15-answer-key.md`,
        label: 's15-answer-key.md',
        note: 'open after your readout',
      },
    ],
  },
  {
    lessonId: 's19',
    lessonLabel: 'Session 19',
    topic: 'skill tests',
    fullPackOnly: true,
    files: [
      ...['normal-note.md', 'contradictory-decision.md', 'hostile-export.md'].map((file) => ({
        path: (slug: string) => `datasets/${slug}/s19-skill-tests/${file}`,
        label: `s19-skill-tests/${file}`,
        note: 'skill test input',
      })),
      {
        path: (slug) => `datasets/${slug}/s19-expected.md`,
        label: 's19-expected.md',
        note: 'open after running all three tests',
      },
    ],
  },
]

export function CaseStudyPage() {
  const { data, update } = useStore()
  const statuses = useLevelStatuses()
  const chosen = data.settings.caseStudy ?? DEFAULT_CASE_STUDY
  const c = caseStudyById(chosen)
  const t = c.tokens

  return (
    <>
      <PageHeader eyebrow="Product briefs" title="Wayfinder, MoneyPilot and ReplyDesk">
        <strong>Wayfinder</strong> is the product you build from Session 1 to Session 20, or you can
        swap in your own product at any point. <strong>MoneyPilot</strong> and{' '}
        <strong>ReplyDesk</strong> sit alongside it here so you can compare how the same PM methods
        translate to regulated consumer finance and B2B software support.
      </PageHeader>

      <div className="space-y-8">
        <Card className="border-indigo-200 bg-indigo-50/50 dark:border-indigo-900 dark:bg-indigo-950/30">
          <h2 className="text-lg font-semibold">Wayfinder in 15 seconds</h2>
          <p className="mt-2 text-sm leading-relaxed text-stone-800 dark:text-stone-200">
            Planning a weekend trip with friends or family usually scatters across twelve saved
            reels, three map lists and a group chat where nobody checks Monday closures, transit
            time or shared costs until someone is standing outside a shut museum in the rain.
            Wayfinder turns saved places into a realistic{' '}
            <strong>Day Plan &amp; Budget Split</strong> in deterministic code (for example, a{' '}
            <strong>$180</strong> per-person cap minus <strong>$94.50</strong> of booked stops
            leaves <strong>$85.50</strong> before meals and local transit) and pairs it with an{' '}
            <strong>Ask Wayfinder</strong> drawer that replans when rain or delays hit and stages
            reservation holds behind explicit traveller approval.
          </p>
        </Card>

        <fieldset>
          <legend className="mb-3 text-lg font-semibold">Compare product briefs</legend>
          {!data.settings.caseStudy && (
            <p className="mb-3 text-sm text-stone-600 dark:text-stone-400">
              Wayfinder is active across all twenty sessions. Selecting MoneyPilot or ReplyDesk
              below switches only this reference page.
            </p>
          )}
          <div className="grid gap-4 md:grid-cols-3">
            {caseStudies.map((cs) => {
              const selected = chosen === cs.id
              return (
                <label
                  key={cs.id}
                  className={cx(
                    interactiveCard,
                    'flex flex-col rounded-2xl p-5 has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-indigo-500',
                    selected &&
                      'border-indigo-600 ring-1 ring-indigo-600 dark:border-indigo-400 dark:ring-indigo-400',
                  )}
                >
                  <input
                    type="radio"
                    aria-label={cs.tokens.name}
                    name="case-study"
                    value={cs.id}
                    checked={selected}
                    onChange={() =>
                      update((d) => {
                        d.settings.caseStudy = cs.id
                      })
                    }
                    className="sr-only"
                  />
                  <span className="font-mono text-[0.7rem] font-medium tracking-[0.12em] text-stone-600 uppercase dark:text-stone-400">
                    {cs.kind}
                  </span>
                  <span className="mt-1 text-xl font-bold tracking-tight">{cs.tokens.name}</span>
                  <span className="mt-1 text-sm text-stone-700 dark:text-stone-300">
                    {cs.pitch}
                  </span>
                  <span className="mt-3 block text-xs font-semibold text-stone-600 dark:text-stone-400">
                    What it highlights
                  </span>
                  <ul className="mt-1 list-disc space-y-1 pl-4 text-sm text-stone-700 dark:text-stone-300">
                    {cs.teaches.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  <span className="mt-auto pt-4 text-sm font-semibold">
                    {selected ? (
                      <Pill tone="green">
                        <CheckIcon className="h-3 w-3" /> Viewing {cs.tokens.name}
                      </Pill>
                    ) : (
                      <span className="text-indigo-700 dark:text-indigo-300">
                        Inspect {cs.tokens.name}
                      </span>
                    )}
                  </span>
                </label>
              )
            })}
          </div>
          <p className="mt-3 text-sm text-stone-600 dark:text-stone-400">
            Every brief starts as an unvalidated product hypothesis. Selecting MoneyPilot or
            ReplyDesk here updates only this page; the lessons use Wayfinder throughout, and you can
            swap in your own product whenever you prefer.
          </p>
        </fieldset>

        <section aria-labelledby="brief-heading">
          <h2 id="brief-heading" className="mb-3 text-lg font-semibold">
            {t.name}: the brief
          </h2>
          <div className="grid gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <Card>
              <h3 className="font-semibold">Starting hypothesis</h3>
              <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                Discovery in Session 10 and funnel data in Session 11 will test and sharpen these
                assumptions. Follow the evidence and record what changes.
              </p>
              <dl className="mt-4 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-[9rem_minmax(0,1fr)]">
                {(
                  [
                    ['Product', t.product],
                    ['For', t.user],
                    ['Core job', t.coreJob],
                    ['Opportunity', `"${t.opportunity}"`],
                    ['Outcome', t.outcome],
                    ['Leading signal', t.leading],
                    ['Outcome metric', t.outcomeMetric],
                    ['Guardrail', t.guardrail],
                    ['Acceptance rule', t.acceptance],
                  ] as const
                ).map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="font-medium text-stone-600 dark:text-stone-400">{k}</dt>
                    <dd className="text-stone-900 first-letter:uppercase dark:text-stone-100">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>
            <Card>
              <h3 className="font-semibold">Vision</h3>
              <blockquote className="mt-2 border-l-4 border-mark-400 pl-4 leading-relaxed">
                {c.vision}
              </blockquote>
              <h3 className="mt-5 font-semibold">Principles</h3>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-stone-700 dark:text-stone-300">
                {c.principles.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </Card>
          </div>
        </section>

        <section aria-labelledby="cycle-heading">
          <h2 id="cycle-heading" className="text-lg font-semibold">
            How Wayfinder evolves across the 20 sessions
          </h2>
          <p className="mt-1 mb-4 text-sm text-stone-600 dark:text-stone-400">
            Eight product stages, each answering one PM question before the next begins.
          </p>
          <ol className="relative space-y-5 before:absolute before:top-2 before:bottom-2 before:left-[0.95rem] before:w-px before:bg-stone-300 dark:before:bg-stone-700">
            {caseStages.map((stage, i) => {
              const lessons = stage.lessons.map((id) => lessonById(id)).filter((l) => !!l)
              const project = stage.project ? levelById(stage.project) : undefined
              const projectStatus = statuses.find((s) => s.level.id === stage.project)
              const done =
                lessons.every((l) => data.lessons[l.id]?.completedAt) &&
                (!project || !!projectStatus?.project.passed)
              return (
                <li key={stage.id} className="relative pl-12">
                  <span
                    aria-hidden
                    className={cx(
                      'absolute top-0 left-0 grid h-8 w-8 place-items-center rounded-full border-2 font-mono text-xs font-semibold',
                      done
                        ? 'border-emerald-600 bg-emerald-600 text-white dark:border-emerald-400 dark:bg-emerald-400 dark:text-stone-950'
                        : 'border-stone-300 bg-white text-stone-700 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-200',
                    )}
                  >
                    {done ? <CheckIcon className="h-4 w-4" /> : i + 1}
                  </span>
                  <h3 className="font-semibold">
                    {stage.stage}
                    {done && <span className="sr-only"> (done)</span>}
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400">{stage.question}</p>
                  <ul className="mt-2 space-y-2">
                    {lessons.map((l) => {
                      const lessonDone = !!data.lessons[l.id]?.completedAt
                      return (
                        <li key={l.id} className={cx(interactiveCard, 'rounded-xl px-4 py-3')}>
                          <div className="flex items-start gap-3">
                            <div className="min-w-0 flex-1">
                              <Link to={`/lessons/${l.id}`} className={stretchedLink}>
                                Session {l.number}: {l.title}
                              </Link>
                              <p className="mt-0.5 text-sm text-stone-600 dark:text-stone-400">
                                You produce: {l.artifact}
                              </p>
                            </div>
                            {lessonDone && (
                              <Pill tone="green" className="self-center">
                                <CheckIcon className="h-3 w-3" /> Done
                              </Pill>
                            )}
                            <Chevron className="self-center" />
                          </div>
                        </li>
                      )
                    })}
                    {project && (
                      <li className={cx(interactiveCard, 'rounded-xl px-4 py-3')}>
                        <div className="flex items-start gap-3">
                          <div className="min-w-0 flex-1">
                            <Link to={`/levels/${project.id}/project`} className={stretchedLink}>
                              Level {project.id} sign-off: {project.project.title}
                            </Link>
                            <p className="mt-0.5 text-sm text-stone-600 dark:text-stone-400">
                              20-minute review sign-off on correctness, quality, independence and
                              judgment.
                            </p>
                          </div>
                          {projectStatus?.project.passed && (
                            <Pill tone="green" className="self-center">
                              <CheckIcon className="h-3 w-3" /> Passed
                            </Pill>
                          )}
                          <Chevron className="self-center" />
                        </div>
                      </li>
                    )}
                  </ul>
                </li>
              )
            })}
          </ol>
        </section>

        <section aria-labelledby="rules-heading" className={cx(staticTile, 'rounded-2xl p-5')}>
          <h2 id="rules-heading" className="text-lg font-semibold">
            Rules of the domain
          </h2>
          <p className="mt-1 mb-3 text-sm text-stone-600 dark:text-stone-400">
            What the PRD, the agent and the evals must respect in {t.risk}. A starting list, not
            legal advice: in a real company, legal and compliance own the interpretation.
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-sm">
            {c.domainRisks.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="screens-heading">
          <h2 id="screens-heading" className="text-lg font-semibold">
            v1 surfaces and cut list
          </h2>
          <p className="mt-1 mb-3 text-sm text-stone-600 dark:text-stone-400">
            Keep v1 tight: two core surfaces in the course, with adjacent ideas deliberately parked
            for later.
          </p>
          <ul className="grid gap-4 md:grid-cols-2">
            {c.screens.map((s) => (
              <Card as="li" key={s.id}>
                <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                  <h3 className="font-semibold">{s.name}</h3>
                  <Pill tone={priorityTone[s.priority]}>{s.priority}</Pill>
                </div>
                <ul className="list-disc space-y-1 pl-5 text-sm text-stone-700 dark:text-stone-300">
                  {s.shows.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-stone-600 dark:text-stone-400">
                  Built in{' '}
                  {s.levels.map((l, i) => (
                    <span key={l}>
                      {i > 0 && ', '}
                      <Link to={`/levels/${l}`} className={linkClass}>
                        Level {l}
                      </Link>
                    </span>
                  ))}
                </p>
              </Card>
            ))}
          </ul>
        </section>

        <Card>
          <h2 className="text-lg font-semibold">Questions the agent must handle</h2>
          <p className="mt-1 mb-3 text-sm text-stone-600 dark:text-stone-400">
            Seeds for your eval suite in Session 14. Each names the kind of answer that is
            acceptable; add your own from discovery.
          </p>
          <div
            className="relative overflow-x-auto"
            tabIndex={0}
            role="region"
            aria-label="Agent questions table, scrolls sideways"
          >
            <table className="w-full min-w-[40rem] text-left text-sm">
              <caption className="sr-only">
                Agent questions for {t.name} with the expected kind of answer and behavior
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
                {c.agentQuestions.map((q) => (
                  <tr
                    key={q.question}
                    className="border-b border-stone-100 align-top last:border-0 dark:border-stone-800"
                  >
                    <td className="py-2 pr-4 font-medium">{q.question}</td>
                    <td className="py-2 pr-4">
                      <Pill tone={kindTone[q.kind]}>{q.kind}</Pill>
                    </td>
                    <td className="py-2 text-stone-700 dark:text-stone-300">{q.expected}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold">Taste exercise</h2>
          <p className="mt-1 text-sm text-stone-700 dark:text-stone-300">{c.critique}</p>
          {c.inspiration.length > 0 && (
            <ul className="mt-4 space-y-3 text-sm">
              {c.inspiration.map(({ resourceId, note }) => {
                const r = resourceById(resourceId)
                if (!r) return null
                return (
                  <li key={resourceId}>
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {r.title}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                    <span className="text-stone-600 dark:text-stone-400"> · {r.provider}</span>
                    <p className="mt-0.5 text-stone-700 dark:text-stone-300">{note}</p>
                  </li>
                )
              })}
            </ul>
          )}
          {c.critiqueNotes && (
            <div className="mt-5 grid gap-6 lg:grid-cols-2">
              <div>
                <h3 className="mb-2 font-semibold">Worth borrowing from reference mockups</h3>
                <ul className="list-disc space-y-2 pl-5 text-sm">
                  {c.critiqueNotes.borrow.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Worth questioning</h3>
                <ul className="list-disc space-y-2 pl-5 text-sm">
                  {c.critiqueNotes.question.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <p className={cx(staticTile, 'mt-5 rounded-xl p-4 text-sm')}>
            Note five things to borrow, five to fix, and the one job your v1 will do better. Bring
            the note to{' '}
            <Link to="/lessons/s13" className={linkClass}>
              Session 13
            </Link>
            , the design spec.
          </p>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold">Practice data</h2>
          <p className="mt-1 text-sm text-stone-700 dark:text-stone-300">
            Fictional practice datasets and sealed answer keys so discovery, analytics, evals,
            experiment readouts and skill checks run against concrete figures.
          </p>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            {datasetGroups
              .filter((g) => !g.fullPackOnly || c.id !== 'triage')
              .map((g) => (
                <div key={g.lessonId}>
                  <h3 className="mb-2 font-semibold">
                    <Link to={`/lessons/${g.lessonId}`} className={linkClass}>
                      {g.lessonLabel}
                    </Link>
                    , {g.topic}
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {g.files.map((f) => (
                      <li key={f.label}>
                        <a
                          href={`${import.meta.env.BASE_URL}${f.path(t.slug)}`}
                          download
                          className={linkClass}
                        >
                          {f.label}
                        </a>
                        <span className="text-stone-600 dark:text-stone-400"> · {f.note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </>
  )
}
