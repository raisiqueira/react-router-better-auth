import { betterAuth } from 'better-auth'
import { openAPI } from 'better-auth/plugins'
import Database from 'better-sqlite3'

export const auth = betterAuth({
  baseURL: 'http://localhost:5173',
  trustedOrigins: ['http://localhost:5173'],
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    freshAge: 0,
  },
  database: new Database('./sqlite.db'),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    openAPI(),
  ],
})

export type Session = typeof auth.$Infer.Session
