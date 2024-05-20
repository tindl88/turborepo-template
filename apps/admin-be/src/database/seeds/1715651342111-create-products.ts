import { MigrationInterface, QueryRunner } from 'typeorm';

import { Product } from '@/modules/products/entities/product.entity';

import { productFactory } from '../factories/dev/product.factory';

const isProd = process.env.NODE_ENV === 'production';

export class CreateProducts1715651342111 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (isProd) return;

    await queryRunner.manager.getRepository(Product).save(productFactory);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (isProd) return;

    await Promise.all(
      productFactory.map(async (x: Product) => {
        await queryRunner.manager.getRepository(Product).remove(x);
      })
    );
  }
}
