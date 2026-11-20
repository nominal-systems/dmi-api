import { isSameValue } from './same-value'

describe('isSameValue()', () => {
  it('should take null, undefined and an absent key for the same "no value"', () => {
    expect(isSameValue(null, undefined)).toBe(true)
    expect(isSameValue({ code: 'H', text: null }, { code: 'H' })).toBe(true)
    expect(isSameValue(null, '')).toBe(false)
    expect(isSameValue(null, 0)).toBe(false)
  })

  it('should compare object keys in any order', () => {
    expect(isSameValue({ units: 'mg/dL', value: 98.5 }, { value: 98.5, units: 'mg/dL' })).toBe(true)
    expect(isSameValue({ units: 'mg/dL', value: 98.5 }, { value: 98.6, units: 'mg/dL' })).toBe(false)
    expect(isSameValue({ value: 98.5 }, { value: 98.5, units: 'mg/dL' })).toBe(false)
  })

  it('should compare array elements in any order, each once', () => {
    const normal = { type: 'NORMAL', low: 70, high: 120 }
    const critical = { type: 'CRITICAL', low: 0, high: 40 }
    expect(isSameValue([normal, critical], [critical, normal])).toBe(true)
    expect(isSameValue([normal, normal], [normal, critical])).toBe(false)
    expect(isSameValue([normal], [normal, critical])).toBe(false)
    expect(isSameValue([], {})).toBe(false)
  })

  it('should take a number that is not finite for "no value", as JSON stores it', () => {
    expect(isSameValue(null, NaN)).toBe(true)
    expect(isSameValue(NaN, NaN)).toBe(true)
    expect(isSameValue(null, Infinity)).toBe(true)
    expect(isSameValue(undefined, -Infinity)).toBe(true)
    expect(isSameValue({ low: null, high: null }, { low: NaN, high: NaN })).toBe(true)
    expect(isSameValue(0, NaN)).toBe(false)
    expect(isSameValue('NaN', NaN)).toBe(false)
  })

  it('should take a number for the same number as a string, as a string or decimal column reads it back', () => {
    expect(isSameValue('12.50', 12.5)).toBe(true)
    expect(isSameValue('7', 7)).toBe(true)
    expect(isSameValue('-12.50', -12.5)).toBe(true)
    expect(isSameValue('+7', 7)).toBe(true)
    expect(isSameValue('12.51', 12.5)).toBe(false)
    expect(isSameValue('', 0)).toBe(false)
    expect(isSameValue('abc', 1)).toBe(false)
    // Two strings stay strings
    expect(isSameValue('007', '7')).toBe(false)
  })

  it('should take only a plain decimal string for a number', () => {
    expect(isSameValue('0x10', 16)).toBe(false)
    expect(isSameValue(' 5 ', 5)).toBe(false)
    expect(isSameValue('1e3', 1000)).toBe(false)
    expect(isSameValue('5.', 5)).toBe(false)
    expect(isSameValue('.5', 0.5)).toBe(false)
    expect(isSameValue('Infinity', Infinity)).toBe(false)
  })

  it('should compare dates by time', () => {
    expect(isSameValue(new Date('2026-01-05T09:30:00.000Z'), '2026-01-05T09:30:00.000Z')).toBe(true)
    expect(isSameValue(new Date('2026-01-05T09:30:00.000Z'), new Date('2026-01-05T09:30:01.000Z'))).toBe(false)
  })

  it('should tell different values apart', () => {
    expect(isSameValue('DONE', 'PENDING')).toBe(false)
    expect(isSameValue(true, 'true')).toBe(false)
    expect(isSameValue({ code: 'H' }, 'H')).toBe(false)
  })
})
