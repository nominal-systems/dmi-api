import { EventEmitter } from 'events'
import { GatewayTimeoutException, Logger } from '@nestjs/common'
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
 * Stands in for the mqtt.js client and the broker at once, keeping the two
 * pieces of state that the real pair keeps apart:
 *
 *  - `clientTopics` mirrors mqtt.js `_resubscribeTopics`: what the client
 *    believes it is subscribed to. A SUBSCRIBE for a topic already in there is
 *    dropped before reaching the wire unless `resubscribe: true` is passed
 *    (mqtt@4.3.8 `lib/client.js`), and the callback still reports success.
 *  - `brokerSubscriptions` is what the broker actually holds, and is the only
 *    thing that decides whether a reply gets delivered.
 *
 * The two can diverge, and that divergence is the bug under test.
 */
class FakeBroker extends EventEmitter {
  connected = true
  readonly clientTopics = new Set<string>()
  readonly brokerSubscriptions = new Set<string>()
  /** Topics for which a SUBSCRIBE packet actually reached the broker. */
  readonly subscribePackets: string[] = []
  readonly requests: PublishedRequest[] = []
  /** Broker answers SUBSCRIBE with a failure grant (0x80). */
  rejectSubscriptions = false

  subscribe = jest.fn((...args: any[]): FakeBroker => {
    const callback =
      typeof args[args.length - 1] === 'function' ? args.pop() : undefined
    const target = args[0]

    let topics: string[] = []
    let force = false
    if (typeof target === 'string') {
      topics = [target]
    } else if (Array.isArray(target)) {
      topics = target
    } else {
      force = target.resubscribe === true
      topics = Object.keys(target).filter(key => key !== 'resubscribe')
    }

    const onTheWire = topics.filter(topic => force || !this.clientTopics.has(topic))
    if (onTheWire.length === 0) {
      // mqtt.js reports success without sending anything.
      callback?.(null, [])
      return this
    }

    for (const topic of onTheWire) {
      this.subscribePackets.push(topic)
      if (!this.rejectSubscriptions) {
        this.clientTopics.add(topic)
        this.brokerSubscriptions.add(topic)
      }
    }
    // mqtt.js reports a rejected SUBACK as a 128 grant, not as an error.
    const qos = this.rejectSubscriptions ? 128 : 0
    callback?.(null, onTheWire.map(topic => ({ topic, qos })))
    return this
  })

  unsubscribe = jest.fn((topic: string): FakeBroker => {
    this.clientTopics.delete(topic)
    this.brokerSubscriptions.delete(topic)
    return this
  })

  publish = jest.fn((topic: string, message: string): FakeBroker => {
    this.requests.push({ topic, packet: JSON.parse(message) })
    return this
  })

  end = jest.fn()

  /**
   * The broker drops the subscription with the connection still up: no close,
   * no reconnect, nothing for mqtt.js to react to. The client goes on believing
   * it is subscribed, so its own dedup guard blocks any repair.
   */
  dropSubscriptionSilently (channel: string): void {
    this.brokerSubscriptions.delete(channel)
  }

  /** Clean-session reconnect: broker state is gone, mqtt.js replays its topics. */
  reconnect (): void {
    this.brokerSubscriptions.clear()
    this.emit('close')
    this.emit('connect')
    for (const topic of this.clientTopics) {
      this.subscribePackets.push(topic)
      this.brokerSubscriptions.add(topic)
    }
  }

  requestsFor (topic: string): PublishedRequest[] {
    return this.requests.filter(request => request.topic === topic)
  }

  deliverReply (request: PublishedRequest | undefined, response: unknown): boolean {
    if (!request) {
      return false
    }

    const channel = `${request.topic}/reply`
    if (!this.brokerSubscriptions.has(channel)) {
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
    expect(broker.brokerSubscriptions.has(RESPONSE_CHANNEL)).toBe(true)
  })

  it('repairs the channel after a request times out on a silently dropped subscription', async () => {
    // Warm the channel up so the client has it in its own subscribed list.
    const warmup = send()
    await flush()
    broker.deliverReply(broker.requestsFor(PATTERN)[0], { devices: [] })
    await warmup

    broker.dropSubscriptionSilently(RESPONSE_CHANNEL)
    broker.subscribePackets.length = 0
    expect(broker.clientTopics.has(RESPONSE_CHANNEL)).toBe(true)

    // Nothing can save this one: no one is listening on the reply channel.
    await expect(send()).rejects.toBeInstanceOf(GatewayTimeoutException)

    // The timeout is the signal to repair, and the SUBSCRIBE has to reach the
    // broker: the client's own list still says it is subscribed, so anything
    // short of forcing it is dropped before the wire.
    expect(broker.subscribePackets).toContain(RESPONSE_CHANNEL)
    expect(broker.brokerSubscriptions.has(RESPONSE_CHANNEL)).toBe(true)

    // The next request goes through on the repaired channel.
    const next = send()
    next.catch(() => {})
    await flush()

    const response = { devices: ['idexx-1'] }
    expect(broker.deliverReply(broker.requestsFor(PATTERN)[2], response)).toBe(true)
    await expect(next).resolves.toEqual(response)
  })

  it('recovers after a clean-session reconnect', async () => {
    const first = send().catch(error => error)
    await flush()

    broker.reconnect()

    const second = send()
    second.catch(() => {})
    await flush()

    expect(broker.brokerSubscriptions.has(RESPONSE_CHANNEL)).toBe(true)

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
    expect(broker.brokerSubscriptions.has(RESPONSE_CHANNEL)).toBe(true)
  })

  it('logs an error, not a success, when the broker rejects the re-subscribe', async () => {
    const error = jest.spyOn(Logger.prototype, 'error').mockImplementation()
    const warn = jest.spyOn(Logger.prototype, 'warn').mockImplementation()

    broker.rejectSubscriptions = true
    await expect(send()).rejects.toBeInstanceOf(GatewayTimeoutException)

    expect(error).toHaveBeenCalledWith(expect.stringContaining(RESPONSE_CHANNEL))
    expect(warn).not.toHaveBeenCalled()

    error.mockRestore()
    warn.mockRestore()
  })

  it('still maps a missing response to GatewayTimeoutException', async () => {
    await expect(send()).rejects.toBeInstanceOf(GatewayTimeoutException)
  })
})
