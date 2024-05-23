import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../entities/product.entity';

export class ProductCreatedEvent {
  productDto: CreateProductDto;
  product: Product;
}
