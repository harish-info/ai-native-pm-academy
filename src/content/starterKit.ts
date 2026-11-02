// Practical setup for the course: apps, the terminal, Markdown and formats.
// App facts (prices, platforms) date quickly; recheck them and update the date before each cohort.

export const STARTER_KIT_AS_OF = '2026-11-02'
export const STARTER_KIT_AS_OF_LABEL = '2 November 2026'

export interface KitTool {
  name: string
  need: 'Recommended' | 'Optional'
  what: string
  facts: string
  resourceId?: string
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
  intro: string[]
  installIntro: string
  stages: KitStage[]
  otherAgents: string[]
  terminal: {
    intro: string[]
    terms: { term: string; meaning: string }[]
    start: string[]
    keys: { keys: string; does: string }[]
    ask: string[]
    stuck: string[]
  }
  markdown: {
    intro: string[]
    marks: { type: string; result: string }[]
    example: string
    exampleCaption: string
  }
  formats: {
    intro: string
    rows: { format: string; use: string; examples: string }[]
    rule: string
  }
  tips: { title: string; text: string; resourceIds?: string[] }[]
}

export const starterKit: StarterKit = {
  intro: [
    'Install things when you reach the session that uses them, not all on day one. Everything marked Optional can be skipped without missing anything in the sessions.',
    'You will not need to become a developer. With Claude Code, the terminal is just another chat window: you say what you want in plain sentences, and Claude does the technical part and asks before it changes anything.',
  ],
  installIntro:
    'Three points in the course need something new. Pick one option where there is a choice; you can switch later.',
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
          what: 'Chat, projects and artifacts now, and the Code tab from Session 5.',
          facts: 'Free app for Mac and Windows. The free plan is enough in Week 1.',
          resourceId: 'claude-download',
        },
        {
          name: 'Obsidian',
          need: 'Recommended',
          what: 'A notes app that keeps every note as a plain Markdown file on your computer, so Claude can read your notes directly later in the course. Any plain text editor also works.',
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
        'A paid Claude plan and one way to run Claude Code: the desktop Code tab or a terminal. It is the same agent either way.',
      lessons: ['s5', 's7'],
      tools: [
        {
          name: 'Claude Code in the desktop app',
          need: 'Recommended',
          what: 'The easiest start: open the **Code** tab, choose your workspace folder and type. No terminal involved.',
          facts: 'Needs a Claude Pro plan or above (from $20 a month).',
          resourceId: 'claude-code-desktop',
        },
        {
          name: 'The terminal you already have',
          need: 'Recommended',
          what: 'If you prefer a terminal, start with the one on your computer: Terminal on a Mac, Windows Terminal or PowerShell on Windows. It is good enough for Claude Code.',
          facts:
            'Free and already installed. The four setup steps are in the terminal section below.',
          resourceId: 'claude-code-terminal-guide',
        },
        {
          name: 'iTerm2 or Ghostty',
          need: 'Optional',
          what: 'Nicer terminals for a Mac, with tabs, split panes and better defaults. [Ghostty](https://ghostty.org/download) is the newer and faster of the two.',
          facts:
            'Both free. iTerm2 is Mac only; Ghostty needs macOS 13 or later and has no Windows version.',
          resourceId: 'iterm2',
        },
        {
          name: 'Warp',
          need: 'Optional',
          what: "A terminal where typing feels like a text editor, which many beginners like. It has its own AI agent built in. You do not need it, and two assistants in one window gets confusing, so talk to Claude, not to Warp's agent.",
          facts: 'Free tier. Its AI features need an account; paid plans start at $20 a month.',
          resourceId: 'warp',
        },
        {
          name: 'VS Code with the Claude Code extension',
          need: 'Optional',
          what: 'A free editor that shows your folder, the file Claude is editing and each change as a before and after you accept or reject. Worth it once you want to see exactly what changed. [Extension guide](https://code.claude.com/docs/en/vs-code).',
          facts: 'Free. The extension needs VS Code 1.94 or later and a paid Claude plan.',
          resourceId: 'vs-code',
        },
        {
          name: 'GitHub Desktop',
          need: 'Optional',
          what: 'Session 7 needs a free GitHub account. GitHub Desktop shows and publishes your changes with buttons; Claude can also do it for you.',
          facts: 'Free. macOS 12 or later, or 64-bit Windows 10 or later.',
          resourceId: 'github-desktop',
        },
      ],
    },
    {
      id: 'dashboards-decks',
      when: 'Sessions 11 to 16',
      title: 'Dashboards and decks',
      intro:
        'A skill is a set of instructions Claude loads for one kind of job. These are free and worth adding when you build your first dashboard and your first deck. Ask Claude to install one for you.',
      lessons: ['s11', 's15', 's16'],
      tools: [
        {
          name: 'Anthropic skills: pptx and frontend-design',
          need: 'Recommended',
          what: '`pptx` builds real PowerPoint files you can hand to anyone. `frontend-design` stops pages and slides looking like every other AI-made page.',
          facts: 'Free. Works in Claude Code and in Claude apps with skills turned on.',
          resourceId: 'anthropic-skills',
        },
        {
          name: 'frontend-slides',
          need: 'Optional',
          what: 'Builds a deck as one HTML file that opens in any browser: arrow keys to move, print to PDF to share. Shows you style previews before it starts.',
          facts: 'Free, MIT licence. A Claude Code skill.',
          resourceId: 'frontend-slides',
        },
        {
          name: 'Marp',
          need: 'Optional',
          what: 'Slides written in plain Markdown, so the outline and the deck are the same file. Slidev, in the Session 16 reading list, does more but needs more setup.',
          facts: 'Free. Exports to HTML, PDF and PowerPoint; Claude can run it for you.',
          resourceId: 'marp',
        },
        {
          name: 'build-dashboard skill',
          need: 'Optional',
          what: 'Turns a CSV into a single-file HTML dashboard. A good start, but override its defaults: no donut charts, show n beside every rate, and never invent sample data.',
          facts: "Free. Part of Anthropic's data plugin for Claude Code and Cowork.",
          resourceId: 'anthropic-build-dashboard-skill',
        },
      ],
    },
  ],
  otherAgents: [
    '**Cowork**, in the same Claude desktop app, runs longer multi-step tasks on your files, such as sorting a folder of research. It needs a paid plan. This course uses Claude Code because you see and keep every file it writes. [Cowork guide](https://claude.com/blog/the-claude-cowork-product-guide).',
    "**Codex** is OpenAI's coding agent, now inside the ChatGPT desktop app. The ideas in this course carry over: it reads `AGENTS.md` where Claude reads `CLAUDE.md`. [Codex docs](https://learn.chatgpt.com/docs).",
  ],
  terminal: {
    intro: [
      'A **terminal** is a window where you type and the computer types back. No icons, no menus. It looks like the 1980s, and that is most of why it feels hard.',
      'Once Claude Code is running inside it, it is a chat window. You type a sentence, Claude replies, and when Claude wants to run a command it shows you the command and asks first. You type two things yourself to get started; after that, everything is plain sentences. If you are unsure about a command, ask Claude what it does before you approve it.',
    ],
    terms: [
      {
        term: 'Terminal',
        meaning: 'The app with the text window. Terminal on a Mac, Windows Terminal on Windows.',
      },
      {
        term: 'Command line (CLI)',
        meaning:
          'Any program you use by typing instead of clicking. Claude Code is a CLI, and so are `git` and `npm`, which Claude runs for you.',
      },
      {
        term: 'Shell',
        meaning:
          'The program inside the terminal that reads what you type. You will see names such as zsh or PowerShell; you never need to choose one.',
      },
      {
        term: 'TUI',
        meaning:
          'A text user interface: a CLI that draws boxes, menus and a cursor inside the terminal. Claude Code is one, which is why it feels like a chat app.',
      },
      {
        term: 'Folder',
        meaning:
          'Where the terminal is pointing right now, also called the working directory. Claude Code works in the folder you start it in.',
      },
    ],
    start: [
      'Open the terminal. On a Mac press Cmd+Space, type Terminal and press Enter. On Windows press Win+X and choose Terminal.',
      "Once only: copy the install line from [Anthropic's terminal guide](https://code.claude.com/docs/en/terminal-guide), paste it and press Enter. Copy it from there rather than from anywhere else, because it changes.",
      'Type `cd` and a space, drag your workspace folder onto the window, and press Enter. The terminal now points at that folder.',
      'Type `claude` and press Enter. Sign in the first time. From here on, type plain sentences. Next time, repeat the last two steps.',
    ],
    keys: [
      { keys: 'Enter', does: 'Send your message, or approve what Claude asks.' },
      {
        keys: 'Ctrl+J',
        does: 'Start a new line without sending. Shift+Enter also works in some terminals, or after the [terminal setup](https://code.claude.com/docs/en/terminal-config).',
      },
      { keys: 'Esc', does: 'Stop Claude mid-task, safely. Then say what you want instead.' },
      { keys: 'Ctrl+C', does: 'Clear what you typed. Press it twice to quit Claude Code.' },
      { keys: 'Up arrow', does: 'Bring back your last message to edit and send again.' },
      {
        keys: 'Shift+Tab',
        does: 'Switch mode, for example to plan mode, where Claude proposes a plan before changing anything.',
      },
      {
        keys: '/',
        does: 'Show commands, such as `/help`, `/clear` to start a fresh conversation and `/exit` to leave.',
      },
      { keys: '@', does: 'Point Claude at a file by name, such as `@notes/brief.md`.' },
      {
        keys: 'Ctrl+V',
        does: 'Paste a screenshot. Use Cmd+V in iTerm2 and Alt+V on Windows, or drag an image file onto the window.',
      },
    ],
    ask: [
      '"What is in this folder? Explain it as if I have never used a terminal."',
      '"Undo the change you just made to `brief.md`."',
      '"Install what you need to turn this CSV into a chart, and tell me what you installed."',
      '"Before you run that, explain what the command does in one sentence."',
      '"Open the dashboard you just made in my browser."',
    ],
    stuck: [
      'Claude is going the wrong way: press Esc and say what you want instead.',
      'An error appears: ask "What does this mean, and what should we do?" Claude can read it.',
      'The window seems frozen: press Esc, then Ctrl+C. Closing the window is also safe; your files stay where they are.',
      'You approved something you should not have: ask Claude to show what changed and put it back. From Session 7, git keeps every version.',
      'You are lost: type `/help`, or ask "Where am I and what can I do here?"',
    ],
  },
  markdown: {
    intro: [
      'Markdown is plain text with a few marks for headings, lists and emphasis. It reads fine as it is, every app can open it, and agents read and write it better than any other format. Files end in `.md`. Your notes, briefs and `CLAUDE.md` in this course are all Markdown.',
      'Six marks cover almost everything. Obsidian, GitHub and Claude show them formatted. [CommonMark](https://commonmark.org/help/) has the full list and a ten-minute tutorial.',
    ],
    marks: [
      { type: '# Heading', result: 'A heading. ## is the next level down.' },
      { type: '**bold**', result: 'Bold text' },
      { type: '*italic*', result: 'Italic text' },
      { type: '- item', result: 'A bullet list. 1. starts a numbered list.' },
      { type: '[label](https://...)', result: 'A link' },
      { type: '`file.md`', result: 'Text shown exactly, for file names and commands' },
    ],
    example: [
      '# Onboarding: weekly update',
      '',
      '## Decided',
      '- Keep the three-step flow. **Owner:** Sam',
      '- Drop the welcome video. [Test notes](https://example.com)',
      '',
      '## Open',
      '1. Do deleted accounts count in the monthly total?',
      '2. Who signs off the copy?',
    ].join('\n'),
    exampleCaption:
      'A status note in Markdown. It reads well as plain text, and formatted in Obsidian or GitHub.',
  },
  formats: {
    intro:
      'Ask for the format that matches who will use the result. Markdown for things you and your agent keep editing; HTML for things people look at. [Why HTML works so well with agents](https://claude.dev/blog/using-claude-code-the-unreasonable-effectiveness-of-html/).',
    rows: [
      {
        format: 'Markdown',
        use: 'Notes, briefs, specs, decision logs and context files: anything you will edit, search, keep versions of, or hand back to an agent.',
        examples: '`CLAUDE.md`, a PRD draft, meeting notes, a prompt library.',
      },
      {
        format: 'HTML, as one file',
        use: 'Anything people need to look at rather than edit, especially if it needs a chart, a layout or buttons, or is longer than a screen. Opens in any browser.',
        examples: 'A funnel dashboard, three options side by side, a launch status page, a deck.',
      },
      {
        format: 'CSV or a spreadsheet',
        use: 'The raw numbers. Keep the data here and let the page read it, so every number is checked in one place.',
        examples: 'An event export, survey results, experiment results.',
      },
      {
        format: 'Slides or a Word document',
        use: 'When your audience expects a familiar format, or will edit it themselves.',
        examples: 'A deck for a leadership review, a policy document that legal will mark up.',
      },
    ],
    rule: 'When you ask for HTML, say **"one self-contained HTML file, styles inline, no build step"**, so it opens with a double click and can be sent as an attachment. Keep the facts in Markdown or CSV and regenerate the page from them, rather than editing numbers inside the HTML. HTML costs more tokens, its changes are harder to review, and everyone you send it to gets every number embedded in it, so check before you share.',
  },
  tips: [
    {
      title: 'Screenshots straight into Claude',
      text: 'On a Mac, Cmd+Ctrl+Shift+4 copies a screenshot instead of saving it to the desktop; then Ctrl+V pastes it into Claude Code. On Windows, Win+Shift+S then Alt+V. No plugin needed.',
      resourceIds: ['claude-code-interactive-mode'],
    },
    {
      title: 'Talk instead of typing',
      text: 'Dictation is built into Mac (turn it on in Keyboard settings) and Windows (Win+H). Claude copes well with rambling, so speak the context and then read what it did with it.',
    },
    {
      title: 'Ask Claude to open things',
      text: 'Say "open it in my browser" for an HTML file, or "show it in Finder" for a folder. You never need to hunt for a file.',
    },
    {
      title: 'Start fresh when it gets muddled',
      text: 'Long conversations drift. Type `/clear` to start a new one in the same folder; your files and `CLAUDE.md` stay.',
    },
    {
      title: 'Hear when Claude finishes',
      text: 'A sound when a task ends lets you work on something else while it runs. Ask Claude to set it up.',
      resourceIds: ['claude-code-terminal-config'],
    },
    {
      title: 'Learn more, if you want to',
      text: 'Optional background on terminals and on Claude Code for PMs.',
      resourceIds: ['claude-code-terminal-guide', 'mdn-command-line', 'ccforpms-cli'],
    },
  ],
}
