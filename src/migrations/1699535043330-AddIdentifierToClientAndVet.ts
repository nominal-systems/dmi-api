import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIdentifierToClientAndVet1699535043330 implements MigrationInterface {
    name = 'AddIdentifierToClientAndVet1699535043330'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`identifier\` ADD \`clientId\` char(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`identifier\` ADD \`veterinarianId\` char(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`identifier\` ADD CONSTRAINT \`FK_d8a1b2c7b571e7ba9e4efd822e1\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`identifier\` ADD CONSTRAINT \`FK_5d038e964a9e34bdcc5dd98244e\` FOREIGN KEY (\`veterinarianId\`) REFERENCES \`veterinarian\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`identifier\` DROP FOREIGN KEY \`FK_5d038e964a9e34bdcc5dd98244e\``);
        await queryRunner.query(`ALTER TABLE \`identifier\` DROP FOREIGN KEY \`FK_d8a1b2c7b571e7ba9e4efd822e1\``);
        await queryRunner.query(`ALTER TABLE \`identifier\` DROP COLUMN \`veterinarianId\``);
        await queryRunner.query(`ALTER TABLE \`identifier\` DROP COLUMN \`clientId\``);
    }

}
