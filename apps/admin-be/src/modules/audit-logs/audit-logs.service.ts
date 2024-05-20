import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginationDto } from '@/common/dtos/pagination.dto';
import { PaginationResponseDto } from '@/common/dtos/pagination-response.dto';

import { AUDIT_LOG_GET_FIELDS } from './constants/audit-log.constant';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { FilterAuditLogDto } from './dto/filter-audit-log.dto';
import { AuditLog } from './entities/audit-log.entity';

@Injectable()
export class AuditLogsService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditLogRepository: Repository<AuditLog>
  ) {}

  async create(createAuditLogDto: CreateAuditLogDto) {
    const auditLog = this.auditLogRepository.create(createAuditLogDto);

    const response = await this.auditLogRepository.save(auditLog);

    return response;
  }

  async find(filterDto: FilterAuditLogDto) {
    const { skip, limit } = filterDto;
    const queryBuilder = this.auditLogRepository.createQueryBuilder('audit');

    queryBuilder.select(AUDIT_LOG_GET_FIELDS);
    queryBuilder.leftJoin('audit.user', 'user');
    queryBuilder.orderBy('audit.createdAt', 'DESC');
    queryBuilder.skip(skip).take(limit);

    const totalItems = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const paginationDto = new PaginationDto({ totalItems, filterDto });

    return new PaginationResponseDto(entities, { paging: paginationDto });
  }
}
