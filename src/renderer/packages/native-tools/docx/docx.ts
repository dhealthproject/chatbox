import { requestFileGeneration } from '@/packages/file-processing'
import platform from '@/platform'
import { getCurrentSessionMergedSettings } from '@/stores/sessionActions'
import { tool } from 'ai'
import { z } from 'zod'
import { DOCX_DOCUMENT_SCHEMA_DESCRIPTION } from './schemas'

export type DocxToolResult =
  | { status: 'success'; filename: string; generatedAt: string }
  | { status: 'failed'; error: string }

export class DocxTool {
  private static docxToolInstance: DocxTool

  public static createInstance() {
    if (!DocxTool.docxToolInstance) {
      DocxTool.docxToolInstance = new DocxTool()
    }
    return DocxTool.docxToolInstance
  }

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  generateDocxTool = tool({
    description: 'Generates a formatted docx document and returns it as a downloadable file.',
    parameters: z.object({
      filename: z.string().describe('The filename of the docx file'),
      content: z.string().describe(`A JSON string representing the document to generate. ${DOCX_DOCUMENT_SCHEMA_DESCRIPTION}`),
    }),
    experimental_toToolResultContent: (result: DocxToolResult) => {
      return [{ type: 'text' as const, text: JSON.stringify(result) }]
    },
    execute: async (args): Promise<DocxToolResult> => {
      try {
        return await this.generateDocx(args.filename, args.content)
      } catch (error) {
        return { status: 'failed', error: (error as Error).message }
      }
    },
  })

  async generateDocx(filename: string, content: string): Promise<DocxToolResult> {
    const settings = getCurrentSessionMergedSettings()
    const { blob, status } = await requestFileGeneration(
      settings,
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      filename,
      content
    )

    if (status.status === 'failed') {
      return { status: 'failed', error: status.error ?? 'File generation failed' }
    }

    const downloadFilename = status.filename || filename
    await platform.exporter.exportBlob(downloadFilename, blob)

    return {
      status: 'success',
      filename: downloadFilename,
      generatedAt: status.generatedAt,
    }
  }
}
