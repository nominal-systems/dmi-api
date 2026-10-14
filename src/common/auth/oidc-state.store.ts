import { randomBytes } from 'crypto'

const MAX_PENDING_STATES = 10
const STATE_TTL_MS = 10 * 60 * 1000 // 10 minutes

interface PendingState {
  handle: string
  createdAt: number
  maxAge?: number
  nonce?: string
  issued?: Date | string
  state?: any
}

interface StateContext {
  maxAge?: number
  nonce?: string
  issued?: Date
}

/**
 * OIDC state store for passport-openidconnect that keeps several pending authorization requests per session.
 *
 * The library's default store keeps a single state per session, so any flow started while the user is at Okta
 * (another tab, a late API request, a double click on login) overwrites it and the first callback fails.
 * Here each flow gets its own entry, matched by handle on the callback.
 */
export class OidcStateStore {
  constructor (
    private readonly key: string,
    private readonly maxPending = MAX_PENDING_STATES,
    private readonly ttlMs = STATE_TTL_MS,
  ) {}

  store (
    req: any,
    ctx: StateContext,
    appState: any,
    _meta: any,
    cb: (err: Error | null, handle?: string) => void,
  ): void {
    if (req.session == null) {
      return cb(new Error('OpenID Connect requires session support'))
    }

    const pending = this.pending(req)
    const state: PendingState = { handle: randomBytes(18).toString('base64url'), createdAt: Date.now() }
    if (ctx.maxAge != null) state.maxAge = ctx.maxAge
    if (ctx.nonce != null) state.nonce = ctx.nonce
    if (ctx.issued != null) state.issued = ctx.issued
    if (appState != null) state.state = appState

    pending.push(state)
    req.session[this.key] = { states: pending.slice(-this.maxPending) }
    cb(null, state.handle)
  }

  verify (
    req: any,
    handle: string,
    cb: (err: Error | null, ctx?: StateContext | false, appState?: any) => void,
  ): void {
    if (req.session == null) {
      return cb(new Error('OpenID Connect requires session support'))
    }

    const pending = this.pending(req)
    const index = pending.findIndex((state) => state.handle === handle)
    if (index === -1) {
      this.save(req, pending)
      return cb(null, false, { message: 'Unable to verify authorization request state.' })
    }

    const [state] = pending.splice(index, 1)
    this.save(req, pending)

    const ctx: StateContext = { maxAge: state.maxAge, nonce: state.nonce }
    if (state.issued != null) ctx.issued = new Date(state.issued)
    cb(null, ctx, state.state)
  }

  /** Unexpired pending states, oldest first. */
  private pending (req: any): PendingState[] {
    const states: PendingState[] = req.session[this.key]?.states ?? []
    const oldest = Date.now() - this.ttlMs
    return states.filter((state) => state.createdAt >= oldest)
  }

  private save (req: any, pending: PendingState[]): void {
    if (pending.length > 0) {
      req.session[this.key] = { states: pending }
    } else if (req.session[this.key] != null) {
      delete req.session[this.key]
    }
  }
}
