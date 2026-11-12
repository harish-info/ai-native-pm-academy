export const STARTER_KIT_AS_OF = '2026-11-02'
export const STARTER_KIT_AS_OF_LABEL = '2 November 2026'

export interface KitTool {
  name: string
  need: 'Recommended' | 'Optional'
  what: string
  facts: string
  resourceId: string
  steps?: string[]
  alternatives?: string
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

export interface GitRescueItem {
  situation: string
  command: string
  whatItDoes: string
}

export interface StarterKit {
  intro: string
  start: string[]
  stages: KitStage[]
  gitRescue: GitRescueItem[]
  otherAgents: string[]
}

export const starterKit: StarterKit = {
  intro:
    'Everything to install for the course, in the order you need it, with the steps to set each tool up. Each session that needs a new tool names it at the top, so you can also install as you go.',
  start: [
    'Install the Week 1 tools below and create one private folder called `workspace`. It takes about 15 minutes.',
    'Open [Session 1](/lessons/s1) and work through the sessions in order. Each one starts with what to bring.',
    'Before Session 5, come back for Claude Code, Warp and Git, or Codex if you already work in ChatGPT. Session 7 adds a free GitHub account to publish your static prototype, and Session 16 adds a presentation skill.',
    'Talk instead of type. Hold the Handy shortcut and say what you want: you will give the agent more context than you would bother to type, and better context gets better answers.',
  ],
  stages: [
    {
      id: 'week-1',
      when: 'Week 1',
      title: 'Write and think with an agent',
      intro:
        'An agent to chat with, a dictation app so you can talk instead of type, and a notes app that keeps your `workspace/` folder as plain files.',
      lessons: ['s1', 's2'],
      tools: [
        {
          name: 'Claude desktop app',
          need: 'Recommended',
          what: 'Chat with Claude, with projects, files and artifacts. Your main tool in Week 1.',
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
          what: 'Dictation: hold a key, speak, and your words appear in any app.',
          facts:
            'Free and open source, for Mac, Windows and Linux. It runs on your computer, so your voice stays there. Speaking is faster than typing and you naturally say more, so the agent gets more context. Wispr Flow runs on Mac, Windows, iOS and Android; Pro is $15 a month, or $12 a month billed yearly.',
          alternatives:
            'Want more polish? [Wispr Flow](https://wisprflow.ai/pricing) has a limited free plan and Pro from $12 a month. Not sponsored.',
          resourceId: 'handy',
          steps: [
            'Download Handy for your computer, install it and allow microphone access when it asks.',
            'Click into any text box, hold the shortcut Handy shows you, speak, then let go. The text appears where you clicked.',
          ],
        },
        {
          name: 'Obsidian',
          need: 'Recommended',
          what: 'A notes app that saves each note as a plain Markdown file your agent can read.',
          facts:
            'Free, no account needed. Optional Sync costs $4 to $5 a month; you do not need it.',
          resourceId: 'obsidian',
          steps: [
            'Install Obsidian and open it.',
            'Create a vault in a new private folder called `workspace`, not in a shared drive. Every file you build from Session 1 to Session 20 stays in this one folder.',
          ],
        },
        {
          name: 'Claude Code in the terminal',
          need: 'Optional',
          what: 'Use Claude Code from Session 1 instead of the app, if you already use a terminal.',
          facts: 'Needs a Claude Pro plan (from $20 a month).',
          resourceId: 'claude-code-terminal-guide',
          steps: [
            'Follow the Claude Code steps under Before Session 5.',
            'Where a session uses a project or an artifact, ask Claude Code to write files in `workspace/` instead.',
          ],
        },
      ],
    },
    {
      id: 'before-s5',
      when: 'Before Session 5',
      title: 'Let an agent work on your files',
      intro:
        'Session 5 moves from chat to a coding agent that reads and changes the files in `workspace/`. It runs in a terminal or the Claude desktop Code tab, with Git saving every step so you can inspect and undo any edit.',
      lessons: ['s5'],
      tools: [
        {
          name: 'Claude Code',
          need: 'Recommended',
          what: 'The coding agent this course uses: it reads and changes the files in your `workspace/` folder.',
          facts: 'Needs a Claude Pro plan (from $20 a month).',
          resourceId: 'claude-code-terminal-guide',
          steps: [
            'If you are on the free plan, upgrade to Claude Pro.',
            "Install Warp and Git (the next cards), then open Warp. Paste the install line from Anthropic's terminal guide and press Enter.",
            'Type `claude` and press Enter, then sign in with your Claude account. If you prefer a graphical window, use the Code tab in the Claude desktop app on the same `workspace/` folder.',
          ],
        },
        {
          name: 'Warp',
          need: 'Recommended',
          what: 'A modern terminal to run Claude Code and Git commands in.',
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
          what: 'Saves versions of your folder, so you can see and undo what the agent changed.',
          facts: 'Free and open source, for Mac, Windows and Linux.',
          resourceId: 'git-install',
          steps: [
            'Follow the install page for your computer.',
            'Check it worked: open a new Warp tab and type `git --version`. A version number means it is installed.',
          ],
        },
        {
          name: 'Codex, if you use ChatGPT',
          need: 'Optional',
          what: "OpenAI's coding agent, in the ChatGPT app. Use it instead of Claude Code if you already work in ChatGPT.",
          facts:
            'Included in ChatGPT plans, including Free for quick tasks. The app runs on Mac, Windows and Linux. Codex reads `AGENTS.md` too, so where a step says Claude Code, use Codex.',
          resourceId: 'chatgpt-desktop-codex',
          steps: [
            'Install the ChatGPT desktop app and sign in.',
            'Open your `workspace/` folder in the app, choose Codex and send your first request.',
          ],
        },
        {
          name: 'VS Code',
          need: 'Optional',
          what: 'An editor that shows your files and every diff the agent makes.',
          facts:
            'Free. The Claude Code extension needs VS Code 1.94 or later and a paid Claude plan.',
          resourceId: 'vs-code',
          steps: [
            'Install VS Code, then open your `workspace/` folder with File, Open Folder.',
            'If you use Claude Code, add the [Claude Code extension](https://code.claude.com/docs/en/vs-code).',
          ],
        },
      ],
    },
    {
      id: 'session-7',
      when: 'Session 7',
      title: 'Publish and review on GitHub',
      intro:
        'Your Level 2 prototype is plain HTML, CSS and JavaScript that opens directly in any browser with zero build tools. In Session 7 you push it to GitHub to practice branches, pull requests and live GitHub Pages publishing.',
      lessons: ['s7'],
      tools: [
        {
          name: 'GitHub account and CLI',
          need: 'Recommended',
          what: 'Puts your static prototype online and gives you pull request diffs. The CLI signs your computer in so your agent can push branches.',
          facts: 'Free account. The CLI is free and open source.',
          resourceId: 'github-cli',
          steps: [
            'Create a free account on [GitHub](https://github.com) and turn on two-factor authentication.',
            'Install the GitHub CLI for your computer.',
            'Open a new Warp tab, type `gh auth login` and follow the prompts, or use GitHub Desktop if you prefer buttons over terminal login.',
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
          what: 'Builds PowerPoint files from your outline and charts.',
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
          what: 'Builds a deck as one HTML file that opens in any browser.',
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
  gitRescue: [
    {
      situation: 'Check which branch you are on and what changed',
      command: 'git status',
      whatItDoes:
        'Lists modified and untracked files without changing anything. Run this before and after every agent task.',
    },
    {
      situation: 'Read the exact lines the agent added or removed',
      command: 'git diff',
      whatItDoes:
        'Shows red removed lines and green added lines across your working files (press `q` if the terminal pauses).',
    },
    {
      situation: 'Start a safe review branch before an agent edit',
      command: 'git switch -c fix-budget-label',
      whatItDoes:
        'Creates and switches to a new branch so `main` stays untouched until you like the diff.',
    },
    {
      situation: 'Save a clean checkpoint before trying something risky',
      command: 'git add -A && git commit -m "save working state"',
      whatItDoes: 'Records a local snapshot you can return to anytime.',
    },
    {
      situation: 'Undo un-saved agent edits to one file',
      command: 'git restore path/to/file.md',
      whatItDoes:
        'Throws away uncommitted changes in that file and brings back the last committed version.',
    },
    {
      situation: 'Agent is going in circles or forgetting rules',
      command: '/clear  (or open a new session)',
      whatItDoes:
        'Starts a fresh context window that reloads `AGENTS.md` cleanly instead of fighting context rot.',
    },
  ],
  otherAgents: [
    '**Cowork**, in the Claude desktop app, runs longer multi-step tasks on your files. It needs a paid plan. This course uses Claude Code because you see and keep every file it writes. [Cowork guide](https://claude.com/blog/the-claude-cowork-product-guide).',
  ],
}
