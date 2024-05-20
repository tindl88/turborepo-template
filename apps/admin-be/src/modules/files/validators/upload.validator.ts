import { FileValidator } from '@nestjs/common';
import fileType from 'file-type';

export type UploadTypeValidatorOptions = {
  fileType: string[];
};

export class UploadFileTypeValidator extends FileValidator {
  private allowedMimeTypes: string[];

  constructor(protected readonly validationOptions: UploadTypeValidatorOptions) {
    super(validationOptions);
    this.allowedMimeTypes = this.validationOptions.fileType;
  }

  public async isValid(file?: Express.Multer.File) {
    const mimeType = await fileType.fromBuffer(file.buffer);

    return this.allowedMimeTypes.includes(mimeType.mime);
  }

  public buildErrorMessage(): string {
    return `Upload not allowed. Upload only files of type: ${this.allowedMimeTypes.join(', ')}`;
  }
}
