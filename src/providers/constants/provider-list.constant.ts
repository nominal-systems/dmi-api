import { Provider } from '../../common/typings/provider.interface'

const providers: Provider[] = [
  {
    id: 'idexx',
    description: 'IDEXX VetConnect Plus',
    providerConfigurationUri: '/providers/idexx/configurations',
    providerConfigurationOptions: [
      {
        type: 'string',
        name: 'orderingBaseUrl',
        description: 'Ordering Base URL',
        required: true
      },
      {
        type: 'string',
        name: 'resultBaseUrl',
        description: 'Result View Base URL',
        required: true
      },
      {
        type: 'string',
        name: 'username',
        description: 'IDEXX API Username',
        required: true
      },
      {
        type: 'string',
        name: 'password',
        description: 'IDEXX API Password',
        required: true
      }
    ],
    integrationOptions: [
      {
        type: 'string',
        name: 'X-Pims-Id',
        description: "PIMS ID set in request's header",
        required: true
      },
      {
        type: 'string',
        name: 'X-Pims-Version',
        description: "PIMS Version set in request's header",
        required: true
      }
    ]
  },
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
        required: true
      }
    ],
    integrationOptions: [
      {
        type: 'string',
        name: 'namespace',
        description: 'Practice Namespace',
        required: true
      }
    ]
  }
]

export default providers
