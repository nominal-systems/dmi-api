import { MigrationInterface, QueryRunner } from 'typeorm'

export class ExtraIndexes1743077792945 implements MigrationInterface {
  name = 'ExtraIndexes1743077792945'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE INDEX \`IDX_8e25ef6239bd5cc464687dc23f\` ON \`integration\` (\`deletedAt\`)`)
    await queryRunner.query(`CREATE INDEX \`IDX_1fac66d8a6aa812d300d112c1a\` ON \`order\` (\`requisitionId\`)`)
    await queryRunner.query(`CREATE INDEX \`IDX_3003f398edfab7949d93e44775\` ON \`order\` (\`externalId\`)`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`IDX_3003f398edfab7949d93e44775\` ON \`order\``)
    await queryRunner.query(`DROP INDEX \`IDX_1fac66d8a6aa812d300d112c1a\` ON \`order\``)
    await queryRunner.query(`DROP INDEX \`IDX_8e25ef6239bd5cc464687dc23f\` ON \`integration\``)
  }

}
