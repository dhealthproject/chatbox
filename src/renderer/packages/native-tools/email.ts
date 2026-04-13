import { getCurrentSessionMergedSettings } from "@/stores/sessionActions"
import { AIDH_API_URL } from "@/variables"
import { tool } from "ai"
import axios from "axios"
import { getProviderSettings } from "src/shared/models"
import { z } from 'zod'

type Email = {
  to: string[]
  subject: string
  text: string
  html?: string
}

export class EmailTool {
  private static memoryToolInstance: EmailTool

  public static createInstance() {
    if (!EmailTool.memoryToolInstance) {
      EmailTool.memoryToolInstance = new EmailTool()
    }
    return EmailTool.memoryToolInstance
  }

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  sendEmailTool = tool({
    description:
      'Send an email.',
    parameters: z.object({
      to: z.array(z.string()).describe('The addresses to send email to'),
      subject: z.string().describe('The subject of the email'),
      text: z.string().describe('The text content of the email'),
      html: z.string().optional().describe('The html content of the email'),
    }),
    execute: async (args) => {
      try {
        return await this.sendEmail(args)
      } catch (error) {
        return {
          error: `Failed to send email: ${(error as Error).message}`,
        }
      }
    },
  })

  async sendEmail(email: Email) {
    const settings = getCurrentSessionMergedSettings()
    const { providerSetting } = getProviderSettings(settings)
    const sendEmailUrl = `${AIDH_API_URL}/email/send`;
    const resp = await axios.post(
      sendEmailUrl,
      email,
      {
        headers: {
          'Authorization': `Bearer ${providerSetting.apiKey}`,
        },
        responseType: 'json',
      }
    );
    return resp.data;
  }
}