import { Order as ExternalOrder } from '@nominal-systems/dmi-engine-common'
import { Order } from '../entities/order.entity'
import { externalOrderStatusMapper } from '../../common/utils/order-status.helper'
import { DeepPartial } from 'typeorm'

export class ExternalOrderMapper {
  public mapOrder (externalOrder: ExternalOrder, integrationId: string): DeepPartial<Order> {
    return {
      integrationId: integrationId,
      externalId: externalOrder.externalId,
      status: externalOrderStatusMapper(externalOrder.status),
      patient: externalOrder.patient,
      client: externalOrder.client,
      tests: externalOrder.tests,
      veterinarian: externalOrder.veterinarian,
      technician: externalOrder.technician,
      devices: externalOrder.devices,
      manifest: externalOrder.manifest,
      submissionUri: externalOrder.submissionUri,
      notes: externalOrder.notes,
      editable: externalOrder.editable
    }
  }
}
