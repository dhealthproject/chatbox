import { ArcProvider, ConnectorProvider, useConnectorClient } from '@solana-commerce/kit'
import { getPublicSolanaRpcUrl } from 'gill'
import type { ReactNode } from 'react'
import queryClient from '@/stores/queryClient'

function ArcProviderBridge({ children }: { children: ReactNode }) {
  const connector = useConnectorClient()

  if (!connector) {
    return children
  }

  return (
    <ArcProvider
      config={{
        network: 'mainnet',
        rpcUrl: 'https://mainnet.helius-rpc.com/?api-key=ec6dd3cf-4105-40b9-b642-e634909e2bbd',
        commitment: 'confirmed',
        connector,
      }}
      queryClient={queryClient}
    >
      {children}
    </ArcProvider>
  )
}

export function SolanaCommerceProvider({ children }: { children: ReactNode }) {
  return (
    <ConnectorProvider config={{ autoConnect: true }}>
      <ArcProviderBridge>{children}</ArcProviderBridge>
    </ConnectorProvider>
  )
}
