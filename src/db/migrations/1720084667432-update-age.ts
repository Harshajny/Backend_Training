import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAge1720084667432 implements MigrationInterface {
    name = 'UpdateAge1720084667432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "age" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "age"`);
    }

}
