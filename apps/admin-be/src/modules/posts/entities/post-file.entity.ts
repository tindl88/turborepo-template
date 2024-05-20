import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { File } from '@/modules/files/entities/file.entity';
import { Post } from '@/modules/posts/entities/post.entity';

@Entity({ name: 'posts_files' })
export class PostFile {
  @PrimaryGeneratedColumn('uuid', { name: 'post_id' })
  postId: string;

  @PrimaryGeneratedColumn('uuid', { name: 'file_id' })
  fileId: string;

  @Column({ type: 'int', nullable: true })
  position: number;

  // Ref: https://orkhan.gitbook.io/typeorm/docs/many-to-many-relations#many-to-many-relations-with-custom-properties
  @ManyToOne(() => Post, post => post.postFiles)
  @JoinColumn([{ name: 'post_id', referencedColumnName: 'id' }])
  post: Post;

  // Ref: https://orkhan.gitbook.io/typeorm/docs/many-to-many-relations#many-to-many-relations-with-custom-properties
  @ManyToOne(() => File, file => file.postFiles)
  @JoinColumn([{ name: 'file_id', referencedColumnName: 'id' }])
  image: File;
}
