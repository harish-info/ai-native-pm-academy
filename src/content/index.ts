import type { Challenge, Lesson, Level, LevelId } from './types'
import { level1 } from './levels/level1'
import { level2 } from './levels/level2'
import { level3 } from './levels/level3'
import { level4 } from './levels/level4'
import { level5 } from './levels/level5'
import { resources } from './resources'
import { WIKI_CHECKLIST_ITEM, WIKI_PROJECT_DELIVERABLE } from './wiki'

// The personal wiki runs through every level: each core session ends by filing it in the wiki,
// and each level project includes that level's wiki milestone.
const withWikiThread = (level: Level): Level => ({
  ...level,
  lessons: level.lessons.map((l) => ({ ...l, checklist: [...l.checklist, WIKI_CHECKLIST_ITEM] })),
  project: {
    ...level.project,
    deliverables: [...level.project.deliverables, WIKI_PROJECT_DELIVERABLE],
  },
})

export const levels: Level[] = [level1, level2, level3, level4, level5].map(withWikiThread)

export const levelIds: LevelId[] = [1, 2, 3, 4, 5]

export const allLessons: Lesson[] = levels.flatMap((l) => l.lessons)
export const allChallenges: Challenge[] = levels.flatMap((l) => l.challenges)

export const levelById = (id: number): Level | undefined => levels.find((l) => l.id === id)
export const lessonById = (id: string): Lesson | undefined => allLessons.find((l) => l.id === id)
export const challengeById = (id: string): Challenge | undefined =>
  allChallenges.find((c) => c.id === id)
export const resourceById = (id: string) => resources.find((r) => r.id === id)

export { resources }
