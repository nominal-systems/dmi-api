import { MigrationInterface, QueryRunner } from 'typeorm'

export class ResultsSequence1678656372812 implements MigrationInterface {
  name = 'ResultsSequence1678656372812'
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`dmi\`.\`test_result\` ADD \`seq\` int NULL`)
    await queryRunner.query(`ALTER TABLE \`dmi\`.\`observation\` ADD \`seq\` int NULL`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`dmi\`.\`observation\` DROP COLUMN \`seq\``)
    await queryRunner.query(`ALTER TABLE \`dmi\`.\`test_result\` DROP COLUMN \`seq\``)
  }

}
