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
      const existing = buildOrder({ integrationId: 'int-1', patientName: 'Toby', clientLastName: 'Smith' })
      const extracted = buildOrder({ integrationId: 'int-1', patientName: 'Toby', clientLastName: 'Jones' })
      expect(ProviderResultUtils.isMatchingOrder(existing, extracted)).toBe(false)
    })

    it('should skip patient name check when either side is missing', () => {
      const existing = buildOrder({ integrationId: 'int-1' })
      const extracted = buildOrder({ integrationId: 'int-1', patientName: 'Toby' })
      expect(ProviderResultUtils.isMatchingOrder(existing, extracted)).toBe(true)
    })

    it('should skip patient ID check when either side is missing', () => {
      const existing = buildOrder({ integrationId: 'int-1', patientName: 'Toby' })
      const extracted = buildOrder({ integrationId: 'int-1', patientName: 'Toby', patientId: '123' })
      expect(ProviderResultUtils.isMatchingOrder(existing, extracted)).toBe(true)
    })

    it('should skip client last name check when either side is missing', () => {
      const existing = buildOrder({ integrationId: 'int-1', patientName: 'Toby', clientLastName: 'Smith' })
      const extracted = buildOrder({ integrationId: 'int-1', patientName: 'Toby' })
      expect(ProviderResultUtils.isMatchingOrder(existing, extracted)).toBe(true)
    })

    it('should return true when no fields are present to compare', () => {
      const existing = new Order()
      const extracted = new Order()
      expect(ProviderResultUtils.isMatchingOrder(existing, extracted)).toBe(true)
    })
  })
})
