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
    'Install each tool when you reach the session that uses it, not all on day one. The session shows you how to use it.',
  stages: [
    {
      id: 'week-1',
      when: 'Week 1',
      title: 'Write and think with Claude',
      intro: 'A Claude account and somewhere to keep your notes as Markdown files.',
      lessons: ['s1', 's2'],
      tools: [
        {
          name: 'Claude desktop app',
          need: 'Recommended',
          what: 'Chat, projects and artifacts now, and Claude Code from Session 5.',
          facts: 'Free app for Mac and Windows. The free plan is enough in Week 1.',
          resourceId: 'claude-download',
        },
        {
          name: 'Obsidian',
          need: 'Recommended',
          what: 'A notes app that keeps every note as a plain Markdown file on your computer, so Claude can read your notes directly later in the course.',
          facts:
            'Free, no account needed. Optional Sync costs $4 to $5 a month; you do not need it.',
          resourceId: 'obsidian',
        },
      ],
    },
    {
      id: 'before-s5',
      when: 'Before Session 5',
      title: 'Let Claude work on your files',
      intro:
        'Session 5 installs Claude Code, which needs a Claude Pro plan (from $20 a month). Run it in Warp rather than the terminal that came with your computer.',
      lessons: ['s5'],
      tools: [
        {
          name: 'Warp',
          need: 'Recommended',
          what: 'A terminal that feels like a modern app: you click to place the cursor and edit what you typed like normal text. Claude Code runs inside it.',
          facts:
            'Free for Mac, Windows and Linux. Its own AI features are optional and need an account.',
          resourceId: 'warp',
        },
        {
          name: 'VS Code',
          need: 'Optional',
          what: 'A free editor that shows your folder and every change Claude makes, side by side. Worth adding once you want to see exactly what changed. Add the [Claude Code extension](https://code.claude.com/docs/en/vs-code) to it.',
          facts: 'Free. The extension needs VS Code 1.94 or later and a paid Claude plan.',
          resourceId: 'vs-code',
        },
      ],
    },
    {
      id: 'decks',
      when: 'Session 16',
      title: 'Make presentations with Claude',
      intro:
        'A skill is a set of instructions Claude loads for one kind of job. Ask Claude to install these for you.',
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
    "**Codex** is OpenAI's coding agent, inside the ChatGPT desktop app. The ideas in this course carry over: it reads `AGENTS.md` where Claude reads `CLAUDE.md`. [Codex docs](https://learn.chatgpt.com/docs).",
  ],
}
