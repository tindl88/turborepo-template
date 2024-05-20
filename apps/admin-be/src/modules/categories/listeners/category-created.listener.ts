import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from '../entities/category.entity';
import { CategoryCreatedEvent } from '../events/category-created.event';

@Injectable()
export class CategoryCreatedListener {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  @OnEvent('category.created')
  async handleCategoryCreatedEvent(_event: CategoryCreatedEvent) {}
}
