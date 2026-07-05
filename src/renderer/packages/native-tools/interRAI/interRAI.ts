import { tool } from "ai"
import { z } from 'zod'
import { INTERRAI_REPORT_SCHEMA_FORMAT } from "./schemas";
import { getCurrentSessionMergedSettings } from "@/stores/sessionActions";
import { requestFileGeneration } from "@/packages/file-processing";
import platform from "@/platform";
import { InterRAIInput } from "./InterRAIInput";
import { createInterRAIContent } from "./util";

export type InterRAIToolResult =
  | { status: 'success'; filename: string; generatedAt: string }
  | { status: 'failed'; error: string }

export const INTERRAI_REPORT_SCHEMA_DESCRIPTION = `
  A JSON string representing the interRAI report.
  Please follow the following schema:
  ${JSON.stringify(INTERRAI_REPORT_SCHEMA_FORMAT)}
  If any field is not provided, don't include it in the output.
`

export class InterRAITool {
  private static interRAITool: InterRAITool

  public static createInstance() {
    if (!InterRAITool.interRAITool) {
      InterRAITool.interRAITool = new InterRAITool()
    }
    return InterRAITool.interRAITool
  }

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  generateInterRAITool = tool({
    description: 'Generate an interRAI report from a given json string',
    parameters: z.object({
      filename: z.string().describe('The filename of the interRAI report'),
      input: z.string().describe(INTERRAI_REPORT_SCHEMA_DESCRIPTION),
    }),
    execute: async (args) => {
      const content = args.input
      const filename = args.filename
      return this.generateInterRAI(filename, content)
    },
  })

  private async generateInterRAI(filename: string, input: string): Promise<InterRAIToolResult> {
    const settings = getCurrentSessionMergedSettings()
    const { blob, status } = await requestFileGeneration(
      settings,
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      filename,
      this.generateInterRAIContent(input)
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

  private generateInterRAIContent(content: string): string {
    const input = JSON.parse(content) as InterRAIInput;
    return JSON.stringify(createInterRAIContent(input));
  }
}

