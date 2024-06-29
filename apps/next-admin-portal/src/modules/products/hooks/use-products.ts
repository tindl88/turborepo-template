import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import CategoryApi from '@/modules/categories/api/categories.api';
import { CATEGORY_TYPE } from '@/modules/categories/constants/categories.constant';

import ProductApi from '../api/products.api';

type CategoryFormFilter = {
  type?: CATEGORY_TYPE;
};

type UseProductsProps = {
  isEdit: boolean;
  productId: string;
};

function useProducts({ isEdit, productId }: UseProductsProps) {
  const [formFilter, refetchCategories] = useState<CategoryFormFilter>({ type: CATEGORY_TYPE.PRODUCT });
  const {
    data: product,
    isFetched: isPostFetched,
    isFetching: isPostFetching
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const productResp = await ProductApi.read(productId);

      return productResp.data.data;
    },
    enabled: isEdit,
    staleTime: 0,
    gcTime: 0
  });
  const {
    data: categories,
    isFetched: isCategoriesFetched,
    isFetching: isCategoriesFetching
  } = useQuery({
    queryKey: ['categories', formFilter],
    queryFn: async () => {
      const categoriesResp = await CategoryApi.list({ type: formFilter.type });

      return categoriesResp.data.data;
    },
    staleTime: 0,
    gcTime: 0
  });

  const isFetched = isCategoriesFetched;
  const isFetching = isCategoriesFetching;

  return {
    isFetched,
    isFetching,
    isPostFetched,
    isPostFetching,
    isCategoriesFetched,
    isCategoriesFetching,
    product,
    categories,
    refetchCategories
  };
}

export default useProducts;
