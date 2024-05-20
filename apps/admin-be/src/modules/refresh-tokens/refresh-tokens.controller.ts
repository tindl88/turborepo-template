import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response as ExpressResponse } from 'express';

import { ApiDocumentResponse } from '@/common/decorators/api-document-response.decorator';
import { Response } from '@/common/decorators/response.decorator';

import { RefreshRefreshTokenSuccessDoc, RevokeRefreshTokenSuccessDoc } from './docs/refresh-tokens.doc';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RefreshTokensService } from './refresh-tokens.service';

import { RefreshTokenGuard } from '../auth/guards/refresh-token.guard';
import { User } from '../users/entities/user.entity';

@Controller('refresh-tokens')
@UseGuards(RefreshTokenGuard)
@ApiTags('Refresh Tokens')
export class RefreshTokensController {
  constructor(private readonly refreshTokensService: RefreshTokensService) {}

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh refresh token' })
  @ApiDocumentResponse({ message: 'Refresh refresh token successfully', model: RefreshRefreshTokenSuccessDoc })
  @Response({ message: 'Refresh refresh token successfully' })
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) response: ExpressResponse,
    @Body() refreshTokenDto: RefreshTokenDto
  ) {
    const user = req.user as User;
    const ip = req.ip as string;
    const ua = req.headers['user-agent'] || '';

    const resp = await this.refreshTokensService.refresh(user.id, refreshTokenDto.token, ip, ua);

    response.cookie('refreshToken', resp.user.refreshToken);

    delete resp.user.refreshToken;

    return {
      accessToken: resp.user.accessToken
    };
  }

  @Post('revoke')
  @ApiOperation({ summary: 'Revoke refresh token' })
  @ApiDocumentResponse({ message: 'Revoke refresh token successfully', model: RevokeRefreshTokenSuccessDoc })
  @Response({ message: 'Revoke refresh token successfully' })
  async revoke(@Req() req: Request, @Body() refreshTokenDto: RefreshTokenDto) {
    const ip = req.ip as string;
    const ua = req.headers['user-agent'] || '';

    return this.refreshTokensService.revoke(refreshTokenDto.token, ip, ua);
  }
}
