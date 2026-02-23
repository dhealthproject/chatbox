import { ToolSet } from 'ai'
import { fetchTool } from './fetch'
import { sequentialThinkingTool } from './sequential-thinking'
import { arxivTool } from './arxiv'
import { context7Tool } from './context7'
import { edgeoneTool } from './edgeone-pages'
import { GDriveTool } from './gdrive/gdrive'

/**
 * Native tools registry and exporter
 * Provides tools available on all platforms (desktop, web, mobile)
 */

export interface NativeToolConfig {
  name: string
  description: string
  category: 'web' | 'research' | 'reasoning' | 'deployment'
  available: boolean
  requiresConfig?: string[]
}

const toolConfigs: Record<string, NativeToolConfig> = {
  native_fetch: {
    name: 'Fetch',
    description: 'Fetch and convert web page content to markdown',
    category: 'web',
    available: true,
  },
  // native_sequential_thinking: {
  //   name: 'Sequential Thinking',
  //   description: 'Structured reasoning and step-by-step problem solving',
  //   category: 'reasoning',
  //   available: true,
  // },
  // native_arxiv: {
  //   name: 'ArXiv Search',
  //   description: 'Search for research papers on arXiv',
  //   category: 'research',
  //   available: true,
  // },
  // native_context7: {
  //   name: 'Context7 Docs',
  //   description: 'Look up technical documentation and API references',
  //   category: 'web',
  //   available: true,
  //   requiresConfig: ['CONTEXT7_API_KEY'],
  // },
  // native_edgeone: {
  //   name: 'EdgeOne Pages',
  //   description: 'Deploy HTML/static content to Cloudflare CDN',
  //   category: 'deployment',
  //   available: true,
  //   requiresConfig: ['CF_ACCOUNT_ID', 'CF_API_TOKEN'],
  // },
  gdrive_reader: {
    name: 'Google Drive Reader',
    description: 'Read and extract content from Google Drive files',
    category: 'web',
    available: true,
    requiresConfig: ['GOOGLE_DRIVE_CLIENT_ID', 'GOOGLE_DRIVE_CLIENT_SECRET'],
  }
}

/**
 * Get all native tools as a ToolSet for the LLM
 */
export function getNativeTools(): ToolSet {
  return {
    native_fetch: fetchTool,
    // native_sequential_thinking: sequentialThinkingTool,
    // native_arxiv: arxivTool,
    // native_context7: context7Tool,
    // native_edgeone: edgeoneTool,
    gdrive_reader: GDriveTool.createInstance().gdriveTool,
  }
}

/**
 * Get metadata about available native tools
 */
export function getNativeToolsMetadata(): Record<string, NativeToolConfig> {
  return toolConfigs
}

/**
 * Get tools in a specific category
 */
export function getNativeToolsByCategory(category: NativeToolConfig['category']): string[] {
  return Object.entries(toolConfigs)
    .filter(([_, config]) => config.category === category)
    .map(([id, _]) => id)
}

/**
 * Check if a tool requires configuration
 */
export function toolRequiresConfig(toolId: string): string[] {
  return toolConfigs[toolId]?.requiresConfig || []
}
