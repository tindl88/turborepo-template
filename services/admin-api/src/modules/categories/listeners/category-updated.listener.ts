import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { CategoryUpdatedEvent } from '../events/category-updated.event';

@Injectable()
export class CategoryUpdatedListener {
  @OnEvent('category.updated')
  async handleCategoryUpdatedEvent(_event: CategoryUpdatedEvent) {}
}
