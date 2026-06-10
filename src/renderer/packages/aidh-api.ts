import axios from 'axios'
import { AIDH_API_URL } from '@/variables'

export interface AidhApiKeyMessage {
  id: string
  title: string
  content: string
}

export interface AidhApiKeyDetails {
  promoCode?: string
  messages?: AidhApiKeyMessage[]
  expiresAt?: string
  expiryDate?: string
  expireAt?: string
  expirationDate?: string
  token_expire_time?: string
  [key: string]: unknown
}

const EXPIRY_FIELDS = [
  'expiresAt',
  'expiryDate',
  'expiry',
  'expireAt',
  'expirationDate',
  'expiration',
  'token_expire_time',
  'tokenExpireTime',
] as const

export interface AidhGenerateApiKeyResponse {
  apiKey: string
  details: {
    hash: string
    expiresAt: string
    role: string
    _id: string
    createdAt: string
    updatedAt: string
    __v: number
  }
}

export async function fetchAidhApiKeyDetails(apiKey: string): Promise<AidhApiKeyDetails> {
  const { data } = await axios.get<AidhApiKeyDetails>(`${AIDH_API_URL}/apikeys`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  })
  return data
}

export async function generateAidhApiKey(): Promise<string> {
  const { data } = await axios.post<AidhGenerateApiKeyResponse>(`${AIDH_API_URL}/apikeys/generate`)
  return data.apiKey
}

export function getExpiryFromApiKeyDetails(details: AidhApiKeyDetails | null | undefined): string | null {
  if (!details) {
    return null
  }

  for (const field of EXPIRY_FIELDS) {
    const value = details[field]
    if (typeof value === 'string' && value.trim()) {
      return value
    }
  }

  const nested = details.apiKey
  if (nested && typeof nested === 'object' && !Array.isArray(nested)) {
    return getExpiryFromApiKeyDetails(nested as AidhApiKeyDetails)
  }

  return null
}

export function formatAidhExpiryDate(isoOrTimestamp: string, locale?: string): string {
  const date = new Date(isoOrTimestamp)
  if (Number.isNaN(date.getTime())) {
    return isoOrTimestamp
  }
  return date.toLocaleString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function isAidhExpiryPast(isoOrTimestamp: string): boolean {
  const date = new Date(isoOrTimestamp)
  return !Number.isNaN(date.getTime()) && date.getTime() < Date.now()
}
