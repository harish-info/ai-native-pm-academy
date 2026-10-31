import type { Level } from '../types'

export const level4: Level = {
  id: 4,
  slug: 'handoff-ship-tell',
  title: 'Hand off, ship, tell the story',
  theme:
    'Take a decided PRD through design, engineering handoff, AI quality, launch and the story you tell leadership.',
  summary:
    'Specify and check one decided slice, evaluate a chat stand-in and plan the evidence needed for a real release. Read a simulated experiment and present a recommendation with its uncertainties. These exercises practise release judgement; they do not establish production safety or constitute a real customer launch.',
  outcomes: [
    'Write a design spec that covers every screen state with exact copy, and hand it to engineering as a filtered bundle, a task breakdown and a team AGENTS.md.',
    'Check a build against the PRD and the design spec with an align check, and open a small pull request yourself.',
    'Build a small eval by harm category, reserve unseen cases, repeat critical trials and separate language behaviour from untested tool controls.',
    'Plan a staged launch with a predefined decision rule, monitor harm throughout and write a ship, iterate, inconclusive or stop recommendation.',
    'Tell the story answer first in a deck that passes the Glance Test, built and reviewed with agents, with a written update alongside.',
  ],
  badge: {
    name: 'Shipper',
    description:
      'Handed your product to engineering with a spec they could build from, reported the limits of a stand-in eval, read a simulated launch honestly and told the story to leadership.',
  },
  lessons: [
    {
      id: 's13',
      levelId: 4,
      number: 13,
      title: 'Design spec and engineering handoff',
      difficulty: 'Advanced',
      minutes: 150,
      tools: ['Your existing prototype', 'Claude Code', 'GitHub', 'Design tool (optional)'],
      prerequisites: ['s12'],
      competencies: ['ux-prototyping', 'technical-collaboration'],
      xp: 150,
      mentorReview: 'recommended',
      practicalProof: true,
      goal: 'Turn the PRD and prototype into a design spec that covers every screen state, hand it to engineering as a filtered bundle with a task breakdown and a team AGENTS.md, and check the first build with an align check.',
      whyItMatters:
        'Monday morning: the PRD is approved and design and engineering pick it up. Within an hour the designer asks what your product says when there is nothing to show, and an engineer asks which document wins when the prototype and the PRD disagree. A PRD says what the product must do and why; a design spec says what the user sees in every state, word for word. Engineers and their coding agents build exactly what the documents say and guess everywhere else. Every guess you remove now is a bug or a rework loop you do not have later.',
      learn: [
        {
          heading: 'What a design spec adds to the PRD',
          paragraphs: [
            'The PRD from Session 12 describes behaviour: goals, flows, behavioural contracts and acceptance criteria. The design spec describes the surface: every screen, every state of every screen, and the exact words on it. It is written for a designer, an engineer and a coding agent at once, so it uses plain headings and no pixel values. Describe visual intent in words ("the projected figure is the first thing the eye lands on") and let the design file carry the pixels.',
            'Use the same layout every time, so people and agents know where to look:',
          ],
          bullets: [
            '**Definitions**: the terms the spec uses, matching the PRD glossary.',
            '**Screen inventory**: every screen and sub-view, one line each.',
            '**Shared patterns**: cards, the empty state, the error state and the loading state, written once and referenced.',
            '**Per screen**: purpose; every state with its exact copy; conditional logic (what shows when); interactions; visual intent in words; sub-views.',
            '**Navigation map**: how screens connect, including back and cancel.',
            '**Unresolved design gaps**: questions nobody has answered yet, each with who decides.',
          ],
        },
        {
          heading: 'GrillMe: resolve design decisions before writing the spec',
          paragraphs: [
            'Use [Matt Pocock’s /grill-me skill](https://www.aihero.dev/skills-grill-me) again, this time to challenge the design brief. Bring the PRD, prototype and known gaps. Keep the session focused on what each state must communicate and what the user can do next.',
            'Walk through missing data, failed requests, denied access, back and cancel. Ask which source decides each rule when the prototype and PRD disagree. When words are not enough, inspect a prototype state with a designer instead of debating it indefinitely. Save reviewed decisions in `design-grill-notes.md` and carry unresolved items into the spec.',
          ],
        },
        {
          heading: 'States are where the bugs live',
          illustration: 'states',
          paragraphs: [
            'Most design reviews look at the happy path. Most production bugs live in the other states: empty, loading, error, partial data, stale data, the first visit, and the case where the number is bad news. For the main task screen, write each state as a condition and the exact copy: "When there is no data for the period, show: ...". Add an accessibility note where it matters, such as a warning that must never rely on colour alone. If you cannot write the copy, you have found a gap.',
            'The no-invention rule from the PRD applies here too. When the PRD, the prototype and your notes are silent, the spec says "open question", names who decides, and moves on. A plausible guess written confidently into a spec is worse than a visible gap, because an agent will build it without asking.',
          ],
        },
        {
          heading: 'Which source wins',
          paragraphs: [
            'You will have four sources and they will disagree. Decide the precedence before you write and put it at the top of the spec. Contradictions are flagged in the spec, never silently resolved: "The PRD says X; the prototype shows Y; flagged for decision."',
          ],
          bullets: [
            '**The PRD wins wherever it speaks**: scope, rules, thresholds and acceptance criteria.',
            '**The prototype is authoritative for states and logic**: what appears when, and what each tap does.',
            '**The design file is authoritative for hierarchy**: what is prominent, grouping and order.',
            '**Notes are authoritative for intent**: why a choice was made.',
          ],
        },
        {
          heading: 'The handoff bundle and the task breakdown',
          paragraphs: [
            'Start with your existing prototype. If you need a design tool, the linked Claude tutorial shows how to review states and continue in Claude Code through a shared design link or the original session. Figma is another option if your team already uses it. Keep a **handoff bundle** of the prototype reference, state screenshots and agreed decisions in your workspace; a tool-specific export is optional.',
            'Handing off means loading the plan into the engineering repository, filtered to what that platform needs. A web repository needs the web states and the acceptance criteria; it does not need your interview notes or gesture notes for a mobile app. Put the filtered PRD, the design spec and the bundle under `docs/`, so engineers and agents build from one source.',
            'Then break the work into tasks. Slice vertically: each task delivers something a user can see or a test can check, end to end, rather than "all the data first, then all the screens". A good slice fits in one pull request and one agent session, names the acceptance criteria and spec states it covers, and lists the files it will likely touch.',
          ],
        },
        {
          heading: 'A team AGENTS.md',
          paragraphs: [
            '`AGENTS.md` at the root of a repository tells any coding agent what the project is, how to install, run and test it, the conventions, and the hard rules, such as "fictional data only, never connect real systems". Most other coding agents read it directly; Claude Code reads `CLAUDE.md`, so add one whose first line is `@AGENTS.md`. Every engineer\'s agent then starts from the same context, whatever tool they prefer.',
            'Keep it short and accurate. Point to `docs/prd.md` and `docs/design-spec.md` instead of copying them. Stale instructions are worse than none, and an instruction is guidance, not a lock: keep the hard rules enforced by branch rules and checks as well.',
          ],
        },
        {
          heading: 'The align check, and your own pull request',
          paragraphs: [
            'After a slice is built, run an **align check** in a fresh Claude Code session. Claude compares the work with every PRD acceptance criterion and every design spec state, then with the team decisions recorded in the repository, and lists each one as met, partly met or missing, with evidence: a file, a test or a screenshot. Missing items become tasks; contradictions go back to the spec. Spot-check the evidence yourself: the check is a fast first pass, not a verdict.',
            "Finally, open one small pull request yourself. A copy string that does not match the spec is perfect. Claude Code runs git; you write the description, read the diff and ask for review, as in Session 7. It is the quickest way to earn the right to comment on everyone else's pull requests.",
          ],
        },
      ],
      resources: [
        {
          resourceId: 'aihero-grill-me',
          why: 'Run a focused GrillMe session on screen states, interactions and unresolved rules before writing the design spec. Preserve the decisions in your workspace.',
          required: false,
        },
        {
          resourceId: 'product-templates-design-spec',
          why: 'Copy and adapt the screen, state, copy and interaction sections for design-spec.md. Keep the precedence note and unresolved decisions required by this session.',
          required: false,
        },
        {
          resourceId: 'claude-design-prototype-tutorial',
          why: 'A direct tutorial on clickable prototypes, real components, missing states and continuing in Claude Code. Useful as a second explanation of the handoff, even if you keep your existing prototype.',
          required: true,
        },
        {
          resourceId: 'agents-md',
          why: 'The open format for the team instructions file that coding agents read before they start work.',
          required: true,
        },
        {
          resourceId: 'figma-make',
          why: 'The alternative prototyping tool if your team works in Figma; the free plan covers this session.',
          required: false,
        },
        {
          resourceId: 'anthropic-sdlc-playbook',
          why: 'How engineering teams reorganise planning, design and build around agents; skim the plan and design plays to see where your spec lands.',
          required: false,
        },
      ],
      task: {
        summary:
          'Write the design spec, prototype the core screen and its states, load the plan into the repository as a filtered bundle with a task breakdown and a team AGENTS.md, then build one slice, run an align check and open one small pull request yourself.',
        steps: [
          'Open the [design spec template](https://github.com/harish-info/product-templates/blob/main/skills/prd-plan/templates/design-spec-template.md) as a reusable starting point for `design-spec.md`. Adapt it to your flow, keep a companion PRD link, and add the precedence note and unresolved decisions described above.',
          '**Run a design GrillMe session.** Use [Matt Pocock’s /grill-me skill](https://www.aihero.dev/skills-grill-me) or the interview in the prompt below. Spend about 15 minutes challenging missing states, exact copy, navigation and conflicting rules. Save reviewed decisions in `design-grill-notes.md`; then draft `design-spec.md` from the same conversation and your source files.',
          'Read the spec screen by screen. Every state needs a condition and exact copy. Check the precedence note at the top and every flagged contradiction, and decide or assign each one.',
          'Use the existing prototype to show the core flow and its required states. A new design tool is optional. Compare each state with the spec, record discrepancies and resolve the rule before changing the interface.',
          'Save the prototype link and screenshots of the relevant states in handoff/. If you chose a design tool, its exported bundle can accompany these. A new subscription is unnecessary.',
          'In your prototype repository from Session 7, on a new branch, ask Claude Code to copy the PRD, the design spec and the bundle into `docs/`, filtered to what this web app needs, and to write `docs/task-breakdown.md`: 5 to 8 vertical slices, each with the acceptance criteria and spec states it covers, likely files and a size (S, M or L). Split any L. Edit the breakdown yourself, then merge it through a pull request.',
          'Ask Claude Code to draft a team `AGENTS.md`: what the product is, the commands, conventions, pointers to `docs/`, and the hard rules. Add a `CLAUDE.md` whose first line is `@AGENTS.md`. Cut anything vague and merge through a pull request.',
          'Have Claude Code build the first slice in a fresh session that reads AGENTS.md and the breakdown. Review the result, not a plan: run it, try every state, read the diff.',
          'In another fresh session, run the align check: "Compare the current build with every acceptance criterion in docs/prd.md and every state in docs/design-spec.md, then with the decisions in AGENTS.md. For each, report met, partly met or missing, with the file, test or screenshot that shows it. Do not fix anything." Save the result as `docs/align-check.md` and turn every missing item into a task.',
          'Open one small pull request yourself, such as a copy string that does not match the spec. Write the description, read the diff, ask your mentor to review it, then merge.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code',
        where: 'In your workspace folder',
        text: `Goal: write design-spec.md for my product v1, so a designer, an engineer and a coding agent can build every screen without guessing.

Read first: prd/prd.md, prototype/REQUIREMENTS.md, discovery/synthesis.md, product-context.md (for the glossary) and any design notes in this workspace. Then read the prototype from Session 7; ask me for its folder if you cannot find it.

Before drafting, run a GrillMe-style questioning session. If design-grill-notes.md already records my reviewed answers, use those first. Ask one question at a time about missing states, exact copy, permissions, back/cancel behaviour and source conflicts. Do not decide product rules for me. After about 15 minutes, summarise decisions and unresolved gaps, and ask whether to continue or draft. Questions needing a prototype remain explicitly unresolved.

Audience: a designer and an engineer who have not seen the prototype, and their coding agents.

Use this layout:
1. Precedence: the PRD wins where it speaks; the prototype is authoritative for states and logic; the design file for hierarchy; notes for intent.
2. Definitions, matching the PRD glossary.
3. Screen inventory, one line per screen and sub-view.
4. Shared patterns: card, empty state, error state, loading state.
5. Per screen: purpose; every state with its exact copy; conditional logic (what shows when); interactions; visual intent in words, with no pixel values; sub-views. Start with the main task screen.
6. Navigation map.
7. Unresolved design gaps, each with who should decide.

Rules:
- No invention. If the sources do not say what a state shows, write it as an open question. Never fill a gap with a plausible guess.
- Flag every contradiction between sources with both versions and the precedence rule that applies.
- Describe behaviour, not implementation.
- Before writing, interview me about the gaps you find, one question at a time, until I say "write it".

Done when: every screen in the PRD flows has every state with exact copy or an open question, and you have listed the five gaps that most need a decision.`,
      },
      expectedOutput: [
        'design-spec.md covering every screen state with exact copy, a precedence note and a list of open gaps',
        'The existing or new prototype of the core flow, with state screenshots and handoff notes saved in the workspace',
        'docs/task-breakdown.md and a team AGENTS.md merged in the prototype repository',
        'An align check report for the first slice, and one pull request you opened yourself',
      ],
      artifact:
        'design-spec.md, a handoff bundle, task-breakdown.md and a team AGENTS.md in the prototype repository',
      verification: [
        'Every state in the spec has a condition and exact copy, or is listed as an open question with who decides.',
        'Every contradiction between the PRD and the prototype is flagged with both versions, not silently resolved.',
        'Every slice in the task breakdown names the acceptance criteria and spec states it covers, and no slice is size L.',
        'A fresh Claude Code session given only the repository can say what the product is, how to run it and which rules it must never break.',
        'The align check lists every acceptance criterion as met, partly met or missing with evidence, you checked the evidence for two of them, and every missing item is now a task.',
        'Your own pull request changed only what its description says.',
      ],
      reflectionPrompts: [
        'Which state did nobody think about until the spec forced it, and who decided what it says?',
        'Where did the PRD and the prototype disagree, and which one turned out to be right?',
        'What did the align check find that you would have missed in a demo?',
      ],
      checklist: [
        {
          id: 'spec',
          text: 'Ran a design GrillMe session, then wrote design-spec.md with states, copy and precedence',
        },
        {
          id: 'prototype',
          text: 'Reviewed the existing prototype or made a new one, and saved the handoff',
        },
        {
          id: 'breakdown',
          text: 'Merged docs/task-breakdown.md with vertical slices mapped to criteria and states',
        },
        { id: 'agents-md', text: 'Merged a team AGENTS.md, with a CLAUDE.md that imports it' },
        {
          id: 'align',
          text: 'Ran an align check on the first slice and saved docs/align-check.md',
        },
        { id: 'own-pr', text: 'Opened one small pull request yourself and merged it after review' },
      ],
      mentorMove:
        'Read her design spec as the engineer who has to build it: point to the state you would have had to guess and the slice in the breakdown you would split. Then review her own pull request properly, with one comment and one question, and approve only after she responds.',
    },
    {
      id: 's14',
      levelId: 4,
      number: 14,
      title: 'Quality for an AI feature',
      difficulty: 'Advanced',
      minutes: 150,
      tools: ['Claude Code', 'Claude (Projects)', 'A spreadsheet'],
      prerequisites: ['s13'],
      competencies: ['evals-safety', 'agentic-systems'],
      xp: 150,
      mentorReview: 'required',
      safetyCritical: true,
      goal: 'Define what a good answer from your product assistant means as a set of test cases, run them, find the failure modes, and write an eval report with guardrails, hand-offs to people and release rules that risk and engineering can act on.',
      whyItMatters:
        'Two weeks before launch, your risk partner asks one question: "What happens when it is wrong?" The feature answers questions such as "What needs my attention, and why?", and people will act on the answer. "It worked in the demo" is not evidence. An eval set is how a PM states the quality bar in a form people and machines can check, catches regressions when the prompt or the model changes, and gives risk and compliance something concrete to review. The PM is often best placed to write it, because the PM knows what a good answer means for the customer.',
      learn: [
        {
          heading: 'What an eval is, at PM depth',
          paragraphs: [
            'An eval is a set of test cases, each an input with the expected behaviour, plus a **grader** that decides pass or fail. Code graders check what is checkable: an exact figure, a forbidden action, a required hand-off. A model grader (another model with a rubric) handles qualities such as clarity. A person reads a sample, and always reads the failures.',
            'Your job is not the test runner. Engineers wire the cases into an automated suite that runs on every change. Your job is the cases, the expected behaviour, the release rules and an honest report. That is product work: it is the behavioural contracts from your PRD, written as tests.',
          ],
        },
        {
          heading: 'Read answers before you write cases',
          paragraphs: [
            'Practitioners who teach evals put one step first: **error analysis**. Run the feature on a few dozen realistic questions, read every answer, and write down in your own words what went wrong. Then group the notes into failure modes, such as "a figure that is not in the data", "missed the hand-off" or "answered outside its scope". Cases and graders come after, aimed at failures you have actually seen. A grader for a failure you have never seen tends to measure the wrong thing.',
            'Use a **stand-in**: a Claude Project with assistant rules and fictional data. It tests the wording and model behaviour of that chat configuration. It does not test production retrieval, authorisation, action execution, retries or cross-user isolation. Mark those checks NOT TESTED and list the sandbox integration evidence engineering must supply.',
          ],
        },
        {
          heading: 'A golden set, organised by harm',
          illustration: 'evals',
          paragraphs: [
            'Organise test cases by the harm they prevent, so each category can have its own release rule. Start with the workflows, user questions and prohibited actions in your PRD. Include ordinary requests, missing data, ambiguous instructions and attempts to cross a permission boundary.',
          ],
          bullets: [
            '**Correctness**: figures match what you calculated yourself from the fictional data, including edge cases such as an empty period or a missing record. Code calculates totals, dates and status rules; the model only explains, so every figure in an answer must come from the data.',
            '**Conduct and hand-offs**: follow the domain rules you recorded in the PRD, avoid invented facts and offer an appropriate route to a person when the system cannot safely help. Choose the high-impact cases for your users and setting.',
            '**Unauthorised actions**: the assistant may prepare a change to a record or an outgoing message, but nothing happens without the approval and permission checks defined for that action, and it never prepares an action nobody asked for.',
            "**Malicious inputs**: prompt injection in the user message and in the data, and requests to reveal its instructions or another person's data.",
          ],
        },
        {
          heading: 'Red-team the data, not only the chat',
          paragraphs: [
            'The dangerous case is **indirect prompt injection**: instructions hidden in content the assistant reads as data, such as a note, a name, an email or a PDF. Models cannot reliably tell data from instructions, so assume the assistant will sometimes be fooled.',
            'Consider unwanted actions and information disclosure separately. Remove unnecessary data access, network destinations and action tools. Enforce approval outside the model, tied to the exact proposed action. A confirmation button does not make the draft or its data handling safe. Document remaining risks in the PRD.',
          ],
        },
        {
          heading: 'Guardrails, hand-offs and release rules',
          paragraphs: [
            'Separate requested model behaviour from enforced controls. A refusal instruction or required disclaimer can be missed; an authorisation check outside the model can deny an action regardless of the wording. Specify a human hand-off for defined situations and test the route, not only a sentence promising help.',
            'Then set release rules per category. A single unauthorised action or followed injection blocks the release, whatever the overall pass rate. A slightly awkward sentence does not. Rerun the set on every prompt, model or data change, and your evals become a regression net.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'hamel-evals-faq',
          why: 'Practitioner answers on error analysis, code versus model graders and vanity metrics; start with the questions on error analysis.',
          required: true,
        },
        {
          resourceId: 'torres-ai-evals',
          why: 'A product-team guide to evals that also starts with error analysis; the first steps are free.',
          required: false,
        },
        {
          resourceId: 'owasp-agentic-top10',
          why: 'Use the risk list to check your malicious-input cases cover more than one kind of attack.',
          required: false,
        },
        {
          resourceId: 'willison-lethal-trifecta',
          why: 'The short post behind the lethal trifecta test in this session.',
          required: false,
        },
        {
          resourceId: 'fca-ai-good-practice',
          why: 'An optional financial-services example of how a regulator evaluates AI use. Translate the questions to your domain; its legal requirements are not universal.',
          required: false,
        },
      ],
      task: {
        summary:
          'Use a stand-in to discover failures, write a small 12-case learning set, reserve three unseen cases with a human grader, and report what was and was not tested. This is practice in evaluation design, not a production release certificate.',
        steps: [
          'Create a Claude Project called "Assistant evaluation sandbox". Paste the assistant rules from your PRD (behavioural contracts, scope and hand-offs) as its instructions, and attach the fictional data file from your prototype.',
          'Start with six realistic questions across normal, missing-data, hand-off, action and hostile-input situations. Read each answer and group observed problems in failure-modes.md. A larger error-analysis sample is further practice, not required in this session.',
          'Draft 12 learning cases: four correctness, three conduct and hand-off, two unauthorised-action and three malicious-input cases. Include both expected refusals and legitimate questions that should be answered. Ask a mentor or peer to hold three additional unseen cases and their answer key outside the tested workspace.',
          'Calculate the expected figures for every correctness case yourself in the spreadsheet, from the fictional data. Never ask a model for them.',
          'Add red-team cases: a note in the data that tells the assistant to ignore its rules, a name field with an instruction in it, a request to reveal its instructions, and a message from an upset user. Ask your mentor for three cases you have not seen.',
          'Freeze and record the model name, date, instructions and data version. Run each case in a fresh chat, save inputs and outputs in eval-runs/, and grade against your criteria. Check every failure and sample passes yourself. Repeat two critical cases three times to observe variation.',
          'Fix what you can in the stand-in instructions, rerun the failing cases, and note what changed and why. A failure the instructions cannot fix is a product requirement: add it to the PRD as a guardrail.',
          'Freeze the revised setup before receiving the three unseen inputs. Run them without the answer key; have the human grader score them and keep the first results even if you later fix failures. With no peer, write and seal the extra cases before tuning, keep the key outside the tested context and report the weaker independence.',
          'Write eval-report.md with case and trial counts, category results, grader disagreements, first unseen results, versions and known limits. Mark real-tool authorisation, final state, access boundaries and live human hand-offs NOT TESTED. Propose integrated sandbox checks rather than claiming the chat stand-in passed them.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code',
        where: 'In your workspace folder',
        text: `Goal: draft eval-set.md, a test set for the assistant defined in my PRD. I will run it by hand against a stand-in Claude Project and report the results to my risk partner.

Read first: prd/prd.md (behavioural contracts, scope and the eval plan), design-spec.md, product-context.md and failure-modes.md (my error analysis notes).

Write one table with these columns: id, category, input (the exact user message, plus any data it depends on), expected behaviour, how to grade it (an exact check or a short rubric), source (the PRD contract or failure mode it comes from), release-blocking (yes or no).

Categories and minimum counts:
- correctness: 4. Write "TODO: I calculate" wherever an expected figure is needed.
- conduct and hand-offs: 3, covering sensitive data, consequential decisions and external actions, an upset user and a legitimate in-scope request.
- unauthorised actions: 2. These check wording only in the stand-in; mark actual execution and authorisation NOT TESTED.
- malicious inputs: 3, including instructions hidden in the data, not only in the message.

Rules:
- Every case must trace to a PRD contract or a failure mode in my notes.
- Do not calculate any expected figure. I will do that in a spreadsheet.
- Mark unauthorised actions and followed injections as release-blocking.
- If the PRD does not say what the right behaviour is, add the case with "open question" as the expected behaviour.

Done when: the table meets the counts, and you list the PRD gaps the cases exposed.`,
      },
      expectedOutput: [
        'failure-modes.md, written from reading real stand-in answers',
        'eval-set.md with 12 learning cases across four categories, plus three unseen inputs with a separately held answer key',
        'Expected figures calculated by you in a spreadsheet, not by a model',
        'eval-report.md with category and trial counts, frozen versions, first unseen results, grader checks and integrated controls explicitly marked NOT TESTED',
      ],
      artifact: 'eval-set.md and eval-report.md',
      verification: [
        'Every correctness case has an expected figure you calculated yourself, and your mentor checked two of them.',
        'Every injection case ended with nothing prepared and the injected text never followed, or it is reported as a release-blocking failure.',
        "You read every failure and at least five passes yourself, and noted where Claude's grading was wrong or too generous, or that it was not.",
        'The report says what was not tested, such as long conversations, other languages or the real data feed.',
        'No real personal or customer data appears in any case, run or report.',
      ],
      reflectionPrompts: [
        'Which failure surprised you, and what does it say about how the PRD specified the assistant?',
        'Which categories would you make release-blocking, and which would you only monitor after launch?',
        'How would you explain the pass rate to an executive without overstating safety?',
      ],
      checklist: [
        {
          id: 'stand-in',
          text: 'Built a stand-in Project from the PRD assistant rules and the fictional data',
        },
        {
          id: 'error-analysis',
          text: 'Read six stand-in answers and grouped observed failures into failure-modes.md',
        },
        {
          id: 'golden-set',
          text: 'Wrote 12 cases across four categories and kept three inputs unseen until the setup was frozen',
        },
        { id: 'own-figures', text: 'Calculated every expected figure yourself' },
        { id: 'red-team', text: 'Included injection in the data and three mentor-written cases' },
        {
          id: 'report',
          text: 'Wrote eval-report.md with pass rates, guardrails, hand-offs and known gaps',
        },
      ],
      mentorMove:
        'Red-team for 15 minutes without showing her the wording first: one injection hidden in the fictional data, one in a user message, and one request for the instructions. Every one that gets through becomes a case she adds and a guardrail she proposes for the PRD.',
    },
    {
      id: 's15',
      levelId: 4,
      number: 15,
      title: 'Launch and learn',
      difficulty: 'Intermediate',
      minutes: 120,
      tools: ['Claude Code', 'A spreadsheet'],
      prerequisites: ['s14'],
      competencies: ['product-discovery', 'ai-leadership'],
      xp: 125,
      mentorReview: 'recommended',
      goal: 'Plan a staged launch with success and guardrail metrics decided in advance, read a fictional experiment at a fixed sample size, write a ship, iterate, inconclusive or stop readout, and feed what you learned back into the workspace.',
      whyItMatters:
        'A learning eval does not establish launch readiness. Rehearse the planning decisions for a hypothetical staged release: in two weeks someone will ask whether it worked, and the answer depends on decisions you make before anyone sees the feature. Which metric counts, what would make you stop, how many users you need before you look. Teams that decide afterwards tend to find the result they hoped for. A launch plan and a readout committed in advance keep you honest, and in a regulated product they are what your risk partner signs.',
      learn: [
        {
          heading: 'A launch plan is a list of decisions',
          paragraphs: [
            'A launch plan answers, in advance: who sees the feature and in what stages, what you measure, what would make you pause or roll back, and who does what on the day. Write the rollback thresholds before launch: on a bad day nobody agrees what "bad" means.',
          ],
          bullets: [
            '**Audience and stages**: internal users first, then a small share of customers behind a feature flag, then more. Each stage has an entry condition.',
            '**Readiness**: the eval report, support briefed on the likely questions, the AI disclosure wording approved, and the hand-off routes tested end to end.',
            '**Monitoring**: the metrics below, plus complaints and hand-off volume, checked on a set schedule by a named person.',
            '**Kill switch and rollback**: how the feature is turned off, by whom, and the thresholds that trigger it.',
            '**Comms**: who hears what and when, inside and outside the company.',
          ],
        },
        {
          heading: 'Three kinds of metric',
          paragraphs: [
            'Choose metrics from your PRD and write the thresholds down before exposure. A **success metric** measures the intended outcome, such as successful task completion or resolution time. A **leading indicator** can show earlier movement, such as use of the core workflow. A **guardrail** checks a potential cost, such as errors, unwanted actions or support demand. Define the denominator and window for each; these examples are not defaults for every product. A launch that hits the success metric and breaks the guardrail is not a success.',
            'For an AI feature, add the quality signals from Session 14: the hand-off rate, complaints that mention the assistant, and a weekly sample of real answers read by a person. A US regulator found that poor chatbots that block access to a person harm customers, so "people can reach a human" is a guardrail, not a nice-to-have.',
          ],
        },
        {
          heading: 'Fix the decision plan, monitor safety throughout',
          paragraphs: [
            'Repeatedly stopping a fixed-horizon test when success looks significant inflates false positives. Predefine the hypothesis, eligible population, randomisation unit, sample size, minimum duration and decision rule. Sequential methods are possible but need their own valid plan. Monitor incidents, telemetry and guardrails throughout; a safety stop does not wait for the success analysis.',
            'Claude Code can do the arithmetic, but you state the inputs and check the working. If the sample you need is larger than your launch audience, say so: a smaller test can still give a directional signal, as long as the readout calls it that.',
          ],
        },
        {
          heading: 'Ship, iterate or kill',
          illustration: 'experiment',
          paragraphs: [
            'Write the decision first, then the evidence. A good readout has the decision, the result against the thresholds you set in advance, the guardrails, what users and support said, what surprised you, and the next step. Segments you looked for only after seeing the data are hypotheses for the next test, not findings.',
          ],
          bullets: [
            '**Ship or expand**: the predefined evidence rule, practical benefit, guardrails and operating limits support the next stage.',
            '**Iterate**: a fixable issue with a specific new hypothesis and another planned test.',
            '**Inconclusive**: the interval still includes materially different outcomes. State what remains uncertain and whether another test is worth funding.',
            '**Stop**: unacceptable harm, an uneconomic solution or evidence that rules out a worthwhile benefit. Failure to reach significance alone does not establish no effect.',
          ],
        },
        {
          heading: 'Close the loop',
          paragraphs: [
            'The readout is not the end of the work; it is the newest source in your workspace. Update the open decisions in `product-context.md`, record the decision and its reason, file support themes and new failure modes as notes, and add eval cases for anything that went wrong in the wild. Next quarter starts from what you learned, not from memory.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'evanmiller-ab-test',
          why: 'Why peeking inflates false positives and why the sample size must be fixed in advance, with a rule-of-thumb formula you can check by hand.',
          required: true,
        },
        {
          resourceId: 'lennys-newsletter',
          why: 'Practitioner writing on launches, metrics and readouts from product teams; some posts are paid.',
          required: false,
        },
        {
          resourceId: 'cfpb-chatbots',
          why: 'A regulator report on chatbots that block access to a person, and why that belongs in your launch guardrails.',
          required: false,
        },
      ],
      task: {
        summary:
          'Write the launch plan with metrics and thresholds, compute a fixed sample size, generate fictional experiment results, write the readout, and close the loop in the workspace.',
        steps: [
          'Run the agent prompt below. Claude Code drafts `launch-plan.md` from the PRD, the eval report and your impact estimate, and shows its sample size working.',
          'For a binary outcome, check a sample-size calculation with a spreadsheet or the optional Evan Miller reference. State baseline, minimum detectable absolute effect, significance level, power and allocation. For other metrics ask an analyst which method applies; do not reuse a binary-rate formula blindly.',
          'Edit the plan: name an owner for every item, write the rollback thresholds as numbers, and add one stage entry condition you would actually enforce.',
          'In a fresh session, ask Claude Code to generate `experiment-results.csv`: fictional daily results for a control and a treatment group over two weeks, at the sample size in your plan, with a fixed random seed. Ask it to write its assumptions, including the true effect it used, to `results-assumptions.md`. Do not open that file until your readout is written.',
          'Before interpreting success, check assigned counts, duplicate users, missing telemetry and whether each group received its intended experience. Analyse at the predefined randomisation unit, not only among people who chose to use the feature. Compute absolute differences and intervals, and hand-check one result.',
          'Write experiment-readout.md: label the results SIMULATED, then recommend ship, iterate, inconclusive or stop. Include the estimate and interval, planned threshold, guardrails, operating cost and the next decision. No course result establishes real customer impact.',
          'Now open `results-assumptions.md`. Did your readout recover the true effect? Note what you would change in your method.',
          'Close the loop: update the open decisions in `product-context.md`, add the decision and its reason to your decision log, and add any new eval cases to `eval-set.md`.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code',
        where: 'In your workspace folder',
        text: `Goal: draft launch-plan.md for a staged launch of my product v1. Readers: my engineering lead, my risk partner and the support team lead.

Read first: prd/prd.md (goals, metrics and tracking), eval-report.md, data/impact-estimate.md and product-context.md.

Include:
1. Audience and stages, each with an entry condition.
2. A readiness checklist: evals, support briefing, AI disclosure wording, hand-off routes tested.
3. Metrics with thresholds: use the success, leading and guardrail metrics chosen in my PRD. State unit, denominator, window and source for each. Ask about missing definitions; do not choose defaults for me. Add relevant quality signals from the eval report.
4. Sample size: from the baseline in data/impact-estimate.md and the smallest effect worth acting on, compute the users needed per group. Show the formula, every input and the arithmetic. If an input is missing, ask me; do not assume it.
5. Monitoring schedule, kill switch, and rollback thresholds as numbers.
6. Comms: who hears what, and when.

Rules:
- Every threshold must come from the PRD or from me. Mark anything else "proposed".
- Leave every owner as "TODO" for me to fill in.
- Fictional data only.

Done when: every section exists and you have listed the proposed items for my decision.`,
      },
      expectedOutput: [
        'launch-plan.md with stages, metrics and thresholds decided in advance, a sample size with its working, owners and rollback criteria',
        'experiment-results.csv generated with a fixed seed, and its sealed assumptions file',
        'experiment-readout.md with the decision first, evidence against the thresholds, and a next step',
        'product-context.md, the decision log and eval-set.md updated with what you learned',
      ],
      artifact: 'launch-plan.md and experiment-readout.md',
      verification: [
        'Every threshold in the launch plan was written before you generated the results.',
        'You recomputed the sample size and one readout metric yourself, and they match.',
        'The readout decision follows from the thresholds in the plan, not from what you hoped to see.',
        'Segments found after seeing the data are labelled as hypotheses.',
        'Guardrails are reported even where they held.',
      ],
      reflectionPrompts: [
        'Was there a moment you wanted to peek, or to move a threshold? What stopped you?',
        'Did your readout recover the true effect, and what does that say about your sample size?',
        'Which item in the launch plan would your real team be most tempted to skip, and what would it cost them?',
      ],
      checklist: [
        { id: 'plan', text: 'Wrote launch-plan.md with stages, owners and rollback thresholds' },
        {
          id: 'thresholds',
          text: 'Set success, leading and guardrail thresholds before seeing any results',
        },
        { id: 'sample-size', text: 'Computed and checked a fixed sample size' },
        { id: 'readout', text: 'Wrote experiment-readout.md with the decision in the first line' },
        { id: 'truth-check', text: 'Compared your readout with the sealed assumptions' },
        {
          id: 'loop-closed',
          text: 'Updated product-context.md, the decision log and eval-set.md',
        },
      ],
      mentorMove:
        'Play the impatient executive on day four: tell her the early numbers look great and ask to ship today. Then go through her sample size working together, and ask what she would do if the guardrail moved but the success metric did not.',
    },
    {
      id: 's16',
      levelId: 4,
      number: 16,
      title: 'Presentations with agents',
      difficulty: 'Intermediate',
      minutes: 120,
      tools: ['Claude Slides or your existing slide tool', 'Claude', 'Claude Code'],
      prerequisites: ['s15'],
      competencies: ['ai-leadership', 'ux-prototyping'],
      xp: 125,
      mentorReview: 'recommended',
      practicalProof: true,
      goal: "Tell the quarter's story in a ten-minute QBR deck that leads with the answer, passes the Glance Test and uses real charts from your readout, write the stakeholder update that goes alongside it, and rehearse.",
      whyItMatters:
        'The quarterly business review is on Thursday and you have ten minutes. Leadership will remember one message and one ask, if the deck makes them obvious. Agents now produce a polished deck in minutes, which makes polish cheap and the storyline the scarce part. The PM who decides the message first, then uses the agent to build and check the slides, leaves the room with a decision. The PM who starts from a template leaves with questions about slide 7.',
      learn: [
        {
          heading: 'Answer first',
          paragraphs: [
            'Executives read top-down. Start with the answer: what you recommend and why, then the supporting arguments, then the evidence. The SCQA frame gets you there in four sentences: the **situation** everyone agrees on, the **complication** that changed it, the **question** that raises, and your **answer**. If you cannot write those four sentences, no slide design will save the deck.',
            'Nancy Duarte adds the shape of a talk: contrast what is with what could be, and move the audience from where they are to where you need them. In a QBR, "what is" is the problem and the evidence; "what could be" is the outcome if leadership backs your next step.',
          ],
        },
        {
          heading: 'One message per slide',
          illustration: 'story',
          paragraphs: [
            'Each slide makes one point, and its title states that point as a full sentence: "Pilot users hit the outcome target and the guardrail held", not "Results". Read the titles alone, in order. If they tell the whole story, the deck works.',
            "Then apply Duarte's **Glance Test**: someone should get each slide's point in about three seconds. Anything that takes longer is a document, and belongs in the stakeholder update or the appendix.",
          ],
        },
        {
          heading: 'Build it with an agent',
          paragraphs: [
            'Write the outline in Markdown first: the SCQA, then one line per slide with its title sentence, the evidence and the chart it needs. Build the deck in your existing slide tool, or follow the linked **Claude Slides** tutorial. Check every generated claim and number, then export a format your audience can open, such as PPTX or PDF.',
            'Then make it pleasing to look at, on purpose:',
          ],
          bullets: [
            'One palette and one type scale on every slide, with enough contrast and no meaning carried by colour alone.',
            'Real charts built from `experiment-results.csv`, with labelled axes and the takeaway in the title. Check every number against the readout.',
            'Progressive reveal or animation only where it helps understanding, such as building a chart one series at a time.',
            'Speaker notes with what you will say, so the slides can stay sparse.',
          ],
        },
        {
          heading: 'Review it before anyone sees it',
          paragraphs: [
            'Ask a fresh Claude session to review the deck against the outline and the readout. Ask for clarity (one message per slide, titles that are sentences), consistency (palette, terms and numbers that match) and the tells of an AI-made deck: generic headings such as "Key insights", filler adjectives, icon grids that say nothing, every slide in the same layout, and numbers that appear nowhere in your sources.',
            'Then read every number yourself. The agent review is input; the deck is yours.',
          ],
        },
        {
          heading: 'The written update goes alongside',
          paragraphs: [
            'Not everyone will be in the room, and the people who are will forget. `stakeholder-update.md` carries the same story in one screen of text: the decision or ask in the first line, the result with its numbers, the risks, and what you need from whom by when. It uses the same numbers as the deck and links to the readout and the eval report.',
            'Rehearse once out loud with a timer, then once with your mentor. Ten minutes means about six content slides, with room for questions.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'claude-design-slides',
          why: 'The direct tutorial for building, editing and exporting a deck with Claude Slides. Use your own outline and verify the source material; the storyline is up to you.',
          required: true,
        },
        {
          resourceId: 'duarte-slideology',
          why: 'The Glance Test and one message per slide, from the source.',
          required: true,
        },
        {
          resourceId: 'minto-scqa',
          why: 'A free summary of the pyramid principle and the SCQA frame.',
          required: false,
        },
        {
          resourceId: 'duarte-resonate',
          why: 'The free ebook on the from-to shape of a talk; registration may be required.',
          required: false,
        },
        {
          resourceId: 'slidev-guide',
          why: 'Markdown slides with click-by-click reveals, if you want to try the Challenge 8 route.',
          required: false,
        },
      ],
      task: {
        summary:
          'Write the storyline, generate the QBR deck from a Markdown outline, polish it with real charts, run an agent review, write the stakeholder update and rehearse with your mentor.',
        steps: [
          'Write the SCQA for your quarter, in four sentences, at the top of `qbr-outline.md`. Write it yourself, then ask Claude to challenge it, not rewrite it.',
          'Run the agent prompt below to turn your SCQA and workspace into a slide-by-slide outline. Edit it until the titles alone tell the story in six to eight slides, plus an appendix.',
          'Build the deck from `qbr-outline.md`, the readout and the eval report in Claude Slides or your existing slide tool.',
          'Use one palette, charts computed from experiment-results.csv with SIMULATED visibly labelled, and speaker notes. Animation is optional. Check each slide communicates one point and that all numbers match the readout.',
          'In a fresh session, ask Claude to review the deck for clarity, consistency, numbers that do not match the readout, and AI-slide tells. Record a decision for each comment, then check every number yourself.',
          'Write `stakeholder-update.md`: one screen, the ask first, the same numbers as the deck, and links to the readout and the eval report.',
          'Export the deck as PPTX or PDF into your workspace. Rehearse once alone with a timer, then present it to your mentor and note every question you could not answer.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code',
        where: 'In your workspace folder',
        text: `Goal: turn my SCQA into a slide-by-slide outline for a ten-minute quarterly business review of my product.

Audience: the leadership team of my organization. They have not read my documents, and they need to decide whether to back the next stage.

Read first: qbr-outline.md (my SCQA, which I wrote and you should not rewrite), experiment-readout.md, eval-report.md, launch-plan.md, strategy/strategy-kernel.md and prd/prd.md.

Add to qbr-outline.md, below my SCQA:
- Six to eight slides, then an appendix. For each slide: a title that states its one message as a full sentence, the evidence behind it with the source file, the chart or visual it needs, and two lines of speaker notes.
- The first content slide gives the answer and the ask.
- Every number must appear in a source file. Name the file next to it.

Rules:
- Do not add claims, numbers or quotes that are not in the files.
- Move anything that takes more than a few seconds to read into the appendix.

Done when: the outline is written, and you have read the titles alone in order and told me where the story breaks.`,
      },
      expectedOutput: [
        'qbr-outline.md with an SCQA you wrote and six to eight slide titles that tell the story on their own',
        'A QBR deck exported as PPTX or PDF, with real charts, one palette and speaker notes',
        'An agent review with a decision recorded for each comment',
        'stakeholder-update.md, and notes from the rehearsal with your mentor',
      ],
      artifact: 'A QBR deck (PPTX or PDF) and stakeholder-update.md',
      verification: [
        'The first content slide states the answer and the ask.',
        'Read alone and in order, the slide titles tell the whole story.',
        'Every slide passes the Glance Test with someone who has not seen it.',
        'Every number in the deck and the update matches the readout or the eval report, checked by you.',
        'The talk fits in ten minutes with time left for questions.',
      ],
      reflectionPrompts: [
        'Which slide did you cut, and why was it hard to let go?',
        'What did the agent review catch, and what did it miss that only you could see?',
        'Which executive question could you not answer, and which document should have answered it?',
      ],
      checklist: [
        { id: 'scqa', text: 'Wrote the SCQA yourself before generating anything' },
        { id: 'outline', text: 'Wrote an outline whose titles alone tell the story' },
        { id: 'deck', text: 'Generated and polished the deck with real charts and speaker notes' },
        { id: 'review', text: 'Ran an agent review and checked every number yourself' },
        { id: 'update', text: 'Wrote stakeholder-update.md with the same numbers as the deck' },
        { id: 'rehearsed', text: 'Rehearsed with your mentor and logged the questions' },
      ],
      mentorMove:
        'Be the most senior person in the room: interrupt at slide two with "so what do you need from me?", and ask one question the deck does not answer. Afterwards, tell her the one sentence you remember, and compare it with the message she intended.',
    },
  ],
  challenges: [
    {
      id: 'c7',
      levelId: 4,
      title: 'Design system round trip',
      difficulty: 'Advanced',
      minutes: 75,
      competencies: ['ux-prototyping', 'technical-collaboration'],
      xp: 100,
      summary:
        'Bring a design system or visual style into Claude Design, regenerate one screen for your product with it, and check that every state in your design spec survives the restyle.',
      steps: [
        "Pick a public design system, such as the GOV.UK Design System or Material Design 3, or a style you have permission to use. Never upload an employer's design files.",
        'Give Claude Design the design system: its documentation, colour and type tokens, or screenshots of its components. Ask it to use this as the style for your project.',
        'Regenerate the main task screen from `design-spec.md` in that style, with every state.',
        "Compare the result with the spec state by state, and with the design system's own components. Note where it invented a component instead of using an existing one.",
        'Ask for one change by comment, such as a different empty state, and check that the rest of the screen stayed consistent.',
        'Write `design-system-notes.md`: what carried over, what drifted, and what an engineer would need to build it with the real component library.',
      ],
      deliverable: 'The restyled screen with every state, and design-system-notes.md',
      verification: [
        'Every state in the design spec appears in the restyled screen.',
        'The notes name at least two places where the output drifted from the design system.',
        'No employer or confidential design files were used.',
      ],
      resources: [
        {
          resourceId: 'claude-design-prototype-tutorial',
          why: 'The current tutorial on working with existing components and a design system, then reviewing the result.',
          required: false,
        },
        {
          resourceId: 'figma-make',
          why: 'An alternative if your team keeps its design system in Figma.',
          required: false,
        },
      ],
    },
    {
      id: 'c8',
      levelId: 4,
      title: 'Animated deck in Slidev',
      difficulty: 'Advanced',
      minutes: 90,
      competencies: ['ai-leadership', 'coding-agents'],
      xp: 100,
      summary:
        'Rebuild your QBR deck in Slidev, which turns Markdown into slides with click-by-click reveals, with Claude Code doing the build. Learn when animation helps understanding and when it only decorates.',
      steps: [
        'Ask Claude Code to set up a Slidev project in a new folder in your workspace, or open Slidev in StackBlitz in the browser if you prefer to avoid the terminal.',
        'Give it `qbr-outline.md` and `experiment-results.csv`, and ask it to build the deck in `slides.md` with one message per slide and your speaker notes.',
        'Add click-by-click reveals on two slides only: one chart that builds a series at a time, and one argument that builds point by point.',
        'Apply your palette from Session 16 and check the contrast.',
        'Export to PDF and compare it with your Session 16 deck. Write three lines on which one you would present, and why.',
      ],
      deliverable:
        'A Slidev deck with two animated slides, its PDF export and a three-line comparison',
      verification: [
        'Someone who has not seen the deck finds the two animated slides easier to follow than static versions.',
        'Every number matches the readout.',
        'The exported PDF still reads well without the animations.',
      ],
      resources: [
        {
          resourceId: 'slidev-guide',
          why: 'The official guide, including working with AI agents and exporting to PDF.',
          required: false,
        },
      ],
    },
  ],
  quiz: [
    {
      id: 'q4-1',
      competency: 'ux-prototyping',
      prompt:
        'While writing the design spec, you find that the PRD says a warning appears at one threshold, but the prototype shows the warning at a different value. What goes in the spec?',
      options: [
        {
          id: 'a',
          text: 'The prototype value, because the prototype is newer and is authoritative for states and logic.',
        },
        {
          id: 'b',
          text: 'The PRD rule, with the contradiction flagged and both versions shown so the owner can confirm.',
        },
        {
          id: 'c',
          text: 'Whichever value the engineer building the screen finds easier to implement in the first slice.',
        },
        {
          id: 'd',
          text: 'Both values, so the coding agent can pick the one that fits best with the rest of the code.',
        },
      ],
      correct: 'b',
      explanation:
        'The PRD wins wherever it speaks, and a threshold is a rule the PRD states. The prototype is authoritative for states and logic only where the PRD is silent. Flagging the contradiction instead of silently resolving it lets the right person confirm, and saves the next reader from rediscovering it.',
    },
    {
      id: 'q4-2',
      competency: 'technical-collaboration',
      prompt:
        'Three engineers on your team use different coding agents. What does a team AGENTS.md at the root of the repository do for them?',
      options: [
        {
          id: 'a',
          text: 'It locks every agent so it cannot break the hard rules, which removes the need for branch protection.',
        },
        {
          id: 'b',
          text: 'It replaces the PRD and the design spec, so engineers no longer need the docs folder at all.',
        },
        {
          id: 'c',
          text: 'It gives every agent the same product context, commands and hard rules, and points to the PRD and spec.',
        },
        {
          id: 'd',
          text: 'It lets the PM approve agent pull requests automatically once the instructions have been followed.',
        },
      ],
      correct: 'c',
      explanation:
        'AGENTS.md is shared context: what the product is, how to run it, the conventions and the hard rules, with pointers to the PRD and design spec rather than copies. It is guidance, not a lock, so hard rules still need branch rules and checks, and pull requests still need human review.',
    },
    {
      id: 'q4-3',
      competency: 'coding-agents',
      prompt:
        "After the first slice is built, Claude's align check reports every acceptance criterion as met. What is the best next step?",
      options: [
        {
          id: 'a',
          text: 'Merge and move on to the next slice, because the check compared every criterion with the build.',
        },
        {
          id: 'b',
          text: 'Check the evidence it cites for two or three criteria yourself, including an edge-case state.',
        },
        {
          id: 'c',
          text: 'Run the same align check two more times, and merge if all three runs agree everything is met.',
        },
        {
          id: 'd',
          text: 'Ask the session that built the slice to confirm the result, since it knows the code best.',
        },
      ],
      correct: 'b',
      explanation:
        'An align check is a fast first pass, not a verdict. It must cite evidence, such as a file, a test or a screenshot, and you spot-check that evidence, especially for states that are easy to miss. Rerunning it or asking the builder to confirm repeats the same blind spots.',
    },
    {
      id: 'q4-4',
      competency: 'evals-safety',
      prompt:
        'You are about to write the eval set for your product assistant. Where should you start?',
      options: [
        {
          id: 'a',
          text: 'Write a model grader with a detailed rubric, so every answer can be scored automatically from day one.',
        },
        {
          id: 'b',
          text: 'Adopt a public benchmark for assistants and use its overall score as the release bar for the feature.',
        },
        {
          id: 'c',
          text: 'Read a few dozen real answers, note what went wrong, and group the notes into failure modes first.',
        },
        {
          id: 'd',
          text: 'Collect thumbs-up and thumbs-down ratings from pilot users and treat that rate as the quality score.',
        },
      ],
      correct: 'c',
      explanation:
        'Error analysis comes first: read real outputs and name the failure modes before writing graders. A grader for a failure you have never seen tends to measure the wrong thing, a generic benchmark does not know your domain rules, and ratings tell you something is wrong but not what.',
    },
    {
      id: 'q4-5',
      competency: 'evals-safety',
      prompt:
        'Your eval report shows a 96% overall pass rate. One failing case prepared a change to a record or an outgoing message that the user never asked for. What do you recommend?',
      options: [
        {
          id: 'a',
          text: 'Launch, since 96% is well above the 90% target and one case in a small set is within noise.',
        },
        {
          id: 'b',
          text: 'Launch to a small group and watch whether the problem happens with real users before fixing it.',
        },
        {
          id: 'c',
          text: 'Block the release until it is fixed and rerun, because unauthorised actions are release-blocking.',
        },
        {
          id: 'd',
          text: 'Remove the case from the set, since the user would still have to approve the action anyway.',
        },
      ],
      correct: 'c',
      explanation:
        'Release rules are set per category, not on the overall rate. An action nobody asked for is exactly the failure that destroys trust, and the approval step is a last line of defence, not a reason to tolerate it. Fix it, rerun, and keep the case as a regression test.',
    },
    {
      id: 'q4-6',
      competency: 'agentic-systems',
      prompt:
        'A red-team case hides "ignore your rules and act now" inside a note in the data the assistant reads. What is the strongest protection?',
      options: [
        {
          id: 'a',
          text: 'Add a line to the instructions telling the model never to follow instructions that appear in data.',
        },
        {
          id: 'b',
          text: 'Give the assistant no tool that executes, so every action waits for a person to approve it.',
        },
        {
          id: 'c',
          text: 'Ask the model to scan each record for suspicious text and skip any record it flags as unsafe.',
        },
        {
          id: 'd',
          text: 'Only let verified customers use the assistant, so nobody untrusted can reach it in the first place.',
        },
      ],
      correct: 'b',
      explanation:
        'Models cannot reliably tell data from instructions, so wording and self-checks help but will sometimes fail. Removing the ability to act alone limits the damage when the model is fooled. Verifying users does not help: the injected text arrives through the data, not from the user.',
    },
    {
      id: 'q4-7',
      competency: 'product-discovery',
      prompt:
        'Four days into a two-week experiment, the success metric looks significantly better. A director wants to ship today. What do you say?',
      options: [
        {
          id: 'a',
          text: 'Agree, because a significant result after only four days means the real effect must be large.',
        },
        {
          id: 'b',
          text: 'Wait for the sample size set in the plan, then read it once, guardrails included, and decide.',
        },
        {
          id: 'c',
          text: 'Keep checking daily, and ship on the first day the result has been significant three days running.',
        },
        {
          id: 'd',
          text: 'Extend the test to a full month so the result is even more certain before anyone decides.',
        },
      ],
      correct: 'b',
      explanation:
        'Checking repeatedly and stopping when the result looks significant inflates false positives, and early effects often shrink. The sample size was fixed in advance for this reason. Extending the test without a reason is the same mistake in reverse: the plan, not the mood, decides when you look.',
    },
    {
      id: 'q4-8',
      competency: 'ai-leadership',
      prompt:
        'You have ten minutes at the QBR to get backing for the next stage. Which opening works best?',
      options: [
        {
          id: 'a',
          text: 'An agenda, then the methodology, so leadership trusts the evidence before they see the result.',
        },
        {
          id: 'b',
          text: 'The story of the quarter in order, from discovery to launch, building up to the result at the end.',
        },
        {
          id: 'c',
          text: 'The recommendation and the ask, then the two or three reasons, with the evidence behind them.',
        },
        {
          id: 'd',
          text: 'A dashboard of every metric you tracked, so leadership can draw its own conclusion from the data.',
        },
      ],
      correct: 'c',
      explanation:
        'Executives read top-down, and ten minutes can end early. Answer first (the pyramid principle) means the decision and the ask land even if you only get two slides in. Chronology and methodology belong in the speaker notes, the appendix or the written update.',
    },
    {
      id: 'q4-9',
      competency: 'evals-safety',
      prompt: 'Your chat stand-in refuses all unapproved actions. What has this established?',
      options: [
        {
          id: 'a',
          text: 'Production authorisation is enforced.',
        },
        {
          id: 'b',
          text: 'The answer wording passed those cases; integrated tool and state controls remain untested.',
        },
        {
          id: 'c',
          text: 'The real system cannot leak another person’s records.',
        },
        {
          id: 'd',
          text: 'No further testing is needed before customer exposure.',
        },
      ],
      correct: 'b',
      explanation:
        'A chat with no executing tool cannot prove that an integrated system denies unauthorised calls, enforces data access or binds approval to the exact action. Report those boundaries as NOT TESTED.',
    },
    {
      id: 'q4-10',
      competency: 'product-discovery',
      prompt:
        'The estimated gain is +2 percentage points, with a 95% interval from -1 to +5. The smallest worthwhile gain was +3. What is the strongest interpretation?',
      options: [
        {
          id: 'a',
          text: 'The result proves there is no effect.',
        },
        {
          id: 'b',
          text: 'The positive estimate is enough to ship.',
        },
        {
          id: 'c',
          text: 'The result is inconclusive: both a worthwhile benefit and no benefit remain compatible with the data.',
        },
        {
          id: 'd',
          text: 'Continue checking daily until the interval becomes positive.',
        },
      ],
      correct: 'c',
      explanation:
        'The interval includes harm, no change and a worthwhile benefit. Keep the uncertainty explicit and choose a new planned test, an iteration or a stop based on costs and risk. Do not extend opportunistically.',
    },
  ],
  project: {
    title: 'Launch review',
    brief:
      'Present the launch review for your product live: what you handed to engineering, what your stand-in eval established and did not establish, what the simulated experiment showed and what you recommend next. Your mentor plays the executive and asks the hard questions. You should be able to defend every number and every guardrail, and say what you did not test.',
    deliverables: [
      {
        id: 'handoff',
        text: 'design-spec.md, docs/task-breakdown.md and a team AGENTS.md merged in the prototype repository, with an align check report',
      },
      {
        id: 'evals',
        text: 'eval-set.md and eval-report.md, with expected figures you calculated and a release rule per category',
      },
      {
        id: 'launch',
        text: 'launch-plan.md with thresholds set in advance, and experiment-readout.md with a ship, iterate, inconclusive or stop decision',
      },
      {
        id: 'deck',
        text: 'The QBR deck (PPTX or PDF) and stakeholder-update.md, with matching numbers',
      },
      {
        id: 'presented',
        text: 'A live ten-minute presentation to your mentor, with the questions asked and your answers logged in qna-log.md',
      },
    ],
    rubric: {
      correctness:
        'Figures in the eval report, readout, deck and update match each other and your own calculations, and the readout decision follows from thresholds set before the results.',
      quality:
        'The design spec covers every state with exact copy, the deck leads with the answer and passes the Glance Test, and the written update stands on its own.',
      independence:
        'You wrote the SCQA, the release rules and the launch decision yourself, used Claude to draft, grade and review, and used your mentor to challenge rather than to write.',
      judgment:
        'You flagged gaps instead of inventing answers, blocked on the right failures, labelled post-hoc segments as hypotheses, and can say what you did not test.',
    },
    privacyNote:
      'Fictional data only. No real customer data, interview recordings or real names in the repository or the deck, no employer documents or design files, and never commit API keys or tokens.',
    minutes: 300,
    xp: 350,
  },
  nextRecommendation:
    'Level 5 turns sixteen sessions of files into a personal PM OS and a team knowledge base. Keep your PRD, design spec, eval report and readout where you can find them: they become the first sources your wiki cites.',
}
