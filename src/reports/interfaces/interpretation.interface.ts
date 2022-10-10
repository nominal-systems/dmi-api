export enum InterpretationCode {
  NORMAL = 'N',
  ABNORMAL = 'A',
  CRITICAL_LOW = 'LL',
  LOW = 'L',
  HIGH = 'H',
  CRITICAL_HIGH = 'HH'
}

export interface Interpretation {
  code?: InterpretationCode
  text?: string
}
