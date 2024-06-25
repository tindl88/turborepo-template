import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCategoryToPostAndProduct1719306621903 implements MigrationInterface {
  name = 'AddCategoryToPostAndProduct1719306621903';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" ADD "category_id" uuid`);
    await queryRunner.query(`ALTER TABLE "posts" ADD "category_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_852f266adc5d67c40405c887b49" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_852f266adc5d67c40405c887b49"`);
    await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`);
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "category_id"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "category_id"`);
  }
}
