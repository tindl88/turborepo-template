import { MigrationInterface, QueryRunner } from 'typeorm';

import { User } from '@/modules/users/entities/user.entity';

import { userFactory } from '../factories/dev/user.factory';

const isProd = process.env.NODE_ENV === 'production';

export class AddMoreUsers1715156363018 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (isProd) return;

    await queryRunner.manager.getRepository(User).save(userFactory);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (isProd) return;

    await Promise.all(
      userFactory.map(async (x: User) => {
        await queryRunner.manager.getRepository(User).remove(x);
      })
    );
  }
}
