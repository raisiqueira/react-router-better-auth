import type { auth, Session, User } from '~/lib/auth'

/**
 * This interface is used to define the variables available in the server context.
 * It includes the auth instance, user information, and session details.
 * This is useful for accessing authentication and user data throughout the server.
 */
export interface Variables {
  auth: typeof auth
  user: User | null
  session: Session | null
}

/**
 * The Env interface defines the environment variables available in the server context.
 * It includes the Variables interface which contains authentication and user information.
 * This is used to provide a consistent structure for accessing environment variables in the server.
 */
export interface Env {
  Variables: Variables
}
