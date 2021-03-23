export default [
  {
    id: 'zoetis-v1',
    description: 'Zoetis Vetsync v1',
    providerConfigurationUri: '/providers/zoetis-v1/configurations',
    providerConfigurationOptions: [
      {
        type: 'string',
        name: 'url',
        description: 'Base URL',
        required: true
      },
      {
        type: 'string',
        name: 'partnerId',
        description: 'Partner ID',
        required: true
      },
      {
        type: 'string',
        name: 'partnerToken',
        description: 'Partner Token',
        required: true
      }
    ],
    integrationOptions: [
      {
        type: 'string',
        name: 'clientId',
        description: 'FUSE Client ID',
        required: true
      }
    ]
  },
  {
    id: 'demo',
    description: 'Demo Provider',
    providerConfigurationUri: '/providers/demo/configurations',
    providerConfigurationOptions: [
      {
        type: 'string',
        name: 'token',
        description: 'Demo Token',
        required: true,
      },
    ],
    integrationOptions: [
      {
        type: 'string',
        name: 'namespace',
        description: 'Practice Namespace',
        required: true,
      },
    ],
  }
]
