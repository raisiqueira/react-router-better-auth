import { cors } from 'hono/cors'

export const corsMiddleware = cors({
  origin: 'http://localhost:5173',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
})
