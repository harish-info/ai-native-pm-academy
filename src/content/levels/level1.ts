import type { Level } from '../types'

export const level1: Level = {
  id: 1,
  slug: 'ai-foundations',
  title: 'AI foundations',
  theme: 'Learn how the tools work, give them context and check what they say',
  summary:
    'Start from everyday PM work. Learn how models and agents use context, compare two setups blind, verify an AI research answer against primary sources, and build a shareable pitch page. By default you work on Wayfinder, an AI weekend and city-trip planner for friends and families that pairs deterministic venue hours, transit buffers and per-person budget math with approval-gated replanning (or swap in your own product using public facts and fictional data). Your workspace files carry directly into every later level. Start with a free assistant account; tool options and usage limits vary by plan.',
  outcomes: [
    'Explain tokens, the context window, the three layers (model, agent, interface) and model tier versus effort in language a teammate or executive understands.',
    'Compare two models or effort settings blind on a real PM task with explicit criteria, recording the date and settings.',
    'Write a one-page product-context.md for Wayfinder (or your own product) in workspace/ and use it in a Project so answers fit your product instead of the internet average.',
    'Decide what to delegate with the 4Ds, and verify every material claim in an AI research answer against a primary source.',
    'Build and share an honest pitch page from your Markdown files, changing one thing at a time and checking every figure by hand.',
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
      minutes: 60,
      tools: ['Claude (free plan)', 'ChatGPT (optional, for the comparison)'],
      prerequisites: [],
      competencies: ['ai-fundamentals'],
      xp: 100,
      mentorReview: 'optional',
      goal: 'Explain in plain language how a model writes an answer, separate the model, agent and interface layers, choose a model tier and effort level for a PM job, and compare two setups blind on a Wayfinder task.',
      whyItMatters:
        'On a product like Wayfinder, where an invented museum opening hour, an impossible walk across a harbour ferry or a dropped allergy note ruins a group weekend, your team needs a plain-English grasp of how AI works. Knowing what the model sees, why answers vary across runs, and which layer failed when output disappoints lets you decide calmly what code should calculate and what the model should explain.',
      learn: [
        {
          heading: 'How a model writes an answer',
          illustration: 'tokens',
          paragraphs: [
            'A large language model is trained on vast amounts of text to predict the next small chunk of characters, called a **token** (roughly three quarters of an English word; numbers and code take more tokens per word). After pretraining, labs tune the model on examples and human feedback so it follows instructions and answers like a helpful colleague.',
            'When you send a prompt, the model reads everything in its context and generates the reply one token at a time, sampling from likely continuations rather than querying a verified timetable or calculator. That single mechanism explains three things you will see on **Wayfinder** (see [Case studies](/case-study), an AI weekend planner for friends and families): why a wrong museum schedule or transit estimate still sounds fluent (**hallucination**), why two runs of the same prompt differ, and why deterministic code must check venue hours, transit buffers and budget totals while the model handles messy preferences.',
          ],
        },
        {
          heading: 'The context window and context rot',
          paragraphs: [
            "The **context window** is everything the model can see in one turn: hidden system instructions, your messages, attached files, tool results and earlier replies. Anything outside that window does not exist for the model, and nothing carries over from yesterday's chat unless a memory feature or file puts it back.",
            'Windows now hold hundreds of thousands of tokens, yet bigger is not sharper. As a thread fills with stale drafts, tangents or conflicting notes, precision drops, an effect practitioners call **context rot**. Start a fresh chat when the job changes, attach only what the task needs, and prefer a one-page brief over a raw document dump.',
          ],
        },
        {
          heading: 'Three layers: model, agent and interface',
          illustration: 'chat-agent',
          paragraphs: [
            'When an AI tool disappoints, separate three layers before you blame "the AI":',
          ],
          bullets: [
            "**Model (the engine):** the trained neural network that reasons and writes from context, such as Claude Opus, Sonnet or Haiku, OpenAI's GPT models, or Google's Gemini.",
            '**Agent (the application around it):** wraps the model in a loop with **tools** (web search, calculators, file access). Plain **chat** answers once from what you pasted; an agent plans a step, calls a tool, checks the result and repeats. In Level 2 you use Claude Code to edit files directly, so you must review its actions as well as its text.',
            '**Interface (where you steer it):** web chat, a desktop Code tab, or a terminal window. One agent can sit behind several interfaces.',
          ],
        },
        {
          heading: 'Which model tier and effort level for which PM job',
          paragraphs: [
            '**Model choice** picks which engine does the work; **effort** controls how much thinking time that same model spends before replying. Raising effort on a mid-tier model keeps the same model and cannot supply missing product context or live venue hours. Check the [Field guide](/field-guide) for current lab lineups and defaults.',
          ],
          bullets: [
            '**Fast tier or low effort:** quick rewrites, formatting notes, or tagging trip feedback with categories you already tested, once all facts are supplied.',
            '**Balanced tier at medium effort (everyday default):** drafting Wayfinder interview questions, summarizing competitor pages, or building a first prototype.',
            '**Flagship tier or high effort:** weighing conflicting PRD and safety constraints, stress-testing a strategy memo, or debugging a stubborn prototype state after giving the failing steps.',
          ],
        },
        {
          heading: 'Compare setups blind on your own task',
          paragraphs: [
            'Skip debates about which model is "best overall". Write four task criteria first: factual accuracy, constraint following, usefulness for the target reader, and honesty about uncertainty. Run the exact same Wayfinder prompt across two models or two effort settings, relabel the outputs blind, score each 1 to 5, and quote the exact sentence behind every low score. Record the date, model names and enabled features (such as web search or memory) so you know whether you compared raw models or whole products.',
          ],
        },
      ],
      resources: [
        {
          resourceId: '3b1b-llms-briefly',
          why: 'A short visual explanation of next-token prediction and training that makes the rest of the session click.',
          required: false,
        },
        {
          resourceId: 'anthropic-ai-fluency',
          why: "Anthropic's recommended first course, built around the 4Ds you meet in Session 2. Do the introduction now if you have time; the course continues in Sessions 2 and 3.",
          required: false,
        },
        {
          resourceId: 'academy-what-happens-talk-ai',
          why: 'A five-minute Claude Academy video on prediction: the same idea as the reading, from a different angle.',
          required: false,
        },
        {
          resourceId: 'academy-choosing-claude-model',
          why: 'Which Claude model suits which task, and a quick way to compare two on a task you know. Useful for the model comparison below.',
          required: false,
        },
        {
          resourceId: 'aihero-llm-fundamentals',
          why: 'A short primer on why context windows fill up and degrade and when an agent is the right shape. Written for engineers, but readable.',
          required: false,
        },
        {
          resourceId: 'dlai-genai-for-everyone',
          why: "A non-vendor alternative: Andrew Ng's beginner video course on what generative AI can do at work. About five hours, so take it across the course.",
          required: false,
        },
        {
          resourceId: 'karpathy-deep-dive-llms',
          why: 'The clearest long-form walkthrough of how chat models are built, from pretraining to assistant behaviour. It runs over three hours, so watch it in chapters across the course; it is not part of this session.',
          required: false,
        },
      ],
      task: {
        summary:
          'Create your private `workspace/` folder, draft a plain-language AI glossary, and compare two models or effort settings blind on a Wayfinder discovery task.',
        steps: [
          '**Think first (no AI):** Create a private `workspace/notes/` folder on your computer, outside any shared work drive. Draft `notes/glossary.md` in your own words (1 to 2 sentences each) for token, next-token prediction, context window, context rot, hallucination, knowledge cutoff, reasoning model, tool, agent and RAG. Write four 1-to-5 criteria to judge 8 discovery interview questions for friends planning a weekend city trip across group chats.',
          '**Work with your agent:** Run that Wayfinder interview-question prompt in two fresh chats across two models or two effort settings, noting date, model names and active tools. Rerun one setup once in a fresh chat to see sampling variance, and test one current-week question with web search off versus on. Run the glossary check brief below with your own audience filled in.',
          '**Check and try to break it:** Relabel both Wayfinder outputs blind and score each from 1 to 5 on your four criteria before reading any AI critique. Quote the exact sentence behind every score below 4. Check the glossary verdict table line by line to separate genuinely clearer edits from confident jargon.',
          '**Make the call:** Save `notes/model-comparison.md` with your setups, blind scores, variance note, web-search check and chosen default for this task. Save only the edits you stand behind in `notes/glossary.md`. Confirm zero employer, customer or confidential data entered any chat.',
        ],
      },
      agentPrompt: {
        tool: 'Claude',
        where: 'A fresh chat, with your notes/glossary.md pasted below',
        text: `Below is a glossary of 10 AI terms I wrote in my own words. I am a product manager, and I need these definitions clear enough for [who you explain AI terms to, e.g. design, trust-and-safety and engineering teammates on a consumer travel product].

Pay closest attention to [one term from your glossary you feel least sure about].

For each term:
1. Verdict: Correct, Partly correct, or Wrong.
2. If not fully correct, explain the problem in one sentence and suggest a plain-English fix.
3. Flag any shortcut that would mislead a trust, legal or engineering reviewer, even if common in casual chat.

Rules:
- Keep my wording wherever it is already accurate.
- If a distinction is debated or tool-specific, say so instead of guessing.
- Return a Markdown table: Term | Verdict | Problem | Suggested sentence.

[paste your notes/glossary.md here]`,
      },
      expectedOutput: [
        '`notes/glossary.md`: ten terms in your own words, checked critically, keeping only edits you stand behind.',
        '`notes/model-comparison.md`: one Wayfinder task, two models or effort settings scored blind on four criteria with quoted sentences, plus notes on sampling variance and web search.',
      ],
      artifact:
        '`notes/glossary.md` and `notes/model-comparison.md` in your private `workspace/` folder.',
      verification: [
        'You scored both Wayfinder outputs blind before reading any AI critique of them.',
        'Your definitions of context window, model, agent and interface make sense read aloud to someone non-technical.',
        'The comparison records the date, full model names and effort or tool settings, and states whether it compares models or products.',
        'You rejected or adjusted at least one glossary suggestion, or wrote down why every suggestion was genuinely right.',
      ],
      reflectionPrompts: [
        'Which score or sampling difference surprised you most on the Wayfinder prompt, and why?',
        'When a result disappoints next week, how will you tell whether the brief, the model tier or the agent layer caused it?',
        'What part of Wayfinder must never rely on next-token prediction?',
      ],
      checklist: [
        {
          id: 'glossary',
          text: 'Wrote `notes/glossary.md` in my own words and reviewed every AI suggestion myself',
        },
        {
          id: 'compared',
          text: 'Compared two models or effort settings blind on a Wayfinder task and scored them',
        },
        { id: 'variance', text: 'Reran one request and recorded how the answer varied' },
        {
          id: 'no-confidential',
          text: 'Confirmed no confidential, employer or customer data was used in any chat',
        },
      ],
      mentorMove:
        'Relabel the two Wayfinder outputs as A and B so they score blind. Then ask them to explain the difference between a chat and an agent as if you were a product trust-and-safety lead worried about unapproved restaurant holds, and push back once with a hard follow-up question.',
      soloMove:
        'Paste both outputs into two unlabelled notes, take a five-minute break, shuffle their order and score them blind before checking which setup wrote which. Then read your chat-versus-agent definition aloud and check whether a teammate would know why reservation holds need explicit human approval.',
    },
    {
      id: 's2',
      levelId: 1,
      number: 2,
      title: 'Give AI your product context',
      difficulty: 'Foundational',
      minutes: 75,
      tools: ['Claude (Projects)', 'A text editor or Obsidian'],
      prerequisites: ['s1'],
      competencies: ['prompting-context', 'ai-fundamentals'],
      xp: 100,
      mentorReview: 'recommended',
      goal: 'Write a one-page `product-context.md` for Wayfinder in `workspace/`, load it into a Claude Project so answers reflect real product constraints, and audit ten PM tasks with the 4Ds.',
      whyItMatters:
        'Ask a bare chat for a Wayfinder competitor summary and you get generic travel-blog advice that ignores Monday museum closures, ferry transfer buffers, allergy safety and approval-gated reservation holds. Clever prompt wording cannot invent missing facts. Giving your agent a concise context file fixes the answer today and stays at the root of `workspace/` through Level 5.',
      learn: [
        {
          heading: 'Why generic answers happen, and what the model sees',
          illustration: 'context',
          paragraphs: [
            'Ask a bare chat for a competitor summary for Wayfinder and you get smooth travel-tech clichés that could describe any itinerary app. Adding "you are a world-class travel strategist" changes the tone, not the substance, because a role title cannot supply missing facts. **Context engineering** means diagnosing what a capable new teammate would need on day one and putting only that into the window.',
            'If a sharp PM joining Wayfinder tomorrow could not do the job from what you pasted, neither can the model. Test that difference directly by comparing a bare prompt, a role-phrase prompt, and a Project chat backed by your context file. Everything the model uses arrives through six inputs:',
          ],
          bullets: [
            '**Instructions:** product defaults plus your custom or Project rules.',
            '**Your brief:** the goal, reader, constraints and definition of done.',
            '**Project knowledge and files:** curated docs attached or saved in a Project.',
            '**Examples:** one strong sample output shows style faster than adjectives.',
            '**Memory:** chat fragments recalled automatically; opaque, so keep real facts in files.',
            '**Tool results:** web pages or files fetched during the turn.',
          ],
        },
        {
          heading: 'Write product-context.md for Wayfinder in Markdown',
          paragraphs: [
            'Across this course we use **Wayfinder** (full spec in [Case studies](/case-study)): an AI weekend and city-trip planner for friends and families with two v1 surfaces. **Day Plan & Budget Split** uses deterministic code to verify venue opening hours, door-to-door transit buffers and remaining per-person budget after booked stops. **Ask Wayfinder** is a grounded replanning drawer that respects pinned group constraints (such as a `tree-nut allergy` or `step-free` access) and stages reservation holds or group polls behind an explicit `Confirm hold` tap. Capture it in a one-page `workspace/product-context.md`, writing `Unknown` wherever a detail is unsettled so future sessions never treat a guess as decided policy.',
            'Write the file in **Markdown** (`.md`), plain text structured with `#` and `##` headings, `-` bullets, `1.` numbered steps, `**bold**` and `[label](link)` links (Obsidian in the [Starter kit](/starter-kit) previews it cleanly). Load `product-context.md` into a **Claude Project** now; because it already lives at the root of `workspace/`, Claude Code will read the exact same file in Session 5 without moving or renaming folders. Use six headings:',
          ],
          bullets: [
            '**Product:** what Wayfinder is (`Day Plan & Budget Split` + `Ask Wayfinder` drawer) and what v1 excludes.',
            '**Users:** friends and families coordinating a two-day city trip across scattered group-chat screenshots and saved links.',
            '**Glossary:** exact product terms such as `Left after booked stops (meals and local transit not included)`, `transit buffer`, and `Confirm hold` (`status: "awaiting_approval"`).',
            '**Constraints:** tested code owns venue hours, transit minutes and budget math; hard dietary and step-free constraints stay pinned across replans; holds never auto-book; visa, insurance and medical rulings are refused; warnings never rely on colour alone.',
            '**Open decisions:** unresolved product, partner or trust calls and who decides.',
            '**Sources:** where every stated fact came from, with dates.',
          ],
        },
        {
          heading: 'Decide what to delegate: the 4Ds and the meat-proxy trap',
          illustration: 'delegate',
          paragraphs: [
            "Anthropic's AI Fluency course frames everyday AI work around four skills: **Delegation** (what to hand off versus keep), **Description** (clear context and done criteria), **Discernment** (evaluating what comes back), and **Diligence** (owning verification and transparency).",
            "Map delegation along two questions: how much human judgment does the task demand, and what does an error cost? Delegate high-volume, low-judgment chores like reformatting trip notes or first-pass competitor tables with spot checks. Keep roadmap trade-offs, teammate feedback, and Wayfinder's deterministic hours, transit and budget rules in human or tested-code hands.",
            'Never act as a **meat proxy**, using AI to inflate a short thought into a long Slack message or doc that teammates then have to summarise back down with their own AI or review for you. Send the clear point directly, and own every claim under your name.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'anthropic-ai-fluency',
          why: 'The source of the 4Ds. Do the introduction and the Delegation and Description lessons now; the Discernment lessons fit Session 3, and the rest can follow across the course.',
          required: false,
        },
        {
          resourceId: 'claude-101',
          why: "Anthropic's guided tour of Claude for work. Its Introduction to projects lesson covers the Project you set up in this session; the rest can follow later.",
          required: false,
        },
        {
          resourceId: 'anthropic-context-engineering',
          why: 'Why curated context beats volume, from the people who build the models. Read the opening sections up to and including the anatomy of effective context; the later sections on retrieval and long-running agents are for engineers, so skim or skip them.',
          required: false,
        },
        {
          resourceId: 'gruhn-meat-proxy',
          why: 'A short essay on why relaying unread AI output to colleagues hands them your work.',
          required: false,
        },
        {
          resourceId: 'commonmark-help',
          why: 'The standard Markdown marks on one page, with a ten-minute tutorial if you want to practise.',
          required: false,
        },
        {
          resourceId: 'openai-academy',
          why: 'Free introductory courses on working with AI assistants, if you want more guided practice on the same ideas.',
          required: false,
        },
      ],
      task: {
        summary:
          'Compare a bare chat, a role-phrase prompt and a Project grounded in `product-context.md` on a Wayfinder competitor summary, then refine your context file and audit 10 PM tasks.',
        steps: [
          '**Think first (no AI):** Using the Wayfinder spec in [Case studies](/case-study) as raw notes, write a one-page `workspace/product-context.md` under the six headings, marking unsettled items `Unknown`. Draft `notes/delegation-audit.md` listing 10 real PM tasks across your week and classifying each with the 4Ds.',
          '**Work with your agent:** Ask for a Wayfinder competitor summary first in a bare chat and second with a "world-class strategy consultant" role opener, saving both in `notes/summary-comparison.md`. Create a `PM workspace` Project holding `product-context.md` and 4 to 6 instruction lines (or paste `product-context.md` into a fresh chat on free plans). Run the grounded brief below with 3 public trip-planning or map-app pages and save `notes/summary-v1.md`.',
          '**Check and try to break it:** Score all three summaries from 1 to 5 on group-trip relevance, constraint fidelity, source evidence and honesty about unknowns. Check `Gaps and assumptions` in `notes/summary-v1.md` to confirm every implication quotes a real line from `product-context.md` instead of generic travel clichés.',
          '**Make the call:** Update `product-context.md` yourself where you know the answer to a flagged gap and log open choices under Open decisions. Complete `notes/delegation-audit.md` by naming the context file, human check and accountable owner for each task.',
        ],
      },
      agentPrompt: {
        tool: 'Claude',
        where:
          'A chat inside your PM workspace Project, with product-context.md in project knowledge',
        text: `Goal: a one-page competitor summary for Wayfinder to support [who is reading this summary and what decision they face].

Context: product-context.md in this project defines our product, weekend group-trip users, constraints and open decisions. Judge every competitor specifically against [the one constraint from product-context.md competitors must be judged against].

Material (use only these pages and product-context.md; do not guess from memory):
[paste 3 public trip-planner, itinerary or map-app pages and URLs]

What good looks like:
- Markdown table: Competitor | What it offers weekend group planners | How it verifies venue hours, transit buffers and budgets | How it handles group constraints and booking approvals | Source URL.
- Three implications for Wayfinder, each quoting the exact line in product-context.md it relies on.
- "Gaps and assumptions": anything needed that was missing from the pasted pages or product-context.md. Mark unsupported details as "unverified".

Constraints: under 400 words outside the table, plain language.`,
      },
      expectedOutput: [
        '`workspace/product-context.md`: one page with Product, Users, Glossary, Constraints, Open decisions and Sources, using `Unknown` instead of guesses.',
        '`notes/summary-comparison.md` (bare chat versus role phrase) and `notes/summary-v1.md` (Project-grounded), scored on the same criteria.',
        '`notes/delegation-audit.md`: ten PM tasks with delegation call, required context, human check and owner.',
      ],
      artifact:
        '`product-context.md`, `notes/summary-comparison.md`, `notes/summary-v1.md` and `notes/delegation-audit.md` in `workspace/`, plus a `PM workspace` Project.',
      verification: [
        '`product-context.md` fits on one page and every stated fact has a source or is marked `Unknown`.',
        'You can point to the exact lines in `product-context.md` that changed `notes/summary-v1.md` compared with the role-phrase run.',
        'You wrote `product-context.md` and every edit to it yourself; the assistant only surfaced gaps.',
        'Every delegated task in `notes/delegation-audit.md` names a concrete check rather than "review quickly".',
      ],
      reflectionPrompts: [
        'How little did the "world-class strategy consultant" role phrase change compared with adding `product-context.md`?',
        'Which `Unknown` or gap in Wayfinder surprised you most once the assistant tried to use your file?',
        'Which PM task were you tempted to delegate completely, and what error cost made you hold back?',
      ],
      checklist: [
        {
          id: 'context-file',
          text: 'Wrote a one-page `workspace/product-context.md` for Wayfinder with sources and Unknowns',
        },
        {
          id: 'summary-v1',
          text: 'Saved a grounded `notes/summary-v1.md` for Session 3 and scored all three drafts',
        },
        {
          id: 'gaps',
          text: 'Updated `product-context.md` and Open decisions myself from the gaps list',
        },
        { id: 'audit', text: 'Wrote a ten-task `notes/delegation-audit.md` using the 4Ds' },
      ],
      mentorMove:
        'Read their `product-context.md` cold and say what you, as an engineer joining tomorrow, would still need to know before building Wayfinder. Then challenge one task they delegated in the audit: what would go wrong, and how would they notice?',
      soloMove:
        'Open a fresh chat outside your Project, paste only `product-context.md`, and ask: "Read this as a sceptical senior engineer and trust-and-safety lead joining tomorrow. List the 5 ambiguities most likely to cause a wrong build." Fix or log the valid gaps under Open decisions yourself.',
    },
    {
      id: 's3',
      levelId: 1,
      number: 3,
      title: 'Research and verify',
      difficulty: 'Foundational',
      minutes: 75,
      tools: ['Claude (web search or Research)', 'A web browser'],
      prerequisites: ['s2'],
      competencies: ['ai-fundamentals', 'evals-safety'],
      xp: 100,
      mentorReview: 'recommended',
      safetyCritical: true,
      goal: 'Answer a real market or travel-consumer question for Wayfinder with web search, verify every material claim against primary sources saved in `workspace/sources/`, and enforce strict rules on what never enters an assistant.',
      whyItMatters:
        'A fluent Wayfinder research brief can cite a working URL while misstating tourism statistics, mixing overnight hotel trips with day trips, or repeating a booking platform marketing post as neutral evidence. Checking atomic claims against primary sources stops your roadmap from resting on an invented statistic.',
      learn: [
        {
          heading: 'Why web-backed answers still get facts wrong',
          paragraphs: [
            'Language models optimize for plausible continuations, so they can state an invented leisure-travel figure or restaurant no-show rule with total confidence (**hallucination**). Switching on web search or paid **Research** mode cuts invented URLs because the assistant reads live pages, yet citations still fail in three common ways: the link is dead, the page exists without saying what the AI claimed, or the number applies to a different year, country or traveller segment.',
            "Search tools can also repeat a travel vendor's launch blog as neutral evidence, merge two incompatible surveys, or turn a narrow city pilot into a global feature rollout.",
          ],
        },
        {
          heading: 'Audit atomic claims with four labels',
          illustration: 'verification',
          paragraphs: [
            'Do not grade an AI report as a single block. Split it into atomic claims, then separate **material claims** (statements that would change a Wayfinder product, partner or safety call if wrong) from **background claims**. Open the cited page yourself for every material claim, save the unedited text in `workspace/sources/`, check that the page matches the exact number, unit, date and population, and assign one of four labels:',
            'For example, if an AI summary claims "42% of weekend group trips cancel an activity due to schedule mistakes" and the linked national tourism survey actually measured all domestic holidaymakers changing outdoor plans for weather across a full summer, the link works and the claim is still **Partly supported** until you rewrite it to match the report.',
          ],
          bullets: [
            '**Verified:** the source states this exact fact for your market and timeframe.',
            '**Partly supported:** the source says something narrower, older or qualified, so your wording must tighten.',
            '**Unsupported:** no source is given, or the linked page does not contain the claim.',
            '**Contradicted:** a stronger primary source shows the opposite.',
          ],
        },
        {
          heading: 'Primary sources, web search and Research',
          paragraphs: [
            "Trust a source when it observed the evidence directly. For Wayfinder's consumer travel and local-experiences space, **primary sources** include national statistics and tourism boards (such as Eurostat, the ONS or national transport authorities), consumer-protection agencies on booking deposits and cancellation disclosures, accessibility standards bodies, and a rival's own help or pricing pages for what it states it offers. Press articles and trend roundups are **secondary** interpretations; forum threads are useful discovery signals for group-planning frustration, never proof of market prevalence. Ask three questions of every page you open: did this publisher measure the thing directly, do they gain commercially if you believe it, and has an independent body confirmed it?",
            "Claude's standard web search (on the free plan) checks a handful of pages quickly; **Research** (on paid plans) runs a multi-step search agent across many pages to compile a longer report. Brief either mode with explicit geography, recency window and source rules, and require separate sections for inferences and unfound answers. Running the same brief twice in fresh chats is a cheap cross-check: wherever the two runs disagree, look first.",
          ],
        },
        {
          heading: 'What never goes into an assistant',
          paragraphs: [
            "Prompts and attachments may be logged, reviewed for safety or used for model training depending on plan settings, and deleting a chat afterwards does not undo a disclosure. At work, your employer's approved-tool policy sets the boundary; throughout this course, use only public sources and fictional Wayfinder data.",
          ],
          bullets: [
            '**Personal data:** real user, friend or colleague names, phone numbers, passport details, private health or allergy records, or real booking receipts.',
            '**Confidential company data:** internal metrics, unreleased roadmaps, partner commission terms or internal incident reviews.',
            '**Credentials:** passwords, API keys or access tokens (if one ever slips into a chat, revoke and rotate it immediately).',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'karpathy-how-i-use-llms',
          why: 'A practitioner tour of everyday model use. For this session, watch the sections on internet search and deep research, where he shows both the value and the need to check; the rest of the video is optional.',
          required: false,
        },
        {
          resourceId: 'anthropic-ai-fluency',
          why: "Continue AI Fluency with the Discernment lessons, which match this session's verification work.",
          required: false,
        },
        {
          resourceId: 'anthropic-capabilities-limitations',
          why: "Anthropic's second fluency course, designed to sit before or after AI Fluency. The Knowledge and Working Memory units explain why answers go stale or drift in long chats. About 3.5 hours, so treat it as further study.",
          required: false,
        },
        {
          resourceId: 'academy-trust-ai',
          why: "A five-minute video on two ways answers go wrong: hallucination, which this session's checks are built to catch, and sycophancy, where the model agrees with you too easily.",
          required: false,
        },
        {
          resourceId: 'simon-willison-blog',
          why: 'A respected practitioner who regularly tests AI search and research features and documents where they go wrong.',
          required: false,
        },
      ],
      task: {
        summary:
          'Research one publicly verifiable Wayfinder question across two fresh runs, audit 10 material claims directly against primary sources saved in `workspace/sources/`, and save `notes/fact-sheet.md`.',
        steps: [
          '**Think first (no AI):** Create `workspace/sources/` for raw reference pages. Write one specific, publicly verifiable research question for Wayfinder (such as short-break tourism patterns, public-transit reliability, or restaurant reservation deposit disclosures). Pick the single claim in `notes/summary-v1.md` from Session 2 that you doubt most.',
          '**Work with your agent:** Fill in the bracketed blanks in the research prompt below. Run it twice in two separate fresh chats with web search (or Research) switched on. Save both outputs in `workspace/notes/` alongside `summary-v1.md`.',
          '**Check and try to break it:** Pull 10 material claims from `summary-v1.md` and both runs into a verification table. Open every cited link yourself, save the raw pages you rely on in `workspace/sources/`, and label each claim (`Verified`, `Partly supported`, `Unsupported`, `Contradicted`). Find at least one relevant primary source (statistics office, transport authority, consumer regulator or official product page) that neither AI run cited.',
          '**Make the call:** Save `notes/fact-sheet.md` with your `Verified` facts (exact figures, units, dates and URLs) plus `What I could not verify`. Update `product-context.md` Sources and fix any contradicted line. Review your chats to confirm zero personal, confidential or credential data was pasted.',
        ],
      },
      agentPrompt: {
        tool: 'Claude with web search or Research',
        where: 'Two separate fresh chats in your PM workspace Project, with web search switched on',
        text: `Research question: [your Wayfinder research question]

Claim from my earlier draft to stress-test: [the one claim from notes/summary-v1.md you doubt most and want checked against primary sources]

Scope:
- Geography: [geography, e.g. UK or Europe]
- Time window: sources published in the last 24 months, unless a foundational regulation or series is older
- Audience: a product manager preparing an internal Wayfinder fact sheet

Source requirements:
- Prefer primary sources: national statistics or tourism offices, public transport authorities, consumer-protection regulators, peer-reviewed studies, and official company pages for what a product states it offers.
- Use reputable press or analyst reports only when no primary source exists, and label them secondary.
- Label a company's claims about its own customer outcomes as company claims.
- Do not cite forums, content farms or AI-generated roundups as factual evidence.

Output format:
1. Summary under 180 words.
2. Numbered claims list: exact claim, source title, publisher, publication date, direct URL, and Primary or Secondary label. Quote every figure with exact unit, year and population surveyed.
3. Verdict on the stress-tested claim above, quoting what primary sources actually say.
4. Separate sections titled "Inferred, not sourced" and "Could not find". Never invent a statistic, quote or URL.`,
      },
      expectedOutput: [
        'A 10-claim verification table with labels, source dates and links you opened yourself, backed by raw pages in `workspace/sources/`.',
        '`notes/fact-sheet.md`: verified Wayfinder market, transport or consumer-protection facts with exact citations, plus `What I could not verify`.',
        'An updated Sources section in `workspace/product-context.md`.',
      ],
      artifact:
        '`notes/fact-sheet.md` and raw reference pages in `workspace/sources/`, checked by you.',
      verification: [
        'Every material claim has a source link that you opened and read in your own browser.',
        'At least one primary source appears in `notes/fact-sheet.md` that neither AI run cited.',
        'Every quoted number matches its source on unit, year, population and geography.',
        'You caught at least one overstatement or discrepancy, or documented how all 10 claims passed direct inspection.',
        'No chat in this session contains personal data, confidential company data or credentials.',
      ],
      reflectionPrompts: [
        'What share of the 10 material claims held up as written, and which failure mode showed up most?',
        'Where did your two fresh runs disagree, and what did the primary source actually say?',
        'How will this change what you check before quoting an AI research summary in a leadership review?',
      ],
      checklist: [
        {
          id: 'opened-sources',
          text: 'Opened every cited source myself and labelled 10 material claims',
        },
        { id: 'primary-source', text: 'Added at least one primary source neither AI run cited' },
        {
          id: 'fact-sheet',
          text: 'Saved `notes/fact-sheet.md`, raw pages in `workspace/sources/` and updated `product-context.md`',
        },
        { id: 'never-paste', text: 'Checked my chats for personal, confidential or secret data' },
      ],
      mentorMove:
        'Pick two claims they marked Verified in `notes/fact-sheet.md` and check them live together. Show how a citation can open cleanly yet overstate a narrow sample or traveller group, and ask what they would never paste into an assistant at work.',
      soloMove:
        'Take a short break, then re-open the original web pages for your two strongest `Verified` claims and use Find-in-page to check the exact figure, year, unit and surveyed group word for word. Downgrade and rewrite any sentence that broadened the claim.',
    },
    {
      id: 's4',
      levelId: 1,
      number: 4,
      title: 'Vibe code your first page',
      difficulty: 'Foundational',
      minutes: 75,
      tools: ['Claude artifacts (free)', 'Lovable (optional)'],
      prerequisites: ['s3'],
      competencies: ['ux-prototyping'],
      xp: 100,
      mentorReview: 'optional',
      practicalProof: true,
      goal: 'Turn Wayfinder into a live, shareable pitch page grounded in `product-context.md` and `notes/fact-sheet.md`, refine it one change at a time, and test it on a cold reader.',
      whyItMatters:
        'A memo about Wayfinder lets three colleagues imagine three different planners. A clickable pitch page puts Saturday stops, transit buffers and the remaining weekend budget on screen in 30 seconds so people can poke holes in it early. It tests whether the idea is clear, not whether travellers truly want it (Level 3 tests demand).',
      learn: [
        {
          heading: 'Why build a page instead of writing a memo',
          paragraphs: [
            'A written memo about Wayfinder lets three readers picture three different products. A clickable pitch page forces concrete choices onto the screen: how door-to-door transit buffers sit between stops, how `Left after booked stops` clarifies that meals and local transit are excluded, and how `Confirm hold` gates any reservation draft. Exposing shaky assumptions in 30 seconds is the whole point.',
            '**Vibe coding**, a phrase Andrej Karpathy coined in early 2025, means describing what you want in plain English, letting AI write the code, and judging the result by clicking through rather than reading code line by line. It is built for fast pitches and throwaway discovery probes; Level 2 introduces the tighter git habits needed for multi-state prototypes.',
          ],
        },
        {
          heading: 'Markdown for durable facts, HTML for human eyes',
          paragraphs: [
            'Your pitch page is **HTML**, the format every browser renders. Because an assistant now generates a clean interactive HTML page almost as quickly as a bulleted memo, use a simple rule to keep your work tidy:',
          ],
          bullets: [
            '**Markdown (`.md`)** is for durable knowledge you and your agents edit over time: `product-context.md`, `notes/fact-sheet.md`, PRDs and decision logs.',
            '**HTML** is for people to inspect and click: pitch pages, visual comparisons, prototypes and interactive readouts.',
            '**Facts live in Markdown.** Generate HTML from your checked Markdown files, and when a number or constraint changes, fix the Markdown file first and regenerate so the page never drifts into a competing version of the truth.',
          ],
        },
        {
          heading: 'Ground the brief, then change one thing at a time',
          paragraphs: [
            'If you ask a bare chat for a Wayfinder pitch page, it fills your gaps with invented tourist stats, auto-booked restaurant tables, or vague budget labels that pretend lunches and metro rides are already covered. Seeing that generic draft once makes clear why your real build belongs inside your `PM workspace` Project with `product-context.md` and `notes/fact-sheet.md` attached. Specify who will read the page in a two-minute review, which `Verified` facts to cite with their sources, and the exact fictional weekend stops, transit minutes and budget amounts the mocked screen must display: deterministic numbers first, plain-English explanation second.',
            'Once v1 renders, iterate **one change per message**. Asking for five layout, copy and math tweaks together makes it impossible to tell which instruction broke the screen. Step back to the previous artifact version whenever an edit misfires, and open a fresh chat with your current files if the conversation gets long.',
          ],
        },
        {
          heading: 'Honest labels, hand-checked math and cold readers',
          paragraphs: [
            'A polished prototype easily reads like a shipping promise. Put a clear banner at the top (`Prototype. Fictional data. Not a product commitment.`) and check every mocked Wayfinder figure with a calculator: if a `$180` per-person weekend cap minus `$94.50` in booked stops does not show `$85.50` `Left after booked stops (meals and local transit not included)`, or if a 38-minute harbour ferry sits inside a 30-minute gap without a warning, a sharp reviewer stops trusting everything else on the page.',
            'Before calling the pitch ready, test it for 30 seconds with a **cold reader** who has zero background. Resist explaining the screen before they speak: their first confusion shows the exact label to fix next. Close `notes/pitch-notes.md` with `What this page does not prove` so nobody mistakes clear UI for proven user demand. Claude artifacts handle single-page shareable links for free; Lovable and v0 (compared in Challenge 2) build multi-page web apps.',
          ],
          bullets: [
            'Works cleanly on both a phone screen and a laptop.',
            'Readable text with WCAG AA contrast.',
            'Tight-transfer, closed-venue and over-budget warnings use explicit words and icons, never colour alone.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'claude-artifacts',
          why: 'How artifacts work inside a Claude chat, including publishing and sharing a link.',
          required: false,
        },
        {
          resourceId: 'ai-fluency-builders',
          why: "Anthropic's follow-on to AI Fluency for product people and makers. The delegation and description lessons fit this session; the discernment lessons fit Session 8.",
          required: false,
        },
        {
          resourceId: 'mckinnon-vibe-coding-pms',
          why: 'A PM leader on what prototypes prove and what they only appear to prove.',
          required: false,
        },
        {
          resourceId: 'lovable-quickstart',
          why: 'The official quick start builds and publishes a small site from a prompt, one change at a time, which is exactly the habit this session teaches.',
          required: false,
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
          'See what a naive 3-line pitch prompt invents, rebuild Wayfinder from `product-context.md` and `notes/fact-sheet.md` one change at a time, check every figure by hand, and run a 30-second cold-reader test.',
        steps: [
          "**Think first (no AI):** Start `notes/pitch-notes.md` in `workspace/` with a 5-line pitch brief for Wayfinder's `Day Plan & Budget Split` view. Name your readers, the group-chat planning problem, and 1 or 2 `Verified` facts from `notes/fact-sheet.md`. Write down the exact mocked numbers (`$180` cap minus `$94.50` booked = `$85.50` left excluding meals/transit, plus one tight ferry transfer).",
          '**Work with your agent:** Run the naive 3-line starter prompt below in a bare chat first and note two things it invents or blurs. Next, open a fresh `PM workspace` Project chat attaching `product-context.md` and `notes/fact-sheet.md`. Build the grounded interactive artifact and refine it one change per message, logging each before-and-after result in `notes/pitch-notes.md`.',
          '**Check and try to break it:** Check every stop price, remaining budget figure and transit gap by hand, confirm the `Prototype. Fictional data.` banner, and test phone width, WCAG AA contrast and colour-independent warnings. Share the link with one cold reader for 30 seconds and ask what they think it does and what feels unclear. Make one logged edit to fix what they misread.',
          '**Make the call:** Record your naive-versus-grounded comparison, single-step edits and cold-reader notes in `notes/pitch-notes.md`. Update `product-context.md` if building exposed a new open decision. Finish `notes/pitch-notes.md` with `What this page does not prove`.',
        ],
      },
      agentPrompt: {
        tool: 'Claude artifacts',
        where:
          'First in a bare chat to see the ungrounded draft; then rewritten in a fresh PM workspace Project chat with product-context.md and notes/fact-sheet.md',
        text: `Build an interactive pitch page for Wayfinder, an AI weekend trip planner that helps friends turn group-chat ideas into a Saturday plan with opening hours, transit times and a shared budget. Include a mocked itinerary screen.

[After seeing the generic first version, rewrite your brief in a fresh chat attaching product-context.md and notes/fact-sheet.md: state who reads it, which Verified facts to cite, the exact $180 minus $94.50 = $85.50 "Left after booked stops (meals and local transit not included)" math and transit-gap check, pinned allergy/step-free badges, the "Prototype. Fictional data." banner, and the one-change-at-a-time rule]`,
      },
      expectedOutput: [
        'A published Wayfinder pitch artifact link, clearly labelled as a prototype with fictional data and hand-reconciled itinerary figures.',
        '`notes/pitch-notes.md`: your 5-line brief, naive-versus-grounded notes, logged one-at-a-time revisions with before/after evidence, cold-reader reaction, and `What this page does not prove`.',
      ],
      artifact: 'A live pitch page link plus `notes/pitch-notes.md` in `workspace/`.',
      verification: [
        'Every factual claim on the page appears as `Verified` in `notes/fact-sheet.md`, with its source shown.',
        'Every stop price, transit duration and remaining-budget figure on the mocked screen adds up when checked by hand.',
        'The page works cleanly on a phone, displays the prototype banner, never shows a tight transfer or budget warning by colour alone, and contains no personal data.',
        'Your revision log ties each single-step change to a specific observed problem or cold-reader confusion.',
      ],
      reflectionPrompts: [
        'What did the naive 3-line version invent (such as auto-booking or vague budget labels) that would have misled your team?',
        'What did your cold reader think the page did in the first 30 seconds, and which single edit fixed the gap?',
        'What promise would you stop a stakeholder from making after seeing this prototype?',
      ],
      checklist: [
        {
          id: 'built',
          text: 'Compared the naive prompt against a page built from `product-context.md` and `notes/fact-sheet.md`',
        },
        {
          id: 'numbers',
          text: 'Checked every itinerary, transit and budget figure by hand and verified colour-independent warnings',
        },
        {
          id: 'published',
          text: 'Published the page, ran a 30-second cold-reader check and logged single-step edits',
        },
        {
          id: 'not-proved',
          text: 'Closed `notes/pitch-notes.md` with `What this page does not prove`',
        },
      ],
      mentorMove:
        'Open the link cold on your phone and say out loud, within 30 seconds, what you think Wayfinder does. Then ask the engineering question: which part of this screen would be hardest to keep accurate across holiday venue closures and live ferry delays, and why?',
      soloMove:
        'Message the published link to a friend on WhatsApp with zero context and ask for a two-sentence reply: "In 30 seconds, what does this do, and what is unclear?" If nobody is free today, step away for an hour, open the link on your phone at 200% zoom, and paste the page copy into a fresh chat instructed to critique it as a sceptical consumer-travel PM.',
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
        'Write a one-page lab report in `workspace/notes/` with your measurements and three practical rules you derived, and add any new terms to `notes/glossary.md`.',
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
          resourceId: 'anthropic-capabilities-limitations',
          why: 'The Try It Out exercises on next-token prediction and working memory are this lab in course form. Do them before or after the lab.',
          required: false,
        },
        {
          resourceId: 'academy-tokens',
          why: 'How text becomes tokens and why that drives usage limits and cost.',
          required: false,
        },
        {
          resourceId: 'academy-context-cost',
          why: 'How the context window fills, what compaction does and why each turn resends everything, which explains the long-context results you will see.',
          required: false,
        },
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
        'Build your Wayfinder pitch page (or your own product pitch) in Claude artifacts, Lovable and v0 (or Bolt) from the exact same brief and context files, then compare what each tool is good for.',
      steps: [
        'Reuse the brief from `notes/pitch-notes.md`, `product-context.md` and `notes/fact-sheet.md` unchanged, so the only variable is the tool.',
        'Build the page in each tool from a fresh start. Allow yourself the same number of follow-up changes in each, for example three.',
        'Publish or share each version and open all three on your phone.',
        'Score each from 1 to 5 on: faithfulness to the context and facts, whether the numbers add up, accessibility (contrast, colour, phone layout), ease of making one small change, and how easy it was to share.',
        'Note the free-tier limits you hit and what the paid plan would add.',
        'Write `notes/tool-comparison.md`: the scores, one screenshot or link per tool, and which tool you would pick for a quick pitch, a multi-screen flow and a test with real users.',
      ],
      deliverable:
        '`notes/tool-comparison.md` with three versions of the same pitch, scores on five criteria and a recommendation per use.',
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
        'A research answer cites a national tourism statistic with a working link. You want to use it in a leadership review tomorrow. What should you do first?',
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
          text: "An export of last month's customer support tickets, since the assistant will only summarize it.",
        },
        {
          id: 'b',
          text: 'A public statistics agency report on your market, to pull out the figures you need.',
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
        'Published material is safe to paste. Support tickets contain personal data, an unreleased roadmap is confidential, and a credential is a secret: deleting a chat or asking the model not to remember does not undo the exposure. At work, the approved-tool policy decides.',
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
    title: 'Level 1 sign-off: Pitch pack',
    brief:
      "This is a 15 to 20 minute review, not new work. Gather the files you already produced across Sessions 1 to 4 inside `workspace/` (`product-context.md`, `notes/fact-sheet.md`, `notes/pitch-notes.md` with your live artifact link, `notes/glossary.md`, `notes/model-comparison.md` and `notes/delegation-audit.md`) and check that they hold together before Level 2's coding agent reads them.\n\nIf you have a mentor, walk them through the page, the verified facts behind it, and one AI claim or edit you rejected. Working solo? Open your files cold after a short break, read `product-context.md` and the pitch page side by side aloud, and score yourself against the four checks below.",
    deliverables: [
      {
        id: 'context-file',
        text: '`workspace/product-context.md`: one page, every fact sourced or marked `Unknown`, Open decisions listed.',
      },
      {
        id: 'fact-sheet',
        text: '`notes/fact-sheet.md` and `sources/` from Session 3: every `Verified` fact backed by a source you opened, plus `What I could not verify`.',
      },
      {
        id: 'pitch-page',
        text: 'The live Wayfinder pitch page link (showing the prototype banner and reconciled figures) plus `notes/pitch-notes.md`.',
      },
      {
        id: 'foundations',
        text: '`notes/glossary.md`, `notes/model-comparison.md` and `notes/delegation-audit.md` filed in `workspace/`.',
      },
      {
        id: 'rejected-answer',
        text: 'A short note on one AI claim or suggestion you rejected in Sessions 1 to 4, how you caught it, and what you kept instead.',
      },
      {
        id: 'walkthrough',
        text: 'A 15-minute review (with your mentor or as a cold solo check) confirming the pitch page, fact sheet and context file agree.',
      },
    ],
    rubric: {
      correctness:
        'Every factual claim on the pitch page traces to a Verified line in `notes/fact-sheet.md`, and every mocked itinerary and budget figure adds up by hand.',
      quality:
        '`product-context.md` fits on one page with clear Unknowns, and the pitch page is clear in 30 seconds with an honest prototype label.',
      independence:
        'You wrote `product-context.md`, the pitch brief and the source audit in your own words rather than pasting unchecked AI text.',
      judgment:
        'You can point to one AI output you rejected with evidence, and `What this page does not prove` names real product and data limits.',
    },
    privacyNote:
      'Use public sources and fictional data only. No customer, colleague or employer data, and no credentials, in any chat, file or published page.',
    minutes: 20,
    xp: 150,
  },
  nextRecommendation:
    'Move to Level 2. From Session 5 you work with a coding agent (Claude Code on a paid Claude Pro plan, or Codex in ChatGPT). Before opening Session 5, follow the Before Session 5 steps in the [Starter kit](/starter-kit) to set up Git and Claude Code in the Claude desktop Code tab or a terminal of your choice. Because your files already sit inside `workspace/`, Session 5 puts that folder straight under Git and adds `AGENTS.md` pointing at `product-context.md`.',
}
