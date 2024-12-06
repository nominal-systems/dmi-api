import {MigrationInterface, QueryRunner} from "typeorm";

export class ClientContact1733490175397 implements MigrationInterface {
    name = 'ClientContact1733490175397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`client\` ADD \`contactPhone\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`client\` ADD \`contactEmail\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`client\` DROP COLUMN \`contactEmail\``);
        await queryRunner.query(`ALTER TABLE \`client\` DROP COLUMN \`contactPhone\``);
    }

}
