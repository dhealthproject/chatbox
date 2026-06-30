import axios from 'axios'
import { getProviderSettings } from 'src/shared/models'
import type { MessageFile, Settings } from 'src/shared/types'
import storage from '@/storage'
import { StorageKeyGenerator } from '@/storage/StoreStorage'
import { AIDH_API_URL } from '@/variables'

export type FileContent = {
  type: string
  text?: string
  mimeType?: string
  data?: string
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

export async function processPdfAttachment(settings: Settings, file: File): Promise<MessageFile> {
  const results = await requestFileProcessing(settings, file.type, new Uint8Array(await file.arrayBuffer()))
  const pageImageStorageKeys: string[] = []
  for (const result of results.content) {
    if (!result.data || !result.mimeType) {
      continue
    }
    const base64 = `data:${result.mimeType};base64,${result.data}`
    const key = StorageKeyGenerator.picture('pdf-attachment')
    await storage.setBlob(key, base64)
    pageImageStorageKeys.push(key)
  }
  return {
    id: file.name,
    name: file.name,
    fileType: file.type,
    pageImageStorageKeys,
  }
}
