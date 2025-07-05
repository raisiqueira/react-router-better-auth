import type { AppRouter } from '~/server'
import { hc } from 'hono/client'

export function createServerApiClient(request: Request) {
  const cookieHeader = request.headers.get('Cookie')

  return hc<AppRouter>('http://localhost:5173', {
    fetch: (input: RequestInfo | URL, init?: RequestInit) => {
      return fetch(input, {
        ...init,
        headers: {
          ...init?.headers,
          ...(cookieHeader ? { Cookie: cookieHeader } : {}),
        },
      })
    },
  }).api
}
