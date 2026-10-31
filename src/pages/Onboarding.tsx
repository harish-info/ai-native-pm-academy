import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { competencies } from '../content/competencies'
import { diagnosticQuestions, profileQuestions } from '../content/onboarding'
import { useStore } from '../state/store'
import { Button, Card, cx, inputClass } from '../ui/primitives'

type Profile = Record<string, string | string[]>

const steps = ['About you', 'Self-assessment', 'Scenarios'] as const

const ratingLabels = ['New to this', 'Some exposure', 'Confident', 'Could teach it']

function RadioCard({
  name,
  value,
  checked,
  onChange,
  label,
}: {
  name: string
  value: string
  checked: boolean
  onChange: () => void
  label: string
}) {
  return (
    <label
      className={cx(
        'flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-2.5 text-sm transition-colors',
        checked
          ? 'border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-950/60'
          : 'border-stone-200 hover:bg-stone-50 dark:border-stone-700 dark:hover:bg-stone-800/50',
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="mt-0.5 accent-indigo-600"
      />
      <span>{label}</span>
    </label>
  )
}

export function Onboarding() {
  const { data, update } = useStore()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [profile, setProfile] = useState<Profile>(() => data.onboarding?.profile ?? {})
  const [ratings, setRatings] = useState<Record<string, number>>(
    () => data.onboarding?.selfRatings ?? {},
  )
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [error, setError] = useState<string | null>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
    window.scrollTo?.(0, 0)
  }, [step])

  const missing = (): string | null => {
    if (step === 0) {
      const q = profileQuestions.find((q) => q.kind === 'single' && !profile[q.id])
      return q ? `Please answer: ${q.label}` : null
    }
    if (step === 1) {
      const c = competencies.find((c) => !ratings[c.id])
      return c ? `Please rate: ${c.name}` : null
    }
    const q = diagnosticQuestions.findIndex((q) => !answers[q.id])
    return q >= 0 ? `Please answer scenario ${q + 1}. "Not sure yet" is a fine answer.` : null
  }

  const next = () => {
    const m = missing()
    if (m) {
      setError(m)
      return
    }
    setError(null)
    if (step < steps.length - 1) {
      setStep(step + 1)
      return
    }
    update((d) => {
      d.onboarding = {
        profile,
        selfRatings: ratings,
        diagnostic: answers,
        completedAt: new Date().toISOString(),
      }
    })
    navigate('/onboarding/result')
  }

  const toggleMulti = (id: string, option: string) =>
    setProfile((p) => {
      const current = Array.isArray(p[id]) ? (p[id] as string[]) : []
      return {
        ...p,
        [id]: current.includes(option) ? current.filter((x) => x !== option) : [...current, option],
      }
    })

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-4 py-5">
        <Link to="/" className="font-semibold tracking-tight">
          AI-Native PM Academy
        </Link>
        {data.onboarding && (
          <Link to="/dashboard" className="text-sm text-stone-600 underline dark:text-stone-400">
            Back to dashboard
          </Link>
        )}
      </header>
      <main id="main" className="mx-auto max-w-3xl px-4 pb-16">
        <ol className="mb-6 flex gap-2" aria-label="Diagnostic progress">
          {steps.map((s, i) => (
            <li key={s} className="flex-1" aria-current={i === step ? 'step' : undefined}>
              <div
                className={cx(
                  'h-1.5 rounded-full',
                  i <= step ? 'bg-indigo-600 dark:bg-indigo-400' : 'bg-stone-200 dark:bg-stone-800',
                )}
              />
              <span
                className={cx(
                  'mt-1 block text-xs',
                  i === step ? 'font-medium' : 'text-stone-500 dark:text-stone-400',
                )}
              >
                {i + 1}. {s}
              </span>
            </li>
          ))}
        </ol>

        <h1
          ref={headingRef}
          tabIndex={-1}
          className="text-2xl font-semibold tracking-tight outline-none sm:text-3xl"
        >
          {step === 0 && 'Tell us where you are starting from'}
          {step === 1 && 'How confident are you today?'}
          {step === 2 && 'Fourteen short scenarios'}
        </h1>
        <p className="mt-2 mb-6 text-stone-600 dark:text-stone-400">
          {step === 0 &&
            'This shapes your path, your pacing and the first project. It stays in this browser.'}
          {step === 1 &&
            'Rate yourself honestly. The scenarios that follow test the same areas, and the gap between the two is useful.'}
          {step === 2 &&
            'Pick the best answer. "Not sure yet" is always better than a guess: it makes your starting point more accurate. Strong results can let you skip the theory of early levels, never the practical proof.'}
        </p>

        {step === 0 && (
          <div className="space-y-5">
            {profileQuestions.map((q) =>
              q.kind === 'text' ? (
                <Card key={q.id} as="div">
                  <label htmlFor={`p-${q.id}`} className="font-medium">
                    {q.label}
                  </label>
                  {q.help && (
                    <p className="mb-2 text-sm text-stone-500 dark:text-stone-400">{q.help}</p>
                  )}
                  <input
                    id={`p-${q.id}`}
                    className={inputClass}
                    value={(profile[q.id] as string) ?? ''}
                    onChange={(e) => setProfile({ ...profile, [q.id]: e.target.value })}
                    autoComplete="given-name"
                  />
                </Card>
              ) : (
                <Card key={q.id} as="div">
                  <fieldset>
                    <legend className="font-medium">{q.label}</legend>
                    {q.help && (
                      <p className="text-sm text-stone-500 dark:text-stone-400">{q.help}</p>
                    )}
                    {q.kind === 'multi' && (
                      <p className="text-sm text-stone-500 dark:text-stone-400">
                        Select all that apply.
                      </p>
                    )}
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {q.options.map((o) =>
                        q.kind === 'single' ? (
                          <RadioCard
                            key={o.id}
                            name={q.id}
                            value={o.id}
                            label={o.label}
                            checked={profile[q.id] === o.id}
                            onChange={() => setProfile({ ...profile, [q.id]: o.id })}
                          />
                        ) : (
                          <label
                            key={o.id}
                            className="flex cursor-pointer items-start gap-3 rounded-xl border border-stone-200 px-3 py-2.5 text-sm hover:bg-stone-50 dark:border-stone-700 dark:hover:bg-stone-800/50"
                          >
                            <input
                              type="checkbox"
                              className="mt-0.5 accent-indigo-600"
                              checked={
                                Array.isArray(profile[q.id]) &&
                                (profile[q.id] as string[]).includes(o.id)
                              }
                              onChange={() => toggleMulti(q.id, o.id)}
                            />
                            <span>{o.label}</span>
                          </label>
                        ),
                      )}
                    </div>
                  </fieldset>
                </Card>
              ),
            )}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            {competencies.map((c) => (
              <Card key={c.id} as="div">
                <fieldset>
                  <legend className="font-medium">{c.name}</legend>
                  <p className="text-sm text-stone-500 dark:text-stone-400">{c.description}</p>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {ratingLabels.map((label, i) => (
                      <RadioCard
                        key={label}
                        name={`rate-${c.id}`}
                        value={String(i + 1)}
                        label={label}
                        checked={ratings[c.id] === i + 1}
                        onChange={() => setRatings({ ...ratings, [c.id]: i + 1 })}
                      />
                    ))}
                  </div>
                </fieldset>
              </Card>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            {diagnosticQuestions.map((q, i) => (
              <Card key={q.id} as="div">
                <fieldset>
                  <legend className="font-medium leading-snug">
                    <span className="mr-2 text-stone-500 dark:text-stone-400">{i + 1}.</span>
                    {q.scenario}
                  </legend>
                  <div className="mt-3 grid gap-2">
                    {q.options.map((o) => (
                      <RadioCard
                        key={o.id}
                        name={q.id}
                        value={o.id}
                        label={o.text}
                        checked={answers[q.id] === o.id}
                        onChange={() => setAnswers({ ...answers, [q.id]: o.id })}
                      />
                    ))}
                  </div>
                </fieldset>
              </Card>
            ))}
          </div>
        )}

        <div className="sticky bottom-0 mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 bg-stone-50/95 py-4 backdrop-blur dark:border-stone-800 dark:bg-stone-950/95">
          <p role="alert" className="text-sm text-red-700 dark:text-red-300">
            {error}
          </p>
          <div className="ml-auto flex gap-2">
            {step > 0 && (
              <Button variant="secondary" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
            <Button onClick={next}>
              {step < steps.length - 1 ? 'Continue' : 'See my results'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
