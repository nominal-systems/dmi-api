import { isNil, isObject } from './shared.utils'

/**
 * Whether a stored value, as MySQL reads it back, equals the value a provider delivers,
 * so that a redelivery is not mistaken for a change (issue #409):
 * - null and undefined are both "no value": a nullable column reads back null where a
 *   payload leaves the key out, and a JSON object may carry a null key or omit it;
 * - object keys and array elements compare in any order, since a simple-json column keeps
 *   whatever order it was written in;
 * - a number equals the same number as a string, which is how a string or decimal column
 *   reads a delivered number back;
 * - dates compare by time.
 */
export function isSameValue (stored: unknown, delivered: unknown): boolean {
  if (stored === delivered) return true
  if (isNil(stored) || isNil(delivered)) return isNil(stored) && isNil(delivered)
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
    return [...keys].every((key) => isSameValue(stored[key], delivered[key]))
  }
  return false
}

function isSameElements (stored: unknown[], delivered: unknown[]): boolean {
  if (stored.length !== delivered.length) return false
  const unmatched = [...delivered]
  for (const element of stored) {
    const index = unmatched.findIndex((candidate) => isSameValue(element, candidate))
    if (index === -1) return false
    unmatched.splice(index, 1)
  }
  return true
}

function toNumber (value: unknown): number | undefined {
  if (typeof value === 'number') return value
  if (typeof value === 'string' && value.trim() !== '') return Number(value)
  return undefined
}
