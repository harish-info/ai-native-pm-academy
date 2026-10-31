import type { Level } from '../types'

export const level4: Level = {
  id: 4,
  slug: 'agentic-engineering',
  title: 'Agentic Product Engineering',
  theme: 'Take a product from specification to working software with AI coding agents.',
  summary:
    'Coding agents can now implement features from a good spec, which means PMs can ship real software. The hard parts move elsewhere: clear specs, small reviewable steps, verification loops that prove behavior, and review that scales. In this level you take MoneyPilot from PRD to a tested, deployed web app through real pull requests.',
  outcomes: [
    'Use Git and GitHub confidently: branches, commits, pull requests, reviews and a protected main branch.',
    'Direct Claude Code or Codex with plan-first, small, verifiable tasks, and never merge code you cannot explain.',
    'Turn a PRD into an implementation plan, a repository AGENTS.md, session handoffs and an align check.',
    'Verify AI-written code with automated tests, agent-assisted review, author self-review and risk-based human review.',
    'Deploy a working demo to GitHub Pages and explain what it does, how it works and what evidence proves it.',
  ],
  badge: {
    name: 'Spec to Ship',
    description:
      'Shipped a working MoneyPilot web app from your own PRD through real pull requests, with tests, reviews and a live deployment.',
  },
  lessons: [
    {
      id: 's13',
      levelId: 4,
      number: 13,
      title: 'Git, GitHub and your first pull request',
      difficulty: 'Advanced',
      minutes: 120,
      tools: [
        'GitHub account (free)',
        'GitHub Desktop or the gh CLI',
        'A code editor such as VS Code',
        'Claude Code or Codex',
      ],
      prerequisites: ['s12'],
      competencies: ['technical-collaboration', 'coding-agents'],
      xp: 200,
      mentorReview: 'required',
      goal: 'Set up GitHub, create the moneypilot repository with a protected main branch, and complete a full branch, commit, pull request, review and merge cycle yourself.',
      whyItMatters:
        'GitHub is where software work becomes visible: specs, decisions, reviews and releases. PMs who can open a pull request, read a diff and leave a useful review comment work with engineers and coding agents directly instead of only through tickets. The pull request history is also the audit trail regulated teams rely on.',
      learn: [
        {
          heading: 'The mental model',
          paragraphs: [
            'A **repository** is a project folder with its full history. A **commit** is a saved snapshot with a message explaining why it was made. A **branch** is a parallel line of work, so you can change things without touching the stable version on `main`. A **pull request** (PR) proposes merging a branch into `main`, and it is where review, discussion and automated checks happen.',
          ],
          bullets: [
            '`git clone` copies a repository to your machine.',
            '`git switch -c docs/readme-intro` creates and switches to a new branch.',
            '`git add` and `git commit -m "explain why"` save a snapshot.',
            '`git push` uploads your branch to GitHub.',
            '`gh pr create` opens a pull request, or use the GitHub website or GitHub Desktop.',
          ],
        },
        {
          heading: 'Why protected main matters',
          paragraphs: [
            'Branch protection rules make `main` accept changes only through pull requests, optionally with passing checks and an approving review. That one setting turns "someone changed production" into "a reviewed, tested, recorded change was merged." When agents can write code quickly, this gate matters more, not less.',
            'Teams where PMs and designers now change code apply the same rule to everyone: changes go through pull requests, never direct pushes to main, however small. A copy fix gets a light review; it still gets a PR.',
          ],
        },
        {
          heading: 'Frontend, backend, APIs and databases in five minutes',
          paragraphs: [
            'The **frontend** is what runs in the browser: screens, buttons and on-screen state. The **backend** runs on servers: business logic, security and access to data. An **API** is the contract between them, for example `GET /forecast?until=2026-11-24` returning a JSON forecast. A **database** stores data durably and lets the backend query it.',
            'For MoneyPilot in this level, everything runs in the browser with fictional data, so you can deploy for free. In a real bank the transactions and the forecast would come from backend APIs behind authentication, consent and audit logging. Knowing where that line sits is what lets you have a sensible conversation with your engineers about effort and risk.',
          ],
        },
        {
          heading: 'Reading a diff',
          paragraphs: [
            'A diff shows removed lines in red and added lines in green. You do not need to understand every line to review usefully. Ask four questions: does this change match the PR description, is anything changed that should not be, are there tests, and is there anything secret or real in it? Those four questions catch a surprising amount.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'github-skills-intro',
          why: 'A free, hands-on exercise that walks you through branches, commits and pull requests inside GitHub itself.',
          required: true,
        },
        {
          resourceId: 'github-about-prs',
          why: 'The official explanation of pull requests, reviews and merging.',
          required: true,
        },
        {
          resourceId: 'github-hello-world',
          why: 'A short official walkthrough of the same workflow if you prefer reading to an interactive course.',
          required: false,
        },
        {
          resourceId: 'vellotti-codex-pm-course',
          why: 'A PM-oriented, hands-on introduction to working in a repository with a coding agent.',
          required: false,
        },
      ],
      task: {
        summary:
          'Complete the GitHub introduction exercise, create the moneypilot repository with protected main, and take one small change from branch to merged pull request.',
        steps: [
          'Create a free GitHub account if you do not have one, and turn on two-factor authentication.',
          'Complete the GitHub Skills "Introduction to GitHub" exercise in the browser.',
          'Install GitHub Desktop or the gh CLI. If you use the CLI, run `gh auth login`. Your mentor can help with setup.',
          'Create a repository named `moneypilot`. Public is fine because it will only ever contain fictional data. Copy your PRD into `docs/prd.md` and your prototype screenshots into `docs/prototype/`, removing any private research references.',
          'In the repository settings, add a branch protection rule or ruleset for `main` that requires a pull request before merging.',
          'Clone the repository, create the branch `docs/readme-intro`, and run the agent prompt below to improve the README. Read the diff before committing.',
          'Commit, push and open a pull request with a clear description. Ask your mentor to review it and request one change.',
          'Address the review comment in a new commit, merge the PR and delete the branch.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code or Codex',
        where: 'In your local clone of the moneypilot repository, on branch docs/readme-intro',
        text: `I am a product manager learning the GitHub workflow. This repository will hold MoneyPilot, a demo web app that forecasts whether fictional income covers upcoming bills before payday.

Please improve README.md only. Do not create or change any other file.

The README should contain:
1. A one-paragraph description of MoneyPilot and the problem it solves, using docs/prd.md as the source
2. A "Status" section saying this is a learning project that uses fictional data only
3. A "How we work" section: every change goes through a pull request to main, PRs stay small, the author reviews their own diff before asking for review, and tests are required once code exists
4. A "Docs" section linking to docs/prd.md and docs/prototype/

Before editing, show me your plan in 3 to 5 bullets and wait for my approval.
After editing, show me the diff and explain each change in one line.
Do not run git commit or git push. I will do that myself.`,
      },
      expectedOutput: [
        'A moneypilot repository on GitHub with a protected main branch',
        'A merged pull request with a description, at least one review comment and a follow-up commit',
        'docs/prd.md and docs/prototype/ in the repository, with no private research data',
      ],
      artifact: 'moneypilot repository with protected main and a first merged pull request',
      verification: [
        'A direct push to main is rejected by the branch protection rule. Try it once on purpose.',
        'The merged PR shows at least two commits, a review comment and a resolved conversation.',
        'The README diff changed only README.md, as the prompt required.',
        'Nothing in the repository contains real names, interview notes or real financial data.',
      ],
      reflectionPrompts: [
        'Which Git concept clicked for you, and which still feels fuzzy?',
        'What did reading the diff reveal that the agent did not mention?',
        'How would "everything through a pull request" change the way your bank team ships changes today?',
      ],
      checklist: [
        { id: 'gh-skills', text: 'Completed the GitHub Skills introduction exercise' },
        { id: 'repo', text: 'Created the moneypilot repository with protected main' },
        { id: 'pr-url', text: 'Opened a pull request and recorded its URL as the artifact' },
        { id: 'review', text: 'Received a review comment and addressed it in a follow-up commit' },
        { id: 'merged', text: 'Merged the PR and deleted the branch' },
      ],
      mentorMove:
        'Be the reviewer on her first PR: leave one substantive comment, such as a missing link, and one question, and approve only after she pushes a fix. Then open a real PR from your team and talk through what you look at first and why.',
    },
    {
      id: 's14',
      levelId: 4,
      number: 14,
      title: 'Ship a small feature with a coding agent',
      difficulty: 'Advanced',
      minutes: 135,
      tools: ['Claude Code or Codex', 'Node.js (LTS)', 'GitHub'],
      prerequisites: ['s13'],
      competencies: ['coding-agents', 'technical-collaboration', 'prompting-context'],
      xp: 225,
      mentorReview: 'recommended',
      goal: 'Use Claude Code or Codex to scaffold the MoneyPilot app and implement one small, well-specified feature through a plan-first loop with small diffs, tests and a pull request you can fully explain.',
      whyItMatters:
        'Agents are good at writing code and bad at knowing when they are wrong. The skill that matters is directing them: a precise task, a plan before code, changes small enough to review, and proof that the result works. It is the same skill as leading an engineering team, compressed into minutes.',
      learn: [
        {
          heading: 'The plan-first loop',
          paragraphs: [
            'Explore, plan, implement, verify. First ask the agent to read the repository and explain what is there. Then ask for a plan and challenge it before any code is written. Then let it implement one step at a time, running tests after each step. Most bad agent sessions skip the plan and go straight to a large, unreviewable change.',
          ],
          bullets: [
            '**Explore**: "Read the repo and summarize its structure and how to run it."',
            '**Plan**: "Propose steps, files to touch and how you will test it. Do not write code yet."',
            '**Implement**: "Do step 1 only, then run the tests."',
            '**Verify**: "Show me the test output and the diff."',
          ],
        },
        {
          heading: 'Small diffs and safe permissions',
          paragraphs: [
            'A 50-line change can be reviewed in minutes; a 2,000-line change gets rubber-stamped. Ask for one feature per branch and one concern per commit. If a session goes sideways, it is usually faster to discard the branch and restart with a better prompt than to argue with the agent.',
            'Claude Code and Codex ask before running commands or editing files unless you change their permission settings. Keep approvals on while you learn. Never paste secrets into prompts, never let an agent push to main, and read every command that deletes, installs or uploads something before you approve it.',
          ],
        },
        {
          heading: 'Give the agent a verification loop',
          paragraphs: [
            'A unit test checks one function with concrete inputs and an expected output, such as a projected balance of 15000 minor units for a given set of bills. Your Given/When/Then criteria map directly onto tests. Ask the agent to write the test first, watch it fail, then make it pass: you get evidence rather than assurances.',
            'Teams report that output quality improves sharply when the agent can check its own work: tests it can run, a browser session it can drive, and screenshots it can compare against the design. Web apps are cheap to verify this way, which is one reason MoneyPilot is a web app; native mobile apps are much harder to put in an automatic loop.',
          ],
        },
        {
          heading: 'Do not merge code you cannot explain',
          paragraphs: [
            'A rule worth adopting from teams doing this today: if you cannot explain what a change does and why, you do not merge it. Ask the agent to walk you through any line you do not understand, and keep asking until you can explain it back.',
            'Agent-written tests need the same scrutiny. A test can pass while checking the wrong thing, for example asserting that a function returns a number rather than the right number. Read each test and confirm it checks the acceptance criterion it claims to cover.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'claude-code-101',
          why: 'An official beginner course on working with Claude Code, from setup to everyday use.',
          required: true,
        },
        {
          resourceId: 'codex-workflows-cookbook',
          why: 'OpenAI examples of iterating on development work with Codex, if Codex is your agent of choice.',
          required: false,
        },
        {
          resourceId: 'aihero-videos',
          why: 'Short practitioner videos on directing coding agents well.',
          required: false,
        },
        {
          resourceId: 'codex-docs',
          why: 'Official Codex documentation for installation, permissions and configuration.',
          required: false,
        },
      ],
      task: {
        summary:
          'Scaffold MoneyPilot with an agent, then implement and test the projected balance calculation with a plan-first loop, and merge it through a pull request.',
        steps: [
          'Install Node.js LTS. Open Claude Code or Codex in your moneypilot clone and ask it to explain the repository.',
          'On branch `feat/scaffold`, ask the agent for a minimal React, TypeScript and Vite app with Vitest, plus README instructions to run it. Run it yourself with `npm install` and `npm run dev`, then open a PR, self-review the diff and merge.',
          'On branch `feat/projected-balance`, run the agent prompt below. Review the plan and push back on anything outside scope.',
          'Let the agent write the tests first, run them and show they fail, then implement until they pass.',
          'Read every test and confirm it checks the acceptance criterion it names. Calculate two expected values by hand.',
          'Run `npm test` yourself and paste the output into the PR description.',
          'Read the full diff. Ask the agent to explain any line you cannot explain yourself, then open the PR, request your mentor review, address comments and merge.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code or Codex',
        where: 'In the moneypilot repository, on branch feat/projected-balance',
        text: `Read docs/prd.md, focusing on the data definitions and the acceptance criteria about the projected balance.

Task: implement a pure TypeScript function that calculates the projected balance on the day before the next payday.

Inputs: current balance, next payday date, and a list of upcoming bills (name, amount, due date, optional isVariable flag).
Output: the projected balance, the bills included, and a shortfall flag.

Process:
1. Explore: tell me which files exist and where this function should live. Do not write code yet.
2. Plan: list the steps, the files to create, and the test cases you will write, each mapped to a PRD acceptance criterion by number. Wait for my approval.
3. Tests first: write Vitest unit tests for each mapped criterion plus edge cases (no bills, a bill due on payday, a bill after payday, a variable amount, a negative result). Run them and show me they fail.
4. Implement until all tests pass. Run npm test and show me the full output.
5. Explain each test in one sentence: which criterion it covers and what would make it fail.

Constraints:
- No UI changes in this branch. No new dependencies.
- Store money as integers in minor units (cents or pence) to avoid floating point errors.
- Do not commit or push. I will review the diff first.`,
      },
      expectedOutput: [
        'A scaffolded React and TypeScript app that runs locally',
        'A tested projected balance function mapped to PRD acceptance criteria',
        'Two merged PRs: the scaffold, and the feature with test output in its description',
      ],
      artifact: 'Merged PR implementing the projected balance calculation with passing tests',
      verification: [
        'npm test passes on your machine, and you ran it yourself rather than trusting the agent transcript.',
        'Each test references a PRD acceptance criterion, and you confirmed it checks the right value, not just any value.',
        'You calculated at least two test cases by hand and the expected values match.',
        'The diff contains no unrelated changes, new dependencies or UI edits.',
        'You can explain every line in the merged diff, or you asked until you could.',
      ],
      reflectionPrompts: [
        'Where did you push back on the agent plan, and were you right to?',
        'Did any agent-written test pass while checking the wrong thing? How did you notice?',
        'How did directing the agent compare with writing a ticket for an engineer?',
      ],
      checklist: [
        { id: 'scaffold', text: 'Scaffolded the app and ran it locally' },
        { id: 'plan', text: 'Reviewed and adjusted the agent plan before any code was written' },
        { id: 'tests-pass', text: 'Ran npm test yourself and saw all tests pass' },
        {
          id: 'tests-right',
          text: 'Read every test and checked two expected values by hand',
        },
        { id: 'pr-merged', text: 'Merged the feature PR with test output in the description' },
      ],
      mentorMove:
        'Sit with her for the planning step only. Watch how she reviews the agent plan and ask "how will you know it works?" before she approves. Afterwards, pick one agent-written test and ask her to explain what it proves; then show how you would discard a bad session and restart rather than patching it.',
    },
    {
      id: 's15',
      levelId: 4,
      number: 15,
      title: 'From PRD to plan, handoffs and first screens',
      difficulty: 'Advanced',
      minutes: 150,
      tools: ['Claude Code or Codex', 'Your chosen prototype', 'GitHub'],
      prerequisites: ['s14'],
      competencies: [
        'coding-agents',
        'technical-collaboration',
        'knowledge-management',
        'ux-prototyping',
      ],
      xp: 250,
      mentorReview: 'recommended',
      goal: 'Turn the PRD and prototype into an implementation plan of small slices, add AGENTS.md and a handoff routine to the repository, build the first working MoneyPilot screens with fictional data, and check the build against the PRD.',
      whyItMatters:
        'Big asks produce big, wrong changes. PMs who get the most out of coding agents break work into slices that each produce a visible, testable result, and they make the repository itself carry the context: what the product is, how to run it, which rules apply. That context survives across sessions, tools and people.',
      learn: [
        {
          heading: 'Task decomposition',
          paragraphs: [
            'Slice vertically. Each task should deliver something a user can see or a test can check, end to end, rather than "build all the data models" followed by "build all the screens." A good slice fits in one PR and one agent session, has acceptance criteria, and lists the files it is likely to touch.',
          ],
          bullets: [
            'Slice 1: fictional data file and a forecast screen showing the projected balance.',
            'Slice 2: bill list with dates and amounts.',
            'Slice 3: shortfall state with words and an icon.',
            'Slice 4: empty and uncertain states.',
            'Slice 5: responsive layout and an accessibility pass.',
          ],
        },
        {
          heading: 'The repository as context',
          paragraphs: [
            '`AGENTS.md` tells any agent what the project is, how to install, run and test it, the conventions, and the hard rules, such as "fictional data only, never add real bank APIs." Codex, Copilot and many other tools read it; Claude Code reads `CLAUDE.md`, which can simply point to AGENTS.md. Keep it short and accurate: stale instructions are worse than none.',
            'Keep the PRD and the prototype in the repository next to the code, in `docs/prd.md` and `docs/prototype/`, and update them in the same PR when scope changes. Agents and engineers then build from one consistent source.',
          ],
        },
        {
          heading: 'Handoffs and the align check',
          paragraphs: [
            'Agent sessions have limited context and they end. A handoff note captures where the work is: what was done, what is next, decisions made and why, open questions, and how to verify the current state. It is the same discipline as the second-brain handoff from Level 2, applied to code.',
            'Teams doing this today describe a loop, still an emerging practice: a handoff loads the merged PRD and design spec into the implementing agent; after building, an "align" check compares the build against the PRD acceptance criteria and reports what is met, partial or missing; and learnings from the work are written back to the team knowledge base so the next feature starts smarter.',
          ],
        },
        {
          heading: 'Executable specs',
          paragraphs: [
            'The plan, the acceptance criteria and the tests form a chain: each slice points to criteria, and each criterion becomes a test. When the spec changes, update the PRD and the tests together. That is what people mean by an executable specification: a spec whose truth is checked automatically on every change.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'agents-md',
          why: 'The open format for repository instructions that coding agents read before working.',
          required: true,
        },
        {
          resourceId: 'aihero-handoff',
          why: 'A practitioner skill for writing session handoffs so a fresh agent can continue the work.',
          required: true,
        },
        {
          resourceId: 'anthropic-context-engineering',
          why: 'Why curated, compact context beats dumping everything into the agent.',
          required: false,
        },
        {
          resourceId: 'aihero-skills',
          why: 'Related skills for planning and decomposing work before implementation.',
          required: false,
        },
      ],
      task: {
        summary:
          'Write the implementation plan and AGENTS.md, build the first two or three slices as separate PRs with a handoff note after each session, then run an align check against the PRD.',
        steps: [
          'Run the agent prompt below to draft `docs/plan.md` with 5 to 8 vertical slices mapped to PRD acceptance criteria.',
          'Edit the plan yourself: reorder, cut, or split slices that are too big. Merge it through a PR.',
          'Ask the agent to draft `AGENTS.md` with project purpose, commands, conventions and hard rules. Add a `CLAUDE.md` that points to AGENTS.md if you use Claude Code. Trim anything vague, then merge through a PR.',
          'Create `src/data/fictional.ts` with one fictional persona and their month of income and bills, matching your prototype dataset.',
          'Build slices 1 and 2, and 3 if time allows, each on its own branch and PR, using the plan-first loop from Session 14. Give the agent your prototype screenshots so it can compare its result to the design.',
          'At the end of each session, ask the agent to write a handoff note to `docs/handoffs/YYYY-MM-DD.md`. Start the next slice in a fresh session that reads AGENTS.md and the latest handoff.',
          'Run an align check: in a fresh session, ask the agent to compare the running app and the code with every acceptance criterion in `docs/prd.md` and report met, partial or missing.',
          'Write two or three learnings from this session back to your second brain or `docs/learnings.md`.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code or Codex',
        where: 'In the moneypilot repository, on branch docs/implementation-plan',
        text: `Read docs/prd.md and the prototype screenshots and notes in docs/prototype/.

Write docs/plan.md, an implementation plan for MoneyPilot v1.

Requirements:
- 5 to 8 vertical slices. Each slice must produce something visible in the browser or checkable by a test.
- For each slice: goal, the PRD acceptance criteria numbers it satisfies, files likely to change, tests to add, how the result will be checked against the prototype, and a size (S, M, L). Split any L slice.
- The first slice must render a real screen using fictional data from src/data/fictional.ts.
- Include a "Not in v1" list based on the PRD non-goals.
- Include a "Risks and unknowns" section.

Constraints:
- Browser only, no backend, fictional data only, no real bank APIs or credentials.
- Keep the existing stack (React, TypeScript, Vite, Vitest). Propose a new dependency only with a one-line justification.
- Do not write any application code in this branch.

After writing the plan, name the two slices most likely to go wrong and explain why.`,
      },
      expectedOutput: [
        'docs/plan.md with 5 to 8 vertical slices mapped to acceptance criteria',
        'AGENTS.md (and a CLAUDE.md pointer) with working commands, conventions and hard rules',
        'At least two merged PRs that build working screens with fictional data',
        'Handoff notes in docs/handoffs/ and an align check report against the PRD',
      ],
      artifact:
        'Implementation plan, AGENTS.md, handoff notes, align report and first working MoneyPilot screens',
      verification: [
        'A fresh agent session given only AGENTS.md and the latest handoff note correctly states what to do next.',
        'Each merged slice PR references its plan slice and the acceptance criteria it satisfies.',
        'The figures on screen match a hand calculation from the fictional dataset.',
        'The install, run and test commands in AGENTS.md work when copied exactly.',
        'The align report lists every acceptance criterion with a status, and missing items are in the plan.',
      ],
      reflectionPrompts: [
        'Which slice did you split or cut, and why?',
        'What did the fresh agent get wrong from your handoff note, and what did you change?',
        'What did the align check find that you had missed, and how close are the screens to your prototype?',
      ],
      checklist: [
        {
          id: 'plan',
          text: 'Merged docs/plan.md with vertical slices mapped to acceptance criteria',
        },
        { id: 'agents-md', text: 'Added AGENTS.md with working commands and hard rules' },
        { id: 'slices', text: 'Merged at least two slice PRs with working screens' },
        { id: 'handoff', text: 'Wrote a handoff note and resumed from it in a fresh session' },
        { id: 'align', text: 'Ran an align check against the PRD and recorded the results' },
        { id: 'figures', text: 'Checked on-screen figures against a hand calculation' },
      ],
      mentorMove:
        'Review her docs/plan.md before she builds anything and point to the slice you would split. Then describe, in general terms, one rule your teams added to their agent instructions after an agent made a mistake, and why it was worded the way it was.',
    },
    {
      id: 's16',
      levelId: 4,
      number: 16,
      title: 'Test, review, debug and deploy',
      difficulty: 'Advanced',
      minutes: 150,
      tools: [
        'Claude Code or Codex',
        'GitHub Actions (free for public repositories)',
        'GitHub Pages',
        'Optional: Playwright',
      ],
      prerequisites: ['s15'],
      competencies: ['coding-agents', 'evals-safety', 'technical-collaboration'],
      xp: 250,
      mentorReview: 'required',
      safetyCritical: true,
      goal: 'Put automated verification in front of every change, run self-review, agent-assisted review and risk-based human review, debug a real failure, and deploy MoneyPilot to GitHub Pages with evidence that it works.',
      whyItMatters:
        'When agents produce code faster than people can read it, review becomes the bottleneck. The answer is not to stop reviewing. It is to let machines check what machines can check, have authors review their own work first, and spend expert human attention where risk is highest. In banking, a written risk-based review policy is also what auditors and risk teams expect to see.',
      learn: [
        {
          heading: 'Layers of verification',
          paragraphs: [
            'Unit tests check individual functions. Integration or end-to-end tests check that screens and logic work together, for example that opening the app with the fictional dataset shows the correct projected balance. Type checks and linting catch whole classes of mistakes automatically.',
            'Continuous integration (CI) runs all of these on every pull request, so a red check blocks a merge before a human spends any time on it. Requiring those checks in your branch protection makes the rule automatic.',
          ],
        },
        {
          heading: 'Review is the new bottleneck',
          paragraphs: [
            'Teams that adopted coding agents report that the bottleneck moved from writing code to reviewing it. The practices they converged on are worth copying: author self-review is mandatory before asking anyone else, PR size is capped so reviews stay fast, and "request changes" is reserved for real merge blockers, with everything else left as comments.',
            'An agent reviewer can read a diff and flag likely bugs, missing tests and mismatches with the spec in minutes. It also produces false positives and misses context, so treat its comments as input, not a verdict. Then match the depth of human review to the risk.',
          ],
          bullets: [
            '**Low risk**: copy, styling, docs. Automated checks, self-review and a quick look.',
            '**Medium risk**: new UI flows, refactors. Automated checks, agent review and one human review.',
            '**High risk**: calculations, data handling, security, permissions, anything touching money. Tests covering the change, agent review, and careful review by someone who understands the domain.',
          ],
        },
        {
          heading: 'Autonomy needs context',
          paragraphs: [
            'A cautionary field note: one team let a fully autonomous agent run produce a nearly complete draft PR in under an hour. CI passed. It also silently broke a live experiment running on the same screen, because nothing in the agent context said the experiment existed. The fix was not less automation; it was giving agents context about live experiments and feature flags, and keeping a reviewer who knows the product in the loop.',
          ],
        },
        {
          heading: 'Debugging, deployment and feedback loops',
          paragraphs: [
            'Good debugging starts with a reproducible failure: exact steps, expected result, actual result, error message. Give the agent that, ask it to form hypotheses and test them one at a time, and ask for a failing test that reproduces the bug before it fixes anything. A fix without a test tends to come back.',
            'GitHub Pages hosts static sites for free, and a GitHub Actions workflow can build and deploy on every merge to `main`. After deploying, close the loop: share the link with two or three people from your discovery work, watch them use it, and turn what you see into issues. Shipping is the start of learning, not the end.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'aihero-code-review',
          why: 'A practitioner skill for agent-assisted code review that you can adapt to your own review policy.',
          required: true,
        },
        {
          resourceId: 'github-pages-docs',
          why: 'The official guide to publishing a site with GitHub Pages.',
          required: true,
        },
        {
          resourceId: 'anthropic-sdlc-playbook',
          why: 'How teams restructure delivery, quality checks and review around AI agents.',
          required: false,
        },
        {
          resourceId: 'copilot-docs',
          why: 'Includes GitHub Copilot code review, one way to add an agent reviewer directly on pull requests.',
          required: false,
        },
      ],
      task: {
        summary:
          'Add CI and an end-to-end check, write a review policy, self-review and agent-review your PRs, fix a reproduced bug with a regression test, and deploy to GitHub Pages.',
        steps: [
          'On branch `ci/tests`, ask the agent to add a GitHub Actions workflow that runs install, type check, lint and `npm test` on every pull request. Turn on "require status checks to pass" in branch protection.',
          'Add one end-to-end or integration test that loads the forecast screen with fictional data and checks the projected balance text, using Playwright or React Testing Library.',
          'Write `docs/review-policy.md`: low, medium and high risk rules, a PR size cap, mandatory author self-review, and "request changes" only for merge blockers. Note that a change touching a screen with a live experiment is always high risk.',
          'On each open PR, do your own self-review first, then run the agent review prompt below. Record a decision for every comment: fixed, rejected with a reason, or turned into an issue.',
          'Ask your mentor to review the highest-risk change, the calculation logic, as the human domain reviewer.',
          'Break something on purpose, for example a bill due exactly on payday. Reproduce it, have the agent write a failing test, then fix it.',
          'Add a GitHub Pages deployment workflow. Vite needs `base` set to `/moneypilot/`. Merge, then open the live URL on your phone.',
          'Share the URL with two or three people, note where they struggle, and open GitHub issues for the top findings.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code, Codex or GitHub Copilot code review',
        where: 'In the moneypilot repository, on the branch of an open pull request',
        text: `Review the changes on this branch compared with main. Act as a careful senior reviewer on a banking product team.

Context: read AGENTS.md, docs/prd.md, docs/plan.md and docs/review-policy.md first.

Check, in this order:
1. Correctness: does the change satisfy the acceptance criteria it claims? Recompute any money calculation by hand for at least two cases.
2. Tests: is every changed behavior covered by a test, and does each test check the right value? Name missing cases.
3. Scope: is anything changed that the PR description does not mention?
4. Safety: secrets, real personal or financial data, new network calls, new dependencies, anything that could move money, or changes to a screen with a live experiment.
5. Accessibility: color-only signals, missing labels, small tap targets.

Output a table: severity (blocker, should-fix, nit), file and line, issue, suggested fix. Only "blocker" means the PR must not merge.
Then give an overall risk rating (low, medium or high) per docs/review-policy.md, with one sentence of reasoning.

Rules:
- Do not edit any files. Review only.
- If you are not sure something is a bug, say so and explain what would confirm it.`,
      },
      expectedOutput: [
        'A CI workflow running type check, lint and tests on every PR, required by branch protection',
        'docs/review-policy.md with risk tiers, a PR size cap and mandatory self-review',
        'Agent review comments with recorded decisions, and a bug reproduced by a failing test then fixed',
        'MoneyPilot live on GitHub Pages, with issues opened from real user feedback',
      ],
      artifact:
        'Deployed MoneyPilot URL, passing CI, review policy and a regression-tested bug fix',
      verification: [
        'A pull request with a deliberately failing test is blocked from merging by CI.',
        'The live GitHub Pages URL loads on a phone and shows the correct projected balance for the fictional dataset.',
        'Every agent review comment has a recorded decision: fixed, rejected with a reason, or turned into an issue.',
        'The bug fix PR includes a test that fails without the fix and passes with it.',
        'docs/review-policy.md classifies calculation and data changes as high risk requiring a human domain reviewer.',
      ],
      reflectionPrompts: [
        'Which agent review comment was wrong, and how did you know?',
        'Where in your bank team would a risk-based review policy save the most time, and where would it worry risk or compliance?',
        'What did real users do with the live app that surprised you?',
      ],
      checklist: [
        { id: 'ci', text: 'Added CI with required status checks on main' },
        { id: 'e2e', text: 'Added an end-to-end or integration test for the forecast screen' },
        {
          id: 'policy',
          text: 'Wrote a review policy with risk tiers, a PR size cap and mandatory self-review',
        },
        {
          id: 'agent-review',
          text: 'Self-reviewed, ran an agent review and recorded a decision for every comment',
        },
        { id: 'bug-test', text: 'Fixed a reproduced bug with a regression test' },
        {
          id: 'deployed',
          text: 'Deployed to GitHub Pages, recorded the live URL and opened issues from real feedback',
        },
      ],
      mentorMove:
        'Do the human review on her highest-risk PR, the calculation change, and narrate your thinking aloud: what you check first, what you trust CI for, and what makes you slow down. Then compare your findings with the agent review, and point out one thing only someone who knows the product would have caught.',
    },
  ],
  challenges: [
    {
      id: 'c7',
      levelId: 4,
      title: 'Parallel agents on separate branches',
      difficulty: 'Expert',
      minutes: 150,
      competencies: ['coding-agents', 'technical-collaboration'],
      xp: 250,
      suggestedWindow: 'December 2026',
      summary:
        'Run two coding agents at once on two independent MoneyPilot slices, using git worktrees or separate clones, then integrate both through pull requests. Learn first-hand where parallel agents save time and where coordination eats the savings.',
      steps: [
        'Pick two slices from docs/plan.md that touch different files.',
        'With your mentor, create a second working copy with `git worktree add ../moneypilot-b -b feat/slice-b`, or clone the repository twice.',
        'Start Claude Code in one working copy and Codex in the other, both reading the same AGENTS.md and handoff note.',
        'Self-review and agent-review each PR independently. Merge the first.',
        'Update the second branch with the latest main, and resolve any conflict with agent help while reading every conflicted line yourself.',
        'Write a short note comparing the two agents and the real coordination overhead.',
      ],
      deliverable:
        'Two PRs built in parallel by different agents, both merged, plus a comparison note',
      verification: [
        'Both PRs passed CI before merging.',
        'You can explain how each conflict was resolved.',
        'The note honestly compares time saved with coordination cost, including any rework.',
      ],
      resources: [
        {
          resourceId: 'codex-workflows-cookbook',
          why: 'Examples of structuring development workflows with Codex.',
          required: false,
        },
        {
          resourceId: 'claude-code-docs',
          why: 'Official documentation, including running Claude Code across working copies.',
          required: false,
        },
      ],
    },
    {
      id: 'c8',
      levelId: 4,
      title: 'Close the loop: ship a feedback-driven improvement',
      difficulty: 'Advanced',
      minutes: 150,
      competencies: ['product-discovery', 'technical-collaboration', 'coding-agents'],
      xp: 225,
      suggestedWindow: 'January 2027',
      summary:
        'Take the top issue from real user feedback on the live app, write a mini-spec, ship it through the full workflow, and re-test with the same people. Add privacy-respecting local event counting for one PRD metric.',
      steps: [
        'Choose the top GitHub issue opened from user feedback in Session 16.',
        'Write a mini-spec in the issue: problem, evidence, acceptance criteria and edge cases.',
        'Implement it with an agent through the plan-first loop, self-review and the review policy.',
        'Add local-only event counting for one PRD metric, stored in the browser and shown in a small debug panel, with no third-party tracking.',
        'Deploy, re-test with the same people, and write a before and after note.',
      ],
      deliverable:
        'A mini-spec, a merged PR with local event counting, and a before and after feedback note',
      verification: [
        'The mini-spec acceptance criteria are covered by tests.',
        'No third-party analytics or network calls were added.',
        'The before and after note uses observations from the same participants.',
      ],
      resources: [
        {
          resourceId: 'github-about-prs',
          why: 'Linking issues and pull requests so the history explains why the change exists.',
          required: false,
        },
        {
          resourceId: 'aihero-skills',
          why: 'Skills for turning feedback into a tight spec before implementation.',
          required: false,
        },
      ],
    },
  ],
  quiz: [
    {
      id: 'q4-1',
      competency: 'technical-collaboration',
      prompt:
        'A designer wants to push a one-word copy fix directly to main because "it is just text". What is the best response?',
      options: [
        { id: 'a', text: 'Allow it; text changes cannot break anything.' },
        {
          id: 'b',
          text: 'Open a small pull request anyway: every change goes through a PR so checks run and there is a record, and a low-risk PR gets a light review.',
        },
        { id: 'c', text: 'Ask an engineer to make the change instead.' },
        { id: 'd', text: 'Batch it with other changes into one large monthly PR.' },
      ],
      correct: 'b',
      explanation:
        'Teams where PMs and designers change code keep one rule for everyone: pull requests, never direct pushes to main. Risk-based review keeps that cheap for low-risk changes, and the history stays auditable.',
    },
    {
      id: 'q4-2',
      competency: 'coding-agents',
      prompt:
        'You asked an agent to add the forecast screen and it returned an 1,800-line diff across 30 files. What is the best next step?',
      options: [
        { id: 'a', text: 'Merge it if CI passes; agents are usually right.' },
        { id: 'b', text: 'Ask a colleague to review all 1,800 lines carefully.' },
        {
          id: 'c',
          text: 'Discard or park the branch, ask for a plan, split the work into small slices, and rebuild one slice per PR.',
        },
        { id: 'd', text: 'Ask the agent to review its own diff and merge if it approves.' },
      ],
      correct: 'c',
      explanation:
        'Huge diffs get rubber-stamped, not reviewed. Restarting with a plan and small vertical slices is usually faster than untangling a large change, and each slice can be verified.',
    },
    {
      id: 'q4-3',
      competency: 'coding-agents',
      prompt:
        'The agent reports "All tests pass, the feature is complete." What should you do before merging?',
      options: [
        { id: 'a', text: 'Merge; the agent ran the tests.' },
        {
          id: 'b',
          text: 'Run the tests yourself or check CI, read each test to confirm it checks the right value for its criterion, and make sure you can explain the change.',
        },
        { id: 'c', text: 'Ask the agent if it is sure.' },
        { id: 'd', text: 'Count the tests; more tests means better coverage.' },
      ],
      correct: 'b',
      explanation:
        'Agent transcripts can be wrong, and agent-written tests can pass while testing the wrong thing. Independent test runs plus a human check of what the tests assert is the minimum. If you cannot explain the change, do not merge it.',
    },
    {
      id: 'q4-4',
      competency: 'technical-collaboration',
      prompt:
        'In a real bank version of MoneyPilot using customer transactions, where should the forecast calculation run?',
      options: [
        { id: 'a', text: 'In the browser, so the bank does not need servers.' },
        {
          id: 'b',
          text: 'On the backend behind an authenticated API, so data access, security and audit are controlled, with the frontend displaying the result.',
        },
        { id: 'c', text: 'Inside the AI model, which can read the transactions directly.' },
        { id: 'd', text: 'In a spreadsheet the customer downloads.' },
      ],
      correct: 'b',
      explanation:
        'Real financial data belongs behind authentication, authorization and audit logging on the backend. The learning version runs in the browser only because it uses fictional data.',
    },
    {
      id: 'q4-5',
      competency: 'evals-safety',
      prompt:
        'Under a risk-based review policy, which change most needs careful review by a human domain expert?',
      options: [
        { id: 'a', text: 'Fixing a typo in the README.' },
        { id: 'b', text: 'Changing the rounding logic in the projected balance calculation.' },
        { id: 'c', text: 'Changing a button color to match the design.' },
        { id: 'd', text: 'Renaming a CSS class.' },
      ],
      correct: 'b',
      explanation:
        'Calculations that customers rely on for money decisions are high risk: small errors compound and erode trust. Low-risk changes can rely on automated checks and a light review.',
    },
    {
      id: 'q4-6',
      competency: 'agentic-systems',
      prompt:
        'A fully autonomous agent run produces a nearly complete PR in under an hour that reworks the home screen. CI is green. A live A/B experiment runs on that screen. What is the main risk?',
      options: [
        { id: 'a', text: 'None; green CI means the change is safe.' },
        { id: 'b', text: 'The code style may not match the team conventions.' },
        {
          id: 'c',
          text: 'The agent had no context about the live experiment and may silently break it; it needs that context and a reviewer who knows the product.',
        },
        { id: 'd', text: 'The PR was produced too quickly to be any good.' },
      ],
      correct: 'c',
      explanation:
        'Teams have seen exactly this: fast, plausible autonomous work that broke a running experiment no test covered. Autonomy needs context about live experiments and flags, plus product-aware review.',
    },
    {
      id: 'q4-7',
      competency: 'ai-leadership',
      prompt:
        'Agents now produce PRs faster than your team can review them and the queue keeps growing. Which set of practices best addresses this?',
      options: [
        { id: 'a', text: 'Remove human review for anything an agent wrote.' },
        {
          id: 'b',
          text: 'Automated checks first, mandatory author self-review, a PR size cap, risk-based review depth, and "request changes" reserved for real merge blockers.',
        },
        { id: 'c', text: 'Approve everything at the end of each week in one batch.' },
        { id: 'd', text: 'Stop using agents until the queue is empty.' },
      ],
      correct: 'b',
      explanation:
        'These are the practices teams converged on when review became the bottleneck: they keep humans focused where judgment matters without abandoning review or the speed agents bring.',
    },
    {
      id: 'q4-8',
      competency: 'coding-agents',
      prompt:
        'Which addition is most likely to improve the quality of an agent building MoneyPilot screens?',
      options: [
        { id: 'a', text: 'A longer, more enthusiastic prompt.' },
        {
          id: 'b',
          text: 'A verification loop: tests it can run, a browser session it can drive, and screenshots to compare against the prototype.',
        },
        { id: 'c', text: 'Permission to push directly to main.' },
        { id: 'd', text: 'A bigger task so it has more context.' },
      ],
      correct: 'b',
      explanation:
        'Agents improve sharply when they can check their own work against an objective signal. Web apps are cheap to verify this way; native apps are harder, which is worth knowing when you plan agent work.',
    },
  ],
  project: {
    title: 'Working MoneyPilot Web App',
    brief:
      'Ship MoneyPilot v1 as a deployed web app on GitHub Pages, built with coding agents through real pull requests from your Level 3 PRD. You should be able to explain what it does, how it works at a high level, and what evidence shows it is correct.',
    deliverables: [
      {
        id: 'repo',
        text: 'Public moneypilot repository with protected main and required CI checks',
      },
      {
        id: 'pr',
        text: 'At least one real pull request reviewed and merged on GitHub, with its URL recorded',
      },
      {
        id: 'context',
        text: 'docs/prd.md and docs/prototype/ versioned together, docs/plan.md, AGENTS.md and at least two handoff notes',
      },
      {
        id: 'tests',
        text: 'Automated tests mapped to PRD acceptance criteria, passing in CI, plus an align report',
      },
      {
        id: 'review',
        text: 'docs/review-policy.md and evidence of self-review and agent-assisted review with triaged comments',
      },
      {
        id: 'live',
        text: 'Live GitHub Pages URL showing correct figures for the fictional dataset',
      },
      {
        id: 'walkthrough',
        text: 'A two-minute walkthrough, written or recorded, of what the app does, how it works and the verification evidence',
      },
    ],
    rubric: {
      correctness:
        'Figures on the live app match hand calculations for the fictional dataset, tests check the right values for the acceptance criteria, and CI is green on main.',
      quality:
        'PRs are small and well described, the UI follows the chosen prototype and passes basic accessibility checks, and AGENTS.md and the PRD are accurate and current.',
      independence:
        'You directed the agents, made the plan and review decisions, and self-reviewed before every human review, using your mentor for review and unblocking rather than implementation.',
      judgment:
        'You applied risk-based review, can explain every merged change, questioned or rejected at least one agent suggestion with reasons, and kept fictional data and scope boundaries intact.',
    },
    privacyNote:
      'The repository is public: fictional data only, no interview notes, no real names, no employer code or data, and never commit API keys or tokens.',
    minutes: 300,
    xp: 600,
  },
  nextRecommendation:
    'Level 5 adds an AI agent on top of MoneyPilot. Keep your calculation functions pure and tested: in Level 5 they become the deterministic tools the agent must call instead of doing the math itself.',
}
