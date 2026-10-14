// @azure/core-amqp throws an AggregateError with an empty message once a retried
// operation fails; each attempt's reason is in its `errors`
export function describeError (error: Error): string {
  const inner: unknown = (error as { errors?: unknown }).errors
  if (Array.isArray(inner) && inner.length > 0) {
    return [...new Set(inner.map(describeSingleError))].join('; ')
  }
  return describeSingleError(error)
}

function describeSingleError (error: any): string {
  if (typeof error?.message === 'string' && error.message !== '') {
    return error.message
  }
  return String(error?.code ?? error?.name ?? error)
}
