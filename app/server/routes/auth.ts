import { Hono } from 'hono'
import { auth } from '~/lib/auth'

export const authRouter = new Hono()

authRouter
  .get('/auth/**', (c) => {
    return auth.handler(c.req.raw)
  })
  .post('/auth/**', (c) => {
    return auth.handler(c.req.raw)
  })
