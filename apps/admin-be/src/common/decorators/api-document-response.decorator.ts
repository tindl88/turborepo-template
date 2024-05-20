import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ClassConstructor } from 'class-transformer';

export const ApiDocumentResponse = <T>(response: {
  status?: HttpStatus;
  message?: string;
  model: ClassConstructor<T>;
}) => {
  return applyDecorators(
    ApiExtraModels(response.model),
    ApiResponse({
      status: response.status || HttpStatus.OK,
      description: response.message,
      schema: { $ref: getSchemaPath(response.model) }
    })
  );
};
