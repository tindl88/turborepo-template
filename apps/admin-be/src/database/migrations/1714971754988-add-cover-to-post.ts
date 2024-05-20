import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCoverToPost1714971754988 implements MigrationInterface {
  name = 'AddCoverToPost1714971754988';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" ADD "cover" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "cover"`);
  }
}
