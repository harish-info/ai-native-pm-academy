import { Link } from 'react-router-dom'
import { lessonById, levels } from '../content'
import { competencyById, competencyIds } from '../content/competencies'
import { computeOnboardingResult } from '../domain/assessment'
import { formatMinutes } from '../domain/dates'
import { useStore } from '../state/store'
import { PairedBars } from '../ui/charts'
import { Card, EmptyState, LinkButton, PageHeader, Pill, Stat, linkClass } from '../ui/primitives'

export function OnboardingResult() {
  const { data } = useStore()
  if (!data.onboarding) {
    return (
      <EmptyState
        title="No diagnostic yet"
        action={<LinkButton to="/onboarding">Take the diagnostic</LinkButton>}
      >
        Your personalized path appears here once you finish it.
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
        title={name ? `${name}, here is your path` : 'Here is your path'}
      >
        Based on {Object.keys(data.onboarding.diagnostic).length} scenarios and your
        self-assessment. You can retake the diagnostic at any time; completed work is never lost.
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat
          label="Recommended start"
          value={`Level ${result.startLevel}`}
          hint={levels.find((l) => l.id === result.startLevel)?.title}
        />
        <Stat
          label="Estimated effort"
          value={formatMinutes(result.estimatedMinutes)}
          hint="Required sessions, projects and assessments"
        />
        <Stat
          label="At your pace"
          value={`${result.estimatedWeeks} weeks`}
          hint={`At about ${result.weeklyHours} hours a week`}
        />
      </div>

      <Card>
        <h2 className="mb-3 text-lg font-semibold">Your path through the levels</h2>
        <ul className="divide-y divide-stone-200 dark:divide-stone-800">
          {levels.map((l) => (
            <li key={l.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
              <Link to={`/levels/${l.id}`} className={linkClass}>
                Level {l.id}: {l.title}
              </Link>
              {result.path[l.id] === 'proof-only' ? (
                <Pill tone="green">Theory tested out: practical proof only</Pill>
              ) : (
                <Pill tone="indigo">Full level</Pill>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-stone-600 dark:text-stone-400">
          Testing out skips theory sessions only. Practical-proof and safety-critical sessions, the
          assessment and the project are always required, so every badge means the same thing.
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
            Retake the diagnostic
          </LinkButton>
        </div>
      </Card>
    </div>
  )
}
