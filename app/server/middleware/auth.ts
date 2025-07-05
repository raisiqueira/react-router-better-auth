import type { Env } from '../types'
import { createMiddleware } from 'hono/factory'
import { auth } from '~/lib/auth'

export const authMiddleware = createMiddleware<Env>(async (c, next) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  })

  if (!session) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  c.set('session', session.session)
  c.set('user', session.user)

  await next()
})
