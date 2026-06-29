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

export function isNullOrEmpty (obj: any): boolean {
  if (obj === null || obj === undefined) {
    return true
  }

  // If it's a string, check if it's empty
  if (typeof obj === 'string' && obj.trim() === '') {
    return true
  }

  // If it's an object, check if it has any properties
  if (typeof obj === 'object' && Object.keys(obj).length === 0) {
    return true
  }

  return false
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

// Converts a lean Mongo document's ObjectId `_id` to a string so it survives the
// global ClassSerializerInterceptor (instanceToPlain turns an ObjectId into `{}`).
// Only use on lean/plain results — not on hydrated Mongoose documents.
export function stringifyId<T extends { _id?: any }> (doc: T): T {
  if (doc?._id == null) {
    return doc
  }
  return { ...doc, _id: String(doc._id) }
}
