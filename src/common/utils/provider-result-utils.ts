import { OrderStatus, ProviderResult, ResultStatus } from '@nominal-systems/dmi-engine-common'
import { Order } from '../../orders/entities/order.entity'
import { Test } from '../../orders/entities/test.entity'
import { Patient } from '../../orders/entities/patient.entity'
import { Client } from '../../orders/entities/client.entity'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ProviderResultUtils {
  static extractOrderFromOrphanResult (
    result: ProviderResult,
    integrationId: string
  ): Order {
    const order = new Order()
    order.integrationId = integrationId
    this.setOrderStatusFromResult(result, order)
    order.tests = ProviderResultUtils.extractTestsFromProviderResult(result)
    if (result.order !== undefined) {
      if (result.order.patient !== undefined) {
        const patient = new Patient()
        patient.name = result.order.patient.name
        patient.sex = result.order.patient.sex
        patient.species = result.order.patient.species
        patient.breed = <string>result.order.patient.breed
        order.patient = patient
      }
      if (result.order.client !== undefined) {
        const client = new Client()
        client.firstName = result.order.client.firstName
        client.lastName = result.order.client.lastName
        order.client = client
      }
      if (result.order.editable !== undefined) {
        order.editable = result.order.editable
      }
    }

    return order
  }

  // TODO(gb): refactor this to return order status
  static setOrderStatusFromResult (
    result: ProviderResult,
    order: Order
  ): void {
    if (result.status === ResultStatus.COMPLETED) {
      order.status = OrderStatus.COMPLETED
    } else if (result.status === ResultStatus.PARTIAL) {
      order.status = OrderStatus.PARTIAL
    }
  }

  static extractTestsFromProviderResult (
    result: ProviderResult
  ): Test[] {
    return Array.from(
      new Set(
        result.testResults
          .flatMap((testResult) => testResult.items)
          .map((item) => {
            return { code: item.code }
          })
      )
    )
  }
}
