import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { ApiDocumentResponse } from '@/common/decorators/api-document-response.decorator';
import { PaginatedResponse } from '@/common/decorators/paginated-response.decorator';
import { Response } from '@/common/decorators/response.decorator';

import { GetProductsSuccessDoc, GetProductSuccessDoc } from './docs/products.doc';
import { FilterProductDto } from './dto/filter-product.dto';
import { ProductsService } from './products.service';

import { AccessTokenGuard } from '../auth/guards/access-token.guard';

@Controller('products')
@ApiTags('Products')
@UseGuards(AccessTokenGuard)
@ApiBearerAuth('accessToken')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get products' })
  @ApiDocumentResponse({ message: 'Get products successfully', model: GetProductsSuccessDoc })
  @PaginatedResponse({ message: 'Get products successfully' })
  find(@Query() filterDto: FilterProductDto) {
    return this.productsService.find(filterDto);
  }

  @Get('.by.slug/:slug')
  @ApiOperation({ summary: 'Get product by slug' })
  @ApiDocumentResponse({ message: 'Get product successfully', model: GetProductSuccessDoc })
  @Response({ message: 'Get product successfully' })
  @ApiParam({ name: 'slug', example: 'this-is-title-of-product' })
  findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }
}
