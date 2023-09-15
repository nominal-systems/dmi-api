import { MigrationInterface, QueryRunner } from "typeorm"

export class AttachmentEntity1694790099112 implements MigrationInterface {
    name = 'AttachmentEntity1694790099112'

    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`attachment\` (\`id\` char(36) NOT NULL, \`uri\` varchar(255) NULL, \`data\` text NULL, \`contentType\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`)
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`manifestUri\``)
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`manifestUri\` varchar(255) NULL`)
        await queryRunner.query(`DROP TABLE \`attachment\``)
    }

}
