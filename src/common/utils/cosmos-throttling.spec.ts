import {
  COSMOS_THROTTLED_ERROR_CODE,
  DEFAULT_THROTTLE_RETRY,
  isThrottledError,
  retryWhenThrottled,
  throttleRetryAfterMs
} from './cosmos-throttling'

// The shape a Cosmos DB 429 takes when it reaches the application through the driver
function throttledError (retryAfterMs?: number): Error {
  const hint = retryAfterMs !== undefined ? `, RetryAfterMs=${retryAfterMs}` : ''
  return Object.assign(
    new Error(`Error=16500${hint}, Details='Response status code does not indicate success: TooManyRequests (429); Substatus: 3200'`),
    { name: 'MongoServerError', code: 16500 }
  )
}

describe('cosmos-throttling', () => {
  describe('isThrottledError()', () => {
    it('is true for an error with code 16500', () => {
      expect(COSMOS_THROTTLED_ERROR_CODE).toBe(16500)
      expect(isThrottledError(Object.assign(new Error('throttled'), { code: 16500 }))).toBe(true)
    })

    it('is true for a message carrying Error=16500 and no code', () => {
      const error = new Error("Error=16500, RetryAfterMs=14, Details='Response status code does not indicate success: TooManyRequests (429)'")
      expect(isThrottledError(error)).toBe(true)
    })

    it('is false for another server error code', () => {
      expect(isThrottledError(Object.assign(new Error('E11000 duplicate key error'), { code: 11000 }))).toBe(false)
    })

    it('is false for a plain error', () => {
      expect(isThrottledError(new Error('boom'))).toBe(false)
    })

    it('does not match Error=16500 inside a longer number', () => {
      expect(isThrottledError(new Error('Error=165001'))).toBe(false)
    })

    it('is false for null, undefined and a string', () => {
      expect(isThrottledError(null)).toBe(false)
      expect(isThrottledError(undefined)).toBe(false)
      expect(isThrottledError('Error=16500, RetryAfterMs=14')).toBe(false)
    })
  })

  describe('throttleRetryAfterMs()', () => {
    it('reads the RetryAfterMs hint', () => {
      expect(throttleRetryAfterMs(throttledError(14))).toBe(14)
      expect(throttleRetryAfterMs(throttledError(2731))).toBe(2731)
    })

    it('is undefined when the message has no hint', () => {
      expect(throttleRetryAfterMs(throttledError())).toBeUndefined()
      expect(throttleRetryAfterMs(new Error('boom'))).toBeUndefined()
      expect(throttleRetryAfterMs(null)).toBeUndefined()
    })
  })

  describe('retryWhenThrottled()', () => {
    let sleep: jest.Mock<Promise<void>, [number]>

    beforeEach(() => {
      sleep = jest.fn(async (_ms: number) => undefined)
    })

    const sleeps = (): number[] => sleep.mock.calls.map(([ms]) => ms)

    it('defaults to three attempts within a 5000 ms budget, waiting 100 ms at least and 1000 ms without a hint', () => {
      expect(DEFAULT_THROTTLE_RETRY).toEqual({ attempts: 3, budgetMs: 5000, minDelayMs: 100, fallbackDelayMs: 1000 })
    })

    it('returns the result of an operation that succeeds the first time, without sleeping', async () => {
      const operation = jest.fn().mockResolvedValue('stored')

      await expect(retryWhenThrottled(operation, { sleep })).resolves.toBe('stored')

      expect(operation).toHaveBeenCalledTimes(1)
      expect(sleep).not.toHaveBeenCalled()
    })

    it('retries a throttled operation, waiting as long as the server asks', async () => {
      const first = throttledError(250)
      const second = throttledError(400)
      const operation = jest.fn()
        .mockRejectedValueOnce(first)
        .mockRejectedValueOnce(second)
        .mockResolvedValueOnce('stored')
      const onRetry = jest.fn()

      await expect(retryWhenThrottled(operation, { sleep, onRetry })).resolves.toBe('stored')

      expect(operation).toHaveBeenCalledTimes(3)
      expect(sleeps()).toEqual([250, 400])
      expect(onRetry.mock.calls).toEqual([
        [{ attempt: 1, delayMs: 250, error: first }],
        [{ attempt: 2, delayMs: 400, error: second }]
      ])
    })

    it('rethrows the last throttled error unchanged once the attempts are spent', async () => {
      const third = throttledError(10)
      const operation = jest.fn()
        .mockRejectedValueOnce(throttledError(10))
        .mockRejectedValueOnce(throttledError(10))
        .mockRejectedValueOnce(third)
        .mockResolvedValue('never reached')

      const outcome = retryWhenThrottled(operation, { sleep })

      await expect(outcome).rejects.toBe(third)
      expect(operation).toHaveBeenCalledTimes(3)
      expect(sleep).toHaveBeenCalledTimes(2)
    })

    it('rethrows an error that is not throttled at once, unchanged', async () => {
      const duplicate = Object.assign(new Error('E11000 duplicate key error'), { code: 11000 })
      const operation = jest.fn().mockRejectedValueOnce(duplicate).mockResolvedValue('never reached')

      await expect(retryWhenThrottled(operation, { sleep })).rejects.toBe(duplicate)

      expect(operation).toHaveBeenCalledTimes(1)
      expect(sleep).not.toHaveBeenCalled()
    })

    it('waits at least the floor when the hint is shorter', async () => {
      const operation = jest.fn().mockRejectedValueOnce(throttledError(14)).mockResolvedValueOnce('stored')

      await expect(retryWhenThrottled(operation, { sleep })).resolves.toBe('stored')

      expect(sleeps()).toEqual([100])
    })

    it('waits the fallback delay when the error carries no hint', async () => {
      const operation = jest.fn().mockRejectedValueOnce(throttledError()).mockResolvedValueOnce('stored')

      await expect(retryWhenThrottled(operation, { sleep })).resolves.toBe('stored')

      expect(sleeps()).toEqual([1000])
    })

    it('gives up rather than wait for a retry the budget cannot afford', async () => {
      const first = throttledError(3000)
      const second = throttledError(3000)
      const operation = jest.fn()
        .mockRejectedValueOnce(first)
        .mockRejectedValueOnce(second)
        .mockRejectedValue(throttledError(3000))

      await expect(retryWhenThrottled(operation, { sleep })).rejects.toBe(second)

      expect(operation).toHaveBeenCalledTimes(2)
      expect(sleeps()).toEqual([3000])
    })

    it('really waits with the default sleep', async () => {
      const operation = jest.fn().mockRejectedValueOnce(throttledError(25)).mockResolvedValueOnce('stored')
      const onRetry = jest.fn()
      const startedAt = Date.now()

      await expect(retryWhenThrottled(operation, { minDelayMs: 1, onRetry })).resolves.toBe('stored')

      expect(Date.now() - startedAt).toBeGreaterThanOrEqual(20)
      expect(operation).toHaveBeenCalledTimes(2)
      expect(onRetry).toHaveBeenCalledWith(expect.objectContaining({ attempt: 1, delayMs: 25 }))
    })
  })
})
