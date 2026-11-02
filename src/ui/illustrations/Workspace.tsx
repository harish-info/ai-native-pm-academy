import { useState, type CSSProperties } from 'react'
import { lessonVisuals } from '../../content/illustrations'
import { cx } from '../cx'
import { Note, Stage } from './kit'

const data = lessonVisuals.workspace
const row = 36
const hub = 1
// AGENTS.md points to these rows rather than repeating them.
const links = [0, 2, 3]

// Illustrative contents for the preview pane.
const previews: string[][] = [
  ['# Product context', '## Who it is for', '## What we will not do'],
  ['# How to work here', 'Read product-context.md first', 'Cite sources/ for every claim'],
  ['interview-notes.md', 'support-themes.csv', 'pricing-page.md'],
  ['competitor-scan.md', 'open-questions.md'],
  ['.git/', 'src/', 'package.json'],
]

function Icon({ folder, className }: { folder: boolean; className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className={cx('h-4 w-4 shrink-0', className)} fill="none">
      {folder ? (
        <path
          d="M1.5 4.5v8h13v-7H8L6.5 3.5h-5z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M3.5 1.5h6l3 3v10h-9zM9.5 1.5v3h3M5.5 8h5M5.5 11h4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}

/** A workspace tree where AGENTS.md points to the files that hold the real context. */
export default function Workspace() {
  const [choice, setChoice] = useState(hub)
  const item = data.folders[choice]!
  const folder = item.label.endsWith('/')
  const y = (i: number) => row * i + row / 2
  return (
    <div className="space-y-3">
      <Stage className="dot-grid p-3">
        <div className="grid gap-3 sm:grid-cols-[17rem_minmax(0,1fr)]">
          <div className="rounded-lg border border-stone-200 bg-white p-2 dark:border-stone-700 dark:bg-stone-950">
            <p className="flex h-8 items-center gap-2 px-2 font-mono text-xs font-semibold text-stone-600 dark:text-stone-300">
              <Icon folder />
              workspace/
            </p>
            <div className="relative" role="group" aria-label="Workspace files">
              <svg
                aria-hidden
                className="pointer-events-none absolute top-0 right-1 h-full w-8 overflow-visible"
                viewBox={`0 0 32 ${row * data.folders.length}`}
                preserveAspectRatio="none"
                fill="none"
              >
                {links.map((to) => {
                  const live = choice === hub || choice === to
                  return (
                    <path
                      key={`${to}-${live}`}
                      d={`M4 ${y(hub)}C${to === 0 ? 20 : 14 + to * 4} ${y(hub)} ${to === 0 ? 20 : 14 + to * 4} ${y(to)} 4 ${y(to)}`}
                      className={cx(
                        live
                          ? 'illus-draw stroke-indigo-500 dark:stroke-indigo-400'
                          : 'stroke-stone-300 dark:stroke-stone-700',
                      )}
                      style={{ '--len': 120 } as CSSProperties}
                      strokeWidth="1.6"
                      strokeDasharray={live ? undefined : '3 3'}
                    />
                  )
                })}
              </svg>
              {data.folders.map((f, i) => {
                const active = i === choice
                const linked = choice === hub && links.includes(i)
                return (
                  <button
                    key={f.label}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setChoice(i)}
                    className={cx(
                      'relative flex h-9 w-full cursor-pointer items-center gap-2 rounded-md pr-10 pl-5 text-left font-mono text-xs transition-colors',
                      active
                        ? 'bg-indigo-50 font-semibold text-indigo-900 dark:bg-indigo-950 dark:text-indigo-100'
                        : 'text-stone-700 hover:bg-stone-100 dark:text-stone-200 dark:hover:bg-stone-800',
                    )}
                  >
                    <span
                      aria-hidden
                      className="absolute top-0 left-2.5 h-full border-l border-stone-300 dark:border-stone-600"
                      style={i === data.folders.length - 1 ? { height: '50%' } : undefined}
                    />
                    <span
                      aria-hidden
                      className="absolute top-1/2 left-2.5 w-2 border-t border-stone-300 dark:border-stone-600"
                    />
                    <Icon
                      folder={f.label.endsWith('/')}
                      className={
                        i === hub
                          ? 'text-indigo-600 dark:text-indigo-300'
                          : 'text-stone-500 dark:text-stone-400'
                      }
                    />
                    <span className="truncate">{f.label}</span>
                    {i === 4 && (
                      <span className="rounded bg-mark-100 px-1 text-[10px] whitespace-nowrap font-semibold text-stone-800 dark:bg-mark-900 dark:text-mark-100">
                        own git
                      </span>
                    )}
                    {linked && (
                      <span
                        aria-hidden
                        className="illus-pop ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400"
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
          <div
            key={choice}
            className="animate-pop-in flex flex-col rounded-lg border border-stone-200 bg-white dark:border-stone-700 dark:bg-stone-950"
          >
            <p className="flex items-center gap-2 border-b border-stone-200 px-3 py-2 font-mono text-xs font-semibold dark:border-stone-700">
              <Icon folder={folder} className="text-indigo-600 dark:text-indigo-300" />
              {item.label}
            </p>
            <ul className="flex-1 space-y-1.5 px-3 py-3 font-mono text-[11px] leading-relaxed">
              {previews[choice]!.map((line, i) => (
                <li
                  key={line}
                  className={cx(
                    'flex items-center gap-2',
                    line.startsWith('#')
                      ? 'font-semibold text-stone-900 dark:text-stone-100'
                      : 'text-stone-600 dark:text-stone-300',
                  )}
                >
                  {folder && (
                    <Icon folder={line.endsWith('/')} className="h-3.5 w-3.5 text-stone-400" />
                  )}
                  {!folder && (
                    <span aria-hidden className="w-4 text-right text-stone-400 dark:text-stone-500">
                      {i + 1}
                    </span>
                  )}
                  <span className="truncate">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Stage>
      <Note id={choice}>
        <p className="font-mono text-xs font-semibold text-indigo-700 dark:text-indigo-300">
          {item.label}
        </p>
        <p className="mt-0.5">
          {item.detail}.
          {choice === hub && ' It links to the context files instead of copying them.'}
        </p>
      </Note>
    </div>
  )
}
