import { Body, Controller, HttpStatus, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { ApiDocumentResponse } from '@/common/decorators/api-document-response.decorator';
import { Response } from '@/common/decorators/response.decorator';

import {
  UpdateUserPreferenceBadRequestDoc,
  UpdateUserPreferenceSuccessDoc,
  UserPreferenceNotFoundDoc
} from './docs/user-preference.doc';
import { UpdateUserPreferenceDto } from './dto/update-user-preference.dto';
import { User } from './entities/user.entity';
import { UsersPreferencesService } from './users-preferences.service';

import { AccessTokenGuard } from '../auth/guards/access-token.guard';

@Controller({ path: 'users' })
@ApiTags('Users')
@UseGuards(AccessTokenGuard)
@ApiBearerAuth('accessToken')
export class UsersController {
  constructor(private readonly usersPreferencesService: UsersPreferencesService) {}

  @Patch('preferences')
  @ApiOperation({ summary: 'Update user preferences' })
  @ApiDocumentResponse({
    status: HttpStatus.OK,
    message: 'Update user preference successfully',
    model: UpdateUserPreferenceSuccessDoc
  })
  @ApiDocumentResponse({ status: HttpStatus.NOT_FOUND, message: 'User not found', model: UserPreferenceNotFoundDoc })
  @ApiDocumentResponse({
    status: HttpStatus.BAD_REQUEST,
    message: 'Data should not be empty',
    model: UpdateUserPreferenceBadRequestDoc
  })
  @Response({ message: 'Update user preference successfully' })
  updatePreference(@Req() req: Request, @Body() updateUserPreferenceDto: UpdateUserPreferenceDto) {
    const user = req.user as User;

    return this.usersPreferencesService.updateReference(user.id, updateUserPreferenceDto);
  }
}
