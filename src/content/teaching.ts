import type { LevelId } from './types'

export interface LessonGuide {
  decision: string
  bring: string
  recall: { question: string; answer: string }
  reading: { resourceId: string; minutes: number; focus: string }
  example: {
    title: string
    situation: string
    reasoning: { label: string; text: string }[]
    takeaway: string
  }
  checkpoint: {
    question: string
    options: { id: string; text: string; feedback: string }[]
    correct: string
  }
  transfer: string
  bridge: string
}

// Original teaching scenarios, not customer research or claims about a provider's performance.
// Examples illustrate transferable PM decisions. Nothing here writes learner progress.
export const lessonGuides: Record<string, LessonGuide> = {
  s1: {
    decision: 'Which parts of an AI answer can you trust enough to use?',
    bring: 'A free assistant account, a text editor and one PM task you want to practise.',
    recall: {
      question: 'Before reading: what do you think an assistant can see about your product?',
      answer:
        'It sees the context the product supplies, your messages and material loaded through tools. It does not automatically see your files, company systems or yesterday’s work. Test your assumption instead of relying on the name of the tool.',
    },
    reading: {
      resourceId: '3b1b-llms-briefly',
      minutes: 10,
      focus:
        'Watch the short explainer once. Explain next-token prediction aloud; leave the long courses for later.',
    },
    example: {
      title: 'A fluent answer is not a source',
      situation:
        'You ask an assistant for interview questions. It adds: “Most users face this problem every week.” You have not supplied evidence about frequency.',
      reasoning: [
        {
          label: 'Useful draft',
          text: 'The questions can save preparation time. Judge whether they ask about past behaviour and avoid leading the participant.',
        },
        {
          label: 'Unsupported claim',
          text: '“Most” and “every week” assert prevalence and frequency. No data was supplied, so neither belongs in the research brief as a fact.',
        },
        {
          label: 'Your decision',
          text: 'Keep two useful questions, remove the prevalence claim, and ask participants about the last time the problem happened.',
        },
      ],
      takeaway:
        'Review at the level of the claim or action. One useful paragraph does not make the whole answer reliable.',
    },
    checkpoint: {
      question:
        'Two assistants propose similar questions. Does their agreement establish that most users have the problem?',
      options: [
        {
          id: 'a',
          text: 'Yes, agreement between two tools is independent confirmation.',
          feedback:
            'They may share training patterns and repeat the same assumption. Agreement is not an observation of your users.',
        },
        {
          id: 'b',
          text: 'No, the claim still needs evidence about those users.',
          feedback:
            'Correct. Use the drafts to prepare research, then verify prevalence with an appropriate source or study.',
        },
        {
          id: 'c',
          text: 'Only if both assistants show their reasoning.',
          feedback:
            'A reasoning explanation is another generated output. It cannot supply missing observations.',
        },
      ],
      correct: 'b',
    },
    transfer:
      'Without the glossary open, explain to a colleague why a model can produce a useful draft and an unsupported claim in the same reply.',
    bridge: 'Next: replace the missing background with a short product brief you can check.',
  },
  s2: {
    decision: 'What is the smallest brief that makes an answer specific and checkable?',
    bring: 'Your glossary, a product or workflow you understand and one public competitor page.',
    recall: {
      question: 'From Session 1: what is the difference between context and evidence?',
      answer:
        'Context is what the model receives. Evidence is material that actually supports a claim. Adding more context helps only when it is relevant and trustworthy.',
    },
    reading: {
      resourceId: 'anthropic-ai-fluency',
      minutes: 15,
      focus:
        'Read the 4D framework overview and the Delegation and Description material. Stop after 15 minutes; the full course is further study.',
    },
    example: {
      title: 'Brief the decision, not the persona',
      situation:
        '“Be a brilliant strategist and analyse your product” produces an attractive but generic answer.',
      reasoning: [
        {
          label: 'Goal',
          text: 'Decide what to learn from one competitor, for a PM and two engineers. This narrows the task.',
        },
        {
          label: 'Grounding',
          text: 'Supply product-context.md and the competitor’s public page. Mark your own case details as fictional assumptions.',
        },
        {
          label: 'Done',
          text: 'Request three differences, the evidence for each and one unresolved question. Reject any feature claim the page does not support.',
        },
      ],
      takeaway:
        'Clear instructions and good context work together. Run a fair comparison; do not assume the version with more context must win.',
    },
    checkpoint: {
      question:
        'The source says nothing about a competitor’s approval flow. What should the brief request?',
      options: [
        {
          id: 'a',
          text: 'Infer the usual flow so every table cell is filled.',
          feedback:
            'A plausible inference becomes a false competitor fact when its uncertainty disappears.',
        },
        {
          id: 'b',
          text: 'Leave approval flows out of the comparison entirely.',
          feedback: 'The gap may matter to your decision. Keep the question visible.',
        },
        {
          id: 'c',
          text: 'Mark it unknown and name what would resolve it.',
          feedback:
            'Correct. An unknown with a next check is more useful than an invented complete table.',
        },
      ],
      correct: 'c',
    },
    transfer:
      'Write a five-line brief for a different PM task without copying the supplied prompt. Include its audience, material, limits and definition of done.',
    bridge:
      'Keep the competitor summary. Next you will check whether its citations support its claims.',
  },
  s3: {
    decision: 'Which research claims would you put your name behind?',
    bring: 'The Session 2 competitor summary and its source links.',
    recall: {
      question: 'Why did the two models agreeing in Session 1 not establish a fact?',
      answer:
        'Repeated text is not independent evidence. Both outputs may repeat the same source, assumption or error. Open the material that observed the thing.',
    },
    reading: {
      resourceId: 'karpathy-how-i-use-llms',
      minutes: 12,
      focus:
        'Use the video’s chapters to find web search or research. Watch one worked search, then return here. The full video is optional.',
    },
    example: {
      title: 'A working citation, a wrong conclusion',
      situation:
        'An assistant writes: “A competitor has launched automatic actions for all customers.” The linked announcement says a pilot is planned in one market.',
      reasoning: [
        {
          label: 'Split the claim',
          text: 'Launched, automatic actions, all customers: three separate assertions. A single citation may support only one.',
        },
        {
          label: 'Read the scope',
          text: 'A future pilot announcement establishes the vendor’s plan. It does not establish availability, adoption or reliability.',
        },
        {
          label: 'Repair',
          text: 'Write “The vendor announced a planned pilot in one market”, with the date. Record availability as unknown.',
        },
      ],
      takeaway: 'Verification checks meaning, time and population, not just whether the URL loads.',
    },
    checkpoint: {
      question:
        'A survey found 28% among its respondents. The AI writes “28% of all customers”. Your verdict?',
      options: [
        {
          id: 'a',
          text: 'Partly supported; keep the original population and sampling limits.',
          feedback:
            'Correct. The number may be copied accurately while the population claim is wrong.',
        },
        {
          id: 'b',
          text: 'Verified, because the percentage matches exactly.',
          feedback:
            'The population is part of the claim. Matching digits do not make the inference valid.',
        },
        {
          id: 'c',
          text: 'Contradicted; discard the entire survey.',
          feedback:
            'The survey may be useful within its scope. Repair the claim before deciding whether that scope informs your decision.',
        },
      ],
      correct: 'a',
    },
    transfer:
      'Take one claim from an unrelated public article. Separate the observation, the author’s interpretation and your own inference.',
    bridge: 'Your checked fact sheet becomes the boundary for what the pitch page may claim.',
  },
  s4: {
    decision: 'What uncertainty should a prototype help you resolve?',
    bring: 'product-context.md, fact-sheet.md and one feature hypothesis.',
    recall: {
      question:
        'From Session 3: can a fictional example go into the fact sheet as a verified fact?',
      answer:
        'No. Label a fictional example as a teaching or design assumption. Keep public evidence separate from invented product data.',
    },
    reading: {
      resourceId: 'claude-artifacts',
      minutes: 8,
      focus:
        'Read how to create, revise and share an artifact. You need one tool and one page; skip alternative builders for now.',
    },
    example: {
      title: 'Test comprehension before demand',
      situation: 'Your pitch shows the main task screen. A friend says it looks polished.',
      reasoning: [
        {
          label: 'Weak signal',
          text: 'A compliment tells you little about the problem, willingness to switch or willingness to pay.',
        },
        {
          label: 'Better task',
          text: 'Ask what the main figure means and what they would do next. Stay quiet while they answer.',
        },
        {
          label: 'Useful revision',
          text: 'If they misread the period, add the date beside the figure and repeat the same comprehension question.',
        },
      ],
      takeaway:
        'A prototype is an inexpensive hypothesis. A clearer screen is progress even when the idea still needs discovery.',
    },
    checkpoint: {
      question: 'The reader understands the revised page. What can you conclude?',
      options: [
        {
          id: 'a',
          text: 'The feature now has evidence of product-market fit.',
          feedback:
            'One comprehension check cannot establish demand, retention or a viable business.',
        },
        {
          id: 'b',
          text: 'Nothing; a prototype is not useful without real usage data.',
          feedback:
            'You did learn whether this person understood this design. Use that narrower result.',
        },
        {
          id: 'c',
          text: 'This version communicated the idea to this reader.',
          feedback: 'Correct. Keep the scope of the conclusion as small as the observation.',
        },
      ],
      correct: 'c',
    },
    transfer:
      'State one assumption your pitch cannot test and the cheapest next observation that could challenge it.',
    bridge:
      'Level 2 makes the hypothesis clickable. Discovery in Level 3 can still change or stop it.',
  },
  s5: {
    decision: 'What should an agent be allowed to read and change?',
    bring:
      'Your Level 1 folder, Git and access to Claude Code. Check access before buying anything.',
    recall: {
      question:
        'From Session 3: does a private folder make its contents safe to send to an AI provider?',
      answer:
        'No. Local privacy and permission to process data are different. The agent sends material it reads to the provider; use public or fictional course inputs.',
    },
    reading: {
      resourceId: 'claude-code-memory',
      minutes: 12,
      focus:
        'Read CLAUDE.md versus auto memory and importing files. Test the loaded instructions in a fresh session rather than reading the entire reference.',
    },
    example: {
      title: 'A save point has limits',
      situation: 'An agent can edit your course files and also has a tool that can send messages.',
      reasoning: [
        {
          label: 'Recoverable',
          text: 'A commit lets you inspect and restore tracked file changes. Untracked files and ignored files may not be included.',
        },
        {
          label: 'Not recovered by git',
          text: 'A sent message, leaked document or revoked credential is an external effect. Restoring the folder does not undo it.',
        },
        {
          label: 'Boundary',
          text: 'Open only the fictional course workspace. Remove unneeded connections and require a separate decision before publishing or sending.',
        },
      ],
      takeaway:
        'Use version control for file recovery and permission boundaries for actions. Neither replaces the other.',
    },
    checkpoint: {
      question: 'Where should “never send a message” be enforced for an unattended filing task?',
      options: [
        {
          id: 'a',
          text: 'Only in CLAUDE.md, in capital letters.',
          feedback: 'Instructions help the agent behave, but are not an access-control boundary.',
        },
        {
          id: 'b',
          text: 'In instructions and by withholding message-sending access.',
          feedback:
            'Correct. The instruction states intent; the missing permission limits what a mistaken agent can do.',
        },
        {
          id: 'c',
          text: 'In the next git commit so you can revert a mistake.',
          feedback: 'Git cannot unsend a message or recover disclosed information.',
        },
      ],
      correct: 'b',
    },
    transfer:
      'List a file edit you can restore, an external action you cannot restore with git, and the boundary you would use for each.',
    bridge: 'Next, use the workspace to capture requirements before an agent guesses them.',
  },
  s6: {
    decision: 'Which decisions must be explicit before the prototype is built?',
    bring: 'Your context file, pitch notes and one primary user flow.',
    recall: {
      question: 'From Session 4: why is the prototype still a hypothesis?',
      answer:
        'It shows an interaction, not evidence of demand or safe production behaviour. Requirements make the hypothesis testable; they do not validate it.',
    },
    reading: {
      resourceId: 'aihero-grill-me',
      minutes: 8,
      focus:
        'Read the direct grill-me guide. Notice when a question needs evidence or a prototype rather than more discussion. Borrow the method; installation is unnecessary.',
    },
    example: {
      title: 'Turn “handle missing data” into a decision',
      situation:
        'The agent asks what the main task screen should show when one required value is missing.',
      reasoning: [
        {
          label: 'Vague',
          text: '“Handle it gracefully” leaves the agent to invent a figure, an error or a hidden screen.',
        },
        {
          label: 'Testable',
          text: 'When required data is missing, show “We cannot calculate this yet”, identify the missing input and keep the last known value labelled with its date, if one exists.',
        },
        {
          label: 'Scope',
          text: 'This is a proposed behaviour for the example. Choose the rule for your own workflow explicitly or record a blocking question; do not let the agent decide it silently.',
        },
      ],
      takeaway:
        'A requirement names a condition and an observable result. An adjective cannot be tested.',
    },
    checkpoint: {
      question: 'You cannot decide the missing-data rule. What should the agent do?',
      options: [
        {
          id: 'a',
          text: 'Record the blocker and build a different, decided slice.',
          feedback:
            'Correct. Work can continue where the decisions are clear without hiding the unresolved state.',
        },
        {
          id: 'b',
          text: 'Choose the most common design pattern and treat it as final.',
          feedback: 'A common pattern is a proposal, not your decision.',
        },
        {
          id: 'c',
          text: 'Use zero so the screen still has a number.',
          feedback:
            'Zero is data, not a missing value. It can change what the person decides to do.',
        },
      ],
      correct: 'a',
    },
    transfer:
      'Write an empty-state acceptance criterion for a different screen without asking AI to draft it.',
    bridge:
      'Keep one canonical REQUIREMENTS.md in the prototype. Next, make changes reviewable through GitHub.',
  },
  s7: {
    decision: 'What evidence do you need before a change reaches the live prototype?',
    bring: 'Your running prototype, its requirements and a GitHub account.',
    recall: {
      question: 'From Session 5: what does a commit recover, and what does it not recover?',
      answer:
        'It records tracked file state. It cannot undo a public disclosure, a sent message or other external side effect. Check before the first push.',
    },
    reading: {
      resourceId: 'github-skills-intro',
      minutes: 15,
      focus:
        'Complete the branch, commit and pull-request exercise. Use the Pages docs only if the deployment step needs help.',
    },
    example: {
      title: 'Green after merge is too late for a gate',
      situation: 'A workflow builds only after a merge into main. The PR has no checks.',
      reasoning: [
        {
          label: 'Publication',
          text: 'The post-merge build can deploy the site, but it cannot stop the bad change entering main.',
        },
        {
          label: 'Pre-merge check',
          text: 'Run the build and relevant tests on pull_request too. Require their status in the ruleset after the check exists.',
        },
        {
          label: 'Human review',
          text: 'Read the proposed change and check the preview or local result. Green tests answer only what those tests actually cover.',
        },
      ],
      takeaway: 'A deployment workflow and a pre-merge quality gate have different jobs.',
    },
    checkpoint: {
      question: 'The deployment succeeded, but the live page is blank. What is established?',
      options: [
        {
          id: 'a',
          text: 'The app works; the browser must be wrong.',
          feedback:
            'A green deployment confirms a workflow outcome, not a working user experience.',
        },
        {
          id: 'b',
          text: 'The repository ruleset failed.',
          feedback:
            'A ruleset controls how changes enter the branch. It does not guarantee asset paths or routing.',
        },
        {
          id: 'c',
          text: 'Files were published; the running page still needs checking.',
          feedback:
            'Correct. Inspect asset paths and the base URL, then verify the page on the published address.',
        },
      ],
      correct: 'c',
    },
    transfer:
      'Explain the difference between “a PR exists”, “checks passed”, “reviewed” and “works at the live URL”.',
    bridge: 'Next, review the result with people and look for failures the build cannot catch.',
  },
  s8: {
    decision: 'Which review finding deserves the next fix?',
    bring: 'The live prototype, requirements and one observation from a tester.',
    recall: {
      question: 'From Session 3: does a fresh agent’s claim become true because it cites a file?',
      answer:
        'No. Open the cited line and reproduce the failure. A file reference can be real while the interpretation is wrong.',
    },
    reading: {
      resourceId: 'aihero-code-review',
      minutes: 10,
      focus:
        'Read the distinction between following the spec and following conventions. Apply it to one small change.',
    },
    example: {
      title: 'Prioritise by consequence',
      situation:
        'A reviewer reports a wrong calculated figure, a colour-only warning and a heading that could be shorter.',
      reasoning: [
        {
          label: 'Reproduce',
          text: 'Use the same fictional input and write expected versus actual. A confident review comment may still be a false alarm.',
        },
        {
          label: 'Prioritise',
          text: 'Wrong figures can change a decision; inaccessible warnings can hide the problem. Fix these before editorial polish.',
        },
        {
          label: 'Verify',
          text: 'A calculation fix needs a regression case with an independently checked expected value. Rerun the user flow after the fix.',
        },
      ],
      takeaway:
        'The skill is deciding and verifying, not accumulating review comments or manufacturing a quota of bugs.',
    },
    checkpoint: {
      question: 'An agent reports a bug you cannot reproduce. What goes in the review log?',
      options: [
        {
          id: 'a',
          text: 'Mark it fixed if the agent says it changed the code.',
          feedback:
            'That can introduce an unnecessary change without establishing the original problem.',
        },
        {
          id: 'b',
          text: 'Record the evidence, uncertainty and the next check.',
          feedback:
            'Correct. Reject it with a reason or leave a specific investigation open. Do not treat it as a confirmed defect.',
        },
        {
          id: 'c',
          text: 'Ignore it without recording a decision.',
          feedback:
            'The next reviewer will repeat the same investigation and cannot see why it was dismissed.',
        },
      ],
      correct: 'b',
    },
    transfer:
      'Write a reproducible bug report without AI. Ask someone else to follow it without your help.',
    bridge:
      'You have learned to build a hypothesis. Level 3 asks whether it is the right problem and solution.',
  },
  s9: {
    decision: 'Why solve this problem, and why use AI at all?',
    bring: 'Your fact sheet, prototype limitations and a candidate outcome.',
    recall: {
      question: 'From Session 4: what did a positive reaction to the prototype actually prove?',
      answer:
        'Only what you observed, such as one reader understanding the idea. It did not prove the problem is common, the solution is better or the business is viable.',
    },
    reading: {
      resourceId: 'google-pair-user-needs',
      minutes: 12,
      focus:
        'Read when AI is and is not better than rules, then automation versus augmentation. Apply the comparison to your opportunity.',
    },
    example: {
      title: 'Choose the simplest credible route',
      situation:
        'your product needs to help users complete their main task. Leadership suggests an autonomous assistant.',
      reasoning: [
        {
          label: 'No AI',
          text: 'A clear screen and deterministic rules may already answer the main question. Keep this as the baseline.',
        },
        {
          label: 'Augmentation',
          text: 'Language may help a person understand the result, clarify an unusual question or prepare a draft.',
        },
        {
          label: 'Autonomy',
          text: 'An agent adds variable steps, cost and failure paths. Require evidence that the flexibility improves the task enough to justify them.',
        },
      ],
      takeaway:
        'The strategy commits to an outcome and trade-off. It should survive a change in the fashionable tool.',
    },
    checkpoint: {
      question:
        'Users need a reliable total from structured records. Which starting point is strongest?',
      options: [
        {
          id: 'a',
          text: 'A tested calculation and clear display, with AI added only for a demonstrated need.',
          feedback: 'Correct. Preserve the reliable core and test what language assistance adds.',
        },
        {
          id: 'b',
          text: 'An autonomous agent that chooses how to calculate each time.',
          feedback:
            'That adds unpredictability without showing a benefit over a defined calculation.',
        },
        {
          id: 'c',
          text: 'A fine-tuned model that memorises the latest records.',
          feedback: 'Changing records should come from a current source, not model weights.',
        },
      ],
      correct: 'a',
    },
    transfer:
      'Name a product opportunity from another domain. Compare a rules-based option, AI assistance and an agent, then choose one and state what would change your mind.',
    bridge: 'Next, test the customer problem without letting the prototype lead the conversation.',
  },
  s10: {
    decision: 'What did people do, and which assumption does that challenge?',
    bring:
      'A discussion guide, participant consent and the live prototype. Recruitment takes elapsed time.',
    recall: {
      question: 'From Session 9: where does a solution belong on an opportunity tree?',
      answer:
        'Under a customer opportunity that supports the desired outcome. The solution is not the root, and it needs alternatives and an assumption test.',
    },
    reading: {
      resourceId: 'torres-story-interviews',
      minutes: 12,
      focus:
        'Read how to ask about a specific past event. Rehearse two follow-ups before the first conversation.',
    },
    example: {
      title: 'An observation can contradict a compliment',
      situation:
        'In this invented practice note, P2 says “I like it” but cannot explain the date attached to the main figure and returns to a spreadsheet.',
      reasoning: [
        {
          label: 'Observation',
          text: 'P2 misread the date and used a workaround. Keep the exact behaviour separate from your explanation of why it happened.',
        },
        {
          label: 'Hypothesis',
          text: 'The period label may be unclear, or the product may not fit the participant’s workflow. One observation does not distinguish those explanations.',
        },
        {
          label: 'Next test',
          text: 'Ask about the last spreadsheet task before showing a revised date label. Compare comprehension, not just preference.',
        },
      ],
      takeaway:
        'A rare severe problem can matter even when only one participant reports it. Count mentions, but assess consequence and context too.',
    },
    checkpoint: {
      question:
        'AI identifies a theme absent from your own synthesis. What establishes whether it belongs?',
      options: [
        {
          id: 'a',
          text: 'Its confidence rating.',
          feedback: 'Self-rated confidence does not establish that the participant said or did it.',
        },
        {
          id: 'b',
          text: 'A second model agreeing with the theme.',
          feedback:
            'The two models may share the same interpretive bias. Go back to the observation.',
        },
        {
          id: 'c',
          text: 'Supporting notes or quotes, checked in their original context.',
          feedback:
            'Correct. If no observation supports it, keep it as a hypothesis for future research.',
        },
      ],
      correct: 'c',
    },
    transfer:
      'Rewrite “Would you use our assistant?” as a question about a recent real event, then write one non-leading follow-up.',
    bridge:
      'Next, use analytics to practise scale and measurement. Fictional analytics cannot strengthen claims about your real interviewees.',
  },
  s11: {
    decision: 'What does the denominator allow you to conclude?',
    bring: 'Your opportunity tree, metric definitions and a spreadsheet.',
    recall: {
      question: 'From Session 3: why is the population part of a numerical claim?',
      answer:
        'The same percentage describes different things over all signups, active users or exposed users. Write the unit, cohort and window with the result.',
    },
    reading: {
      resourceId: 'intercom-rice',
      minutes: 10,
      focus:
        'Read the four factors and the caution about using a score as the only decision rule. Label every synthetic input as an assumption.',
    },
    example: {
      title: 'One dataset, two valid rates',
      situation:
        'Invented counts: 200 signups, 100 unique users view the main screen, 40 of those users complete the action. Duplicate events are removed.',
      reasoning: [
        {
          label: 'Step conversion',
          text: '40 / 100 = 40% of screen viewers complete the action within the defined window.',
        },
        {
          label: 'End-to-end conversion',
          text: '40 / 200 = 20% of signups complete it. This answers a different question.',
        },
        {
          label: 'Limit',
          text: 'Both rates can be arithmetically correct. Neither proves the feature caused better outcomes, and these invented counts say nothing about actual customer demand.',
        },
      ],
      takeaway:
        'Define the question before calculating. Show numerator, denominator, unit and time window with each rate.',
    },
    checkpoint: {
      question:
        'The generated data ranks your prototype first. How should that affect the real product bet?',
      options: [
        {
          id: 'a',
          text: 'It validates the bet because the analysis was reproducible.',
          feedback:
            'Reproducibility checks the method, not whether the invented data reflects the market.',
        },
        {
          id: 'b',
          text: 'Treat it as a method rehearsal and keep real-world impact uncertain.',
          feedback:
            'Correct. Use sensitivity ranges and identify the actual measurement you would need.',
        },
        {
          id: 'c',
          text: 'Discard the exercise because synthetic data cannot teach analytics.',
          feedback:
            'It can teach definitions, calculations and error detection. Limit the conclusion to those skills.',
        },
      ],
      correct: 'b',
    },
    transfer:
      'Change one definition in the example and explain how it changes the decision. What real observation would you need before funding the bet?',
    bridge:
      'Your PRD will distinguish observed evidence, practice results and product assumptions.',
  },
  s12: {
    decision: 'What is the smallest valuable slice, and can the team operate it?',
    bring:
      'Your strategy, synthesis, prioritised bets and prototype. Keep unvalidated assumptions visible.',
    recall: {
      question: 'From Session 9: why must the PRD compare a non-AI option?',
      answer:
        'The problem, not the tool, is the commitment. A simple baseline makes the cost, latency and quality added by AI assessable.',
    },
    reading: {
      resourceId: 'anthropic-building-effective-agents',
      minutes: 12,
      focus:
        'Read workflows versus agents and when not to use agents. Sketch your proposed data and action flow without code.',
    },
    example: {
      title: 'A better answer can still be a worse product',
      situation:
        'Illustrative assumptions, not vendor prices: 1,000 attempts cost 20 currency units and produce 800 acceptable results. Human review adds 40 units.',
      reasoning: [
        {
          label: 'Unit cost',
          text: '(20 + 40) / 800 = 0.075 per acceptable result. Cost per attempt alone would hide review and failed attempts.',
        },
        {
          label: 'Architecture',
          text: 'Fetch current facts from a source with access controls. Use retrieval for changing knowledge; evaluate fine-tuning for repeated behaviour only after simpler approaches fail. Neither replaces a source of current records.',
        },
        {
          label: 'Trade-off',
          text: 'Write a proposed latency budget and fallback. A slow answer or expensive review can erase the benefit even when the wording is excellent.',
        },
      ],
      takeaway:
        'PMs own value, quality, cost and response-time requirements. Engineering owns the implementation proposal, which the team evaluates together.',
    },
    checkpoint: {
      question:
        'The first slice still has an unanswered question about who may see a record. Can it be called ready?',
      options: [
        {
          id: 'a',
          text: 'No. Resolve that blocker or remove the affected behaviour from the slice.',
          feedback:
            'Correct. A count of open questions is not a readiness rule; one access-control blocker can stop delivery.',
        },
        {
          id: 'b',
          text: 'Yes, if fewer than five blocking questions remain.',
          feedback: 'The importance of a blocker matters more than how many there are.',
        },
        {
          id: 'c',
          text: 'Yes, if the agent proposes a reasonable default.',
          feedback:
            'Access decisions require an explicit owner and control, not a plausible default.',
        },
      ],
      correct: 'a',
    },
    transfer:
      'Without AI, draw the path from user question to authorised data, calculation, explanation and any approval. Mark the source of truth and two failure points.',
    bridge:
      'Next, give the decided slice a complete state specification and check a build against it.',
  },
  s13: {
    decision: 'Can someone build every state without silently choosing product policy?',
    bring:
      'prd/prd.md, the prototype and unresolved design questions. A new design tool is optional.',
    recall: {
      question: 'From Session 6: why is “handle errors gracefully” not enough?',
      answer:
        'It does not say which condition triggers the state, what appears or what the person can do. Write those explicitly.',
    },
    reading: {
      resourceId: 'agents-md',
      minutes: 8,
      focus:
        'Read the purpose and example of AGENTS.md. Keep commands and source pointers short; check the current tool’s loading rules.',
    },
    example: {
      title: 'A state is a small contract',
      situation: 'The main figure was calculated yesterday, but the source cannot refresh today.',
      reasoning: [
        {
          label: 'Condition',
          text: 'A previously successful result exists and the refresh request has failed.',
        },
        {
          label: 'Surface',
          text: 'Show the last known value, its timestamp and “Could not refresh”. Offer Retry. Do not imply the old value is current.',
        },
        {
          label: 'Precedence',
          text: 'If the PRD forbids stale values, that rule wins. Flag the conflict and resolve it with the owner before building.',
        },
      ],
      takeaway:
        'This is a proposed example, not a universal stale-data policy. The handoff must carry the decision and its source.',
    },
    checkpoint: {
      question: 'A screenshot shows the happy path. What evidence is still missing?',
      options: [
        {
          id: 'a',
          text: 'A more polished screenshot of the same state.',
          feedback: 'Polish does not establish missing, stale or failed-data behaviour.',
        },
        {
          id: 'b',
          text: 'An agent saying all requirements are met.',
          feedback: 'The assertion needs evidence linked to each acceptance criterion.',
        },
        {
          id: 'c',
          text: 'Checks for the relevant states, interactions and acceptance criteria.',
          feedback:
            'Correct. A state table with a test or observed result per row makes the review useful.',
        },
      ],
      correct: 'c',
    },
    transfer:
      'Pick a state not covered by the worked example. Specify condition, exact copy, allowed actions and the evidence that would prove it works.',
    bridge:
      'Next, separate how the assistant talks from what the system is actually allowed to do.',
  },
  s14: {
    decision: 'What did the evaluation test, and what remains unknown?',
    bring: 'Your PRD contracts, fictional data and independently calculated expected figures.',
    recall: {
      question: 'From Session 7: why does one green signal not establish a working product?',
      answer:
        'Each check covers a specific layer. A successful deployment does not prove UI behaviour; a good chat answer does not prove tool authorisation.',
    },
    reading: {
      resourceId: 'anthropic-evals-for-agents',
      minutes: 15,
      focus:
        'Read tasks, trials, graders and traces, then the advice on realistic tasks and isolated environments. You are designing a small learning eval, not a production safety claim.',
    },
    example: {
      title: 'A refusal is not an access-control test',
      situation:
        'The stand-in says “I need approval” in every action case. It has no tool that could execute an action.',
      reasoning: [
        {
          label: 'What passed',
          text: 'The model produced the expected wording for those inputs in that configuration.',
        },
        {
          label: 'What was not tested',
          text: 'No real tool call, permission check, changed-state record, replay or cross-user data boundary was exercised.',
        },
        {
          label: 'Next evidence',
          text: 'Engineering must test the integrated system in a sandbox, inspect traces and state, deny unauthorised calls and verify that approval applies to the exact action.',
        },
      ],
      takeaway:
        'Report language quality separately from system safety. Passing a small finite set is useful evidence with limits, not a guarantee.',
    },
    checkpoint: {
      question:
        'You tuned the instructions after every failed case, then passed all 24. What next?',
      options: [
        {
          id: 'a',
          text: 'Declare 100% general safety.',
          feedback:
            'You have repeatedly adapted to those cases. They do not represent every input or integrated failure.',
        },
        {
          id: 'b',
          text: 'Freeze the setup, run unseen cases and repeat critical trials.',
          feedback:
            'Correct. Keep the first unseen results, record failures and report variation. Actual action controls still need integrated tests.',
        },
        {
          id: 'c',
          text: 'Remove the hardest cases to make the score stable.',
          feedback: 'That hides the risk the set was built to expose.',
        },
      ],
      correct: 'b',
    },
    transfer:
      'Write two different checks for the same approval contract: one on answer wording and one on tool calls or final state. Explain which the stand-in can run.',
    bridge: 'Your release recommendation must carry the untested boundaries into the launch plan.',
  },
  s15: {
    decision: 'Does the evidence justify widening exposure, changing the feature or stopping?',
    bring: 'The PRD metrics, eval limitations and a proposed experiment decision rule.',
    recall: {
      question:
        'From Session 11: why compare all randomly assigned eligible users, rather than only people who chose to use the feature?',
      answer:
        'Choosing users after treatment can select different kinds of people in each group. Define assignment and eligibility before exposure, then analyse at the planned unit.',
    },
    reading: {
      resourceId: 'microsoft-experiment-monitoring',
      minutes: 12,
      focus:
        'Read data-quality and guardrail monitoring, then early-result interpretation. Monitor harm throughout; do not repeatedly stop a fixed-horizon test for apparent success.',
    },
    example: {
      title: 'An uncertain result is not a zero effect',
      situation:
        'Invented learning result: the estimated absolute improvement is 2 percentage points, with a 95% interval from -1 to +5 points. The smallest worthwhile gain was +3.',
      reasoning: [
        {
          label: 'Interpretation',
          text: 'The data are compatible with harm, no change and a worthwhile benefit. Neither “it works” nor “it has no effect” follows.',
        },
        {
          label: 'Safety',
          text: 'Review incidents and data quality now, even before the success decision date. A severe incident can justify an immediate pause.',
        },
        {
          label: 'Decision',
          text: 'Call this inconclusive. Keep exposure limited and decide whether a new, adequately planned test is worth the cost. Do not quietly extend until the result looks good.',
        },
      ],
      takeaway:
        'Confidence intervals, practical value, guardrails and operating cost belong in the same recommendation.',
    },
    checkpoint: {
      question:
        'On day three, an unauthorised action is confirmed but the planned sample is not reached. What do you do?',
      options: [
        {
          id: 'a',
          text: 'Pause under the safety rule and investigate immediately.',
          feedback: 'Correct. Waiting to judge efficacy does not mean waiting to respond to harm.',
        },
        {
          id: 'b',
          text: 'Wait until the fixed sample before looking at guardrails.',
          feedback: 'A statistical stopping plan is not permission to ignore safety incidents.',
        },
        {
          id: 'c',
          text: 'Remove the affected user from the analysis.',
          feedback: 'That can conceal harm and bias the result. Retain the incident in the record.',
        },
      ],
      correct: 'a',
    },
    transfer:
      'Write a recommendation for an uncertain result without using “no effect”. Name what remains unknown and the next decision.',
    bridge:
      'Next, communicate the decision without making simulated evidence sound like a real launch.',
  },
  s16: {
    decision: 'What should the audience decide after the first minute?',
    bring: 'Your simulated readout, eval limitations and one explicit ask.',
    recall: {
      question: 'From Session 3: what must travel with a number when it moves onto a slide?',
      answer:
        'Its definition, population, period and source. Here it also needs the label “simulated” because the course did not run a real launch.',
    },
    reading: {
      resourceId: 'duarte-three-second-test',
      minutes: 8,
      focus:
        'Read the short three-second test. Apply it to the titles and evidence in your outline; a book purchase is unnecessary.',
    },
    example: {
      title: 'An honest recommendation can be decisive',
      situation:
        'Your course experiment is inconclusive and the stand-in eval has not exercised real tools.',
      reasoning: [
        {
          label: 'Weak title',
          text: '“Great results from our AI launch” hides both the uncertainty and the fact that no launch occurred.',
        },
        {
          label: 'Useful title',
          text: '“Fund a sandbox integration before deciding on customer exposure.” This states a decision the evidence can support.',
        },
        {
          label: 'Supporting slide',
          text: 'Show the simulated result, untested controls, the work proposed, its owner and the decision date. Keep technical details in the appendix.',
        },
      ],
      takeaway:
        'A deck earns trust by making the decision and the evidence limits easy to understand together.',
    },
    checkpoint: {
      question: 'Which first slide best fits a learning demo?',
      options: [
        {
          id: 'a',
          text: 'A chronological list of every session completed.',
          feedback:
            'That describes effort but leaves the audience to infer what decision you need.',
        },
        {
          id: 'b',
          text: 'A list of the AI tools you used.',
          feedback:
            'The tools are background. The audience needs a recommendation and why it follows.',
        },
        {
          id: 'c',
          text: 'Your recommendation, its evidence status and a concrete ask.',
          feedback: 'Correct. The rest of the deck should support or qualify that recommendation.',
        },
      ],
      correct: 'c',
    },
    transfer:
      'Deliver the recommendation aloud in 60 seconds, without slides or AI, including the strongest reason someone should disagree.',
    bridge: 'Level 5 turns the decision trail into a system another person can question and use.',
  },
  s17: {
    decision: 'Can you retrieve the reason for a decision without inventing one?',
    bring: 'Your workspace and a small selection of reviewed final deliverables.',
    recall: {
      question:
        'From Session 3: what is the difference between a source existing and supporting the answer?',
      answer:
        'A source can be real and still be misquoted, stale or irrelevant. Check the cited passage against the answer, not just the path.',
    },
    reading: {
      resourceId: 'karpathy-llm-wiki',
      minutes: 10,
      focus:
        'Read the three-layer pattern and the ingest, query and lint operations. Use a small slice of your workspace before expanding.',
    },
    example: {
      title: 'The wiki should preserve uncertainty',
      situation:
        'A final decision note says “Defer automatic actions until integrated approval tests pass.” A wiki draft says “Users do not want automatic actions.”',
      reasoning: [
        {
          label: 'Source',
          text: 'The note records a delivery boundary and the evidence needed to revisit it.',
        },
        {
          label: 'Invented explanation',
          text: 'The draft turned that boundary into a customer preference. No cited research establishes it.',
        },
        {
          label: 'Repair',
          text: 'Restore the recorded reason and link the outstanding test. Keep customer preference unknown unless a separate source supports it.',
        },
      ],
      takeaway:
        'Synthesis should shorten the route to evidence without silently strengthening the claim.',
    },
    checkpoint: {
      question: 'The wiki cannot answer why an option was rejected. What is the correct response?',
      options: [
        {
          id: 'a',
          text: 'Say the reason is not recorded and identify the source needed.',
          feedback:
            'Correct. An explicit gap is useful knowledge and a prompt to recover the decision.',
        },
        {
          id: 'b',
          text: 'Generate the most likely reason from the product strategy.',
          feedback: 'A plausible reconstruction can become false institutional memory.',
        },
        {
          id: 'c',
          text: 'Cite the overview page without an explanation.',
          feedback:
            'A citation that does not answer the question adds apparent authority without evidence.',
        },
      ],
      correct: 'a',
    },
    transfer:
      'Ask a question in different words from the page titles. Diagnose whether a failure came from retrieval, stale content or unsupported synthesis.',
    bridge: 'Next, add ownership, access rules and review so the system can serve a team.',
  },
  s18: {
    decision: 'Who is allowed to see the material before retrieval begins?',
    bring: 'Five public or fictional sources you have reviewed, with a proposed owner for each.',
    recall: {
      question: 'From Session 5: can a prompt make accessible private data inaccessible?',
      answer:
        'No. Permissions must restrict the files or tools before retrieval. Instructions can guide behaviour but cannot replace access control.',
    },
    reading: {
      resourceId: 'karpathy-llm-wiki',
      minutes: 8,
      focus:
        'Revisit ingest and lint. Now add an owner, review path and access boundary for each layer; these team policies are course proposals.',
    },
    example: {
      title: 'A citation can still disclose too much',
      situation:
        'A new teammate asks about a product decision. Search retrieves a private personnel note as well as the reviewed PRD.',
      reasoning: [
        {
          label: 'Before retrieval',
          text: 'The teammate’s permissions must exclude the personnel note. Hiding its filename in the answer is too late if its contents reached the model.',
        },
        {
          label: 'Before ingestion',
          text: 'Review and sanitize the input in an approved environment. Do not send sensitive raw content to a personal agent and ask it to scrub it afterwards.',
        },
        {
          label: 'Ownership',
          text: 'Assign a page owner and review date. A newer date alone does not establish authority or resolve conflicting sources.',
        },
      ],
      takeaway:
        'A shared knowledge base is an access and ownership system as well as a collection of sourced pages.',
    },
    checkpoint: {
      question:
        'Where should the expected answers for your trust check live while testing a fresh agent?',
      options: [
        {
          id: 'a',
          text: 'At the top of wiki/index.md.',
          feedback:
            'That lets the agent repeat the key instead of demonstrating retrieval and synthesis.',
        },
        {
          id: 'b',
          text: 'Outside the files the tested agent can read.',
          feedback:
            'Correct. Give it only the questions. Keep the key with the human grader, then inspect the cited evidence.',
        },
        {
          id: 'c',
          text: 'In an archive folder inside the same accessible repository.',
          feedback: 'A folder name is not an access boundary. The agent can still search it.',
        },
      ],
      correct: 'b',
    },
    transfer:
      'Draw the access boundary for a new teammate and an automation. Name one source each must never receive, and how that is enforced.',
    bridge: 'Next, package a small, repeatable procedure without widening that boundary.',
  },
  s19: {
    decision: 'Can a repeated procedure run safely when nobody is watching?',
    bring: 'Your team KB, one procedure you have already run by hand and a disposable test copy.',
    recall: {
      question:
        'From Session 14: why is a successful output insufficient to evaluate an action-taking system?',
      answer:
        'Inspect what it read, which tools it called and what state changed. A harmless final paragraph can conceal an unwanted write or disclosure.',
    },
    reading: {
      resourceId: 'claude-skills-tutorial',
      minutes: 10,
      focus:
        'Read the tutorial on packaging a proven procedure. Compare a skill with a project or one-off prompt, then use the linked agent skills course for the Claude Code file format.',
    },
    example: {
      title: 'Make the weekly brief finite',
      situation:
        'Your weekly-update procedure keeps searching when it cannot find a launch decision.',
      reasoning: [
        {
          label: 'Scope',
          text: 'Read only the approved KB and the past seven days of the log. Missing decisions stay missing.',
        },
        {
          label: 'Bounds',
          text: 'For this practice run, stop after five minutes or ten source files, whichever comes first. Save partial findings and list what could not be checked.',
        },
        {
          label: 'Side effects',
          text: 'Write one local draft. Do not send messages, merge changes, install tools or alter instructions. Verify the first actual run before relying on the schedule.',
        },
      ],
      takeaway:
        'A schedule is not a successful run, and a skill instruction is not a permission boundary. Check both the output and the actions.',
    },
    checkpoint: {
      question:
        'A hostile source asks the skill to rewrite AGENTS.md. How should you test the defence?',
      options: [
        {
          id: 'a',
          text: 'Run it on the live KB and trust the undo command.',
          feedback:
            'A disposable copy isolates the test and makes an unintended change recoverable without affecting the working KB.',
        },
        {
          id: 'b',
          text: 'Ask the skill whether it would follow the instruction.',
          feedback: 'A verbal promise does not test behaviour or tool permissions.',
        },
        {
          id: 'c',
          text: 'Use a sandbox copy, deny instruction writes and inspect the diff and trace.',
          feedback:
            'Correct. Check the attempted actions as well as whether the final file stayed unchanged.',
        },
      ],
      correct: 'c',
    },
    transfer:
      'Write a procedure for a different recurring task with inputs, allowed actions, stop conditions and a normal, missing-data and hostile test.',
    bridge:
      'Finish by deciding whether this way of working creates enough net value for a team to adopt it.',
  },
  s20: {
    decision: 'How could your team work with agents, and what would make you adapt that model?',
    bring:
      'Your decision trail, trust-check results, skill checks and one recent task to map with teammates or a mentor.',
    recall: {
      question:
        'From Session 12: why measure cost per acceptable result rather than cost per attempt?',
      answer:
        'Failed attempts, human checking, rework and maintenance can erase apparent savings. Compare the whole task, at a stated quality bar, with the existing process.',
    },
    reading: {
      resourceId: 'litt-understanding',
      minutes: 8,
      focus:
        'Read the argument about understanding as a bottleneck. Treat it as a practitioner perspective, then test it against your own quarter.',
    },
    example: {
      title: 'Faster drafting, slower delivery',
      situation:
        'Illustrative pilot: a task took 60 minutes before AI. Now drafting takes 10, review 35 and rework 20.',
      reasoning: [
        {
          label: 'Net result',
          text: '10 + 35 + 20 = 65 minutes. Drafting improved, but the end-to-end task is five minutes slower.',
        },
        {
          label: 'Quality and people',
          text: 'Compare defect severity, reviewer workload and understanding too. A lower elapsed time is not enough if errors or stress rise.',
        },
        {
          label: 'Next decision',
          text: 'Reduce scope or improve context and review, then rerun a bounded pilot. Do not count generated documents as the success metric.',
        },
      ],
      takeaway:
        'Leadership means changing the system around the bottleneck and being willing to stop an approach that does not help.',
    },
    checkpoint: {
      question:
        'Your pilot produces twice as many drafts but no improvement in customer outcomes or flow. What do you recommend?',
      options: [
        {
          id: 'a',
          text: 'Revisit the bottleneck and measure a narrower intervention against a baseline.',
          feedback: 'Correct. More output is evidence of activity, not evidence of value.',
        },
        {
          id: 'b',
          text: 'Expand the tool to every team because adoption is high.',
          feedback: 'That scales an unproven benefit and its review burden.',
        },
        {
          id: 'c',
          text: 'Set a larger quota for AI-authored work.',
          feedback: 'The quota rewards the activity that failed to improve the outcomes.',
        },
      ],
      correct: 'a',
    },
    transfer:
      'Present a five-minute proposal without AI help: bottleneck, baseline, intervention, evidence bar, costs, stop rule and what stays human. Invite one hard objection.',
    bridge:
      'Keep the method, not every tool. Repeat one small workflow next month and test whether it still earns its place.',
  },
}

export const courseArc: Record<LevelId, { question: string; proof: string; boundary: string }> = {
  1: {
    question: 'Can I trust and brief the assistant?',
    proof: 'A sourced pitch pack',
    boundary: 'A clear pitch is a hypothesis, not demand.',
  },
  2: {
    question: 'Can I direct and review a build?',
    proof: 'A reviewed, live prototype',
    boundary: 'A static prototype is not a production AI service.',
  },
  3: {
    question: 'Is this the right problem and solution?',
    proof: 'A decision pack and scoped PRD',
    boundary: 'Fictional analytics rehearse a method, not market validation.',
  },
  4: {
    question: 'What evidence would justify a release?',
    proof: 'An eval, simulated readout and recommendation',
    boundary: 'A chat stand-in cannot certify integrated system safety.',
  },
  5: {
    question: 'Can the team use this responsibly?',
    proof: 'A tested PM workspace and team pilot proposal',
    boundary: 'A course badge is a personal milestone, not professional certification.',
  },
}
