import { MigrationInterface, QueryRunner } from 'typeorm'

export class ProviderRefIndices1706720024373 implements MigrationInterface {
  name = 'ProviderRefIndices1706720024373'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE INDEX \`IDX_3bd2988d54d898ddea90fdbb5d\` ON \`provider_ref\` (\`code\`)`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`IDX_3bd2988d54d898ddea90fdbb5d\` ON \`provider_ref\``)
  }

}
