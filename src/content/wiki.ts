import type { ChecklistItem, LevelId } from './types'

export const WIKI_CHECKLIST_ITEM: ChecklistItem = {
  id: 'wiki-filed',
  text: 'Filed this session in workspace/: the artifact saved where the step below says, and one line in log.md',
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
      'Create one private workspace/ folder today, by hand. Every session in the course uses this same folder. Save your personal notes and model comparison in notes/, and start log.md with one line: the date and what you made.',
    pages: ['notes/glossary.md', 'notes/model-comparison.md', 'log.md'],
  },
  s2: {
    capture:
      'The anchor file for the course. Save product-context.md at the top of workspace/ and keep it concise; every later session and agent reads it.',
    pages: ['product-context.md', 'notes/delegation-audit.md'],
  },
  s3: {
    capture:
      'Save notes/fact-sheet.md with a link and a check date for every claim, and keep the raw pages you checked unedited inside sources/.',
    pages: ['notes/fact-sheet.md', 'sources/'],
  },
  s4: {
    capture:
      'Save the link to your pitch artifact and what you changed after a reader check in notes/pitch-notes.md. Update product-context.md with any wording boundary the check surfaced.',
    pages: ['notes/pitch-notes.md', 'product-context.md'],
  },
  s5: {
    capture:
      'Initialise git inside the same workspace/ folder you started in Session 1. Hand-write a short AGENTS.md that points at product-context.md, add .gitignore, and make your first clean commit.',
    pages: ['AGENTS.md', '.gitignore', 'sources/', 'notes/', 'archive/', 'log.md'],
  },
  s6: {
    capture:
      'Save REQUIREMENTS.md, HANDOFF.md and your zero-build static prototype inside prototype/ so every screen state is inspectable in a browser.',
    pages: ['prototype/REQUIREMENTS.md', 'prototype/HANDOFF.md', 'prototype/index.html', 'log.md'],
  },
  s7: {
    capture:
      'Record your prototype repository URL and live GitHub Pages URL in AGENTS.md alongside your codebase tour notes.',
    pages: ['AGENTS.md', 'research/codebase-tour.md', 'log.md'],
  },
  s8: {
    capture:
      'Keep your review checklist and defect log with the prototype. You will reuse that checklist on every agent pull request.',
    pages: ['prototype/docs/review-checklist.md', 'prototype/docs/review-log.md'],
  },
  s9: {
    capture:
      'Save your strategy kernel, market map and research slice briefs in strategy/, with every raw page preserved unedited in sources/market/.',
    pages: [
      'strategy/strategy-kernel.md',
      'strategy/market-map.md',
      'strategy/brief-<slice>.md',
      'sources/market/',
    ],
  },
  s10: {
    capture:
      "Save pseudonymised interview notes (P1 to P5, no real names or identifying details), your hand synthesis next to Claude's pass, and your opportunity tree.",
    pages: ['discovery/interview-notes/', 'discovery/synthesis.md', 'discovery/ost.md'],
  },
  s11: {
    capture:
      'Save your metric definitions, funnel denominator audit, range estimate and ranked bets, and record what you chose and dropped in decisions.md.',
    pages: [
      'data/funnel-analysis.md',
      'data/impact-estimate.md',
      'data/prioritised-bets.md',
      'decisions.md',
    ],
  },
  s12: {
    capture:
      'Keep prd/prd.md and its multi-role review notes together, and log v1 scope cuts and open questions in decisions.md.',
    pages: ['prd/prd.md', 'prd/review-notes.md', 'decisions.md'],
  },
  s13: {
    capture:
      'Save the screen state, latency/cost and tool-permission spec, vertical slice plan and alignment check under prototype/docs/.',
    pages: [
      'prototype/docs/design-spec.md',
      'prototype/docs/task-breakdown.md',
      'prototype/docs/align-check.md',
    ],
  },
  s14: {
    capture:
      'Save your hand-labelled failure modes, eval set and category report, including pass^3 consistency checks and what remained NOT TESTED.',
    pages: ['evals/failure-modes.md', 'evals/eval-set.md', 'evals/eval-report.md'],
  },
  s15: {
    capture:
      'Save the launch plan and experiment readout, then feed what the guardrail check taught you back into product-context.md.',
    pages: ['launch/launch-plan.md', 'launch/experiment-readout.md', 'product-context.md'],
  },
  s16: {
    capture:
      'Save your hand-written SCQA and action-title outline, the exported deck and the one-page stakeholder update.',
    pages: [
      'presentations/qbr-outline.md',
      'presentations/deck/',
      'presentations/stakeholder-update.md',
    ],
  },
  s17: {
    capture:
      'Inside the same workspace/, keep immutable raw artifacts in sources/, let Claude compile cited pages into wiki/, and hold the schema rules in your hand-written AGENTS.md.',
    pages: ['sources/', 'wiki/index.md', 'wiki/log.md', 'AGENTS.md'],
  },
  s18: {
    capture:
      'Upgrade workspace/ for team sharing: add CONTRIBUTING.md, ingest a scrubbed meeting note on a review branch, and score your blind 10-question kb-trust-check.md.',
    pages: ['CONTRIBUTING.md', 'wiki/kb-health.md', 'kb-trust-check.md'],
  },
  s19: {
    capture:
      'Save your hand-written skill under skills/, log your normal, conflicting and hostile diff results in skill-checks.md, and file your bounded weekly briefing.',
    pages: ['skills/', 'skill-checks.md', 'wiki/log.md'],
  },
  s20: {
    capture:
      'Save team-playbook.md written in your own voice around a real queue wait, plus wiki/return-to-work.md linking the habits and pages you are taking back to work.',
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
      'One private workspace/ folder with product-context.md at the top, so every AI conversation starts from your actual rules.',
    checks: [
      'product-context.md covers the product, travellers or users, glossary, constraints, open decisions and sources',
      'notes/fact-sheet.md has a link and a check date for every claim',
      'log.md has one line per session',
    ],
  },
  {
    levelId: 2,
    name: 'Agent workspace',
    summary:
      'Claude Code works from workspace/: AGENTS.md points at product-context.md, and git records every change.',
    checks: [
      'AGENTS.md is written in your words and points at product-context.md instead of repeating it',
      'workspace/ is a private git repository with clean commits, and your static prototype opens cleanly in a browser',
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
      "The synthesis compares your hand themes with Claude's and cites pseudonymised notes",
      'decisions.md records what you chose, what you dropped and why; the PRD flags gaps as open questions',
    ],
  },
  {
    levelId: 4,
    name: 'Delivery record',
    summary:
      'From state spec to executive deck, the evidence a team lead would ask for, linked from one place.',
    checks: [
      'State, latency/cost and tool-permission spec, slice breakdown and align check saved',
      'Eval report (with NOT TESTED boundaries) and experiment readout saved with their data',
      'The SCQA outline and stakeholder update match every figure in the readout',
    ],
  },
  {
    levelId: 5,
    name: 'PM OS',
    summary:
      'An agent-maintained wiki inside workspace/ upgraded for team sharing, tested with a blind trust check and a hand-written skill.',
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
  'Private by default. workspace/ never goes into a public repository; your standalone static prototype can, workspace/ does not.',
  "No employer or customer data in your personal workspace. Back at work, keep team knowledge inside your employer's approved repository and access rules.",
  'Sources first: raw material is saved unchanged in sources/, pages that summarise it cite it, and nothing is claimed without a source.',
  'Git is your safety net. Commit before an ingest or skill run and inspect git diff before keeping any agent edit.',
  'Five minutes of filing at the end of a session beats an hour of archaeology next month.',
]
