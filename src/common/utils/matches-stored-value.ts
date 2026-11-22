import { isNil, isObject } from './shared.utils'

/**
 * Whether a stored value, as MySQL reads it back, equals the value a provider delivers,
 * so that a redelivery is not mistaken for a change (issue #409):
 * - null, undefined and a number that is not finite are all "no value": a nullable column
 *   reads back null where a payload leaves the key out, a JSON object may carry a null key
 *   or omit it, and JSON, so a simple-json column, stores NaN and Infinity as null;
 * - object keys and array elements compare in any order, since a simple-json column keeps
 *   whatever order it was written in;
 * - a number equals the same number written as a plain decimal string, which is how a string
 *   or decimal column reads a delivered number back;
 * - dates compare by time.
 * It is equality across a MySQL round trip, not a deep equality: '7' matches 7 and NaN null.
 */
export function matchesStoredValue (stored: unknown, delivered: unknown): boolean {
  if (stored === delivered) return true
  if (isNoValue(stored) || isNoValue(delivered)) return isNoValue(stored) && isNoValue(delivered)
  if (typeof stored === 'number' || typeof delivered === 'number') {
    return toNumber(stored) === toNumber(delivered)
  }
  if (stored instanceof Date || delivered instanceof Date) {
    return new Date(stored as Date).getTime() === new Date(delivered as Date).getTime()
  }
  if (Array.isArray(stored) || Array.isArray(delivered)) {
    return Array.isArray(stored) && Array.isArray(delivered) && isSameElements(stored, delivered)
  }
  if (isObject(stored) && isObject(delivered)) {
    const keys = new Set([...Object.keys(stored), ...Object.keys(delivered)])
    return [...keys].every((key) => matchesStoredValue(stored[key], delivered[key]))
  }
  return false
}

function isNoValue (value: unknown): boolean {
  return isNil(value) || (typeof value === 'number' && !Number.isFinite(value))
}

function isSameElements (stored: unknown[], delivered: unknown[]): boolean {
  if (stored.length !== delivered.length) return false
  const unmatched = [...delivered]
  for (const element of stored) {
    const index = unmatched.findIndex((candidate) => matchesStoredValue(element, candidate))
    if (index === -1) return false
    unmatched.splice(index, 1)
  }
  return true
}

// An optional sign, digits and an optional fraction: no hex, exponent, blanks or other forms Number() reads
const PLAIN_DECIMAL = /^[+-]?\d+(\.\d+)?$/

function toNumber (value: unknown): number | undefined {
  if (typeof value === 'number') return value
  if (typeof value === 'string' && PLAIN_DECIMAL.test(value)) return Number(value)
  return undefined
}
