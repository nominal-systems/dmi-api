import { MigrationInterface, QueryRunner } from "typeorm"

export class ProviderConfigurationIntegrationCascade1676313736165 implements MigrationInterface {
  name = 'ProviderConfigurationIntegrationCascade1676313736165'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`dmi\`.\`integration\` DROP FOREIGN KEY \`FK_cacfc777ec2e3b2c1f76d35ed3c\``)
    await queryRunner.query(`ALTER TABLE \`dmi\`.\`provider_configuration\`
        ADD \`deletedAt\` datetime(6) NULL`)
    await queryRunner.query(`ALTER TABLE \`dmi\`.\`integration\`
        ADD CONSTRAINT \`FK_cacfc777ec2e3b2c1f76d35ed3c\` FOREIGN KEY (\`providerConfigurationId\`) REFERENCES \`dmi\`.\`provider_configuration\` (\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`dmi\`.\`integration\` DROP FOREIGN KEY \`FK_cacfc777ec2e3b2c1f76d35ed3c\``)
    await queryRunner.query(`ALTER TABLE \`dmi\`.\`provider_configuration\` DROP COLUMN \`deletedAt\``)
    await queryRunner.query(`ALTER TABLE \`dmi\`.\`integration\`
        ADD CONSTRAINT \`FK_cacfc777ec2e3b2c1f76d35ed3c\` FOREIGN KEY (\`providerConfigurationId\`) REFERENCES \`dmi\`.\`provider_configuration\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

}
