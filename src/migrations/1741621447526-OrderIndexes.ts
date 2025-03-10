import { MigrationInterface, QueryRunner } from 'typeorm'

export class OrderIndexes1741621447526 implements MigrationInterface {
  name = 'OrderIndexes1741621447526'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE INDEX \`IDX_46b63029cfc05e58638a59f687\` ON \`order\` (\`externalId\`, \`requisitionId\`)`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`IDX_46b63029cfc05e58638a59f687\` ON \`order\``)
  }

}
