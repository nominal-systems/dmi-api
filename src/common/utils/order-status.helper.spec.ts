import { isValidStatusChange } from './order-status.helper'
import { OrderStatus } from '@nominal-systems/dmi-engine-common'

describe('OrderStatusHelper', () => {
  it('should validate external status changes', () => {
    // External status: COMPLETED
    expect(isValidStatusChange(OrderStatus.COMPLETED, OrderStatus.COMPLETED)).toBe(false)
    expect(isValidStatusChange(OrderStatus.COMPLETED, OrderStatus.PARTIAL)).toBe(true)
    expect(isValidStatusChange(OrderStatus.COMPLETED, OrderStatus.SUBMITTED)).toBe(true)
    expect(isValidStatusChange(OrderStatus.COMPLETED, OrderStatus.ERROR)).toBe(false)
    expect(isValidStatusChange(OrderStatus.COMPLETED, OrderStatus.CANCELLED)).toBe(false)
    expect(isValidStatusChange(OrderStatus.COMPLETED, OrderStatus.WAITING_FOR_INPUT)).toBe(false)
    expect(isValidStatusChange(OrderStatus.COMPLETED, OrderStatus.ACCEPTED)).toBe(false)

    // TODO(gb): complete this test
  })
})
