import type { Env } from './types'
import { csrf } from 'hono/csrf'
import { createMiddleware } from 'hono/factory'
import { createHonoServer } from 'react-router-hono-server/node'
import { auth } from '~/lib/auth'
import { logger } from '~/lib/logger'
import { corsMiddleware } from './middleware/cors'

logger.info('loading server')

function withAuth() {
  return createMiddleware(async (ctx, next) => {
    ctx.set('auth', auth)

    await next()
  })
}

// eslint-disable-next-line antfu/no-top-level-await
const server = await createHonoServer<Env>({
  configure: (app) => {
    app.use(corsMiddleware)
    app.use(withAuth())
    // Better Auth session middleware - extracts session from cookies
    app.use('*', async (c, next) => {
      // Session validation logic here
      const headers = new Headers(c.req.raw.headers)
      const session = await auth.api.getSession({
        headers,
      })

      if (session) {
        c.set('user', session.user)
        c.set('session', session.session)
      }

      await next()
    })
    app.use(csrf())
    app.on(['POST', 'GET'], '/api/auth/*', (c) => {
      return auth.handler(c.req.raw)
    })
    app.get('/api/protected', (c) => {
      const user = c.get('user')
      const session = c.get('session')

      if (!user || !session) {
        return c.json({
          error: 'Unauthorized',
          message:
            'This is likely due to cookies not being forwarded properly when directly navigating to Hono API routes. Try using the React Router API route at /api/protected instead.',
        }, 401)
      }
      return c.json({ message: 'Protected data from Hono API', user, session })
    })
  },
})

export default server

export type AppRouter = typeof server
