import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeviceToken1718186009617 implements MigrationInterface {
  name = 'AddDeviceToken1718186009617';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "device_tokens" character varying array`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "device_tokens"`);
  }
}
