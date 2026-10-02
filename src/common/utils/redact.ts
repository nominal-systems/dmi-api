// Masks credentials in provider requests before they are stored or served.
// Every helper returns a copy and never mutates its input.

export const REDACTED = '***'
const CIRCULAR = '[Circular]'

const SENSITIVE_HEADER_NAMES = new Set(['authorization', 'proxy-authorization', 'cookie', 'set-cookie', 'x-api-key'])
const SENSITIVE_HEADER_PARTS = ['token', 'secret', 'password', 'apikey', 'api-key']
const SENSITIVE_KEY_NAMES = new Set(['pass', 'pwd', 'signature'])
const SENSITIVE_KEY_PARTS = ['password', 'token', 'secret', 'authorization', 'apikey', 'api_key', 'api-key']

// Dotted keys are also checked segment by segment: nestKeys() turns
// { 'login.pass': … } into { login: { pass: … } } after redaction has run.
function matches (name: string, names: Set<string>, parts: string[]): boolean {
  const lower = name.toLowerCase()
  return parts.some((part) => lower.includes(part)) || lower.split('.').some((segment) => names.has(segment))
}

export function isSensitiveHeader (name: string): boolean {
  return matches(name, SENSITIVE_HEADER_NAMES, SENSITIVE_HEADER_PARTS)
}

export function isSensitiveKey (key: string): boolean {
  return matches(key, SENSITIVE_KEY_NAMES, SENSITIVE_KEY_PARTS)
}

export function redactHeaders<T> (headers: T): T {
  if (typeof headers !== 'object' || headers === null || Array.isArray(headers)) {
    return headers
  }
  return Object.fromEntries(
    Object.entries(headers).map(([name, value]) => [name, isSensitiveHeader(name) ? REDACTED : value])
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

// A request payload arrives as an object, a JSON string or a form-encoded
// string. A string that is neither JSON nor form data is returned unchanged.
export function redactPayload<T> (payload: T): T {
  if (typeof payload !== 'string') {
    return redactObject(payload)
  }
  return (redactJsonString(payload) ?? redactFormString(payload) ?? payload) as T
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

function redactFormString (text: string): string | undefined {
  if (!text.includes('=') || /\s/.test(text)) {
    return undefined
  }
  return redactFormPairs(text)
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
      return isSensitiveKey(decodeFormComponent(key)) ? `${key}=${REDACTED}` : pair
    })
    .join('&')
}

// Masks credentials in a URL's query string; the path and the fragment are
// kept as they are. No whitespace check here: engines store decoded URLs.
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
