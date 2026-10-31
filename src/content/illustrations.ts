// Original teaching diagrams. Counts, records and outcomes are invented examples, not benchmarks.
export const lessonVisuals = {
  'chat-agent': {
    title: 'A reply versus a loop that can act',
    summary: 'The difference is the tools and control loop, not the chat box.',
    caption: 'A chat product can also have tools. Review the actual capabilities and permissions.',
    steps: [
      { label: 'Goal', detail: 'You ask: find the three overdue items in this fictional file.' },
      {
        label: 'Choose',
        detail: 'The agent chooses a file-reading tool within its allowed scope.',
      },
      { label: 'Use tool', detail: 'The tool reads the file. Its result becomes new context.' },
      {
        label: 'Check',
        detail: 'The agent checks the result and decides whether another step is needed.',
      },
      {
        label: 'Respond',
        detail:
          'It reports the three items and the source. A requested write would need its own permission.',
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
  prototype: {
    title: 'One prototype, several honest states',
    summary: 'Explore what the same screen needs to say when the data changes.',
    caption:
      'Fictional interface. Its polish and numbers do not establish demand or production readiness.',
  },
  workspace: {
    title: 'Give each kind of context a home',
    summary: 'Instructions point to the evidence. They do not replace it.',
    caption: 'Git can recover tracked files. It cannot undo disclosure or an external action.',
    folders: [
      { label: 'product-context.md', detail: 'Product, users and constraints' },
      { label: 'CLAUDE.md', detail: 'How to work here; points to context' },
      { label: 'sources/', detail: 'Material you can trace claims to' },
      { label: 'research/', detail: 'Analysis and open questions' },
      { label: 'prototype/', detail: 'Separate app and git history' },
    ],
  },
  requirements: {
    title: 'Turn a GrillMe answer into a check',
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
  review: {
    title: 'Compare observed behaviour with the requirement',
    summary: 'A precise bug report connects a condition, an actual result and an expected result.',
    caption: 'Reproduce the issue and recheck the fix. An agent’s explanation is not verification.',
    before: 'Updated: today',
    after: 'Updated: yesterday. Refresh failed.',
    requirement:
      'When refresh fails, preserve the last result and label its timestamp and failure.',
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
    steps: ['Check identity and scope', 'Retrieve authorised sources', 'Generate a cited answer'],
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
