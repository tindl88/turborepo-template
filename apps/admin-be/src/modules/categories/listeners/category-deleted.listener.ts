import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from '../entities/category.entity';
import { CategoryDeletedEvent } from '../events/category-deleted.event';

@Injectable()
export class CategoryDeletedListener {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  @OnEvent('category.deleted')
  async handleCategoryDeletedEvent(_event: CategoryDeletedEvent) {}
}
