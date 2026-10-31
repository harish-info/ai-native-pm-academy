import { Link } from 'react-router-dom'
import { activeCase } from '../content'
import { caseStages } from '../content/caseStudies'
import { useStore } from '../state/store'
import { cx, linkClass, staticTile } from './primitives'

/** Shown on level, session and project pages: which case the text is written for, and where in the cycle you are. */
export function CaseStudyStrip({ lessonId, levelId }: { lessonId?: string; levelId?: number }) {
  const { data } = useStore()
  const chosen = data.settings.caseStudy
  const stage = lessonId
    ? caseStages.find((s) => s.lessons.includes(lessonId))
    : caseStages.find((s) => s.project === levelId)
  const index = stage ? caseStages.indexOf(stage) + 1 : 0
  return (
    <p
      className={cx(
        staticTile,
        'flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl px-4 py-2.5 text-sm',
      )}
    >
      {chosen ? (
        <span>
          Case study: <strong className="font-semibold">{activeCase.tokens.name}</strong>
          {stage && (
            <span className="text-stone-600 dark:text-stone-400">
              {' '}
              · Stage {index} of {caseStages.length}, {stage.stage.toLowerCase()}
            </span>
          )}
        </span>
      ) : (
        <span>
          {lessonId ? 'This session' : 'This level'} is written for your case study. You have not
          picked one yet, so it shows {activeCase.tokens.name}.
        </span>
      )}
      <Link to="/case-study" className={cx(linkClass, 'ml-auto')}>
        {chosen ? 'Change or see the brief' : 'Pick your case study'}
      </Link>
    </p>
  )
}
