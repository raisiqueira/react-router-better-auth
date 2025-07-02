import type { RouteConfig } from '@react-router/dev/routes'
import { index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  // Auth routes
  route('auth/sign-in', 'routes/auth/sign-in.tsx'),
  route('auth/sign-up', 'routes/auth/sign-up.tsx'),
  route('protected', 'routes/protected.tsx'),
  // Better Auth API routes are managed by the server.ts file (Hono server setup)
] satisfies RouteConfig
