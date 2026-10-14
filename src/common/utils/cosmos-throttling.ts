/*
 * Azure Cosmos DB (API for MongoDB) answers a request that exceeds the provisioned throughput with
 * HTTP 429, which the driver surfaces as a server error with code 16500 and a message of the form
 * "Error=16500, RetryAfterMs=14, Details='Response status code does not indicate success:
 * TooManyRequests (429); ...'". Neither the driver nor the server retries it. These helpers
 * recognise that error and retry an operation a bounded number of times, waiting as long as the
 * server asks.
 */

export const COSMOS_THROTTLED_ERROR_CODE = 16500

export interface ThrottleRetryInfo {
  attempt: number
  delayMs: number
  error: unknown
}

export interface ThrottleRetryOptions {
  // Total number of calls, the first one included
  attempts?: number
  // Most time to spend sleeping between calls, summed over all retries
  budgetMs?: number
  // Shortest wait between calls, whatever the server asks for
  minDelayMs?: number
  // Wait between calls when the error carries no RetryAfterMs hint
  fallbackDelayMs?: number
  sleep?: (ms: number) => Promise<void>
  onRetry?: (info: ThrottleRetryInfo) => void
}

export const DEFAULT_THROTTLE_RETRY = {
  attempts: 3,
  budgetMs: 5000,
  minDelayMs: 100,
  fallbackDelayMs: 1000
}

const THROTTLED_MESSAGE_PATTERN = new RegExp(`\\bError=${COSMOS_THROTTLED_ERROR_CODE}\\b`)
const RETRY_AFTER_PATTERN = /\bRetryAfterMs=(\d+)/

function errorMessage (error: unknown): string | undefined {
  if (typeof error !== 'object' || error === null) {
    return undefined
  }
  const message = (error as { message?: unknown }).message
  return typeof message === 'string' ? message : undefined
}

// Duck-typed on purpose: Mongoose bundles its own driver, so an instanceof check against the
// top-level mongodb package's MongoServerError would test the wrong class.
export function isThrottledError (error: unknown): boolean {
  if (typeof error !== 'object' || error === null) {
    return false
  }
  if ((error as { code?: unknown }).code === COSMOS_THROTTLED_ERROR_CODE) {
    return true
  }
  const message = errorMessage(error)
  return message !== undefined && THROTTLED_MESSAGE_PATTERN.test(message)
}

export function throttleRetryAfterMs (error: unknown): number | undefined {
  const match = errorMessage(error)?.match(RETRY_AFTER_PATTERN)
  return match != null ? parseInt(match[1], 10) : undefined
}

async function sleepFor (ms: number): Promise<void> {
  await new Promise<void>((resolve) => setTimeout(resolve, ms))
}

/*
 * Runs the operation, and runs it again while it fails with a throttled error, up to `attempts`
 * calls in all. Each wait is the server's RetryAfterMs hint (or `fallbackDelayMs` without one),
 * never less than `minDelayMs`. A retry whose wait would take the total time slept past
 * `budgetMs` is not attempted. Any other error, and the last throttled one, is rethrown as is.
 */
export async function retryWhenThrottled<T> (
  operation: () => Promise<T>,
  options: ThrottleRetryOptions = {}
): Promise<T> {
  const attempts = options.attempts ?? DEFAULT_THROTTLE_RETRY.attempts
  const budgetMs = options.budgetMs ?? DEFAULT_THROTTLE_RETRY.budgetMs
  const minDelayMs = options.minDelayMs ?? DEFAULT_THROTTLE_RETRY.minDelayMs
  const fallbackDelayMs = options.fallbackDelayMs ?? DEFAULT_THROTTLE_RETRY.fallbackDelayMs
  const sleep = options.sleep ?? sleepFor

  let sleptMs = 0
  for (let attempt = 1; ; attempt++) {
    try {
      return await operation()
    } catch (error) {
      if (!isThrottledError(error) || attempt >= attempts) {
        throw error
      }
      const delayMs = Math.max(throttleRetryAfterMs(error) ?? fallbackDelayMs, minDelayMs)
      if (sleptMs + delayMs > budgetMs) {
        throw error
      }
      options.onRetry?.({ attempt, delayMs, error })
      await sleep(delayMs)
      sleptMs += delayMs
    }
  }
}
