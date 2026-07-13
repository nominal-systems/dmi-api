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
    // Mark the order as orphan-created: it is matched only by a user-controlled,
    // potentially non-unique externalId, so the externalId match window applies
    // to it (issue #307). Submitted/provider-fetched orders are never marked.
    order.orphan = true
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

    // Check client last name — if present on either side, both must have it and
    // match. Absent on both sides is compatible: in-house analyzer results never
    // carry a client, so requiring one would reject every same-run reconciliation
    // and mint a new orphan order per poll.
    const existingLastName = existingOrder.client?.lastName
    const extractedLastName = extractedOrder.client?.lastName
    if (existingLastName || extractedLastName) {
      if (!existingLastName || !extractedLastName || existingLastName !== extractedLastName) return false
    }

    return true
  }

  private static getIdentifierValue (
    identifiers: Identifier[] | undefined,
    system: string
  ): string | undefined {
    return identifiers?.find(id => id.system === system)?.value
  }

  // Default time window (minutes) within which a result sharing an orphan order's
  // externalId is reconciled into it; beyond the window it is treated as a new
  // episode. Overridable via ORDER_MATCH_WINDOW_MINUTES. See issue #307.
  static readonly DEFAULT_MATCH_WINDOW_MINUTES = 60

  static getMatchWindowMs (): number {
    const minutes = Number(process.env.ORDER_MATCH_WINDOW_MINUTES ?? this.DEFAULT_MATCH_WINDOW_MINUTES)
    const safe = Number.isFinite(minutes) && minutes > 0 ? minutes : this.DEFAULT_MATCH_WINDOW_MINUTES
    return safe * 60_000
  }

  /**
   * An order is an orphan when it was created from an orphan result (see
   * extractOrderFromOrphanResult), i.e. matched only by a user-controlled,
   * potentially non-unique externalId such as a placeholder number or the pet's
   * name. Submitted and provider-fetched orders are NOT orphans (they carry a
   * unique externalId/requisitionId) and are therefore never subject to the
   * match window, so slow but legitimate lab results always reconcile to them.
   *
   * Note: this is keyed on the explicit `orphan` flag, not on requisitionId —
   * provider-fetched orders also lack a requisitionId, so inferring orphan
   * status from it would wrongly window them (issue #307 review).
   */
  static isOrphanOrder (order: Order): boolean {
    return order.orphan === true
  }

  /**
   * True when an orphan order's last activity is older than the match window,
   * meaning an incoming result that merely shares its externalId is a different
   * episode (e.g. externalId "1" or a reused pet name) and must not be
   * reconciled into it. Non-orphan orders and orders without a timestamp are
   * never considered stale.
   */
  static isStaleOrphanMatch (
    order: Order,
    windowMs: number = ProviderResultUtils.getMatchWindowMs(),
    now: number = Date.now()
  ): boolean {
    if (!this.isOrphanOrder(order)) return false
    const ts = order.updatedAt ?? order.createdAt
    if (ts == null) return false
    return now - new Date(ts).getTime() > windowMs
  }
}
