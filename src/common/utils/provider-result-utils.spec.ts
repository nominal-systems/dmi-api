import { ProviderResultUtils } from './provider-result-utils'
import { OrderStatus, PimsIdentifiers, ProviderResult } from '@nominal-systems/dmi-engine-common'
import { FileUtils } from './file-utils'
import { Order } from '../../orders/entities/order.entity'
import { Patient } from '../../orders/entities/patient.entity'
import { Client } from '../../orders/entities/client.entity'
import { Identifier } from '../../orders/entities/identifier.entity'

describe('ProviderResultUtils', () => {
  describe('extractOrderFromOrphanResult()', () => {
    it('should extract order from orphan result with no embedded order', () => {
      const result: ProviderResult = FileUtils.loadFile('test/idexx/results-drop-n-run-01.json')
      const order = ProviderResultUtils.extractOrderFromOrphanResult(result[0], 'integration A')
      expect(order).toBeDefined()
      expect(order).toEqual(expect.objectContaining(
        {
          integrationId: 'integration A',
          status: OrderStatus.COMPLETED,
          orphan: true,
          tests: [
            { code: 'fBNP' }
          ]
        }
      ))
    })
    it('should extract order from orphan result with embedded order', () => {
      const result: ProviderResult = FileUtils.loadFile('test/idexx/results-drop-n-run-02.json')
      const order = ProviderResultUtils.extractOrderFromOrphanResult(result[0], 'integration A')
      expect(order).toBeDefined()
      expect(order).toEqual(expect.objectContaining(
        {
          integrationId: 'integration A',
          status: OrderStatus.COMPLETED,
          tests: [
            { code: 'fBNP' }
          ]
        }
      ))
      expect(order).toHaveProperty('patient')
      expect(order).toHaveProperty('client')
      expect(order).toHaveProperty('editable')
    })
  })

  describe('isMatchingOrder()', () => {
    function buildOrder (overrides: {
      integrationId?: string,
      patientName?: string,
      patientId?: string,
      clientLastName?: string,
    } = {}): Order {
      const order = new Order()
      order.integrationId = overrides.integrationId as string

      if (overrides.patientName || overrides.patientId) {
        const patient = new Patient()
        patient.name = overrides.patientName as string
        patient.identifier = []
        if (overrides.patientId) {
          const id = new Identifier()
          id.system = PimsIdentifiers.PatientID
          id.value = overrides.patientId
          patient.identifier = [id]
        }
        order.patient = patient
      }

      if (overrides.clientLastName) {
        const client = new Client()
        client.lastName = overrides.clientLastName
        client.identifier = []
        order.client = client
      }

      return order
    }

    it('should return true when all fields match', () => {
      const existing = buildOrder({ integrationId: 'int-1', patientName: 'Toby', patientId: '123', clientLastName: 'Smith' })
      const extracted = buildOrder({ integrationId: 'int-1', patientName: 'Toby', patientId: '123', clientLastName: 'Smith' })
      expect(ProviderResultUtils.isMatchingOrder(existing, extracted)).toBe(true)
    })

    it('should return false when integrationId differs', () => {
      const existing = buildOrder({ integrationId: 'int-1', patientName: 'Toby' })
      const extracted = buildOrder({ integrationId: 'int-2', patientName: 'Toby' })
      expect(ProviderResultUtils.isMatchingOrder(existing, extracted)).toBe(false)
    })

    it('should return false when patient name differs', () => {
      const existing = buildOrder({ integrationId: 'int-1', patientName: 'Toby' })
      const extracted = buildOrder({ integrationId: 'int-1', patientName: 'Max' })
      expect(ProviderResultUtils.isMatchingOrder(existing, extracted)).toBe(false)
    })

    it('should return false when patient ID differs', () => {
      const existing = buildOrder({ integrationId: 'int-1', patientName: 'Toby', patientId: '123' })
      const extracted = buildOrder({ integrationId: 'int-1', patientName: 'Toby', patientId: '456' })
      expect(ProviderResultUtils.isMatchingOrder(existing, extracted)).toBe(false)
    })

    it('should return false when client last name differs', () => {
      const existing = buildOrder({ integrationId: 'int-1', patientName: 'Toby', patientId: '123', clientLastName: 'Smith' })
      const extracted = buildOrder({ integrationId: 'int-1', patientName: 'Toby', patientId: '123', clientLastName: 'Jones' })
      expect(ProviderResultUtils.isMatchingOrder(existing, extracted)).toBe(false)
    })

    it('should return false when patient name is missing on either side', () => {
      const existing = buildOrder({ integrationId: 'int-1' })
      const extracted = buildOrder({ integrationId: 'int-1', patientName: 'Toby' })
      expect(ProviderResultUtils.isMatchingOrder(existing, extracted)).toBe(false)
    })

    it('should return false when patient ID is present on one side but missing on the other', () => {
      const existing = buildOrder({ integrationId: 'int-1', patientName: 'Toby' })
      const extracted = buildOrder({ integrationId: 'int-1', patientName: 'Toby', patientId: '123', clientLastName: 'Smith' })
      expect(ProviderResultUtils.isMatchingOrder(existing, extracted)).toBe(false)
    })

    it('should skip patient ID check when absent on both sides', () => {
      const existing = buildOrder({ integrationId: 'int-1', patientName: 'Toby', clientLastName: 'Smith' })
      const extracted = buildOrder({ integrationId: 'int-1', patientName: 'Toby', clientLastName: 'Smith' })
      expect(ProviderResultUtils.isMatchingOrder(existing, extracted)).toBe(true)
    })

    it('should return false when client last name is present on one side but missing on the other', () => {
      const existing = buildOrder({ integrationId: 'int-1', patientName: 'Toby', patientId: '123', clientLastName: 'Smith' })
      const extracted = buildOrder({ integrationId: 'int-1', patientName: 'Toby', patientId: '123' })
      expect(ProviderResultUtils.isMatchingOrder(existing, extracted)).toBe(false)
    })

    it('should skip the client check when absent on both sides (in-house analyzer results carry no client)', () => {
      const existing = buildOrder({ integrationId: 'int-1', patientName: 'Toby', patientId: '123' })
      const extracted = buildOrder({ integrationId: 'int-1', patientName: 'Toby', patientId: '123' })
      expect(ProviderResultUtils.isMatchingOrder(existing, extracted)).toBe(true)
    })

    it('should return false when no fields are present to compare', () => {
      const existing = new Order()
      const extracted = new Order()
      expect(ProviderResultUtils.isMatchingOrder(existing, extracted)).toBe(false)
    })
  })

  describe('match window (issue #307)', () => {
    const mkOrphanOrder = (externalId: string, ageMinutes: number): Order => {
      const o = new Order()
      o.externalId = externalId
      o.orphan = true // created from an orphan result
      o.updatedAt = new Date(Date.now() - ageMinutes * 60_000)
      return o
    }

    it('treats an order with orphan=true as an orphan order', () => {
      const o = new Order(); o.externalId = '1'; o.orphan = true
      expect(ProviderResultUtils.isOrphanOrder(o)).toBe(true)
    })

    it('does NOT treat a submitted/provider-fetched order (orphan unset) as an orphan', () => {
      const o = new Order(); o.externalId = 'Jax' // orphan defaults to undefined/false
      expect(ProviderResultUtils.isOrphanOrder(o)).toBe(false)
    })

    it('does NOT treat a provider-fetched order (no requisitionId, orphan=false) as an orphan', () => {
      // Regression for #307 review #1: provider-fetched orders never set
      // requisitionId, so the old requisitionId heuristic wrongly windowed them.
      const o = new Order(); o.externalId = '117571776'; o.orphan = false
      expect(ProviderResultUtils.isOrphanOrder(o)).toBe(false)
    })

    it('orphan match within the window is NOT stale', () => {
      expect(ProviderResultUtils.isStaleOrphanMatch(mkOrphanOrder('1', 5))).toBe(false)
    })

    it('orphan match beyond the window IS stale', () => {
      expect(ProviderResultUtils.isStaleOrphanMatch(mkOrphanOrder('1', 120))).toBe(true)
    })

    it('provider-fetched order (no requisitionId, orphan=false) is never stale even when old', () => {
      // Regression for #307 review #1: a legitimate slow lab result must still
      // reconcile to a provider-fetched order created hours/days earlier.
      const o = new Order()
      o.externalId = '117571776' // unique provider order id, no requisitionId
      o.orphan = false
      o.updatedAt = new Date(Date.now() - 24 * 60 * 60_000) // a day old
      expect(ProviderResultUtils.isStaleOrphanMatch(o)).toBe(false)
    })

    it('submitted order (with requisitionId) is never stale even when old', () => {
      const o = new Order()
      o.externalId = 'Jax'
      o.requisitionId = 'VOY-1772927557555'
      o.updatedAt = new Date(Date.now() - 24 * 60 * 60_000)
      expect(ProviderResultUtils.isStaleOrphanMatch(o)).toBe(false)
    })

    it('an orphan order without timestamps is never stale', () => {
      const o = new Order(); o.externalId = '1'; o.orphan = true
      expect(ProviderResultUtils.isStaleOrphanMatch(o)).toBe(false)
    })

    it('respects an explicit window and now at the boundary', () => {
      const o = new Order(); o.externalId = '1'; o.orphan = true
      o.updatedAt = new Date(1_000_000)
      const windowMs = 60 * 60_000
      expect(ProviderResultUtils.isStaleOrphanMatch(o, windowMs, 1_000_000 + windowMs)).toBe(false)
      expect(ProviderResultUtils.isStaleOrphanMatch(o, windowMs, 1_000_000 + windowMs + 1)).toBe(true)
    })

    it('getMatchWindowMs defaults to 60 minutes and honours ORDER_MATCH_WINDOW_MINUTES', () => {
      const prev = process.env.ORDER_MATCH_WINDOW_MINUTES
      delete process.env.ORDER_MATCH_WINDOW_MINUTES
      expect(ProviderResultUtils.getMatchWindowMs()).toBe(60 * 60_000)
      process.env.ORDER_MATCH_WINDOW_MINUTES = '30'
      expect(ProviderResultUtils.getMatchWindowMs()).toBe(30 * 60_000)
      if (prev === undefined) {
        delete process.env.ORDER_MATCH_WINDOW_MINUTES
      } else {
        process.env.ORDER_MATCH_WINDOW_MINUTES = prev
      }
    })
  })
})
