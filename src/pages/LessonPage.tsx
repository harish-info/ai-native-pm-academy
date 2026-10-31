import { Link, useParams } from 'react-router-dom'
import { allLessons, lessonById } from '../content'
import { competencyById } from '../content/competencies'
import { wikiSteps } from '../content/wiki'
import { formatMinutes } from '../domain/dates'
import { useLevelStatus } from '../state/hooks'
import { CopyButton } from '../ui/CopyButton'
import { EvidencePanel } from '../ui/EvidencePanel'
import { BookmarkButton, ResourceRefs } from '../ui/ResourceBits'
import { Bullets, Paragraphs, inline } from '../ui/RichText'
import { Card, LockIcon, PageHeader, Pill } from '../ui/primitives'
import { NotFound } from './NotFound'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
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
  if (!lesson || !status) return <NotFound />

  const index = allLessons.findIndex((l) => l.id === lesson.id)
  const prev = allLessons[index - 1]
  const next = allLessons[index + 1]
  const optional = !status.requiredLessons.some((l) => l.id === lesson.id)
  const wiki = wikiSteps[lesson.id]
  const prereqs = lesson.prerequisites.map((id) => lessonById(id)).filter((l) => l !== undefined)

  return (
    <article className="space-y-6">
      <nav aria-label="Breadcrumb" className="text-sm text-stone-600 dark:text-stone-400">
        <Link to="/levels" className="underline">
          Learning path
        </Link>
        {' / '}
        <Link to={`/levels/${lesson.levelId}`} className="underline">
          Level {lesson.levelId}: {status.level.title}
        </Link>
      </nav>

      <PageHeader
        eyebrow={`Session ${lesson.number}`}
        title={lesson.title}
        actions={<BookmarkButton id={lesson.id} label={lesson.title} />}
      >
        {lesson.goal}
      </PageHeader>

      <div className="flex flex-wrap gap-1.5 text-xs">
        <Pill>{formatMinutes(lesson.minutes)}</Pill>
        <Pill>{lesson.difficulty}</Pill>
        <Pill>{lesson.xp} XP</Pill>
        {lesson.tools.map((t) => (
          <Pill key={t} tone="blue">
            {t}
          </Pill>
        ))}
        {optional && <Pill tone="blue">Optional for you</Pill>}
        {lesson.practicalProof && <Pill tone="indigo">Practical proof</Pill>}
        {lesson.safetyCritical && <Pill tone="red">Safety critical</Pill>}
        {lesson.mentorReview !== 'optional' && (
          <Pill tone="amber">Mentor review {lesson.mentorReview}</Pill>
        )}
      </div>

      {!status.unlocked && (
        <Card
          className="border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/40"
          role="note"
        >
          <p className="flex items-center gap-2 font-medium">
            <LockIcon /> Read-only preview
          </p>
          <p className="mt-1 text-sm">
            You can read this session now. Evidence opens once you master{' '}
            <Link to={`/levels/${lesson.levelId - 1}`} className="underline">
              Level {lesson.levelId - 1}
            </Link>
            .
          </p>
        </Card>
      )}

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

      {lesson.learn.map((s) => (
        <Section key={s.heading} title={s.heading}>
          <Paragraphs items={s.paragraphs} />
          {s.bullets && <Bullets items={s.bullets} />}
        </Section>
      ))}

      <Section title="Resources">
        <ResourceRefs refs={lesson.resources} />
      </Section>

      <Section title="Your task">
        <p className="leading-relaxed">{inline(lesson.task.summary)}</p>
        <Bullets items={lesson.task.steps} ordered />
      </Section>

      <Section title="Agent prompt">
        <p className="text-sm text-stone-600 dark:text-stone-400">
          For {lesson.agentPrompt.tool}. {lesson.agentPrompt.where}.
        </p>
        <pre className="max-h-96 overflow-auto rounded-xl bg-stone-100 p-4 text-sm whitespace-pre-wrap dark:bg-stone-950">
          <code>{lesson.agentPrompt.text}</code>
        </pre>
        <CopyButton text={lesson.agentPrompt.text} label="Copy prompt" />
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
            <h2 className="text-lg font-semibold">File it in your wiki</h2>
            <Link to="/wiki" className="text-sm underline">
              Wiki guide and prompts
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

      <details className="rounded-2xl border border-stone-200 p-5 dark:border-stone-800">
        <summary className="cursor-pointer font-medium">For your mentor</summary>
        <p className="mt-2 leading-relaxed">{inline(lesson.mentorMove)}</p>
      </details>

      <nav
        aria-label="Session navigation"
        className="flex flex-wrap justify-between gap-3 border-t border-stone-200 pt-4 dark:border-stone-800"
      >
        {prev ? (
          <Link to={`/lessons/${prev.id}`} className="underline">
            Previous: session {prev.number}, {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link to={`/lessons/${next.id}`} className="underline">
            Next: session {next.number}, {next.title}
          </Link>
        )}
      </nav>
    </article>
  )
}
