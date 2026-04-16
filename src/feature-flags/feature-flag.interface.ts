export const FEATURE_FLAG_PROVIDER = 'FEATURE_FLAG_PROVIDER'

export interface FeatureFlagContext {
  userID?: string
  integrationId?: string
  custom?: Record<string, unknown>
}

export interface FeatureFlagProvider {
  isEnabled(flag: string, context?: FeatureFlagContext): boolean
}

export const TEST_RESULT_MATCH_BY_NAME_FLAG = 'dmi_api_test_result_match_by_name'
