import { Injectable } from '@nestjs/common'
import { FeatureFlagContext, FeatureFlagProvider, TEST_RESULT_MATCH_BY_NAME_FLAG } from './feature-flag.interface'

@Injectable()
export class EnvFeatureFlagProvider implements FeatureFlagProvider {
  isEnabled(flag: string, _context?: FeatureFlagContext): boolean {
    switch (flag) {
      case TEST_RESULT_MATCH_BY_NAME_FLAG:
        return process.env.TEST_RESULT_MATCH_BY_NAME === 'true'
      default:
        return false
    }
  }
}
