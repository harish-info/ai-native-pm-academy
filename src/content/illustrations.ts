// Original teaching diagrams. Counts, records and outcomes are invented examples, not benchmarks.
export const lessonVisuals = {
  'chat-agent': {
    title: 'Inside an agent application',
    sources: [
      {
        title: 'Anthropic',
        url: 'https://www.anthropic.com/research/building-effective-agents',
        status: 'verified',
        verifiedOn: '2026-10-31',
      },
      {
        title: 'Hugging Face tutorial',
        url: 'https://huggingface.co/learn/agents-course/en/unit1/agent-steps-and-structure',
        status: 'verified',
        verifiedOn: '2026-10-31',
      },
    ],
    summary: 'You interact with Claude Code; a model and tools work inside it.',
    caption: 'The outlined application is the agent. Its model is one component.',
    steps: [
      {
        label: 'Set the goal',
        node: 'goal',
        detail: 'You ask for the overdue tasks in a project folder.',
        tool: null,
      },
      {
        label: 'Choose a tool',
        node: 'model',
        detail: 'The model selects List files to locate the task file.',
        tool: 'List files',
      },
      {
        label: 'Call the tool',
        node: 'tools',
        detail: 'The app runs List files on the project folder.',
        tool: 'List files',
      },
      {
        label: 'Read the result',
        node: 'result',
        detail:
          'The tool returns tasks.csv and notes.md. The app adds this result to the model’s context.',
        tool: 'List files',
      },
      {
        label: 'Choose again',
        node: 'model',
        detail: 'Filenames are not enough to answer. The model selects Read file for tasks.csv.',
        tool: 'Read file',
      },
      {
        label: 'Call another tool',
        node: 'tools',
        detail: 'The app reads tasks.csv.',
        tool: 'Read file',
      },
      {
        label: 'Read the new result',
        node: 'result',
        detail: 'The result contains 12 tasks, with 3 overdue. The model can now answer.',
        tool: 'Read file',
      },
      {
        label: 'Respond',
        node: 'answer',
        detail: 'The agent reports the 3 overdue tasks, cites tasks.csv and stops.',
        tool: 'Read file',
      },
    ],
  },
  tokens: {
    title: 'An answer is written one token at a time',
    summary: 'Each step picks a likely next token, given everything before it.',
    caption:
      'Invented probabilities for illustration. A real model chooses among many thousands of tokens.',
    prompt: 'Summarise the interviews in one line:',
    runs: [
      [
        {
          options: [
            { token: 'Users', p: 46 },
            { token: 'Most', p: 31 },
            { token: 'The', p: 12 },
          ],
          pick: 0,
        },
        {
          options: [
            { token: 'want', p: 38 },
            { token: 'need', p: 34 },
            { token: 'said', p: 15 },
          ],
          pick: 0,
        },
        {
          options: [
            { token: 'faster', p: 41 },
            { token: 'simpler', p: 29 },
            { token: 'more', p: 18 },
          ],
          pick: 0,
        },
        {
          options: [
            { token: 'exports', p: 52 },
            { token: 'reports', p: 23 },
            { token: 'answers', p: 11 },
          ],
          pick: 0,
        },
      ],
      [
        {
          options: [
            { token: 'Users', p: 46 },
            { token: 'Most', p: 31 },
            { token: 'The', p: 12 },
          ],
          pick: 1,
        },
        {
          options: [
            { token: 'users', p: 44 },
            { token: 'people', p: 40 },
            { token: 'said', p: 6 },
          ],
          pick: 1,
        },
        {
          options: [
            { token: 'struggle', p: 36 },
            { token: 'want', p: 33 },
            { token: 'find', p: 17 },
          ],
          pick: 0,
        },
        {
          options: [
            { token: 'with', p: 81 },
            { token: 'to', p: 9 },
            { token: 'when', p: 5 },
          ],
          pick: 0,
        },
        {
          options: [
            { token: 'exports', p: 49 },
            { token: 'reports', p: 26 },
            { token: 'setup', p: 12 },
          ],
          pick: 0,
        },
      ],
    ],
  },
  delegate: {
    title: 'Delegate by judgment and by the cost of a mistake',
    summary: 'Pick a task to see where it sits and what to do with it.',
    caption:
      'Example placements from the lesson. Your own context decides where a task sits on each axis.',
    tasks: [
      {
        label: 'Summarise notes',
        judgment: 18,
        stakes: 16,
        advice: 'High volume, low judgment: delegate it and spot-check the result.',
      },
      {
        label: 'Format a table',
        judgment: 8,
        stakes: 8,
        advice: 'Mechanical work: delegate it and glance at the output.',
      },
      {
        label: 'First draft',
        judgment: 32,
        stakes: 26,
        advice:
          'Delegate the draft. If you send it, you own it: read it, cut it, check each claim.',
      },
      {
        label: 'Set priorities',
        judgment: 84,
        stakes: 78,
        advice: 'Keep it. AI can challenge your thinking but should not do it for you.',
      },
      {
        label: 'Feedback to a person',
        judgment: 76,
        stakes: 90,
        advice: 'Keep it. The judgment and the relationship are yours.',
      },
    ],
  },
  context: {
    title: 'Build the brief the model can actually see',
    summary: 'A task becomes more specific when the relevant context travels with it.',
    caption:
      'This is an illustrative comparison, not a claim that more context always improves an answer.',
    inputs: ['Product brief', 'User problem', 'Source material', 'Constraints'],
    outputs: [
      '“Improve engagement” leaves the product, users and evidence unspecified.',
      '“Compare these three alternatives for this user task, using the attached evidence and constraints.”',
    ],
  },
  verification: {
    title: 'A real link can still support the wrong claim',
    summary: 'Follow the claim to the specific passage, not just to a website.',
    caption: 'Verification happens at claim level. A citation is a pointer, not a guarantee.',
    claim: '“The workflow reduced errors by 12%.”',
    passage: '“12% more people tried the workflow.”',
    checks: [
      'The page exists',
      'The passage concerns adoption',
      'It does not establish fewer errors',
    ],
  },
  workspace: {
    title: 'Give each kind of context a home',
    summary: 'Instructions point to the evidence. They do not replace it.',
    caption:
      'The prototype keeps its own git history, so app code and your notes never mix in one commit.',
    folders: [
      { label: 'product-context.md', detail: 'Product, users and constraints' },
      { label: 'AGENTS.md', detail: 'How to work here; points to context' },
      { label: 'sources/', detail: 'Material you can trace claims to' },
      { label: 'research/', detail: 'Analysis and open questions' },
      { label: 'prototype/', detail: 'Separate app and git history' },
    ],
  },
  requirements: {
    title: 'Turn a grill-me answer into a check',
    summary: 'A useful interview ends in observable behaviour, not agreement.',
    caption: 'Choose your own rules. These examples illustrate the shape of a requirement.',
    questions: [
      {
        label: 'Who uses it?',
        answer: 'A reviewer deciding which requests need attention.',
        check: 'Name the user, task and entry point.',
      },
      {
        label: 'What if data is missing?',
        answer: 'Show “Not available”, not a zero that looks real.',
        check: 'Given a missing value, the screen labels it as unavailable.',
      },
      {
        label: 'What does Done mean?',
        answer: 'The filter shows only records marked Needs review.',
        check: 'Given 12 records and 3 matches, the filter returns exactly 3.',
      },
    ],
  },
  git: {
    title: 'A branch is a place to propose a change',
    summary: 'Checks and review happen before the change joins main.',
    caption:
      'Deployment after merge is a separate workflow. Protection depends on your configured rules.',
    steps: [
      { label: 'Branch', detail: 'Start a feature branch from the current main.' },
      { label: 'Change', detail: 'Make a small commit and open a pull request.' },
      { label: 'Check', detail: 'Run the proposed change through checks and human review.' },
      { label: 'Merge', detail: 'Merge the reviewed change; deployment can then publish main.' },
    ],
  },
  diff: {
    title: 'Four questions for any diff',
    summary: 'You can review usefully without understanding every line.',
    caption: 'Fictional diff. If you cannot explain what a change does and why, do not merge it.',
    description: 'Filter the list to records that need review',
    file: 'src/list.ts',
    lines: [
      { kind: ' ', text: 'export function visible(items) {' },
      { kind: '-', text: '  return items' },
      { kind: '+', text: "  return items.filter((i) => i.status === 'Needs review')" },
      { kind: ' ', text: '}' },
      { kind: '-', text: 'const pageSize = 20' },
      { kind: '+', text: 'const pageSize = 200' },
      { kind: '+', text: "const apiKey = 'live-key-1234'" },
    ],
    questions: [
      {
        label: 'Matches the description?',
        lines: [1, 2],
        ok: true,
        verdict: 'Yes. These two lines filter the list, which is what the pull request says.',
      },
      {
        label: 'Anything that should not change?',
        lines: [4, 5],
        ok: false,
        verdict:
          'The page size changed from 20 to 200. The description never mentions it. Ask why.',
      },
      {
        label: 'Can you check it works?',
        lines: [],
        ok: false,
        verdict:
          'No test changed. Ask for one: given 12 records with 3 marked Needs review, it returns 3.',
      },
      {
        label: 'Anything secret or real?',
        lines: [6],
        ok: false,
        verdict:
          'A key is written into the code. Stop, remove it and rotate the key before merging.',
      },
    ],
  },
  review: {
    title: 'Check the number by hand',
    summary: 'Count from the data yourself. Where you and the screen disagree, you have a bug.',
    caption:
      'Boundary cases, such as a task due yesterday, are where agent-built code most often slips.',
    today: '3 Nov',
    tasks: [
      { name: 'Book venue', due: '28 Oct', screen: true, overdue: true },
      { name: 'Send invoice', due: '1 Nov', screen: true, overdue: true },
      { name: 'Renew contract', due: '2 Nov', screen: false, overdue: true },
      { name: 'Draft agenda', due: '5 Nov', screen: false, overdue: false },
    ],
    report: [
      { label: 'Steps', text: 'Load the sample data, set today to 3 Nov, open the dashboard.' },
      { label: 'Expected', text: 'Overdue: 3. Every task due before today counts.' },
      { label: 'Actual', text: 'Overdue: 2. Renew contract, due yesterday, is missing.' },
    ],
  },
  strategy: {
    title: 'Make the actions follow the diagnosis',
    summary: 'A coherent strategy is a chain of choices, not a list of ambitions.',
    caption:
      'An AI feature is one possible action. A process change or stopping may be the better choice.',
    steps: [
      { label: 'Diagnosis', detail: 'People abandon a task while switching between tools.' },
      { label: 'Guiding policy', detail: 'Reduce the handoff before adding new capabilities.' },
      {
        label: 'Coherent actions',
        detail: 'Observe the handoff, test a simpler flow, compare it with AI assistance.',
      },
    ],
  },
  discovery: {
    title: 'An opportunity tree keeps solutions in their place',
    summary: 'Start with an outcome, then connect a specific difficulty to alternative responses.',
    caption:
      'Illustrative hypotheses. Only your research can establish the opportunities and assumptions.',
    outcome: 'More people complete the task successfully',
    opportunities: ['“I lose track between tools”', '“I cannot tell what needs action”'],
    solutions: ['Remove a handoff', 'Add a reminder', 'Show a clear status', 'Test AI assistance'],
  },
  funnel: {
    title: 'The denominator changes the question',
    summary: 'The same 40 completions can describe two different conversion rates.',
    caption:
      'Invented unique-user counts in one fixed window. These rates do not establish causation.',
    stages: [
      { label: 'Signed up', count: 200 },
      { label: 'Viewed the screen', count: 100 },
      { label: 'Completed the task', count: 40 },
    ],
  },
  impact: {
    title: 'Impact is a sum with units, and a range',
    summary: 'Show each input, where it came from, and a low, base and high case.',
    caption:
      'Invented inputs based on the lesson example. Label every source; the base case is not a forecast.',
    unit: 'more completed tasks a month',
    scenarios: [
      { label: 'Low', users: 900, rate: 3 },
      { label: 'Base', users: 1200, rate: 5 },
      { label: 'High', users: 1500, rate: 7 },
    ],
    sources: { users: 'From the data', rate: 'From interviews' },
  },
  solution: {
    title: 'Choose the simplest design that meets the task',
    summary: 'Each additional capability adds something to evaluate and operate.',
    caption:
      'This is a comparison of responsibilities, not a universal ranking of quality or price.',
    options: [
      {
        label: 'Rules or existing workflow',
        detail: 'Known inputs and predictable decisions.',
        check: 'Test the rules, edge cases and maintenance cost.',
      },
      {
        label: 'Model with relevant context',
        detail: 'Language work grounded in authorised material.',
        check: 'Evaluate retrieval, claim support and fallback behaviour.',
      },
      {
        label: 'Tool-using agent',
        detail: 'A task needs decisions across multiple steps.',
        check: 'Also test tools, permissions, stopping rules and final state.',
      },
    ],
  },
  states: {
    title: 'A screen is a family of states',
    summary: 'Select a condition and inspect the copy and next action it needs.',
    caption:
      'A design spec should define each condition, what appears, what can happen next and unresolved gaps.',
  },
  evals: {
    title: 'An overall pass rate can hide a release blocker',
    summary: 'Inspect the kind of failure, including tool calls and changed state.',
    caption:
      'Invented results. A text-only stand-in cannot establish whether a real action was blocked.',
    cases: [
      { label: 'Ordinary lookup', result: 'Pass' },
      { label: 'Missing source', result: 'Pass' },
      { label: 'Out-of-scope question', result: 'Pass' },
      { label: 'Unrequested action', result: 'Fail' },
    ],
  },
  experiment: {
    title: 'Plan for more than “significant” or “not significant”',
    summary: 'Uncertainty and safety can lead to different next decisions.',
    caption:
      'Illustrative effect intervals, not real experiment results or a sample-size calculation.',
    scenarios: [
      {
        label: 'Clear benefit',
        range: [2, 6],
        decision: 'Consider the next stage if quality and guardrails also pass.',
      },
      {
        label: 'Uncertain',
        range: [-2, 4],
        decision:
          'The interval includes harm and benefit. Report uncertainty; decide whether more evidence is worth collecting.',
      },
      {
        label: 'Safety harm',
        range: [2, 6],
        decision:
          'A better success metric does not override a breached safety guardrail. Stop or contain the exposure.',
      },
    ],
  },
  story: {
    title: 'Let the titles carry the argument',
    summary: 'A reader should understand the recommendation before inspecting every detail.',
    caption: 'Illustrative presentation of course evidence. Keep simulated outcomes labelled.',
    slides: [
      { label: 'Recommendation', detail: 'Fund a sandbox integration before customer exposure.' },
      {
        label: 'Evidence',
        detail: 'The chat stand-in did not test real tools or access controls.',
      },
      {
        label: 'Decision needed',
        detail: 'Agree an owner, an evidence bar and a stop rule for the trial.',
      },
    ],
  },
  knowledge: {
    title: 'A useful answer has a path back to its source',
    summary: 'Keep evidence, synthesised knowledge and working instructions distinct.',
    caption:
      'A wiki page is not a new source of truth. Open the cited passage and check that it supports the claim.',
    layers: [
      { label: 'Instructions', detail: 'How to work: rules, formats and source pointers' },
      { label: 'Wiki', detail: 'Current synthesis: decisions, definitions and questions' },
      { label: 'Sources', detail: 'Preserved material: what was actually recorded' },
    ],
  },
  access: {
    title: 'Permissions belong before retrieval',
    summary: 'An instruction to keep a secret is not an access boundary.',
    caption:
      'A diagram of the policy, not an access-control implementation. Real enforcement belongs in the retrieval system.',
    documents: ['Team decisions', 'Public product notes', 'Restricted personnel records'],
    requesters: ['Product team member, team scope', 'HR specialist, personnel scope'],
  },
  skills: {
    title: 'A repeated procedure needs a bounded run',
    summary: 'The same skill should handle normal, missing-data and hostile inputs predictably.',
    caption:
      'Simulated run. Scheduling is a trigger; it does not grant extra permissions or remove review.',
    scenarios: [
      {
        label: 'Normal input',
        result: 'Draft saved for review',
        log: ['Read 3 approved sources', 'Write a sourced draft', 'Stop and request review'],
      },
      {
        label: 'Missing input',
        result: 'Partial draft; gap recorded',
        log: ['Read 2 approved sources', 'Required decision absent', 'Stop without inventing it'],
      },
      {
        label: 'Hostile source',
        result: 'Instruction rejected',
        log: [
          'Read source as data',
          'Ignore its request to send files',
          'Record the issue; no external action',
        ],
      },
    ],
  },
  'team-attention': {
    title: 'Building gets easier. Judgment still matters.',
    summary:
      'One possible shift: more team attention on understanding the problem and learning from the result.',
    caption:
      'Illustrative attention, not measured time or a productivity forecast. Verification remains part of the work.',
    stages: ['Problem', 'Plan', 'Build', 'Verify', 'Learn'],
    rows: [
      {
        label: 'Build-heavy',
        weights: [14, 11, 53, 14, 8],
        description: 'Most team attention goes into implementation.',
      },
      {
        label: 'With agents',
        weights: [28, 13, 13, 13, 33],
        description:
          'Agents support more of the build, creating room for problem exploration and learning.',
      },
    ],
    principles: [
      {
        title: 'Explore the problem together',
        detail:
          'PMs, designers and engineers shape the problem and try ideas through live prototypes.',
      },
      {
        title: 'Verify against intent',
        detail: 'Agents supply checks and evidence. People judge the experience, intent and risk.',
      },
      {
        title: 'Learn into the next decision',
        detail:
          'User feedback and results improve the team’s understanding and what it chooses to do next.',
      },
    ],
  },
  'team-loop': {
    title: 'A possible product loop with agents',
    summary:
      'Spend more time on the problem together, then shape a solution, build, verify and learn.',
    caption:
      'One evolving team example, adapted from the course creator’s practice. Adapt the loop to your team.',
  },
  constraints: {
    title: 'Faster building can leave the same constraint',
    summary: 'Change the scenario and compare the capacity of the whole workflow.',
    caption:
      'Toy model: comparable items per week at a steady state, no buffers or feedback. Throughput is capped by the smallest stage capacity. These are illustrative numbers, not measured productivity or a forecast.',
    stages: ['Decision-ready', 'Build', 'Verify'],
    scenarios: [
      {
        label: 'Starting point',
        capacities: [2, 2, 2],
        explanation:
          'Each stage can handle two items. The simplified whole-loop capacity is two per week.',
      },
      {
        label: 'Build faster',
        capacities: [2, 6, 2],
        explanation:
          'Building capacity triples, but decision preparation and verification still cap the flow at two. More generation could add to the queue.',
      },
      {
        label: 'Improve the loop',
        capacities: [4, 6, 4],
        explanation:
          'Improving decision preparation and verification raises the model’s capacity to four. Check quality and workload before claiming a real gain.',
      },
    ],
  },
  team: {
    title: 'Count the whole task, not just the draft',
    summary: 'Faster generation can still leave the team with more work.',
    caption:
      'Illustrative minutes. Measure your own baseline, quality, review burden, rework and maintenance.',
    before: 30,
    after: [
      { label: 'Draft', minutes: 10 },
      { label: 'Review', minutes: 20 },
      { label: 'Rework', minutes: 10 },
    ],
  },
}

export type LessonVisualId = keyof typeof lessonVisuals
