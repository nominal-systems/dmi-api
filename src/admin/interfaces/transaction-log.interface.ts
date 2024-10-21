export interface TransactionLog {
  timestamp: Date
  type: 'event' | 'external-request'
  id: string
  data: any
}
