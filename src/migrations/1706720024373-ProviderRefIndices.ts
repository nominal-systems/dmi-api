import { MigrationInterface, QueryRunner } from 'typeorm'

export class ProviderRefIndices1706720024373 implements MigrationInterface {
  name = 'ProviderRefIndices1706720024373'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`FK_39f35ae0ad7d98da7164f61e2ff\` ON \`provider_ref\``)
    await queryRunner.query(`CREATE INDEX \`IDX_3bd2988d54d898ddea90fdbb5d\` ON \`provider_ref\` (\`code\`)`)
    await queryRunner.query(`ALTER TABLE \`provider_ref\`
        ADD CONSTRAINT \`FK_39f35ae0ad7d98da7164f61e2ff\` FOREIGN KEY (\`species\`) REFERENCES \`provider_ref\` (\`code\`) ON DELETE SET NULL ON UPDATE NO ACTION`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`provider_ref\` DROP FOREIGN KEY \`FK_39f35ae0ad7d98da7164f61e2ff\``)
    await queryRunner.query(`DROP INDEX \`IDX_3bd2988d54d898ddea90fdbb5d\` ON \`provider_ref\``)
    await queryRunner.query(`CREATE INDEX \`FK_39f35ae0ad7d98da7164f61e2ff\` ON \`provider_ref\` (\`species\`)`)
  }

}
