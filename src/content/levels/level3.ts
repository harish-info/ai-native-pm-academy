import type { Level } from '../types'

export const level3: Level = {
  id: 3,
  slug: 'discover-and-decide',
  title: 'Discover and decide',
  theme: 'Do the PM job properly: strategy, real users, data, a decision and a PRD.',
  summary:
    'Revisit the prototype as one possible solution. Investigate the problem, compare alternatives including no AI, and choose a bounded bet or recommend stopping. Use real conversations where available and fictional analytics to rehearse the method. Write a PRD that separates observed evidence from assumptions and states value, quality, cost and response-time requirements.',
  outcomes: [
    'Write a one-page strategy kernel and a market map in which every claim is cited and its source saved in your workspace.',
    'Run interviews and usability tests with real people, handle consent and personal data properly, and synthesise by hand before comparing with Claude.',
    'Turn evidence into an Opportunity Solution Tree with a chosen target opportunity.',
    'Analyse a fictional event log with Claude Code, verify the numbers yourself, and build an evidence-weighted priority list.',
    'Write a PRD that invents nothing, flags gaps and contradictions, describes behaviour rather than implementation, and survives an engineer, a designer and a risk review.',
  ],
  badge: {
    name: 'Evidence-Led PM',
    description:
      'Took your product from "why this, why now?" to a reviewed PRD, with every claim traced to a source, a conversation or a number you checked yourself.',
  },
  lessons: [
    {
      id: 's9',
      levelId: 3,
      number: 9,
      title: 'Strategy and market',
      difficulty: 'Intermediate',
      minutes: 120,
      tools: ['Claude Code in Warp (or the desktop Code tab), with web search', 'Your workspace'],
      prerequisites: ['s8'],
      competencies: ['product-discovery', 'ai-leadership'],
      xp: 125,
      mentorReview: 'optional',
      goal: 'Answer leadership\'s "why this, why now?" for your product feature with a one-page strategy kernel and a market map, where every claim is cited and its source saved under `sources/` in your workspace.',
      whyItMatters:
        'Your manager has seen the prototype and asks: why this problem, and why now? The demo does not answer that. You need to know who else solves it, how people cope today and what they actually struggle with, with a source for every claim. One wrong competitor fact in a polished market map is enough to lose the room.',
      learn: [
        {
          heading: 'Start from the outcome, not the feature',
          paragraphs: [
            'An outcome-led approach gives teams problems to solve rather than only feature lists. Strategy chooses which problems matter; discovery tests assumptions before committing delivery effort. The SVPG article below describes this operating model in a few pages.',
            'Your idea is a feature until you can say which outcome it moves. Choose an outcome relevant to your context, such as successful task completion, time to resolution or qualified conversion. State the population and measurement window. Leadership needs a credible path to a useful outcome, with a reason it matters now.',
          ],
        },
        {
          heading: 'Your prototype is a guess, and this level checks it',
          paragraphs: [
            'In Level 2 you built a prototype before doing any research. That was deliberate: building is now cheap, and a working page is the fastest way to make an idea concrete. But it is still a guess. This level checks it: is the problem real, who has it, how often, and is your solution the right one?',
            'When agents make building faster, the slow part of a team becomes deciding what to build. So use Claude for this part too: gathering sourced evidence, comparing options and laying out the trade-offs nobody has decided. Expect to change the idea. "Do not build this" is a valid answer.',
          ],
        },
        {
          heading: 'The strategy kernel',
          illustration: 'strategy',
          paragraphs: [
            'Richard Rumelt, in Good Strategy Bad Strategy, describes the kernel of a strategy in three parts. It fits on one page, and it is the most useful page you can bring to a "why this, why now?" conversation.',
          ],
          bullets: [
            '**Diagnosis**: what is going on, and what makes it hard. Name the crux, backed by evidence: a market shift, a customer struggle, a gap competitors leave open.',
            '**Guiding policy**: the overall approach that deals with the crux. It rules things out as much as it rules things in.',
            '**Coherent actions**: three to five concrete steps that follow from the policy and support each other, including what you will stop or not do.',
            '**Signs of bad strategy**: a goal dressed up as a strategy ("be the most trusted assistant"), fluffy language, a list of everything, or copying a competitor without a diagnosis of your own.',
          ],
        },
        {
          heading: 'Research in parallel sessions and save every source',
          paragraphs: [
            'Split the research into narrow slices, such as competing AI assistants, established apps and how people cope today, and give each slice its own session and folder. You can run them side by side or one after another. Ask each slice for one sourced brief, then check the claims you rely on against the pages.',
            'Each slice saves the raw pages it read, unchanged, in `sources/market/`, and returns one brief of about a page. Every claim in the brief carries the link, the date read, the exact sentence that supports it, the saved page file and an evidence label. The market map is then built only from the three briefs and the saved pages. This is the start of a habit that runs to the end of the course: raw sources in one place, synthesis in another, and every synthesised line pointing back to where it came from.',
            'Typical research failures: citing a page that does not contain the claim, merging two products into one, describing announced features as shipped, and treating a press release as evidence of adoption. Label every claim so readers can judge it:',
          ],
          bullets: [
            '**Verified**: a primary source shows it directly, such as the product itself, its help pages or a regulator, and you or Claude opened it.',
            '**Vendor claim**: the company says this about itself in marketing or a press release. Useful, but not evidence of usage or quality.',
            '**Unverified**: no source, or the source does not support the claim. Drop it or go and check.',
          ],
        },
        {
          heading: 'What makes one AI product better than another',
          paragraphs: [
            "AI assistants differ less in their chat interface than in their data access, their action rights and their trust model. For each competitor, capture who it is for, what data it uses, what it can do (answer, summarise, plan, act on the user's behalf), what needs explicit approval, and where it draws the line on sensitive data, consequential decisions and external actions. Not every competitor is an AI product: the strongest one is often a spreadsheet, a reminder or a habit, so include the workarounds too.",
            'Compare strategic choices: deepen an existing workflow, serve an underserved segment, remove a costly handoff or make a recurring decision easier. Choose using your evidence and constraints. Your strongest alternative may be a process change rather than a new AI feature.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'svpg-product-operating-model',
          why: 'A short introduction to outcomes over features: teams own problems, strategy picks which ones, discovery comes before delivery.',
          required: false,
        },
      ],
      task: {
        summary:
          'Run competitor research in three parallel Claude Code sessions with each slice returning one sourced brief and its raw pages saved unchanged, build a market map from those briefs and pages only, and write a one-page strategy kernel for your product feature.',
        steps: [
          'In your `workspace/`, create the folders `strategy/` and `sources/market/`. Add one line to `AGENTS.md`: "Raw pages read during market research live in sources/market/, unedited, one file per page. Briefs live in strategy/." If your folder still has a `CLAUDE.md` from an earlier version of this course, first ask your agent to move its contents into `AGENTS.md` and leave `@AGENTS.md` as the only line in `CLAUDE.md`.',
          'Open three Claude Code sessions in the workspace at the same time (a new Warp tab for each, or a new session in the desktop app). Paste the agent prompt below into each one, choosing a different slice each time: AI assistants that compete, established apps and incumbents, and workarounds and the customer voice.',
          'Draft the diagnosis in `strategy/strategy-kernel.md` in your own words. Use the Google PAIR reading from Tutorials and sources to ask whether a simpler version without AI would do the job. Mark what you do not yet know about your target users.',
          'When the sessions finish, pick five claims at random across the three briefs and open their links yourself. Does the page say what the brief says? Correct any wrong label and note what was wrong. If more than one of the five is wrong, check the rest of that brief too.',
          'Start a fresh session and ask Claude to build `strategy/market-map.md` from the three briefs and `sources/market/` only: a table with product, who it is for, data it uses, what it can do, what needs approval, where it stops on sensitive data, consequential decisions and external actions, evidence label and source file for every row; a section of 5 to 8 unmet needs written as customer problems, each with supporting quotes and links; and a section "Claims to check or drop".',
          'Finish `strategy/strategy-kernel.md` on one page: the outcome, the diagnosis, the guiding policy, three to five coherent actions, and what you will not do. Every claim in the diagnosis links to a brief claim, a saved page or a market map row.',
          'In a fresh session, ask Claude to read the kernel and the market map and find the weakest link: a claim with no source, an action that does not follow from the policy, or a competitor fact the kernel depends on that is only a vendor claim. You decide what to change.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code',
        where: 'Three sessions at once in your workspace/ folder, one per research slice',
        text: `Read AGENTS.md and product-context.md first. I am mapping competitors and workarounds for the user problem defined there. Confirm the target users, problem and market from that file. Ask me if any are missing; do not substitute a generic or fictional problem.

Your slice: [AI ASSISTANTS THAT COMPETE | ESTABLISHED APPS AND INCUMBENTS | WORKAROUNDS AND THE CUSTOMER VOICE]. Stay inside this slice; other sessions are covering the rest.

Search the web and open the pages yourself. Save the text of every page you read, unchanged, in sources/market/ named <product-or-site>-<topic>.md. Then write one brief for your slice, saved as strategy/brief-<slice>.md, of about one page. Each claim in the brief has:
- the URL, today's date and the name of the saved page file
- the exact sentence on the page that supports the claim
- an evidence label for each claim: verified (a primary source such as the product, its help pages or a regulator shows it directly), vendor-claim (the company says it about itself in marketing or a press release) or unverified
- for customer voice: each quote copied verbatim with its link, and no usernames or other personal details

Rules:
- Never state a feature, date, number or quote that is not on a page you saved. Write "unknown" instead.
- Announced is not shipped. Say which one each feature is.
- One brief only, and no more than about a page. End it with the three claims you are least sure of.`,
      },
      expectedOutput: [
        '`sources/market/` with the raw pages the sessions read, saved unchanged, and three briefs in `strategy/`, one per slice, each claim with its link, date, supporting sentence and a verified, vendor-claim or unverified label',
        '`strategy/market-map.md`: 4 to 8 competitors and workarounds, 5 to 8 unmet needs with quotes, and a list of claims to check or drop',
        '`strategy/strategy-kernel.md`: outcome, diagnosis, guiding policy, coherent actions and what you will not do, on one page',
      ],
      artifact:
        '`strategy-kernel.md` and `market-map.md`, with every source saved under `sources/`',
      verification: [
        'You opened five source links from the briefs yourself and recorded whether each claim matched the page.',
        'Every row in the market map names a source file and carries an evidence label.',
        'Every unmet need is phrased as a customer problem with no product feature in the sentence.',
        'The diagnosis names a crux backed by evidence, not a goal or an aspiration.',
        'The coherent actions include at least one thing you will not do.',
      ],
      reflectionPrompts: [
        'Which claim looked most credible but turned out to be unsupported or only a vendor claim?',
        'Which strategic play would suit your product, and what in your diagnosis makes you think so?',
        'What would a sceptical director say is missing from your kernel?',
      ],
      checklist: [
        { id: 'parallel', text: 'Ran three research slices in parallel Claude Code sessions' },
        {
          id: 'sources',
          text: 'Each slice returned one sourced brief, with the raw pages it read saved unchanged under sources/market/',
        },
        { id: 'spot-check', text: 'Opened five source links myself and fixed any wrong labels' },
        { id: 'map', text: 'Built the market map from the briefs and saved pages only' },
        { id: 'kernel', text: 'Wrote a one-page strategy kernel with what we will not do' },
      ],
      mentorMove:
        'Pick three rows from the market map at random and ask "show me where it says that." Then read the kernel and ask the question a director would: "why now, and not next year?" If you have one, share an example of an AI-generated claim that reached a stakeholder unverified, and what it cost.',
    },
    {
      id: 's10',
      levelId: 3,
      number: 10,
      title: 'Talk to real people',
      difficulty: 'Intermediate',
      minutes: 150,
      tools: [
        'Claude Code',
        'A video-call tool, with transcription only if participants agree',
        'Your live prototype from Level 2',
      ],
      prerequisites: ['s9'],
      competencies: ['product-discovery', 'ux-prototyping'],
      xp: 125,
      mentorReview: 'recommended',
      practicalProof: true,
      safetyCritical: true,
      goal: 'Interview five real people who match your target users and test your prototype with them, handle their personal data properly, synthesise by hand before comparing with Claude, and turn the evidence into an Opportunity Solution Tree. The conversations happen in the week before this session; the session time covers the guide, synthesis and tree.',
      whyItMatters:
        'Your strategy rests on guesses about people and their work. Now you talk to people who actually have the problem. Claude can write a convincing persona or interview transcript in seconds, and none of it happened. Keep what you heard and saw apart from anything generated, so anyone can trace why you picked the next step.',
      learn: [
        {
          heading: 'An interview first, then a usability test',
          paragraphs: [
            'Each conversation takes about 30 minutes. Spend the first half on a story-based interview and the second half on a usability test of your prototype. Interview first, so the prototype does not shape what people tell you about their real lives.',
            'In the interview, ask about specific past behaviour, not hypothetical futures. "Tell me about the last time this went wrong for you" beats "Would you use your product?" People are poor at predicting their own behaviour and very good at telling stories about what actually happened.',
            'In the usability test, give a realistic task built on the core job, such as answering "What needs my attention, and why?" with the prototype on its live link. Ask them to think aloud, stay quiet, and watch where they hesitate. Record observations, not opinions: "P3 tapped the total three times expecting details" is useful, "P3 liked it" is not. Finish with a comprehension question about a figure on screen: "what does this number mean, and what happens next?" If people cannot answer it, the design is not working, however much they liked it.',
          ],
          bullets: [
            'Start with context: their week, the tools they use and where the job your product targets fits in.',
            'Ask for the last specific time, then dig: what did you do, what did you check, how did it feel?',
            'Listen for workarounds such as spreadsheets, sticky notes, reminders or copied templates. Workarounds signal real pain.',
            'Do not pitch. Show the prototype only in the second half, and say it is a prototype with fictional data.',
          ],
        },
        {
          heading: 'Consent and personal data',
          paragraphs: [
            'Interview notes hold personal details, whatever your product. Tell people how you will use the notes, write down only what you need, and strip anything that identifies them.',
          ],
          bullets: [
            'Ask for consent to take notes, separately for any recording or transcription, and separately again before any AI tool processes the notes. Name the tool: "I will use Claude to help summarise my notes, without your name."',
            'Replace names with P1 to P5 everywhere, and leave out employers, places and stories that would identify someone. This makes the notes pseudonymised, not anonymous: you still know who P1 is, so they remain personal data.',
            'If you record, delete the recording once your notes are written. Raw recordings and unedited transcripts never go into Claude or into any repository.',
            'If a participant shows you a real account, a real calendar or a real customer record, do not screenshot it. Note the behaviour, not the data.',
            'Check your Claude privacy settings, including whether your chats may be used to improve models, before you process any notes.',
            '`discovery/interview-notes/` never goes into a public repository. If your workspace is backed up to GitHub, the repository must be private.',
          ],
        },
        {
          heading: 'Synthesise by hand first, then with Claude',
          paragraphs: [
            'If you read Claude’s synthesis first, you will start seeing your interviews through it. So write your snapshots and your own themes first, then ask a fresh session for its version. A fresh session has not heard your opinions, but it is reading the same notes you wrote, so check both versions against the original quotes.',
            'When you and Claude agree on a theme, that tells you where to look, not that it is more true: no new participant said anything. Check the quotes behind it. One person describing a serious problem can matter more than five mentioning a small annoyance.',
          ],
        },
        {
          heading: 'Synthetic users: when they help and when they mislead',
          paragraphs: [
            'Synthetic users are personas a model makes up. They tell vivid, emotional and surprising stories, and every one of them is invented. However convincing the story, it tells you nothing about whether real people have the problem, or how many.',
            'They help with the work around research: rehearsing your discussion guide, spotting leading questions, and listing hypotheses to test with real people. They mislead the moment they are counted as evidence. If you rehearse with a synthetic participant, label it practice and keep it out of your synthesis. Challenge c6 lets you compare the two directly.',
          ],
        },
        {
          heading: 'Opportunity Solution Trees',
          illustration: 'discovery',
          paragraphs: [
            "Teresa Torres's Opportunity Solution Tree connects a desired outcome at the top, to opportunities (customer needs, pain points and desires) in the middle, to solutions and assumption tests at the bottom. The rule that makes it useful: every solution hangs off an opportunity, and every opportunity traces back to something a real person said or did.",
            'Take the outcome from your strategy kernel. Each opportunity is a specific difficulty you heard or saw, kept concrete: "has to open three tools to finish one task", not "finds it inefficient". Your prototype is one solution under one opportunity, not the top of the tree. Put two or three alternatives next to it and compare them on how well they address the opportunity, not on how good they look in a demo.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'torres-interviewing',
          why: 'How to recruit, ask story-based questions about the last time, and capture each interview as a one-page snapshot.',
          required: false,
        },
        {
          resourceId: 'torres-ost',
          why: 'The original explanation of Opportunity Solution Trees from the person who popularised them.',
          required: false,
        },
        {
          resourceId: 'nng-synthetic-users',
          why: 'Why AI-generated users cannot replace research with real people, and where they might still help.',
          required: false,
        },
        {
          resourceId: 'nng-usability-testing-101',
          why: 'The basics of a usability test: a facilitator, realistic tasks and a participant thinking aloud.',
          required: false,
        },
        {
          resourceId: 'producttalk',
          why: 'Ongoing practical writing on continuous discovery and interviewing.',
          required: false,
        },
      ],
      task: {
        summary:
          "Recruit five real people a week ahead and run a 30-minute interview and usability test with each (three is the minimum). The 3 to 5 user calls happen outside the session time. The session's minutes cover the interview guide, your synthesis, the comparison with Claude's synthesis and the Opportunity Solution Tree for your product.",
        steps: [
          'A week before this session (late in Level 2 is a good time), recruit five people who match your target users as closely as you can. Ask friends, former colleagues and your wider network for introductions. Three is the minimum. Explain it is a 30-minute learning conversation, and ask for consent to take notes and to use Claude on the notes without their name.',
          'Write `discovery/discussion-guide.md` in two halves: interview questions about the last time, then 3 to 5 usability tasks and one comprehension question. Ask Claude to point out every leading or hypothetical question; you decide the fixes.',
          'Run the conversations on a video call with the prototype on its live link, in the days before the session. These calls are outside the session time. Take notes, or transcribe only with explicit consent. Use P1 to P5 from the start.',
          'Within a day of each conversation, write a one-page snapshot in `discovery/interview-notes/P1.md` and so on: key quotes, behaviours, workarounds, emotions, where they hesitated in the prototype, and their answer to the comprehension question. Delete any recording once the snapshot is written.',
          'Before using any AI, write "My synthesis" in `discovery/synthesis.md`: the opportunities you heard, with participant ids, and the usability problems ranked by how many people hit them.',
          'Start a fresh Claude Code session and run the agent prompt below. It writes an independent synthesis to `discovery/synthesis-claude.md` without reading yours.',
          'Add two sections to `synthesis.md`: "Claude\'s synthesis" (a short summary with a link to its file) and "Where we differ", with your decision on each difference and the note or quote that settled it.',
          'Build `discovery/ost.md` as a nested Markdown outline: the outcome from your kernel, 4 to 6 opportunities with participant ids, 2 or 3 solutions under your target opportunity (your prototype is one of them), and one assumption test per solution.',
          'File only the usability problems you actually observed, as issues in your prototype repository. Write the steps to reproduce without names or identifying details, and keep participant notes in the private workspace. Do not invent problems to fill a quota.',
          'If you cannot find participants, rehearse the guide and synthesis anyway: ask your mentor or a friend to play a participant, or ask Claude to answer your guide as one participant who matches your target users (the first step of Challenge c6; leave its comparison step until you have real interviews). Label every resulting file "PRACTICE: real-user validation outstanding", keep it out of research evidence, and make a dated recruitment plan. Continue the course as a learning simulation; do not claim the problem or solution is validated.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code',
        where: 'A fresh session in your workspace/ folder',
        text: `Read the snapshots in discovery/interview-notes/ (P1.md to P5.md). Do not open discovery/synthesis.md: I wrote my own synthesis first and want an independent one to compare it with.

Names and identifying details are already removed. Do not try to work out who anyone is.

Write discovery/synthesis-claude.md with:
1. Opportunities: every distinct need, pain point or desire, phrased in the first person as the participant would say it. For each, the participant ids and the exact supporting quotes, copied verbatim. Mark any opportunity with only one participant as "weak signal".
2. Usability findings: where people hesitated, misread or failed a task in the prototype, with participant ids, ranked by how many people hit it and how badly.
3. Comprehension: for each participant, did they correctly explain the key figure on screen?
4. Places where my notes read like my own interpretation rather than what the participant said or did.
5. A proposed outcome and 4 to 6 parent opportunities for an Opportunity Solution Tree. No solutions yet.

Rules:
- Never invent a quote, participant or behaviour. If the evidence is thin, say so.
- Count only what is in the notes. Do not fill gaps with what people usually do.
- End with three questions for my next round of conversations.`,
      },
      expectedOutput: [
        'A discussion guide with story-based questions, usability tasks and a comprehension question',
        '`discovery/interview-notes/` with 3 to 5 pseudonymised one-page snapshots from real conversations, or a clearly labeled practice exercise',
        "`discovery/synthesis.md` with your synthesis, a summary of Claude's, and where the two differ",
        '`discovery/ost.md`: an Opportunity Solution Tree with every opportunity traced to participants',
        'The usability problems you observed, filed as issues in the prototype repository',
      ],
      artifact: "`interview-notes/`, `synthesis.md` (yours compared with Claude's) and `ost.md`",
      verification: [
        'Every participant gave consent to notes and to AI processing, and any recording was deleted after the snapshot was written.',
        'Snapshots contain no real names, employers, account details or identifying stories.',
        'Your synthesis was written before Claude\'s, and the "Where we differ" section has a decision for each difference.',
        'Every opportunity on the tree links to at least one participant id and a verbatim quote, and no synthetic answer is counted as evidence.',
        'Usability findings are observations with participant ids, not opinions such as "liked it".',
        'If participants were unavailable, every file is labeled PRACTICE and real-user validation is marked outstanding.',
      ],
      reflectionPrompts: [
        'What did a participant say or do that contradicted your starting assumption?',
        'Which theme did only you find, and which did only Claude find? What does that tell you about each?',
        'Which opportunity did you not choose, and what evidence would change your mind?',
      ],
      checklist: [
        {
          id: 'conversations',
          text: 'Held at least 3 real conversations with consent, or labeled the work PRACTICE with a dated plan',
        },
        {
          id: 'pseudonymised',
          text: 'Pseudonymised every snapshot as P1 to P5 and deleted any recordings',
        },
        { id: 'hand-first', text: "Wrote my own synthesis before reading Claude's" },
        {
          id: 'compared',
          text: "Recorded where my synthesis and Claude's differ, with a decision on each",
        },
        { id: 'ost', text: 'Built an Opportunity Solution Tree traced to evidence' },
        { id: 'issues', text: 'Filed the usability problems I observed as issues' },
      ],
      mentorMove:
        'Play a participant in a 10-minute mock interview before the real ones, deliberately giving vague, hypothetical answers so she practises asking "tell me about the last time." Afterwards, read the tree and challenge the opportunity with the weakest evidence.',
    },
    {
      id: 's11',
      levelId: 3,
      number: 11,
      title: 'Data and prioritisation',
      difficulty: 'Intermediate',
      minutes: 135,
      tools: ['Claude Code', 'A spreadsheet (Google Sheets, Excel or Numbers)'],
      prerequisites: ['s10'],
      competencies: ['product-discovery', 'technical-collaboration'],
      xp: 125,
      mentorReview: 'optional',
      goal: 'Generate a fictional event log for your product with Claude Code, analyse the funnel, check the key numbers yourself, show the result on a one-page dashboard, estimate the impact of your opportunity as a range, and turn everything you know into an evidence-weighted list of bets.',
      whyItMatters:
        'Your interviews say people struggle with one thing. Then an engineer asks how many people actually hit it, and how often. Interviews tell you why; data tells you how many. At work, the moment the two disagree is often the most useful one in discovery. Here the data is fictional, so you practise the method, not the finding. Claude Code can generate a dataset, analyse it and draft a priority list in an hour. It can also produce a confident chart from a wrong denominator. The skill is knowing which numbers to check by hand before anyone makes a decision on them.',
      learn: [
        {
          heading: 'Event logs, funnels and retention',
          paragraphs: [
            'Product analytics starts with an event log: one row per thing a user did, with a user id, a timestamp and an event name. From it you build a funnel (how many users reach each step on the way to the outcome), retention (how many come back), and segments (whether some groups behave differently).',
            'Most analysis mistakes are definition mistakes. Is a "user" anyone who signed up, or anyone active this week? Is a step counted per user or per session? A conversion rate with the wrong denominator looks just as convincing as a right one. Write the definitions down before you look at any result.',
          ],
        },
        {
          heading: 'Why you generate fictional data',
          paragraphs: [
            'You will not use real customer data in this course. Instead, Claude Code writes and runs a small script that generates a realistic event log for your product. Two details make it useful. A **fixed random seed** means the script produces exactly the same file every time, so your numbers can be reproduced. **Stated assumptions** in a separate file record every rate and drop-off the script used, so you can later check whether the analysis recovered them.',
            "You do not need to read the script. You do need to check its output, the same way you would check an analyst's work. Analytics tools now offer connectors that let Claude query live product data directly, and at work that is how you would do this, within your company's data rules. Here a CSV keeps it free and private.",
          ],
        },
        {
          heading: 'Check two numbers by hand',
          illustration: 'funnel',
          paragraphs: [
            'Ask Claude Code to calculate with a script, not in its head, and to show the counts behind every percentage. Then recompute two of the numbers yourself in a spreadsheet pivot table. If they match, you have earned some trust in the rest. If they do not, you have found a problem before a stakeholder did.',
          ],
          bullets: [
            'Wrong denominator: a rate calculated over all users when it should be users who reached the previous step.',
            'Double counting: duplicate events or users counted once per session instead of once.',
            'Correlation read as causation: users who open a feature retain better, but engaged users open everything.',
            'Small segments: always show the counts. A big difference in a group of 30 users could be real or could be noise, so dig in before you claim either.',
          ],
        },
        {
          heading: 'Show the result on one page',
          paragraphs: [
            'Your engineer, your designer and your manager will not read `funnel-analysis.md`. They will look at a page for thirty seconds. A good dashboard answers one question for one audience, such as "where do new users drop out?", and puts the answer where the eye lands first. Agents make this cheap, so make it normal: whenever numbers need to be understood quickly, ask for a page.',
          ],
          bullets: [
            '**The question, the audience, the date range and the data source** in the first lines.',
            '**One headline number first**, large, then no more than four or five charts. If everything is highlighted, nothing is.',
            '**Counts beside every percentage**, and your definitions on the page, so nobody has to ask "out of how many?"',
            '**Plain charts**: bars to compare groups, a line for change over time, a funnel as bars. No pie with many slices, no 3D, no gauges.',
            '**Colour only for meaning**: one neutral colour and one highlight for what needs attention, with text labels so it still reads in black and white.',
            '**Honest labels**: fictional data says so on the page.',
          ],
        },
        {
          heading: 'Build it from the data, then check it',
          paragraphs: [
            'Ask Claude Code for one HTML file built by a script from the CSV, never with numbers typed in. If the data changes, you run the script again instead of editing the page. Then check two numbers on the page against your own pivot table. A finished-looking chart is trusted more than a table, so a wrong denominator does more damage on a dashboard than anywhere else.',
            'This page answers a question once. A dashboard someone checks every morning, with thresholds that tell them when to act, comes in Session 15.',
          ],
        },
        {
          heading: 'Estimate impact as a range, then score with RICE',
          illustration: 'impact',
          paragraphs: [
            'Write the impact as a sum with units. For example: 1,200 eligible users a month, times 5 more completions per 100 users, gives 60 more completed tasks a month. That is a count of tasks, not a new percentage. If you turn it into hours saved or money, show that step separately. Give a low, base and high version, and label each input with where it came from: the data, the interviews, the market map or your own assumption. A single precise number gets trusted more than it deserves.',
            'RICE, from Intercom, scores each idea by reach, impact, confidence and effort, so competing ideas can be compared on evidence rather than on who argues loudest. Confidence is where your evidence enters: high when data and several interviews agree, medium when only interviews support it, low for a single source or an assumption. Effort comes from engineering; your mentor can give a T-shirt size. Treat the score as the start of a conversation, and override it with a written reason when something it cannot see matters, such as a regulatory risk.',
            'One more test shows what your judgment adds: ask Claude to rank the same list knowing only the item names. Where its blind ranking differs from yours is where your evidence is doing the work.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'intercom-rice',
          why: 'The original RICE write-up: reach, impact, confidence and effort, so ideas are compared on evidence rather than volume.',
          required: false,
        },
        {
          resourceId: 'nng-ai-study-guide',
          why: 'Guidance on keeping human oversight when AI helps analyse research and data.',
          required: false,
        },
        {
          resourceId: 'anthropic-pm-plugin',
          why: "Anthropic's product management plugin for Claude Code helps with roadmaps and research synthesis; try it on your bets list and compare its output with your own.",
          required: false,
        },
        {
          resourceId: 'few-dashboard-confusion',
          why: 'The classic definition of a dashboard: what matters for one objective, on one screen, readable at a glance.',
          required: false,
        },
        {
          resourceId: 'nng-dashboards-preattentive',
          why: 'Why bars and lines read faster than pies, donuts and gauges.',
          required: false,
        },
        {
          resourceId: 'anthropic-build-dashboard-skill',
          why: 'A skill that turns a CSV into an HTML dashboard. Override its defaults: no donuts, n beside every rate, never invent data.',
          required: false,
        },
      ],
      task: {
        summary:
          'Generate and analyse a fictional event log for your product, verify two numbers by hand, show the result on a one-page dashboard, write an impact estimate as a range, and build an evidence-weighted list of bets.',
        steps: [
          'Create a `data/` folder in your workspace and run the agent prompt below in Claude Code. It generates `data/events.csv`, `data/assumptions.md` and a sealed `data/planted.md`. Do not open `planted.md` yet.',
          'Open `events.csv` in a spreadsheet and skim it: do the event names match your prototype, and does it cover about 2,000 users over 8 weeks?',
          'Write your definitions at the top of `data/funnel-analysis.md`: what counts as a user, an active user, and each funnel step.',
          'Start a fresh session and ask Claude Code to analyse `data/events.csv` without opening `assumptions.md` or `planted.md`: the funnel from first open to the main action, weekly retention, the step with the biggest drop, and one segment comparison. It must calculate with a script, show the counts behind every percentage, use your definitions, and add its findings to `funnel-analysis.md` with a confidence level for each.',
          'Recompute two of the reported numbers yourself with a pivot table. Record in `funnel-analysis.md` whether they match, and explain any difference.',
          'Ask Claude Code to build `data/funnel-dashboard.html` with a script that reads `events.csv`: your question and audience at the top, the biggest drop as the headline number, then the funnel, weekly retention and your segment comparison, with counts beside every percentage, your definitions at the bottom and a "fictional data" label. Open it in a browser and check that two numbers match your pivot table.',
          'Now open `planted.md`. Did the analysis find the planted pattern? Note what it missed, and anything it reported that you did not plant. The data is made up: if it seems to disagree with your interviews, that is practice, not news about your users.',
          'With Claude, write `data/impact-estimate.md`: reach, behaviour change and value for your target opportunity, as a low, base and high range, with every input labeled data, interviews, market or assumption.',
          'List at least eight candidate bets from `ost.md`, the market map and your usability issues. In a fresh session, ask Claude to rank them given only the names and a one-line problem statement, and save its ranking in `data/prioritised-bets.md`.',
          'In the same file, score the bets with RICE, labelling reach and impact taken from the made-up data as practice assumptions. Add a no-AI alternative, a cost range and the real evidence still needed. State your recommendation, what you deprioritised and why. Changing the idea or recommending no build is a valid outcome.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code',
        where: 'In your workspace/ folder',
        text: `Read product-context.md and discovery/ost.md. Use my chosen workflow, target users and definitions to generate fictional practice data. Ask about any missing definition rather than choosing a product domain for me.

Write and run a small script that generates data/events.csv: a fictional event log for 2,000 fictional users over 8 weeks.
- Columns: user_id, timestamp, event, plus one or two properties useful for segments, such as platform or signup week.
- Events that match my prototype's screens, for example opening the app, viewing the main task screen, opening a detail, completing the main action and returning the next week. List the event names you chose in your reply.
- Use a fixed random seed so the file is identical every time the script runs.
- Include realistic mess: users who sign up and never return, some duplicate events, a few missing values.

Write data/assumptions.md: the seed and every assumption behind the numbers (sizes, rates, drop-offs) in plain language. Start the file with "Fictional data generated for practice."

Plant one pattern that would surprise a PM who had only read the interviews, for example a step most users never reach, or a segment that behaves very differently. Describe it only in data/planted.md. Do not mention it in assumptions.md or in your reply.

Use no real people, companies or figures.`,
      },
      expectedOutput: [
        '`data/events.csv` with a fixed seed, `data/assumptions.md`, and `data/planted.md` opened only after the analysis',
        '`data/funnel-analysis.md`: definitions, funnel, retention, one segment, confidence levels, two hand-checked numbers and the planted-pattern result',
        '`data/funnel-dashboard.html`: one page generated from the CSV, with the answer first and counts beside every percentage',
        '`data/impact-estimate.md`: a low, base and high range with every input labeled by source',
        '`data/prioritised-bets.md`: at least eight bets scored with RICE, compared with a blind AI ranking',
      ],
      artifact:
        '`funnel-analysis.md`, `data/funnel-dashboard.html`, `impact-estimate.md` and `prioritised-bets.md`',
      verification: [
        'Two numbers reported by Claude match your own pivot table, or the difference is explained.',
        'Every percentage in the analysis shows the counts behind it.',
        'The dashboard was generated from the CSV by a script, and two of its numbers match your pivot table.',
        'You recorded whether the analysis found the planted pattern before reading anything else into the results.',
        'Every confidence score in the bets list points to evidence or is labeled assumption.',
        'The top bet links to the target opportunity on your tree.',
      ],
      reflectionPrompts: [
        'If real product data disagreed with your interviews at work, which would you trust first, and what would you check before deciding?',
        'Which definition, if you changed it, would change your conclusion?',
        'What did the blind ranking get wrong, and what does that tell you about the context only you had?',
      ],
      checklist: [
        {
          id: 'generated',
          text: 'Generated a fictional event log with a fixed seed and stated assumptions',
        },
        { id: 'definitions', text: 'Wrote metric definitions before reading any results' },
        { id: 'hand-check', text: 'Recomputed two numbers in a spreadsheet' },
        { id: 'planted', text: 'Checked the analysis against the planted pattern' },
        {
          id: 'dashboard',
          text: 'Built a one-page dashboard from the data and checked two numbers',
        },
        { id: 'impact', text: 'Wrote an impact estimate as a range with labeled inputs' },
        { id: 'bets', text: 'Scored at least eight bets with evidence-weighted RICE' },
      ],
      mentorMove:
        'Give T-shirt effort sizes for the top five bets and explain the one that surprised her most. Then pick one percentage in the funnel analysis and ask "what is the denominator?" until the answer is precise.',
    },
    {
      id: 's12',
      levelId: 3,
      number: 12,
      title: 'A PRD people and agents can build from',
      difficulty: 'Advanced',
      minutes: 150,
      tools: ['Claude Code', 'Your live prototype from Level 2'],
      prerequisites: ['s11'],
      competencies: ['product-discovery', 'technical-collaboration'],
      xp: 150,
      mentorReview: 'recommended',
      practicalProof: true,
      goal: 'Write `prd/prd.md` for your top bet by letting Claude Code interview you and read your workspace, then improve it through an engineer, a designer and a risk review in fresh sessions, so one document can brief people and coding agents alike.',
      whyItMatters:
        'Engineers, designers and their coding agents will build from this document without having sat in your interviews. Whatever it leaves out, they guess. This session turns your evidence into a PRD that says what must be true, what is still open and how to tell when it is done.',
      learn: [
        {
          heading: 'Who reads the PRD',
          paragraphs: [
            'The PRD is context, in exactly the sense of Session 2: everything a reader needs to do the work well, and nothing they would have to guess. A person and a coding agent need the same things from it: the problem, the outcome, the scope, what the product must always and never do, and how to tell when it is done. Write it once, precisely, and it briefs both.',
            'The prototype shows what the product feels like; the PRD says what must be true. Link the prototype from the PRD, and let each do what it is good at.',
            'Treat the PRD as shared intent, not a private PM output. Invite design and engineering to challenge the problem, scope and unknowns while they are still cheap to change. Name decision owners and a backup, so the PM does not become the only person who can explain the plan.',
          ],
        },
        {
          heading: 'Sections of the PRD',
          paragraphs: [
            'Use the [PRD template](https://github.com/harish-info/product-templates/blob/main/skills/prd-plan/templates/prd-template.md) from product-templates. Its sections cover most features. Keep each one short, and spend your time where engineers and agents most often go wrong: behavioural contracts, acceptance criteria and edge cases.',
            'The template marks gaps instead of hiding them. `[NEEDS INPUT]` is something nobody has decided yet. `[ASSUMPTION -- reason]` is a guess someone must confirm. `[BLOCKER -- NEEDS INPUT]` is anything the first slice cannot ship without. A draft full of markers is honest; a draft with none is suspicious.',
          ],
          bullets: [
            '**Definitions**: every term that could be read two ways, such as how a total is calculated or when a status changes.',
            '**Problem statement** and **current state**: what is wrong today and how people cope, with links to your synthesis and data.',
            '**Goals**, **target users** and **solution overview**: the outcome from your kernel, who this is for and who it is not for, and a short description with a link to the prototype.',
            '**Scope**: in scope in priority order, out of scope for now, and non-goals you decided against, with the reason.',
            '**User flows**: numbered steps for the main flow and the alternatives, with each decision point written as "if this, go to step 4".',
            '**Behavioural contracts**: what the system must always do, must ask first about, and must never do.',
            '**Data and constraints**, **acceptance criteria** per phase, **tracking** and **edge cases**.',
            '**Success metrics** with rollback criteria, **risks** and **open questions**, each question with an owner.',
            'One section the template does not have: an **eval plan** for the AI parts. If your product has no AI part yet, add one small one now, such as an assistant that answers "What needs my attention, and why?" from the user’s data. Level 4 tests it.',
          ],
        },
        {
          heading: 'Three rules for writing it',
          paragraphs: [
            'These rules apply to you and to Claude when it drafts. They are what separates a PRD people can trust from a plausible-sounding one.',
          ],
          bullets: [
            '**No invention.** A gap becomes an open question, not a plausible guess. If nobody has decided how a missing value is shown, the PRD says so and names who will decide.',
            '**Flag contradictions.** When your interviews and your data disagree, or the market map and the kernel do, the PRD says so in the text and opens a question.',
            '**Behaviour before implementation.** Write "The user sees the three records that need review", not "The system surfaces relevant entities". State limits on quality, access, response time and cost, and leave the database and model choice to engineering.',
          ],
        },
        {
          heading: 'Behavioural contracts, acceptance criteria and evals',
          paragraphs: [
            'Behavioural contracts are the rules that hold in every state. Addy Osmani suggests three tiers: always, ask first, never. For your product: always show the figures an answer used; totals, dates and status rules always come from tested code, never from the model; ask first before preparing a change to a record or an outgoing message; never carry it out without the approval and permission checks defined for that action.',
            'Acceptance criteria turn the contracts and flows into checks with concrete inputs and an observable result, and an engineer or agent can turn each one directly into a test. Group them by phase, so phase 1 can ship on its own. Cover the edge cases: empty data, a missing or uncertain value, something on a boundary date, a limit reached. For example: Given 12 records with 3 marked as needing review, when the user filters to Needs review, then exactly 3 records appear and removing the filter restores all 12.',
            'The eval plan is short at this stage: ten or so example questions such as "What needs my attention, and why?", what a good answer contains, what must never happen, and who reviews the results. Level 4 turns it into a full eval set. Tracking names the events and the three metrics: a leading indicator (the share of eligible users who try the core workflow), an outcome (the share of eligible users who complete the target task successfully) and a guardrail (errors, support demand or unwanted actions per completed task).',
          ],
        },
        {
          heading: 'Compare simpler options and estimate running cost',
          illustration: 'solution',
          paragraphs: [
            'Before you settle on AI, write down what a version without a model would do: a filter, a rule or a template. Then a model given the right context. Only then an agent that uses tools. For each simpler option, say why it falls short. Current facts come from a system of record the user is allowed to see; fine-tuning changes how a model behaves, it is not a live database.',
            'Then write a one-page operating brief: where the data comes from and who can see it, how long a response may take, what the user sees when it fails, and what one acceptable answer costs once you count model calls, retries and human review. Guesses are fine if you label them; you do not need to buy API access.',
          ],
        },
        {
          heading: 'Get questioned, then draft',
          paragraphs: [
            'In Session 6 the agent questioned you until the prototype requirements were clear. Do the same here, with harder questions: which evidence supports this user and problem, what the smallest useful slice is, what stays out, and which acceptance and approval rules nobody has decided. A good question comes with a recommended answer you can accept or change, and the agent looks up anything your files already answer instead of asking you.',
            'Fifteen minutes is enough for a first pass. Then Claude drafts into the template. Some questions need a test, not a conversation; those go into Open questions with an owner and the next step.',
          ],
        },
        {
          heading: 'Review it as an engineer, a designer and a risk partner',
          paragraphs: [
            'Then review the draft from three angles, each in a fresh session so no review inherits the assumptions of the drafting session. The engineer asks whether every behaviour is buildable and testable without guessing. The designer asks whether every flow and state is covered and matches the prototype. The risk reviewer asks where sensitive data, consequential decisions or external actions could cause harm, and which safeguards the chosen domain needs. You decide what to accept; the reviews only advise.',
            'Last, test agent-readiness directly: a fresh session that sees only `prd/prd.md` lists every question it would need answered before building. When that list is short, the PRD is ready.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'osmani-good-spec',
          why: 'A concise guide to specs agents can execute: a goal first, a PRD-like structure, and boundaries in three tiers (always, ask first, never).',
          required: false,
        },
        {
          resourceId: 'product-templates-prd',
          why: 'The PRD template this session uses. Copy the headings from its Output Format section into prd/prd.md, and read its rules on gaps and contradictions.',
          required: false,
        },
        {
          resourceId: 'aws-rag-versus-fine-tuning',
          why: 'Compare ways of supplying knowledge and adapting behaviour before discussing a solution with engineering.',
          required: false,
        },
        {
          resourceId: 'chennapragada-demos-before-memos',
          why: 'How product work changes when demos come before memos and the PM becomes an editor.',
          required: false,
        },
        {
          resourceId: 'catwu-pm-ai-exponential',
          why: 'How the Claude Code team runs product: demos over documents, and only a handful of true non-negotiables.',
          required: false,
        },
      ],
      task: {
        summary:
          'Write an operating brief, let Claude Code question you and fill the PRD template from your workspace, review it as an engineer, a designer and a risk partner in fresh sessions, and test that a fresh agent can build from it.',
        steps: [
          'Create `prd/` in your workspace and confirm which bet you are writing up, or how you changed it. Write `prd/operating-brief.md` on one page: the simpler options and why they fall short, where the data comes from, the response-time budget, the fallback and the cost per acceptable answer. Label your guesses.',
          'Copy the headings from the Output Format section of the [PRD template](https://github.com/harish-info/product-templates/blob/main/skills/prd-plan/templates/prd-template.md) into `prd/prd.md`. Add two headings it does not have: Eval plan and Prototype link.',
          'Run the agent prompt below. Claude questions you one point at a time, then fills the headings in `prd/prd.md` from your files and answers. If you use the `/grill-me` skill, run it first and save your decisions in `prd/grill-notes.md`; the prompt reads them.',
          'Read the draft end to end. Rewrite anything generic in your own words and check that every claim links to a workspace file or one of your answers. Answer each `[NEEDS INPUT]` and `[ASSUMPTION]` marker, or move it to Open questions with an owner.',
          'Run three reviews, each in a fresh session: "Read prd/prd.md and the files it links. Review it for what [the engineer who builds it | the designer who owns the flows | the risk and compliance partner] needs. List problems with the section and a suggested fix. Add your findings under your heading in prd/review-notes.md and do not edit prd/prd.md."',
          'Decide on every finding in `review-notes.md`: accept, reject with a reason, or turn it into an open question. Update `prd/prd.md` yourself, or ask Claude to apply only the accepted findings.',
          'In a fresh session, give Claude only `prd/prd.md` and ask what it would need answered before building. Resolve every question that blocks the first slice, especially who can see which data, what the product must never do and the acceptance rules, or remove the affected behaviour from that slice. Questions about later slices can stay open with an owner. Even one open blocker means the first slice is not ready.',
          'Put the prototype link, a version and a date at the top of `prd/prd.md`, so spec and prototype travel together.',
          'If your recommendation is to stop, or to build without AI, keep that recommendation as it is. To keep practising in Level 4, write a small slice labelled "Hypothetical: for practice only" and use that. Do not let the practice slice quietly become your recommendation.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code',
        where: 'In your workspace/ folder',
        text: `Read AGENTS.md, product-context.md, prd/operating-brief.md, strategy/strategy-kernel.md, strategy/market-map.md, discovery/synthesis.md, discovery/ost.md, data/funnel-analysis.md, data/impact-estimate.md and data/prioritised-bets.md. If prd/grill-notes.md exists, read it and do not ask again what it answers.

I want a PRD for the top bet in prioritised-bets.md, written into the headings already in prd/prd.md.

First, question me. Ask one question at a time and wait for my answer. Give your recommended answer with each question and the file it is based on, so I can accept or change it. Ask only what my files do not answer: the target user and the evidence for them, the first slice, what stays out, acceptance criteria and approval rules. Do not make product decisions for me. After about 15 minutes, list the decisions, the blockers and the questions that need research or a prototype, and ask me before drafting.

Then fill every heading in prd/prd.md:
- Acceptance criteria per phase, in Given, when, then form and as concrete as this example: "Given 12 records with 3 marked as needing review, when the user filters to Needs review, then exactly 3 records appear and removing the filter restores all 12."
- Behavioural contracts in three tiers: always, ask first, never.
- Tracking: the events, plus a leading, an outcome and a guardrail metric.
- Eval plan: about ten example questions, what a good answer contains, what must never happen and who reviews the results.

Rules:
- No invention. Every statement traces to a file above or to my answers. Mark a gap [NEEDS INPUT], a guess [ASSUMPTION -- reason], and anything the first slice cannot ship without [BLOCKER -- NEEDS INPUT].
- Where two sources disagree, say so in the text and add an open question.
- Describe what the user sees and what the system must always or never do. Leave technology choices to engineering.
- Totals, dates and status rules are calculated by tested code, never by the model. State this in the behavioural contracts.
- End your reply with the five places an engineer or a coding agent is most likely to misread this PRD.`,
      },
      expectedOutput: [
        '`prd/prd.md` with every section of the layout, a prototype link, a version and a date',
        'Acceptance criteria per phase in Given, when, then form with concrete numbers and edge cases',
        'Behavioural contracts in three tiers, and an eval plan for the AI parts',
        '`prd/review-notes.md` with engineer, designer and risk findings, each accepted, rejected with a reason, or turned into an open question',
      ],
      artifact: '`prd/prd.md` plus `review-notes.md`',
      verification: [
        'A fresh reviewer found no unresolved blocker for the first slice; future-slice questions have owners and the slice excludes their affected behaviour.',
        'Every acceptance criterion has concrete inputs and an observable expected result.',
        'Nothing in the PRD is a guess: each gap or contradiction appears under Open questions.',
        'The PRD compares a simpler alternative, states an operating cost and latency budget, and records engineering questions without imposing an unsupported technology choice.',
        'The behavioural contracts state that totals, dates and status rules come from tested code and that a change to a record or an outgoing message never happens without approval.',
        'If your usability tests involved no real people, the PRD states that real-user validation is outstanding.',
      ],
      reflectionPrompts: [
        'Which interview question from Claude exposed a decision you had not made?',
        'Which of the three reviews changed the PRD most, and why that one?',
        'What did the fresh agent misunderstand, and what does that tell you about how engineers read specs?',
      ],
      checklist: [
        { id: 'interviewed', text: 'Answered Claude’s questions before it drafted the PRD' },
        {
          id: 'layout',
          text: 'Filled every heading of the PRD template, plus an eval plan',
        },
        { id: 'no-invention', text: 'Moved every gap and contradiction into Open questions' },
        { id: 'three-reviews', text: 'Ran engineer, designer and risk reviews in fresh sessions' },
        { id: 'decided', text: 'Decided on every review finding' },
        {
          id: 'agent-ready',
          text: 'Tested the PRD on a fresh session and closed its blocking questions',
        },
      ],
      mentorMove:
        'Read the PRD as the engineer who has to build it tomorrow and mark the three sentences that would force you to guess. Then describe, without showing any work documents, a spec that went wrong in your experience and what was missing.',
    },
  ],
  challenges: [
    {
      id: 'c5',
      levelId: 3,
      title: 'Survey at scale',
      difficulty: 'Intermediate',
      minutes: 75,
      competencies: ['product-discovery', 'evals-safety'],
      xp: 100,
      summary:
        'Theme 200 free-text survey answers with Claude Code, then spot-check its themes, counts and quotes against your own reading. Practise trusting AI synthesis at scale only as far as you can check it.',
      steps: [
        'Ask Claude Code to generate `data/survey.csv`: 200 fictional free-text answers from your target users to one open question about how they try to complete their main task. Ask it to use a fixed seed, plant five to seven themes in known proportions, and record them only in `data/survey-key.md`. Do not open the key yet.',
        'Read 40 random answers yourself and write your own themes with a tally for each.',
        'In a fresh session, ask Claude to label every row with a theme in a new column, then count the labels with a script. For each theme: a definition, the count and three verbatim quotes with their row numbers.',
        'Spot-check: re-read 20 random rows and judge whether each label is right, and confirm every quoted row number really contains that quote.',
        "Compare Claude's themes with your 40-answer reading, then open the key: which themes were found, merged, missed or invented?",
        'Write `data/survey-themes.md`: the themes, your label accuracy on the 20-row sample, and when you would trust this method on real survey data.',
      ],
      deliverable:
        '`data/survey-themes.md` with themes, counts, quotes, a 20-row accuracy check and a comparison with the planted key',
      verification: [
        'Every count comes from labeled rows counted by a script, not from an estimate in the reply.',
        'Every quote matches its row number exactly.',
        'You recorded at least one theme Claude merged, missed or invented, or showed that it found all of them.',
      ],
      resources: [
        {
          resourceId: 'nng-ai-study-guide',
          why: 'Background on where AI helps in research analysis and why human oversight still matters.',
          required: false,
        },
        {
          resourceId: 'simon-willison-blog',
          why: 'A long-running practitioner record of what LLM tools can and cannot be trusted to do.',
          required: false,
        },
      ],
    },
    {
      id: 'c6',
      levelId: 3,
      title: 'Synthetic users versus real ones',
      difficulty: 'Intermediate',
      minutes: 60,
      competencies: ['product-discovery', 'ux-prototyping'],
      xp: 75,
      summary:
        'Run your Session 10 discussion guide with five synthetic participants, synthesise their answers the same way, and compare them with your real interviews. Find out exactly where synthetic users help and where they mislead.',
      steps: [
        'Ask Claude to play five synthetic participants who match your target users, each in a fresh session, answering your discussion guide from `discovery/discussion-guide.md`. Save each as `discovery/synthetic/S1.md` and so on, labeled PRACTICE at the top.',
        'Run the Session 10 synthesis prompt on the synthetic notes, writing to `discovery/synthetic/synthesis.md`.',
        'Compare with your real synthesis in a table: opportunities in both, only in the real interviews, and only in the synthetic ones.',
        'Note the tone: how agreeable, rational and generic were the synthetic answers? Did any mention a workaround, an emotion or a surprising behaviour?',
        'Write `discovery/synthetic-vs-real.md`: three uses where synthetic users helped and three places where they would have misled you, each with an example.',
      ],
      deliverable:
        '`discovery/synthetic-vs-real.md` comparing synthetic and real synthesis, with the synthetic files kept separate and labeled PRACTICE',
      verification: [
        'No synthetic answer appears in `synthesis.md`, `ost.md` or the PRD as evidence.',
        'The comparison names at least one real-interview insight that no synthetic participant produced.',
        'Every synthetic file is labeled PRACTICE.',
      ],
      resources: [
        {
          resourceId: 'nng-synthetic-users',
          why: 'If, when and how to use AI-generated research, and why it cannot replace real people.',
          required: true,
        },
        {
          resourceId: 'nng-ai-ux-survey',
          why: 'How UX practitioners report actually using AI in research work today.',
          required: false,
        },
      ],
    },
  ],
  quiz: [
    {
      id: 'q3-1',
      competency: 'ai-leadership',
      prompt:
        'Leadership asks why your product should build your feature now. Which statement is a diagnosis in the strategy-kernel sense?',
      options: [
        {
          id: 'a',
          text: 'We will become the most trusted AI assistant in our market within the next two years.',
        },
        {
          id: 'b',
          text: 'Users tell us "I cannot complete this task with the tools I use today", and none of the products they use answer it when it matters.',
        },
        {
          id: 'c',
          text: 'This quarter we will launch an assistant, a redesigned home screen and a referral scheme.',
        },
        {
          id: 'd',
          text: 'Our competitors are investing heavily in AI, so we must invest at least as much as they do.',
        },
      ],
      correct: 'b',
      explanation:
        'A diagnosis names what is going on and what makes it hard, backed by evidence. The first option is a goal dressed up as strategy, the third is a list of actions with no policy behind it, and the fourth copies competitors without saying what problem the investment solves.',
    },
    {
      id: 'q3-2',
      competency: 'product-discovery',
      prompt:
        'A Claude Code research session reports that a competitor "launched an assistant that already does the core job of your feature", and saves the page and a brief claim with a link. You want it in a steering deck tomorrow. What do you do?',
      options: [
        {
          id: 'a',
          text: 'Include it with the link as a footnote, since the session already opened the page and saved a note.',
        },
        {
          id: 'b',
          text: 'Run the same research in a second session and include the claim only if both sessions agree.',
        },
        {
          id: 'c',
          text: 'Open the page, confirm it says this, and label it a vendor claim if a launch post is the only evidence.',
        },
        {
          id: 'd',
          text: 'Leave all competitor claims out of the deck, because AI research cannot be relied on for facts.',
        },
      ],
      correct: 'c',
      explanation:
        'Agents sometimes cite pages that do not support the claim, or blur announced and shipped features. Opening the source takes minutes, and labeling an announcement as a vendor claim keeps the deck honest. Two sessions can repeat the same misreading, and discarding everything wastes a useful lead.',
    },
    {
      id: 'q3-3',
      competency: 'product-discovery',
      prompt:
        'You have snapshots from five real interviews and want to use Claude for synthesis. What is the best order?',
      options: [
        {
          id: 'a',
          text: 'Write your own themes first, then ask Claude for a synthesis in a fresh session that cannot see yours, and compare.',
        },
        {
          id: 'b',
          text: 'Ask Claude for themes first so you start from a neutral view, then edit its themes with what you remember.',
        },
        {
          id: 'c',
          text: 'Paste the raw call transcripts with names into Claude, since more detail gives a more accurate synthesis.',
        },
        {
          id: 'd',
          text: 'Ask Claude to generate five more synthetic participants first, so the synthesis rests on a bigger sample.',
        },
      ],
      correct: 'a',
      explanation:
        "Reading Claude's themes first anchors you on them, and the emotional or surprising findings you noticed in the room get lost. Raw transcripts with names are personal data that should never go in, and synthetic participants are not evidence. Comparing two independent syntheses shows where each one is strong.",
    },
    {
      id: 'q3-4',
      competency: 'product-discovery',
      prompt:
        'Your team is short on time and proposes replacing interviews with 50 AI-generated personas answering your discussion guide. What is the best response?',
      options: [
        {
          id: 'a',
          text: 'Agree, as long as the personas are generated from real segment data so they reflect your actual customers.',
        },
        {
          id: 'b',
          text: 'Agree, but run the personas through two different models and keep only the answers both of them agree on.',
        },
        {
          id: 'c',
          text: 'Skip both the interviews and the personas, ship a small version quickly, and learn from launch data instead.',
        },
        {
          id: 'd',
          text: 'Run a few short real conversations, use AI to prepare and synthesise them, and treat persona output as hypotheses.',
        },
      ],
      correct: 'd',
      explanation:
        'Synthetic users tend to be agreeable, generic and too rational, and they cannot reveal the surprising behaviours that make discovery valuable, even when seeded with segment data. AI is excellent around the interview: guides, synthesis, clustering. Even three real conversations beat fifty imagined ones as evidence.',
    },
    {
      id: 'q3-5',
      competency: 'technical-collaboration',
      prompt:
        'Claude Code reports that 62% of users complete the main action after opening the key screen. What should you check first?',
      options: [
        {
          id: 'a',
          text: 'Whether a newer model would give a more accurate figure if you ran the same analysis again.',
        },
        {
          id: 'b',
          text: 'The denominator and the counts behind it, then recompute the figure yourself in a pivot table.',
        },
        {
          id: 'c',
          text: 'Whether the figure looks plausible next to the numbers that competitors publish for similar features.',
        },
        {
          id: 'd',
          text: 'Whether the chart that goes with the figure is clear enough to show to leadership in the review.',
        },
      ],
      correct: 'b',
      explanation:
        'Most analysis errors are definition errors: the wrong denominator, users counted per session, or duplicate events. Asking for the counts and recomputing one figure by hand tells you whether the rest can be trusted. Plausibility and a clear chart say nothing about correctness.',
    },
    {
      id: 'q3-6',
      competency: 'product-discovery',
      prompt:
        'Two bets have similar RICE scores. One is backed by the event data and four interviews; the other by one enthusiastic stakeholder. How should that show up?',
      options: [
        {
          id: 'a',
          text: 'It should not: RICE scores reach and impact, so the source of the idea does not belong in the score.',
        },
        {
          id: 'b',
          text: 'Give the stakeholder idea a higher impact score, because senior support makes delivery more likely.',
        },
        {
          id: 'c',
          text: 'Through confidence: high for the bet with data and interviews, low for the one resting on a single opinion.',
        },
        {
          id: 'd',
          text: "Ask Claude to rank the two bets from their names alone, so the decision is free of anyone's bias.",
        },
      ],
      correct: 'c',
      explanation:
        'Confidence is where evidence enters RICE. Two ideas with the same reach and impact are not equal if one rests on data and several interviews and the other on a single opinion. A blind AI ranking discards exactly the evidence that should decide.',
    },
    {
      id: 'q3-7',
      competency: 'technical-collaboration',
      prompt:
        'While drafting the PRD, Claude finds that nobody has decided what the screen shows when a key value is missing. What should the PRD do?',
      options: [
        {
          id: 'a',
          text: 'List it under Open questions with an owner, and say in the flow that this behaviour is still undecided.',
        },
        {
          id: 'b',
          text: 'Use the most common pattern from similar products, since engineers need a complete spec to start.',
        },
        {
          id: 'c',
          text: 'Leave the case out of the PRD entirely, and let the engineer decide the behaviour during the build.',
        },
        {
          id: 'd',
          text: 'Let Claude pick a sensible default and mark it with a small note so reviewers can change it later.',
        },
      ],
      correct: 'a',
      explanation:
        'No invention: a gap becomes an open question, not a plausible guess. A guessed default reads as a decision, and a coding agent will build it faithfully. Leaving the case out means someone guesses later, with less context than you have now.',
    },
    {
      id: 'q3-8',
      competency: 'technical-collaboration',
      prompt: 'Which line belongs in a PRD that people and coding agents will build from?',
      options: [
        {
          id: 'a',
          text: 'Store the calculated results in a new database table, recalculate them every night with a scheduled job, and cache the latest version on the device so the screen opens instantly.',
        },
        {
          id: 'b',
          text: "Send each user's data to the latest model when the screen opens, ask it to work out the key figures, and show its answer in the main card with a short explanation underneath.",
        },
        {
          id: 'c',
          text: 'The screen should feel fast, intuitive and trustworthy for every user, show the right information at the right time, and handle every possible edge case gracefully and without confusion.',
        },
        {
          id: 'd',
          text: 'Given 12 records with 3 marked as needing review, when the user filters to Needs review, then exactly 3 records appear and removing the filter restores all 12.',
        },
      ],
      correct: 'd',
      explanation:
        'A PRD describes behaviour, not implementation. The first option is an engineering decision and the second hands a calculation to the model, which should come from tested code. The third cannot be tested. A Given, when, then criterion with concrete numbers can become an automated test directly.',
    },
    {
      id: 'q3-9',
      competency: 'agentic-systems',
      prompt:
        'Your feature needs current product rules and exact totals. Which proposal is the best starting point?',
      options: [
        {
          id: 'a',
          text: 'Fine-tune a model each time the records change.',
        },
        {
          id: 'b',
          text: 'Retrieve authorised current facts, calculate with tested code and evaluate what language assistance adds.',
        },
        {
          id: 'c',
          text: 'Give a general model the question without any source data.',
        },
        {
          id: 'd',
          text: 'Use an autonomous agent because it can choose its own process.',
        },
      ],
      correct: 'b',
      explanation:
        'Current records belong in an authorised source of truth, exact totals in tested code. Add model-driven steps only when they improve the user task enough to justify cost, latency and risk.',
    },
    {
      id: 'q3-10',
      competency: 'technical-collaboration',
      prompt:
        'An illustrative trial costs 20 units in model calls and 40 in human review. Of 1,000 attempts, 800 meet the quality bar. What is the measured cost per acceptable result?',
      options: [
        {
          id: 'a',
          text: '0.02 units, counting model calls only.',
        },
        {
          id: 'b',
          text: '0.06 units, dividing by every attempt.',
        },
        {
          id: 'c',
          text: '0.075 units, dividing all measured costs by acceptable results.',
        },
        {
          id: 'd',
          text: '0.05 units, counting human review only.',
        },
      ],
      correct: 'c',
      explanation:
        '(20 + 40) / 800 = 0.075. This includes the measured review burden and failed attempts. Tool, support and maintenance costs would also belong in a fuller operating estimate.',
    },
  ],
  project: {
    title: 'Decision pack',
    brief:
      'Bring together the strategy, evidence and decision from Level 3 into one pack you could put in front of a steering group. It must show how you got from "why this, why now?" to one specific, evidence-backed bet and a reviewed PRD, with real-user evidence or clearly labeled gaps where it is still outstanding. Then walk your mentor through it while they play the sceptical engineer who has to build it.',
    deliverables: [
      {
        id: 'kernel',
        text: 'Strategy kernel and market map, with every claim sourced under sources/',
      },
      {
        id: 'synthesis',
        text: "Pseudonymised interview notes and synthesis (yours compared with Claude's), or clearly labeled research constraints",
      },
      { id: 'ost', text: 'Opportunity Solution Tree traced to evidence' },
      { id: 'bets', text: 'Funnel analysis, impact estimate and prioritised bets' },
      { id: 'prd', text: 'Reviewed PRD with its review notes and open questions' },
      {
        id: 'sceptic',
        text: 'Notes from the walkthrough with your mentor as the sceptical engineer, and what you changed',
      },
    ],
    rubric: {
      correctness:
        'Claims are sourced and spot-checked, quotes are verbatim, two analysis numbers are checked by hand, and the acceptance criteria are concrete and consistent with each other and with the prototype.',
      quality:
        'The pack reads as one story from diagnosis to bet, the PRD follows the layout, describes behaviour rather than implementation, and a fresh agent can build from it without basic questions.',
      independence:
        'You ran the interviews, wrote your own synthesis first and made the prioritisation calls yourself, using Claude for research, drafting and review rather than for decisions.',
      judgment:
        'Evidence and assumptions are visibly separated, synthetic output is never presented as research, contradictions and gaps are flagged rather than smoothed over, and the PRD has explicit non-goals.',
    },
    privacyNote:
      'Use fictional records and events and fictional analytics only. Keep interview notes pseudonymised in your private workspace, never in a public repository, delete recordings once notes are written, and do not use any real customer data from an employer.',
    minutes: 300,
    xp: 350,
  },
  nextRecommendation:
    'Level 4 starts from your PRD: a design spec and an engineering handoff, evals for the AI parts, a launch with a readout, and a deck for the quarterly review. Before you start, make sure `prd/prd.md` has concrete acceptance criteria and that its open questions each have an owner.',
}
