import { tool } from "ai"
import { z } from 'zod'

export class MemoryTool {
  private static memoryToolInstance: MemoryTool;
  private readonly MEMORY_KEY = 'agent_memory';

  public static createInstance() {
    if (!MemoryTool.memoryToolInstance) {
      MemoryTool.memoryToolInstance = new MemoryTool();
    }
    return MemoryTool.memoryToolInstance;
  }

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  setMemoryTool = tool({
    description:
      'Set memory. Use this to store information across interactions, allowing the assistant to remember important details and context over time.',
    parameters: z.object({
      key: z.string().describe('The key to store the memory under'),
      value: z.string().describe('The value to store in the memory'),
      source: z.string().describe('The source of the memory. Two values: user_stated or agent_inferred. This can be used to provide additional context about the memory, such as whether it was explicitly stated by the user or inferred by the agent.'),
    }),
    execute: async (args) => {
      const key = args.key
      const value = args.value
      const source = args.source

      try {
        return this.setMemory(key, value, source)
      } catch (error) {
        return {
          error: `Failed to create memory: ${(error as Error).message}`,
        }
      }
    },
  })

  readMemoryTool = tool({
    description:
      'Read memories. Use this to retrieve information that has been stored in memory across interactions.',
    parameters: z.object({
      key: z.string().describe('The key to retrieve the memory for, leave empty to retrieve all memories'),
    }),
    execute: async (args) => {
      const key = args.key

      try {
        return this.readMemory(key)
      } catch (error) {
        return {
          error: `Failed to read memory: ${(error as Error).message}`,
        }
      }
    },
  })

  deleteMemoryTool = tool({
    description: 'Delete a memory. Use this to remove information from memory when it is no longer needed.',
    parameters: z.object({
      key: z.string().describe('The key to delete the memory for'),
    }),
    execute: async (args) => {
      const key = args.key

      try {
        return this.deleteMemory(key)
      } catch (error) {
        return {
          error: `Failed to delete memory: ${(error as Error).message}`,
        }
      }
    },
  })

  public loadMemory(): Record<string, object> {
    return JSON.parse(localStorage.getItem(this.MEMORY_KEY) ?? "{}");
  }

  public saveMemory(memory: Record<string, object>): void {
    localStorage.setItem(this.MEMORY_KEY, JSON.stringify(memory));
  }

  public setMemory(key: string, value: string, source: string) {
    const store = this.loadMemory();
    const learnedAt = new Date().toLocaleDateString();
    store[key] = { value, learnedAt, source };
    this.saveMemory(store);
  }

  public readMemory(key?: string): object | null {
    return key ? this.loadMemory()[key] ?? null : this.loadMemory();
  }

  public deleteMemory(key: string) {
    const store = this.loadMemory();
    delete store[key];
    this.saveMemory(store);
  }
}