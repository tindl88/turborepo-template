'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { PhotoEntity, PhotoFilter } from '../interfaces/photos.interface';

type UsePhotosParams = {
  initialData?: PhotoEntity[];
};

type UsePhotosProps = {
  data: PhotoEntity[];
  totalCount: number;
  filter: PhotoFilter;
  setFilter: (filter: PhotoFilter) => void;
};

export const usePhotos = (options?: UsePhotosParams): UsePhotosProps => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [totalCount, setTotalCount] = useState(0);
  const [filter, setFilter] = useState<PhotoFilter>({
    q: searchParams.get('q') || '',
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 10
  });

  const fetchData = async (filterParam: PhotoFilter): Promise<PhotoEntity[]> => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos?q=${filterParam.q}&_start=${0}&_end=${100}`
    );

    setTotalCount(Number(response.headers.get('x-total-count')) || 0);

    return response.json();
  };

  const res = useQuery({ queryKey: ['photos', filter], queryFn: () => fetchData(filter) });

  useEffect(() => {
    const params = new URLSearchParams(filter as string);

    router.push(pathname + '?' + params.toString());
  }, [filter]);

  return {
    ...res,
    data: res.data || options?.initialData || [],
    totalCount,
    filter,
    setFilter
  };
};
