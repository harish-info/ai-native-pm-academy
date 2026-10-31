import type { Competency, CompetencyId } from './types'

export const competencies: Competency[] = [
  {
    id: 'ai-fundamentals',
    name: 'AI fundamentals',
    short: 'Fundamentals',
    description:
      'How LLMs work, tokens, context windows, strengths, failure modes and when to delegate.',
  },
  {
    id: 'prompting-context',
    name: 'Context engineering',
    short: 'Context',
    description:
      'Giving models the files, goals, examples and constraints they need, and deciding what to delegate.',
  },
  {
    id: 'knowledge-management',
    name: 'Knowledge bases',
    short: 'Knowledge',
    description:
      'Personal and team knowledge bases, Markdown, freshness, ownership and agent-readable context.',
  },
  {
    id: 'product-discovery',
    name: 'Product discovery',
    short: 'Discovery',
    description:
      'Evidence over assumptions: research, interviews, opportunity mapping and prioritization.',
  },
  {
    id: 'ux-prototyping',
    name: 'UX and prototyping',
    short: 'Prototyping',
    description: 'Design taste, interactive prototypes, comparing alternatives, accessibility.',
  },
  {
    id: 'technical-collaboration',
    name: 'Technical collaboration',
    short: 'Tech collab',
    description:
      'Git, GitHub, pull requests, APIs, specs and acceptance criteria engineers can build from.',
  },
  {
    id: 'coding-agents',
    name: 'Coding agents',
    short: 'Coding agents',
    description:
      'Specifying, delegating, reviewing and verifying work done by Claude Code and similar agents.',
  },
  {
    id: 'agentic-systems',
    name: 'Skills and automation',
    short: 'Skills',
    description:
      'Skills, connectors, scheduled work, permissions and human approval in agent workflows.',
  },
  {
    id: 'evals-safety',
    name: 'Evaluations and safety',
    short: 'Evals',
    description: 'Evaluation suites, prompt injection, unsupported claims, audit trails and risk.',
  },
  {
    id: 'ai-leadership',
    name: 'AI-native product leadership',
    short: 'Leadership',
    description:
      'Team workflows, adoption, governance and making product bets in an AI-native org.',
  },
]

export const competencyById = Object.fromEntries(competencies.map((c) => [c.id, c])) as Record<
  CompetencyId,
  Competency
>

export const competencyIds = competencies.map((c) => c.id)
