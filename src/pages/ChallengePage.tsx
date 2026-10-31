import { Link, useParams } from 'react-router-dom'
import { challengeById } from '../content'
import { formatMinutes } from '../domain/dates'
import { useLevelStatus } from '../state/hooks'
import { EvidencePanel } from '../ui/EvidencePanel'
import { BookmarkButton, ResourceRefs } from '../ui/ResourceBits'
import { Bullets, inline } from '../ui/RichText'
import { Card, PageHeader, Pill } from '../ui/primitives'
import { NotFound } from './NotFound'

export function ChallengePage() {
  const { challengeId = '' } = useParams()
  const challenge = challengeById(challengeId)
  const status = useLevelStatus(challenge?.levelId ?? 0)
  if (!challenge || !status) return <NotFound />

  const checklist = challenge.steps.map((text, i) => ({ id: `step-${i}`, text }))

  return (
    <article className="space-y-6">
      <nav aria-label="Breadcrumb" className="text-sm text-stone-600 dark:text-stone-400">
        <Link to={`/levels/${challenge.levelId}`} className="underline">
          Level {challenge.levelId}: {status.level.title}
        </Link>
      </nav>
      <PageHeader
        eyebrow="Optional challenge"
        title={challenge.title}
        actions={<BookmarkButton id={challenge.id} label={challenge.title} />}
      >
        {inline(challenge.summary)}
      </PageHeader>
      <div className="flex flex-wrap gap-1.5 text-xs">
        <Pill>{formatMinutes(challenge.minutes)}</Pill>
        <Pill>{challenge.difficulty}</Pill>
        <Pill>{challenge.xp} XP</Pill>
        <Pill tone="blue">Suggested: {challenge.suggestedWindow}</Pill>
      </div>

      <Card>
        <h2 className="mb-2 text-lg font-semibold">Deliverable</h2>
        <p className="leading-relaxed">{inline(challenge.deliverable)}</p>
        <h3 className="mt-4 mb-2 font-semibold">How to verify it</h3>
        <Bullets items={challenge.verification} />
      </Card>

      {challenge.resources.length > 0 && (
        <Card>
          <h2 className="mb-3 text-lg font-semibold">Resources</h2>
          <ResourceRefs refs={challenge.resources} />
        </Card>
      )}

      <EvidencePanel
        slice="challenges"
        id={challenge.id}
        checklist={checklist}
        reflectionPrompts={[
          'What did this challenge change about how you will work?',
          'What would you do differently next time?',
        ]}
        artifactHint={challenge.deliverable}
        locked={!status.unlocked}
      />
    </article>
  )
}
