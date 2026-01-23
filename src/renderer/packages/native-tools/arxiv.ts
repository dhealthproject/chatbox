import { tool } from 'ai'
import { z } from 'zod'
import platform from '@/platform'

interface ArxivPaper {
  id: string
  title: string
  authors: string[]
  summary: string
  published: string
  url: string
}

/**
 * ArXiv search tool - search for research papers
 * This tool searches arXiv for papers matching your query
 */
export const arxivTool = tool({
  description:
    'Search for research papers on arXiv. Use this to find papers by keyword, topic, or author. Returns paper titles, abstracts, and links.',
  parameters: z.object({
    query: z.string().describe('Search query - can be keywords, paper title, or author name'),
    max_results: z.number().int().min(1).max(100).optional().describe('Maximum number of results to return (default: 10)'),
  }),
  execute: async (args) => {
    const { query, max_results = 10 } = args

    try {
      return await searchArxiv(query, max_results)
    } catch (error) {
      return {
        error: `Failed to search arXiv: ${(error as Error).message}`,
      }
    }
  },
})

/**
 * Search arXiv for papers
 */
async function searchArxiv(query: string, maxResults: number): Promise<{ papers: ArxivPaper[] } | { error: string }> {
  try {
    // Use arXiv API
    const searchUrl = `https://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(query)}&start=0&max_results=${maxResults}&sortBy=relevance&sortOrder=descending`

    let response: Response
    if (platform.type === 'desktop') {
      // Use IPC on desktop
      const result = await (window.electronAPI as any).invoke('native-fetch', searchUrl)
      if (result.error) {
        return { error: result.error }
      }
      // Parse the response as text and create a Response-like object
      const xmlText = result.html
      response = new Response(xmlText, { headers: { 'content-type': 'application/atom+xml' } })
    } else {
      // Direct fetch on web
      response = await fetch(searchUrl)
    }

    if (!response.ok) {
      return { error: `HTTP ${response.status}: ${response.statusText}` }
    }

    const xmlText = await response.text()
    const papers = parseArxivResponse(xmlText)

    return { papers }
  } catch (error) {
    return {
      error: `Failed to search arXiv: ${(error as Error).message}`,
    }
  }
}

/**
 * Parse arXiv API XML response
 */
function parseArxivResponse(xml: string): ArxivPaper[] {
  const papers: ArxivPaper[] = []

  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(xml, 'application/xml')

    // Get all entry elements
    const entries = doc.querySelectorAll('entry')

    entries.forEach((entry) => {
      const id = entry.querySelector('id')?.textContent?.split('/abs/')[-1] || ''
      const title = entry.querySelector('title')?.textContent?.trim() || ''
      const summary = entry.querySelector('summary')?.textContent?.trim() || ''
      const published = entry.querySelector('published')?.textContent?.split('T')[0] || ''

      // Get authors
      const authors: string[] = []
      entry.querySelectorAll('author name').forEach((author) => {
        const name = author.textContent?.trim()
        if (name) authors.push(name)
      })

      if (id && title) {
        papers.push({
          id,
          title,
          authors,
          summary,
          published,
          url: `https://arxiv.org/abs/${id}`,
        })
      }
    })
  } catch (error) {
    console.error('Error parsing arXiv response:', error)
  }

  return papers
}
