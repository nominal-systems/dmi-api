import { MigrationInterface, QueryRunner } from "typeorm"

export class AttachmentEntity1695008719267 implements MigrationInterface {
    name = 'AttachmentEntity1695008719267'

    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`manifestUri\` \`manifestId\` varchar(255) NULL`)
        await queryRunner.query(`CREATE TABLE \`attachment\` (\`id\` char(36) NOT NULL, \`uri\` varchar(255) NULL, \`data\` text NULL, \`contentType\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`)
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`manifestId\``)
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`manifestId\` char(36) NULL`)
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_9ff9e6b4bc277c5dcfce57ba3d6\` FOREIGN KEY (\`manifestId\`) REFERENCES \`attachment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_9ff9e6b4bc277c5dcfce57ba3d6\``)
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`manifestId\``)
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`manifestId\` varchar(255) NULL`)
        await queryRunner.query(`DROP TABLE \`attachment\``)
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`manifestId\` \`manifestUri\` varchar(255) NULL`)
    }

}
