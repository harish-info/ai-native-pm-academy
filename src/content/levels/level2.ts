import type { Level } from '../types'

export const level2: Level = {
  id: 2,
  slug: 'build-with-agents',
  title: 'Build with agents',
  theme: 'Turn the pitch into a live, reviewed discovery probe with Claude Code',
  summary:
    'Turn your Wayfinder hypothesis into a clickable, throwaway discovery probe built to test assumptions with real people in Session 10, not production v1. Put your workspace under Git, get interviewed into a one-page requirements file, publish a zero-build HTML, CSS and plain-JavaScript probe through a reviewed pull request, answer a product question from a real codebase and review behaviour, math and accessibility.',
  outcomes: [
    'Run a private Git workspace that your coding agent understands from its first message, with an `AGENTS.md` you wrote yourself and a clear split from auto memory.',
    'Use `grill-me` to get interviewed into a one-page `REQUIREMENTS.md` for one Wayfinder user job and three states, then steer a zero-build static discovery probe one change at a time.',
    'Keep builds sharp with git save points, fresh sessions and short `HANDOFF.md` notes before long chats hit context rot.',
    'Work on GitHub: commits, branches, reading diffs with four PM questions, merging one pull request, answering a product question from a real codebase and filing a bug issue.',
    'Review agent-built work with silent phone observation, five WCAG AA checks, an independent fresh-session review from your own checklist and secret scanning.',
  ],
  badge: {
    name: 'Builder PM',
    description:
      'Turned a pitch into a live, reviewed discovery probe with Claude Code, through pull requests and checks you can explain line by line.',
  },
  lessons: [
    {
      id: 's5',
      levelId: 2,
      number: 5,
      title: 'Your workspace and Claude Code',
      difficulty: 'Intermediate',
      minutes: 75,
      tools: ['Claude Code (terminal or desktop Code tab)', 'Git'],
      prerequisites: ['s4'],
      competencies: ['coding-agents', 'knowledge-management'],
      xp: 125,
      mentorReview: 'recommended',
      goal: 'Put your existing `workspace/` under Git, organize clean workstream folders with `README.md` guides, and write a short `AGENTS.md` that loads `@product-context.md` automatically.',
      whyItMatters:
        'Your Wayfinder pitch page landed, and next you will build a throwaway discovery probe to put in front of real trip organisers. From here your work spans research, requirements, decisions and code, and a coding agent is only as sharp as the files it can reach. Keeping the single `workspace/` folder you started in Session 1 under Git avoids messy folder renames and grows into your personal PM OS in Level 5.',
      learn: [
        {
          heading: 'What a coding agent does that chat cannot',
          paragraphs: [
            'Claude Code is a coding agent: it reads files, writes edits and runs commands in the folder you open on your computer. Whatever it reads, including file contents and command output, goes to the model provider, and the starting folder is not a hard fence, so check what tools and folders it may reach before you begin.',
            "You can run Claude Code in any terminal app or in the **Code** tab of the Claude desktop app: both use the same agent and read the same `AGENTS.md` file. Follow the [Starter kit](/starter-kit) once for installation, and see the [Field guide](/field-guide) for how OpenAI's Codex and Claude's Cowork compare. Inside a session, five quick controls cover almost everything: **Esc** stops a task safely mid-run, **Shift+Tab** switches into plan mode so the agent proposes steps before editing, pasting or dragging an image shares a screenshot, `/memory` inspects auto memory, and `/help` lists commands.",
          ],
        },
        {
          heading: 'One persistent workspace, one folder per workstream',
          illustration: 'workspace',
          paragraphs: [
            'Agents orient themselves by listing folders, reading file names and searching text. Forty loose drafts in one root folder give the agent forty chances to quote a Wayfinder decision you reversed last week. One folder per workstream inside `workspace/`, each with a two-line `README.md` stating what belongs inside, gives every session a reliable map.',
            'Keep conventions plain: lowercase-hyphenated file names, dates written as `YYYY-MM-DD`, raw material saved unedited in `sources/`, and superseded drafts moved to `archive/` rather than left beside current files.',
          ],
          bullets: [
            '`AGENTS.md` and `product-context.md` at the top: instructions you write, plus Wayfinder users, glossary, constraints and open decisions.',
            '`sources/`: raw competitor pages, tourism statistics and reference docs from Session 3 onward, never edited after saving.',
            '`notes/`: your Level 1 glossary, model comparison, delegation audit, verified fact sheet and pitch notes.',
            '`archive/` for retired comparison drafts (such as `summary-comparison.md`), with `prototype/` added in Session 6 and `strategy/`, `discovery/`, `data/`, `prd/` and `wiki/` added in Levels 3 to 5.',
          ],
        },
        {
          heading: 'AGENTS.md, CLAUDE.md and auto memory',
          paragraphs: [
            '**`AGENTS.md`** is the open instructions file you write yourself, read at the start of every session by Claude Code, Codex and most other coding agents. Keep it between 25 and 50 lines. Put `@product-context.md` on its own line near the top so Claude Code loads your Wayfinder context into every session automatically.',
            'Claude Code reads `AGENTS.md` directly as long as there is no `CLAUDE.md` in the folder or above it. Skip `CLAUDE.md` unless you need a Claude-only setting; if you ever add one, make its first line `@AGENTS.md` so `AGENTS.md` stays your single source of truth.',
            '**Auto memory** (`/memory`) is a scratchpad in your user folder where Claude records small habits it noticed while working. Permanent rules (`never edit files in sources/`) belong in `AGENTS.md`; weekly status belongs in a folder `README.md`. Long chats still suffer **context rot** when older turns compact and lose detail, so keep real decisions in files and start a fresh session from a short handoff note whenever answers drift.',
          ],
        },
        {
          heading: 'Permissions, git save points and skills',
          paragraphs: [
            'While learning, use a permission mode that asks before running commands or deleting files. Run `git init` once in `workspace/`, check `git status`, and commit before each task (`git add` and `git commit`): git restores any tracked file in seconds, though it cannot recover untracked files or unsend actions already taken in external tools.',
            'A **skill** is a reusable workflow stored in `.claude/skills/` as a `SKILL.md` file with a name, a one-line trigger description and step-by-step instructions. Read any skill before installing it because it runs with your permissions. You will practise the `grill-me` interview method in Session 6 and write your own skill in Session 19.',
          ],
        },
        {
          heading: 'What never goes in the workspace',
          paragraphs: [
            'Keep only fictional Wayfinder practice material and public sources in `workspace/`: everything the agent reads goes to the model provider, so as in [Session 3](/lessons/s3), never save employer documents, customer data, colleague details or credentials here.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'claude-code-memory',
          why: 'The official page on `CLAUDE.md`, `AGENTS.md` and auto memory: when Claude Code reads `AGENTS.md`, and why short instructions work better.',
          required: false,
        },
        {
          resourceId: 'claude-code-101',
          why: "The official beginner course: installation, the everyday loop of asking, reviewing and committing, and how `CLAUDE.md`, Claude's own version of `AGENTS.md`, shapes every session. Skip the parts on subagents, MCP and hooks.",
          required: false,
        },
        {
          resourceId: 'ccforpms',
          why: 'An excellent companion course that teaches Claude Code inside Claude Code with a fictional company. It needs a paid Claude plan; link only.',
          required: false,
        },
        {
          resourceId: 'anthropic-cowork-course',
          why: "The no-terminal route: Anthropic's course on Cowork, the desktop agent that works on your folders. Needs a paid plan. Optional: these sessions use Claude Code, but the same ideas carry over if your team works in Cowork.",
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
          resourceId: 'claude-code-permission-modes',
          why: 'Reference for auto mode and the other modes, if you want to see what each one allows.',
          required: false,
        },
        {
          resourceId: 'claude-code-model-effort',
          why: 'Reference for the model picker and effort controls in Claude Code. Start with the choosing-an-effort-level section; skip the configuration details.',
          required: false,
        },
        {
          resourceId: 'claude-cowork-guide',
          why: 'What Cowork does with documents and connected apps. Written before Cowork merged into the main Claude app in September 2026.',
          required: false,
        },
      ],
      task: {
        summary:
          'Put your Level 1 `workspace/` under Git, write your first `AGENTS.md` yourself, add folder `README.md` guides, practise undoing a change with Git, and test a fresh session.',
        steps: [
          '**Think first (no AI):** Open the `workspace/` folder you started in Session 1 and check that `product-context.md`, `sources/` and `notes/` are present. Hand-write a 25 to 40 line `AGENTS.md` describing Wayfinder and loading `@product-context.md` on its own line. Add your folder map (`sources/`, `notes/`, `archive/`) and hard rules including `never edit files in sources/`.',
          '**Work with your agent:** Open `workspace/` in Claude Code, initialize Git (`git init`), and commit your untouched Level 1 files as your first save point. Brief the agent to add two-line `README.md` guides in `sources/`, `notes/` and `archive/`, move retired drafts into `archive/` without rewriting content, and commit. Make one deliberate throwaway edit to a `README.md` and undo it with Git.',
          '**Check and try to break it:** Open a brand-new Claude Code session and ask cold what Wayfinder does, which rules stay in code, and where raw competitor articles go. Run `/memory` to compare auto memory against `AGENTS.md`. Note what would disappear during context rot if a decision lived only in chat.',
          '**Make the call:** Tighten `AGENTS.md` wherever the fresh session guessed or missed a constraint. Delete any vague filler line that does not alter agent behaviour, and commit your clean workspace.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code',
        where: 'In Claude Code (terminal or desktop Code tab), with workspace/ open',
        briefChecklist: [
          'Context files to read first: `AGENTS.md` and `product-context.md` before proposing any changes.',
          'Folder guides to create: two-line `README.md` files in `sources/`, `notes/` and `archive/`.',
          'Hard boundaries: move retired scratch drafts into `archive/` without rewriting active Level 1 notes, and never edit `sources/`.',
          'Approval gate: show proposed moves and `AGENTS.md` tightenings first, waiting for your go-ahead before editing.',
          'Verification output: show `git status` and `git diff` after changes, plus up to three open questions spotted in `product-context.md`.',
        ],
        text: `Read AGENTS.md and product-context.md first, then inspect the files currently in this private PM workspace. Everything here is fictional Wayfinder material or public research.

Goal: tidy my Level 1 workspace folders without changing active note contents, and review my hand-written AGENTS.md for gaps.

1. Propose any superseded scratch files that belong in archive/ while keeping product-context.md at the root, raw pages in sources/ and active Level 1 deliverables in notes/. Do not rewrite my files.
2. Draft a two-line README.md for sources/, notes/ and archive/ stating what belongs there and what does not.
3. Suggest up to five line edits to tighten my AGENTS.md (keeping it under 40 lines and keeping @product-context.md at the top), plus up to three open questions you noticed in product-context.md without editing it.

Wait for my approval before moving or creating files. Once I approve, apply the changes and show me git status and git diff so I can verify nothing was rewritten.`,
      },
      expectedOutput: [
        'A private `workspace/` Git repository with `sources/`, `notes/` and `archive/`, each containing a short `README.md`.',
        'Your Level 1 Wayfinder files preserved intact, with retired scratch comparisons archived cleanly.',
        'A hand-written, tested `AGENTS.md` of 25 to 50 lines that loads `@product-context.md` and states folder rules.',
        'Clean Git commits before and after tidying, plus one practised Git undo.',
      ],
      artifact:
        '`workspace/` under Git with a short `AGENTS.md` pointing at `product-context.md`, clear folder `README.md` guides and clean commits.',
      verification: [
        'A fresh Claude Code session answers "What is Wayfinder, and where does a raw competitor article go?" accurately without hints.',
        'The `git diff` between your first save point and tidied commit shows zero unrequested rewrites, and your throwaway edit was cleanly undone.',
        '`AGENTS.md` is under 50 lines and contains only instructions that change what a fresh session does.',
        'The workspace lives privately on your computer with fictional or public material only.',
      ],
      reflectionPrompts: [
        'Which line in your `AGENTS.md` changed the fresh session answer most, and which filler line did you cut?',
        'Which mistakes can Git undo in seconds, and which mistakes need permission boundaries instead?',
      ],
      checklist: [
        {
          id: 'first-commit',
          text: 'Initialized Git in `workspace/` and committed my Level 1 files first',
        },
        {
          id: 'workspace-organized',
          text: 'Added short `README.md` guides to `sources/`, `notes/` and `archive/`, and practised one Git undo',
        },
        {
          id: 'claude-md',
          text: 'Hand-wrote and tightened `AGENTS.md`, loading `@product-context.md`',
        },
        {
          id: 'fresh-test',
          text: 'Verified in a fresh session and `/memory` check that Wayfinder context and folder rules load cleanly',
        },
      ],
      mentorMove:
        'Sit together for the first fifteen minutes if setup feels unfamiliar: opening `workspace/` in a terminal or the desktop Code tab and making the first Git save point. At the end, watch them trigger one deliberate edit and undo it via Git.',
      soloMove:
        'Open a brand-new Claude Code session, paste no extra context, and ask three cold questions: what Wayfinder does, which itinerary rules must stay in deterministic code, and where a raw competitor blog post belongs. Wherever the answer guesses, tighten that line in `AGENTS.md` and retest in another fresh session.',
    },
    {
      id: 's6',
      levelId: 2,
      number: 6,
      title: 'Requirements by interview, then a prototype',
      difficulty: 'Intermediate',
      minutes: 90,
      tools: ['Claude Code', 'A web browser'],
      prerequisites: ['s5'],
      competencies: ['coding-agents', 'ux-prototyping'],
      xp: 125,
      mentorReview: 'recommended',
      practicalProof: true,
      goal: 'Use `grill-me` so your agent interviews you into a one-page `prototype/REQUIREMENTS.md` for Wayfinder, then build and steer a zero-build HTML, CSS and plain-JavaScript discovery probe for Session 10.',
      whyItMatters:
        'Ask an agent to "build Wayfinder" in one sentence and it will invent booking engines, social feeds and fake venue hours that look finished. Being interviewed first turns unspoken choices into explicit product decisions on one page. Building in plain static HTML, CSS and JavaScript lets you open `prototype/index.html` straight in any browser with zero package-manager setup.',
      learn: [
        {
          heading: 'Let your agent interview you first (grill-me)',
          paragraphs: [
            "Before any code is written, use Matt Pocock's `grill-me` pattern: ask your agent to read `product-context.md` and `notes/pitch-notes.md`, then question you **one decision at a time** until nothing needs to be guessed. Require a **recommended answer** with every question so you can confirm in a phrase or push back where your judgment differs.",
            'When you do not know an answer yet, say `I do not know`: it goes into **Open questions** as an assumption to test in Session 10 rather than an invented rule. Have the interview ask what evidence you have that group-chat weekend plans fail on venue closures, transit buffers or budget misunderstandings. You will reuse `grill-me` for your PRD in Session 12 and design spec in Session 13.',
          ],
        },
        {
          heading: 'One page, one Wayfinder job and three states',
          illustration: 'requirements',
          paragraphs: [
            "Keep `prototype/REQUIREMENTS.md` to one tight page. Because this prototype is a **throwaway discovery probe** rather than v1, scope it to Wayfinder's deterministic core screen, **Day Plan & Budget Split**: **turn candidate weekend stops into a timeline with verified venue hours, real door-to-door transit buffers and remaining per-person budget after booked stops**.",
          ],
          bullets: [
            '**Normal state**: chronological Saturday and Sunday stops with opening hours, transit minutes between stops, pinned group constraints (`tree-nut allergy`, `step-free` access), and `Left after booked stops (meals and local transit not included)`.',
            '**Empty state**: exact words shown when zero stops have been imported yet, prompting the organiser to add saved places so a blank itinerary never implies a ready plan.',
            '**Warning state**: calm plain-language copy plus an icon whenever a museum is closed on the chosen day, a harbour-ferry transfer buffer is too tight, or booked stops exceed the per-person weekend cap, never red colour alone.',
            '**Hard rules and out of scope**: zero-build static files (`index.html`, `styles.css`, `app.js`), fictional venues and prices in one plain-JS array, **JavaScript functions calculate every transit gap and budget figure** (never a model), a visible `"Prototype with fictional data"` banner, and no live APIs, card holds or group messaging.',
          ],
        },
        {
          heading: 'Zero-build static files, single-step commits and handoff notes',
          paragraphs: [
            'Create `prototype/` with three plain files (`index.html`, `styles.css` and `app.js`), initialize its own Git repository (`git init`) and short `AGENTS.md`, and add `prototype/` to `workspace/.gitignore` so your private workspace history stays separate when the probe goes public on GitHub in Session 7. No Node.js install, bundler or build step is needed: open `prototype/index.html` directly in your browser.',
            'Switch through normal, empty and warning states at laptop and phone width against `REQUIREMENTS.md`. Steer **one change at a time** with exact words, numbers or a pasted screenshot, refresh the browser, and commit each working fix. If an edit breaks layout or budget math, revert to the last commit rather than arguing with a tangled session.',
            'When a session grows long and starts forgetting rules or reintroducing fixed bugs, context compaction has set in. Ask for `prototype/HANDOFF.md` in under 40 lines written for a capable stranger (goal, file paths, working states, decisions and why, open questions and the next small step), then continue in a fresh session.',
          ],
        },
        {
          heading: 'Heads-up: start lining up Session 10 interviewees now',
          paragraphs: [
            'Recruiting real people takes calendar days, not an hour before class. Start reaching out now to line up **3 to 5 friends, colleagues or acquaintances who have organised a weekend group or family city trip** in the past year for 30-minute conversations ahead of [Session 10](/lessons/s10) (avoiding close family who will praise your homework). If schedules slip, Session 10 includes five checked-in Wayfinder interview snapshots (`P1.md` to `P5.md`) so you can keep moving.',
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
          'Scope Wayfinder to `Day Plan & Budget Split` across three states, get interviewed via `grill-me` into `prototype/REQUIREMENTS.md`, build a zero-build static HTML/CSS/JS probe, check the math by hand, and verify `HANDOFF.md`.',
        steps: [
          "**Think first (no AI):** Jot down Wayfinder's core probe job (`Day Plan & Budget Split`), what the normal, empty and warning states must display, and three items out of scope. Send messages today to line up 3 to 5 people who have planned a group weekend trip for Session 10.",
          '**Work with your agent:** In `workspace/`, ask Claude Code to `grill-me` one question at a time into a one-page `prototype/REQUIREMENTS.md`, adding `prototype/` to `workspace/.gitignore`. Start a fresh session inside `prototype/`, run `git init`, add a short `AGENTS.md`, and build a zero-build probe in `index.html`, `styles.css` and `app.js` with no packages or bundlers.',
          '**Check and try to break it:** Open `prototype/index.html` in your browser and switch through normal, empty and warning states at laptop and phone width. Check two booked-stop totals, remaining-budget figures and transit gaps by hand against the fictional data in `app.js`. Confirm the `"Prototype with fictional data"` banner and colour-independent warnings, committing one fix at a time.',
          '**Make the call:** Write `prototype/HANDOFF.md` in under 40 lines. Open a brand-new session that reads only `REQUIREMENTS.md` and `HANDOFF.md` to verify it names the right next step, then commit.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code',
        where:
          'First in workspace/ for the grill-me interview, then in a fresh session inside prototype/',
        briefChecklist: [
          'Context to read first: `product-context.md` and `notes/pitch-notes.md` so settled Wayfinder rules are not re-asked.',
          'Interview behaviour (`grill-me`): ask one question at a time, give a recommended answer with each, and capture `I do not know` under Open questions for Session 10.',
          'Tight discovery-probe scope: one page in `prototype/REQUIREMENTS.md` for `Day Plan & Budget Split` across three states (`normal`, `empty`, `warning`).',
          'Zero-build and deterministic rules: plain `index.html`, `styles.css` and `app.js` with zero npm packages, fictional itinerary data in one JS array, tested JS functions for all hours, transit buffers and budget math, and `"Left after booked stops (meals and local transit not included)"`.',
          'Repo isolation and handoff: ignore `prototype/` in `workspace/.gitignore`, give `prototype/` its own `git init` and `AGENTS.md`, and end with a `< 40`-line `prototype/HANDOFF.md`.',
        ],
        text: `Read product-context.md and notes/pitch-notes.md first. I want to build a small, throwaway Wayfinder discovery probe for user interviews in Session 10, scoped strictly to Day Plan & Budget Split: helping a group trip organiser check venue opening hours, door-to-door transit buffers and remaining per-person weekend budget after booked stops.

Use grill-me to interview me before writing any code:
1. Ask one question at a time, wait for my reply, and include your recommended answer with each question.
2. Cover normal, empty and warning states (closed venue, tight harbour-ferry transfer or over-cap stops, plus a simple scenario switcher for demos), fictional stops in app.js, deterministic JS math, pinned allergy and step-free badges, phone-width layout, and what is out of scope.
3. Ask what evidence I already have for this problem; anything I answer with "I do not know" goes under Open questions for Session 10 rather than being invented.

When we finish the interview, add prototype/ to workspace/.gitignore and show me a one-page prototype/REQUIREMENTS.md (Problem and job, Three states, Fictional data, Rules that must hold, Done-when math check, Out of scope, Open questions) before saving. Build the probe as zero-build static HTML, CSS and plain JavaScript (index.html, styles.css, app.js) that opens directly in any browser with no package installs or bundler.

---

Follow-up brief at the end of the build session:

Write prototype/HANDOFF.md in under 40 lines for a fresh session with zero chat history: Goal, Key file paths, Working states, Decisions made, Open questions for Session 10, Next steps, and How to open and verify.`,
      },
      expectedOutput: [
        'A one-page `prototype/REQUIREMENTS.md` covering `Day Plan & Budget Split`, three states (`normal`, `empty`, `warning`), deterministic calculation rules and open questions.',
        'A zero-build static HTML, CSS and plain-JavaScript probe in `prototype/` (`index.html`, `styles.css`, `app.js`) with its own Git repo, short `AGENTS.md` and visible `"Prototype with fictional data"` banner.',
        'Small, focused Git commits, one per verified fix.',
        'A `< 40`-line `prototype/HANDOFF.md` verified in a fresh session.',
      ],
      artifact:
        '`prototype/REQUIREMENTS.md`, a zero-build Wayfinder discovery probe in `prototype/` across normal, empty and warning states, and `prototype/HANDOFF.md`.',
      verification: [
        'Opening `prototype/index.html` directly in a browser renders normal, empty and warning states cleanly at laptop and phone width, pairing warning colours with text and icons.',
        'Two booked-stop totals, remaining-budget lines and transit-gap checks on screen match your hand calculation from `app.js`.',
        'Every item in `REQUIREMENTS.md` reflects a choice you made; unknowns sit under Open questions.',
        'A fresh session given only `REQUIREMENTS.md` and `HANDOFF.md` accurately states the next step, and `workspace/` `git status` ignores `prototype/`.',
      ],
      reflectionPrompts: [
        'Which `grill-me` question exposed an assumption you had not noticed in your pitch?',
        'What did clicking through the warning state at phone width reveal that written requirements missed?',
      ],
      checklist: [
        {
          id: 'requirements',
          text: 'Used `grill-me` to save a one-page `prototype/REQUIREMENTS.md` with three states and open questions',
        },
        {
          id: 'prototype-runs',
          text: 'Built the zero-build static Wayfinder probe (`index.html`, `styles.css`, `app.js`) across normal, empty and warning states',
        },
        {
          id: 'figures-checked',
          text: 'Verified two budget and transit-buffer calculations by hand and steered fixes one commit at a time',
        },
        {
          id: 'handoff',
          text: 'Wrote `prototype/HANDOFF.md` under 40 lines and verified it in a fresh session',
        },
      ],
      mentorMove:
        'Play the sceptical engineering lead for ten minutes: click through the Wayfinder probe on phone width and ask "what happens when..." questions (a museum closes early on bank holidays, two stops sit across a ferry, zero stops imported). Every gap becomes either one clear line in `REQUIREMENTS.md` or an open question for Session 10.',
      soloMove:
        'Open a fresh read-only Claude Code session in `prototype/` and ask it to read `REQUIREMENTS.md` like a sceptical frontend engineer: list five opening-hour, transit-buffer or budget edge cases where your spec is silent, without editing files. Decide for each whether to add one line to `REQUIREMENTS.md` or park it under Open questions.',
    },
    {
      id: 's7',
      levelId: 2,
      number: 7,
      title: 'GitHub, diffs and going live',
      difficulty: 'Intermediate',
      minutes: 90,
      tools: ['Claude Code', 'GitHub (free account)'],
      prerequisites: ['s6'],
      competencies: ['technical-collaboration', 'coding-agents'],
      xp: 125,
      mentorReview: 'recommended',
      practicalProof: true,
      goal: 'Answer one Wayfinder-relevant product question from a real public codebase with verified file paths, publish `product-prototype` on GitHub, review and merge one pull request, deploy via GitHub Pages from `main` (or share a 60-second recording), and file one reproducible bug issue.',
      whyItMatters:
        'GitHub is where product and engineering decisions meet in the open: commits, branches, pull request diffs and issues. A PM who can read a real codebase to verify how schedule or transit logic works, inspect a pull request diff with four plain questions and publish a zero-build static probe collaborates with engineers on evidence rather than guesswork.',
      learn: [
        {
          heading: 'Commits, branches and pull requests',
          illustration: 'git',
          paragraphs: [
            'A **repository** is a project folder with its full change history. A **commit** is a saved snapshot with a message explaining why it was made. A **branch** (`git switch -c`) lets you prepare an update without touching the working files on `main`, and a **pull request** (PR) proposes merging that branch into `main` so changes can be reviewed, discussed and reverted cleanly.',
            'Claude Code runs the Git and GitHub CLI commands ("create branch `deploy/readme-and-pages`", "push and open a pull request"). Your job is reading what changed on GitHub and deciding whether it earns its way onto `main`.',
          ],
        },
        {
          heading: 'Read a diff with four PM questions',
          illustration: 'diff',
          paragraphs: [
            "On GitHub's **Files changed** tab (`git diff`), removed lines show in red and added lines in green. You do not need to be a software engineer to review a pull request rigorously. Ask four PM questions on every diff, and never merge a change you cannot explain back in plain words:",
          ],
          bullets: [
            '**Does it match the description?** Every touched file should trace to what the pull request claims to do.',
            '**Was anything unexpected touched?** Challenge unrequested edits to Wayfinder budget or transit math in `app.js` or fictional stop records.',
            '**How will I verify it works?** UI changes need a phone-width browser check; calculations need a hand check against sample stops.',
            '**Are there any secrets or real data?** Public git history is permanent: fictional Wayfinder data only, never keys, `.env` files, real names or work emails.',
          ],
        },
        {
          heading: 'Read a real codebase before you guess',
          paragraphs: [
            'Coding agents are just as useful for reading unfamiliar code as for building prototypes. Before asking an engineer how something works or how hard a change might be, `git clone` or open a real public web-app repository **read-only** in a separate folder outside `workspace/` and ask one focused product question, such as how an open-source calendar, booking or trip-planning app checks opening-hour windows, timezone shifts or overlapping time buffers.',
            "Forbid edits and installs in your brief, require exact file paths for every claim and edge case, and **open at least two cited files yourself** to check that the actual source code matches the agent's summary.",
          ],
        },
        {
          heading: 'Publish from main with zero build config, then file one bug issue',
          paragraphs: [
            'Publish `prototype/` as a public `product-prototype` repository with an honest `README.md` stating the Wayfinder hypothesis and fictional-data status. Because `prototype/index.html` uses plain static HTML, CSS and JavaScript with relative file links (`./styles.css`, `./app.js`), publishing takes one dropdown click with zero YAML workflows: open **Settings > Pages**, set **Source** to **Deploy from a branch**, and pick **`main` / `(root)`** (if a merge ever breaks the live page, click **Revert** on the merged PR). Prefer not to turn on Pages? Keep the public repository and link a 60-second screen recording in `README.md` instead.',
            'Finish by clicking through your shared probe on a phone and filing **one reproducible bug issue** on your `product-prototype` repository (device, exact steps, expected vs actual) ready to fix in Session 8.',
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
          resourceId: 'github-about-prs',
          why: 'The official explanation of pull requests, reviews and merging, for when something on the PR page is unclear.',
          required: false,
        },
        {
          resourceId: 'github-pages-docs',
          why: 'The official guide to publishing a static site directly from a branch in GitHub Pages settings.',
          required: false,
        },
        {
          resourceId: 'vite-static-deploy',
          why: "Optional reference only if you later deploy a bundled web app rather than this session's zero-build static HTML files.",
          required: false,
        },
      ],
      task: {
        summary:
          'Answer one product question from a real public codebase read-only, publish `product-prototype` on GitHub, review and merge one pull request with the four PM questions, enable branch-based GitHub Pages (or link a recording), and file one bug issue.',
        steps: [
          '**Think first (no AI):** Authenticate GitHub via the [Starter kit](/starter-kit) if needed, and scan `prototype/` to confirm zero keys or personal details. Write one Wayfinder-relevant product question to ask of a real public web-app repository (such as how an open-source scheduling or map app validates time windows or buffers).',
          '**Work with your agent:** Clone that public repository outside `workspace/` with a strict read-only brief so Claude Code answers your question with exact file paths and edge cases. Next, push `prototype/` to a public `product-prototype` GitHub repo, run `git switch -c deploy/readme-and-pages`, add a clear `README.md` (checking relative `./` asset paths in `index.html`), and open one pull request.',
          "**Check and try to break it:** Open at least two cited files in the public repository yourself to verify the agent's summary against the code. Read every line of your pull request diff on GitHub using the four PM questions and leave one written review comment before merging.",
          '**Make the call:** Merge the pull request and turn on **Settings > Pages > Deploy from a branch (`main`)** (or link a 60-second walkthrough recording in `README.md`). Confirm the live link on a phone and file one reproducible bug issue on `product-prototype` for Session 8.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code',
        where:
          'First in a separate read-only folder for the public repo, then in prototype/ for your pull request',
        briefChecklist: [
          'Read-only codebase rules: forbid edits, package installs or git changes in the public repo, and require exact file paths and edge cases for your schedule or transit question.',
          'Pre-push privacy scan on `prototype/`: confirm `.gitignore` excludes `.env*` and OS scratch files, and check git history for keys, tokens or real personal details.',
          'Scoped branch: run `git switch -c deploy/readme-and-pages` without changing Wayfinder transit or budget logic unless fixing a relative `./` asset link.',
          'Clear `README.md` for zero-build hosting: summarise Wayfinder from `REQUIREMENTS.md`, state that all data is fictional, and note how to open `index.html` locally or view via GitHub Pages from `main` (or link your 60-second recording).',
          'PM-readable pull request: open one PR listing each changed file in one plain-English line and what you should verify before merging.',
        ],
        text: `Part 1 (in a separate folder holding a cloned public web-app repository):

Read-only investigation: do not edit files, install packages or run state-changing commands. Answer this product question in plain English for a PM: how does this codebase validate opening hours, recurring schedules or time buffers between events, and what edge cases can fail? Cite exact file paths and function names for every claim so I can open two files myself and verify them.

---

Part 2 (inside prototype/):

Check git status, git history and tracked files for secrets, emails or personal data, and confirm .gitignore excludes .env* files. Once clean, create a public GitHub repository named product-prototype and push main.

Then run git switch -c deploy/readme-and-pages:
1. Write README.md from REQUIREMENTS.md: one paragraph on the Wayfinder Day Plan & Budget Split discovery probe, a clear note that it is a zero-build throwaway prototype running on fictional data only, and how to open index.html or view the live page.
2. Confirm index.html uses relative paths (./styles.css and ./app.js) so GitHub Pages serves it directly from the main branch with no workflow YAML or build step. Do not touch calculation logic.
3. Commit, push and open one pull request explaining each changed file in one line for a PM reviewer.`,
      },
      expectedOutput: [
        'A short `notes/codebase-tour.md` note answering one Wayfinder-relevant product question from a real public codebase, with two cited files verified by you.',
        'A public `product-prototype` GitHub repository free of secrets and personal data.',
        'One reviewed and merged pull request with at least one comment on the diff.',
        'A working GitHub Pages URL deployed directly from `main` on a phone (or a 60-second recording linked in `README.md`) plus one reproducible bug issue filed on your repo.',
      ],
      artifact:
        'Public `product-prototype` repository with one merged pull request, a live branch-deployed URL or 60-second recording, one verified public-codebase answer and one filed bug issue.',
      verification: [
        'The two files you opened in the public codebase match what your agent claimed, and that repo remains untouched (`git status` is clean).',
        'Your merged PR diff touched only `README.md` (and relative asset paths if needed), with zero secrets or real data anywhere in git history.',
        'The live URL loads on a phone showing `"Prototype with fictional data"`, or your 60-second recording opens cleanly from `README.md`.',
        'Your filed GitHub issue includes device/width, steps to reproduce, expected behaviour and actual behaviour.',
      ],
      reflectionPrompts: [
        "What did opening the two real source files yourself clarify or correct in the agent's summary?",
        'Which of the four PM diff questions felt sharpest when reading your own pull request?',
      ],
      checklist: [
        {
          id: 'secrets-check',
          text: 'Scanned `prototype/` and its git history for keys and personal data before pushing',
        },
        {
          id: 'ruleset',
          text: 'Answered one Wayfinder-relevant product question from a real public codebase and verified two cited files myself',
        },
        {
          id: 'pr-merged',
          text: 'Read every line of the PR diff with the four PM questions, left a comment and merged',
        },
        {
          id: 'live-url',
          text: 'Confirmed the live GitHub Pages URL from `main` on a phone (or linked a 60-second recording) and filed one bug issue',
        },
      ],
      mentorMove:
        'Ask your mentor to review your pull request on GitHub with one concrete comment and one question before approving, then spend five minutes looking together at the two files you verified in the public codebase.',
      soloMove:
        'Step away for ten minutes, then open your pull request on GitHub and review every changed file aloud against the four PM questions, leaving at least one written review comment before merging. Verify your two public-codebase file paths line by line in the browser without asking the agent.',
    },
    {
      id: 's8',
      levelId: 2,
      number: 8,
      title: 'Review what agents build',
      difficulty: 'Intermediate',
      minutes: 90,
      tools: ['Claude Code', 'GitHub', 'A phone'],
      prerequisites: ['s7'],
      competencies: ['technical-collaboration', 'evals-safety'],
      xp: 125,
      mentorReview: 'recommended',
      safetyCritical: true,
      goal: 'Watch one person try your Wayfinder probe silently on a phone, run five WCAG AA checks, write `docs/review-checklist.md` in your own words, brief an independent fresh-session review, merge a verified bug fix and turn on GitHub secret protection.',
      whyItMatters:
        'Agent-built prototypes look finished long before they are trustworthy: a transit check can miss a 38-minute harbour ferry inside a 30-minute gap, a closed-venue alert can show only in red, or a budget label can hide that meals are excluded. Catching misleading defects now ensures Session 10 tests your Wayfinder idea rather than broken numbers.',
      learn: [
        {
          heading: 'Watch silently on a phone, then check the math',
          illustration: 'review',
          paragraphs: [
            'Hand your Wayfinder probe on a phone to one person (a friend or colleague is fine) and watch without guiding or explaining. Note where they hesitate, tap something that does nothing, or misread whether meals and metro rides are included in `Left after booked stops`. This checks whether the probe communicates clearly; Session 10 tests whether real group-trip planners actually have the underlying problem.',
            'Then check `REQUIREMENTS.md` yourself at laptop and phone width. Recalculate at least two stop totals, remaining-budget figures and transit gaps by hand from `app.js`, and try the boundary cases agents routinely miss: zero stops imported, a Monday museum closure, back-to-back stops across a ferry, a long venue name with dietary tags, and booked stops exceeding the weekend cap.',
          ],
        },
        {
          heading: 'Five WCAG AA accessibility checks',
          paragraphs: [
            "Filter the WCAG quick reference to levels A and AA and run five practical checks across Wayfinder's normal, empty and warning states:",
          ],
          bullets: [
            '**Keyboard only**: can you reach and trigger every scenario button and stop card with `Tab` and `Enter`, and see a clear focus indicator?',
            '**Colour alone**: is any closed-venue, tight-transfer or over-budget warning shown only by red text or a coloured dot? Pair colour with explicit words and an icon.',
            '**Contrast**: is secondary grey text, such as venue hours, transit minutes and `"meals and local transit not included"`, easy to read on a phone screen?',
            '**Labels**: does every button, scenario switcher and filter control have a clear accessible name?',
            '**200% zoom**: at 200% zoom, does the timeline stay usable without sideways scrolling or clipped budget figures?',
          ],
        },
        {
          heading: 'Turn your own checklist into a fresh-session review',
          paragraphs: [
            'Never ask the session that wrote a fix to review its own work: it remembers what it meant to write, not what is on the branch. Write a one-page `docs/review-checklist.md` in your own words first, then open a **brand-new read-only session** on your fix branch and brief it from your checklist to review the `git diff` against `main`.',
            'Prioritise defects that mislead users first: wrong budget math, missed tight-transfer flags or colour-only warnings come before spacing polish. Start every fix from a reproducible bug report (device, exact steps, expected vs actual), and verify calculation changes against at least two fictional scenarios (a three-line plain-JavaScript assertion check in `check.js` or your browser console works cleanly without installing a test framework). Evaluate every agent review comment against `REQUIREMENTS.md`, record `Fixed`, `Rejected (with reason)` or `Issue filed` in `docs/review-log.md`, and remember an agent review never replaces human sign-off on production systems.',
          ],
        },
        {
          heading: 'Secret scanning and the revocation rule',
          paragraphs: [
            "Bots scan public GitHub repositories within minutes, and deleting a key in a new commit leaves it exposed in git history. Keep `.env` files in `.gitignore`, turn on **Secret scanning** and **Push protection** in your repository's security settings, keep real personal data out forever, and remember the one emergency rule if a credential ever leaks: **revoke it at the provider first**, then clean up the repository.",
          ],
        },
      ],
      resources: [
        {
          resourceId: 'aihero-code-review',
          why: 'A practitioner view of agent code review on two axes: does the change follow the conventions, and does it match the spec.',
          required: false,
        },
        {
          resourceId: 'claude-code-in-action',
          why: 'The official course for people who already use Claude Code: steering longer sessions, `CLAUDE.md`, and code review on GitHub. Skip the parts on hooks and headless runs.',
          required: false,
        },
        {
          resourceId: 'ai-fluency-builders',
          why: "Continue AI Fluency for builders with Discernment for code and Discernment for user experience, which match this session's review.",
          required: false,
        },
        {
          resourceId: 'claude-code-review-post',
          why: "Anthropic's account of its own review practice, where an agent reviews every pull request and human depth scales with risk. A vendor describing its own tool: read it as one company's example, not proof.",
          required: false,
        },
        {
          resourceId: 'wcag-quickref',
          why: 'The official accessibility checklist. Filter to levels A and AA to keep it manageable.',
          required: false,
        },
      ],
      task: {
        summary:
          'Watch one person try Wayfinder on a phone, run the five accessibility and math checks, write `docs/review-checklist.md` in your own words, run an independent fresh-session review on a bug fix, and turn on secret protection.',
        steps: [
          '**Think first (no AI):** Watch one person try your Wayfinder probe on a phone without helping. Run the five WCAG AA checks across normal, empty and warning states, and hand-check two remaining-budget and transit-gap calculations against `app.js`. Write a one-page `docs/review-checklist.md` in your own words.',
          '**Work with your agent:** Log confirmed bugs in `docs/review-log.md`, starting with your Session 7 issue and any misleading math or warning defect. On a new branch, have Claude Code fix at least one defect (or a labelled seeded defect if none appeared) and open a pull request. Open a separate fresh read-only session to review the diff against `docs/review-checklist.md`.',
          '**Check and try to break it:** Test the fix in your browser at phone width and check any touched calculation across two scenarios by hand. Compare every fresh-session review comment against `REQUIREMENTS.md` to separate genuine bugs from invented scope. Enable **Secret scanning** and **Push protection** on GitHub and check git history.',
          '**Make the call:** Log `Fixed`, `Rejected (with reason)` or `Issue filed` for every review comment in `docs/review-log.md`. Merge your pull request once the diff passes your checklist, and confirm the updated live page.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code',
        where:
          'In a fresh read-only session inside prototype/, on the branch of your open bug-fix pull request',
        briefChecklist: [
          'Fresh, read-only stance: tell the session it did not write this branch, must inspect `git diff main`, and must not edit any files.',
          'Context to load first: `AGENTS.md`, `REQUIREMENTS.md`, your own `docs/review-checklist.md` and the pull request description.',
          'Wayfinder math and state checks: hand-verify any touched stop price, remaining budget or transit-buffer calculation across two scenarios in `app.js`, and verify normal, empty and warning states.',
          'Accessibility and privacy checks: check the five WCAG AA items (especially colour-only closed-venue or tight-transfer warnings) plus secrets, personal data and unrequested third-party scripts.',
          'Review table format: ask for severity (`blocker`, `should-fix`, `nit`), file and line, and a plain-English risk summary so you can log `Fixed`, `Rejected (with reason)` or `Issue filed`.',
        ],
        text: `You are reviewing the git diff on this branch against main in a fresh session. Do not edit any files.

Read AGENTS.md, REQUIREMENTS.md, docs/review-checklist.md and the open pull request description first.

Evaluate the change strictly against docs/review-checklist.md and REQUIREMENTS.md, without inventing new v1 features:
1. Spec and Wayfinder math: does the diff fix the reported bug without breaking normal, empty or warning states? Verify any touched venue-hour, transit-buffer or remaining-budget logic against two scenarios in app.js.
2. Scope: flag any modified file or external script not explained by the pull request description.
3. Accessibility: check keyboard focus, colour-only transfer or closure warnings, text contrast, accessible labels and 200% zoom layout risks.
4. Secrets and privacy: scan the diff for keys, tokens, .env files, external network calls or real personal data.

Return a concise table with severity (blocker, should-fix, nit), file and line, finding, and how to verify if uncertain, followed by three plain-English sentences for a PM on how risky this merge is.`,
      },
      expectedOutput: [
        '`docs/review-checklist.md` written in your own words on one page.',
        '`docs/review-log.md` containing reproducible bug reports, fresh-session review comments and a recorded `Fixed`, `Rejected (with reason)` or `Issue filed` call for each.',
        'At least one verified bug fix merged via pull request and checked across two fictional scenarios.',
        'GitHub secret scanning and push protection enabled, with a clean repository history.',
      ],
      artifact:
        '`docs/review-checklist.md`, `docs/review-log.md` with review decisions, and a reviewed bug-fix pull request.',
      verification: [
        'Every comment from the fresh-session review has an explicit `Fixed`, `Rejected (with reason)` or `Issue filed` entry in `docs/review-log.md`.',
        'Each logged bug includes device/width, steps to reproduce, expected vs actual results, and a hand or plain-JS scenario check if calculations changed.',
        'The Wayfinder probe passes all five WCAG AA checks across normal, empty and warning states on phone width.',
        'Secret scanning and push protection are active on GitHub, and git history contains zero credentials or personal data.',
      ],
      reflectionPrompts: [
        'Which comment from the fresh-session review did you reject, and how did `REQUIREMENTS.md` make that call easy?',
        'What did silent phone observation reveal that clicking through on your laptop missed?',
      ],
      checklist: [
        {
          id: 'user-test',
          text: 'Watched at least one person use the Wayfinder probe silently on a phone',
        },
        {
          id: 'a11y-checks',
          text: 'Ran the five WCAG AA accessibility and hand-math checks, and wrote `docs/review-checklist.md`',
        },
        {
          id: 'agent-review',
          text: 'Merged a verified bug-fix PR after an independent fresh-session review logged in `docs/review-log.md`',
        },
        {
          id: 'no-secrets',
          text: 'Enabled GitHub secret scanning and push protection and verified a clean git history',
        },
      ],
      mentorMove:
        'Ask your mentor to review your highest-risk bug-fix pull request (especially anything touching remaining-budget math or transit-buffer warnings) and think aloud about what they inspect first versus what they trust an agent review to catch.',
      soloMove:
        'Review your bug-fix diff manually with the four PM questions before opening the fresh-session agent review, then compare both lists side by side. Verify every `blocker` or `should-fix` in the browser or `app.js` yourself, and record at least one explicit scope judgment in `docs/review-log.md`.',
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
        "Go deeper than Session 7's single product question: trace a user-facing scheduling, calendar or itinerary feature end to end across UI, domain logic, storage and automated tests in a multi-module open-source codebase without changing a line, and prepare three architecture trade-off questions for an engineer.",
      steps: [
        'Pick an actively maintained open-source web product with multiple modules and an automated test suite (such as a scheduling tool, calendar app or trip planner) and clone it into a read-only folder outside `workspace/`.',
        'Choose one end-to-end flow to trace (for example, checking opening-hour availability and buffer gaps when adding an event) before asking your agent anything.',
        'Brief Claude Code strictly read-only (no edits, installs or state-changing commands) to map that flow from UI component to domain logic, storage schema and test suite, saving `notes/codebase-brief.md` with exact file paths and noting where tight coupling would make changes risky.',
        'Open at least three cited source and test files yourself to confirm the trace holds up, spot one edge case the tests do not cover, and correct any overstatement in `notes/codebase-brief.md`.',
        'Write three engineering trade-off questions across module boundaries, naming the exact files in `notes/codebase-brief.md` that prompted each question.',
      ],
      deliverable:
        'A one-page `notes/codebase-brief.md` tracing one feature across UI, domain logic, storage and tests with verified file paths, one untested edge case, and three trade-off questions for an engineer.',
      verification: [
        'Every architectural claim and test gap in `notes/codebase-brief.md` cites an exact file path, and the three files you opened match.',
        'Nothing in the cloned repository was edited or installed (`git status` is clean).',
        'All three questions probe cross-module trade-offs, coupling or missing test coverage rather than facts already in the README.',
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
        'Collect three bug reports about your Wayfinder prototype, from `docs/review-log.md` or from a new tester.',
        'Open each as a GitHub issue in `product-prototype`: a clear title, the device, steps to reproduce, expected and actual results, a screenshot and a severity.',
        'For the first issue, start a fresh Claude Code session in `prototype/` and ask it to read the issue, reproduce the bug, explain the cause, fix it on a new branch and open a pull request that says "Fixes #" followed by the issue number.',
        'Review the pull request: read the diff with the four questions from Session 7, run the review prompt from Session 8 in another fresh session, and check the fix in your browser.',
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
        'A pull request says "Fix the date label on the first screen", but the diff also changes the code that works out totals, transit buffers and status rules. What do you do?',
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
        'Your prototype marks a problem, such as a tight ferry transfer, a closed venue or an over-budget warning, only by turning its text red. Which fix meets accessibility basics?',
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
    title: 'Level 2 sign-off: discovery probe',
    brief:
      'This is a 15 to 20 minute sign-off review, not a 5-hour rebuild. Check the artefacts you already created in Sessions 5 to 8: `workspace/AGENTS.md`, `prototype/REQUIREMENTS.md`, your public `product-prototype` repository with its merged pull request and public-codebase note, your live GitHub Pages link (or 60-second recording), and `docs/review-checklist.md` plus `docs/review-log.md`. Confirm that every decision, figure and review call came from you rather than unchecked agent output.',
    deliverables: [
      {
        id: 'workspace',
        text: '`workspace/AGENTS.md` (Session 5) is under Git, loads `@product-context.md`, and guides `sources/`, `notes/` and `archive/`.',
      },
      {
        id: 'requirements',
        text: '`prototype/REQUIREMENTS.md` (Session 6) fits on one page, scopes Wayfinder `Day Plan & Budget Split` across normal, empty and warning states, and lists open questions.',
      },
      {
        id: 'repo',
        text: 'Public `product-prototype` repository (Session 7) with zero-build static files, one merged pull request, `HANDOFF.md`, one filed bug issue, and your verified public-codebase note.',
      },
      {
        id: 'live',
        text: 'Live GitHub Pages URL deployed from `main` working on a phone (or a 60-second walkthrough recording linked in `README.md`), showing the `"Prototype with fictional data"` banner.',
      },
      {
        id: 'review-log',
        text: '`docs/review-checklist.md` in your own words and `docs/review-log.md` (Session 8) with `Fixed`, `Rejected (with reason)` or `Issue filed` recorded per comment.',
      },
      {
        id: 'fixes',
        text: 'At least one verified defect fix merged via pull request (checked across two scenarios if math changed, or a labelled local seeded-bug exercise) and secret scanning enabled.',
      },
      {
        id: 'mentor-walkthrough',
        text: 'Optional mentor walkthrough (or a written solo self-review) of one pull request: what changed, how you checked the math and one agent comment you rejected.',
      },
    ],
    rubric: {
      correctness:
        'Normal, empty and warning states work at phone width; remaining-budget and transit-gap figures match hand calculations from `app.js`; fixes match their bug reports.',
      quality:
        'One-page requirements contain no invented features; pull requests stay small; all five WCAG AA checks pass; `AGENTS.md` and `HANDOFF.md` stay concise.',
      independence:
        'You wrote your own briefs, steered via browser checks, verified real codebase paths yourself, and used fresh sessions with handoff notes before context rot.',
      judgment:
        'You can explain every merged diff, rejected at least one out-of-scope agent comment with a reason, and kept private notes and secrets out of GitHub.',
    },
    privacyNote:
      'The `product-prototype` repository is public: fictional Wayfinder data only, no interview notes, no real names, no employer material, and never a key or token. Your `workspace/` stays private on your own computer. The Academy stores only your checklist, reflections and the paths you type, never the files themselves.',
    minutes: 20,
    xp: 175,
  },
  nextRecommendation:
    'Move to Level 3, where your discovery probe meets strategy, real user interviews, funnel data and a PRD. Heads-up for Session 10: line up 3 to 5 people who have organised a weekend group or family city trip for 30-minute conversations ahead of time (or target users for your own product). If recruitment falls through, Session 10 includes five checked-in Wayfinder practice interview notes (`P1.md` to `P5.md`) so you can keep moving.',
}
