import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginationDto } from '@/common/dtos/pagination.dto';
import { PaginationResponseDto } from '@/common/dtos/pagination-response.dto';

import { PRODUCT_GET_FIELDS, PRODUCT_STATUS } from './constants/product.constant';
import { BulkDeleteProductDto } from './dto/bulk-delete-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductCreatedEvent } from './events/product-created.event';
import { ProductDeletedEvent } from './events/product-deleted.event';
import { ProductUpdatedEvent } from './events/product-updated.event';

import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly eventEmitter: EventEmitter2,
    private readonly categoriesService: CategoriesService
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = new Product();

    Object.assign(product, createProductDto);
    const response = await this.productRepository.save(product);

    const productCreatedEvent = new ProductCreatedEvent();

    productCreatedEvent.productDto = createProductDto;
    productCreatedEvent.product = response;

    this.eventEmitter.emit('product.created', productCreatedEvent);

    return response;
  }

  async find(filterDto: FilterProductDto) {
    const { q, order, status, sort } = filterDto;

    const queryBuilder = this.productRepository.createQueryBuilder('product');

    queryBuilder.select(PRODUCT_GET_FIELDS);
    queryBuilder.leftJoin('product.creator', 'user');
    queryBuilder.leftJoin('product.category', 'category');
    queryBuilder.leftJoin('product.productFiles', 'productFile');
    queryBuilder.leftJoin('productFile.image', 'image');

    if (status) queryBuilder.where('product.status in (:...status)', { status });
    if (q) {
      queryBuilder.andWhere('LOWER(product.name) LIKE LOWER(:name)', { name: `%${q}%` });
      queryBuilder.orWhere('LOWER(product.body) LIKE LOWER(:body)', { body: `%${q}%` });
    }
    if (sort) {
      queryBuilder.orderBy(`product.${sort}`, order.toUpperCase() as 'ASC' | 'DESC');
    } else if (order) {
      queryBuilder.orderBy('product.createdAt', order.toUpperCase() as 'ASC' | 'DESC');
    }
    queryBuilder.skip(filterDto.skip).take(filterDto.limit);

    const totalItems = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const paginationDto = new PaginationDto({ totalItems, filterDto });

    return new PaginationResponseDto(entities, { paging: paginationDto });
  }

  async findOne(id: string) {
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    queryBuilder.select(PRODUCT_GET_FIELDS);
    queryBuilder.leftJoin('product.creator', 'user');
    queryBuilder.leftJoin('product.category', 'category');
    queryBuilder.leftJoin('product.productFiles', 'productFile');
    queryBuilder.leftJoin('productFile.image', 'image');
    queryBuilder.where('product.id = :id', { id });
    queryBuilder.orderBy('productFile.position', 'ASC');

    const product = await queryBuilder.getOne();

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async findBySlug(slug: string) {
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    queryBuilder.select(PRODUCT_GET_FIELDS);
    queryBuilder.leftJoin('product.creator', 'user');
    queryBuilder.leftJoin('product.category', 'category');
    queryBuilder.leftJoin('product.productFiles', 'productFile');
    queryBuilder.leftJoin('productFile.image', 'image');
    queryBuilder.where('product.slug = :slug', { slug });
    queryBuilder.orderBy('productFile.position', 'ASC');

    const product = await queryBuilder.getOne();

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.preload({ id: id, ...updateProductDto });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    product.category = await this.categoriesService.findOne(updateProductDto.categoryId);

    const response = await this.productRepository.save(product);

    const productUpdatedEvent = new ProductUpdatedEvent();

    productUpdatedEvent.productDto = updateProductDto;
    productUpdatedEvent.product = response;

    this.eventEmitter.emit('product.updated', productUpdatedEvent);

    return response;
  }

  async remove(id: string) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    product.status = PRODUCT_STATUS.DELETED;

    const productResponse = await this.productRepository.save(product);

    const productDeletedEvent = new ProductDeletedEvent();

    productDeletedEvent.products = [productResponse];

    this.eventEmitter.emit('product.deleted', productDeletedEvent);

    return productResponse;
  }

  async bulkDelete(bulkDeleteProductDto: BulkDeleteProductDto) {
    const queryBuilder = this.productRepository
      .createQueryBuilder()
      .update(Product)
      .set({ status: PRODUCT_STATUS.DELETED })
      .whereInIds(bulkDeleteProductDto.ids);
    const data = await queryBuilder.returning('id, status').execute();

    const productDeletedEvent = new ProductDeletedEvent();

    productDeletedEvent.products = data.raw as Product[];

    this.eventEmitter.emit('product.deleted', productDeletedEvent);

    return data.raw;
  }
}
