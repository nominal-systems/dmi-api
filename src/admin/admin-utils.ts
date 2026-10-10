import { SubscriptionDeliveryResult } from '../events/interfaces/subscription-delivery-result.interface'
import { DeliveryResponse } from './interfaces/republish-report-response.interface'

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
    return { subscriptionId: delivery.subscriptionId, status: 'error', message: delivery.error.message }
  }
  return delivery
}
