// An exploratory teaching model adapted from the operator's supplied lifecycle.
// These are suggested working agreements, not a mandatory process or a maturity standard.
export const productLoop = [
  {
    label: 'Context',
    question: 'What do we know, and what may have changed?',
    pm: 'Curate the problem, evidence, goals, constraints and decisions. Make unknowns visible.',
    together: 'Product, design and engineering check whether the context is current and usable.',
    output: 'A short, sourced brief and a shared decision trail.',
    risk: 'Private prompts or stale documents make each person and agent start from a different picture.',
    lessons: ['s2', 's17', 's18'],
  },
  {
    label: 'Problem, together',
    question: 'Which problem deserves attention now?',
    pm: 'Bring user evidence, clarify the outcome and compare the bet with doing nothing.',
    together:
      'Explore value, usability and feasibility together. Use domain specialists where their judgment matters.',
    output: 'A problem hypothesis, alternatives and the next uncertainty to test.',
    risk: 'A queue of unresolved product decisions can leave a fast build team waiting.',
    lessons: ['s9', 's10'],
  },
  {
    label: 'PRD, spec, prototype',
    question: 'Can people and agents understand the same intended behaviour?',
    pm: 'Use a GrillMe session to expose gaps, then record scope, acceptance criteria and open decisions.',
    together:
      'Prototype uncertain interactions and reconcile the PRD, design spec and prototype with their owners.',
    output: 'A versioned plan, a visible prototype and an agreed next slice.',
    risk: 'Silent changes across artifacts cause fast, confident implementation of an outdated decision.',
    lessons: ['s4', 's6', 's12', 's13'],
  },
  {
    label: 'Build',
    question: 'What is the smallest change we can inspect?',
    pm: 'Stay available for consequential questions and help resolve scope without inventing certainty.',
    together:
      'Choose tools freely, keep changes reviewable, and work from the agreed behaviour and constraints.',
    output: 'A small running slice with its checks and evidence.',
    risk: 'Generating more code can increase review queues, rework and coordination cost.',
    lessons: ['s7', 's8'],
  },
  {
    label: 'Verify',
    question: 'Does the result meet the intent and quality bar?',
    pm: 'Check user value, acceptance rules and metric meaning. Make a release recommendation within the team policy.',
    together:
      'Combine tests, evals, observation and specialist judgment; keep approval and rollback responsibilities explicit.',
    output: 'Evidence for a bounded release, another iteration or stopping.',
    risk: 'A convincing demo or agent approval can hide an untested action, failed state or unsupported claim.',
    lessons: ['s8', 's14', 's15'],
  },
  {
    label: 'Learn',
    question: 'What should change in the next loop?',
    pm: 'Compare outcomes and costs with the hypothesis, then update the next decision and its context.',
    together:
      'Share failures, improve instructions and skills, and change the way of working when evidence warrants it.',
    output: 'Updated context, a recorded decision and one useful workflow improvement.',
    risk: 'Keeping the learning in one person’s chat makes the team repeat the same mistakes.',
    lessons: ['s16', 's19', 's20'],
  },
]
