import { Category } from '../entities/category.entity';

export class CategoryDeletedEvent {
  category: Category;
}
