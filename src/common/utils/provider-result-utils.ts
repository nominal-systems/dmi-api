import { OrderStatus, PimsIdentifiers, ProviderResult, ResultStatus } from '@nominal-systems/dmi-engine-common'
import { Order } from '../../orders/entities/order.entity'
import { Test } from '../../orders/entities/test.entity'
import { Patient } from '../../orders/entities/patient.entity'
import { Client } from '../../orders/entities/client.entity'
import { Veterinarian } from '../../orders/entities/veterinarian.entity'
import { Identifier } from '../../orders/entities/identifier.entity'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ProviderResultUtils {
  static extractOrderFromOrphanResult (
    result: ProviderResult,
    integrationId: string
  ): Order {
    const order = new Order()
    order.integrationId = integrationId
    if (result.order?.externalId !== undefined) {
      order.externalId = result.order?.externalId
    }
    this.setOrderStatusFromResult(result, order)
    order.tests = ProviderResultUtils.extractTestsFromProviderResult(result)
    if (result.order !== undefined) {
      if (result.order.patient !== undefined) {
        const patient = new Patient()
        patient.name = result.order.patient.name
        patient.sex = result.order.patient.sex
        patient.species = result.order.patient.species
        patient.breed = <string>result.order.patient.breed
        patient.identifier = result.order.patient.identifier as Identifier[]
        order.patient = patient
      }
      if (result.order.client !== undefined) {
        const client = new Client()
        client.firstName = result.order.client.firstName
        client.lastName = result.order.client.lastName
        client.identifier = result.order.client.identifier as Identifier[]
        order.client = client
      }
      if (result.order.veterinarian !== undefined) {
        const veterinarian = new Veterinarian()
        veterinarian.firstName = <string>result.order.veterinarian.firstName
        veterinarian.lastName = <string>result.order.veterinarian.lastName
        order.veterinarian = veterinarian
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

  static isMatchingOrder (
    existingOrder: Order,
    extractedOrder: Order
  ): boolean {
    // Check integrationId — must be present and equal on both sides
    if (!existingOrder.integrationId || !extractedOrder.integrationId) return false
    if (existingOrder.integrationId !== extractedOrder.integrationId) return false

    // Check patient name — must be present and equal on both sides
    if (!existingOrder.patient?.name || !extractedOrder.patient?.name) return false
    if (existingOrder.patient.name !== extractedOrder.patient.name) return false

    // Check patient ID — if present on either side, both must have it and match
    const existingPatientId = this.getIdentifierValue(existingOrder.patient?.identifier, PimsIdentifiers.PatientID)
    const extractedPatientId = this.getIdentifierValue(extractedOrder.patient?.identifier, PimsIdentifiers.PatientID)
    if (existingPatientId || extractedPatientId) {
      if (!existingPatientId || !extractedPatientId || existingPatientId !== extractedPatientId) return false
    }

    // Check client last name — must be present and equal on both sides
    if (!existingOrder.client?.lastName || !extractedOrder.client?.lastName) return false
    if (existingOrder.client.lastName !== extractedOrder.client.lastName) return false

    return true
  }

  private static getIdentifierValue (
    identifiers: Identifier[] | undefined,
    system: string
  ): string | undefined {
    return identifiers?.find(id => id.system === system)?.value
  }
}
