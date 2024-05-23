import { AuditLogFilter, AuditLogsResponse } from '../interfaces/audit-logs.interface';

import { API_ENDPOINTS } from '@/constants/api-endpoint.constant';

import { objectToQueryString } from '@/utils/querystring.util';

import HttpRequest from '@/http/http-request';

export const list = (filter: AuditLogFilter) => {
  const url = API_ENDPOINTS.AUDIT_LOGS + '?' + objectToQueryString(filter);

  return HttpRequest.get<AuditLogsResponse>(url);
};

const AuditLogApi = { list };

export default AuditLogApi;
