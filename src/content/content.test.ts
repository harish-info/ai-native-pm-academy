import { describe, expect, it } from 'vitest'
import { allChallenges, allLessons, guides, levels, resourceById, resources } from '.'
import { caseStages, caseStudies } from './caseStudies'
import { competencyIds } from './competencies'
import { diagnosticQuestions } from './onboarding'
import { planWeeks } from './plan'
import { wikiMilestones, wikiSteps } from './wiki'
import { courseArc, lessonGuides } from './teaching'
import { lessonVisuals } from './illustrations'
import { productLoop } from './productLoop'

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
  it('connects every suggested loop stage to existing course sessions', () => {
    expect(productLoop).toHaveLength(6)
    for (const stage of productLoop) {
      expect(stage.lessons.length).toBeGreaterThan(0)
      for (const id of stage.lessons)
        expect(
          allLessons.some((l) => l.id === id),
          id,
        ).toBe(true)
    }
  })
  it('places a relevant illustration in every session with no orphaned diagrams', () => {
    const used = new Set<string>()
    for (const lesson of allLessons) {
      const visuals = lesson.learn.flatMap((section) =>
        section.illustration ? [section.illustration] : [],
      )
      expect(visuals.length, lesson.id).toBeGreaterThan(0)
      for (const id of visuals) {
        expect(lessonVisuals[id], lesson.id).toBeDefined()
        used.add(id)
      }
    }
    expect([...used].sort()).toEqual(Object.keys(lessonVisuals).sort())
  })
  it('gives every session a bounded core reading and an answerable decision exercise', () => {
    expect(Object.keys(lessonGuides).sort()).toEqual(allLessons.map((l) => l.id).sort())
    for (const lesson of allLessons) {
      const guide = lessonGuides[lesson.id]!
      expect(guide, lesson.id).toBeDefined()
      const core = lesson.resources.filter((r) => r.required)
      expect(core, lesson.id).toHaveLength(1)
      expect(resourceById(guide.reading.resourceId), lesson.id).toBeDefined()
      expect(core[0]!.resourceId).toBe(guide.reading.resourceId)
      expect(guide.reading.minutes).toBeGreaterThan(0)
      expect(guide.reading.minutes).toBeLessThanOrEqual(15)
      expect(guide.reading.minutes).toBeLessThan(lesson.minutes)
      expect(guide.example.reasoning.length).toBeGreaterThanOrEqual(2)
      const options = guide.checkpoint.options.map((o) => o.id)
      expect(new Set(options).size).toBe(options.length)
      expect(options).toContain(guide.checkpoint.correct)
      for (const o of guide.checkpoint.options) expect(o.feedback.length).toBeGreaterThan(30)
    }
    expect(Object.keys(courseArc).map(Number)).toEqual([1, 2, 3, 4, 5])
  })
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

  it('schedules every core session in the study plan exactly once', () => {
    const planned = planWeeks.flatMap((w) => w.items).filter((i) => i.kind === 'lesson')
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

describe('case studies', () => {
  it('offers three cases, each with every kind of agent question and an injection case', () => {
    expect(caseStudies.map((c) => c.id)).toEqual(['moneypilot', 'steady', 'triage'])
    for (const c of caseStudies) {
      expect(new Set(c.agentQuestions.map((q) => q.kind)).size, c.id).toBe(4)
      expect(
        c.agentQuestions.some((q) => /ignore your rules/i.test(q.question)),
        c.id,
      ).toBe(true)
      expect(
        c.screens.some((s) => s.priority === 'v1 core'),
        c.id,
      ).toBe(true)
      expect(c.tokens.slug, c.id).toMatch(/^[a-z0-9-]+$/)
      for (const { resourceId } of c.inspiration)
        expect(resourceById(resourceId), resourceId).toBeDefined()
    }
  })

  it('keeps course content independent of the optional case studies', () => {
    const text = allText({ levels, wikiSteps, wikiMilestones, guides, planWeeks })
    expect(text.filter((t) => /\{\{|\}\}/.test(t))).toEqual([])
    for (const c of caseStudies) {
      expect(
        text.filter((t) => new RegExp(`\\b${c.tokens.name}\\b`, 'i').test(t)),
        `${c.tokens.name} must remain in the optional case-study area`,
      ).toEqual([])
      expect(text.filter((t) => t.includes(`${c.tokens.slug}-workspace`))).toEqual([])
    }
  })

  it('maps every session to exactly one stage of the cycle', () => {
    const staged = caseStages.flatMap((s) => s.lessons)
    const all = levels.flatMap((l) => l.lessons.map((x) => x.id))
    expect([...staged].sort()).toEqual([...all].sort())
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
      caseStudies,
      lessonGuides,
      courseArc,
      lessonVisuals,
      productLoop,
    })
    const offenders = text.filter((t) => /[–—]/.test(t))
    expect(offenders).toEqual([])
  })
})
