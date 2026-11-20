import { Logger } from '@nestjs/common'
import { MigrationInterface, QueryRunner } from 'typeorm'
import { ANTECH_V6_BIRD_BREEDS, ANTECH_V6_BIRD_BREED_SPECIES } from './data/antech-v6-bird-breeds'

const PROVIDER = 'antech-v6'

// Antech V6's bird species: 53 Psittacine, 107 Anseriforme, 108 Ciconiiforme, 109 Columbiforme,
// 112 Galliforme, 113 Gruiforme, 115 Passeriforme, 116 Pelecaniforme, 117 Phoenicopteriforme,
// 118 Piciforme, 119 Raptor, 120 Sphenisciforme.
const BIRD_SPECIES = new Set(['53', '107', '108', '109', '112', '113', '115', '116', '117', '118', '119', '120'])

// Codes per SELECT, pairs per DELETE or INSERT.
const CHUNK_SIZE = 500

// How many offending values an error names before it only counts the rest.
const NAMED_IN_ERROR = 20

interface ProviderBreed {
  id: number
  species: string | null
}

/**
 * Maps dmi's bird breed refs to the Antech V6 breeds they are, from the reviewed list in
 * ./data/antech-v6-bird-breeds.ts. dmi has one bird species, Avian; Antech V6 has twelve, each
 * with its own breeds, and refuses a breed under another species. An order sends the species of
 * the patient's mapped breed, so a bird whose breed is mapped here goes out as a pair Antech
 * accepts.
 *
 * The Antech breeds are `provider_ref` rows an operator's sync of the provider creates; no
 * migration seeds them. So:
 *  - a database with no antech-v6 breeds at all (a fresh one, or one that never synced the
 *    provider) gets nothing, and the log says so. This migration is now recorded as run: after
 *    syncing antech-v6, an operator applies the list by deleting this migration's row
 *    (MapBirdBreedsToAntechV61791985011716) from `migrations` and running migrations again.
 *  - otherwise a listed breed that is not there, is there more than once, is not under one of
 *    the twelve bird species, or is under another of them than the list expects
 *    (ANTECH_V6_BIRD_BREED_SPECIES), and a listed dmi ref that is not there, are logged at error
 *    level with their ids, the rows naming them are skipped, and the rest are mapped. A skipped
 *    bird keeps the Avian default it has today; a catalogue that has drifted from the list is
 *    something to look at, not something a deploy should fail over (migrations can run at
 *    start-up).
 *
 * A dmi ref holds one mapping per provider (the lookup takes the first), so a listed ref's other
 * antech-v6 breed mappings are replaced, not added beside. Its mappings to other providers, and
 * the mappings of refs the list does not name, are left alone. Re-running is a no-op.
 *
 * `down()` removes exactly the pairs the list names. It cannot bring back a mapping `up()`
 * replaced, and a pair that was already there by hand before `up()` goes with the rest.
 */
export class MapBirdBreedsToAntechV61791985011716 implements MigrationInterface {
  name = 'MapBirdBreedsToAntechV61791985011716'
  private readonly logger = new Logger(MapBirdBreedsToAntechV61791985011716.name)

  public async up (queryRunner: QueryRunner): Promise<void> {
    const started = Date.now()
    const breeds = await providerBreeds(queryRunner)
    if (breeds.size === 0) {
      this.logger.log(
        `This database has no ${PROVIDER} breeds (the provider's reference data was never synced): no bird breed mapped. ` +
        `This migration is now recorded as run: after syncing ${PROVIDER}, an operator applies the list by deleting ` +
        `this migration's row (${this.name}) from \`migrations\` and running migrations again.`,
      )
      return
    }

    const { ids: breedIds, problems } = listedBreedIds(breeds)
    if (problems.length > 0) {
      this.logger.error(
        `This database's ${PROVIDER} catalogue does not match the list; the rows naming these breeds are skipped. ` +
        `Breeds the list names that are ${problems.join('; ')}`,
      )
    }
    const refIds = await listedRefIds(queryRunner)
    const missingRefs = ANTECH_V6_BIRD_BREEDS.filter(([code]) => !refIds.has(code))
    if (missingRefs.length > 0) {
      this.logger.error(
        `${missingRefs.length} dmi breed refs the list names are not in this database and are skipped: ` +
        named(missingRefs.map(([code, name]) => `${code} (${name})`)),
      )
    }

    // dmi ref id -> the Antech V6 breed's provider_ref id, for the rows both sides resolve.
    const wanted = new Map<number, number>()
    let skipped = 0
    for (const [code, , breed] of ANTECH_V6_BIRD_BREEDS) {
      const refId = refIds.get(code)
      const breedId = breedIds.get(breed)
      if (refId === undefined || breedId === undefined) {
        skipped++
        continue
      }
      if (wanted.has(refId)) {
        throw new Error(`Refusing to map dmi bird breeds to Antech V6: the list names dmi breed ${code} twice`)
      }
      wanted.set(refId, breedId)
    }

    const stale: Array<[number, number]> = []
    for (const chunk of chunks([...wanted.keys()])) {
      const rows: Array<{ refId: number, providerRefId: number }> = await queryRunner.query(
        `SELECT j.\`refId\` AS refId, j.\`providerRefId\` AS providerRefId
         FROM \`provider_ref_ref\` j JOIN \`provider_ref\` pr ON pr.\`id\` = j.\`providerRefId\`
         WHERE pr.\`provider\` = ? AND pr.\`type\` = 'breed' AND j.\`refId\` IN (${placeholders(chunk)})`,
        [PROVIDER, ...chunk],
      )
      for (const row of rows) {
        if (wanted.get(row.refId) !== row.providerRefId) {
          stale.push([row.refId, row.providerRefId])
        }
      }
    }

    let replaced = 0
    for (const chunk of chunks(stale)) {
      replaced += await deletePairs(queryRunner, chunk)
    }

    let added = 0
    for (const chunk of chunks([...wanted])) {
      const result = await queryRunner.query(
        `INSERT IGNORE INTO \`provider_ref_ref\` (\`refId\`, \`providerRefId\`) VALUES ${chunk.map(() => '(?, ?)').join(', ')}`,
        chunk.flat(),
        true,
      )
      added += result.affected ?? 0
    }

    this.logger.log(
      `${ANTECH_V6_BIRD_BREEDS.length} dmi bird breeds in the list, ${wanted.size} mapped to their ${PROVIDER} breed ` +
      `(${added} added, ${wanted.size - added} already mapped), ${replaced} other ${PROVIDER} breed mappings replaced, ` +
      `${skipped} skipped, in ${Date.now() - started} ms`,
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const started = Date.now()
    const breeds = await providerBreeds(queryRunner)
    if (breeds.size === 0) {
      this.logger.log(`This database has no ${PROVIDER} breeds: no bird breed mapping to remove`)
      return
    }

    // A pair whose ref or breed is gone cannot be in the table either, so down() resolves what it
    // can and does not refuse.
    const refIds = await listedRefIds(queryRunner)
    const pairs: Array<[number, number]> = []
    for (const [code, , breed] of ANTECH_V6_BIRD_BREEDS) {
      const refId = refIds.get(code)
      for (const row of refId === undefined ? [] : breeds.get(breed) ?? []) {
        pairs.push([refId as number, row.id])
      }
    }

    let removed = 0
    for (const chunk of chunks(pairs)) {
      removed += await deletePairs(queryRunner, chunk)
    }
    this.logger.log(
      `${removed} of the list's ${ANTECH_V6_BIRD_BREEDS.length} dmi bird breed to ${PROVIDER} breed mappings removed ` +
      `in ${Date.now() - started} ms`,
    )
  }
}

// Antech V6 breed code -> its provider_ref rows (one, unless the catalogue is broken), by id.
async function providerBreeds (queryRunner: QueryRunner): Promise<Map<string, ProviderBreed[]>> {
  const rows: Array<{ id: number, code: string, species: string | null }> = await queryRunner.query(
    `SELECT \`id\`, \`code\`, \`species\` FROM \`provider_ref\` WHERE \`provider\` = ? AND \`type\` = 'breed' ORDER BY \`id\``,
    [PROVIDER],
  )
  const byCode = new Map<string, ProviderBreed[]>()
  for (const row of rows) {
    const found = byCode.get(row.code) ?? []
    found.push({ id: row.id, species: row.species })
    byCode.set(row.code, found)
  }
  return byCode
}

// Antech V6 breed code -> its provider_ref id, for every breed the list names that is there once,
// under the bird species the list expects; the others as problems to log.
function listedBreedIds (breeds: Map<string, ProviderBreed[]>): { ids: Map<string, number>, problems: string[] } {
  const ids = new Map<string, number>()
  const missing: string[] = []
  const notBird: string[] = []
  const otherSpecies: string[] = []
  const repeated: string[] = []
  for (const code of new Set(ANTECH_V6_BIRD_BREEDS.map(([, , breed]) => breed))) {
    const rows = breeds.get(code) ?? []
    const expected = ANTECH_V6_BIRD_BREED_SPECIES[code]
    if (rows.length === 0) {
      missing.push(code)
    } else if (rows.length > 1) {
      repeated.push(`${code} (provider_ref ${rows.map((row) => row.id).join(', ')})`)
    } else if (!BIRD_SPECIES.has(rows[0].species ?? '')) {
      notBird.push(`${code} (species ${rows[0].species ?? 'none'})`)
    } else if (rows[0].species !== expected) {
      otherSpecies.push(`${code} (species ${rows[0].species}, expected ${expected ?? 'none'})`)
    } else {
      ids.set(code, rows[0].id)
    }
  }

  const problems: string[] = []
  if (missing.length > 0) {
    problems.push(`not in it: ${named(missing)}`)
  }
  if (notBird.length > 0) {
    problems.push(`not under one of its bird species: ${named(notBird)}`)
  }
  if (otherSpecies.length > 0) {
    problems.push(`under another of its bird species than the list expects: ${named(otherSpecies)}`)
  }
  if (repeated.length > 0) {
    problems.push(`in it more than once: ${named(repeated)}`)
  }
  return { ids, problems }
}

// dmi breed code -> ref id, for the list's codes this database has.
async function listedRefIds (queryRunner: QueryRunner): Promise<Map<string, number>> {
  const ids = new Map<string, number>()
  for (const chunk of chunks(ANTECH_V6_BIRD_BREEDS.map(([code]) => code))) {
    const rows: Array<{ id: number, code: string }> = await queryRunner.query(
      `SELECT \`id\`, \`code\` FROM \`ref\` WHERE \`type\` = 'breed' AND \`code\` IN (${placeholders(chunk)})`,
      chunk,
    )
    for (const row of rows) {
      ids.set(row.code, row.id)
    }
  }
  return ids
}

async function deletePairs (queryRunner: QueryRunner, pairs: Array<[number, number]>): Promise<number> {
  const result = await queryRunner.query(
    `DELETE FROM \`provider_ref_ref\` WHERE (\`refId\`, \`providerRefId\`) IN (${pairs.map(() => '(?, ?)').join(', ')})`,
    pairs.flat(),
    true,
  )
  return result.affected ?? 0
}

function * chunks<T> (values: T[]): Generator<T[]> {
  for (let i = 0; i < values.length; i += CHUNK_SIZE) {
    yield values.slice(i, i + CHUNK_SIZE)
  }
}

function placeholders (values: unknown[]): string {
  return values.map(() => '?').join(', ')
}

function named (values: string[]): string {
  const shown = values.slice(0, NAMED_IN_ERROR).join(', ')
  return values.length > NAMED_IN_ERROR ? `${shown} and ${values.length - NAMED_IN_ERROR} more` : shown
}
