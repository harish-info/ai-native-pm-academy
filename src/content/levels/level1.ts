import type { Level } from '../types'

export const level1: Level = {
  id: 1,
  slug: 'ai-foundations',
  title: 'AI foundations',
  theme: 'Learn how the tools work, give them context and check what they say',
  summary:
    'Start from the work you do as a PM. Learn how assistants use context, compare their output, check a research answer and build a pitch page. Choose your own product context, using public information and fictional practice data. Your context file and fact sheet carry into the rest of the course. Start with a free assistant account; tool availability and usage limits vary.',
  outcomes: [
    'Explain tokens, the context window, reasoning models and the difference between a chat and an agent in language a risk officer or executive understands.',
    'Compare two models or settings on a real PM task with explicit criteria, and record the date and settings.',
    'Write a one-page product context file and use it as project knowledge, so answers are about your product instead of the average of the internet.',
    'Decide what to delegate with the 4Ds, and verify every material claim in an AI research answer against a primary source.',
    'Build and share a pitch page for a feature idea in an afternoon, changing one thing at a time and labelling it honestly.',
  ],
  badge: {
    name: 'Context Builder',
    description:
      'Knows what the model can see, gives it the context it needs, checks the claims that matter and shows ideas as working pages instead of memos.',
  },
  lessons: [
    {
      id: 's1',
      levelId: 1,
      number: 1,
      title: "How today's AI works",
      difficulty: 'Foundational',
      minutes: 75,
      tools: ['Claude (free plan)', 'ChatGPT (optional, for the comparison)'],
      prerequisites: [],
      competencies: ['ai-fundamentals'],
      xp: 100,
      mentorReview: 'optional',
      goal: 'Explain in plain language how a model produces an answer, what it can and cannot see, and how a chat differs from an agent, then compare two models or settings on one real PM task.',
      whyItMatters:
        'Before you use an assistant for anything that matters in your PM work, you need to know what it actually is. Product teams need a shared understanding of its limits. A PM who can explain tokens, context windows and hallucination in two minutes makes better calls about what to automate and what to check.',
      learn: [
        {
          heading: 'How a model writes an answer',
          paragraphs: [
            'A large language model is trained on a vast amount of text to predict the next small chunk of text, called a **token**. A token is roughly three quarters of an English word; numbers, code and non-English text often use more tokens per word. After this pretraining, the model is further trained on examples and human feedback so that it follows instructions and behaves like an assistant.',
            'When you send a message, the model reads everything in its context and generates the reply one token at a time, each choice conditioned on everything before it. That single mechanism explains a lot. Models are fluent because fluency is what they were trained on. They can be confidently wrong because a plausible sentence and a true sentence look the same to the generation process. And two runs of the same request can differ because generation involves sampling from likely continuations, not looking up a stored answer.',
          ],
        },
        {
          heading: 'The context window: what the model can see',
          paragraphs: [
            'The **context window** is everything the model can see at once: the instructions the product adds, your messages, attached documents, tool results and its own previous replies. Windows of hundreds of thousands of tokens are now common, but bigger is not the same as better. Practitioners call the effect **context rot**: as a conversation fills with long, loosely relevant or contradictory material, answers get less precise, and stale content competes with what you actually want.',
            "The model does not remember yesterday's chat unless the product deliberately adds a memory feature or you bring the material back in. Treat each conversation as a fresh briefing. Session 2 turns this into the core skill of the course: deciding what the model sees.",
          ],
          bullets: [
            'Start a new conversation when the topic changes.',
            'Give the model only the material the task needs.',
            'Prefer a short, curated document over a long dump of everything you have.',
          ],
        },
        {
          heading: 'Reasoning models, and chat versus agent',
          illustration: 'chat-agent',
          paragraphs: [
            '**Reasoning-capable models** can spend extra computation before answering. That can help with multi-step analysis, planning and code, with trade-offs in time and cost. Products expose different controls and may show a summary rather than the full internal process. Judge the answer with evidence and tests, not the apparent depth of its explanation.',
            'A plain **chat** answers from what is in its context. Give the same model **tools** and it can look things up on the web, run code on a spreadsheet, read and create files. An **agent** is a model in a loop: it decides on a step, uses a tool, checks the result and carries on until the task is done. In Level 2 you will use Claude Code, an agent that works on the files in your own folder. More power means more to review: an agent that can act can also act wrongly.',
          ],
        },
        {
          heading: 'Choosing a model and an effort level',
          paragraphs: [
            '**Model choice** selects a particular trained model. Companies offer different models that balance capability, speed and cost. Try a more capable model for difficult analysis, a balanced model for everyday work, and a fast, lower-cost model for clear, repeated tasks. Compare their results on the work you need to do.',
            '**Effort** controls how much work a supported model spends on a response. Raising it keeps the same model. It can help with difficult reasoning and checking, while taking longer and consuming more usage. It cannot supply missing context or make a factual answer automatically trustworthy.',
            'The dated [model and effort guide](/field-guide) shows current Claude and GPT models, when to use each, and four PM task examples. Your available choices depend on the app and plan.',
          ],
          bullets: [
            '**Low:** try a quick rewrite with all facts supplied. Check that no facts changed.',
            '**Medium or the app default:** start with a defined brief or small prototype. Review the result against your criteria.',
            '**High:** try it when competing constraints or a persistent bug need deeper reasoning. Supply the failing example first. Some models offer further levels, but maximum is not the default choice for every task.',
          ],
        },
        {
          heading: 'What models do well, and where they fail',
          paragraphs: [
            'Current models are strong at drafting, restructuring, summarizing, explaining a topic at different levels, generating options, translating between audiences and writing code.',
            'They remain risky for exact arithmetic over many figures without a calculator tool, recent events unless web search is on, citations (which can be invented or misattributed), facts specific to your organization, and consistent judgment on ambiguous policy questions. A confident tone is not evidence of accuracy.',
          ],
        },
        {
          heading: 'How to compare two models on your own task',
          paragraphs: [
            'Asking which model is best is the wrong question. Define criteria for the task first: factual accuracy, following constraints, usefulness for the audience and honesty about uncertainty. Run the same request in two models or two settings, blind if someone can relabel the outputs, and score each one.',
            'Be honest about what you are comparing. Two products differ in model, but also in reasoning setting, web search, memory and the instructions the product adds. Unless you control those, you are comparing products, not models, which is still useful as long as you say so.',
            'Every model release changes what is possible: longer tasks, better tool use, lower cost. Something that failed six months ago may work now, so treat "AI cannot do that" as a dated claim. Keep the method, record the date, model names and settings, and rerun it when a new model ships. This course uses Claude throughout; ChatGPT works much the same, and in Level 2 Codex can do most of what Claude Code does.',
          ],
        },
      ],
      resources: [
        {
          resourceId: '3b1b-llms-briefly',
          why: 'A short visual explanation of next-token prediction and training that makes the rest of the session click.',
          required: true,
        },
        {
          resourceId: 'anthropic-capabilities-limitations',
          why: 'A longer optional companion on capabilities and limitations. It is not part of this session’s reading budget.',
          required: true,
        },
        {
          resourceId: 'karpathy-deep-dive-llms',
          why: 'The clearest long-form walkthrough of how chat models are built, from pretraining to assistant behaviour. It runs over three hours, so watch it in chapters across the course; it is not part of this session.',
          required: false,
        },
        {
          resourceId: 'aihero-llm-fundamentals',
          why: 'A short primer on why context windows fill up and degrade and when an agent is the right shape. Written for engineers, but readable.',
          required: false,
        },
        {
          resourceId: 'claude-code-model-effort',
          why: 'Optional reference for the model picker and effort controls you will use in Level 2. Start with the choosing-an-effort-level section; skip the configuration details.',
          required: false,
        },
      ],
      task: {
        summary:
          'Build a mental model of how models work, write it down as your own glossary, and compare two models or settings on one real PM task for your product.',
        steps: [
          'Create a private folder on your own computer called `learning-notes/`, not in a shared drive. Every Level 1 file goes here; in Session 5 it moves into your workspace. Files are plain Markdown: `#` for headings, `-` for bullets, `**bold**`, saved with a `.md` ending from any text editor.',
          'Watch the short 3Blue1Brown explainer. The longer capabilities course is optional; use the worked example and decision check here before the practical task.',
          'Write `glossary.md` in your own words: token, next-token prediction, context window, context rot, hallucination, knowledge cutoff, reasoning model, tool, agent, and RAG (one line: retrieval-augmented generation, fetching documents into the context before answering). One or two sentences each, plus one example that surprised you.',
          "See a tool at work: ask Claude a question that needs this week's news with web search switched off, then on. Note which answer used a tool and how you could tell.",
          'Pick one realistic PM task with no confidential data, for example: "Draft ten interview questions for [target users] about [specific problem]." Replace the brackets with a context you know. Run it in two models or two settings, each in a fresh chat. Try the same model at two effort levels if your app offers them, two Claude models if your plan offers them, or Claude and ChatGPT. Record the full model names, effort settings (or "not exposed"), other enabled features and date. If your mentor is available, let them relabel the outputs A and B so you score blind.',
          'Score both outputs from 1 to 5 on factual accuracy, constraint following, usefulness and honesty about uncertainty. Quote the sentence behind any low score.',
          'Rerun the same request once in the same model and note how much the answer changes.',
          'Write `model-comparison.md`: the date, what you compared (models or products), the scores, the variation you saw, and which you would use for this kind of task and why.',
          'Ask Claude to check your glossary with the prompt below. Accept or reject each suggestion yourself.',
        ],
      },
      agentPrompt: {
        tool: 'Claude',
        where: 'A fresh chat, with your glossary.md attached or pasted below',
        text: `Below is a glossary of AI terms I wrote in my own words. I am a product manager, and I will use it to explain these ideas to colleagues in risk, legal and engineering.

For each term:
1. Say whether my definition is correct, partly correct or wrong.
2. If it is not fully correct, explain the problem in one or two sentences and suggest a corrected sentence.
3. Flag any simplification that would mislead a risk officer, even if it is technically defensible.

Rules:
- Do not rewrite definitions that are already correct. Keep my wording wherever you can.
- If you are unsure about a point, say so instead of guessing.
- Output a table with the columns: term, verdict, problem, suggested sentence.

[paste glossary.md here]`,
      },
      expectedOutput: [
        '`glossary.md`: ten terms in your own words, each checked, with any accepted corrections.',
        '`model-comparison.md`: one task, two models or settings, four criteria, scores with quoted evidence, and a note on variation.',
        'A short note on what changed when web search was switched on.',
      ],
      artifact: '`glossary.md` and `model-comparison.md` in your private `learning-notes/` folder.',
      verification: [
        'You scored both outputs before reading any AI critique of them.',
        'Your explanation of a context window and of an agent makes sense read aloud to someone non-technical.',
        'The comparison records the date, the model or product names and the settings, and says whether it compares models or products.',
        'You rejected or changed at least one suggestion from the glossary check, or wrote down why every suggestion was right.',
      ],
      reflectionPrompts: [
        'Which output surprised you, and what does that tell you about how these models work?',
        'Where in your past work would an agent, rather than a chat, have changed what was possible?',
        'What kind of work would you now never delegate without checking?',
      ],
      checklist: [
        { id: 'explainers', text: 'Watched the short explainer and explained the main idea aloud' },
        { id: 'glossary', text: 'Wrote glossary.md in my own words and had it checked' },
        { id: 'tool-test', text: 'Tried one question with web search off and on' },
        {
          id: 'compared',
          text: 'Compared two models or settings on one real task and scored them',
        },
        { id: 'variance', text: 'Reran one request and recorded how the answer varied' },
        {
          id: 'no-confidential',
          text: 'Confirmed no confidential, employer or customer data was used in any chat',
        },
      ],
      mentorMove:
        "Relabel the outputs as A and B so she scores blind. Then ask her to explain the difference between a chat and an agent as if you were the company's chief risk officer, and push back once with a hard follow-up question.",
    },
    {
      id: 's2',
      levelId: 1,
      number: 2,
      title: 'Give AI your product context',
      difficulty: 'Foundational',
      minutes: 90,
      tools: ['Claude (Projects)', 'A text editor or Obsidian'],
      prerequisites: ['s1'],
      competencies: ['prompting-context', 'ai-fundamentals'],
      xp: 100,
      mentorReview: 'recommended',
      goal: 'Write a one-page `product-context.md` for your product, use it as project knowledge in a Claude Project, and decide with the 4Ds which parts of your quarter to delegate.',
      whyItMatters:
        'Your manager wants a competitor summary by Friday. You ask Claude and get back a page that could describe any product in the category, because the model knows nothing about your product. The fix is not cleverer wording. It is giving the model what a new colleague would need: the product, the users, the constraints and the material. That file is the seed of every knowledge base you build in this course.',
      learn: [
        {
          heading: 'Why the first draft was generic',
          paragraphs: [
            'A model without relevant product context may fall back on broad patterns or invent details. Generic output can signal missing context, an unclear task, conflicting instructions or a model limitation. Diagnose the gap before choosing a remedy.',
            'When an output disappoints, ask what the model was missing before you rewrite the instruction. That question, more than any trick, is the core of what is now called **context engineering**.',
          ],
        },
        {
          heading: 'What the model actually sees',
          illustration: 'context',
          paragraphs: [
            'Everything the model uses to answer arrives through its context window. If something is not there, it does not exist for the model, however obvious it is to you.',
          ],
          bullets: [
            '**Instructions**: what the product adds, plus your project or custom instructions.',
            '**Your message**: the goal, the audience and what done looks like.',
            '**Files and project knowledge**: documents you attach or store in a Project.',
            '**Examples**: a good past output shows format and level better than a description.',
            '**Memory**: what the product chooses to recall from earlier chats. Useful, but you cannot always see or control it, so put what matters in a file.',
            '**Tool results**: search results, code output, files the model opened.',
          ],
        },
        {
          heading: 'Role phrases versus real context',
          paragraphs: [
            'Clear wording still matters: say what task to do, which material to use, the constraints and what done looks like. A role phrase such as "you are a world-class strategist" cannot supply missing evidence. Compare instructions and context on your task instead of assuming a universal prompting trick.',
            'A brief to a model has the same parts as a brief to a new colleague. If a capable person joining your team tomorrow could not do the task from what you gave them, the model cannot either.',
          ],
        },
        {
          heading: 'Write product-context.md',
          paragraphs: [
            '`product-context.md` is a single page that tells any assistant what it needs to know about your product. Keep it short: context rot applies to your own files too. Write "Unknown" where you do not know something, instead of a plausible guess, and list where each fact came from.',
            'In a **Claude Project**, files in project knowledge and the project instructions are available to every chat in that project, so you stop pasting the same background every time. In Session 5 the same file sits at the top of your workspace, and in Level 5 it grows into a personal and a team knowledge base.',
          ],
          bullets: [
            '**Product**: what it is, the one job v1 does, what it is not.',
            '**Users**: who they are and the problem in their words.',
            '**Glossary**: domain terms and how your team uses them.',
            '**Constraints**: regulation, risk, technical and brand limits.',
            '**Open decisions**: what is not yet decided, and who decides.',
            '**Sources**: where each fact came from, with dates.',
          ],
        },
        {
          heading: 'Write it in Markdown',
          paragraphs: [
            'Write `product-context.md` in **Markdown**: plain text with a few marks for structure. It opens in any editor on any computer, it is the format Claude and other agents read and write most reliably, and its headings let an agent jump straight to the part of a long file it needs. You already used it for your Session 1 notes.',
            'Six marks cover almost everything: `#` and `##` for headings, `-` at the start of a line for a bullet, `1.` for a numbered step, `**bold**` for the one thing nobody should miss, `[label](link)` for a link, and a blank line between paragraphs. Any text editor works. Obsidian, a free notes app in the [Starter kit](/starter-kit), shows the formatting as you type.',
          ],
        },
        {
          heading: 'Decide what to delegate: the 4Ds',
          paragraphs: [
            "Anthropic's AI Fluency course names four competencies. **Delegation**: deciding what work to give the AI and what to keep. **Description**: giving it the context and the definition of done. **Discernment**: judging what comes back. **Diligence**: owning the result, including being open about how it was made.",
            'For delegation, use two axes: how much judgment the task needs, and how costly a mistake would be. High-volume, low-judgment work such as summarizing, formatting and first drafts can be delegated with spot checks. High-judgment, high-stakes work such as priorities, feedback to people and what you believe stays with you; AI can challenge your thinking but should not do it for you.',
            'Forwarding AI output to colleagues without reading it makes you what one engineer calls a meat proxy: they end up doing the review you skipped. If you send it, you own it, so read it, cut it and stand behind every claim.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'anthropic-ai-fluency',
          why: 'The source of the 4Ds. Do the introduction and the Delegation and Description lessons now; the Discernment lessons fit Session 3, and the rest can follow across the course.',
          required: true,
        },
        {
          resourceId: 'anthropic-context-engineering',
          why: 'Why curated context beats volume, from the people who build the models. Read the opening sections up to and including the anatomy of effective context; the later sections on retrieval and long-running agents are for engineers, so skim or skip them.',
          required: true,
        },
        {
          resourceId: 'gruhn-meat-proxy',
          why: 'A short essay on why relaying unread AI output to colleagues hands them your work.',
          required: false,
        },
        {
          resourceId: 'openai-academy',
          why: 'Free introductory courses on working with AI assistants, if you want more guided practice on the same ideas.',
          required: false,
        },
        {
          resourceId: 'commonmark-help',
          why: 'The standard Markdown marks on one page, with a ten-minute tutorial if you want to practise.',
          required: false,
        },
      ],
      task: {
        summary:
          'Compare a baseline brief, a role phrase and a grounded brief. Write product-context.md, use it in a Project or paste it into a fresh chat, and decide what you will delegate.',
        steps: [
          'Choose a public product or workflow you understand. In a fresh chat with no background brief, ask: "Write a one-page competitor summary for [product or workflow]." Replace the brackets with its name, without adding private context. Save the answer as `summary-v0.md`.',
          'In another fresh chat, ask the same thing but open with a role phrase such as "You are a world-class strategy consultant" and add "think step by step". Save it as `summary-v0b.md` and note in one line how much it differs from v0.',
          'Choose a product, service or internal workflow you understand. Use public information and fictional practice data, without employer or customer details. Write `product-context.md` in your own words with the six headings from this lesson. Keep it to one page and write "Unknown" instead of guessing.',
          'Create a Claude Project called "PM workspace". Add `product-context.md` to project knowledge and write four to six lines of project instructions: who the outputs are for, the format you usually want, and "say what is missing instead of guessing". If your plan does not offer Projects, paste the file at the top of each fresh chat instead.',
          'Collect public pages for three to five competitors or alternative ways of doing the job. Run the agent prompt below in the Project and save the answer as `summary-v1.md`. Keep it: Session 3 fact-checks it.',
          'Read the "Gaps and assumptions" list in v1. Update `product-context.md` yourself where you can answer a gap; add the rest under Open decisions.',
          'Write `delegation-audit.md`: ten tasks from your PM role, such as competitor research, interview synthesis, a PRD draft, a stakeholder update or a prioritisation call. For each, record the decision (delegate with spot checks, draft with AI and edit, or keep), the context it needs, what you will check and who owns the result.',
        ],
      },
      agentPrompt: {
        tool: 'Claude',
        where:
          'A chat inside your PM workspace Project, with product-context.md in project knowledge',
        text: `Goal: a one-page competitor summary for my product that I will bring to my manager on Friday.

Context: product-context.md in this project describes the product, its users, constraints and open decisions. Use it to judge what matters about each competitor.

Audience: my manager and two engineers. They know my product well; they do not know the competitors.

Material: the competitor pages below. Use only this material and the context file.
[paste the names, URLs and the relevant text of three to five competitor pages]

What good looks like:
- A table with the columns: competitor, what it offers my target users, how it addresses the user problem in product-context.md, where it hands off to a person, source URL.
- Three implications for my product, each naming the line in product-context.md it relies on.
- A section "Gaps and assumptions": anything you needed but could not find in the material or the context file. Do not fill gaps with guesses.

Constraints: under 400 words plus the table, plain language. Mark any statement the material does not support as "unverified".

Done when: every table row has a source URL and every implication names the context line it relies on.`,
      },
      expectedOutput: [
        '`product-context.md`: one page with Product, Users, Glossary, Constraints, Open decisions and Sources, and "Unknown" where you do not know.',
        'Three competitor summaries (v0, v0b and v1), scored on the same criteria, including any result that did not improve.',
        '`delegation-audit.md`: ten tasks, each with a decision, the context it needs, what you check and who owns it.',
      ],
      artifact:
        '`product-context.md` and `delegation-audit.md`, plus a Claude Project named PM workspace with the context file as project knowledge.',
      verification: [
        '`product-context.md` fits on one page and every fact has a source or is marked Unknown.',
        'You can point to which supplied facts changed v1, and distinguish specific wording from better-supported claims.',
        'You wrote the context file and every update to it yourself; Claude only pointed out gaps.',
        'Every delegated task in the audit names what you will check and how.',
      ],
      reflectionPrompts: [
        'How much did the role phrase change the answer compared with the context file?',
        'Which gap in your product context surprised you most?',
        'Which task in your audit were you tempted to delegate fully, and what made you hold back?',
      ],
      checklist: [
        { id: 'generic-first', text: 'Saved a no-context summary and a role-phrase summary' },
        { id: 'context-file', text: 'Wrote a one-page product-context.md with sources' },
        { id: 'project', text: 'Set up a Claude Project with the file and short instructions' },
        { id: 'summary-v1', text: 'Got a specific v1 summary and saved it for Session 3' },
        { id: 'gaps', text: 'Updated the context file from the gaps list myself' },
        { id: 'audit', text: 'Wrote a ten-task delegation audit' },
      ],
      mentorMove:
        'Read her `product-context.md` cold and say what you, as an engineer joining tomorrow, would still need to know. Then challenge one task she delegated in the audit: what would go wrong, and how would she notice?',
    },
    {
      id: 's3',
      levelId: 1,
      number: 3,
      title: 'Research and verify',
      difficulty: 'Foundational',
      minutes: 90,
      tools: ['Claude (web search or Research)', 'A web browser'],
      prerequisites: ['s2'],
      competencies: ['ai-fundamentals', 'evals-safety'],
      xp: 100,
      mentorReview: 'recommended',
      safetyCritical: true,
      goal: 'Use Claude with web search to answer a real question about your market, verify every material claim against a primary source, and know what you must never paste into an assistant.',
      whyItMatters:
        'The competitor summary may read well and still contain errors. A fabricated statistic or a misread rule can change a product decision. Check the claims that matter, record what held up and carry the unresolved questions forward.',
      learn: [
        {
          heading: 'Why fluent answers can be wrong',
          paragraphs: [
            'Generation optimizes for plausible text, so a model can produce a statistic, a quote or a citation that looks right and is not. This is called **hallucination**. Citations fail in three ways: the source does not exist, the source exists but does not say what is claimed, or the source is real but outdated or about a different market.',
            'Web search and research modes reduce invented sources because the model reads real pages. They do not remove the problem. The model can still over-trust a weak page, merge two numbers, or summarize a nuanced finding into something stronger than the original.',
          ],
        },
        {
          heading: 'Check each claim, not the whole answer',
          illustration: 'verification',
          paragraphs: [
            'Break any AI report into atomic claims, then sort them. **Material claims** would change a decision if they were wrong; **background claims** would not. You verify every material claim and sample the rest.',
            'For each material claim, open the source yourself and check four things: it exists, it says what is claimed, the date is current enough, and it applies to your geography and users. Then label the claim.',
          ],
          bullets: [
            '**Verified**: the source says exactly this.',
            '**Partly supported**: the source says something weaker, older or narrower.',
            '**Unsupported**: no source, or the source does not say it.',
            '**Contradicted**: a better source says otherwise.',
          ],
        },
        {
          heading: 'Which sources to trust for which claims',
          paragraphs: [
            "A source is strong for a claim when it observed the thing directly. A national statistics survey is primary evidence for how many people face a problem. A company's own page is primary evidence for what that company says it launched, but only an assertion about how well it works. Reputable journalism and analyst reports are secondary: they interpret someone else's evidence.",
            'So ask three questions of every source: did it observe this, does it gain from the claim, and has anyone independent confirmed it? A forum thread full of people describing the problem is a great discovery signal. It is not a market size.',
          ],
        },
        {
          heading: 'Web search and Research: when they help',
          paragraphs: [
            "Claude's web search, available on the free plan, reads a handful of pages and cites them. **Research**, on paid plans, runs an agent that searches many pages and writes a long report. Both are excellent for landscape scans, competitor overviews and finding sources you would not have found. Both need the same verification as anything else.",
            'Brief them like you would brief an analyst: scope, geography, time window, required source types, and an instruction to separate what was found from what was inferred. Running the same brief again in a fresh chat is a cheap cross-check: where the two reports disagree is where you look first.',
          ],
        },
        {
          heading: 'What never goes into an assistant',
          paragraphs: [
            "What you paste may be stored, reviewed for safety or, depending on your settings, used to improve models. Check the privacy and memory settings of every assistant you use. At work, your employer's approved-tool policy decides what is allowed, not the tool's settings. In this course, use only public sources and fictional data.",
          ],
          bullets: [
            '**Personal data**: names, contact details, account numbers, health details or anything else about real customers, users or colleagues.',
            '**Confidential company data**: unreleased plans, internal metrics, contracts, security details, anything under a confidentiality agreement.',
            '**Credentials**: passwords, API keys, access tokens. If one slips into a chat, change it.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'karpathy-how-i-use-llms',
          why: 'A practitioner tour of everyday model use. For this session, watch the sections on internet search and deep research, where he shows both the value and the need to check; the rest of the video is optional.',
          required: true,
        },
        {
          resourceId: 'simon-willison-blog',
          why: 'A respected practitioner who regularly tests AI search and research features and documents where they go wrong.',
          required: false,
        },
      ],
      task: {
        summary:
          'Research one real question about your market with Claude, build a claim-by-claim verification table, and turn it into `fact-sheet.md`.',
        steps: [
          'Write a research question with publicly verifiable answers, built from your v1 summary. For example: "What public evidence describes [specific problem] for [user group] in [market], and what alternatives exist today?" Replace the brackets; if prevalence data is unavailable, record that gap.',
          'Adapt the research brief below: question, geography, time window, required source types and output format.',
          'Run it in Claude with web search on (or Research, if your plan has it). Run it a second time in a fresh chat. Save both answers.',
          'Extract the ten most material claims from both answers and from `summary-v1.md` into a table: claim, cited source, label, your evidence link, date of source.',
          'Open every cited source yourself. Label each claim Verified, Partly supported, Unsupported or Contradicted.',
          "Find at least one relevant primary source that neither answer cited, for example a national statistics release, a regulator report or a competitor's own product page.",
          'Write `fact-sheet.md`: the verified facts you can use, each with its source and date, then a section "What I could not verify".',
          'Update the Sources section of `product-context.md` with what held up, and fix anything that was contradicted.',
          'Check for accidental sensitive inputs. If you find any, stop further use and follow the relevant provider or organisation incident process; revoke any exposed credential. Deleting a chat alone does not undo disclosure.',
        ],
      },
      agentPrompt: {
        tool: 'Claude with web search or Research',
        where: 'A fresh chat in your PM workspace Project, with web search switched on',
        text: `Research question: [your question]

Scope:
- Geography: [country or region]
- Time window: sources published in the last 24 months, unless a foundational source is older
- Audience: a product manager preparing a short internal fact sheet for my product

Source requirements:
- Prefer primary sources: regulators, national statistics offices, peer-reviewed studies, and official company pages for what a company says it offers.
- Use reputable press or analyst reports only when no primary source exists, and label them secondary.
- Label claims a company makes about its own results as company claims.
- Do not use AI-generated summaries, content farms or forums as evidence for facts.

Output format:
1. A summary of no more than 200 words.
2. A numbered list of claims. For each claim: the claim, the exact source title, publisher, publication date, URL, and whether it is primary or secondary.
3. A section called "Inferred, not sourced" for anything you concluded yourself.
4. A section called "Could not find" for parts of the question you could not answer.

Rules:
- Never invent a statistic, quote or URL. If you cannot find a source, say so.
- Quote numbers exactly as the source states them, including the unit, the year and the population surveyed.`,
      },
      expectedOutput: [
        'A verification table of ten material claims, each labelled, with your own evidence link.',
        '`fact-sheet.md`: verified facts with sources and dates, and a "What I could not verify" list.',
        'An updated Sources section in `product-context.md`.',
      ],
      artifact: '`fact-sheet.md`: every fact sourced, dated and checked by you.',
      verification: [
        'Every material claim has a source link that you opened and read yourself.',
        'At least one primary source is included that the AI answers did not cite.',
        'Every number matches its source exactly, including date, unit and geography.',
        'You either found at least one discrepancy or wrote down that all ten claims held up after checking.',
        'No chat in this session contains personal data, confidential company data or credentials.',
      ],
      reflectionPrompts: [
        'What share of the claims held up, and what kind of failure did you see most?',
        'Where did the two runs disagree, and which was closer to the primary source?',
        'What would you need to change about how you use AI research when you are back at work?',
      ],
      checklist: [
        { id: 'brief', text: 'Wrote a research brief with scope, time window and source rules' },
        { id: 'two-runs', text: 'Ran the brief twice in fresh chats with web search on' },
        { id: 'ten-claims', text: 'Extracted ten material claims into a verification table' },
        { id: 'opened-sources', text: 'Opened every cited source myself and labelled each claim' },
        { id: 'primary-source', text: 'Added at least one primary source the AI did not cite' },
        { id: 'fact-sheet', text: 'Wrote fact-sheet.md and updated the context file sources' },
        { id: 'never-paste', text: 'Checked my chats for personal, confidential or secret data' },
      ],
      mentorMove:
        'Pick two claims she marked Verified and check them yourself while she watches. Then show her how a citation can exist and still not support the claim, and ask what she would never paste into a chat at her employer.',
    },
    {
      id: 's4',
      levelId: 1,
      number: 4,
      title: 'Vibe code your first page',
      difficulty: 'Foundational',
      minutes: 90,
      tools: ['Claude artifacts (free)', 'Lovable (optional)'],
      prerequisites: ['s3'],
      competencies: ['ux-prototyping'],
      xp: 100,
      mentorReview: 'optional',
      practicalProof: true,
      goal: 'Turn your feature idea into a live, shareable pitch page built from `product-context.md` and `fact-sheet.md`, improved one change at a time, and labelled honestly as a prototype.',
      whyItMatters:
        'You have a feature idea and a problem hypothesis in product-context.md. A clickable pitch page makes the idea easy to discuss: people can click through the flow and poke holes in it. It cannot tell you whether users actually have the problem; Level 3 checks that. Build a page when the question is how it works, and write a few sentences for the decisions a screen cannot show, such as why this problem first.',
      learn: [
        {
          heading: 'Why build a page instead of writing a memo',
          paragraphs: [
            'A page people can click answers questions a memo leaves open: what would the user actually see, what would it say, where would it break. It also exposes weak ideas faster, which is the point. You will meet this idea again in Session 12, where the prototype is linked from the PRD.',
            '**Vibe coding**, a term Andrej Karpathy coined in early 2025, means describing what you want in plain language, letting the AI write the code, and judging the result by using it rather than by reading the code. It is ideal for pitches and throwaway prototypes. It is not how production software gets built, and Level 2 shows the more careful version.',
          ],
        },
        {
          heading: 'Markdown for files, HTML for pages',
          paragraphs: [
            'Your pitch page is **HTML**, the language every web browser reads. You do not write it: you describe the page and Claude writes it. An agent now makes a clear, good-looking page about as fast as a bulleted list, so you will choose between the two formats many times a week. The rule is short:',
          ],
          bullets: [
            '**Markdown** for anything you or an agent will read, edit and keep: context files, notes, PRDs, decision logs, outlines. It is short, quick to change and easy to compare between versions.',
            '**HTML** for anything a person will look at: a pitch page, a comparison, a diagram, a dashboard, a deck. Ask for one self-contained file that opens in a browser with a double click, with no install and no account.',
            '**Facts live in Markdown.** Generate the page from your Markdown files and data, and when a fact changes, fix the file and regenerate. Otherwise the page quietly becomes a second version of the truth.',
          ],
        },
        {
          heading: 'Start from your files, then change one thing at a time',
          paragraphs: [
            'Start from the files you already have. Building inside your PM workspace Project means `product-context.md` is already in context; attach `fact-sheet.md` so the page uses only checked facts. Say what the page is for, who will see it and what each section must contain.',
            'Then iterate in small steps. Ask for one change per message and check the result before the next. A request that changes five things at once makes it impossible to tell which change broke the layout. Artifacts keep earlier versions, so you can step back. When the chat gets long, start a fresh one with the current version and your context files: context rot applies here too.',
          ],
        },
        {
          heading: 'Label honestly and check the numbers',
          illustration: 'prototype',
          paragraphs: [
            'Label every prototype honestly, on screen and in the message you share it with: prototype, fictional data, not a product commitment. A polished page reads as a promise, and PMs who prototype a lot warn that it can be motion mistaken for progress: the hard parts of an AI product, such as reliable data, evals and scale, are still ahead.',
            'If the page shows figures, they must add up. Check every number on the mocked screen by hand. One figure that does not reconcile makes people doubt everything after it.',
          ],
          bullets: [
            'It works on a phone as well as a laptop.',
            'Text is readable and has enough contrast.',
            'No warning relies on colour alone.',
          ],
        },
        {
          heading: 'Choosing a tool',
          paragraphs: [
            'Claude artifacts are free, quick for a single page and can be published with a shareable link. Lovable builds multi-page web apps and publishes them to its own address; its free tier has a small daily allowance. Challenge 2 compares artifacts, Lovable and v0 on the same pitch. Use fictional data in every tool.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'claude-artifacts',
          why: 'How artifacts work inside a Claude chat, including publishing and sharing a link.',
          required: true,
        },
        {
          resourceId: 'lovable-quickstart',
          why: 'The official quick start builds and publishes a small site from a prompt, one change at a time, which is exactly the habit this session teaches.',
          required: true,
        },
        {
          resourceId: 'lovable',
          why: 'A prompt-to-app builder for multi-page web apps, if you want to go beyond a single page.',
          required: false,
        },
        {
          resourceId: 'v0',
          why: "Vercel's prompt-to-app builder, an alternative you will compare in Challenge 2.",
          required: false,
        },
        {
          resourceId: 'mckinnon-vibe-coding-pms',
          why: 'A PM leader on what prototypes prove and what they only appear to prove.',
          required: false,
        },
        {
          resourceId: 'thariq-html-effectiveness',
          why: 'Why a single HTML file beats a long Markdown document when people need to read, compare or click through the result.',
          required: false,
        },
        {
          resourceId: 'willison-html-tools',
          why: 'Patterns from more than a hundred small single-file HTML tools built with agents.',
          required: false,
        },
      ],
      task: {
        summary:
          'Build a one-page pitch as an artifact, observe one reader, and make a deliberate revision that addresses what you learned. Record what the page cannot prove.',
        steps: [
          'Start `pitch-notes.md` with a five-line brief: who it is for, the problem in their words, the idea in one sentence, the one verified fact from `fact-sheet.md` that makes the case, and what you want a reader to do next.',
          'Open a fresh chat in your PM workspace Project, attach `fact-sheet.md`, and run the agent prompt below.',
          'Use the page on your phone and on a laptop. Write down the three things you most want to change.',
          'Make changes one at a time to address the problems you observed. Log the reason, expected improvement and actual result in pitch-notes.md. Keep a before and after comparison for at least one meaningful revision; do not invent extra changes to meet a quota.',
          'Check every number on the mocked screen by hand, confirm the prototype banner is visible, and check that no warning relies on colour alone.',
          'Publish the artifact and share the link with one person: your mentor or a friend. Ask two questions: what do you think this does, and what would you want to know next? Record the answers.',
          'Optional: follow the Lovable quick start and rebuild the page there from the same brief. Note one difference.',
          'Close `pitch-notes.md` with a section "What this page does not prove".',
        ],
      },
      agentPrompt: {
        tool: 'Claude',
        where:
          'A fresh chat in your PM workspace Project, with product-context.md in project knowledge and fact-sheet.md attached',
        text: `Build a one-page pitch for a feature idea for my product, as an interactive artifact that works on a phone and on a laptop.

Context: product-context.md describes the product and its constraints. fact-sheet.md holds checked facts. Use only facts marked Verified in fact-sheet.md, and show the source under each one.

The idea: [paste your one-sentence feature hypothesis and the problem from product-context.md]
Who will see it: my manager and two engineers, in a two-minute look.

Sections, in order:
1. The problem, as my target users would describe it, with one or two verified facts.
2. The idea in one sentence.
3. A mocked screen of the main task screen, filled with fictional records and events that you invent. Show totals, dates and status rules, worked out from that data, and make sure every number is consistent.
4. What we would test first, and what result would make us stop.
5. A banner at the top: "Prototype. Fictional data. Not a product commitment."

Constraints:
- Plain language, one primary action.
- Text contrast at least WCAG AA; no warning shown by colour alone.
- No external images, fonts or tracking.

Build the whole page now. After that I will ask for one change at a time: change only what I ask, and tell me in one line what you changed.`,
      },
      expectedOutput: [
        'A published pitch page with a shareable link, clearly labelled as a prototype with fictional data.',
        'pitch-notes.md: the brief, a reasoned revision with before and after evidence, one real reaction and "What this page does not prove".',
      ],
      artifact: 'A live pitch page link plus `pitch-notes.md`.',
      verification: [
        'Every fact on the page appears as Verified in `fact-sheet.md`, with its source shown.',
        'Every number on the mocked screen adds up when you check it by hand.',
        'The page works on a phone, shows the prototype banner and uses no real personal data.',
        'The change log connects each revision to an observed problem and records whether the change helped, including any rollback if needed.',
      ],
      reflectionPrompts: [
        'What did the reader think the page did, and how far was that from what you meant?',
        'Which change made the biggest difference, and was it about content or about looks?',
        'What would you be uncomfortable hearing a stakeholder promise after seeing this page?',
      ],
      checklist: [
        { id: 'brief', text: 'Wrote a five-line pitch brief in pitch-notes.md' },
        { id: 'built', text: 'Built the page from product-context.md and fact-sheet.md' },
        {
          id: 'five-changes',
          text: 'Made and checked a reasoned revision, with before and after evidence',
        },
        { id: 'numbers', text: 'Checked every number on the mocked screen by hand' },
        { id: 'published', text: 'Published the page and got one real reaction' },
        { id: 'not-proved', text: 'Wrote what the page does not prove' },
      ],
      mentorMove:
        'Open the link cold on your phone and say out loud, within 30 seconds, what you think it does. Then ask the engineer question: which part of this would be hardest to build for real, and why?',
    },
  ],
  challenges: [
    {
      id: 'c1',
      levelId: 1,
      title: 'Model behaviour lab: tokens, variation and long context',
      difficulty: 'Intermediate',
      minutes: 90,
      competencies: ['ai-fundamentals'],
      xp: 100,
      summary:
        'Run three small experiments that turn abstract ideas into things you have seen with your own eyes: token counts across languages, output variation, and how answers degrade inside long context.',
      steps: [
        'Paste the same paragraph in English and in another language you speak into a free public tokenizer page and record the token counts. Do the same for a paragraph full of numbers. Each model family splits text a little differently, but the pattern holds.',
        'Ask Claude the same open-ended question five times in fresh chats. Record which parts stay stable and which change.',
        "Take a long public document, such as a listed company's annual report. Write a question that needs three facts from different sections combined, for example a figure across two years plus a note in the risk section. Ask it in a fresh chat with the whole document attached. Current models usually find a single planted fact, so a multi-fact question is the fairer test.",
        'Add distraction: attach two older annual reports alongside the current one and ask again. Note whether the answer mixes years or misses a fact.',
        'Repeat with only the three relevant sections attached as a short, separate document. Compare accuracy and how often the model quotes its sources.',
        'Write a one-page lab report with your measurements and three practical rules you derived, and add any new terms to `glossary.md`.',
      ],
      deliverable:
        'A one-page lab report with token counts, variation notes, long-context results and three practical rules.',
      verification: [
        'Each experiment records the tool, model and date.',
        'The rules follow from your own results, not from something you read.',
        'Your mentor can repeat one experiment from your notes alone.',
      ],
      resources: [
        {
          resourceId: 'karpathy-deep-dive-llms',
          why: 'Goes deeper into tokenization and why models behave as they do.',
          required: false,
        },
      ],
    },
    {
      id: 'c2',
      levelId: 1,
      title: 'One idea, three tools',
      difficulty: 'Intermediate',
      minutes: 90,
      competencies: ['ux-prototyping', 'prompting-context'],
      xp: 100,
      summary:
        'Build the same pitch page in Claude artifacts, Lovable and v0 (or Bolt) from the same brief and context, then compare what each tool is good for.',
      steps: [
        'Reuse the brief from `pitch-notes.md`, `product-context.md` and `fact-sheet.md` unchanged, so the only variable is the tool.',
        'Build the page in each tool from a fresh start. Allow yourself the same number of follow-up changes in each, for example three.',
        'Publish or share each version and open all three on your phone.',
        'Score each from 1 to 5 on: faithfulness to the context and facts, whether the numbers add up, accessibility (contrast, colour, phone layout), ease of making one small change, and how easy it was to share.',
        'Note the free-tier limits you hit and what the paid plan would add.',
        'Write `tool-comparison.md`: the scores, one screenshot or link per tool, and which tool you would pick for a quick pitch, a multi-screen flow and a test with real users.',
      ],
      deliverable:
        '`tool-comparison.md` with three versions of the same pitch, scores on five criteria and a recommendation per use.',
      verification: [
        'All three versions were built from the same brief and context files.',
        'You checked the numbers by hand in every version.',
        'The recommendation is based on your scores, not on which page looked nicest.',
      ],
      resources: [
        {
          resourceId: 'lovable',
          why: 'One of the three tools you compare.',
          required: false,
        },
        {
          resourceId: 'v0',
          why: 'One of the three tools you compare, with a small free daily allowance.',
          required: false,
        },
      ],
    },
  ],
  quiz: [
    {
      id: 'q1-1',
      competency: 'ai-fundamentals',
      prompt:
        'A colleague pastes a 300-page policy document and a long chat history into an assistant and asks a precise question. The answer misses a clause on page 140. What is the most likely cause, and the best fix?',
      options: [
        {
          id: 'a',
          text: 'The document overflowed the window; switch to a model with a much larger context window and ask the same question again.',
        },
        {
          id: 'b',
          text: 'Long, mixed context degrades answers; start fresh with the relevant sections and ask it to quote the clause.',
        },
        {
          id: 'c',
          text: 'The request was too loose; add "read every page carefully and be thorough" and rerun it.',
        },
        {
          id: 'd',
          text: 'Safety filters skip dense legal text; rephrase the question so it avoids legal wording.',
        },
      ],
      correct: 'b',
      explanation:
        'A bigger window does not mean equal attention to everything in it. Narrowing the input to the relevant sections and asking the model to quote the clause it relies on usually fixes this, and makes the answer checkable.',
    },
    {
      id: 'q1-2',
      competency: 'ai-fundamentals',
      prompt:
        'You run the same request twice in fresh chats in the same tool and get noticeably different answers. What is the main reason?',
      options: [
        {
          id: 'a',
          text: 'The model updated itself from your first chat, so the second answer reflects what it learned.',
        },
        {
          id: 'b',
          text: 'Chat apps deliberately vary answers to repeat users so the product feels less robotic.',
        },
        {
          id: 'c',
          text: 'Chat apps run with no randomness, so the difference must come from a change in your wording.',
        },
        {
          id: 'd',
          text: 'Each token is sampled from a probability distribution, so two runs can take different paths.',
        },
      ],
      correct: 'd',
      explanation:
        'Variation comes from sampling during generation, not from learning between chats. This is why you test important requests more than once and judge the range of outputs, not a single run.',
    },
    {
      id: 'q1-3',
      competency: 'ai-fundamentals',
      prompt:
        'An engineer says the team is moving from "a chat assistant" to "an agent" for internal research. What is the most important practical difference for you as the PM?',
      options: [
        {
          id: 'a',
          text: 'The agent can use tools and take several steps on its own, so its actions as well as its answers need review.',
        },
        {
          id: 'b',
          text: 'The agent runs on a newer, larger model, so it no longer makes the factual errors a chat makes.',
        },
        {
          id: 'c',
          text: 'The agent remembers every past conversation with every user, so it no longer needs any context.',
        },
        {
          id: 'd',
          text: 'There is no real difference; "agent" is a marketing name for the same chat product.',
        },
      ],
      correct: 'a',
      explanation:
        'An agent is a model in a loop with tools: it searches, opens files, runs code and acts until a task is done. That expands what it can do and what can go wrong. It still makes errors, and it still depends on the context it is given.',
    },
    {
      id: 'q1-4',
      competency: 'prompting-context',
      prompt:
        'Your competitor summary from an assistant could describe any product in your category. What is the best fix?',
      options: [
        {
          id: 'a',
          text: 'Open with "You are a world-class strategy consultant with 20 years of experience" and ask again.',
        },
        { id: 'b', text: 'Switch to a reasoning model so it thinks harder about the competitors.' },
        {
          id: 'c',
          text: 'Give it a one-page product context file and the competitor pages, and say who it is for.',
        },
        {
          id: 'd',
          text: 'Add "be specific and insightful, avoid generic statements" to the instructions.',
        },
      ],
      correct: 'c',
      explanation:
        'Missing context is one likely cause of generic output. Supply the product brief, material and audience, make the task clear, then compare results on the same criteria. A role phrase cannot supply missing facts.',
    },
    {
      id: 'q1-5',
      competency: 'ai-fundamentals',
      prompt:
        'Using the 4Ds, which task is the best candidate for delegating to AI with light spot-checking?',
      options: [
        { id: 'a', text: "Reformatting raw meeting notes into your team's template." },
        { id: 'b', text: 'Choosing which roadmap item to cut this quarter, given capacity.' },
        { id: 'c', text: "Writing a direct report's performance feedback from your notes." },
        { id: 'd', text: 'Calculating final customer charges for a release.' },
      ],
      correct: 'a',
      explanation:
        'Reformatting is high volume and low judgment, and mistakes are cheap and easy to see. Prioritization and feedback need your judgment, and customer charges need deterministic calculation and controls, not a language model.',
    },
    {
      id: 'q1-6',
      competency: 'evals-safety',
      prompt:
        'A research answer cites a regulator statistic with a working link. You want to use it in a leadership review tomorrow. What should you do first?',
      options: [
        {
          id: 'a',
          text: 'Use it: research modes only cite pages they actually read, so the link supports the claim.',
        },
        {
          id: 'b',
          text: 'Ask the same tool to re-check the statistic and state its confidence before you use it.',
        },
        {
          id: 'c',
          text: 'Open the source and check the number, unit, date and population against the claim.',
        },
        {
          id: 'd',
          text: 'Use it, and mark it "source: AI research" on the slide so readers can judge it.',
        },
      ],
      correct: 'c',
      explanation:
        'Citations can exist yet not support the claim, or be outdated or about a different market. A working link proves only that a page exists, and asking the same tool again is not independent. Material claims need your own check against the source.',
    },
    {
      id: 'q1-7',
      competency: 'evals-safety',
      prompt:
        'You are preparing for a product review on your personal Claude account. Which of these is fine to paste in?',
      options: [
        {
          id: 'a',
          text: "An export of last month's customer complaints, since the assistant will only summarize it.",
        },
        {
          id: 'b',
          text: "A regulator's published report on your market, to pull out the figures you need.",
        },
        {
          id: 'c',
          text: "Your employer's unreleased roadmap, as long as you delete the chat afterwards.",
        },
        {
          id: 'd',
          text: 'A config file with an API key, if you ask the assistant not to store or repeat the key.',
        },
      ],
      correct: 'b',
      explanation:
        'Published material is safe to paste. Customer complaints contain personal data, an unreleased roadmap is confidential, and a credential is a secret: deleting a chat or asking the model not to remember does not undo the exposure. At work, the approved-tool policy decides.',
    },
    {
      id: 'q1-8',
      competency: 'ux-prototyping',
      prompt:
        'You asked for five changes to your pitch page in one message, and now the layout is broken and a figure no longer adds up. What is the best next step?',
      options: [
        {
          id: 'a',
          text: 'Ask it to "fix everything that broke" in one message so the page catches up quickly.',
        },
        {
          id: 'b',
          text: 'Start over in a new tool, since the first one has clearly reached its limits.',
        },
        {
          id: 'c',
          text: 'Leave the figure as it is, because the page is labelled as a prototype with fictional data.',
        },
        {
          id: 'd',
          text: 'Go back to the last good version and make the changes one at a time, checking each.',
        },
      ],
      correct: 'd',
      explanation:
        'With five changes at once you cannot tell which one broke the page. Stepping back and changing one thing at a time makes each result checkable. A prototype label does not excuse wrong numbers: one figure that does not add up makes people doubt the rest.',
    },
  ],
  project: {
    title: 'Pitch pack',
    brief:
      'Bring Level 1 together into the pack you would take to your first conversation about your product feature idea: the live pitch page, `fact-sheet.md` and `product-context.md`. Then walk your mentor through it, including one AI answer you rejected during the level and why. The context file is the seed of your Level 2 workspace, so make it something you would trust an agent to read.',
    deliverables: [
      {
        id: 'context-file',
        text: '`product-context.md`, updated through the level: one page, every fact sourced or marked Unknown, open decisions listed.',
      },
      {
        id: 'fact-sheet',
        text: '`fact-sheet.md` with every fact verified against a source you opened, and a "What I could not verify" list.',
      },
      {
        id: 'pitch-page',
        text: 'The live pitch page link, labelled as a prototype with fictional data, plus `pitch-notes.md` with the change log and real reactions.',
      },
      {
        id: 'foundations',
        text: '`glossary.md`, `model-comparison.md` and `delegation-audit.md`, filed in the same folder.',
      },
      {
        id: 'rejected-answer',
        text: 'A short note on one AI answer you rejected: what it said, how you found the problem and what you used instead.',
      },
      {
        id: 'walkthrough',
        text: 'A fifteen-minute walkthrough with your mentor: the page, the facts behind it, the context file and the rejected answer.',
      },
    ],
    rubric: {
      correctness:
        'Every fact on the page traces to a Verified line in the fact sheet; the mentor checks two sources and they hold up; the numbers on the mocked screen add up.',
      quality:
        'The context file is one page and specific enough that a newcomer could brief an assistant from it; the page is clear in thirty seconds and honest about being a prototype.',
      independence:
        'You wrote the context file, the brief and the fact sheet yourself; the mentor gave feedback but did not build or write any of it.',
      judgment:
        'You can explain why you delegated what you did, what you checked and why you rejected the answer you rejected; "What this page does not prove" names real limits.',
    },
    privacyNote:
      'Use public sources and fictional data only. No customer, colleague or employer data, and no credentials, in any chat, file or published page.',
    minutes: 180,
    xp: 300,
  },
  nextRecommendation:
    'Move to Level 2. From here the course uses Claude Code, which needs a paid Claude Pro plan. Before Session 5, use the Field guide to check current models and tools and find where each everyday PM job is practised. In Session 5 your `learning-notes/` files move into a workspace, and `product-context.md` becomes the first thing every agent reads.',
}
