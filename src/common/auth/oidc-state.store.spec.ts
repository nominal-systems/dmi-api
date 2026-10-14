import { OidcStateStore } from './oidc-state.store'

describe('OidcStateStore', () => {
  const KEY = 'oidc:states'

  const store = (s: OidcStateStore, req: any, ctx: any = {}, appState?: any): string => {
    let handle = ''
    s.store(req, ctx, appState, {}, (err, h) => {
      expect(err).toBeNull()
      handle = h as string
    })
    return handle
  }

  const verify = (s: OidcStateStore, req: any, handle: string): { ctx: any; appState: any } => {
    let result: any
    s.verify(req, handle, (err, ctx, appState) => {
      expect(err).toBeNull()
      result = { ctx, appState }
    })
    return result
  }

  afterEach(() => {
    jest.useRealTimers()
  })

  it('verifies a stored state and returns its context and app state', () => {
    const s = new OidcStateStore(KEY)
    const req: any = { session: {} }
    const issued = new Date('2026-10-14T12:00:00Z')

    const handle = store(s, req, { nonce: 'n-1', maxAge: 60, issued }, 'https://dmi.example.com/ui/events')
    const { ctx, appState } = verify(s, req, handle)

    expect(ctx).toEqual({ nonce: 'n-1', maxAge: 60, issued })
    expect(appState).toBe('https://dmi.example.com/ui/events')
    expect(req.session[KEY]).toBeUndefined()
  })

  // Regression: dmi-api-admin-ui#138 — a second flow in the same session overwrote the first one's state
  it('verifies concurrent flows started in the same session', () => {
    const s = new OidcStateStore(KEY)
    const req: any = { session: {} }

    const tabA = store(s, req, {}, 'https://dmi.example.com/ui/events')
    const tabB = store(s, req, {}, 'https://dmi.example.com/ui/integrations')

    expect(verify(s, req, tabB).appState).toBe('https://dmi.example.com/ui/integrations')
    expect(verify(s, req, tabA).appState).toBe('https://dmi.example.com/ui/events')
  })

  it('accepts each state only once', () => {
    const s = new OidcStateStore(KEY)
    const req: any = { session: {} }
    const handle = store(s, req)

    expect(verify(s, req, handle).ctx).not.toBe(false)
    expect(verify(s, req, handle).ctx).toBe(false)
  })

  it('rejects an unknown state without dropping the pending ones', () => {
    const s = new OidcStateStore(KEY)
    const req: any = { session: {} }
    const handle = store(s, req)

    expect(verify(s, req, 'forged').ctx).toBe(false)
    expect(verify(s, req, handle).ctx).not.toBe(false)
  })

  it('rejects a state when the session has none', () => {
    const s = new OidcStateStore(KEY)
    expect(verify(s, { session: {} }, 'any').ctx).toBe(false)
  })

  it('keeps only the most recent pending states', () => {
    const s = new OidcStateStore(KEY, 2)
    const req: any = { session: {} }

    const oldest = store(s, req)
    const middle = store(s, req)
    const newest = store(s, req)

    expect(req.session[KEY].states).toHaveLength(2)
    expect(verify(s, req, oldest).ctx).toBe(false)
    expect(verify(s, req, middle).ctx).not.toBe(false)
    expect(verify(s, req, newest).ctx).not.toBe(false)
  })

  it('expires pending states after the TTL', () => {
    jest.useFakeTimers().setSystemTime(new Date('2026-10-14T12:00:00Z'))
    const s = new OidcStateStore(KEY, 10, 60_000)
    const req: any = { session: {} }
    const handle = store(s, req)

    jest.setSystemTime(new Date('2026-10-14T12:01:01Z'))

    expect(verify(s, req, handle).ctx).toBe(false)
  })

  it('restores `issued` after the session round-trips through JSON', () => {
    const s = new OidcStateStore(KEY)
    const req: any = { session: {} }
    const issued = new Date('2026-10-14T12:00:00Z')
    const handle = store(s, req, { maxAge: 60, issued })

    req.session = JSON.parse(JSON.stringify(req.session))

    expect(verify(s, req, handle).ctx.issued).toEqual(issued)
  })

  it('fails without a session', () => {
    const s = new OidcStateStore(KEY)
    s.store({}, {}, undefined, {}, (err) => expect(err).toBeInstanceOf(Error))
    s.verify({}, 'any', (err) => expect(err).toBeInstanceOf(Error))
  })
})
