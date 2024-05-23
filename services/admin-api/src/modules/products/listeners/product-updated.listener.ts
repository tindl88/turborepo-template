import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductFile } from '../entities/product-file.entity';
import { ProductUpdatedEvent } from '../events/product-updated.event';

@Injectable()
export class ProductUpdatedListener {
  constructor(
    @InjectRepository(ProductFile)
    private readonly productFileRepository: Repository<ProductFile>
  ) {}

  @OnEvent('product.updated')
  async handleProductUpdatedEvent(event: ProductUpdatedEvent) {
    const { productDto, product } = event;

    try {
      await this.productFileRepository
        .createQueryBuilder()
        .delete()
        .from(ProductFile)
        .where('product_id = :id', { id: product.id })
        .execute();

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
      throw new UnprocessableEntityException('Event product.updated::' + error.message);
    }
  }
}
