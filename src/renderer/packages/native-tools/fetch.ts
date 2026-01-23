import { tool } from 'ai'
import { z } from 'zod'
import platform from '@/platform'

interface FetchResult {
  url: string
  title?: string
  content: string
  fetched_at: string
}

/**
 * Fetch tool - retrieve and convert HTML to markdown
 * This tool fetches web pages and converts HTML to readable markdown
 */
export const fetchTool = tool({
  description:
    'Fetch and convert web page content to markdown. Use this to retrieve and read content from URLs, extracting the main text and structure.',
  parameters: z.object({
    url: z.string().describe('The URL to fetch content from'),
    include_html: z.boolean().optional().describe('Include the original HTML in the response (default: false)'),
  }),
  execute: async (args) => {
    const url = args.url
    const includeHtml = args.include_html === true

    try {
      return await fetchAndConvertToMarkdown(url, includeHtml)
    } catch (error) {
      return {
        error: `Failed to fetch URL: ${(error as Error).message}`,
      }
    }
  },
})

/**
 * Fetch a URL and convert HTML to markdown
 * Uses readability algorithm to extract main content
 */
export async function fetchAndConvertToMarkdown(
  url: string,
  includeHtml: boolean = false
): Promise<FetchResult | { error: string }> {
  try {
    // Validate URL
    try {
      new URL(url)
    } catch {
      return {
        error: `Invalid URL: ${url}`,
      }
    }

    // Get HTML based on platform
    const fetchResult = await performFetch(url)

    if ('error' in fetchResult) {
      return fetchResult
    }

    const html = fetchResult.html

    // Convert to markdown
    const markdown = await convertHtmlToMarkdown(html)

    const result: FetchResult = {
      url,
      content: markdown,
      fetched_at: new Date().toISOString(),
    }

    if (includeHtml) {
      result['html'] = html
    }

    return result
  } catch (error) {
    return {
      error: `Failed to fetch URL: ${(error as Error).message}`,
    }
  }
}

/**
 * Perform the actual fetch - use IPC on desktop, direct fetch on web
 */
async function performFetch(url: string): Promise<{ html: string } | { error: string }> {
  if (platform.type === 'desktop') {
    // Use IPC to fetch from main process (has network access)
    try {
      const result = await (window.electronAPI as any).invoke('native-fetch', url)
      if (result.error) {
        return { error: result.error }
      }
      return { html: result.html }
    } catch (error) {
      return { error: `IPC fetch failed: ${(error as Error).message}` }
    }
  } else {
    // On web, use direct fetch with CORS proxy fallback
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
      })

      if (!response.ok) {
        return { error: `HTTP ${response.status}: ${response.statusText}` }
      }

      const contentType = response.headers.get('content-type')
      if (!contentType?.includes('text/html')) {
        return { error: `Content is not HTML (${contentType || 'unknown type'})` }
      }

      const html = await response.text()
      return { html }
    } catch (error) {
      const errorMsg = (error as Error).message
      // Try with CORS proxy for blocked requests on web
      if (errorMsg.includes('Failed to fetch') || errorMsg.includes('CORS')) {
        try {
          const corsProxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
          const proxyResponse = await fetch(corsProxyUrl)
          if (!proxyResponse.ok) {
            return {
              error: `CORS blocked: Server doesn't allow cross-origin requests. Some websites block browser requests for security reasons.`,
            }
          }
          const html = await proxyResponse.text()
          return { html }
        } catch {
          return {
            error: `CORS blocked: The website doesn't allow requests from browsers. Try sites like wikipedia.org or arxiv.org`,
          }
        }
      }
      return { error: `Failed to fetch: ${errorMsg}` }
    }
  }
}

/**
 * Convert HTML to markdown
 * Uses a simple but effective approach:
 * 1. Extract main content using readability principles
 * 2. Convert to markdown
 */
async function convertHtmlToMarkdown(html: string): Promise<string> {
  // Create a DOM parser (works in browser)
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  // Extract title
  const title =
    doc.querySelector('h1')?.textContent || doc.querySelector('title')?.textContent || ''

  // Remove script and style elements
  doc.querySelectorAll('script, style, nav, footer, [aria-hidden="true"]').forEach((el) => {
    el.remove()
  })

  // Find main content area (article, main, or largest text content)
  let contentElement = doc.querySelector('article') || doc.querySelector('main') || doc.body

  // If body is empty, try other containers
  if (!contentElement || contentElement.textContent?.trim().length === 0) {
    const potentialContainers = doc.querySelectorAll('[role="main"], .content, .post, .entry')
    if (potentialContainers.length > 0) {
      contentElement = potentialContainers[0]
    }
  }

  // Convert to markdown
  const markdown = htmlToMarkdown(contentElement)

  // Combine title and content
  let result = ''
  if (title) {
    result += `# ${title}\n\n`
  }
  result += markdown

  // Clean up excessive whitespace
  result = result
    .replace(/\n{4,}/g, '\n\n') // Max 2 newlines
    .replace(/\n\s+\n/g, '\n\n') // Remove whitespace-only lines
    .trim()

  return result
}

/**
 * Recursively convert HTML element to markdown
 */
function htmlToMarkdown(element: Element | null | undefined): string {
  if (!element) return ''

  let markdown = ''

  for (const node of element.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim()
      if (text) {
        markdown += text + ' '
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as Element
      const tag = el.tagName.toLowerCase()

      switch (tag) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6': {
          const level = parseInt(tag[1])
          const hashes = '#'.repeat(level)
          markdown += `\n${hashes} ${el.textContent?.trim()}\n\n`
          break
        }

        case 'p':
          markdown += `${htmlToMarkdown(el).trim()}\n\n`
          break

        case 'br':
          markdown += '\n'
          break

        case 'a': {
          const href = el.getAttribute('href')
          const text = el.textContent?.trim()
          if (href && text) {
            markdown += `[${text}](${href}) `
          } else if (text) {
            markdown += text + ' '
          }
          break
        }

        case 'strong':
        case 'b':
          markdown += `**${el.textContent?.trim()}** `
          break

        case 'em':
        case 'i':
          markdown += `*${el.textContent?.trim()}* `
          break

        case 'code':
        case 'tt':
          markdown += `\`${el.textContent?.trim()}\` `
          break

        case 'pre': {
          const code = el.textContent?.trim()
          const lang = el.className.match(/language-(\w+)/)?.[1] || ''
          markdown += `\n\`\`\`${lang}\n${code}\n\`\`\`\n\n`
          break
        }

        case 'blockquote':
          markdown += htmlToMarkdown(el)
            .split('\n')
            .map((line) => `> ${line}`)
            .join('\n')
          markdown += '\n\n'
          break

        case 'ul':
        case 'ol': {
          const items: string[] = []
          el.querySelectorAll(':scope > li').forEach((li, index) => {
            const prefix = tag === 'ol' ? `${index + 1}. ` : '- '
            items.push(prefix + htmlToMarkdown(li).trim())
          })
          markdown += items.join('\n') + '\n\n'
          break
        }

        case 'img': {
          const src = el.getAttribute('src')
          const alt = el.getAttribute('alt') || 'image'
          if (src) {
            markdown += `![${alt}](${src}) `
          }
          break
        }

        case 'figure':
        case 'section':
        case 'div':
        case 'span':
        case 'article':
        case 'main':
          markdown += htmlToMarkdown(el)
          break

        default:
          markdown += htmlToMarkdown(el)
          break
      }
    }
  }

  return markdown
}
