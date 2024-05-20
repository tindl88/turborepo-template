import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Request, Response as ExpressResponse } from 'express';

import { ApiDocumentResponse } from '@/common/decorators/api-document-response.decorator';
import { Response } from '@/common/decorators/response.decorator';

import { LogOutDoc } from './docs/log-out';
import { LoginWithCredentialsDoc } from './docs/login-with-credentials.doc';
import { LoginWithFacebookDoc } from './docs/login-with-facebook.doc';
import { LoginWithGoogleDoc } from './docs/login-with-google.doc';
import { ResetPasswordDoc } from './docs/reset-password.doc';
import { SignUpDoc } from './docs/sign-up.doc';
import { VerifyResetPasswordDoc } from './docs/verify-reset-password.doc';
import { OAuthSignInDto, SignInDto, SignOutDto } from './dto/auth.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyResetPasswordDto } from './dto/verify-reset-password.dto';
import { AuthService } from './auth.service';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Post('login')
  @Throttle({ default: { limit: 10, ttl: 10000 } })
  @ApiOperation({ summary: 'Login with credentials' })
  @ApiDocumentResponse({ message: 'Login successfully', model: LoginWithCredentialsDoc })
  @Response({ message: 'Login successfully' })
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) response: ExpressResponse,
    @Body() signInDto: SignInDto
  ) {
    const ip = req.ip as string;
    const ua = req.headers['user-agent'] || '';

    const resp = await this.authService.signIn(signInDto, ip, ua);

    response.cookie('refreshToken', resp.user.refreshToken);

    delete resp.user.refreshToken;

    return resp;
  }

  @Post('login/google')
  @ApiOperation({ summary: 'Login with Google' })
  @ApiDocumentResponse({ message: 'Login successfully', model: LoginWithGoogleDoc })
  @Response({ message: 'Login successfully' })
  async signInWithGoogle(
    @Req() req: Request,
    @Res({ passthrough: true }) response: ExpressResponse,
    @Body() oAuthSignInDto: OAuthSignInDto
  ) {
    const ip = req.ip as string;
    const ua = req.headers['user-agent'] || '';

    const resp = await this.authService.signInWithGoogle(oAuthSignInDto, ip, ua);

    response.cookie('refreshToken', resp.user.refreshToken);

    delete resp.user.refreshToken;

    return resp;
  }

  @Post('login/facebook')
  @ApiOperation({ summary: 'Login with Facebook' })
  @ApiDocumentResponse({ message: 'Login successfully', model: LoginWithFacebookDoc })
  @Response({ message: 'Login successfully' })
  async signInWithFacebook(
    @Req() req: Request,
    @Res({ passthrough: true }) response: ExpressResponse,
    @Body() oAuthSignInDto: OAuthSignInDto
  ) {
    const ip = req.ip as string;
    const ua = req.headers['user-agent'] || '';

    const resp = await this.authService.signInWithFacebook(oAuthSignInDto, ip, ua);

    response.cookie('refreshToken', resp.user.refreshToken);

    delete resp.user.refreshToken;

    return resp;
  }

  @Post('logout')
  @ApiOperation({ summary: 'Log out' })
  @ApiDocumentResponse({ message: 'Logout successfully', model: LogOutDoc })
  @Response({ message: 'Logout successfully' })
  async signOut(@Req() req: Request, @Body() signOutDto: SignOutDto) {
    const ip = req.ip as string;
    const ua = req.headers['user-agent'] || '';

    return this.authService.signOut(signOutDto, ip, ua);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Create account' })
  @ApiDocumentResponse({ message: 'Create account successfully', model: SignUpDoc })
  @Response({ message: 'Create account successfully' })
  async signUp(@Body() createUserDto: CreateUserDto) {
    const resp = await this.usersService.create(createUserDto);

    return resp;
  }

  @Post('reset-password-for-mobile')
  @Throttle({ default: { limit: 1, ttl: 1800000 } })
  @ApiOperation({ summary: 'Reset password for Mobile' })
  @ApiDocumentResponse({ message: 'Reset password successfully', model: ResetPasswordDoc })
  @Response({ message: 'Reset password successfully' })
  async resetPasswordForMobile(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPasswordForMobile(resetPasswordDto);
  }

  @Post('verify-reset-password-code')
  @Throttle({ default: { limit: 1, ttl: 1800000 } })
  @ApiOperation({ summary: 'Verify reset password for Mobile' })
  @ApiDocumentResponse({ message: 'Verify reset password successfully', model: VerifyResetPasswordDoc })
  @Response({ message: 'Verify reset password successfully' })
  async verifyResetPasswordCode(@Body() verifyResetPasswordDto: VerifyResetPasswordDto) {
    return this.authService.verifyResetPasswordCode(verifyResetPasswordDto);
  }
}
