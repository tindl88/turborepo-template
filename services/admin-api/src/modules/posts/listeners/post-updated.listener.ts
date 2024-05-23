import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuditLogsService } from '@/modules/audit-logs/audit-logs.service';
import { AUDIT_LOG_HTTP_METHOD, AUDIT_LOG_TABLE_NAME } from '@/modules/audit-logs/constants/audit-log.constant';

import { PostFile } from '../entities/post-file.entity';
import { PostUpdatedEvent } from '../events/post-updated.event';

@Injectable()
export class PostUpdatedListener {
  constructor(
    @InjectRepository(PostFile)
    private readonly postFileRepository: Repository<PostFile>,
    private readonly auditLogsService: AuditLogsService
  ) {}

  @OnEvent('post.updated')
  async handlePostUpdatedEvent(event: PostUpdatedEvent) {
    const { user, oldPost, newPost, postDto } = event;

    try {
      // Sort Images
      await this.postFileRepository
        .createQueryBuilder()
        .delete()
        .from(PostFile)
        .where('post_id = :id', { id: oldPost.id })
        .execute();

      for (let i = 0; i < postDto.images.length; i++) {
        const file = postDto.images[i];

        const postFile = this.postFileRepository.create({ fileId: file.id, postId: newPost.id, position: i + 1 });

        await this.postFileRepository.save(postFile);
      }

      // Create Audit Log
      await this.auditLogsService.create({
        tableName: AUDIT_LOG_TABLE_NAME.POST,
        user,
        recordId: oldPost.id,
        action: AUDIT_LOG_HTTP_METHOD.UPDATE,
        oldValue: { ...oldPost },
        newValue: { ...newPost }
      });
    } catch (error) {
      throw new UnprocessableEntityException('Event post.updated::' + error.message);
    }
  }
}
