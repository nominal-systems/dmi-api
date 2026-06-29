import { toFindOneOptions } from './find-one-of-type-options.interface'

describe('toFindOneOptions', () => {
  it('looks up by id while preserving other options (e.g. relations)', () => {
    expect(
      toFindOneOptions<any>({ id: 'abc', options: { relations: ['organization'] } })
    ).toEqual({ relations: ['organization'], where: { id: 'abc' } })
  })

  it('looks up by id when no options are provided', () => {
    expect(toFindOneOptions<any>({ id: 'abc' })).toEqual({ where: { id: 'abc' } })
  })

  it('AND-merges the id into an object where', () => {
    expect(
      toFindOneOptions<any>({ id: 'abc', options: { where: { email: 'x' } } })
    ).toEqual({ where: { email: 'x', id: 'abc' } })
  })

  it('AND-merges the id into every branch of an array (OR) where', () => {
    expect(
      toFindOneOptions<any>({ id: 'abc', options: { where: [{ a: 1 }, { b: 2 }] } })
    ).toEqual({ where: [{ a: 1, id: 'abc' }, { b: 2, id: 'abc' }] })
  })

  it('preserves an array (OR) where untouched when no id is given', () => {
    expect(
      toFindOneOptions<any>({ options: { where: [{ prodKey: 'k' }, { testKey: 'k' }] } })
    ).toEqual({ where: [{ prodKey: 'k' }, { testKey: 'k' }] })
  })

  it('preserves an object where untouched when no id is given', () => {
    expect(
      toFindOneOptions<any>({ options: { where: { email: 'x' } } })
    ).toEqual({ where: { email: 'x' } })
  })

  it('produces an undefined where when neither id nor where is given', () => {
    expect(toFindOneOptions<any>({}).where).toBeUndefined()
  })
})
