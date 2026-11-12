import type { ChecklistItem, LevelId } from './types'

export const WIKI_CHECKLIST_ITEM: ChecklistItem = {
  id: 'wiki-filed',
  text: 'Filed this session in your workspace: the artifact saved where the step below says, and one line in log.md',
}

export const WIKI_PROJECT_DELIVERABLE: ChecklistItem = {
  id: 'wiki-milestone',
  text: 'Workspace milestone reached for this level (see Your wiki)',
}

export interface WikiStep {
  capture: string
  pages: string[]
}

export const wikiSteps: Record<string, WikiStep> = {
  s1: {
    capture:
      'Create a private learning-notes/ folder today, by hand. Save your glossary and the model comparison, and start log.md with one line: the date and what you made.',
    pages: [
      'learning-notes/glossary.md',
      'learning-notes/model-comparison.md',
      'learning-notes/log.md',
    ],
  },
  s2: {
    capture:
      'The most important file in the course. Save product-context.md at the top of the folder and keep it short; every later session reads it.',
    pages: ['learning-notes/product-context.md', 'learning-notes/delegation-audit.md'],
  },
  s3: {
    capture:
      'Save the fact sheet with a link and a check date for every claim. Keep the raw pages you checked in a sources/ folder, unchanged.',
    pages: ['learning-notes/fact-sheet.md', 'learning-notes/sources/'],
  },
  s4: {
    capture:
      'Save the link to your live pitch artifact and what you changed after a reader check. Add one line to product-context.md for anything the pitch taught you.',
    pages: ['learning-notes/pitch-notes.md', 'learning-notes/product-context.md'],
  },
  s5: {
    capture:
      'Your notes become workspace/, the folder Claude Code works from. Paths from here on are relative to it. Write a short AGENTS.md that points at product-context.md, put the folder under git, and commit.',
    pages: ['AGENTS.md', 'sources/', 'learning/', 'pitch/', 'research/', 'log.md'],
  },
  s6: {
    capture:
      'REQUIREMENTS.md and HANDOFF.md live in prototype/, its own repository. Note in log.md which decisions the interview forced.',
    pages: ['prototype/REQUIREMENTS.md', 'prototype/HANDOFF.md', 'log.md'],
  },
  s7: {
    capture:
      'Record the live URL (or walkthrough link) and repository URL in AGENTS.md, plus your codebase investigation notes.',
    pages: ['AGENTS.md', 'research/codebase-tour.md', 'log.md'],
  },
  s8: {
    capture:
      'Keep your review checklist and review log with the prototype. You will reuse the checklist on every agent build.',
    pages: ['prototype/docs/review-checklist.md', 'prototype/docs/review-log.md'],
  },
  s9: {
    capture:
      'Strategy and market research go into the workspace with their sources: one brief per research slice, and the raw pages unchanged in sources/market/. Every competitor claim keeps a link and the date you read it.',
    pages: [
      'strategy/strategy-kernel.md',
      'strategy/market-map.md',
      'strategy/brief-<slice>.md',
      'sources/market/',
    ],
  },
  s10: {
    capture:
      "Pseudonymised interview notes (P1 to P5, no names or identifying stories), your hand synthesis next to Claude's, and the opportunity tree that cites them.",
    pages: ['discovery/interview-notes/', 'discovery/synthesis.md', 'discovery/ost.md'],
  },
  s11: {
    capture:
      'Save your metric definitions, the funnel denominator audit, the range estimate and your ranked bets. Record the bet you chose and the ones you dropped, with why.',
    pages: [
      'data/funnel-analysis.md',
      'data/impact-estimate.md',
      'data/prioritised-bets.md',
      'decisions.md',
    ],
  },
  s12: {
    capture:
      'Keep the PRD and its multi-role review notes together, and record what you cut from v1 and why in decisions.md.',
    pages: ['prd/prd.md', 'prd/review-notes.md', 'decisions.md'],
  },
  s13: {
    capture:
      'The screen state and agent-boundary spec, vertical slice plan and align check live in the prototype repository next to the team AGENTS.md.',
    pages: [
      'prototype/docs/design-spec.md',
      'prototype/docs/task-breakdown.md',
      'prototype/docs/align-check.md',
    ],
  },
  s14: {
    capture:
      'Save your failure modes, eval set and category report, including what remained NOT TESTED.',
    pages: ['evals/failure-modes.md', 'evals/eval-set.md', 'evals/eval-report.md'],
  },
  s15: {
    capture:
      'Save the launch plan and the experiment readout. Feed what you learned back into product-context.md and the open questions in prd.md.',
    pages: ['launch/launch-plan.md', 'launch/experiment-readout.md', 'product-context.md'],
  },
  s16: {
    capture:
      'Save your hand-written SCQA and sentence-title outline, the exported deck and the one-page stakeholder update.',
    pages: [
      'presentations/qbr-outline.md',
      'presentations/deck/',
      'presentations/stakeholder-update.md',
    ],
  },
  s17: {
    capture:
      'The workspace becomes your PM OS: raw material moves into immutable sources/, Claude writes wiki/ pages that cite it, and your hand-written AGENTS.md holds the rules.',
    pages: ['sources/', 'wiki/index.md', 'wiki/log.md', 'AGENTS.md'],
  },
  s18: {
    capture:
      'Upgrade the same wiki for a shared team: add CONTRIBUTING.md, ingest a scrubbed meeting note on a review branch, draft the stakeholder update from it, and score your 10-question kb-trust-check.md.',
    pages: ['CONTRIBUTING.md', 'wiki/kb-health.md', 'kb-trust-check.md'],
  },
  s19: {
    capture:
      'Save the one skill you hand-wrote under skills/, your three-case test results in skill-checks.md, and the first bounded weekly briefing draft.',
    pages: ['skills/', 'skill-checks.md', 'wiki/log.md'],
  },
  s20: {
    capture:
      'Save team-playbook.md written in your own voice around a real queue wait, plus wiki/return-to-work.md linking the ten pages and habits you are taking back to work.',
    pages: ['team-playbook.md', 'wiki/return-to-work.md'],
  },
}

export interface WikiMilestone {
  levelId: LevelId
  name: string
  summary: string
  checks: string[]
}

export const wikiMilestones: WikiMilestone[] = [
  {
    levelId: 1,
    name: 'Context file',
    summary:
      'One private notes folder with product-context.md at the top, so every AI conversation starts from your actual rules.',
    checks: [
      'product-context.md covers the product, users, glossary, constraints, open decisions and sources',
      'fact-sheet.md has a link and a check date for every claim',
      'log.md has one line per session',
    ],
  },
  {
    levelId: 2,
    name: 'Agent workspace',
    summary:
      'Claude Code works from your folder: AGENTS.md points at the context, and git records every change.',
    checks: [
      'AGENTS.md is written in your words and points at product-context.md instead of repeating it',
      'The workspace is a private git repository with clean commits',
      'A fresh Claude Code session explains your product and prototype from the files alone',
    ],
  },
  {
    levelId: 3,
    name: 'Decision trail',
    summary:
      'Every claim about your product traces to a saved source, an interview note or a recorded decision.',
    checks: [
      'Market research briefs cite pages saved unchanged in sources/market/, with links and dates',
      'The synthesis compares your hand themes with Claude’s and cites pseudonymised notes',
      'decisions.md records what you chose, what you dropped and why; the PRD flags gaps as open questions',
    ],
  },
  {
    levelId: 4,
    name: 'Delivery record',
    summary:
      'From state spec to executive deck, the evidence a team lead would ask for, linked from one place.',
    checks: [
      'State and tool-permission spec, slice breakdown and align check saved',
      'Eval report (with NOT TESTED boundaries) and experiment readout saved with their data',
      'The SCQA outline and stakeholder update match every figure in the readout',
    ],
  },
  {
    levelId: 5,
    name: 'PM OS',
    summary:
      'An agent-maintained wiki upgraded for team sharing, tested with a blind trust check and a hand-written skill.',
    checks: [
      'wiki/index.md links every page, and every page has updated: and sources: frontmatter',
      'A blind 10-question trust check passes with verified citations and honest "Not in the wiki" refusals',
      'One hand-written skill passes normal, conflicting and hostile diff checks in a disconnected copy',
    ],
  },
]

export const wikiPrompts = {
  ingest: `Read AGENTS.md first. Then process every file in sources/ that wiki/log.md does not mention yet:
1. Update the wiki pages each source speaks to, or create a page from the template. Change only what the source supports.
2. Add the source path to each changed page's sources: list and set its updated: date.
3. Never edit files in sources/. If a source contradicts a page, keep both claims, mark the conflict on the page and list it for me.
4. Add new pages to wiki/index.md and one line per change to wiki/log.md.
5. Finish with a list of every page you touched, so I can read the diff before I commit.`,
  query: `Answer from wiki/ only. Read wiki/index.md, then the pages you need. Cite the page path and source path for every statement. If the wiki does not contain the answer, say so plainly and suggest which source I should add.`,
  lint: `Read AGENTS.md and wiki/index.md, then check the wiki and report, without changing anything:
- pages not linked from index.md, and links to pages that do not exist
- claims without a source, and pages missing updated: or sources:
- contradictions between pages, or between a page and a newer source
- pages not updated in 30 days that describe open decisions or fast-moving tools
- direct names or indirect identifiers of real people, or confidential data
Group findings by severity and propose fixes I can approve one by one.`,
}

export const wikiRules = [
  'Private by default. The workspace never goes into a public repository; your throwaway prototype can, the workspace does not.',
  "No employer or customer data in your personal workspace. Back at work, keep team knowledge inside your employer's approved repository and access rules.",
  'Sources first: raw material is saved unchanged, pages that summarise it cite it, and nothing is claimed without a source.',
  'Git is your safety net. Commit before an ingest or skill run and inspect git diff before keeping any agent edit.',
  'Five minutes of filing at the end of a session beats an hour of archaeology next month.',
]
