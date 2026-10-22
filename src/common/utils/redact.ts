// Masks credentials in provider requests before they are stored or served.
// Every helper returns a copy and never mutates its input.

export const REDACTED = '***'
const CIRCULAR = '[Circular]'

// A name is sensitive when it equals one of the names or contains one of the parts.
const SENSITIVE_HEADER_NAMES = new Set(['authorization', 'proxy-authorization', 'cookie', 'set-cookie'])
const SENSITIVE_HEADER_PARTS = ['token', 'secret', 'password', 'key', 'credential']
// For object keys and form or query parameters `key` is a name, not a part:
// as a part it would also mask `keyword` or `monkey`.
const SENSITIVE_KEY_NAMES = new Set(['pass', 'pwd', 'passwd', 'passphrase', 'signature', 'sig', 'jwt', 'key'])
const SENSITIVE_KEY_PARTS = [
  'password', 'token', 'secret', 'authorization', 'credential',
  'apikey', 'api_key', 'api-key', 'privatekey', 'private_key', 'private-key'
]

const containsAny = (words: string[]): RegExp => new RegExp(words.join('|'), 'i')
const SENSITIVE_HEADER_PATTERN = containsAny(SENSITIVE_HEADER_PARTS)
const SENSITIVE_KEY_PATTERN = containsAny(SENSITIVE_KEY_PARTS)
// A string with none of these cannot hold a sensitive key, so it is not parsed:
// a part anywhere, a name as a whole word, or a `%xx` or `\u` escape that could
// spell either once decoded.
const MAY_HOLD_SENSITIVE_KEY = containsAny([
  ...SENSITIVE_KEY_PARTS,
  ...[...SENSITIVE_KEY_NAMES].map((name) => `\\b${name}\\b`),
  '%[0-9a-f]{2}',
  '\\\\u'
])
// A form key with whitespace or `<` is prose or markup, not a form field.
const NOT_A_FORM_KEY = /[\s<]/

// Dotted keys are also checked segment by segment: nestKeys() turns
// { 'login.pass': … } into { login: { pass: … } } after redaction has run.
function matches (name: string, names: Set<string>, parts: RegExp): boolean {
  if (parts.test(name)) {
    return true
  }
  const lower = name.toLowerCase()
  return lower.includes('.') ? lower.split('.').some((segment) => names.has(segment)) : names.has(lower)
}

export function isSensitiveHeader (name: string): boolean {
  return matches(name, SENSITIVE_HEADER_NAMES, SENSITIVE_HEADER_PATTERN)
}

export function isSensitiveKey (key: string): boolean {
  return matches(key, SENSITIVE_KEY_NAMES, SENSITIVE_KEY_PATTERN)
}

// Object-valued entries, such as the { common: { Authorization } } some HTTP
// clients group default headers under, are masked by the same rule.
export function redactHeaders<T> (headers: T): T {
  if (typeof headers !== 'object' || headers === null || Array.isArray(headers)) {
    return headers
  }
  return Object.fromEntries(
    Object.entries(headers).map(([name, value]) => [
      name,
      isSensitiveHeader(name) ? REDACTED : isPlainObject(value) ? redactHeaders(value) : value
    ])
  ) as T
}

export function redactObject<T> (value: T): T {
  return redactValue(value, new WeakSet()) as T
}

function isPlainObject (value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null) {
    return false
  }
  const prototype = Object.getPrototypeOf(value)
  return prototype === Object.prototype || prototype === null
}

// `ancestors` holds the objects on the current path only, so a value shared by
// two branches is copied twice rather than mistaken for a cycle.
function redactValue (value: unknown, ancestors: WeakSet<object>): unknown {
  if (!Array.isArray(value) && !isPlainObject(value)) {
    return value // primitives, null/undefined, Buffers, Dates, ObjectIds
  }
  if (ancestors.has(value)) {
    return CIRCULAR
  }
  ancestors.add(value)
  const copy = Array.isArray(value)
    ? value.map((item) => redactValue(item, ancestors))
    : Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, isSensitiveKey(key) ? REDACTED : redactValue(item, ancestors)])
    )
  ancestors.delete(value)
  return copy
}

// A request payload or body arrives as an object, a JSON string or a
// form-encoded string. Any other string is returned unchanged.
export function redactPayload<T> (payload: T): T {
  if (typeof payload !== 'string') {
    return redactObject(payload)
  }
  if (!MAY_HOLD_SENSITIVE_KEY.test(payload)) {
    return payload
  }
  return (redactJsonString(payload) ?? redactFormPairs(payload)) as T
}

function redactJsonString (text: string): string | undefined {
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    return undefined
  }
  const serialized = JSON.stringify(redactObject(parsed))
  // Keep the original bytes when there was nothing to mask.
  return serialized === JSON.stringify(parsed) ? text : serialized
}

// Masks the values of credential keys in `k=v&…`; every other pair is kept byte for byte.
function redactFormPairs (text: string): string {
  return text
    .split('&')
    .map((pair) => {
      const separator = pair.indexOf('=')
      if (separator <= 0) {
        return pair
      }
      const key = pair.slice(0, separator)
      return !NOT_A_FORM_KEY.test(key) && isSensitiveKey(decodeFormComponent(key)) ? `${key}=${REDACTED}` : pair
    })
    .join('&')
}

// Masks credentials in a URL's query string; the path and the fragment are
// kept as they are. Values may hold spaces: engines store decoded URLs.
export function redactUrl<T> (url: T): T {
  if (typeof url !== 'string') {
    return url
  }
  const queryStart = url.indexOf('?')
  if (queryStart === -1) {
    return url
  }
  const fragmentStart = url.indexOf('#', queryStart)
  const queryEnd = fragmentStart === -1 ? url.length : fragmentStart
  return (url.slice(0, queryStart + 1) + redactFormPairs(url.slice(queryStart + 1, queryEnd)) + url.slice(queryEnd)) as T
}

function decodeFormComponent (component: string): string {
  try {
    return decodeURIComponent(component.replace(/\+/g, ' '))
  } catch {
    return component
  }
}
