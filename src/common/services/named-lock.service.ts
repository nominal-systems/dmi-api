import { Injectable, Logger } from '@nestjs/common'
import { InjectDataSource } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

/**
 * Lock key for order find-or-create sections. Using the same key format in
 * OrdersService and ReportsService makes external_results and external_orders
 * handlers for the same order mutually exclusive (issue #320).
 */
export function orderLockKey (integrationId: string, externalId: string): string {
  return `order:${integrationId}:${externalId}`
}

@Injectable()
export class NamedLockService {
  private readonly logger = new Logger(NamedLockService.name)
  private static readonly LOCK_WAIT_SECONDS = 5

  constructor (@InjectDataSource() private readonly dataSource: DataSource) {}

  /**
   * Runs fn while holding a MySQL named lock, serializing critical sections
   * across replicas that share the same database.
   *
   * The lock name is hashed with MD5 in SQL to stay under MySQL's 64-char
   * lock-name limit. GET_LOCK and RELEASE_LOCK must run on the same pooled
   * connection (releasing on a different one is a silent no-op), so a
   * dedicated query runner is held for the duration of fn. If the process
   * dies while holding the lock, MySQL releases it when the connection drops.
   *
   * If the lock cannot be acquired within the wait timeout, fn runs anyway
   * (graceful degradation to unserialized behavior, never worse than today).
   * On non-MySQL drivers (e.g. sqlite in tests) fn runs without locking.
   */
  async withLock<T> (key: string, fn: () => Promise<T>): Promise<T> {
    const driver = this.dataSource.options.type
    if (driver !== 'mysql' && driver !== 'mariadb') {
      return await fn()
    }

    const queryRunner = this.dataSource.createQueryRunner()
    let acquired = false
    try {
      try {
        const rows = await queryRunner.query(
          'SELECT GET_LOCK(MD5(?), ?) AS acquired',
          [key, NamedLockService.LOCK_WAIT_SECONDS]
        )
        acquired = Number(rows?.[0]?.acquired) === 1
      } catch (error) {
        this.logger.warn(`Error acquiring named lock '${key}': ${error.message}`)
      }
      if (!acquired) {
        this.logger.warn(`Proceeding without named lock '${key}' after ${NamedLockService.LOCK_WAIT_SECONDS}s wait`)
      }
      return await fn()
    } finally {
      if (acquired) {
        try {
          await queryRunner.query('SELECT RELEASE_LOCK(MD5(?))', [key])
        } catch (error) {
          this.logger.warn(`Error releasing named lock '${key}': ${error.message}`)
        }
      }
      await queryRunner.release()
    }
  }
}
