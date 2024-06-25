import { ResponseFormat } from '@/interfaces/api-response.interface';
import { BaseFilter } from '@/interfaces/filter.interface';

import { CATEGORY_STATUS, CATEGORY_TYPE } from '../constants/categories.constant';

export type CategoryEntity = {
  id: string;
  name: string;
  slug: string;
  path: string;
  type: CATEGORY_TYPE;
  status: CATEGORY_STATUS;
  parent?: CategoryEntity | null;
  children?: CategoryEntity[] | null;
  createdAt?: string;
  updatedAt?: string;
  category: CategoryEntity;
};

export type CategoryFormData = {
  name: string;
  slug: string;
  type: CATEGORY_TYPE;
  status: CATEGORY_STATUS;
  categoryId: string;
};

export type CategoriesResponse = ResponseFormat<CategoryEntity[]>;
export type CategoryResponse = ResponseFormat<CategoryEntity>;

export type CategoryFilter = BaseFilter & {
  parentId?: string | null;
  type?: CATEGORY_TYPE;
};
