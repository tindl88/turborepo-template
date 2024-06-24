import { objectToQueryString } from '~shared-client/utils/querystring.util';

import { AuditLogFilter, AuditLogsResponse } from '../interfaces/audit-logs.interface';

import { API_ENDPOINTS } from '@/constants/api-endpoint.constant';

import axiosClient from '@/http/http-request';

export const list = (filter: AuditLogFilter) => {
  const url = API_ENDPOINTS.AUDIT_LOGS + '?' + objectToQueryString(filter);

  return axiosClient.get<AuditLogsResponse>(url);
};

const AuditLogApi = { list };

export default AuditLogApi;
