import { Fragment, useId } from 'react'
import { lessonVisuals } from '../../content/illustrations'
import { cx } from '../cx'
import {
  controlClass,
  Note,
  PlayIcon,
  Scene,
  Stage,
  StepDots,
  tone,
  usePlayer,
  useReducedMotion,
} from './kit'

const data = lessonVisuals['chat-agent']

// Every arrow runs on one of two lanes, 10 above and 10 below the row's centre line (y 124).
// Where a message travels for each kind of step.
const routes: Record<string, string> = {
  goal: 'M66 114H115',
  model: '',
  tools: 'M184 114H252',
  result: 'M252 134H184',
  answer: 'M115 134H66',
}

function Packet({ path, step }: { path: string; step: number }) {
  return (
    <g key={step}>
      <circle r="9" className={cx(tone.accent, 'opacity-25')}>
        <animateMotion
          dur="0.9s"
          fill="freeze"
          path={path}
          calcMode="spline"
          keyTimes="0;1"
          keySplines="0.4 0 0.2 1"
        />
        <animate
          attributeName="opacity"
          dur="0.9s"
          fill="freeze"
          values="0;1;1;0"
          keyTimes="0;0.15;0.8;1"
        />
      </circle>
      <circle r="4.5" className={tone.accent}>
        <animateMotion
          dur="0.9s"
          fill="freeze"
          path={path}
          calcMode="spline"
          keyTimes="0;1"
          keySplines="0.4 0 0.2 1"
        />
        <animate
          attributeName="opacity"
          dur="0.9s"
          fill="freeze"
          values="0;1;1;0"
          keyTimes="0;0.15;0.8;1"
        />
      </circle>
    </g>
  )
}

export default function ChatAgent() {
  const { step, playing, play, pause, next, goTo } = usePlayer(data.steps.length)
  const reduced = useReducedMotion()
  const current = data.steps[step]!
  const node = current.node
  const on = (n: string) => node === n
  const path = routes[node]
  const uid = useId().replace(/:/g, '')
  const marker = (live: boolean) => `url(#${uid}-${live ? 'live' : 'idle'})`
  const eye = on('model') ? 'fill-white dark:fill-stone-950' : 'fill-stone-700 dark:fill-stone-300'
  return (
    <div className="space-y-3">
      <Stage className="dot-grid px-2 py-3">
        <Scene
          viewBox="0 0 440 222"
          label="You talk to Claude Code, the agent application. Inside it, a model chooses tools, the tools act on your files, and each result returns to the model."
        >
          <defs>
            {(['idle', 'live'] as const).map((k) => (
              <marker
                key={k}
                id={`${uid}-${k}`}
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path
                  d="M1 1l8 4-8 4"
                  fill="none"
                  strokeWidth="2"
                  className={k === 'live' ? tone.accentStroke : tone.line}
                />
              </marker>
            ))}
          </defs>

          {/* You */}
          <circle
            cx="40"
            cy="124"
            r="22"
            className={cx(
              on('goal') || on('answer') ? tone.mark : tone.well,
              tone.ink,
              'illus-move',
            )}
            strokeWidth="2"
          />
          <circle cx="40" cy="118" r="6" className={tone.ink} strokeWidth="2" />
          <path d="M29 136a11 11 0 0 1 22 0" className={tone.ink} strokeWidth="2" />
          <text
            x="40"
            y="178"
            textAnchor="middle"
            className={cx(tone.text, 'text-[14px] font-semibold')}
          >
            You
          </text>

          {/* The application boundary, with equal padding around Model and Tools */}
          <rect
            x="96"
            y="12"
            width="244"
            height="198"
            rx="18"
            className={cx(tone.tint, 'stroke-indigo-300 dark:stroke-indigo-800')}
            strokeWidth="2"
            strokeDasharray="6 5"
          />
          <text x="116" y="38" className={cx(tone.text, 'text-[13px] font-semibold')}>
            Claude Code
          </text>
          <text x="116" y="54" className={cx(tone.muted, 'text-[11px]')}>
            the agent application
          </text>

          {/* Request and reply, drawn over the boundary so the arrowheads show */}
          <path
            d={routes.goal}
            className={on('goal') ? tone.accentStroke : tone.line}
            strokeWidth="2"
            markerEnd={marker(on('goal'))}
          />
          <path
            d={routes.answer}
            className={on('answer') ? tone.accentStroke : tone.line}
            strokeWidth="2"
            markerEnd={marker(on('answer'))}
          />

          {/* Model */}
          {on('model') && !reduced && (
            <rect
              x="122"
              y="96"
              width="56"
              height="56"
              rx="16"
              className={cx(tone.accent, 'illus-pulse')}
            />
          )}
          <rect
            x="122"
            y="96"
            width="56"
            height="56"
            rx="16"
            className={cx(tone.paper, on('model') ? tone.accentStroke : tone.ink, 'illus-move')}
            strokeWidth={on('model') ? 3 : 2}
          />
          <rect
            x="134"
            y="115"
            width="32"
            height="22"
            rx="7"
            className={cx(on('model') ? tone.accent : tone.well, tone.ink, 'illus-move')}
            strokeWidth="2"
          />
          <circle cx="144" cy="126" r="2.4" className={eye} />
          <circle cx="156" cy="126" r="2.4" className={eye} />
          <path d="M150 107v8" className={tone.ink} strokeWidth="2" />
          <text
            x="150"
            y="178"
            textAnchor="middle"
            className={cx(tone.text, 'text-[14px] font-semibold')}
          >
            Model
          </text>

          {/* Tool call and tool result, straight on the same lanes as request and reply */}
          <text
            x="218"
            y="104"
            textAnchor="middle"
            className={cx(
              on('tools') ? 'fill-indigo-700 dark:fill-indigo-300' : tone.muted,
              'text-[11px] font-semibold',
            )}
          >
            tool call
          </text>
          <path
            d={routes.tools}
            className={cx(on('tools') ? tone.accentStroke : tone.line, on('tools') && 'illus-flow')}
            strokeWidth="2"
            markerEnd={marker(on('tools'))}
          />
          <path
            d={routes.result}
            className={cx(
              on('result') ? tone.accentStroke : tone.line,
              on('result') && 'illus-flow',
            )}
            strokeWidth="2"
            markerEnd={marker(on('result'))}
          />
          <text
            x="218"
            y="152"
            textAnchor="middle"
            className={cx(
              on('result') ? 'fill-indigo-700 dark:fill-indigo-300' : tone.muted,
              'text-[11px] font-semibold',
            )}
          >
            tool result
          </text>

          {/* Tools */}
          {on('tools') && !reduced && (
            <rect
              x="258"
              y="96"
              width="56"
              height="56"
              rx="16"
              className={cx(tone.accent, 'illus-pulse')}
            />
          )}
          <rect
            x="258"
            y="96"
            width="56"
            height="56"
            rx="16"
            className={cx(
              on('tools') ? tone.accent : tone.paper,
              on('tools') ? tone.accentStroke : tone.ink,
              'illus-move',
            )}
            strokeWidth="2"
          />
          <path
            d="m289.5 119.5 6-3a7 7 0 0 1-8 9l-9 9a2.5 2.5 0 0 1-3.5-3.5l9-9a7 7 0 0 1 1-8.5z"
            className={on('tools') ? 'stroke-white dark:stroke-stone-950' : tone.ink}
            strokeWidth="2"
          />
          <text
            x="286"
            y="178"
            textAnchor="middle"
            className={cx(tone.text, 'text-[14px] font-semibold')}
          >
            Tools
          </text>
          {current.tool && (
            <text
              key={current.tool}
              x="286"
              y="196"
              textAnchor="middle"
              className="illus-pop fill-indigo-700 font-mono text-[11px] dark:fill-indigo-300"
            >
              {current.tool}
            </text>
          )}

          {/* Files outside the app, reached through tools */}
          <path
            d="M320 124H356"
            className={cx(on('tools') ? tone.accentStroke : tone.line, 'illus-flow')}
            strokeWidth="2"
          />
          <g className={cx(on('tools') && 'illus-float')}>
            <path
              d="M374 100h20l8 8v30h-28z"
              className={cx(tone.paper, tone.ink)}
              strokeWidth="2"
            />
            <path
              d="M366 108h20l8 8v30h-28z"
              className={cx(
                on('tools') || on('result') ? tone.mark : tone.paper,
                tone.ink,
                'illus-move',
              )}
              strokeWidth="2"
            />
            <path d="M372 124h14M372 131h10" className={tone.ink} strokeWidth="2" />
          </g>
          <text
            x="384"
            y="178"
            textAnchor="middle"
            className={cx(tone.text, 'text-[14px] font-semibold')}
          >
            Your files
          </text>

          {path && !reduced && <Packet path={path} step={step} />}
        </Scene>
      </Stage>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-2">
          <button type="button" className={controlClass} onClick={playing ? pause : play}>
            <PlayIcon playing={playing} />
            {playing ? 'Pause example' : 'Play example'}
          </button>
          <button type="button" className={controlClass} onClick={next}>
            Next step
          </button>
        </div>
        <StepDots count={data.steps.length} value={step} onChange={goTo} label="Example steps" />
      </div>
      <Note id={step} className="min-h-16">
        <p
          aria-current="step"
          className="text-xs font-semibold text-indigo-700 dark:text-indigo-300"
        >
          <span className="font-mono">
            {step + 1} / {data.steps.length}
          </span>{' '}
          · {current.label}
        </p>
        <p className="mt-1">{current.detail}</p>
      </Note>
      <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-300">
        Diagram references:{' '}
        {data.sources.map((source, i) => (
          <Fragment key={source.url}>
            {i > 0 && ' · '}
            <a
              className="underline underline-offset-4"
              href={source.url}
              target="_blank"
              rel="noreferrer"
            >
              {source.title}
            </a>
          </Fragment>
        ))}
        .
      </p>
    </div>
  )
}
