import { customAlphabet } from 'nanoid'
import { alphanumeric } from 'nanoid-dictionary'
import { Integration } from '../../integrations/entities/integration.entity'

export default function generateAntechShortId (integration: Integration): string {
  const clinicId: string = integration.integrationOptions.ClinicID
  const antechFormatFirstPart = `${clinicId}-DMI`
  const nanoid = customAlphabet(alphanumeric, 20 - antechFormatFirstPart.length)

  return antechFormatFirstPart + nanoid()
}
