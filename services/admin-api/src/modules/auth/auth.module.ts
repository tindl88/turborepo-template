import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { AppleService } from './apple.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FacebookService } from './facebook.service';
import { GoogleService } from './google.service';

import { FirebaseService } from '../firebase/firebase.service';
import { RefreshTokensModule } from '../refresh-tokens/refresh-tokens.module';
import { EmailService } from '../shared/email.service';
import { RandomService } from '../shared/random.service';
import { TokenService } from '../shared/token.service';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PassportModule, HttpModule, UsersModule, RefreshTokensModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    TokenService,
    RandomService,
    EmailService,
    FirebaseService,
    AppleService,
    FacebookService,
    GoogleService
  ]
})
export class AuthModule {}
