import { Provider } from '../../common/typings/provider.interface'

const providers: Provider[] = [
  {
    id: 'antech',
    description: 'Antech',
    configurationUri: '/providers/antech/configurations',
    configurationOptions: [
      {
        type: 'string',
        name: 'baseUrl',
        description: 'Base URL',
        required: true
      },
      {
        type: 'string',
        name: 'UserName',
        description: 'Antech API Username',
        required: true
      },
      {
        type: 'string',
        name: 'Password',
        description: 'Antech API Password',
        required: true
      }
    ],
    integrationOptions: [
      {
        type: 'string',
        name: 'ClinicID',
        description: "Clinic ID used to login to Antech's API",
        required: true
      }
    ]
  },
  {
    id: 'idexx',
    description: 'IDEXX VetConnect Plus',
    configurationUri: '/providers/idexx/configurations',
    configurationOptions: [
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
    ],
    integrationOptions: [
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
    ]
  },
  {
    id: 'zoetis-v1',
    description: 'Zoetis Vetsync v1',
    configurationUri: '/providers/zoetis-v1/configurations',
    configurationOptions: [
      {
        type: 'string',
        name: 'url',
        description: 'Base URL',
        required: true
      },
      {
        type: 'string',
        name: 'clientId',
        description: 'FUSE Client ID',
        required: true
      },
      {
        type: 'string',
        name: 'clientPassword',
        description: 'FUSE Client Password',
        required: true
      }
    ],
    integrationOptions: []
  },
  {
    id: 'heska',
    description: 'Heska',
    configurationUri: '/providers/heska/configurations',
    configurationOptions: [
      {
        type: 'string',
        name: 'baseUrl',
        description: 'Base URL',
        required: true
      },
      {
        type: 'string',
        name: 'subscriptionKey',
        description: 'Heska Subscription Key',
        required: true
      }
    ],
    integrationOptions: [
      {
        type: 'string',
        name: 'clientId',
        description: 'Heska Client ID',
        required: true
      },
      {
        type: 'string',
        name: 'clientSecret',
        description: 'Heska Client Secret',
        required: true
      }
    ]
  },
  {
    id: 'demo',
    description: 'Demo Provider',
    configurationUri: '/providers/demo/configurations',
    configurationOptions: [
      {
        type: 'string',
        name: 'url',
        description: 'Demo Provider URL',
        required: true
      }
    ],
    integrationOptions: [
      {
        type: 'string',
        name: 'apiKey',
        description: 'API Key',
        required: true
      }
    ]
  }
]

export default providers
