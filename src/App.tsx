import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { StoreProvider, useStore } from './state/store'
import { Layout } from './ui/Layout'
import { Landing } from './pages/Landing'
import { Onboarding } from './pages/Onboarding'
import { OnboardingResult } from './pages/OnboardingResult'
import { Dashboard } from './pages/Dashboard'
import { LevelMap } from './pages/LevelMap'
import { LevelDetail } from './pages/LevelDetail'
import { LessonPage } from './pages/LessonPage'
import { ChallengePage } from './pages/ChallengePage'
import { QuizPage } from './pages/QuizPage'
import { ProjectPage } from './pages/ProjectPage'
import { ResourcesPage } from './pages/ResourcesPage'
import { WorkspacePage } from './pages/WorkspacePage'
import { StatsPage } from './pages/StatsPage'
import { AchievementsPage } from './pages/AchievementsPage'
import { SettingsPage } from './pages/SettingsPage'
import { MonthPlanPage } from './pages/MonthPlanPage'
import { CaseStudyPage } from './pages/CaseStudyPage'
import { WikiPage } from './pages/WikiPage'
import { NotFound } from './pages/NotFound'

function Home() {
  const { data } = useStore()
  return data.onboarding ? <Navigate to="/dashboard" replace /> : <Landing />
}

export function AppRoutes() {
  return (
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
