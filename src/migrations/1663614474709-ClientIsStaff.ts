import {MigrationInterface, QueryRunner} from "typeorm";

export class ClientIsStaff1663614474709 implements MigrationInterface {
    name = 'ClientIsStaff1663614474709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dmi\`.\`client\` ADD \`isStaff\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dmi\`.\`client\` DROP COLUMN \`isStaff\``);
    }

}
