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
const ZEBU = '5a9c4493-bd6c-11eb-b359-302432eba3e9' // Antech 45 Bovine
const ALPACA = 'af94e68e-bd6c-11eb-9ca2-302432eba3e9' // Antech 63 Camelid: no dmi species
const BOVINE = '2e5af133-bd6b-11eb-a0bf-302432eba3e9' // the Bovine species the seed's species line names (a legacy `BOVINE` ref shares the name)

// MapAntechRefs1699995684080's breed lines, counted by the species line their Antech species code
// belongs to (Lagomorph has 503 lines for 502 codes), keyed by the dmi species CODE: two species
// refs are named "Bovine", and only one is the seed's. Antech 49 "Other species" (5,955) and
// 63 "Camelid" (12) have no dmi species.
const SEEDED_BREEDS = 43_342
const UNSET_BREEDS = 5_955 + 12
const BREEDS_PER_SPECIES: Record<string, number> = {
  [AVIAN]: 31_412, // Avian
  '356fafa0-bd6b-11eb-bbbd-302432eba3e9': 4_084, // Other Rodent
  '35583005-bd6b-11eb-ab61-302432eba3e9': 584, // Marsupial
  '357f18ed-bd6b-11eb-838f-302432eba3e9': 502, // Rabbit
  '30ed0dbc-bd6b-11eb-bd84-302432eba3e9': 167, // Other Weasels, Polecats, Stoas, and Minks
  '3537afa1-bd6b-11eb-a30d-302432eba3e9': 116, // Gerbil
  '291ca04e-bd6b-11eb-b285-302432eba3e9': 92, // Other Pigs, Hogs, and Boars
  [EQUINE]: 78, // Equine
  [BOVINE]: 70, // Bovine
  '34f5015f-bd6b-11eb-87b1-302432eba3e9': 69, // Rat
  '2e6ccb92-bd6b-11eb-bb02-302432eba3e9': 48, // Hamster
  '37a4df4f-bd6b-11eb-a920-302432eba3e9': 45, // Guinea Pig
  '34c788af-bd6b-11eb-9244-302432eba3e9': 45, // Mouse
  '3757f7a0-bd6b-11eb-bfb7-302432eba3e9': 35, // Ovine
  '371e70f7-bd6b-11eb-8ff9-302432eba3e9': 20, // Caprine
  '2aa8e582-bd6b-11eb-90f2-302432eba3e9': 8, // Ferret
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
// sit under each species, by species code.
async function seededBreedSpecies (connection: Connection) {
  let found = 0
  let unset = 0
  const perSpecies: Record<string, number> = {}
  for (const chunk of chunked(seededCodes)) {
    const rows: Array<{ species: string | null, c: string }> = await connection.query(
      `SELECT r.species AS species, COUNT(*) AS c
       FROM \`ref\` r
       WHERE r.type = 'breed' AND r.code IN (${placeholders(chunk)})
       GROUP BY r.species`,
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
      // Skipping keeps `npm run test:e2e` runnable without a database, as the #289 spec does; set
      // DATABASE_REQUIRED=1 where a silent skip must not pass for a run.
      if (process.env.DATABASE_REQUIRED) {
        throw err
      }
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
      expect(await speciesOf(seedOnlyConnection, ZEBU)).toBe(BOVINE)
      expect(await speciesOf(seedOnlyConnection, GIANT_PANDA)).toBeNull()
      expect(await speciesOf(seedOnlyConnection, ALPACA)).toBeNull()
      expect(await seededBreedSpecies(seedOnlyConnection)).toEqual({
        found: SEEDED_BREEDS,
        unset: UNSET_BREEDS,
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
        unset: UNSET_BREEDS,
        perSpecies: BREEDS_PER_SPECIES,
      })
      expect(await danglingSpecies(testConnection)).toBe(0)
    },
    120_000,
  )

  it(
    'reverting the backfill on a fresh database clears the species the seed set — it cannot tell them apart',
    async () => {
      if (!canRun || !testConnection) {
        return
      }

      await testConnection.undoLastMigration({ transaction: 'all' })

      expect(await speciesOf(testConnection, RED_TAILED_HAWK)).toBeNull()
      expect(await seededBreedSpecies(testConnection)).toEqual({
        found: SEEDED_BREEDS,
        unset: SEEDED_BREEDS,
        perSpecies: {},
      })

      // Put the backfill back for the tests below.
      const executed = await testConnection.runMigrations({ transaction: 'all' })
      expect(executed.map((migration) => migration.name)).toEqual([BACKFILL])
      expect(await speciesOf(testConnection, RED_TAILED_HAWK)).toBe(AVIAN)
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
        perSpecies: { [EQUINE]: 1 },
      })
      await testConnection.query('DELETE FROM `migrations` WHERE `name` = ?', [BACKFILL])

      const executed = await testConnection.runMigrations({ transaction: 'all' })
      expect(executed.map((migration) => migration.name)).toEqual([BACKFILL])

      expect(await speciesOf(testConnection, RED_TAILED_HAWK)).toBe(AVIAN)
      expect(await speciesOf(testConnection, COCKATIEL)).toBe(EQUINE)
      expect(await speciesOf(testConnection, GIANT_PANDA)).toBeNull()
      expect(await seededBreedSpecies(testConnection)).toEqual({
        found: SEEDED_BREEDS,
        unset: UNSET_BREEDS,
        perSpecies: {
          ...BREEDS_PER_SPECIES,
          [AVIAN]: BREEDS_PER_SPECIES[AVIAN] - 1,
          [EQUINE]: BREEDS_PER_SPECIES[EQUINE] + 1,
        },
      })
      expect(await danglingSpecies(testConnection)).toBe(0)
    },
    120_000,
  )

  it(
    'reverting the backfill clears the species it set and keeps one set by hand to another value',
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
        perSpecies: { [EQUINE]: 1 },
      })
    },
    120_000,
  )
})
