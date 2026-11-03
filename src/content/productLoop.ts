// An evolving team example, adapted from the course creator's supplied lifecycle.
// Shared team context is assumed throughout; this is not a process to adopt wholesale.
export const productLoop = [
  {
    label: 'Context',
    question: 'What do we already know about the user and the situation?',
    description:
      'Start from the team’s existing understanding of users, product goals and constraints. Bring the relevant context into the conversation about this piece of work.',
    output: 'A common starting point and the questions worth exploring.',
    lessons: ['s2', 's17', 's18'],
  },
  {
    label: 'Problem, together',
    question: 'What problem are we solving, and what should we build for the user?',
    description:
      'Spend time as a whole team exploring the user’s problem before committing to a solution. PMs, designers and engineers work out the problem and what to build together. In this example, easier building creates room to spend more attention here.',
    output: 'A shared understanding of the problem and a reasoned direction to explore.',
    lessons: ['s9', 's10'],
  },
  {
    label: 'PRD, spec, prototype',
    question: 'How can we make the idea concrete enough to challenge?',
    description:
      'Explore the solution through a live prototype, PRD and design spec. Use a grill-me session to question assumptions, try the experience together and refine the direction before committing to the build.',
    output: 'A solution to try, with the important unknowns made explicit.',
    lessons: ['s4', 's6', 's12', 's13'],
  },
  {
    label: 'Build',
    question: 'How do we turn the agreed direction into working software?',
    description:
      'Use agents to implement a small slice. Keep the team involved as new questions surface, and use the running result to clarify decisions.',
    output: 'A working increment the team can try.',
    lessons: ['s7', 's8'],
  },
  {
    label: 'Verify',
    question: 'Does what we built solve the problem as intended?',
    description:
      'Have agents run checks against the intended behaviour and show evidence. People judge the experience, intent and risk, with the relevant experts and review policy for the change.',
    output: 'Evidence for releasing, refining or stopping.',
    lessons: ['s8', 's14', 's15'],
  },
  {
    label: 'Learn',
    question: 'What happened for users, and what should we do next?',
    description:
      'Compare the result with the problem you set out to solve. Bring user feedback and what the team learned back into the shared context, then refine the idea, change direction or stop.',
    output: 'Learning that informs the team’s next problem conversation.',
    lessons: ['s15', 's16', 's20'],
  },
]
