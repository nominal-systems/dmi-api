import { MigrationInterface, QueryRunner } from 'typeorm'

export class WisdomPanelKitCode1715005390487 implements MigrationInterface {

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO \`provider_lab_requisition_parameter\` (\`id\`, \`name\`, \`type\`, \`required\`, \`providerId\`) VALUES (DEFAULT, ?, ?, ?, ?)`, ['kitCode', 'string', true, 'wisdom-panel'])
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM \`provider_lab_requisition_parameter\` WHERE \`name\` = ? AND \`providerId\` = ?`, ['kitCode', 'wisdom-panel'])
  }
}
