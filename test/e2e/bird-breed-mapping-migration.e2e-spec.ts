import { Logger } from '@nestjs/common'
import { Connection, createConnection } from 'typeorm'
import * as fs from 'fs'
import * as path from 'path'
import { ANTECH_V6_BIRD_BREEDS } from '../../src/migrations/data/antech-v6-bird-breeds'

const TEST_DB = 'dmi_bird_breed_mapping_test'
const MIGRATIONS_DIR = path.join(__dirname, '../../src/migrations')
const MAPPING = 'MapBirdBreedsToAntechV61791985011716'

const baseConfig = {
  type: 'mysql' as const,
  host: process.env.DATABASE_HOST ?? 'localhost',
  port: Number(process.env.DATABASE_PORT ?? 3306),
  username: process.env.DATABASE_USERNAME ?? 'root',
  password: process.env.DATABASE_PASSWORD ?? 'asdf1234',
}

// Antech V6's 12 bird species and their 202 breeds, as its catalogue serves them.
const CATALOGUE: {
  species: Array<{ code: string, name: string }>
  breeds: Array<{ code: string, name: string, species: string }>
} = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/antech-v6-bird-catalogue.json'), 'utf8'))
const BIRD_SPECIES = CATALOGUE.species.map((species) => species.code)

// One non-bird species and breed of the same catalogue, for a mapping the migration must leave alone.
const CANINE = { code: '41', name: 'Canine', species: null }
const CANINE_OTHER = { code: '370', name: 'Other', species: '41' }

const LISTED_BREED = new Map(ANTECH_V6_BIRD_BREEDS.map(([code, , breed]) => [code, breed]))

const RED_TAILED_HAWK = '2c70864a-bd6b-11eb-83ce-302432eba3e9' // listed: 834 Raptor Red Tail Hawk
const PEREGRINE = '6fd8ab8f-bd6c-11eb-9f18-302432eba3e9' // American Peregrine Falcon
const CHICKEN = '1ddd7b2e-d7ed-11ea-8e17-302432eba3ec' // Chicken
const RHODE_ISLAND_RED = '1ddd7b31-d7ed-11ea-9f85-302432eba3ec' // Rhode Island Red Chicken
const ADAMAWA_TURTLE_DOVE = 'a7a49524-bd6c-11eb-8baa-302432eba3e9' // Adamawa Turtle Dove
const LABRADOR = '1ddc425a-d7ed-11ea-a641-302432eba3ec' // Labrador Retriever, Canis familiaris: not listed

interface Mapping {
  breed: string
  type: string
  species: string | null
}

// dmi ref code -> its antech-v6 mappings (any type), ordered.
async function antechV6Mappings (connection: Connection): Promise<Map<string, Mapping[]>> {
  const rows: Array<{ ref: string } & Mapping> = await connection.query(
    `SELECT r.code AS ref, pr.code AS breed, pr.type AS type, pr.species AS species
     FROM provider_ref_ref j
     JOIN ref r ON r.id = j.refId
     JOIN provider_ref pr ON pr.id = j.providerRefId
     WHERE pr.provider = 'antech-v6'
     ORDER BY r.code, pr.code`,
  )
  const byRef = new Map<string, Mapping[]>()
  for (const { ref, ...mapping } of rows) {
    byRef.set(ref, [...(byRef.get(ref) ?? []), mapping])
  }
  return byRef
}

function breedsOf (mappings: Map<string, Mapping[]>, code: string): string[] {
  return (mappings.get(code) ?? []).map((mapping) => mapping.breed)
}

// The listed refs whose antech-v6 mappings are anything but their one listed breed.
function listMismatches (mappings: Map<string, Mapping[]>): string[] {
  return ANTECH_V6_BIRD_BREEDS
    .filter(([code, , breed]) => {
      const held = mappings.get(code) ?? []
      return held.length !== 1 || held[0].type !== 'breed' || held[0].breed !== breed
    })
    .map(([code, name, breed]) => `${code} ${name}: listed ${breed}, holds ${breedsOf(mappings, code).join(', ') || 'none'}`)
}

// How many antech-v6 breed pairs hold a listed ref.
function listedPairs (mappings: Map<string, Mapping[]>): number {
  let pairs = 0
  for (const [ref, held] of mappings) {
    if (LISTED_BREED.has(ref)) {
      pairs += held.filter((mapping) => mapping.type === 'breed').length
    }
  }
  return pairs
}

function unlisted (mappings: Map<string, Mapping[]>): Array<[string, string[]]> {
  return [...mappings.keys()].filter((ref) => !LISTED_BREED.has(ref)).map((ref) => [ref, breedsOf(mappings, ref)])
}

async function count (connection: Connection, sql: string, params: unknown[] = []): Promise<number> {
  const [{ c }] = await connection.query(sql, params)
  return Number(c)
}

const otherProviderMappings = (connection: Connection) => count(
  connection,
  `SELECT COUNT(*) AS c FROM provider_ref_ref j JOIN provider_ref pr ON pr.id = j.providerRefId
   WHERE pr.provider <> 'antech-v6'`,
)

const allMappings = (connection: Connection) => count(connection, 'SELECT COUNT(*) AS c FROM provider_ref_ref')

const recorded = (connection: Connection) => count(
  connection,
  'SELECT COUNT(*) AS c FROM `migrations` WHERE `name` = ?',
  [MAPPING],
)

async function insertProviderRefs (
  connection: Connection,
  type: 'species' | 'breed',
  rows: Array<{ code: string, name: string, species: string | null }>,
): Promise<void> {
  await connection.query(
    `INSERT INTO provider_ref (code, name, species, type, provider) VALUES ${rows.map(() => "(?, ?, ?, ?, 'antech-v6')").join(', ')}`,
    rows.flatMap((row) => [row.code, row.name, row.species, type]),
  )
}

// Maps a dmi breed ref to an antech-v6 breed, as an operator would by hand.
async function mapByHand (connection: Connection, refCode: string, breedCode: string): Promise<void> {
  const result = await connection.query(
    `INSERT INTO provider_ref_ref (refId, providerRefId)
     SELECT r.id, pr.id FROM ref r, provider_ref pr
     WHERE r.code = ? AND r.type = 'breed' AND pr.code = ? AND pr.provider = 'antech-v6' AND pr.type = 'breed'`,
    [refCode, breedCode],
  )
  expect(result.affectedRows).toBe(1)
}

async function unmapByHand (connection: Connection, refCode: string, breedCode: string): Promise<void> {
  const result = await connection.query(
    `DELETE j FROM provider_ref_ref j
     JOIN ref r ON r.id = j.refId
     JOIN provider_ref pr ON pr.id = j.providerRefId
     WHERE r.code = ? AND pr.code = ? AND pr.provider = 'antech-v6' AND pr.type = 'breed'`,
    [refCode, breedCode],
  )
  expect(result.affectedRows).toBe(1)
}

async function rerunMapping (connection: Connection): Promise<void> {
  await connection.query('DELETE FROM `migrations` WHERE `name` = ?', [MAPPING])
  const executed = await connection.runMigrations({ transaction: 'all' })
  expect(executed.map((migration) => migration.name)).toEqual([MAPPING])
}

describe('dmi bird breeds mapped to Antech V6 breeds (#377)', () => {
  let adminConnection: Connection | null = null
  let seedOnlyConnection: Connection | null = null
  let testConnection: Connection | null = null
  let canRun = false
  let logSpy: jest.SpyInstance
  let errorSpy: jest.SpyInstance

  // What the mapping migration logged since the spies were last cleared.
  function mappingLog (): string[] {
    return logSpy.mock.calls
      .filter((_call, i) => (logSpy.mock.contexts[i] as any)?.context === MAPPING)
      .map(([message]) => String(message))
  }

  function mappingErrors (): string[] {
    return errorSpy.mock.calls
      .filter((_call, i) => (errorSpy.mock.contexts[i] as any)?.context === MAPPING)
      .map(([message]) => String(message))
  }

  beforeAll(async () => {
    logSpy = jest.spyOn(Logger.prototype, 'log')
    errorSpy = jest.spyOn(Logger.prototype, 'error').mockImplementation(() => undefined)
    try {
      adminConnection = await createConnection({
        ...baseConfig,
        name: 'bird-breed-mapping-admin',
      })
      await adminConnection.query(`DROP DATABASE IF EXISTS \`${TEST_DB}\``)
      await adminConnection.query(`CREATE DATABASE \`${TEST_DB}\``)
      canRun = true
    } catch (err) {
      // Skipping keeps `npm run test:e2e` runnable without a database, as the #289 spec does; set
      // DATABASE_REQUIRED=1 where a silent skip must not pass for a run.
      if (process.env.DATABASE_REQUIRED === '1') {
        throw err
      }
      // eslint-disable-next-line no-console
      console.warn(
        `[bird-breed-mapping.e2e] MySQL not reachable, skipping. Reason: ${(err as Error).message}`,
      )
    }
  }, 60_000)

  afterAll(async () => {
    logSpy.mockRestore()
    errorSpy.mockRestore()
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
    'on a fresh database, which has no antech-v6 reference data, it maps nothing and says so',
    async () => {
      if (!canRun) {
        return
      }

      // Every migration before this one, to see what the database holds without it.
      seedOnlyConnection = await createConnection({
        ...baseConfig,
        database: TEST_DB,
        name: 'bird-breed-mapping-seed-only',
        migrations: fs.readdirSync(MIGRATIONS_DIR)
          .filter((file) => /\.(ts|js)$/.test(file) && !file.includes('MapBirdBreedsToAntechV6'))
          .map((file) => path.join(MIGRATIONS_DIR, file)),
        synchronize: false,
      })
      await seedOnlyConnection.runMigrations({ transaction: 'all' })
      expect(await count(seedOnlyConnection, "SELECT COUNT(*) AS c FROM provider_ref WHERE provider = 'antech-v6'")).toBe(0)
      const mappingsBefore = await allMappings(seedOnlyConnection)
      expect(mappingsBefore).toBeGreaterThan(0)
      await seedOnlyConnection.close()

      testConnection = await createConnection({
        ...baseConfig,
        database: TEST_DB,
        name: 'bird-breed-mapping-test',
        migrations: [path.join(MIGRATIONS_DIR, '*.{ts,js}')],
        synchronize: false,
      })
      logSpy.mockClear()
      const executed = await testConnection.runMigrations({ transaction: 'all' })
      expect(executed.map((migration) => migration.name)).toEqual([MAPPING])
      expect(await recorded(testConnection)).toBe(1)

      expect(await allMappings(testConnection)).toBe(mappingsBefore)
      expect((await antechV6Mappings(testConnection)).size).toBe(0)
      expect(mappingLog()).toEqual([
        'This database has no antech-v6 breeds (the provider\'s reference data was never synced): no bird breed mapped. ' +
        'This migration is now recorded as run: after syncing antech-v6, an operator applies the list by deleting ' +
        `this migration's row (${MAPPING}) from \`migrations\` and running migrations again.`,
      ])
    },
    600_000,
  )

  it(
    'with Antech\'s bird catalogue synced, it maps every listed ref to its breed, replacing a hand mapping and keeping the rest',
    async () => {
      if (!canRun || !testConnection) {
        return
      }

      await insertProviderRefs(testConnection, 'species', [
        ...CATALOGUE.species.map((species) => ({ ...species, species: null })),
        CANINE,
      ])
      await insertProviderRefs(testConnection, 'breed', [...CATALOGUE.breeds, CANINE_OTHER])
      // The hawk mapped by hand to the generic hawk, which the list replaces with the red-tailed
      // one; and a dog breed the list does not name.
      await mapByHand(testConnection, RED_TAILED_HAWK, '832')
      await mapByHand(testConnection, LABRADOR, '370')
      const otherProvidersBefore = await otherProviderMappings(testConnection)
      expect(otherProvidersBefore).toBeGreaterThan(0)

      logSpy.mockClear()
      await rerunMapping(testConnection)

      const mappings = await antechV6Mappings(testConnection)
      expect(listedPairs(mappings)).toBe(25_090)
      expect(listMismatches(mappings)).toEqual([])
      const mapped = [...mappings].filter(([ref]) => LISTED_BREED.has(ref)).flatMap(([, held]) => held)
      expect(mapped.filter((mapping) => mapping.type !== 'breed' || !BIRD_SPECIES.includes(mapping.species ?? ''))).toEqual([])
      expect([...mappings].filter(([ref, held]) => LISTED_BREED.has(ref) && held.length > 1)).toEqual([])

      expect(breedsOf(mappings, RED_TAILED_HAWK)).toEqual(['834'])
      expect(breedsOf(mappings, PEREGRINE)).toEqual(['830'])
      expect(breedsOf(mappings, CHICKEN)).toEqual(['684'])
      expect(breedsOf(mappings, RHODE_ISLAND_RED)).toEqual(['684'])
      expect(breedsOf(mappings, ADAMAWA_TURTLE_DOVE)).toEqual(['674'])
      expect(unlisted(mappings)).toEqual([[LABRADOR, ['370']]])
      expect(await otherProviderMappings(testConnection)).toBe(otherProvidersBefore)

      expect(mappingLog()).toEqual([
        expect.stringMatching(
          /^25090 dmi bird breeds in the list, 25090 mapped to their antech-v6 breed \(25090 added, 0 already mapped\), 1 other antech-v6 breed mappings replaced, 0 skipped, in \d+ ms$/,
        ),
      ])
    },
    120_000,
  )

  it(
    'run again, it changes nothing',
    async () => {
      if (!canRun || !testConnection) {
        return
      }

      const before = await antechV6Mappings(testConnection)
      const mappingsBefore = await allMappings(testConnection)

      logSpy.mockClear()
      await rerunMapping(testConnection)

      expect(await antechV6Mappings(testConnection)).toEqual(before)
      expect(await allMappings(testConnection)).toBe(mappingsBefore)
      expect(mappingLog()).toEqual([
        expect.stringMatching(
          /^25090 dmi bird breeds in the list, 25090 mapped to their antech-v6 breed \(0 added, 25090 already mapped\), 0 other antech-v6 breed mappings replaced, 0 skipped, in \d+ ms$/,
        ),
      ])
    },
    120_000,
  )

  it(
    'with a catalogue that has drifted from the list, it skips the rows it cannot place, names them, and maps the rest',
    async () => {
      if (!canRun || !testConnection) {
        return
      }
      const connection = testConnection
      const chickens = ANTECH_V6_BIRD_BREEDS.filter(([, , breed]) => breed === '684').length
      const redTails = ANTECH_V6_BIRD_BREEDS.filter(([, , breed]) => breed === '834').length

      // The hawk back on the generic hawk by hand: a skipped row must leave its ref alone, a
      // placed row replaces.
      await unmapByHand(connection, RED_TAILED_HAWK, '834')
      await mapByHand(connection, RED_TAILED_HAWK, '832')

      // A listed breed filed under a species that is not a bird: every row naming it is skipped,
      // the hawk's among them, so the hawk keeps its hand mapping; the other red-tails keep the
      // mapping an earlier run gave them.
      await connection.query(
        "UPDATE provider_ref SET species = '41' WHERE provider = 'antech-v6' AND type = 'breed' AND code = '834'",
      )
      logSpy.mockClear()
      errorSpy.mockClear()
      await rerunMapping(connection)
      expect(await recorded(connection)).toBe(1)
      let mappings = await antechV6Mappings(connection)
      expect(breedsOf(mappings, RED_TAILED_HAWK)).toEqual(['832'])
      expect(listMismatches(mappings)).toEqual([expect.stringContaining(`${RED_TAILED_HAWK} `)])
      expect(mappingErrors()).toEqual([
        expect.stringMatching(/the rows naming these breeds are skipped\. Breeds the list names that are not under one of its bird species: 834 \(species 41\)$/),
      ])
      expect(mappingLog()).toEqual([
        expect.stringMatching(
          new RegExp(`\\(0 added, ${25_090 - redTails} already mapped\\), 0 other antech-v6 breed mappings replaced, ${redTails} skipped, in \\d+ ms$`),
        ),
      ])
      await connection.query(
        "UPDATE provider_ref SET species = '119' WHERE provider = 'antech-v6' AND type = 'breed' AND code = '834'",
      )

      // A listed breed gone from the catalogue (its mappings go with it): its rows are skipped,
      // the hawk, whole again, is placed and replaces the hand mapping.
      await connection.query("DELETE FROM provider_ref WHERE provider = 'antech-v6' AND type = 'breed' AND code = '684'")
      // (the hawk's hand mapping to 832 still counts as one of its pairs)
      expect(listedPairs(await antechV6Mappings(connection))).toBe(25_090 - chickens)
      logSpy.mockClear()
      errorSpy.mockClear()
      await rerunMapping(connection)
      expect(await recorded(connection)).toBe(1)
      mappings = await antechV6Mappings(connection)
      expect(breedsOf(mappings, RED_TAILED_HAWK)).toEqual(['834'])
      expect(breedsOf(mappings, CHICKEN)).toEqual([])
      expect(listedPairs(mappings)).toBe(25_090 - chickens)
      expect(listMismatches(mappings)).toHaveLength(chickens)
      expect(mappingErrors()).toEqual([
        expect.stringMatching(/Breeds the list names that are not in it: 684$/),
      ])
      expect(mappingLog()).toEqual([
        expect.stringMatching(
          new RegExp(`\\(1 added, ${25_090 - chickens - 1} already mapped\\), 1 other antech-v6 breed mappings replaced, ${chickens} skipped, in \\d+ ms$`),
        ),
      ])

      // With the catalogue whole again it maps the chickens, and nothing is skipped or named.
      await insertProviderRefs(connection, 'breed', CATALOGUE.breeds.filter((breed) => breed.code === '684'))
      logSpy.mockClear()
      errorSpy.mockClear()
      await rerunMapping(connection)
      mappings = await antechV6Mappings(connection)
      expect(listMismatches(mappings)).toEqual([])
      expect(listedPairs(mappings)).toBe(25_090)
      expect(unlisted(mappings)).toEqual([[LABRADOR, ['370']]])
      expect(mappingErrors()).toEqual([])
      expect(mappingLog()).toEqual([
        expect.stringMatching(
          new RegExp(`\\(${chickens} added, ${25_090 - chickens} already mapped\\), 0 other antech-v6 breed mappings replaced, 0 skipped, in \\d+ ms$`),
        ),
      ])

      // Each drift below is undone after its run; what the run leaves must be what it found.
      const whole = await antechV6Mappings(connection)
      const redTailsSkipped = new RegExp(
        `\\(0 added, ${25_090 - redTails} already mapped\\), 0 other antech-v6 breed mappings replaced, ${redTails} skipped, in \\d+ ms$`,
      )

      // A listed breed under another bird species than the list expects: Antech would refuse it
      // with the species an order sends, so its rows are skipped like a non-bird's.
      await connection.query(
        "UPDATE provider_ref SET species = '115' WHERE provider = 'antech-v6' AND type = 'breed' AND code = '834'",
      )
      logSpy.mockClear()
      errorSpy.mockClear()
      await rerunMapping(connection)
      expect(await recorded(connection)).toBe(1)
      expect(mappingErrors()).toEqual([
        expect.stringMatching(
          /the rows naming these breeds are skipped\. Breeds the list names that are under another of its bird species than the list expects: 834 \(species 115, expected 119\)$/,
        ),
      ])
      expect(mappingLog()).toEqual([expect.stringMatching(redTailsSkipped)])
      await connection.query(
        "UPDATE provider_ref SET species = '119' WHERE provider = 'antech-v6' AND type = 'breed' AND code = '834'",
      )
      expect(await antechV6Mappings(connection)).toEqual(whole)

      // A listed breed in the catalogue twice: the migration cannot tell which row is the breed,
      // so its rows are skipped and both rows are named.
      await insertProviderRefs(connection, 'breed', CATALOGUE.breeds.filter((breed) => breed.code === '834'))
      const redTailRows: Array<{ id: number }> = await connection.query(
        "SELECT id FROM provider_ref WHERE provider = 'antech-v6' AND type = 'breed' AND code = '834' ORDER BY id",
      )
      expect(redTailRows).toHaveLength(2)
      logSpy.mockClear()
      errorSpy.mockClear()
      await rerunMapping(connection)
      expect(await recorded(connection)).toBe(1)
      expect(mappingErrors()).toEqual([
        expect.stringMatching(
          new RegExp(`Breeds the list names that are in it more than once: 834 \\(provider_ref ${redTailRows.map((row) => row.id).join(', ')}\\)$`),
        ),
      ])
      expect(mappingLog()).toEqual([expect.stringMatching(redTailsSkipped)])
      await connection.query('DELETE FROM provider_ref WHERE id = ?', [redTailRows[1].id])
      expect(await antechV6Mappings(connection)).toEqual(whole)

      // A listed dmi ref that is not in this database: its row is skipped and the ref named.
      await connection.query("UPDATE ref SET code = CONCAT('x-', code) WHERE code = ?", [ADAMAWA_TURTLE_DOVE])
      logSpy.mockClear()
      errorSpy.mockClear()
      await rerunMapping(connection)
      expect(await recorded(connection)).toBe(1)
      const doveName = ANTECH_V6_BIRD_BREEDS.find(([code]) => code === ADAMAWA_TURTLE_DOVE)?.[1]
      expect(doveName).toBe('Adamawa Turtle Dove (Streptopelia hypopyrrha)')
      expect(mappingErrors()).toEqual([
        `1 dmi breed refs the list names are not in this database and are skipped: ${ADAMAWA_TURTLE_DOVE} (${doveName})`,
      ])
      expect(mappingLog()).toEqual([
        expect.stringMatching(
          /\(0 added, 25089 already mapped\), 0 other antech-v6 breed mappings replaced, 1 skipped, in \d+ ms$/,
        ),
      ])
      await connection.query('UPDATE ref SET code = ? WHERE code = ?', [ADAMAWA_TURTLE_DOVE, `x-${ADAMAWA_TURTLE_DOVE}`])
      expect(await antechV6Mappings(connection)).toEqual(whole)
    },
    120_000,
  )

  it(
    'reverted, it removes exactly the listed pairs and keeps the rest',
    async () => {
      if (!canRun || !testConnection) {
        return
      }

      const mappingsBefore = await allMappings(testConnection)
      const otherProvidersBefore = await otherProviderMappings(testConnection)

      logSpy.mockClear()
      await testConnection.undoLastMigration({ transaction: 'all' })

      expect(await recorded(testConnection)).toBe(0)
      expect(await allMappings(testConnection)).toBe(mappingsBefore - 25_090)
      const mappings = await antechV6Mappings(testConnection)
      expect(listedPairs(mappings)).toBe(0)
      expect(unlisted(mappings)).toEqual([[LABRADOR, ['370']]])
      expect(await otherProviderMappings(testConnection)).toBe(otherProvidersBefore)
      expect(mappingLog()).toEqual([
        expect.stringMatching(/^25090 of the list's 25090 dmi bird breed to antech-v6 breed mappings removed in \d+ ms$/),
      ])
    },
    120_000,
  )
})
