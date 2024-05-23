import { EntityId } from '@reduxjs/toolkit';

import {
  CreateFileDto,
  FileFilter,
  FileResponse,
  FilesResponse,
  UpdateFileDto,
  UploadDto
} from '../interfaces/files.interface';

import { API_ENDPOINTS } from '@/constants/api-endpoint.constant';

import { objectToQueryString } from '@/utils/querystring.util';

import HttpRequest from '@/http/http-request';

export const list = (filter: FileFilter) => {
  const url = API_ENDPOINTS.FILES + '?' + objectToQueryString(filter);

  return HttpRequest.get<FilesResponse>(url);
};

export const upload = (uploadDto: UploadDto) => {
  const formData = new FormData();

  if (uploadDto.categoryId) formData.append('categoryId', uploadDto.categoryId);

  for (let i = 0; i < uploadDto.files.length; i++) {
    const file = uploadDto.files[i];

    if (file) {
      formData.append('files', file);
    }
  }

  return HttpRequest.post<FilesResponse>(API_ENDPOINTS.FILES + '/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const create = (_createFileDto: CreateFileDto) => {};

export const read = (id: EntityId) => {
  return HttpRequest.get<FileResponse>(`${API_ENDPOINTS.FILES}/${id}`);
};

export const update = (id: EntityId, updateFileDto: UpdateFileDto) => {
  return HttpRequest.patch<FileResponse>(`${API_ENDPOINTS.FILES}/${id}`, updateFileDto);
};

export const destroy = (id: EntityId) => {
  return HttpRequest.delete<FileResponse>(`${API_ENDPOINTS.FILES}/${id}`);
};

export const bulkDestroy = (payload: { ids: EntityId[] }) => {
  return HttpRequest.post<FilesResponse>(`${API_ENDPOINTS.FILES}/bulk-delete`, payload);
};

const FileApi = { upload, list, create, read, update, destroy, bulkDestroy };

export default FileApi;
