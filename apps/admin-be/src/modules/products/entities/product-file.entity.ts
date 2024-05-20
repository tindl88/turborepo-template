import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { File } from '@/modules/files/entities/file.entity';

import { Product } from './product.entity';

@Entity({ name: 'products_files' })
export class ProductFile {
  @PrimaryGeneratedColumn('uuid', { name: 'product_id' })
  productId: string;

  @PrimaryGeneratedColumn('uuid', { name: 'file_id' })
  fileId: string;

  @Column({ type: 'int', nullable: true })
  position: number;

  // Ref: https://orkhan.gitbook.io/typeorm/docs/many-to-many-relations#many-to-many-relations-with-custom-properties
  @ManyToOne(() => Product, product => product.productFiles)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product;

  // Ref: https://orkhan.gitbook.io/typeorm/docs/many-to-many-relations#many-to-many-relations-with-custom-properties
  @ManyToOne(() => File, file => file.productFiles)
  @JoinColumn([{ name: 'file_id', referencedColumnName: 'id' }])
  image: File;
}
