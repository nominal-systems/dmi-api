export interface TransactionLog {
  timestamp: Date
  type: 'order' | 'event' | 'external-request' | 'internal-event',
  id: string
  data: any
}
