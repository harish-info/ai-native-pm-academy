// Typed course content model. All curriculum lives in src/content as plain TypeScript data.

export type CompetencyId =
  | 'ai-fundamentals'
  | 'prompting-context'
  | 'knowledge-management'
  | 'product-discovery'
  | 'ux-prototyping'
  | 'technical-collaboration'
  | 'coding-agents'
  | 'agentic-systems'
  | 'evals-safety'
  | 'ai-leadership'

export interface Competency {
  id: CompetencyId
  name: string
  short: string
  description: string
}

export type LevelId = 1 | 2 | 3 | 4 | 5

export type Difficulty = 'Foundational' | 'Intermediate' | 'Advanced' | 'Expert'

export type MentorReview = 'optional' | 'recommended' | 'required'

/** Inline text supports **bold**, `code` and [label](https://url). */
export interface LearnSection {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export interface ResourceRef {
  resourceId: string
  /** Why this resource, for this lesson, in one sentence. */
  why: string
  required: boolean
}

export interface ChecklistItem {
  id: string
  text: string
}

export interface AgentPrompt {
  /** Which tool the prompt is written for, e.g. "Claude Code or Codex" or "ChatGPT or Claude". */
  tool: string
  /** Where to run it, e.g. "In your private second-brain folder". */
  where: string
  text: string
}

export interface Lesson {
  id: string // "l1-s1"
  levelId: LevelId
  number: number // 1..20 across the course
  title: string
  difficulty: Difficulty
  minutes: number
  tools: string[]
  prerequisites: string[] // lesson ids
  competencies: CompetencyId[]
  xp: number
  mentorReview: MentorReview
  /** Must be completed even when the learner tests out of the level's theory. */
  practicalProof?: boolean
  /** Safety-critical: never skippable. */
  safetyCritical?: boolean
  goal: string
  whyItMatters: string
  learn: LearnSection[]
  resources: ResourceRef[]
  task: { summary: string; steps: string[] }
  agentPrompt: AgentPrompt
  expectedOutput: string[]
  artifact: string
  verification: string[]
  reflectionPrompts: string[]
  checklist: ChecklistItem[]
  /** What the mentor (a senior engineer / AI lead) can do in ~15 minutes to help. */
  mentorMove: string
}

export interface Challenge {
  id: string // "l1-c1"
  levelId: LevelId
  title: string
  difficulty: Difficulty
  minutes: number
  competencies: CompetencyId[]
  xp: number
  suggestedWindow: 'December 2026' | 'January 2027'
  summary: string
  steps: string[]
  deliverable: string
  verification: string[]
  resources: ResourceRef[]
}

export interface QuizOption {
  id: string
  text: string
}

export interface QuizQuestion {
  id: string
  competency: CompetencyId
  prompt: string
  options: QuizOption[]
  correct: string // option id
  explanation: string
}

export type RubricDimension = 'correctness' | 'quality' | 'independence' | 'judgment'

export interface LevelProject {
  title: string
  brief: string
  deliverables: ChecklistItem[]
  /** Level-specific descriptor of what a 3/4 ("solid") looks like for each dimension. */
  rubric: Record<RubricDimension, string>
  privacyNote?: string
  minutes: number
  xp: number
}

export interface Level {
  id: LevelId
  slug: string
  title: string
  theme: string
  summary: string
  outcomes: string[]
  badge: { name: string; description: string }
  lessons: Lesson[]
  challenges: Challenge[]
  quiz: QuizQuestion[]
  project: LevelProject
  nextRecommendation: string
}

export type ResourceFormat =
  | 'course'
  | 'article'
  | 'video'
  | 'documentation'
  | 'community'
  | 'repository'
  | 'newsletter'
  | 'podcast'
  | 'tool'

export type VerificationStatus = 'verified' | 'redirected' | 'needs-review' | 'unavailable'

export interface Resource {
  id: string
  title: string
  provider: string
  url: string
  topic: string
  level: 'beginner' | 'intermediate' | 'advanced'
  format: ResourceFormat
  estimatedTime: string | null
  contentFree: boolean | 'partial'
  signInRequired: boolean
  /** Cost of doing the practical work, distinct from the learning content. */
  practicalCost: string
  verifiedOn: string | null
  status: VerificationStatus
  summary: string
  notes?: string
}
