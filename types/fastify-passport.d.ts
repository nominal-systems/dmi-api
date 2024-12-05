import 'fastify'
import { User } from '../src/common/auth/user.interface'

declare module 'fastify' {
  interface FastifyRequest {
    /**
     * Passport.js user object
     */
    user?: User

    /**
     * Passport.js methods
     */
    login: (user: User, done: (err: any) => void) => void
    // eslint-disable-next-line @typescript-eslint/method-signature-style
    logout: (done?: (err: any) => void) => void
    isAuthenticated: () => boolean
    isUnauthenticated: () => boolean
  }
}
