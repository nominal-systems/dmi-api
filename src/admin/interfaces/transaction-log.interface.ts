export interface TransactionLog {
  timestamp: Date
  type: 'event'
  id: string
  message: string
}
