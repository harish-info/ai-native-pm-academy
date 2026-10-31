import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { allLessons, guides, lessonById, wikiSteps } from '../content'
import { competencyById } from '../content/competencies'
import { formatMinutes } from '../domain/dates'
import { useLevelStatus } from '../state/hooks'
import { CopyButton } from '../ui/CopyButton'
import { EvidencePanel } from '../ui/EvidencePanel'
import { BookmarkButton, ResourceRefs } from '../ui/ResourceBits'
import { Bullets, Paragraphs, inline } from '../ui/RichText'
import { useStore } from '../state/store'
import { DecisionPractice, SessionBrief, WorkedExample } from '../ui/SessionLearning'
import {
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
import { NotFound } from './NotFound'

const steps = [
  { id: 'overview', label: 'Overview' },
  { id: 'learn', label: 'Lesson and tutorials' },
  { id: 'task', label: 'Practical task' },
  { id: 'prompt', label: 'Agent prompt' },
  { id: 'verify', label: 'Verify and complete' },
] as const
type StepId = (typeof steps)[number]['id']

/** One group of sections the step rail can jump to. */
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

/**
 * The session's five steps. The site uses a hash router, so the rail moves scroll and focus in
 * code instead of using in-page anchors.
 */
function StepRail({ done }: { done: boolean }) {
  const [active, setActive] = useState<StepId>('overview')
  const observer = useRef<IntersectionObserver | null>(null)
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    observer.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        const top = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (top) setActive((top.target as HTMLElement).dataset.step as StepId)
      },
      { rootMargin: '-20% 0px -60% 0px' },
    )
    document.querySelectorAll('[data-step]').forEach((el) => observer.current?.observe(el))
    return () => observer.current?.disconnect()
  }, [])
  const go = (id: StepId) => {
    const el = document.getElementById(`step-${id}`)
    if (!el) return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    el.focus({ preventScroll: true })
    setActive(id)
  }
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
                onClick={() => go(step.id)}
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
  if (!lesson || !status || !guide) return <NotFound />
  const done = !!data.lessons[lesson.id]?.completedAt

  const index = allLessons.findIndex((l) => l.id === lesson.id)
  const prev = allLessons[index - 1]
  const next = allLessons[index + 1]
  const optional = !status.requiredLessons.some((l) => l.id === lesson.id)
  const wiki = wikiSteps[lesson.id]
  const prereqs = lesson.prerequisites.map((id) => lessonById(id)).filter((l) => l !== undefined)

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
        {optional && <Pill tone="blue">Optional for you</Pill>}
        {lesson.safetyCritical && <Pill tone="red">Safety critical</Pill>}
      </div>

      <details className="text-sm">
        <summary className="cursor-pointer font-medium text-stone-700 dark:text-stone-300">
          Session outcome and tools
        </summary>
        <p className="mt-3 max-w-prose leading-relaxed">{inline(lesson.goal)}</p>
        <p className="mt-2 text-stone-600 dark:text-stone-400">Tools: {lesson.tools.join(', ')}.</p>
        <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
          {lesson.xp} XP · Mentor review {lesson.mentorReview}
          {lesson.practicalProof ? ' · Practical proof' : ''}
        </p>
      </details>

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
        <StepRail key={lesson.id} done={done} />
        <div className="space-y-6">
          <Step id="overview">
            <SessionBrief guide={guide} minutes={lesson.minutes} />
            <Section title="Why it matters">
              <Paragraphs items={[lesson.whyItMatters]} />
              <p className="text-sm text-stone-600 dark:text-stone-400">
                Builds: {lesson.competencies.map((c) => competencyById[c].name).join(', ')}
                {prereqs.length
                  ? `. Builds on: ${prereqs.map((p) => `session ${p.number}`).join(', ')}`
                  : ''}
                .
              </p>
            </Section>
          </Step>

          <Step id="learn">
            <div className="lesson-reader space-y-8 rounded-2xl border border-stone-200 bg-white px-5 py-7 sm:px-8 dark:border-stone-800 dark:bg-stone-900">
              {lesson.learn.map((s) => (
                <section key={s.heading} className="mx-auto max-w-prose">
                  <h2 className="mb-3 text-xl font-semibold tracking-tight">{s.heading}</h2>
                  <div className="space-y-3">
                    <Paragraphs items={s.paragraphs} />
                    {s.bullets && <Bullets items={s.bullets} />}
                  </div>
                </section>
              ))}
            </div>

            <Section title="Tutorials and sources">
              <p className="text-sm text-stone-600 dark:text-stone-400">
                Explore the ideas above with these tutorials and original sources. The suggested
                excerpt is included in this session’s time; follow the other links for another
                explanation or more depth.
              </p>
              <ResourceRefs refs={lesson.resources} />
            </Section>

            <WorkedExample guide={guide} />
            <DecisionPractice key={lesson.id} guide={guide} />
          </Step>

          <Step id="task">
            <Section title="Your task">
              <p className="leading-relaxed">{inline(lesson.task.summary)}</p>
              <Bullets items={lesson.task.steps} ordered />
            </Section>
          </Step>

          <Step id="prompt">
            <Section title="Agent prompt">
              <p className="text-sm text-stone-600 dark:text-stone-400">
                For {lesson.agentPrompt.tool}. {lesson.agentPrompt.where}.
              </p>
              <pre
                tabIndex={0}
                className="max-h-96 overflow-auto rounded-xl bg-stone-100 p-4 text-sm whitespace-pre-wrap dark:bg-stone-950"
              >
                <code>{lesson.agentPrompt.text}</code>
              </pre>
              <CopyButton text={lesson.agentPrompt.text} label="Copy prompt" />
            </Section>
          </Step>

          <Step id="verify">
            <Section title="Try it without AI">
              <p className="leading-relaxed">{guide.transfer}</p>
              <p className="text-sm text-stone-600 dark:text-stone-400">
                Use your explanation in the reflection below. If you cannot explain the decision,
                revisit the example before marking the session complete.
              </p>
            </Section>
            <div className="grid gap-4 md:grid-cols-2">
              <Section title="What good output looks like">
                <Bullets items={lesson.expectedOutput} />
              </Section>
              <Section title="How to verify it">
                <Bullets items={lesson.verification} />
              </Section>
            </div>

            <Section title="Artifact to keep">
              <p className="leading-relaxed">{inline(lesson.artifact)}</p>
            </Section>

            {wiki && (
              <Card className="border-indigo-200 dark:border-indigo-900">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-lg font-semibold">File it in your workspace</h2>
                  <Link to="/wiki" className={`text-sm ${linkClass}`}>
                    Workspace guide
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
              </Card>
            )}

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
          </Step>
          <p className="border-t border-stone-200 pt-4 dark:border-stone-800 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
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
