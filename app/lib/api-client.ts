import type { AppRouter } from '~/server'
import { hc } from 'hono/client'

const client = hc<AppRouter>('http://localhost:5173', {
  fetch: (input: RequestInfo | URL, requestInit?: RequestInit) => {
    // Ensure we're always including credentials
    return fetch(input, {
      ...requestInit,
      credentials: 'include',
      headers: {
        ...requestInit?.headers,
      },
    })
  },
})

export const apiClient = client.api
