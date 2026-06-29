import { FindOneOptions } from 'typeorm'

export interface FindOneOfTypeOptions<T> {
  id?: string
  externalId?: string
  options?: FindOneOptions<T>
}

/**
 * Preserves the TypeORM 0.2 `findOne(id, options)` semantics: when both an `id`
 * and an `options.where` are supplied they are combined (AND).
 */
export function toFindOneOptions<T> (args: FindOneOfTypeOptions<T>): FindOneOptions<T> {
  const idCondition = args.id !== undefined ? { id: args.id } : {}
  let where = args.options?.where

  if (idCondition.id !== undefined) {
    if (Array.isArray(where)) {
      where = where.map((condition) => ({ ...condition, ...idCondition }))
    } else if (where !== undefined) {
      where = { ...where, ...idCondition }
    } else {
      where = idCondition as any
    }
  }

  return {
    ...args.options,
    where
  }
}
