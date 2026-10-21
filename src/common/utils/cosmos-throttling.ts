// Cosmos DB answers a throttled request with error code 16500 (HTTP 429): recognise and retry it

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

// Retries the operation while it is throttled, up to the option limits; other errors are rethrown
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
