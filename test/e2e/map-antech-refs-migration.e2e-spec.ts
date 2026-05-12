import { Connection, createConnection } from 'typeorm'
import * as path from 'path'

const TEST_DB = 'dmi_map_antech_refs_test'

const baseConfig = {
  type: 'mysql' as const,
  host: process.env.DATABASE_HOST ?? 'localhost',
  port: Number(process.env.DATABASE_PORT ?? 3306),
  username: process.env.DATABASE_USERNAME ?? 'root',
  password: process.env.DATABASE_PASSWORD ?? 'asdf1234',
}

describe('MapAntechRefs1699995684080 idempotency (regression for #289)', () => {
  let adminConnection: Connection | null = null
  let testConnection: Connection | null = null
  let canRun = false

  beforeAll(async () => {
    try {
      adminConnection = await createConnection({
        ...baseConfig,
        name: 'map-antech-refs-admin',
      })
      await adminConnection.query(`DROP DATABASE IF EXISTS \`${TEST_DB}\``)
      await adminConnection.query(`CREATE DATABASE \`${TEST_DB}\``)
      canRun = true
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn(
        `[map-antech-refs.e2e] MySQL not reachable, skipping. Reason: ${(err as Error).message}`,
      )
    }
  }, 60_000)

  afterAll(async () => {
    if (testConnection?.isConnected) {
      await testConnection.close()
    }
    if (adminConnection?.isConnected) {
      if (canRun) {
        await adminConnection.query(`DROP DATABASE IF EXISTS \`${TEST_DB}\``)
      }
      await adminConnection.close()
    }
  }, 60_000)

  it(
    'should not throw when re-run after its migrations record is removed',
    async () => {
      if (!canRun) {
        return
      }

      testConnection = await createConnection({
        ...baseConfig,
        database: TEST_DB,
        name: 'map-antech-refs-test',
        migrations: [path.join(__dirname, '../../src/migrations/*.{ts,js}')],
        synchronize: false,
      })

      // First run — applies all migrations, including MapAntechRefs.
      await testConnection.runMigrations({ transaction: 'all' })

      const [{ c: refsBefore }] = await testConnection.query(
        'SELECT COUNT(*) AS c FROM `ref`',
      )
      const [{ c: providerRefsBefore }] = await testConnection.query(
        'SELECT COUNT(*) AS c FROM `provider_ref`',
      )
      expect(Number(refsBefore)).toBeGreaterThan(0)
      expect(Number(providerRefsBefore)).toBeGreaterThan(0)

      // Reproduce the bug scenario: data is in place but the migrations
      // table no longer remembers that MapAntechRefs ran.
      await testConnection.query(
        "DELETE FROM `migrations` WHERE `name` = 'MapAntechRefs1699995684080'",
      )

      // The migration must now be safely re-runnable.
      await expect(
        testConnection.runMigrations({ transaction: 'all' }),
      ).resolves.not.toThrow()

      // And it must not have duplicated any rows.
      const [{ c: refsAfter }] = await testConnection.query(
        'SELECT COUNT(*) AS c FROM `ref`',
      )
      const [{ c: providerRefsAfter }] = await testConnection.query(
        'SELECT COUNT(*) AS c FROM `provider_ref`',
      )
      expect(Number(refsAfter)).toBe(Number(refsBefore))
      expect(Number(providerRefsAfter)).toBe(Number(providerRefsBefore))
    },
    600_000,
  )
})
