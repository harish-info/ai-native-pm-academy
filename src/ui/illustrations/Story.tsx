import { useState } from 'react'
import { lessonVisuals } from '../../content/illustrations'
import { cx } from '../cx'
import { controlClass, Note, Segmented, Stage } from './kit'
import './Story.css'

const slides = lessonVisuals.story.slides
const tilt = ['-2.5deg', '0deg', '2.5deg']

function SlideBody({ index }: { index: number }) {
  // Placeholder content: a chart, a list or a decision box, so each slide looks different.
  return (
    <svg aria-hidden viewBox="0 0 120 44" className="h-auto w-full" fill="none">
      {index === 0 && (
        <>
          <rect
            x="2"
            y="6"
            width="54"
            height="34"
            rx="4"
            className="fill-indigo-50 stroke-indigo-300 dark:fill-indigo-950 dark:stroke-indigo-800"
            strokeWidth="1.5"
          />
          <path
            d="M10 18h38M10 26h28"
            className="stroke-indigo-300 dark:stroke-indigo-700"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M66 12h50M66 22h42M66 32h46"
            className="stroke-stone-200 dark:stroke-stone-700"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      )}
      {index === 1 && (
        <>
          <path
            d="M4 40h112"
            className="stroke-stone-300 dark:stroke-stone-600"
            strokeWidth="1.5"
          />
          {[14, 24, 20, 32, 28].map((h, i) => (
            <rect
              key={i}
              x={10 + i * 22}
              y={40 - h}
              width="12"
              height={h}
              rx="2"
              className={
                i === 3 ? 'fill-mark-300 dark:fill-mark-400' : 'fill-stone-200 dark:fill-stone-700'
              }
            />
          ))}
        </>
      )}
      {index === 2 && (
        <>
          {[8, 20, 32].map((y) => (
            <g key={y}>
              <rect
                x="4"
                y={y - 4}
                width="8"
                height="8"
                rx="2"
                className="stroke-indigo-400 dark:stroke-indigo-500"
                strokeWidth="1.5"
              />
              <path
                d={`M18 ${y}h${y === 20 ? 62 : 80}`}
                className="stroke-stone-200 dark:stroke-stone-700"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
          ))}
        </>
      )}
    </svg>
  )
}

/** Three slides fanned on a desk. Swap topic titles for message titles, then read only the titles. */
export default function Story() {
  const [message, setMessage] = useState(0)
  const [skim, setSkim] = useState(false)
  const titles = slides.map((s) => (message ? s.detail : s.label))
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Segmented
          className="w-full sm:w-auto sm:min-w-0 sm:flex-1"
          label="Choose the slide titles"
          labels={['Topic titles', 'Message titles']}
          value={message}
          onChange={setMessage}
        />
        <button
          type="button"
          aria-pressed={skim}
          className={cx(
            controlClass,
            skim && 'border-indigo-500 text-indigo-800 dark:border-indigo-400 dark:text-indigo-200',
          )}
          onClick={() => setSkim(!skim)}
        >
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M1.5 8s2.4-4.5 6.5-4.5S14.5 8 14.5 8 12.1 12.5 8 12.5 1.5 8 1.5 8Z" />
            <circle cx="8" cy="8" r="2" />
          </svg>
          Read only the titles
        </button>
      </div>
      <Stage className="dot-grid p-3 sm:p-4">
        <ol className="story-desk" aria-label="Slides in order">
          {slides.map((slide, i) => (
            <li key={slide.label} className="story-slide" style={{ ['--tilt' as string]: tilt[i] }}>
              <div className="flex items-center justify-between gap-2 text-[10px] font-semibold tracking-wide text-stone-500 uppercase dark:text-stone-400">
                <span>Slide {i + 1}</span>
                <span
                  aria-hidden
                  className="h-1.5 w-6 rounded-full bg-indigo-300 dark:bg-indigo-700"
                />
              </div>
              <p
                key={`${message}-${i}`}
                className={cx(
                  'animate-pop-in mt-1.5 leading-snug font-semibold text-stone-900 dark:text-stone-50',
                  message ? 'text-[13px]' : 'text-base',
                )}
              >
                {titles[i]}
              </p>
              <div className={cx('story-body mt-auto pt-2', skim && 'story-body-skim')}>
                <SlideBody index={i} />
              </div>
            </li>
          ))}
        </ol>
      </Stage>
      <Note id={`${message}-${skim}`}>
        {skim ? (
          message ? (
            <p>
              <strong>The titles alone make the case:</strong> {titles.join(' ')}
            </p>
          ) : (
            <p>
              <strong>The titles alone:</strong> {titles.join('. ')}. A skimming reader learns the
              agenda, not the argument.
            </p>
          )
        ) : message ? (
          <p>Each title states the one thing its slide proves. Now try reading only the titles.</p>
        ) : (
          <p>
            Topic titles name a section. Try reading only the titles, then switch to message titles.
          </p>
        )}
      </Note>
    </div>
  )
}
