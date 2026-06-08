import {
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Loader,
  Paper,
  SegmentedControl,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import {
  IconBrandStripe,
  IconCalendar,
  IconCreditCard,
  IconInfoCircle,
  IconRefresh,
  IconWallet,
} from '@tabler/icons-react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Page from '@/components/Page'
import { useAidhApiKeyDetails } from '@/hooks/useAidhApiKeyDetails'
import { useProviderSettings } from '@/hooks/useSettings'
import { useIsSmallScreen } from '@/hooks/useScreenChange'
import { formatAidhExpiryDate } from '@/packages/aidh-api'
import { AIDH_API_URL } from '@/variables'

export const Route = createFileRoute('/payment')({
  component: PaymentPage,
})

/** Single top-up SKU — pricing constants for UI; checkout wiring comes later */
const TOP_UP = {
  durationDays: 30,
  fiatUsd: 20,
  solanaAidh: 2000,
  solanaUsdc: 20,
} as const

type PaymentMethod = 'fiat' | 'solana'
type SolanaToken = 'aidh' | 'usdc'

function maskApiKey(apiKey: string | undefined): string {
  if (!apiKey) {
    return '—'
  }
  if (apiKey.length <= 8) {
    return '••••••••'
  }
  return `${apiKey.slice(0, 4)}••••${apiKey.slice(-4)}`
}

function formatPriceSummary(method: PaymentMethod, solanaToken: SolanaToken): string {
  if (method === 'fiat') {
    return `$${TOP_UP.fiatUsd.toFixed(2)} USD`
  }
  return solanaToken === 'aidh'
    ? `${TOP_UP.solanaAidh.toLocaleString()} AIDH`
    : `${TOP_UP.solanaUsdc} USDC`
}

function ApiKeyExpiryDisplay({ apiKey }: { apiKey: string | undefined }) {
  const { t, i18n } = useTranslation()
  const { expiryRaw, isExpired, isLoading, isFetching, isError, refetch } = useAidhApiKeyDetails(apiKey)

  if (!apiKey) {
    return (
      <Title order={3} c="chatbox-tertiary">
        —
      </Title>
    )
  }

  const expiryLabel = (() => {
    if (isLoading) {
      return <Loader size="sm" />
    }
    if (isError) {
      return (
        <Text size="sm" c="chatbox-error">
          {t('Failed to load expiry')}
        </Text>
      )
    }
    if (!expiryRaw) {
      return (
        <Text size="sm" c="chatbox-tertiary">
          —
        </Text>
      )
    }
    return (
      <Flex direction="column" gap={2} align="flex-end">
        <Text fw={600} size="sm" c={isExpired ? 'chatbox-error' : undefined}>
          {formatAidhExpiryDate(expiryRaw, i18n.language)}
        </Text>
      </Flex>
    )
  })()

  return (
    <Flex align="flex-start" gap="xs" wrap="wrap" justify="flex-end">
      {expiryLabel}
      <Button
        variant="subtle"
        size="compact-xs"
        c="chatbox-brand"
        px="xs"
        disabled={isLoading}
        loading={isFetching && !isLoading}
        onClick={() => refetch()}
        leftSection={<IconRefresh size={14} />}
      >
        {t('Refresh')}
      </Button>
    </Flex>
  )
}

function PaymentPage() {
  const { t } = useTranslation()
  const isSmallScreen = useIsSmallScreen()
  const { providerSettings } = useProviderSettings('aidh')
  const apiKey = providerSettings?.apiKey

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('fiat')
  const [solanaToken, setSolanaToken] = useState<SolanaToken>('usdc')

  const priceSummary = formatPriceSummary(paymentMethod, solanaToken)

  async function handlePaymentButton() {
    if (paymentMethod === 'fiat') {
      try {
        const response = await fetch(`${AIDH_API_URL}/checkout/create-checkout-session`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          const errorText = await response.text()
          console.error('Error response body:', errorText)
          return
        }
        const data = await response.json()
        if (!data.url) {
          console.error('No URL in response:', data)
          return
        }
        window.location.href = data.url
      } catch (err) {
        console.error('Fetch failed:', err)
      }
    }
  }

  return (
    <Page title={t('Top Up')}>
      <Container size="sm" p={0}>
        <Stack gap="xl" px={isSmallScreen ? 'sm' : 'md'} py={isSmallScreen ? 'xl' : 'md'}>
          <Stack gap="xs">
            <Title order={4}>{t('Top Up API Access')}</Title>
            <Text c="chatbox-tertiary" size="sm">
              {t('Extend AIDH inference for your API key. Choose card or Solana payment — checkout is not connected yet.')}
            </Text>
          </Stack>

          <Paper
            p="lg"
            radius="md"
            className="border border-solid border-[var(--mantine-color-chatbox-border-primary-outline)] bg-[var(--mantine-color-chatbox-background-secondary-text)]"
          >
            <Stack gap="md">
              <Flex justify="space-between" align="flex-start" wrap="wrap" gap="sm">
                <Stack gap={4}>
                  <Text size="xs" c="chatbox-tertiary" tt="uppercase" fw={600}>
                    {t('API Key')}
                  </Text>
                  <Text ff="monospace" size="sm">
                    {maskApiKey(apiKey)}
                  </Text>
                </Stack>
                <Stack gap={4} align={isSmallScreen ? 'flex-start' : 'flex-end'}>
                  <Text size="xs" c="chatbox-tertiary" tt="uppercase" fw={600}>
                    {t('Expiry date')}
                  </Text>
                  <ApiKeyExpiryDisplay apiKey={apiKey} />
                </Stack>
              </Flex>

              {!apiKey && (
                <Flex
                  gap="xs"
                  align="flex-start"
                  p="sm"
                  className="rounded-md bg-[var(--mantine-color-chatbox-brand-light)]"
                >
                  <IconInfoCircle size={18} className="shrink-0 mt-0.5 text-[var(--mantine-color-chatbox-brand)]" />
                  <Text size="sm" c="chatbox-secondary">
                    {t('Configure your API key in Settings before topping up.')}{' '}
                    <Link
                      to="/settings/provider/$providerId"
                      params={{ providerId: 'aidh' }}
                      className="text-[var(--mantine-color-chatbox-brand)]"
                    >
                      {t('Go to API settings')}
                    </Link>
                  </Text>
                </Flex>
              )}
            </Stack>
          </Paper>

          <Paper
            p="lg"
            radius="md"
            className="border border-solid border-[var(--mantine-color-chatbox-brand)] bg-[var(--mantine-color-chatbox-brand-light)]"
          >
            <Flex gap="md" align="flex-start">
              <Box
                className="flex items-center justify-center rounded-md p-2 shrink-0"
                style={{ background: 'var(--mantine-color-chatbox-background-primary)' }}
              >
                <IconCalendar size={28} className="text-[var(--mantine-color-chatbox-brand)]" />
              </Box>
              <Stack gap="xs" flex={1}>
                <Badge variant="light" color="violet" w="fit-content">
                  {t('Plan available')}
                </Badge>
                <Title order={5}>{t('30 days of AIDH inference')}</Title>
                <Text size="sm" c="chatbox-secondary">
                  {t('Inference access to AIDH models for 30 days on this API key.')}
                </Text>
              </Stack>
            </Flex>
          </Paper>

          <Stack gap="md">
            <Title order={5}>{t('Payment method')}</Title>
            <SegmentedControl
              fullWidth
              value={paymentMethod}
              onChange={(value) => setPaymentMethod(value as PaymentMethod)}
              data={[
                {
                  value: 'fiat',
                  label: (
                    <Flex align="center" justify="center" gap="xs" py={4}>
                      <IconCreditCard size={18} />
                      <span>{t('Card / Fiat')}</span>
                    </Flex>
                  ),
                },
                {
                  value: 'solana',
                  label: (
                    <Flex align="center" justify="center" gap="xs" py={4}>
                      <SolanaMark size={18} />
                      <span>Solana</span>
                    </Flex>
                  ),
                },
              ]}
            />

            {paymentMethod === 'fiat' ? <FiatPaymentPanel /> : <SolanaPaymentPanel token={solanaToken} onTokenChange={setSolanaToken} />}
          </Stack>

          <Paper
            p="lg"
            radius="md"
            className="border border-solid border-[var(--mantine-color-chatbox-border-primary-outline)]"
          >
            <Stack gap="md">
              <Flex justify="space-between" align="center">
                <Text c="chatbox-tertiary">{t('Plan')}</Text>
                <Text fw={600} size="sm" ta="right">
                  {t('30 days of AIDH inference')}
                </Text>
              </Flex>
              <Flex justify="space-between" align="center">
                <Text c="chatbox-tertiary">{t('Price')}</Text>
                <Text fw={600} size="lg">
                  {priceSummary}
                </Text>
              </Flex>
              <Divider />
              <Button
                size="md"
                fullWidth
                // disabled
                onClick={() => handlePaymentButton()}
                leftSection={
                  paymentMethod === 'fiat' ? <IconCreditCard size={18} /> : <IconWallet size={18} />
                }
              >
                {paymentMethod === 'fiat'
                  ? t('Pay {{amount}} USD with card', { amount: TOP_UP.fiatUsd })
                  : solanaToken === 'aidh'
                    ? t('Pay {{amount}} AIDH on Solana', { amount: TOP_UP.solanaAidh.toLocaleString() })
                    : t('Pay {{amount}} USDC on Solana', { amount: TOP_UP.solanaUsdc })}
              </Button>
              {/* <Text size="xs" c="chatbox-tertiary" ta="center">
                {t('Payment processing will be available in a future update.')}
              </Text> */}
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Page>
  )
}

function FiatPaymentPanel() {
  const { t } = useTranslation()

  return (
    <Paper
      p="lg"
      radius="md"
      className="border border-dashed border-[var(--mantine-color-chatbox-border-primary-outline)] bg-[var(--mantine-color-chatbox-background-secondary-text)]"
    >
      <Stack gap="md">
        <Flex align="center" gap="sm">
          <Box
            className="flex items-center justify-center rounded-md p-2"
            style={{ background: 'var(--mantine-color-chatbox-background-primary)' }}
          >
            <IconBrandStripe size={28} stroke={1.25} />
          </Box>
          <Stack gap={2}>
            <Text fw={600}>{t('Card & bank (fiat)')}</Text>
            <Text size="sm" c="chatbox-tertiary">
              {t('Fixed price for 30 days of inference.')}
            </Text>
          </Stack>
        </Flex>

        <Flex justify="space-between" align="center" p="md" className="rounded-md border border-solid border-[var(--mantine-color-chatbox-border-primary-outline)]">
          <Text fw={600}>{t('Total due')}</Text>
          <Text fw={700} size="xl">
            ${TOP_UP.fiatUsd.toFixed(2)} USD
          </Text>
        </Flex>

        <Stack gap="xs">
          <Text size="sm" c="chatbox-tertiary">
            {t('Supported (planned)')}
          </Text>
          <Flex gap="xs" wrap="wrap">
            <Badge variant="outline">Visa</Badge>
            <Badge variant="outline">Mastercard</Badge>
            <Badge variant="outline">Apple Pay</Badge>
          </Flex>
        </Stack>
      </Stack>
    </Paper>
  )
}

function SolanaPaymentPanel({
  token,
  onTokenChange,
}: {
  token: SolanaToken
  onTokenChange: (token: SolanaToken) => void
}) {
  const { t } = useTranslation()

  return (
    <Paper
      p="lg"
      radius="md"
      className="border border-dashed border-[var(--mantine-color-chatbox-border-primary-outline)] bg-[var(--mantine-color-chatbox-background-secondary-text)]"
    >
      <Stack gap="md">
        <Flex align="center" gap="sm">
          <SolanaMark size={36} />
          <Stack gap={2}>
            <Text fw={600}>Solana</Text>
            <Text size="sm" c="chatbox-tertiary">
              {t('Pay with AIDH or USDC on Solana mainnet.')}
            </Text>
          </Stack>
        </Flex>

        <Stack gap="xs">
          <Text size="sm" fw={500}>
            {t('Pay with')}
          </Text>
          <SegmentedControl
            fullWidth
            value={token}
            onChange={(value) => onTokenChange(value as SolanaToken)}
            data={[
              {
                value: 'aidh',
                label: `${TOP_UP.solanaAidh.toLocaleString()} AIDH`,
              },
              {
                value: 'usdc',
                label: `${TOP_UP.solanaUsdc} USDC`,
              },
            ]}
          />
        </Stack>

        <Flex justify="space-between" align="center" p="md" className="rounded-md border border-solid border-[var(--mantine-color-chatbox-border-primary-outline)]">
          <Text fw={600}>{t('Total due')}</Text>
          <Text fw={700} size="xl">
            {token === 'aidh' ? `${TOP_UP.solanaAidh.toLocaleString()} AIDH` : `${TOP_UP.solanaUsdc} USDC`}
          </Text>
        </Flex>

        <Stack gap="xs">
          <Text size="xs" c="chatbox-tertiary" tt="uppercase" fw={600}>
            {t('Deposit address')}
          </Text>
          <Paper
            p="sm"
            radius="sm"
            className="border border-solid border-[var(--mantine-color-chatbox-border-primary-outline)]"
          >
            <Text ff="monospace" size="sm" c="chatbox-tertiary">
              {t('Generated at checkout')}
            </Text>
          </Paper>
        </Stack>

        <Flex gap="xs" wrap="wrap">
          <Badge variant="light" color="violet">
            Mainnet
          </Badge>
          <Badge variant="outline">
            AIDH
          </Badge>
          <Badge variant="outline">
            USDC
          </Badge>
        </Flex>
      </Stack>
    </Paper>
  )
}

/** Simple Solana-style gradient mark for the payment method selector */
function SolanaMark({ size = 24 }: { size?: number }) {
  return (
    <Box
      component="span"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #9945FF 0%, #14F195 100%)',
        display: 'inline-block',
        flexShrink: 0,
      }}
      aria-hidden
    />
  )
}
