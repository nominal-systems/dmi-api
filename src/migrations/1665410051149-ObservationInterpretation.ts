import {MigrationInterface, QueryRunner} from "typeorm";

export class ObservationInterpretation1665410051149 implements MigrationInterface {
    name = 'ObservationInterpretation1665410051149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`observation\` DROP COLUMN \`interpretation\``);
        await queryRunner.query(`ALTER TABLE \`observation\` ADD \`interpretation\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`observation\` DROP COLUMN \`interpretation\``);
        await queryRunner.query(`ALTER TABLE \`observation\` ADD \`interpretation\` varchar(255) NULL`);
    }

}
