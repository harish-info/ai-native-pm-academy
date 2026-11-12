import type { Level } from '../types'

export const level3: Level = {
  id: 3,
  slug: 'discover-and-decide',
  title: 'Discover and decide',
  theme:
    'Test the Wayfinder hypothesis with strategy, user conversations, funnel data and a buildable PRD',
  summary:
    'Treat your Level 2 Wayfinder discovery probe as one hypothesis to test rather than a settled plan. Answer "why this, why now?" with source-pinned research, run story-based interviews and probe usability tests (with five checked-in Wayfinder notes as a safety net), audit a 600-user funnel event log by hand before scoring bets with RICE, and write a v1 PRD covering both deterministic Day Plan & Budget Split checks and the approval-gated Ask Wayfinder drawer.',
  outcomes: [
    'Write a one-page strategy kernel and a market map where every claim links to an unedited page saved in `sources/market/`.',
    'Run consented user interviews and probe usability tests, synthesise by hand before comparing with Claude, and build a quote-traced Opportunity Solution Tree.',
    'Write metric definitions before looking at results, audit `s11-events.csv` for duplicate rows and denominator traps in a spreadsheet, and score candidate bets with evidence-weighted RICE.',
    'Evaluate AI capability feasibility, multi-agent trade-offs, range impact and latency or cost budgets before choosing a bounded v1 bet (or recommending not building).',
    'Brief and review `prd/prd.md` with `always / ask first / never` contracts, concrete `Given / when / then` criteria, three fresh-session role reviews and a cold agent blocker check.',
  ],
  badge: {
    name: 'Evidence-Led PM',
    description:
      'Took Wayfinder from "why this, why now?" to a reviewed PRD, with every claim traced to a saved source, an interview quote or a figure checked by hand.',
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
      goal: 'Answer leadership\'s "why this, why now?" for Wayfinder with a source-pinned market map and a one-page strategy kernel, saving every raw page unedited in `sources/market/`.',
      whyItMatters:
        'Your Level 2 discovery probe made Wayfinder concrete: friends turn group-chat weekend ideas into a timeline with verified venue hours, real door-to-door transit buffers and honest remaining budget after booked stops. Now leadership asks why this problem matters now, how map apps, AI trip builders and shared notes handle it today, and what Wayfinder will refuse to build. One invented competitor claim in a strategy review loses the room.',
      learn: [
        {
          heading: 'Start from the outcome and treat the probe as a guess',
          paragraphs: [
            'Outcome-led teams own a measurable customer problem rather than a feature wish-list: for Wayfinder, helping friend and family groups complete two-day city trips without arriving at closed venues, missing booked slots on tight transfers or blowing their agreed budget, not "shipping a travel chatbot". State who is in that segment and over what trip window you measure success so leadership sees a direct line from traveller pain to product value.',
            'Your Level 2 static probe was cheap to build so people could react to concrete trade-offs, yet it remains a hypothesis. When coding agents make building fast, deciding what *not* to build becomes the bottleneck. Test whether deterministic hours, transit buffers and budget labels solve most of the job, where grounded AI replanning earns its keep, and when "do not add AI here" is the smartest call.',
          ],
        },
        {
          heading: 'One-page strategy kernel',
          illustration: 'strategy',
          paragraphs: [
            "Richard Rumelt's strategy kernel fits on one page in three parts: a **diagnosis** naming the evidence-backed crux of why group weekend planning breaks down today, a **guiding policy** stating the approach that tackles that crux by ruling options out, and **coherent actions** listing three to five mutually reinforcing steps including **what we will not do**.",
            'Goals dressed up as strategy ("become the most loved AI travel companion"), buzzword prose, unprioritised feature lists, or copying a rival launch blog without your own diagnosis are signs of bad strategy. Ruling out unapproved auto-booking, flight-fare scraping and visa or travel-insurance rulings is what gives Wayfinder\'s guiding policy teeth.',
          ],
        },
        {
          heading: 'Parallel research subagents versus fragile multi-agent chains',
          paragraphs: [
            'Split market research into three independent read-only slices across parallel Claude Code sessions or subagents: map and booking incumbents, standalone AI itinerary planners, and real-world group workarounds (WhatsApp threads, shared docs, Apple Notes and spreadsheets) plus public traveller complaints. Parallel subagents shine here because each slice reads separate sources with zero shared state, then hands clean files back to one synthesis pass.',
            'Notice the architecture lesson for Wayfinder itself: **independent read-only tasks parallelise well, whereas sequential multi-agent handoffs hurt when tasks share live state**. Chaining a planner agent, a budget agent and a booking agent in production multiplies p95 latency, drops constraints like a `tree-nut allergy` between turns, and compounds failure rates (`0.9 x 0.9 x 0.9 = 0.73`). Each research slice saves raw pages unedited in `sources/market/` and writes a one-page brief in `strategy/` with URL, date, saved file path, verbatim quote and an evidence label:',
          ],
          bullets: [
            '**Verified**: shown directly on a primary source you or the agent opened, such as official product help pages, live pricing or a public tourism report.',
            '**Vendor claim**: stated only in a company blog post, marketing landing page or launch demo; announced is not shipped or accurate in the field.',
            '**Unverified**: missing a saved source or unsupported when you open the page yourself; fix or drop it before assembling `strategy/market-map.md`.',
          ],
        },
        {
          heading: 'Compare data freshness, approval gates and non-AI workarounds',
          paragraphs: [
            'Trip planners differ less in chat prose than in whether code checks bank-holiday closures and step-free transit buffers, whether group constraints stay pinned during rainy-day swaps, and whether holds require explicit `Confirm hold` approval instead of silent bookings. Always map WhatsApp threads, shared Google Docs and Apple Notes alongside apps: your toughest competitor is the messy workaround friends already share.',
          ],
        },
      ],
      resources: [
        {
          resourceId: 'anthropic-subagents-course',
          why: 'This session runs three research slices in parallel; subagents let you run independent read-only slices cleanly inside one Claude Code session.',
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
          '**Think first (no AI):** Create `strategy/` and `sources/market/` in `workspace/`, and add the rule `"Save raw market pages unedited in sources/market/; briefs live in strategy/"` to `AGENTS.md`. Draft five lines naming Wayfinder\'s target outcome, your diagnosis guess, what deterministic hours and transit checks solve without AI, and two explicit non-goals.',
          '**Work with your agent:** Brief Claude Code to run three independent read-only slices: map and booking incumbents, standalone AI trip planners, and group-chat or notes workarounds without usernames. Save every opened page unedited in `sources/market/` and write one source-pinned brief per slice. Compile `strategy/market-map.md` strictly from those saved files.',
          '**Check and try to break it:** Pick five claims at random across the slice briefs and `strategy/market-map.md`. Open every original URL yourself to verify the exact sentence and check whether launch posts were mislabelled as verified features. Re-audit the whole slice if more than one claim fails.',
          '**Make the call:** Write `strategy/strategy-kernel.md` on one page covering outcome, evidence-linked diagnosis, guiding policy, 3 to 5 coherent actions and what Wayfinder will not do. Run a fresh-session weakest-link critique against `market-map.md` and commit the edits you accept.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code',
        where:
          'In workspace/, using three parallel sessions or subagents for the read-only slices and a fresh session for synthesis',
        briefChecklist: [
          "Context to read first: `AGENTS.md` and `product-context.md` for Wayfinder's weekend group-trip scope, deterministic boundaries and trust rules.",
          'Three independent read-only slices: (1) map and booking incumbents, (2) standalone AI itinerary apps, (3) group-chat, spreadsheet and notes workarounds stripped of usernames.',
          'Source-pinning rules: save every opened web page unedited in `sources/market/`, never invent facts, separate announced from shipped, and attach URL, date, saved file path, verbatim quote and `verified | vendor-claim | unverified`.',
          'Market map structure: compare target traveller segment, venue-hour and transit verification, deterministic vs AI roles, booking approval gates, and 5 to 8 unmet customer problems written without feature solutions.',
          'Audit hook: end each slice brief with the three claims the agent trusts least, then run a fresh-session weakest-link critique once `strategy-kernel.md` is drafted.',
        ],
        text: `Read AGENTS.md and product-context.md first to confirm Wayfinder's weekend group-trip users, deterministic code boundaries and safety constraints.

Run three independent read-only research slices (via subagents or one slice per session):
1. Map, transit and booking apps used to coordinate city weekends
2. Standalone AI trip planners and itinerary builders
3. Everyday group workarounds (WhatsApp threads, Apple Notes, shared spreadsheets) and public traveller complaints (strip all usernames and personal details)

For every page opened, save the raw text unedited in sources/market/<site>-<topic>.md, then write a one-page strategy/brief-<slice>.md where every claim cites the URL, today's date, saved file path, exact supporting sentence and label (verified, vendor-claim or unverified). Write "unknown" where a page does not state a fact, distinguish announced from shipped, and end each brief with the three claims you trust least.

After I audit five source links, I will ask a fresh session to assemble strategy/market-map.md from those briefs and sources/market/ only, and critique my one-page strategy/strategy-kernel.md for unsupported claims or missing non-goals.`,
      },
      expectedOutput: [
        '`sources/market/` containing unedited raw pages and three one-page slice briefs in `strategy/` with URLs, dates, verbatim quotes and evidence labels.',
        '`strategy/market-map.md` comparing 4 to 8 travel apps, AI planners and group workarounds, plus 5 to 8 quote-backed traveller problems and claims to drop.',
        'A one-page `strategy/strategy-kernel.md` covering outcome, diagnosis, guiding policy, coherent actions and what Wayfinder will not do.',
      ],
      artifact:
        '`strategy/strategy-kernel.md` and `strategy/market-map.md`, backed by unedited files in `sources/market/`.',
      verification: [
        "You opened five cited URLs yourself and recorded whether each page matched the brief's sentence and label.",
        'Every row in `strategy/market-map.md` points to a saved file in `sources/market/` and carries an evidence label.',
        'Every unmet need is written as a traveller problem rather than a disguised feature request.',
        "The kernel's diagnosis states an evidence-backed crux and its coherent actions explicitly rule out non-goals (such as auto-booking holds, flight scraping or visa rulings).",
      ],
      reflectionPrompts: [
        'Which claim looked most convincing until you opened the underlying URL yourself?',
        "Where did a simple group workaround (like Apple Notes or a pinned chat message) beat dedicated travel apps, and how did that shape Wayfinder's guiding policy?",
      ],
      checklist: [
        {
          id: 'sources',
          text: 'Saved unedited raw pages in `sources/market/` and one source-pinned brief per parallel slice in `strategy/`',
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
          text: 'Wrote a one-page `strategy/strategy-kernel.md` including what Wayfinder will not do',
        },
      ],
      mentorMove:
        'Pick three rows from `strategy/market-map.md` at random and ask "show me the exact sentence in `sources/market/`." Then read `strategy-kernel.md` as a sceptical travel-product VP and ask "why add an AI replanning drawer instead of stopping at deterministic hours and transit warnings?"',
      soloMove:
        'Open a brand-new Claude Code session with no prior context, give it only `strategy/strategy-kernel.md`, `strategy/market-map.md` and `sources/market/`, and ask it to act as a sceptical consumer-travel VP trying to kill the pitch: find one diagnosis claim resting only on a vendor blog, one workaround you underestimated, and one vague non-goal.',
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
        'Notes from 3 to 5 async user calls (or the five checked-in Wayfinder snapshots)',
        'Your Level 2 Wayfinder discovery probe',
      ],
      prerequisites: ['s9'],
      competencies: ['product-discovery', 'ux-prototyping'],
      xp: 125,
      mentorReview: 'optional',
      practicalProof: true,
      safetyCritical: true,
      goal: 'Synthesise 3 to 5 consented story-based interviews and probe usability tests (held ahead of class, or using the five checked-in Wayfinder snapshots `P1.md` to `P5.md`) by hand before comparing with Claude, and build an evidence-traced Opportunity Solution Tree.',
      whyItMatters:
        "Market research tells you what travel apps claim; talking to weekend organisers reveals what actually happens in the rain outside a closed Monday museum when a friend's `tree-nut allergy` sits 34 messages up in WhatsApp. Models can invent polite personas in seconds and none of them happened, so keeping pseudonymised human observations separate from AI summaries is the core discovery discipline.",
      learn: [
        {
          heading: 'Story interview first, discovery probe second',
          paragraphs: [
            'Run each 30-minute conversation asynchronously ahead of this session in two halves: 15 minutes of story-based interviewing before showing any screen, then 15 minutes watching the participant use your Level 2 static probe. Ask about the **last specific weekend trip** they coordinated with friends or family (`"Walk me through the last city break where a venue schedule, transfer or group budget went sideways"`), never hypotheticals like `"Would you download Wayfinder?"`. Listen closely for workarounds such as copying Monday closures into Apple Notes or keeping backup cafes in a spreadsheet: workarounds mark real pain.',
            'In the usability half, explain that the itinerary is fictional, set a realistic task on `Day Plan & Budget Split` and stay quiet while they think aloud. Record concrete actions (`"tapped the museum row three times looking for when hours were verified"`), not `"liked the clean typography"`, and end with two comprehension checks: what `Left after booked stops` includes versus excludes (meals and local transit), and how they interpret venue-hour verification and transit buffers (Monday or holiday closures and step-free vs stairs routing).',
          ],
        },
        {
          heading: 'Consent, pseudonymisation and the checked-in snapshots',
          paragraphs: [
            'Obtain separate consent for taking notes, for any recording, and before processing pseudonymised notes with Claude. Replace names with `P1` to `P5`, strip surnames, workplaces and real booking references, delete recordings once your one-page snapshot is written, and keep `discovery/interview-notes/` strictly inside your private `workspace/`, never in a public GitHub repo.',
            'Real conversations are the primary path. If schedules slipped despite starting outreach in Session 6, use the five checked-in Wayfinder snapshots in **Practice files** (`P1.md` to `P5.md`, featuring an out-of-segment luxury concierge traveller in `P3`, `"we just wing it"` confidence contradicted by a rainy Monday closure in `P2`, buried WhatsApp allergy notes in `P4`, and step-free lift delays in `P5`) rather than asking AI to role-play fake travellers, and badge your files `PRACTICE: real-user validation outstanding`. Synthetic personas help rehearse a guide, never count as evidence.',
          ],
        },
        {
          heading: 'Synthesise by hand before opening Claude',
          paragraphs: [
            'Reading an AI synthesis first anchors your memory around tidy quotes and flattens contradictions (such as `P2` insisting over-planning ruins city breaks, then describing 55 minutes arguing in the rain outside a closed museum, or `P1` pitching 3am flight-fare scraping after losing tickets to a slow river crossing). Write `"My synthesis"` in `discovery/synthesis.md` by hand first, exclude out-of-segment luxury praise (`P3`) and single-person tangents, then run a fresh Claude Code session on `P1.md` to `P5.md` alone into `discovery/synthesis-claude.md`, settling every difference against verbatim quotes.',
          ],
        },
        {
          heading: 'Opportunity Solution Trees',
          illustration: 'discovery',
          paragraphs: [
            "Teresa Torres's Opportunity Solution Tree links one target outcome at the top to concrete customer opportunities (needs and pain points written in user language and traced to in-segment `P1` to `P5` quotes) in the middle, and 2 to 3 competing solutions plus assumption tests under one chosen opportunity at the bottom.",
            'Keep opportunities phrased as real difficulties (`"cannot tell if back-to-back stops leave enough door-to-door transit time"`), never disguised features (`"needs an AI chat drawer"`). Your Level 2 probe sits beside simpler non-AI fixes (such as high-contrast meal-exclusion labels, visible opening-hour `as_of` badges or paste-from-chat place import), compared on how directly each addresses the chosen opportunity.',
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
          path: 'datasets/wayfinder/s10-interviews/P1.md',
          note: 'Porto weekend planner who missed tickets on a river crossing, misread the meal-exclusion caption and pitched flight scraping.',
        },
        {
          label: 'Interview snapshot P2',
          path: 'datasets/wayfinder/s10-interviews/P2.md',
          note: '"We just wing it" opener contradicted by a rainy Lisbon walk to a closed Monday museum and Apple Notes workarounds.',
        },
        {
          label: 'Interview snapshot P3',
          path: 'datasets/wayfinder/s10-interviews/P3.md',
          note: 'Out-of-segment luxury hotel concierge traveller offering polite UI praise and Michelin cancellation-sniping wishes.',
        },
        {
          label: 'Interview snapshot P4',
          path: 'datasets/wayfinder/s10-interviews/P4.md',
          note: 'Four-friend Amsterdam organiser with a buried WhatsApp tree-nut allergy and budget-label friction (links to s11 imported_places_count = 0).',
        },
        {
          label: 'Interview snapshot P5',
          path: 'datasets/wayfinder/s10-interviews/P5.md',
          note: 'Parent navigating step-free stroller lifts and bank-holiday early closures, tapping venues for hours provenance.',
        },
        {
          label: 'Session 10 synthesis answer key',
          path: 'datasets/wayfinder/s10-answer-key.md',
          note: 'Reference opportunities, out-of-segment exclusions and probe comprehension traps across P1 to P5.',
          sealed: true,
        },
      ],
      task: {
        summary:
          'Capture 3 to 5 consented snapshots (or use the `P1` to `P5` Wayfinder practice notes), synthesise by hand before comparing with an isolated Claude session, and build `discovery/ost.md`.',
        steps: [
          '**Think first (no AI):** Save `discovery/discussion-guide.md` separating past-trip story questions from silent probe tasks and two comprehension checks (meal/transit budget exclusions and hours/routing provenance). Place your pseudonymised `P1.md` to `P5.md` call snapshots in `discovery/interview-notes/` (or copy in the five Wayfinder practice notes marked `PRACTICE`). Write `"My synthesis"` in `discovery/synthesis.md` before opening Claude.',
          '**Work with your agent:** Start a fresh Claude Code session and forbid it from reading `discovery/synthesis.md`. Have it read only `product-context.md` and `discovery/interview-notes/P1.md` to `P5.md` to write `discovery/synthesis-claude.md` with quote-backed opportunities, weak-signal flags, out-of-segment exclusions and ranked probe comprehension gaps.',
          '**Check and try to break it:** Compare `"My synthesis"` with `synthesis-claude.md` quote by quote, opening the sealed `s10-answer-key.md` afterward if you used the practice notes. Check whether luxury concierge praise (`P3`), flight-scraping tangents (`P1`) or `"we wing it"` generalisations (`P2`) slipped into core opportunities.',
          '**Make the call:** Log `"Where we differ"` with your ruling in `discovery/synthesis.md`. Build `discovery/ost.md` with 4 to 6 quote-traced opportunities, 2 to 3 competing solutions (including a non-AI fix) under one chosen opportunity, and file clean comprehension issues on `product-prototype`.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code',
        where:
          'A fresh session in workspace/ after you have written discovery/synthesis.md by hand',
        briefChecklist: [
          'Isolation rule: read `discovery/interview-notes/P1.md` to `P5.md` (plus `product-context.md` for target segment) and do NOT open `discovery/synthesis.md`.',
          "Segment hygiene: flag any participant outside Wayfinder's self-guided weekend group-trip segment so polite praise or concierge habits stay out of core evidence.",
          'Evidence standard: write first-person opportunities citing participant IDs and verbatim quotes, marking single-person tangents `weak signal` and catching contradictions between opening claims and real trip stories.',
          'Usability and comprehension: rank observed hesitations and check whether each participant noticed that meals and local transit are excluded from remaining budget and how hours or step-free buffers were verified.',
          'No solutions yet: propose 4 to 6 parent opportunities for the OST without inventing quotes or jumping to features.',
        ],
        text: `Read product-context.md (for target segment definition) and discovery/interview-notes/P1.md to P5.md. Do NOT read discovery/synthesis.md: I wrote my own synthesis first and want an independent pass to compare against.

All notes are pseudonymised; do not attempt to identify anyone. Write discovery/synthesis-claude.md covering:
1. Segment check: flag any participant outside our self-guided group or family weekend segment and keep their wishes out of core opportunities.
2. Opportunities: distinct traveller pains in first-person words, citing participant IDs, verbatim quotes, contradictions between opening claims and specific past trips, and "weak signal" where only one in-segment person raised a tangent.
3. Probe usability and comprehension: observed hesitations on Day Plan & Budget Split plus per-participant comprehension of (a) what "Left after booked stops" excludes (meals and local transit) and (b) venue-hour verification dates, Monday/holiday closures and step-free routing assumptions.
4. Four to six parent opportunities for an Opportunity Solution Tree (no solutions yet) and three follow-up questions for the next interview round.`,
      },
      expectedOutput: [
        '`discovery/discussion-guide.md` separating past-trip story questions from silent probe tasks and comprehension checks.',
        'Pseudonymised `P1.md` to `P5.md` snapshots in `discovery/interview-notes/` (real async calls or clearly badged Wayfinder `PRACTICE` notes).',
        '`discovery/synthesis.md` containing your hand-written synthesis first, a link to `synthesis-claude.md`, and `"Where we differ"` rulings.',
        '`discovery/ost.md` tracing every opportunity to in-segment participant quotes and comparing 2 to 3 solutions (including a non-AI option) under your chosen opportunity.',
      ],
      artifact:
        '`discovery/interview-notes/`, `discovery/synthesis.md` and `discovery/ost.md`, plus anonymised comprehension issues on `product-prototype`.',
      verification: [
        'Consent was obtained for real calls, recordings were deleted after writing snapshots, and zero real names, workplaces or booking references appear anywhere.',
        '`"My synthesis"` was written before running Claude, and every discrepancy in `"Where we differ"` cites the quote or observation that settled it.',
        'Out-of-segment praise (`P3`), off-scope tangents and synthetic personas are excluded from `ost.md` evidence.',
        'Prototype GitHub issues describe reproducible UI comprehension steps with zero participant details.',
      ],
      reflectionPrompts: [
        "Where did a participant's specific past trip contradict how relaxed or organised they sounded in the first two minutes?",
        'Which comprehension gap on the probe (`meals and local transit excluded` or `hours and step-free provenance`) surprised you most, and could clearer deterministic labels fix it?',
      ],
      checklist: [
        {
          id: 'conversations',
          text: 'Completed 3 to 5 consented user snapshots (or badged the Wayfinder `P1` to `P5` practice notes) in private `workspace/`',
        },
        {
          id: 'hand-first',
          text: 'Wrote `"My synthesis"` by hand before running Claude\'s isolated synthesis pass',
        },
        {
          id: 'compared',
          text: 'Compared both syntheses quote by quote (and checked `s10-answer-key.md` if using practice notes) with written rulings',
        },
        {
          id: 'ost',
          text: 'Built `discovery/ost.md` traced to in-segment quotes with competing solutions and filed clean prototype issues',
        },
      ],
      mentorMove:
        'Run a 10-minute mock interview first where you give breezy, hypothetical answers ("We never plan weekends, we just wing it") until they anchor you on the last city break that hit rain or a closed museum. Afterwards, inspect `discovery/ost.md` and challenge whichever opportunity rests on the thinnest quote.',
      soloMove:
        'Ask one friend or colleague for 15 minutes on your live probe link just to run the silent think-aloud and the two comprehension checks (what the remaining budget figure excludes, and whether Monday closures and step-free buffers are verified), then use a fresh Claude session to audit `discovery/ost.md` for opportunities disguised as features.',
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
        'Your interviews surfaced *why* group ideas stay trapped in chat screenshots (`P4`) or why travellers misread remaining budget; event logs show *how many* users stall at each step. Claude Code can calculate a funnel and rank a roadmap in minutes, yet `42` duplicate Android retry rows or a muddled denominator will produce a polished chart pointing straight at the wrong bet.',
      learn: [
        {
          heading: 'Write metric definitions before looking at any result',
          paragraphs: [
            'Product analytics starts from an event log (`user_id`, `timestamp`, `event_name` plus cohort attributes like `trip_type`, `budget_band`, `device` and `imported_places_count`). Most bad roadmap calls come from definition mistakes: counting raw event rows instead of distinct users, dividing by the previous step while calling it cohort reach, or treating an optional drill-down (`stop_detail_opened`) as a mandatory funnel gate.',
            'Use the checked-in `s11-events.csv` (`600` fictional Wayfinder cohort users across `app_opened`, `trip_created`, `itinerary_viewed`, `stop_detail_opened` and `shared_or_saved_weekend`) so your math is reproducible against ground truth. Write your exact cohort, core-step and completion definitions at the top of `data/funnel-analysis.md` before running a single query.',
          ],
        },
        {
          heading: 'Audit duplicates, denominators and segments by hand',
          illustration: 'funnel',
          paragraphs: [
            'Have Claude Code compute funnel counts with a deterministic script, never mental arithmetic, showing exact `n / N` user counts beside every percentage. Then open `s11-events.csv` in a spreadsheet and recompute at least two rates yourself:',
          ],
          bullets: [
            '**Duplicate retries**: compare raw rows against distinct `user_id` per event (`itinerary_viewed` contains `42` duplicate Android retry rows that inflate raw row ratios to `67.2%` against `app_opened` instead of `360 / 600 = 60.0%` unique cohort reach).',
            '**Denominator and optional-step traps**: on `stop_detail_opened` (`234` users), `234 / 360 = 65.0%` is step-to-step among itinerary viewers whereas cohort reach is `234 / 600 = 39.0%`, and `45` users completed `shared_or_saved_weekend` (`168 / 600 = 28.0%`) without ever opening a stop detail.',
            "**Segment bottlenecks**: slice `trip_created` through `shared_or_saved_weekend` by `trip_type`, `budget_band`, `device` and `imported_places_count` (`group` planners with `imported_places_count = 0` convert at only `4.0%`, `3 / 75`, versus `63.5%` with `3 to 6` stops, echoing `P4`'s WhatsApp screenshot friction).",
            '**Selection bias vs causation**: `imported_places_count = 0` mixes blocked group organisers with casual browsers creating placeholder trips, so never assume a new importer converts `100%` of blank trips at the `63.5%` power-user rate.',
          ],
        },
        {
          heading: 'Range impact estimates and evidence-weighted RICE',
          illustration: 'impact',
          paragraphs: [
            'Write opportunity impact as a **low, base and high** sum with explicit units rather than one false-precision figure. For example, across `10,000` new users (`1,250` `group` trip creators stalling at `imported_places_count = 0`), show what `30%`, `50%` and `70%` import recovery at realistic conversion lifts adds in saved or shared weekend plans per month, tagging every input `data`, `interviews`, `market` or `assumption`.',
            'Then score 5 or more candidate Wayfinder bets (including deterministic non-AI bets like high-contrast `$85.50` meal-exclusion copy and venue-hour `as_of` provenance alongside paste-from-chat place import and the `Ask Wayfinder` rainy-day replan drawer) with **RICE** (Reach, Impact, Confidence, Effort). Tie Confidence strictly to evidence strength, and compare against a blind AI ranking from bet titles alone.',
          ],
        },
        {
          heading: 'One-page scripted funnel view',
          paragraphs: [
            'Engineers, designers and managers scan one clear screen far faster than a long Markdown note. Have a script generate `data/funnel-dashboard.html` directly from `data/events.csv` rather than typing numbers into HTML by hand, so rerunning the script updates every bar whenever definitions change.',
            'Put the question, cohort window and headline bottleneck at the top, keep `n / N` counts and denominator labels visible on every bar, use plain bars with text labels instead of donuts or colour-only cues, badge `"Fictional Wayfinder practice data"`, and verify two chart figures against your spreadsheet.',
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
          label: 'Wayfinder cohort event log (CSV)',
          path: 'datasets/wayfinder/s11-events.csv',
          note: '600 cohort users across app_opened, trip_created, itinerary_viewed, stop_detail_opened and shared_or_saved_weekend.',
        },
        {
          label: 'Session 11 funnel answer key',
          path: 'datasets/wayfinder/s11-answer-key.md',
          note: 'Exact deduplicated counts, 42 Android retry rows, the 65.0% vs 39.0% stop_detail_opened trap and the group imported_places_count = 0 cliff.',
          sealed: true,
        },
      ],
      task: {
        summary:
          'Define funnel metrics upfront, audit `s11-events.csv` with a script and a spreadsheet pivot table, build `data/funnel-dashboard.html`, estimate range impact, and score 5+ Wayfinder bets with RICE.',
        steps: [
          '**Think first (no AI):** Copy `s11-events.csv` to `data/events.csv` while keeping `s11-answer-key.md` sealed, and inspect its columns in a spreadsheet. Write your exact definitions for cohort user, core funnel steps (deciding whether `stop_detail_opened` is optional) and `shared_or_saved_weekend` completion at the top of `data/funnel-analysis.md`.',
          '**Work with your agent:** Brief Claude Code to audit `data/events.csv` with a deterministic script using your definitions, reporting duplicate retries and `n / N` counts for cohort and step-to-step denominators. Have the script slice conversion by `trip_type`, `budget_band`, `device` and `imported_places_count`, and generate `data/funnel-dashboard.html`. Also ask a fresh session to rank your candidate bet titles blind.',
          '**Check and try to break it:** Recompute two conversion rates and the duplicate-row gap yourself in a spreadsheet pivot table, and check that `funnel-dashboard.html` matches your sheet. Open `s11-answer-key.md` to confirm you caught the `42` Android `itinerary_viewed` retry rows, the `65.0%` versus `39.0%` `stop_detail_opened` denominator trap, and `group` trips with `imported_places_count = 0` finishing at `4.0%`.',
          '**Make the call:** Write `data/impact-estimate.md` as a low, base and high range with source-labelled inputs. Score at least five Wayfinder bets (including a deterministic non-AI fix) with RICE in `data/prioritised-bets.md`, and record your v1 scope call plus what you cut.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code',
        where:
          'In workspace/ after saving data/events.csv and writing definitions in data/funnel-analysis.md',
        briefChecklist: [
          'Definitions first: read the metric and funnel definitions at the top of `data/funnel-analysis.md` and do not substitute your own.',
          'Scripted audit on `data/events.csv`: inspect raw row count vs distinct `user_id` per event, flag duplicate retries, and report both `% of cohort` (`600`) and `% of previous step` with exact `n / N` counts.',
          'Segment drill-down: break down conversion across `trip_type`, `budget_band`, `device` and `imported_places_count` (`0`, `1 to 2`, `3 to 6`), separating selection bias from causation.',
          'Scripted one-page HTML view: generate `data/funnel-dashboard.html` directly from `data/events.csv` with plain bar charts, `n` beside every rate and a `"Fictional Wayfinder practice data"` badge.',
          'Blind baseline before RICE: rank my candidate bet names from titles and a one-line problem alone before reading `ost.md` or `funnel-analysis.md` so I can compare what evidence changes.',
        ],
        text: `Read the metric definitions I wrote at the top of data/funnel-analysis.md first, then write and run a deterministic Python script to audit data/events.csv. Do not compute numbers in your head.

1. Data hygiene: report total rows, distinct users, and any duplicate user-timestamp-event retries (broken down by device and event_name).
2. Funnel and completion: using distinct users and my definitions, report app_opened, trip_created, itinerary_viewed, stop_detail_opened (per my optional vs required rule) and shared_or_saved_weekend, showing exact n / N counts for both cohort conversion and step-to-step conversion.
3. Bottleneck segments: slice conversion by trip_type, budget_band, device and imported_places_count (0, 1-2, 3-6), checking where group planners stall.
4. Append your scripted tables and confidence notes to data/funnel-analysis.md, and generate data/funnel-dashboard.html by script from data/events.csv (plain bars, counts and denominators beside every rate, definitions footer, "Fictional Wayfinder practice data" badge).`,
      },
      expectedOutput: [
        '`data/funnel-analysis.md` starting with your written definitions, followed by deduplicated `n / N` funnel counts, spreadsheet checks and comparison against `s11-answer-key.md`.',
        '`data/funnel-dashboard.html` generated by script from `data/events.csv`, matching your spreadsheet pivot table.',
        '`data/impact-estimate.md` showing low, base and high ranges in completed weekend plans with every input labelled by source.',
        '`data/prioritised-bets.md` comparing a blind AI ranking against evidence-weighted RICE across 5+ Wayfinder bets including a non-AI option.',
      ],
      artifact:
        '`data/funnel-analysis.md`, `data/funnel-dashboard.html`, `data/impact-estimate.md` and `data/prioritised-bets.md`.',
      verification: [
        'Two funnel percentages and the duplicate-row count match your own spreadsheet pivot table.',
        'Every rate in `funnel-analysis.md` and `funnel-dashboard.html` displays exact `n / N` user counts and states its denominator.',
        'Your audit identified the `42` Android retry rows, the `65.0%` vs `39.0%` `stop_detail_opened` denominator trap, and the `4.0%` `group` `imported_places_count = 0` bottleneck.',
        'Every RICE confidence score cites `data`, `interviews`, `market` or `assumption`, and includes at least one deterministic non-AI bet.',
      ],
      reflectionPrompts: [
        "How did connecting `P4`'s WhatsApp screenshot story with the `4.0%` `group` `imported_places_count = 0` funnel cliff reshape your v1 bet list?",
        "Where did Claude's blind bet ranking diverge most from your evidence-weighted RICE table?",
      ],
      checklist: [
        {
          id: 'definitions',
          text: 'Wrote cohort, core-step and completion definitions in `data/funnel-analysis.md` before reading any results',
        },
        {
          id: 'hand-check',
          text: 'Recomputed two funnel rates and duplicate-row counts in a spreadsheet and verified `funnel-dashboard.html`',
        },
        {
          id: 'planted',
          text: 'Verified findings against `s11-answer-key.md` (`42` Android retries, `65.0%` vs `39.0%` trap, `4.0%` blank-import group rate)',
        },
        {
          id: 'bets',
          text: 'Wrote a low/base/high `impact-estimate.md` and scored 5+ Wayfinder bets (including a non-AI fix) with RICE',
        },
      ],
      mentorMove:
        'Give rough engineering T-shirt effort sizes (`S`, `M`, `L`) for their top five Wayfinder bets and explain the hidden complexity behind the hardest one (such as live restaurant-hold partner APIs vs paste-from-chat text extraction). Then point to one percentage on `funnel-dashboard.html` and ask "out of which exact denominator?"',
      soloMove:
        'Hide `data/funnel-analysis.md`, open `data/funnel-dashboard.html` cold after a short break, and check whether a reader can tell in 15 seconds whether `65.0%` on `stop_detail_opened` means 65% of all `600` users or 65% of the `360` itinerary viewers. Tighten any ambiguous chart label and re-verify against your spreadsheet.',
    },
    {
      id: 's12',
      levelId: 3,
      number: 12,
      title: 'A PRD people and agents can build from',
      difficulty: 'Advanced',
      minutes: 105,
      tools: ['Claude Code', 'Your Level 2 Wayfinder discovery probe'],
      prerequisites: ['s11'],
      competencies: ['product-discovery', 'technical-collaboration'],
      xp: 150,
      mentorReview: 'optional',
      practicalProof: true,
      goal: 'Write a one-page AI feasibility and operating brief, then use `grill-me`, three-tier behavioural contracts (`always / ask first / never`), concrete `Given / when / then` criteria, three fresh-session role reviews and a cold agent blocker check to ship `prd/prd.md`.',
      whyItMatters:
        'Engineers, designers, trust-and-safety reviewers and coding agents will build Wayfinder v1 from `prd/prd.md` without reading your raw interview snapshots. Any silence around budget-exclusion wording, allergy pinning during rainy-day swaps, latency budgets or `Confirm hold` gates becomes a silent guess in production code.',
      learn: [
        {
          heading: 'AI capability feasibility, latency/cost envelope and ownership',
          illustration: 'solution',
          paragraphs: [
            'A buildable AI PRD pairs standard product sections (problem, outcome, scope and non-goals, numbered flows, behavioural contracts, `Given / when / then` criteria, tracking, open questions and an **Eval plan**) with an explicit **feasibility and operating envelope** in `prd/operating-brief.md`. Climb the complexity ladder one rung at a time: what deterministic code owns 100%, where single-turn model extraction or grounded replanning is reliable today (versus brittle autonomous multi-agent chains), and what latency, fallback and unit-cost ceiling v1 must hold (for example, p95 replan response under `4.0 seconds` on mobile, graceful fallback to the static timeline on timeout, and `$0.04` to `$0.08` total cost per acceptable replan including tool lookups, retries and safety review).',
            'In Wayfinder v1, **Day Plan & Budget Split** is 100% deterministic code: verified venue hours with `as_of` dates and Monday/holiday flags, door-to-door and `step-free` transit buffers, and `$180` cap minus `$94.50` booked = `$85.50` `Left after booked stops (meals and local transit not included)`. **Ask Wayfinder** (and optional chat-paste import for the `imported_places_count = 0` bottleneck) uses one bounded model loop grounded in read-only tools (`check_venue_hours`, `get_transit_time`, `get_budget_summary`) plus human-gated staging (`prepare_reservation_hold`, `prepare_group_poll` at `status: "awaiting_approval"`).',
          ],
        },
        {
          heading: 'No invention, flagged tensions and behaviour first',
          paragraphs: [
            'Use the `product-templates` PRD headings from Tutorials, courses and sources, enforcing three rules on both yourself and Claude:',
          ],
          bullets: [
            '**No invention**: unmade choices become `[NEEDS INPUT]`, unverified estimates `[ASSUMPTION: reason]`, and anything slice 1 cannot ship without `[BLOCKER: NEEDS INPUT]`, each with a named owner.',
            '**Flag tensions openly**: where Session 10 probe findings (`$85.50` misread as covering meals; missing hours `as_of` provenance) and Session 11 funnel data (`75` `group` planners stalling at `imported_places_count = 0` with `4.0%` completion) compete for engineering weeks, state both and explain how phase 1 sequences them.',
            '**Behaviour before implementation**: specify observable states, exact copy, latency budgets and safety rules rather than prescribing database schemas or model vendors.',
          ],
        },
        {
          heading: 'Three-tier contracts and concrete `Given / when / then` criteria',
          paragraphs: [
            'Write Wayfinder\'s behavioural contracts in Addy Osmani\'s three tiers: **Always** compute venue hours, transit gaps and per-person budget splits in deterministic code, attach `"Left after booked stops (meals and local transit not included)"` in high-contrast primary text, keep `tree-nut allergy` and `step-free` tags pinned across every replan, show hours `as_of` timestamps, and isolate scraped venue descriptions or reviews as untrusted data; **Ask first** when group constraints conflict or before placing any table hold or sending any group poll (`status: "awaiting_approval"`, showing deposit, cancellation cutoff and recipients behind explicit `Confirm hold`); **Never** auto-book or charge a card, invent opening hours or transit minutes outside tool outputs, rule on visa eligibility, travel-insurance coverage or medical fitness, or fabricate refund statuses on billing disputes instead of handing off to human support.',
            'Turn flows and edge cases (`imported_places_count = 0`, closed-on-Monday museum, `38-minute` harbour transfer inside a `30-minute` gap, stale hours older than 7 days, prompt injection inside a pasted bistro bio) into testable `Given / when / then` criteria, and list 10 representative `Ask Wayfinder` prompts in the Eval plan for Session 14.',
          ],
        },
        {
          heading: 'Grill-me first, three role reviews, and the cold blocker check',
          paragraphs: [
            'Have Claude run `grill-me` one question at a time before drafting `prd/prd.md`. Then run three independent reviews in fresh sessions (engineer, designer and trust-and-safety partner) appending findings to `prd/review-notes.md` without touching your PRD. Finish by giving `prd/prd.md` alone to a fourth cold session to verify zero `[BLOCKER]` ambiguities remain for slice 1.',
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
          why: 'Why changing venue schedules, transit times and group budgets belong in live tool retrieval and code rather than fine-tuned weights.',
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
          'Write `prd/operating-brief.md` covering AI feasibility, latency and cost budgets, use `grill-me` to draft `prd/prd.md`, run three fresh-session role reviews, and pass a cold-agent blocker test.',
        steps: [
          '**Think first (no AI):** Create `prd/` and copy the `product-templates` PRD headings (plus `Prototype link` and `Eval plan`) into `prd/prd.md`. Hand-write `prd/operating-brief.md` on one page defining deterministic code ownership (`Day Plan & Budget Split`), AI feasibility boundaries (`Ask Wayfinder`), p95 replan latency, timeout fallback and cost per acceptable replan.',
          '**Work with your agent:** Brief Claude Code to read your Level 3 files and `grill-me` one open decision at a time, giving a file-cited recommendation and marking unknowns `[NEEDS INPUT]` or `[BLOCKER: NEEDS INPUT]`. Draft `prd/prd.md` with `always / ask first / never` contracts, concrete `Given / when / then` criteria, metrics and a 10-case Eval plan.',
          '**Check and try to break it:** Run three separate fresh-session critiques (engineer, designer and trust-and-safety reviewer) writing only to `prd/review-notes.md` without editing `prd/prd.md`. Open a fourth cold session given *only* `prd/prd.md` to surface every ambiguity that would force a builder to guess on slice 1.',
          '**Make the call:** Record `Accepted`, `Rejected (with reason)` or `Open question (with owner)` on every item in `prd/review-notes.md`. Edit `prd/prd.md` in your own words until zero `[BLOCKER]` gaps remain for slice 1, and commit.',
        ],
      },
      agentPrompt: {
        tool: 'Claude Code',
        where:
          'In workspace/ for grill-me and drafting, then four separate fresh sessions for the role reviews and cold blocker test',
        briefChecklist: [
          'Workspace evidence to read first: `AGENTS.md`, `product-context.md`, `prd/operating-brief.md`, `strategy/`, `discovery/synthesis.md`, `discovery/ost.md` and `data/prioritised-bets.md`.',
          'Grill-me before drafting: ask one question at a time with a file-backed recommended answer, never invent product rules, and mark gaps `[NEEDS INPUT]`, `[ASSUMPTION: reason]` or `[BLOCKER: NEEDS INPUT]`.',
          'Feasibility, latency/cost and safety contracts: p95 latency and cost-per-replan envelope from `operating-brief.md`, plus `always / ask first / never` rules (deterministic hours, transit and budget math; `Confirm hold` on `awaiting_approval` drafts; pinned allergy/step-free constraints; untrusted venue-text isolation; visa/insurance/billing boundaries).',
          'Testable acceptance criteria and evals: phase-1 `Given / when / then` checks with concrete numbers (`$180` cap, `$94.50` booked, `$85.50` left excluding meals/transit, `38-min` ferry clash, `imported_places_count = 0`) plus a 10-prompt `Ask Wayfinder` Eval plan.',
          'Independent review loop: run engineer, designer and trust-and-safety critiques in fresh sessions writing only to `prd/review-notes.md`, followed by a cold session reading `prd/prd.md` alone.',
        ],
        text: `Read AGENTS.md, product-context.md, prd/operating-brief.md, strategy/strategy-kernel.md, strategy/market-map.md, discovery/synthesis.md, discovery/ost.md, data/funnel-analysis.md, data/impact-estimate.md and data/prioritised-bets.md.

Goal: help me write prd/prd.md for Wayfinder v1 into the headings already in prd/prd.md.

Step 1 (grill-me): Do not draft yet. Question me one decision at a time on anything my files leave open: phase-1 slice sequencing (Day Plan & Budget Split fixes, imported_places_count = 0 chat-paste import, Ask Wayfinder drawer), minimum transfer-buffer rules, hours freshness thresholds, Confirm hold deposit/cutoff rules, allergy and step-free pinning, p95 latency/cost budgets and tracking metrics. Include your recommended answer citing the file it comes from, and wait for my reply.

Step 2 (draft after I approve): Fill prd/prd.md with zero invention:
- Mark gaps [NEEDS INPUT], guesses [ASSUMPTION: reason] and slice-1 blockers [BLOCKER: NEEDS INPUT] with owners.
- Flag any tension between Session 10 probe findings and Session 11 funnel counts explicitly.
- State the AI feasibility, p95 latency, timeout fallback and cost-per-acceptable-replan envelope clearly.
- Write behavioural contracts as Always / Ask first / Never (all hours, transit gaps and budgets computed by deterministic code; holds and polls staged only as awaiting_approval behind Confirm hold; venue reviews treated as untrusted text).
- Write phase-1 acceptance criteria in Given / when / then form with concrete numbers, plus a 10-prompt Eval plan for Ask Wayfinder.`,
      },
      expectedOutput: [
        'A one-page `prd/operating-brief.md` defining deterministic vs AI ownership, capability feasibility, p95 latency, fallback and cost-per-replan budgets.',
        '`prd/prd.md` with version, prototype link, `always / ask first / never` contracts, concrete `Given / when / then` criteria, open questions and a 10-case Eval plan.',
        '`prd/review-notes.md` logging engineer, designer and trust-and-safety findings with your `Accepted`, `Rejected (with reason)` or `Open question` decision on each.',
        'A clean cold-session blocker check showing slice 1 is buildable without guessing.',
      ],
      artifact: '`prd/operating-brief.md`, `prd/prd.md` and `prd/review-notes.md`.',
      verification: [
        'A cold session given only `prd/prd.md` finds zero unresolved `[BLOCKER]` questions for slice 1.',
        'Every phase-1 acceptance criterion uses `Given / when / then` with concrete numeric inputs, exact budget-exclusion copy and observable outputs.',
        'Behavioural contracts assign hours, transit and budget math to tested code, pin allergy and step-free constraints, gate holds behind `awaiting_approval` and `Confirm hold`, isolate untrusted venue text, and enforce visa/insurance/billing hand-offs.',
        'If Session 10 used practice notes rather than live calls, `prd/prd.md` states clearly that real-user validation remains open.',
      ],
      reflectionPrompts: [
        'Which `grill-me` question exposed an assumption your discovery notes and RICE table had left undecided?',
        'Which of the three fresh-session reviews (engineer, designer or trust-and-safety) forced the sharpest change to `prd/prd.md`?',
      ],
      checklist: [
        {
          id: 'interviewed',
          text: 'Wrote `prd/operating-brief.md` (feasibility, latency, cost) and used `grill-me` before drafting `prd/prd.md`',
        },
        {
          id: 'no-invention',
          text: 'Flagged discovery-vs-funnel tensions and logged unresolved items under Open questions with named owners',
        },
        {
          id: 'three-reviews',
          text: 'Ran engineer, designer and trust-and-safety reviews in fresh sessions and recorded a decision per finding',
        },
        {
          id: 'agent-ready',
          text: 'Tested `prd/prd.md` alone in a cold session and closed every slice-1 blocker',
        },
      ],
      mentorMove:
        'Read `prd/prd.md` as the tech lead picking it up on Monday morning and circle the three lines that would still force an engineer to guess (especially around stale venue hours, `imported_places_count = 0`, allergy pinning during rain swaps or hold expiry). Share one real story of a vague spec that caused rework, without showing employer docs.',
      soloMove:
        'Open a fresh Claude Code session that can read *only* `prd/prd.md` (no other workspace files) and prompt it: `"You are a sceptical senior engineer on a consumer travel product. List the top five ambiguities or hidden edge cases in this PRD that would make you push it back in sprint planning."` Fix every valid hit.',
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
        'Classify 200 free-text traveller comments about weekend group-trip mishaps with Claude Code, then audit a 20-row sample and every cited quote by hand so you trust AI coding at scale only as far as you verify it.',
      steps: [
        'Run a short script in Claude Code with a fixed random seed to create `data/survey.csv`: 200 fictional one-sentence comments from group-trip organisers describing closed Monday venues, missed ferry connections, buried dietary notes, budget-split arguments and short two-word replies.',
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
        'In five fresh sessions, ask Claude to answer `discovery/discussion-guide.md` as five varied weekend city-trip organisers, saving each transcript in `discovery/synthetic/S1.md` to `S5.md` with `PRACTICE: SYNTHETIC` at the top.',
        'Run your Session 10 synthesis brief on `discovery/synthetic/` alone, saving the output to `discovery/synthetic/synthesis.md` well away from your real `discovery/` evidence.',
        'Build a comparison table in `discovery/synthetic-vs-real.md` against your Session 10 synthesis (real conversations or `P1` to `P5`): opportunities in both, only in human notes (such as `"we just wing it"` contradicted by rainy Lisbon closures, or misreading the grey meal-exclusion label), and only in synthetic notes.',
        'Conclude with three tasks where synthetic users genuinely helped (such as spotting leading questions in your guide) and three ways counting them as evidence would have steered Wayfinder wrong.',
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
        "Leadership asks why your team should build Wayfinder now. Which statement is a diagnosis in Rumelt's strategy-kernel sense?",
      options: [
        {
          id: 'a',
          text: 'We will become the highest-rated AI weekend city-break companion across Europe and North America within the next twenty-four months.',
        },
        {
          id: 'b',
          text: 'Group chats scatter venue ideas without checking Monday closures, ferry buffers or dietary needs.',
        },
        {
          id: 'c',
          text: 'This quarter we will launch an AI chat drawer, a photo-journal timeline, a restaurant discovery feed and a friend referral bonus.',
        },
        {
          id: 'd',
          text: 'Competing travel apps are marketing AI trip builders heavily, so our roadmap must match their feature count before summer starts.',
        },
      ],
      correct: 'b',
      explanation:
        'A diagnosis names what is happening and the crux that makes it hard, backed by evidence. Option A is a fluffy goal, Option C is an unprioritised feature list, and Option D copies competitors without diagnosing a traveller problem.',
    },
    {
      id: 'q3-2',
      competency: 'product-discovery',
      prompt:
        'A Claude Code research slice reports that a competing travel app "already verifies bank-holiday venue hours and step-free ferry transfers automatically", citing a saved link. You want to cite it in tomorrow\'s review. What do you do?',
      options: [
        {
          id: 'a',
          text: 'Include the competitor claim with the saved URL in a footnote, since the subagent already fetched and stored the raw web page.',
        },
        {
          id: 'b',
          text: 'Run the identical competitor query in a second independent session and include the claim if both research briefs reach consensus.',
        },
        {
          id: 'c',
          text: 'Open the saved URL yourself and mark it vendor-claim if only a launch blog post supports it.',
        },
        {
          id: 'd',
          text: 'Strip all competitor comparisons from the strategy review, since web-assisted agent research cannot be cited in leadership docs.',
        },
      ],
      correct: 'c',
      explanation:
        'Agents frequently stretch a marketing demo post into a verified live capability. Opening the primary page takes two minutes, and labelling a press post as `vendor-claim` keeps your market map accurate.',
    },
    {
      id: 'q3-3',
      competency: 'product-discovery',
      prompt:
        'You have five pseudonymised interview snapshots (`P1` to `P5`) and want to use Claude Code during synthesis. What is the strongest sequence?',
      options: [
        {
          id: 'a',
          text: 'Write your own synthesis first, run a fresh isolated Claude pass, and settle differences by quote.',
        },
        {
          id: 'b',
          text: 'Run Claude across all five snapshots first so you begin from a clean baseline, then trim bullets that clash with your recollection.',
        },
        {
          id: 'c',
          text: 'Upload the unedited call recordings and full participant names together so the model captures hesitation, tone and group dynamics.',
        },
        {
          id: 'd',
          text: 'Generate five synthetic weekend-traveller personas first so your opportunity tree rests on ten transcripts rather than five.',
        },
      ],
      correct: 'a',
      explanation:
        'Reading an AI summary first anchors your memory and buries contradictions (like `"we just wing it"` followed by a rainy closed-museum story). Raw named recordings breach privacy, and synthetic personas are never research evidence.',
    },
    {
      id: 'q3-4',
      competency: 'product-discovery',
      prompt:
        'Short on calendar time, a stakeholder suggests replacing user calls with 50 AI-generated personas answering your Wayfinder discussion guide. How do you respond?',
      options: [
        {
          id: 'a',
          text: 'Accept the plan, provided every persona prompt includes real weekend trip budgets, party sizes and city-break booking frequencies.',
        },
        {
          id: 'b',
          text: 'Accept the plan, provided you run all fifty personas across two different model families and keep only themes both models repeat.',
        },
        {
          id: 'c',
          text: 'Skip pre-build interviews altogether, ship the planner to ten percent of live traffic and read support tickets the following week.',
        },
        {
          id: 'd',
          text: 'Run 3 to 5 real user calls, using AI only to rehearse the guide and cross-check your synthesis.',
        },
      ],
      correct: 'd',
      explanation:
        'Synthetic personas are overly articulate, agreeable and consistent; they miss real WhatsApp workarounds and grey-caption budget misreads. Even three real 30-minute conversations beat fifty invented transcripts as evidence.',
    },
    {
      id: 'q3-5',
      competency: 'technical-collaboration',
      prompt:
        'Claude Code analyses `events.csv` and reports `67.2%` conversion at `itinerary_viewed` and `65.0%` at `stop_detail_opened`. What do you check first?',
      options: [
        {
          id: 'a',
          text: 'Rerun the exact same prompt on a flagship reasoning model at high effort to check whether the conversion percentage shifts.',
        },
        {
          id: 'b',
          text: 'Check distinct-user counts, duplicate retries and the denominator in a spreadsheet pivot table.',
        },
        {
          id: 'c',
          text: 'Compare the reported conversion percentage against published consumer travel-app benchmarks before questioning the script.',
        },
        {
          id: 'd',
          text: 'Inspect the generated HTML funnel chart at mobile width to confirm the bar lengths match the printed percentage labels.',
        },
      ],
      correct: 'b',
      explanation:
        'Analytics bugs sit in duplicate retry rows (`696` raw rows vs `360` distinct users) and denominator mix-ups (`234 / 360 = 65.0%` viewers vs `234 / 600 = 39.0%` cohort). Checking counts in a spreadsheet catches both immediately.',
    },
    {
      id: 'q3-6',
      competency: 'product-discovery',
      prompt:
        'Two Wayfinder bets have similar Reach and Impact. One is backed by four interviews and the `4.0%` blank-import group cliff; the other comes from one vocal executive. Where does that difference enter RICE?',
      options: [
        {
          id: 'a',
          text: 'Keep both scores equal, since RICE measures quantitative reach and effort while qualitative evidence sits outside the table.',
        },
        {
          id: 'b',
          text: 'Raise the Impact score on the executive suggestion because strong leadership sponsorship removes cross-team sign-off delays.',
        },
        {
          id: 'c',
          text: 'Score Confidence high where funnel data and interviews converge, and low for a single opinion.',
        },
        {
          id: 'd',
          text: 'Ask a fresh AI session to rank both bet titles blind without context so internal politics cannot bias the roadmap order.',
        },
      ],
      correct: 'c',
      explanation:
        'Confidence weights Reach and Impact by the strength of your evidence. Converging funnel logs and user stories earn high confidence; a single opinion earns low confidence until tested.',
    },
    {
      id: 'q3-7',
      competency: 'technical-collaboration',
      prompt:
        'While drafting `prd/prd.md`, you realise nobody has decided what `Day Plan & Budget Split` shows when cached museum opening hours are more than 14 days old. What belongs in the PRD?',
      options: [
        {
          id: 'a',
          text: 'Log it as [NEEDS INPUT] (or [BLOCKER] for slice 1) under Open questions with a named owner.',
        },
        {
          id: 'b',
          text: 'Copy the stale-hours banner wording from a popular map app so engineering receives a document with zero open markers today.',
        },
        {
          id: 'c',
          text: 'Leave stale venue hours out of v1 scope silently and let the coding agent choose a reasonable fallback rule during implementation.',
        },
        {
          id: 'd',
          text: 'Ask Claude to fill in a plausible 48-hour expiry rule automatically so the specification reads cleanly from top to bottom.',
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
          text: 'Store venue opening schedules in a Postgres materialised view refreshed every fifteen minutes through a background worker queue.',
        },
        {
          id: 'b',
          text: 'Pass raw itinerary stops into the language model on page load so it sums ticket prices and estimates harbour ferry transit times.',
        },
        {
          id: 'c',
          text: 'Ensure the weekend itinerary timeline feels effortless, calm and trustworthy whenever rain forces a last-minute afternoon change.',
        },
        {
          id: 'd',
          text: 'Given a $180 cap and $94.50 booked, Day Plan shows $85.50 Left after booked stops (meals and local transit not included).',
        },
      ],
      correct: 'd',
      explanation:
        'PRDs specify observable, testable behaviour and exact user-facing boundaries. Option A dictates storage implementation, Option B hands deterministic arithmetic to a language model, and Option C cannot be tested.',
    },
    {
      id: 'q3-9',
      competency: 'agentic-systems',
      prompt:
        'Wayfinder needs verified venue hours, door-to-door transit buffers, remaining budget math and rainy-day table holds. Which architecture boundary belongs in `prd/operating-brief.md`?',
      options: [
        {
          id: 'a',
          text: 'Fine-tune model weights every night on updated museum schedules, ferry timetables and restaurant cancellation policies across cities.',
        },
        {
          id: 'b',
          text: 'Read live data via tools, run hours, transit and budget math in code, and stage holds for Confirm hold.',
        },
        {
          id: 'c',
          text: 'Answer venue-hour and ferry-transfer questions directly from model memory without tool calls so p95 latency stays under one second.',
        },
        {
          id: 'd',
          text: 'Grant an autonomous multi-agent loop permission to place restaurant card holds automatically whenever rain hits an outdoor stop.',
        },
      ],
      correct: 'b',
      explanation:
        'Changing schedules belong in live tool lookups, clocks and budget math belong in deterministic code, and reservation holds with no-show risk stay `awaiting_approval` behind `Confirm hold`.',
    },
    {
      id: 'q3-10',
      competency: 'technical-collaboration',
      prompt:
        'A pilot batch of 1,000 `Ask Wayfinder` rainy-day replans costs $20 in model and tool calls plus $40 in human safety review, and 800 replans pass all constraints. What is the measured cost per acceptable replan?',
      options: [
        {
          id: 'a',
          text: '$0.02 per reply, counting only raw model token charges and excluding failed retries and human safety-review time.',
        },
        {
          id: 'b',
          text: '$0.06 per reply, dividing combined model and review spend across all 1,000 attempted replans including the 200 failures.',
        },
        {
          id: 'c',
          text: '$0.075 per acceptable reply: $60 total model and review cost divided by 800 passing replans.',
        },
        {
          id: 'd',
          text: '$0.05 per reply, counting only human reviewer time across passing runs and treating model API tokens as negligible.',
        },
      ],
      correct: 'c',
      explanation:
        '`($20 + $40) / 800 = $0.075` per acceptable replan. Operating envelopes must include tool calls, failed retries and human oversight, not raw token cost alone.',
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
        text: '`prd/operating-brief.md`, `prd/prd.md` and `prd/review-notes.md` (Session 12) with feasibility/latency/cost envelope, `always / ask first / never` rules and zero slice-1 blockers.',
      },
      {
        id: 'sceptic',
        text: 'Optional mentor walkthrough as a sceptical engineer (or a cold-session senior-engineer critique logged with the edits you made).',
      },
    ],
    rubric: {
      correctness:
        'Market claims match saved pages, quotes are verbatim, two funnel rates match your spreadsheet, and `prd/prd.md` uses consistent numeric examples (`$180` cap, `$94.50` booked, `$85.50` left excluding meals/transit) and deterministic rules.',
      quality:
        'Diagnosis, interview evidence, `imported_places_count = 0` / comprehension data, RICE bets and PRD scope read as one connected argument with zero slice-1 blockers.',
      independence:
        'You wrote your diagnosis draft, hand synthesis, metric definitions and `grill-me` decisions before delegating synthesis, scripts or role reviews to Claude.',
      judgment:
        'Observed evidence is separated from assumptions, out-of-segment (`P3`) or synthetic inputs are excluded, tensions are flagged openly, and explicit non-goals hold.',
    },
    privacyNote:
      'Keep fictional itineraries and practice CSVs only. Pseudonymised `P1` to `P5` interview snapshots stay inside your private local `workspace/`, never in a public GitHub repository, with any call recordings deleted once notes were written.',
    minutes: 20,
    xp: 175,
  },
  nextRecommendation:
    'Move to Level 4, where `prd/prd.md` turns into a full state-table design spec and `read / prepare / execute` tool contract (Session 13), a 30-conversation `Ask Wayfinder` eval suite (Session 14), a 14-day experiment readout (Session 15) and an executive QBR deck (Session 16).',
}
