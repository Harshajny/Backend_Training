import { MigrationInterface, QueryRunner } from "typeorm";

export class AgeNull1720088768942 implements MigrationInterface {
    name = 'AgeNull1720088768942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "age" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "age" SET NOT NULL`);
    }

}
