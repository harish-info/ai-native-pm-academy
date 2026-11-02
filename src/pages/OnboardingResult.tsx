import { Link } from 'react-router-dom'
import { lessonById, levels } from '../content'
import { competencyById, competencyIds } from '../content/competencies'
import { computeOnboardingResult, isDiagnosticCurrent, type Standing } from '../domain/assessment'
import { formatMinutes } from '../domain/dates'
import { useStore } from '../state/store'
import { PairedBars } from '../ui/charts'
import { Card, EmptyState, LinkButton, PageHeader, Pill, Stat, linkClass } from '../ui/primitives'

const standingLabel: Record<Standing, { label: string; tone: 'green' | 'amber' | 'indigo' }> = {
  strong: { label: 'Familiar: skim the reading', tone: 'green' },
  partial: { label: 'Partly familiar', tone: 'amber' },
  new: { label: 'New to you', tone: 'indigo' },
}

export function OnboardingResult() {
  const { data } = useStore()
  if (!data.onboarding) {
    return (
      <EmptyState
        title="No skills check yet"
        action={<LinkButton to="/onboarding">Take the skills check</LinkButton>}
      >
        Where you stand in each level appears here once you finish it.
      </EmptyState>
    )
  }
  if (!isDiagnosticCurrent(data.onboarding)) {
    return (
      <EmptyState
        title="The scenarios have changed"
        action={<LinkButton to="/onboarding">Retake the skills check</LinkButton>}
      >
        The skills check now has new scenarios, three for each level. Retake it to see where you
        stand. Your answers about yourself are kept, and completed work is never lost.
      </EmptyState>
    )
  }
  const result = computeOnboardingResult(data.onboarding, levels)
  const first = lessonById(result.firstLessonId)
  const name =
    typeof data.onboarding.profile.name === 'string' ? data.onboarding.profile.name.trim() : ''
  const rows = competencyIds.map((c) => ({
    label: competencyById[c].short,
    a: result.selfRated[c] === null ? null : (result.selfRated[c]! / 4) * 100,
    b: result.demonstrated[c] ?? 0,
  }))

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Your starting point"
        title={name ? `${name}, here is where you stand` : 'Here is where you stand'}
      >
        Based on {Object.keys(data.onboarding.diagnostic).length} scenarios and your
        self-assessment. You can retake the skills check at any time; completed work is never lost.
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat
          label="Start at"
          value={first ? `Session ${first.number}` : 'Session 1'}
          hint="Each session builds on the one before"
        />
        <Stat
          label="Estimated effort"
          value={formatMinutes(result.estimatedMinutes)}
          hint="All 20 sessions, projects and assessments"
        />
        <Stat
          label="At your pace"
          value={`${result.estimatedWeeks} weeks`}
          hint={`At about ${result.weeklyHours} hours a week`}
        />
      </div>

      <Card>
        <h2 className="mb-3 text-lg font-semibold">Where you stand in each level</h2>
        <ul className="divide-y divide-stone-200 dark:divide-stone-800">
          {levels.map((l) => {
            const r = result.levels[l.id]
            return (
              <li key={l.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                <span>
                  <Link to={`/levels/${l.id}`} className={linkClass}>
                    Level {l.id}: {l.title}
                  </Link>
                  <span className="block text-sm text-stone-600 dark:text-stone-400">
                    {r.correct} of {r.total} scenarios right
                  </span>
                </span>
                <Pill tone={standingLabel[r.standing].tone}>{standingLabel[r.standing].label}</Pill>
              </li>
            )
          })}
        </ul>
        <p className="mt-3 text-sm text-stone-600 dark:text-stone-400">
          Everyone starts at Session 1, because each session builds on files from the ones before.
          In a level where you got every scenario right, skim the reading and spend your time on the
          tasks. Every task still counts towards the badge.
        </p>
      </Card>

      <Card>
        <PairedBars
          title="Self-rating versus scenario results"
          description="Self-rating is scaled from 1 to 4 onto 0 to 100%. Large gaps in either direction are worth discussing with your mentor."
          rows={rows}
          aLabel="Self-rated"
          bLabel="Scenario result"
        />
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="mb-2 text-lg font-semibold">Focus areas</h2>
          {result.weakAreas.length ? (
            <ul className="space-y-2">
              {result.weakAreas.slice(0, 5).map((c) => (
                <li key={c}>
                  <span className="font-medium">{competencyById[c].name}</span>
                  <span className="block text-sm text-stone-600 dark:text-stone-400">
                    {competencyById[c].description}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-stone-600 dark:text-stone-400">
              No area scored below 50%. The practical work will still stretch you.
            </p>
          )}
        </Card>
        <Card>
          <h2 className="mb-2 text-lg font-semibold">Confidence gaps</h2>
          {result.confidenceGaps.length ? (
            <>
              <p className="mb-2 text-sm text-stone-600 dark:text-stone-400">
                You rated yourself confident here, but the scenarios disagreed. These are the most
                valuable areas to revisit.
              </p>
              <ul className="flex flex-wrap gap-2">
                {result.confidenceGaps.map((c) => (
                  <li key={c}>
                    <Pill tone="amber">{competencyById[c].name}</Pill>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-stone-600 dark:text-stone-400">
              Your confidence matches your results. Good calibration is a skill in itself.
            </p>
          )}
        </Card>
      </div>

      <Card className="border-indigo-200 dark:border-indigo-900">
        <h2 className="text-lg font-semibold">Start here</h2>
        {first && (
          <p className="mt-1 text-stone-700 dark:text-stone-300">
            Session {first.number}: <strong>{first.title}</strong> ({formatMinutes(first.minutes)}).
            Your first project is <strong>{result.firstProject}</strong>.
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          {first && (
            <LinkButton to={`/lessons/${first.id}`}>Start session {first.number}</LinkButton>
          )}
          <LinkButton to="/plan" variant="secondary">
            See the study plan
          </LinkButton>
          <LinkButton to="/onboarding" variant="ghost">
            Retake the skills check
          </LinkButton>
        </div>
      </Card>
    </div>
  )
}
