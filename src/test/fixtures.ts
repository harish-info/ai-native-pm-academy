import { levels } from '../content'
import type { LevelId } from '../content/types'
import { emptyLearnerData, type LearnerData } from '../storage/schema'

export const AT = '2026-11-05T19:00:00.000Z'

export const level = (id: LevelId) => levels.find((l) => l.id === id)!

export function completeLesson(data: LearnerData, lessonId: string, at = AT) {
  const lesson = levels.flatMap((l) => l.lessons).find((l) => l.id === lessonId)!
  data.lessons[lessonId] = {
    checklist: Object.fromEntries(lesson.checklist.map((c) => [c.id, true])),
    reflection: 'A reflection that is comfortably longer than forty characters.',
    artifact: 'learning/artifact.md',
    startedAt: at,
    completedAt: at,
  }
  data.studyLog.push({ id: `log-${lessonId}`, date: at.slice(0, 10), minutes: 60, lessonId })
}

export function passQuiz(data: LearnerData, id: LevelId, correct?: number, at = AT) {
  const total = level(id).quiz.length
  data.quizAttempts.push({
    id: `quiz-${id}-${data.quizAttempts.length}`,
    levelId: id,
    answers: {},
    correct: correct ?? total,
    total,
    at,
  })
}

export function passProject(data: LearnerData, id: LevelId, score = 3, at = AT) {
  const project = level(id).project
  data.projects[String(id)] = {
    deliverables: Object.fromEntries(project.deliverables.map((d) => [d.id, true])),
    evidence: 'https://example.com/evidence',
    rubric: { correctness: score, quality: score, independence: score, judgment: score },
    assessedBy: 'self',
    mentorName: '',
    notes: '',
    assessedAt: at,
  }
}

export function masterLevel(data: LearnerData, id: LevelId) {
  for (const l of level(id).lessons) completeLesson(data, l.id)
  passQuiz(data, id)
  passProject(data, id)
}

export const fresh = () => emptyLearnerData(new Date(AT))
