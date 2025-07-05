import type { Env } from '../types'
import { Hono } from 'hono'
import { authMiddleware } from '../middleware/auth'

export const protectedRouter = new Hono<Env>()
  .use(authMiddleware)
  .get('/', (c) => {
    const user = c.get('user')
    const session = c.get('session')

    if (!user || !session) {
      return c.json({
        error: 'Unauthorized',
        message:
            'This is likely due to cookies not being forwarded properly when directly navigating to Hono API routes. Try using the React Router API route at /api/protected instead.',
      }, 401)
    }
    return c.json({ message: 'Protected data from Hono API', user, session }, 200)
  })
