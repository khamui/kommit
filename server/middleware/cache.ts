interface CacheEntry<T> {
  data: T
  expiresAt: number
}

const cache = new Map<string, CacheEntry<unknown>>()

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of cache) {
    if (now > entry.expiresAt) {
      cache.delete(key)
    }
  }
}, 60000)

export async function withCache<T>(
  key: string,
  ttlMs: number,
  fetcher: () => Promise<T>
): Promise<T> {
  const cached = cache.get(key)
  if (cached && Date.now() < cached.expiresAt) {
    return cached.data as T
  }
  const data = await fetcher()
  cache.set(key, { data, expiresAt: Date.now() + ttlMs })
  return data
}

// TTL values in milliseconds
export const TTL = {
  PRS: 5 * 60 * 1000,      // 5 minutes
  COMMITS: 30 * 60 * 1000,  // 30 minutes
  REPO: 60 * 60 * 1000,     // 1 hour
}
