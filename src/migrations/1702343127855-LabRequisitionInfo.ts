import { MigrationInterface, QueryRunner } from "typeorm"

export class LabRequisitionInfo1702343127855 implements MigrationInterface {
    name = 'LabRequisitionInfo1702343127855'

    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`lab_requisition_info\` (\`id\` char(36) NOT NULL, \`DexSuppression\` varchar(255) NULL, \`CollectionMethod\` varchar(255) NULL, \`CultureSource\` varchar(255) NULL, \`HistoSource\` varchar(255) NULL, \`HistoPatientHistory\` varchar(255) NULL, \`HistoPathologistName\` varchar(255) NULL, \`HistoBiopsyType\` varchar(255) NULL, \`HistoTissue\` varchar(255) NULL, \`HistoContainerSize\` varchar(255) NULL, \`HistoSpecimens\` varchar(255) NULL, \`HistoAccessionID\` varchar(255) NULL, \`IsSpecialStaining\` tinyint NULL, \`HistoSpecialStaining\` varchar(255) NULL, \`orderId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`)
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`labRequisitionInfoId\` char(36) NULL`)
        await queryRunner.query(`ALTER TABLE \`order\` ADD UNIQUE INDEX \`IDX_5465a749c678a468c03fd869d7\` (\`labRequisitionInfoId\`)`)
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_5465a749c678a468c03fd869d7\` ON \`order\` (\`labRequisitionInfoId\`)`)
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_5465a749c678a468c03fd869d7e\` FOREIGN KEY (\`labRequisitionInfoId\`) REFERENCES \`lab_requisition_info\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await queryRunner.query(`ALTER TABLE \`lab_requisition_info\` ADD CONSTRAINT \`FK_14cc6ece24763f4982dda00884c\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`)
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lab_requisition_info\` DROP FOREIGN KEY \`FK_14cc6ece24763f4982dda00884c\``)
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_5465a749c678a468c03fd869d7e\``)
        await queryRunner.query(`DROP INDEX \`REL_5465a749c678a468c03fd869d7\` ON \`order\``)
        await queryRunner.query(`ALTER TABLE \`order\` DROP INDEX \`IDX_5465a749c678a468c03fd869d7\``)
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`labRequisitionInfoId\``)
        await queryRunner.query(`DROP TABLE \`lab_requisition_info\``)
    }
}
