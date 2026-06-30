import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { getProviderSettings } from 'src/shared/models'
import type { MessageFile, Settings } from 'src/shared/types'
import storage from '@/storage'
import { StorageKeyGenerator } from '@/storage/StoreStorage'
import { AIDH_API_URL } from '@/variables'

export type FileContent = {
  type?: string
  text?: string
  mimeType?: string
  data?: string
  image_url?: { url: string }
}

export async function requestFileProcessing(
  settings: Settings,
  mime: string | undefined,
  dataBuffer: Uint8Array
): Promise<{ content: FileContent[] }> {
  const { providerSetting } = getProviderSettings(settings)
  const resp = await axios.post(
    `${AIDH_API_URL}/file/process`,
    { mime, dataBuffer: Array.from(dataBuffer) },
    {
      headers: {
        Authorization: `Bearer ${providerSetting.apiKey}`,
      },
      responseType: 'json',
    }
  )
  return resp.data
}

async function storeProcessedBlocks(
  content: FileContent[]
): Promise<Array<{ type: 'text'; storageKey: string } | { type: 'image'; storageKey: string }>> {
  const processedBlocks: Array<{ type: 'text'; storageKey: string } | { type: 'image'; storageKey: string }> = []

  for (const result of content) {
    if (result.type === 'text' && result.text?.trim()) {
      const key = `parseFile-${uuidv4()}`
      await storage.setBlob(key, result.text)
      processedBlocks.push({ type: 'text', storageKey: key })
      continue
    }

    if (result.type === 'image_url' && result.image_url?.url) {
      const key = StorageKeyGenerator.picture('file-attachment')
      await storage.setBlob(key, result.image_url.url)
      processedBlocks.push({ type: 'image', storageKey: key })
      continue
    }

    // PDF and other legacy image responses: { mimeType, data }
    if (result.data && result.mimeType) {
      const base64 = `data:${result.mimeType};base64,${result.data}`
      const key = StorageKeyGenerator.picture('file-attachment')
      await storage.setBlob(key, base64)
      processedBlocks.push({ type: 'image', storageKey: key })
    }
  }

  return processedBlocks
}

export async function processRemoteFileAttachment(settings: Settings, file: File): Promise<MessageFile> {
  const results = await requestFileProcessing(settings, file.type, new Uint8Array(await file.arrayBuffer()))
  const processedBlocks = await storeProcessedBlocks(results.content)

  return {
    id: file.name,
    name: file.name,
    fileType: file.type,
    processedBlocks,
    pageImageStorageKeys: processedBlocks
      .filter((block): block is { type: 'image'; storageKey: string } => block.type === 'image')
      .map((block) => block.storageKey),
  }
}

/** @deprecated Use processRemoteFileAttachment */
export const processPdfAttachment = processRemoteFileAttachment
