import { createHonoServer } from 'react-router-hono-server/node'
import { auth } from '~/lib/auth'
import { logger } from '~/lib/logger'

export interface Variables {
  auth: typeof auth
  user: any
  session: any
  loadContext: any
}

export interface Env {
  Variables: Variables
}

logger.info('loading server')

// eslint-disable-next-line antfu/no-top-level-await
const server = await createHonoServer<Env>({
  configure: (app) => {
    // app.use(corsMiddleware)
    // Better Auth session middleware - extracts session from cookies
    app.use('*', async (c, next) => {
      console.log('Session middleware headers:', c.req.raw.headers)

      // Get the original request from React Router context
      const loadContext = c.get('loadContext')
      let headers = c.req.raw.headers

      if (loadContext?.params) {
        console.log('LoadContext params:', loadContext.params)
        // Try to find the request in the params
        if (loadContext.params.request) {
          console.log('Original React Router request headers:', loadContext.params.request.headers)
          headers = loadContext.params.request.headers
        }
      }

      const session = await auth.api.getSession({
        headers,
      })

      if (session) {
        c.set('user', session.user)
        c.set('session', session.session)
      }
      else {
        c.set('user', null)
        c.set('session', null)
      }

      await next()
    })
    app.get('/api/protected', (c) => {
      const user = c.get('user')
      const session = c.get('session')
      console.log('Protected route user:', user)
      console.log('Protected route session:', session)

      if (!user || !session) {
        return c.json({ error: 'Unauthorized' }, 401)
      }
      return c.json({ message: 'Protected data', user, session })
    })
  },
  getLoadContext: (ctx, params) => {
    // Store the original request in the context so we can access cookies
    ctx.set('loadContext', { params })
    return { ctx }
  },
})

export default server

export type AppRouter = typeof server
