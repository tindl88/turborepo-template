import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';

import { PaginationDto } from '@/common/dtos/pagination.dto';
import { PaginationResponseDto } from '@/common/dtos/pagination-response.dto';

import { POST_GET_FIELDS, POST_STATUS } from './constants/post.constant';
import { BulkDeletePostDto } from './dto/bulk-delete-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { FilterPostDto } from './dto/filter-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { PostCreatedEvent } from './events/post-created.event';
import { PostDeletedEvent } from './events/post-deleted.event';
import { PostUpdatedEvent } from './events/post-updated.event';

import { CategoriesService } from '../categories/categories.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly logger: PinoLogger,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly eventEmitter: EventEmitter2,
    private readonly categoriesService: CategoriesService
  ) {
    this.logger.setContext(PostsService.name);
  }

  async create(user: User, createPostDto: CreatePostDto) {
    const post = new Post();

    Object.assign(post, createPostDto);

    const response = await this.postRepository.save(post);

    const postCreatedEvent = new PostCreatedEvent();

    postCreatedEvent.user = user;
    postCreatedEvent.post = response;
    postCreatedEvent.postDto = createPostDto;

    this.eventEmitter.emit('post.created', postCreatedEvent);

    return response;
  }

  async find(filterDto: FilterPostDto) {
    const { q, order, status, sort } = filterDto;

    const queryBuilder = this.postRepository.createQueryBuilder('post');

    queryBuilder.select(POST_GET_FIELDS);
    queryBuilder.leftJoin('post.creator', 'user');
    queryBuilder.leftJoin('post.category', 'category');
    queryBuilder.leftJoin('post.postFiles', 'postFile');
    queryBuilder.leftJoin('postFile.image', 'image');

    if (status) queryBuilder.where('post.status in (:...status)', { status });
    if (q) {
      queryBuilder.andWhere('LOWER(post.name) LIKE LOWER(:name)', { name: `%${q}%` });
      queryBuilder.orWhere('LOWER(post.description) LIKE LOWER(:description)', { description: `%${q}%` });
      queryBuilder.orWhere('LOWER(post.body) LIKE LOWER(:body)', { body: `%${q}%` });
    }
    if (sort) {
      queryBuilder.orderBy(`post.${sort}`, order.toUpperCase() as 'ASC' | 'DESC');
    } else if (order) {
      queryBuilder.orderBy('post.createdAt', order.toUpperCase() as 'ASC' | 'DESC');
    }
    queryBuilder.skip(filterDto.skip).take(filterDto.limit);

    const totalItems = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const paginationDto = new PaginationDto({ totalItems, filterDto });

    return new PaginationResponseDto(entities, { paging: paginationDto });
  }

  async findOne(id: string) {
    const queryBuilder = this.postRepository.createQueryBuilder('post');

    queryBuilder.select(POST_GET_FIELDS);
    queryBuilder.leftJoin('post.creator', 'user');
    queryBuilder.leftJoin('post.category', 'category');
    queryBuilder.leftJoin('post.postFiles', 'postFile');
    queryBuilder.leftJoin('postFile.image', 'image');
    queryBuilder.where('post.id = :id', { id });
    queryBuilder.orderBy('postFile.position', 'ASC');

    const post = await queryBuilder.getOne();

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async findBySlug(slug: string) {
    const queryBuilder = this.postRepository.createQueryBuilder('post');

    queryBuilder.select(POST_GET_FIELDS);
    queryBuilder.leftJoin('post.creator', 'user');
    queryBuilder.leftJoin('post.category', 'category');
    queryBuilder.leftJoin('post.postFiles', 'postFile');
    queryBuilder.leftJoin('postFile.image', 'image');
    queryBuilder.where('post.slug = :slug', { slug });
    queryBuilder.orderBy('postFile.position', 'ASC');

    const post = await queryBuilder.getOne();

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async update(user: User, id: string, updatePostDto: UpdatePostDto) {
    try {
      const post = await this.postRepository.preload({ id: id, ...updatePostDto });

      if (!post) {
        throw new NotFoundException('Post not found');
      }

      post.category = await this.categoriesService.findOne(updatePostDto.categoryId);

      const response = await this.postRepository.save(post);

      const postUpdatedEvent = new PostUpdatedEvent();

      postUpdatedEvent.user = user;
      postUpdatedEvent.oldPost = post;
      postUpdatedEvent.newPost = response;
      postUpdatedEvent.postDto = updatePostDto;

      this.eventEmitter.emit('post.updated', postUpdatedEvent);

      return response;
    } catch (error) {
      this.logger.error(`Post Update Failed: ${error.message}`);
    }
  }

  async remove(user: User, id: string) {
    const post = await this.postRepository.findOneBy({ id });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    post.status = POST_STATUS.DELETED;

    const postResponse = await this.postRepository.save(post);

    const postDeletedEvent = new PostDeletedEvent();

    postDeletedEvent.user = user;
    postDeletedEvent.oldPosts = [post];
    postDeletedEvent.newPosts = [postResponse];

    this.eventEmitter.emit('post.deleted', postDeletedEvent);

    return postResponse;
  }

  async bulkDelete(user: User, bulkDeletePostDto: BulkDeletePostDto) {
    const oldPosts: Post[] = [];
    const newPosts: Post[] = [];

    for (let i = 0; i < bulkDeletePostDto.ids.length; i++) {
      const id = bulkDeletePostDto.ids[i];
      const post = await this.postRepository.createQueryBuilder('post').where('post.id = :id', { id }).getOne();

      oldPosts.push(post);

      post.status = POST_STATUS.DELETED;

      const postResponse = await this.postRepository.save(post);

      newPosts.push(postResponse);
    }

    const postDeletedEvent = new PostDeletedEvent();

    postDeletedEvent.user = user;
    postDeletedEvent.oldPosts = oldPosts;
    postDeletedEvent.newPosts = newPosts;

    this.eventEmitter.emit('post.deleted', postDeletedEvent);

    return newPosts;
  }
}
