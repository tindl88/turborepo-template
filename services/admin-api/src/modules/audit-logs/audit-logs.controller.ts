import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

// import { ApiDocumentResponse } from '@/common/decorators/api-document-response.decorator';
import { PaginatedResponse } from '@/common/decorators/paginated-response.decorator';

import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { FilterAuditLogDto } from './dto/filter-audit-log.dto';
import { AuditLogsService } from './audit-logs.service';

import { AccessTokenGuard } from '../auth/guards/access-token.guard';

@Controller('admin/audit-logs')
@ApiTags('Admin Audit Logs')
@UseGuards(AccessTokenGuard)
@ApiBearerAuth('accessToken')
export class AuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  @Post()
  create(@Body() createAuditLogDto: CreateAuditLogDto) {
    return this.auditLogsService.create(createAuditLogDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get audit logs' })
  // @ApiDocumentResponse({ message: 'Get audit logs successfully', model: GetPostsSuccessDoc })
  @PaginatedResponse({ message: 'Get audit logs successfully' })
  find(@Query() filterDto: FilterAuditLogDto) {
    return this.auditLogsService.find(filterDto);
  }
}
