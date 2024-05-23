import { MigrationInterface, QueryRunner } from 'typeorm';

import { Post } from '@/modules/posts/entities/post.entity';

import { postFactory } from '../factories/dev/post.factory';

const isProd = process.env.NODE_ENV === 'production';

export class CreatePosts1689265410983 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (isProd) return;

    await queryRunner.manager.getRepository(Post).save(postFactory);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (isProd) return;

    await Promise.all(
      postFactory.map(async (x: Post) => {
        await queryRunner.manager.getRepository(Post).remove(x);
      })
    );
  }
}
