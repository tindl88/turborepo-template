import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuditLogsService } from '@/modules/audit-logs/audit-logs.service';
import { AUDIT_LOG_HTTP_METHOD, AUDIT_LOG_TABLE_NAME } from '@/modules/audit-logs/constants/audit-log.constant';

import { PostFile } from '../entities/post-file.entity';
import { PostCreatedEvent } from '../events/post-created.event';

@Injectable()
export class PostCreatedListener {
  constructor(
    @InjectRepository(PostFile)
    private readonly postFileRepository: Repository<PostFile>,
    private readonly auditLogsService: AuditLogsService
  ) {}

  @OnEvent('post.created')
  async handlePostCreatedEvent(event: PostCreatedEvent) {
    const { user, post, postDto } = event;

    try {
      // Sort Images
      for (let i = 0; i < postDto.images.length; i++) {
        const file = postDto.images[i];

        const postFile = this.postFileRepository.create({ fileId: file.id, postId: post.id, position: i + 1 });

        await this.postFileRepository.save(postFile);
      }

      // Create Audit Log
      await this.auditLogsService.create({
        tableName: AUDIT_LOG_TABLE_NAME.POST,
        user,
        recordId: post.id,
        action: AUDIT_LOG_HTTP_METHOD.CREATE,
        oldValue: {},
        newValue: { ...post }
      });
    } catch (error) {
      throw new UnprocessableEntityException('Event post.created::' + error.message);
    }
  }
}
