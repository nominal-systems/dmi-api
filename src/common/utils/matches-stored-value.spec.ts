import { matchesStoredValue } from './matches-stored-value'

describe('matchesStoredValue()', () => {
  it('should take null, undefined and an absent key for the same "no value"', () => {
    expect(matchesStoredValue(null, undefined)).toBe(true)
    expect(matchesStoredValue({ code: 'H', text: null }, { code: 'H' })).toBe(true)
    expect(matchesStoredValue(null, '')).toBe(false)
    expect(matchesStoredValue(null, 0)).toBe(false)
  })

  it('should compare object keys in any order', () => {
    expect(matchesStoredValue({ units: 'mg/dL', value: 98.5 }, { value: 98.5, units: 'mg/dL' })).toBe(true)
    expect(matchesStoredValue({ units: 'mg/dL', value: 98.5 }, { value: 98.6, units: 'mg/dL' })).toBe(false)
    expect(matchesStoredValue({ value: 98.5 }, { value: 98.5, units: 'mg/dL' })).toBe(false)
  })

  it('should compare array elements in any order, each once', () => {
    const normal = { type: 'NORMAL', low: 70, high: 120 }
    const critical = { type: 'CRITICAL', low: 0, high: 40 }
    expect(matchesStoredValue([normal, critical], [critical, normal])).toBe(true)
    expect(matchesStoredValue([normal, normal], [normal, critical])).toBe(false)
    expect(matchesStoredValue([normal], [normal, critical])).toBe(false)
    expect(matchesStoredValue([], {})).toBe(false)
  })

  it('should take a number that is not finite for "no value", as JSON stores it', () => {
    expect(matchesStoredValue(null, NaN)).toBe(true)
    expect(matchesStoredValue(NaN, NaN)).toBe(true)
    expect(matchesStoredValue(null, Infinity)).toBe(true)
    expect(matchesStoredValue(undefined, -Infinity)).toBe(true)
    expect(matchesStoredValue({ low: null, high: null }, { low: NaN, high: NaN })).toBe(true)
    expect(matchesStoredValue(0, NaN)).toBe(false)
    expect(matchesStoredValue('NaN', NaN)).toBe(false)
  })

  it('should take a number for the same number as a string, as a string or decimal column reads it back', () => {
    expect(matchesStoredValue('12.50', 12.5)).toBe(true)
    expect(matchesStoredValue('7', 7)).toBe(true)
    expect(matchesStoredValue('-12.50', -12.5)).toBe(true)
    expect(matchesStoredValue('+7', 7)).toBe(true)
    expect(matchesStoredValue('12.51', 12.5)).toBe(false)
    expect(matchesStoredValue('', 0)).toBe(false)
    expect(matchesStoredValue('abc', 1)).toBe(false)
    // Two strings stay strings
    expect(matchesStoredValue('007', '7')).toBe(false)
  })

  it('should take only a plain decimal string for a number', () => {
    expect(matchesStoredValue('0x10', 16)).toBe(false)
    expect(matchesStoredValue(' 5 ', 5)).toBe(false)
    expect(matchesStoredValue('1e3', 1000)).toBe(false)
    expect(matchesStoredValue('5.', 5)).toBe(false)
    expect(matchesStoredValue('.5', 0.5)).toBe(false)
    expect(matchesStoredValue('Infinity', Infinity)).toBe(false)
  })

  it('should compare dates by time', () => {
    expect(matchesStoredValue(new Date('2026-01-05T09:30:00.000Z'), '2026-01-05T09:30:00.000Z')).toBe(true)
    expect(matchesStoredValue(new Date('2026-01-05T09:30:00.000Z'), new Date('2026-01-05T09:30:01.000Z'))).toBe(false)
  })

  it('should tell different values apart', () => {
    expect(matchesStoredValue('DONE', 'PENDING')).toBe(false)
    expect(matchesStoredValue(true, 'true')).toBe(false)
    expect(matchesStoredValue({ code: 'H' }, 'H')).toBe(false)
  })
})
