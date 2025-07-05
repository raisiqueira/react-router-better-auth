import { betterAuth } from 'better-auth'
import { openAPI } from 'better-auth/plugins'
import Database from 'better-sqlite3'

export const auth = betterAuth({
  baseURL: 'http://localhost:5173',
  trustedOrigins: ['http://localhost:5173'],
  session: {
    expiresIn: 604800, // 7 days in seconds
    updateAge: 86400, // 1 day in seconds
    freshAge: 0,
  },
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
    },
  },
  database: new Database('./sqlite.db'),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    openAPI(),
  ],
})

export type Session = typeof auth.$Infer.Session['session']

export type User = typeof auth.$Infer.Session['user']
