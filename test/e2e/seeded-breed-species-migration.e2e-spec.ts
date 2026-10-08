import { Connection, createConnection } from 'typeorm'
import * as fs from 'fs'
import * as path from 'path'
import { MapAntechRefs1699995684080 } from '../../src/migrations/1699995684080-MapAntechRefs'

const TEST_DB = 'dmi_seeded_breed_species_test'
const MIGRATIONS_DIR = path.join(__dirname, '../../src/migrations')
const BACKFILL = 'BackfillSeededBreedSpecies1791472488885'

const baseConfig = {
  type: 'mysql' as const,
  host: process.env.DATABASE_HOST ?? 'localhost',
  port: Number(process.env.DATABASE_PORT ?? 3306),
  username: process.env.DATABASE_USERNAME ?? 'root',
  password: process.env.DATABASE_PASSWORD ?? 'asdf1234',
}

const AVIAN = '2d4d038f-bd6b-11eb-9ce3-302432eba3e9'
const EQUINE = '28fe6a1b-bd6b-11eb-9aaf-302432eba3e9'
const RED_TAILED_HAWK = '2c70864a-bd6b-11eb-83ce-302432eba3e9' // Antech 43 Avian
const COCKATIEL = '1ddd7b33-d7ed-11ea-91dc-302432eba3ec' // Antech 43 Avian
const GIANT_PANDA = '50974401-bd6c-11eb-b717-302432eba3e9' // Antech 49 Other species

// MapAntechRefs1699995684080's breed lines, counted by the species line their Antech species code
// belongs to (Lagomorph has 503 lines for 502 codes). Antech 49 "Other species" has no dmi species.
const SEEDED_BREEDS = 43_342
const OTHER_SPECIES_BREEDS = 5_955
const BREEDS_PER_SPECIES: Record<string, number> = {
  'Avian': 31_412,
  'Other Rodent': 4_084,
  'Marsupial': 584,
  'Rabbit': 502,
  'Other Weasels, Polecats, Stoas, and Minks': 167,
  'Gerbil': 116,
  'Other Pigs, Hogs, and Boars': 92,
  'Equine': 78,
  'Bovine': 70,
  'Rat': 69,
  'Hamster': 48,
  'Guinea Pig': 45,
  'Mouse': 45,
  'Ovine': 35,
  'Caprine': 20,
  'Alpacas and Vicunas': 12,
  'Ferret': 8,
}

const seededCodes = [...MapAntechRefs1699995684080.seededBreedSpecies().keys()]

function chunked (codes: string[], size = 1000): string[][] {
  const chunks: string[][] = []
  for (let i = 0; i < codes.length; i += size) {
    chunks.push(codes.slice(i, i + size))
  }
  return chunks
}

function placeholders (values: unknown[]): string {
  return values.map(() => '?').join(', ')
}

// How the seeded breeds stand: how many are in the table, how many have no species, and how many
// sit under each species, by species name.
async function seededBreedSpecies (connection: Connection) {
  let found = 0
  let unset = 0
  const perSpecies: Record<string, number> = {}
  for (const chunk of chunked(seededCodes)) {
    const rows: Array<{ species: string | null, c: string }> = await connection.query(
      `SELECT s.name AS species, COUNT(*) AS c
       FROM \`ref\` r LEFT JOIN \`ref\` s ON s.code = r.species
       WHERE r.type = 'breed' AND r.code IN (${placeholders(chunk)})
       GROUP BY s.name`,
      chunk,
    )
    for (const row of rows) {
      const c = Number(row.c)
      found += c
      if (row.species === null) {
        unset += c
      } else {
        perSpecies[row.species] = (perSpecies[row.species] ?? 0) + c
      }
    }
  }
  return { found, unset, perSpecies }
}

async function speciesOf (connection: Connection, code: string): Promise<string | null> {
  const [row] = await connection.query('SELECT species FROM `ref` WHERE code = ?', [code])
  return row.species
}

// Refs whose species is not the code of a species ref.
async function danglingSpecies (connection: Connection): Promise<number> {
  const [{ c }] = await connection.query(
    `SELECT COUNT(*) AS c
     FROM \`ref\` r LEFT JOIN \`ref\` s ON s.code = r.species AND s.type = 'species'
     WHERE r.species IS NOT NULL AND s.id IS NULL`,
  )
  return Number(c)
}

describe('seeded Antech breeds carry their species (#377)', () => {
  let adminConnection: Connection | null = null
  let seedOnlyConnection: Connection | null = null
  let testConnection: Connection | null = null
  let canRun = false

  beforeAll(async () => {
    try {
      adminConnection = await createConnection({
        ...baseConfig,
        name: 'seeded-breed-species-admin',
      })
      await adminConnection.query(`DROP DATABASE IF EXISTS \`${TEST_DB}\``)
      await adminConnection.query(`CREATE DATABASE \`${TEST_DB}\``)
      canRun = true
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn(
        `[seeded-breed-species.e2e] MySQL not reachable, skipping. Reason: ${(err as Error).message}`,
      )
    }
  }, 60_000)

  afterAll(async () => {
    for (const connection of [seedOnlyConnection, testConnection]) {
      if (connection?.isConnected) {
        await connection.close()
      }
    }
    if (adminConnection?.isConnected) {
      if (canRun) {
        await adminConnection.query(`DROP DATABASE IF EXISTS \`${TEST_DB}\``)
      }
      await adminConnection.close()
    }
  }, 60_000)

  it(
    'the seed gives each breed the species of its Antech species line, Other species aside',
    async () => {
      if (!canRun) {
        return
      }

      // Every migration up to the backfill, so the seed's own species are what is checked.
      seedOnlyConnection = await createConnection({
        ...baseConfig,
        database: TEST_DB,
        name: 'seeded-breed-species-seed-only',
        migrations: fs.readdirSync(MIGRATIONS_DIR)
          .filter((file) => /\.(ts|js)$/.test(file) && !file.includes('BackfillSeededBreedSpecies'))
          .map((file) => path.join(MIGRATIONS_DIR, file)),
        synchronize: false,
      })
      await seedOnlyConnection.runMigrations({ transaction: 'all' })

      expect(await speciesOf(seedOnlyConnection, RED_TAILED_HAWK)).toBe(AVIAN)
      expect(await speciesOf(seedOnlyConnection, GIANT_PANDA)).toBeNull()
      expect(await seededBreedSpecies(seedOnlyConnection)).toEqual({
        found: SEEDED_BREEDS,
        unset: OTHER_SPECIES_BREEDS,
        perSpecies: BREEDS_PER_SPECIES,
      })
      expect(await danglingSpecies(seedOnlyConnection)).toBe(0)

      await seedOnlyConnection.close()
    },
    600_000,
  )

  it(
    'on a fresh database the backfill finds nothing left to set',
    async () => {
      if (!canRun) {
        return
      }

      testConnection = await createConnection({
        ...baseConfig,
        database: TEST_DB,
        name: 'seeded-breed-species-test',
        migrations: [path.join(MIGRATIONS_DIR, '*.{ts,js}')],
        synchronize: false,
      })
      const executed = await testConnection.runMigrations({ transaction: 'all' })
      expect(executed.map((migration) => migration.name)).toEqual([BACKFILL])

      expect(await speciesOf(testConnection, RED_TAILED_HAWK)).toBe(AVIAN)
      expect(await speciesOf(testConnection, GIANT_PANDA)).toBeNull()
      expect(await seededBreedSpecies(testConnection)).toEqual({
        found: SEEDED_BREEDS,
        unset: OTHER_SPECIES_BREEDS,
        perSpecies: BREEDS_PER_SPECIES,
      })
      expect(await danglingSpecies(testConnection)).toBe(0)
    },
    120_000,
  )

  it(
    'on a database seeded before the fix the backfill sets the species, keeping one set by hand',
    async () => {
      if (!canRun || !testConnection) {
        return
      }

      // A database seeded before the fix: no seeded breed has a species, except one an operator
      // has set by hand since. And the backfill has not run.
      for (const chunk of chunked(seededCodes)) {
        await testConnection.query(
          `UPDATE \`ref\` SET species = NULL WHERE type = 'breed' AND code IN (${placeholders(chunk)})`,
          chunk,
        )
      }
      await testConnection.query('UPDATE `ref` SET species = ? WHERE code = ?', [EQUINE, COCKATIEL])
      expect(await seededBreedSpecies(testConnection)).toEqual({
        found: SEEDED_BREEDS,
        unset: SEEDED_BREEDS - 1,
        perSpecies: { Equine: 1 },
      })
      await testConnection.query('DELETE FROM `migrations` WHERE `name` = ?', [BACKFILL])

      const executed = await testConnection.runMigrations({ transaction: 'all' })
      expect(executed.map((migration) => migration.name)).toEqual([BACKFILL])

      expect(await speciesOf(testConnection, RED_TAILED_HAWK)).toBe(AVIAN)
      expect(await speciesOf(testConnection, COCKATIEL)).toBe(EQUINE)
      expect(await speciesOf(testConnection, GIANT_PANDA)).toBeNull()
      expect(await seededBreedSpecies(testConnection)).toEqual({
        found: SEEDED_BREEDS,
        unset: OTHER_SPECIES_BREEDS,
        perSpecies: {
          ...BREEDS_PER_SPECIES,
          Avian: BREEDS_PER_SPECIES.Avian - 1,
          Equine: BREEDS_PER_SPECIES.Equine + 1,
        },
      })
      expect(await danglingSpecies(testConnection)).toBe(0)
    },
    120_000,
  )

  it(
    'reverting the backfill clears the species it sets and keeps the one set by hand',
    async () => {
      if (!canRun || !testConnection) {
        return
      }

      await testConnection.undoLastMigration({ transaction: 'all' })

      expect(await speciesOf(testConnection, RED_TAILED_HAWK)).toBeNull()
      expect(await speciesOf(testConnection, COCKATIEL)).toBe(EQUINE)
      expect(await seededBreedSpecies(testConnection)).toEqual({
        found: SEEDED_BREEDS,
        unset: SEEDED_BREEDS - 1,
        perSpecies: { Equine: 1 },
      })
    },
    120_000,
  )
})
