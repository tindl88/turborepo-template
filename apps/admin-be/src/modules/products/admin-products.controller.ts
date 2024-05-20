import { Body, Controller, Delete, Get, HttpStatus, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { ApiDocumentResponse } from '@/common/decorators/api-document-response.decorator';
import { PaginatedResponse } from '@/common/decorators/paginated-response.decorator';
import { UUIDParam } from '@/common/decorators/param.decorator';
import { Response } from '@/common/decorators/response.decorator';

import {
  BulkDeleteProductsSuccessDoc,
  CreateProductSuccessDoc,
  DeleteProductSuccessDoc,
  GetProductFailureDoc,
  GetProductsSuccessDoc,
  GetProductSuccessDoc,
  UpdateProductSuccessDoc
} from './docs/products.doc';
import { BulkDeleteProductDto } from './dto/bulk-delete-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

import { AccessTokenGuard } from '../auth/guards/access-token.guard';

@Controller('admin/products')
@ApiTags('Admin Products')
@UseGuards(AccessTokenGuard)
@ApiBearerAuth('accessToken')
export class AdminProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  @ApiOperation({ summary: 'Create product' })
  @ApiDocumentResponse({
    status: HttpStatus.CREATED,
    message: 'Create product successfully',
    model: CreateProductSuccessDoc
  })
  @Response({ message: 'Create product successfully' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get products' })
  @ApiDocumentResponse({ message: 'Get products successfully', model: GetProductsSuccessDoc })
  @PaginatedResponse({ message: 'Get products successfully' })
  find(@Query() filterDto: FilterProductDto) {
    return this.productsService.find(filterDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product' })
  @ApiDocumentResponse({ message: 'Get product successfully', model: GetProductSuccessDoc })
  @Response({ message: 'Get product successfully' })
  @ApiParam({ name: 'id', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
  findOne(@UUIDParam('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update product' })
  @ApiDocumentResponse({ message: 'Update product successfully', model: UpdateProductSuccessDoc })
  @Response({ message: 'Update product successfully' })
  @ApiParam({ name: 'id', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
  update(@UUIDParam('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product' })
  @ApiDocumentResponse({ message: 'Delete product successfully', model: DeleteProductSuccessDoc })
  @ApiDocumentResponse({ status: HttpStatus.NOT_FOUND, message: 'Product not found', model: GetProductFailureDoc })
  @Response({ message: 'Delete product successfully' })
  @ApiParam({ name: 'id', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
  remove(@UUIDParam('id') id: string) {
    return this.productsService.remove(id);
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Delete multiple products' })
  @Response({ message: 'Delete products successfully' })
  @ApiDocumentResponse({ message: 'Delete product successfully', model: BulkDeleteProductsSuccessDoc })
  bulkDelete(@Body() bulkDeleteProductDto: BulkDeleteProductDto) {
    return this.productsService.bulkDelete(bulkDeleteProductDto);
  }
}
