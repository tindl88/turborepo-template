import { FileCheckIcon, XCircleIcon } from 'lucide-react';

import { FileFilter } from '../interfaces/files.interface';

export const MAX_FILES_TO_UPLOAD = 5;
export const MAX_FILE_SIZE_IN_BYTES = 10 * 1024 * 1024;

export const VALID_IMAGE_MIME_TYPES = ['image/webp', 'image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
export const VALID_AUDIO_MIME_TYPES = ['audio/webm', 'audio/mpeg', 'audio/wav'];
export const VALID_VIDEO_MIME_TYPES = ['video/webm', 'video/mp4', 'video/x-msvideo'];
export const VALID_COMPRESS_MIME_TYPES = ['application/vnd.rar', 'application/x-rar-compressed', 'application/zip'];
export const VALID_DOCUMENT_MIME_TYPES = [
  'text/plain',
  'text/xml',
  'application/xml',
  'application/pdf',
  'application/json',
  'application/msword',
  'application/vnd.ms-excel',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation'
];
export const VALID_ALL_MIME_TYPES = [
  ...VALID_IMAGE_MIME_TYPES,
  ...VALID_AUDIO_MIME_TYPES,
  ...VALID_VIDEO_MIME_TYPES,
  ...VALID_COMPRESS_MIME_TYPES,
  ...VALID_DOCUMENT_MIME_TYPES
];

export type FileDialogType = 'list' | 'single' | 'multiple';

export enum FILE_STATUS {
  VISIBLED = 'visibled',
  DELETED = 'deleted'
}

export enum FILE_ACTION {
  DELETE = 'delete',
  AUDIT_LOG = 'audit_log'
}

export const DEFAULT_FILTER: FileFilter = {
  categoryId: '',
  q: '',
  mime: '',
  page: 1,
  limit: 50,
  order: 'DESC',
  status: []
};

export const STATUSES = [
  {
    label: 'Visibled',
    value: FILE_STATUS.VISIBLED,
    textClassName: 'text-slate-500',
    bgClassName: 'bg-slate-500/10',
    borderClassName: 'border-slate-400',
    activeClassName: 'after:bg-slate-400',
    icon: FileCheckIcon
  },
  {
    label: 'Deleted',
    value: FILE_STATUS.DELETED,
    textClassName: 'text-red-500',
    bgClassName: 'bg-red-500/10',
    borderClassName: 'border-red-400',
    activeClassName: 'after:bg-red-400',
    icon: XCircleIcon
  }
];
