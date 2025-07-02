import { Hono } from 'hono'
import { authMiddleware } from '../middleware/auth'

export const protectedRouter = new Hono()
  .use(authMiddleware)
  .get('/', (c) => {
    return c.json({ message: 'Protected data', user: c.get('user') })
  })
