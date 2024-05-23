import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { AuditLogsService } from '@/modules/audit-logs/audit-logs.service';
import { AUDIT_LOG_HTTP_METHOD, AUDIT_LOG_TABLE_NAME } from '@/modules/audit-logs/constants/audit-log.constant';

import { PostDeletedEvent } from '../events/post-deleted.event';

@Injectable()
export class PostDeletedListener {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  @OnEvent('post.deleted')
  async handlePostDeletedEvent(event: PostDeletedEvent) {
    const { user, oldPosts, newPosts } = event;

    try {
      // Create Audit Log
      for (let i = 0; i < oldPosts.length; i++) {
        const oldPost = oldPosts[i];
        const newPost = newPosts[i];

        await this.auditLogsService.create({
          tableName: AUDIT_LOG_TABLE_NAME.POST,
          user,
          recordId: oldPost.id,
          action: AUDIT_LOG_HTTP_METHOD.DELETE,
          oldValue: { ...oldPost },
          newValue: { ...newPost }
        });
      }
    } catch (error) {
      throw new UnprocessableEntityException('Event post.deleted::' + error.message);
    }
  }
}
