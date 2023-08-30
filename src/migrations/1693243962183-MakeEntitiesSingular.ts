import { MigrationInterface, QueryRunner } from 'typeorm'

export class MakeEntitiesSingular1693243962183 implements MigrationInterface {
  name = 'MakeEntitiesSingular1693243962183'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`RENAME TABLE \`providers\` TO \`provider\` `)
    await queryRunner.query(`RENAME TABLE \`refs\` TO \`ref\` `)
    await queryRunner.query(`RENAME TABLE \`refs_map\` TO \`ref_map\` `)
    await queryRunner.query(`RENAME TABLE \`provider_refs\` TO \`provider_ref\` `)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`RENAME TABLE \`provider_ref\` TO \`provider_refs\` `)
    await queryRunner.query(`RENAME TABLE \`ref_map\` TO \`refs_map\` `)
    await queryRunner.query(`RENAME TABLE \`ref\` TO \`refs\` `)
    await queryRunner.query(`RENAME TABLE \`provider\` TO \`providers\` `)
  }

}
