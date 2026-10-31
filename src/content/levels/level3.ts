import type { Level } from '../types'

export const level3: Level = {
  id: 3,
  slug: 'discovery-design',
  title: 'AI-Native Product Discovery and Design',
  theme: 'Identify the right product problem and validate it.',
  summary:
    'When building gets cheap, deciding what to build becomes the expensive part. In this level you run a compact, evidence-led discovery cycle on a real personal finance problem: a market scan, real conversations, an Opportunity Solution Tree, divergent prototypes, usability tests, and a PRD that a coding agent can build from.',
  outcomes: [
    'Run AI-assisted market and competitor research and separate verified facts from model guesses.',
    'Plan and run short discovery conversations with real people, and synthesize them honestly.',
    'Map evidence to an Opportunity Solution Tree and choose a target opportunity with explicit reasoning.',
    'Generate and judge at least three divergent interactive prototypes with design taste and accessibility in mind.',
    'Write an opportunity brief and an agent-ready PRD with testable acceptance criteria.',
  ],
  badge: {
    name: 'Evidence Seeker',
    description:
      'Ran or practised a full discovery cycle on MoneyPilot: sourced research, conversations, an opportunity tree, tested prototypes and an agent-ready PRD, with any missing real-user evidence labeled as outstanding.',
  },
  lessons: [
    {
      id: 's9',
      levelId: 3,
      number: 9,
      title: 'Map the AI money assistant market',
      difficulty: 'Intermediate',
      minutes: 120,
      tools: [
        'ChatGPT or Claude (deep research mode)',
        'Claude Code or Codex',
        'Your private second brain',
      ],
      prerequisites: ['s8'],
      competencies: ['product-discovery', 'prompting-context', 'ai-fundamentals'],
      xp: 175,
      mentorReview: 'optional',
      goal: 'Produce a sourced competitive landscape of AI personal finance assistants and a list of unmet customer needs, with every important claim traceable to a source you opened yourself.',
      whyItMatters:
        'In banking, every roadmap discussion eventually asks what the neobanks and the big incumbents are doing. Deep research tools can draft that answer in minutes, but they also produce confident errors about features, launch dates and markets. The PM who researches fast and can still defend every line in front of risk, compliance and leadership is the one people trust.',
      learn: [
        {
          heading: 'Deep research is a starting draft, not a finding',
          paragraphs: [
            'Deep research modes in ChatGPT, Claude and Gemini browse dozens of pages and write a report with citations. That is a real speed-up for a first map of a market. It is also where hallucination gets dangerous, because the output looks like analyst work.',
            'Typical failure patterns: citing a page that does not contain the claim, merging two products into one, describing announced features as shipped, and treating a press release as evidence of adoption. Treat the report as a list of leads, then open the sources for the claims that matter to your decision.',
          ],
          bullets: [
            '**Verified**: you opened the source and it says this.',
            '**Vendor claim**: the company says this about itself. Useful, but not evidence of usage or quality.',
            '**Unverified**: no source, or the source does not support the claim. Drop it or go and check.',
          ],
        },
        {
          heading: 'What actually differentiates finance assistants',
          paragraphs: [
            'Personal finance assistants differ less in their chat interface than in their data access, their action rights and their trust model. For each competitor, capture who it is for, what data it uses (own-bank transactions only, or aggregated accounts via open banking), what it can do (answer, categorize, forecast, move money), what needs explicit approval, and what is deliberately not offered, such as regulated investment advice.',
            'The three case studies in this lesson show three strategic plays: a consumer neobank assistant that deepens its own customer relationship, an agentic assistant aimed at small business customers, and a network-level SDK that lets other banks embed an assistant. Ask which play your own bank could credibly make.',
          ],
        },
        {
          heading: 'From features to unmet needs',
          paragraphs: [
            'A feature matrix tells you what exists. An unmet need is a job customers struggle with that current products handle poorly. You find needs where people describe the moment things went wrong: app store reviews, Reddit communities such as r/personalfinance or r/UKPersonalFinance, Trustpilot and forum threads. "I got paid on Friday and the rent left on Thursday" is worth more than any analyst summary.',
            'Write needs as customer problems, not solutions. "I cannot tell whether bills due before payday will bounce" is a need. "AI cash flow forecast" is a solution. Keeping the two apart is what makes the Opportunity Solution Tree in the next session work.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'revolut-air',
          why: 'A consumer neobank describing its own AI assistant; read it as a vendor claim, not as evidence of adoption.',
          required: true,
        },
        {
          resourceId: 'starling-assistant',
          why: 'An agentic assistant aimed at business banking customers, useful for comparing action rights and approvals.',
          required: false,
        },
        {
          resourceId: 'visa-ai-assistant-sdk',
          why: 'A platform play: what it means when a network offers banks an embeddable assistant.',
          required: false,
        },
        {
          resourceId: 'nng-ai-study-guide',
          why: 'Grounding on where AI helps and where it misleads in research work.',
          required: false,
        },
      ],
      task: {
        summary:
          'Run a deep research pass on AI money assistants, verify the claims that matter, and turn the result into a competitor map and an evidence-backed list of unmet needs.',
        steps: [
          'Create the folder `projects/moneypilot/research/` in your private second brain. It never goes into a public repository.',
          'Run a deep research prompt in ChatGPT or Claude on AI personal finance assistants in your market: neobanks, incumbents, aggregators and budgeting apps. Save the full report unchanged as `00-deep-research-raw.md`.',
          'Pick the 4 to 6 most relevant competitors. Open the official pages for each, including the three case studies in the resources, and write what you personally confirmed into `verified-notes.md`.',
          'Collect at least 12 real customer complaints or wishes about running short before payday, bill timing, overdrafts or budgeting apps from app store reviews, Reddit or Trustpilot. Save each quote verbatim with its link in `customer-voice.md`.',
          'Run the agent prompt below in Claude Code or Codex inside the research folder to build the competitor matrix and the needs list from your verified notes only.',
          'Check every row has an evidence label. Delete or flag anything you cannot source.',
          'Write a one-paragraph "so what": where is the gap, and what do you want to learn from real people next?',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code or Codex',
        where: 'In your private second-brain folder, at projects/moneypilot/research/',
        text: `You are helping me, a banking product manager, build a competitive landscape for AI personal finance assistants.

Inputs in this folder:
- 00-deep-research-raw.md: an unverified deep research report
- verified-notes.md: notes I wrote after opening each source myself
- customer-voice.md: real customer quotes with links

Tasks:
1. Create competitors.md with a table: product, segment, data access, what it can do, what requires user approval, notable limits, source link, evidence label.
2. The evidence label must be one of: verified, vendor-claim, unverified. Use "verified" only for facts present in verified-notes.md. Never upgrade a label.
3. Create unmet-needs.md: cluster the customer quotes into 5 to 8 needs written as customer problems, not solutions. For each need: the need statement, 2 or 3 supporting quotes with links, the number of quotes supporting it, and which competitors partly address it.
4. Add a section "Claims to check or drop" listing every claim from 00-deep-research-raw.md that you could not match to a source.

Rules:
- Do not invent products, features, numbers or quotes. If something is missing, write "unknown".
- Copy customer quotes exactly as written.
- Finish with a 5-line summary of the biggest gap you see, labeled as a hypothesis.`,
      },
      expectedOutput: [
        'competitors.md: a sourced matrix of 4 to 6 AI money assistants with an evidence label on every row',
        'unmet-needs.md: 5 to 8 customer problems backed by real quotes with links',
        'A list of claims from the deep research report you dropped or still need to check',
      ],
      artifact: 'MoneyPilot competitor map and evidence-backed unmet needs list',
      verification: [
        'Spot-check five rows labeled verified: open each link and confirm the page actually says it.',
        'Every need statement is phrased as a customer problem with no product feature in the sentence.',
        'Every customer quote has a working link and is copied verbatim, not paraphrased by the model.',
        'The raw deep research report is kept separately and nothing from it reached the matrix without a check.',
        'You recorded every claim in the deep research report that was wrong, outdated or unsupported, or wrote down which claims you checked and that they all held up.',
      ],
      reflectionPrompts: [
        'Which claim in the deep research report looked most credible but turned out to be unsupported?',
        'Which strategic play (own the relationship, niche depth, or platform) would suit your bank, and why?',
        'What surprised you in the customer voice compared with what banks usually assume about their customers?',
      ],
      checklist: [
        {
          id: 'raw-saved',
          text: 'Saved the raw deep research report separately from verified notes',
        },
        { id: 'matrix', text: 'Built a competitor matrix with an evidence label on every row' },
        { id: 'quotes', text: 'Collected at least 12 real customer quotes with links' },
        { id: 'needs', text: 'Wrote 5 to 8 unmet needs as customer problems' },
        {
          id: 'spot-check',
          text: 'Spot-checked at least five claims against the original sources',
        },
      ],
      mentorMove:
        'Pick three rows from her competitor matrix at random and ask "show me where it says that." Then share one example from your own work where an AI-generated claim reached a stakeholder unverified, and what it cost.',
    },
    {
      id: 's10',
      levelId: 3,
      number: 10,
      title: 'Talk to real people and build an Opportunity Solution Tree',
      difficulty: 'Intermediate',
      minutes: 150,
      tools: [
        'Claude or ChatGPT',
        'A transcription tool you are allowed to use, with consent',
        'Your private second brain',
        'Optional: FigJam, Miro or Excalidraw',
      ],
      prerequisites: ['s9'],
      competencies: ['product-discovery', 'knowledge-management', 'prompting-context'],
      xp: 225,
      mentorReview: 'recommended',
      practicalProof: true,
      goal: 'Run 3 to 5 short discovery conversations with real people about managing money before payday, synthesize them honestly with AI help, and turn the evidence into an Opportunity Solution Tree with a chosen target opportunity. The conversations happen across the week before this session; the session time covers the guide, synthesis and tree.',
      whyItMatters:
        'AI makes it trivially easy to generate personas, interview transcripts and "user insights" that no human ever said. Teams that confuse those with research ship confident products for imaginary customers. In a regulated bank, a decision trail built on real evidence is also what holds up when risk, compliance or leadership asks why you built something.',
      learn: [
        {
          heading: 'Real voices beat synthetic users',
          paragraphs: [
            'Synthetic users are LLM-generated personas that answer interview questions. They are fast and fluent, and they tend to be agreeable, generic and far too rational about money. They reflect an average of their training data, not your customers: the person who checks their balance three times before buying groceries, or who keeps a secret buffer account their partner does not know about.',
            'Use AI for the work around the interview: drafting a discussion guide, spotting leading questions, summarizing your notes and clustering themes. Do not use AI as the interviewee. If you rehearse an interview with a model, label it practice and never count it as evidence.',
          ],
        },
        {
          heading: 'A good discovery conversation in 30 minutes',
          paragraphs: [
            'Ask about specific past behavior, not hypothetical futures. "Tell me about the last time you were unsure whether you could cover a bill" beats "Would you use an app that forecasts your balance?" People are poor at predicting their own behavior and very good at telling stories about what actually happened.',
          ],
          bullets: [
            'Start with context: how and when they get paid, and how bills go out.',
            'Ask for the last specific time, then dig: what did you do, what did you check, how did it feel?',
            'Listen for workarounds such as spreadsheets, multiple accounts or calendar reminders. Workarounds signal real pain.',
            'Do not pitch MoneyPilot until the very end, if at all.',
            'Ask for consent before taking notes or recording, and separately before any AI tool processes the notes. Say which tool, for example "I will use Claude to help summarize my notes, without your name".',
          ],
        },
        {
          heading: 'Opportunity Solution Trees',
          paragraphs: [
            "Teresa Torres's Opportunity Solution Tree connects a desired outcome at the top, to opportunities (customer needs, pain points and desires) in the middle, to solutions and then assumption tests at the bottom. Its power is discipline: every solution must hang off an opportunity, and every opportunity should trace back to something a real person said or did.",
            'For MoneyPilot a candidate outcome might be "customers avoid unplanned overdrafts before payday". Opportunities come from your conversations, for example "I do not know which bills will leave before I get paid." Only then do you brainstorm solutions, and you compare them by how well they address the chosen opportunity, not by how exciting they look in a demo.',
          ],
        },
        {
          heading: 'Assessing the opportunity',
          paragraphs: [
            'Before committing, size it roughly: how many customers face this, how often, how painful it is, how well current tools handle it, and whether it fits your bank strategy and risk appetite. An honest assessment also says what would make you stop, for example discovering that most people already solve it with a simple calendar reminder.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'torres-ost',
          why: 'The original explanation of Opportunity Solution Trees from the person who popularized them.',
          required: true,
        },
        {
          resourceId: 'nng-synthetic-users',
          why: 'Why AI-generated users cannot replace research with real people, and where they might still help.',
          required: true,
        },
        {
          resourceId: 'producttalk',
          why: 'Ongoing practical writing on continuous discovery and interviewing.',
          required: false,
        },
        {
          resourceId: 'nng-ai-ux-survey',
          why: 'How UX practitioners report actually using AI in research work today.',
          required: false,
        },
      ],
      task: {
        summary:
          'Recruit real participants, run short discovery conversations, synthesize them with AI help, and build an Opportunity Solution Tree and opportunity assessment for MoneyPilot.',
        steps: [
          'A week before this session (Level 2 is a good time), recruit 3 to 5 people who are paid weekly or monthly and pay regular bills: friends, former colleagues, other parents. Explain it is a 20 to 30 minute learning conversation, and ask for consent to take notes and to use an AI tool on the notes without their name.',
          'Draft a discussion guide with AI, then remove every leading or hypothetical question yourself. Save it as `discussion-guide.md`.',
          'Run the conversations during the week. Take notes, or use a transcription tool only with explicit consent. Replace names with P1, P2, P3 everywhere and leave out employers, places and stories that would identify someone. This makes the notes pseudonymized, not anonymous: you still know who P1 is, so treat them as personal data.',
          'Within a day of each conversation, write a short snapshot in `snapshots/P1.md` and so on: key quotes, behaviors, workarounds and emotions.',
          'Run the agent prompt below to cluster opportunities across the snapshots, with verbatim quotes as evidence.',
          'Draw the Opportunity Solution Tree in FigJam, Miro, Excalidraw or as a Markdown outline: one outcome, 4 to 6 opportunities, 2 or 3 solutions under your target opportunity, and one assumption test per solution.',
          'Write `opportunity-assessment.md`: chosen target opportunity, evidence, rough sizing, risks, and what would make you stop.',
          'If you truly could not find participants, label every file "PRACTICE: real-user validation outstanding" and write down who you will talk to, and when.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code or Codex',
        where: 'In your private second brain at projects/moneypilot/discovery/',
        text: `I ran discovery conversations with real people about managing money before payday. Interview snapshots are in snapshots/ as P1.md, P2.md and so on. Names and identifying details are already removed.

Please:
1. Extract every distinct opportunity (need, pain point or desire). Phrase each one as the customer would say it, in the first person.
2. For each opportunity, list which participants mentioned it and the exact supporting quotes, copied verbatim from the snapshots.
3. Flag opportunities supported by only one participant as "weak signal".
4. Propose an outcome statement for the top of an Opportunity Solution Tree, and 4 to 6 parent opportunities that group the rest.
5. Write ost.md as a nested Markdown outline: Outcome, then opportunities, then sub-opportunities, with participant ids in brackets.
6. Do not propose solutions yet.

Rules:
- Never invent quotes, participants or behaviors. If the evidence is thin, say so.
- Point out anything in my snapshots that looks like my own interpretation rather than what the participant said.
- End with three questions I should ask in my next round of conversations.`,
      },
      expectedOutput: [
        'A discussion guide with no leading or hypothetical questions',
        '3 to 5 pseudonymized snapshots from real conversations, or a clearly labeled practice exercise',
        'An Opportunity Solution Tree with every opportunity traced to participants',
        'opportunity-assessment.md with a chosen target opportunity and stop criteria',
      ],
      artifact: 'Opportunity Solution Tree and opportunity assessment backed by real conversations',
      verification: [
        'Every opportunity on the tree links to at least one participant id and a verbatim quote.',
        'No AI-generated persona or synthetic answer is counted as evidence anywhere.',
        'The discussion guide asks about past behavior, not hypothetical future use.',
        'Snapshots contain no real names, employers, account details or identifying stories, and every participant agreed to AI processing of the notes.',
        'If participants were unavailable, every file is labeled PRACTICE and real-user validation is marked outstanding.',
      ],
      reflectionPrompts: [
        'What did a participant say that contradicted your starting assumption?',
        'Where was AI most useful in this session, and where did you overrule it?',
        'Which opportunity did you not choose, and what evidence would change your mind?',
      ],
      checklist: [
        { id: 'guide', text: 'Wrote a discussion guide and removed leading questions' },
        {
          id: 'conversations',
          text: 'Held at least 3 real conversations, or labeled the work PRACTICE with a dated plan for real ones',
        },
        {
          id: 'anonymized',
          text: 'Pseudonymized all snapshots as P1, P2, P3 and removed identifying details',
        },
        { id: 'ost', text: 'Built an Opportunity Solution Tree traced to evidence' },
        { id: 'assessment', text: 'Wrote an opportunity assessment with stop criteria' },
      ],
      mentorMove:
        'Play a participant in a 10-minute mock interview before her real ones, deliberately giving vague, hypothetical answers so she practices asking "tell me about the last time." Afterwards, read her tree and challenge the opportunity with the weakest evidence.',
    },
    {
      id: 's11',
      levelId: 3,
      number: 11,
      title: 'Generate and compare divergent prototypes',
      difficulty: 'Intermediate',
      minutes: 135,
      tools: [
        'Claude (artifacts)',
        'v0, Lovable or Figma Make (free tiers)',
        'Optional: Google Antigravity or Claude Code',
      ],
      prerequisites: ['s10'],
      competencies: ['ux-prototyping', 'product-discovery', 'prompting-context'],
      xp: 200,
      mentorReview: 'optional',
      goal: 'Turn your target opportunity into at least three genuinely different interactive prototypes, judge them against explicit design principles and accessibility checks, and choose one direction with written reasons.',
      whyItMatters:
        'Prototypes used to take a designer days. Now a PM can produce a clickable concept in minutes, which moves the scarce skill from making to judging. The emerging practice is to explore wide and cheap, then apply taste: which concept actually solves the opportunity, feels trustworthy for money, and works for everyone.',
      learn: [
        {
          heading: 'Divergence first',
          paragraphs: [
            "The first idea a model generates tends to be the most average one: a dashboard with a balance, a chart and a chat box. Asking for variations of that idea gives you three versions of average. Force divergence by changing the underlying concept, not the styling. The examples below use the course's worked opportunity, payday coverage; if your evidence pointed elsewhere, invent concepts for your own opportunity.",
          ],
          bullets: [
            '**Calendar**: upcoming bills and payday on a timeline, with a projected balance line.',
            '**Conversational**: "Will I be OK until Friday?" answered in plain language, with the figures behind the answer.',
            '**Proactive nudge**: no screen to open, just a well-timed message with one clear action.',
            '**Safe to spend**: a single number that already accounts for every bill before payday.',
          ],
        },
        {
          heading: 'Design principles turn taste into arguments',
          paragraphs: [
            'Money interfaces carry emotional weight. Write 4 to 6 principles before you judge anything, for example: show the number and how it was calculated; never hide uncertainty; calm rather than alarming unless action is genuinely needed; one primary action per screen; plain language over finance jargon.',
            'Principles make taste discussable. Instead of "I prefer this one", a team can say "concept B breaks our show-the-calculation principle", which is a disagreement you can resolve.',
          ],
        },
        {
          heading: 'Accessibility is part of quality',
          paragraphs: [
            'Check contrast, readable text sizes, keyboard and screen reader basics, and never use color alone to signal "you will be overdrawn". The WCAG guidelines are the industry baseline, and banks in many markets have legal accessibility obligations.',
            'Financial products also need cognitive accessibility: simple language, clearly labeled numbers, and no time pressure on important decisions. A design that only works for a calm, numerate user on a large screen is not finished.',
          ],
        },
        {
          heading: 'Choosing a prototyping tool',
          paragraphs: [
            'Claude artifacts are quick for single-screen concepts. v0, Lovable and Figma Make produce multi-screen apps and give you a shareable link, which helps for testing with people. Antigravity and Claude Code build prototypes inside a real project when you want more control. Free tiers have usage limits, so plan your generations, and use fictional data only in every tool.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'aihero-prototype',
          why: 'A practitioner workflow for using agents to prototype quickly before committing to a build.',
          required: true,
        },
        {
          resourceId: 'figma-make',
          why: 'Prompt-to-prototype inside Figma, useful if your bank design team already lives in Figma.',
          required: false,
        },
        {
          resourceId: 'v0',
          why: 'Generates working interactive UI from a prompt and gives you a shareable link.',
          required: false,
        },
        {
          resourceId: 'lovable',
          why: 'Builds multi-screen app prototypes from a description; good for clickable flows.',
          required: false,
        },
      ],
      task: {
        summary:
          'Generate three divergent MoneyPilot concepts as interactive prototypes, score them against your principles and accessibility checks, and choose a direction.',
        steps: [
          'Write `design-principles.md` with 4 to 6 principles for MoneyPilot, each with a one-line rationale.',
          'Open the MoneyPilot brief in the academy and critique the reference mockups before you design: write `design/mockup-critique.md` with five things to borrow, five to fix (start by checking whether the numbers add up) and the one job your v1 will do better.',
          'Create a fictional dataset: one persona with a current balance, a payday date and the next 30 days of bills, saved as `fictional-month.md`. No real figures.',
          'Use the agent prompt below to generate three divergent concepts, each in a fresh chat. One tool is enough; try a second tool only if you have time left.',
          'Click through every concept on your phone and on a laptop. Save screenshots or links in `prototypes/`.',
          'Run quick accessibility checks on each: a browser contrast checker, 200% zoom, keyboard-only navigation, and warnings that do not rely on color.',
          'Score each concept 1 to 5 against each principle and against the target opportunity in `concept-comparison.md`.',
          'Choose one direction, write why, and note one idea worth stealing from each losing concept.',
        ],
      },
      agentPrompt: {
        tool: 'Claude (artifacts), v0, Lovable or Figma Make',
        where:
          'A fresh chat or project for each concept, with design-principles.md and fictional-month.md attached or pasted in',
        text: `Build an interactive, mobile-first prototype for MoneyPilot, a feature inside a bank app.

Target opportunity: [paste the target opportunity from your opportunity-assessment.md. The worked example in this course is: "I do not know whether my money will cover the bills that leave before my next payday."]

Concept to build: [CALENDAR | CONVERSATIONAL | PROACTIVE NUDGE | SAFE TO SPEND]. Build only this concept, and make it clearly different from a generic balance dashboard.

Use only the fictional data in fictional-month.md. Do not invent other accounts or transactions.

Requirements:
- Show the projected balance on the day before payday and how it was calculated: income, each bill and its date.
- Flag a shortfall in words and with an icon, never by color alone.
- One primary action per screen. Plain language, no finance jargon.
- Include an empty state and an "I am not sure about this figure" state for variable bills.
- Text contrast at least WCAG AA, tap targets at least 44px, and the layout still works at 200% zoom.
- Follow every principle in design-principles.md, and tell me where you had to trade one off.

After building, list three things a real customer might misunderstand on these screens.`,
      },
      expectedOutput: [
        'design-principles.md with 4 to 6 MoneyPilot principles',
        'Three interactive prototypes of different concepts, with links or screenshots',
        'concept-comparison.md scoring each concept against principles, the opportunity and accessibility',
        'A chosen direction with written reasoning',
      ],
      artifact: 'Three divergent MoneyPilot prototypes and a scored concept comparison',
      verification: [
        'The three concepts differ in their core idea, not just in color or layout.',
        'Every prototype uses only the fictional dataset, with no real names or figures.',
        'For each concept you recorded a pass or fail on contrast, zoom, keyboard and color independence.',
        'The chosen direction is justified by the target opportunity and your principles, not only by visual appeal.',
        'You checked the calculation shown in at least one prototype by hand against fictional-month.md.',
      ],
      reflectionPrompts: [
        'Which concept did you like least at first, and did that change after clicking through it?',
        'Which design principle was hardest to satisfy, and why?',
        'Where did the AI tool make a design choice you would not have made?',
      ],
      checklist: [
        { id: 'principles', text: 'Wrote design principles before judging any concept' },
        { id: 'three-concepts', text: 'Built at least three divergent interactive prototypes' },
        { id: 'a11y', text: 'Ran contrast, zoom, keyboard and color-independence checks' },
        { id: 'math-check', text: 'Verified one prototype calculation by hand' },
        { id: 'decision', text: 'Chose a direction and documented why' },
      ],
      mentorMove:
        'Look at the three concepts without being told her favorite and pick one in 30 seconds, saying why out loud. Then compare your snap judgment with her scored comparison: the disagreements are the useful part of the conversation.',
    },
    {
      id: 's12',
      levelId: 3,
      number: 12,
      title: 'Test, refine and write an agent-ready PRD',
      difficulty: 'Intermediate',
      minutes: 150,
      tools: ['Your chosen prototype tool', 'Claude or ChatGPT', 'Claude Code or Codex'],
      prerequisites: ['s11'],
      competencies: ['product-discovery', 'ux-prototyping', 'technical-collaboration'],
      xp: 250,
      mentorReview: 'recommended',
      practicalProof: true,
      goal: 'Test the preferred prototype with real people, improve it based on what you observed, and write an opportunity brief plus a PRD with testable acceptance criteria that a coding agent can build from in Level 4. Book the short usability sessions in the days before; the session time covers fixing, the brief and the PRD.',
      whyItMatters:
        'A PRD used to be read by humans who filled gaps with judgment and hallway questions. Coding agents fill gaps with guesses. The emerging practice is a spec that persuades stakeholders and can also be executed by agents: precise scope, explicit non-goals, data definitions, and acceptance criteria that become automated tests.',
      learn: [
        {
          heading: 'Lightweight usability testing',
          paragraphs: [
            'A handful of short sessions finds most of the obvious usability problems. Give each person a realistic task, such as "check whether you can afford the gym membership before payday", stay quiet, and watch where they hesitate. Ask them to think aloud.',
            'Record observations, not opinions: "P3 tapped the balance three times expecting details" is useful, "P3 liked it" is not. Finish with a comprehension question like "what will your balance be on the 24th?" If people cannot answer it, the design is not working, however much they liked it.',
          ],
        },
        {
          heading: 'Writing a PRD agents can execute',
          paragraphs: [
            'Agents follow instructions literally and confidently. An agent-ready PRD states the problem and outcome in a few sentences, then gives user stories, explicit scope and non-goals, data definitions (what counts as a bill, a payday, a shortfall), edge cases, and acceptance criteria in Given/When/Then form with concrete numbers.',
          ],
          bullets: [
            'Given a balance of 1,000, income of 2,000 on the 25th and bills of 850 due before then, when the user opens MoneyPilot on the 10th, then the projected balance for the 24th shows 150 and lists each bill with its date.',
            'Non-goals are named explicitly: no money movement, no real bank data, no investment advice.',
            'Uncertainty has a rule, for example how a bill with a variable amount is shown and calculated.',
          ],
        },
        {
          heading: 'Spec-driven development: where the PRD goes next',
          paragraphs: [
            "Public agent workflows have converged on a similar chain, often called spec-driven development. GitHub's open-source Spec Kit runs it as specify, plan, tasks, implement, and practitioners such as Matt Pocock publish skills that turn a PRD into a plan and small, independently buildable tasks. Whatever the tool, the steps are the same: a spec with acceptance criteria, a technical plan, small tasks an agent can finish in one session, and a check of the result against the acceptance criteria. Your PRD is the first link in that chain, so it has to stand on its own.",
            'Specs have a cost too: long ones are slow to write, go stale, and agents follow stale detail literally. Spend the effort where it pays: **acceptance criteria and edge cases**. Keep the PRD and the prototype versioned together, in the same folder or repository, so nobody builds from a spec that disagrees with the design.',
          ],
        },
        {
          heading: 'The opportunity brief and outcome metrics',
          paragraphs: [
            'The opportunity brief is the one-page decision document you would bring to a steering meeting: the problem, who has it, the evidence, the target outcome and metric, the chosen solution direction, key risks, and what you are explicitly not doing. Keep evidence and inference visibly separate so readers can judge your reasoning, not just your conclusion.',
            'Decide how you would know MoneyPilot works: a **leading indicator** (share of active users who check the forecast before payday), an **outcome** (fewer unplanned overdrafts among those users), and a **guardrail** (the rate of forecast-related complaints and support contacts per thousand users does not rise, with severe cases such as a missed bill reviewed individually). Use rates and severity, not raw counts: a launch that makes complaining easier can raise counts for good reasons. For each, name the analytics events you would need. AI tools can help explore the data later, but the metric definitions are a product decision you own.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'aihero-skills',
          why: 'Practitioner skills for questioning requirements and turning them into specs and plans agents can follow.',
          required: true,
        },
        {
          resourceId: 'anthropic-prompting-docs',
          why: 'Clear instructions, examples and constraints apply directly to PRDs that agents will read.',
          required: false,
        },
        {
          resourceId: 'nng-ai-study-guide',
          why: 'Useful background on using AI responsibly when analyzing usability findings.',
          required: false,
        },
      ],
      task: {
        summary:
          'Test your preferred prototype with real people, fix what they struggled with, then write a one-page opportunity brief and an agent-ready PRD with metrics.',
        steps: [
          'Write a short usability script: 3 to 5 realistic tasks based on your target opportunity and one comprehension question at the end.',
          'In the days before this session, test the prototype with 3 to 5 real people for 15 minutes each, either your discovery participants or new ones. Record observations with participant ids in `usability-notes.md`.',
          'Rank the issues by severity and fix the top three in the prototype. Keep before and after screenshots.',
          'Write `opportunity-brief.md`, one page, with evidence and inference clearly separated.',
          'Run the agent prompt below to draft `prd.md`, then rewrite anything generic in your own words.',
          'Open a fresh agent session, give it only the PRD, and ask it to list every question it would need answered before building. Improve the PRD until that list is short, putting your effort into acceptance criteria and edge cases rather than more prose.',
          'Save the final prototype screenshots or link next to the PRD, for example in `prototype/`, with the same version and date in both, so spec and design travel together.',
          'Define a leading, an outcome and a guardrail metric, and the analytics events needed to measure each.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code or Codex',
        where: 'In your private second brain at projects/moneypilot/',
        text: `Help me write an agent-ready PRD for MoneyPilot. Read these files first:
- research/unmet-needs.md
- discovery/opportunity-assessment.md and discovery/ost.md
- prototypes/concept-comparison.md
- usability-notes.md
- opportunity-brief.md

Write prd.md with these sections:
1. Problem and outcome (at most 3 sentences)
2. Users and context
3. Scope for v1, and explicit non-goals: no money movement, no real bank data, no investment advice
4. Data definitions: income, bill, payday, projected balance, shortfall, uncertain amount
5. User stories
6. At least 10 acceptance criteria in Given/When/Then format, including edge cases: no income in the period, a bill due on payday, a variable bill amount, empty data
7. Metrics: leading, outcome and guardrail, with the analytics events needed for each
8. Open questions and risks

Rules:
- Every requirement must trace to evidence in the files above or be labeled "assumption".
- Use concrete numbers in examples, consistent with fictional data only.
- Do not add features that no evidence supports. Put tempting extras under "Not now".
- After writing, list the five places where an engineer or coding agent is most likely to misinterpret this PRD.`,
      },
      expectedOutput: [
        'usability-notes.md from 3 to 5 real sessions, with the top three issues fixed',
        'opportunity-brief.md: one page, evidence separated from inference',
        'prd.md with scope, non-goals, data definitions and at least 10 Given/When/Then acceptance criteria',
        'Leading, outcome and guardrail metrics with the analytics events needed',
      ],
      artifact: 'MoneyPilot opportunity brief and agent-ready PRD',
      verification: [
        'A fresh agent session reading only prd.md raised fewer than five blocking questions.',
        'Every acceptance criterion is testable: concrete inputs and an observable expected result.',
        'The non-goals section explicitly excludes money movement, real bank data and investment advice.',
        'Usability findings are observations with participant ids, not opinions such as "liked it".',
        'If usability tests involved no real people, the PRD states that real-user validation is outstanding.',
      ],
      reflectionPrompts: [
        'Which usability observation changed the design most?',
        'What did the fresh agent misunderstand in your PRD, and what does that tell you about how engineers read specs?',
        'Which metric would you defend in a steering meeting, and which one are you least sure how to measure?',
      ],
      checklist: [
        {
          id: 'usability',
          text: 'Ran usability tests with real people, or labeled them practice with validation outstanding',
        },
        { id: 'fixes', text: 'Fixed the top three issues and kept before and after screenshots' },
        { id: 'brief', text: 'Wrote a one-page opportunity brief' },
        {
          id: 'prd',
          text: 'Wrote a PRD with at least 10 testable acceptance criteria, versioned together with the prototype',
        },
        {
          id: 'fresh-agent',
          text: 'Tested the PRD on a fresh agent session and closed its questions',
        },
        { id: 'metrics', text: 'Defined leading, outcome and guardrail metrics' },
      ],
      mentorMove:
        'Read her PRD as the engineer who has to build it tomorrow and mark the three sentences that would force you to guess. Then describe, without showing any work documents, a spec that went wrong in your experience and what was missing.',
    },
  ],
  challenges: [
    {
      id: 'c5',
      levelId: 3,
      title: 'Evidence-weighted prioritization versus a blind AI ranking',
      difficulty: 'Advanced',
      minutes: 120,
      competencies: ['product-discovery', 'ai-leadership'],
      xp: 200,
      suggestedWindow: 'December 2026',
      summary:
        'Prioritize every solution idea on your Opportunity Solution Tree using evidence, effort and risk, then compare your ranking with what an AI produces without your evidence. The gap shows exactly what product judgment adds.',
      steps: [
        'List every candidate solution from your tree and your "Not now" list, at least eight items.',
        'For each, record evidence strength (participants and quotes), rough effort (ask your mentor for a T-shirt size), and trust or regulatory risk.',
        'Ask an AI model to rank the list given only the item names and the problem statement. Save the result.',
        'Ask again with your evidence and constraints attached. Save that result too.',
        'Make your own final ranking, then compare all three.',
        'Write a one-page decision memo: the top bet, what you deprioritized and why, and where the blind AI ranking went wrong.',
      ],
      deliverable:
        'A prioritization table with evidence, effort and risk, and a one-page decision memo comparing your ranking with both AI rankings',
      verification: [
        'Every score references evidence or is labeled assumption.',
        'The memo names at least one specific mistake the AI made without context.',
        'The top bet links directly to the target opportunity on your tree.',
      ],
      resources: [
        {
          resourceId: 'torres-ost',
          why: 'Comparing solutions against a single target opportunity, not against each other in the abstract.',
          required: true,
        },
        {
          resourceId: 'producttalk',
          why: 'Further reading on assumption testing and prioritizing discovery work.',
          required: false,
        },
      ],
    },
    {
      id: 'c6',
      levelId: 3,
      title: 'AI-assisted product analytics on a fictional event log',
      difficulty: 'Advanced',
      minutes: 120,
      competencies: ['product-discovery', 'technical-collaboration', 'evals-safety'],
      xp: 200,
      suggestedWindow: 'January 2027',
      summary:
        'Generate a fictional MoneyPilot usage dataset with a hidden pattern, analyze it with an AI data tool, and verify the numbers yourself. Practice trusting AI analytics only as far as you can check it.',
      steps: [
        'Ask Claude Code or Codex to generate a fictional CSV event log for 2,000 fictional users over 8 weeks, with events such as forecast_viewed, shortfall_shown and reminder_set. Ask it to plant one specific pattern, and write the pattern down without looking at the analysis yet.',
        'In a separate session, upload the CSV to ChatGPT data analysis or Claude and ask for a funnel, weekly retention and the most interesting finding.',
        'Recompute two of the reported numbers yourself with a spreadsheet pivot table.',
        'Check whether the analysis found the planted pattern, missed it, or found something that is not there.',
        'Write an insight memo in which every finding has the query or method used and a confidence level.',
      ],
      deliverable:
        'A fictional event log, an insight memo with confidence levels, and two hand-verified numbers',
      verification: [
        'Two AI-reported numbers match your own spreadsheet calculation, or you documented the discrepancy.',
        'The memo distinguishes correlation from causation.',
        'You recorded whether the AI found the planted pattern.',
      ],
      resources: [
        {
          resourceId: 'karpathy-how-i-use-llms',
          why: 'Practical demonstrations of everyday LLM tool use, helpful context before trusting AI with data work.',
          required: false,
        },
        {
          resourceId: 'simon-willison-blog',
          why: 'A long-running practitioner record of what LLM tools can and cannot be trusted to do.',
          required: false,
        },
      ],
    },
  ],
  quiz: [
    {
      id: 'q3-1',
      competency: 'ai-fundamentals',
      prompt:
        'A deep research report says a competitor "launched an assistant that predicts overdrafts across all your accounts", with a citation. You want this in a steering deck tomorrow. What do you do?',
      options: [
        {
          id: 'a',
          text: 'Include it with the citation as a footnote, since a cited report has already been checked by the research tool itself.',
        },
        {
          id: 'b',
          text: 'Open the cited source, confirm it says this, and label it a vendor claim if the announcement is the only evidence.',
        },
        {
          id: 'c',
          text: 'Run the same research prompt in a second AI tool and include the claim only if both reports agree on it.',
        },
        {
          id: 'd',
          text: 'Leave all competitor claims out of the deck entirely, because AI research reports cannot be relied on for facts.',
        },
      ],
      correct: 'b',
      explanation:
        'Citations in AI reports often point to pages that do not support the claim, or blur announced and shipped features. Opening the source takes minutes; labeling announcements as vendor claims keeps the deck honest. Two models can repeat the same wrong source, and discarding everything wastes a useful lead.',
    },
    {
      id: 'q3-2',
      competency: 'product-discovery',
      prompt:
        'Your team is short on time and proposes replacing customer interviews with 50 AI-generated personas answering your discussion guide. What is the best response?',
      options: [
        {
          id: 'a',
          text: 'Agree, as long as the personas are generated from your bank segment data so they reflect real customers.',
        },
        {
          id: 'b',
          text: 'Agree, but run the personas through two different models and keep only the answers that both agree on.',
        },
        {
          id: 'c',
          text: 'Run a few short real conversations, use AI for guides and synthesis, and treat persona output as hypotheses.',
        },
        {
          id: 'd',
          text: 'Skip both the interviews and the personas, ship a small version quickly, and learn from the launch data instead.',
        },
      ],
      correct: 'c',
      explanation:
        'Synthetic users tend to be agreeable and generic, and they cannot reveal the surprising behaviors that make discovery valuable, even when seeded with segment data. AI is excellent around the interview: guides, synthesis, clustering. Even three real conversations beat fifty imagined ones as evidence.',
    },
    {
      id: 'q3-3',
      competency: 'product-discovery',
      prompt: 'Which discovery question is most likely to produce reliable evidence?',
      options: [
        {
          id: 'a',
          text: '"If an app warned you that a bill might bounce, how often would you check it?"',
        },
        {
          id: 'b',
          text: '"Tell me about the last time you were unsure whether a bill would go through."',
        },
        {
          id: 'c',
          text: '"What is the most frustrating thing about how your bank shows bills?"',
        },
        {
          id: 'd',
          text: '"Would a payday forecast make you feel more in control of your money?"',
        },
      ],
      correct: 'b',
      explanation:
        'Questions about a specific past event produce stories with real details: what people checked, what they did and how it felt. Hypothetical, leading and generalized questions invite polite, unreliable answers.',
    },
    {
      id: 'q3-4',
      competency: 'product-discovery',
      prompt:
        'A colleague drafts an Opportunity Solution Tree with "AI chat assistant" as the top node. What is the main problem?',
      options: [
        {
          id: 'a',
          text: 'The assistant belongs at the top only after engineering confirms it is feasible to build this quarter.',
        },
        {
          id: 'b',
          text: 'The top should be a measurable outcome; the assistant is a solution under an evidenced opportunity.',
        },
        {
          id: 'c',
          text: 'The top should be the target customer segment, with the assistant and other features listed underneath it.',
        },
        {
          id: 'd',
          text: 'The top should name the competitor feature you want to match, so the tree stays tied to the market.',
        },
      ],
      correct: 'b',
      explanation:
        'The tree starts with a desired outcome, branches into opportunities grounded in evidence, and only then into solutions and assumption tests. Putting a solution at the top skips the reasoning that tells you whether it is worth building.',
    },
    {
      id: 'q3-5',
      competency: 'ux-prototyping',
      prompt:
        'You asked an AI tool for three MoneyPilot prototypes and got three balance dashboards in different colors. What is the best next step?',
      options: [
        {
          id: 'a',
          text: 'Ask for three more dashboard variations with different layouts, then test all six with users.',
        },
        {
          id: 'b',
          text: 'Pick the clearest dashboard and spend the time on polishing it, since the layout is already familiar.',
        },
        {
          id: 'c',
          text: 'Prompt each concept in a fresh chat with a different core idea: a calendar, an answer, a nudge.',
        },
        {
          id: 'd',
          text: 'Ask the tool to rank the three against usability heuristics and keep the highest scoring one.',
        },
      ],
      correct: 'c',
      explanation:
        'Models default to the most average solution, and more variations of it stay average. Real divergence comes from changing the core concept in the prompt. Comparing genuinely different ideas is where design judgment adds value.',
    },
    {
      id: 'q3-6',
      competency: 'ux-prototyping',
      prompt:
        'In a prototype, a predicted shortfall is shown only as the projected balance turning red. What is the most important issue?',
      options: [
        {
          id: 'a',
          text: 'Red reads as alarming in money products, so a softer amber would cause less anxiety for users.',
        },
        {
          id: 'b',
          text: 'Color alone excludes some users; the shortfall needs words, an icon and ideally the reason.',
        },
        {
          id: 'c',
          text: 'The red text needs a contrast ratio of at least 4.5 to 1, and then the warning is accessible.',
        },
        {
          id: 'd',
          text: 'The shortfall should be behind a tap so users are not worried by a forecast that may change.',
        },
      ],
      correct: 'b',
      explanation:
        'Relying on color alone fails accessibility guidelines and color-blind users, even when contrast passes. In money products the message also needs to be understandable: say what will happen and why, with an icon as a second signal.',
    },
    {
      id: 'q3-7',
      competency: 'technical-collaboration',
      prompt: 'Which acceptance criterion is most ready for a coding agent to implement and test?',
      options: [
        {
          id: 'a',
          text: 'The forecast is accurate to within a reasonable margin and is explained in plain language that users understand.',
        },
        {
          id: 'b',
          text: 'Balance 1,000, pay 2,000 on the 25th, bills 850 before then: on the 10th, the 24th shows 150 and lists each bill.',
        },
        {
          id: 'c',
          text: 'The forecast screen loads quickly on all devices, handles every possible edge case and matches the approved design.',
        },
        {
          id: 'd',
          text: 'The agent uses the latest model to calculate the projected balance from the transaction history it is given.',
        },
      ],
      correct: 'b',
      explanation:
        'Concrete inputs and an observable expected result can be turned directly into an automated test. Vague criteria force the agent to guess, and an agent will guess confidently. Acceptance criteria and edge cases are the highest-leverage part of a PRD written for agents.',
    },
    {
      id: 'q3-8',
      competency: 'ai-leadership',
      prompt: 'Which is the best guardrail metric for a MoneyPilot launch?',
      options: [
        {
          id: 'a',
          text: 'Share of active users who open the forecast screen at least once in the final week before payday.',
        },
        {
          id: 'b',
          text: 'Total number of forecast complaints, which should stay below the level of last quarter after the launch.',
        },
        {
          id: 'c',
          text: 'Forecast complaints per thousand users do not rise, and severe cases such as missed bills are reviewed.',
        },
        {
          id: 'd',
          text: 'Number of messages users send to the assistant each week, which should keep rising after launch.',
        },
      ],
      correct: 'c',
      explanation:
        'A guardrail catches harm while you chase the main outcome. A raw complaint count moves with the number of users and with how easy complaining is, so use a rate plus severity review. Forecast views are a leading indicator, and message counts are activity that can rise for bad reasons.',
    },
  ],
  project: {
    title: 'MoneyPilot Product Discovery',
    brief:
      'Bring together the research, evidence, prototypes and specification from Level 3 into one discovery pack you could present to a steering group. It must show how you got from a market scan to a specific, evidence-backed bet, with real-user evidence or clearly labeled gaps where that evidence is still outstanding.',
    deliverables: [
      { id: 'competitors', text: 'Competitor research with evidence labels on every claim' },
      { id: 'brief', text: 'Evidence-backed opportunity brief' },
      {
        id: 'interviews',
        text: 'Customer interview notes from real people, or clearly labeled research constraints with real-user validation outstanding',
      },
      { id: 'ost', text: 'Opportunity Solution Tree traced to evidence' },
      { id: 'prd', text: 'Product specification (PRD) with testable acceptance criteria' },
      { id: 'prototype', text: 'Interactive prototype link or screenshots' },
      { id: 'decisions', text: 'User feedback log and the design decisions it led to' },
    ],
    rubric: {
      correctness:
        'Claims are sourced and spot-checked, quotes are verbatim, and acceptance criteria are consistent with the fictional data and with each other.',
      quality:
        'The pack reads as one coherent story from market to bet, the prototype embodies the stated principles and passes basic accessibility checks, and the PRD and prototype are versioned together and agree with each other.',
      independence:
        'You ran the research, conversations, synthesis and prototyping yourself, using AI as a tool and your mentor for review rather than to do the work.',
      judgment:
        'Evidence and assumptions are visibly separated, synthetic output is never presented as research, and the chosen bet has explicit non-goals and stop criteria.',
    },
    privacyNote:
      'Use fictional financial data only. Keep participant notes pseudonymized in your private second brain, never in a public repository, and do not use any real customer data from your employer.',
    minutes: 240,
    xp: 500,
  },
  nextRecommendation:
    'Level 4 turns your PRD into working software. Before starting, make sure prd.md has testable acceptance criteria and that a fresh agent can read it without asking basic questions: that spec is the main input from Session 13 onward.',
}
