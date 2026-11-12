import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { Link, useParams } from 'react-router-dom'
import { allLessons, guides, lessonById, resourceById, wikiSteps } from '../content'
import { competencyById } from '../content/competencies'
import { formatMinutes } from '../domain/dates'
import { useLevelStatus } from '../state/hooks'
import { CopyButton } from '../ui/CopyButton'
import { EvidencePanel } from '../ui/EvidencePanel'
import { BookmarkButton, ResourceRefs } from '../ui/ResourceBits'
import { Bullets, Paragraphs, inline } from '../ui/RichText'
import { useStore } from '../state/store'
import { DecisionPractice, PracticeFiles, SessionBrief, WorkedExample } from '../ui/SessionLearning'
import {
  Button,
  Card,
  CheckIcon,
  Chevron,
  LockIcon,
  PageHeader,
  Pill,
  cx,
  linkClass,
  stretchedLink,
} from '../ui/primitives'
import { KitCallout } from '../ui/KitCallout'
import { NotFound } from './NotFound'

const LessonIllustration = lazy(() =>
  import('../ui/LessonIllustration').then((m) => ({ default: m.LessonIllustration })),
)

const stages = [
  { id: 'understand', label: '1. Understand' },
  { id: 'build', label: '2. Build & test' },
  { id: 'verify', label: '3. Verify & log' },
] as const
type StageId = (typeof stages)[number]['id']

const steps = [
  { id: 'overview', label: 'Overview', stage: 'understand' },
  { id: 'learn', label: 'Lesson and tutorials', stage: 'understand' },
  { id: 'task', label: 'Your task', stage: 'build' },
  { id: 'prompt', label: 'Your brief', stage: 'build' },
  { id: 'verify', label: 'Verify and complete', stage: 'verify' },
] as const
type StepId = (typeof steps)[number]['id']

const stepStage: Record<StepId, StageId> = {
  overview: 'understand',
  learn: 'understand',
  task: 'build',
  prompt: 'build',
  verify: 'verify',
}

function Step({ id, children }: { id: StepId; children: ReactNode }) {
  return (
    <div
      id={`step-${id}`}
      data-step={id}
      tabIndex={-1}
      className="scroll-mt-24 space-y-6 outline-none"
    >
      {children}
    </div>
  )
}

function StepRail({
  done,
  stage,
  onSelectStep,
}: {
  done: boolean
  stage: StageId
  onSelectStep: (id: StepId) => void
}) {
  const defaultStepForStage: Record<StageId, StepId> = {
    understand: 'overview',
    build: 'task',
    verify: 'verify',
  }
  const [observedStep, setObservedStep] = useState<StepId | null>(null)
  const active =
    observedStep && stepStage[observedStep] === stage ? observedStep : defaultStepForStage[stage]
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    observer.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        const top = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (top) setObservedStep((top.target as HTMLElement).dataset.step as StepId)
      },
      { rootMargin: '-20% 0px -60% 0px' },
    )
    document
      .querySelectorAll('#stage-panels [data-step]')
      .forEach((el) => observer.current?.observe(el))
    return () => observer.current?.disconnect()
  }, [stage])

  return (
    <nav aria-label="Session steps" className="self-start lg:sticky lg:top-8">
      <ol className="relative -mx-1 flex snap-x snap-mandatory scroll-px-1 gap-2 overflow-x-auto px-1 pb-1 [mask-image:linear-gradient(to_right,#000_82%,transparent)] lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:[mask-image:none]">
        {steps.map((step, i) => {
          const isActive = active === step.id
          const complete = done && step.id === 'verify'
          return (
            <li key={step.id} className="shrink-0 snap-start">
              <button
                type="button"
                onClick={() => onSelectStep(step.id)}
                aria-current={isActive ? 'step' : undefined}
                className={cx(
                  'flex w-full cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm font-medium transition-colors lg:border-transparent',
                  isActive
                    ? 'border-indigo-300 bg-indigo-50 text-indigo-900 dark:border-indigo-700 dark:bg-indigo-950 dark:text-indigo-100'
                    : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-950 lg:bg-transparent dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 lg:dark:bg-transparent',
                )}
              >
                <span
                  aria-hidden
                  className={cx(
                    'grid h-6 w-6 shrink-0 place-items-center rounded-full font-mono text-xs font-semibold',
                    complete
                      ? 'bg-emerald-600 text-white dark:bg-emerald-400 dark:text-stone-950'
                      : isActive
                        ? 'bg-indigo-600 text-white dark:bg-indigo-400 dark:text-stone-950'
                        : 'border border-stone-300 text-stone-600 dark:border-stone-600 dark:text-stone-300',
                  )}
                >
                  {complete ? <CheckIcon className="h-3.5 w-3.5" /> : i + 1}
                </span>
                <span className="whitespace-nowrap">{step.label}</span>
                {complete && <span className="sr-only">(done)</span>}
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card>
      <h2 className="mb-3 text-lg font-semibold">{title}</h2>
      <div className="space-y-3">{children}</div>
    </Card>
  )
}

export function LessonPage() {
  const { lessonId = '' } = useParams()
  const lesson = lessonById(lessonId)
  const status = useLevelStatus(lesson?.levelId ?? 0)
  const { data } = useStore()
  const guide = guides[lessonId]
  const [stageState, setStageState] = useState<{ lessonId: string; stage: StageId }>({
    lessonId,
    stage: 'understand',
  })
  const tabRefs = useRef<Record<StageId, HTMLButtonElement | null>>({
    understand: null,
    build: null,
    verify: null,
  })

  if (!lesson || !status || !guide) return <NotFound />
  const stage: StageId = stageState.lessonId === lesson.id ? stageState.stage : 'understand'
  const setStage = (next: StageId) => setStageState({ lessonId: lesson.id, stage: next })
  const done = !!data.lessons[lesson.id]?.completedAt

  const index = allLessons.findIndex((l) => l.id === lesson.id)
  const prev = allLessons[index - 1]
  const next = allLessons[index + 1]
  const wiki = wikiSteps[lesson.id]
  const prereqs = lesson.prerequisites.map((id) => lessonById(id)).filter((l) => l !== undefined)
  const readingResource = resourceById(guide.reading.resourceId)

  const focusStep = (id: StepId) => {
    const targetStage = stepStage[id]
    setStage(targetStage)
    requestAnimationFrame(() => {
      const el = document.getElementById(`step-${id}`)
      if (!el) return
      const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
      el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
      el.focus({ preventScroll: true })
    })
  }

  const onStageKeyDown = (e: KeyboardEvent<HTMLButtonElement>, currentIdx: number) => {
    let nextIdx: number | null = null
    if (e.key === 'ArrowRight') nextIdx = (currentIdx + 1) % stages.length
    else if (e.key === 'ArrowLeft') nextIdx = (currentIdx - 1 + stages.length) % stages.length
    else if (e.key === 'Home') nextIdx = 0
    else if (e.key === 'End') nextIdx = stages.length - 1
    if (nextIdx === null) return
    e.preventDefault()
    const target = stages[nextIdx]!
    setStage(target.id)
    tabRefs.current[target.id]?.focus()
  }

  return (
    <article className="space-y-6">
      <nav aria-label="Breadcrumb" className="text-sm text-stone-600 dark:text-stone-400">
        <Link to="/levels" className={linkClass}>
          Course
        </Link>
        {' / '}
        <Link to={`/levels/${lesson.levelId}`} className={linkClass}>
          Level {lesson.levelId}: {status.level.title}
        </Link>
      </nav>

      <PageHeader
        eyebrow={`Session ${lesson.number}`}
        title={lesson.title}
        actions={<BookmarkButton id={lesson.id} label={lesson.title} />}
      />

      <div className="flex flex-wrap gap-1.5 text-xs">
        <Pill>{formatMinutes(lesson.minutes)}</Pill>
        <Pill>{lesson.difficulty}</Pill>
        {status.standing === 'strong' && !lesson.safetyCritical && (
          <Pill tone="blue">Familiar: skim the reading</Pill>
        )}
        {lesson.safetyCritical && <Pill tone="red">Safety critical</Pill>}
      </div>

      <details className="text-sm">
        <summary className="cursor-pointer font-medium text-stone-700 dark:text-stone-300">
          Session outcome and tools
        </summary>
        <p className="mt-3 max-w-prose leading-relaxed">{inline(lesson.goal)}</p>
        <p className="mt-2 text-stone-600 dark:text-stone-400">Tools: {lesson.tools.join(', ')}.</p>
        <p className="mt-1 text-stone-600 dark:text-stone-400">
          Builds: {lesson.competencies.map((c) => competencyById[c].name).join(', ')}
          {prereqs.length
            ? `. Builds on: ${prereqs.map((p) => `session ${p.number}`).join(', ')}`
            : ''}
          .
        </p>
        <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
          {lesson.xp} XP · Mentor review {lesson.mentorReview}
          {lesson.practicalProof ? ' · Practical proof' : ''}
        </p>
      </details>

      <KitCallout lessonId={lesson.id} />

      {!status.unlocked && (
        <Card
          className="border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/40"
          role="note"
        >
          <p className="flex items-center gap-2 font-medium">
            <LockIcon /> Read-only preview
          </p>
          <p className="mt-1 text-sm">
            You can read this session now. Evidence opens once you finish the required sessions of{' '}
            <Link to={`/levels/${lesson.levelId - 1}`} className={linkClass}>
              Level {lesson.levelId - 1}
            </Link>
            .
          </p>
        </Card>
      )}

      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-10">
        <StepRail key={lesson.id} done={done} stage={stage} onSelectStep={focusStep} />
        <div id="stage-panels" className="space-y-6">
          <div
            role="tablist"
            aria-label="Session stages"
            className="grid grid-cols-3 gap-2 rounded-2xl border border-stone-200 bg-stone-100/80 p-1.5 dark:border-stone-800 dark:bg-stone-900"
          >
            {stages.map((s, idx) => {
              const selected = stage === s.id
              const complete = done && s.id === 'verify'
              return (
                <button
                  key={s.id}
                  ref={(el) => {
                    tabRefs.current[s.id] = el
                  }}
                  id={`stage-tab-${s.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`stage-panel-${s.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setStage(s.id)}
                  onKeyDown={(e) => onStageKeyDown(e, idx)}
                  className={cx(
                    'flex min-h-10 cursor-pointer items-center justify-center gap-1.5 rounded-xl px-2.5 py-2 text-xs font-semibold transition-colors sm:text-sm',
                    selected
                      ? 'bg-white text-indigo-900 shadow-xs ring-1 ring-stone-200 dark:bg-stone-800 dark:text-indigo-200 dark:ring-stone-700'
                      : 'text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white',
                  )}
                >
                  {complete && (
                    <CheckIcon className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  )}
                  <span>{s.label}</span>
                </button>
              )
            })}
          </div>

          <div
            id="stage-panel-understand"
            role="tabpanel"
            aria-labelledby="stage-tab-understand"
            hidden={stage !== 'understand'}
            className="space-y-6"
          >
            <Step id="overview">
              {lesson.id === 's1' ? (
                <Card className="border-indigo-200 bg-indigo-50/50 dark:border-indigo-900 dark:bg-indigo-950/30">
                  <h2 className="text-lg font-semibold">Meet Wayfinder</h2>
                  <p className="mt-2 text-sm leading-relaxed text-stone-800 dark:text-stone-200">
                    Planning a weekend trip with friends or family usually scatters across saved
                    reels, map pins and a group chat where nobody checks Monday closures, transit
                    buffers or shared costs until someone is standing outside a shut museum in the
                    rain. Across these twenty sessions you act as Wayfinder&apos;s PM, taking{' '}
                    <strong>Day Plan &amp; Budget Split</strong> (calculated in tested code, such as
                    a <strong>$180</strong> cap minus <strong>$94.50</strong> booked stops ={' '}
                    <strong>$85.50</strong> left before meals and local transit) and an{' '}
                    <strong>Ask Wayfinder</strong> drawer (rainy-day replanning plus
                    traveller-approved reservation holds) from first pitch to prototype, discovery,
                    PRD, evals, experiment readout and living product wiki.
                  </p>
                  <p className="mt-3 text-sm text-stone-700 dark:text-stone-300">
                    <Link to="/case-study" className={`font-semibold ${linkClass}`}>
                      Open the Wayfinder case study, starting hypothesis, screens and rules
                    </Link>{' '}
                    · Prefer your own product? Swap it in at any session using public facts and
                    fictional data.
                  </p>
                </Card>
              ) : (
                <div className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-xs leading-relaxed text-stone-700 dark:border-stone-800 dark:bg-stone-900/70 dark:text-stone-300">
                  <strong>Wayfinder:</strong> weekend day plan and shared budget split ($180 cap
                  minus $94.50 booked stops = $85.50 left before meals and local transit) ·{' '}
                  <Link to="/case-study" className={`font-semibold ${linkClass}`}>
                    Open Wayfinder case study
                  </Link>{' '}
                  · Or swap in your own product.
                </div>
              )}
              <SessionBrief
                guide={guide}
                minutes={lesson.minutes}
                whyItMatters={lesson.whyItMatters}
                readingResource={readingResource}
              />
            </Step>

            <Step id="learn">
              <div className="lesson-reader space-y-8 rounded-2xl border border-stone-200 bg-white px-5 py-7 sm:px-8 dark:border-stone-800 dark:bg-stone-900">
                {lesson.learn.map((s) => (
                  <section key={s.heading}>
                    <h2 className="mb-3 text-xl font-semibold tracking-tight">{s.heading}</h2>
                    <div className="space-y-3">
                      <Paragraphs items={s.paragraphs} />
                      {s.bullets && <Bullets items={s.bullets} />}
                      {s.illustration && (
                        <Suspense fallback={<p role="status">Loading illustration...</p>}>
                          <LessonIllustration key={s.illustration} id={s.illustration} />
                        </Suspense>
                      )}
                    </div>
                  </section>
                ))}
              </div>

              <WorkedExample guide={guide} />
              <DecisionPractice key={lesson.id} guide={guide} />

              <Section title="Tutorials, courses and sources">
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  Start with the assigned source above, work through the structured courses in the
                  order shown on{' '}
                  <Link to="/resources" className={linkClass}>
                    Courses in order
                  </Link>
                  , and use the videos and articles to go deeper before starting the task.
                </p>
                <ResourceRefs refs={lesson.resources} />
              </Section>
            </Step>

            <div className="flex justify-end pt-2">
              <Button onClick={() => focusStep('task')}>
                Continue to 2. Build &amp; test <span aria-hidden>→</span>
              </Button>
            </div>
          </div>

          <div
            id="stage-panel-build"
            role="tabpanel"
            aria-labelledby="stage-tab-build"
            hidden={stage !== 'build'}
            className="space-y-6"
          >
            <Step id="task">
              {lesson.practiceFiles && lesson.practiceFiles.length > 0 && (
                <PracticeFiles files={lesson.practiceFiles} />
              )}
              <Section title="Your task">
                <p className="leading-relaxed">{inline(lesson.task.summary)}</p>
                <Bullets items={lesson.task.steps} ordered />
                <p className="rounded-xl bg-stone-100 px-4 py-3 text-sm text-stone-700 dark:bg-stone-800/60 dark:text-stone-300">
                  {inline(
                    'Using your own product? Swap Wayfinder for it and use your own `product-context.md`.',
                  )}
                </p>
              </Section>
            </Step>

            <Step id="prompt">
              <Section title="Your brief">
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  For {lesson.agentPrompt.tool}. {lesson.agentPrompt.where}.{' '}
                  {lesson.levelId === 1
                    ? 'Fill in any bracketed blanks in your own words before sending.'
                    : 'Write the brief in your own words first.'}
                </p>
                {lesson.levelId === 1 ? (
                  <>
                    <pre
                      tabIndex={0}
                      className="max-h-96 overflow-auto rounded-xl bg-stone-100 p-4 text-sm whitespace-pre-wrap dark:bg-stone-950"
                    >
                      <code>{lesson.agentPrompt.text}</code>
                    </pre>
                    <CopyButton text={lesson.agentPrompt.text} label="Copy prompt" />
                  </>
                ) : (
                  <>
                    {lesson.agentPrompt.briefChecklist &&
                      lesson.agentPrompt.briefChecklist.length > 0 && (
                        <div>
                          <h3 className="mb-2 text-sm font-semibold">Your brief must cover</h3>
                          <Bullets items={lesson.agentPrompt.briefChecklist} />
                        </div>
                      )}
                    {lesson.agentPrompt.boilerplate && (
                      <div className="space-y-2">
                        <h3 className="text-sm font-semibold">Ready-made setup file</h3>
                        <pre
                          tabIndex={0}
                          className="max-h-96 overflow-auto rounded-xl bg-stone-100 p-4 text-sm whitespace-pre-wrap dark:bg-stone-950"
                        >
                          <code>{lesson.agentPrompt.boilerplate}</code>
                        </pre>
                        <CopyButton text={lesson.agentPrompt.boilerplate} label="Copy setup file" />
                      </div>
                    )}
                    <details className="rounded-xl border border-stone-200 p-4 text-sm dark:border-stone-800">
                      <summary className="cursor-pointer font-medium">
                        Compare with a sample brief after you write yours
                      </summary>
                      <pre
                        tabIndex={0}
                        className="mt-3 max-h-96 overflow-auto rounded-xl bg-stone-100 p-4 text-sm whitespace-pre-wrap dark:bg-stone-950"
                      >
                        <code>{lesson.agentPrompt.text}</code>
                      </pre>
                    </details>
                  </>
                )}
              </Section>
            </Step>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <Button variant="secondary" onClick={() => focusStep('overview')}>
                <span aria-hidden>←</span> Back to 1. Understand
              </Button>
              <Button onClick={() => focusStep('verify')}>
                Continue to 3. Verify &amp; log <span aria-hidden>→</span>
              </Button>
            </div>
          </div>

          <div
            id="stage-panel-verify"
            role="tabpanel"
            aria-labelledby="stage-tab-verify"
            hidden={stage !== 'verify'}
            className="space-y-6"
          >
            <Step id="verify">
              <Card>
                <h2 className="mb-3 text-lg font-semibold">Done when</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-1 text-sm font-semibold">Keep</h3>
                    <p className="leading-relaxed">{inline(lesson.artifact)}</p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="mb-1 text-sm font-semibold">Good output</h3>
                      <Bullets items={lesson.expectedOutput} />
                    </div>
                    <div>
                      <h3 className="mb-1 text-sm font-semibold">Check it</h3>
                      <Bullets items={lesson.verification} />
                    </div>
                  </div>
                  {wiki && (
                    <div className="border-t border-stone-200 pt-4 dark:border-stone-800">
                      <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm font-semibold">File it</h3>
                        <Link to="/wiki" className={`text-sm ${linkClass}`}>
                          Your wiki
                        </Link>
                      </div>
                      <p className="leading-relaxed">{inline(wiki.capture)}</p>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {wiki.pages.map((p) => (
                          <li key={p}>
                            <code className="rounded bg-stone-100 px-1.5 py-0.5 text-xs dark:bg-stone-800">
                              {p}
                            </code>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Card>

              <EvidencePanel
                slice="lessons"
                id={lesson.id}
                checklist={lesson.checklist}
                reflectionPrompts={lesson.reflectionPrompts}
                artifactHint={lesson.artifact}
                locked={!status.unlocked}
              />

              <details className="group/m rounded-2xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-2xl p-5 font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 [&::-webkit-details-marker]:hidden">
                  For your mentor
                  <Chevron className="rotate-90 group-open/m:-rotate-90" />
                </summary>
                <p className="px-5 pb-5 leading-relaxed">{inline(lesson.mentorMove)}</p>
              </details>

              {lesson.soloMove && (
                <details className="group/s rounded-2xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-2xl p-5 font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 [&::-webkit-details-marker]:hidden">
                    Working solo?
                    <Chevron className="rotate-90 group-open/s:-rotate-90" />
                  </summary>
                  <p className="px-5 pb-5 leading-relaxed">{inline(lesson.soloMove)}</p>
                </details>
              )}
            </Step>

            <div className="flex justify-start">
              <Button variant="secondary" onClick={() => focusStep('task')}>
                <span aria-hidden>←</span> Back to 2. Build &amp; test
              </Button>
            </div>
          </div>

          <p className="border-t border-stone-200 pt-4 text-sm leading-relaxed text-stone-700 dark:border-stone-800 dark:text-stone-300">
            {guide.bridge}
          </p>
        </div>
      </div>

      <nav aria-label="Session navigation" className="grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Card as="div" interactive className="flex items-center gap-3 p-4">
            <Chevron className="rotate-180 motion-safe:group-hover:-translate-x-0.5" />
            <span className="min-w-0">
              <span className="block font-mono text-xs tracking-[0.12em] text-stone-600 uppercase dark:text-stone-400">
                Previous
              </span>
              <Link to={`/lessons/${prev.id}`} className={stretchedLink}>
                Session {prev.number}: {prev.title}
              </Link>
            </span>
          </Card>
        ) : (
          <span />
        )}
        {next && (
          <Card as="div" interactive className="flex items-center justify-end gap-3 p-4 text-right">
            <span className="min-w-0">
              <span className="block font-mono text-xs tracking-[0.12em] text-stone-600 uppercase dark:text-stone-400">
                Next
              </span>
              <Link to={`/lessons/${next.id}`} className={stretchedLink}>
                Session {next.number}: {next.title}
              </Link>
            </span>
            <Chevron />
          </Card>
        )}
      </nav>
    </article>
  )
}
