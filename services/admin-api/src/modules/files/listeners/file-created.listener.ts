import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

import { THUMBNAIL_WIDTH, VALID_IMAGE_MIME_TYPES } from '../constants/file.constant';
import { FileCreatedEvent } from '../events/file-created.event';

@Injectable()
export class FileCreatedListener {
  @OnEvent('file.created')
  async handleFileCreatedEvent(event: FileCreatedEvent) {
    const { files, fileInfos } = event;

    try {
      const destinationPath = path.join(__dirname, '../../../..', 'uploads');
      const thumbnailPath = path.join(destinationPath, 'thumbnails');

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileInfo = fileInfos[i];
        const filePath = path.join(destinationPath, fileInfo.uniqueName);

        fs.access(destinationPath, fs.constants.F_OK, checkDirErr => {
          if (checkDirErr) throw new NotFoundException(`Path ${destinationPath} does not exist`);

          fs.writeFile(filePath, file.buffer, writeErr => {
            if (writeErr) throw new UnprocessableEntityException(`Can not write ${filePath}`);

            if (VALID_IMAGE_MIME_TYPES.includes(fileInfo.mime)) {
              sharp(filePath)
                .resize(THUMBNAIL_WIDTH, null, { fit: 'contain' })
                .toFile(path.join(thumbnailPath, fileInfo.uniqueName), thumbErr => {
                  if (thumbErr) {
                    if (thumbErr) throw new UnprocessableEntityException('Can not create thumbnail');
                  }
                });
            }
          });
        });
      }
    } catch (error) {
      throw new UnprocessableEntityException('Event file.created::' + error.message);
    }
  }
}
