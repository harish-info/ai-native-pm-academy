import { Suspense, lazy } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { StoreProvider, useStore } from './state/store'
import { Layout } from './ui/Layout'
import { Landing } from './pages/Landing'
import { Dashboard } from './pages/Dashboard'
import { LevelMap } from './pages/LevelMap'
import { LevelDetail } from './pages/LevelDetail'
import { LessonPage } from './pages/LessonPage'
import { NotFound } from './pages/NotFound'

// Less-visited pages load on demand so the first visit downloads less.
const Onboarding = lazy(() => import('./pages/Onboarding').then((m) => ({ default: m.Onboarding })))
const OnboardingResult = lazy(() =>
  import('./pages/OnboardingResult').then((m) => ({ default: m.OnboardingResult })),
)
const ChallengePage = lazy(() =>
  import('./pages/ChallengePage').then((m) => ({ default: m.ChallengePage })),
)
const QuizPage = lazy(() => import('./pages/QuizPage').then((m) => ({ default: m.QuizPage })))
const ProjectPage = lazy(() =>
  import('./pages/ProjectPage').then((m) => ({ default: m.ProjectPage })),
)
const ResourcesPage = lazy(() =>
  import('./pages/ResourcesPage').then((m) => ({ default: m.ResourcesPage })),
)
const WorkspacePage = lazy(() =>
  import('./pages/WorkspacePage').then((m) => ({ default: m.WorkspacePage })),
)
const StatsPage = lazy(() => import('./pages/StatsPage').then((m) => ({ default: m.StatsPage })))
const AchievementsPage = lazy(() =>
  import('./pages/AchievementsPage').then((m) => ({ default: m.AchievementsPage })),
)
const SettingsPage = lazy(() =>
  import('./pages/SettingsPage').then((m) => ({ default: m.SettingsPage })),
)
const MonthPlanPage = lazy(() =>
  import('./pages/MonthPlanPage').then((m) => ({ default: m.MonthPlanPage })),
)
const CaseStudyPage = lazy(() =>
  import('./pages/CaseStudyPage').then((m) => ({ default: m.CaseStudyPage })),
)
const WikiPage = lazy(() => import('./pages/WikiPage').then((m) => ({ default: m.WikiPage })))

function Home() {
  const { data } = useStore()
  return data.onboarding ? <Navigate to="/dashboard" replace /> : <Landing />
}

export function AppRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Landing />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route element={<Layout />}>
          <Route path="/onboarding/result" element={<OnboardingResult />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/levels" element={<LevelMap />} />
          <Route path="/levels/:levelId" element={<LevelDetail />} />
          <Route path="/levels/:levelId/quiz" element={<QuizPage />} />
          <Route path="/levels/:levelId/project" element={<ProjectPage />} />
          <Route path="/lessons/:lessonId" element={<LessonPage />} />
          <Route path="/challenges/:challengeId" element={<ChallengePage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/workspace" element={<WorkspacePage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/plan" element={<MonthPlanPage />} />
          <Route path="/case-study" element={<CaseStudyPage />} />
          <Route path="/moneypilot" element={<Navigate to="/case-study" replace />} />
          <Route path="/wiki" element={<WikiPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export function App() {
  return (
    <StoreProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </StoreProvider>
  )
}
