import { MigrationInterface, QueryRunner } from "typeorm"

const antechLabRequisitionParameters = [
    {
        name: 'DexSuppression',
        type: 'string',
        required: false,
        providerId: 'antech'
    },
    {
        name: 'CollectionMethod',
        type: 'string',
        required: false,
        providerId: 'antech'
    },
    {
        name: 'CultureSource',
        type: 'string',
        required: false,
        providerId: 'antech'
    },
    {
        name: 'HistoSource',
        type: 'string',
        required: false,
        providerId: 'antech'
    },
    {
        name: 'HistoPatientHistory',
        type: 'string',
        required: false,
        providerId: 'antech'
    },
    {
        name: 'HistoPathologistName',
        type: 'string',
        required: false,
        providerId: 'antech'
    },
    {
        name: 'HistoBiopsyType',
        type: 'string',
        required: false,
        providerId: 'antech'
    },
    {
        name: 'HistoTissue',
        type: 'string',
        required: false,
        providerId: 'antech'
    },
    {
        name: 'HistoContainerSize',
        type: 'string',
        required: false,
        providerId: 'antech'
    },
    {
        name: 'HistoSpecimens',
        type: 'string',
        required: false,
        providerId: 'antech'
    },
    {
        name: 'HistoAccessionID',
        type: 'string',
        required: false,
        providerId: 'antech'
    },
    {
        name: 'IsSpecialStaining',
        type: 'boolean',
        required: false,
        providerId: 'antech'
    },
    {
        name: 'HistoSpecialStaining',
        type: 'string',
        required: false,
        providerId: 'antech'
    }
]

export class LabRequisitionInfo1702391682687 implements MigrationInterface {
    name = 'LabRequisitionInfo1702391682687'

    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`provider_lab_requisition_parameter\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`required\` tinyint NOT NULL, \`providerId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`)
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`labRequisitionInfo\` json NULL`)
        await queryRunner.query(`ALTER TABLE \`provider_lab_requisition_parameter\` ADD CONSTRAINT \`FK_0817ef6614a52f6a8c67f01e822\` FOREIGN KEY (\`providerId\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)

        for (const labRequisition of antechLabRequisitionParameters) {
            await queryRunner.query(`INSERT INTO \`provider_lab_requisition_parameter\` (\`id\`, \`name\`, \`type\`, \`required\`, \`providerId\`)
                  VALUES (DEFAULT, ?, ?, ?, ?)`, [labRequisition.name, labRequisition.type, labRequisition.required, labRequisition.providerId])
        }
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`provider_lab_requisition_parameter\` DROP FOREIGN KEY \`FK_0817ef6614a52f6a8c67f01e822\``)
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`labRequisitionInfo\``)
        await queryRunner.query(`DROP TABLE \`provider_lab_requisition_parameter\``)
    }

}
