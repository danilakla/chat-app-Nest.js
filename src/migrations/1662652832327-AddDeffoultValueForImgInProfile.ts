import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeffoultValueForImgInProfile1662652832327 implements MigrationInterface {
    name = 'AddDeffoultValueForImgInProfile1662652832327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "image" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "image" DROP DEFAULT`);
    }

}
