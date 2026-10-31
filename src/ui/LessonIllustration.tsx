import { Fragment, useEffect, useId, useState, type ReactNode } from 'react'
import { lessonVisuals, type LessonVisualId } from '../content/illustrations'
import { cx } from './cx'
import { ProductLoop } from './ProductLoop'

type GlyphName = 'person' | 'model' | 'tool' | 'file' | 'shield' | 'check' | 'search' | 'clock'

function Glyph({ name, className }: { name: GlyphName; className?: string }) {
  const paths: Record<GlyphName, ReactNode> = {
    person: (
      <>
        <circle cx="12" cy="7" r="3" />
        <path d="M5 21v-3a7 7 0 0 1 14 0v3" />
      </>
    ),
    model: (
      <>
        <rect x="4" y="5" width="16" height="14" rx="4" />
        <path d="M9 10h.01M15 10h.01M8 15h8M12 2v3M1 10h3M20 10h3" />
      </>
    ),
    tool: <path d="m14 5 5-3a6 6 0 0 1-7 8L5 20a2 2 0 0 1-3-3l9-8a6 6 0 0 1 0-7l3 3Z" />,
    file: (
      <>
        <path d="M5 2h9l5 5v15H5ZM14 2v6h5M8 12h8M8 16h6" />
      </>
    ),
    shield: (
      <>
        <path d="m12 2 8 3v6c0 5-8 11-8 11S4 16 4 11V5Z" />
        <path d="m8 11 3 3 5-6" />
      </>
    ),
    check: <path d="m4 12 5 5L20 5" />,
    search: (
      <>
        <circle cx="10" cy="10" r="7" />
        <path d="m15 15 7 7" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 6v6l4 3" />
      </>
    ),
  }
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cx('h-5 w-5 shrink-0', className)}
    >
      {paths[name]}
    </svg>
  )
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={cx('h-5 w-5 shrink-0 text-stone-500 dark:text-stone-400', className)}
    >
      <path d="M3 12h17m-5-5 5 5-5 5" />
    </svg>
  )
}

function Tile({
  label,
  detail,
  icon,
  active = false,
}: {
  label: string
  detail?: string
  icon?: GlyphName
  active?: boolean
}) {
  return (
    <div
      className={cx(
        'min-w-0 rounded-lg border p-3 text-sm transition-colors',
        active
          ? 'border-indigo-500 bg-indigo-50 dark:border-indigo-500 dark:bg-indigo-950'
          : 'border-stone-200 bg-white dark:border-stone-700 dark:bg-stone-900',
      )}
    >
      <div className="flex items-center gap-2 font-semibold">
        {icon && <Glyph name={icon} className="text-indigo-700 dark:text-indigo-300" />}
        <span>{label}</span>
      </div>
      {detail && (
        <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-stone-300">{detail}</p>
      )}
    </div>
  )
}

const controlClass =
  'min-h-9 cursor-pointer rounded-lg border border-stone-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-stone-100 dark:border-stone-600 dark:hover:bg-stone-800'

function Choices({
  labels,
  value,
  onChange,
  label,
}: {
  labels: string[]
  value: number
  onChange: (n: number) => void
  label: string
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {labels.map((text, i) => (
        <button
          key={text}
          type="button"
          aria-pressed={value === i}
          onClick={() => onChange(i)}
          className={cx(
            controlClass,
            value === i &&
              'border-indigo-600 bg-indigo-50 text-indigo-900 dark:border-indigo-400 dark:bg-indigo-950 dark:text-indigo-100',
          )}
        >
          {text}
        </button>
      ))}
    </div>
  )
}

function Flow({ steps }: { steps: readonly { label: string; detail?: string }[] }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
      {steps.map((step, i) => (
        <Fragment key={step.label}>
          {i > 0 && <Arrow className="self-center rotate-90 sm:rotate-0" />}
          <div className="min-w-0 flex-1">
            <Tile {...step} />
          </div>
        </Fragment>
      ))}
    </div>
  )
}

function ChatAgent() {
  const data = lessonVisuals['chat-agent']
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  useEffect(() => {
    if (!playing) return
    const timer = window.setTimeout(() => {
      if (step === data.steps.length - 1) setPlaying(false)
      else setStep(step + 1)
    }, 1400)
    return () => window.clearTimeout(timer)
  }, [playing, step, data.steps.length])
  const play = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStep((step + 1) % data.steps.length)
      return
    }
    setStep(0)
    setPlaying(true)
  }
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-stone-200 p-3 dark:border-stone-700">
          <p className="mb-3 text-sm font-semibold">Plain chat</p>
          <div className="flex items-center justify-between gap-2">
            <Glyph name="person" />
            <Arrow />
            <Glyph name="model" />
            <Arrow />
            <Glyph name="person" />
          </div>
          <p className="mt-3 text-xs text-stone-600 dark:text-stone-300">
            Ask → answer. You supply the file contents and do any external work.
          </p>
        </div>
        <div className="rounded-lg border border-stone-200 p-3 dark:border-stone-700">
          <p className="mb-3 text-sm font-semibold">Agent with file tools</p>
          <div className="relative flex items-center justify-center gap-4 pb-6 text-indigo-700 dark:text-indigo-300">
            <Glyph name="model" />
            <Arrow />
            <Glyph name="tool" />
            <svg
              aria-hidden
              viewBox="0 0 160 30"
              className="absolute right-0 bottom-0 h-7 w-full"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <path d="M125 2v10c0 8-90 8-90 0V5m-4 4 4-4 4 4" />
            </svg>
          </div>
          <p className="mt-3 text-xs text-stone-600 dark:text-stone-300">
            Choose → act → observe. Continue or stop within the allowed scope.
          </p>
        </div>
      </div>
      <ol className="grid grid-cols-5 gap-1.5" aria-label="Agent loop stages">
        {data.steps.map((item, i) => (
          <li
            key={item.label}
            aria-current={i === step ? 'step' : undefined}
            className={cx(
              'rounded-md border px-1 py-2 text-center text-xs transition-colors',
              i === step
                ? 'border-indigo-500 bg-indigo-50 font-semibold dark:bg-indigo-950'
                : 'border-stone-200 dark:border-stone-700',
            )}
          >
            <span className="block font-mono">{i + 1}</span>
            <span className="mt-1 block">{item.label}</span>
          </li>
        ))}
      </ol>
      <div aria-live="polite" className="min-h-20 text-sm">
        <p key={step} className="animate-pop-in">
          {data.steps[step]!.detail}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={controlClass}
          onClick={playing ? () => setPlaying(false) : play}
        >
          {playing ? 'Pause example' : 'Play example'}
        </button>
        <button
          type="button"
          className={controlClass}
          onClick={() => {
            setPlaying(false)
            setStep((step + 1) % data.steps.length)
          }}
        >
          Next step
        </button>
      </div>
    </div>
  )
}

function ContextWindow() {
  const data = lessonVisuals.context
  const [grounded, setGrounded] = useState(1)
  return (
    <div className="space-y-4">
      <Choices
        label="Compare context"
        labels={['Vague task', 'Grounded brief']}
        value={grounded}
        onChange={setGrounded}
      />
      <div className="rounded-xl border-2 border-stone-300 p-4 dark:border-stone-600">
        <div className="mb-3 flex items-center justify-between gap-2 text-sm font-semibold">
          <span>Context window</span>
          <Glyph name="model" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {data.inputs.map((input) => (
            <div
              key={input}
              className={cx(
                'rounded-md border p-2 text-xs transition-colors',
                grounded
                  ? 'border-indigo-300 bg-indigo-50 dark:border-indigo-700 dark:bg-indigo-950'
                  : 'border-dashed border-stone-300 text-stone-500 dark:border-stone-600 dark:text-stone-400',
              )}
            >
              {grounded ? input : 'Not supplied'}
            </div>
          ))}
        </div>
      </div>
      <Arrow className="mx-auto rotate-90" />
      <p
        key={grounded}
        className="animate-pop-in rounded-lg bg-white p-3 text-sm dark:bg-stone-900"
      >
        {data.outputs[grounded]}
      </p>
    </div>
  )
}

function VerifyClaim() {
  const data = lessonVisuals.verification
  const [checked, setChecked] = useState(false)
  return (
    <div className="space-y-3">
      <Tile label="Claim in the draft" detail={data.claim} icon="file" />
      <Arrow className="mx-auto rotate-90" />
      <Tile label="Passage on the cited page" detail={data.passage} icon="search" />
      <button
        type="button"
        className={controlClass}
        aria-pressed={checked}
        onClick={() => setChecked(!checked)}
      >
        {checked ? 'Hide claim check' : 'Check the claim'}
      </button>
      {checked && (
        <ul className="animate-pop-in space-y-2 text-sm">
          {data.checks.map((check, i) => (
            <li className="flex items-start gap-2" key={check}>
              <span aria-hidden className="font-mono text-indigo-700 dark:text-indigo-300">
                {i === 0 ? '✓' : '!'}
              </span>
              {check}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

const screenStates = ['Ready', 'Empty', 'Loading', 'Error']
function MiniScreen({ state }: { state: number }) {
  return (
    <div className="overflow-hidden rounded-xl border border-stone-300 bg-white dark:border-stone-600 dark:bg-stone-900">
      <div className="flex items-center gap-1.5 border-b border-stone-200 p-3 dark:border-stone-700">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-stone-400" />
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-stone-300" />
        <span className="ml-2 text-xs text-stone-600 dark:text-stone-300">Example task view</span>
      </div>
      <div className="min-h-48 space-y-3 p-4">
        <p className="text-sm font-semibold">Items needing review</p>
        {state === 0 ? (
          <>
            <p className="text-xs text-stone-600 dark:text-stone-300">3 items · Updated just now</p>
            {['Request A', 'Request B', 'Request C'].map((label) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-md border border-stone-200 px-3 py-2 text-xs dark:border-stone-700"
              >
                <span>{label}</span>
                <span className="text-indigo-700 dark:text-indigo-300">Needs review</span>
              </div>
            ))}
          </>
        ) : state === 1 ? (
          <div className="grid gap-2 py-5 text-center">
            <Glyph name="check" className="mx-auto text-indigo-700 dark:text-indigo-300" />
            <p className="text-sm font-medium">Nothing needs review</p>
            <p className="text-xs text-stone-600 dark:text-stone-300">
              New items will appear here.
            </p>
          </div>
        ) : state === 2 ? (
          <div className="space-y-3 py-3">
            <p className="text-xs text-stone-600 dark:text-stone-300">Loading your items…</p>
            {[100, 80, 90].map((width, i) => (
              <div
                key={i}
                aria-hidden
                className="concept-skeleton h-5 rounded bg-stone-200 dark:bg-stone-700"
                style={{ width: `${width}%` }}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3 py-4">
            <p className="text-sm font-semibold">Could not load your items</p>
            <p className="text-xs text-stone-600 dark:text-stone-300">
              Your data has not changed. Try again when the connection returns.
            </p>
            <span className="inline-block rounded-md border border-stone-300 px-3 py-1.5 text-xs dark:border-stone-600">
              Retry
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

function ScreenExplorer() {
  const [state, setState] = useState(0)
  return (
    <div className="space-y-4">
      <Choices
        label="Explore screen states"
        labels={screenStates}
        value={state}
        onChange={setState}
      />
      <div key={state} className="animate-pop-in">
        <MiniScreen state={state} />
      </div>
    </div>
  )
}

function WorkspaceTree() {
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-900">
      <p className="mb-3 flex items-center gap-2 font-mono text-sm">
        <Glyph name="file" />
        workspace/
      </p>
      <ul className="ml-2 border-l border-stone-300 pl-4 dark:border-stone-600">
        {lessonVisuals.workspace.folders.map((item) => (
          <li
            key={item.label}
            className="relative py-2 before:absolute before:top-5 before:-left-4 before:w-3 before:border-t before:border-stone-300 dark:before:border-stone-600"
          >
            <p className="font-mono text-xs font-semibold">{item.label}</p>
            <p className="mt-1 text-xs text-stone-600 dark:text-stone-300">{item.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Requirements() {
  const [choice, setChoice] = useState(0)
  const data = lessonVisuals.requirements.questions
  return (
    <div className="space-y-4">
      <Choices
        label="Explore interview questions"
        labels={data.map((x) => x.label)}
        value={choice}
        onChange={setChoice}
      />
      <div key={choice} className="animate-pop-in space-y-3">
        <div className="rounded-xl border border-stone-300 p-3 text-sm dark:border-stone-600">
          “{data[choice]!.answer}”
        </div>
        <Arrow className="mx-auto rotate-90" />
        <Tile label="REQUIREMENTS.md" detail={data[choice]!.check} icon="file" active />
      </div>
    </div>
  )
}

function GitBranch() {
  const [stage, setStage] = useState(0)
  const data = lessonVisuals.git
  return (
    <div className="space-y-4">
      <div className="relative rounded-lg bg-white px-3 pt-4 dark:bg-stone-900">
        <div className="flex justify-between text-xs font-semibold">
          <span>main</span>
          <span>Reviewed change</span>
        </div>
        <svg
          role="img"
          aria-label="A feature branch leaves main, passes checks and returns through a reviewed merge"
          viewBox="0 0 400 140"
          className="h-36 w-full"
          fill="none"
        >
          <path d="M20 35h360" className="stroke-stone-300 dark:stroke-stone-600" strokeWidth="3" />
          <path
            d="M65 35c35 0 15 70 55 70h145c40 0 20-70 70-70"
            className={
              stage > 0
                ? 'stroke-indigo-600 dark:stroke-indigo-300'
                : 'stroke-stone-300 dark:stroke-stone-600'
            }
            strokeWidth="3"
            strokeDasharray={stage < 3 ? '6 5' : undefined}
          />
          {[20, 65, 335, 380].map((x) => (
            <circle
              key={x}
              cx={x}
              cy="35"
              r="7"
              className="fill-white stroke-stone-500 dark:fill-stone-900 dark:stroke-stone-300"
              strokeWidth="2"
            />
          ))}
          {[120, 190, 265].map((x, i) => (
            <circle
              key={x}
              cx={x}
              cy="105"
              r="8"
              className={
                stage > i
                  ? 'fill-indigo-600 dark:fill-indigo-300'
                  : 'fill-white stroke-stone-400 dark:fill-stone-900'
              }
              strokeWidth="2"
            />
          ))}
        </svg>
        <p className="pb-3 text-center font-mono text-xs text-indigo-700 dark:text-indigo-300">
          feature branch
        </p>
      </div>
      <Choices
        label="Explore Git workflow"
        labels={data.steps.map((x) => x.label)}
        value={stage}
        onChange={setStage}
      />
      <p aria-live="polite" className="min-h-12 text-sm">
        {data.steps[stage]!.detail}
      </p>
    </div>
  )
}

function ReviewFix() {
  const [fixed, setFixed] = useState(0)
  const data = lessonVisuals.review
  return (
    <div className="space-y-4">
      <p className="text-sm">{data.requirement}</p>
      <Choices
        label="Compare bug and correction"
        labels={['Before correction', 'After correction']}
        value={fixed}
        onChange={setFixed}
      />
      <div className="rounded-lg border border-stone-300 bg-white p-4 dark:border-stone-600 dark:bg-stone-900">
        <div className="mb-3 flex items-center gap-2">
          <Glyph name="clock" />
          <span className="text-sm font-semibold">Last known result</span>
        </div>
        <div className="mb-3 h-12 rounded bg-stone-100 dark:bg-stone-800" aria-hidden />
        <p key={fixed} className="animate-pop-in text-sm font-medium">
          {fixed ? data.after : data.before}
        </p>
      </div>
      <p className="text-xs text-stone-600 dark:text-stone-300">
        The failure condition is the same. The corrected state stops presenting old data as current.
      </p>
    </div>
  )
}

function OpportunityTree() {
  const data = lessonVisuals.discovery
  return (
    <div className="space-y-3">
      <Tile label="Outcome" detail={data.outcome} icon="check" active />
      <div className="concept-tree-branches grid grid-cols-2 gap-3 pt-4">
        {data.opportunities.map((opportunity, i) => (
          <div key={opportunity} className="space-y-3">
            <Tile label="Opportunity" detail={opportunity} />
            <div className="space-y-2 border-l border-stone-300 pl-3 dark:border-stone-600">
              {data.solutions.slice(i * 2, i * 2 + 2).map((solution) => (
                <div
                  key={solution}
                  className="rounded-md border border-dashed border-stone-300 p-2 text-xs dark:border-stone-600"
                >
                  {solution}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Funnel() {
  const [denominator, setDenominator] = useState(0)
  const data = lessonVisuals.funnel
  const completed = data.stages[2]!.count
  const base = data.stages[denominator ? 0 : 1]!
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {data.stages.map((stage, i) => (
          <div key={stage.label}>
            <div className="mb-1 flex items-baseline justify-between text-xs">
              <span>{stage.label}</span>
              <strong className="font-mono">{stage.count}</strong>
            </div>
            <div className="h-6 rounded bg-stone-200 dark:bg-stone-800">
              <div
                className={cx(
                  'h-full rounded',
                  i === 2 ? 'bg-indigo-600 dark:bg-indigo-400' : 'bg-stone-400 dark:bg-stone-500',
                )}
                style={{ width: `${(stage.count / data.stages[0]!.count) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <Choices
        label="Choose the funnel denominator"
        labels={['Of screen viewers', 'Of all signups']}
        value={denominator}
        onChange={setDenominator}
      />
      <div
        aria-live="polite"
        className="flex items-center gap-4 border-t border-stone-200 pt-4 dark:border-stone-700"
      >
        <p className="font-mono text-3xl font-semibold">
          {Math.round((completed / base.count) * 100)}%
        </p>
        <p className="text-sm">
          {completed} ÷ {base.count} {denominator ? 'signups' : 'screen viewers'}
          <br />
          <span className="text-xs text-stone-600 dark:text-stone-300">
            Same completions. Different question.
          </span>
        </p>
      </div>
    </div>
  )
}

function SolutionOptions() {
  const [choice, setChoice] = useState(0)
  const data = lessonVisuals.solution.options
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {data.map((option, i) => (
          <button
            type="button"
            key={option.label}
            aria-pressed={choice === i}
            onClick={() => setChoice(i)}
            className={cx(
              'flex w-full cursor-pointer items-center gap-3 rounded-lg border p-3 text-left text-sm transition-colors',
              choice === i
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950'
                : 'border-stone-200 dark:border-stone-700',
            )}
          >
            <span className="font-mono text-xs text-stone-600 dark:text-stone-300">0{i + 1}</span>
            <span>{option.label}</span>
            <span aria-hidden className="ml-auto">
              <Glyph name={i === 0 ? 'check' : i === 1 ? 'file' : 'tool'} />
            </span>
          </button>
        ))}
      </div>
      <div key={choice} aria-live="polite" className="animate-pop-in space-y-2 text-sm">
        <p>{data[choice]!.detail}</p>
        <p className="text-stone-600 dark:text-stone-300">{data[choice]!.check}</p>
      </div>
    </div>
  )
}

function EvalMatrix() {
  const [inspect, setInspect] = useState(false)
  const cases = lessonVisuals.evals.cases
  const passed = cases.filter((item) => item.result === 'Pass').length
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="font-mono text-3xl font-semibold">
          {Math.round((passed / cases.length) * 100)}%
        </span>
        <span className="text-sm">
          {passed} of {cases.length} cases pass.
          <br />
          <strong>Release is still blocked.</strong>
        </span>
      </div>
      <div className="overflow-hidden rounded-lg border border-stone-200 dark:border-stone-700">
        <table className="w-full text-left text-xs">
          <caption className="sr-only">Illustrative evaluation results by behaviour</caption>
          <thead className="bg-stone-100 dark:bg-stone-800">
            <tr>
              <th className="p-3">Behaviour</th>
              <th className="p-3 text-right">Result</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((item) => (
              <tr key={item.label} className="border-t border-stone-200 dark:border-stone-700">
                <td className="p-3">{item.label}</td>
                <td
                  className={cx(
                    'p-3 text-right font-semibold',
                    item.result === 'Fail'
                      ? 'text-red-700 dark:text-red-300'
                      : 'text-emerald-800 dark:text-emerald-300',
                  )}
                >
                  {item.result}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        aria-expanded={inspect}
        className={controlClass}
        onClick={() => setInspect(!inspect)}
      >
        {inspect ? 'Hide failure detail' : 'Inspect the failed case'}
      </button>
      {inspect && (
        <div className="animate-pop-in space-y-3">
          <Flow
            steps={[
              { label: 'Polite final answer' },
              { label: 'Unrequested tool call' },
              { label: 'Record changed' },
            ]}
          />
          <p className="text-sm">
            The final text looks harmless. The tool trace and changed record show the failure.
          </p>
        </div>
      )}
    </div>
  )
}

function Experiment() {
  const [choice, setChoice] = useState(1)
  const data = lessonVisuals.experiment.scenarios[choice]!
  const start = ((data.range[0]! + 6) / 14) * 100
  const end = ((data.range[1]! + 6) / 14) * 100
  return (
    <div className="space-y-4">
      <Choices
        label="Explore experiment outcomes"
        labels={lessonVisuals.experiment.scenarios.map((x) => x.label)}
        value={choice}
        onChange={setChoice}
      />
      <div className="rounded-lg bg-white p-4 dark:bg-stone-900">
        <p className="text-xs font-semibold">Estimated change in the success metric</p>
        <div
          role="img"
          aria-label={`Illustrative interval from ${data.range[0]} to ${data.range[1]} percentage points`}
          className="relative mt-6 mb-2 h-10 border-b border-stone-300 dark:border-stone-600"
        >
          <div
            className="absolute top-0 bottom-0 border-l border-dashed border-stone-500"
            style={{ left: '42.86%' }}
          />
          <div
            className="absolute top-4 h-2 rounded-full bg-indigo-600 transition-all duration-200 dark:bg-indigo-400"
            style={{ left: `${start}%`, width: `${end - start}%` }}
          />
        </div>
        <div className="relative flex justify-between text-xs text-stone-600 dark:text-stone-300">
          <span>Potential harm</span>
          <span className="absolute -translate-x-1/2" style={{ left: '42.86%' }}>
            0
          </span>
          <span>Potential benefit</span>
        </div>
        <p className="mt-3 text-center font-mono text-xs">
          {data.range[0]} to +{data.range[1]} percentage points
        </p>
      </div>
      <p key={choice} aria-live="polite" className="animate-pop-in text-sm">
        {data.decision}
      </p>
    </div>
  )
}

function StorySlides() {
  return (
    <div className="space-y-3">
      {lessonVisuals.story.slides.map((slide, i) => (
        <div key={slide.label} className="grid grid-cols-[2rem_minmax(0,1fr)] items-center gap-3">
          <span className="font-mono text-xs text-stone-600 dark:text-stone-300">0{i + 1}</span>
          <div className="rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-900">
            <p className="mb-2 text-xs text-indigo-700 dark:text-indigo-300">{slide.label}</p>
            <p className="text-base leading-snug font-semibold">{slide.detail}</p>
            <div aria-hidden className="mt-4 flex gap-1">
              <span className="h-1 w-12 rounded bg-indigo-300 dark:bg-indigo-700" />
              <span className="h-1 w-8 rounded bg-stone-200 dark:bg-stone-700" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function KnowledgeLayers() {
  const [trace, setTrace] = useState(false)
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {lessonVisuals.knowledge.layers.map((layer, i) => (
          <div key={layer.label} style={{ marginInline: `${(2 - i) * 5}%` }}>
            <Tile
              label={layer.label}
              detail={layer.detail}
              icon={i === 0 ? 'shield' : 'file'}
              active={trace && i > 0}
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        aria-expanded={trace}
        className={controlClass}
        onClick={() => setTrace(!trace)}
      >
        {trace ? 'Hide source trail' : 'Follow a claim'}
      </button>
      {trace && (
        <div className="animate-pop-in rounded-lg border border-dashed border-stone-300 p-3 text-xs dark:border-stone-600">
          <p className="font-mono">wiki/decisions.md</p>
          <Arrow className="my-2 rotate-90" />
          <p className="font-mono">sources/review-01.md</p>
          <p className="mt-3">
            Open the original passage. Does it support the decision and remain current?
          </p>
        </div>
      )}
    </div>
  )
}

function AccessGate() {
  const [access, setAccess] = useState(0)
  return (
    <div className="space-y-4">
      <Choices
        label="Explore retrieval permissions"
        labels={['Team-only access', 'Authorised specialist']}
        value={access}
        onChange={setAccess}
      />
      <div className="space-y-2">
        {lessonVisuals.access.documents.map((doc, i) => (
          <div
            key={doc}
            className="flex items-center gap-2 rounded-lg border border-stone-200 p-3 text-xs dark:border-stone-700"
          >
            <Glyph name={i === 2 ? 'shield' : 'file'} />
            <span>{doc}</span>
            <span className="ml-auto font-semibold">
              {i === 2 && access === 0 ? 'Excluded' : 'Allowed'}
            </span>
          </div>
        ))}
      </div>
      <Flow steps={lessonVisuals.access.steps.map((label) => ({ label }))} />
      <p aria-live="polite" className="text-sm">
        {access
          ? 'Only a verified role with the required scope may retrieve restricted records for an authorised purpose.'
          : 'The restricted record never enters the model context. The answer can cite only the first two sources.'}
      </p>
    </div>
  )
}

function SkillRun() {
  const [choice, setChoice] = useState(0)
  const data = lessonVisuals.skills.scenarios[choice]!
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-xs">
        <Glyph name="clock" />
        <span>Weekly trigger</span>
        <Arrow />
        <strong>Same permissions</strong>
      </div>
      <Choices
        label="Explore skill inputs"
        labels={lessonVisuals.skills.scenarios.map((x) => x.label)}
        value={choice}
        onChange={setChoice}
      />
      <div className="rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-900">
        <div className="flex items-center justify-between gap-2 border-b border-stone-200 pb-3 text-xs dark:border-stone-700">
          <strong>Example run log</strong>
          <span>Limit: 5 min / 10 files</span>
        </div>
        <ol key={choice} className="animate-pop-in mt-3 space-y-3">
          {data.log.map((line, i) => (
            <li key={line} className="flex gap-3 text-xs">
              <span className="font-mono text-stone-500 dark:text-stone-400">0{i + 1}</span>
              {line}
            </li>
          ))}
        </ol>
      </div>
      <p aria-live="polite" className="text-sm font-semibold">
        {data.result}
      </p>
    </div>
  )
}

function TeamTime() {
  const [whole, setWhole] = useState(1)
  const data = lessonVisuals.team
  const wholeTask = data.after.reduce((n, x) => n + x.minutes, 0)
  const total = whole ? wholeTask : data.after[0]!.minutes
  const maximum = Math.max(data.before, wholeTask)
  return (
    <div className="space-y-4">
      <Choices
        label="Choose which time to count"
        labels={['Draft time only', 'The whole task']}
        value={whole}
        onChange={setWhole}
      />
      <div>
        <p className="mb-2 flex justify-between text-xs">
          <span>Existing workflow</span>
          <strong>{data.before} min</strong>
        </p>
        <div
          className="h-8 rounded bg-stone-400 dark:bg-stone-500"
          style={{ width: `${(data.before / maximum) * 100}%` }}
        />
      </div>
      <div>
        <p className="mb-2 flex justify-between text-xs">
          <span>With AI</span>
          <strong>{total} min</strong>
        </p>
        <div className="flex h-8 overflow-hidden rounded">
          {data.after.slice(0, whole ? 3 : 1).map((part, i) => (
            <div
              key={part.label}
              className={cx(
                'flex items-center justify-center text-xs font-semibold transition-all',
                i === 0
                  ? 'bg-indigo-600 text-white dark:bg-indigo-400 dark:text-stone-950'
                  : i === 1
                    ? 'bg-stone-300 text-stone-900 dark:bg-stone-600 dark:text-stone-50'
                    : 'bg-mark-200 text-stone-900',
              )}
              style={{ width: `${(part.minutes / maximum) * 100}%` }}
            >
              {part.minutes}
            </div>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-600 dark:text-stone-300">
          {data.after.slice(0, whole ? 3 : 1).map((part) => (
            <span key={part.label}>
              {part.label}: {part.minutes} min
            </span>
          ))}
        </div>
      </div>
      <p aria-live="polite" className="text-sm font-semibold">
        {whole
          ? `${wholeTask - data.before} minutes more work at the same quality bar.`
          : `${data.before - total} minutes saved on drafting. Review and rework are still uncounted.`}
      </p>
    </div>
  )
}

function Constraints() {
  const [selected, setSelected] = useState(0)
  const data = lessonVisuals.constraints
  const scenario = data.scenarios[selected]!
  const capacity = Math.min(...scenario.capacities)
  return (
    <div className="space-y-4">
      <Choices
        label="Workflow scenario"
        labels={data.scenarios.map((s) => s.label)}
        value={selected}
        onChange={setSelected}
      />
      {data.stages.map((stage, i) => (
        <div key={stage}>
          <p className="mb-2 flex justify-between gap-3 text-xs">
            <span>{stage}</span>
            <strong>{scenario.capacities[i]} items / week</strong>
          </p>
          <div className="h-6 rounded bg-stone-200 dark:bg-stone-800">
            <div
              className="h-full rounded bg-indigo-600 transition-all dark:bg-indigo-400"
              style={{ width: `${(scenario.capacities[i]! / 6) * 100}%` }}
            />
          </div>
        </div>
      ))}
      <div
        aria-live="polite"
        className="rounded-lg border border-stone-300 p-3 dark:border-stone-600"
      >
        <p className="font-semibold">Whole-loop capacity: {capacity} items / week</p>
        <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">{scenario.explanation}</p>
      </div>
    </div>
  )
}

const drawings: Record<LessonVisualId, () => ReactNode> = {
  'chat-agent': ChatAgent,
  context: ContextWindow,
  verification: VerifyClaim,
  prototype: ScreenExplorer,
  workspace: WorkspaceTree,
  requirements: Requirements,
  git: GitBranch,
  review: ReviewFix,
  strategy: () => <Flow steps={lessonVisuals.strategy.steps} />,
  discovery: OpportunityTree,
  funnel: Funnel,
  solution: SolutionOptions,
  states: ScreenExplorer,
  evals: EvalMatrix,
  experiment: Experiment,
  story: StorySlides,
  knowledge: KnowledgeLayers,
  access: AccessGate,
  skills: SkillRun,
  team: TeamTime,
  constraints: Constraints,
  'team-loop': () => <ProductLoop />,
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
