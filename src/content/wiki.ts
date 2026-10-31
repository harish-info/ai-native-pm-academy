import type { ChecklistItem, LevelId } from './types'

// The personal wiki is a thread through the whole course, not a single level. It starts in Level 1
// as a plain `learning/` folder, becomes an agent-maintained second brain in Level 2 (the LLM wiki
// pattern: raw sources, agent-written pages, AGENTS.md as the schema), and keeps growing as the
// research log, builder's notebook and leadership kit in Levels 3 to 5.

export const WIKI_CHECKLIST_ITEM: ChecklistItem = {
  id: 'wiki-filed',
  text: 'Filed this session in your wiki: sources in 00-inbox/, pages created or updated, one line in log.md',
}

export const WIKI_PROJECT_DELIVERABLE: ChecklistItem = {
  id: 'wiki-milestone',
  text: 'Wiki milestone reached for this level (see the Wiki page), with every new page linked from index.md',
}

export interface WikiStep {
  /** What to capture from this session. */
  capture: string
  /** Suggested pages to create or update. Paths are relative to the second-brain root. */
  pages: string[]
}

export const wikiSteps: Record<string, WikiStep> = {
  s1: {
    capture:
      'Start the wiki today, by hand. Explain tokens, context windows and variation in your own words, with one example that surprised you.',
    pages: ['log.md', 'learning/how-llms-work.md', 'learning/long-context-degrades-answers.md'],
  },
  s2: {
    capture:
      'One page per source you checked, with what it claims, how you verified it and whether you would trust it again.',
    pages: ['reading/<source-name>.md', 'learning/verification-checklist.md'],
  },
  s3: {
    capture:
      'Give every page the same template and link it from the index. Orphan pages are invisible to you and to agents.',
    pages: ['learning/index.md', 'learning/_template.md', 'learning/open-questions.md'],
  },
  s4: {
    capture:
      'Your first weekly reflection, plus the prompt that produced it, so next week is one paste away.',
    pages: ['reflections/weekly/<year>-W<week>.md', 'templates/weekly-review-prompt.md'],
  },
  s5: {
    capture:
      'Move everything from learning/ into the new second brain. From here on an agent helps maintain it and you review every write: a mode that asks before edits, a plan first, and git diff before you commit.',
    pages: ['AGENTS.md', 'index.md', 'log.md', '00-inbox/'],
  },
  s6: {
    capture:
      'Run your first real ingest: drop at least ten sources into 00-inbox/ and let the agent file them. Check one quote per page against its source.',
    pages: ['reading/<source-name>.md', 'index.md', '00-inbox/ingested/'],
  },
  s7: {
    capture:
      'Record decisions with the reason and the alternative you rejected. Contradictions get marked superseded, never deleted.',
    pages: [
      'AGENTS.md',
      'decisions/<date>-<decision>.md',
      'goals/2027-return-to-work.md',
      '.agents/skills/ingest/SKILL.md',
    ],
  },
  s8: {
    capture:
      'First lint pass: stale claims, contradictions, orphans and missing sources. Run the weekly review through its skill.',
    pages: ['.agents/skills/lint/SKILL.md', 'projects/<name>/HANDOFF.md', 'reflections/weekly/'],
  },
  s9: {
    capture:
      'The wiki becomes the {{name}} research log. One page per competitor or source, each claim with a link and the date you read it.',
    pages: [
      'projects/{{slug}}/README.md',
      'projects/{{slug}}/research/competitors/<name>.md',
      'projects/{{slug}}/sources.md',
    ],
  },
  s10: {
    capture:
      'Pseudonymized conversation notes (P1, P2, no employers, personal details or identifying stories), then the synthesis and tree that cite them.',
    pages: [
      'projects/{{slug}}/discovery/conversation-<n>.md',
      'projects/{{slug}}/opportunity-tree.md',
    ],
  },
  s11: {
    capture:
      'Your design principles, the reference mockup critique and the concept you chose, as a decision with the losing options kept.',
    pages: [
      'projects/{{slug}}/design-principles.md',
      'projects/{{slug}}/design/critique.md',
      'decisions/<date>-concept-direction.md',
    ],
  },
  s12: {
    capture:
      'Link the PRD rather than copying it, and record what you cut from v1 and why. The cut list is the most valuable page you will write.',
    pages: [
      'projects/{{slug}}/prd.md',
      'decisions/<date>-v1-scope.md',
      'learning/acceptance-criteria.md',
    ],
  },
  s13: {
    capture:
      'A Git and GitHub glossary in your own words, written after you did each thing once, not before.',
    pages: ['learning/git-and-pull-requests.md'],
  },
  s14: {
    capture:
      'Your coding-agent loop as a playbook: plan, approve, small diff, test, review, merge. Add one thing the agent got wrong and how you caught it.',
    pages: ['learning/coding-agent-loop.md', 'learning/agent-mistakes.md'],
  },
  s15: {
    capture:
      'How you hand work between sessions and agents. Project state lives in the repo; your lessons about handoffs live in the wiki.',
    pages: ['learning/handoffs.md', 'projects/{{slug}}/README.md (link to the repo HANDOFF.md)'],
  },
  s16: {
    capture:
      'Your review checklist and a short postmortem of the bug you fixed: symptom, cause, the test that now guards it.',
    pages: ['learning/review-checklist.md', 'learning/postmortems/<date>-<bug>.md'],
  },
  s17: {
    capture:
      'Agent design patterns you can explain to an engineer: workflow versus agent, tool contracts, least privilege, approval states.',
    pages: ['learning/agent-patterns.md', 'projects/{{slug}}/agent/architecture-notes.md'],
  },
  s18: {
    capture:
      'What structured output and deterministic tools bought you, with one example where the model would have got the number wrong.',
    pages: ['learning/structured-output.md', 'projects/{{slug}}/agent/build-log.md'],
  },
  s19: {
    capture:
      'Evals and safety: your best eval cases, every injection that got through and the fix, and one page per regulation you read.',
    pages: [
      'learning/evals.md',
      'learning/prompt-injection.md',
      'reading/eu-ai-act.md',
      'reading/fca-ai-update.md',
    ],
  },
  s20: {
    capture:
      'Your AI-native team playbook and a return-to-work page that links the ten best pages in the wiki. This is the kit you take back in February.',
    pages: [
      'learning/ai-native-team-playbook.md',
      'goals/return-to-work-kit.md',
      'reflections/course-retro.md',
    ],
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
    name: 'Seed',
    summary:
      'A plain learning folder you maintain by hand, so you feel why structure matters before an agent helps.',
    checks: [
      'learning/index.md links every page',
      'At least eight concept or source pages in your own words',
      'One weekly reflection and a log.md with a line per session',
    ],
  },
  {
    levelId: 2,
    name: 'Second brain',
    summary:
      'The LLM wiki pattern: raw sources in, agent-maintained pages out, AGENTS.md as the schema, you reviewing every write.',
    checks: [
      'AGENTS.md with explicit "when X, do Y" rules',
      'Ingest, lint and weekly-review skills that work',
      'Passes the fresh-agent test: a new session can answer three questions from it, with quotes',
    ],
  },
  {
    levelId: 3,
    name: 'Research log',
    summary: 'Every {{name}} claim traces to a source, a conversation or a decision record.',
    checks: [
      'A page per competitor and source, dated',
      'Pseudonymized conversation notes and a synthesis that cites them',
      'Decision records for concept direction and v1 scope',
    ],
  },
  {
    levelId: 4,
    name: "Builder's notebook",
    summary: 'What you learned shipping software with agents, written so you can teach it.',
    checks: [
      'Git, agent loop, handoff and review playbook pages',
      'At least one postmortem',
      'Project pages link to the repository instead of duplicating it',
    ],
  },
  {
    levelId: 5,
    name: 'Leadership kit',
    summary:
      'Agent, eval, safety and regulation pages plus a team playbook: the asset you take back to work.',
    checks: [
      'Agent patterns, evals and prompt-injection pages with your own examples',
      'One page per regulation you read, with the source link',
      'A return-to-work page linking your ten best pages',
    ],
  },
]

export const wikiPrompts = {
  ingest: `Read AGENTS.md first. Then process every file in 00-inbox/:
1. For each source, propose which existing page to update or which new page to create, following the page template.
2. Show me the plan and wait for my approval before writing anything.
3. After approval, write the changes, quote the exact source sentence behind every new claim, move processed files to 00-inbox/ingested/, and add one line per change to log.md.
4. If a new claim contradicts an existing page, mark the old claim as superseded with a link. Never delete it silently.`,
  query: `Answer from this wiki only. Read index.md, then the pages you need. For every statement, cite the page path and quote the line it comes from. If the wiki does not contain the answer, say so and suggest which source I should ingest.`,
  lint: `Read AGENTS.md and index.md, then check the whole wiki and report, without changing anything:
- pages not linked from index.md
- claims without a source
- contradictions between pages
- pages not updated in 30 days that describe fast-moving tools
- templates or skills mixed in with notes
Group findings by severity and propose fixes I can approve one by one.`,
}

export const wikiRules = [
  'Private by default. The wiki never goes into a public repository; your {{name}} code does, the wiki does not.',
  "No employer or customer data in your personal wiki. When you are back at work, keep a separate work wiki under your employer's rules.",
  'Sources first: raw material goes into 00-inbox/ unchanged, pages are written from it, and every claim keeps its link.',
  'You review every agent write: plan first, then read git diff before you commit. An instruction to wait is not a lock; the diff is the check.',
  'Ten minutes after each session beats an hour on Sunday. File while it is fresh.',
]
