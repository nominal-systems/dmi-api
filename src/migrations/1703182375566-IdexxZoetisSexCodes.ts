import { MigrationInterface, QueryRunner } from "typeorm"

const providerRefs = [
    {
        code: 'FEMALE_SPAYED',
        name: 'Female Spayed',
        species: null,
        type: 'sex',
        provider: 'idexx',
        dmiCode: '428e84ec-081c-453c-90a8-d16f2f3bd89b'
    },
    {
        code: 'FEMALE_INTACT',
        name: 'Female',
        species: null,
        type: 'sex',
        provider: 'idexx',
        dmiCode: 'f6ab2894-2505-4531-89e1-5fbbae69f12b'
    },
    {
        code: 'MALE_NEUTERED',
        name: 'Male Neutered',
        species: null,
        type: 'sex',
        provider: 'idexx',
        dmiCode: 'd1d82fd2-7154-48b3-b01b-74c2d25ebf68'
    },
    {
        code: 'MALE_INTACT',
        name: 'Male',
        species: null,
        type: 'sex',
        provider: 'idexx',
        dmiCode: '07e9f0f0-a76f-4f29-a1c0-9ca7b5b8b681'
    },
    {
        code: 'UNKNOWN',
        name: 'Unknown',
        species: null,
        type: 'sex',
        provider: 'idexx',
        dmiCode: '6c4ee828-0ae9-4ca6-bf97-d34b951ced36'
    },
    {
        code: 'FEMALE',
        name: 'Female',
        species: null,
        type: 'sex',
        provider: 'zoetis',
        dmiCode: 'f6ab2894-2505-4531-89e1-5fbbae69f12b'
    },
    {
        code: 'FEMALE_SPAYED',
        name: 'Female Spayed',
        species: null,
        type: 'sex',
        provider: 'zoetis',
        dmiCode: '428e84ec-081c-453c-90a8-d16f2f3bd89b'
    }, {
        code: 'MALE_NEUTERED',
        name: 'Male Neutered',
        species: null,
        type: 'sex',
        provider: 'zoetis',
        dmiCode: 'd1d82fd2-7154-48b3-b01b-74c2d25ebf68'
    },
    {
        code: 'MALE',
        name: 'Male',
        species: null,
        type: 'sex',
        provider: 'zoetis',
        dmiCode: '07e9f0f0-a76f-4f29-a1c0-9ca7b5b8b681'
    },
    {
        code: 'UNKNOWN',
        name: 'Unknown',
        species: null,
        type: 'sex',
        provider: 'zoetis',
        dmiCode: '6c4ee828-0ae9-4ca6-bf97-d34b951ced36'
    },
    {
        code: 'MALE',
        name: 'Male',
        species: null,
        type: 'sex',
        provider: 'zoetis',
        dmiCode: 'a6de9d9e-e3b9-4cc5-bfb4-68e33a8684ba'
    },
    {
        code: 'FEMALE',
        name: 'Female',
        species: null,
        type: 'sex',
        provider: 'zoetis',
        dmiCode: 'bc93eac2-886a-47da-89b7-30e8e2d83e75'
    },
    {
        code: 'UNKNOWN',
        name: 'Unknown',
        species: null,
        type: 'sex',
        provider: 'zoetis',
        dmiCode: 'b81354c6-9dca-46d1-91cb-b41c03ee3184'
    },
    {
        code: 'MALE_INTACT',
        name: 'Male',
        species: null,
        type: 'sex',
        provider: 'idexx',
        dmiCode: 'a6de9d9e-e3b9-4cc5-bfb4-68e33a8684ba'
    },
    {
        code: 'FEMALE_INTACT',
        name: 'Female',
        species: null,
        type: 'sex',
        provider: 'idexx',
        dmiCode: 'bc93eac2-886a-47da-89b7-30e8e2d83e75'
    },
    {
        code: 'UNKNOWN',
        name: 'Unknown',
        species: null,
        type: 'sex',
        provider: 'idexx',
        dmiCode: 'b81354c6-9dca-46d1-91cb-b41c03ee3184'
    }
]

export class IdexxZoetisSexCodes1703182375566 implements MigrationInterface {

    public async up (queryRunner: QueryRunner): Promise<void> {
        for (const ref of providerRefs) {
            const result = await queryRunner.query(`SELECT id from ref WHERE code = ? AND type = ?`, [ref.dmiCode, ref.type])
            await queryRunner.query(`INSERT INTO \`provider_ref\` (\`id\`, \`code\`, \`name\`, \`species\`, \`type\`, \`provider\`, \`refId\`)
                  VALUES (DEFAULT, ?, ?, ?, ?, ?, ?)`, [ref.code, ref.name, ref.species, ref.type, ref.provider, result[0].id])
        }
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
        for (const ref of providerRefs) {
            await queryRunner.query(`DELETE FROM \`provider_ref\` WHERE \`code\` = ? AND \`provider\` = ? AND \`name\` = ?`, [ref.code, ref.provider, ref.name])
        }
    }

}
