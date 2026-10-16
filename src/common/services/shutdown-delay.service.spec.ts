import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from '@nestjs/config'
import { ShutdownDelayService } from './shutdown-delay.service'

describe('ShutdownDelayService', () => {
  let service: ShutdownDelayService
  let shutdownDelayMs: number | undefined

  const configServiceMock = {
    get: jest.fn((key: string, defaultValue: number) => (key === 'shutdownDelayMs' && shutdownDelayMs !== undefined) ? shutdownDelayMs : defaultValue)
  }

  beforeEach(async () => {
    jest.useFakeTimers()
    shutdownDelayMs = undefined

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShutdownDelayService,
        {
          provide: ConfigService,
          useValue: configServiceMock
        }
      ]
    }).compile()

    service = module.get<ShutdownDelayService>(ShutdownDelayService)
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  async function isSettledAfter (promise: Promise<void>, ms: number): Promise<boolean> {
    let settled = false
    void promise.then(() => { settled = true })
    await jest.advanceTimersByTimeAsync(ms)
    return settled
  }

  it('waits the configured delay on a signal', async () => {
    shutdownDelayMs = 5000
    const shutdown = service.beforeApplicationShutdown('SIGTERM')

    expect(await isSettledAfter(shutdown, 4999)).toBe(false)
    await jest.advanceTimersByTimeAsync(1)
    await expect(shutdown).resolves.toBeUndefined()
  })

  it('defaults to 3 seconds', async () => {
    const shutdown = service.beforeApplicationShutdown('SIGTERM')

    expect(await isSettledAfter(shutdown, 2999)).toBe(false)
    await jest.advanceTimersByTimeAsync(1)
    await expect(shutdown).resolves.toBeUndefined()
  })

  it('does not wait on a programmatic close', async () => {
    shutdownDelayMs = 5000
    expect(await isSettledAfter(service.beforeApplicationShutdown(undefined), 0)).toBe(true)
  })

  it.each([0, -1, NaN])('does not wait when the delay is %p', async (delay) => {
    shutdownDelayMs = delay
    expect(await isSettledAfter(service.beforeApplicationShutdown('SIGTERM'), 0)).toBe(true)
  })
})
