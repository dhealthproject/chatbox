import { ToolSet } from 'ai'
import { fetchTool } from './fetch'
import { GDriveTool } from './gdrive/gdrive'
import { MemoryTool } from './memory'
import { CHMED16A1Tool } from './chmed16a1/chmed16a1'
import { EmailTool } from './email'
import { DocxTool } from './docx/docx'

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
  gdrive_reader: {
    name: 'Google Drive Folder Reader',
    description: 'List and explore Google Drive folders',
    category: 'web',
    available: true,
  },
  gdrive_read_file: {
    name: 'Google Drive File Reader',
    description: 'Read and extract content from Google Drive files',
    category: 'web',
    available: true,
  },
  memory_set: {
    name: 'Set Memory',
    description: 'Set a memory entry',
    category: 'research',
    available: true,
  },
  memory_read: {
    name: 'Read Memory',
    description: 'Read an existing memory entry',
    category: 'research',
    available: true,
  },
  memory_delete: {
    name: 'Delete Memory',
    description: 'Delete a memory entry',
    category: 'research',
    available: true,
  },
  get_medicament_id: {
    name: 'Get Medicament ID',
    description: 'Get medicament ID from Swissmedic database based on medicament string',
    category: 'research',
    available: true,
  },
  generate_chmed16a1_qr_codes: {
    name: 'Generate CHMED16A1 QR Codes',
    description: 'Generate CHMED16A1 QR codes from a given JSON string',
    category: 'research',
    available: true,
  },
  send_email: {
    name: 'Send email',
    description: 'Send an email from given information',
    category: 'web',
    available: true,
  },
  generate_docx: {
    name: 'Generate Docx',
    description: 'Generate a docx file from a given json string',
    category: 'research',
    available: true,
  },
}

/**
 * Get all native tools as a ToolSet for the LLM
 */
export function getNativeTools(): ToolSet {
  const gdriveInstance = GDriveTool.createInstance()
  const memoryTool = MemoryTool.createInstance()
  const chmed16a1Tool = CHMED16A1Tool.createInstance()
  const emailTool = EmailTool.createInstance()
  const docxTool = DocxTool.createInstance()
  return {
    native_fetch: fetchTool,
    gdrive_reader: gdriveInstance.gdriveTool,
    gdrive_read_file: gdriveInstance.gdriveReadFileTool,
    memory_set: memoryTool.setMemoryTool,
    memory_read: memoryTool.readMemoryTool,
    memory_delete: memoryTool.deleteMemoryTool,
    get_medicament_id: chmed16a1Tool.getMedicamentIdTool,
    generate_chmed16a1_qr_codes: chmed16a1Tool.generateQRCodesTool,
    send_email: emailTool.sendEmailTool,
    generate_docx: docxTool.generateDocxTool,
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
