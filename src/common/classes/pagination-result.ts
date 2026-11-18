export interface PaginationResult<T> {
  total: number
  // true when total is a lower bound: there are more matches than the count reads
  totalCapped?: boolean
  page: number
  limit: number
  data: T[]
}
