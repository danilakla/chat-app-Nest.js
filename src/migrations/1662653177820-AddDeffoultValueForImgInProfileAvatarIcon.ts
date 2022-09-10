import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeffoultValueForImgInProfileAvatarIcon1662653177820 implements MigrationInterface {
    name = 'AddDeffoultValueForImgInProfileAvatarIcon1662653177820'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "image" SET DEFAULT 'https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8='`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "image" SET DEFAULT true`);
    }

}
