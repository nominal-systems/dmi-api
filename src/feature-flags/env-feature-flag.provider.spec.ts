import { EnvFeatureFlagProvider } from './env-feature-flag.provider'
import { TEST_RESULT_MATCH_BY_NAME_FLAG } from './feature-flag.interface'

describe('EnvFeatureFlagProvider', () => {
  let provider: EnvFeatureFlagProvider
  const originalEnv = process.env

  beforeEach(() => {
    provider = new EnvFeatureFlagProvider()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('should return true when TEST_RESULT_MATCH_BY_NAME is "true"', () => {
    process.env.TEST_RESULT_MATCH_BY_NAME = 'true'
    expect(provider.isEnabled(TEST_RESULT_MATCH_BY_NAME_FLAG)).toBe(true)
  })

  it('should return false when TEST_RESULT_MATCH_BY_NAME is not set', () => {
    delete process.env.TEST_RESULT_MATCH_BY_NAME
    expect(provider.isEnabled(TEST_RESULT_MATCH_BY_NAME_FLAG)).toBe(false)
  })

  it('should return false when TEST_RESULT_MATCH_BY_NAME is "false"', () => {
    process.env.TEST_RESULT_MATCH_BY_NAME = 'false'
    expect(provider.isEnabled(TEST_RESULT_MATCH_BY_NAME_FLAG)).toBe(false)
  })

  it('should return false for an unknown flag', () => {
    expect(provider.isEnabled('unknown_flag')).toBe(false)
  })
})
