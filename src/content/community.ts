// What practitioners in public forums say about learning AI-native product work, summarized from
// docs/research/community-and-extras.json on 2026-10-31. This is community opinion, not fact and
// not an endorsement. Points are paraphrased, and no usernames are kept.
// fetchedDirectly is true when the thread itself was read, and false when it was read through a
// third-party summary (Reddit blocks automated fetches).

export interface CommunitySource {
  label: string
  url: string
  fetchedDirectly: boolean
}

export interface CommunityPoint {
  point: string
  sources: CommunitySource[]
}

export const communityConsensus: CommunityPoint[] = [
  {
    point:
      'PM forums widely see certificates and paid AI PM bootcamps as weak hiring signals. Building and shipping real prototypes or artifacts is considered better value for the money and time.',
    sources: [
      {
        label:
          'AllthingsPM roundup of r/ProductManagement, r/prodmgmt and r/AIProductManagers threads (2025 to 2026; the author sells its own course)',
        url: 'https://www.allthingspm.app/blog/best-ai-product-management-courses',
        fetchedDirectly: false,
      },
    ],
  },
  {
    point:
      'Claude Code is often called useful for PM work that involves no coding, such as notes, research synthesis, organizing files and processing transcripts, because it works directly on local files. Non-coders still find it intimidating. The usual advice: keep project memory in CLAUDE.md, use plan mode and read the plan before approving, work on a copy of the folder, or use the Desktop or web version instead of the terminal.',
    sources: [
      {
        label: 'Hacker News: What non coding tasks do you use Claude Code for? (Nov 2025)',
        url: 'https://news.ycombinator.com/item?id=45977810',
        fetchedDirectly: true,
      },
      {
        label: 'Hacker News: Learn Claude Code by doing, not reading (Mar 2026)',
        url: 'https://news.ycombinator.com/item?id=47579229',
        fetchedDirectly: true,
      },
      {
        label:
          'XDA Developers on an r/ClaudeAI thread about Claude Code for non-coding work (Jun 2026)',
        url: 'https://www.xda-developers.com/tried-claude-code-as-non-coder-nothing-to-do-with-building-apps/',
        fetchedDirectly: false,
      },
    ],
  },
  {
    point:
      'Learn enough coding vocabulary, terminal use and Git to supervise an agent. Commenters report that beginners without these basics get stuck once the agent has built a first version.',
    sources: [
      {
        label:
          'Hacker News: Ask HN: How much coding should beginners learn in the AI era? (Jun 2026)',
        url: 'https://news.ycombinator.com/item?id=48662310',
        fetchedDirectly: true,
      },
      {
        label: 'Hacker News: Learn Claude Code by doing, not reading (Mar 2026)',
        url: 'https://news.ycombinator.com/item?id=47579229',
        fetchedDirectly: true,
      },
    ],
  },
  {
    point:
      "Practitioners say evals are learned by doing: review real traces for errors, build a small golden dataset and label results pass or fail before trusting an LLM judge. Hamel Husain's material is the most recommended. Many teams admit they still judge quality by feel and find agent evals expensive and hard to measure.",
    sources: [
      {
        label: 'Hacker News: About AI Evals (Jul 2025)',
        url: 'https://news.ycombinator.com/item?id=44430117',
        fetchedDirectly: true,
      },
      {
        label: 'Hacker News: Ask HN: How are people doing AI evals these days? (Mar 2026)',
        url: 'https://news.ycombinator.com/item?id=47319587',
        fetchedDirectly: true,
      },
    ],
  },
  {
    point:
      'Managing context, through fresh sessions, saved plan or design documents and short instruction files, is seen as more important than clever prompt wording. A vocal minority dismisses context engineering as a buzzword.',
    sources: [
      {
        label:
          "Hacker News: The new skill in AI is not prompting, it's context engineering (Jun 2025)",
        url: 'https://news.ycombinator.com/item?id=44427757',
        fetchedDirectly: true,
      },
      {
        label: 'Hacker News: The State of Context Engineering (Oct 2026)',
        url: 'https://news.ycombinator.com/item?id=50235780',
        fetchedDirectly: true,
      },
    ],
  },
  {
    point:
      'For understanding how LLMs work, Andrej Karpathy and 3Blue1Brown are the most trusted free sources. The catch commenters mention: videos of two to three and a half hours are hard to finish.',
    sources: [
      {
        label: 'Hacker News: discussion of Deep Dive into LLMs Like ChatGPT (Feb 2025)',
        url: 'https://news.ycombinator.com/item?id=42952960',
        fetchedDirectly: true,
      },
      {
        label: 'Hacker News: Ask HN: How to learn AI from first principles? (Jan 2025)',
        url: 'https://news.ycombinator.com/item?id=42827913',
        fetchedDirectly: true,
      },
    ],
  },
  {
    point:
      'Users report that Codex does best with fully specified, self-contained tasks, while Claude Code copes better with looser direction. In 2026 the comparison is mostly about pricing and rate limits rather than capability.',
    sources: [
      {
        label:
          'duply.ai summary of r/ChatGPTCoding, r/codex and r/ClaudeAI threads comparing Codex and Claude Code (2026)',
        url: 'https://duply.ai/blog/claude-code-vs-codex-reddit',
        fetchedDirectly: false,
      },
    ],
  },
  {
    point:
      'Writing a spec before handing work to an agent pays off: a few hours on acceptance criteria can produce a working feature the same day. Heavyweight spec tooling, though, strikes some as a return to waterfall.',
    sources: [
      {
        label: 'Hacker News: Spec-Driven Development: The Waterfall Strikes Back (Nov 2025)',
        url: 'https://news.ycombinator.com/item?id=45935763',
        fetchedDirectly: true,
      },
    ],
  },
]
