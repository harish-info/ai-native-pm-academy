import type { ChecklistItem, LevelId } from './types'

// The workspace is a thread through the whole course, not a single level. It starts in Level 1
// as one folder with product-context.md at the top, becomes the folder Claude Code works from in
// Level 2, collects the research, decisions and delivery records of Levels 3 and 4, and turns
// into an agent-maintained wiki (the PM OS) in Level 5: sources in, synthesised pages out,
// instructions in AGENTS.md. Session 18 applies the same pattern to a team knowledge base.

export const WIKI_CHECKLIST_ITEM: ChecklistItem = {
  id: 'wiki-filed',
  text: 'Filed this session in your workspace: the artifact saved where the step below says, and one line in log.md',
}

export const WIKI_PROJECT_DELIVERABLE: ChecklistItem = {
  id: 'wiki-milestone',
  text: 'Workspace milestone reached for this level (see the PM OS page)',
}

export interface WikiStep {
  /** What to capture from this session. */
  capture: string
  /** Suggested files to create or update. Paths are relative to the workspace root. */
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
      'Save the link to your live pitch page and what you changed between versions. Add one line to product-context.md for anything the pitch taught you.',
    pages: ['learning-notes/pitch-notes.md', 'learning-notes/product-context.md'],
  },
  s5: {
    capture:
      'Your notes become workspace/, the folder Claude Code works from. Paths from here on are relative to it. Add a short AGENTS.md that points at product-context.md, put the folder under git, and commit.',
    pages: ['AGENTS.md', 'learning/', 'pitch/', 'research/', 'log.md'],
  },
  s6: {
    capture:
      'REQUIREMENTS.md and the handoff note live in prototype/, its own repository. Note in log.md which decisions the interview forced.',
    pages: ['prototype/REQUIREMENTS.md', 'log.md'],
  },
  s7: {
    capture:
      'Record the live URL and the repository link in AGENTS.md. The code lives in GitHub; the workspace links to it instead of copying it.',
    pages: ['AGENTS.md', 'log.md'],
  },
  s8: {
    capture:
      'Keep the review checklist and review log with the prototype. You will reuse the checklist on every agent build.',
    pages: ['prototype/docs/review-checklist.md', 'prototype/docs/review-log.md'],
  },
  s9: {
    capture:
      'Strategy and market research go into the workspace with their sources. Every competitor claim keeps a link and the date you read it.',
    pages: ['strategy/strategy-kernel.md', 'strategy/market-map.md', 'sources/market/'],
  },
  s10: {
    capture:
      "Pseudonymised interview notes (P1, P2, no names or identifying stories), your synthesis next to Claude's, and the opportunity tree that cites them.",
    pages: ['discovery/interview-notes/', 'discovery/synthesis.md', 'discovery/ost.md'],
  },
  s11: {
    capture:
      'Save the analysis, the estimate with its assumptions and the ranked bets. Record the bet you chose and the ones you dropped, with why.',
    pages: [
      'data/funnel-analysis.md',
      'data/impact-estimate.md',
      'data/prioritised-bets.md',
      'decisions.md',
    ],
  },
  s12: {
    capture:
      'Keep the PRD and its review notes together, and record what you cut from v1 and why in decisions.md. Its open questions are the most honest page you will write.',
    pages: ['prd/prd.md', 'prd/review-notes.md', 'decisions.md'],
  },
  s13: {
    capture:
      'The design spec, task breakdown and align check live in the prototype repository next to the team AGENTS.md. Link them from log.md rather than copying them.',
    pages: [
      'prototype/docs/design-spec.md',
      'prototype/docs/task-breakdown.md',
      'prototype/docs/align-check.md',
    ],
  },
  s14: {
    capture:
      'Save the eval set and the report. Note every failure that would block a release and the guardrail that now covers it.',
    pages: ['eval-set.md', 'eval-report.md'],
  },
  s15: {
    capture:
      'Save the launch plan and the readout. Feed what you learned back into product-context.md and the open questions in prd.md.',
    pages: ['launch-plan.md', 'experiment-readout.md', 'product-context.md'],
  },
  s16: {
    capture:
      'Save the deck outline, the exported deck and the stakeholder update. The outline is the reusable part; the slides are an output.',
    pages: ['qbr-outline.md', 'deck/', 'stakeholder-update.md'],
  },
  s17: {
    capture:
      'The workspace becomes your PM OS: raw material moves into sources/, Claude writes wiki/ pages that cite it, and AGENTS.md holds the rules.',
    pages: ['sources/', 'wiki/index.md', 'wiki/log.md', 'AGENTS.md'],
  },
  s18: {
    capture:
      'Save the team knowledge base blueprint and the trust check. Add a wiki page on what you would do differently for a real team.',
    pages: ['team-kb/wiki/index.md', 'team-kb/kb-trust-check.md', 'wiki/team-knowledge-base.md'],
  },
  s19: {
    capture:
      'Save the three skills and their checks. Log what the weekly briefing produced the first time it ran, and what you changed.',
    pages: ['team-kb/skills/', 'team-kb/skill-checks.md', 'wiki/log.md'],
  },
  s20: {
    capture:
      'Your team playbook, plus a return-to-work page in the wiki that links your ten best pages. This is the kit you take back to work.',
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
      'One private notes folder with product-context.md at the top, so every AI conversation about your product starts from what you know.',
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
      'AGENTS.md is short and points at product-context.md instead of repeating it',
      'The workspace is a private git repository with a commit per session',
      'A fresh Claude Code session can explain your product and the prototype from the files alone',
    ],
  },
  {
    levelId: 3,
    name: 'Decision trail',
    summary:
      'Every claim about your product traces to a source, an interview or a recorded decision.',
    checks: [
      'Market research sits in sources/market/ with links and dates',
      'The synthesis cites pseudonymised interview notes',
      'decisions.md records what you chose, what you dropped and why; the PRD flags gaps as open questions',
    ],
  },
  {
    levelId: 4,
    name: 'Delivery record',
    summary:
      'From design spec to deck, the evidence a team lead would ask for, linked from one place.',
    checks: [
      'Design spec, task breakdown and align check saved',
      'Eval report and experiment readout saved with their data',
      'The deck outline and stakeholder update cite the readout',
    ],
  },
  {
    levelId: 5,
    name: 'PM OS',
    summary:
      'An agent-maintained wiki built from the whole quarter, plus a team knowledge base blueprint you could take back to work.',
    checks: [
      'wiki/index.md links every page, and every page has updated: and sources: frontmatter',
      'A lint pass finds no unsourced claims and no orphan pages',
      'A fresh agent answers ten questions from the wiki alone, with citations',
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
  query: `Answer from wiki/ only. Read wiki/index.md, then the pages you need. Cite the page path for every statement. If the wiki does not contain the answer, say so and suggest which source I should add.`,
  lint: `Read AGENTS.md and wiki/index.md, then check the wiki and report, without changing anything:
- pages not linked from index.md, and links to pages that do not exist
- claims without a source, and pages missing updated: or sources:
- contradictions between pages, or between a page and a newer source
- pages not updated in 30 days that describe open decisions or fast-moving tools
- names of real people, or personal or confidential data
Group findings by severity and propose fixes I can approve one by one.`,
}

export const wikiRules = [
  'Private by default. The workspace never goes into a public repository; your product prototype can, the workspace does not.',
  "No employer or customer data in your personal workspace. When you are back at work, build a separate work knowledge base under your employer's rules.",
  'Sources first: raw material is saved unchanged, pages that summarise it cite it, and nothing is claimed without a source.',
  'Git is your safety net. Claude Code acts without asking for most edits, so commit before a big change and read the diff before you keep it.',
  'Ten minutes after each session beats an hour on Sunday. File while it is fresh.',
]
