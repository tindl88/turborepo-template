import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeviceToken1718190782922 implements MigrationInterface {
  name = 'AddDeviceToken1718190782922';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "device_tokens" text array`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "device_tokens"`);
  }
}
