import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from '@nestjs/config'
import { ShutdownDelayService } from './shutdown-delay.service'

describe('ShutdownDelayService', () => {
  let service: ShutdownDelayService
  let config: Record<string, number>
  let exitSpy: jest.SpyInstance

  const configServiceMock = {
    get: jest.fn((key: string) => config[key])
  }

  beforeEach(async () => {
    jest.useFakeTimers()
    config = { shutdownDelayMs: 4000, shutdownTimeoutMs: 10000 }
    exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => undefined as never)

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
    exitSpy.mockRestore()
  })

  async function isSettledAfter (promise: Promise<void>, ms: number): Promise<boolean> {
    let settled = false
    void promise.then(() => { settled = true })
    await jest.advanceTimersByTimeAsync(ms)
    return settled
  }

  describe('delay', () => {
    it('waits the configured delay on SIGTERM', async () => {
      const shutdown = service.beforeApplicationShutdown('SIGTERM')

      expect(await isSettledAfter(shutdown, 3999)).toBe(false)
      await jest.advanceTimersByTimeAsync(1)
      await expect(shutdown).resolves.toBeUndefined()
    })

    it('does not wait on SIGINT', async () => {
      expect(await isSettledAfter(service.beforeApplicationShutdown('SIGINT'), 0)).toBe(true)
    })

    it('does not wait on a programmatic close', async () => {
      expect(await isSettledAfter(service.beforeApplicationShutdown(undefined), 0)).toBe(true)
    })

    it('does not wait when the delay is 0', async () => {
      config.shutdownDelayMs = 0
      expect(await isSettledAfter(service.beforeApplicationShutdown('SIGTERM'), 0)).toBe(true)
    })
  })

  describe('timeout', () => {
    it.each(['SIGTERM', 'SIGINT'])('exits when the shutdown is still running after the timeout on %s', async (signal) => {
      void service.beforeApplicationShutdown(signal)

      await jest.advanceTimersByTimeAsync(9999)
      expect(exitSpy).not.toHaveBeenCalled()
      await jest.advanceTimersByTimeAsync(1)
      expect(exitSpy).toHaveBeenCalledWith(1)
    })

    it('does not keep the process alive once the shutdown finishes', async () => {
      const unref = jest.fn()
      const setTimeoutSpy = jest.spyOn(global, 'setTimeout').mockReturnValue({ unref } as unknown as NodeJS.Timeout)

      void service.beforeApplicationShutdown('SIGINT')
      setTimeoutSpy.mockRestore()

      expect(unref).toHaveBeenCalled()
    })

    it('does not exit on a programmatic close', async () => {
      void service.beforeApplicationShutdown(undefined)

      await jest.advanceTimersByTimeAsync(60000)
      expect(exitSpy).not.toHaveBeenCalled()
    })

    it('does not exit when the timeout is 0', async () => {
      config.shutdownTimeoutMs = 0
      void service.beforeApplicationShutdown('SIGTERM')

      await jest.advanceTimersByTimeAsync(60000)
      expect(exitSpy).not.toHaveBeenCalled()
    })
  })
})
