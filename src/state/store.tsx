import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { levels, setActiveCase } from '../content'
import { achievements, unlockedIds } from '../domain/achievements'
import { levelStatuses } from '../domain/progress'
import { Repository, type Mode } from '../storage/repository'
import type { LearnerData } from '../storage/schema'
import { buildDemoData } from './demo'

export interface Celebration {
  kind: 'level' | 'achievement'
  title: string
  description: string
}

interface StoreValue {
  data: LearnerData
  mode: Mode
  persistent: boolean
  recoveredKey?: string
  saveError: string | null
  repo: Repository
  update: (mutate: (draft: LearnerData) => void) => void
  replaceAll: (next: LearnerData) => Promise<void>
  switchMode: (mode: Mode) => void
  celebration: Celebration | null
  dismissCelebration: () => void
}

const StoreContext = createContext<StoreValue | null>(null)

export const MODE_KEY = 'academy-mode'
export const THEME_KEY = 'academy-theme'

export function readMode(): Mode {
  try {
    return sessionStorage.getItem(MODE_KEY) === 'demo' ? 'demo' : 'real'
  } catch {
    return 'real'
  }
}

function applyTheme(theme: LearnerData['settings']['theme']) {
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
    // storage may be unavailable; the theme still applies for this session
  }
  const dark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia?.('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', !!dark)
}

function diffCelebration(before: LearnerData, after: LearnerData): Celebration | null {
  const wasMastered = new Set(
    levelStatuses(before, levels)
      .filter((s) => s.mastered)
      .map((s) => s.level.id),
  )
  const newly = levelStatuses(after, levels).find((s) => s.mastered && !wasMastered.has(s.level.id))
  if (newly) {
    return {
      kind: 'level',
      title: `Level ${newly.level.id} mastered`,
      description: `You earned the ${newly.level.badge.name} badge. ${newly.level.nextRecommendation}`,
    }
  }
  const prev = unlockedIds(achievements(before, levels))
  const fresh = achievements(after, levels).find(
    (a) => a.unlocked && a.kind === 'milestone' && !prev.has(a.id),
  )
  return fresh ? { kind: 'achievement', title: fresh.title, description: fresh.description } : null
}

export function StoreProvider({
  children,
  initialMode,
}: {
  children: ReactNode
  initialMode?: Mode
}) {
  const [mode] = useState<Mode>(initialMode ?? readMode())
  const [state, setState] = useState<{
    repo: Repository
    data: LearnerData
    persistent: boolean
    recoveredKey?: string
  } | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [celebration, setCelebration] = useState<Celebration | null>(null)
  const latest = useRef<LearnerData | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const repo = await Repository.open(mode)
      let result = await repo.load()
      if (mode === 'demo' && result.isNew) {
        const demo = buildDemoData(new Date())
        await repo.save(demo)
        result = { ...result, data: demo, isNew: false }
      }
      if (cancelled) return
      latest.current = result.data
      applyTheme(result.data.settings.theme)
      setState({
        repo,
        data: result.data,
        persistent: result.persistent,
        recoveredKey: result.recoveredKey,
      })
    })()
    return () => {
      cancelled = true
    }
  }, [mode])

  const update = useCallback(
    (mutate: (draft: LearnerData) => void) => {
      if (!state || !latest.current) return
      const before = latest.current
      const draft = structuredClone(before)
      mutate(draft)
      draft.updatedAt = new Date().toISOString()
      for (const s of levelStatuses(draft, levels)) {
        if (s.mastered && !draft.masteredLevels[s.level.id]) {
          draft.masteredLevels[s.level.id] = s.masteredAt ?? draft.updatedAt
        }
      }
      latest.current = draft
      setState((s) => (s ? { ...s, data: draft } : s))
      if (draft.settings.theme !== before.settings.theme) applyTheme(draft.settings.theme)
      const c = diffCelebration(before, draft)
      if (c) setCelebration(c)
      state.repo.save(draft).then(
        () => setSaveError(null),
        (e: unknown) => setSaveError(e instanceof Error ? e.message : 'Could not save progress'),
      )
    },
    [state],
  )

  const replaceAll = useCallback(
    async (next: LearnerData) => {
      if (!state) return
      latest.current = next
      setState((s) => (s ? { ...s, data: next } : s))
      applyTheme(next.settings.theme)
      await state.repo.save(next)
    },
    [state],
  )

  const switchMode = useCallback((next: Mode) => {
    try {
      if (next === 'demo') sessionStorage.setItem(MODE_KEY, 'demo')
      else sessionStorage.removeItem(MODE_KEY)
    } catch {
      // ignore
    }
    window.location.hash = '#/dashboard'
    window.location.reload()
  }, [])

  const value = useMemo<StoreValue | null>(
    () =>
      state && {
        data: state.data,
        mode,
        persistent: state.persistent,
        recoveredKey: state.recoveredKey,
        saveError,
        repo: state.repo,
        update,
        replaceAll,
        switchMode,
        celebration,
        dismissCelebration: () => setCelebration(null),
      },
    [state, mode, saveError, update, replaceAll, switchMode, celebration],
  )

  if (!state) {
    return (
      <div className="grid min-h-screen place-items-center text-sm text-stone-500" role="status">
        Loading your progress...
      </div>
    )
  }
  // Lesson text is filled from the chosen case study. Setting it here, before any page renders,
  // means every store reader sees the right case; pages mounted later read it fresh.
  setActiveCase(state.data.settings.caseStudy)
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}

export const newId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
