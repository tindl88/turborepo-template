import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddImagesToPost1714920128367 implements MigrationInterface {
  name = 'AddImagesToPost1714920128367';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "posts_files" ("post_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "file_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "position" integer, CONSTRAINT "PK_665ff32ce92376131a723a6ba67" PRIMARY KEY ("post_id", "file_id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "posts_files" ADD CONSTRAINT "FK_21a3420139c27ee562d4a04aed3" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "posts_files" ADD CONSTRAINT "FK_847ed3dd8076e19eec9885c375e" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts_files" DROP CONSTRAINT "FK_847ed3dd8076e19eec9885c375e"`);
    await queryRunner.query(`ALTER TABLE "posts_files" DROP CONSTRAINT "FK_21a3420139c27ee562d4a04aed3"`);
    await queryRunner.query(`DROP TABLE "posts_files"`);
  }
}
