import type { Challenge, Lesson, Level, LevelId } from './types'
import { level1 } from './levels/level1'
import { level2 } from './levels/level2'
import { level3 } from './levels/level3'
import { level4 } from './levels/level4'
import { level5 } from './levels/level5'
import { resources } from './resources'
import { lessonGuides } from './teaching'
import * as wiki from './wiki'

// Suggest a bounded starting excerpt and keep every additional source visible in the lesson.
// The workspace thread preserves the existing evidence ids and learner progress.
const withWikiThread = (level: Level): Level => ({
  ...level,
  lessons: level.lessons.map((l) => ({
    ...l,
    resources: [
      {
        resourceId: lessonGuides[l.id]!.reading.resourceId,
        why: lessonGuides[l.id]!.reading.focus,
        minutes: lessonGuides[l.id]!.reading.minutes,
        required: true,
      },
      ...l.resources
        .filter((r) => r.resourceId !== lessonGuides[l.id]!.reading.resourceId)
        .map((r) => ({ ...r, required: false })),
    ],
    checklist: [...l.checklist, wiki.WIKI_CHECKLIST_ITEM],
  })),
  project: {
    ...level.project,
    deliverables: [...level.project.deliverables, wiki.WIKI_PROJECT_DELIVERABLE],
  },
})

export const levelIds: LevelId[] = [1, 2, 3, 4, 5]

// The curriculum addresses the learner's PM role. Optional case studies never rewrite it.
export const levels: Level[] = [level1, level2, level3, level4, level5].map(withWikiThread)
export const allLessons = levels.flatMap((l) => l.lessons)
export const allChallenges = levels.flatMap((l) => l.challenges)
export const wikiSteps = wiki.wikiSteps
export const wikiMilestones = wiki.wikiMilestones
export const wikiRules = wiki.wikiRules
export const guides = lessonGuides

export const levelById = (id: number): Level | undefined => levels.find((l) => l.id === id)
export const lessonById = (id: string): Lesson | undefined => allLessons.find((l) => l.id === id)
export const challengeById = (id: string): Challenge | undefined =>
  allChallenges.find((c) => c.id === id)
export const resourceById = (id: string) => resources.find((r) => r.id === id)

export { resources }
export const wikiPrompts = wiki.wikiPrompts
