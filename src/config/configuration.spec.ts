import { Logger } from '@nestjs/common'
import configuration from './configuration'

describe('configuration', () => {
  const env = process.env
  let warnSpy: jest.SpyInstance

  beforeEach(() => {
    process.env = { ...env }
    delete process.env.SHUTDOWN_DELAY_MS
    delete process.env.SHUTDOWN_TIMEOUT_MS
    warnSpy = jest.spyOn(Logger, 'warn').mockImplementation(() => undefined)
  })

  afterEach(() => {
    process.env = env
    warnSpy.mockRestore()
  })

  it('defaults the shutdown delay to 4s and the timeout to 10s', () => {
    expect(configuration()).toMatchObject({ shutdownDelayMs: 4000, shutdownTimeoutMs: 10000 })
  })

  it('reads the shutdown durations from the environment', () => {
    process.env.SHUTDOWN_DELAY_MS = '0'
    process.env.SHUTDOWN_TIMEOUT_MS = '15000'
    expect(configuration()).toMatchObject({ shutdownDelayMs: 0, shutdownTimeoutMs: 15000 })
    expect(warnSpy).not.toHaveBeenCalled()
  })

  it.each(['', ' ', '3s', '-1', 'Infinity', String(2 ** 31)])('falls back to the default for %p', (value) => {
    process.env.SHUTDOWN_DELAY_MS = value
    expect(configuration().shutdownDelayMs).toBe(4000)
  })

  it('warns once about an invalid value', () => {
    process.env.SHUTDOWN_TIMEOUT_MS = '10s'
    configuration()
    configuration()
    expect(warnSpy).toHaveBeenCalledTimes(1)
    expect(warnSpy).toHaveBeenCalledWith('Ignoring invalid SHUTDOWN_TIMEOUT_MS="10s", using 10000', 'Configuration')
  })
})
