import { ReportStatus, TestResultStatus } from '@nominal-systems/dmi-engine-common'

export function resultStatusMapper (value: string): ReportStatus {
  switch (value) {
    case 'PARTIAL':
      return ReportStatus.PARTIAL
    case 'FINAL':
    case 'COMPLETED':
      return ReportStatus.FINAL
    case 'CANCELLED':
      return ReportStatus.CANCELLED
    default:
      return ReportStatus.REGISTERED
  }
}

// TODO(gb): map other possible status
export function testResultStatusMapper (value: string): TestResultStatus {
  switch (value) {
    case 'DONE':
      return TestResultStatus.COMPLETED
    default:
      return TestResultStatus.PENDING
  }
}
