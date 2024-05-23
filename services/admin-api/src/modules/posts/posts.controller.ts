import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { ApiDocumentResponse } from '@/common/decorators/api-document-response.decorator';
import { PaginatedResponse } from '@/common/decorators/paginated-response.decorator';
import { Response } from '@/common/decorators/response.decorator';

import { GetPostsSuccessDoc, GetPostSuccessDoc } from './docs/posts.doc';
import { FilterPostDto } from './dto/filter-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({ summary: 'Get posts' })
  @ApiDocumentResponse({ message: 'Get posts successfully', model: GetPostsSuccessDoc })
  @PaginatedResponse({ message: 'Get posts successfully' })
  find(@Query() filterDto: FilterPostDto) {
    return this.postsService.find(filterDto);
  }

  @Get('.by.slug/:slug')
  @ApiOperation({ summary: 'Get post by slug' })
  @ApiDocumentResponse({ message: 'Get post successfully', model: GetPostSuccessDoc })
  @Response({ message: 'Get post successfully' })
  @ApiParam({ name: 'slug', example: 'this-is-title-of-post' })
  findBySlug(@Param('slug') slug: string) {
    return this.postsService.findBySlug(slug);
  }
}
