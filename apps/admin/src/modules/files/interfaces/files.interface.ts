import { ResponseFormat } from '@/interfaces/api-response.interface';
import { BaseFilter } from '@/interfaces/filter.interface';

import { FILE_STATUS } from '../constants/files.constant';

import { CategoryEntity } from '@/modules/categories/interfaces/categories.interface';

export type FileEntity = {
  id: string;
  name: string;
  uniqueName: string;
  mime: string;
  caption: string;
  ext: string;
  size: number;
  status: FILE_STATUS;
  category: CategoryEntity;
  createdAt: string;
  updatedAt: string;
};

export type UploadDto = { categoryId?: string | null; files: FileList };
export type CreateFileDto = Omit<FileEntity, 'id'>;
export type UpdateFileDto = Partial<CreateFileDto>;

export type FilesResponse = ResponseFormat<FileEntity[]>;
export type FileResponse = ResponseFormat<FileEntity>;

export type FileFilter = BaseFilter & {
  categoryId?: string;
  mime?: string;
};
