import { config } from 'dotenv'
config({ path: '.env.local' })
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { githubRoutes } from './routes/github'
import { rateLimiter } from './middleware/rateLimit'

const app = new Hono()

// CORS configuration
const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:5173'
app.use(
  '*',
  cors({
    origin: allowedOrigin,
    allowMethods: ['GET', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
    maxAge: 86400,
  })
)

// Rate limiting: 100 requests per minute per IP
app.use('*', rateLimiter(100, 60000))

// Mount GitHub routes
app.route('/api/github', githubRoutes)

// Health check
app.get('/health', (c) => c.json({ status: 'ok' }))

export default app
