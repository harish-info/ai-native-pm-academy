// The field guide: models, agents and today's tools, for a PM. It sits between Session 1 (which
// introduces chat versus agent) and Session 5 (where the learner first hands work to an agent).
// Sessions teach methods that last; this page holds the facts that date, each with a date.
// Every dated fact was checked against the linked vendor page or survey on AS_OF.

export const FIELD_GUIDE_AS_OF = '2026-10-31'
export const FIELD_GUIDE_AS_OF_LABEL = '31 October 2026'

export interface FieldGuideLayer {
  name: string
  analogy: string
  what: string
  examples: string
}

export interface LayerScenario {
  id: string
  situation: string
  correct: 'model' | 'agent' | 'brief'
  feedback: Record<'model' | 'agent' | 'brief', string>
}

export interface LabRow {
  company: string
  models: { name: string; role: string; useFor: string }[]
  also: string
  assistant: string
  agent: string
  resourceIds: string[]
}

export interface UsageFigure {
  figure: string
  text: string
  resourceId: string
}

export interface Trend {
  title: string
  evidence: string
  forYou: string
  resourceIds: string[]
}

export interface BuildLevel {
  name: string
  tools: string
  goodFor: string
  youReview: string
  lessons: string[]
}

export interface WeekJob {
  job: string
  ai: string
  you: string
  lessons: string[]
  challenges?: string[]
}

export const fieldGuide = {
  intro: [
    'Session 1 gave you the short version: a chat answers from its context, and an agent is a model in a loop with tools. From Session 5 onwards you hand real work to an agent. Before then it pays to know what you are actually using: which part is the model, which part is the agent, who makes them, and what product people use them for day to day. If you do not know what you are using, you cannot tell whether a bad result came from the tool or from your brief.',
    'Sessions teach methods that last. This page holds the facts that go out of date, in one place, each with a date. Read it once you finish Level 1, before Session 5, and refresh it with the Session 3 method whenever it is more than a couple of months old.',
  ],

  layersIntro:
    'When people say "AI" they mean three different things stacked on top of each other. Separating them is the most useful idea on this page.',
  layers: [
    {
      name: 'Model',
      analogy: 'The engine',
      what: 'A trained network that reads its context and predicts the next token, as in Session 1. On its own it cannot open a file, search the web or remember yesterday. A model family can include several tiers, trading capability against speed and cost. The version number identifies a release within that family.',
      examples: 'Claude Opus 5.5, GPT-6.1 Sol, Gemini 4 Argon.',
    },
    {
      name: 'Agent',
      analogy: 'The car built around the engine',
      what: 'Software that puts the model in a loop. It gives the model instructions and tools (read a file, search, run code, edit), runs whichever tool the model asks for, feeds the result back and repeats until the task is done or it needs you. It also decides what the model may touch: permissions, step limits and where the work runs.',
      examples: 'Claude Code, Codex, ChatGPT Work, Google Antigravity, Cursor, GitHub Copilot.',
    },
    {
      name: 'App',
      analogy: 'The dashboard you drive from',
      what: 'Where you meet it: the Claude or ChatGPT app, the desktop Code tab, a terminal, a code editor, Slack. The same agent can appear in several places; Claude Code runs in the desktop app, in a terminal and inside code editors.',
      examples: 'The Claude app, the ChatGPT desktop app, the Gemini app, VS Code.',
    },
  ] satisfies FieldGuideLayer[],
  layersAfter: [
    'Two things follow. The same model behaves differently in different agents, because each agent adds its own instructions, tools and limits: Claude Opus 5.5 in Claude Code can answer questions about your folder that the same model in a plain chat cannot, because it can look. And one agent can run several models: Cursor and GitHub Copilot let you choose models from different labs, and Claude Code lets you switch between Claude models. That is why Session 1 asked you to say whether you were comparing models or products.',
    'The big labs train models and also build agents on top of them: Anthropic makes Claude Code, OpenAI makes Codex, Google makes Antigravity. Other companies, such as Cursor, GitHub and Lovable, build agents and apps on models they license from the labs.',
    "Claude Code and Codex are rivals at the same layer. Both work on the files in a folder, run commands and propose changes for you to review; each runs its own lab's models. The main visible difference is the instructions file: Claude Code reads `CLAUDE.md`, Codex reads `AGENTS.md`. Session 5 shows the one line that lets both share a single file, and in Session 13 you hand engineering a team `AGENTS.md`.",
  ],

  loopIntro:
    'Here is what happens when you ask an agent for something. Take a request like the ones you make in Session 6: "Add the empty and error states from REQUIREMENTS.md to the first screen."',
  loopSteps: [
    'The agent starts a session. It loads its own instructions, your `CLAUDE.md` and the list of tools it may use into the context window.',
    'The model reads all of that plus your request and picks a first step: list the files in the folder.',
    'The agent runs that tool and adds the result to the context.',
    'The model picks the next step: open the screen file, then propose an edit.',
    'The agent checks its permissions. Depending on the mode, it asks you first or applies the edit.',
    'The model asks to run the prototype or the tests, reads the output and fixes what broke.',
    'It stops when it judges the task done, hits a limit or needs a decision from you, and reports what it did.',
  ],
  loopAfter:
    'Every step adds to the same context window. That is why long agent sessions suffer from context rot (Session 1) and why a short `CLAUDE.md` beats a long one (Session 5). And every action is something to review: with an agent you check what it did, not only what it said.',

  scenariosIntro:
    'When a result disappoints, ask which layer let you down before you fix anything. Try three.',
  scenarios: [
    {
      id: 'touched-file',
      situation:
        'Your `CLAUDE.md` says "never edit files in sources/". Claude Code edits one anyway while tidying the folder.',
      correct: 'agent',
      feedback: {
        model:
          'A stronger model might follow the rule more often, but "more often" is not a boundary. The rule was in context and was still broken, so the fix belongs where actions are allowed or blocked.',
        agent:
          'Right. Instructions guide the model; the agent enforces. Use a permission mode that asks before edits, keep the folder under git so you can restore the file, and treat "never" rules as permissions, not prose. Session 5 explains the split between instructions, permissions and git.',
        brief:
          'The brief already contained the rule, so missing context is not the cause. Rewording it louder rarely helps. Look at what the agent was allowed to do.',
      },
    },
    {
      id: 'generic-summary',
      situation:
        'A plain chat returns a competitor summary that could describe any product in your category.',
      correct: 'brief',
      feedback: {
        model:
          'Switching models is the expensive guess. Without your product context, any model may fall back on generic patterns, so rule out the missing context first.',
        agent:
          'A plain chat has no tools to fetch your material, but the cure is not a different agent. It is giving the model what a new colleague would need.',
        brief:
          'Right. The model had no product, users, constraints or competitor material. Session 2 fixes this with `product-context.md` and a grounded brief.',
      },
    },
    {
      id: 'missed-constraints',
      situation:
        'With the same brief and context file, a small fast model misses two of five constraints in each of three runs. A larger model keeps all five every time.',
      correct: 'model',
      feedback: {
        model:
          'Right. Same brief, same context, same agent, repeated runs: the remaining variable is the model. Use the larger tier for this job, or split the task into smaller steps the small model can manage.',
        agent:
          'Both runs used the same app and tools, so the agent is held constant. The difference sits in the engine.',
        brief:
          'The brief was good enough for the larger model in every run. You controlled for it, which is exactly what makes this a fair model comparison.',
      },
    },
  ] satisfies LayerScenario[],

  landscapeIntro: [
    'A dated map of current models and the products around them. Choose from what your approved tools offer, then use the Session 1 comparison to check the fit for your work.',
  ],
  labs: [
    {
      company: 'Anthropic',
      models: [
        {
          name: 'Claude Opus 5.5',
          role: 'Flagship generalist',
          useFor:
            'Complex analysis and agent work. A PM starting point for difficult PRD trade-offs or a prototype with many constraints.',
        },
        {
          name: 'Claude Sonnet 5.5',
          role: 'Balanced everyday tier',
          useFor:
            'Speed and capability at lower API cost than Opus. Try it for a clear feature brief, everyday prototyping and iteration.',
        },
        {
          name: 'Claude Haiku 5.5',
          role: 'Fast, lower-cost tier',
          useFor:
            'Focused, repeated work. Try tagging feedback against agreed themes or extracting fields, after checking a sample.',
        },
      ],
      also: 'Claude Fable 5.1 is a further step up for demanding reasoning and long agent tasks. Anthropic recommends starting with Opus 5.5 for most workloads, then testing Fable if Opus still falls short.',
      assistant:
        'The Claude app combines chat and Cowork, including longer tasks that return documents, decks or designs.',
      agent: 'Claude Code, used from Session 5 of this course.',
      resourceIds: ['claude-models-overview', 'claude-one-app'],
    },
    {
      company: 'OpenAI',
      models: [
        {
          name: 'GPT-6 Astra',
          role: 'Flagship generalist',
          useFor:
            'The most demanding reasoning and agent work. Try it when a difficult product decision or build needs a stronger model.',
        },
        {
          name: 'GPT-6.1 Sol',
          role: 'Balanced everyday tier',
          useFor:
            'Complex work at lower API cost than Astra. A practical starting point for a PM brief, analysis or prototype.',
        },
        {
          name: 'GPT-6 Luna',
          role: 'Fast, lower-cost tier',
          useFor:
            'Focused, high-volume tasks. Try routine extraction or first-pass feedback tagging with a checked sample.',
        },
      ],
      also: 'GPT-6.1 Terra is another current option, focused on visual reasoning, computer use and writing. GPT-6 Sol is the earlier Sol release. Similar tier labels across labs do not imply equal performance.',
      assistant: 'ChatGPT, including ChatGPT Work for longer tasks across apps and files.',
      agent: 'Codex, available in the ChatGPT desktop app.',
      resourceIds: ['openai-current-models', 'openai-chatgpt-work'],
    },
    {
      company: 'Google',
      models: [
        {
          name: 'Gemini 4 Argon',
          role: 'Released',
          useFor:
            'Available from 13 October 2026. An alternative to include in your Session 1 task comparison if your approved tools offer it.',
        },
        {
          name: 'Gemini 4 Carbon',
          role: 'Limited access',
          useFor:
            'Announced on 28 October 2026, initially for selected cyber defenders. Do not assume it is available in your app.',
        },
      ],
      also: 'Release status matters as much as the name: an announcement does not mean you can select that model today.',
      assistant: 'The Gemini app, and Gemini inside Google Workspace and Search.',
      agent: 'Google Antigravity for building; Google AI Studio for quick prototypes.',
      resourceIds: ['google-gemini-4-argon', 'google-gemini-4-carbon'],
    },
  ] satisfies LabRow[],
  modelNameParts: [
    { label: 'Brand', value: 'Claude' },
    { label: 'Family', value: 'Sonnet' },
    { label: 'Version', value: '5.5' },
  ],
  modelChoiceIntro:
    'Opus 5.5 and Haiku 5.5 are other families, not effort settings for Sonnet. Version numbers identify releases within a family; they are not capability scores you can compare across families or companies.',
  modelChoiceCaveat:
    'Roles reflect vendor positioning. PM examples are course suggestions to test. API cost tiers do not directly describe subscription prices or cost per finished task. One approved assistant is enough to start.',
  effort: {
    intro:
      'Model chooses the engine. Effort asks that same engine to spend more or less work on its response. For example, Sonnet 5.5 at high effort is still Sonnet 5.5. It does not become Opus, gain missing context or get permission to use new tools.',
    levels: [
      {
        name: 'Low',
        meaning: 'A quick first pass',
        example: 'A rewrite or a small, clear change you can check immediately.',
      },
      {
        name: 'Medium',
        meaning: 'A balanced starting point',
        example: 'An everyday brief, a defined analysis or a first prototype.',
      },
      {
        name: 'High',
        meaning: 'More reasoning and checking',
        example: 'Competing constraints, edge cases or a stubborn prototype bug.',
      },
    ],
    extra:
      'Some models offer xhigh or max for harder work, and some offer none. Use the options your app actually shows. Higher effort can take longer and consume more usage; it is not a guarantee of correctness or a request for a longer answer. The same label is not calibrated identically across models.',
    defaults:
      'Checked 31 October 2026: Claude Code defaults to medium for Opus 5.5, Sonnet 5.5 and Haiku 5.5. In its terminal interface, `/model` changes the model and `/effort` changes effort. In desktop apps, use the model picker and available effort control. GPT-6.1 Sol has a medium API default. Defaults and controls can differ by product and account policy.',
    method:
      'Keep the brief, files and success criteria fixed. If facts or context are missing, supply them first. If reasoning still fails, try one higher effort setting on the same model and compare. If it still misses the criteria, try a more capable tier. Keep the least expensive combination that reliably passes your checks.',
    resourceIds: ['claude-effort', 'claude-code-model-effort', 'openai-current-models'],
    tasks: [
      {
        name: 'Rewrite an update',
        model: 'Your current everyday model',
        effort: 'Low',
        why: 'The facts are already supplied and the output is short. Start here rather than paying for deeper analysis.',
        check: 'Did it preserve every fact, owner and date, and fit the intended audience?',
      },
      {
        name: 'Analyse feedback',
        model: 'Sonnet 5.5 or GPT-6.1 Sol',
        effort: 'Medium',
        why: 'Discover themes on a small sample first. Once the categories are clear, test Haiku 5.5 or GPT-6 Luna for repeated tagging.',
        check:
          'Check quotes against the source, inspect ambiguous comments and use code to reconcile totals.',
      },
      {
        name: 'Challenge a PRD',
        model: 'Opus 5.5 or GPT-6 Astra',
        effort: 'High',
        why: 'An intentionally stronger starting point for conflicting requirements and costly decisions. Give it the evidence, constraints and alternatives.',
        check:
          'Did it find real contradictions and untested assumptions, with evidence rather than invented user needs?',
      },
      {
        name: 'Build a prototype',
        model: 'Sonnet 5.5 or GPT-6.1 Sol in a building agent',
        effort: 'Medium, then high if needed',
        why: 'Begin with one small, defined flow. For a persistent bug, keep the model and supply the failing steps before raising effort.',
        check:
          'Run the flow, including empty and error states. A screenshot alone does not prove the interactions work.',
      },
    ],
  },
  othersHeading: 'Other names you will hear',
  others: [
    '**Microsoft and GitHub.** Copilot in Microsoft 365 and GitHub Copilot for code. Both run models from more than one lab.',
    '**Cursor.** A code editor with its own agent, running models from several labs.',
    '**Prompt-to-app builders.** Lovable, v0, Bolt, Figma Make and Claude Design turn a description into a working page. You meet some of them in Session 4.',
    "**Meta and xAI.** Both train frontier models of their own; xAI's are called Grok. You will hear them in the news; this course does not use them.",
    "**Open-weight models.** Some labs publish the trained weights, so a company can run the model on its own servers. DeepSeek, Alibaba's Qwen, Moonshot's Kimi and Mistral are the names you will hear most. Their appeal is control over where data goes, and at work that can decide what you are allowed to use.",
  ],

  usageHeading: 'What people actually use',
  usage: [
    {
      figure: '39%',
      text: 'of professional developers used Claude Code at work in May to July 2026, up from 18% in January. GitHub Copilot was at 21%, Codex at 16% (up from 3%) and Cursor at 12%. 90% used some AI coding agent at work at least weekly. JetBrains survey of more than 15,000 developers.',
      resourceId: 'jetbrains-agent-adoption-2026',
    },
    {
      figure: '50.8%',
      text: 'of 1,478 designers and builders used Claude every week in spring 2026, second only to Figma (82.6%). ChatGPT was at 48.2%, Claude Code 38.4%, Figma Make 34.8% and Gemini 32.3%. 43.8% spent more than half their building time vibe coding; 37.7% did none. UX Tools State of Prototyping survey, March to April 2026.',
      resourceId: 'uxtools-state-of-prototyping-2026',
    },
  ] satisfies UsageFigure[],
  usageCaveat:
    'Read these the way Session 3 taught you. Surveys describe the people who answered them, and many people use two or three tools at once, so the shares overlap. Neither survey is of product managers. No large PM survey with a published method turned up when this page was written, so the designers and builders survey is the nearest neighbour.',

  trendsHeading: 'Five trends, and what they mean for you',
  trends: [
    {
      title: 'Chat and agent are merging into one app',
      evidence:
        'Claude merged chat and Cowork on 16 September 2026. OpenAI added ChatGPT Work and folded the Codex app into the ChatGPT desktop app on 9 July 2026.',
      forYou:
        'The line between chat and agent from Session 1 is often now a switch inside the same app. Knowing which mode you are in, and what it may touch, matters more than which app you opened.',
      resourceIds: ['claude-one-app', 'openai-chatgpt-work'],
    },
    {
      title: 'Agents return finished-looking work',
      evidence:
        'Claude Docs and Claude Slides launched on 16 September 2026, with Claude Design inside conversations. ChatGPT Work produces sheets, slides, docs and web apps, and since 7 October ChatGPT can answer with interactive interfaces.',
      forYou:
        'A draft that looks finished is easy to forward unread. The Session 2 rule (if you send it, you own it), Session 3 verification and the honest labels from Session 4 matter more, not less.',
      resourceIds: ['claude-one-app', 'openai-chatgpt-work', 'openai-gpt6-everyone'],
    },
    {
      title: 'New frontier models every few weeks',
      evidence:
        'Between September and the end of October 2026 OpenAI released the GPT-6 family, Google released Gemini 4 Argon and announced Carbon, and Anthropic released its 5.5 models.',
      forYou:
        'Model strengths and trade-offs change. Keep your method, not your favourite: rerun your Session 1 comparison when a big release lands, and record the date.',
      resourceIds: ['openai-gpt6-astra', 'google-gemini-4-argon', 'google-gemini-4-carbon'],
    },
    {
      title: 'Engineers already work with agents',
      evidence:
        'In mid-2026, 90% of professional developers used an AI coding agent at work at least weekly and 68% daily.',
      forYou:
        'The engineers you hand off to in Level 4 already brief agents. Your PRD will be read by agents as well as people, which is why Session 12 writes it as agent-ready context.',
      resourceIds: ['jetbrains-agent-adoption-2026'],
    },
    {
      title: 'Designers and builders make working prototypes, and review is the bottleneck',
      evidence:
        'Claude Code was a weekly tool for 38.4% of designers and builders in spring 2026, and more than four in ten spent most of their building time vibe coding.',
      forYou:
        'Making a working prototype is now a normal product skill. What separates good work is deciding what to build and checking what came back, which is where Levels 2 to 4 spend their time.',
      resourceIds: ['uxtools-state-of-prototyping-2026'],
    },
  ] satisfies Trend[],

  whyHeading: 'Why a PM needs this map',
  why: [
    '**Diagnose before you fix.** Knowing the three layers tells you whether to improve your brief, change the model tier or change what the agent is allowed to do.',
    '**Choose model and effort separately.** Use the task examples above, compare results against your criteria, and record both settings. A more expensive run needs to earn its place.',
    '**Talk to engineers in their terms.** They use Claude Code, Codex, Cursor or Copilot daily. In Level 4 you review what their agents build.',
    "**Judge claims, including your own product's.** Vendor launch posts lead with benchmarks. Session 14 teaches you to test your own task instead.",
    "**Know what you are allowed to use.** At work your employer's approved tools decide, not the leaderboard. Open-weight and enterprise plans exist largely for that reason.",
  ],
  noPmModelHeading: 'Is there a best model for product managers?',
  noPmModel: [
    'There is no single winner across all PM tasks. A good model for drafting a brief may not be your best choice for visual prototyping, analysing a large file or a long agent task. Compare the output on your own work. Also check the app: its available tools, access to your material and employer approval can decide whether it is usable at all.',
    'So pick one main assistant and one building agent, and learn them deeply rather than sampling everything. This course uses Claude and Claude Code. ChatGPT and Codex can do nearly all of the same work, and every method in the course transfers.',
  ],

  briefHeading: 'How to brief a model or an agent',
  brief: [
    'Session 2 calls this context engineering, and it applies unchanged: a brief to a model has the same parts as a brief to a new colleague. Goal and audience, the context and material, the constraints, and what done looks like.',
    'An agent acts, so its brief needs four more lines: where it may work and what it must not touch, when to stop and ask you, how to check its own work, and what to report back.',
  ],
  briefWeak: 'Analyse the feedback and make a dashboard.',
  briefStrong: `Goal: a one-page dashboard of what users complained about in Q3, for Thursday's team review.

Context: product-context.md describes the product and users. Data: data/feedback-q3.csv (fictional, 400 rows: date, channel, text). My own themes, from reading 50 rows myself: data/my-themes.md.

Where: work only in data/ and dashboards/. Do not edit the CSV.

Stop and ask: propose up to eight themes and show them next to mine before you tag all 400.

Done when: every row has one theme, the counts add up to 400, each theme shows three verbatim quotes, and the dashboard opens in a browser.

Check: recount the totals with code, not by reading. List any rows you could not tag.

Report: what you did, which files changed and anything you were unsure about.`,
  briefAfter:
    "Notice the order. You read a sample and write your own themes first, as Session 10 and Challenge 5 ask, so the agent's list cannot anchor you, and the agent stops after proposing its themes. Deciding what the themes are is your judgement, the delegation call from Session 2; tagging four hundred rows against them is not. Two more habits come later: in Session 6 the agent interviews you before it builds, and long work restarts in a fresh session from a short handoff note.",

  buildHeading: 'Prototyping, vibe coding and agentic building',
  buildIntro:
    'Building with AI comes in three levels. The course climbs them in order, and each one has a different thing for you to review.',
  buildLevels: [
    {
      name: 'Prompt to page',
      tools: 'Claude artifacts, Claude Design, Lovable, v0, Figma Make, Google AI Studio.',
      goodFor:
        'A pitch or a flow you want reactions to, in minutes. This is vibe coding: you judge the result by using it, not by reading the code.',
      youReview:
        'What the page claims, whether the numbers add up and whether it is labelled as a prototype.',
      lessons: ['s4'],
    },
    {
      name: 'An agent in your own folder',
      tools:
        'Claude Code or Codex, working on files you own, under git, published through pull requests.',
      goodFor: 'A multi-screen prototype you can test with real people, in hours.',
      youReview:
        'The running result, the diff of every change and what the agent was allowed to do.',
      lessons: ['s5', 's6', 's7', 's8'],
    },
    {
      name: 'Production with engineering',
      tools:
        "The same agents, in the team's real codebase, against a spec and tests, with a person approving every change.",
      goodFor: 'Software that real users or money depend on, in days to weeks.',
      youReview: 'The spec, the evals and the acceptance check. Engineers own the code review.',
      lessons: ['s12', 's13', 's14'],
    },
  ] satisfies BuildLevel[],

  weekHeading: "A PM's week with AI",
  weekIntro:
    'Here is everyday PM work, what to hand to AI, what to keep, and where the course has you practise it. You will notice that the right-hand column is the course.',
  week: [
    {
      job: 'Market and competitor research',
      ai: 'Search, read and summarise sources; draft a landscape.',
      you: 'Which claims you rely on, each checked against its source.',
      lessons: ['s2', 's3', 's9'],
    },
    {
      job: 'Customer feedback analysis',
      ai: 'Cluster and tag hundreds of written comments or survey answers; pull verbatim quotes with their row numbers.',
      you: 'Your own read and themes first, which themes matter, consent, and keeping names and raw transcripts out.',
      lessons: ['s10'],
      challenges: ['c5'],
    },
    {
      job: 'Data collection',
      ai: 'Draft survey and interview questions, generate fictional practice data, pull from tools you have connected.',
      you: 'What you need to learn, leading questions, consent, and which sources you are allowed to connect.',
      lessons: ['s10', 's11'],
      challenges: ['c5', 'c10'],
    },
    {
      job: 'Data analysis',
      ai: 'Write and run the analysis code, build the funnel, explain what a chart shows.',
      you: 'The question, the definition of every metric, and checking the key numbers yourself.',
      lessons: ['s11'],
    },
    {
      job: 'Dashboards and charts',
      ai: 'Turn a data file into charts or a one-page dashboard, like the agent-ready brief above.',
      you: 'What the reader has to decide, the metric definitions, and whether every number adds up.',
      lessons: ['s11', 's16'],
    },
    {
      job: 'Prototypes',
      ai: 'Build clickable pages and multi-screen flows.',
      you: 'What to test, an honest label and what it does not prove.',
      lessons: ['s4', 's6', 's7', 's8'],
    },
    {
      job: 'PRDs and specs',
      ai: 'Interview you, draft from your workspace, review it as an engineer, a designer and a risk lead.',
      you: 'The problem, the scope, the trade-offs and what is out.',
      lessons: ['s12', 's13'],
    },
    {
      job: 'Quality of AI features',
      ai: 'Generate test cases, run them and grade answers at scale.',
      you: 'What a good answer means, reading the failures and the release rules.',
      lessons: ['s14'],
    },
    {
      job: 'Readouts, updates and decks',
      ai: 'Draft the readout, the stakeholder update and the slides with real charts.',
      you: 'The recommendation and the story.',
      lessons: ['s15', 's16'],
    },
    {
      job: 'Notes and team knowledge',
      ai: 'File, summarise and maintain a wiki that cites its sources.',
      you: 'What is true, and what is shared with whom.',
      lessons: ['s17', 's18'],
    },
    {
      job: 'Recurring work',
      ai: 'Run a weekly briefing or status update as a scheduled skill.',
      you: 'What may run unattended and what it may touch.',
      lessons: ['s19'],
    },
  ] satisfies WeekJob[],

  refreshHeading: 'Keep this page honest',
  refresh:
    'Facts on this page were checked on 31 October 2026. When it is more than a couple of months old, refresh it the way you checked your fact sheet in Session 3: run the prompt below with web search on, then open every vendor page it cites yourself before you believe a change.',
  refreshPrompt: `I keep a one-page map of the AI landscape for my work as a product manager. It was last checked on 31 October 2026 and listed:
- Anthropic: Claude Fable 5.1, Opus 5.5, Sonnet 5.5, Haiku 5.5; the Claude app; Claude Code
- OpenAI: GPT-6 Astra, GPT-6 Sol, GPT-6.1 Sol, GPT-6.1 Terra, GPT-6 Luna; ChatGPT and ChatGPT Work; Codex
- Google: Gemini 4 Argon, Gemini 4 Carbon (limited); the Gemini app; Antigravity

Using web search, tell me what has changed since then.

Rules:
- Use the companies' own announcement or documentation pages as sources. Use press only for context, and label it.
- For every change: what changed, the date, and the exact URL of the vendor page.
- Separate "released and generally available" from "announced" and "limited access".
- Check model and effort choices separately. Say which app or API a default or control applies to.
- Add any new usage survey of developers, designers or product managers with its sample size and dates.
- If you cannot find a vendor source for something, say so. Never guess a model name or a date.`,

  sources: [
    'claude-models-overview',
    'claude-effort',
    'claude-code-model-effort',
    'claude-one-app',
    'openai-current-models',
    'openai-gpt6-astra',
    'openai-gpt6-everyone',
    'openai-chatgpt-work',
    'google-gemini-4-argon',
    'google-gemini-4-carbon',
    'jetbrains-agent-adoption-2026',
    'uxtools-state-of-prototyping-2026',
  ],
}
