import { describeError } from './describe-error'

describe('describeError()', () => {
  it('should return the message of a plain error', () => {
    expect(describeError(new Error('connection refused'))).toBe('connection refused')
  })

  it('should return the distinct inner messages of an AggregateError, whose own message is empty', () => {
    const refused = (): Error => new Error('connect ECONNREFUSED 127.0.0.1:59999')
    const error = new (global as any).AggregateError([refused(), refused(), Object.assign(new Error('Unauthorized'), { name: 'UnauthorizedError' })])

    expect(error.message).toBe('')
    expect(describeError(error)).toBe('connect ECONNREFUSED 127.0.0.1:59999; Unauthorized')
  })

  it('should fall back to the code, then the name, when there is no message', () => {
    expect(describeError(Object.assign(new Error(''), { code: 'ECONNRESET' }))).toBe('ECONNRESET')
    expect(describeError(Object.assign(new Error(''), { name: 'ServiceUnavailableError' }))).toBe('ServiceUnavailableError')
  })
})
