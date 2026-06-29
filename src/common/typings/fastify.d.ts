// Type augmentations for Fastify request/session under @fastify/session +
// @fastify/passport. Importing the packages here loads their own augmentations
// (FastifyRequest.session, FastifyRequest.user, etc.) and lets us extend the
// session/user with the app-specific fields set during the Okta/OIDC flow.
import '@fastify/session'
import '@fastify/passport'

declare module 'fastify' {
  interface Session {
    /** Originally requested URL captured before the OIDC redirect. */
    redirectUrl?: string
    /** Passport session payload persisted across requests. */
    passport?: SessionPassport
  }

  /** Authenticated user attached by passport (see the Okta strategy's verify callback). */
  interface PassportUser {
    issuer?: string
    profile?: PassportProfile
    idToken?: string
    accessToken?: string
    refreshToken?: string
  }

  /**
   * Passport's session payload: holds the serialized `user`, and is itself
   * sometimes treated as the user (it carries the same profile shape).
   */
  interface SessionPassport extends PassportUser {
    user?: PassportUser
  }

  /** OIDC profile — open-ended, but always exposes a `username`. */
  interface PassportProfile {
    username?: string
    [key: string]: any
  }
}
