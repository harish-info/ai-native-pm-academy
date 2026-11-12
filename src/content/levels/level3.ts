import type { Level } from '../types'

export const level3: Level = {
  id: 3,
  slug: 'discover-and-decide',
  title: 'Discover and decide',
  theme:
    'Test the MoneyPilot hypothesis with strategy, user conversations, funnel data and a buildable PRD',
  summary:
    'Treat your Level 2 MoneyPilot discovery probe as one hypothesis to test rather than a settled plan. Answer "why this, why now?" with source-pinned research, run story-based interviews and usability tests (with five checked-in MoneyPilot notes as a safety net), audit a 600-user funnel event log by hand before scoring bets with RICE, and write a v1 PRD covering both the deterministic Safe-to-Spend screen and the approval-gated Ask MoneyPilot drawer.',
  outcomes: [
    'Write a one-page strategy kernel and a market map where every claim links to an unedited page saved in `sources/market/`.',
    'Run consented user interviews and probe usability tests, synthesise by hand before comparing with Claude, and build a quote-traced Opportunity Solution Tree.',
    'Write metric definitions before looking at results, audit `s11-events.csv` for duplicate rows and denominator traps in a spreadsheet, and score candidate bets with evidence-weighted RICE.',
    'Compare deterministic code against AI options, estimate range impact and operating cost, and choose a bounded v1 bet (or recommend not building).',
    'Brief and review `prd/prd.md` with `always / ask first / never` contracts, concrete `Given / when / then` criteria, three fresh-session role reviews and a cold agent blocker check.',
  ],
  badge: {
    name: 'Evidence-Led PM',
    description:
      'Took MoneyPilot from "why this, why now?" to a reviewed PRD, with every claim traced to a saved source, an interview quote or a figure checked by hand.',
  },
  lessons: [
    {
      id: 's9',
      levelId: 3,
      number: 9,
      title: 'Strategy and market',
      difficulty: 'Intermediate',
      minutes: 90,
      tools: ['Claude Code (terminal or desktop Code tab), with web search', 'Your workspace'],
      prerequisites: ['s8'],
      competencies: ['product-discovery', 'ai-leadership'],
      xp: 125,
      mentorReview: 'optional',
      goal: 'Answer leadership\'s "why this, why now?" for MoneyPilot with a source-pinned market map and a one-page strategy kernel, saving every raw page unedited in `sources/market/`.',
      whyItMatters:
        'Your Level 2 discovery probe made MoneyPilot concrete: on the 14th of the month a retail bank balance says `14,000 kr`, while `12,500 kr` of scheduled `AvtaleGiro`, `eFaktura` and recurring card charges leave before payday on the 25th, leaving `1,500 kr` safe for bills. Now leadership asks why this problem matters now, how existing apps and customer habits handle it, and what MoneyPilot will refuse to build. One invented competitor claim in a strategy review loses the room.',
      learn: [
        {
          heading: 'Start from the outcome and treat the probe as a guess',
          paragraphs: [
            'Outcome-led teams own a measurable customer problem rather than a feature wish-list: for MoneyPilot, reducing unplanned pre-payday shortfalls among monthly-paid retail bank customers across a 30-day pay cycle, not "shipping an AI assistant". State who is in that population and over what window you will measure success so leadership sees a clear line from customer pain to business value.',
            'Your Level 2 probe was cheap to build so people could react to concrete numbers (`14,000 kr` balance minus `12,500 kr` scheduled bills = `1,500 kr`), yet it remains a hypothesis. When coding agents make building fast, deciding what *not* to build becomes the bottleneck. Test whether deterministic bill maths solves most of the job, where plain-language answers help, and when "do not build AI here" is the smartest call.',
          ],
        },
        {
          heading: 'One-page strategy kernel',
          illustration: 'strategy',
          paragraphs: [
            "Richard Rumelt's strategy kernel fits on one page in three parts: a **diagnosis** naming the evidence-backed crux of why the problem is hard today, a **guiding policy** stating the approach that tackles that crux by ruling options out, and **coherent actions** listing three to five mutually reinforcing steps including **what we will not do**.",
            'Goals dressed up as strategy ("become the most trusted money coach"), buzzword prose, unprioritised feature lists, or copying a neobank without your own diagnosis are signs of bad strategy. Ruling out automatic money movement and regulated `Finanstilsynet` investment or debt advice is what gives MoneyPilot\'s guiding policy teeth.',
          ],
        },
        {
          heading: 'Parallel research slices and source-pinned claims',
          paragraphs: [
            'Split market research into three narrow slices across parallel Claude Code sessions or subagents: Norwegian retail bank apps and `AvtaleGiro` or `eFaktura` bill views, standalone budgeting or AI money tools, and everyday workarounds (spreadsheets, separate bill accounts, payday calendar alerts) plus public user complaints.',
            'Watch for classic AI research errors: citing a URL that never mentions the claim, merging two product tiers into one, or treating a pilot press post as widespread adoption. Each slice saves the raw text of every page it opens unedited in `sources/market/` and writes a one-page brief in `strategy/` carrying the URL, date read, saved file name, verbatim supporting sentence and an evidence label:',
          ],
          bullets: [
            '**Verified**: shown directly on a primary source you or the agent opened, such as product help pages, live pricing or a regulator publication.',
            '**Vendor claim**: stated only in a company blog post, marketing page or launch announcement; announced is not shipped or adopted.',
            '**Unverified**: missing a saved source or unsupported when you open the page yourself; fix or drop it before assembling `strategy/market-map.md`.',
          ],
        },
        {
          heading: 'Compare data access, approval gates and non-AI workarounds',
          paragraphs: [
            'Financial products differ less in chat polish than in what data they read (`AvtaleGiro`, `eFaktura`, card subscriptions), what deterministic code calculates, what requires explicit `BankID` or user approval, and where they hand off to free `NAV` debt guidance or human support. Always map spreadsheets, payday calendar notes and second-account habits alongside apps: your strongest competitor is usually the workaround customers already trust, and sometimes a clearer alert or rule beats a new assistant.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'anthropic-subagents-course',
          why: 'This session runs three research slices in parallel; subagents let you run the same split inside one Claude Code session.',
          required: false,
        },
        {
          resourceId: 'svpg-product-operating-model',
          why: 'A short introduction to outcomes over features: teams own problems, strategy picks which ones, discovery comes before delivery.',
          required: false,
        },
      ],
      task: {
        summary:
          'Run three source-pinned research slices in `sources/market/`, audit five random claims against their live URLs, assemble `strategy/market-map.md`, and write a one-page `strategy/strategy-kernel.md` with explicit non-goals.',
        steps: [
          '**Think first (no AI):** Create `strategy/` and `sources/market/` in `workspace/`, add the rule `"Save raw market pages unedited in sources/market/; briefs live in strategy/"` to `AGENTS.md`, and write a five-line draft of MoneyPilot\'s target outcome, diagnosis hypothesis, whether deterministic bill maths without AI could solve the `14,000 kr` versus `1,500 kr` gap, and two non-goals.',
          '**Work with your agent:** Brief Claude Code in your own words to run three narrow slices (retail bank apps and `AvtaleGiro`/`eFaktura` views, standalone budgeting or AI assistants, and customer workarounds plus public complaints without usernames), saving raw pages unedited in `sources/market/`, writing one source-pinned brief per slice, and compiling `strategy/market-map.md` from those saved files only.',
          '**Check and try to break it:** Pick five claims at random across the briefs and `market-map.md`, open every original URL yourself, check whether the verbatim sentence supports the claim and whether vendor announcements were mislabelled as shipped, and audit the rest of that slice if more than one fails.',
          '**Make the call:** Write `strategy/strategy-kernel.md` on one page (outcome, evidence-linked diagnosis, guiding policy, 3 to 5 coherent actions and what MoneyPilot will not do), run a fresh-session weakest-link critique against `market-map.md`, and commit the edits you accept.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code',
        where:
          'In workspace/, using three parallel sessions or subagents for the slices and a fresh session for synthesis',
        briefChecklist: [
          "Context to read first: `AGENTS.md` and `product-context.md` for MoneyPilot's Norwegian retail banking scope (`AvtaleGiro`, `eFaktura`, recurring card charges).",
          'Three distinct research slices: (1) retail bank apps and built-in bill views, (2) standalone budgeting or AI finance tools, (3) user workarounds and public complaints stripped of usernames.',
          'Source-pinning rules: save every opened web page unedited in `sources/market/`, never invent facts, mark announced vs shipped, and attach URL, date, saved file path, verbatim quote and `verified | vendor-claim | unverified`.',
          'Market map structure: compare target segment, data read, deterministic vs AI features, approval gates, regulated-advice boundaries, and 5 to 8 unmet customer needs written without feature solutions.',
          'Audit hook: end each slice brief with the three claims the agent is least certain of, then run a fresh-session weakest-link critique once `strategy-kernel.md` is drafted.',
        ],
        text: `Read AGENTS.md and product-context.md first to confirm MoneyPilot's target users, Norwegian retail banking context (AvtaleGiro, eFaktura, recurring card charges) and constraints.

Run three narrow research slices (via subagents or one slice per session):
1. Retail bank apps in Norway and built-in upcoming-bill views
2. Standalone budgeting apps and AI money assistants
3. Everyday workarounds (spreadsheets, separate bill accounts, calendar notes) and public user complaints (strip all usernames and personal details)

For every page opened, save the raw text unedited in sources/market/<site>-<topic>.md, then write a one-page strategy/brief-<slice>.md where every claim cites the URL, today's date, saved file path, exact supporting sentence and label (verified, vendor-claim or unverified). Write "unknown" where a page does not state a fact, distinguish announced from shipped, and end each brief with the three claims you trust least.

After I audit five source links, I will ask a fresh session to assemble strategy/market-map.md from those briefs and sources/market/ only, and critique my one-page strategy/strategy-kernel.md for unsupported claims or missing non-goals.`,
      },
      expectedOutput: [
        '`sources/market/` containing unedited raw pages and three one-page slice briefs in `strategy/` with URLs, dates, verbatim quotes and evidence labels.',
        '`strategy/market-map.md` comparing 4 to 8 bank apps, tools and workarounds, plus 5 to 8 quote-backed customer problems and claims to drop.',
        'A one-page `strategy/strategy-kernel.md` covering outcome, diagnosis, guiding policy, coherent actions and what MoneyPilot will not do.',
      ],
      artifact:
        '`strategy/strategy-kernel.md` and `strategy/market-map.md`, backed by unedited files in `sources/market/`.',
      verification: [
        "You opened five cited URLs yourself and recorded whether each page matched the brief's sentence and label.",
        'Every row in `strategy/market-map.md` points to a saved file in `sources/market/` and carries an evidence label.',
        'Every unmet need is written as a customer problem rather than a disguised feature request.',
        "The kernel's diagnosis states an evidence-backed crux and its coherent actions explicitly rule out non-goals (such as auto-transfers or regulated `Finanstilsynet` advice).",
      ],
      reflectionPrompts: [
        'Which claim looked most convincing until you opened the underlying URL yourself?',
        "Where did a simple workaround (like a separate bills account or spreadsheet) beat competing apps, and how did that shape MoneyPilot's guiding policy?",
      ],
      checklist: [
        {
          id: 'parallel',
          text: 'Ran three narrow research slices in parallel Claude Code sessions or subagents',
        },
        {
          id: 'sources',
          text: 'Saved unedited raw pages in `sources/market/` and one source-pinned brief per slice in `strategy/`',
        },
        {
          id: 'spot-check',
          text: 'Opened five source URLs myself and fixed any wrong labels or stretched claims',
        },
        {
          id: 'map',
          text: 'Built `strategy/market-map.md` strictly from the briefs and saved pages',
        },
        {
          id: 'kernel',
          text: 'Wrote a one-page `strategy/strategy-kernel.md` including what we will not do',
        },
      ],
      mentorMove:
        'Pick three rows from `strategy/market-map.md` at random and ask "show me the exact sentence in `sources/market/`." Then read `strategy-kernel.md` as a sceptical banking director and ask "why build Ask MoneyPilot now instead of stopping at deterministic bill totals?"',
      soloMove:
        'Open a brand-new Claude Code session with no prior context, give it only `strategy/strategy-kernel.md`, `strategy/market-map.md` and `sources/market/`, and ask it to act as a sceptical retail-banking VP trying to kill the pitch: find one diagnosis claim resting only on a vendor blog, one workaround you underestimated, and one vague non-goal.',
    },
    {
      id: 's10',
      levelId: 3,
      number: 10,
      title: 'Talk to real people',
      difficulty: 'Intermediate',
      minutes: 90,
      tools: [
        'Claude Code',
        'Video call or in-person notes (transcription only with explicit consent)',
        'Your Level 2 MoneyPilot discovery probe',
      ],
      prerequisites: ['s9'],
      competencies: ['product-discovery', 'ux-prototyping'],
      xp: 125,
      mentorReview: 'optional',
      practicalProof: true,
      safetyCritical: true,
      goal: 'Run 3 to 5 story-based interviews and discovery-probe usability tests (or use the five checked-in MoneyPilot practice notes if recruitment fell through), synthesise by hand before comparing with Claude, and build an evidence-traced Opportunity Solution Tree.',
      whyItMatters:
        'Market research tells you what banks claim; talking to monthly-paid people reveals what actually happens on the 22nd when an `eFaktura` electricity spike hits before payday on the 25th. Models can invent vivid personas in seconds and none of them happened, so keeping pseudonymised human observations separate from AI summaries is the core discovery discipline.',
      learn: [
        {
          heading: 'Story interview first, discovery probe second',
          paragraphs: [
            'Run each 30-minute conversation in two halves: 15 minutes of story-based interviewing before showing any screen, then 15 minutes watching the participant use your Level 2 probe. Ask about the **last specific time** bills felt tight before payday (`"Walk me through the last month an AvtaleGiro, eFaktura or card charge surprised you"`), never hypotheticals like `"Would you use MoneyPilot?"`. Listen closely for home-grown workarounds, such as moving `12,500 kr` to a second account on payday or tracking subscriptions on paper: workarounds mark real pain.',
            'In the usability half, explain that all figures are fictional (`14,000 kr` balance, `12,500 kr` scheduled bills, `1,500 kr` left before the 25th), set a realistic task and stay quiet while they think aloud. Record concrete actions (`"tapped the 1,500 kr figure three times looking for groceries"`), not `"liked the clean layout"`, and finish with two comprehension questions: whether `1,500 kr` includes everyday groceries, and what happens if they tap a draft cover-transfer button (`awaiting_approval` vs instant transfer).',
          ],
        },
        {
          heading: 'Consent, pseudonymisation and the practice-note fallback',
          paragraphs: [
            "Obtain separate consent for taking notes, for any recording, and before processing pseudonymised notes with Claude. Replace names with `P1` to `P5`, strip employers, towns and real bank figures, never screenshot a participant's real bank app, delete recordings as soon as your one-page snapshot is written, and keep `discovery/interview-notes/` strictly inside your private `workspace/`, never in a public GitHub repo.",
            'Real conversations are the primary path. If schedules fell through despite starting outreach in Session 6, use the five hand-crafted MoneyPilot snapshots in **Practice files** (`P1.md` to `P5.md`, complete with an out-of-segment `high_balance` user giving polite praise and asking for fund tips, contradictions between opening confidence and past overdrafts, and separate-account workarounds) rather than asking an AI to role-play fake customers, and badge your files `PRACTICE: real-user validation outstanding`. Synthetic personas help rehearse a guide, never count as evidence.',
          ],
        },
        {
          heading: 'Synthesise by hand before opening Claude',
          paragraphs: [
            'Reading an AI synthesis first anchors your memory around tidy quotes and smooths over messy contradictions (such as `P2` or `P4` saying bills never catch them out, then describing an unexpected pre-payday crunch two minutes later). Write `"My synthesis"` in `discovery/synthesis.md` by hand first, exclude out-of-segment wishes (`P3`), then run a fresh Claude Code session on `P1.md` to `P5.md` alone into `discovery/synthesis-claude.md`, and settle every difference against verbatim quotes. One severe comprehension failure matters more than five small visual nitpicks.',
          ],
        },
        {
          heading: 'Opportunity Solution Trees',
          illustration: 'discovery',
          paragraphs: [
            "Teresa Torres's Opportunity Solution Tree links one target outcome at the top to concrete customer opportunities (needs and pain points written in user language and traced to `P1` to `P5` quotes) in the middle, and 2 to 3 competing solutions plus assumption tests under one chosen opportunity at the bottom.",
            'Keep opportunities phrased as real difficulties (`"cannot tell which recurring card subscriptions fall before the 25th"`), never disguised features (`"needs an AI chat drawer"`). Your Level 2 probe sits as one candidate branch beside simpler non-AI options such as clearer bill-boundary copy or missing-subscription prompts, compared on how directly each addresses the chosen opportunity.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'torres-interviewing',
          why: 'How to ask story-based questions about the last specific time and capture each interview as a one-page snapshot.',
          required: false,
        },
        {
          resourceId: 'torres-ost',
          why: 'The original guide to Opportunity Solution Trees: outcome at the top, quote-backed opportunities in the middle, competing solutions below.',
          required: false,
        },
        {
          resourceId: 'nng-usability-testing-101',
          why: 'Usability testing fundamentals: realistic tasks, thinking aloud and recording behaviour rather than opinions.',
          required: false,
        },
        {
          resourceId: 'nng-synthetic-users',
          why: 'Why AI-generated personas cannot replace real user research, and where they can still help prepare.',
          required: false,
        },
        {
          resourceId: 'producttalk',
          why: 'Ongoing practitioner guidance on continuous discovery and assumption testing.',
          required: false,
        },
      ],
      practiceFiles: [
        {
          label: 'Interview snapshot P1',
          path: 'datasets/moneypilot/s10-interviews/P1.md',
          note: 'Monthly-paid user juggling irregular winter bills and checking comprehension of Safe-to-Spend.',
        },
        {
          label: 'Interview snapshot P2',
          path: 'datasets/moneypilot/s10-interviews/P2.md',
          note: 'Confident opening answer contradicted by a real pre-payday timing clash story.',
        },
        {
          label: 'Interview snapshot P3',
          path: 'datasets/moneypilot/s10-interviews/P3.md',
          note: 'Out-of-segment high-balance participant offering polite praise and off-strategy feature wishes.',
        },
        {
          label: 'Interview snapshot P4',
          path: 'datasets/moneypilot/s10-interviews/P4.md',
          note: 'Separate-account workaround that still misses recurring card charges (links to s11 bill_count = 0).',
        },
        {
          label: 'Interview snapshot P5',
          path: 'datasets/moneypilot/s10-interviews/P5.md',
          note: 'Low-buffer user testing shortfall copy and fearing instant money movement on draft transfers.',
        },
        {
          label: 'Session 10 synthesis answer key',
          path: 'datasets/moneypilot/s10-answer-key.md',
          note: 'Reference opportunities, out-of-segment exclusions and usability traps for P1 to P5.',
          sealed: true,
        },
      ],
      task: {
        summary:
          'Write a story-plus-usability discussion guide, capture 3 to 5 consented snapshots (or use the `P1` to `P5` practice notes), synthesise by hand before comparing with a fresh Claude session, and build `discovery/ost.md`.',
        steps: [
          '**Think first (no AI):** Draft `discovery/discussion-guide.md` (past-story payday questions first, then live probe tasks and two comprehension checks on everyday groceries vs scheduled bills and draft transfer approval). Run 3 to 5 consented calls saved as pseudonymised `P1.md` to `P5.md` snapshots (or copy the five MoneyPilot practice files into `discovery/interview-notes/` marked `PRACTICE`), and write `"My synthesis"` in `discovery/synthesis.md` before using any AI.',
          '**Work with your agent:** Open a fresh Claude Code session, forbid it from reading `discovery/synthesis.md`, and brief it to read only `discovery/interview-notes/P1.md` to `P5.md` and write `discovery/synthesis-claude.md` with first-person opportunities, verbatim quotes, single-participant weak signals, out-of-segment flags and ranked usability comprehension failures.',
          '**Check and try to break it:** Compare `"My synthesis"` with `synthesis-claude.md` quote by quote (and open the sealed `s10-answer-key.md` if you used `P1` to `P5`): check whether out-of-segment praise (`P3`) or opening confidence contradicted by real stories (`P2`, `P4`) slipped into either opportunity list.',
          '**Make the call:** Add `"Where we differ"` with your ruling to `discovery/synthesis.md`, write `discovery/ost.md` (kernel outcome, 4 to 6 quote-traced opportunities, 2 to 3 solutions including a non-AI option under your target opportunity, and one assumption test each), and file observed comprehension bugs as issues on your prototype repo without personal details.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code',
        where:
          'A fresh session in workspace/ after you have written discovery/synthesis.md by hand',
        briefChecklist: [
          'Isolation rule: read `discovery/interview-notes/P1.md` to `P5.md` (plus `product-context.md` for target segment) and do NOT open `discovery/synthesis.md`.',
          "Segment hygiene: flag any participant who falls outside MoneyPilot's monthly-paid bill-juggling target segment so polite praise is not counted as core evidence.",
          'Evidence standard: list first-person opportunities with participant IDs and verbatim quotes, marking single-person themes `weak signal` and noting contradictions between opening claims and past stories.',
          'Usability and comprehension: rank observed hesitations and score whether each participant understood what `Safe-to-Spend` excludes (everyday groceries) and whether `Prepare transfer` moves money immediately.',
          'No solutions yet: propose 4 to 6 parent opportunities for the OST without inventing quotes or jumping to features.',
        ],
        text: `Read product-context.md (for target segment definition) and discovery/interview-notes/P1.md to P5.md. Do NOT read discovery/synthesis.md: I wrote my own synthesis first and want an independent pass to compare against.

All notes are pseudonymised; do not attempt to identify anyone. Write discovery/synthesis-claude.md covering:
1. Segment check: flag any participant outside our target segment and keep their feature wishes out of core opportunities.
2. Opportunities: distinct customer pains in first-person words, citing participant IDs, verbatim quotes, any contradictions between opening self-assessments and past stories, and "weak signal" where only one in-segment person hit it.
3. Probe usability and comprehension: observed hesitations plus per-participant comprehension of (a) scheduled bills vs everyday spending and (b) draft transfer approval vs instant execution.
4. Four to six parent opportunities for an Opportunity Solution Tree (no solutions yet) and three follow-up questions for the next interview round.`,
      },
      expectedOutput: [
        '`discovery/discussion-guide.md` separating past-story questions from live probe tasks and comprehension checks.',
        'Pseudonymised `P1.md` to `P5.md` snapshots in `discovery/interview-notes/` (real conversations or clearly badged MoneyPilot `PRACTICE` notes).',
        '`discovery/synthesis.md` containing your hand-written synthesis first, a link to `synthesis-claude.md`, and `"Where we differ"` rulings.',
        '`discovery/ost.md` tracing every opportunity to in-segment participant quotes and comparing 2 to 3 solutions (including a non-AI option) under your chosen opportunity.',
      ],
      artifact:
        '`discovery/interview-notes/`, `discovery/synthesis.md` and `discovery/ost.md`, plus anonymised usability issues on your prototype repository.',
      verification: [
        'Consent was obtained for real calls, recordings were deleted after writing snapshots, and zero real names, employers or account numbers appear anywhere.',
        '`"My synthesis"` was written before running Claude, and every discrepancy in `"Where we differ"` cites the quote or observation that settled it.',
        'Out-of-segment praise and synthetic personas are excluded from `ost.md` evidence.',
        'Prototype GitHub issues describe reproducible UI comprehension steps with zero participant details.',
      ],
      reflectionPrompts: [
        "Where did a participant's specific past story contradict how confident they sounded in the first two minutes?",
        'Which comprehension gap in the probe (`everyday spending excluded` or `draft transfer approval`) surprised you most, and could copy alone fix it?',
      ],
      checklist: [
        {
          id: 'conversations',
          text: 'Ran 3 to 5 consented user conversations, or used the MoneyPilot practice snapshots marked PRACTICE with a recruitment plan',
        },
        {
          id: 'pseudonymised',
          text: 'Kept snapshots pseudonymised as P1 to P5 in private `workspace/` and deleted any recordings',
        },
        {
          id: 'hand-first',
          text: 'Wrote `"My synthesis"` by hand before running Claude\'s synthesis',
        },
        {
          id: 'compared',
          text: 'Compared my synthesis with `synthesis-claude.md` (and `s10-answer-key.md` if using practice notes) and ruled on every difference',
        },
        {
          id: 'ost',
          text: 'Built `discovery/ost.md` traced to in-segment quotes with competing solutions',
        },
        {
          id: 'issues',
          text: 'Filed observed probe usability and comprehension gaps as clean GitHub issues',
        },
      ],
      mentorMove:
        'Run a 10-minute mock interview first where you give polite, hypothetical answers ("Sure, a bill tracker sounds handy") until she anchors you on a real past month before payday. Afterwards, inspect `discovery/ost.md` and challenge whichever opportunity rests on the thinnest quote.',
      soloMove:
        'Ask one friend or colleague for 15 minutes on your live probe link just to run the silent think-aloud and the two comprehension questions (`what does 1,500 kr exclude?` and `what happens if you tap Prepare transfer?`), then use a fresh Claude session to audit `discovery/ost.md` for opportunities disguised as features.',
    },
    {
      id: 's11',
      levelId: 3,
      number: 11,
      title: 'Data and prioritisation',
      difficulty: 'Intermediate',
      minutes: 90,
      tools: ['Claude Code', 'A spreadsheet (Google Sheets, Excel or Numbers)'],
      prerequisites: ['s10'],
      competencies: ['product-discovery', 'technical-collaboration'],
      xp: 125,
      mentorReview: 'optional',
      goal: 'Write metric definitions before reading results, audit `s11-events.csv` for duplicate rows and denominator traps, verify two rates in a spreadsheet, estimate range impact, and score candidate bets with RICE.',
      whyItMatters:
        'Your interviews surfaced *why* people miss card-billed subscriptions (`P4`) or misread `Safe-to-Spend`; event logs show *how many* users drop at each step. Claude Code can calculate a funnel and rank a roadmap in minutes, yet 42 duplicate retry rows or a muddled denominator will produce a polished chart pointing straight at the wrong bet.',
      learn: [
        {
          heading: 'Write metric definitions before looking at any result',
          paragraphs: [
            'Product analytics starts from an event log (`user_id`, `timestamp`, `event_name` plus segment columns like `pay_frequency`, `balance_band`, `device` and `bill_count`). Most bad roadmap calls come from definition mistakes: counting raw event rows instead of distinct users, dividing by the previous step while calling it cohort conversion, or treating an optional drill-down (`bill_detail_opened`) as a required funnel gate.',
            'Use the checked-in `s11-events.csv` (`600` fictional MoneyPilot cohort users) so your funnel math is reproducible against a known ground truth, and write your exact cohort, step and pre-payday retention definitions at the top of `data/funnel-analysis.md` before running a single query.',
          ],
        },
        {
          heading: 'Audit duplicates, denominators and segments by hand',
          illustration: 'funnel',
          paragraphs: [
            'Have Claude Code compute funnel counts with a deterministic script, never mental arithmetic, showing exact `n / N` user counts beside every percentage. Then open `s11-events.csv` in a spreadsheet and recompute at least two rates yourself:',
          ],
          bullets: [
            '**Duplicate retries**: compare total rows against distinct `user_id` per event (`forecast_viewed` contains `42` duplicate Android retry rows that distort raw row ratios).',
            '**Two honest denominators**: show conversion from cohort (`294 / 600 = 49.0%`) alongside step-to-step conversion (`294 / 420 = 70.0%`) so nobody confuses `67.2%` raw-row division or step ratios with overall reach.',
            '**Segment bottlenecks**: slice the `bills_connected` to `forecast_viewed` drop by `pay_frequency`, `device` and `bill_count` (`bill_count = 0` when recurring card charges or manual rent are missed, echoing `P4` in Session 10).',
            '**Correlation vs causation**: higher return rates among users who open bill details often reflect high-intent users exploring everything rather than the detail screen causing retention.',
          ],
        },
        {
          heading: 'Range impact estimates and evidence-weighted RICE',
          illustration: 'impact',
          paragraphs: [
            'Write opportunity impact as a **low, base and high** sum with explicit units rather than one false-precision number. For example: `10,000` monthly-paid users connecting accounts times `12` more users per `100` reaching a valid forecast gives `1,200` more informed users a month; if you translate avoided shortfalls into `250 kr` saved overdraft fees, show that conversion as a separate labelled step. Tag every input `data`, `interviews`, `market` or `assumption`.',
            'Then score 5 or more candidate MoneyPilot bets (including at least one deterministic non-AI bet, such as fixing `bill_count = 0` card-bill detection or clarifying `1,500 kr` everyday-spending copy, alongside `Ask MoneyPilot` cover-transfer drafts) with **RICE** (Reach, Impact, Confidence, Effort). Tie Confidence strictly to evidence strength, override the formula with a written reason when a regulatory or trust risk demands it, and compare with a blind AI ranking from bet titles alone to see what your evidence changed.',
          ],
        },
        {
          heading: 'One-page scripted funnel view',
          paragraphs: [
            'Engineers, designers and managers scan one clear screen far faster than a long Markdown note. Have a script generate `data/funnel-dashboard.html` directly from `data/events.csv` rather than typing numbers into HTML by hand, so rerunning the script updates every bar whenever definitions change.',
            'Put the question, audience, date window and headline drop at the top, keep `n / N` counts and metric definitions visible on the page, use plain bars with accessible text labels instead of donuts or colour-only cues, badge `"Fictional MoneyPilot practice data"`, and check two chart figures against your spreadsheet.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'intercom-rice',
          why: 'The original RICE scoring model: reach, impact, confidence and effort, weighting bets by evidence rather than opinion.',
          required: false,
        },
        {
          resourceId: 'nng-ai-study-guide',
          why: 'Practical guidance on keeping human verification in the loop when AI assists with research and analytics.',
          required: false,
        },
        {
          resourceId: 'anthropic-pm-plugin',
          why: "Anthropic's PM plugin for Claude Code; optional to compare against your own RICE table after scoring.",
          required: false,
        },
        {
          resourceId: 'few-dashboard-confusion',
          why: 'Why a single-screen view needs one clear question, minimal clutter and immediate visual hierarchy.',
          required: false,
        },
        {
          resourceId: 'nng-dashboards-preattentive',
          why: 'Why plain horizontal or vertical bars communicate funnel drops faster than pies, gauges or donuts.',
          required: false,
        },
        {
          resourceId: 'anthropic-build-dashboard-skill',
          why: 'Optional dashboard skill: if used, enforce scripted CSV reads, plain bars, `n` beside every rate and zero invented numbers.',
          required: false,
        },
      ],
      practiceFiles: [
        {
          label: 'MoneyPilot cohort event log (CSV)',
          path: 'datasets/moneypilot/s11-events.csv',
          note: '600 cohort users across app_opened, bills_connected, forecast_viewed, bill_detail_opened and returned_before_next_payday.',
        },
        {
          label: 'Session 11 funnel answer key',
          path: 'datasets/moneypilot/s11-answer-key.md',
          note: 'Exact deduplicated counts, denominator traps, Android retry rows and the bill_count = 0 bottleneck.',
          sealed: true,
        },
      ],
      task: {
        summary:
          'Define funnel metrics upfront, audit `s11-events.csv` with a script and a spreadsheet check, build `data/funnel-dashboard.html`, estimate range impact, and score 5+ MoneyPilot bets with RICE.',
        steps: [
          '**Think first (no AI):** Copy `s11-events.csv` to `data/events.csv` (keeping `s11-answer-key.md` sealed), inspect its columns in a spreadsheet, and write your exact definitions for cohort user, each core funnel step (deciding whether `bill_detail_opened` is optional) and pre-payday return at the top of `data/funnel-analysis.md`.',
          '**Work with your agent:** Brief Claude Code to analyse `data/events.csv` via a reproducible script using your definitions (checking duplicate rows, printing distinct user `n / N` counts for both cohort and previous-step denominators, and slicing the biggest drop by `pay_frequency`, `device` and `bill_count`), generate a scripted `data/funnel-dashboard.html`, and produce a blind ranking of your candidate bet titles alone.',
          '**Check and try to break it:** Recompute two funnel conversion rates and the duplicate-row gap yourself in a spreadsheet pivot table, confirm `funnel-dashboard.html` matches your sheet, and then open `s11-answer-key.md` to verify you caught the `42` duplicate Android retries (`67.2%` raw vs `70.0%` deduplicated) and the `bill_count = 0` drop (`81` of the `126` lost connected users).',
          '**Make the call:** Write `data/impact-estimate.md` as a low, base and high range with source-labelled inputs (user counts plus any separate fee or cost assumptions), score at least five MoneyPilot bets (including a deterministic non-AI fix) with RICE in `data/prioritised-bets.md`, and state your v1 choice plus what you cut.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code',
        where:
          'In workspace/ after saving data/events.csv and writing definitions in data/funnel-analysis.md',
        briefChecklist: [
          'Definitions first: read the metric and funnel definitions at the top of `data/funnel-analysis.md` and do not substitute your own.',
          'Scripted audit on `data/events.csv`: inspect raw row count vs distinct `user_id` per event, flag duplicate retries, and report both `% of cohort` and `% of previous step` with exact `n / N` counts.',
          'Segment drill-down: break down the steepest funnel drop across `pay_frequency`, `balance_band`, `device` and `bill_count = 0` vs `bill_count > 0`, separating correlation from causation.',
          'Scripted one-page HTML view: generate `data/funnel-dashboard.html` directly from `data/events.csv` with plain bar charts, `n` beside every rate and a `"Fictional MoneyPilot practice data"` badge.',
          'Blind baseline before RICE: rank my candidate bet names from titles and a one-line problem alone before reading `ost.md` or `funnel-analysis.md` so I can compare what evidence changes.',
        ],
        text: `Read the metric definitions I wrote at the top of data/funnel-analysis.md first, then write and run a deterministic Python or Node script to audit data/events.csv. Do not compute numbers in your head.

1. Data hygiene: report total rows, distinct users, and any duplicate user-event retries (broken down by device and event_name).
2. Funnel and retention: using distinct users and my definitions, report app_opened, bills_connected, forecast_viewed and returned_before_next_payday (treating bill_detail_opened per my definition), showing exact n / N counts for both cohort conversion and step-to-step conversion.
3. Bottleneck segments: slice the largest step drop by pay_frequency, balance_band, device and bill_count (0 vs 1+), and check whether bill_detail_opened retention differences hold across segments.
4. Append your scripted tables and confidence notes to data/funnel-analysis.md, and generate data/funnel-dashboard.html by script from data/events.csv (plain bars, counts beside every rate, definitions footer, "Fictional MoneyPilot practice data" badge).`,
      },
      expectedOutput: [
        '`data/funnel-analysis.md` starting with your written definitions, followed by deduplicated `n / N` funnel counts, spreadsheet checks and comparison against `s11-answer-key.md`.',
        '`data/funnel-dashboard.html` generated by script from `data/events.csv`, matching your spreadsheet pivot table.',
        '`data/impact-estimate.md` showing low, base and high ranges in user counts (and separate fee/cost assumptions) with every input labelled by source.',
        '`data/prioritised-bets.md` comparing a blind AI ranking against evidence-weighted RICE across 5+ MoneyPilot bets including a non-AI option.',
      ],
      artifact:
        '`data/funnel-analysis.md`, `data/funnel-dashboard.html`, `data/impact-estimate.md` and `data/prioritised-bets.md`.',
      verification: [
        'Two funnel percentages and the duplicate-row count match your own spreadsheet pivot table.',
        'Every rate in `funnel-analysis.md` and `funnel-dashboard.html` displays exact `n / N` user counts and states its denominator.',
        'Your audit identified both the Android retry duplicates and the `bill_count = 0` onboarding bottleneck (echoing `P4` from Session 10).',
        'Every RICE confidence score cites `data`, `interviews`, `market` or `assumption`, and includes at least one deterministic non-AI bet.',
      ],
      reflectionPrompts: [
        "How did connecting `P4`'s interview story (recurring card subscriptions missed) with the `bill_count = 0` funnel drop change your top bet?",
        "Where did Claude's blind bet ranking diverge most from your evidence-weighted RICE table?",
      ],
      checklist: [
        {
          id: 'generated',
          text: 'Loaded `s11-events.csv` into `data/events.csv` (or a fixed-seed own-product log) and inspected its raw columns',
        },
        {
          id: 'definitions',
          text: 'Wrote cohort, funnel-step and retention definitions before reading any results',
        },
        {
          id: 'hand-check',
          text: 'Recomputed two funnel rates and duplicate-row counts in a spreadsheet',
        },
        {
          id: 'planted',
          text: 'Checked findings against the sealed `s11-answer-key.md` (`bill_count = 0` drop and Android retries)',
        },
        {
          id: 'dashboard',
          text: 'Built `data/funnel-dashboard.html` by script from `events.csv` and verified two numbers',
        },
        {
          id: 'impact',
          text: 'Wrote `data/impact-estimate.md` as a low, base and high range with source-labelled inputs',
        },
        {
          id: 'bets',
          text: 'Scored at least five MoneyPilot bets (including a non-AI option) with evidence-weighted RICE',
        },
      ],
      mentorMove:
        'Give rough engineering T-shirt effort sizes (`S`, `M`, `L`) for her top five MoneyPilot bets and explain the hidden complexity behind the hardest one (such as recurring card detection vs read-only drawer explanations). Then point to one percentage on `funnel-dashboard.html` and ask "out of which exact denominator?"',
      soloMove:
        'Hide `data/funnel-analysis.md`, open `data/funnel-dashboard.html` cold after a short break, and check whether a reader can tell in 15 seconds whether `70.0%` means 70% of all `600` users or 70% of the `420` connected users. Tighten any ambiguous chart label and re-verify against your spreadsheet.',
    },
    {
      id: 's12',
      levelId: 3,
      number: 12,
      title: 'A PRD people and agents can build from',
      difficulty: 'Advanced',
      minutes: 105,
      tools: ['Claude Code', 'Your Level 2 MoneyPilot discovery probe'],
      prerequisites: ['s11'],
      competencies: ['product-discovery', 'technical-collaboration'],
      xp: 150,
      mentorReview: 'optional',
      practicalProof: true,
      goal: 'Brief and refine `prd/prd.md` for MoneyPilot v1 using `grill-me`, three-tier behavioural contracts (`always / ask first / never`), concrete `Given / when / then` criteria, three fresh-session role reviews, and a cold agent blocker check.',
      whyItMatters:
        'Engineers, designers, compliance reviewers and coding agents will build MoneyPilot v1 from `prd/prd.md` without having read your raw interview notes. Any silence around bill arithmetic, `BankID` approval gates or `Finanstilsynet` advice boundaries becomes a silent guess in production code.',
      learn: [
        {
          heading: 'Why MoneyPilot v1 splits deterministic code from AI',
          illustration: 'solution',
          paragraphs: [
            'A good PRD briefs humans and coding agents alike: problem, outcome, scope and non-goals, numbered flows, behavioural contracts, `Given / when / then` acceptance criteria, tracking, open questions and an **Eval plan**. Before drafting, write a one-page `prd/operating-brief.md` climbing the complexity ladder one rung at a time: what deterministic rules handle alone, what a read-only model explanation adds, and where bounded tool preparation is worth its latency, fallback and per-answer cost (for example `0.08 kr` per acceptable reply once retries and review are counted).',
            'In MoneyPilot v1, **Safe-to-Spend & Upcoming Bills** is 100% deterministic code (`14,000 kr` balance on the 14th minus `12,500 kr` in scheduled `AvtaleGiro`, `eFaktura` and recurring card charges = `1,500 kr` safe before the 25th, plus bill-spike flags like winter electricity `+520 kr` and `bill_count = 0` onboarding prompts). **Ask MoneyPilot** is an AI drawer grounded in read-only tool outputs (`get_balance`, `list_upcoming_bills`, `get_forecast`) plus human-approved draft cover transfers (`status: "awaiting_approval"`).',
          ],
        },
        {
          heading: 'No invention, flagged contradictions and behaviour first',
          paragraphs: [
            'Use the `product-templates` PRD structure from Tutorials, courses and sources, enforcing three rules on both yourself and Claude:',
          ],
          bullets: [
            '**No invention**: unmade choices become `[NEEDS INPUT]`, unverified estimates `[ASSUMPTION: reason]`, and anything slice 1 cannot ship without `[BLOCKER: NEEDS INPUT]`, each with a named owner.',
            '**Flag contradictions**: where Session 10 interviews (misreading `1,500 kr` as including groceries) and Session 11 data (`bill_count = 0` causing 64% of the setup drop) compete for scope, state both and explain how phase 1 sequences them.',
            '**Behaviour before implementation**: specify observable user states, numeric examples and safety limits rather than prescribing database tables or model vendors.',
          ],
        },
        {
          heading: 'Three-tier contracts and concrete `Given / when / then` criteria',
          paragraphs: [
            'Write MoneyPilot\'s behavioural contracts in Addy Osmani\'s three tiers: **Always** compute balances, `total_due`, `projected_balance` and spike deltas in tested code, state `"scheduled bills only, excludes everyday spending"`, and show `as_of` timestamps when data is stale; **Ask first** when an account name is ambiguous or before preparing a Savings-to-Current cover transfer (`status: "awaiting_approval"`, requiring explicit user `Approve` / `BankID`); **Never** auto-execute money movement, invent figures outside tool lookups, give personalised investment or debt-order advice under `Finanstilsynet` rules (signpost free `NAV` debt guidance), or ignore complaints and suspected fraud without human hand-off.',
            'Turn flows and edge cases (empty `bill_count = 0`, a bill falling directly on payday the 25th, stale `as_of` older than 6 hours) into testable `Given / when / then` criteria: `Given current balance 14,000.00 kr on 14 March and 5 scheduled bills totalling 12,500.00 kr before payday on 25 March, when Safe-to-Spend opens, then 1,500.00 kr is shown alongside "scheduled bills only, excludes everyday spending"`. Add 10 representative `Ask MoneyPilot` prompts in the Eval plan for Session 14.',
          ],
        },
        {
          heading: 'Grill-me first, three role reviews, and the cold blocker check',
          paragraphs: [
            'Have Claude run `grill-me` one question at a time before drafting `prd/prd.md`. Then run three independent reviews in fresh sessions (engineer, designer and retail-banking risk partner) writing into `prd/review-notes.md` without touching your PRD. Finish by giving `prd/prd.md` alone to a fourth cold session to verify zero `[BLOCKER]` ambiguities remain for slice 1.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'osmani-good-spec',
          why: 'A practical guide to specs humans and coding agents can execute, including always, ask first and never boundaries.',
          required: false,
        },
        {
          resourceId: 'product-templates-prd',
          why: 'The PRD template for this session: copy its Output Format headings into `prd/prd.md` and add Prototype link and Eval plan.',
          required: false,
        },
        {
          resourceId: 'aws-rag-versus-fine-tuning',
          why: 'Why live user balances and rules come from authorised tool retrieval and code rather than fine-tuning weights.',
          required: false,
        },
        {
          resourceId: 'chennapragada-demos-before-memos',
          why: 'How prototypes and specs pair together when building is cheap and editing judgment is the bottleneck.',
          required: false,
        },
        {
          resourceId: 'catwu-pm-ai-exponential',
          why: 'How the Claude Code PM team keeps specs crisp around true non-negotiables.',
          required: false,
        },
      ],
      task: {
        summary:
          'Write `prd/operating-brief.md`, use `grill-me` to draft `prd/prd.md` from your Level 3 evidence, run fresh-session engineer, designer and risk reviews, and pass a cold-agent blocker test.',
        steps: [
          '**Think first (no AI):** Create `prd/`, copy the `product-templates` PRD headings (plus `Prototype link` and `Eval plan`) into `prd/prd.md`, and hand-write `prd/operating-brief.md` on one page covering why deterministic code owns `Safe-to-Spend` (`14,000 kr - 12,500 kr = 1,500 kr`) while `Ask MoneyPilot` handles grounded Q&A and `awaiting_approval` transfer drafts, plus latency, fallback and cost-per-answer budgets.',
          '**Work with your agent:** Brief Claude Code in your own words to read your Level 3 files, `grill-me` one unmade decision at a time (giving a file-cited recommendation with each question and marking unknowns `[NEEDS INPUT]` or `[BLOCKER: NEEDS INPUT]`), and draft `prd/prd.md` with `always / ask first / never` contracts, concrete `Given / when / then` criteria, metrics and a 10-case Eval plan.',
          '**Check and try to break it:** Run three separate fresh-session reviews (engineer, designer and `Finanstilsynet`-minded risk partner) appending findings to `prd/review-notes.md` without editing `prd/prd.md`, then open a fourth cold session given *only* `prd/prd.md` to list every question that would force a builder to guess on slice 1.',
          '**Make the call:** Mark each review item `Accepted`, `Rejected (with reason)` or `Open question (with owner)` in `prd/review-notes.md`, edit `prd/prd.md` in your own words until zero `[BLOCKER]` gaps remain for slice 1, and commit.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code',
        where:
          'In workspace/ for grill-me and drafting, then four separate fresh sessions for the role reviews and cold blocker test',
        briefChecklist: [
          'Workspace evidence to read first: `AGENTS.md`, `product-context.md`, `prd/operating-brief.md`, `strategy/`, `discovery/synthesis.md`, `discovery/ost.md` and `data/prioritised-bets.md`.',
          'Grill-me before drafting: ask one question at a time with a file-backed recommended answer, never invent product rules, and mark gaps `[NEEDS INPUT]`, `[ASSUMPTION: reason]` or `[BLOCKER: NEEDS INPUT]`.',
          'MoneyPilot safety and math contracts: three-tier `always / ask first / never` rules (tested code calculates all balances and bill totals; cover transfers stay `awaiting_approval` behind `BankID`; `Finanstilsynet` / `NAV` conduct and human hand-offs).',
          'Testable acceptance criteria and evals: phase-1 `Given / when / then` checks with concrete numbers (`14,000 kr`, `12,500 kr`, `1,500 kr`, `bill_count = 0`, stale `as_of`) plus a 10-question `Ask MoneyPilot` Eval plan.',
          'Independent review loop: run engineer, designer and risk critiques in fresh sessions writing only to `prd/review-notes.md`, followed by a cold session reading `prd/prd.md` alone.',
        ],
        text: `Read AGENTS.md, product-context.md, prd/operating-brief.md, strategy/strategy-kernel.md, strategy/market-map.md, discovery/synthesis.md, discovery/ost.md, data/funnel-analysis.md, data/impact-estimate.md and data/prioritised-bets.md.

Goal: help me write prd/prd.md for MoneyPilot v1 into the headings already in prd/prd.md.

Step 1 (grill-me): Do not draft yet. Question me one decision at a time on anything my files leave open: phase-1 slice boundaries (deterministic Safe-to-Spend screen + Ask MoneyPilot drawer), bill_count = 0 handling, spike thresholds (e.g. +500 kr), BankID approval rules on draft transfers, Finanstilsynet / NAV boundaries and tracking metrics. Include your recommended answer citing the file it comes from, and wait for my reply.

Step 2 (draft after I approve): Fill prd/prd.md with zero invention:
- Mark gaps [NEEDS INPUT], guesses [ASSUMPTION: reason] and slice-1 blockers [BLOCKER: NEEDS INPUT] with owners.
- Flag any tension between interview quotes and funnel counts explicitly.
- Write behavioural contracts as Always / Ask first / Never (all balances and totals computed by deterministic code, never the model; transfers prepared only as awaiting_approval).
- Write phase-1 acceptance criteria in Given / when / then form with concrete numbers, plus a 10-prompt Eval plan for Ask MoneyPilot.`,
      },
      expectedOutput: [
        'A one-page `prd/operating-brief.md` comparing deterministic code against AI and stating latency, fallback and cost budgets.',
        '`prd/prd.md` with version, prototype link, `always / ask first / never` contracts, concrete `Given / when / then` criteria, open questions and a 10-case Eval plan.',
        '`prd/review-notes.md` logging engineer, designer and risk findings with your `Accepted`, `Rejected (with reason)` or `Open question` decision on each.',
        'A clean cold-session blocker check showing slice 1 is buildable without guessing.',
      ],
      artifact: '`prd/operating-brief.md`, `prd/prd.md` and `prd/review-notes.md`.',
      verification: [
        'A cold session given only `prd/prd.md` finds zero unresolved `[BLOCKER]` questions for slice 1.',
        'Every phase-1 acceptance criterion uses `Given / when / then` with concrete numeric inputs and observable outputs.',
        'Behavioural contracts explicitly assign all arithmetic to tested code, gate transfers behind `awaiting_approval` and user `Approve` (`BankID`), and enforce `Finanstilsynet` / `NAV` and complaint hand-off rules.',
        'If Session 10 used practice notes rather than live interviews, `prd/prd.md` states clearly that real-user validation remains open.',
      ],
      reflectionPrompts: [
        'Which `grill-me` question exposed an assumption your discovery notes and RICE table had left undecided?',
        'Which of the three fresh-session reviews (engineer, designer or risk) forced the sharpest change to `prd/prd.md`?',
      ],
      checklist: [
        {
          id: 'interviewed',
          text: 'Used `grill-me` to resolve unmade MoneyPilot scope and safety choices before drafting',
        },
        {
          id: 'layout',
          text: 'Completed `prd/operating-brief.md` and every `product-templates` heading in `prd/prd.md`, plus Eval plan',
        },
        {
          id: 'no-invention',
          text: 'Flagged contradictions and moved every unresolved gap into Open questions with an owner',
        },
        {
          id: 'three-reviews',
          text: 'Ran engineer, designer and risk reviews in three separate fresh sessions',
        },
        {
          id: 'decided',
          text: 'Recorded Accepted, Rejected (with reason) or Open question on every review finding',
        },
        {
          id: 'agent-ready',
          text: 'Tested `prd/prd.md` alone in a cold session and closed every slice-1 blocker',
        },
      ],
      mentorMove:
        'Read `prd/prd.md` as the tech lead picking it up on Monday morning and circle the three lines that would still force an engineer to guess (especially around stale `as_of` balances, `bill_count = 0` or draft transfer expiry). Share one real story of a vague spec that caused rework, without showing employer docs.',
      soloMove:
        'Open a fresh Claude Code session that can read *only* `prd/prd.md` (no other workspace files) and prompt it: `"You are a sceptical senior backend engineer at a retail bank. List the top five ambiguities or hidden edge cases in this PRD that would make you push it back in sprint planning."` Fix every valid hit.',
    },
  ],
  challenges: [
    {
      id: 'c5',
      levelId: 3,
      title: 'Survey at scale',
      difficulty: 'Intermediate',
      minutes: 60,
      competencies: ['product-discovery', 'evals-safety'],
      xp: 100,
      summary:
        'Classify 200 free-text customer comments about pre-payday `AvtaleGiro`, `eFaktura` and card bills with Claude Code, then audit a 20-row sample and every cited quote by hand so you trust AI coding at scale only as far as you verify it.',
      steps: [
        'Run a short script in Claude Code with a fixed random seed to create `data/survey.csv`: 200 fictional one-sentence comments from monthly-paid bank customers describing how they track bills before the 25th (for example unexpected `520 kr` utility spikes, forgotten card subscriptions and short two-word replies).',
        'Before asking AI to theme anything, read 40 random rows yourself and write your own 5 to 7 theme definitions and tallies.',
        "In a fresh session, ask Claude Code to label all 200 rows into a new CSV column and count the labels with a script (never in prose), outputting each theme's definition, exact row count and three verbatim quotes with row IDs.",
        'Audit 20 random rows in a spreadsheet against your own judgment to calculate label agreement, confirm every quoted row ID contains the exact quote word for word, and record in `data/survey-themes.md` which themes Claude merged, missed or over-labelled.',
      ],
      deliverable:
        '`data/survey-themes.md` with scripted counts, verified row quotes, your 20-row agreement rate and rules for using AI coding on real survey exports.',
      verification: [
        'Every theme count comes from a deterministic script over labelled CSV rows, not an estimated number in chat.',
        'All cited quotes match their exact row IDs in `data/survey.csv` word for word.',
        'Your 20-row manual audit records exact agreement (`n / 20`) and at least one concrete labelling disagreement or edge case.',
      ],
      resources: [
        {
          resourceId: 'nng-ai-study-guide',
          why: 'Where AI speeds up qualitative coding and why human sampling checks remain essential.',
          required: false,
        },
        {
          resourceId: 'simon-willison-blog',
          why: 'Practitioner notes on combining deterministic scripts with structured LLM classification.',
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
        'Run your Session 10 discussion guide against five AI-generated personas, synthesise them separately, and compare them side by side with `P1` to `P5` to see exactly where synthetic users help and where they mislead.',
      steps: [
        'In five fresh sessions, ask Claude to answer `discovery/discussion-guide.md` as five varied monthly-paid retail bank customers, saving each transcript in `discovery/synthetic/S1.md` to `S5.md` with `PRACTICE: SYNTHETIC` at the top.',
        'Run your Session 10 synthesis brief on `discovery/synthetic/` alone, saving the output to `discovery/synthetic/synthesis.md` well away from your real `discovery/` evidence.',
        'Build a comparison table in `discovery/synthetic-vs-real.md` against your Session 10 synthesis (real conversations or `P1` to `P5`): opportunities in both, only in human notes (such as contradicting opening confidence or fearing `Prepare transfer` moves money instantly), and only in synthetic notes.',
        'Conclude with three tasks where synthetic users genuinely helped (such as spotting leading questions in your guide) and three ways counting them as evidence would have steered MoneyPilot wrong.',
      ],
      deliverable:
        '`discovery/synthetic-vs-real.md` comparing human and synthetic findings, with all synthetic files isolated in `discovery/synthetic/` and badged `PRACTICE: SYNTHETIC`.',
      verification: [
        'Zero synthetic quotes or counts appear in `discovery/synthesis.md`, `discovery/ost.md` or `prd/prd.md`.',
        '`synthetic-vs-real.md` names at least two behavioural nuances from `P1` to `P5` (or your live calls) that synthetic personas smoothed over.',
        'Every file in `discovery/synthetic/` carries a clear `PRACTICE: SYNTHETIC` header.',
      ],
      resources: [
        {
          resourceId: 'nng-synthetic-users',
          why: 'When AI-generated personas help rehearse guides and why they cannot validate real customer problems.',
          required: true,
        },
        {
          resourceId: 'nng-ai-ux-survey',
          why: 'How UX researchers use AI around real studies without replacing human participants.',
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
        "Leadership asks why your bank app should build MoneyPilot now. Which statement is a diagnosis in Rumelt's strategy-kernel sense?",
      options: [
        {
          id: 'a',
          text: 'We will become the most trusted AI financial wellness companion in the Nordics within two years.',
        },
        {
          id: 'b',
          text: 'Monthly-paid customers see a raw balance like 14,000 kr mid-month without scheduled AvtaleGiro, eFaktura and card bills subtracted, so shortfalls stay hidden until days before the 25th.',
        },
        {
          id: 'c',
          text: 'This quarter we will ship an AI chat drawer, a spending breakdown chart and a savings challenge.',
        },
        {
          id: 'd',
          text: 'Competing neobanks are launching AI assistants, so we need to match their AI investment this half.',
        },
      ],
      correct: 'b',
      explanation:
        'A diagnosis names what is happening and the crux that makes it hard, backed by evidence. Option A is a fluffy goal, Option C is an unprioritised feature list, and Option D copies competitors without diagnosing a customer problem.',
    },
    {
      id: 'q3-2',
      competency: 'product-discovery',
      prompt:
        'A Claude Code research slice reports that a competing banking app "already forecasts all card and eFaktura bills automatically", citing a saved link. You want to cite it in tomorrow\'s review. What do you do?',
      options: [
        {
          id: 'a',
          text: 'Include it with the URL footnote, since the agent already opened and saved the page.',
        },
        {
          id: 'b',
          text: 'Run the same search in a second session and include the claim if both sessions agree.',
        },
        {
          id: 'c',
          text: 'Open the URL yourself, check the exact wording, and downgrade it to vendor-claim if a launch blog post is the only proof.',
        },
        {
          id: 'd',
          text: 'Drop all competitor references, because AI-assisted web research cannot be used in strategy docs.',
        },
      ],
      correct: 'c',
      explanation:
        'Agents frequently stretch a pilot announcement into a shipped capability. Opening the primary page takes two minutes, and labelling a press post as `vendor-claim` keeps your market map accurate.',
    },
    {
      id: 'q3-3',
      competency: 'product-discovery',
      prompt:
        'You have five pseudonymised interview snapshots (`P1` to `P5`) and want to use Claude Code during synthesis. What is the strongest sequence?',
      options: [
        {
          id: 'a',
          text: 'Write your own themes first, then ask a fresh Claude session that cannot read your synthesis for an independent pass, and adjudicate every difference against the quotes.',
        },
        {
          id: 'b',
          text: 'Run Claude first so you start from an unbiased summary, then edit its bullets from memory.',
        },
        {
          id: 'c',
          text: 'Upload the unedited video-call transcripts with participant names so the model catches subtle tone.',
        },
        {
          id: 'd',
          text: 'Generate five synthetic personas first so the synthesis rests on ten participants instead of five.',
        },
      ],
      correct: 'a',
      explanation:
        'Reading an AI summary first anchors your memory and buries contradictions you noticed live. Raw named transcripts breach participant privacy, and synthetic personas are never research evidence.',
    },
    {
      id: 'q3-4',
      competency: 'product-discovery',
      prompt:
        'Short on calendar time, a stakeholder suggests replacing user calls with 50 AI-generated personas answering your MoneyPilot discussion guide. How do you respond?',
      options: [
        {
          id: 'a',
          text: 'Agree, provided each persona is seeded with real balance-band statistics.',
        },
        {
          id: 'b',
          text: 'Agree, as long as you run the 50 personas across two model families and keep consensus themes.',
        },
        {
          id: 'c',
          text: 'Skip discovery altogether, ship v1 to everyone, and read support tickets afterwards.',
        },
        {
          id: 'd',
          text: 'Run 3 to 5 short real conversations, use AI to stress-test the guide and cross-check synthesis, and treat persona output strictly as hypotheses.',
        },
      ],
      correct: 'd',
      explanation:
        'Synthetic personas are overly articulate, agreeable and rational; they miss messy real-world workarounds and comprehension traps. Even three real 30-minute conversations beat fifty invented transcripts as evidence.',
    },
    {
      id: 'q3-5',
      competency: 'technical-collaboration',
      prompt:
        'Claude Code analyses `events.csv` and reports a `67.2%` conversion rate at `forecast_viewed`. What do you check first?',
      options: [
        {
          id: 'a',
          text: 'Whether switching to a higher-tier reasoning model changes the percentage.',
        },
        {
          id: 'b',
          text: 'Exact distinct-user counts, duplicate event rows and the denominator used, recomputing the rate in a spreadsheet pivot table.',
        },
        {
          id: 'c',
          text: 'Whether `67.2%` looks close to industry fintech benchmarks.',
        },
        {
          id: 'd',
          text: 'Whether the HTML bar chart renders cleanly at mobile width.',
        },
      ],
      correct: 'b',
      explanation:
        'Analytics bugs almost always sit in duplicate retries (raw event rows vs distinct `user_id`) or denominator mix-ups (`420` connected users vs `600` cohort users). Checking counts in a spreadsheet catches both immediately.',
    },
    {
      id: 'q3-6',
      competency: 'product-discovery',
      prompt:
        'Two MoneyPilot bets have similar Reach and Impact. One is backed by four interviews and the `bill_count = 0` funnel drop; the other comes from one vocal executive. Where does that difference enter RICE?',
      options: [
        {
          id: 'a',
          text: 'Nowhere: RICE is purely quantitative, so evidence source sits outside the formula.',
        },
        {
          id: 'b',
          text: "Boost Impact on the executive's idea because leadership sponsorship speeds up sign-off.",
        },
        {
          id: 'c',
          text: 'In Confidence: high when funnel data and multiple interviews converge, low when resting on a single opinion.',
        },
        {
          id: 'd',
          text: 'Let a fresh AI session rank the bet titles blind so human politics are removed.',
        },
      ],
      correct: 'c',
      explanation:
        'Confidence weights Reach and Impact by the strength of your evidence. Converging behavioural data and user stories earn high confidence; a single opinion earns low confidence until tested.',
    },
    {
      id: 'q3-7',
      competency: 'technical-collaboration',
      prompt:
        'While drafting `prd/prd.md`, you realise nobody has decided what `Safe-to-Spend` shows when balance data is more than 24 hours stale. What belongs in the PRD?',
      options: [
        {
          id: 'a',
          text: 'Mark it `[NEEDS INPUT]` (or `[BLOCKER]` if required for slice 1) under Open questions with a named owner, rather than inventing a rule.',
        },
        {
          id: 'b',
          text: 'Copy what a neobank blog post showed so engineering gets a complete document today.',
        },
        {
          id: 'c',
          text: 'Omit stale balances from the PRD and let the coding agent pick a sensible fallback during build.',
        },
        {
          id: 'd',
          text: 'Have Claude invent a 48-hour rule silently so the draft contains no bracketed markers.',
        },
      ],
      correct: 'a',
      explanation:
        'No invention: an explicit open question with an owner gets resolved deliberately, whereas a plausible-sounding guess gets built into code without review.',
    },
    {
      id: 'q3-8',
      competency: 'technical-collaboration',
      prompt:
        'Which requirement belongs in `prd/prd.md` for humans and coding agents to build from?',
      options: [
        {
          id: 'a',
          text: 'Persist forecasts in a Postgres materialised view refreshed every 15 minutes via a cron worker.',
        },
        {
          id: 'b',
          text: 'Pass raw transactions to the LLM on screen load and ask it to sum upcoming bills and return Safe-to-Spend.',
        },
        {
          id: 'c',
          text: 'The payday view should feel reassuring, effortless and accurate across edge cases.',
        },
        {
          id: 'd',
          text: 'Given current balance 14,000.00 kr on 14 March and 5 scheduled bills totalling 12,500.00 kr before 25 March, when Safe-to-Spend opens, then 1,500.00 kr is displayed alongside "scheduled bills only, excludes everyday spending".',
        },
      ],
      correct: 'd',
      explanation:
        'PRDs specify observable, testable behaviour. Option A dictates storage implementation, Option B hands deterministic arithmetic to a language model, and Option C cannot be tested.',
    },
    {
      id: 'q3-9',
      competency: 'agentic-systems',
      prompt:
        'MoneyPilot needs live account balances, exact bill totals and plain-language answers to user questions. Which architecture boundary belongs in your operating brief?',
      options: [
        {
          id: 'a',
          text: 'Fine-tune the model nightly whenever `AvtaleGiro` or `eFaktura` bills change.',
        },
        {
          id: 'b',
          text: 'Fetch authorised live records via read-only tools, compute all balances and totals in tested deterministic code, and scope the model to grounded explanation and `awaiting_approval` drafts.',
        },
        {
          id: 'c',
          text: 'Prompt a general model without tool lookups so latency stays low.',
        },
        {
          id: 'd',
          text: 'Give an autonomous agent direct transfer execution so short-buffer users avoid overdrafts automatically.',
        },
      ],
      correct: 'b',
      explanation:
        'Live balances belong in authorised retrieval, arithmetic belongs in deterministic code, and money movement requires explicit human approval rather than autonomous execution.',
    },
    {
      id: 'q3-10',
      competency: 'technical-collaboration',
      prompt:
        'A pilot batch of 1,000 `Ask MoneyPilot` trials costs 20 kr in model calls and 40 kr in human compliance review, and 800 replies meet the quality bar. What is the measured cost per acceptable reply?',
      options: [
        {
          id: 'a',
          text: '0.02 kr, counting model tokens only.',
        },
        {
          id: 'b',
          text: '0.06 kr, dividing total cost by all 1,000 attempts.',
        },
        {
          id: 'c',
          text: '0.075 kr, dividing total measured model and review cost (60 kr) by the 800 acceptable replies.',
        },
        {
          id: 'd',
          text: '0.05 kr, counting human review cost only.',
        },
      ],
      correct: 'c',
      explanation:
        '`(20 kr + 40 kr) / 800 = 0.075 kr` per acceptable reply. Operating estimates must count retries, failed attempts and human oversight, not raw token price alone.',
    },
  ],
  project: {
    title: 'Level 3 sign-off: decision pack',
    brief:
      'This is a 15 to 20 minute sign-off check, not a multi-hour rebuild. Review the artefacts you already created in Sessions 9 to 12: `strategy/strategy-kernel.md` and `strategy/market-map.md`, `discovery/synthesis.md` and `discovery/ost.md`, `data/funnel-analysis.md`, `data/impact-estimate.md` and `data/prioritised-bets.md`, plus `prd/operating-brief.md`, `prd/prd.md` and `prd/review-notes.md`. Verify that every claim links to a saved page, an in-segment quote or a spreadsheet-checked number, and run an optional mentor walkthrough (or a cold sceptical-engineer solo review).',
    deliverables: [
      {
        id: 'kernel',
        text: '`strategy/strategy-kernel.md` and `strategy/market-map.md` (Session 9) with unedited pages in `sources/market/` and five spot-checked URLs.',
      },
      {
        id: 'synthesis',
        text: "Pseudonymised `P1` to `P5` notes and `discovery/synthesis.md` (Session 10, hand synthesis written before Claude's, or clearly badged `PRACTICE` notes).",
      },
      {
        id: 'ost',
        text: '`discovery/ost.md` (Session 10) tracing opportunities to in-segment quotes and comparing 2 to 3 solutions including a non-AI option.',
      },
      {
        id: 'bets',
        text: '`data/funnel-analysis.md`, `data/funnel-dashboard.html`, `data/impact-estimate.md` and `data/prioritised-bets.md` (Session 11) verified against a spreadsheet.',
      },
      {
        id: 'prd',
        text: '`prd/operating-brief.md`, `prd/prd.md` and `prd/review-notes.md` (Session 12) with `always / ask first / never` rules, concrete acceptance criteria and zero slice-1 blockers.',
      },
      {
        id: 'sceptic',
        text: 'Optional mentor walkthrough as a sceptical engineer (or a cold-session backend-engineer critique logged with the edits you made).',
      },
    ],
    rubric: {
      correctness:
        'Market claims match saved pages, quotes are verbatim, two funnel rates match your spreadsheet, and `prd/prd.md` uses consistent numeric examples (`14,000 kr`, `12,500 kr`, `1,500 kr`) and deterministic math rules.',
      quality:
        'Diagnosis, interview evidence, `bill_count = 0` / comprehension data, RICE bets and PRD scope read as one connected argument with zero slice-1 blockers.',
      independence:
        'You wrote your diagnosis draft, hand synthesis, metric definitions and `grill-me` decisions before delegating synthesis, scripts or role reviews to Claude.',
      judgment:
        'Observed evidence is separated from assumptions, out-of-segment or synthetic inputs are excluded, contradictions are flagged openly, and explicit non-goals hold.',
    },
    privacyNote:
      'Keep fictional balances and practice CSVs only. Pseudonymised `P1` to `P5` interview snapshots stay inside your private local `workspace/`, never in a public GitHub repository, with any call recordings deleted once notes were written.',
    minutes: 20,
    xp: 175,
  },
  nextRecommendation:
    'Move to Level 4, where `prd/prd.md` turns into a full state-table design spec and `read / prepare / execute` tool contract (Session 13), a 30-conversation `Ask MoneyPilot` eval suite (Session 14), a 14-day experiment readout (Session 15) and an executive QBR deck (Session 16).',
}
