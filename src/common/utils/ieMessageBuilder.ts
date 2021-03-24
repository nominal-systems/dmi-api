import { v4 as uuidv4 } from 'uuid'
import { IE_MESSAGE_VERSION } from '../constants/api.constant'

interface IntergrationEngineOutgoingMessageData {
  providerConfiguration?: any
  integrationOptions?: any
  payload?: any
}

interface IntergrationEngineOutgoingMessage {
  id: string
  version: string
  type: string
  data: IntergrationEngineOutgoingMessageData
}

interface MessageAndPattern {
  messagePattern: string
  message: IntergrationEngineOutgoingMessage
}

interface Parameters {
  resource: string
  operation: string
  data: IntergrationEngineOutgoingMessageData
}

export default function (providerId: string, params: Parameters): MessageAndPattern {
  const messagePattern = `${providerId}.${params.resource}.${params.operation}`

  const message: IntergrationEngineOutgoingMessage = {
    id: uuidv4(),
    type: messagePattern,
    version: IE_MESSAGE_VERSION,
    data: params.data
  }

  return { messagePattern, message }
}
