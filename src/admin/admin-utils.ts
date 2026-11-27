import { BadRequestException } from '@nestjs/common'
import { SubscriptionDeliveryResult } from '../events/interfaces/subscription-delivery-result.interface'
import { describeError } from '../common/utils/describe-error'
import { DeliveryResponse } from './interfaces/republish-report-response.interface'

export const DEFAULT_EVENTS_RANGE_MS = 24 * 60 * 60 * 1000
export const MAX_EVENTS_RANGE_DAYS = 31
// +1h tolerance so a 31-calendar-day local range spanning a fall-back DST transition is accepted.
export const MAX_EVENTS_RANGE_DST_TOLERANCE_MS = 60 * 60 * 1000
export const MAX_EVENTS_RANGE_MS = MAX_EVENTS_RANGE_DAYS * 24 * 60 * 60 * 1000 + MAX_EVENTS_RANGE_DST_TOLERANCE_MS
export const MAX_EVENTS_STATS_RANGE_DAYS = 2
export const MAX_EVENTS_STATS_RANGE_MS = MAX_EVENTS_STATS_RANGE_DAYS * 24 * 60 * 60 * 1000 + MAX_EVENTS_RANGE_DST_TOLERANCE_MS

export function resolveBoundedDateRange (
  startDate?: string,
  endDate?: string,
  now: Date = new Date(),
  maxRangeDays: number = MAX_EVENTS_RANGE_DAYS
): { start: Date, end: Date } {
  const parsedStart = startDate !== undefined ? new Date(startDate) : undefined
  if (parsedStart !== undefined && Number.isNaN(parsedStart.getTime())) {
    throw new BadRequestException('Invalid startDate')
  }

  const parsedEnd = endDate !== undefined ? new Date(endDate) : undefined
  if (parsedEnd !== undefined && Number.isNaN(parsedEnd.getTime())) {
    throw new BadRequestException('Invalid endDate')
  }

  const end = parsedEnd ?? now
  const start = parsedStart ?? new Date(end.getTime() - DEFAULT_EVENTS_RANGE_MS)

  if (start.getTime() > end.getTime()) {
    throw new BadRequestException('startDate must be before or equal to endDate')
  }

  const maxRangeMs = maxRangeDays * 24 * 60 * 60 * 1000 + MAX_EVENTS_RANGE_DST_TOLERANCE_MS
  if (end.getTime() - start.getTime() > maxRangeMs) {
    throw new BadRequestException(`Date range cannot exceed ${maxRangeDays} days`)
  }

  return { start, end }
}

export function getStatusRanges (statusCodes: string[]): Array<[number, number]> {
  const statusMap: { [key: string]: [number, number] } = {
    '2xx': [200, 299],
    '3xx': [300, 399],
    '4xx': [400, 499],
    '5xx': [500, 599]
  }

  const ranges: Array<[number, number]> = statusCodes.map(code => statusMap[code])

  // Function to merge consecutive ranges
  const mergeRanges = (ranges: Array<[number, number]>): Array<[number, number]> => {
    ranges.sort((a, b) => a[0] - b[0])
    const merged: Array<[number, number]> = []

    for (let i = 0; i < ranges.length; i++) {
      const [start, end] = ranges[i]
      if (merged.length === 0 || merged[merged.length - 1][1] < start - 1) {
        merged.push([start, end])
      } else {
        merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], end)
      }
    }

    return merged
  }

  return mergeRanges(ranges)
}

// Okta session user, else the jwt/Okta bearer subject ("Admin" with the jwt strategy)
export function getRequestedBy (user: any): string {
  return user?.profile?.username ?? user?.sub ?? 'unknown'
}

// The error stack stays in the server log
export function toDeliveryResponse (delivery: SubscriptionDeliveryResult): DeliveryResponse {
  if (delivery.status === 'error') {
    return { subscriptionId: delivery.subscriptionId, status: 'error', message: describeError(delivery.error) }
  }
  return delivery
}
