import type { Challenge, Lesson, Level, LevelId } from './types'
import { caseStudyById, DEFAULT_CASE_STUDY, fillDeep, type CaseStudy } from './caseStudies'
import { level1 } from './levels/level1'
import { level2 } from './levels/level2'
import { level3 } from './levels/level3'
import { level4 } from './levels/level4'
import { level5 } from './levels/level5'
import { resources } from './resources'
import * as wiki from './wiki'

// The personal wiki runs through every level: each core session ends by filing it in the wiki,
// and each level project includes that level's wiki milestone.
const withWikiThread = (level: Level): Level => ({
  ...level,
  lessons: level.lessons.map((l) => ({
    ...l,
    checklist: [...l.checklist, wiki.WIKI_CHECKLIST_ITEM],
  })),
  project: {
    ...level.project,
    deliverables: [...level.project.deliverables, wiki.WIKI_PROJECT_DELIVERABLE],
  },
})

const rawLevels: Level[] = [level1, level2, level3, level4, level5].map(withWikiThread)

export const levelIds: LevelId[] = [1, 2, 3, 4, 5]

// Lesson and wiki text is written once with {{tokens}} and filled from the learner's case study.
// These are live bindings: the store calls setActiveCase before rendering, and remounts the app
// when the case changes, so every reader sees the filled text.
export let activeCase: CaseStudy = caseStudyById(DEFAULT_CASE_STUDY)
export let levels: Level[] = []
export let allLessons: Lesson[] = []
export let allChallenges: Challenge[] = []
export let wikiSteps: Record<string, wiki.WikiStep> = {}
export let wikiMilestones: wiki.WikiMilestone[] = []
export let wikiRules: string[] = []

export function setActiveCase(id: string | undefined) {
  const next = caseStudyById(id)
  if (levels.length && next.id === activeCase.id) return
  activeCase = next
  levels = fillDeep(rawLevels, next)
  allLessons = levels.flatMap((l) => l.lessons)
  allChallenges = levels.flatMap((l) => l.challenges)
  wikiSteps = fillDeep(wiki.wikiSteps, next)
  wikiMilestones = fillDeep(wiki.wikiMilestones, next)
  wikiRules = fillDeep(wiki.wikiRules, next)
}

setActiveCase(DEFAULT_CASE_STUDY)

export const levelById = (id: number): Level | undefined => levels.find((l) => l.id === id)
export const lessonById = (id: string): Lesson | undefined => allLessons.find((l) => l.id === id)
export const challengeById = (id: string): Challenge | undefined =>
  allChallenges.find((c) => c.id === id)
export const resourceById = (id: string) => resources.find((r) => r.id === id)

export { resources }
export const wikiPrompts = wiki.wikiPrompts
