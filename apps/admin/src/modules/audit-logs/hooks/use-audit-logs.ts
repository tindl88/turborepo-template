'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { useRouter } from '@/navigation';

import { ResponseMeta } from '@/interfaces/api-response.interface';
import { AuditLogEntity, AuditLogFilter } from '../interfaces/audit-logs.interface';

import { AUDIT_LOG_DEFAULT_FILTER } from '../constants/audit-logs.constant';

import useDeepCompareEffect from '@/hooks/use-deep-compare-effect';

import AuditLogApi from '../api/audit-logs.api';

type UsePhotosProps = {
  isFetching: boolean;
  meta?: ResponseMeta;
  items: AuditLogEntity[];
  filter: AuditLogFilter;
  setFilter: (filter: AuditLogFilter) => void;
};

export const useAuditLogs = (): UsePhotosProps => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState<AuditLogFilter>({
    page: parseInt(searchParams.get('page') as string) || AUDIT_LOG_DEFAULT_FILTER.page,
    limit: parseInt(searchParams.get('limit') as string) || AUDIT_LOG_DEFAULT_FILTER.limit
  });

  const { data, isFetching } = useQuery({
    queryKey: ['audit-logs', filter],
    queryFn: async () => {
      const response = await AuditLogApi.list(filter);

      return response.data;
    }
  });

  useDeepCompareEffect(() => {
    const customFilter = {
      ...filter,
      sidebar: searchParams.get('sidebar')
    } as AuditLogFilter & { sidebar: string };

    router.push({ pathname: '/audit-logs', query: customFilter });
  }, [filter]);

  return {
    isFetching,
    meta: data?.meta,
    items: data?.data || [],
    filter,
    setFilter
  };
};
