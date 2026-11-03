// The structured courses in this curriculum, in the order to take them, and where each is used.
// Ids must exist in resources.ts and appear in the resources of every session or challenge listed.
export interface CourseStep {
  resourceId: string
  usedIn: string[] // lesson or challenge ids, in course order
  note: string
}

export const coursePath: {
  main: CourseStep[]
  advanced: CourseStep[]
  alternatives: CourseStep[]
} = {
  main: [
    {
      resourceId: 'anthropic-ai-fluency',
      usedIn: ['s1', 's2', 's3'],
      note: "Anthropic's recommended first course. Start the introduction in Session 1, do Delegation and Description in Session 2 and Discernment in Session 3.",
    },
    {
      resourceId: 'claude-101',
      usedIn: ['s2'],
      note: 'A guided tour of Claude itself: Projects, artifacts, skills and connectors.',
    },
    {
      resourceId: 'anthropic-capabilities-limitations',
      usedIn: ['s3', 'c1'],
      note: 'Why models predict, forget and invent, through four properties, each with an exercise.',
    },
    {
      resourceId: 'ai-fluency-builders',
      usedIn: ['s4', 's8'],
      note: 'The 4Ds applied to building: delegating the build, then judging code and user experience.',
    },
    {
      resourceId: 'claude-code-101',
      usedIn: ['s5'],
      note: 'The agentic loop, CLAUDE.md, context and permissions in Claude Code.',
    },
    {
      resourceId: 'ccforpms',
      usedIn: ['s5'],
      note: 'A longer PM course taught inside Claude Code. Independent, not from Anthropic.',
    },
    {
      resourceId: 'anthropic-cowork-course',
      usedIn: ['s5'],
      note: 'The same workspace ideas in the Claude desktop app, for teams that work in Cowork.',
    },
    {
      resourceId: 'claude-code-in-action',
      usedIn: ['s8'],
      note: 'Long sessions, plan mode, hooks and pull request review, once you use Claude Code daily.',
    },
    {
      resourceId: 'anthropic-subagents-course',
      usedIn: ['s9'],
      note: 'Briefing subagents, the in-session version of the parallel research in Session 9.',
    },
    {
      resourceId: 'anthropic-agent-skills-course',
      usedIn: ['s19'],
      note: 'Building, testing and sharing skills in Claude Code.',
    },
    {
      resourceId: 'anthropic-human-agent-teams',
      usedIn: ['s20'],
      note: 'Moving a team from single-player to shared AI work.',
    },
  ],
  advanced: [
    {
      resourceId: 'anthropic-sdlc-playbook',
      usedIn: ['s13', 's18'],
      note: 'Twelve plays across the delivery cycle, written for engineering leads in large companies.',
    },
    {
      resourceId: 'anthropic-mcp-course',
      usedIn: ['c10'],
      note: 'Only if you want to build an MCP server yourself.',
    },
  ],
  alternatives: [
    {
      resourceId: 'dlai-genai-for-everyone',
      usedIn: ['s1'],
      note: "Andrew Ng's vendor-neutral overview of generative AI, in video lectures.",
    },
    {
      resourceId: 'openai-academy',
      usedIn: ['s2'],
      note: "OpenAI's free courses; the Apply AI at Work track starts with the basics.",
    },
  ],
}
