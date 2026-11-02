import { useId, type ComponentType } from 'react'
import { lessonVisuals, type LessonVisualId } from '../content/illustrations'
import Access from './illustrations/Access'
import ChatAgent from './illustrations/ChatAgent'
import Constraints from './illustrations/Constraints'
import Context from './illustrations/Context'
import Delegate from './illustrations/Delegate'
import Diff from './illustrations/Diff'
import Discovery from './illustrations/Discovery'
import Evals from './illustrations/Evals'
import Experiment from './illustrations/Experiment'
import Funnel from './illustrations/Funnel'
import Git from './illustrations/Git'
import Impact from './illustrations/Impact'
import Knowledge from './illustrations/Knowledge'
import Requirements from './illustrations/Requirements'
import Review from './illustrations/Review'
import Screens from './illustrations/Screens'
import Skills from './illustrations/Skills'
import Solution from './illustrations/Solution'
import Story from './illustrations/Story'
import Strategy from './illustrations/Strategy'
import TeamAttention from './illustrations/TeamAttention'
import TeamLoop from './illustrations/TeamLoop'
import TeamTime from './illustrations/TeamTime'
import Tokens from './illustrations/Tokens'
import Verify from './illustrations/Verify'
import Workspace from './illustrations/Workspace'

const drawings: Record<LessonVisualId, ComponentType> = {
  'chat-agent': ChatAgent,
  tokens: Tokens,
  context: Context,
  delegate: Delegate,
  verification: Verify,
  prototype: Screens,
  workspace: Workspace,
  requirements: Requirements,
  git: Git,
  diff: Diff,
  review: Review,
  strategy: Strategy,
  discovery: Discovery,
  funnel: Funnel,
  impact: Impact,
  solution: Solution,
  evals: Evals,
  experiment: Experiment,
  story: Story,
  knowledge: Knowledge,
  access: Access,
  skills: Skills,
  team: TeamTime,
  constraints: Constraints,
  'team-loop': TeamLoop,
  'team-attention': TeamAttention,
  states: Screens,
}

export function LessonIllustration({ id }: { id: LessonVisualId }) {
  const uid = useId()
  const data = lessonVisuals[id]
  const Drawing = drawings[id]
  return (
    <figure
      aria-labelledby={`${uid}-title`}
      data-illustration={id}
      className="concept-figure my-6 min-w-0 rounded-xl border border-stone-200 bg-stone-50 p-4 sm:p-5 dark:border-stone-700 dark:bg-stone-950"
    >
      <figcaption className="mb-5">
        <p id={`${uid}-title`} className="text-base font-semibold tracking-tight">
          {data.title}
        </p>
        <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">{data.summary}</p>
      </figcaption>
      <Drawing />
      <p className="mt-4 border-t border-stone-200 pt-3 text-xs text-stone-600 dark:border-stone-700 dark:text-stone-300">
        {data.caption}
      </p>
    </figure>
  )
}
