import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import {
  fetchAidhApiKeyDetails,
  getExpiryFromApiKeyDetails,
  isAidhExpiryPast,
} from '@/packages/aidh-api'
import { languageAtom } from '@/stores/atoms'

export function useAidhApiKeyDetails(apiKey: string | undefined) {
  const language = useAtomValue(languageAtom)

  const query = useQuery({
    queryKey: ['aidh-api-key-details', apiKey],
    queryFn: () => fetchAidhApiKeyDetails(apiKey!),
    enabled: !!apiKey,
    staleTime: 60_000,
  })

  const expiryRaw = getExpiryFromApiKeyDetails(query.data)

  return {
    ...query,
    details: query.data,
    expiryRaw,
    isExpired: expiryRaw ? isAidhExpiryPast(expiryRaw) : false,
    locale: language,
  }
}
