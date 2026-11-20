import { isValidStatusChange, updateOrder } from './order-status.helper'
import { Client, Order as ExternalOrder, OrderStatus, Patient, Veterinarian } from '@nominal-systems/dmi-engine-common'
import { Order } from '../../orders/entities/order.entity'

describe('OrderStatusHelper', () => {
  describe('isValidStatusChange()', () => {
    it('should validate external status changes', () => {
      // External status: COMPLETED
      expect(isValidStatusChange(OrderStatus.COMPLETED, OrderStatus.COMPLETED)).toBe(false)
      expect(isValidStatusChange(OrderStatus.COMPLETED, OrderStatus.PARTIAL)).toBe(true)
      expect(isValidStatusChange(OrderStatus.COMPLETED, OrderStatus.SUBMITTED)).toBe(true)
      expect(isValidStatusChange(OrderStatus.COMPLETED, OrderStatus.ERROR)).toBe(false)
      expect(isValidStatusChange(OrderStatus.COMPLETED, OrderStatus.CANCELLED)).toBe(false)
      expect(isValidStatusChange(OrderStatus.COMPLETED, OrderStatus.WAITING_FOR_INPUT)).toBe(false)
      expect(isValidStatusChange(OrderStatus.COMPLETED, OrderStatus.ACCEPTED)).toBe(true)
      expect(isValidStatusChange(OrderStatus.PARTIAL, OrderStatus.ACCEPTED)).toBe(true)
    })
  })

  describe('updateOrder()', () => {
    const patient: Patient = {
      name: 'BRENDY',
      sex: 'M',
      species: 'Canine',
      breed: 'Saint Bernard'
    }
    const client: Client = {
      lastName: 'Arias',
      firstName: 'Edwin'
    }
    const veterinarian: Veterinarian = {
      lastName: 'Arias',
      firstName: 'Edwin'
    }
    const externalOrder: ExternalOrder = {
      externalId: '123',
      status: OrderStatus.ACCEPTED,
      patient,
      client,
      veterinarian,
      tests: [
        { code: 'SA665' }
      ]
    }
    it('should update if a status has changed', () => {
      const existingOrder = new Order()
      existingOrder.status = OrderStatus.ACCEPTED
      const updated = updateOrder(existingOrder, { ...externalOrder, status: OrderStatus.PARTIAL })
      expect(updated).toBe(true)
      expect(existingOrder.status).toBe(OrderStatus.PARTIAL)
    })

    it('should update with patient data', () => {
      const existingOrder = new Order()
      existingOrder.status = OrderStatus.ACCEPTED
      const updated = updateOrder(existingOrder, { ...externalOrder })
      expect(updated).toBe(true)
      expect(existingOrder.patient).toStrictEqual(patient)
    })

    it('should update with client data', () => {
      const existingOrder = new Order()
      existingOrder.status = OrderStatus.ACCEPTED
      const updated = updateOrder(existingOrder, { ...externalOrder })
      expect(updated).toBe(true)
      expect(existingOrder.client).toStrictEqual(client)
    })

    it('should update with veterinarian data', () => {
      const existingOrder = new Order()
      existingOrder.status = OrderStatus.ACCEPTED
      const updated = updateOrder(existingOrder, { ...externalOrder })
      expect(updated).toBe(true)
      expect(existingOrder.veterinarian).toStrictEqual(veterinarian)
    })

    it('should update with test data', () => {
      const existingOrder = new Order()
      existingOrder.status = OrderStatus.ACCEPTED
      existingOrder.tests = []
      const updated = updateOrder(existingOrder, { ...externalOrder })
      expect(updated).toBe(true)
      expect(existingOrder.tests).toHaveLength(externalOrder.tests.length)
    })

    // Issue #409: updateOrder reports what it changed, so a redelivered order is no update
    describe('redelivery of a stored order (issue #409)', () => {
      const storedOrder = (status: OrderStatus): Order => Object.assign(new Order(), {
        status,
        notes: null,
        patient: { id: 'patient-409', ...patient },
        client: { id: 'client-409', ...client },
        veterinarian: { id: 'veterinarian-409', ...veterinarian },
        tests: [{ code: 'SA665' }, { code: 'SA380' }]
      })

      it.each([OrderStatus.CANCELLED, OrderStatus.ERROR])('should not report a change when %s is delivered again', (status) => {
        const existingOrder = storedOrder(status)
        const updated = updateOrder(existingOrder, { ...externalOrder, status, tests: [{ code: 'SA665' }, { code: 'SA380' }] })
        expect(updated).toBe(false)
        expect(existingOrder.status).toBe(status)
      })

      it('should not report a change when the stored tests are delivered with a code listed twice', () => {
        // Tests are stored once per code, so the stored list stays shorter than the delivered one
        const existingOrder = storedOrder(OrderStatus.COMPLETED)
        const updated = updateOrder(existingOrder, {
          ...externalOrder,
          status: OrderStatus.COMPLETED,
          tests: [{ code: 'SA665' }, { code: 'SA380' }, { code: 'SA380' }]
        })
        expect(updated).toBe(false)
      })

      it('should report a change for a test code the order does not have', () => {
        const existingOrder = storedOrder(OrderStatus.COMPLETED)
        const updated = updateOrder(existingOrder, {
          ...externalOrder,
          status: OrderStatus.COMPLETED,
          tests: [{ code: 'SA665' }, { code: 'SA380' }, { code: 'T805' }]
        })
        expect(updated).toBe(true)
      })

      it('should not report changed notes alone as a change, though it writes them', () => {
        const existingOrder = storedOrder(OrderStatus.COMPLETED)
        const updated = updateOrder(existingOrder, {
          ...externalOrder,
          status: OrderStatus.COMPLETED,
          tests: [{ code: 'SA665' }],
          notes: 'Failure reason: sample-failed'
        })
        expect(updated).toBe(false)
        expect(existingOrder.notes).toBe('Failure reason: sample-failed')
      })
    })
  })
})
