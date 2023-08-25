import { MigrationInterface, QueryRunner } from 'typeorm'

const providersData = [
  {
    id: 'antech',
    description: 'Antech',
    configurationOptions: [
      {
        type: 'string',
        name: 'baseUrl',
        description: 'Base URL',
        required: true
      },
      {
        type: 'string',
        name: 'uiBaseUrl',
        description: 'UI Base URL',
        required: true
      }
    ],
    integrationOptions: [
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
      },
      {
        type: 'string',
        name: 'ClinicID',
        description: 'Clinic ID used to login to Antech\'s API',
        required: true
      }
    ]
  },
  {
    id: 'idexx',
    description: 'IDEXX VetConnect Plus',
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
        description: 'PIMS ID set in request\'s header',
        required: true
      },
      {
        type: 'string',
        name: 'X-Pims-Version',
        description: 'PIMS Version set in request\'s header',
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
      },
      {
        type: 'string',
        name: 'locale',
        description: 'Locale parsing',
        required: false
      }
    ]
  },
  {
    id: 'zoetis',
    description: 'Zoetis Vetsync v1',
    configurationOptions: [
      {
        type: 'string',
        name: 'baseUrl',
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
        name: 'partnerPassword',
        description: 'Partner Password',
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
    id: 'heska',
    description: 'Heska',
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

export class InsertProvidersData1692821015324 implements MigrationInterface {

  public async up (queryRunner: QueryRunner): Promise<void> {
    for (const provider of providersData) {
      const configurationOptionsJson = JSON.stringify(provider.configurationOptions)
      const integrationOptionsJson = JSON.stringify(provider.integrationOptions)

      await queryRunner.query(`
          INSERT INTO \`providers\` (\`id\`, \`description\`, \`configurationOptions\`, \`integrationOptions\`)
          VALUES (?, ?, ?, ?)`, [provider.id, provider.description, configurationOptionsJson, integrationOptionsJson]
      )
    }
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    for (const provider of providersData) {
      await queryRunner.query(`DELETE FROM \`providers\` WHERE \`id \` = '${provider.id}'`)
    }
  }

}
