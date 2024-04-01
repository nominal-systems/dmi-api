import { v4 as uuidv4 } from 'uuid'
import { IE_MESSAGE_VERSION } from '../constants/api.constant'

interface IntergrationEngineOutgoingMessageData {
  providerConfiguration?: any
  integrationOptions?: any
  payload?: any
  autoSubmitOrder?: boolean
}

interface IntegrationEngineResultsData {
  clientId?: string
  results: any
}

interface IntergrationEngineOutgoingMessage {
  id: string
  version: string
  type: string
  data: IntergrationEngineOutgoingMessageData | IntegrationEngineResultsData
}

interface MessageAndPattern {
  messagePattern: string
  message: IntergrationEngineOutgoingMessage
}

interface Parameters {
  resource: string
  operation: string
  data: IntergrationEngineOutgoingMessageData | IntegrationEngineResultsData
}

export default function (providerId: string, params: Parameters): MessageAndPattern {
  const messagePattern = `${providerId}/${params.resource}/${params.operation}`
  console.log(`messagePattern= ${JSON.stringify(messagePattern, null, 2)}`) // TODO(gb): remove trace

  const message: IntergrationEngineOutgoingMessage = {
    id: uuidv4(),
    type: messagePattern,
    version: IE_MESSAGE_VERSION,
    data: params.data
  }

  return { messagePattern, message }
}
