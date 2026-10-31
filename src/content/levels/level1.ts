import type { Level } from '../types'

export const level1: Level = {
  id: 1,
  slug: 'ai-fluency',
  title: 'AI Fluency',
  theme: 'Understand and use AI effectively',
  summary:
    'Learn how large language models actually work, where they fail, and how to use them with judgment. Every session produces something you keep: a dated model comparison, a verified research brief, an organized learning folder and a weekly review routine. Together they become your Personal Learning Assistant and the seed of your second brain.',
  outcomes: [
    'Explain tokens, context windows and hallucination in language a risk officer or executive understands.',
    'Compare models on real tasks with explicit criteria instead of brand loyalty.',
    'Research a question with AI and verify every material claim against a primary source.',
    'Turn scattered notes into a structured `learning/` folder that both you and an agent can use.',
    'Run a weekly learning and reflection loop where AI drafts and you decide.',
  ],
  badge: {
    name: 'Fluent Operator',
    description:
      'Uses AI every day with judgment: delegates the right work, checks the claims that matter and keeps a learning loop running.',
  },
  lessons: [
    {
      id: 's1',
      levelId: 1,
      number: 1,
      title: 'How models work, and why their answers differ',
      difficulty: 'Foundational',
      minutes: 75,
      tools: ['ChatGPT', 'Claude'],
      prerequisites: [],
      competencies: ['ai-fundamentals', 'prompting-context'],
      xp: 100,
      mentorReview: 'optional',
      goal: 'Explain in plain language how an LLM produces an answer, and compare two models on the same real tasks using explicit criteria.',
      whyItMatters:
        'In a bank, every AI conversation eventually reaches risk, compliance or an engineering lead. A PM who can explain tokens, context windows and hallucination in two minutes makes better calls about what to automate, and earns credibility in those rooms.',
      learn: [
        {
          heading: 'Next-token prediction, at enormous scale',
          paragraphs: [
            'A large language model is trained on a vast amount of text to predict the next small chunk of text, called a **token**. A token is roughly three quarters of an English word; numbers, code and non-English text often use more tokens per word. After this pretraining, the model is further trained on examples and human feedback so that it follows instructions and behaves like an assistant.',
            'When you send a message, the model reads everything in its context and generates the reply one token at a time, each choice conditioned on everything before it. That single mechanism explains a lot. Models are fluent because fluency is what they were trained on. They can be confidently wrong because a plausible sentence and a true sentence look the same to the generation process. And two runs of the same prompt can differ because generation involves sampling from likely continuations, not looking up a stored answer.',
          ],
        },
        {
          heading: "Context windows: the model's working memory",
          paragraphs: [
            'The **context window** is everything the model can see at once: the system instructions, your messages, pasted documents, tool results and its own previous replies. Windows of hundreds of thousands of tokens are now common, but bigger is not the same as better. Material buried in the middle of a long conversation tends to get less attention, and stale or contradictory content competes with what you actually want.',
            "The model does not remember yesterday's chat unless the product deliberately adds a memory feature or you paste the material back in. Treat each conversation as a fresh briefing.",
          ],
          bullets: [
            'Start a new conversation when the topic changes.',
            'Put the most important instructions and material at the start or the end, not in the middle.',
            'Prefer a short, curated document over a long dump of everything you have.',
          ],
        },
        {
          heading: 'Capabilities and failure modes',
          paragraphs: [
            'Current models are strong at drafting, restructuring, summarizing, explaining a topic at different levels, generating options, translating between audiences and writing code. Reasoning or thinking modes, where the model works through a problem before answering, help with multi-step analysis.',
            'They remain risky for exact arithmetic over many figures without a calculator tool, recent events unless web search is on, citations (which can be invented or misattributed), facts specific to your organization, and consistent judgment on ambiguous policy questions. A confident tone is not evidence of accuracy.',
          ],
        },
        {
          heading: 'Compare models like a PM, not a fan',
          paragraphs: [
            'Asking which model is best is the wrong question. Define criteria for the task first: factual accuracy, following constraints, usefulness for the audience, tone, and honesty about uncertainty. Run the same prompt in two tools, blind if someone can relabel the outputs, and score each one.',
            'Models and products change every few months, so any comparison is a dated snapshot. Keep the method, record the date and model names, and rerun it when it matters. That habit is exactly what a team needs when it standardizes on tools.',
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
          resourceId: 'karpathy-deep-dive-llms',
          why: 'The clearest long-form walkthrough of how chat models are built, from pretraining to assistant behavior. Watch the first part for this session.',
          required: true,
        },
        {
          resourceId: 'karpathy-how-i-use-llms',
          why: 'A practitioner tour of everyday model use across tools, useful for seeing what different features are good at.',
          required: false,
        },
        {
          resourceId: 'anthropic-ai-fluency',
          why: 'A structured framework for working with AI deliberately: delegating, describing tasks and judging outputs.',
          required: false,
        },
      ],
      task: {
        summary:
          'Build a mental model of how LLMs work, then run a structured head-to-head comparison of ChatGPT and Claude on three tasks from your real work.',
        steps: [
          "Watch the 3Blue1Brown explainer, then the opening part of Karpathy's deep dive until tokens and pretraining make sense. Write five bullet notes in your own words.",
          'Pick three realistic banking PM tasks that contain no confidential data. For example: rewrite a feature announcement for customers with low financial confidence; summarize a public regulator speech on consumer duty or fair treatment; draft ten interview questions about running short of money before payday.',
          'Write one prompt per task that states the role, goal, audience, constraints and output format.',
          'Run each prompt in ChatGPT and in Claude, each in a fresh chat. Paste the outputs into one document, labeled A and B. If your mentor is available, let them relabel the outputs so you score blind.',
          'Score every output from 1 to 5 on factual accuracy, constraint following, usefulness and honesty about uncertainty. Note the sentence that drove any low score.',
          'Rerun one prompt twice in the same tool and note how much the answer changes.',
          'Write a one-page dated note: which tool you would use for which task and why, plus three things you now understand about tokens, context windows and hallucination.',
        ],
      },
      agentPrompt: {
        tool: 'ChatGPT or Claude',
        where: 'A fresh chat, only after you have scored the outputs yourself',
        text: `I am comparing two AI model outputs for the same task. I have already scored them myself. I want a second opinion, not a replacement for my judgment.

Task given to both models:
[paste the original prompt]

Output A:
[paste output A]

Output B:
[paste output B]

Please:
1. Score each output from 1 to 5 on: factual accuracy, following the stated constraints, usefulness for the stated audience, and honesty about uncertainty.
2. Quote the exact sentence behind every score below 4.
3. List any factual claims in either output that should be checked against a primary source.
4. Say which output you would choose for this task and why, in three sentences.

Constraints:
- Do not guess which model wrote which output.
- If you are unsure whether a claim is true, say so instead of judging it.
- Format: a Markdown table of scores, then the claim list, then your choice.`,
      },
      expectedOutput: [
        'A comparison table: three tasks, two models, four criteria, with scores and short justifications.',
        'A one-page note explaining tokens, context windows and hallucination in your own words.',
        'A short observation on how much the same prompt varied between runs.',
      ],
      artifact:
        'model-comparison.md: a dated comparison of two models on three real tasks (you will file it in learning/ in Session 3).',
      verification: [
        'You scored all outputs before asking an AI to critique them, and you recorded where you disagreed with its critique.',
        'At least one factual claim from the outputs was checked against a real source.',
        'Your explanation of a context window makes sense when read aloud to someone non-technical.',
        'The note records the date and the model or product names you used.',
      ],
      reflectionPrompts: [
        'Which output surprised you, and what does that tell you about how these models work?',
        'Where did your scoring disagree with the AI critique, and who was right?',
        'What kind of work would you now never delegate without checking?',
      ],
      checklist: [
        {
          id: 'explainers',
          text: 'Watched the explainer videos and wrote five notes in my own words',
        },
        {
          id: 'three-tasks',
          text: 'Ran three real tasks in both ChatGPT and Claude in fresh chats',
        },
        {
          id: 'scored',
          text: 'Scored every output on all four criteria before asking for an AI critique',
        },
        { id: 'variance', text: 'Reran one prompt and recorded how the answer varied' },
        { id: 'note-saved', text: 'Saved the dated comparison note' },
        {
          id: 'no-confidential',
          text: 'Confirmed no confidential, employer or customer data was used in any prompt',
        },
      ],
      mentorMove:
        "Relabel the outputs as A and B so she scores blind. Then ask her to explain a context window to you as if you were the bank's chief risk officer, and push back once with a hard follow-up question.",
    },
    {
      id: 's2',
      levelId: 1,
      number: 2,
      title: 'Research a real question and check every source',
      difficulty: 'Foundational',
      minutes: 90,
      tools: [
        'ChatGPT (web search or deep research)',
        'Claude (web search or research)',
        'A web browser',
      ],
      prerequisites: ['s1'],
      competencies: ['ai-fundamentals', 'evals-safety', 'product-discovery'],
      xp: 150,
      mentorReview: 'recommended',
      practicalProof: true,
      safetyCritical: true,
      goal: 'Use AI research tools to answer a real question, then verify every material claim against a primary source and label your confidence.',
      whyItMatters:
        'AI research features produce polished, cited reports in minutes. In banking, a single fabricated statistic in a steering committee deck or a misread regulation costs credibility, or worse. The valuable skill is not getting an answer; it is knowing which parts of the answer you can stand behind.',
      learn: [
        {
          heading: 'Why fluent answers can be wrong',
          paragraphs: [
            'Generation optimizes for plausible text, so a model can produce a statistic, a quote or a citation that looks right and is not. Citations fail in three ways: the source does not exist, the source exists but does not say what is claimed, or the source is real but outdated or about a different market.',
            'Web search and deep research modes reduce invented sources because the model reads real pages. They do not remove the problem. The model can still over-trust a weak page, merge two numbers, or summarize a nuanced finding into something stronger than the original.',
          ],
        },
        {
          heading: 'Claim-level verification',
          paragraphs: [
            'Break any AI report into atomic claims, then sort them. **Material claims** would change a decision if they were wrong; **background claims** would not. You verify every material claim and sample the rest.',
            'For each material claim, open the source yourself and check four things: it exists, it says what is claimed, the date is current enough, and it applies to your geography and customer segment. Then label the claim.',
          ],
          bullets: [
            '**Verified**: the source says exactly this.',
            '**Partly supported**: the source says something weaker, older or narrower.',
            '**Unsupported**: no source, or the source does not say it.',
            '**Contradicted**: a better source says otherwise.',
          ],
        },
        {
          heading: 'Primary, secondary and anecdote',
          paragraphs: [
            'Primary sources are regulators, central banks, national statistics offices, official company publications and peer-reviewed studies. Secondary sources are reputable journalism and analyst reports that interpret primary material. Blogs, AI summaries and forums are useful for sentiment, language and pain points, but they are not evidence for facts.',
            'This hierarchy matters for product work too. A Reddit thread full of people describing overdraft anxiety is a great discovery signal. It is not a market size.',
          ],
        },
        {
          heading: 'Deep research: when it helps',
          paragraphs: [
            'Deep research modes run an agent that searches many pages and writes a long report. They are excellent for landscape scans, competitor overviews and finding sources you would not have found. They are slow, and they need the same verification as anything else.',
            'Brief them like you would brief an analyst: scope, geography, time window, required source types, and an instruction to separate what was found from what was inferred. Running the same brief in a second tool is a cheap cross-check: where two reports disagree is where you look first.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'anthropic-ai-fluency',
          why: 'Gives you language for discernment: judging AI output critically rather than accepting fluent text.',
          required: true,
        },
        {
          resourceId: 'karpathy-how-i-use-llms',
          why: 'Shows search-enabled and deep research tools in practice, including where they help and where they need checking.',
          required: false,
        },
        {
          resourceId: 'openai-academy',
          why: 'Free introductory material on using ChatGPT features, including search and research, if you want guided practice.',
          required: false,
        },
        {
          resourceId: 'simon-willison-blog',
          why: 'A respected practitioner who regularly tests AI research and search features and documents where they go wrong.',
          required: false,
        },
      ],
      task: {
        summary:
          'Answer a real question with two AI research tools, then build a claim-by-claim verification table and a one-page verified brief.',
        steps: [
          'Choose a real question with publicly verifiable answers. A good one for this course: "What share of adults in my country report running short of money before payday, and what do banks and fintechs currently offer to help?"',
          'Write a research brief: the question, geography, time window (last 24 months), required source types and the output format. Use the agent prompt below as a starting point.',
          'Run the brief in ChatGPT and in Claude with web search or research mode switched on. Save both reports.',
          'Extract the ten most material claims across both reports into a table with columns: claim, cited source, label, my evidence link, date of source.',
          'Open every cited source yourself. Label each claim Verified, Partly supported, Unsupported or Contradicted.',
          'Find at least one relevant primary source that neither tool cited, for example a central bank survey or a national statistics release.',
          'Write a one-page verified brief with a confidence label for each section and a short list titled "What I could not verify".',
        ],
      },
      agentPrompt: {
        tool: 'ChatGPT or Claude with web search or deep research',
        where: 'A fresh chat with search or research mode enabled',
        text: `Research question: [your question]

Scope:
- Geography: [country or region]
- Time window: sources published in the last 24 months, unless a foundational source is older
- Audience: a product manager preparing an internal briefing

Source requirements:
- Prefer primary sources: regulators, central banks, national statistics offices, official company publications, peer-reviewed studies.
- Use reputable press or analyst reports only when no primary source exists, and label them secondary.
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
        'A verification table of ten material claims, each labeled with your own evidence link.',
        'A one-page verified brief with section-level confidence labels.',
        'A list of claims you could not verify, plus any fabricated or misattributed citations you found.',
      ],
      artifact:
        'verified-brief.md: a one-page research brief backed by a ten-claim verification table.',
      verification: [
        'Every material claim has a source link that you opened and read yourself.',
        'At least one primary source is included that the AI tools did not cite.',
        'Every number matches its source exactly, including date, unit and geography.',
        'You either identified at least one discrepancy or wrote down that all ten claims held up after checking.',
      ],
      reflectionPrompts: [
        'What share of the claims held up, and what kind of failure did you see most?',
        'Where did the two tools disagree, and which one was closer to the primary source?',
        'How will you change the way you use AI research in your work from February?',
      ],
      checklist: [
        {
          id: 'brief',
          text: 'Wrote a research brief with scope, time window and source requirements',
        },
        { id: 'two-tools', text: 'Ran the brief in two different AI research tools' },
        { id: 'ten-claims', text: 'Extracted ten material claims into a verification table' },
        { id: 'opened-sources', text: 'Opened every cited source myself and labeled each claim' },
        { id: 'primary-source', text: 'Added at least one primary source the AI did not cite' },
        {
          id: 'confidence',
          text: 'Wrote the verified brief with confidence labels and a could-not-verify list',
        },
      ],
      mentorMove:
        'Pick two claims she marked Verified and check them yourself while she watches. Then show her how you ask a model to separate what it found from what it inferred, and how you spot a citation that exists but does not support the claim.',
    },
    {
      id: 's3',
      levelId: 1,
      number: 3,
      title: 'Organize your learning notes with AI',
      difficulty: 'Foundational',
      minutes: 75,
      tools: ['Claude or ChatGPT', 'Claude Code or Codex (optional)', 'A text editor or Obsidian'],
      prerequisites: ['s1', 's2'],
      competencies: ['knowledge-management', 'prompting-context'],
      xp: 120,
      mentorReview: 'optional',
      goal: 'Turn the scattered notes from your first two sessions into a structured `learning/` folder of Markdown files that both you and an AI can use.',
      whyItMatters:
        'Most PMs have their learning scattered across chats, screenshots, documents and bookmarks. AI is excellent at restructuring messy notes, but only if you decide the structure. This folder becomes the seed of the second brain you build in Level 2.',
      learn: [
        {
          heading: 'Markdown in ten minutes',
          paragraphs: [
            'Markdown is plain text with light formatting: `#` for headings, `-` for bullets, `**bold**`, `[link text](url)` and `>` for quotes. It reads well as raw text, opens in any editor, renders nicely in Obsidian and GitHub, and is the native format of AI agents. Files you write today will still open in twenty years.',
            'Because it is plain text, version control can show exactly what changed between two versions of a note. That becomes important when an agent edits your files for you.',
          ],
        },
        {
          heading: 'Atomic notes beat long transcripts',
          paragraphs: [
            'An **atomic note** covers one idea. Its title states the idea as a claim or question, for example `context-windows-degrade-in-the-middle.md` rather than `session-1-notes.md`. Each note carries its source and date and links to related notes.',
            'This matters for AI as much as for you. Agents find information by file names, headings and keywords. Small focused notes are found and quoted accurately; a forty-page transcript is found and then misread.',
          ],
        },
        {
          heading: 'You own the structure, AI does the labor',
          paragraphs: [
            'The reliable delegation pattern is: you define the folders and the template, the AI proposes how to split, title and file the material, you approve the plan, then the AI writes the files. Asking for a plan first is the single most useful habit when an AI touches your files.',
          ],
          bullets: [
            'Keep originals in `00-inbox/` until you have reviewed the result.',
            'Never let an AI delete source material in the same step it creates summaries.',
            'Spot-check a few notes against the originals: did any idea disappear?',
          ],
        },
        {
          heading: 'Questions are first-class notes',
          paragraphs: [
            'Keep a running `open-questions.md`. Unanswered questions are what turn passive reading into directed learning, and AI is good at extracting the questions implied by your notes. In Session 4, this file becomes one of the inputs to your weekly review.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'anthropic-prompting-docs',
          why: 'Explains how to structure instructions with clear sections, examples and output formats, which is exactly what a reorganization prompt needs.',
          required: true,
        },
        {
          resourceId: 'obsidian',
          why: 'An optional, free-for-personal-use editor that shows your Markdown folder as a linked knowledge base without locking you in.',
          required: false,
        },
        {
          resourceId: 'vellotti-free-courses',
          why: 'Practical, PM-oriented material on working with AI on real files, useful if you want to try the file-based agent route now.',
          required: false,
        },
      ],
      task: {
        summary:
          'Create a private `learning/` folder, define a note template, and use AI to turn your raw notes into atomic, sourced notes with an index and an open-questions list.',
        steps: [
          'Create `~/second-brain/learning/` and `~/second-brain/00-inbox/` on your own computer. Do not put them in a shared drive or any public repository.',
          'Drop your raw material from Sessions 1 and 2 into `00-inbox/`: the model comparison, the verified brief, and any chat answers worth keeping, saved as `.md` or `.txt`.',
          'Create `learning/_template.md` with these headings: Title, Date, Source, Key ideas, My take, Open questions, Related notes.',
          'Paste the inbox material and the template into Claude or ChatGPT with the prompt below. Ask for a reorganization plan first.',
          'Review the plan. Rename anything vague, merge or split notes, then approve and let the AI write the notes. Save each one as its own file in `learning/`.',
          'Create `learning/index.md` (every note with a one-line summary) and `learning/open-questions.md`.',
          'Optional: open `~/second-brain` in Obsidian, or start Claude Code or Codex inside `~/second-brain` and let it do steps 4 to 6 directly on the files.',
        ],
      },
      agentPrompt: {
        tool: 'Claude, ChatGPT, Claude Code or Codex',
        where:
          'A chat with your inbox notes pasted in, or Claude Code or Codex started inside ~/second-brain',
        text: `You are helping me organize my personal learning notes into a Markdown folder I own.

Inputs: the raw notes below (or the files in 00-inbox/ if you can read files), and my note template in learning/_template.md.

Step 1, plan only. Propose how to split the material into atomic notes, one idea per note. For each proposed note give: file name (lowercase-with-hyphens.md), a title phrased as a claim or question, source, date, and which raw note it comes from. Also list the open questions you found. Then stop and wait for my approval.

Step 2, after I approve: write each note using my template exactly. Then create:
- learning/index.md: every note with a one-line summary and a relative link
- learning/open-questions.md: each question with a link to the note it came from

Rules:
- Do not drop any idea from the raw notes. If something does not fit, list it under "Unfiled" in the plan.
- Do not add facts that are not in my notes. Mark your own suggestions with "Suggestion:".
- Never delete or overwrite files in 00-inbox/. I will archive them myself after review.
- Use US spelling and plain Markdown only.

[paste raw notes here if you are using a chat]`,
      },
      expectedOutput: [
        'A `learning/` folder with five to ten atomic notes, each with a source and a date.',
        '`learning/index.md` and `learning/open-questions.md`.',
        '`learning/_template.md`, the template you will reuse for every future note.',
      ],
      artifact:
        '~/second-brain/learning/: an index, a template, atomic notes and an open-questions list.',
      verification: [
        'Every note has a source and a date.',
        'You spot-checked three notes against the originals and no idea was lost or invented.',
        'Every link in index.md opens the right note.',
        'open-questions.md contains at least five questions you genuinely want answered.',
      ],
      reflectionPrompts: [
        "Which part of the plan did you change, and why did the AI's first proposal miss it?",
        'Did reorganizing your notes change what you think you learned?',
        'What would make you trust an AI to reorganize your files without a plan step, if anything?',
      ],
      checklist: [
        {
          id: 'private-folder',
          text: 'Created ~/second-brain with learning/ and 00-inbox/ in a private location',
        },
        { id: 'template', text: 'Wrote learning/_template.md' },
        {
          id: 'plan-reviewed',
          text: 'Asked for a plan first and changed at least one thing before approving',
        },
        { id: 'notes-saved', text: 'Saved at least five atomic notes with source and date' },
        { id: 'index-questions', text: 'Created index.md and open-questions.md' },
        { id: 'spot-check', text: 'Spot-checked three notes against the originals' },
      ],
      mentorMove:
        'Show her how to start Claude Code or Codex inside ~/second-brain and ask it to list the files and summarize the index. Spend ten minutes, and let her type every command herself.',
    },
    {
      id: 's4',
      levelId: 1,
      number: 4,
      title: 'Build a weekly learning and reflection workflow',
      difficulty: 'Foundational',
      minutes: 75,
      tools: ['Claude or ChatGPT', 'Your calendar', 'Your learning/ folder'],
      prerequisites: ['s3'],
      competencies: ['prompting-context', 'knowledge-management', 'ai-fundamentals'],
      xp: 130,
      mentorReview: 'recommended',
      goal: 'Design and run a repeatable weekly workflow in which AI summarizes your week, surfaces gaps and drafts reflection questions, and you write the conclusions.',
      whyItMatters:
        'The AI landscape shifts every month. A weekly loop is how you keep up without drowning. When you return to work, the same pattern powers weekly status notes, stakeholder updates and team retrospectives. It is also your first reusable prompt, which becomes a skill in Level 2.',
      learn: [
        {
          heading: 'Prompts versus context',
          paragraphs: [
            "A **prompt** is the instruction for this turn. **Context** is everything the model sees: instructions, documents, examples, history and tool results. Most quality gains come from better context, not cleverer wording. A weekly review prompt without the week's actual notes will produce confident, generic text.",
            'When an output disappoints, ask what the model was missing before you rewrite the instruction. That question, more than any prompt trick, is the core of what is now called context engineering.',
          ],
        },
        {
          heading: 'Structured instructions that survive reuse',
          paragraphs: [
            'A reusable prompt has the same parts as a good brief to a colleague. Separate instructions from material using headings or tags, and include an example of a good output when you have one.',
          ],
          bullets: [
            '**Role**: who the model is acting as.',
            '**Inputs**: exactly what material it will receive.',
            '**Steps**: what to do, in order.',
            '**Output format**: headings, length, tone.',
            '**Rules**: what it must not do, such as inventing activity you did not do.',
          ],
        },
        {
          heading: 'When to delegate, and when not to',
          paragraphs: [
            'A simple delegation test has two axes: how much judgment the task needs, and how costly a mistake would be. High-volume, low-judgment work such as summarizing, formatting and first drafts can be delegated with spot checks. High-judgment, high-stakes work such as priorities, feedback to people and what you believe stays with you; AI can challenge your thinking but should not do it for you.',
            'Reflection sits firmly in the second group. Let the AI gather what happened and suggest questions. Write the answers yourself, because the thinking is the point.',
          ],
        },
        {
          heading: 'Make it a ritual, then improve it',
          paragraphs: [
            'Fix a time, keep it to thirty minutes, and use the same inputs every week. Judge the workflow by one measure: did it change what you do next week? Each week, note one thing the output got wrong and adjust the prompt. Small, regular improvements to your own tools are exactly how strong AI users get strong.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'anthropic-prompting-docs',
          why: 'The reference for structuring prompts with sections, examples and clear output formats.',
          required: true,
        },
        {
          resourceId: 'anthropic-ai-fluency',
          why: 'Useful framing for deciding what to delegate and how to keep your own judgment in the loop.',
          required: false,
        },
        {
          resourceId: 'how-i-ai',
          why: 'Practitioners demonstrate their real AI workflows, a good source of ideas for your own routine.',
          required: false,
        },
      ],
      task: {
        summary:
          "Write a reusable weekly review prompt, run it on this week's notes, edit the result into a real reflection, improve the prompt once and schedule the ritual.",
        steps: [
          "Define the workflow on one page: trigger (for example Friday evening, 30 minutes), inputs (notes created this week, open-questions.md, your study log from this Academy, last week's priorities) and outputs (summary, priorities check, open questions, next week's three priorities, reflection).",
          'Write a reusable prompt using the structure from this lesson and save it as `~/second-brain/templates/weekly-review-prompt.md`.',
          "Run it in Claude or ChatGPT with this week's inputs pasted in.",
          'Edit the draft. Rewrite the reflection in your own words; the AI provides scaffolding, not conclusions.',
          'Save the result as `~/second-brain/reflections/weekly/2026-W45.md`, using the current ISO week number.',
          'Note one thing the output got wrong or missed, change the prompt to fix it, rerun and compare. Save the improved prompt as v2.',
          'Add a recurring 30-minute block to your calendar for the weekly review.',
        ],
      },
      agentPrompt: {
        tool: 'Claude or ChatGPT',
        where: "A fresh chat, with this week's notes pasted below the prompt",
        text: `# Role
You are my weekly learning reviewer. You prepare a draft; I make the conclusions.

# Inputs
- Notes I created or changed this week: [paste them or list the files]
- learning/open-questions.md: [paste]
- My study log from the Academy: [paste minutes and sessions]
- Last week's priorities: [paste, or write "first week"]

# Steps
1. Summarize what I actually studied and produced this week, citing the note for each item.
2. Compare against last week's priorities: done, partly done, not started.
3. List open questions that are still unanswered, plus new ones implied by my notes.
4. Point out patterns: topics I keep returning to, things I avoid, where my understanding looks shaky.
5. Propose three priorities for next week, each tied to a goal or an open question.
6. Draft five reflection questions for me. Do not answer them.

# Output format
Markdown with the headings: Summary, Priorities check, Open questions, Patterns, Next week, Reflection questions.

# Rules
- Use only what is in the inputs. If something is unclear, write "unclear from notes".
- Never invent activity, progress or feelings.
- Keep the whole draft under 500 words.`,
      },
      expectedOutput: [
        '`templates/weekly-review-prompt.md`, version 2.',
        'Your first weekly reflection in `reflections/weekly/`, with the reflection section written by you.',
        'A recurring calendar event for the weekly review.',
      ],
      artifact: 'A reusable weekly review prompt (v2) and your first weekly reflection file.',
      verification: [
        'The summary mentions only things that appear in your notes, with no invented activity.',
        'Every open question can be traced back to a note.',
        'Prompt v2 fixes a specific, named problem from v1.',
        'The reflection section is in your own words, not the AI draft.',
      ],
      reflectionPrompts: [
        'What did the AI notice about your week that you had missed?',
        'What did v1 get wrong, and was the fix a better instruction or better context?',
        'Which part of your pre-leave work week could run on a loop like this?',
      ],
      checklist: [
        {
          id: 'workflow-defined',
          text: 'Defined trigger, inputs and outputs for the weekly workflow',
        },
        { id: 'prompt-saved', text: 'Saved the structured prompt in templates/' },
        { id: 'first-run', text: "Ran it on this week's real notes" },
        {
          id: 'own-reflection',
          text: 'Rewrote the reflection section in my own words and saved it',
        },
        { id: 'prompt-v2', text: 'Improved the prompt once based on a specific problem' },
        { id: 'calendar', text: 'Scheduled a recurring weekly review' },
      ],
      mentorMove:
        'Read her v1 and v2 prompts and suggest one improvement about context (what input is missing), not wording. Then share your own weekly review routine as a concrete example.',
    },
  ],
  challenges: [
    {
      id: 'c1',
      levelId: 1,
      title: 'Model behavior lab: tokens, variation and long context',
      difficulty: 'Intermediate',
      minutes: 120,
      competencies: ['ai-fundamentals', 'prompting-context'],
      xp: 150,
      suggestedWindow: 'December 2026',
      summary:
        'Run three small experiments that turn abstract concepts into things you have seen with your own eyes: token counts across languages, output variation, and how retrieval degrades inside long context.',
      steps: [
        "Paste the same paragraph in English and in another language you speak into a public tokenizer tool (for example the tokenizer page on OpenAI's platform) and record the token counts. Do the same for a paragraph full of numbers.",
        'Ask the same open-ended question five times in fresh chats. Record which parts stay stable and which change.',
        "Take a long public document, such as a bank's annual report. Insert one specific made-up fact (clearly labeled as a test) near the start, then in the middle, then near the end in three separate chats. Ask a question that depends on that fact each time.",
        'Repeat the long-context test with the fact moved into a short, separate document pasted at the end of your message.',
        'Write a one-page lab report with your measurements and three practical rules you derived.',
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
      title: 'Delegation audit of a real work week',
      difficulty: 'Intermediate',
      minutes: 120,
      competencies: ['ai-leadership', 'ai-fundamentals'],
      xp: 150,
      suggestedWindow: 'January 2027',
      summary:
        'Reconstruct a typical pre-leave work week and design how you will work differently in February, task by task, with honest risk notes.',
      steps: [
        'From memory and your calendar, list twenty recurring tasks from a typical week. Use generic descriptions only; no confidential details.',
        'Place each task on the delegation grid: judgment needed versus cost of a mistake.',
        'For the five most promising tasks, design the AI-assisted version: tool, inputs, prompt or skill, and what you will always check.',
        'Estimate time saved per week, and name the main risk for each of the five.',
        'Review the audit with your mentor and agree which two changes you will try in your first month back.',
      ],
      deliverable:
        'A delegation audit: twenty tasks on the grid, five redesigned workflows with risks, and two first-month experiments.',
      verification: [
        'Every redesigned workflow names what you will verify and how.',
        "No task containing customer data is delegated without noting your employer's approved-tool policy.",
        'Your mentor challenged at least one estimate and you recorded the outcome.',
      ],
      resources: [
        {
          resourceId: 'anthropic-ai-fluency',
          why: 'Its delegation framing helps you separate what AI should do from what you should.',
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
        'A colleague pastes a 300-page policy document and a long chat history into an assistant and asks a precise question. The answer misses a clause on page 140. What is the most likely cause?',
      options: [
        { id: 'a', text: 'The model is broken and should be reported to the vendor.' },
        {
          id: 'b',
          text: 'Material buried in the middle of a long context tends to get less attention and competes with irrelevant content.',
        },
        { id: 'c', text: 'Models cannot read policy documents.' },
        { id: 'd', text: 'The model deliberately skips legal text for safety reasons.' },
      ],
      correct: 'b',
      explanation:
        'Large context windows do not guarantee equal attention to everything in them. Narrowing the input to the relevant sections, or asking the model to quote the clause it relies on, usually fixes this.',
    },
    {
      id: 'q1-2',
      competency: 'ai-fundamentals',
      prompt:
        'You run the same prompt twice in the same tool and get noticeably different answers. Why?',
      options: [
        { id: 'a', text: 'The model learned from your first conversation and improved.' },
        {
          id: 'b',
          text: 'Generation samples from likely continuations token by token, so outputs vary between runs.',
        },
        { id: 'c', text: "The vendor routes each request to a random different company's model." },
        { id: 'd', text: 'Something is wrong with your account.' },
      ],
      correct: 'b',
      explanation:
        'Variation comes from sampling during generation, not from learning between chats. This is why you test important prompts more than once and judge the range of outputs, not a single run.',
    },
    {
      id: 'q1-3',
      competency: 'evals-safety',
      prompt:
        'A deep research report cites a regulator statistic with a working link. You want to use it in a steering committee deck tomorrow. What should you do first?',
      options: [
        { id: 'a', text: 'Use it; a working link means the citation is correct.' },
        { id: 'b', text: 'Ask the same tool whether the statistic is correct.' },
        {
          id: 'c',
          text: 'Open the source and confirm the number, unit, date and population match the claim.',
        },
        { id: 'd', text: 'Remove the citation so nobody questions it.' },
      ],
      correct: 'c',
      explanation:
        'Citations can exist yet not support the claim, or be outdated or about a different market. A working link proves only that a page exists. Material claims need your own check against the source.',
    },
    {
      id: 'q1-4',
      competency: 'ai-fundamentals',
      prompt: 'Which task is the best candidate for delegating to AI with light spot-checking?',
      options: [
        { id: 'a', text: "Reformatting raw meeting notes into your team's standard template." },
        { id: 'b', text: 'Deciding which roadmap item to cut this quarter.' },
        { id: 'c', text: "Writing a direct report's performance feedback." },
        { id: 'd', text: 'Calculating final customer interest charges for a release.' },
      ],
      correct: 'a',
      explanation:
        'Reformatting is high volume and low judgment, and mistakes are cheap and easy to see. Prioritization and feedback need your judgment, and customer charges need deterministic calculation and controls, not a language model.',
    },
    {
      id: 'q1-5',
      competency: 'prompting-context',
      prompt:
        "Your weekly review output reads as generic and could describe anyone's week. What is the best fix?",
      options: [
        { id: 'a', text: 'Add "be more insightful and specific" to the prompt.' },
        { id: 'b', text: 'Switch to a different model.' },
        {
          id: 'c',
          text: "Provide the week's actual notes, open questions and priorities as inputs, and require it to cite the note for each point.",
        },
        { id: 'd', text: 'Make the prompt shorter.' },
      ],
      correct: 'c',
      explanation:
        'Generic output usually signals missing context, not weak wording. Supplying the real material and requiring citations grounds the output in your actual week.',
    },
    {
      id: 'q1-6',
      competency: 'ai-fundamentals',
      prompt: "Which statement about a model's tone is accurate?",
      options: [
        { id: 'a', text: 'A confident answer is more likely to be correct than a hedged one.' },
        { id: 'b', text: 'Models only state things confidently when they have verified them.' },
        { id: 'c', text: "A model's confident tone is not a reliable indicator of accuracy." },
        { id: 'd', text: 'Hedged answers are always wrong.' },
      ],
      correct: 'c',
      explanation:
        'Fluency and confidence come from training on human writing, not from verification. Judge claims by evidence, and treat a model admitting uncertainty as useful information.',
    },
    {
      id: 'q1-7',
      competency: 'knowledge-management',
      prompt:
        'Why do atomic notes with a clear title, source and date work better with AI agents than one long notes file per week?',
      options: [
        { id: 'a', text: 'Agents cannot open files longer than a page.' },
        {
          id: 'b',
          text: 'Agents find information through names, headings and keywords, so focused notes are retrieved and quoted accurately, and dates show what is current.',
        },
        { id: 'c', text: 'Long files use more disk space.' },
        { id: 'd', text: 'Atomic notes are only better for human readers.' },
      ],
      correct: 'b',
      explanation:
        'Retrieval works on structure. Clear titles and small scopes make the right note easy to find, and dates and sources let both you and the agent judge freshness and reliability.',
    },
    {
      id: 'q1-8',
      competency: 'ai-leadership',
      prompt:
        'Last month your comparison found Claude better than ChatGPT for summarizing research. A colleague asks which tool the team should standardize on. What is the best response?',
      options: [
        { id: 'a', text: 'Claude, because it won the comparison.' },
        {
          id: 'b',
          text: "Share your method and dated results, then propose rerunning it with the team's own tasks on current versions before deciding.",
        },
        { id: 'c', text: 'It does not matter; all models are the same.' },
        { id: 'd', text: 'Whichever tool is cheapest.' },
      ],
      correct: 'b',
      explanation:
        "Models change frequently and performance depends on the task. A repeatable method and the team's own tasks are worth more than a past winner. Cost and approved-tool policy also matter, alongside quality.",
    },
  ],
  project: {
    title: 'Personal Learning Assistant',
    brief:
      'Combine Sessions 1 to 4 into a small system you will actually use for the rest of the course: a folder, a set of reusable prompts and a weekly routine that organizes learning materials, summarizes lessons, surfaces unanswered questions and prepares a weekly reflection. Run it in a Claude Project, a ChatGPT Project, or Claude Code or Codex started inside ~/second-brain. The notes it produces are the first content of your Level 2 second brain.',
    deliverables: [
      {
        id: 'instructions',
        text: 'Written instructions for the assistant (project instructions or a file) stating its role, inputs, outputs and what it must never do.',
      },
      {
        id: 'prompt-set',
        text: 'At least three saved, reusable prompts: summarize a lesson, extract open questions, prepare the weekly reflection.',
      },
      {
        id: 'learning-folder',
        text: 'A learning/ folder with an index, a template and at least eight atomic notes from Level 1.',
      },
      {
        id: 'verified-brief',
        text: 'The verified research brief from Session 2, filed in the folder.',
      },
      {
        id: 'two-reflections',
        text: 'Two weekly reflections produced with the workflow and edited by you.',
      },
      {
        id: 'limits',
        text: "A short note on the assistant's limits: what it gets wrong and what you always check.",
      },
      {
        id: 'demo',
        text: 'A five-minute live demo to your mentor: run the assistant on a new piece of material.',
      },
    ],
    rubric: {
      correctness:
        "Summaries and questions are faithful to the source material; spot checks find no invented content; the research brief's claims hold up when the mentor checks two of them.",
      quality:
        'Notes are atomic, titled, dated and sourced; prompts are structured well enough that someone else could reuse them without explanation.',
      independence:
        'You built and ran the system yourself; the mentor answered questions but did not set it up or write the prompts.',
      judgment:
        'You can say what you delegate, what you check and why; the limits note names real failure modes you observed, not generic warnings.',
    },
    minutes: 180,
    xp: 400,
  },
  nextRecommendation:
    'Move to Level 2. Your learning/ folder and weekly prompt become the first pieces of a full second brain. If the weekly loop still feels shaky, run it for one more week before adding more structure.',
}
