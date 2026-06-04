import type { CoreMessage, FilePart, ImagePart, TextPart, ToolCallPart, ToolResultPart } from 'ai'
import dayjs from 'dayjs'
import { compact } from 'lodash'
import type { Message, MessageContentParts, MessageToolCallPart } from 'src/shared/types'
import type { ModelDependencies } from 'src/shared/types/adapters'
import { createModelDependencies } from '@/adapters'
import { cloneMessage, getMessageText } from '@/utils/message'

async function convertContentParts<T extends TextPart | ImagePart | FilePart>(
  contentParts: MessageContentParts,
  imageType: 'image' | 'file',
  dependencies: ModelDependencies,
  options?: { modelSupportVision: boolean }
): Promise<T[]> {
  return compact(
    await Promise.all(
      contentParts.map(async (c) => {
        if (c.type === 'text') {
          return { type: 'text', text: c.text! } as T
        } else if (c.type === 'image') {
          if (options?.modelSupportVision === false) {
            return { type: 'text', text: `This is an image, OCR Result: \n${c.ocrResult}` } as T
          }
          const dataUrl = c.url
          if (dataUrl?.startsWith('data:') && dataUrl.includes(';base64,')) {
            const mimeType = dataUrl.slice('data:'.length, dataUrl.indexOf(';'))
            const base64Data = dataUrl.slice(dataUrl.indexOf(',') + 1)
            return {
              type: imageType,
              ...(imageType === 'image' ? { image: base64Data } : { data: base64Data }),
              mimeType: mimeType || 'image/png',
            } as T
          }
          if (!c.storageKey) {
            return null
          }
          try {
            const imageData = await dependencies.storage.getImage(c.storageKey)
            if (!imageData) {
              console.warn(`Image not found for storage key: ${c.storageKey}`)
              return null
            }
            const base64Data = imageData.replace(/^data:image\/[^;]+;base64,/, '')
            const mimeType = imageData.match(/^data:([^;]+)/)?.[1] || 'image/png'

            return {
              type: imageType,
              ...(imageType === 'image' ? { image: base64Data } : { data: base64Data }),
              mimeType,
            } as T
          } catch (error) {
            console.error(`Failed to get image for storage key ${c.storageKey}:`, error)
            return null
          }
        }
        return null
      })
    )
  )
}

function toToolCallPart(part: MessageToolCallPart): ToolCallPart & { thoughtSignature?: string } {
  const toolCall: ToolCallPart & { thoughtSignature?: string } = {
    type: 'tool-call',
    toolCallId: part.toolCallId,
    toolName: part.toolName,
    args: part.args,
  }
  if (part.thoughtSignature) {
    toolCall.thoughtSignature = part.thoughtSignature
    toolCall.providerOptions = {
      openaiCompatible: { thoughtSignature: part.thoughtSignature },
    }
  }
  return toolCall
}

function toToolResultPart(part: MessageToolCallPart): ToolResultPart & { thoughtSignature?: string } {
  return {
    type: 'tool-result',
    toolCallId: part.toolCallId,
    toolName: part.toolName,
    result: part.result,
    isError: part.state === 'error',
    thoughtSignature: part.thoughtSignature,
  }
}

async function convertAssistantMessageToCoreMessages(
  contentParts: MessageContentParts,
  dependencies: ModelDependencies
): Promise<CoreMessage[]> {
  const coreMessages: CoreMessage[] = []
  const mediaParts = contentParts.filter((p) => p.type === 'text' || p.type === 'image')
  const toolParts = contentParts.filter((p) => p.type === 'tool-call') as MessageToolCallPart[]
  const completedTools = toolParts.filter((p) => p.state === 'result' || p.state === 'error')
  const pendingCalls = toolParts.filter((p) => p.state === 'call')

  const assistantContent: Array<TextPart | FilePart | ToolCallPart> = [
    ...(await convertContentParts<TextPart | FilePart>(mediaParts, 'file', dependencies)),
    ...pendingCalls.map(toToolCallPart),
    ...completedTools.map(toToolCallPart),
  ]

  if (assistantContent.length > 0) {
    coreMessages.push({ role: 'assistant', content: assistantContent })
  }

  if (completedTools.length > 0) {
    coreMessages.push({
      role: 'tool',
      content: completedTools.map(toToolResultPart),
    })
  }

  return coreMessages
}

async function convertUserContentParts(
  contentParts: MessageContentParts,
  dependencies: ModelDependencies,
  options?: { modelSupportVision: boolean }
): Promise<Array<TextPart | ImagePart>> {
  return convertContentParts<TextPart | ImagePart>(contentParts, 'image', dependencies, options)
}

export async function convertToCoreMessages(
  messages: Message[],
  options?: { modelSupportVision: boolean }
): Promise<CoreMessage[]> {
  const dependencies = await createModelDependencies()
  const results: CoreMessage[] = []

  for (const m of messages) {
    switch (m.role) {
      case 'system':
        results.push({
          role: 'system' as const,
          content: getMessageText(m),
        })
        break
      case 'user': {
        const contentParts = await convertUserContentParts(m.contentParts || [], dependencies, options)
        results.push({
          role: 'user' as const,
          content: contentParts,
        })
        break
      }
      case 'assistant': {
        const assistantCoreMessages = await convertAssistantMessageToCoreMessages(
          m.contentParts || [],
          dependencies
        )
        results.push(...assistantCoreMessages)
        break
      }
      case 'tool':
        break
      default: {
        const _exhaustiveCheck: never = m.role
        throw new Error(`Unknown role: ${_exhaustiveCheck}`)
      }
    }
  }

  return results
}

/**
 * 在 system prompt 中注入模型信息
 * @param model
 * @param messages
 * @returns
 */
export function injectModelSystemPrompt(
  model: string,
  messages: Message[],
  additionalInfo: string,
  role: 'system' | 'user' = 'system'
) {
  const metadataPrompt = `Current model: ${model}\nCurrent date: ${dayjs().format(
    'YYYY-MM-DD'
  )}\n Additional info for this conversation: ${additionalInfo}\n\n`
  let hasInjected = false
  return messages.map((m) => {
    if (m.role === role && !hasInjected) {
      m = cloneMessage(m) // 复制，防止原始数据在其他地方被直接渲染使用
      m.contentParts = [{ type: 'text', text: metadataPrompt + getMessageText(m) }]
      hasInjected = true
    }
    return m
  })
}
