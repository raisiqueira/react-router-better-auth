import type { Env } from './types'
import { Hono } from 'hono'
import { protectedRouter } from './routes/protected'
import { authRouter } from './routes/auth'

const API_BASENAME = '/api'

const api = new Hono<Env>()
.basePath(API_BASENAME)
.route('/', authRouter)
.route('/protected', protectedRouter)

export { api, API_BASENAME }
