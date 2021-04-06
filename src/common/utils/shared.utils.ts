export function isUndefined (obj: any): obj is undefined {
  return typeof obj === 'undefined'
}

export function isNil (obj: any): obj is null | undefined {
  return isUndefined(obj) || obj === null
}

export function isObject (fn: any): fn is Record<string, unknown> {
  return !isNil(fn) && typeof fn === 'object'
}

export function isString (fn: any): fn is string {
  return typeof fn === 'string'
}

export function isJson (item: any): boolean {
  item = !isString(item) ? JSON.stringify(item) : item

  try {
    item = JSON.parse(item)
  } catch (e) {
    return false
  }

  return isObject(item)
}
