import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Query,
  UploadedFiles,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { ApiDocumentResponse } from '@/common/decorators/api-document-response.decorator';
import { ApiFiles } from '@/common/decorators/api-files.decorator';
import { PaginatedResponse } from '@/common/decorators/paginated-response.decorator';
import { UUIDParam } from '@/common/decorators/param.decorator';
import { Response } from '@/common/decorators/response.decorator';

import { MAX_FILE_SIZE_IN_BYTES, MAX_FILES_TO_UPLOAD, VALID_ALL_MIME_TYPES } from './constants/file.constant';
import {
  BulkDeleteFilesSuccessDoc,
  DeleteFileBadRequestDoc,
  DeleteFileSuccessDoc,
  GetFileFailureDoc,
  GetFilesSuccessDoc,
  UploadBadRequestDoc,
  UploadSuccessDoc
} from './docs/files.doc';
import { BulkDeleteFileDto } from './dto/bulk-delete-file.dto';
import { FilterFileDto } from './dto/filter-file.dto';
import { UploadDto } from './dto/upload.dto';
import { UploadFileTypeValidator } from './validators/upload.validator';
import { FilesService } from './files.service';

import { AccessTokenGuard } from '../auth/guards/access-token.guard';

@Controller('admin/files')
@UseGuards(AccessTokenGuard)
@ApiTags('Admin Files')
@ApiBearerAuth('accessToken')
export class AdminFilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload multiple files' })
  @ApiDocumentResponse({ status: HttpStatus.CREATED, message: 'Upload successfully', model: UploadSuccessDoc })
  @ApiDocumentResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'File is required',
    model: UploadBadRequestDoc
  })
  @Response({ status: HttpStatus.CREATED, message: 'Upload successfully' })
  @ApiFiles('files', true, MAX_FILES_TO_UPLOAD, {}, { categoryId: { type: 'string' } })
  async uploadFiles(
    @Body() body: UploadDto,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addValidator(new UploadFileTypeValidator({ fileType: VALID_ALL_MIME_TYPES }))
        .addMaxSizeValidator({ maxSize: MAX_FILE_SIZE_IN_BYTES })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY })
    )
    files: Array<Express.Multer.File>
  ) {
    return await this.filesService.uploadFiles(body, files);
  }

  @Get()
  @ApiOperation({ summary: 'Get files' })
  @ApiDocumentResponse({ message: 'Get files successfully', model: GetFilesSuccessDoc })
  @PaginatedResponse({ message: 'Get files successfully' })
  find(@Query() filterDto: FilterFileDto) {
    return this.filesService.find(filterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete file' })
  @ApiDocumentResponse({ status: HttpStatus.OK, message: 'Delete file successfully', model: DeleteFileSuccessDoc })
  @ApiDocumentResponse({
    status: HttpStatus.BAD_REQUEST,
    message: 'Param id must be an UUID value',
    model: DeleteFileBadRequestDoc
  })
  @ApiDocumentResponse({ status: HttpStatus.NOT_FOUND, message: 'File not found', model: GetFileFailureDoc })
  @Response({ message: 'Delete file successfully' })
  @ApiParam({ name: 'id', description: 'UUID', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
  remove(@UUIDParam('id') id: string) {
    return this.filesService.remove(id);
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Delete multiple files' })
  @Response({ message: 'Delete files successfully' })
  @ApiDocumentResponse({ message: 'Delete file successfully', model: BulkDeleteFilesSuccessDoc })
  bulkDelete(@Body() bulkDeleteFileDto: BulkDeleteFileDto) {
    return this.filesService.bulkDelete(bulkDeleteFileDto);
  }
}
