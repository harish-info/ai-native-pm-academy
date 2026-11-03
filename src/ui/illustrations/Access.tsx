import { useState } from 'react'
import { lessonVisuals } from '../../content/illustrations'
import { cx } from '../cx'
import { Note, Segmented, Stage } from './kit'

const { documents, requesters } = lessonVisuals.access
const short = ['Decisions', 'Product notes', 'Personnel']
const restricted = 2

function DocIcon({ locked }: { locked: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4 shrink-0" fill="none">
      <path
        d="M3.5 1.5h6l3 3v10h-9zM9.5 1.5v3h3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {locked ? (
        <path
          d="M6 9.5h4v3H6zM6.8 9.5V8.3a1.2 1.2 0 0 1 2.4 0v1.2"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      ) : (
        <path d="M5.5 8h5M5.5 11h4" stroke="currentColor" strokeWidth="1.4" />
      )}
    </svg>
  )
}

/** `compact` hides the name on narrow screens, where the answer line below names it anyway. */
function Doc({ i, compact }: { i: number; compact?: boolean }) {
  return (
    <span className="inline-flex min-w-0 items-center gap-1.5 rounded-md border border-stone-300 bg-white px-2 py-1 text-xs font-medium whitespace-nowrap text-stone-800 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100">
      <DocIcon locked={i === restricted} />
      <span className={compact ? 'hidden sm:inline' : undefined}>{short[i]}</span>
    </span>
  )
}

/** Each source passes an identity and scope check before retrieval; a restricted one may not. */
export default function Access() {
  const [access, setAccess] = useState(0)
  const allowed = (i: number) => i !== restricted || access === 1
  const cited = short.filter((_, i) => allowed(i))
  const head =
    'text-[11px] font-semibold tracking-wide text-stone-500 uppercase dark:text-stone-400'
  return (
    <div className="space-y-3">
      <Segmented
        label="Explore retrieval permissions"
        labels={['Team-only access', 'Authorised specialist']}
        value={access}
        onChange={setAccess}
      />
      <Stage className="dot-grid p-3 sm:p-5">
        <p className="mb-3 text-center text-xs text-stone-600 dark:text-stone-300">
          Request from: <span className="font-semibold">{requesters[access]}</span>
        </p>
        <div
          role="table"
          aria-label="Which sources reach the model context"
          className="grid grid-cols-[auto_minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)] items-center gap-x-2 gap-y-2.5"
        >
          <div role="row" className="contents">
            <span role="columnheader" className={head}>
              Sources
            </span>
            <span role="columnheader" className={cx(head, 'text-center')}>
              1 Check access
            </span>
            <span role="columnheader" className={cx(head, 'text-right')}>
              2 <span className="hidden sm:inline">Model </span>context
            </span>
          </div>
          {documents.map((doc, i) => {
            const ok = allowed(i)
            return (
              <div role="row" key={doc} className="contents">
                <span role="cell" className="flex min-w-0">
                  <Doc i={i} />
                  <span className="sr-only">{doc}</span>
                </span>
                <span role="cell" className="flex items-center gap-1">
                  <span aria-hidden className="h-px flex-1 bg-stone-300 dark:bg-stone-600" />
                  <span
                    key={`${access}-${i}`}
                    className={cx(
                      'animate-pop-in shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold',
                      ok
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300',
                    )}
                    style={{ animationDelay: `${i * 120}ms` }}
                  >
                    {ok ? 'Allowed' : 'Blocked'}
                  </span>
                  <span
                    aria-hidden
                    className={cx(
                      'h-px flex-1',
                      ok ? 'bg-indigo-500 dark:bg-indigo-400' : 'bg-transparent',
                    )}
                  />
                  <span
                    aria-hidden
                    className={cx(
                      'h-0 w-0 border-y-4 border-l-[6px] border-y-transparent',
                      ok ? 'border-l-indigo-500 dark:border-l-indigo-400' : 'border-l-transparent',
                    )}
                  />
                </span>
                <span role="cell" className="flex min-w-0 justify-end">
                  {ok ? (
                    <span
                      key={`in-${access}`}
                      className="animate-pop-in flex min-w-0"
                      style={{ animationDelay: `${i * 120 + 150}ms` }}
                    >
                      <Doc i={i} compact />
                    </span>
                  ) : (
                    <span className="rounded-md border border-dashed border-stone-300 px-2 py-1 text-xs whitespace-nowrap text-stone-500 italic dark:border-stone-600 dark:text-stone-400">
                      <span className="sm:hidden">none</span>
                      <span className="hidden sm:inline">not retrieved</span>
                    </span>
                  )}
                </span>
              </div>
            )
          })}
        </div>
        <p className="mt-4 border-t border-stone-200 pt-3 text-right text-xs text-stone-600 dark:border-stone-700 dark:text-stone-300">
          <span className="font-semibold">3 Answer cites:</span> {cited.join(', ')}
        </p>
      </Stage>
      <Note id={access}>
        <p>
          {access
            ? 'A verified role with personnel scope may retrieve the restricted records for an authorised purpose.'
            : 'The restricted record never enters the model context, so no prompt can leak it. The answer cites only the first two sources.'}
        </p>
      </Note>
    </div>
  )
}
