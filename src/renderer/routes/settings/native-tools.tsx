import { createFileRoute } from '@tanstack/react-router'
import { getNativeToolsMetadata } from '@/packages/native-tools/controller'
import { Box, SimpleGrid, Paper, Text, Badge, Group, Flex } from '@mantine/core'
import {
  IconWorld,
  IconBrandGithub,
  IconBrain,
  IconRocket,
  IconCheck,
  IconAlertCircle,
} from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

const categoryIcons: Record<string, React.ReactNode> = {
  web: <IconWorld size={16} />,
  research: <IconBrandGithub size={16} />,
  reasoning: <IconBrain size={16} />,
  deployment: <IconRocket size={16} />,
}

function NativeToolsSettings() {
  const { t } = useTranslation()
  const toolsMetadata = getNativeToolsMetadata()

  const categories: Array<{ category: string; label: string }> = [
    { category: 'web', label: 'Web & Content' },
    { category: 'research', label: 'Research' },
    { category: 'reasoning', label: 'Reasoning' },
    { category: 'deployment', label: 'Deployment' },
  ]

  return (
    <Box p="md">
      {/* Tools by Category */}
      {categories.map(({ category, label }) => {
        const toolIds = Object.entries(toolsMetadata)
          .filter(([_, config]) => config.category === category)
          .map(([id, _]) => id)

        if (toolIds.length === 0) return null

        return (
          <Box key={category} mb="xl">
            {/* Category Title */}
            <Group gap="xs" mb={4}>
              {categoryIcons[category]}
              <Text size="sm" fw={600}>
                {label}
              </Text>
            </Group>

            {/* Category Description */}
            <Text size="xs" c="chatbox-tertiary" mb={12}>
              {category === 'web' && 'Fetch and convert web content, deploy to CDN'}
              {category === 'research' && 'Search academic papers and research databases'}
              {category === 'reasoning' && 'Structured thinking and problem-solving tools'}
              {category === 'deployment' && 'Deploy content and manage resources'}
            </Text>

            {/* Tools Grid */}
            <SimpleGrid type="container" cols={{ base: 1, '450px': 2, '800px': 3 }}>
              {toolIds.map((toolId) => {
                const config = toolsMetadata[toolId]
                const requiresConfig = config.requiresConfig && config.requiresConfig.length > 0

                return (
                  <Paper key={toolId} shadow="xs" radius="md" withBorder p="sm">
                    {/* Tool Header */}
                    <Flex justify="space-between" align="flex-start" gap="sm" mb="xs">
                      <Box style={{ flex: 1 }}>
                        <Text size="sm" fw={600}>
                          {config.name}
                        </Text>
                      </Box>
                      {config.available ? (
                        <Badge
                          leftSection={<IconCheck size={11} />}
                          color="green"
                          variant="light"
                          size="xs"
                          style={{ marginTop: '2px' }}
                        >
                          Available
                        </Badge>
                      ) : (
                        <Badge color="gray" variant="light" size="xs" style={{ marginTop: '2px' }}>
                          Unavailable
                        </Badge>
                      )}
                    </Flex>

                    {/* Description */}
                    <Text size="xs" c="chatbox-tertiary" mb="sm" style={{ lineHeight: 1.4 }}>
                      {config.description}
                    </Text>

                    {/* Configuration Requirements */}
                    {requiresConfig && (
                      <Group gap={6} mt="sm" pt="sm" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
                        <IconAlertCircle size={12} style={{ color: 'var(--mantine-color-orange-6)' }} />
                        <Text size="xs" c="orange">
                          Requires: {config.requiresConfig?.join(', ')}
                        </Text>
                      </Group>
                    )}
                  </Paper>
                )
              })}
            </SimpleGrid>
          </Box>
        )
      })}

      {/* Info Section */}
      <Paper shadow="xs" radius="md" withBorder p="md" mt="xl" style={{ backgroundColor: 'var(--mantine-color-blue-0)' }}>
        <Group gap={8} mb="sm">
          <IconBrain size={16} style={{ color: 'var(--mantine-color-blue-6)' }} />
          <Text size="sm" fw={600}>
            About Native Tools
          </Text>
        </Group>
        <Text size="xs" c="chatbox-tertiary" style={{ lineHeight: 1.6 }}>
          Native tools are functions that run locally without requiring external servers. They work on desktop, web,
          and mobile platforms, offering fast, reliable, and privacy-first alternatives to traditional API-based tools.
        </Text>
      </Paper>
    </Box>
  )
}

export const Route = createFileRoute('/settings/native-tools')({
  component: NativeToolsSettings,
})
