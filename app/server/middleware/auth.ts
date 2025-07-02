import type { Session } from '~/lib/auth'
import { createMiddleware } from 'hono/factory'
import { auth } from '~/lib/auth'

export const authMiddleware = createMiddleware<{
  Variables: {
    session: Session['session']
    user: Session['user']
  }
}>(async (c, next) => {
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
