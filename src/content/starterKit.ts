// What to install for the course, when, and the few steps to set each tool up. This page is the
// one place for installation; sessions link here. App facts (prices, platforms) date quickly;
// recheck before each cohort.

export const STARTER_KIT_AS_OF = '2026-11-02'
export const STARTER_KIT_AS_OF_LABEL = '2 November 2026'

export interface KitTool {
  name: string
  need: 'Recommended' | 'Optional'
  what: string
  facts: string
  resourceId: string
  steps?: string[]
  // The session that first needs this tool, when it is not the stage's first session.
  lesson?: string
}

export interface KitStage {
  id: string
  when: string
  title: string
  intro: string
  lessons: string[]
  tools: KitTool[]
}

export interface StarterKit {
  intro: string
  start: string[]
  stages: KitStage[]
  otherAgents: string[]
}

export const starterKit: StarterKit = {
  intro:
    'Everything to install for the course, in the order you need it, with the steps to set each tool up. Each session that needs a new tool names it at the top, so you can also install as you go.',
  start: [
    'Install the Week 1 tools below. It takes about 15 minutes.',
    'Open [Session 1](/lessons/s1) and work through the sessions in order. Each one starts with what to bring.',
    'Before Session 5, come back for Claude Code, Warp and Git. Sessions 6 and 7 add Node.js and a GitHub account, and Session 16 adds a presentation skill.',
    'Talk instead of type. Hold the Handy shortcut and say what you want: you will give the agent more context than you would bother to type, and better context gets better answers.',
  ],
  stages: [
    {
      id: 'week-1',
      when: 'Week 1',
      title: 'Write and think with an agent',
      intro:
        'An agent to chat with, a dictation app so you can talk instead of type, and a notes app that keeps your notes as files.',
      lessons: ['s1', 's2'],
      tools: [
        {
          name: 'Claude desktop app',
          need: 'Recommended',
          what: 'Where you chat with Claude in Weeks 1 and 2: projects, files and artifacts. From Session 5, work on your files moves to Claude Code; keep the app for chat.',
          facts: 'Free app for Mac and Windows. The free plan is enough in Week 1.',
          resourceId: 'claude-download',
          steps: [
            'Download the app for your computer and install it.',
            'Sign in, or create a free account.',
          ],
        },
        {
          name: 'Handy',
          need: 'Recommended',
          what: 'Turns your speech into text in any app: the Claude chat, the terminal, your notes. Speaking is faster than typing, and you naturally say more, so the agent gets the context it needs.',
          facts:
            'Free and open source, for Mac, Windows and Linux. It runs on your computer, so your voice stays there.',
          resourceId: 'handy',
          steps: [
            'Download Handy for your computer, install it and allow microphone access when it asks.',
            'Click into any text box, hold the shortcut Handy shows you, speak, then let go. The text appears where you clicked.',
          ],
        },
        {
          name: 'Obsidian',
          need: 'Recommended',
          what: 'A notes app that keeps every note as a plain Markdown file on your computer, so your agent can read your notes directly from Session 5.',
          facts:
            'Free, no account needed. Optional Sync costs $4 to $5 a month; you do not need it.',
          resourceId: 'obsidian',
          steps: [
            'Install Obsidian and open it.',
            'Create a vault in a new private folder called `learning-notes`, not in a shared drive. Every Level 1 note goes here; in Session 5 it moves into your workspace.',
          ],
        },
        {
          name: 'Claude Code in the terminal',
          need: 'Optional',
          what: 'Already comfortable in a terminal? You can use Claude Code from Session 1 instead of the app. Where a session uses a project or an artifact, ask it to write files in your folder instead.',
          facts:
            'Needs a Claude Pro plan (from $20 a month). Setup steps are under Before Session 5.',
          resourceId: 'claude-code-terminal-guide',
        },
      ],
    },
    {
      id: 'before-s5',
      when: 'Before Session 5',
      title: 'Let an agent work on your files',
      intro:
        'Session 5 moves from chat to a coding agent that reads and changes the files in your folder. It runs in a terminal, so you install the agent and a terminal to run it in. If the terminal stops you, the Code tab in the Claude desktop app is the same agent.',
      lessons: ['s5'],
      tools: [
        {
          name: 'Claude Code',
          need: 'Recommended',
          what: 'The coding agent this course uses. You type requests in plain English; it reads your files, makes changes and asks before running commands.',
          facts: 'Needs a Claude Pro plan (from $20 a month).',
          resourceId: 'claude-code-terminal-guide',
          steps: [
            'If you are on the free plan, upgrade to Claude Pro.',
            "Install Warp and Git (the next cards), then open Warp. Paste the install line from Anthropic's terminal guide and press Enter.",
            'Type `claude` and press Enter, then sign in with your Claude account. Session 5 shows you how to open your own folder.',
          ],
        },
        {
          name: 'Warp',
          need: 'Recommended',
          what: 'The terminal to run Claude Code in, instead of the one that came with your computer. It feels like a modern app: you click to place the cursor and edit what you typed like normal text.',
          facts:
            'Free for Mac, Windows and Linux. Its own AI features are optional and need an account.',
          resourceId: 'warp',
          steps: [
            'Download Warp for your computer and install it.',
            'Open it. You do not need its own AI features for this course.',
          ],
        },
        {
          name: 'Git',
          need: 'Recommended',
          what: 'Saves versions of your folder, so you can see what the agent changed and undo it. Needed from Session 5.',
          facts: 'Free and open source, for Mac, Windows and Linux.',
          resourceId: 'git-install',
          steps: [
            'Follow the install page for your computer.',
            'Check it worked: open a new Warp tab and type `git --version`. A version number means it is installed.',
          ],
        },
        {
          name: 'VS Code',
          need: 'Optional',
          what: 'A free editor that shows your folder and every change your agent makes, side by side. Worth adding once you want to see exactly what changed.',
          facts:
            'Free. The Claude Code extension needs VS Code 1.94 or later and a paid Claude plan.',
          resourceId: 'vs-code',
          steps: [
            'Install VS Code, then open your workspace folder with File, Open Folder.',
            'If you use Claude Code, add the [Claude Code extension](https://code.claude.com/docs/en/vs-code).',
          ],
        },
      ],
    },
    {
      id: 'sessions-6-7',
      when: 'Sessions 6 and 7',
      title: 'Save and publish your work',
      intro:
        'Two tools your agent uses to run your prototype and put it online. Install each when its session reaches it, with your agent or your mentor; Claude Code tells you if one is missing.',
      lessons: ['s6', 's7'],
      tools: [
        {
          name: 'Node.js',
          need: 'Recommended',
          what: 'Runs the prototype you build in Session 6 on your own computer.',
          facts: 'Free and open source. Choose the LTS version.',
          resourceId: 'nodejs-download',
          steps: [
            'Download the LTS installer for your computer and run it.',
            'Check it worked: open a new Warp tab and type `node --version`.',
          ],
        },
        {
          name: 'GitHub account and CLI',
          need: 'Recommended',
          what: 'GitHub keeps your prototype online and publishes it in Session 7. The GitHub CLI signs your computer in once, so Claude Code can push to it.',
          facts: 'Free account. The CLI is free and open source.',
          resourceId: 'github-cli',
          lesson: 's7',
          steps: [
            'Create a free account on [GitHub](https://github.com) and turn on two-factor authentication.',
            'Install the GitHub CLI for your computer.',
            'Open a new Warp tab, type `gh auth login` and follow the prompts, with your mentor if you like.',
          ],
        },
      ],
    },
    {
      id: 'decks',
      when: 'Session 16',
      title: 'Make presentations with an agent',
      intro:
        'A skill is a set of instructions an agent loads for one kind of job. Read its `SKILL.md` first, as Session 5 teaches, then ask your agent to install it.',
      lessons: ['s16'],
      tools: [
        {
          name: 'Anthropic pptx skill',
          need: 'Recommended',
          what: 'Builds real PowerPoint files from your outline and charts, ready to hand to anyone.',
          facts:
            'Free, from Anthropic. Works in Claude Code and in Claude apps with skills turned on.',
          resourceId: 'anthropic-skills',
          steps: [
            'Open the pptx folder in the skills repository and read its `SKILL.md`.',
            'In Claude Code, ask: "Install the pptx skill from the anthropics/skills repository." In the Claude app, turn on skills in Settings instead.',
          ],
        },
        {
          name: 'frontend-slides',
          need: 'Optional',
          what: 'Builds the deck as one HTML file that opens in any browser: arrow keys to move, print to PDF to share.',
          facts: 'Free, MIT licence. A Claude Code skill.',
          resourceId: 'frontend-slides',
          steps: [
            'Read the `SKILL.md` in the repository.',
            'In Claude Code, ask it to install the skill from that repository.',
          ],
        },
      ],
    },
  ],
  otherAgents: [
    '**Cowork**, in the Claude desktop app, runs longer multi-step tasks on your files. It needs a paid plan. This course uses Claude Code because you see and keep every file it writes. [Cowork guide](https://claude.com/blog/the-claude-cowork-product-guide).',
    "**Codex** is OpenAI's coding agent, inside the ChatGPT desktop app. The ideas in this course carry over, including `AGENTS.md`, the instructions file both agents read. [Codex docs](https://learn.chatgpt.com/docs).",
  ],
}
