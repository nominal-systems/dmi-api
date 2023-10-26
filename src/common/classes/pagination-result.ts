export interface PaginationResult<T> {
  total: number
  page: number
  limit: number
  data: T[]
}
