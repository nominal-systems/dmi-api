export default [
  {
    id: 'zoetis-v1',
    description: 'Zoetis Vetsync v1',
    providerConfigurationUri: '/providers/first-provider/configurations',
    providerConfigurationOptions: [
      {
        type: 'string',
        name: 'url',
        description: 'Base URL',
        required: true,
      },
      {
        type: 'string',
        name: 'partnerId',
        description: 'Partner ID',
        required: true,
      },
      {
        type: 'string',
        name: 'partnerToken',
        description: 'Partner Token',
        required: true,
      },
    ],
    integrationOptions: [
      {
        type: 'string',
        name: 'clientId',
        description: 'FUSE Client ID',
        required: true,
      },
    ],
  },
  {
    id: 'second-provider',
    description: 'Second Provider',
    providerConfigurationUri: '/providers/second-provider/configurations',
    providerConfigurationOptions: [
      {
        type: 'string',
        name: 'url',
        description: 'Base URL',
        required: true,
      },
      {
        type: 'string',
        name: 'partnerId',
        description: 'Partner ID',
        required: true,
      },
      {
        type: 'string',
        name: 'partnerToken',
        description: 'Partner Token',
        required: true,
      },
    ],
    integrationOptions: [
      {
        type: 'string',
        name: 'clientId',
        description: 'FUSE Client ID',
        required: true,
      },
    ],
  },
]
