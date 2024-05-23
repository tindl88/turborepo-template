import { ResponseFormat } from '@/interfaces/api-response.interface';
import { BaseFilter } from '@/interfaces/filter.interface';

import { PRODUCT_STATUS } from '../constants/products.constant';

import { FileEntity } from '@/modules/files/interfaces/files.interface';
import { UserEntity } from '@/modules/users/interfaces/users.interface';

export type ProductEntity = {
  id: string;
  name: string;
  slug: string;
  body: string;
  status: PRODUCT_STATUS;
  creator: UserEntity;
  cover: string;
  images: FileEntity[];
  createdAt: string;
  updatedAt: string;
};

export type CreateProductDto = Omit<ProductEntity, 'id'>;
export type UpdateProductDto = Partial<CreateProductDto>;

export type ProductsResponse = ResponseFormat<ProductEntity[]>;
export type ProductResponse = ResponseFormat<ProductEntity>;

export type ProductFilter = BaseFilter;
