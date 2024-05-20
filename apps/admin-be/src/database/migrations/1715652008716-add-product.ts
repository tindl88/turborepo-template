import { MigrationInterface, QueryRunner } from 'typeorm';

const schema = process.env.AP_DB_SCHEMA;

export class AddProduct1715652008716 implements MigrationInterface {
  name = 'AddProduct1715652008716';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "${schema}"."products_status_enum" AS ENUM('published', 'draft', 'deleted')`);
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "name" character varying(255) NOT NULL, "slug" character varying(255) NOT NULL, "body" character varying, "status" "${schema}"."products_status_enum" NOT NULL DEFAULT 'draft', "cover" character varying, "creator_id" uuid, CONSTRAINT "UQ_464f927ae360106b783ed0b4106" UNIQUE ("slug"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "products_files" ("product_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "file_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "position" integer, CONSTRAINT "PK_0af1db78d5c9d67dec0cd9d9ccc" PRIMARY KEY ("product_id", "file_id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_db887c3b31abbbd920e303a0179" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "products_files" ADD CONSTRAINT "FK_1a3fa5ac08c408fb7888d6f6231" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "products_files" ADD CONSTRAINT "FK_a547c9f154932f00874a5b211ca" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products_files" DROP CONSTRAINT "FK_a547c9f154932f00874a5b211ca"`);
    await queryRunner.query(`ALTER TABLE "products_files" DROP CONSTRAINT "FK_1a3fa5ac08c408fb7888d6f6231"`);
    await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_db887c3b31abbbd920e303a0179"`);
    await queryRunner.query(`DROP TABLE "products_files"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TYPE "${schema}"."products_status_enum"`);
  }
}
