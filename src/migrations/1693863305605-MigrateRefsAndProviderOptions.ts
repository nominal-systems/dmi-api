import { MigrationInterface, QueryRunner } from "typeorm"

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
const providerRefs = [
  {
    id: 1,
    code: 'M',
    name: 'Male',
    species: null,
    type: 'sex',
    provider: 'antech'
  },
  {
    id: 2,
    code: 'MALE_INTACT',
    name: 'Male',
    species: null,
    type: 'sex',
    provider: 'idexx'
  },
  {
    id: 3,
    code: 'F',
    name: 'Female',
    species: null,
    type: 'sex',
    provider: 'antech'
  },
  {
    id: 4,
    code: 'FEMALE_INTACT',
    name: 'Female',
    species: null,
    type: 'sex',
    provider: 'idexx'
  },
  {
    id: 5,
    code: 'U',
    name: 'Unknown',
    species: null,
    type: 'sex',
    provider: 'antech'
  },
  {
    id: 6,
    code: 'UNKNOWN',
    name: 'Unknown',
    species: null,
    type: 'sex',
    provider: 'idexx'
  },
  {
    id: 7,
    code: 'CANINE',
    name: 'Canine',
    species: null,
    type: 'species',
    provider: 'idexx'
  },
  {
    id: 8,
    code: 'FELINE',
    name: 'Feline',
    species: null,
    type: 'species',
    provider: 'idexx'
  },
  {
    id: 9,
    code: 'BULL_TERRIER',
    name: 'Bull Terrier',
    species: 'CANINE',
    type: 'breed',
    provider: 'idexx'
  },
  {
    id: 10,
    code: '41',
    name: 'Canine',
    species: null,
    type: 'species',
    provider: 'antech'
  },
  {
    id: 11,
    code: 'BOVINE',
    name: 'Bovine',
    species: null,
    type: 'species',
    provider: 'idexx'
  },
  {
    id: 12,
    code: '74',
    name: 'Bull Terrier',
    species: '41',
    type: 'breed',
    provider: 'antech'
  },
  {
    id: 13,
    code: '42',
    name: 'Feline',
    species: null,
    type: 'species',
    provider: 'antech'
  },
  {
    id: 14,
    code: '45',
    name: 'Bovine',
    species: null,
    type: 'species',
    provider: 'antech'
  }
]
const refs = [
  {
    id: 1,
    name: 'Male',
    code: 'MALE',
    species: null,
    type: 'sex'
  },
  {
    id: 2,
    name: 'Female',
    code: 'FEMALE',
    species: null,
    type: 'sex'
  },
  {
    id: 3,
    name: 'Unknown',
    code: 'UNKNOWN',
    species: null,
    type: 'sex'
  },
  {
    id: 4,
    name: 'Canis familiaris',
    code: 'CANIS_FAMILIARIS',
    species: null,
    type: 'species'
  },
  {
    id: 5,
    name: 'Felidae',
    code: 'FELIDAE',
    species: null,
    type: 'species'
  },
  {
    id: 6,
    name: 'Bull Terrier',
    code: 'BULL_TERRIER',
    species: 'CANIS_FAMILIARIS',
    type: 'breed'
  },
  {
    id: 7,
    name: 'Bovine',
    code: 'BOVINE',
    species: null,
    type: 'species'
  }
]
const refsMap = [
  {
    id: 1,
    refId: 1,
    providerRefId: 1
  },
  {
    id: 2,
    refId: 1,
    providerRefId: 2
  },
  {
    id: 3,
    refId: 2,
    providerRefId: 3
  },
  {
    id: 4,
    refId: 2,
    providerRefId: 4
  },
  {
    id: 5,
    refId: 3,
    providerRefId: 5
  },
  {
    id: 6,
    refId: 3,
    providerRefId: 6
  },
  {
    id: 7,
    refId: 4,
    providerRefId: 7
  },
  {
    id: 8,
    refId: 4,
    providerRefId: 10
  },
  {
    id: 9,
    refId: 5,
    providerRefId: 8
  },
  {
    id: 10,
    refId: 5,
    providerRefId: 13
  },
  {
    id: 11,
    refId: 6,
    providerRefId: 9
  },
  {
    id: 12,
    refId: 6,
    providerRefId: 12
  },
  {
    id: 13,
    refId: 7,
    providerRefId: 11
  },
  {
    id: 14,
    refId: 7,
    providerRefId: 14
  }
]

export class MigrateRefsAndProviderOptions1693863305605 implements MigrationInterface {
  name = 'MigrateRefsAndProviderOptions1693863305605'

  public async up (queryRunner: QueryRunner): Promise<void> {
    for (const provider of providersData) {
      await queryRunner.query(`
                INSERT INTO \`provider\` (\`id\`, \`description\`)
                VALUES (?, ?)`, [provider.id, provider.description]
      )
      for (const configOption of provider.configurationOptions) {
        await queryRunner.query(`
                INSERT INTO \`provider_option\` (\`id\`, \`type\`, \`name\`, \`description\`, \`required\`, \`providerOptionType\`, \`providerId\`)
                VALUES (DEFAULT, ?, ?, ?, ?, 'configuration', ?)`, [configOption.type, configOption.name, configOption.description, configOption.required, provider.id]
        )
      }
      for (const intOption of provider.integrationOptions) {
        await queryRunner.query(`
                    INSERT INTO \`provider_option\` (\`id\`, \`type\`, \`name\`, \`description\`, \`required\`, \`providerOptionType\`, \`providerId\`)
                    VALUES (DEFAULT, ?, ?, ?, ?, 'integration', ?)`, [intOption.type, intOption.name, intOption.description, intOption.required, provider.id]
        )
      }
    }
    for (const providerRef of providerRefs) {
      await queryRunner.query(`INSERT INTO \`provider_ref\` (\`id\`, \`code\`, \`name\`, \`species\`, \`type\`, \`provider\`)
            VALUES (?, ?, ?, ?, ?, ?)`, [providerRef.id, providerRef.code, providerRef.name, providerRef.species, providerRef.type, providerRef.provider])
    }
    for (const ref of refs) {
      await queryRunner.query(`INSERT INTO \`ref\` (\`id\`, \`name\`, \`code\`, \`species\`, \`type\`)
            VALUES (?, ?, ?, ?, ?)`, [ref.id, ref.name, ref.code, ref.species, ref.type])
    }
    for (const refMap of refsMap) {
      await queryRunner.query(`INSERT INTO \`ref_map\` (\`id\`, \`refId\`, \`providerRefId\`)
            VALUES (?, ?, ?)`, [refMap.id, refMap.refId, refMap.providerRefId])
    }
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM `provider_option`')
    await queryRunner.query('DELETE FROM `ref_map`')
    await queryRunner.query('DELETE FROM `provider_ref`')
    await queryRunner.query('DELETE FROM `ref`')
  }

}
