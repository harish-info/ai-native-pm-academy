import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { levels } from '../content'
import { currentLevel, levelStatuses, xpBreakdown } from '../domain/progress'
import { useStore } from '../state/store'
import { BrandMark, ConfettiBurst, Icon, LevelArt } from './art'
import { Button, Chevron, cx } from './primitives'

interface NavItem {
  to: string
  label: string
  icon: string
  /** Other routes that belong to this item, so it stays highlighted on them. */
  also?: string[]
}

// Grouped by the learner's loop: plan the week, learn, build the case study and the PM OS,
// keep a record. Every item answers a question the learner has; nothing is here for decoration.
const nav: { heading?: string; items: NavItem[] }[] = [
  { items: [{ to: '/dashboard', label: 'This week', icon: 'home' }] },
  {
    heading: 'Learn',
    items: [
      { to: '/levels', label: 'Course', icon: 'path', also: ['/lessons', '/challenges'] },
      { to: '/plan', label: 'Study plan', icon: 'calendar' },
      { to: '/resources', label: 'Resources', icon: 'library' },
    ],
  },
  {
    heading: 'Build',
    items: [
      { to: '/case-study', label: 'Case study', icon: 'cycle' },
      { to: '/wiki', label: 'PM OS', icon: 'book' },
    ],
  },
  {
    heading: 'Record',
    items: [
      { to: '/workspace', label: 'Notebook', icon: 'pencil' },
      { to: '/stats', label: 'Progress', icon: 'chart', also: ['/achievements'] },
    ],
  },
  { items: [{ to: '/settings', label: 'Settings', icon: 'sliders' }] },
]

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation()
  return (
    <div className="space-y-4">
      {nav.map((group, i) => (
        <div key={group.heading ?? i}>
          {group.heading && (
            <p
              id={`nav-${group.heading}`}
              className="mb-1 px-3 font-mono text-[0.68rem] font-medium tracking-[0.14em] text-stone-500 uppercase dark:text-stone-400"
            >
              {group.heading}
            </p>
          )}
          <ul
            className="space-y-0.5"
            aria-labelledby={group.heading ? `nav-${group.heading}` : undefined}
          >
            {group.items.map((item) => {
              const extra = item.also?.some((p) => pathname.startsWith(p)) ?? false
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={onNavigate}
                    aria-current={extra ? 'page' : undefined}
                    className={({ isActive }) =>
                      cx(
                        'relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        isActive || extra
                          ? 'bg-indigo-50 text-indigo-800 before:absolute before:inset-y-1.5 before:-left-4 before:w-1 before:rounded-r-full before:bg-indigo-600 dark:bg-indigo-950 dark:text-indigo-200 dark:before:bg-indigo-400'
                          : 'text-stone-700 hover:bg-stone-100 hover:text-stone-950 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white',
                      )
                    }
                  >
                    <Icon
                      name={item.icon}
                      className="h-[1.15rem] w-[1.15rem] shrink-0 opacity-80"
                    />
                    {item.label}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}

function Banner({ tone, children }: { tone: 'amber' | 'red' | 'indigo'; children: ReactNode }) {
  const styles = {
    amber:
      'border-amber-300 bg-amber-50 text-amber-900 dark:border-mark-500/40 dark:bg-stone-900 dark:text-stone-100',
    red: 'border-red-300 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100',
    indigo:
      'border-indigo-300 bg-indigo-50 text-indigo-900 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-100',
  }
  return (
    <div
      className={cx(
        'mb-4 flex flex-wrap items-center gap-3 rounded-xl border px-4 py-3 text-sm',
        styles[tone],
      )}
    >
      {children}
    </div>
  )
}

function CelebrationDialog() {
  const { celebration, dismissCelebration } = useStore()
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!celebration) return
    const previous = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && dismissCelebration()
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      previous?.focus?.()
    }
  }, [celebration, dismissCelebration])
  if (!celebration) return null
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-stone-950/40 p-4"
      onClick={dismissCelebration}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="celebration-title"
        aria-describedby="celebration-body"
        onClick={(e) => e.stopPropagation()}
        className="animate-pop-in relative w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl dark:bg-stone-900"
      >
        <ConfettiBurst />
        <BrandMark className="relative mx-auto mb-3 h-14 w-14" />
        <h2 id="celebration-title" className="text-xl font-semibold">
          {celebration.title}
        </h2>
        <p id="celebration-body" className="mt-2 text-stone-600 dark:text-stone-400">
          {celebration.description}
        </p>
        <Button ref={closeRef} className="mt-5" onClick={dismissCelebration}>
          Keep going
        </Button>
      </div>
    </div>
  )
}

export function Layout() {
  const { data, mode, persistent, recoveredKey, saveError, switchMode } = useStore()
  const location = useLocation()
  // The menu belongs to the page it was opened on, so any navigation closes it.
  const [menuPath, setMenuPath] = useState<string | null>(null)
  const menuOpen = menuPath === location.pathname
  const mainRef = useRef<HTMLElement>(null)
  const statuses = levelStatuses(data, levels)
  const current = currentLevel(statuses)
  const xp = xpBreakdown(data, levels).total

  useEffect(() => {
    window.scrollTo?.(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[16rem_1fr]">
      <a
        href="#main"
        onClick={(e) => {
          e.preventDefault()
          mainRef.current?.focus()
        }}
        className="sr-only z-50 rounded-lg bg-indigo-600 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      <aside className="hidden border-r border-stone-200 bg-white px-4 py-6 lg:block dark:border-stone-800 dark:bg-stone-900">
        <div className="sticky top-6">
          <NavLink to="/dashboard" className="mb-7 flex items-center gap-2.5 px-2">
            <BrandMark />
            <span className="font-display text-[0.95rem] leading-tight font-bold tracking-tight">
              AI-Native
              <br />
              PM Academy
            </span>
          </NavLink>
          <nav aria-label="Main">
            <NavItems />
          </nav>
          <NavLink
            to={`/levels/${current.level.id}`}
            className="group mt-6 flex items-center gap-3 rounded-xl border border-stone-200 bg-stone-50 p-3 transition-colors hover:border-indigo-300 dark:border-stone-800 dark:bg-stone-950 dark:hover:border-indigo-700"
          >
            <LevelArt levelId={current.level.id} className="h-10 w-10" />
            <span className="min-w-0 flex-1 text-xs">
              <span className="block font-semibold text-stone-900 dark:text-stone-100">
                Level {current.level.id}
              </span>
              <span className="text-stone-600 tabular-nums dark:text-stone-400">
                {xp.toLocaleString()} XP
              </span>
            </span>
            <Chevron className="h-4 w-4" />
          </NavLink>
          {mode === 'demo' && (
            <p className="mt-6 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900 dark:bg-stone-800/60 dark:text-mark-200">
              Demo mode
            </p>
          )}
        </div>
      </aside>

      <div className="sticky top-0 z-40 border-b border-stone-200 bg-white/90 backdrop-blur lg:hidden dark:border-stone-800 dark:bg-stone-900/90">
        <div className="flex items-center justify-between px-4 py-3">
          <NavLink
            to="/dashboard"
            className="font-display flex items-center gap-2 font-bold tracking-tight"
          >
            <BrandMark className="h-7 w-7" />
            AI-Native PM Academy
          </NavLink>
          <Button
            variant="secondary"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuPath(menuOpen ? null : location.pathname)}
            className="min-h-9 px-3 py-1"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </Button>
        </div>
        {menuOpen && (
          <nav
            id="mobile-nav"
            aria-label="Main"
            className="border-t border-stone-200 px-3 py-3 dark:border-stone-800"
          >
            <NavItems onNavigate={() => setMenuPath(null)} />
          </nav>
        )}
      </div>

      <main
        id="main"
        ref={mainRef}
        tabIndex={-1}
        className="mx-auto w-full max-w-6xl px-4 py-6 outline-none sm:px-6 lg:px-10 lg:py-10"
      >
        {mode === 'demo' && (
          <Banner tone="amber">
            <span>
              <strong>Demo mode.</strong> You are looking at sample progress in a separate database.
              Your real progress is untouched.
            </span>
            <Button
              variant="secondary"
              className="min-h-8 px-3 py-1"
              onClick={() => switchMode('real')}
            >
              Exit demo
            </Button>
          </Banner>
        )}
        {!persistent && (
          <Banner tone="amber">
            This browser is not allowing local storage (private browsing can do this), so progress
            will be lost when you close the tab. Export a backup from Settings.
          </Banner>
        )}
        {recoveredKey && (
          <Banner tone="red">
            Saved progress could not be read, so the academy started fresh. The unreadable copy was
            kept in this browser; see Settings to download it.
          </Banner>
        )}
        {saveError && (
          <Banner tone="red">
            <span role="alert">
              Your latest change could not be saved: {saveError}. Export a backup from Settings to
              be safe.
            </span>
          </Banner>
        )}
        <Suspense fallback={<p className="text-sm text-stone-500 dark:text-stone-400">Loading</p>}>
          <Outlet />
        </Suspense>
      </main>
      <CelebrationDialog />
    </div>
  )
}
