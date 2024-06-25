import { Exclude, Expose } from 'class-transformer';
import { AfterLoad, Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { AbstractEntity } from '@/common/entities/abstract.entity';

import { Category } from '@/modules/categories/entities/category.entity';
import { File } from '@/modules/files/entities/file.entity';
import { User } from '@/modules/users/entities/user.entity';

import { ProductFile } from './product-file.entity';

import { PRODUCT_STATUS } from '../constants/product.constant';

@Entity({ name: 'products' })
export class Product extends AbstractEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', unique: true, length: 255 })
  slug: string;

  @Column({ nullable: true })
  body: string;

  @Column({ type: 'enum', enum: PRODUCT_STATUS, default: PRODUCT_STATUS.DRAFT })
  status: PRODUCT_STATUS;

  @ManyToOne(() => User, user => user.products)
  creator: User;

  @ManyToOne(() => Category, category => category.posts)
  category: Category;

  @Column({ type: 'varchar', nullable: true })
  cover: string;

  @Expose()
  images: File[];

  // Ref: https://orkhan.gitbook.io/typeorm/docs/many-to-many-relations#many-to-many-relations-with-custom-properties
  @OneToMany(() => ProductFile, productFile => productFile.product)
  @Exclude()
  productFiles: ProductFile[];

  @AfterLoad()
  transformProductFilesToImages() {
    if (this.productFiles) {
      this.images = this.productFiles.map(item => {
        return {
          id: item.fileId,
          uniqueName: item.image.uniqueName,
          position: item.position
        } as File & { position: number };
      });
    }
  }
}
