import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '@/common/entities/abstract.entity';

@Entity({ name: 'notifications' })
export class Notification extends AbstractEntity {
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  content: string;

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @Column({ type: 'varchar', nullable: true })
  topic: string;

  @Column({ type: 'varchar', nullable: true })
  scheduling: string;

  @Column({ type: 'varchar', nullable: true })
  channelId: string;

  @Column({ type: 'boolean', default: false })
  sound: boolean;
}
