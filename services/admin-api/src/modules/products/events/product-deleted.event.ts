import { Product } from '../entities/product.entity';

export class ProductDeletedEvent {
  products: Product[];
}
