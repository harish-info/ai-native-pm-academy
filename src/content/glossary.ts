export const glossaryCategories = [
  'Everyday AI slang',
  'Models and context',
  'Agents, tools and protocols',
  'Building, Git and repos',
  'Testing, data and safety',
] as const

export type GlossaryCategory = (typeof glossaryCategories)[number]

export interface GlossaryEntry {
  id: string
  term: string
  category: GlossaryCategory
  meaning: string
  dayToDay: string
  lessons: string[]
  challenges?: string[]
}

export const glossaryEntries: GlossaryEntry[] = [
  {
    id: 'vibe-coding',
    term: 'Vibe coding',
    category: 'Everyday AI slang',
    meaning:
      'Building a working prototype by describing what you want in plain English and judging the result on screen rather than writing or reading every line of code.',
    dayToDay:
      'Use it to put a clickable concept in front of customers by Friday, never as a substitute for engineered production software.',
    lessons: ['s4', 's6'],
  },
  {
    id: 'meat-proxy',
    term: 'Meat proxy',
    category: 'Everyday AI slang',
    meaning:
      'Acting as a human copy-paste relay between two AIs: for example, using AI to inflate three bullet points into a long cover letter or Slack essay that the recruiter or teammate on the other end just feeds into their own AI to summarise back into three bullet points.',
    dayToDay:
      'Skip the theatre: send the clear bullet points or verified decision directly instead of sitting in the middle passing unread AI prose from one bot to another.',
    lessons: ['s2', 's8', 's12'],
  },
  {
    id: 'slop',
    term: 'Slop (workslop)',
    category: 'Everyday AI slang',
    meaning:
      'Polished-sounding AI prose, slides or code that look thorough at a glance yet carry zero real evidence or decisions underneath.',
    dayToDay:
      'Teams spot slop when a six-page PRD uses big strategy words without naming a single customer problem, metric denominator or scope cut.',
    lessons: ['s2', 's8', 's16'],
  },
  {
    id: 'glazing',
    term: 'Glazing (sycophancy)',
    category: 'Everyday AI slang',
    meaning:
      'Everyday slang for when a chatbot flatters your half-baked idea ("Great insight!") and agrees with weak assumptions instead of pushing back.',
    dayToDay:
      'Ask the model to poke holes like a sceptical engineer, otherwise default politeness will cheerlead bad ideas straight into a review meeting.',
    lessons: ['s1', 's9', 's12'],
  },
  {
    id: 'one-shot',
    term: 'One-shot (vs zero-shot and few-shot)',
    category: 'Everyday AI slang',
    meaning:
      'In everyday dev talk, "one-shotting" means getting an AI to nail a whole task on the very first prompt; in prompt design, zero-, one- or few-shot means showing zero, one or a few examples inside the prompt.',
    dayToDay:
      'Do not hunt for a magic one-shot prompt on real PM work: a clear context file plus a short back-and-forth beats a giant fragile prompt.',
    lessons: ['s1', 's6', 's12'],
  },
  {
    id: 'hallucination',
    term: 'Hallucination',
    category: 'Everyday AI slang',
    meaning:
      'When a model states a false statistic, quote, link or sum with total confidence because it predicts plausible words rather than looking up truth.',
    dayToDay:
      'Always open cited links and check numbers against raw tool outputs before putting an AI claim into a deck or spec.',
    lessons: ['s1', 's3', 's14'],
  },
  {
    id: 'ai-wrapper',
    term: 'AI wrapper (thin wrapper)',
    category: 'Everyday AI slang',
    meaning:
      'A product feature that mostly puts a prettier screen around a standard model API call without domain workflow, proprietary data, evals or guardrails.',
    dayToDay:
      'Sanity-check roadmap bets by asking what still makes your feature valuable if the underlying model adds a similar button six months later.',
    lessons: ['s9', 's12'],
  },
  {
    id: 'yolo-mode',
    term: 'YOLO mode (auto-accept)',
    category: 'Everyday AI slang',
    meaning:
      'Running a coding agent with permission prompts switched off so it edits files and runs terminal commands nonstop without asking before each step.',
    dayToDay:
      'Fine inside a disposable prototype folder, dangerous anywhere near customer data, shared repositories or real credentials.',
    lessons: ['s5', 's6', 's19'],
  },
  {
    id: 'grill-me',
    term: 'Grill-me prompt',
    category: 'Everyday AI slang',
    meaning:
      'Asking the agent to interview you one tough question at a time about edge cases and unmade choices before it writes a spec or code.',
    dayToDay:
      'Ten minutes of being grilled catches empty states, permissions and scope cuts you would otherwise discover mid-sprint.',
    lessons: ['s6', 's12'],
  },
  {
    id: 'fresh-session',
    term: 'Fresh session (cold session)',
    category: 'Everyday AI slang',
    meaning:
      'Opening a brand-new chat with zero history from the session that wrote a draft so the reviewer reads only what is actually on the page.',
    dayToDay:
      'Run a fresh session to review your PRD, `AGENTS.md` or pull request because the original chat remembers what it meant, not what it wrote.',
    lessons: ['s5', 's8', 's12', 's18'],
  },
  {
    id: 'markdown',
    term: 'Markdown (.md)',
    category: 'Building, Git and repos',
    meaning:
      'Plain text with simple human-readable symbols like `#` for headings and `-` for bullet lists, with none of the hidden formatting clutter inside Word or Google Docs.',
    dayToDay:
      'Agents read, write and diff `.md` files faster and with far fewer wasted tokens than rich docs, which is why `product-context.md`, `AGENTS.md` and specs here are all Markdown.',
    lessons: ['s1', 's2', 's5', 's17'],
  },
  {
    id: 'cli-terminal',
    term: 'CLI (terminal / command line)',
    category: 'Building, Git and repos',
    meaning:
      'The text-based app on your laptop where you type short commands like `git status` or `claude` directly inside a project folder.',
    dayToDay:
      'Coding agents live in the terminal because inspecting your local files and running checks directly beats copying snippets in and out of a browser.',
    lessons: ['s5', 's6', 's7'],
  },
  {
    id: 'json',
    term: 'JSON (structured output)',
    category: 'Building, Git and repos',
    meaning:
      'A strict key-and-value text format (`{"left_usd": 85.50}`) that normal software can read reliably without guessing at English sentences.',
    dayToDay:
      'Have tools and classifiers return strict JSON so code renders exact numbers and badges, leaving prose for the human explanation.',
    lessons: ['s12', 's13', 's14'],
  },
  {
    id: 'localhost',
    term: 'Localhost',
    category: 'Building, Git and repos',
    meaning:
      'A private web address on your own laptop that lets you open and click-test a site locally before publishing anything to the internet.',
    dayToDay:
      'Always test empty, loading and error states on your own machine before pushing a branch or sending a preview link to stakeholders.',
    lessons: ['s6', 's7', 's8'],
  },
  {
    id: 'repo',
    term: 'Repository (repo)',
    category: 'Building, Git and repos',
    meaning:
      'A project folder tracked by Git so every file, edit and decision has a complete, reversible history.',
    dayToDay:
      'Keeping specs, prototypes and product wikis in a repo lets humans and coding agents read the exact same source of truth.',
    lessons: ['s5', 's7', 's17'],
  },
  {
    id: 'commit',
    term: 'Commit',
    category: 'Building, Git and repos',
    meaning:
      'A named save-point in Git capturing a coherent set of file changes along with a one-line note on why.',
    dayToDay:
      'Commit before running an agent ingest or refactor so you can undo a bad pass in two seconds.',
    lessons: ['s5', 's6', 's7'],
  },
  {
    id: 'branch',
    term: 'Branch',
    category: 'Building, Git and repos',
    meaning:
      'A safe parallel copy of a repo where you or an agent can make changes without touching the live `main` version until reviewed.',
    dayToDay:
      'Ask agents to put every prototype change or team wiki update on its own branch so nothing lands unreviewed.',
    lessons: ['s7', 's8', 's18'],
  },
  {
    id: 'diff',
    term: 'Diff (`git diff`)',
    category: 'Building, Git and repos',
    meaning:
      'The exact line-by-line red-and-green view showing what an edit removed and what it added.',
    dayToDay:
      'Never trust an agent’s polite summary ("Updated three files cleanly"): read `git diff` to see what actually changed.',
    lessons: ['s5', 's7', 's19'],
  },
  {
    id: 'pull-request',
    term: 'Pull request (PR)',
    category: 'Building, Git and repos',
    meaning:
      'A review page on GitHub proposing to merge a branch into `main`, showing `Files changed`, automated checks and discussion.',
    dayToDay:
      'As a PM, review PRs for scope, edge states, copy accuracy and unrequested file edits rather than code syntax.',
    lessons: ['s7', 's8', 's18'],
  },
  {
    id: 'token',
    term: 'Token',
    category: 'Models and context',
    meaning:
      'A small chunk of text (roughly three-quarters of an English word) that models read, generate and bill by.',
    dayToDay:
      'Long system prompts, pasted transcripts and verbose answers burn tokens on every turn, raising both API cost and response latency.',
    lessons: ['s1', 's13'],
  },
  {
    id: 'context-window',
    term: 'Context window',
    category: 'Models and context',
    meaning:
      'The total working-memory limit of text, files and tool outputs a model can hold in a single conversation at once.',
    dayToDay:
      'Even when a window fits hundreds of pages, stuffing everything in makes the model slower, pricier and more forgetful.',
    lessons: ['s1', 's5'],
  },
  {
    id: 'context-rot',
    term: 'Context rot',
    category: 'Models and context',
    meaning:
      'How an assistant gets sloppier and contradicts earlier agreements as a single chat grows long and cluttered.',
    dayToDay:
      'When an agent starts ignoring rules you set an hour ago, save a short handoff note and start a fresh session instead of arguing.',
    lessons: ['s1', 's6'],
  },
  {
    id: 'context-engineering',
    term: 'Context engineering',
    category: 'Models and context',
    meaning:
      'Designing the whole set of files, rules, retrieved snippets and tool outputs an agent sees, rather than wordsmithing clever prompt phrases.',
    dayToDay:
      'Keeping `product-context.md`, `AGENTS.md` and your source files crisp and current is context engineering in everyday PM work.',
    lessons: ['s2', 's5', 's13', 's17'],
  },
  {
    id: 'frontier-vs-open-weights',
    term: 'Frontier model vs open-weight model',
    category: 'Models and context',
    meaning:
      'Frontier models are the newest hosted flagships from labs like Anthropic, OpenAI or Google; open-weight models publish downloadable weights your company can host itself.',
    dayToDay:
      'Prove product value on a frontier model first, then decide with engineering whether cost, latency or data rules call for smaller or self-hosted models.',
    lessons: ['s1', 's13'],
  },
  {
    id: 'system-prompt',
    term: 'System prompt',
    category: 'Models and context',
    meaning:
      'Hidden standing instructions sent ahead of every user message to set an assistant’s role, tone, tools and boundaries.',
    dayToDay:
      'Treat system prompts as product behaviour rules, not security walls: determined users or hostile text can still nudge around wording.',
    lessons: ['s1', 's13', 's14'],
  },
  {
    id: 'effort-thinking',
    term: 'Reasoning effort (extended thinking)',
    category: 'Models and context',
    meaning:
      'A dial that lets a model spend extra hidden tokens working through hard trade-offs or maths before writing its visible reply.',
    dayToDay:
      'Turn effort high when stress-testing a strategy or auditing funnel math, and keep it low for fast, everyday customer interactions.',
    lessons: ['s1', 's13'],
  },
  {
    id: 'temperature',
    term: 'Temperature and sampling',
    category: 'Models and context',
    meaning:
      'The randomness setting when picking the next token, which is why the exact same prompt can give slightly different wording on two runs.',
    dayToDay:
      'Because outputs vary across runs, you test AI features across multiple trials rather than trusting one lucky demo screenshot.',
    lessons: ['s1', 's14'],
  },
  {
    id: 'prompt-caching',
    term: 'Prompt caching',
    category: 'Models and context',
    meaning:
      'Reusing the unchanged prefix of your instructions and reference docs across calls so you do not pay full price and latency every turn.',
    dayToDay:
      'Ask engineering whether static instructions sit at the top of the prompt so caching cuts unit cost and time-to-first-token.',
    lessons: ['s13'],
  },
  {
    id: 'rag',
    term: 'RAG (retrieval-augmented generation)',
    category: 'Models and context',
    meaning:
      'Searching your own docs, tickets or database for relevant passages first and handing only those snippets to the model to answer from.',
    dayToDay:
      'When a RAG answer is wrong, check first whether search fetched the wrong snippet (retrieval miss) or the model misread a good snippet (generation bug).',
    lessons: ['s3', 's14', 's17'],
    challenges: ['c8'],
  },
  {
    id: 'chunking',
    term: 'Chunking',
    category: 'Models and context',
    meaning:
      'Splitting long documents into bite-sized passages before indexing them so search can pull back the right section.',
    dayToDay:
      'Bad chunking slices a pricing table away from its footnotes, making the assistant quote half a policy with complete confidence.',
    lessons: ['s14', 's17'],
  },
  {
    id: 'grounding',
    term: 'Grounding',
    category: 'Models and context',
    meaning:
      'Tying every factual statement in an AI reply to a specific retrieved document, live tool output or saved URL.',
    dayToDay:
      'In a grounded product drawer, the model explains numbers returned by tested code rather than doing mental arithmetic in prose.',
    lessons: ['s3', 's12', 's14'],
  },
  {
    id: 'agent-vs-chat',
    term: 'Agent (vs chat)',
    category: 'Agents, tools and protocols',
    meaning:
      'A model running in a loop that can inspect files, call tools, read results and take several steps to finish a goal.',
    dayToDay:
      'Chat answers one prompt from what you pasted; an agent like Claude Code reads your repo, edits files and runs checks until the task is done.',
    lessons: ['s1', 's5', 's12'],
  },
  {
    id: 'tool-call',
    term: 'Tool call (function calling)',
    category: 'Agents, tools and protocols',
    meaning:
      'A structured request from the model asking your app to run real code, such as looking up live hours or staging a reservation draft.',
    dayToDay:
      'PMs decide which tools can read data, which only prepare drafts, and which actions stay 100% in deterministic code.',
    lessons: ['s1', 's12', 's13'],
  },
  {
    id: 'deterministic-vs-probabilistic',
    term: 'Deterministic vs probabilistic',
    category: 'Agents, tools and protocols',
    meaning:
      'Deterministic code gives the exact same output for the same input every time; probabilistic models sample likely text and can vary or err.',
    dayToDay:
      'Use deterministic code for budgets, dates, eligibility and permissions, and save AI for messy natural-language input and synthesis.',
    lessons: ['s9', 's12', 's13'],
  },
  {
    id: 'human-in-the-loop',
    term: 'Human-in-the-loop (approval gate)',
    category: 'Agents, tools and protocols',
    meaning:
      'Stopping an agent at a preview card (`awaiting_approval`) so a person explicitly confirms before any real-world action fires.',
    dayToDay:
      'Before an AI books a table, moves money or messages a group, show the exact recipient, cost and terms behind a Confirm button.',
    lessons: ['s12', 's13', 's19'],
  },
  {
    id: 'mcp',
    term: 'MCP (Model Context Protocol)',
    category: 'Agents, tools and protocols',
    meaning:
      'An open standard connector that lets agents read from or act in external tools like GitHub, Figma, Linear or Slack without custom glue code.',
    dayToDay:
      'Treat every MCP server like an OAuth app permission: connect read-only scopes first and audit what actions it exposes.',
    lessons: ['s5', 's18', 's19'],
  },
  {
    id: 'agents-md',
    term: 'AGENTS.md (or CLAUDE.md)',
    category: 'Agents, tools and protocols',
    meaning:
      'A short Markdown rulebook at the root of a folder that coding agents read automatically at the start of every session.',
    dayToDay:
      'Put folder maps, commands, domain red lines and pointers to `product-context.md` here so every session starts aligned.',
    lessons: ['s5', 's13', 's17', 's18'],
  },
  {
    id: 'skill-md',
    term: 'Skill (SKILL.md)',
    category: 'Agents, tools and protocols',
    meaning:
      'A reusable playbook folder with a short trigger description that an agent loads on demand only when a matching task comes up.',
    dayToDay:
      'Package recurring PM chores like filing a meeting note or formatting a weekly readout into a skill instead of bloating `AGENTS.md`.',
    lessons: ['s5', 's16', 's19'],
  },
  {
    id: 'subagent',
    term: 'Subagent (multi-agent)',
    category: 'Agents, tools and protocols',
    meaning:
      'A helper agent spun up with its own clean context window to tackle one narrow slice of work and return a short summary.',
    dayToDay:
      'Start with one well-tooled agent first; add subagents only when parallel research or context isolation beats the extra latency and cost.',
    lessons: ['s9', 's13', 's20'],
    challenges: ['c5'],
  },
  {
    id: 'three-layer-wiki',
    term: 'Three-layer LLM wiki',
    category: 'Agents, tools and protocols',
    meaning:
      'Keeping immutable raw `sources/`, agent-maintained `wiki/` summary pages that cite them, and human-written `AGENTS.md` rules strictly separate.',
    dayToDay:
      'When a product decision changes, drop the dated note into `sources/` and let ingest update `wiki/` on a branch instead of hand-editing summaries.',
    lessons: ['s17', 's18'],
  },
  {
    id: 'eval',
    term: 'Eval (evaluation)',
    category: 'Testing, data and safety',
    meaning:
      'A repeatable set of realistic inputs and grading checks that measure whether an AI feature gives accurate, safe answers after every change.',
    dayToDay:
      'Treat evals like automated tests for AI behaviour: any prompt, model or tool tweak runs through the eval before shipping.',
    lessons: ['s14'],
    challenges: ['c7'],
  },
  {
    id: 'error-analysis',
    term: 'Error analysis (open coding)',
    category: 'Testing, data and safety',
    meaning:
      'Reading 25 to 50 real conversation traces by hand and grouping how the assistant actually failed before inventing automated scores.',
    dayToDay:
      'Thirty minutes reading raw traces reveals real bugs (like prose sums disagreeing with tool JSON) that generic "helpfulness" rubrics miss.',
    lessons: ['s14'],
  },
  {
    id: 'golden-holdout-set',
    term: 'Golden set and holdout set',
    category: 'Testing, data and safety',
    meaning:
      'Curated test cases with verified answers, split so prompts are tuned on one set and checked on an unseen holdout set.',
    dayToDay:
      'Keep a holdout set the team does not peek at while editing prompts so you do not accidentally memorise the test.',
    lessons: ['s14'],
  },
  {
    id: 'pass-at-k',
    term: 'pass@k vs pass^k',
    category: 'Testing, data and safety',
    meaning:
      '`pass@k` asks whether an agent succeeds at least once in `k` tries; `pass^k` asks whether it succeeds on all `k` tries in a row.',
    dayToDay:
      'Customer-facing agents need high `pass^3` consistency because real travellers or shoppers only try your assistant once.',
    lessons: ['s14'],
  },
  {
    id: 'llm-as-judge',
    term: 'LLM-as-judge',
    category: 'Testing, data and safety',
    meaning:
      'Using a second model call with a narrow binary checklist to grade subjective qualities when deterministic code checks cannot.',
    dayToDay:
      'Only trust an LLM judge after checking that its pass/fail calls agree with your own hand labels on a sample of traces.',
    lessons: ['s14'],
  },
  {
    id: 'red-teaming',
    term: 'Red-teaming (and jailbreaks)',
    category: 'Testing, data and safety',
    meaning:
      'Deliberately throwing tricky, adversarial or rule-bending inputs at an AI feature before launch to see how someone could make it misbehave.',
    dayToDay:
      'Before shipping an assistant or skill, spend half an hour trying to make it leak private notes, promise a refund or follow hidden instructions.',
    lessons: ['s14', 's19'],
  },
  {
    id: 'prompt-injection',
    term: 'Prompt injection (indirect)',
    category: 'Testing, data and safety',
    meaning:
      'Hostile instructions hidden inside untrusted text (a venue bio, PDF, webpage or ticket) that trick an agent into breaking its rules.',
    dayToDay:
      'Assume anything scraped or uploaded by outsiders can contain hidden commands, and enforce safety limits in tool permissions, not prompt wording.',
    lessons: ['s3', 's14', 's19'],
    challenges: ['c3', 'c9'],
  },
  {
    id: 'lethal-trifecta',
    term: 'Lethal trifecta',
    category: 'Testing, data and safety',
    meaning:
      'Simon Willison’s name for combining access to private data, exposure to untrusted content and a way to send data outside in one agent.',
    dayToDay:
      'Before approving any skill or integration, remove at least one leg of the trifecta or put outbound actions behind human approval.',
    lessons: ['s5', 's14', 's19'],
  },
  {
    id: 'srm',
    term: 'Sample ratio mismatch (SRM)',
    category: 'Testing, data and safety',
    meaning:
      'When an A/B test intended as a 50/50 split lands noticeably skewed (say 52/48), signalling broken assignment or logging.',
    dayToDay:
      'Check SRM and duplicate rows before celebrating experiment lift: a skewed split invalidates every p-value on the page.',
    lessons: ['s15'],
  },
  {
    id: 'guardrail-metric',
    term: 'Guardrail metric',
    category: 'Testing, data and safety',
    meaning:
      'A pre-agreed harm or quality metric (like complaints, cancellations or latency) that blocks or pauses a rollout if it worsens.',
    dayToDay:
      'Always check guardrails across vulnerable segments (such as accessibility or low-balance users), because overall averages hide concentrated harm.',
    lessons: ['s12', 's15', 's16'],
  },
]
