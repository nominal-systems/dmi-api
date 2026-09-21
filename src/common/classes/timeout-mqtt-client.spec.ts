import { EventEmitter } from 'events'
import { GatewayTimeoutException } from '@nestjs/common'
import * as mqtt from 'mqtt'
import { firstValueFrom } from 'rxjs'
import { TimeoutClientMqtt } from './timeout-mqtt-client'

jest.mock('mqtt', () => ({ connect: jest.fn() }))
// A short timeout keeps the tests fast when a reply never arrives.
jest.mock('../constants/engine.constant', () => ({ ENGINE_RESPONSE_TIMEOUT: 250 }))

interface PublishedRequest {
  topic: string
  packet: { id: string, pattern?: string, data?: unknown }
}

/**
 * Stands in for both the mqtt.js client and the broker: replies are only
 * delivered while the reply channel is actually subscribed.
 */
class FakeBroker extends EventEmitter {
  connected = true
  readonly subscriptions = new Set<string>()
  readonly requests: PublishedRequest[] = []

  subscribe = jest.fn((topic: string, callback?: (err?: Error) => void) => {
    this.subscriptions.add(topic)
    callback?.()
    return this
  })

  unsubscribe = jest.fn((topic: string) => {
    this.subscriptions.delete(topic)
    return this
  })

  publish = jest.fn((topic: string, message: string) => {
    this.requests.push({ topic, packet: JSON.parse(message) })
    return this
  })

  end = jest.fn()

  /** Broker-side loss: the client keeps believing it is still subscribed. */
  dropSubscription (channel: string): void {
    this.subscriptions.delete(channel)
  }

  requestsFor (topic: string): PublishedRequest[] {
    return this.requests.filter(request => request.topic === topic)
  }

  deliverReply (request: PublishedRequest | undefined, response: unknown): boolean {
    if (!request) {
      return false
    }

    const channel = `${request.topic}/reply`
    if (!this.subscriptions.has(channel)) {
      return false
    }

    this.emit(
      'message',
      channel,
      Buffer.from(JSON.stringify({ id: request.packet.id, response, isDisposed: true }))
    )
    return true
  }
}

const flush = async (): Promise<void> => await new Promise(resolve => setImmediate(resolve))

describe('TimeoutClientMqtt (issue #366)', () => {
  const PATTERN = 'idexx/devices/list'
  const RESPONSE_CHANNEL = `${PATTERN}/reply`

  let client: TimeoutClientMqtt
  let broker: FakeBroker

  const send = async (pattern: string = PATTERN): Promise<any> =>
    await firstValueFrom(client.send(pattern, { hello: 'world' }))

  beforeEach(async () => {
    jest.clearAllMocks()
    broker = new FakeBroker()
    ;(mqtt.connect as jest.Mock).mockReturnValue(broker)

    client = new TimeoutClientMqtt({} as any)
    const connection = client.connect()
    broker.emit('connect')
    await connection
  })

  it('delivers the response and keeps the reply channel subscribed', async () => {
    const response = send()
    await flush()

    expect(broker.deliverReply(broker.requestsFor(PATTERN)[0], { devices: [] })).toBe(true)
    await expect(response).resolves.toEqual({ devices: [] })

    expect(broker.unsubscribe).not.toHaveBeenCalled()
    expect(broker.subscriptions.has(RESPONSE_CHANNEL)).toBe(true)
  })

  it('re-subscribes when the broker loses the channel while a request is in flight', async () => {
    const first = send().catch(error => error)
    await flush()
    expect(broker.requestsFor(PATTERN)).toHaveLength(1)

    broker.dropSubscription(RESPONSE_CHANNEL)
    broker.subscribe.mockClear()

    const second = send().catch(error => error)
    await flush()

    // The reply channel must be re-established before the request goes out.
    expect(broker.subscribe).toHaveBeenCalledWith(RESPONSE_CHANNEL, expect.any(Function))
    expect(broker.requestsFor(PATTERN)).toHaveLength(2)

    const response = { devices: ['idexx-1'] }
    expect(broker.deliverReply(broker.requestsFor(PATTERN)[1], response)).toBe(true)
    await expect(second).resolves.toEqual(response)

    // The first request's reply is gone; it can only fail by timeout.
    await first
  })

  it('re-subscribes after a reconnect that left requests in flight', async () => {
    const first = send().catch(error => error)
    await flush()

    // A clean-session reconnect drops the broker-side subscription.
    broker.dropSubscription(RESPONSE_CHANNEL)
    broker.emit('close')
    broker.emit('connect')
    broker.subscribe.mockClear()

    const second = send().catch(error => error)
    await flush()

    expect(broker.subscribe).toHaveBeenCalledWith(RESPONSE_CHANNEL, expect.any(Function))

    const response = { devices: ['idexx-2'] }
    expect(broker.deliverReply(broker.requestsFor(PATTERN)[1], response)).toBe(true)
    await expect(second).resolves.toEqual(response)

    await first
  })

  it('never releases the reply channel when concurrent requests complete', async () => {
    const first = send()
    const second = send()
    await flush()

    expect(broker.requestsFor(PATTERN)).toHaveLength(2)
    expect(broker.deliverReply(broker.requestsFor(PATTERN)[0], { n: 1 })).toBe(true)
    expect(broker.deliverReply(broker.requestsFor(PATTERN)[1], { n: 2 })).toBe(true)

    await expect(Promise.all([first, second])).resolves.toEqual([{ n: 1 }, { n: 2 }])
    expect(broker.unsubscribe).not.toHaveBeenCalled()
  })

  it('still maps a missing response to GatewayTimeoutException', async () => {
    await expect(send()).rejects.toBeInstanceOf(GatewayTimeoutException)
  })
})
