import type { Env } from '../types'
import { Hono } from 'hono'
import { auth } from '~/lib/auth'

export const authRouter = new Hono<Env>()
  .get('/auth/**', (c) => {
    return auth.handler(c.req.raw)
  })
  .post('/auth/**', (c) => {
    return auth.handler(c.req.raw)
  })
