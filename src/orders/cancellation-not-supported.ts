import { ConflictException, HttpExceptionOptions, HttpStatus } from '@nestjs/common'
import { ProviderError } from '@nominal-systems/dmi-engine-common'

// What a caller can act on when the provider cannot cancel (#304): the one entry in the answer's `errors`. Unlike
// the sentence in `message`, it does not change.
export const CANCELLATION_NOT_SUPPORTED = 'CANCELLATION_NOT_SUPPORTED'

export type CancellationTarget = 'order' | 'test'

// Answered as dmi-api's own error body: `{ statusCode: 409, message: <sentence>, errors: ['CANCELLATION_NOT_SUPPORTED'],
// path, timestamp }`. AllExceptionsFilter takes `message` from the exception and `errors` from the body's `message`,
// so the body carries the token and the exception the sentence. The body has no `error` key (the answer never shows
// one): RpcExceptionInterceptor logs that key in place of the message when it is there, so without it its line
// carries the sentence.
export class CancellationNotSupportedException extends ConflictException {
  constructor(sentence: string, options?: HttpExceptionOptions) {
    super({ statusCode: HttpStatus.CONFLICT, message: [CANCELLATION_NOT_SUPPORTED] }, options)
    this.message = sentence
  }
}

// A provider that cannot cancel says so with a ProviderError carrying 501 (Not Implemented): the antech-v6 engine
// does, for an order and for a test, before any request to Antech. That is not a request DMI could not understand
// (the 400 it used to get), nor DMI or the provider failing: the order is with a provider that cannot cancel it, so it
// is a 409, which a retry will not change. Any other error is not a refusal to cancel and is answered as before.
export function cancellationNotSupported(
  error: any,
  providerId: string,
  target: CancellationTarget,
): CancellationNotSupportedException | undefined {
  if (error?.name !== ProviderError.name || error.response?.code !== HttpStatus.NOT_IMPLEMENTED) {
    return undefined
  }
  const sentence =
    target === 'order'
      ? `The provider ${providerId} does not support cancelling orders. The order was not cancelled.`
      : `The provider ${providerId} does not support cancelling individual tests. The test was not cancelled.`
  return new CancellationNotSupportedException(sentence, { cause: error })
}
