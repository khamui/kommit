import { Hono } from 'hono'
import { withCache, TTL } from '../middleware/cache'

const GITHUB_API = 'https://api.github.com'

function getToken(): string {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    throw new Error('GITHUB_TOKEN environment variable is required')
  }
  return token
}

const getHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  Accept: 'application/vnd.github+json',
})

export const githubRoutes = new Hono()

// GET /api/github/prs?page=1&perPage=10&languages=TypeScript,JavaScript&username=xxx
githubRoutes.get('/prs', async (c) => {
  const page = c.req.query('page') || '1'
  const perPage = c.req.query('perPage') || '10'
  const languages = c.req.query('languages') || ''
  const username = c.req.query('username')

  if (!username) {
    return c.json({ error: 'username is required' }, 400)
  }

  let query = `author:${username}+is:pr+is:merged`
  if (languages) {
    const langQuery = languages.split(',').map((l) => `language:${l}`).join('+')
    query += `+${langQuery}`
  }

  const cacheKey = `prs:${username}:${page}:${perPage}:${languages}`

  try {
    const data = await withCache(cacheKey, TTL.PRS, async () => {
      const url = `${GITHUB_API}/search/issues?q=${query}&sort=updated&order=desc&page=${page}&per_page=${perPage}`
      const res = await fetch(url, { headers: getHeaders() })
      if (!res.ok) {
        throw new Error(`GitHub API error: ${res.status}`)
      }
      return res.json()
    })

    const items = data.items.map((item: Record<string, unknown>) => ({
      number: item.number,
      title: item.title,
      body: item.body,
      merged_at: item.closed_at,
      html_url: item.html_url,
    }))

    return c.json(items)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return c.json({ error: message }, 500)
  }
})

// GET /api/github/repos/:owner/:repo/pulls/:prNumber/commits
githubRoutes.get('/repos/:owner/:repo/pulls/:prNumber/commits', async (c) => {
  const { owner, repo, prNumber } = c.req.param()
  const cacheKey = `commits:${owner}:${repo}:${prNumber}`

  try {
    const data = await withCache(cacheKey, TTL.COMMITS, async () => {
      const url = `${GITHUB_API}/repos/${owner}/${repo}/pulls/${prNumber}/commits`
      const res = await fetch(url, { headers: getHeaders() })
      if (!res.ok) {
        throw new Error(`GitHub API error: ${res.status}`)
      }
      return res.json()
    })

    const commits = data.map((item: Record<string, unknown>) => ({
      sha: item.sha,
      message: (item.commit as Record<string, unknown>).message,
      html_url: item.html_url,
    }))

    return c.json(commits)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return c.json({ error: message }, 500)
  }
})

// GET /api/github/repos/:owner/:repo/commits/:sha
githubRoutes.get('/repos/:owner/:repo/commits/:sha', async (c) => {
  const { owner, repo, sha } = c.req.param()
  const cacheKey = `commit:${owner}:${repo}:${sha}`

  try {
    const data = await withCache(cacheKey, TTL.COMMITS, async () => {
      const url = `${GITHUB_API}/repos/${owner}/${repo}/commits/${sha}`
      const res = await fetch(url, { headers: getHeaders() })
      if (!res.ok) {
        throw new Error(`GitHub API error: ${res.status}`)
      }
      return res.json()
    })

    return c.json({
      sha: data.sha,
      message: data.commit.message,
      files: data.files.map((f: Record<string, unknown>) => ({
        filename: f.filename,
        patch: f.patch,
        additions: f.additions,
        deletions: f.deletions,
      })),
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return c.json({ error: message }, 500)
  }
})

// GET /api/github/repos/:owner/:repo (for language info)
githubRoutes.get('/repos/:owner/:repo', async (c) => {
  const { owner, repo } = c.req.param()
  const cacheKey = `repo:${owner}:${repo}`

  try {
    const data = await withCache(cacheKey, TTL.REPO, async () => {
      const url = `${GITHUB_API}/repos/${owner}/${repo}`
      const res = await fetch(url, { headers: getHeaders() })
      if (!res.ok) {
        throw new Error(`GitHub API error: ${res.status}`)
      }
      return res.json()
    })

    return c.json({ language: data.language || null })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return c.json({ error: message }, 500)
  }
})
