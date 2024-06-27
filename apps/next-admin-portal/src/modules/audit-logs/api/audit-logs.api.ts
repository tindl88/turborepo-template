import { AuditLogFilter, AuditLogsResponse } from '../interfaces/audit-logs.interface';

import { API_ENDPOINTS } from '@/constants/api-endpoint.constant';

import axiosClient from '@/http/http-request';

import { removeUndefined } from '~shared-universal/utils/object.util';
import { objectToQueryString } from '~shared-universal/utils/string.util';

export const list = (filter: AuditLogFilter) => {
  const url = API_ENDPOINTS.AUDIT_LOGS + '?' + objectToQueryString(removeUndefined(filter));

  return axiosClient.get<AuditLogsResponse>(url);
};

const AuditLogApi = { list };

export default AuditLogApi;
