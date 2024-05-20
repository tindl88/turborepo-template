import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginationDto } from '@/common/dtos/pagination.dto';
import { PaginationResponseDto } from '@/common/dtos/pagination-response.dto';

import { toSlug } from '@/common/utils/string.util';

import { FILE_STATUS } from './constants/file.constant';
import { BulkDeleteFileDto } from './dto/bulk-delete-file.dto';
import { FilterFileDto } from './dto/filter-file.dto';
import { UploadDto } from './dto/upload.dto';
import { File } from './entities/file.entity';
import { FileCreatedEvent } from './events/file-created.event';
import { getFileExtension, getFileName } from './utils/file.util';

import { Category } from '../categories/entities/category.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async uploadFiles(body: UploadDto, files: Array<Express.Multer.File>) {
    try {
      const uploadedFileInfos = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const originalName = file.originalname;
        const caption = getFileName(file);
        const ext = await getFileExtension(file);
        const mime = file.mimetype;
        const size = file.size;
        const uniqueName = toSlug(getFileName(file)) + '-' + new Date().getTime() + ext;
        const fileInfo = { name: originalName, uniqueName, caption, size, ext, mime, isTemp: false } as File;

        if (body.categoryId) {
          fileInfo.category = { id: body.categoryId } as Category;
        }

        uploadedFileInfos.push(fileInfo);

        const fileData = this.fileRepository.create(fileInfo);

        await this.fileRepository.save(fileData);
      }

      const fileCreateEvent = new FileCreatedEvent();

      fileCreateEvent.files = files;
      fileCreateEvent.fileInfos = uploadedFileInfos;

      this.eventEmitter.emit('file.created', fileCreateEvent);

      return uploadedFileInfos;
    } catch (error) {
      throw new BadRequestException('Failed to save files:' + error.message);
    }
  }

  async find(filterDto: FilterFileDto) {
    const { q, order, status, sort, mime, categoryId } = filterDto;

    const fields =
      'file.id file.caption file.uniqueName file.mime file.ext file.size file.isTemp file.status file.createdAt category.id category.name'.split(
        ' '
      );

    const queryBuilder = this.fileRepository
      .createQueryBuilder('file')
      .select(fields)
      .leftJoin('file.category', 'category');

    if (status) queryBuilder.where('file.status in (:...status)', { status });
    if (categoryId) {
      queryBuilder.andWhere('category.id = :categoryId', { categoryId });
    }
    if (q) {
      queryBuilder.andWhere('LOWER(file.name) LIKE LOWER(:name)', { name: `%${q}%` });
      queryBuilder.orWhere('LOWER(file.caption) LIKE LOWER(:caption)', { caption: `%${q}%` });
    }
    if (mime) {
      queryBuilder.andWhere('LOWER(file.mime) LIKE LOWER(:mime)', { mime: `${mime}%` });
    }
    if (sort) {
      queryBuilder.orderBy(`file.${sort}`, order.toUpperCase() as 'ASC' | 'DESC');
    } else if (order) {
      queryBuilder.orderBy('file.createdAt', order.toUpperCase() as 'ASC' | 'DESC');
    }

    queryBuilder.skip(filterDto.skip).take(filterDto.limit);

    const totalItems = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const paginationDto = new PaginationDto({ totalItems, filterDto });

    return new PaginationResponseDto(entities, { paging: paginationDto });
  }

  async remove(id: string) {
    const file = await this.fileRepository.findOneBy({ id });

    if (!file) {
      throw new NotFoundException('File not found');
    }

    file.status = FILE_STATUS.DELETED;

    return this.fileRepository.save(file);
  }

  async bulkDelete(bulkDeleteFileDto: BulkDeleteFileDto) {
    const queryBuilder = this.fileRepository
      .createQueryBuilder()
      .update(File)
      .set({ status: FILE_STATUS.DELETED })
      .whereInIds(bulkDeleteFileDto.ids);
    const data = await queryBuilder.returning('id, status').execute();

    return data.raw;
  }
}
