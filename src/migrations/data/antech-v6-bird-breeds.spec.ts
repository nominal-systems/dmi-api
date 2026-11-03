import * as fs from 'fs'
import * as path from 'path'
import { ANTECH_V6_BIRD_BREEDS, ANTECH_V6_BIRD_BREED_SPECIES } from './antech-v6-bird-breeds'

// Antech V6's 12 bird species.
const BIRD_SPECIES = ['53', '107', '108', '109', '112', '113', '115', '116', '117', '118', '119', '120']

// The Antech V6 bird catalogue as its API serves it (the fixture the e2e spec syncs).
const CATALOGUE: { breeds: Array<{ code: string, name: string, species: string }> } = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../../test/e2e/fixtures/antech-v6-bird-catalogue.json'), 'utf8'),
)

// What 1699995684080-MapAntechRefs seeds: dmi ref code -> the name its ref gets (the first
// mappings line with that code), and the codes of its bird breeds (`type: 'breed'` lines with
// Antech species '43'). `mappings` is not exported, so it is read from the migration's source.
function seed (): { names: Map<string, string>, birdBreeds: Set<string> } {
  const source = fs.readFileSync(path.join(__dirname, '../1699995684080-MapAntechRefs.ts'), 'utf8')
  const start = source.indexOf('const mappings = [')
  const end = source.indexOf('\n]', start)
  const lines: string[][] = JSON.parse(source.slice(start + 'const mappings = '.length, end + 2))
  const names = new Map<string, string>()
  const birdBreeds = new Set<string>()
  for (const [name, code, , species, type] of lines) {
    if (!names.has(code)) {
      names.set(code, name)
    }
    if (type === 'breed' && species === '43') {
      birdBreeds.add(code)
    }
  }
  return { names, birdBreeds }
}

describe('the list of dmi bird breeds and their Antech V6 breeds', () => {
  const { names, birdBreeds } = seed()
  const breedIds = [...new Set(ANTECH_V6_BIRD_BREEDS.map(([, , breed]) => breed))]

  it('reads the seed', () => {
    expect(birdBreeds.size).toBe(31_412)
  })

  it('names every dmi ref once', () => {
    const counts = new Map<string, number>()
    for (const [code] of ANTECH_V6_BIRD_BREEDS) {
      counts.set(code, (counts.get(code) ?? 0) + 1)
    }
    expect([...counts].filter(([, count]) => count > 1)).toEqual([])
  })

  it('names only bird breed refs the seed creates, by the names the seed gives them', () => {
    expect(ANTECH_V6_BIRD_BREEDS.filter(([code]) => !birdBreeds.has(code))).toEqual([])
    expect(
      ANTECH_V6_BIRD_BREEDS
        .filter(([code, name]) => names.get(code) !== name)
        .map(([code, name]) => `${code}: listed ${name}, seeded ${names.get(code)}`),
    ).toEqual([])
  })

  it('gives every breed id it uses one of the bird species, and no breed id it does not use', () => {
    expect(breedIds.filter((breed) => !(breed in ANTECH_V6_BIRD_BREED_SPECIES))).toEqual([])
    expect(
      Object.entries(ANTECH_V6_BIRD_BREED_SPECIES).filter(([, species]) => !BIRD_SPECIES.includes(species)),
    ).toEqual([])
    expect(Object.keys(ANTECH_V6_BIRD_BREED_SPECIES).filter((breed) => !breedIds.includes(breed))).toEqual([])
  })

  it('agrees with Antech\'s catalogue on every breed id and its species', () => {
    const catalogue = new Map(CATALOGUE.breeds.map((breed) => [breed.code, breed.species]))
    expect(
      [...new Set([...breedIds, ...Object.keys(ANTECH_V6_BIRD_BREED_SPECIES)])]
        .filter((breed) => catalogue.get(breed) !== ANTECH_V6_BIRD_BREED_SPECIES[breed])
        .map((breed) => `${breed}: listed under ${ANTECH_V6_BIRD_BREED_SPECIES[breed] ?? 'none'}, catalogue ${catalogue.get(breed) ?? 'none'}`),
    ).toEqual([])
  })
})
