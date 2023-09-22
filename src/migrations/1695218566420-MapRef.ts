import { MigrationInterface, QueryRunner } from "typeorm"
import * as fs from 'fs'
import * as path from 'path'

const providerRefs = [
    {
        id: 1,
        code: 'M',
        name: 'Male',
        species: null,
        type: 'sex',
        provider: 'antech',
        ref: 1
    },
    {
        id: 2,
        code: 'MALE_INTACT',
        name: 'Male',
        species: null,
        type: 'sex',
        provider: 'idexx',
        ref: 1
    },
    {
        id: 3,
        code: 'F',
        name: 'Female',
        species: null,
        type: 'sex',
        provider: 'antech',
        ref: 2
    },
    {
        id: 4,
        code: 'FEMALE_INTACT',
        name: 'Female',
        species: null,
        type: 'sex',
        provider: 'idexx',
        ref: 2
    },
    {
        id: 5,
        code: 'U',
        name: 'Unknown',
        species: null,
        type: 'sex',
        provider: 'antech',
        ref: 3
    },
    {
        id: 6,
        code: 'UNKNOWN',
        name: 'Unknown',
        species: null,
        type: 'sex',
        provider: 'idexx',
        ref: 3
    },
    {
        id: 7,
        code: '41',
        name: 'Canine',
        species: null,
        type: 'species',
        provider: 'antech',
        ref: 4
    },
    {
        id: 8,
        code: 'BOVINE',
        name: 'Bovine',
        species: null,
        type: 'species',
        provider: 'idexx',
        ref: 7
    },
    {
        id: 9,
        code: '42',
        name: 'Feline',
        species: null,
        type: 'species',
        provider: 'antech',
        ref: 5
    },
    {
        id: 10,
        code: '45',
        name: 'Bovine',
        species: null,
        type: 'species',
        provider: 'antech',
        ref: 7
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
        id: 7,
        name: 'Bovine',
        code: 'BOVINE',
        species: null,
        type: 'species'
    }
]

export class MapRef1695218566420 implements MigrationInterface {

    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM `provider_ref`')
        await queryRunner.query('DELETE FROM `ref`')
        await queryRunner.query('ALTER TABLE `provider_ref` AUTO_INCREMENT = 1')
        await queryRunner.query('ALTER TABLE `ref` AUTO_INCREMENT = 1')
        await queryRunner.query("ALTER TABLE `provider_ref` MODIFY COLUMN `type` VARCHAR(100)")
        await queryRunner.query('ALTER TABLE `provider_ref` DROP FOREIGN KEY `FK_39f35ae0ad7d98da7164f61e2ff`')
        await queryRunner.query(`DROP INDEX \`idx_species_code\` ON \`provider_ref\``)
        const filePath = path.join(__dirname, 'csv/FelineAndCanineBreeds.csv')
        const fileContents = fs.readFileSync(filePath, 'utf-8')
        let ref
        for (const ref of refs) {
            await queryRunner.query(`INSERT INTO \`ref\` (\`id\`, \`name\`, \`code\`, \`species\`, \`type\`)
                  VALUES (?, ?, ?, ?, ?)`, [ref.id, ref.name, ref.code, ref.species, ref.type])
        }
        for (const providerRef of providerRefs) {
            await queryRunner.query(`INSERT INTO \`provider_ref\` (\`id\`, \`code\`, \`name\`, \`species\`, \`type\`, \`provider\`, \`refId\`)
                  VALUES (?, ?, ?, ?, ?, ?, ?)`, [providerRef.id, providerRef.code, providerRef.name, providerRef.species, providerRef.type, providerRef.provider, providerRef.ref])
        }

        const lines = fileContents.split('\n')

        for (const line of lines) {
            const uniqueCodes = new Array<string>()
            const [name, code, species, type, provider] = line.split(',')
            const trimmedProvider = provider.replace(/\n/g, '').trim()
            if (!uniqueCodes.includes(code)) {
                uniqueCodes.push(code)
                const formattedRef = {
                    name: name,
                    code: `${name.replace(/ /g, '_').toUpperCase()}_${species}`,
                    species: mapSpecies(species),
                    type: 'breed',
                }
                const newBreed = await queryRunner.query(`INSERT INTO \`ref\` (\`name\`, \`code\`, \`species\`, \`type\`)
                  VALUES (?, ?, ?, ?)`, [formattedRef.name, formattedRef.code, formattedRef.species, formattedRef.type])
                ref = newBreed.insertId
            } else {
                const existingBreed = await queryRunner.query(`
              SELECT "id" FROM "ref" WHERE "name" = $1;
            `, [name])
                console.log('existingBreed', existingBreed)
                ref = existingBreed.insertId
            }
            await queryRunner.query(`
            INSERT INTO provider_ref (name, code, species, type, provider, refId)
            VALUES (?, ?, ?, ?, ?, ?)`, [name, code, species, type, trimmedProvider, ref])
        }

        function mapSpecies (species: string | number) {
            if (species === '41' || species === 'CANINE' || species === 'DOG') {
                return 'CANIS_FAMILIARIS'
            } else if (species === '42' || species === 'FELINE' || species === 'CAT') {
                return 'FELIDAE'
            }
        }
    }


    public async down (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM `provider_ref`')
        await queryRunner.query('DELETE FROM `ref`')
        await queryRunner.query("ALTER TABLE `provider_ref` MODIFY COLUMN `type` VARCHAR(50)")
        await queryRunner.query('CREATE UNIQUE INDEX `idx_species_code` ON `provider_ref` (`code`)')
        await queryRunner.query(`ALTER TABLE \`provider_ref\` ADD CONSTRAINT \`FK_39f35ae0ad7d98da7164f61e2ff\` FOREIGN KEY (\`species\`) REFERENCES \`provider_ref\`(\`code\`) ON DELETE SET NULL ON UPDATE NO ACTION`)
    }
}
