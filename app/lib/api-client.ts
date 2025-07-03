import type { AppRouter } from '~/server'
import { hc } from 'hono/client'

export const apiClient = hc<AppRouter>('http://localhost:5173/', {
  fetch: ((input, init) => {
    return fetch(input, {
      ...init,
      credentials: 'include',
    })
  }) satisfies typeof fetch,
}).api
