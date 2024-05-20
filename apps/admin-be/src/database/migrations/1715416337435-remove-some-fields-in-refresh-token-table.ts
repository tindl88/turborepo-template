import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveSomeFieldsInRefreshTokenTable1715416337435 implements MigrationInterface {
  name = 'RemoveSomeFieldsInRefreshTokenTable1715416337435';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP COLUMN "replaced_by_token"`);
    await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP COLUMN "finger_print"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD "finger_print" character varying`);
    await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD "replaced_by_token" character varying`);
  }
}
