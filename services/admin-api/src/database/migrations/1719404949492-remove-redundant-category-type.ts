import { MigrationInterface, QueryRunner } from 'typeorm';

const schema = process.env.AP_DB_SCHEMA;

export class RemoveRedundantCategoryType1719404949492 implements MigrationInterface {
  name = 'RemoveRedundantCategoryType1719404949492';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TYPE "${schema}"."categories_type_enum" RENAME TO "categories_type_enum_old"`);
    await queryRunner.query(`CREATE TYPE "${schema}"."categories_type_enum" AS ENUM('file', 'product', 'post')`);
    await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "type" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "categories" ALTER COLUMN "type" TYPE "${schema}"."categories_type_enum" USING "type"::"text"::"${schema}"."categories_type_enum"`
    );
    await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "type" SET DEFAULT 'post'`);
    await queryRunner.query(`DROP TYPE "${schema}"."categories_type_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "${schema}"."categories_type_enum_old" AS ENUM('uncategorized', 'file', 'product', 'post')`
    );
    await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "type" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "categories" ALTER COLUMN "type" TYPE "${schema}"."categories_type_enum_old" USING "type"::"text"::"${schema}"."categories_type_enum_old"`
    );
    await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "type" SET DEFAULT 'uncategorized'`);
    await queryRunner.query(`DROP TYPE "${schema}"."categories_type_enum"`);
    await queryRunner.query(`ALTER TYPE "${schema}"."categories_type_enum_old" RENAME TO "categories_type_enum"`);
  }
}
