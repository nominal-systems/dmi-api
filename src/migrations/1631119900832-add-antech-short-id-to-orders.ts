import {MigrationInterface, QueryRunner} from "typeorm";

export class addAntechShortIdToOrders1631119900832 implements MigrationInterface {
    name = 'addAntechShortIdToOrders1631119900832'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`diagnostic-modality-integration\`.\`order\` ADD \`antechShortId\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`diagnostic-modality-integration\`.\`order\` ADD UNIQUE INDEX \`IDX_8848212f79f56d319efbba702f\` (\`antechShortId\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`diagnostic-modality-integration\`.\`order\` DROP INDEX \`IDX_8848212f79f56d319efbba702f\``);
        await queryRunner.query(`ALTER TABLE \`diagnostic-modality-integration\`.\`order\` DROP COLUMN \`antechShortId\``);
    }

}
