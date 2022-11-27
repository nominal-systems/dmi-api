import { MigrationInterface, QueryRunner } from "typeorm"

export class ObservationCreatedUpdatedTimestamps1669481033903 implements MigrationInterface {
  name = 'ObservationCreatedUpdatedTimestamps1669481033903'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`dmi\`.\`observation\`
        ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`)
    await queryRunner.query(`ALTER TABLE \`dmi\`.\`observation\`
        ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`dmi\`.\`observation\` DROP COLUMN \`updatedAt\``)
    await queryRunner.query(`ALTER TABLE \`dmi\`.\`observation\` DROP COLUMN \`createdAt\``)
  }

}
