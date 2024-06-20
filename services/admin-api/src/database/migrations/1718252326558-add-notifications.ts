import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNotifications1718252326558 implements MigrationInterface {
  name = 'AddNotifications1718252326558';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "title" character varying(255) NOT NULL, "content" character varying(255) NOT NULL, "image" character varying, "topic" character varying, "scheduling" character varying, "channel_id" character varying, "sound" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "notifications"`);
  }
}
