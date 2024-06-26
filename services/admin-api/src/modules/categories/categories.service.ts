import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginationDto } from '@/common/dtos/pagination.dto';
import { PaginationResponseDto } from '@/common/dtos/pagination-response.dto';

import { CATEGORY_GET_FIELDS, CATEGORY_STATUS } from './constants/category.constant';
import { BulkDeleteCategoryDto } from './dto/bulk-delete-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FilterCategoryDto } from './dto/filter-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { CategoryCreatedEvent } from './events/category-created.event';
import { CategoryDeletedEvent } from './events/category-deleted.event';
import { CategoryUpdatedEvent } from './events/category-updated.event';
import { buildTree } from './utils/category.util';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    let parent: Category | null = null;

    if (createCategoryDto.parentId) {
      parent = await this.categoryRepository.findOne({
        where: { id: createCategoryDto.parentId, type: createCategoryDto.type }
      });
    }

    if (createCategoryDto.parentId && !parent) {
      throw new NotFoundException('Parent category does not exist.');
    }

    const existingCategory = await this.categoryRepository.findOne({
      where: { name: createCategoryDto.name, type: createCategoryDto.type, parent: { id: createCategoryDto.parentId } }
    });

    if (existingCategory) {
      throw new ConflictException('Category with the same name already exists.');
    }

    const newCategory = this.categoryRepository.create({ ...createCategoryDto, parent: parent });
    const categoryResponse = await this.categoryRepository.save({ ...newCategory });

    const categoryCreatedEvent = new CategoryCreatedEvent();

    categoryCreatedEvent.category = categoryResponse;

    this.eventEmitter.emit('category.created', categoryCreatedEvent);

    return categoryResponse;
  }

  async findAll(filterDto: FilterCategoryDto) {
    const { type } = filterDto;

    const queryBuilder = this.categoryRepository
      .createQueryBuilder('category')
      .select(CATEGORY_GET_FIELDS)
      .leftJoinAndSelect('category.parent', 'parent');

    queryBuilder.where('category.status = :status', { status: CATEGORY_STATUS.VISIBLED });

    if (type) {
      queryBuilder.andWhere('category.type = :type', { type });
    }

    const categories = await queryBuilder.getMany();

    return categories;
  }

  async find(filterDto: FilterCategoryDto) {
    const { q, order, status, sort, type, excludeId } = filterDto;

    const queryBuilder = this.categoryRepository.createQueryBuilder('category');

    queryBuilder.select(CATEGORY_GET_FIELDS);
    queryBuilder.leftJoin('category.parent', 'parent');
    queryBuilder.where('parent.id IS NULL');

    if (status) queryBuilder.andWhere('category.status in (:...status)', { status });
    if (q) {
      queryBuilder.andWhere('LOWER(category.name) LIKE LOWER(:name)', { name: `%${q}%` });
    }
    if (excludeId) {
      queryBuilder.andWhere('category.id != :id', { id: excludeId });
    }
    if (type) {
      queryBuilder.andWhere('category.type = :type', { type });
    }
    if (sort) {
      queryBuilder.orderBy(`category.${sort}`, order.toUpperCase() as 'ASC' | 'DESC');
    } else if (order) {
      queryBuilder.orderBy('category.createdAt', order.toUpperCase() as 'ASC' | 'DESC');
    }
    queryBuilder.skip(filterDto.skip).take(filterDto.limit);

    const totalItems = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const paginationDto = new PaginationDto({ totalItems, filterDto });

    return new PaginationResponseDto(entities, { paging: paginationDto });
  }

  async getTrees(filterDto: FilterCategoryDto) {
    const categories = await this.findAll(filterDto);

    return buildTree(categories, filterDto.parentId || null, '/');
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: { parent: true }
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    let parent: Category | null = null;

    if (updateCategoryDto.parentId) {
      parent = await this.categoryRepository.findOne({ where: { id: updateCategoryDto.parentId } });
    }

    if (updateCategoryDto.parentId && !parent) {
      throw new NotFoundException('Parent category does not exist.');
    }

    const category = await this.categoryRepository.findOneBy({ id: id });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (updateCategoryDto.type && updateCategoryDto.type !== category.type) {
      throw new BadRequestException('Category Type change is not allowed');
    }

    category.parent = parent;

    Object.assign(category, updateCategoryDto);

    const categoryResponse = await this.categoryRepository.save(category);

    const categoryUpdatedEvent = new CategoryUpdatedEvent();

    categoryUpdatedEvent.category = categoryResponse;

    this.eventEmitter.emit('category.updated', categoryUpdatedEvent);

    return categoryResponse;
  }

  async remove(id: string) {
    const categoryData = await this.categoryRepository.findOneBy({ id });

    if (!categoryData) {
      throw new NotFoundException('Category not found');
    }

    categoryData.status = CATEGORY_STATUS.DELETED;

    const categoryResponse = await this.categoryRepository.save(categoryData);

    const categoryDeletedEvent = new CategoryDeletedEvent();

    categoryDeletedEvent.category = categoryResponse;

    this.eventEmitter.emit('category.deleted', categoryDeletedEvent);

    return categoryResponse;
  }

  async bulkDelete(bulkDeleteCategoryDto: BulkDeleteCategoryDto) {
    const queryBuilder = this.categoryRepository
      .createQueryBuilder()
      .update(Category)
      .set({ status: CATEGORY_STATUS.DELETED })
      .whereInIds(bulkDeleteCategoryDto.ids);
    const data = await queryBuilder.returning('id, status').execute();

    return data.raw;
  }
}
