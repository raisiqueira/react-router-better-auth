import type { AppRouter } from '~/server'
import { hc } from 'hono/client'

export const apiClient = hc<AppRouter>('http://localhost:5173', {
  init: {
    credentials: 'include',
  },
}).api
