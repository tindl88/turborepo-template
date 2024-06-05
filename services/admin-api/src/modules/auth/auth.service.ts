import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DecodedIdToken } from 'firebase-admin/auth';
import { Repository } from 'typeorm';

import { getSecondBetweenTwoDates } from '@/common/utils/datetime.util';

import { UsersService } from '@/modules/users/users.service';

import { AUTH_PROVIDER, AUTH_TYPE } from './constants/auth.constant';
import { OAuthSignInDto, SignInDto } from './dto/auth.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyResetPasswordDto } from './dto/verify-reset-password.dto';

import { FirebaseService } from '../firebase/firebase.service';
import { RefreshTokensService } from '../refresh-tokens/refresh-tokens.service';
import { EmailService } from '../shared/email.service';
import { RandomService } from '../shared/random.service';
import { TokenService } from '../shared/token.service';
import { USER_GENDER, USER_ROLE, USER_STATUS } from '../users/constants/user.constant';
import { User } from '../users/entities/user.entity';
import { UserPreference } from '../users/entities/user-preference.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private usersService: UsersService,
    private httpService: HttpService,
    private refreshTokensService: RefreshTokensService,
    private tokenService: TokenService,
    private randomService: RandomService,
    private emailService: EmailService,
    private firebaseService: FirebaseService
  ) {}

  async signIn(signInDto: SignInDto, ipAddress: string, userAgent: string) {
    const { email, password } = signInDto;

    const user = await this.usersService.findByEmailAndPassword(email, password);

    if (user) {
      if (user.status !== USER_STATUS.ACTIVE) {
        throw new UnauthorizedException('User is inactive');
      }
    } else {
      throw new UnauthorizedException('User not found');
    }

    const accessToken = await this.tokenService.createAccessToken(user);

    const refreshToken = await this.tokenService.createRefreshToken(user);

    await this.refreshTokensService.create({
      user,
      token: refreshToken,
      createdByIp: ipAddress,
      userAgent
    });

    if (!user.preference?.id) {
      user.preference = new UserPreference();
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        avatar: user.avatar,
        preference: user.preference,
        accessToken,
        refreshToken
      }
    };
  }

  async signInWithGoogle(oAuthSignInDto: OAuthSignInDto, ipAddress: string, userAgent: string) {
    const { token } = oAuthSignInDto;

    const userInfo = await this.firebaseService.verifyIdToken(token);

    let user = await this.usersService.findByEmail(userInfo.email);

    if (user) {
      if (user.status !== USER_STATUS.ACTIVE) {
        throw new UnauthorizedException('User is inactive');
      }
    } else {
      user = await this.createNewUserFromOAuthProfile(AUTH_PROVIDER.GOOGLE, userInfo);
    }

    const accessToken = await this.tokenService.createAccessToken(user);

    const refreshToken = await this.tokenService.createRefreshToken(user);

    this.refreshTokensService.create({ user, token: refreshToken, createdByIp: ipAddress, userAgent });

    if (!user.preference?.id) {
      user.preference = new UserPreference();
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        avatar: user.avatar,
        preference: user.preference,
        accessToken,
        refreshToken
      }
    };
  }

  async signInWithFacebook(oAuthSignInDto: OAuthSignInDto, ipAddress: string, userAgent: string) {
    const { token } = oAuthSignInDto;

    const userInfo = await this.firebaseService.verifyIdToken(token);

    let user = await this.usersService.findByEmail(userInfo.email);

    if (user) {
      if (user.status !== USER_STATUS.ACTIVE) {
        throw new UnauthorizedException('User is inactive');
      }
    } else {
      user = await this.createNewUserFromOAuthProfile(AUTH_PROVIDER.FACEBOOK, userInfo);
    }
    const accessToken = await this.tokenService.createAccessToken(user);

    const refreshToken = await this.tokenService.createRefreshToken(user);

    this.refreshTokensService.create({ user, token: refreshToken, createdByIp: ipAddress, userAgent });

    if (!user.preference?.id) {
      user.preference = new UserPreference();
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        avatar: user.avatar,
        preference: user.preference,
        accessToken,
        refreshToken
      }
    };
  }

  async signInWithApple(oAuthSignInDto: OAuthSignInDto, ipAddress: string, userAgent: string) {
    const { token } = oAuthSignInDto;

    const userInfo = await this.firebaseService.verifyIdToken(token);

    let user = await this.usersService.findByEmail(userInfo.email);

    if (user) {
      if (user.status !== USER_STATUS.ACTIVE) {
        throw new UnauthorizedException('User is inactive');
      }
    } else {
      user = await this.createNewUserFromOAuthProfile(AUTH_PROVIDER.APPLE, userInfo);
    }
    const accessToken = await this.tokenService.createAccessToken(user);

    const refreshToken = await this.tokenService.createRefreshToken(user);

    this.refreshTokensService.create({ user, token: refreshToken, createdByIp: ipAddress, userAgent });

    if (!user.preference?.id) {
      user.preference = new UserPreference();
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        avatar: user.avatar,
        preference: user.preference,
        accessToken,
        refreshToken
      }
    };
  }

  async signOut(refreshToken: string, ipAddress: string, userAgent: string) {
    return this.refreshTokensService.revoke(refreshToken, ipAddress, userAgent);
  }

  async createNewUserFromOAuthProfile(provider: AUTH_PROVIDER, profile: DecodedIdToken) {
    const email = profile.email;
    const name = profile.name ?? email.split('@')[0];

    const newUser = await this.usersService.create({
      name,
      email,
      avatar: profile.picture,
      emailVerified: Boolean(profile.email_verified),
      locale: profile.locale,
      providerAccountId: profile.sub,
      provider,
      authType: AUTH_TYPE.OAUTH,
      gender: USER_GENDER.OTHER,
      status: USER_STATUS.ACTIVE,
      role: USER_ROLE.USER
    });

    return newUser;
  }

  async resetPasswordForMobile(resetPasswordDto: ResetPasswordDto) {
    const user = await this.usersService.findByEmail(resetPasswordDto.email);

    if (!user) throw new NotFoundException('User not found');

    const randomNumber = this.randomService.generateRandomNumber();
    const resetPasswordTemplate = this.emailService.getTemplate('email/reset-password.html');
    const emailResult = this.emailService.sendGmail(
      user.email,
      'Reset Password',
      `Code: ${randomNumber}`,
      resetPasswordTemplate.replace('[code]', randomNumber)
    );

    if (!emailResult) throw new BadRequestException('Can not send email');

    const newUser = { recoveryCode: randomNumber, recoveredAt: new Date() } as User;

    this.usersService.update(user.id, newUser);

    return {
      code: randomNumber
    };
  }

  async verifyResetPasswordCode(verifyResetPasswordDto: VerifyResetPasswordDto) {
    const user = await this.userRepository.findOneBy({
      email: verifyResetPasswordDto.email,
      recoveryCode: verifyResetPasswordDto.code
    });

    if (!user) throw new BadRequestException('Code is invalid');

    const currentDate = new Date();
    const recoveredAt = new Date(user.recoveredAt);

    const seconds = getSecondBetweenTwoDates(recoveredAt, currentDate);

    if (seconds >= 1800) {
      throw new BadRequestException('Code is expired');
    }

    const newUser = { recoveryCode: null, recoveredAt: null } as User;

    this.usersService.update(user.id, newUser);
  }
}
