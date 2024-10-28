export interface TransactionLog {
  timestamp: Date
  type: 'order' | 'event' | 'external-request'
  id: string
  data: any
}
