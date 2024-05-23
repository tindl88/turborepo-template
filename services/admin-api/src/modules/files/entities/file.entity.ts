import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { AbstractEntity } from '@/common/entities/abstract.entity';

import { Category } from '@/modules/categories/entities/category.entity';
import { PostFile } from '@/modules/posts/entities/post-file.entity';
import { ProductFile } from '@/modules/products/entities/product-file.entity';

import { FILE_STATUS } from '../constants/file.constant';

@Entity({ name: 'files' })
export class File extends AbstractEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  uniqueName: string;

  @Column({ type: 'varchar' })
  caption: string;

  @Column({ type: 'varchar' })
  ext: string;

  @Column({ type: 'bigint' })
  size: number;

  @Column({ type: 'varchar' })
  mime: string;

  @Column({ type: 'boolean', default: true })
  isTemp?: boolean;

  @Column({ type: 'enum', enum: FILE_STATUS, default: FILE_STATUS.VISIBLED })
  status: FILE_STATUS;

  @ManyToOne(() => Category, category => category.files)
  category?: Category;

  // Ref: https://orkhan.gitbook.io/typeorm/docs/many-to-many-relations#many-to-many-relations-with-custom-properties
  @OneToMany(() => PostFile, postFile => postFile.image)
  postFiles: PostFile[];

  // Ref: https://orkhan.gitbook.io/typeorm/docs/many-to-many-relations#many-to-many-relations-with-custom-properties
  @OneToMany(() => ProductFile, productFile => productFile.image)
  productFiles: ProductFile[];
}
