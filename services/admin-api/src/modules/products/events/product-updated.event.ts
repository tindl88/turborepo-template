import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';

export class ProductUpdatedEvent {
  productDto: UpdateProductDto;
  product: Product;
}
