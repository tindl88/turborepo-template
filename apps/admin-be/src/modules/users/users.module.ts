import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UserPreference } from './entities/user-preference.entity';
import { UserCreatedListener } from './listeners/user-created.listener';
import { UserUpdatedListener } from './listeners/user-updated.listener';
import { AdminUsersController } from './admin-users.controller';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersPreferencesService } from './users-preferences.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserPreference])],
  controllers: [UsersController, AdminUsersController],
  providers: [UsersService, UsersPreferencesService, JwtService, UserCreatedListener, UserUpdatedListener],
  exports: [UsersService]
})
export class UsersModule {}
