import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductFile } from '../entities/product-file.entity';
import { ProductDeletedEvent } from '../events/product-deleted.event';

@Injectable()
export class ProductDeletedListener {
  constructor(
    @InjectRepository(ProductFile)
    private readonly productFileRepository: Repository<ProductFile>
  ) {}

  @OnEvent('product.deleted')
  async handleProductDeletedEvent(_event: ProductDeletedEvent) {}
}
