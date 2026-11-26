import { BadRequestException } from '@nestjs/common'
import { SubscriptionDeliveryResult } from '../events/interfaces/subscription-delivery-result.interface'
import { describeError } from '../common/utils/describe-error'
import { DeliveryResponse } from './interfaces/republish-report-response.interface'

export const DEFAULT_EVENTS_RANGE_MS = 24 * 60 * 60 * 1000
export const MAX_EVENTS_RANGE_DAYS = 31
export const MAX_EVENTS_RANGE_MS = MAX_EVENTS_RANGE_DAYS * 24 * 60 * 60 * 1000

export function resolveBoundedDateRange (
  startDate?: string,
  endDate?: string,
  now: Date = new Date()
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

  if (end.getTime() - start.getTime() > MAX_EVENTS_RANGE_MS) {
    throw new BadRequestException(`Date range cannot exceed ${MAX_EVENTS_RANGE_DAYS} days`)
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
