import { MigrationInterface, QueryRunner } from 'typeorm';

import { toSlug } from '@/common/utils/string.util';

const schema = process.env.AP_DB_SCHEMA;

export class AddCategorySlugAndMoreTypes1719239431309 implements MigrationInterface {
  name = 'AddCategorySlugAndMoreTypes1719239431309';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "categories" ADD "slug" character varying(255)`);
    await this.updateSlugs(queryRunner);
    await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "slug" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "UQ_420d9f679d41281f282f5bc7d09" UNIQUE ("slug")`);
    await queryRunner.query(`ALTER TYPE "${schema}"."categories_type_enum" RENAME TO "categories_type_enum_old"`);
    await queryRunner.query(
      `CREATE TYPE "${schema}"."categories_type_enum" AS ENUM('uncategorized', 'file', 'product', 'post')`
    );
    await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "type" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "categories" ALTER COLUMN "type" TYPE "${schema}"."categories_type_enum" USING "type"::"text"::"${schema}"."categories_type_enum"`
    );
    await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "type" SET DEFAULT 'uncategorized'`);
    await queryRunner.query(`DROP TYPE "${schema}"."categories_type_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "${schema}"."categories_type_enum_old" AS ENUM('uncategorized', 'file')`);
    await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "type" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "categories" ALTER COLUMN "type" TYPE "${schema}"."categories_type_enum_old" USING "type"::"text"::"${schema}"."categories_type_enum_old"`
    );
    await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "type" SET DEFAULT 'uncategorized'`);
    await queryRunner.query(`DROP TYPE "${schema}"."categories_type_enum"`);
    await queryRunner.query(`ALTER TYPE "${schema}"."categories_type_enum_old" RENAME TO "categories_type_enum"`);
    await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "UQ_420d9f679d41281f282f5bc7d09"`);
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "slug"`);
  }

  private async updateSlugs(queryRunner: QueryRunner): Promise<void> {
    const categories = await queryRunner.query(`SELECT id, name FROM "categories"`);

    for (const category of categories) {
      const slug = toSlug(category.name + '-' + category.id);

      await queryRunner.query(`UPDATE "categories" SET "slug" = $1 WHERE "id" = $2`, [slug, category.id]);
    }
  }
}
