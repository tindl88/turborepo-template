import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { ReferenceObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export function ApiFiles(
  fieldName: string = 'files',
  required: boolean = false,
  maxCount: number = 10,
  localOptions?: MulterOptions,
  additionalFields?: Record<string, SchemaObject | ReferenceObject>
) {
  return applyDecorators(
    UseInterceptors(FilesInterceptor(fieldName, maxCount, localOptions)),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        required: required ? [fieldName] : [],
        properties: {
          ...additionalFields,
          [fieldName]: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary'
            }
          }
        }
      }
    })
  );
}
