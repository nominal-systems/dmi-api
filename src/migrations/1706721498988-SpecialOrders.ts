import { MigrationInterface, QueryRunner } from 'typeorm'

export class SpecialOrders1706721498988 implements MigrationInterface {
  name = 'SpecialOrders1706721498988'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE \`provider_lab_requisition_parameter\` SET \`required\` = 1 WHERE \`name\` = ?`, ['CollectionMethod'])
    await queryRunner.query(`UPDATE \`provider_lab_requisition_parameter\` SET \`required\` = 1 WHERE \`name\` = ?`, ['HistoSource'])
    await queryRunner.query(`UPDATE \`provider_lab_requisition_parameter\` SET \`required\` = 1 WHERE \`name\` = ?`, ['HistoPatientHistory'])
    await queryRunner.query(`UPDATE \`provider_lab_requisition_parameter\` SET \`required\` = 1 WHERE \`name\` = ?`, ['HistoPathologistName'])
    await queryRunner.query(`UPDATE \`provider_lab_requisition_parameter\` SET \`required\` = 1 WHERE \`name\` = ?`, ['HistoBiopsyType'])
    await queryRunner.query(`UPDATE \`provider_lab_requisition_parameter\` SET \`required\` = 1 WHERE \`name\` = ?`, ['HistoTissue'])
    await queryRunner.query(`UPDATE \`provider_lab_requisition_parameter\` SET \`required\` = 1 WHERE \`name\` = ?`, ['HistoSpecimens'])
    await queryRunner.query(`UPDATE \`provider_lab_requisition_parameter\` SET \`required\` = 1 WHERE \`name\` = ?`, ['IsSpecialStaining'])
    await queryRunner.query(`UPDATE \`provider_lab_requisition_parameter\` SET \`required\` = 1 WHERE \`name\` = ?`, ['HistoSpecialStaining'])
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE \`provider_lab_requisition_parameter\` SET \`required\` = 0 WHERE \`name\` = ?`, ['CollectionMethod'])
    await queryRunner.query(`UPDATE \`provider_lab_requisition_parameter\` SET \`required\` = 0 WHERE \`name\` = ?`, ['HistoSource'])
    await queryRunner.query(`UPDATE \`provider_lab_requisition_parameter\` SET \`required\` = 0 WHERE \`name\` = ?`, ['HistoPatientHistory'])
    await queryRunner.query(`UPDATE \`provider_lab_requisition_parameter\` SET \`required\` = 0 WHERE \`name\` = ?`, ['HistoPathologistName'])
    await queryRunner.query(`UPDATE \`provider_lab_requisition_parameter\` SET \`required\` = 0 WHERE \`name\` = ?`, ['HistoBiopsyType'])
    await queryRunner.query(`UPDATE \`provider_lab_requisition_parameter\` SET \`required\` = 0 WHERE \`name\` = ?`, ['HistoTissue'])
    await queryRunner.query(`UPDATE \`provider_lab_requisition_parameter\` SET \`required\` = 0 WHERE \`name\` = ?`, ['HistoSpecimens'])
    await queryRunner.query(`UPDATE \`provider_lab_requisition_parameter\` SET \`required\` = 0 WHERE \`name\` = ?`, ['IsSpecialStaining'])
    await queryRunner.query(`UPDATE \`provider_lab_requisition_parameter\` SET \`required\` = 0 WHERE \`name\` = ?`, ['HistoSpecialStaining'])
  }

}
