interface IntergrationEngineOutgoingMessageData {
  providerConfiguration?: any
  integrationOptions?: any
  payload?: any
}

interface IntergrationEngineOutgoingMessage {
  resource: string
  operation: string
  data: IntergrationEngineOutgoingMessageData
}

interface MessageAndPattern {
  messagePattern: string
  message: IntergrationEngineOutgoingMessage
}

export default function (
  providerId: string,
  message: IntergrationEngineOutgoingMessage
): MessageAndPattern {
  const messagePattern = `${providerId}.${message.resource}.${message.operation}`

  return { messagePattern, message }
}
