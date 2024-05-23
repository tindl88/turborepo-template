import { UnsupportedMediaTypeException } from '@nestjs/common';
import { Request } from 'express';
import fileType from 'file-type';
import path from 'path';

export const getFileName = (file: Express.Multer.File) => {
  const fileName = path.basename(file.originalname, path.extname(file.originalname));

  return fileName;
};

export const getFileExtension = async (file: Express.Multer.File) => {
  let ext = path.extname(file.originalname);

  if (!ext) {
    const mimeType = await fileType.fromBuffer(file.buffer);

    ext = `.${mimeType.ext}`;
  }

  return ext;
};

export function mimetypeFilter(...mimetypes: string[]) {
  return (req: Request, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {
    if (mimetypes.some(m => file.mimetype.includes(m))) {
      callback(null, true);
    } else {
      callback(new UnsupportedMediaTypeException(`File type is not matching: ${mimetypes.join(', ')}`), false);
    }
  };
}
