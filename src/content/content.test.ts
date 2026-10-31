import { describe, expect, it } from 'vitest'
import { allChallenges, allLessons, levels, resourceById, resources } from '.'
import { competencyIds } from './competencies'
import { agentQuestions, referenceScreens } from './moneypilot'
import { diagnosticQuestions } from './onboarding'
import { planWeeks } from './plan'
import { wikiMilestones, wikiSteps } from './wiki'

const allText = (value: unknown): string[] =>
  typeof value === 'string'
    ? [value]
    : Array.isArray(value)
      ? value.flatMap(allText)
      : value && typeof value === 'object'
        ? Object.values(value).flatMap(allText)
        : []

describe('curriculum shape', () => {
  it('has 5 levels, 20 core sessions and 10 challenges', () => {
    expect(levels).toHaveLength(5)
    expect(allLessons).toHaveLength(20)
    expect(allChallenges).toHaveLength(10)
    expect(allLessons.map((l) => l.number)).toEqual(Array.from({ length: 20 }, (_, i) => i + 1))
  })

  it('uses unique ids everywhere', () => {
    const ids = [...allLessons.map((l) => l.id), ...allChallenges.map((c) => c.id)]
    expect(new Set(ids).size).toBe(ids.length)
    expect(new Set(resources.map((r) => r.id)).size).toBe(resources.length)
    for (const l of levels) {
      const q = l.quiz.map((x) => x.id)
      expect(new Set(q).size).toBe(q.length)
    }
  })

  it('gives every level a quiz of at least 8 questions with valid answers', () => {
    for (const l of levels) {
      expect(l.quiz.length).toBeGreaterThanOrEqual(8)
      for (const q of l.quiz) expect(q.options.map((o) => o.id)).toContain(q.correct)
    }
  })

  it('makes the final agent session safety critical', () => {
    expect(allLessons.some((l) => l.levelId === 5 && l.safetyCritical)).toBe(true)
  })
})

describe('references', () => {
  it('points every resource reference at a catalog entry', () => {
    const refs = [...allLessons, ...allChallenges].flatMap((x) =>
      x.resources.map((r) => [x.id, r.resourceId]),
    )
    const missing = refs.filter(([, id]) => !resourceById(id!))
    expect(missing).toEqual([])
  })

  it('uses https links only', () => {
    for (const r of resources) expect(r.url).toMatch(/^https:\/\//)
  })

  it('points prerequisites at earlier sessions', () => {
    for (const l of allLessons) {
      for (const p of l.prerequisites) {
        const pre = allLessons.find((x) => x.id === p)
        expect(pre, `${l.id} -> ${p}`).toBeDefined()
        expect(pre!.number).toBeLessThan(l.number)
      }
    }
  })

  it('uses known competencies', () => {
    for (const l of allLessons) for (const c of l.competencies) expect(competencyIds).toContain(c)
    for (const q of diagnosticQuestions) expect(competencyIds).toContain(q.competency)
  })

  it('schedules every core session in the month plan exactly once', () => {
    const planned = planWeeks
      .flatMap((w) => w.days.flatMap((d) => d.items))
      .filter((i) => i.kind === 'lesson')
    const ids = planned.map((i) => (i as { id: string }).id)
    expect([...ids].sort()).toEqual(allLessons.map((l) => l.id).sort())
  })
})

describe('wiki thread', () => {
  it('adds the wiki checklist item to every session and the milestone to every project', () => {
    for (const l of allLessons) expect(l.checklist.map((c) => c.id)).toContain('wiki-filed')
    for (const l of levels)
      expect(l.project.deliverables.map((d) => d.id)).toContain('wiki-milestone')
  })

  it('has a wiki step for every session and a milestone for every level', () => {
    for (const l of allLessons) expect(wikiSteps[l.id], l.id).toBeDefined()
    expect(wikiMilestones.map((m) => m.levelId)).toEqual([1, 2, 3, 4, 5])
  })
})

describe('moneypilot', () => {
  it('covers refusal and injection cases in the agent questions', () => {
    const kinds = new Set(agentQuestions.map((q) => q.kind))
    expect(kinds.size).toBeGreaterThanOrEqual(3)
    expect(referenceScreens.length).toBeGreaterThan(0)
  })
})

describe('writing style', () => {
  it('uses no em or en dashes in learner-facing content', () => {
    const text = allText({
      levels,
      resources,
      diagnosticQuestions,
      wikiSteps,
      wikiMilestones,
      planWeeks,
      agentQuestions,
    })
    const offenders = text.filter((t) => /[–—]/.test(t))
    expect(offenders).toEqual([])
  })
})
