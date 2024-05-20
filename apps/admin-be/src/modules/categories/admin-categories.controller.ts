import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

import { ApiDocumentResponse } from '@/common/decorators/api-document-response.decorator';
import { PaginatedResponse } from '@/common/decorators/paginated-response.decorator';
import { UUIDParam } from '@/common/decorators/param.decorator';
import { Response } from '@/common/decorators/response.decorator';

import {
  BulkDeleteCategoriesSuccessDoc,
  CreateCategoryConflictDoc,
  CreateCategorySuccessDoc,
  GetCategoriesSuccessDoc,
  GetCategoryFailureDoc,
  GetCategorySuccessDoc,
  GetCategoryTreesSuccessDoc,
  RemoveCategorySuccessDoc,
  UpdateCategorySuccessDoc
} from './docs/categories.doc';
import { BulkDeleteCategoryDto } from './dto/bulk-delete-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FilterCategoryDto } from './dto/filter-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesService } from './categories.service';

import { AccessTokenGuard } from '../auth/guards/access-token.guard';

@Controller('admin/categories')
@UseGuards(AccessTokenGuard)
@ApiTags('Admin Categories')
@ApiBearerAuth('accessToken')
export class AdminCategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create category' })
  @ApiDocumentResponse({
    status: HttpStatus.CREATED,
    message: 'Create category successfully',
    model: CreateCategorySuccessDoc
  })
  @ApiDocumentResponse({
    status: HttpStatus.CONFLICT,
    message: 'Category already exists',
    model: CreateCategoryConflictDoc
  })
  @Response({ status: HttpStatus.CREATED, message: 'Create category successfully' })
  create(@Body() createFolderDto: CreateCategoryDto) {
    return this.categoriesService.create(createFolderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get categories' })
  @ApiDocumentResponse({
    status: HttpStatus.OK,
    message: 'Get categories successfully',
    model: GetCategoriesSuccessDoc
  })
  @PaginatedResponse({ message: 'Get categories successfully' })
  find(@Query() filterCategoryDto: FilterCategoryDto) {
    return this.categoriesService.find(filterCategoryDto);
  }

  @Get('trees')
  @ApiOperation({ summary: 'Get category tree' })
  @ApiDocumentResponse({
    status: HttpStatus.OK,
    message: 'Get category tree successfully',
    model: GetCategoryTreesSuccessDoc
  })
  @Response({ status: HttpStatus.OK, message: 'Get category tree successfully' })
  @ApiQuery({ name: 'parentId', required: false, description: 'Enter parentId to get tree of a category' })
  getTrees(@Query() filterCategoryDto: FilterCategoryDto) {
    return this.categoriesService.getTrees(filterCategoryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category' })
  @ApiDocumentResponse({ status: HttpStatus.OK, message: 'Get category successfully', model: GetCategorySuccessDoc })
  @ApiDocumentResponse({ status: HttpStatus.NOT_FOUND, message: 'Category not found', model: GetCategoryFailureDoc })
  @Response({ status: HttpStatus.OK, message: 'Get category successfully' })
  @ApiParam({ name: 'id', description: 'UUID', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update category' })
  @ApiDocumentResponse({ message: 'Update category successfully', model: UpdateCategorySuccessDoc })
  @ApiDocumentResponse({ status: HttpStatus.NOT_FOUND, message: 'Category not found', model: GetCategoryFailureDoc })
  @Response({ message: 'Update category successfully' })
  @ApiParam({ name: 'id', description: 'UUID', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
  update(@UUIDParam('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove category' })
  @ApiDocumentResponse({
    status: HttpStatus.OK,
    message: 'Remove category successfully',
    model: RemoveCategorySuccessDoc
  })
  @ApiDocumentResponse({ status: HttpStatus.NOT_FOUND, message: 'Category not found', model: GetCategoryFailureDoc })
  @Response({ status: HttpStatus.OK, message: 'Remove category successfully' })
  @ApiParam({ name: 'id', description: 'UUID', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Delete multiple categories' })
  @Response({ message: 'Delete categories successfully' })
  @ApiDocumentResponse({ message: 'Delete categories successfully', model: BulkDeleteCategoriesSuccessDoc })
  bulkDelete(@Body() bulkDeletePostDto: BulkDeleteCategoryDto) {
    return this.categoriesService.bulkDelete(bulkDeletePostDto);
  }
}
