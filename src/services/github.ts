import { config } from '../config'

const API_BASE = `${config.api.baseUrl}/github`

export class RateLimitError extends Error {
  constructor(public retryAfter: number) {
    super(`Rate limit exceeded. Retry in ${retryAfter}s`)
  }
}

export interface PullRequest {
  number: number
  title: string
  body: string | null
  merged_at: string
  html_url: string
}

export interface Commit {
  sha: string
  message: string
  html_url: string
}

export interface CommitDetail {
  sha: string
  message: string
  files: {
    filename: string
    patch?: string
    additions: number
    deletions: number
  }[]
}

export async function fetchMergedPRs(
  page = 1,
  perPage = 10,
  languages: string[] = []
): Promise<PullRequest[]> {
  const params = new URLSearchParams({
    page: String(page),
    perPage: String(perPage),
    username: config.github.username,
  })
  if (languages.length > 0) {
    params.set('languages', languages.join(','))
  }

  const res = await fetch(`${API_BASE}/prs?${params}`)
  if (res.status === 429) {
    const retryAfter = parseInt(res.headers.get('Retry-After') || '60', 10)
    throw new RateLimitError(retryAfter)
  }
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`)
  }

  return res.json()
}

export async function fetchPRCommits(
  owner: string,
  repo: string,
  prNumber: number
): Promise<Commit[]> {
  const url = `${API_BASE}/repos/${owner}/${repo}/pulls/${prNumber}/commits`

  const res = await fetch(url)
  if (res.status === 429) {
    const retryAfter = parseInt(res.headers.get('Retry-After') || '60', 10)
    throw new RateLimitError(retryAfter)
  }
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`)
  }

  return res.json()
}

export async function fetchCommitDetail(
  owner: string,
  repo: string,
  sha: string
): Promise<CommitDetail> {
  const url = `${API_BASE}/repos/${owner}/${repo}/commits/${sha}`

  const res = await fetch(url)
  if (res.status === 429) {
    const retryAfter = parseInt(res.headers.get('Retry-After') || '60', 10)
    throw new RateLimitError(retryAfter)
  }
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`)
  }

  return res.json()
}

export async function fetchRepoLanguage(
  owner: string,
  repo: string
): Promise<string | null> {
  const url = `${API_BASE}/repos/${owner}/${repo}`

  const res = await fetch(url)
  if (!res.ok) {
    return null
  }

  const data = await res.json()
  return data.language || null
}
