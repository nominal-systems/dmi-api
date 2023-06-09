import { ProviderResultUtils } from './provider-result-utils'
import { OrderStatus, ProviderResult } from '@nominal-systems/dmi-engine-common'
import { FileUtils } from './file-utils'

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
})
