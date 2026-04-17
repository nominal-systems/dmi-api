import { StatsigFeatureFlagProvider } from './statsig-feature-flag.provider'
import Statsig from 'statsig-node'

jest.mock('statsig-node', () => ({
  __esModule: true,
  default: {
    initialize: jest.fn(),
    checkGate: jest.fn()
  }
}))

describe('StatsigFeatureFlagProvider', () => {
  let provider: StatsigFeatureFlagProvider
  const originalEnv = process.env

  beforeEach(() => {
    provider = new StatsigFeatureFlagProvider()
    process.env = { ...originalEnv }
    jest.clearAllMocks()
  })

  afterEach(() => {
    process.env = originalEnv
  })

  describe('onModuleInit', () => {
    it('should skip initialization when secret key is not set', async () => {
      delete process.env.STATSIG_SERVER_SECRET_KEY
      await provider.onModuleInit()
      expect(Statsig.initialize).not.toHaveBeenCalled()
    })

    it('should initialize Statsig with secret key and environment', async () => {
      process.env.STATSIG_SERVER_SECRET_KEY = 'test-secret'
      process.env.STATSIG_ENVIRONMENT = 'staging'
      await provider.onModuleInit()
      expect(Statsig.initialize).toHaveBeenCalledWith('test-secret', {
        environment: { tier: 'staging' }
      })
    })

    it('should default environment to development', async () => {
      process.env.STATSIG_SERVER_SECRET_KEY = 'test-secret'
      delete process.env.STATSIG_ENVIRONMENT
      await provider.onModuleInit()
      expect(Statsig.initialize).toHaveBeenCalledWith('test-secret', {
        environment: { tier: 'development' }
      })
    })

    it('should handle initialization failure gracefully', async () => {
      process.env.STATSIG_SERVER_SECRET_KEY = 'test-secret';
      (Statsig.initialize as jest.Mock).mockRejectedValueOnce(new Error('network error'))
      await provider.onModuleInit()
      expect(provider.isEnabled('any_flag')).toBe(false)
    })
  })

  describe('isEnabled', () => {
    it('should return false when not initialized', () => {
      expect(provider.isEnabled('any_flag')).toBe(false)
    })

    it('should call checkGate with integrationId as userID when no userID provided', async () => {
      process.env.STATSIG_SERVER_SECRET_KEY = 'test-secret';
      (Statsig.checkGate as jest.Mock).mockReturnValue(true)
      await provider.onModuleInit()

      provider.isEnabled('test_flag', { integrationId: 'int-123' })

      expect(Statsig.checkGate).toHaveBeenCalledWith(
        { userID: 'int-123', custom: { integrationId: 'int-123' } },
        'test_flag'
      )
    })

    it('should prefer context.userID over integrationId', async () => {
      process.env.STATSIG_SERVER_SECRET_KEY = 'test-secret';
      (Statsig.checkGate as jest.Mock).mockReturnValue(false)
      await provider.onModuleInit()

      provider.isEnabled('test_flag', { userID: 'user-1', integrationId: 'int-123' })

      expect(Statsig.checkGate).toHaveBeenCalledWith(
        { userID: 'user-1', custom: { integrationId: 'int-123' } },
        'test_flag'
      )
    })

    it('should fall back to "anonymous" when no userID or integrationId', async () => {
      process.env.STATSIG_SERVER_SECRET_KEY = 'test-secret';
      (Statsig.checkGate as jest.Mock).mockReturnValue(false)
      await provider.onModuleInit()

      provider.isEnabled('test_flag')

      expect(Statsig.checkGate).toHaveBeenCalledWith(
        { userID: 'anonymous', custom: { integrationId: undefined } },
        'test_flag'
      )
    })

    it('should return the value from checkGate', async () => {
      process.env.STATSIG_SERVER_SECRET_KEY = 'test-secret';
      (Statsig.checkGate as jest.Mock).mockReturnValue(true)
      await provider.onModuleInit()

      expect(provider.isEnabled('test_flag', { integrationId: 'int-123' })).toBe(true)
    })
  })
})
