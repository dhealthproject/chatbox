import { tool } from 'ai'
import { z } from 'zod'

/**
 * Sequential thinking tool - for structured reasoning
 * This tool helps the model think through problems step by step
 */
export const sequentialThinkingTool = tool({
  description:
    'Use this tool to think through a problem step by step. It logs your reasoning process and helps structure complex thoughts.',
  parameters: z.object({
    thinking: z.string().describe('Your thinking process - explain your reasoning step by step'),
  }),
  execute: async (args) => {
    const { thinking } = args

    // Log the thinking
    console.log('[Sequential Thinking]:', thinking)

    return {
      success: true,
      message: 'Thinking logged. Continue with your reasoning.',
      thinking,
    }
  },
})
