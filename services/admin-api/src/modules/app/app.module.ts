import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

import { AuthModule } from '@/modules/auth/auth.module';
import { BaseModule } from '@/modules/base/base.module';
import { CategoriesModule } from '@/modules/categories/categories.module';
import { PostsModule } from '@/modules/posts/posts.module';
import { RefreshTokensModule } from '@/modules/refresh-tokens/refresh-tokens.module';
import { SocketModule } from '@/modules/socket/socket.module';
import { UsersModule } from '@/modules/users/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuditLogsModule } from '../audit-logs/audit-logs.module';
import { FilesModule } from '../files/files.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    BaseModule,
    UsersModule,
    AuthModule,
    RefreshTokensModule,
    PostsModule,
    ProductsModule,
    CategoriesModule,
    FilesModule,
    AuditLogsModule,
    SocketModule,
    NotificationsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {}
