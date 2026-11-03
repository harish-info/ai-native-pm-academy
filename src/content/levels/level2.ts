import type { Level } from '../types'

export const level2: Level = {
  id: 2,
  slug: 'build-with-agents',
  title: 'Build with agents',
  theme: 'Turn the pitch into a live, reviewed prototype with Claude Code',
  summary:
    'Make your hypothesis testable as a clickable prototype. Set up a private agent workspace, decide the requirements, build one flow and publish a fictional-data demo through reviewed pull requests. Check behaviour, figures, accessibility and scope. Level 3 can still change the problem or stop the idea.',
  outcomes: [
    'Run a private workspace for the quarter that Claude Code understands from its first message, with an `AGENTS.md` you wrote and a clear line between your instructions and its auto memory.',
    'Let Claude Code interview you into `REQUIREMENTS.md`, then build and steer a multi-screen prototype by reviewing the running result.',
    'Keep long builds on track with fresh sessions and short handoff notes.',
    'Publish through GitHub: commits, branches, a branch and pull request loop, an optional protected main branch, diffs you can read, and a live URL.',
    'Review what agents build with user tests, accessibility basics, a second-session review and fixes from bug reports, without ever committing a secret.',
  ],
  badge: {
    name: 'Builder PM',
    description:
      'Turned a pitch into a live, reviewed product prototype with Claude Code, through pull requests you can explain line by line.',
  },
  lessons: [
    {
      id: 's5',
      levelId: 2,
      number: 5,
      title: 'Your workspace and Claude Code',
      difficulty: 'Intermediate',
      minutes: 120,
      tools: ['Claude Code in Warp (or the desktop Code tab)', 'Git'],
      prerequisites: ['s4'],
      competencies: ['coding-agents', 'knowledge-management'],
      xp: 125,
      mentorReview: 'recommended',
      goal: 'Set up `workspace/` as the private home for your PM practice: one folder per workstream, your Level 1 files moved in, and an `AGENTS.md` that points every agent session at `product-context.md`.',
      whyItMatters:
        'Your pitch page landed and your manager wants a prototype next. From here the work spreads across research, notes, decisions and code, and an agent is only as useful as the context it can reach. A tidy folder with one short instructions file is the simplest knowledge system that works with Claude Code today and with whatever tool comes next. Every later session, and the personal PM OS you build in Level 5, grows out of this folder.',
      learn: [
        {
          heading: 'What Claude Code does that a chat cannot',
          paragraphs: [
            'Claude Code reads files, writes changes and runs commands on your computer. Whatever it reads, including file contents and command output, goes to the model provider. It starts in the folder you choose, but that folder is not a fence: it can be allowed to reach other files and tools, so check what it may do before you start.',
            "This course runs Claude Code in a terminal, and the next section shows why that is easier than it sounds. If the terminal ever stops you, the Claude desktop app has a **Code** tab with the same agent: sign in with your Claude Pro plan, choose a folder and type. OpenAI's Codex works in much the same way; this course writes for Claude Code from here on. The [Field guide](/field-guide) compares current models and tools.",
            'The main Claude app, which now includes **Cowork**, can also act as an agent. This course uses Claude Code because your prototype lives in a folder you own, under git, where you can see and undo every change.',
          ],
        },
        {
          heading: 'A terminal is just another chat window',
          paragraphs: [
            'Claude Code runs in a **terminal**: a window where you type text and the computer types text back. It looks like something from the 1980s, and that is most of why it feels hard. Two words you will hear: a **CLI** (command line interface) is any program you use by typing instead of clicking, and a **TUI** (text user interface) is a CLI that draws boxes and menus inside the terminal. Claude Code is a TUI, which is why it feels like a chat app once it is running: you type a request in plain English, Claude answers, and when it wants to run a command it shows you the command and asks first.',
            'Use **Warp** rather than the terminal that came with your computer: it is free, and you click and edit what you typed like normal text. Setup is the only part where you type commands. Once, install it with the [Starter kit](/starter-kit) steps. Each time after that, type `cd` and a space, drag your workspace folder onto the window, press Enter, and type `claude`. From then on you type sentences. To see what is in a folder, undo a change or install a tool, ask Claude to do it and to explain what it ran.',
            'If you switch to the desktop **Code** tab, nothing else changes: same agent, same `AGENTS.md`, and you can switch back at any time. In the terminal, five keys are worth knowing:',
          ],
          bullets: [
            '**Esc** stops Claude mid-task, safely. Then say what you want instead.',
            '**Enter** sends; **Ctrl+J** starts a new line without sending.',
            '**Shift+Tab** cycles through modes. Press it until the screen shows plan mode, where Claude proposes a plan before changing anything. One press from the start turns on auto-accept edits instead.',
            '**Ctrl+V** pastes a screenshot (Alt+V on Windows), or drag the image file onto the window. On a Mac, Cmd+Ctrl+Shift+4 copies a screenshot ready to paste.',
            '**Up arrow** brings back your last message, `/help` lists commands, and **Ctrl+C** twice quits.',
          ],
        },
        {
          heading: 'How to organise your workspace folder',
          illustration: 'workspace',
          paragraphs: [
            'Claude finds things by reading names, listing folders and searching text. A workspace with forty loose drafts gives it forty chances to quote an old decision. A workspace with one folder per workstream, each with a short `README.md` saying what belongs there, gives it a map.',
            'Keep the rules simple: one folder per workstream, a short context file at the top, lowercase hyphenated file names, dates as YYYY-MM-DD, and raw material (articles, exports, transcripts) saved unedited in `sources/` so you can always go back to what was actually said. When a draft is superseded, move it to an `archive/` folder rather than leaving two versions side by side.',
          ],
          bullets: [
            '`AGENTS.md`: instructions for any agent, written by you. Short.',
            '`product-context.md`: the product, users, glossary, constraints and open decisions from Session 2.',
            '`sources/`: raw material, never edited after saving.',
            '`learning/`: your glossary, model comparison and delegation audit.',
            '`pitch/`: pitch notes and the link to your pitch page.',
            '`research/`: the fact sheet.',
            '`prototype/`: added in Session 6. Level 3 adds `strategy/`, `discovery/`, `data/` and `prd/` the same way, and Level 4 adds `evals/`, `launch/` and `presentations/`: one folder per workstream.',
          ],
        },
        {
          heading: 'AGENTS.md, CLAUDE.md and auto memory',
          paragraphs: [
            '**`AGENTS.md`** is the instructions file for your workspace, and you write it. It is an open format that most coding agents, including Claude Code, Codex and Cursor, read at the start of every session in that folder, so one file works whichever agent you use. Tell it to read `product-context.md` first. In Claude Code, a line such as `@product-context.md` on its own also pulls that file in, so every session starts knowing what your product is.',
            '**`CLAUDE.md`** is for Claude only. Recent versions of Claude Code read `AGENTS.md` directly, as long as there is no `CLAUDE.md` or `CLAUDE.local.md` in that folder or any folder above it; once one exists, Claude reads that instead. So skip it unless you need a rule only Claude should follow, or your version cannot read `AGENTS.md`. If you add one, make its first line `@AGENTS.md`, so `AGENTS.md` stays the single source of truth. If your folder still has a `CLAUDE.md` from an earlier version of this course, first ask your agent to move its contents into `AGENTS.md` and leave `@AGENTS.md` as the only line in `CLAUDE.md`.',
            '**Auto memory** is notes Claude writes for itself as it works, for example a command that worked or a preference you corrected. It lives in your user folder rather than the workspace, and you can view and edit it with the `/memory` command.',
            'The split is simple. Anything that must hold in every session, or that someone else would need to know, you write in `AGENTS.md` yourself: what the workspace is, the folder map, the conventions, what must never happen. Auto memory is for small things Claude picks up along the way. Look at it now and then, delete what is wrong and move anything important into `AGENTS.md`. Status that changes weekly belongs in a workstream README, not in either.',
            'Keep `AGENTS.md` short and check that a fresh session picks it up. It is guidance, not a lock: Claude usually follows it, but anything that must never happen needs a real control, such as a permission setting or keeping the file out of the folder.',
          ],
        },
        {
          heading: 'Permissions, and undoing changes with git',
          paragraphs: [
            'Check which permission mode your session is in; the default depends on your version and settings. Modes range from asking before every edit or command to approving routine actions automatically. While you are learning, use one that asks, so you see what Claude is about to do.',
            'Commit before each task and read the diff after. Git can put tracked files back the way they were. It cannot bring back a file it never tracked, unsend a message or take back something already sent to a connected tool. Keep connectors you do not need switched off, and decide separately before anything is published.',
            'Git saves snapshots of a folder. You do not need to learn the commands: ask Claude to "commit this with a clear message", "show me what changed since the last commit" or "undo the changes to this file", and read what it reports. The workspace stays on your computer. If you want an off-machine backup, use a private repository only.',
          ],
        },
        {
          heading: 'Skills: procedures Claude can reuse',
          paragraphs: [
            'A **skill** is a folder with a `SKILL.md` file: a name, a one-line description of when to use it, and the steps. Claude reads only the descriptions until your request matches one, then loads the full steps. You can run a skill by name, such as `/grill-me`, or let Claude pick it when the task fits.',
            'To install one, copy its folder into `.claude/skills/` in your workspace, or follow the install line in its README. Read it first, the way you would read a script someone emailed you, because it runs with your permissions. You will use Matt Pocock’s grill-me in Session 6 and write and test your own in Session 19.',
          ],
        },
        {
          heading: 'What never goes in the workspace',
          paragraphs: [
            'This is your own workspace on your own computer. Use public or fictional material only: no employer documents, customer data, credentials or personal details about colleagues. When Claude reads a file its contents go to the model provider, so the rule from Session 3 still applies: if you would not paste it into a chat, do not save it here.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'claude-code-101',
          why: "The official beginner course: installation, the everyday loop of asking, reviewing and committing, and how `CLAUDE.md`, Claude's own version of `AGENTS.md`, shapes every session. Skip the parts on subagents, MCP and hooks.",
          required: false,
        },
        {
          resourceId: 'claude-code-memory',
          why: 'The official page on `CLAUDE.md`, `AGENTS.md` and auto memory: when Claude Code reads `AGENTS.md`, and why short instructions work better.',
          required: false,
        },
        {
          resourceId: 'claude-code-permission-modes',
          why: 'Reference for auto mode and the other modes, if you want to see what each one allows.',
          required: false,
        },
        {
          resourceId: 'claude-code-terminal-guide',
          why: 'How to open a terminal, install Claude Code and start it in your folder, written for first-time users.',
          required: false,
        },
        {
          resourceId: 'claude-code-interactive-mode',
          why: 'Every key and command inside a Claude Code session, when you want more than the five above.',
          required: false,
        },
        {
          resourceId: 'claude-cowork-guide',
          why: 'What Cowork does with documents and connected apps. Written before Cowork merged into the main Claude app in September 2026.',
          required: false,
        },
        {
          resourceId: 'ccforpms',
          why: 'An excellent companion course that teaches Claude Code inside Claude Code with a fictional company. It needs a paid Claude plan; link only.',
          required: false,
        },
      ],
      task: {
        summary:
          'Install Claude Code, create `workspace/`, move your Level 1 files in, write `AGENTS.md` with Claude, and make your first commits.',
        steps: [
          'Install Warp, Claude Code and Git with the steps in the [Starter kit](/starter-kit), and sign in with your Claude Pro plan. If the terminal stops you, use the **Code** tab in the Claude desktop app instead.',
          'Create a folder called `workspace` somewhere private on your own computer, not in a shared or synced work folder. Copy in everything from your Level 1 `learning-notes/` folder: `product-context.md`, `glossary.md`, `model-comparison.md`, `delegation-audit.md`, `fact-sheet.md`, `pitch-notes.md` and anything else you kept there.',
          'Open the folder in Claude Code. Ask it to start a git repository and commit the files exactly as they are, before anything moves. This is your first save point.',
          'Run the prompt below. Read the proposed folder map and `AGENTS.md` draft, push back on anything that does not match how you work, then let Claude make the changes.',
          'Ask Claude to show what changed since the first commit. Check that every Level 1 file still exists, now in its folder, and that nothing was rewritten. Commit.',
          'Edit `AGENTS.md` yourself: cut any line a fresh session would not need, and add one rule you care about, such as the spelling you use.',
          'Test it. Start a new session and ask: "What is this workspace for, and where would you save a new competitor article?" Claude should answer from `AGENTS.md` and `product-context.md` without hints. If it cannot, fix the file, not the question.',
          'Run `/memory` and look at what auto memory holds, if anything. Note one thing you would keep there and one thing that belongs in `AGENTS.md` instead.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code',
        where: 'In Claude Code, with the workspace folder open',
        text: `This is my private PM workspace. Read product-context.md for the product, users and constraints I have chosen. Everything in it is fictional or public material. It will hold research, notes, decisions and a prototype, and you will work in it across the course.

Read every file in the folder first, starting with product-context.md.

Goal: organize the workspace so that a fresh Claude Code session understands it from its first message.

1. Propose a folder map: one folder per workstream (at least sources/, learning/, pitch/, research/ and archive/), with a one-line purpose each and which of my current files goes where. Do not rename my files.
2. Draft AGENTS.md, at most 50 lines, with these sections:
   - What this workspace is (two sentences), an instruction to read product-context.md first, and an @product-context.md line so Claude Code loads it in every session
   - Folder map (one line per folder)
   - Conventions: Markdown, lowercase-hyphenated file names, dates as YYYY-MM-DD, raw material saved unedited in sources/
   - Rules: fictional or public data only; never edit files in sources/; ask before deleting anything or moving more than five files; when a file is superseded, move it to archive/
   - How I like answers: short, plain English, name the files you used
3. Draft a README.md for each folder: two or three lines on what belongs there and what does not.
4. List up to five gaps or contradictions you noticed in product-context.md, as questions for me. Do not edit that file.

Show me the folder map and the AGENTS.md draft before you move anything. When I agree, make the changes and tell me what to check.`,
      },
      expectedOutput: [
        'A `workspace/` folder with one folder per workstream, each with a short README.',
        'Your Level 1 files moved in, unchanged in content.',
        'An `AGENTS.md` of 30 to 60 lines that loads `product-context.md` and states the folder map, conventions and rules.',
        'At least two commits: the files as they arrived, and the organized workspace.',
        'A short list of open questions about `product-context.md`.',
      ],
      artifact:
        '`workspace/` with `AGENTS.md` pointing at `product-context.md`, one folder per workstream and the Level 1 files moved in, under git.',
      verification: [
        'A fresh session answers "What is this workspace for, and where would a new competitor article go?" correctly, without hints.',
        'The diff between your first and second commit shows files moved, not rewritten.',
        '`AGENTS.md` is under 60 lines and every line is something a fresh session needs.',
        'The workspace is on your own computer, not in a shared, synced or public location, and has no remote or only a private one.',
        'Nothing in the folder is employer material, customer data or personal detail about other people.',
      ],
      reflectionPrompts: [
        'Which line in `AGENTS.md` do you expect to matter most, and why?',
        'Which file changes could git recover, and which actions needed a different permission boundary?',
      ],
      checklist: [
        {
          id: 'claude-code-running',
          text: 'Installed Claude Code and opened the workspace folder',
        },
        { id: 'first-commit', text: 'Committed the Level 1 files unchanged before anything moved' },
        {
          id: 'workspace-organized',
          text: 'Organized one folder per workstream, each with a short README',
        },
        {
          id: 'claude-md',
          text: 'Wrote and trimmed `AGENTS.md`, which loads `product-context.md`',
        },
        { id: 'fresh-test', text: 'Checked that a fresh session understands the workspace' },
        { id: 'memory-checked', text: 'Looked at auto memory with `/memory`' },
      ],
      mentorMove:
        'Sit with her for the first fifteen minutes: installing, opening the folder and the first commit. Then hand over the keyboard. At the end, ask her to undo one change through Claude Code, so she has seen the safety net work before she relies on it.',
    },
    {
      id: 's6',
      levelId: 2,
      number: 6,
      title: 'Requirements by interview, then a prototype',
      difficulty: 'Intermediate',
      minutes: 150,
      tools: ['Claude Code'],
      prerequisites: ['s5'],
      competencies: ['coding-agents', 'ux-prototyping'],
      xp: 125,
      mentorReview: 'recommended',
      practicalProof: true,
      goal: 'Let Claude Code interview you until the requirements for a product prototype are clear, save them as `REQUIREMENTS.md`, then build and steer a running multi-screen prototype by reviewing the result.',
      whyItMatters:
        'Before building a feature prototype, make the flow explicit: what happens on each screen for the users you chose, and what happens when something is missing. A one-line ask produces an agent that guesses, and its guesses look finished. Being interviewed first turns the gaps in your head into decisions on paper, and that file is what the agent builds from, what you check the result against and, in Level 3, the seed of your PRD.',
      learn: [
        {
          heading: 'Let the agent interview you',
          paragraphs: [
            'Matt Pocock popularised a simple idea, the grill-me skill: before any building, the agent questions you one point at a time until there is nothing left to guess. It works because you know far more about your product than you have written down, and the questions pull it out.',
            'Good questions are concrete: who opens this screen and why, what it shows when there is no data, what happens on a phone, which figures must be exact, what is out of scope. Ask the agent to give its recommended answer with each question, so you can reply "yes" or correct it, and to look up anything your files already say instead of asking you. When you do not know, say so: it becomes an open question in the file instead of an invented answer.',
            'Make the interview ask the evidence question too: "What evidence do you have that this problem exists, and who has it?" Anything you cannot answer is an assumption to test in Session 10. The prototype is a guess, built so Session 10 has something concrete to put in front of real users.',
            'You will use the same method twice more: for the PRD in Session 12 and the design spec in Session 13.',
          ],
        },
        {
          heading: 'What goes in REQUIREMENTS.md',
          illustration: 'requirements',
          paragraphs: [
            'Keep it to one or two pages. It is a brief for an agent and a checklist for you, not a full PRD; that comes in Session 12.',
          ],
          bullets: [
            '**Problem and user**: name the user group, the specific task they need to complete and the difficulty you are exploring. Use the definitions in product-context.md.',
            '**Screens**: three to five, starting with the main task screen. For each, what it shows and what the user can do.',
            '**States**: empty, loading and error for every screen, with the words shown.',
            '**Data**: fictional records and events, all in one file so you can check and change it.',
            '**Rules that must hold**: for example, totals, dates and status rules are worked out by code, not by the model, and shown with the data they came from; status is never shown by colour alone; a visible label says "Prototype with fictional data".',
            '**Done when**: one checkable example per screen, such as: Given 12 records with 3 marked as needing review, when the user filters to Needs review, then exactly 3 records appear and removing the filter restores all 12.',
            '**Out of scope**: what v1 will not do, and open questions.',
          ],
        },
        {
          heading: 'Check the running prototype',
          paragraphs: [
            'With clear requirements, let Claude build. You do not need to approve a plan first: commit, let it work, then open the running prototype in your browser and click through every screen with `REQUIREMENTS.md` beside you. A running app shows you in a minute what a written plan hides for an hour.',
            'Give feedback one change at a time, with a screenshot when it helps: "On the first screen the date is missing from each item; add it under the name." Check the change, then commit it. If a change goes badly, ask Claude to undo it back to the last commit and try again with a clearer ask. That is usually faster than arguing with a confused session.',
          ],
        },
        {
          heading: 'Start fresh sessions from a handoff note',
          paragraphs: [
            'Long sessions fill the context window. Claude Code then compacts the conversation, summarising older turns to make room, and detail is lost. You cannot control what survives. The signs are familiar: it reintroduces a bug it fixed, forgets a decision or contradicts the requirements.',
            'The fix is cheap. Anything that matters goes into a file. Before you stop, or as soon as a session drifts, ask for a short `HANDOFF.md` and start a fresh session that reads it. A good handoff is written for a capable stranger with no access to the conversation: the goal, the current state with file paths, what is done, decisions and why, open questions, the next steps in order, how to check the work and what not to do. Keep it under 40 lines and overwrite it each time; git keeps the old versions.',
          ],
        },
        {
          heading: 'Give the prototype its own folder and repository',
          paragraphs: [
            'Claude builds the prototype in `prototype/` inside your workspace. Because it will be public on GitHub in Session 7, it gets its own git history, separate from your private notes, and the workspace is told to ignore that folder. Give it its own short `AGENTS.md` with the commands to run it and the hard rules: fictional data only, no real systems, accounts or keys.',
            'Ask for a small web app that runs in the browser, built with React, TypeScript and Vite. That is a common, well-documented stack that agents handle well, and it can go live on GitHub Pages for free.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'aihero-grill-me',
          why: 'A direct tutorial for the questioning method. You own the choices, unknowns stay visible, and some questions need a prototype rather than another round of discussion.',
          required: false,
        },
        {
          resourceId: 'aihero-handoff',
          why: 'A practitioner explanation of handoff notes: what to put in them and when to start fresh instead of compacting.',
          required: false,
        },
        {
          resourceId: 'aihero-prototype',
          why: 'Why a prototype should answer a question and be cheap to throw away, which keeps you from polishing too early.',
          required: false,
        },
      ],
      task: {
        summary:
          'Get interviewed into `REQUIREMENTS.md`, let Claude build a three to five screen prototype, steer it by reviewing the running result, and practise one handoff into a fresh session.',
        steps: [
          'Use product-context.md to choose one user task worth exploring. Pick the three to five screens needed to complete it, starting with the main task screen. Note them in a sentence or two.',
          'In Claude Code, with the workspace open, run the interview prompt below. Answer one question at a time in your own words. Say "I do not know" when you do not; it becomes an open question.',
          'Read the requirements yourself and correct anything you did not decide. Ask Claude to create a `prototype/` folder, add it to the workspace `.gitignore` and save the requirements as `prototype/REQUIREMENTS.md`. Keep this as the only requirements file; private notes on your decisions stay in the workspace.',
          'Start a fresh session and ask Claude to build the prototype in `prototype/` from `prototype/REQUIREMENTS.md` and `product-context.md`: a React, TypeScript and Vite app, its own git repository and a short `AGENTS.md` with run commands and hard rules. If it reports that Node.js is missing, install the LTS version with the [Starter kit](/starter-kit) steps; this is the only install in this session.',
          'Ask Claude to start the app and give you the local link. Click through every screen with `REQUIREMENTS.md` beside you, on a laptop and at phone width. Write down everything that is wrong or missing.',
          'Fix the list one change at a time, with screenshots where they help. Check each change in the browser, then ask Claude to commit it with a clear message.',
          'Check two figures on screen by hand against the fictional data file. If they do not match, that is the next fix.',
          'When the session gets long, ask for `HANDOFF.md` using the second prompt in the agent prompt box below. Start a fresh session, ask it to read the handoff and say what it will do next, and continue from there.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code',
        where: 'In Claude Code, with the workspace folder open',
        text: `I am a PM exploring a feature idea. Read product-context.md for my product, target users and the problem I have chosen. If the problem is missing, ask me to define it before proposing screens. I want a clickable prototype that people can use to understand and challenge the idea. It must be honest and simple.

Read product-context.md and pitch/pitch-notes.md first.

Interview me until the requirements are clear enough that you would not need to guess while building. Ask one question at a time and wait for my answer. Cover: who uses each screen and why, the three to five screens, what each shows and what the user can do, empty, loading and error states with the exact words, the fictional data needed (fictional records and events), which figures must be exact and calculated by code, accessibility, what happens at phone width, and what is out of scope. Also ask: "What evidence do you have that this problem exists, and who has it?" Record anything I cannot answer as an assumption to test in Session 10. When an answer of mine contradicts product-context.md, point it out.

When you have no more questions, write prototype/REQUIREMENTS.md with these sections: Problem and user, Screens (one subsection each: shows, actions, states, done when), Data, Rules that must hold, Out of scope, Open questions. Use my words where you can. Do not fill gaps with plausible guesses; list them as open questions. Show me the file before saving it.

---

Second prompt, for later in the session:

Write prototype/HANDOFF.md for a capable stranger who has none of this conversation. Under 40 lines: Goal, Current state (with file paths), Done so far, Decisions and why, Open questions, Next steps (numbered, each small enough for one session), How to check the work, Do not. Then list anything important that exists only in this conversation and not in a file.`,
      },
      expectedOutput: [
        '`REQUIREMENTS.md` with three to five screens, each with states and a "done when" example, plus open questions.',
        'A running prototype in `prototype/` with its own git history, a short `AGENTS.md` and a visible "Prototype with fictional data" label.',
        'Several small commits, one per accepted change.',
        'A `HANDOFF.md` that a fresh session used to continue the work.',
      ],
      artifact:
        '`REQUIREMENTS.md` and a running multi-screen product prototype in `prototype/`, with a handoff note.',
      verification: [
        'Every screen in `REQUIREMENTS.md` exists in the prototype and shows its empty and error states.',
        'Two figures on screen match your own calculation from the fictional data file.',
        'Nothing in `REQUIREMENTS.md` is a decision you did not make: guesses are listed as open questions.',
        'A fresh session given only `HANDOFF.md` and `REQUIREMENTS.md` correctly states the next step.',
        'The workspace git history does not include the `prototype/` folder.',
      ],
      reflectionPrompts: [
        'Which interview question made you decide something you had not thought about?',
        'What did clicking through the running prototype show you that the requirements did not?',
        'When did you choose to start a fresh session, and what told you it was time?',
      ],
      checklist: [
        { id: 'interviewed', text: 'Was interviewed by Claude until the requirements were clear' },
        {
          id: 'requirements',
          text: 'Edited and committed `REQUIREMENTS.md` with states, examples and open questions',
        },
        { id: 'prototype-runs', text: 'Built a three to five screen prototype that runs locally' },
        {
          id: 'reviewed-result',
          text: 'Clicked through every screen and fixed issues one change at a time',
        },
        { id: 'figures-checked', text: 'Checked two figures by hand against the data file' },
        { id: 'handoff', text: 'Wrote `HANDOFF.md` and continued in a fresh session' },
      ],
      mentorMove:
        'Play the engineering lead for ten minutes. Click through the prototype and ask "what happens when..." questions: no data, a very long name, a phone in landscape. Every question she cannot answer from `REQUIREMENTS.md` is a missing line, not a missing feature.',
    },
    {
      id: 's7',
      levelId: 2,
      number: 7,
      title: 'GitHub and go live',
      difficulty: 'Intermediate',
      minutes: 120,
      tools: ['Claude Code', 'GitHub (free account)'],
      prerequisites: ['s6'],
      competencies: ['technical-collaboration', 'coding-agents'],
      xp: 125,
      mentorReview: 'required',
      practicalProof: true,
      goal: 'Publish the prototype as a public `product-prototype` repository and merge your first pull request through a branch, so your product goes live on GitHub Pages. A ruleset that protects main is optional, for teams that want it.',
      whyItMatters:
        'Engineers want to see the prototype and comment on it, and they want a link, not a screen share. GitHub is where software work becomes visible: changes, reviews, decisions and releases. PMs who can open a pull request and read a diff work with engineers and coding agents directly instead of only through tickets, and the pull request history is the audit trail regulated teams rely on.',
      learn: [
        {
          heading: 'How Git and GitHub fit together',
          illustration: 'git',
          paragraphs: [
            'A **repository** is a project folder with its full history. A **commit** is a saved snapshot with a message explaining why it was made. A **branch** is a parallel line of work, so you can change things without touching the stable version on `main`. A **pull request** (PR) proposes merging a branch into `main`, and it is where review, discussion and automated checks happen.',
            'Claude Code runs the git commands: "create a branch called deploy/pages", "commit this", "push and open a pull request". Your job is to read what it changed and decide whether it goes in. You will see the same steps on GitHub\'s website, which is where you and your mentor read and comment.',
          ],
        },
        {
          heading: 'Optional: protect main with a ruleset',
          paragraphs: [
            'Optional, for teams that want it: a ruleset on `main` makes it accept changes only through pull requests. That one setting turns "someone changed the live site" into "a reviewed, recorded change was merged". When an agent can write code in minutes, this gate matters more, not less.',
            "One catch: by default, repository admins can bypass the rules, and on your own repository you are the admin. If you set one up, leave the ruleset's bypass list empty so the rule binds you too. Apply the same rule to everyone who changes code, including PMs, designers and agents: a one-word copy fix still gets a pull request, just a quick review.",
          ],
        },
        {
          heading: 'How to read a diff',
          illustration: 'diff',
          paragraphs: [
            'A diff shows removed lines in red and added lines in green. You do not need to understand every line to review usefully. Ask four questions: does this change match the pull request description, is anything changed that should not be, is there a way to check it works, and is there anything secret or real in it? Those four questions catch a surprising amount.',
            'If you cannot explain what a change does and why, do not merge it. Ask Claude to walk you through any line you do not understand, and keep asking until you can explain it back.',
          ],
        },
        {
          heading: 'Going live on GitHub Pages',
          paragraphs: [
            'GitHub Pages hosts static sites for free on public repositories. A small **GitHub Actions** workflow builds the app and publishes it every time something is merged into `main`, so the live site always matches the reviewed code. Vite apps need one setting, the base path, set to `/product-prototype/` so the site works at `https://<your-username>.github.io/product-prototype/`.',
            'The repository is public, so everything in it is public, including its history. Before the first push, check for keys, real names and personal data. The prototype uses fictional records and events and nothing else; your private workspace notes never go here.',
            'If a merge ever breaks the live site, the first move is to undo it: the **Revert** button on the merged pull request opens a new pull request that reverses it. Fix forward afterwards.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'github-skills-intro',
          why: 'A free, hands-on exercise inside GitHub itself that walks you through branches, commits and pull requests before you do them for real.',
          required: false,
        },
        {
          resourceId: 'github-pages-docs',
          why: 'The official guide to publishing a site with GitHub Pages, including where the publishing settings live.',
          required: false,
        },
        {
          resourceId: 'github-about-prs',
          why: 'The official explanation of pull requests, reviews and merging, for when something on the PR page is unclear.',
          required: false,
        },
        {
          resourceId: 'vite-static-deploy',
          why: 'How a Vite app is deployed to GitHub Pages, including the base path. Useful if the live site loads blank.',
          required: false,
        },
      ],
      task: {
        summary:
          'Complete the GitHub introduction, publish the prototype as a public repository, merge a pull request that deploys it, and open the live URL on your phone. Optionally, protect main with a ruleset.',
        steps: [
          'Create a free GitHub account if you do not have one, and turn on two-factor authentication.',
          'Complete the GitHub Skills "Introduction to GitHub" exercise in the browser.',
          'Sign your computer in to GitHub once so Claude Code can push: install the GitHub CLI and run `gh auth login`, as the [Starter kit](/starter-kit) shows. Your mentor or Claude Code can talk you through it.',
          'In Claude Code, open the `prototype/` folder. Ask Claude to check the code and its history for keys, tokens, real names, email addresses and personal data, and to confirm `.gitignore` excludes build output, dependencies and any `.env` file. Fix anything it finds before going further.',
          'Ask Claude to create a public GitHub repository named `product-prototype` and push `main`.',
          'Optional, for teams that want it: on GitHub, open Settings, then Rules, and add a ruleset for `main` that requires a pull request before merging. Leave the bypass list empty. If you skip this, still send every change through a pull request.',
          'Run the prompt below. Claude creates a branch, adds the deployment workflow and a README, pushes and opens a pull request.',
          'On GitHub, read the diff with the four questions. Leave at least one comment. Ask your mentor to review too, then ask Claude to address the comments in a new commit.',
          'In Settings, then Pages, set the source to GitHub Actions. Merge the pull request, watch the Actions tab turn green and open the live URL on your phone.',
          'Only if you added the ruleset, test it. Ask Claude to make an empty test commit on a new temporary branch and try to push it straight to `main`. GitHub should reject the push. If it goes through, note that and fix the ruleset before you change anything else.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code',
        where: 'In Claude Code, with the prototype folder open',
        text: `This is my product prototype, a React, TypeScript and Vite app that runs in the browser on fictional records and events only. It is now a public GitHub repository called product-prototype, and every change to main goes through a pull request.

Goal: publish the prototype on GitHub Pages so that every merge into main updates the live site.

1. Create a branch called deploy/pages.
2. Run installation, build and relevant tests on pull requests. Add a separate deployment job on pushes to main, using the official GitHub Pages actions. Never deploy an unmerged pull request. If I have set up a ruleset on main, tell me how to require the PR check in it after it has run.
3. Set the Vite base path to /product-prototype/.
4. Rewrite README.md: one paragraph on what my product is and the problem it explores, using REQUIREMENTS.md as the source; a Status section saying it is a learning prototype with fictional data only; a Live site section with the URL https://<my-username>.github.io/product-prototype/ using my real username; and a How we work section: every change goes through a pull request, pull requests stay small, the author reads their own diff first.
5. Commit with clear messages, push the branch and open a pull request whose description explains each change in one line, written for a product manager.

Constraints: no new dependencies beyond what the deployment needs, no changes to the app itself, nothing outside the files above. Tell me which setting I need to change on GitHub myself, and what I should check in the diff before merging.`,
      },
      expectedOutput: [
        'A public `product-prototype` repository. Optionally, a no-bypass ruleset on `main`.',
        'A merged pull request with a description, at least one review comment and a follow-up commit.',
        'Checks on proposed pull requests and a separate deployment workflow after merge.',
        'The live product prototype at a GitHub Pages URL.',
      ],
      artifact:
        'The live product prototype URL and your first merged pull request in the public `product-prototype` repository.',
      verification: [
        'The live URL loads on your phone and shows the "Prototype with fictional data" label.',
        'If you added a ruleset, a direct push to `main` is rejected, even though you are the repository admin. If you did not, you can say why main does not need one yet.',
        'The merged pull request shows at least two commits, a review comment and a resolved conversation.',
        'The diff changed only the workflow, the Vite setting and the README, as the prompt asked.',
        'Nothing in the repository or its history contains keys, real names or personal data.',
      ],
      reflectionPrompts: [
        'Which git idea clicked for you, and which still feels fuzzy?',
        'What did reading the diff reveal that the pull request description did not mention?',
      ],
      checklist: [
        { id: 'gh-skills', text: 'Completed the GitHub Skills introduction exercise' },
        {
          id: 'secrets-check',
          text: 'Checked the prototype for keys and personal data before the first push',
        },
        {
          id: 'ruleset',
          text: 'Decided whether main needs a ruleset; if yes, added one with an empty bypass list',
        },
        {
          id: 'pr-merged',
          text: 'Read the diff, addressed a review comment and merged the pull request',
        },
        { id: 'live-url', text: 'Opened the live GitHub Pages URL on a phone' },
        {
          id: 'push-rejected',
          text: 'If I added a ruleset, saw a direct push to main rejected; otherwise noted why I skipped it',
        },
      ],
      mentorMove:
        'Be the reviewer on her first pull request: leave one real comment, such as a missing link in the README, and one question, and approve only after she pushes a fix. Then open a merged pull request from a well-known open-source project and talk through what you look at first and why.',
    },
    {
      id: 's8',
      levelId: 2,
      number: 8,
      title: 'Review what agents build',
      difficulty: 'Intermediate',
      minutes: 120,
      tools: ['Claude Code', 'GitHub', 'A phone'],
      prerequisites: ['s7'],
      competencies: ['technical-collaboration', 'evals-safety'],
      xp: 125,
      mentorReview: 'recommended',
      safetyCritical: true,
      goal: 'Check the live prototype the way a careful reviewer would: watch one person try it, go through your requirements and five accessibility checks, get a second opinion from a fresh Claude session, fix bugs through reviewed pull requests and keep secrets out of the repository.',
      whyItMatters:
        'Agent-built work looks finished long before it is right. A total can be off by one, a warning can show only in red, an empty screen can break, and the agent will still tell you it is done. Check what the prototype actually does, not what the agent says it does, and fix whatever would mislead someone before anything cosmetic.',
      learn: [
        {
          heading: 'Test the normal path, then try to break it',
          illustration: 'review',
          paragraphs: [
            'Hand the live link to one person, a friend is fine, and watch them use it on their own phone without helping. This checks that the prototype works, not whether the idea is worth building; Session 10 tests that with your target users. Note where they hesitate, what they tap that does nothing, and what they misread. Then go through `REQUIREMENTS.md` yourself, screen by screen: every state, every "done when" example, at laptop and phone width.',
            'Check the numbers. The totals, dates and status rules come from code, so they should match what you work out by hand from the fictional data, exactly. Pick the edge cases agents miss: no data at all, one item exactly on a boundary such as a due date or deadline, a very long name, two items on the same day.',
          ],
        },
        {
          heading: 'Accessibility basics',
          paragraphs: [
            'You do not need to be an expert to catch most problems. Filter the WCAG quick reference to levels A and AA and run five checks on every screen.',
          ],
          bullets: [
            '**Keyboard only**: can you reach and use everything with Tab and Enter, and can you see where you are?',
            '**Colour alone**: is any status, warning or shortfall shown only by colour? Add words or an icon.',
            '**Contrast**: is grey text readable? Low-contrast secondary text is the most common failure.',
            '**Labels**: does every button and form field have a name a screen reader can announce?',
            '**Zoom**: at 200% zoom, does the layout still work without sideways scrolling?',
          ],
        },
        {
          heading: 'Ask a fresh session to review the change',
          paragraphs: [
            'The session that wrote the code is the worst one to review it: it remembers what it meant, not what it wrote. Open a fresh session, give it the requirements and your checklist, and ask it to review the changes against `main` without editing anything. Claude Code also has a built-in review command; a plain prompt in a fresh session works just as well.',
            'An agent reviewer can find likely bugs, missing states and scope creep. It also raises false alarms and misses context only you have. Treat each comment as input, not a verdict, and record a decision for every one: fixed, rejected with a reason, or turned into an issue. Follow your team’s review policy; an agent approval does not replace a required human approval.',
          ],
        },
        {
          heading: 'Fix from a bug report and a screenshot',
          paragraphs: [
            'Good fixes start with a reproducible report: the device, the exact steps, what you expected, what happened and a screenshot. Paste the screenshot straight into Claude Code. Ask it to reproduce the problem first and explain the cause, then fix it on its own branch with its own pull request. If the bug is in a calculation, ask for a test that fails before the fix and passes after it: a fix without a test tends to come back.',
          ],
        },
        {
          heading: 'Keep secrets out of the repository',
          paragraphs: [
            "A public repository is public forever: bots scan GitHub for keys within minutes, and deleting a file later does not remove it from history. Keep keys, tokens, passwords and `.env` files out, list them in `.gitignore`, and turn on secret scanning and push protection in the repository's security settings so GitHub blocks a push that contains a known key format.",
            'If a secret does get pushed, revoke it at the provider first, then clean up the repository. Real personal data follows the same rule: none, ever, because the prototype runs on fictional records and events.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'claude-code-in-action',
          why: 'The official course for people who already use Claude Code: steering longer sessions, `CLAUDE.md`, and code review on GitHub. Skip the parts on hooks and headless runs.',
          required: false,
        },
        {
          resourceId: 'aihero-code-review',
          why: 'A practitioner view of agent code review on two axes: does the change follow the conventions, and does it match the spec.',
          required: false,
        },
        {
          resourceId: 'wcag-quickref',
          why: 'The official accessibility checklist. Filter to levels A and AA to keep it manageable.',
          required: false,
        },
        {
          resourceId: 'claude-code-review-post',
          why: "Anthropic's account of its own review practice, where an agent reviews every pull request and human depth scales with risk. A vendor describing its own tool: read it as one company's example, not proof.",
          required: false,
        },
      ],
      task: {
        summary:
          'Test the live prototype with a user and against your requirements, write `review-checklist.md`, fix the bugs you find through reviewed pull requests, and confirm the repository has no secrets.',
        steps: [
          'Send the live link to one or two people; friends are fine. Watch at least one of them use it on their own phone without helping. Note every bug, hesitation and misreading.',
          'Go through `REQUIREMENTS.md` yourself on laptop and phone: every screen, state and "done when" example. Check two figures by hand and try two edge cases.',
          'Run the five accessibility checks on every screen and note what fails.',
          'Ask Claude to draft `docs/review-checklist.md` from `REQUIREMENTS.md` and this session: requirements, figures, states, accessibility, data and secrets. Edit it to one page in your own words.',
          'Write each confirmed problem as a reproducible report in `docs/review-log.md`, most serious first: a wrong figure or a missed warning comes before a misaligned button. Fix at least one real defect. If you genuinely find none, ask your mentor to break something small on a throwaway branch and fix that instead, never on the live site.',
          'Fix them one at a time. For each, in a fresh session: paste the report and screenshot, ask Claude to reproduce and explain the cause, fix it on its own branch, add a test if it is a calculation, and open a pull request.',
          'Before merging each pull request, run the review prompt below in another fresh session. Record a decision for every comment in `docs/review-log.md`: fixed, rejected with a reason, or turned into an issue.',
          'Ask your mentor to review the change with the highest risk, usually anything touching totals, dates and status rules, as the human reviewer.',
          'Turn on secret scanning and push protection in the repository settings. Ask Claude to scan the full history for keys, tokens and personal data, and fix anything it finds.',
          'Merge, then check the live site shows the fixes on your phone.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code',
        where: 'In a fresh session, in the prototype folder, on the branch of an open pull request',
        text: `Review the changes on this branch compared with main. You did not write them, so read them fresh. Do not edit any files.

Context: this is my product prototype, the product described in product-context.md, running on fictional records and events only. Read AGENTS.md, REQUIREMENTS.md, docs/review-checklist.md and the pull request description first.

Check, in this order:
1. Requirements: does the change do what the pull request says, and does it still meet every "done when" example it touches? Check any change to totals, dates and status rules by hand for two cases from the fictional data.
2. Scope: is anything changed that the description does not mention?
3. States: empty, loading and error states on every screen the change touches.
4. Accessibility: colour-only signals, missing labels, low contrast, keyboard access.
5. Data and secrets: keys, tokens, real names, personal data, new network calls or new dependencies.
6. Tests: if the change touches a calculation, is there a test that would fail without the fix?

Output a table: severity (blocker, should-fix or nit), file and line, issue, suggested fix. Only "blocker" means do not merge. If you are not sure something is a bug, say so and say what would confirm it. End with one paragraph, written for a product manager, on what this change does and how risky it is.`,
      },
      expectedOutput: [
        '`docs/review-checklist.md`: a one-page checklist in your own words.',
        '`docs/review-log.md` with bug reports, agent review comments and a decision for each.',
        'A verified correction through a reviewed pull request, or a labelled seeded local exercise if no real defect was found.',
        'Secret scanning and push protection turned on, and a clean history scan.',
      ],
      artifact:
        'review-checklist.md, a prioritised review log and a verified correction with review evidence.',
      verification: [
        'Every comment from the agent reviews has a recorded decision: fixed, rejected with a reason, or turned into an issue.',
        'Each bug report has steps, expected and actual results, and a screenshot or device note.',
        'Any calculation fix has a test that fails without it and passes with it.',
        'The live site passes the five accessibility checks on the screens you fixed.',
        'Secret scanning and push protection are on, and nothing in the repository history is a key, token or real personal data.',
      ],
      reflectionPrompts: [
        'Which agent review comment was wrong, and how did you know?',
        'What did watching a real person use the prototype show you that your own testing missed?',
        'What would you need before trusting an agent review on a change that touches real money or real customers?',
      ],
      checklist: [
        { id: 'user-test', text: 'Watched at least one person use the live prototype on a phone' },
        { id: 'a11y-checks', text: 'Ran the five accessibility checks on every screen' },
        { id: 'review-checklist', text: 'Wrote `docs/review-checklist.md` in my own words' },
        {
          id: 'fixes-merged',
          text: 'Reproduced and verified a meaningful correction, or completed a labelled seeded local exercise',
        },
        {
          id: 'agent-review',
          text: 'Ran a fresh-session review on each fix and recorded a decision per comment',
        },
        {
          id: 'no-secrets',
          text: 'Turned on secret scanning and push protection and checked the history',
        },
      ],
      mentorMove:
        'Do the human review on her highest-risk pull request and think aloud: what you check first, what you trust the agent review for, and what makes you slow down. Then compare your findings with the agent review and point out one thing only someone who knows the product would have caught.',
    },
  ],
  challenges: [
    {
      id: 'c3',
      levelId: 2,
      title: 'Read a real codebase',
      difficulty: 'Intermediate',
      minutes: 60,
      competencies: ['technical-collaboration', 'coding-agents'],
      xp: 75,
      summary:
        'Before your next engineering conversation, use Claude Code to understand an open-source product you could use yourself, without changing a line. Come out with a one-page brief and three good questions for an engineer.',
      steps: [
        'Pick an open-source product on GitHub with a web interface, active maintainers and a clear README: a budgeting app, a notes app or a help desk, ideally close to your product.',
        'Ask Claude Code to download a copy into a new folder outside your workspace. Tell it this is read-only: no edits, no installs, no commands that change anything.',
        'Ask: what does the product do, what are the main folders and what lives in each, where does one user-facing feature live from screen to data, how is it tested, and what would an engineer find hardest to change?',
        'Ask Claude to save the answers as `codebase-brief.md`, citing a file path for every claim.',
        'Open two of the cited files yourself and check that they say what the brief claims.',
        'Write three questions you would now ask an engineer on that project, and say which part of the brief prompted each.',
      ],
      deliverable:
        'A one-page `codebase-brief.md` with file paths for every claim, two claims you checked yourself, and three questions for an engineer.',
      verification: [
        'Every claim in the brief names a file path, and the two you opened match.',
        'Nothing in the downloaded copy was changed.',
        'The three questions are about trade-offs or risk, not things the README already answers.',
      ],
      resources: [
        {
          resourceId: 'claude-code-docs',
          why: 'The official docs, including how to ask Claude Code to explain an unfamiliar codebase.',
          required: false,
        },
        {
          resourceId: 'github-hello-world',
          why: 'A quick refresher on repositories and branches if the project layout is confusing.',
          required: false,
        },
      ],
    },
    {
      id: 'c4',
      levelId: 2,
      title: 'Fix it from the bug tracker',
      difficulty: 'Intermediate',
      minutes: 90,
      competencies: ['technical-collaboration', 'coding-agents'],
      xp: 100,
      summary:
        'Work the way an engineering team does: turn three user bug reports into GitHub issues, let Claude Code fix them one at a time, and review each pull request before it merges.',
      steps: [
        'Collect three bug reports about the prototype, from your review log or from a new tester.',
        'Open each as a GitHub issue in `product-prototype`: a clear title, the device, steps to reproduce, expected and actual results, a screenshot and a severity.',
        'For the first issue, start a fresh Claude Code session in the prototype folder and ask it to read the issue, reproduce the bug, explain the cause, fix it on a new branch and open a pull request that says "Fixes #" followed by the issue number.',
        'Review the pull request: read the diff with the four questions from Session 7, run the review prompt from Session 8 in another fresh session, and check the fix on the preview or locally.',
        'Merge and confirm the issue closed automatically. Only then start the next issue, in a new session.',
        'Write three lines on what each issue said well or failed to say, and how that changed the fix.',
      ],
      deliverable:
        'Three closed issues, each linked to a reviewed and merged pull request, plus a short note on what made an issue easy or hard to fix.',
      verification: [
        'Each pull request is linked to its issue and closed it on merge.',
        'Each pull request changed only what its issue needed.',
        'Every review comment has a decision recorded on the pull request.',
      ],
      resources: [
        {
          resourceId: 'github-about-prs',
          why: 'How pull requests link to issues so the history explains why each change exists.',
          required: false,
        },
        {
          resourceId: 'aihero-code-review',
          why: 'A way to review each fix against its issue as well as against your conventions.',
          required: false,
        },
      ],
    },
  ],
  quiz: [
    {
      id: 'q2-1',
      competency: 'knowledge-management',
      prompt:
        'You want every Claude Code session in your workspace to know that the prototype uses fictional records and events only and must never connect to real systems. Where should that rule live?',
      options: [
        {
          id: 'a',
          text: 'Tell Claude once in a session, so auto memory saves it for every session after that.',
        },
        {
          id: 'b',
          text: 'Add it to the glossary in `product-context.md`, which every session already loads.',
        },
        {
          id: 'c',
          text: 'In `AGENTS.md`, written by you, where it is read at the start of every session.',
        },
        {
          id: 'd',
          text: 'Repeat it at the top of every prompt you send, so it is always the most recent thing.',
        },
      ],
      correct: 'c',
      explanation:
        "Rules that must hold in every session belong in the instructions file you write and review. Auto memory is Claude's own notes: it may or may not record the rule, in its own words. The glossary is for terms, not rules, and repeating yourself is fragile. Even in `AGENTS.md` a rule is guidance, so git and review stay the real safety net.",
    },
    {
      id: 'q2-2',
      competency: 'knowledge-management',
      prompt:
        'Your workspace root holds forty loose files: drafts, exports and notes from different weeks. Claude has started quoting a decision you reversed. What is the best fix?',
      options: [
        {
          id: 'a',
          text: 'One folder per workstream with a README, and superseded drafts moved to `archive/`.',
        },
        {
          id: 'b',
          text: 'Add a line to `AGENTS.md` telling Claude to ignore any file older than two weeks.',
        },
        {
          id: 'c',
          text: 'Switch to a model with a larger context window so it can weigh every file at once.',
        },
        {
          id: 'd',
          text: 'Merge all the notes into one long, well-structured document that Claude reads first.',
        },
      ],
      correct: 'a',
      explanation:
        'Claude finds things by names, folders and search, so a clear structure is retrieval. Moving superseded drafts out of the way removes the wrong answer instead of hoping an instruction or a bigger window hides it. One long file mixes current and old decisions in a single place.',
    },
    {
      id: 'q2-3',
      competency: 'coding-agents',
      prompt:
        'Claude Code is in auto mode and about to restructure the prototype across many files. What is your best safety net?',
      options: [
        {
          id: 'a',
          text: 'Switch to a mode that asks before every edit, and approve each change as it comes.',
        },
        {
          id: 'b',
          text: 'Copy the whole folder to a backup on your desktop before you let Claude start.',
        },
        {
          id: 'c',
          text: 'Ask Claude to promise in its reply that it will not delete or break anything.',
        },
        {
          id: 'd',
          text: 'Commit first, then read what changed and undo with git anything you do not want.',
        },
      ],
      correct: 'd',
      explanation:
        'For tracked file changes, commit before the task and inspect the diff afterwards. Git does not recover ignored or untracked files automatically and cannot undo external actions or disclosure. Check scope and permissions separately; a model promise is not a control.',
    },
    {
      id: 'q2-4',
      competency: 'ux-prototyping',
      prompt:
        'You asked Claude Code to "build a prototype of your product" in one line. It built five screens, two you never wanted, and invented a feature. What is the best next step?',
      options: [
        {
          id: 'a',
          text: 'Ask it to delete the two extra screens and the feature, and keep the rest as it is.',
        },
        {
          id: 'b',
          text: 'Let it interview you into `REQUIREMENTS.md`, then rebuild from that file.',
        },
        {
          id: 'c',
          text: 'Rewrite the prompt to open with "You are a senior product designer" and run it again.',
        },
        {
          id: 'd',
          text: 'Keep everything, since extra screens give engineers more to react to in the demo.',
        },
      ],
      correct: 'b',
      explanation:
        'The agent guessed because it had nothing to build from. Being interviewed turns the gaps into decisions you made, and the file becomes what you check the result against. Role phrases add no information, and deleting screens leaves every other guess in place.',
    },
    {
      id: 'q2-5',
      competency: 'coding-agents',
      prompt:
        'Two hours into a build session, Claude reintroduces a bug it fixed earlier and forgets a decision you made. What should you do?',
      options: [
        {
          id: 'a',
          text: 'Remind it of the decision and the old bug at the start of every message from now on.',
        },
        {
          id: 'b',
          text: 'Delete the prototype and start again from scratch with a longer, more detailed prompt.',
        },
        {
          id: 'c',
          text: 'Ask for a short handoff note, save it, and continue in a fresh session that reads it.',
        },
        {
          id: 'd',
          text: 'Keep going in the same session: the context will settle once the current task is done.',
        },
      ],
      correct: 'c',
      explanation:
        'Long sessions get compacted and detail is lost. A handoff note puts what matters in a file, and a fresh session starts clean with only that. Repeating yourself fills the context further, and rebuilding throws away good work.',
    },
    {
      id: 'q2-6',
      competency: 'technical-collaboration',
      prompt:
        'A pull request says "Fix the date label on the first screen", but the diff also changes the code that works out totals, dates and status rules. What do you do?',
      options: [
        {
          id: 'a',
          text: 'Ask why, split the calculation change into its own pull request and check it by hand.',
        },
        {
          id: 'b',
          text: 'Merge it, since the automated checks passed and the agent probably fixed a related bug.',
        },
        {
          id: 'c',
          text: 'Ask the same session to review its own pull request and merge it if it says it is safe.',
        },
        {
          id: 'd',
          text: 'Close the pull request and stop letting Claude touch any code that does calculations.',
        },
      ],
      correct: 'a',
      explanation:
        'A change the description does not mention is the first thing a diff review should catch, and calculations people rely on are the riskiest kind. Splitting it out keeps the label fix small and gives the calculation its own review. Green checks and self-review do not answer why it changed.',
    },
    {
      id: 'q2-7',
      competency: 'evals-safety',
      prompt:
        'You notice an API key in a commit you pushed to your public repository an hour ago. What is the first thing to do?',
      options: [
        {
          id: 'a',
          text: 'Delete the file in a new commit and push it, so the key is gone from the latest version.',
        },
        {
          id: 'b',
          text: 'Make the repository private straight away, so nobody else can see the commit.',
        },
        {
          id: 'c',
          text: 'Rewrite the history to remove the commit, then force-push to replace it on GitHub.',
        },
        {
          id: 'd',
          text: 'Revoke the key with its provider, then clean the repository.',
        },
      ],
      correct: 'd',
      explanation:
        'Once a key has been public, assume it has been copied: bots scan GitHub within minutes, and the old commit stays in history and in any copies. Revoking it is the only step that makes it useless. Cleaning the repository matters, but it comes second.',
    },
    {
      id: 'q2-8',
      competency: 'ux-prototyping',
      prompt:
        'Your prototype marks a problem, such as a shortfall, a missed target or an overdue item, only by turning its text red. Which fix meets accessibility basics?',
      options: [
        {
          id: 'a',
          text: 'Use a darker red that passes the contrast check against the background.',
        },
        {
          id: 'b',
          text: 'Add words and an icon so the state never depends on colour, and check contrast.',
        },
        {
          id: 'c',
          text: 'Add a tooltip that explains what the red text means when someone hovers over it.',
        },
        {
          id: 'd',
          text: 'Add a colour legend at the bottom of the screen that explains what red stands for.',
        },
      ],
      correct: 'b',
      explanation:
        'People with colour vision differences, and anyone on a glary phone screen, can miss a colour-only signal. Words or an icon carry the meaning on their own. Better contrast still leaves colour as the only signal, tooltips do not work on touch screens or for many keyboard users, and a legend makes people decode the screen.',
    },
  ],
  project: {
    title: 'Clickable prototype',
    brief:
      'Finish Level 2 with a live, reviewed product prototype that engineers and users can click through, and the workspace and habits that produced it. Show that you directed the agent rather than accepted whatever it built: requirements you decided, changes you can explain, reviews that caught real problems and a repository with nothing in it that should not be public. Then walk your mentor through the code review on one pull request. About 5 hours, mostly finishing and tidying the work from Sessions 5 to 8.',
    deliverables: [
      {
        id: 'workspace',
        text: '`workspace/` under git, with a short `AGENTS.md` that loads `product-context.md`, one folder per workstream and your Level 1 files filed.',
      },
      {
        id: 'requirements',
        text: '`REQUIREMENTS.md` with three to five screens, their states, a "done when" example each and open questions.',
      },
      {
        id: 'repo',
        text: 'The public `product-prototype` repository (with a no-bypass ruleset on main if you chose one), a README and a current `HANDOFF.md`.',
      },
      {
        id: 'live',
        text: 'The live GitHub Pages URL, working on a phone, with the "Prototype with fictional data" label.',
      },
      {
        id: 'review-log',
        text: '`docs/review-checklist.md` and `docs/review-log.md`, with bug reports and a decision for every agent review comment.',
      },
      {
        id: 'fixes',
        text: 'A verified correction with a recorded review and post-fix check, or a labelled seeded local exercise.',
      },
      {
        id: 'mentor-walkthrough',
        text: 'A 20-minute walkthrough with your mentor of one pull request: what changed, why, how you checked it and what the agent review got right and wrong.',
      },
    ],
    rubric: {
      correctness:
        'Every screen in `REQUIREMENTS.md` works on the live site with its states; figures match hand calculations from the fictional data; fixes did what their bug reports asked.',
      quality:
        'Requirements are short, specific and free of invented decisions; pull requests are small and well described; the prototype passes the five accessibility checks; `AGENTS.md` and the handoff are short and current.',
      independence:
        'You ran Claude Code, git and GitHub yourself, steered by reviewing results, used fresh sessions and handoffs when context drifted, and used your mentor for review rather than for doing the work.',
      judgment:
        'You can explain every merged change, rejected at least one agent suggestion with a reason, kept private notes out of the public repository, and know which changes deserve a closer human review.',
    },
    privacyNote:
      'The `product-prototype` repository is public: fictional data only, no interview notes, no real names, no employer material, and never a key or token. Your workspace stays private on your own computer. The Academy stores only your checklist, reflections and the paths you type, never the files themselves.',
    minutes: 300,
    xp: 350,
  },
  nextRecommendation:
    'Move to Level 3. The prototype becomes your research tool: in Session 10 you put it in front of five real users. Keep the workspace as the home for everything you learn: strategy, interviews, data and the PRD all go in it, and Claude Code reads them from there.',
}
