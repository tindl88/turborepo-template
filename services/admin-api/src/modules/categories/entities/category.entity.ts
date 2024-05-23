import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { AbstractEntity } from '@/common/entities/abstract.entity';

import { File } from '@/modules/files/entities/file.entity';

import { CATEGORY_STATUS, CATEGORY_TYPE } from '../constants/category.constant';

@Entity({ name: 'categories' })
export class Category extends AbstractEntity {
  @Column()
  name: string;

  @Column({ type: 'enum', enum: CATEGORY_TYPE, default: CATEGORY_TYPE.UNCATEGORIZED })
  type: CATEGORY_TYPE;

  @Column({ type: 'enum', enum: CATEGORY_STATUS, default: CATEGORY_STATUS.VISIBLED })
  status: CATEGORY_STATUS;

  @ManyToOne(() => Category, category => category.children, { nullable: true })
  parent: Category;

  @OneToMany(() => Category, category => category.parent)
  children: Category[];

  @OneToMany(() => File, file => file.category)
  files: File[];
}
