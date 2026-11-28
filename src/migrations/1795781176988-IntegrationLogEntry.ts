import { MigrationInterface, QueryRunner } from 'typeorm'

/** The integration log (#306): who started, stopped, restarted or deleted an integration, and when. */
export class IntegrationLogEntry1795781176988 implements MigrationInterface {
  name = 'IntegrationLogEntry1795781176988'

  public async up (queryRunner: QueryRunner): Promise<void> {
    // integrationId is char(36), as integration.id is (and order.integrationId, its other foreign key)
    await queryRunner.query(`CREATE TABLE \`integration_log_entry\`
                             (
                               \`id\`            int                                            NOT NULL AUTO_INCREMENT,
                               \`integrationId\` char(36)                                       NOT NULL,
                               \`action\`        enum ('start', 'stop', 'restart', 'delete')    NOT NULL,
                               \`actorType\`     enum ('admin', 'organization', 'system')       NOT NULL,
                               \`actor\`         varchar(255)                                   NOT NULL,
                               \`error\`         text                                           NULL,
                               \`createdAt\`     datetime(3)                                    NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
                               INDEX \`IDX_78025ed55538353c34908a4cd1\` (\`integrationId\`, \`createdAt\`),
                               PRIMARY KEY (\`id\`)
                             ) ENGINE=InnoDB`)
    await queryRunner.query(`ALTER TABLE \`integration_log_entry\`
      ADD CONSTRAINT \`FK_9b895fd633f5b012473815fe9e6\` FOREIGN KEY (\`integrationId\`) REFERENCES \`integration\` (\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `integration_log_entry` DROP FOREIGN KEY `FK_9b895fd633f5b012473815fe9e6`')
    await queryRunner.query('DROP TABLE `integration_log_entry`')
  }
}
