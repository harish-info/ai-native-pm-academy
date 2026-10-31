import type { Level } from '../types'

export const level2: Level = {
  id: 2,
  slug: 'second-brain',
  title: 'Second Brain and Context Engineering',
  theme: 'Build a personal knowledge system that AI agents can use',
  summary:
    'Build a private, Markdown-based wiki that an agent maintains under your review: raw sources that never change, a wiki layer of goals, decisions, learning and projects, and a schema file that tells every agent how the place works. Along the way you learn the ideas behind every serious knowledge product: retrieval, RAG, freshness, ownership, contradictions, compaction and handoffs. You finish with a second brain you will keep using after February.',
  outcomes: [
    'Run a private second brain with three clear layers: raw sources, an agent-maintained wiki and a schema file.',
    'Use Claude Code or Codex to ingest sources, answer questions with verifiable citations and keep the wiki healthy.',
    'Write AGENTS.md instructions, with explicit triggers, that make any agent useful from its first message, and know where each tool looks for them.',
    'Explain retrieval, RAG, freshness, ownership and compaction well enough to shape a team knowledge strategy.',
    'Hand work between agent sessions and tools without losing context, and test that it works.',
  ],
  badge: {
    name: 'Context Architect',
    description:
      'Built a living second brain that a fresh AI agent can pick up and use, and can explain why it works and where it can fail.',
  },
  lessons: [
    {
      id: 's5',
      levelId: 2,
      number: 5,
      title: 'Create your private personal wiki',
      difficulty: 'Intermediate',
      minutes: 90,
      tools: ['Claude Code or Codex', 'Terminal', 'Obsidian (optional)', 'Git'],
      prerequisites: ['s3', 's4'],
      competencies: ['knowledge-management', 'technical-collaboration'],
      xp: 150,
      mentorReview: 'recommended',
      practicalProof: true,
      goal: 'Set up `~/second-brain` as a private, structured Markdown wiki with three clear layers, a catalog, a log, starter content and version history.',
      whyItMatters:
        'An agent is only as useful as the context it can reach. A plain-folder wiki on your own machine is the simplest knowledge system that works with every AI tool you have and every tool that comes next. Product teams are building the same thing at a larger scale, so building your own is the fastest way to learn why team knowledge bases succeed or rot.',
      learn: [
        {
          heading: 'Why plain folders and Markdown come first',
          paragraphs: [
            'Coding agents such as Claude Code and Codex read and write files natively, search them with simple tools and show you exactly what they changed. Obsidian can display the same folder as a linked knowledge base. Git gives you history and undo. None of this locks you into a vendor.',
            'Vector databases and enterprise RAG platforms solve problems of scale and fuzzy search across thousands of documents. With a few hundred notes you do not have those problems yet, and adding that machinery early hides how retrieval really works. Start simple, and add search tooling only when you can name the failure it fixes.',
          ],
        },
        {
          heading: 'Three layers, and a purpose for every folder',
          paragraphs: [
            'A robust agent-maintained wiki has three layers. **Raw sources** are the original material: articles, transcripts, exports. They land in `00-inbox/` and are never edited, so you can always go back to what was actually said. The **wiki layer** is the set of pages the agent writes and updates under your review. The **schema** is `AGENTS.md`: the conventions, structure and rules every agent follows, which evolves as you learn.',
            'People usually abandon wikis because upkeep grows faster than value. Agents change that equation: filing, cross-linking and tidying become cheap. They only stay cheap if the conventions are explicit, which is what the schema is for.',
          ],
          bullets: [
            '`00-inbox/`: raw sources, unedited. Ingested files may move to `00-inbox/ingested/`.',
            '`goals/`, `learning/`, `ideas/`, `decisions/`, `reflections/weekly/`, `projects/`, `reading/`, `resources/`: the wiki layer.',
            '`.agents/skills/` and `templates/`: mechanism, meaning how work gets done, kept separate from the notes themselves. The folder name matters: agents only discover skills in the places they are built to look (Session 7).',
            '`AGENTS.md`: the schema. Codex, Copilot and Claude Code all read it; Claude Code only needs a separate `CLAUDE.md` if you want Claude-specific rules.',
          ],
        },
        {
          heading: 'index.md and log.md: the two files that make it navigable',
          paragraphs: [
            '`index.md` at the root is a catalog with one line per page: link, type and a one-line summary. Agents read it first when answering a question, then open only the pages they need. This simple pattern works well without embeddings up to roughly a hundred sources, which covers most personal wikis for a long time.',
            '`log.md` is an append-only record of what happened, one heading per event in a fixed format such as `## [2026-11-09] ingest | Article title`. Because the format never changes, you and any agent can search it with a single text search, see what changed recently and spot gaps.',
          ],
        },
        {
          heading: 'Check who approves what before the agent touches a file',
          paragraphs: [
            'Do not assume an agent will ask before it acts. Recent versions of Claude Code start in **auto mode**, where a safety classifier approves most actions instead of you, and the Codex **Auto** preset edits files and runs commands inside the folder without asking. Both are reasonable defaults for experienced users and both are wrong for your first week.',
            'For this level, pick a mode that shows you each change. In Claude Code, press Shift+Tab to cycle modes until it shows the one that asks before edits, or use plan mode to get a plan with no edits at all. In Codex, choose the Read-only preset while you explore and switch to Auto only for a task you will review. Whatever the mode, your real safety net is git: commit before a task, read `git diff` after it, and undo anything you did not want.',
          ],
        },
        {
          heading: 'Private by design, with just enough git',
          paragraphs: [
            'The wiki lives on your computer. Never put it inside the public Academy repository, and never add customer data, credentials or employer-confidential material. Keep it slim on personal data about other people, too: write about your decisions and learning, not about colleagues. Remember that when an agent reads a file, its contents are sent to the model provider, so check the data settings of the tools you use.',
            'Git gives you save points. `git init` starts history, `git add` stages changes, `git commit -m "message"` saves a snapshot and `git diff` shows exactly what an agent changed before you accept it. If you want an off-machine backup, use a private repository only.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'karpathy-llm-wiki',
          why: 'The clearest short description of the agent-maintained wiki pattern this level is built on: raw sources, a wiki layer, a schema, and ingest, query and lint operations.',
          required: true,
        },
        {
          resourceId: 'claude-code-101',
          why: 'Gets you comfortable starting, steering and approving changes in Claude Code, which you use for the rest of the course.',
          required: true,
        },
        {
          resourceId: 'vellotti-product-os',
          why: 'A working example of a folder-based personal operating system for PM work. Borrow ideas; do not copy it wholesale.',
          required: false,
        },
        {
          resourceId: 'obsidian',
          why: 'An optional, free-for-personal-use interface for browsing and linking the same Markdown files.',
          required: false,
        },
      ],
      task: {
        summary:
          'Scaffold `~/second-brain` with an agent, migrate your Level 1 material, write real starter content and make your first commit.',
        steps: [
          'Confirm Claude Code or Codex runs in your terminal. If installation is new to you, do this step with your mentor. If neither is available, Google Antigravity or GitHub Copilot on a free plan can run the same prompts, but check their docs for where they read instructions and skills.',
          'Check the permission mode before you start: switch to the mode that asks before edits (Claude Code) or the Read-only preset (Codex), and write down which mode you used.',
          'Read the LLM Wiki gist and write three bullets on how its three layers map onto the folders in this lesson.',
          'Create `~/second-brain` (or reuse the folder from Level 1), start the agent inside it and run the scaffolding prompt below. Approve the plan before anything is created.',
          'Migrate your Level 1 material: originals stay unedited in `00-inbox/`, notes go to `learning/`, reflections to `reflections/weekly/`. Ask the agent to build the root `index.md` and add one `log.md` entry per migrated item.',
          "Write real starter content: three goals (personal, professional, learning), two recent decisions (for example how you are using this learning month), five ideas and three reading notes. Keep other people's personal details out.",
          'Run `git init` and make a first commit. If the agent proposes the commands, read each one and say what it does before approving it.',
          'Optional: open `~/second-brain` as an Obsidian vault and check that links between notes work.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code or Codex',
        where: 'Started inside ~/second-brain on your own computer',
        text: `You are setting up my private personal wiki in the current folder (~/second-brain). It is a knowledge base for an experienced product manager and must work with any AI agent and with Obsidian.

Use three layers:
- Raw sources in 00-inbox/: never edited. Ingested files may move to 00-inbox/ingested/.
- Wiki pages in goals/, learning/, ideas/, decisions/, reflections/weekly/, projects/, reading/, resources/.
- Mechanism in .agents/skills/ and templates/, kept separate from notes.

Create:
1. Each folder above, with a README.md stating in 1-2 sentences what belongs there and what does not.
2. index.md at the root: one line per page, format "- [Title](path) | type | one-line summary".
3. log.md at the root: append-only, each entry a heading "## [YYYY-MM-DD] action | Title" followed by one line. Add an entry for this setup.
4. Templates in templates/, each with front matter (title, type, status, updated, sources) and fixed headings:
   - page.md: Summary, Details, Sources, Related
   - decision.md: Context, Options, Decision, Why, What would change my mind, Review date, Status (active or superseded by link)
   - reading-note.md: Source, Key ideas, My take, Quotes, Related
   - project.md: Goal, Status, Next steps, Open questions, Decisions, Links
   - weekly-reflection.md: Summary, Priorities check, Open questions, Reflection, Next week

Rules:
- Show the full plan (folders and files) and wait for my approval before creating anything.
- Do not move, rename or delete existing files without asking.
- Plain Markdown, file names lowercase-with-hyphens, dates YYYY-MM-DD.
- When done, show the tree, then suggest git commands to initialize a repository and make a first commit, explaining each in one line. Do not add a remote.`,
      },
      expectedOutput: [
        'A folder tree with all sections, a README in each, root index.md and log.md.',
        'Five templates with front matter and fixed headings.',
        'At least thirteen real starter notes plus your migrated Level 1 material.',
        'A first git commit.',
      ],
      artifact:
        'A private ~/second-brain wiki with three layers, index.md, log.md, templates, starter content and a first commit.',
      verification: [
        'Listing the folder shows every section, and each README explains its purpose in one or two sentences.',
        'index.md has one line for every wiki page you created, and every link opens.',
        'log.md entries all follow the exact `## [YYYY-MM-DD] action | Title` format.',
        '`git log` shows your first commit, and `git remote -v` shows nothing or only a private repository.',
        'The folder is not inside the Academy repository or any shared or public location.',
      ],
      reflectionPrompts: [
        'Which folder was hardest to define a purpose for, and what does that say about how you think?',
        "How did it feel to approve an agent's plan before it touched your files?",
        'What will you deliberately keep out of this wiki, and why?',
      ],
      checklist: [
        {
          id: 'agent-running',
          text: 'Started Claude Code or Codex inside ~/second-brain in a mode that asks before edits',
        },
        {
          id: 'structure',
          text: 'Created all sections with READMEs, index.md, log.md and templates after approving a plan',
        },
        { id: 'migrated', text: 'Migrated Level 1 material with originals unedited in 00-inbox/' },
        { id: 'starter-content', text: 'Wrote at least thirteen real starter notes' },
        { id: 'git-commit', text: 'Made a first git commit and checked there is no public remote' },
        {
          id: 'privacy-check',
          text: "Confirmed no customer, employer-confidential or other people's personal data is in the wiki",
        },
      ],
      mentorMove:
        'Sit with her for the first terminal session: starting the agent, checking the permission mode, approving a file write and reading a diff. Then hand over the keyboard for the rest of the session and only answer questions.',
    },
    {
      id: 's6',
      levelId: 2,
      number: 6,
      title: 'Ingest and query: an agent as your librarian',
      difficulty: 'Intermediate',
      minutes: 90,
      tools: ['Claude Code or Codex', 'Git', 'Obsidian (optional)'],
      prerequisites: ['s5'],
      competencies: ['knowledge-management', 'coding-agents', 'prompting-context'],
      xp: 150,
      mentorReview: 'optional',
      goal: 'Use a coding agent to ingest raw sources into your wiki and answer questions with citations you can verify, while you stay in control of every write.',
      whyItMatters:
        "Retrieval and grounding sit at the core of every knowledge product, from a personal wiki to a bank's internal assistant. Doing it by hand with an agent shows exactly where retrieval works and where it fails. That is the judgment you need when a vendor pitches an enterprise RAG platform or a team asks to point an assistant at its documents.",
      learn: [
        {
          heading: 'Ingest: one source, several pages touched',
          paragraphs: [
            'Ingesting a source means more than summarizing it. The agent reads the raw file, writes a summary page using your template, updates the existing pages the source affects (a goal, a project, a decision), adds the new page to `index.md` and appends an entry to `log.md`. The raw source itself is never edited.',
            'Contradictions are cheapest to resolve at write time. If a new source conflicts with an existing page, the agent should flag it and propose which claim stands. The older claim is closed, not deleted: mark it superseded and link to the newer page, so the history of your thinking survives.',
          ],
        },
        {
          heading: 'Query: how an agent actually finds things',
          paragraphs: [
            'A coding agent answers questions about your wiki by reading `index.md`, searching file names and contents for keywords, and opening the pages that look relevant. This works well when titles and wording are consistent, and fails when the same idea appears under different words. Clear titles, summaries in the index and consistent tags are retrieval infrastructure.',
            "When an answer is genuinely useful, file it back as a new page and add it to the index. That is how the wiki compounds: today's good answer becomes tomorrow's source.",
          ],
        },
        {
          heading: 'RAG in one page',
          paragraphs: [
            "Retrieval-augmented generation means retrieving relevant material, placing it in the model's context and generating an answer grounded in it. Enterprise systems split documents into chunks, turn them into embeddings (numerical representations of meaning) to find similar passages, often combine that with keyword search, and rerank the results.",
            'You do not need to build one. You need to recognize its failure modes, because they are the same in your wiki and in a bank-wide assistant.',
          ],
          bullets: [
            'The wrong chunk is retrieved, so the answer is confidently off-topic.',
            'The right chunk is missing, so the model fills the gap from general knowledge.',
            'A stale chunk is retrieved, so the answer is correct for last year.',
            'A chunk is retrieved without its context, so a caveat or exception is lost.',
          ],
        },
        {
          heading: 'Trust is the hard part, not retrieval',
          paragraphs: [
            'Practitioners who run agent-maintained knowledge bases report the same thing: finding text is easy, trusting answers is hard. Require a file path and a short quote for every claim, then check that the quote really exists in that file. Answers that cite real files but misquote them are more dangerous than answers that cite nothing.',
            'Gate every write behind human review: plan first, then `git diff` before you commit. Asking the agent to wait for approval is an instruction, not a lock, so the diff is the check that cannot be skipped. Summaries also lose information by design, so state the audience and purpose and ask the agent what it left out.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'anthropic-context-engineering',
          why: 'Explains how agents use limited context, why curation beats volume and how retrieval fits in, from the people who build the models.',
          required: true,
        },
        {
          resourceId: 'karpathy-llm-wiki',
          why: 'Reread the ingest and query operations before running them on your own wiki.',
          required: false,
        },
        {
          resourceId: 'claude-code-in-action',
          why: 'Deeper practice steering Claude Code on real files, including reviewing and approving its changes.',
          required: false,
        },
        {
          resourceId: 'vishal-ai-native-pm-os',
          why: 'Another practitioner example of an AI-native PM knowledge setup, useful for comparing conventions.',
          required: false,
        },
      ],
      task: {
        summary:
          'Ingest at least ten raw sources, ask five questions only your notes can answer, verify every citation and file one answer back into the wiki.',
        steps: [
          'Add at least ten raw items to `00-inbox/`: saved articles, a voice-note transcript, meeting-free personal notes, half-formed thoughts, links with a sentence on why they matter.',
          'Ingest three items one at a time with the prompt below. Approve each plan, then read `git diff` before committing.',
          'Ingest the remaining items as a batch using the plan table. Spot-check three of the resulting pages against their raw sources.',
          'Ask five questions only your notes can answer, such as "What did I decide about my learning time and why?". Require a file path and a quote for every claim.',
          'Open every cited file and confirm each quote exists word for word. Record any misquote or retrieval miss in a retrieval log.',
          'Ask one question whose answer is not in your notes. The correct response is "Not in your notes."',
          'File one good answer back as a new page, add it to `index.md`, append to `log.md` and commit.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code or Codex',
        where: 'Started inside ~/second-brain',
        text: `Act as the librarian of this wiki. Read AGENTS.md (if present), index.md and the folder READMEs first.

INGEST (one source or a batch):
1. For each file in 00-inbox/ that has not been ingested, propose in a table: new page path, title, type, tags, one-line summary, existing pages it should update, and any contradiction with existing pages.
2. Wait for my approval.
3. Then: write the page using the matching template in templates/, update the affected pages, add the page to index.md, append "## [YYYY-MM-DD] ingest | Title" with one line to log.md, and move the raw file to 00-inbox/ingested/ without editing it.
4. If a source contradicts an existing page, do not choose silently. Show both claims with dates and propose which stands. Mark the losing claim "Superseded by [link]" instead of deleting it.

QUERY (I will ask one question at a time):
- Read index.md first, then open only the pages you need.
- Answer only from files in this folder. After every claim, cite the file path and a short exact quote.
- If the answer is not in my notes, reply exactly "Not in your notes." and suggest where such a page would belong.
- If notes disagree, show both with dates.

Never edit raw sources, never delete pages, and show me git diff --stat before I commit.`,
      },
      expectedOutput: [
        'At least ten ingested sources, each with a wiki page, index entry and log entry.',
        'A retrieval log: five questions, the cited files and quotes, and any misses or misquotes.',
        'One answer filed back as a new wiki page.',
      ],
      artifact:
        'A retrieval log of five cited answers with verified quotes, one correct "Not in your notes.", and an ingested inbox.',
      verification: [
        'Every quote in the five answers exists word for word in the cited file.',
        'The out-of-scope question got "Not in your notes." rather than an invented answer.',
        'Raw sources in 00-inbox/ingested/ are byte-for-byte unchanged (git shows them as moved, not modified).',
        'Every new page appears in index.md and has a matching log.md entry.',
      ],
      reflectionPrompts: [
        'Where did retrieval fail, and was it a naming problem, a missing note or a misquote?',
        'How much would you trust this setup for a decision that matters, and what would raise that trust?',
        'What did reviewing every diff teach you about how the agent behaves?',
      ],
      checklist: [
        { id: 'ten-sources', text: 'Ingested at least ten raw sources with plan approval' },
        { id: 'diff-reviewed', text: 'Reviewed git diff before every commit' },
        { id: 'five-questions', text: 'Asked five questions and required file paths and quotes' },
        {
          id: 'quotes-checked',
          text: 'Opened every cited file and checked each quote word for word',
        },
        { id: 'not-in-notes', text: 'Tested a question the notes cannot answer' },
        { id: 'filed-back', text: 'Filed one answer back as a page and committed' },
      ],
      mentorMove:
        'Give her one question whose answer is phrased differently in her notes than in the question, and let her discover the retrieval miss. Then explain in five minutes how embeddings would help with that, and where they would still fail.',
    },
    {
      id: 's7',
      levelId: 2,
      number: 7,
      title: 'Schema, goals, decisions and your first skills',
      difficulty: 'Intermediate',
      minutes: 100,
      tools: ['Claude Code or Codex', 'A text editor'],
      prerequisites: ['s6'],
      competencies: ['prompting-context', 'knowledge-management', 'ai-leadership'],
      xp: 170,
      mentorReview: 'recommended',
      goal: 'Write the persistent instructions that make any agent useful in your wiki, record goals and decisions properly, and turn repeated prompts into skills.',
      whyItMatters:
        'Persistent instructions are the difference between an agent that asks what the folder is every session and one that knows your conventions, priorities and boundaries. The same files now appear in most engineering repositories, and PMs increasingly own the product context inside them. Learning to write them for yourself is direct preparation for writing them for a team.',
      learn: [
        {
          heading: 'AGENTS.md is the schema',
          paragraphs: [
            '`AGENTS.md` is an open convention read by Codex, GitHub Copilot, recent versions of Claude Code and many other agents. Claude Code reads it when there is no `CLAUDE.md` in the folder. If you later want rules only Claude should follow, create a `CLAUDE.md` whose first line is `@AGENTS.md`, which imports the shared file, so there is still one source of truth. The file states what the place is, its structure, conventions, permissions and how to verify work. Keep it short; every line costs context in every session.',
            'Agents reliably read these files at the start of a session, but often skip the wiki in the middle of a task. Put **explicit triggers** in the file, written as rules with a condition.',
            'Triggers make the right behavior much more likely; they do not guarantee it. An instruction is guidance the model can miss or misread. Anything that must never happen, such as deleting raw sources or pushing to a remote, needs an enforced control: a permission rule in the tool settings, a read-only folder, or review before commit.',
          ],
          bullets: [
            'Before answering anything about my goals, decisions or projects, read index.md and cite the pages you used.',
            'When a task produces a decision, propose a decision record and a log.md entry.',
            'Before creating, moving or editing files, show a plan and wait for approval.',
            'When you make a mistake I correct, propose a one-line rule for this file.',
          ],
        },
        {
          heading: 'Knowledge versus project context, in fixed formats',
          paragraphs: [
            'Durable knowledge (who you are, goals, conventions, decisions) belongs in the schema and the wiki. Project context (status, next steps, open questions for one piece of work) belongs in `projects/<name>/README.md`. Mixing them makes the root instructions go stale quickly.',
            'Models apply conventions inconsistently unless the format is fixed. List the required headings for each page type in `AGENTS.md`, keep them identical to your templates, and check them during the weekly lint. Consistent structure is what lets an agent find the Status of every decision with one search.',
          ],
        },
        {
          heading: 'Decision records and contradictions',
          paragraphs: [
            'A decision record captures the context, options considered, the decision, why, what would change your mind, a review date and a status. It gives future you, and every future agent, the reasoning rather than just the outcome.',
            "Decisions change. Resolve the conflict when you write the new decision: set the old record's status to superseded with a link to the new one. Never delete it, and instruct agents to flag conflicting claims instead of picking one silently.",
          ],
        },
        {
          heading: 'Mechanism versus data, and when a prompt becomes a skill',
          paragraphs: [
            'Keep **mechanism** (skills, templates, instructions) separate from **data** (your notes). You can then improve how work gets done without touching your knowledge, and share a useful skill without sharing anything private.',
            'A skill is a folder with a `SKILL.md` file: front matter with a `name` and a `description` of when to use it, then the steps, plus any templates it needs. Agents read only the descriptions until a skill is relevant, which keeps everyday context lean. Location matters: Codex discovers skills in `.agents/skills/<name>/SKILL.md`, and Claude Code in `.claude/skills/<name>/SKILL.md`. Keep one copy in `.agents/skills/` and give Claude Code a link to it (your mentor can show you `ln -s`), or keep the skills in the folder your main tool uses. A good rule: once you have used the same multi-step prompt three times, make it a skill. Your weekly review and your ingest prompt both qualify.',
            "Instruction files and skills are advice, not enforcement. Claude Code's best practices say it plainly: the model may decide a guideline does not apply, so a rule with zero exceptions, such as never editing a source in `00-inbox/`, belongs in a permission rule, a hook or a check, not in more emphatic wording. Keep AGENTS.md short and limited to what the agent cannot learn from the files themselves; a long file buries the lines that matter.",
          ],
        },
      ],
      resources: [
        {
          resourceId: 'agents-md',
          why: 'The open convention for agent instruction files, with examples of what to include.',
          required: true,
        },
        {
          resourceId: 'anthropic-agent-skills-course',
          why: 'A free course on how agent skills are structured and loaded, so your skills follow the real format.',
          required: true,
        },
        {
          resourceId: 'claude-code-docs',
          why: 'The memory and skills pages state exactly where Claude Code looks for AGENTS.md, CLAUDE.md and skills. Check them when something is not picked up.',
          required: false,
        },
        {
          resourceId: 'aihero-skills',
          why: 'Practitioner examples of skills used in real AI engineering workflows, useful for seeing how others scope them.',
          required: false,
        },
        {
          resourceId: 'claude-code-best-practices',
          why: 'The clearest statement of what instructions can and cannot guarantee, and what to enforce instead.',
          required: false,
        },
        {
          resourceId: 'augment-agents-md',
          why: 'A study of what makes instruction files help or hurt; it covers code repositories, but the advice on brevity carries over.',
          required: false,
        },
      ],
      task: {
        summary:
          'Let an agent interview you, write AGENTS.md with triggers and format rules, record a goal and two decisions, and create your first two skills.',
        steps: [
          'Run the interview prompt below and answer one question at a time.',
          'Edit the draft AGENTS.md yourself. Keep explicit triggers and the required headings for each page type. Cut anything an agent will not need in most sessions.',
          'If you use Claude Code, confirm it picks up AGENTS.md: start a session and ask what instructions it loaded. Only create CLAUDE.md (first line `@AGENTS.md`) if you need Claude-specific rules.',
          'Write `goals/2027-return-to-work.md` with outcomes, how you will know you achieved them and a review date.',
          'Write two decision records from the template, one of which supersedes an earlier note or decision. Mark the old one superseded with a link.',
          'Turn your weekly review prompt into `.agents/skills/weekly-review/SKILL.md` and your ingest instructions into `.agents/skills/ingest/SKILL.md`, each with `name` and `description` front matter. If you use Claude Code, link `.claude/skills` to `.agents/skills`.',
          'In a fresh session, ask the agent which skills it can see, then trigger each one by describing the task without naming the skill. If a skill is not found, fix the folder or the description before moving on.',
          'Start a new agent session and ask: "What is this folder, and how should you file a new reading note?" Check that it answers from AGENTS.md without hints.',
          'Append log.md entries and commit.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code or Codex',
        where: 'Started inside ~/second-brain',
        text: `I want to write AGENTS.md for this personal wiki so that any AI agent (Claude Code, Codex, Copilot) is useful from its first message.

First read index.md, log.md and the templates in templates/. Then interview me. Ask one question at a time, at most 12 questions, covering:
- Who I am and what this wiki is for
- My current goals and priorities
- How pages are named, dated, tagged and filed
- What agents may do without asking, what needs my approval and what they must never do
- How to handle contradictions, stale pages and missing information
- How I like answers formatted

Then draft AGENTS.md:
- Under 120 lines, Markdown headings, imperative sentences
- Sections: Purpose, About me, Layers and structure (one line per folder), Page types and required headings (match templates/ exactly), Triggers, Permissions and boundaries, Contradictions and freshness, Skills, How to verify your work
- Triggers written as "When X, do Y" rules, including: read index.md before answering about goals, decisions or projects; propose a decision record when a decision is made; plan before any write
- Project status belongs in projects/<name>/README.md, not in AGENTS.md
- Mark any line you are unsure about with "(confirm)"

Do not write the file until I approve the draft.`,
      },
      expectedOutput: [
        'AGENTS.md with structure, triggers, page formats and boundaries.',
        'A return-to-work goal file and two decision records, one superseding another.',
        'Two skills in .agents/skills/: weekly-review and ingest, each discovered by a fresh session.',
      ],
      artifact: 'AGENTS.md, a goal file, two decision records and two working skills.',
      verification: [
        'AGENTS.md is under 150 lines and contains at least three explicit "When X, do Y" triggers.',
        'A fresh session answers the filing question correctly, citing AGENTS.md or index.md, without hints.',
        'Each skill has `name` and `description` front matter and numbered steps, a fresh session lists it, and it triggers from a task description alone.',
        'The superseded decision has status superseded and a working link to its replacement.',
      ],
      reflectionPrompts: [
        'Which line in AGENTS.md do you expect to matter most, and why?',
        'What did the interview reveal about your working style that you had not written down before?',
        'Which other repeated prompt in your life or work deserves to become a skill?',
      ],
      checklist: [
        { id: 'interview', text: 'Completed the agent interview' },
        {
          id: 'agents-md',
          text: 'Edited and saved AGENTS.md with triggers and page formats, and confirmed my tool loads it',
        },
        { id: 'goal', text: 'Wrote the return-to-work goal with a review date' },
        { id: 'decisions', text: 'Wrote two decision records, one superseding another' },
        { id: 'skills', text: 'Created and ran the weekly-review and ingest skills' },
        {
          id: 'fresh-check',
          text: 'Tested a fresh session against the filing question and committed',
        },
      ],
      mentorMove:
        'Show her one real agent instruction file from your own work, sanitized, and explain a line you added after an agent made a mistake. Then review her AGENTS.md for lines that are vague or rarely needed.',
    },
    {
      id: 's8',
      levelId: 2,
      number: 8,
      title: 'Weekly review, lint and the fresh-agent test',
      difficulty: 'Advanced',
      minutes: 100,
      tools: ['Two different agents: Claude Code, Codex, Antigravity or Copilot'],
      prerequisites: ['s7'],
      competencies: ['knowledge-management', 'prompting-context', 'coding-agents'],
      xp: 200,
      mentorReview: 'recommended',
      practicalProof: true,
      goal: 'Keep the wiki healthy with a weekly lint, write a handoff, and prove that a fresh agent in a different tool can continue your work from saved context alone.',
      whyItMatters:
        'Context that only lives in one chat dies with that chat. Handoffs, compaction and continuity are how agent work scales across days, people and tools, and they are exactly the problems teams hit when a PM, a designer and an engineer pass work between agents. The fresh-agent test is also your first evaluation, a theme that returns in Level 5.',
      learn: [
        {
          heading: 'Sessions end, files persist',
          paragraphs: [
            'Long agent sessions fill the context window. Tools then compact the conversation, summarizing older turns to make room, and detail is lost in the process. You cannot control exactly what survives a compaction.',
            'The durable rule is simple: anything that matters goes into a file. Decisions go to `decisions/`, project state to the project README or a handoff, and conventions to `AGENTS.md`. A new session should never need the old chat.',
          ],
        },
        {
          heading: 'Lint: keep the wiki trustworthy',
          paragraphs: [
            'A wiki rots quietly. A weekly lint pass, run by an agent and reviewed by you, keeps it slim and trustworthy. Agents trust whatever they read, so a stale page is worse than a missing one.',
          ],
          bullets: [
            '**Contradictions**: pages that make conflicting claims without a superseded marker.',
            '**Stale claims**: pages not updated in over 60 days that describe current state.',
            '**Orphans**: pages missing from index.md or linked from nowhere.',
            '**Missing links**: pages that mention a topic another page covers but do not link to it.',
            '**Gaps**: open questions or log entries with no page that answers them.',
            '**Format drift**: pages missing the required headings for their type.',
          ],
        },
        {
          heading: 'Anatomy of a good handoff',
          paragraphs: [
            'A handoff is written for a capable stranger with no access to your conversation. It states the goal, current state with file paths, what is done, decisions and their reasons, open questions, ordered next steps, how to verify the work and what not to do.',
            'Freshness and ownership apply here too. Every important page needs a date and an owner, even when the owner is you. In teams, pages without an owner are the first to rot, and agents will keep quoting them long after they stop being true.',
          ],
        },
        {
          heading: 'The fresh-agent test is an evaluation',
          paragraphs: [
            'To test your context system, open a new session in a different tool with no chat history and give it a real task. Score whether it found the right files, followed your conventions, took a sensible next step and asked only for information that is genuinely missing.',
            'Every failure points to missing or undiscoverable context. Fix the context, not the agent, then rerun. Measuring, fixing and remeasuring is the same loop teams use to evaluate AI products.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'aihero-handoff',
          why: "A practitioner's handoff skill showing what a good agent-to-agent handoff contains.",
          required: true,
        },
        {
          resourceId: 'anthropic-context-engineering',
          why: 'Background on compaction, structured note-taking and long-running agent work.',
          required: false,
        },
        {
          resourceId: 'codex-docs',
          why: 'Reference for running Codex as the fresh agent if Claude Code was your main tool, or the other way round.',
          required: false,
        },
        {
          resourceId: 'claude-code-docs',
          why: 'Reference for how Claude Code loads instruction files and skills and handles long sessions.',
          required: false,
        },
      ],
      task: {
        summary:
          'Run your weekly review through the skill, create and run a lint skill, write a handoff and score a fresh agent in a different tool twice.',
        steps: [
          "Run the weekly-review skill in your main agent on this week's notes. Edit the reflection in your own words and save it.",
          'Create `.agents/skills/lint/SKILL.md` that checks contradictions, stale claims, orphans, missing links, gaps and format drift. Run it, review the findings and approve fixes one group at a time.',
          'Pick a project in progress (for example your return-to-work plan or MoneyPilot preparation) and ask the agent to write `projects/<name>/HANDOFF.md` with the prompt below.',
          'Close every session. Open a different agent (for example Codex if you used Claude Code, or Antigravity or Copilot) fresh in `~/second-brain` and say only: "Continue the <name> project. Read what you need first."',
          'Score the fresh agent from 1 to 4 on: found the right files, understood the state, followed conventions, chose a sensible next step, asked only necessary questions.',
          'Fix the gaps in AGENTS.md or HANDOFF.md, rerun in another fresh session and rescore.',
          'Record both scores in a test log, append to log.md and commit.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code or Codex',
        where: 'Started inside ~/second-brain, in the session that knows the project',
        text: `Write a handoff for the project in projects/[name]/ so that a different AI agent, with no access to this conversation, can continue the work tomorrow.

Save it as projects/[name]/HANDOFF.md with these sections:
1. Goal: one paragraph, including why it matters to me
2. Current state: what exists now, with file paths
3. Done so far: newest first, with file paths
4. Decisions: each with its reason, linking to decisions/ pages where they exist
5. Open questions: what is unresolved and who decides
6. Next steps: numbered, in order, each small enough for one session
7. How to verify: how the next agent can check its own work
8. Do not: things the next agent must avoid

Rules:
- Write for a capable stranger. No "as discussed" and no references to this chat.
- Link to files instead of repeating their content.
- Keep it under 80 lines and add the date and owner at the top.
- Append "## [YYYY-MM-DD] handoff | [name]" to log.md.
- After writing, list any important context that exists only in this conversation and is not yet saved in a file, so I can decide where it belongs.`,
      },
      expectedOutput: [
        'A weekly reflection produced with the skill, plus a lint skill and its first findings resolved.',
        'projects/<name>/HANDOFF.md.',
        'A fresh-agent test log with two scored runs and the context fixes between them.',
      ],
      artifact:
        'A fresh-agent test log showing two scored runs in a different tool, the gaps found and the context fixes.',
      verification: [
        'The second run scores at least as well as the first on every dimension.',
        'The fresh agent ran in a different tool, or at least a new session with no shared history.',
        'HANDOFF.md contains file paths, a date and an owner, and no references to the old conversation.',
        'The lint output lists real findings, or states that it checked each category and found none.',
      ],
      reflectionPrompts: [
        'What did the fresh agent need that you assumed was obvious?',
        'Which lint finding surprised you most?',
        'How would this test change if a colleague, rather than an agent, picked up your work?',
      ],
      checklist: [
        {
          id: 'weekly-skill',
          text: 'Ran the weekly-review skill and saved a reflection in my own words',
        },
        {
          id: 'lint',
          text: 'Created the lint skill, ran it and resolved the findings with review',
        },
        { id: 'handoff', text: 'Wrote HANDOFF.md for a real project' },
        { id: 'fresh-run-1', text: 'Ran and scored the fresh-agent test in a different tool' },
        { id: 'fresh-run-2', text: 'Fixed context gaps, reran and rescored' },
        { id: 'committed', text: 'Saved the test log, appended to log.md and committed' },
      ],
      mentorMove:
        'Be the fresh agent for five minutes: read only her HANDOFF.md and say aloud what you would do next. Wherever you hesitate is where the handoff is weak.',
    },
  ],
  challenges: [
    {
      id: 'c3',
      levelId: 2,
      title: 'Team knowledge base blueprint',
      difficulty: 'Advanced',
      minutes: 150,
      competencies: ['ai-leadership', 'knowledge-management'],
      xp: 200,
      suggestedWindow: 'January 2027',
      summary:
        'Design, on paper, how a product team at a bank could run a shared knowledge base that both people and agents use, applying everything you learned building your own.',
      steps: [
        'Describe the three layers for a team: which raw sources (research, decisions, specs, retros), the wiki pages and the schema file.',
        'Define the three operations for a team: who ingests what, how agents answer queries with citations, and who runs the lint and how often.',
        'Set ownership and freshness rules: every page has an owner and an update date; define what happens to unowned or stale pages.',
        'Define confidentiality tiers and access control, and what never goes in (customer data, credentials, personal data about colleagues). Note which tools your employer approves for each tier.',
        'Decide how writes are gated: which changes an agent may make alone and which need human review.',
        'Draft an example AGENTS.md for a product repository, with triggers and page formats.',
        'Review the blueprint with your mentor and list the three biggest adoption risks.',
      ],
      deliverable:
        'A two-page team knowledge base blueprint plus an example AGENTS.md for a product repository.',
      verification: [
        'Every page type has a named owner role and a freshness rule.',
        "The blueprint explains how a contradiction between two teams' pages gets resolved.",
        'No real employer names, systems or data appear in the document.',
      ],
      resources: [
        {
          resourceId: 'anthropic-sdlc-playbook',
          why: 'Covers team context, handoffs and skills as institutional knowledge in AI-native teams.',
          required: false,
        },
        {
          resourceId: 'karpathy-llm-wiki',
          why: 'The personal pattern you are scaling to a team.',
          required: false,
        },
        {
          resourceId: 'anthropic-context-engineering',
          why: 'Principles for deciding what context agents should and should not receive.',
          required: false,
        },
      ],
    },
    {
      id: 'c4',
      levelId: 2,
      title: 'Wiki trust eval: measure before you rely on it',
      difficulty: 'Advanced',
      minutes: 150,
      competencies: ['evals-safety', 'knowledge-management'],
      xp: 200,
      suggestedWindow: 'December 2026',
      summary:
        'Build a small evaluation set for your second brain and measure how often a fresh agent answers correctly with faithful citations, before and after improving the wiki.',
      steps: [
        'Write ten questions with known answers from your wiki, including two whose answer is "Not in your notes" and two that involve a superseded decision.',
        'Save them with the expected answer and expected source file in `projects/wiki-eval/questions.md`.',
        'Run the questions in a fresh session using your query rules. For each, record: correct answer, correct source, quote exists word for word.',
        'Calculate three scores out of ten: answer accuracy, source accuracy and quote faithfulness.',
        'Fix the causes of failures (titles, index summaries, triggers, superseded markers), rerun and compare.',
        'Turn the procedure into `.agents/skills/wiki-eval/SKILL.md` so you can rerun it monthly.',
      ],
      deliverable:
        'A ten-question eval set, two scored runs with a comparison, and a reusable wiki-eval skill.',
      verification: [
        'Scores come from your own checking of every answer, not from the agent grading itself.',
        'At least one fix is traced to a specific failure in the first run.',
        'The superseded-decision questions return the current decision.',
      ],
      resources: [
        {
          resourceId: 'anthropic-agent-skills-course',
          why: 'Helps you package the eval procedure as a proper skill.',
          required: false,
        },
        {
          resourceId: 'hamel-evals-faq',
          why: 'Practical guidance on building small, useful evals from real failures.',
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
        'You have about eighty notes and want an agent to answer questions about them. A friend suggests setting up a vector database first. What is the best response?',
      options: [
        {
          id: 'a',
          text: 'Agree: semantic search finds ideas phrased differently, which plain file search will always miss.',
        },
        {
          id: 'b',
          text: 'Start with an index.md and consistent titles; add search tooling once you can name the failure.',
        },
        {
          id: 'c',
          text: 'Merge the notes into one well-structured file so the agent can read everything in a single pass.',
        },
        {
          id: 'd',
          text: 'Use the chat tool built-in project memory instead, since it already handles retrieval for you.',
        },
      ],
      correct: 'b',
      explanation:
        'An index read first, plus file search, works well up to roughly a hundred sources and keeps retrieval transparent. Embeddings do help with fuzzy matching, but at this size they add machinery that hides why an answer was found, and you have not yet seen the failure they fix.',
    },
    {
      id: 'q2-2',
      competency: 'knowledge-management',
      prompt:
        'A new source contradicts a decision you recorded in March. What should your agent do when ingesting it?',
      options: [
        {
          id: 'a',
          text: 'Prefer the newer source automatically, since recent information is usually the more accurate.',
        },
        {
          id: 'b',
          text: 'Rewrite the March decision to match the new source, and note the change in log.md.',
        },
        {
          id: 'c',
          text: 'Flag the conflict with both dates; once you decide, mark the loser superseded with a link.',
        },
        {
          id: 'd',
          text: 'File the new source as usual and let the weekly lint pass pick up the contradiction later.',
        },
      ],
      correct: 'c',
      explanation:
        "Contradictions are cheapest to resolve at write time, and the decision is yours, not the agent's. Closing superseded claims with a link, rather than rewriting them, preserves the reasoning trail and stops agents from quoting stale decisions.",
    },
    {
      id: 'q2-3',
      competency: 'prompting-context',
      prompt:
        'Where should the line "MoneyPilot: interviews done, prototype next, waiting on mentor feedback" live?',
      options: [
        {
          id: 'a',
          text: 'In AGENTS.md under a Current work heading, so every session starts with the latest state.',
        },
        {
          id: 'b',
          text: 'In projects/moneypilot/README.md or its handoff, because it is project state that changes.',
        },
        {
          id: 'c',
          text: 'In a dated log.md entry only, since the log already records everything that happens.',
        },
        {
          id: 'd',
          text: "In the agent tool's built-in memory feature, so it carries across all sessions without any extra files.",
        },
      ],
      correct: 'b',
      explanation:
        'AGENTS.md holds durable conventions that rarely change, and status in it goes stale for every session. The log records events, not current state. Project status belongs with the project, where agents read it when they work on that project.',
    },
    {
      id: 'q2-4',
      competency: 'coding-agents',
      prompt:
        'Your agent reads the wiki at the start of a session, but halfway through a task it answers a question about your goals from general knowledge. What is the best fix?',
      options: [
        {
          id: 'a',
          text: 'Copy your goals into AGENTS.md itself so the agent always has them in context.',
        },
        {
          id: 'b',
          text: 'Add a trigger to AGENTS.md: before answering about goals, read index.md and cite pages.',
        },
        {
          id: 'c',
          text: 'Switch to a model with a larger context window so the wiki stays in view all session.',
        },
        {
          id: 'd',
          text: 'Remind the agent to use the wiki at the start of each message you send in long sessions.',
        },
      ],
      correct: 'b',
      explanation:
        'Agents reliably read instruction files at session start but often skip the wiki mid-task. A conditional rule ("when X, do Y") makes the right behavior much more likely without repeating yourself or bloating AGENTS.md. It is still guidance, not a guarantee, so you keep checking citations.',
    },
    {
      id: 'q2-5',
      competency: 'evals-safety',
      prompt:
        'The agent answers a question with a file path and a quote for each claim. What is the most important check before relying on the answer?',
      options: [
        {
          id: 'a',
          text: 'That every cited file exists, is dated, and is recent enough to trust here.',
        },
        {
          id: 'b',
          text: 'That a second agent, asked the same question, gives the same answer.',
        },
        {
          id: 'c',
          text: 'That each quote is in the cited file word for word and supports the claim.',
        },
        { id: 'd', text: 'That the agent rates its own confidence as high for each claim.' },
      ],
      correct: 'c',
      explanation:
        'Trust, not retrieval, is the hard part. Real file paths with misquoted or misread content are more dangerous than no citation, because they look verified. Agreement between two agents measures consistency, not faithfulness.',
    },
    {
      id: 'q2-6',
      competency: 'agentic-systems',
      prompt:
        "A bank's internal assistant tells staff last year's fee for a product, although this year's fee document is in the knowledge base. Which failure is most likely?",
      options: [
        {
          id: 'a',
          text: 'The model memorized the old fee during training and ignored the retrieved document.',
        },
        {
          id: 'b',
          text: 'Retrieval returned the outdated document: a freshness and ownership problem in the base.',
        },
        {
          id: 'c',
          text: 'The chunk size is too small, so the fee table was split apart and its year heading was lost.',
        },
        {
          id: 'd',
          text: 'The staff member asked vaguely; a precise question would have retrieved this year.',
        },
      ],
      correct: 'b',
      explanation:
        'Stale retrieval is a classic RAG failure when old and new documents both exist. Chunking and phrasing can contribute, but the root fixes are knowledge management fixes: owners, update dates, superseded markers and retiring old documents.',
    },
    {
      id: 'q2-7',
      competency: 'prompting-context',
      prompt:
        'You have pasted the same ingest instructions and template five times this week, using Codex. What should you do?',
      options: [
        {
          id: 'a',
          text: 'Put the full ingest instructions in AGENTS.md so they load in every session.',
        },
        {
          id: 'b',
          text: 'Save them as skills/ingest/SKILL.md next to your notes, with the template.',
        },
        {
          id: 'c',
          text: 'Make a skill in .agents/skills/ingest/ with name and description front matter.',
        },
        {
          id: 'd',
          text: 'Save the prompt in templates/ and paste it in from there whenever you need to ingest.',
        },
      ],
      correct: 'c',
      explanation:
        'Repeated multi-step prompts are skill candidates, and skills only load from the folders a tool scans: Codex looks in .agents/skills/, Claude Code in .claude/skills/. A skills/ folder at the root is never discovered. AGENTS.md would load the instructions into every session, even when you are not ingesting.',
    },
    {
      id: 'q2-8',
      competency: 'ai-leadership',
      prompt:
        'Your team proposes loading customer complaint transcripts into a shared AI knowledge base. As the PM, what is your first question?',
      options: [
        {
          id: 'a',
          text: 'Can we strip names and account numbers first, so the data counts as anonymous?',
        },
        {
          id: 'b',
          text: 'What classification, lawful basis, access and retention rules apply, on which tools?',
        },
        {
          id: 'c',
          text: 'Which retrieval setup gives the most accurate answers over long transcripts?',
        },
        {
          id: 'd',
          text: 'Which complaint themes would staff most want to search for, so we can justify the build?',
        },
      ],
      correct: 'b',
      explanation:
        'In banking, data governance comes before tooling or value. Removing names usually leaves data pseudonymized, not anonymous, so it is still personal data. Customer data needs classification, a lawful basis, access control and retention rules. Often a de-identified summary layer is the right answer, not raw transcripts.',
    },
  ],
  project: {
    title: 'Personal Second Brain',
    brief:
      'Finish Level 2 with a functioning private knowledge workspace that you will keep using after the course: raw sources that never change, a wiki layer an agent maintains under your review, and a schema that makes any fresh agent productive. Demonstrate that it is trustworthy, not just tidy: citations that check out, contradictions resolved, stale pages caught and a handoff that works across tools. A useful knowledge base is not a large pile of documents; it is a small, current, well-structured set of pages with clear owners and rules.',
    deliverables: [
      {
        id: 'structure',
        text: '~/second-brain with three layers, a README per folder, root index.md and an append-only log.md, under git.',
      },
      {
        id: 'content',
        text: 'At least thirty real pages across goals, learning, decisions, reading, ideas and reflections, each dated and in the required format.',
      },
      {
        id: 'schema',
        text: 'AGENTS.md under 150 lines with explicit triggers and page formats, loaded by every agent you use.',
      },
      {
        id: 'skills',
        text: 'Working skills for weekly review, ingest and lint in .agents/skills/, discovered by a fresh session and kept separate from your notes.',
      },
      {
        id: 'logs',
        text: 'The Session 6 retrieval log with verified quotes and the Session 8 fresh-agent test log.',
      },
      {
        id: 'weekly-reviews',
        text: 'Two weekly reviews run through the skill, each followed by a lint pass.',
      },
      {
        id: 'demo',
        text: 'A ten-minute demo to your mentor: a fresh agent answers three questions with checkable citations and ingests one new source correctly.',
      },
    ],
    rubric: {
      correctness:
        'Citations point to the right files and every sampled quote exists word for word; ingested pages follow conventions; superseded claims are closed with links and no unflagged contradictions remain.',
      quality:
        'Pages are atomic, dated and in fixed formats; index.md and log.md are complete; AGENTS.md is short, specific and contains working triggers; mechanism and data are cleanly separated.',
      independence:
        'You start, steer and correct agents in the wiki without help, review every write through a plan and a diff, and can undo a bad change with git.',
      judgment:
        'You can explain what stays out of the wiki and why, where retrieval and trust fail, when a prompt deserves to become a skill, and how you would adapt the design for a team.',
    },
    privacyNote:
      'This workspace is private. Keep it on your own computer, optionally backed up to a private repository only. Never put it in the public Academy repository, and never add customer data, credentials, employer-confidential material or personal details about other people. The Academy stores only your checklist, reflections and the paths you type, never the files themselves.',
    minutes: 240,
    xp: 500,
  },
  nextRecommendation:
    'Move to Level 3. Your second brain becomes the research and decision log for MoneyPilot: create projects/moneypilot/ before Session 9, ingest every source and interview note there and record each product decision as a decision record.',
}
