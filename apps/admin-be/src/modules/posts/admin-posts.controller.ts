import { Body, Controller, Delete, Get, HttpStatus, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { ApiDocumentResponse } from '@/common/decorators/api-document-response.decorator';
import { PaginatedResponse } from '@/common/decorators/paginated-response.decorator';
import { UUIDParam } from '@/common/decorators/param.decorator';
import { Response } from '@/common/decorators/response.decorator';

import {
  BulkDeletePostsSuccessDoc,
  CreatePostSuccessDoc,
  DeletePostSuccessDoc,
  GetPostFailureDoc,
  GetPostsSuccessDoc,
  GetPostSuccessDoc,
  UpdatePostSuccessDoc
} from './docs/posts.doc';
import { BulkDeletePostDto } from './dto/bulk-delete-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { FilterPostDto } from './dto/filter-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { User } from '../users/entities/user.entity';

@Controller('admin/posts')
@ApiTags('Admin Posts')
@UseGuards(AccessTokenGuard)
@ApiBearerAuth('accessToken')
export class AdminPostsController {
  constructor(private readonly postsService: PostsService) {}
  @Post()
  @ApiOperation({ summary: 'Create post' })
  @ApiDocumentResponse({ status: HttpStatus.CREATED, message: 'Create post successfully', model: CreatePostSuccessDoc })
  @Response({ message: 'Create post successfully' })
  create(@Req() req: Request, @Body() createPostDto: CreatePostDto) {
    const user = req.user as User;

    return this.postsService.create(user, createPostDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get posts' })
  @ApiDocumentResponse({ message: 'Get posts successfully', model: GetPostsSuccessDoc })
  @PaginatedResponse({ message: 'Get posts successfully' })
  find(@Query() filterDto: FilterPostDto) {
    return this.postsService.find(filterDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get post' })
  @ApiDocumentResponse({ message: 'Get post successfully', model: GetPostSuccessDoc })
  @Response({ message: 'Get post successfully' })
  @ApiParam({ name: 'id', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
  findOne(@UUIDParam('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update post' })
  @ApiDocumentResponse({ message: 'Update post successfully', model: UpdatePostSuccessDoc })
  @Response({ message: 'Update post successfully' })
  @ApiParam({ name: 'id', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
  update(@Req() req: Request, @UUIDParam('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const user = req.user as User;

    return this.postsService.update(user, id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete post' })
  @ApiDocumentResponse({ message: 'Delete post successfully', model: DeletePostSuccessDoc })
  @ApiDocumentResponse({ status: HttpStatus.NOT_FOUND, message: 'Post not found', model: GetPostFailureDoc })
  @Response({ message: 'Delete post successfully' })
  @ApiParam({ name: 'id', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
  remove(@Req() req: Request, @UUIDParam('id') id: string) {
    const user = req.user as User;

    return this.postsService.remove(user, id);
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Delete multiple posts' })
  @Response({ message: 'Delete posts successfully' })
  @ApiDocumentResponse({ message: 'Delete post successfully', model: BulkDeletePostsSuccessDoc })
  bulkDelete(@Req() req: Request, @Body() bulkDeletePostDto: BulkDeletePostDto) {
    const user = req.user as User;

    return this.postsService.bulkDelete(user, bulkDeletePostDto);
  }
}
