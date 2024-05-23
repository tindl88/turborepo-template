import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from './entities/category.entity';
import { CategoryCreatedListener } from './listeners/category-created.listener';
import { CategoryDeletedListener } from './listeners/category-deleted.listener';
import { CategoryUpdatedListener } from './listeners/category-updated.listener';
import { AdminCategoriesController } from './admin-categories.controller';
import { CategoriesService } from './categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [AdminCategoriesController],
  providers: [CategoriesService, JwtService, CategoryCreatedListener, CategoryUpdatedListener, CategoryDeletedListener],
  exports: [CategoriesService]
})
export class CategoriesModule {}
