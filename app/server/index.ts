import type { Env } from './types'
import { Hono } from 'hono'
import { csrf } from 'hono/csrf'
import { createMiddleware } from 'hono/factory'
import { createHonoServer } from 'react-router-hono-server/node'
import { auth } from '~/lib/auth'
import { logger } from '~/lib/logger'
import { api } from './api'
import { corsMiddleware } from './middleware/cors'

logger.info('loading server')

function withAuth() {
  return createMiddleware(async (ctx, next) => {
    ctx.set('auth', auth)

    await next()
  })
}

const app = new Hono<Env>()
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

const _appRouter = app.route('/', api)

// eslint-disable-next-line antfu/no-top-level-await
const server = await createHonoServer<Env>({ app })

export default server

export type AppRouter = typeof _appRouter
