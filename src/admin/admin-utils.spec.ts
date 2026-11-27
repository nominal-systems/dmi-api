import { BadRequestException } from '@nestjs/common'
import {
  DEFAULT_EVENTS_RANGE_MS,
  MAX_EVENTS_RANGE_DAYS,
  MAX_EVENTS_RANGE_MS,
  resolveBoundedDateRange,
} from './admin-utils'

describe('resolveBoundedDateRange', () => {
  const now = new Date('2026-10-01T12:00:00.000Z')

  it('defaults to the last 24 hours when both dates are omitted', () => {
    expect(resolveBoundedDateRange(undefined, undefined, now)).toEqual({
      start: new Date(now.getTime() - DEFAULT_EVENTS_RANGE_MS),
      end: now,
    })
  })

  it('defaults startDate to 24 hours before endDate when only endDate is given', () => {
    const endDate = '2026-09-15T08:00:00.000Z'
    const expectedEnd = new Date(endDate)

    expect(resolveBoundedDateRange(undefined, endDate, now)).toEqual({
      start: new Date(expectedEnd.getTime() - DEFAULT_EVENTS_RANGE_MS),
      end: expectedEnd,
    })
  })

  it('defaults endDate to now when only startDate is given within 31 days', () => {
    const startDate = '2026-09-10T12:00:00.000Z'

    expect(resolveBoundedDateRange(startDate, undefined, now)).toEqual({
      start: new Date(startDate),
      end: now,
    })
  })

  it('rejects when only startDate is given and is older than 31 days from now', () => {
    const startDate = new Date(now.getTime() - MAX_EVENTS_RANGE_MS - 1).toISOString()

    expect(() => resolveBoundedDateRange(startDate, undefined, now)).toThrow(BadRequestException)
  })

  it('accepts a 31-day range with up to 1h DST fall-back tolerance', () => {
    const startDate = '2026-08-31T12:00:00.000Z'
    const endDate = new Date(new Date(startDate).getTime() + MAX_EVENTS_RANGE_MS).toISOString()

    expect(resolveBoundedDateRange(startDate, endDate, now)).toEqual({
      start: new Date(startDate),
      end: new Date(endDate),
    })
  })

  it('rejects a range exceeding 31 days plus the 1h DST tolerance', () => {
    const startDate = '2026-08-31T12:00:00.000Z'
    const endDate = new Date(new Date(startDate).getTime() + MAX_EVENTS_RANGE_MS + 1).toISOString()

    expect(() => resolveBoundedDateRange(startDate, endDate, now)).toThrow(
      new BadRequestException(`Date range cannot exceed ${MAX_EVENTS_RANGE_DAYS} days`),
    )
  })

  it('rejects when startDate is after endDate', () => {
    expect(() =>
      resolveBoundedDateRange('2026-10-02T00:00:00.000Z', '2026-10-01T00:00:00.000Z', now),
    ).toThrow(BadRequestException)
  })

  it('rejects invalid startDate or endDate strings', () => {
    expect(() => resolveBoundedDateRange('not-a-date', undefined, now)).toThrow(BadRequestException)
    expect(() => resolveBoundedDateRange(undefined, 'not-a-date', now)).toThrow(BadRequestException)
  })

  it('accepts a literal 31-calendar-day America/Chicago fall-back DST range and rejects 1ms past the 1h tolerance', () => {
    const startDate = '2026-10-15T05:00:00.000Z'
    const validEnd = '2026-11-15T05:59:59.999Z'
    const oversizedEnd = '2026-11-15T06:00:00.001Z'

    expect(resolveBoundedDateRange(startDate, validEnd, now)).toEqual({
      start: new Date(startDate),
      end: new Date(validEnd),
    })
    expect(() => resolveBoundedDateRange(startDate, oversizedEnd, now)).toThrow(
      new BadRequestException('Date range cannot exceed 31 days'),
    )
  })
})
