import {MigrationInterface, QueryRunner} from "typeorm";

export class MakeEntitiesSingular1693243962183 implements MigrationInterface {
    name = 'MakeEntitiesSingular1693243962183'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`RENAME TABLE \`dmi\`.\`providers\` TO \`dmi\`.\`provider\` `);
        await queryRunner.query(`RENAME TABLE \`dmi\`.\`refs\` TO \`dmi\`.\`ref\` `);
        await queryRunner.query(`RENAME TABLE \`dmi\`.\`refs_map\` TO \`dmi\`.\`ref_map\` `);
        await queryRunner.query(`RENAME TABLE \`dmi\`.\`provider_refs\` TO \`dmi\`.\`provider_ref\` `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`RENAME TABLE \`dmi\`.\`provider_ref\` TO \`dmi\`.\`provider_refs\` `);
        await queryRunner.query(`RENAME TABLE \`dmi\`.\`ref_map\` TO \`dmi\`.\`refs_map\` `);
        await queryRunner.query(`RENAME TABLE \`dmi\`.\`ref\` TO \`dmi\`.\`refs\` `);
        await queryRunner.query(`RENAME TABLE \`dmi\`.\`provider\` TO \`dmi\`.\`providers\` `);
    }

}
