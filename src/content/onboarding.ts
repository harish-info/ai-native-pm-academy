import type { CompetencyId, LevelId } from './types'

export type ProfileQuestion =
  | { id: string; kind: 'text'; label: string; help?: string; optional?: boolean }
  | {
      id: string
      kind: 'single' | 'multi'
      label: string
      help?: string
      options: { id: string; label: string }[]
    }

export const profileQuestions: ProfileQuestion[] = [
  {
    id: 'name',
    kind: 'text',
    label: 'What should the academy call you?',
    help: 'Optional. Stored only in this browser.',
    optional: true,
  },
  {
    id: 'ai-experience',
    kind: 'single',
    label: 'How often do you use AI assistants today?',
    options: [
      { id: 'none', label: 'Rarely or never' },
      { id: 'occasional', label: 'A few times a month' },
      { id: 'weekly', label: 'Most weeks' },
      { id: 'daily', label: 'Daily, for real work' },
    ],
  },
  {
    id: 'tools',
    kind: 'multi',
    label: 'Which tools have you used for more than a quick try?',
    options: [
      { id: 'chatgpt', label: 'ChatGPT' },
      { id: 'claude', label: 'Claude (chat)' },
      { id: 'claude-code', label: 'Claude Code' },
      { id: 'codex', label: 'Codex' },
      { id: 'copilot', label: 'GitHub Copilot' },
      { id: 'antigravity', label: 'Antigravity' },
      { id: 'prototyping', label: 'v0, Lovable or Figma Make' },
    ],
  },
  {
    id: 'github',
    kind: 'single',
    label: 'What is your GitHub experience?',
    options: [
      { id: 'never', label: 'Never used it' },
      { id: 'viewed', label: 'I have looked at repos or PRs' },
      { id: 'web-edits', label: 'I have made edits in the web UI' },
      { id: 'prs', label: 'I have opened and merged pull requests' },
    ],
  },
  {
    id: 'technical-confidence',
    kind: 'single',
    label: 'How confident are you reading technical material (APIs, logs, code diffs)?',
    options: [
      { id: '1', label: 'Not yet' },
      { id: '2', label: 'With help' },
      { id: '3', label: 'Mostly on my own' },
      { id: '4', label: 'Comfortably' },
    ],
  },
  {
    id: 'pm-years',
    kind: 'single',
    label: 'Product management experience',
    options: [
      { id: 'lt3', label: 'Under 3 years' },
      { id: '3-6', label: '3 to 6 years' },
      { id: '6-10', label: '6 to 10 years' },
      { id: '10plus', label: 'More than 10 years' },
    ],
  },
  {
    id: 'practice',
    kind: 'multi',
    label: 'Which of these have you done hands-on in the last two years?',
    options: [
      { id: 'interviews', label: 'Customer interviews' },
      { id: 'design', label: 'Wireframes or prototypes' },
      { id: 'analytics', label: 'Self-serve analytics or SQL' },
      { id: 'delivery', label: 'Writing specs engineers built from' },
      { id: 'experiments', label: 'A/B tests or experiments' },
    ],
  },
  {
    id: 'hours',
    kind: 'single',
    label: 'Realistic study time per week',
    help: 'The course takes about 80 hours including projects, weekly reviews and mentor time. The standard plan needs about 10 hours a week for eight weeks; the light plan about 7 hours a week for twelve. Six hours or less picks the light plan, and you can change it later.',
    options: [
      { id: '4', label: 'About 4 hours' },
      { id: '6', label: 'About 6 hours' },
      { id: '8', label: 'About 8 hours' },
      { id: '12', label: 'About 10 to 12 hours' },
      { id: '14', label: '14 hours or more' },
    ],
  },
  {
    id: 'mentor',
    kind: 'single',
    label: 'Do you have a mentor who can review your work?',
    options: [
      { id: 'yes', label: 'Yes, weekly' },
      { id: 'sometimes', label: 'Sometimes' },
      { id: 'no', label: 'No' },
    ],
  },
  {
    id: 'pace',
    kind: 'single',
    label: 'Preferred pace',
    options: [
      { id: 'light', label: 'Light: 2 to 3 sessions a week' },
      { id: 'steady', label: 'Steady: 4 to 5 sessions a week' },
      { id: 'intensive', label: 'Intensive: a session most days' },
    ],
  },
  {
    id: 'interests',
    kind: 'multi',
    label: 'What are you most curious about?',
    options: [
      { id: 'knowledge', label: 'Context and knowledge bases' },
      { id: 'discovery', label: 'AI-native discovery' },
      { id: 'prototyping', label: 'Prototyping' },
      { id: 'coding-agents', label: 'Working with coding agents' },
      { id: 'agents', label: 'Skills and automation' },
      { id: 'leadership', label: 'Leading AI-native teams' },
    ],
  },
]

export interface DiagnosticQuestion {
  id: string
  /** The level whose sessions teach this. Each level has three questions. */
  level: LevelId
  competency: CompetencyId
  scenario: string
  options: { id: string; text: string }[]
  correct: string
  explanation: string
}

const notSure = { id: 'unsure', text: 'Not sure yet' }

// Ids d1 to d14 belonged to an earlier set of questions and are retired. Saved answers are keyed
// by id, so never reuse an id for a different question: give a rewritten question a new one.
export const diagnosticQuestions: DiagnosticQuestion[] = [
  {
    id: 'd15',
    level: 1,
    competency: 'prompting-context',
    scenario:
      'You ask an assistant how your product should handle refunds. The answer is generic and could apply to any company. What is the most likely cause?',
    options: [
      {
        id: 'a',
        text: 'It has never seen your refund rules, so it fell back on general patterns.',
      },
      {
        id: 'b',
        text: 'The effort setting is too low, so it did not reason about the question.',
      },
      {
        id: 'c',
        text: 'The model is too small for policy questions; a larger model would know this.',
      },
      {
        id: 'd',
        text: 'The prompt gave it no role, such as a senior payments product manager.',
      },
      notSure,
    ],
    correct: 'a',
    explanation:
      'Session 2: a generic answer usually means missing context. More effort, a bigger model or a role phrase cannot supply facts the model was never given.',
  },
  {
    id: 'd16',
    level: 1,
    competency: 'ai-fundamentals',
    scenario:
      'Two hours into one chat, the assistant starts contradicting decisions you agreed with it earlier. What is the best next step?',
    options: [
      {
        id: 'a',
        text: 'Restate the decisions in the chat and ask it to confirm them before going on.',
      },
      {
        id: 'b',
        text: 'Move to a model with a larger context window and carry on in the same chat.',
      },
      {
        id: 'c',
        text: 'Start a fresh chat with a short summary of the decisions and the key files.',
      },
      {
        id: 'd',
        text: 'Turn on the memory feature so that it keeps the decisions from now on.',
      },
      notSure,
    ],
    correct: 'c',
    explanation:
      'Session 1: as a chat fills up, answers get less precise and earlier material competes with what you want. A bigger window does not fix that; a fresh, short context does.',
  },
  {
    id: 'd17',
    level: 1,
    competency: 'ai-fundamentals',
    scenario:
      'A web-search answer about your market cites five sources. Before you put one of its figures in a leadership update, what matters most?',
    options: [
      {
        id: 'a',
        text: 'Ask a second assistant the same question and keep the figures both agree on.',
      },
      {
        id: 'b',
        text: 'Open the source and check it says that figure, is recent and fits your market.',
      },
      {
        id: 'c',
        text: 'Check that every cited link opens, which shows the sources are real.',
      },
      {
        id: 'd',
        text: 'Ask the assistant to rate its confidence in each figure and keep the high ones.',
      },
      notSure,
    ],
    correct: 'b',
    explanation:
      'Session 3: a source can exist and still not say what is claimed, be out of date or cover another market. Agreement between tools shows where to look, not what is true.',
  },
  {
    id: 'd18',
    level: 2,
    competency: 'coding-agents',
    scenario:
      'Every new Claude Code session in your workspace starts without knowing what your product is. What is the most reliable fix?',
    options: [
      {
        id: 'a',
        text: 'Paste your product summary into the first message of every new session.',
      },
      {
        id: 'b',
        text: 'Tell Claude about the product once, so its auto memory keeps it from then on.',
      },
      {
        id: 'c',
        text: 'Save the product summary as a skill, so Claude loads it when a task needs it.',
      },
      {
        id: 'd',
        text: 'Reference the product summary from CLAUDE.md, which every session loads.',
      },
      notSure,
    ],
    correct: 'd',
    explanation:
      'Session 5: CLAUDE.md loads at the start of every session in that folder and can pull in your context file. Auto memory is notes Claude keeps for itself; skills are procedures.',
  },
  {
    id: 'd19',
    level: 2,
    competency: 'coding-agents',
    scenario:
      'You want a coding agent to build a clickable prototype from a one-line idea. What gives the best first version?',
    options: [
      {
        id: 'a',
        text: 'Let it question you until the requirements are clear, save them, then build.',
      },
      {
        id: 'b',
        text: 'Write a full PRD first, so that the agent has every requirement before it starts.',
      },
      {
        id: 'c',
        text: 'Ask for a detailed build plan and approve each step before it writes any code.',
      },
      {
        id: 'd',
        text: 'Give it the one-line idea, then steer whatever it builds one change at a time.',
      },
      notSure,
    ],
    correct: 'a',
    explanation:
      'Session 6: an agent interview pulls out what you know but never wrote down, in about the length of a short requirements file. A full PRD comes later, in Session 12.',
  },
  {
    id: 'd20',
    level: 2,
    competency: 'technical-collaboration',
    scenario:
      'Claude Code finished a change and opened a pull request. The automated checks pass. What is the most useful review before you merge it?',
    options: [
      {
        id: 'a',
        text: 'Ask the same session to review its work, since it knows what it meant to do.',
      },
      {
        id: 'b',
        text: 'A fresh session reviews it against the requirements; you decide on each comment.',
      },
      {
        id: 'c',
        text: 'None: passing checks mean the change is safe, so the pull request can be merged.',
      },
      {
        id: 'd',
        text: 'Read and understand every line of code yourself before you approve anything.',
      },
      notSure,
    ],
    correct: 'b',
    explanation:
      'Session 8: the session that wrote the code remembers what it meant, not what it wrote. A fresh reviewer finds more, its comments are input, and you record a decision for each.',
  },
  {
    id: 'd21',
    level: 3,
    competency: 'product-discovery',
    scenario:
      'Leadership asks "why this, why now?" about your AI feature idea. Which answer is strongest?',
    options: [
      {
        id: 'a',
        text: 'Three competitors have launched similar AI features in the last six months alone.',
      },
      {
        id: 'b',
        text: 'A working prototype that shows how good the experience could feel.',
      },
      {
        id: 'c',
        text: 'What is hard and the evidence for it, your approach, and what you will not do.',
      },
      {
        id: 'd',
        text: 'A market-size estimate showing the opportunity is big enough to matter.',
      },
      notSure,
    ],
    correct: 'c',
    explanation:
      'Session 9: a strategy kernel names the diagnosis, the guiding policy and coherent actions, including what is ruled out. A prototype is still a guess, and competitor moves are not a reason.',
  },
  {
    id: 'd22',
    level: 3,
    competency: 'product-discovery',
    scenario:
      'An analysis says 40% of users completed your new flow. Before you quote that number, what do you check first?',
    options: [
      {
        id: 'a',
        text: 'What it divides by: every user, or only those who reached the step before.',
      },
      {
        id: 'b',
        text: 'Whether 40% beats the published industry benchmark for flows of this kind.',
      },
      {
        id: 'c',
        text: 'Whether the rate has gone up or down over the last four weeks.',
      },
      {
        id: 'd',
        text: 'Whether the sample of users is big enough for the result to be significant.',
      },
      notSure,
    ],
    correct: 'a',
    explanation:
      'Session 11: most analysis mistakes are definition mistakes. A rate with the wrong denominator looks just as convincing as the right one.',
  },
  {
    id: 'd23',
    level: 3,
    competency: 'technical-collaboration',
    scenario:
      'Claude is drafting your PRD. Nobody has decided what a screen shows when a record has no data. What should the draft say?',
    options: [
      {
        id: 'a',
        text: 'The pattern most similar products use, so that engineering is not blocked.',
      },
      {
        id: 'b',
        text: 'Nothing yet: empty states belong in the design spec, not in the PRD.',
      },
      {
        id: 'c',
        text: 'Nothing: the engineer will meet the case while building and can choose.',
      },
      {
        id: 'd',
        text: 'That it is undecided, as an open question with who will decide it.',
      },
      notSure,
    ],
    correct: 'd',
    explanation:
      'Session 12: no invention. A gap becomes an open question with an owner, not a plausible guess an engineer or agent will build as if it were decided.',
  },
  {
    id: 'd24',
    level: 4,
    competency: 'ux-prototyping',
    scenario:
      'Your design spec covers the main screen in detail. What is most often missing, and causes bugs later?',
    options: [
      {
        id: 'a',
        text: 'Exact pixel values for spacing and type, so engineers do not guess.',
      },
      {
        id: 'b',
        text: 'Empty, loading, error and partial-data states, with the words for each.',
      },
      {
        id: 'c',
        text: 'The reasoning behind each design choice, linked to the research.',
      },
      {
        id: 'd',
        text: 'The animations and transitions that connect one screen to the next.',
      },
      notSure,
    ],
    correct: 'b',
    explanation:
      'Session 13: most reviews look at the happy path and most bugs live in the other states. The spec describes intent in words and leaves pixels to the design file.',
  },
  {
    id: 'd25',
    level: 4,
    competency: 'evals-safety',
    scenario:
      'Your AI assistant passes 96% of its test cases. One failure is a prompt injection that made it send data to an outside address. What do you do?',
    options: [
      {
        id: 'a',
        text: 'Ship it: 96% is well above the bar you set, and the failing case is a rare one.',
      },
      {
        id: 'b',
        text: 'Ship after adding a prompt rule that it must never send data outside.',
      },
      {
        id: 'c',
        text: 'Block the release: one followed injection blocks it, whatever the pass rate.',
      },
      {
        id: 'd',
        text: 'Ship to a small group first and watch whether it happens in real use.',
      },
      notSure,
    ],
    correct: 'c',
    explanation:
      'Session 14: release rules are set per category, and one unauthorised action or followed injection blocks the release. A prompt rule is a request the model will sometimes ignore; the fix is a limit in code.',
  },
  {
    id: 'd26',
    level: 4,
    competency: 'product-discovery',
    scenario:
      'Two days into an A/B test of your feature, the success metric is up 8% and already looks significant. What do you do?',
    options: [
      {
        id: 'a',
        text: 'Ship now: a significant result this early is a strong signal.',
      },
      {
        id: 'b',
        text: 'Look at which segments drove the gain, then ship to those users.',
      },
      {
        id: 'c',
        text: 'Stop the test and write the readout, so the next test can start.',
      },
      {
        id: 'd',
        text: 'Wait for the sample size and minimum days you set before launch.',
      },
      notSure,
    ],
    correct: 'd',
    explanation:
      'Session 15: checking daily and stopping when it looks good often wins by luck. Decide the sample and the rule in advance and wait; segments found afterwards are hypotheses. Guardrails are the exception: stop at once if one breaks.',
  },
  {
    id: 'd27',
    level: 5,
    competency: 'knowledge-management',
    scenario:
      'Your team knowledge base keeps quoting a pricing rule that changed last month. A teammate suggests editing the wiki page. What is the better fix?',
    options: [
      {
        id: 'a',
        text: 'Edit the wiki page directly, since that is the fastest way to fix it.',
      },
      {
        id: 'b',
        text: 'Share the new decision as a source; the page is updated and reviewed.',
      },
      {
        id: 'c',
        text: 'Delete the old source that mentions the rule, so it cannot be found.',
      },
      {
        id: 'd',
        text: 'Add the new rule to the agent instructions so it always applies it.',
      },
      notSure,
    ],
    correct: 'b',
    explanation:
      'Session 18: nobody edits a wiki page to record news. The decision arrives as a new source, the agent updates the pages it affects and flags the old claim, and a teammate reviews. Sources are never edited or deleted to change the record.',
  },
  {
    id: 'd28',
    level: 5,
    competency: 'agentic-systems',
    scenario:
      'A scheduled skill reads a public feedback channel, can read your private roadmap and can post messages to chat. What is the safest change?',
    options: [
      {
        id: 'a',
        text: 'Take away one of the three: private data, untrusted content or posting.',
      },
      {
        id: 'b',
        text: 'Add a line to the skill telling it to ignore any instructions found in messages.',
      },
      {
        id: 'c',
        text: 'Run it on a more capable model that resists injected instructions.',
      },
      {
        id: 'd',
        text: 'Keep it, but check what it posted each week for anything unusual.',
      },
      notSure,
    ],
    correct: 'a',
    explanation:
      'Session 19: private data, untrusted content and a way to send data out together make the lethal trifecta. Wording and stronger models help a little; removing one leg is what limits the damage.',
  },
  {
    id: 'd29',
    level: 5,
    competency: 'ai-leadership',
    scenario:
      'Your product team wants to start working with agents across its work. What is the best first step?',
    options: [
      {
        id: 'a',
        text: 'Give everyone the same agent setup, so results compare across the team.',
      },
      {
        id: 'b',
        text: 'Track how much code and how many documents agents produce each week.',
      },
      {
        id: 'c',
        text: 'Find where work waits, then pilot one change there with a baseline.',
      },
      {
        id: 'd',
        text: 'Let agents approve low-risk pull requests, so reviews stop piling up.',
      },
      notSure,
    ],
    correct: 'c',
    explanation:
      'Session 20: look at where recent work actually sat still, then pilot one change with an owner, a baseline and a stop rule. Output volume is not value, and lighter review needs evidence first.',
  },
]
