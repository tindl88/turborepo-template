import { NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoriesService } from '@/modules/categories/categories.service';
import { Category } from '@/modules/categories/entities/category.entity';
import { User } from '@/modules/users/entities/user.entity';

import { POST_GET_FIELDS, POST_STATUS } from '../constants/post.constant';
import { BulkDeletePostDto } from '../dto/bulk-delete-post.dto';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Post } from '../entities/post.entity';
import { PostDeletedEvent } from '../events/post-deleted.event';
import { PostUpdatedEvent } from '../events/post-updated.event';
import { PostsService } from '../posts.service';

describe('PostsService', () => {
  let service: PostsService;
  let repository: Repository<Post>;
  let eventEmitter: EventEmitter2;
  let categoriesService: CategoriesService;

  const mockPostRepository = {
    createQueryBuilder: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      leftJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getOne: jest.fn(),
      getRawAndEntities: jest.fn(),
      getCount: jest.fn()
    }),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    preload: jest.fn(),
    remove: jest.fn()
  };

  const mockCategoriesService = {
    findOne: jest.fn()
  };

  const mockEventEmitter = {
    emit: jest.fn()
  };

  beforeEach(async () => {
    jest.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useValue: mockPostRepository
        },
        {
          provide: CategoriesService,
          useValue: mockCategoriesService
        },
        {
          provide: EventEmitter2,
          useValue: mockEventEmitter
        }
      ]
    }).compile();

    service = module.get<PostsService>(PostsService);
    repository = module.get<Repository<Post>>(getRepositoryToken(Post));
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
    categoriesService = module.get<CategoriesService>(CategoriesService);
  });

  describe('create', () => {
    it('should create a post and emit event', async () => {
      const user = { id: '1', name: 'Tester' } as User;
      const createPostDto = { name: 'NestJS', slug: 'nestjs', description: 'short', body: 'full' } as CreatePostDto;
      const savedPost = { name: 'NestJS', slug: 'nestjs', description: 'short', body: 'full' } as Post;

      const saveSpy = jest.spyOn(repository, 'save').mockResolvedValue(savedPost);
      const emitSpy = jest.spyOn(eventEmitter, 'emit');

      const result = await service.create(user, createPostDto);

      expect(saveSpy).toHaveBeenCalledWith(savedPost);
      expect(result).toEqual(savedPost);
      expect(emitSpy).toHaveBeenCalledWith('post.created', { user: user, post: savedPost, postDto: createPostDto });
    });
  });

  describe('findOne', () => {
    it('should find and return a post when it exists', async () => {
      const postId = '1';
      const expectedPost = { id: postId, name: 'Test Post' } as Post;
      const queryBuilder = {
        select: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(expectedPost)
      };

      jest.spyOn(mockPostRepository, 'createQueryBuilder').mockReturnValue(queryBuilder);

      const result = await service.findOne(postId);

      expect(result).toEqual(expectedPost);
      expect(queryBuilder.select).toHaveBeenCalledWith(POST_GET_FIELDS);
      expect(queryBuilder.leftJoin).toHaveBeenCalledWith('post.creator', 'user');
      expect(queryBuilder.leftJoin).toHaveBeenCalledWith('post.postFiles', 'postFile');
      expect(queryBuilder.leftJoin).toHaveBeenCalledWith('postFile.image', 'image');
      expect(queryBuilder.where).toHaveBeenCalledWith('post.id = :id', { id: postId });
      expect(queryBuilder.orderBy).toHaveBeenCalledWith('postFile.position', 'ASC');
    });

    it('should throw NotFoundException when post is not found', async () => {
      const postId = '1';
      const queryBuilder = {
        select: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(undefined)
      };

      jest.spyOn(mockPostRepository, 'createQueryBuilder').mockReturnValue(queryBuilder);

      await expect(service.findOne(postId)).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('findBySlug', () => {
    it('should find and return a post when it exists', async () => {
      const slug = 'test-slug';
      const expectedPost = { id: '1', name: 'Test Post', slug: 'test-slug' } as Post;
      const queryBuilder = {
        select: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(expectedPost)
      };

      jest.spyOn(mockPostRepository, 'createQueryBuilder').mockReturnValue(queryBuilder);

      const result = await service.findBySlug(slug);

      expect(result).toEqual(expectedPost);
      expect(queryBuilder.select).toHaveBeenCalledWith(POST_GET_FIELDS);
      expect(queryBuilder.leftJoin).toHaveBeenCalledWith('post.creator', 'user');
      expect(queryBuilder.leftJoin).toHaveBeenCalledWith('post.postFiles', 'postFile');
      expect(queryBuilder.leftJoin).toHaveBeenCalledWith('postFile.image', 'image');
      expect(queryBuilder.where).toHaveBeenCalledWith('post.slug = :slug', { slug });
      expect(queryBuilder.orderBy).toHaveBeenCalledWith('postFile.position', 'ASC');
    });

    it('should throw NotFoundException when post is not found', async () => {
      const slug = 'test-slug';
      const queryBuilder = {
        select: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(undefined)
      };

      jest.spyOn(mockPostRepository, 'createQueryBuilder').mockReturnValue(queryBuilder);

      await expect(service.findBySlug(slug)).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update post successfully', async () => {
      const id = '1';
      const user = { id: '1', name: 'Tester' } as User;
      const updatePostDto = { name: 'NestJS', categoryId: 'cat-1' } as UpdatePostDto;
      const category = { id: 'cat-1', name: 'Test Category' } as Category;
      const originalPost = { id: '1', name: 'Test Post', slug: 'test-slug' } as Post;
      const updatedPost = { id: '1', name: 'Test Post', slug: 'test-slug', category } as Post;

      mockPostRepository.preload.mockResolvedValue(originalPost);
      mockPostRepository.save.mockResolvedValue(updatedPost);
      mockCategoriesService.findOne.mockResolvedValue(category);

      const expectedEvent = new PostUpdatedEvent();

      expectedEvent.user = user;
      expectedEvent.oldPost = updatedPost;
      expectedEvent.newPost = updatedPost;
      expectedEvent.postDto = updatePostDto;

      const result = await service.update(user, id, updatePostDto);

      expect(mockPostRepository.preload).toHaveBeenCalledWith({ id, ...updatePostDto });
      expect(mockPostRepository.save).toHaveBeenCalledWith(originalPost);
      expect(categoriesService.findOne).toHaveBeenCalledWith(updatePostDto.categoryId);
      expect(mockEventEmitter.emit).toHaveBeenCalledWith('post.updated', expectedEvent);
      expect(result).toEqual(updatedPost);
    });

    it('should throw NotFoundException when post is not found', async () => {
      const id = '1';
      const user = { id: '1', name: 'Tester' } as User;
      const updatePostDto = { name: 'NestJS', categoryId: 'cat-1' } as UpdatePostDto;

      mockPostRepository.preload.mockResolvedValue(undefined);

      await expect(service.update(user, id, updatePostDto)).rejects.toThrow(NotFoundException);
      expect(mockPostRepository.preload).toHaveBeenCalledWith({ id, ...updatePostDto });
      expect(mockPostRepository.save).not.toHaveBeenCalled();
      expect(mockEventEmitter.emit).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException when category is not found', async () => {
      const id = '1';
      const user = { id: '1', name: 'Tester' } as User;
      const updatePostDto = { name: 'NestJS', categoryId: 'cat-1' } as UpdatePostDto;
      const originalPost = { id: '1', name: 'Test Post', slug: 'test-slug' } as Post;

      mockPostRepository.preload.mockResolvedValue(originalPost);
      mockCategoriesService.findOne.mockResolvedValue(undefined);

      await expect(service.update(user, id, updatePostDto)).rejects.toThrow(NotFoundException);
      expect(mockPostRepository.preload).toHaveBeenCalledWith({ id, ...updatePostDto });
      expect(mockPostRepository.save).not.toHaveBeenCalled();
      expect(mockEventEmitter.emit).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove post successfully', async () => {
      const id = '1';
      const user = { id: '1', name: 'Tester' } as User;
      const post = { id: '1', status: POST_STATUS.DRAFT } as Post;
      const updatedPost = { ...post, status: POST_STATUS.DELETED } as Post;

      const saveSpy = jest.spyOn(repository, 'save').mockResolvedValue(updatedPost);
      const findOneBySpy = jest.spyOn(repository, 'findOneBy').mockResolvedValue(post);
      const emitSpy = jest.spyOn(eventEmitter, 'emit');

      const expectedEvent = new PostDeletedEvent();

      expectedEvent.user = user;
      expectedEvent.oldPosts = [post];
      expectedEvent.newPosts = [updatedPost];

      const result = await service.remove(user, id);

      expect(findOneBySpy).toHaveBeenCalledWith({ id });
      expect(saveSpy).toHaveBeenCalledWith(updatedPost);
      expect(emitSpy).toHaveBeenCalledWith('post.deleted', expectedEvent);
      expect(result).toEqual(updatedPost);
    });

    it('should throw NotFoundException when post is not found', async () => {
      const id = '1';
      const user = { id: '1', name: 'Tester' } as User;

      mockPostRepository.findOneBy.mockResolvedValue(undefined);

      await expect(service.remove(user, id)).rejects.toThrow(NotFoundException);
      expect(mockPostRepository.findOneBy).toHaveBeenCalledWith({ id });
      expect(mockPostRepository.save).not.toHaveBeenCalled();
      expect(mockEventEmitter.emit).not.toHaveBeenCalled();
    });
  });

  describe('bulkDelete', () => {
    it('should bulk delete posts successfully', async () => {
      const user = { id: '1', name: 'Tester' } as User;
      const bulkDeletePostDto = { ids: ['1', '2', '3'] } as BulkDeletePostDto;
      const deletedPost = { id: '1', status: POST_STATUS.DELETED } as Post;

      const queryBuilder = {
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(deletedPost)
      };

      mockPostRepository.createQueryBuilder.mockReturnValue(queryBuilder);
      mockPostRepository.save.mockResolvedValue(deletedPost);

      const expectedEvent = new PostDeletedEvent();

      expectedEvent.user = user;
      expectedEvent.oldPosts = [deletedPost, deletedPost, deletedPost];
      expectedEvent.newPosts = [deletedPost, deletedPost, deletedPost];

      const result = await service.bulkDelete(user, bulkDeletePostDto);

      expect(result).toEqual([deletedPost, deletedPost, deletedPost]);
      expect(queryBuilder.where).toHaveBeenCalledTimes(3);
      expect(queryBuilder.where).toHaveBeenNthCalledWith(1, 'post.id = :id', { id: '1' });
      expect(queryBuilder.where).toHaveBeenNthCalledWith(2, 'post.id = :id', { id: '2' });
      expect(queryBuilder.where).toHaveBeenNthCalledWith(3, 'post.id = :id', { id: '3' });
      expect(mockPostRepository.save).toHaveBeenCalledTimes(3);
      expect(mockPostRepository.save).toHaveBeenCalledWith(deletedPost);
      expect(mockEventEmitter.emit).toHaveBeenCalledWith('post.deleted', expectedEvent);
    });
  });
});
