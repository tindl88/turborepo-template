import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductFile } from '../entities/product-file.entity';
import { ProductCreatedEvent } from '../events/product-created.event';

@Injectable()
export class ProductCreatedListener {
  constructor(
    @InjectRepository(ProductFile)
    private readonly productFileRepository: Repository<ProductFile>
  ) {}

  @OnEvent('product.created')
  async handleProductCreatedEvent(event: ProductCreatedEvent) {
    const { productDto, product } = event;

    try {
      for (let i = 0; i < productDto.images.length; i++) {
        const file = productDto.images[i];

        const productFile = this.productFileRepository.create({
          fileId: file.id,
          productId: product.id,
          position: i + 1
        });

        await this.productFileRepository.save(productFile);
      }
    } catch (error) {
      throw new UnprocessableEntityException('Event product.created::' + error.message);
    }
  }
}
