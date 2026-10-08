import { Logger } from '@nestjs/common'
import { MigrationInterface, QueryRunner } from 'typeorm'
import { MapAntechRefs1699995684080 } from './1699995684080-MapAntechRefs'

// Breed codes per UPDATE statement.
const CHUNK_SIZE = 500

/**
 * MapAntechRefs1699995684080 seeded some 43,000 breed refs for classic Antech, and until it was
 * fixed it gave every one of them a NULL `species`: it looked the Antech species code up among the
 * dmi species names, which never matched. This gives a database seeded before the fix the species
 * the fixed seed gives a fresh one. Only refs whose `species` is still NULL are touched, so a
 * species set by hand since is kept. Breeds under Antech "Other species" have no dmi species and
 * stay NULL.
 */
export class BackfillSeededBreedSpecies1791472488885 implements MigrationInterface {
  name = 'BackfillSeededBreedSpecies1791472488885'
  private readonly logger = new Logger(BackfillSeededBreedSpecies1791472488885.name)

  public async up (queryRunner: QueryRunner): Promise<void> {
    const started = Date.now()
    const breedsBySpecies = seededBreedsBySpecies()
    const names = await speciesNames(queryRunner, [...breedsBySpecies.keys()])
    const missing = [...breedsBySpecies.keys()].filter(species => !names.has(species))
    if (missing.length > 0) {
      throw new Error(`No species ref with code ${missing.join(', ')}: the seeded breeds' species cannot be set`)
    }

    let total = 0
    for (const [species, codes] of breedsBySpecies) {
      let filled = 0
      for (const chunk of chunks(codes)) {
        const result = await queryRunner.query(
          `UPDATE \`ref\` SET \`species\` = ?
           WHERE \`type\` = 'breed' AND \`species\` IS NULL AND \`code\` IN (${placeholders(chunk)})`,
          [species, ...chunk],
          true,
        )
        filled += result.affected ?? 0
      }
      total += filled
      this.logger.log(`${names.get(species)} (${species}): species set on ${filled} of ${codes.length} seeded breeds`)
    }
    this.logger.log(`Species set on ${total} seeded breeds in ${Date.now() - started} ms`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const breedsBySpecies = seededBreedsBySpecies()
    const names = await speciesNames(queryRunner, [...breedsBySpecies.keys()])

    let total = 0
    for (const [species, codes] of breedsBySpecies) {
      let cleared = 0
      for (const chunk of chunks(codes)) {
        const result = await queryRunner.query(
          `UPDATE \`ref\` SET \`species\` = NULL
           WHERE \`type\` = 'breed' AND \`species\` = ? AND \`code\` IN (${placeholders(chunk)})`,
          [species, ...chunk],
          true,
        )
        cleared += result.affected ?? 0
      }
      total += cleared
      this.logger.log(`${names.get(species) ?? species} (${species}): species cleared on ${cleared} of ${codes.length} seeded breeds`)
    }
    this.logger.log(`Species cleared on ${total} seeded breeds`)
  }
}

// dmi species code -> the codes of the seeded breeds that belong to it.
function seededBreedsBySpecies (): Map<string, string[]> {
  const bySpecies = new Map<string, string[]>()
  for (const [code, species] of MapAntechRefs1699995684080.seededBreedSpecies()) {
    if (species === null) continue
    const codes = bySpecies.get(species) ?? []
    codes.push(code)
    bySpecies.set(species, codes)
  }
  return bySpecies
}

// code -> name of those of `codes` that are species refs.
async function speciesNames (queryRunner: QueryRunner, codes: string[]): Promise<Map<string, string>> {
  const rows: Array<{ code: string, name: string }> = await queryRunner.query(
    `SELECT \`code\`, \`name\` FROM \`ref\` WHERE \`type\` = 'species' AND \`code\` IN (${placeholders(codes)})`,
    codes,
  )
  return new Map(rows.map(row => [row.code, row.name]))
}

function * chunks (codes: string[]): Generator<string[]> {
  for (let i = 0; i < codes.length; i += CHUNK_SIZE) {
    yield codes.slice(i, i + CHUNK_SIZE)
  }
}

function placeholders (values: unknown[]): string {
  return values.map(() => '?').join(', ')
}
