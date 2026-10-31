import { useId, useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { levelById } from '../content'
import type { RubricDimension } from '../content/types'
import { formatDate, formatMinutes } from '../domain/dates'
import {
  PROJECT_MIN_DIMENSION,
  PROJECT_PASS_AVERAGE,
  needsMentorSignoff,
  projectResults,
  rubricDimensions,
  rubricScale,
} from '../domain/progress'
import { emptyProjectRecord, type LearnerData, type ProjectRecord } from '../storage/schema'
import { useLevelStatus, useLevelStatuses } from '../state/hooks'
import { useStore } from '../state/store'
import { inline, Paragraphs } from '../ui/RichText'
import {
  Button,
  Card,
  CheckIcon,
  cx,
  EmptyState,
  inputClass,
  LinkButton,
  LockIcon,
  PageHeader,
  Pill,
  linkClass,
} from '../ui/primitives'
import { CaseStudyStrip } from '../ui/CaseStudyStrip'

function ensureProject(draft: LearnerData, key: string): ProjectRecord {
  const existing = draft.projects[key]
  if (existing) return existing
  const fresh = emptyProjectRecord()
  draft.projects[key] = fresh
  return fresh
}

function RequirementRow({ ok, children }: { ok: boolean; children: ReactNode }) {
  return (
    <li className="flex items-center gap-2">
      <span
        aria-hidden
        className={cx(
          'grid h-5 w-5 shrink-0 place-items-center rounded-full text-xs',
          ok
            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
            : 'bg-stone-100 text-stone-400 dark:bg-stone-800',
        )}
      >
        {ok ? <CheckIcon className="h-3 w-3" /> : ''}
      </span>
      <span className={ok ? '' : 'text-stone-600 dark:text-stone-400'}>
        <span className="sr-only">{ok ? 'Done: ' : 'Not yet: '}</span>
        {children}
      </span>
    </li>
  )
}

export function ProjectPage() {
  const { levelId: raw } = useParams()
  // Keyed so local form state resets when the route moves between levels.
  return <ProjectPageView key={raw} levelId={Number(raw)} />
}

function ProjectPageView({ levelId }: { levelId: number }) {
  const level = levelById(levelId)
  const status = useLevelStatus(levelId)
  const statuses = useLevelStatuses()
  const { data, update } = useStore()
  const uid = useId()
  const key = String(levelId)
  const record = data.projects[key]
  const [draftScores, setDraftScores] = useState<Record<RubricDimension, number> | null>(null)
  const [savedNote, setSavedNote] = useState('')

  if (!level || !status) {
    return (
      <EmptyState
        title="Project not found"
        action={<LinkButton to="/levels">Back to the learning path</LinkButton>}
      >
        There is no level with that number.
      </EmptyState>
    )
  }

  const project = level.project
  const locked = !status.unlocked
  const result = projectResults(project, record, needsMentorSignoff(data, level.id))
  const saved = record?.rubric ?? emptyProjectRecord().rubric
  const scores = draftScores ?? saved
  const allScored = rubricDimensions.every((d) => scores[d.id] > 0)
  const dirty =
    draftScores !== null && rubricDimensions.some((d) => draftScores[d.id] !== saved[d.id])
  const assessedBy = record?.assessedBy ?? 'self'
  const needsMentorName = assessedBy === 'mentor' && !record?.mentorName.trim()
  const canSave = allScored && !needsMentorName

  const setField = (fn: (r: ProjectRecord) => void) =>
    update((d) => {
      fn(ensureProject(d, key))
    })

  const saveAssessment = () => {
    if (!canSave) return
    update((d) => {
      const r = ensureProject(d, key)
      r.rubric = { ...scores }
      r.assessedAt = new Date().toISOString()
    })
    setDraftScores(null)
    setSavedNote(`Assessment saved ${formatDate(new Date().toISOString())}.`)
  }

  const backLink = (
    <Link to={`/levels/${level.id}`} className={`text-sm ${linkClass}`}>
      Back to Level {level.id}
    </Link>
  )

  const prev = statuses.find((s) => s.level.id === level.id - 1)

  return (
    <>
      <PageHeader eyebrow={`Level ${level.id} project`} title={project.title} actions={backLink}>
        About {formatMinutes(project.minutes)} · {project.xp} XP. Passing needs every deliverable,
        evidence, a rubric average of at least {PROJECT_PASS_AVERAGE} and no dimension below{' '}
        {PROJECT_MIN_DIMENSION}.
      </PageHeader>

      {level.id >= 3 && (
        <div className="mb-6">
          <CaseStudyStrip levelId={level.id} />
        </div>
      )}

      {locked && (
        <Card className="mb-6 border-amber-300 dark:border-amber-800">
          <p className="flex items-center gap-2 font-medium">
            <LockIcon /> This project is locked
          </p>
          <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
            Level {level.id} unlocks when you finish the required sessions of Level {level.id - 1}
            {prev ? ` (${prev.level.title})` : ''}. You can read the brief now, but progress cannot
            be recorded yet.
          </p>
        </Card>
      )}

      <div className="space-y-6">
        <Card>
          <h2 className="mb-2 text-lg font-semibold">Brief</h2>
          <Paragraphs items={project.brief.split(/\n{2,}/)} />
          {project.privacyNote && (
            <div className="mt-4 rounded-lg border border-sky-200 bg-sky-50 p-3 text-sm text-sky-900 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-200">
              <p className="font-medium">Privacy</p>
              <p className="mt-1">{inline(project.privacyNote)}</p>
            </div>
          )}
        </Card>

        <Card>
          <h2 className="mb-3 text-lg font-semibold">Deliverables</h2>
          <ul className="space-y-2">
            {project.deliverables.map((item) => {
              const checked = record?.deliverables[item.id] === true
              return (
                <li key={item.id}>
                  <label
                    className={cx(
                      'flex cursor-pointer items-start gap-3 rounded-lg p-2 hover:bg-stone-50 dark:hover:bg-stone-800/50',
                      locked && 'cursor-not-allowed opacity-80',
                    )}
                  >
                    <input
                      type="checkbox"
                      className="mt-0.5 h-5 w-5 shrink-0 accent-indigo-600"
                      checked={checked}
                      disabled={locked}
                      onChange={(e) =>
                        setField((r) => void (r.deliverables[item.id] = e.target.checked))
                      }
                    />
                    <span
                      className={cx(
                        'leading-snug',
                        checked && 'text-stone-500 dark:text-stone-400',
                      )}
                    >
                      {inline(item.text)}
                    </span>
                  </label>
                </li>
              )
            })}
          </ul>
          <div className="mt-4 flex flex-col gap-1">
            <label htmlFor={`${uid}-evidence`} className="text-sm font-medium">
              Evidence
            </label>
            <textarea
              id={`${uid}-evidence`}
              rows={4}
              className={inputClass}
              disabled={locked}
              value={record?.evidence ?? ''}
              onChange={(e) => setField((r) => void (r.evidence = e.target.value))}
              placeholder="Links or file paths: the repo, the pull request, the wiki page, the deployed URL."
            />
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Paths and links only. Do not paste real customer or account data.
            </p>
          </div>
        </Card>

        <Card>
          <h2 className="mb-1 text-lg font-semibold">Rubric</h2>
          <p className="mb-4 text-sm text-stone-600 dark:text-stone-400">
            Score honestly against the descriptors.{' '}
            {result.requireMentor
              ? 'This project counts only with a mentor assessment: it ships code and an agent that handles money, where self-scoring is least reliable.'
              : 'A mentor assessment is worth asking for: it is the closest thing to a real review.'}
          </p>
          <fieldset disabled={locked} className="mb-5">
            <legend className="mb-2 text-sm font-medium">Who is assessing?</legend>
            <div className="flex flex-wrap gap-4">
              {(['self', 'mentor'] as const).map((who) => (
                <label key={who} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name={`${uid}-assessor`}
                    className="h-4 w-4 accent-indigo-600"
                    checked={assessedBy === who}
                    onChange={() => setField((r) => void (r.assessedBy = who))}
                  />
                  {who === 'self' ? 'Self assessment' : 'Mentor assessment'}
                </label>
              ))}
            </div>
            {assessedBy === 'mentor' && (
              <div className="mt-3 flex max-w-sm flex-col gap-1">
                <label htmlFor={`${uid}-mentor`} className="text-sm font-medium">
                  Mentor name
                </label>
                <input
                  id={`${uid}-mentor`}
                  className={inputClass}
                  value={record?.mentorName ?? ''}
                  onChange={(e) => setField((r) => void (r.mentorName = e.target.value))}
                />
              </div>
            )}
          </fieldset>

          <div className="space-y-5">
            {rubricDimensions.map((dim) => (
              <fieldset
                key={dim.id}
                disabled={locked}
                className="rounded-xl border border-stone-200 p-4 dark:border-stone-800"
              >
                <legend className="px-1 font-medium">{dim.label}</legend>
                <p className="text-sm text-stone-600 dark:text-stone-400">{dim.question}</p>
                <p className="mt-2 text-sm">
                  <span className="font-medium">What solid (3) looks like: </span>
                  {inline(project.rubric[dim.id])}
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {rubricScale.map((s) => {
                    const on = scores[dim.id] === s.value
                    return (
                      <label
                        key={s.value}
                        className={cx(
                          'flex cursor-pointer items-center gap-2 rounded-lg border p-2 text-sm',
                          on
                            ? 'border-indigo-400 bg-indigo-50 dark:border-indigo-700 dark:bg-indigo-950/40'
                            : 'border-stone-200 dark:border-stone-800',
                          locked && 'cursor-not-allowed',
                        )}
                      >
                        <input
                          type="radio"
                          name={`${uid}-${dim.id}`}
                          className="h-4 w-4 accent-indigo-600"
                          checked={on}
                          onChange={() => setDraftScores({ ...scores, [dim.id]: s.value })}
                        />
                        <span>
                          <span className="tabular-nums">{s.value}</span> {s.label}
                        </span>
                      </label>
                    )
                  })}
                </div>
              </fieldset>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-1">
            <label htmlFor={`${uid}-notes`} className="text-sm font-medium">
              Assessment notes
            </label>
            <textarea
              id={`${uid}-notes`}
              rows={3}
              className={inputClass}
              disabled={locked}
              value={record?.notes ?? ''}
              onChange={(e) => setField((r) => void (r.notes = e.target.value))}
              placeholder="What was strong, what to improve, what you would do differently next time."
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button onClick={saveAssessment} disabled={locked || !canSave}>
              Save assessment
            </Button>
            {dirty && (
              <span className="text-sm text-amber-800 dark:text-amber-300">
                Unsaved rubric changes
              </span>
            )}
            {allScored && needsMentorName && !locked && (
              <span className="text-sm text-stone-600 dark:text-stone-400">
                Add your mentor's name to save a mentor assessment.
              </span>
            )}
            {!allScored && !locked && (
              <span className="text-sm text-stone-600 dark:text-stone-400">
                Score all four dimensions to save.
              </span>
            )}
            <span className="text-sm text-stone-600 dark:text-stone-400" aria-live="polite">
              {savedNote}
            </span>
          </div>
        </Card>

        <Card className={result.passed ? 'border-emerald-300 dark:border-emerald-800' : undefined}>
          <h2 className="mb-2 text-lg font-semibold">Result</h2>
          {result.passed ? (
            <div>
              <p className="flex items-center gap-2 font-medium text-emerald-800 dark:text-emerald-300">
                <CheckIcon className="h-5 w-5" /> Passed
                {result.passedAt ? ` on ${formatDate(result.passedAt)}` : ''} with an average of{' '}
                {result.avg.toFixed(1)}
              </p>
              <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                {result.assessedBy === 'mentor'
                  ? `Assessed by ${record?.mentorName.trim() || 'your mentor'}.`
                  : 'Self assessed. Ask your mentor for a second look when you can.'}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Pill tone="green">
                  {status.mastered ? `Level ${level.id} mastered` : 'Project passed'}
                </Pill>
              </div>
            </div>
          ) : (
            <>
              {result.assessed && (
                <p className="mb-2 text-sm">
                  Last assessed{record?.assessedAt ? ` ${formatDate(record.assessedAt)}` : ''}:
                  average {result.avg.toFixed(1)}, lowest {result.min}.
                </p>
              )}
              <p className="mb-2 text-sm text-stone-600 dark:text-stone-400">
                Still needed to pass:
              </p>
              <ul className="space-y-1 text-sm">
                <RequirementRow ok={result.allDeliverables}>
                  Every deliverable ticked ({result.deliverablesDone} of{' '}
                  {project.deliverables.length})
                </RequirementRow>
                <RequirementRow ok={result.evidence}>Evidence links or paths added</RequirementRow>
                <RequirementRow ok={result.assessed}>
                  All four rubric dimensions scored and saved
                </RequirementRow>
                <RequirementRow ok={result.assessed && result.avg >= PROJECT_PASS_AVERAGE}>
                  Rubric average of at least {PROJECT_PASS_AVERAGE}
                </RequirementRow>
                <RequirementRow ok={result.assessed && result.min >= PROJECT_MIN_DIMENSION}>
                  No dimension below {PROJECT_MIN_DIMENSION}
                </RequirementRow>
                {result.requireMentor && (
                  <RequirementRow ok={!result.mentorMissing}>
                    Assessed by your mentor
                  </RequirementRow>
                )}
              </ul>
            </>
          )}
        </Card>
      </div>
    </>
  )
}
