import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './entities/product.entity';
import { ProductFile } from './entities/product-file.entity';
import { ProductCreatedListener } from './listeners/product-created.listener';
import { ProductDeletedListener } from './listeners/product-deleted.listener';
import { ProductUpdatedListener } from './listeners/product-updated.listener';
import { AdminProductsController } from './admin-products.controller';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductFile]), CategoriesModule],
  controllers: [ProductsController, AdminProductsController],
  providers: [ProductsService, JwtService, ProductCreatedListener, ProductUpdatedListener, ProductDeletedListener]
})
export class ProductsModule {}
