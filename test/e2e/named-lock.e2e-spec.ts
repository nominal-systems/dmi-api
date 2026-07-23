import { Connection, createConnection } from 'typeorm'
import { NamedLockService, orderLockKey } from '../../src/common/services/named-lock.service'

const TEST_DB = 'dmi_named_lock_test'

const baseConfig = {
  type: 'mysql' as const,
  host: process.env.DATABASE_HOST ?? 'localhost',
  port: Number(process.env.DATABASE_PORT ?? 3306),
  username: process.env.DATABASE_USERNAME ?? 'root',
  password: process.env.DATABASE_PASSWORD ?? 'asdf1234',
}

const sleep = async (ms: number): Promise<void> => await new Promise((resolve) => setTimeout(resolve, ms))

/**
 * The check-then-act pattern from the order find-or-create paths, reduced to
 * its essence. The delay between check and insert widens the race window so
 * the duplicate insert is deterministic instead of timing-dependent.
 */
async function findOrCreate (
  connection: Connection,
  integrationId: string,
  externalId: string,
  delayMs: number,
): Promise<void> {
  const rows = await connection.query(
    'SELECT id FROM `order_like` WHERE `integrationId` = ? AND `externalId` = ?',
    [integrationId, externalId],
  )
  if (rows.length > 0) {
    return
  }
  await sleep(delayMs)
  await connection.query(
    'INSERT INTO `order_like` (`integrationId`, `externalId`) VALUES (?, ?)',
    [integrationId, externalId],
  )
}

async function countOrders (
  connection: Connection,
  integrationId: string,
  externalId: string,
): Promise<number> {
  const [{ c }] = await connection.query(
    'SELECT COUNT(*) AS c FROM `order_like` WHERE `integrationId` = ? AND `externalId` = ?',
    [integrationId, externalId],
  )
  return Number(c)
}

describe('NamedLockService against real MySQL (issue #320)', () => {
  let adminConnection: Connection | null = null
  // Two separate connections/pools simulate two dmi-api replicas sharing MySQL.
  let replicaA: Connection | null = null
  let replicaB: Connection | null = null
  let lockA: NamedLockService
  let lockB: NamedLockService
  let canRun = false

  beforeAll(async () => {
    try {
      adminConnection = await createConnection({
        ...baseConfig,
        name: 'named-lock-admin',
      })
      await adminConnection.query(`DROP DATABASE IF EXISTS \`${TEST_DB}\``)
      await adminConnection.query(`CREATE DATABASE \`${TEST_DB}\``)

      replicaA = await createConnection({
        ...baseConfig,
        database: TEST_DB,
        name: 'named-lock-replica-a',
      })
      replicaB = await createConnection({
        ...baseConfig,
        database: TEST_DB,
        name: 'named-lock-replica-b',
      })
      await replicaA.query(`
        CREATE TABLE \`order_like\` (
          \`id\` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          \`integrationId\` VARCHAR(36) NOT NULL,
          \`externalId\` VARCHAR(255) NOT NULL
        )
      `)

      lockA = new NamedLockService(replicaA as any)
      lockB = new NamedLockService(replicaB as any)
      canRun = true
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn(
        `[named-lock.e2e] MySQL not reachable, skipping. Reason: ${(err as Error).message}`,
      )
    }
  }, 60_000)

  afterAll(async () => {
    if (replicaA?.isConnected) {
      await replicaA.close()
    }
    if (replicaB?.isConnected) {
      await replicaB.close()
    }
    if (adminConnection?.isConnected) {
      if (canRun) {
        await adminConnection.query(`DROP DATABASE IF EXISTS \`${TEST_DB}\``)
      }
      await adminConnection.close()
    }
  }, 60_000)

  it(
    'documents the bug: unserialized check-then-act from two replicas inserts duplicates',
    async () => {
      if (!canRun) {
        return
      }
      const [connA, connB] = [replicaA!, replicaB!]

      await Promise.all([
        findOrCreate(connA, 'int-1', 'EXT-UNLOCKED', 100),
        findOrCreate(connB, 'int-1', 'EXT-UNLOCKED', 100),
      ])

      expect(await countOrders(connA, 'int-1', 'EXT-UNLOCKED')).toBe(2)
    },
    30_000,
  )

  it(
    'serializes find-or-create across replicas: only one order is inserted',
    async () => {
      if (!canRun) {
        return
      }
      const [connA, connB] = [replicaA!, replicaB!]

      const key = orderLockKey('int-1', 'EXT-LOCKED')
      await Promise.all([
        lockA.withLock(key, async () => await findOrCreate(connA, 'int-1', 'EXT-LOCKED', 100)),
        lockB.withLock(key, async () => await findOrCreate(connB, 'int-1', 'EXT-LOCKED', 100)),
      ])

      expect(await countOrders(connA, 'int-1', 'EXT-LOCKED')).toBe(1)
    },
    30_000,
  )

  it(
    'does not serialize different (integrationId, externalId) pairs against each other',
    async () => {
      if (!canRun) {
        return
      }

      const start = Date.now()
      await Promise.all([
        lockA.withLock(orderLockKey('int-1', 'EXT-A'), async () => await sleep(500)),
        lockB.withLock(orderLockKey('int-2', 'EXT-A'), async () => await sleep(500)),
      ])

      // Different keys must run concurrently (~500ms), not sequentially (~1000ms).
      expect(Date.now() - start).toBeLessThan(900)
    },
    30_000,
  )

  it(
    'degrades gracefully: proceeds without the lock after the wait timeout',
    async () => {
      if (!canRun) {
        return
      }

      const [connA, connB] = [replicaA!, replicaB!]

      const key = orderLockKey('int-1', 'EXT-STUCK')
      // A stuck holder: acquires the lock and never releases it.
      const stuckHolder = connA.createQueryRunner()
      await stuckHolder.query('SELECT GET_LOCK(MD5(?), 1)', [key])

      try {
        const start = Date.now()
        await lockB.withLock(key, async () => await findOrCreate(connB, 'int-1', 'EXT-STUCK', 0))

        // Waited the full timeout (5s), then ran the critical section anyway.
        expect(Date.now() - start).toBeGreaterThanOrEqual(4_900)
        expect(await countOrders(connB, 'int-1', 'EXT-STUCK')).toBe(1)
      } finally {
        await stuckHolder.query('SELECT RELEASE_LOCK(MD5(?))', [key])
        await stuckHolder.release()
      }
    },
    30_000,
  )
})
