import { createMiddleware } from 'hono/factory'

interface RateLimitRecord {
  count: number
  resetAt: number
}

const requests = new Map<string, RateLimitRecord>()

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [ip, record] of requests) {
    if (now > record.resetAt) {
      requests.delete(ip)
    }
  }
}, 60000)

export const rateLimiter = (limit = 100, windowMs = 60000) => {
  return createMiddleware(async (c, next) => {
    const ip = c.req.header('x-forwarded-for')?.split(',')[0] || 'unknown'
    const now = Date.now()
    const record = requests.get(ip)

    if (!record || now > record.resetAt) {
      requests.set(ip, { count: 1, resetAt: now + windowMs })
    } else if (record.count >= limit) {
      c.res.headers.set('Retry-After', String(Math.ceil((record.resetAt - now) / 1000)))
      return c.json({ error: 'Rate limit exceeded' }, 429)
    } else {
      record.count++
    }

    await next()
  })
}
