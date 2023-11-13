import { MigrationInterface, QueryRunner } from 'typeorm'

const updatedRefs = [
    {
        id: 1,
        code: 'MALE',
        uuid: 'a6de9d9e-e3b9-4cc5-bfb4-68e33a8684ba',
    },
    {
        id: 2,
        code: 'FEMALE',
        uuid: 'bc93eac2-886a-47da-89b7-30e8e2d83e75',
    },
    {
        id: 3,
        code: 'UNKNOWN',
        uuid: 'b81354c6-9dca-46d1-91cb-b41c03ee3184',
    },
]

export class UpdateRefUuids1696004970921 implements MigrationInterface {

    public async up (queryRunner: QueryRunner): Promise<void> {
        for (const updatedRef of updatedRefs) {
            await queryRunner.query(
                'UPDATE `ref` SET `code` = ? WHERE `id` = ?',
                [updatedRef.uuid, updatedRef.id],
            )
        }
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
        for (const updatedRef of updatedRefs) {
            await queryRunner.query(
                'UPDATE `ref` SET `code` = ? WHERE `id` = ?',
                [updatedRef.code, updatedRef.id],
            )
        }
    }
}
