import { MigrationInterface, QueryRunner } from "typeorm"

const providerRefs = [
    {
        code: 'SF',
        name: 'Female Sterilized',
        species: null,
        type: 'sex',
        provider: 'antech',
        dmiCode: '428e84ec-081c-453c-90a8-d16f2f3bd89b'
    },
    {
        code: 'F',
        name: 'Female Intact',
        species: null,
        type: 'sex',
        provider: 'antech',
        dmiCode: 'f6ab2894-2505-4531-89e1-5fbbae69f12b'
    },
    {
        code: 'F',
        name: 'Female Unknown',
        species: null,
        type: 'sex',
        provider: 'antech',
        dmiCode: '73d846d0-f24a-41ef-9d25-1119a66d7655'
    },
    {
        code: 'CM',
        name: 'Male Sterilized',
        species: null,
        type: 'sex',
        provider: 'antech',
        dmiCode: 'd1d82fd2-7154-48b3-b01b-74c2d25ebf68'
    },
    {
        code: 'M',
        name: 'Male Intact',
        species: null,
        type: 'sex',
        provider: 'antech',
        dmiCode: '07e9f0f0-a76f-4f29-a1c0-9ca7b5b8b681'
    },
    {
        code: 'M',
        name: 'Male Unknown',
        species: null,
        type: 'sex',
        provider: 'antech',
        dmiCode: '9c7adefe-a8ca-4eac-b14a-bcbfb914aa1b'
    },
    {
        code: 'U',
        name: 'Unknown Unknown',
        species: null,
        type: 'sex',
        provider: 'antech',
        dmiCode: '6c4ee828-0ae9-4ca6-bf97-d34b951ced36'
    }
]
export class AntechSexCodes1703078439393 implements MigrationInterface {

    public async up (queryRunner: QueryRunner): Promise<void> {

        for (const ref of providerRefs) {
            const result = await queryRunner.query(`INSERT INTO \`ref\` (\`id\`, \`name\`, \`code\`, \`species\`, \`type\`)
                  VALUES (DEFAULT, ?, ?, ?, ?)`, [ref.name, ref.dmiCode, ref.species, ref.type])

            await queryRunner.query(`INSERT INTO \`provider_ref\` (\`id\`, \`code\`, \`name\`, \`species\`, \`type\`, \`provider\`, \`refId\`)
                  VALUES (DEFAULT, ?, ?, ?, ?, ?, ?)`, [ref.code, ref.name, ref.species, ref.type, ref.provider, result.insertId])
        }
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
        for (const ref of providerRefs) {
            await queryRunner.query(`DELETE FROM \`provider_ref\` WHERE \`code\` = ? AND \`provider\` = ?`, [ref.code, ref.provider])
            await queryRunner.query(`DELETE FROM \`ref\` WHERE \`code\` = ? AND \`type\` = ?`, [ref.dmiCode, ref.type])
        }
    }

}
