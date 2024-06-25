import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from './entities/post.entity';
import { PostFile } from './entities/post-file.entity';
import { PostCreatedListener } from './listeners/post-created.listener';
import { PostDeletedListener } from './listeners/post-deleted.listener';
import { PostUpdatedListener } from './listeners/post-updated.listener';
import { AdminPostsController } from './admin-posts.controller';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

import { AuditLogsService } from '../audit-logs/audit-logs.service';
import { AuditLog } from '../audit-logs/entities/audit-log.entity';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post, PostFile, AuditLog]), CategoriesModule],
  controllers: [PostsController, AdminPostsController],
  providers: [PostsService, JwtService, PostCreatedListener, PostUpdatedListener, PostDeletedListener, AuditLogsService]
})
export class PostsModule {}
