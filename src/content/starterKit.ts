// What to install for the course, and when. How to use each tool is taught in the session that
// needs it, not here. App facts (prices, platforms) date quickly; recheck before each cohort.

export const STARTER_KIT_AS_OF = '2026-11-02'
export const STARTER_KIT_AS_OF_LABEL = '2 November 2026'

export interface KitTool {
  name: string
  need: 'Recommended' | 'Optional'
  what: string
  facts: string
  resourceId: string
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
  stages: KitStage[]
  otherAgents: string[]
}

export const starterKit: StarterKit = {
  intro:
    'Every tool here also appears at the top of Session 1, 5 or 16, when you first need it, so you can install as you go. This page is the whole list in one place.',
  stages: [
    {
      id: 'week-1',
      when: 'Week 1',
      title: 'Write and think with an agent',
      intro: 'An agent app to chat with, and somewhere to keep your notes as Markdown files.',
      lessons: ['s1', 's2'],
      tools: [
        {
          name: 'Claude desktop app',
          need: 'Recommended',
          what: 'For chat, projects and artifacts in Weeks 1 and 2. From Session 5, work on your files moves to Claude Code; keep the app for chat.',
          facts: 'Free app for Mac and Windows. The free plan is enough in Week 1.',
          resourceId: 'claude-download',
        },
        {
          name: 'Obsidian',
          need: 'Recommended',
          what: 'A notes app that keeps every note as a plain Markdown file on your computer, so your agent can read your notes directly later in the course.',
          facts:
            'Free, no account needed. Optional Sync costs $4 to $5 a month; you do not need it.',
          resourceId: 'obsidian',
        },
      ],
    },
    {
      id: 'before-s5',
      when: 'Before Session 5',
      title: 'Let an agent work on your files',
      intro:
        'Session 5 moves from chat to a coding agent that reads and changes the files in your folder. It runs in a terminal, so you install the agent and a terminal to run it in. If the terminal stops you, the Code tab in the Claude desktop app is the same agent. Sessions 5 to 7 also set up Git, Node.js and a GitHub account, with your agent and your mentor.',
      lessons: ['s5'],
      tools: [
        {
          name: 'Claude Code',
          need: 'Recommended',
          what: 'The coding agent this course uses. You type requests in plain English; it reads your files, makes changes and asks before running commands.',
          facts:
            'Needs a Claude Pro plan (from $20 a month). Install it with one line from this guide; Session 5 walks you through it.',
          resourceId: 'claude-code-terminal-guide',
        },
        {
          name: 'Warp',
          need: 'Recommended',
          what: 'The terminal to run Claude Code in, instead of the one that came with your computer. It feels like a modern app: you click to place the cursor and edit what you typed like normal text.',
          facts:
            'Free for Mac, Windows and Linux. Its own AI features are optional and need an account.',
          resourceId: 'warp',
        },
        {
          name: 'VS Code',
          need: 'Optional',
          what: 'A free editor that shows your folder and every change your agent makes, side by side. Worth adding once you want to see exactly what changed. If you use Claude Code, add the [Claude Code extension](https://code.claude.com/docs/en/vs-code) to it.',
          facts:
            'Free. The Claude Code extension needs VS Code 1.94 or later and a paid Claude plan.',
          resourceId: 'vs-code',
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
        },
        {
          name: 'frontend-slides',
          need: 'Optional',
          what: 'Builds the deck as one HTML file that opens in any browser: arrow keys to move, print to PDF to share.',
          facts: 'Free, MIT licence. A Claude Code skill.',
          resourceId: 'frontend-slides',
        },
      ],
    },
  ],
  otherAgents: [
    '**Cowork**, in the Claude desktop app, runs longer multi-step tasks on your files. It needs a paid plan. This course uses Claude Code because you see and keep every file it writes. [Cowork guide](https://claude.com/blog/the-claude-cowork-product-guide).',
    "**Codex** is OpenAI's coding agent, inside the ChatGPT desktop app. The ideas in this course carry over, including `AGENTS.md`, the instructions file both agents read. [Codex docs](https://learn.chatgpt.com/docs).",
  ],
}
