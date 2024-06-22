import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { getSecondBetweenTwoDates } from '@/common/utils/datetime.util';

import { UsersService } from '@/modules/users/users.service';

import { AUTH_AUTHENTICATOR, AUTH_PROVIDER, AUTH_TYPE } from './constants/auth.constant';
import { OAuthFacebookSignInDto, OAuthSignInDto, SignInDto } from './dto/auth.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyResetPasswordDto } from './dto/verify-reset-password.dto';
import { OAuthProfile } from './interfaces/auth.interface';
import { AppleService } from './apple.service';
import { FacebookService } from './facebook.service';
import { GoogleService } from './google.service';

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
    private refreshTokensService: RefreshTokensService,
    private tokenService: TokenService,
    private randomService: RandomService,
    private emailService: EmailService,
    private firebaseService: FirebaseService,
    private appleService: AppleService,
    private facebookService: FacebookService,
    private googleService: GoogleService
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
        preference: user.preference
      },
      accessToken,
      refreshToken
    };
  }

  async signInWithGoogle(oAuthSignInDto: OAuthSignInDto, ipAddress: string, userAgent: string) {
    const { token, authenticator } = oAuthSignInDto;
    let userInfo: OAuthProfile = null;

    if (authenticator === AUTH_AUTHENTICATOR.FIREBASE) {
      userInfo = await this.firebaseService.verifyIdToken(token);
    } else {
      userInfo = await this.googleService.verifyIdToken(token);
    }

    const userTransformed = await this.transformOAuthData(userInfo);

    let user = await this.usersService.findByEmail(userTransformed.email);

    if (user) {
      if (user.status !== USER_STATUS.ACTIVE) {
        throw new UnauthorizedException('User is inactive');
      }
    } else {
      user = await this.createNewUserFromOAuthProfile(AUTH_PROVIDER.GOOGLE, userTransformed);
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
        preference: user.preference
      },
      accessToken,
      refreshToken
    };
  }

  async signInWithFacebook(oAuthFacebookSignInDto: OAuthFacebookSignInDto, ipAddress: string, userAgent: string) {
    const { token, authenticator, isFacebookLimited } = oAuthFacebookSignInDto;
    let userInfo: OAuthProfile = null;

    if (authenticator === AUTH_AUTHENTICATOR.FIREBASE) {
      userInfo = await this.firebaseService.verifyIdToken(token);
    } else {
      if (isFacebookLimited) {
        userInfo = await this.facebookService.verifyAuthenticationToken(token);
      } else {
        userInfo = await this.facebookService.verifyAccessToken(token);
      }
    }

    const userTransformed = await this.transformOAuthData(userInfo);

    let user = await this.usersService.findByEmail(userTransformed.email);

    if (user) {
      if (user.status !== USER_STATUS.ACTIVE) {
        throw new UnauthorizedException('User is inactive');
      }
    } else {
      user = await this.createNewUserFromOAuthProfile(AUTH_PROVIDER.FACEBOOK, userTransformed);
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
        preference: user.preference
      },
      accessToken,
      refreshToken
    };
  }

  async signInWithApple(oAuthSignInDto: OAuthSignInDto, ipAddress: string, userAgent: string) {
    const { token, authenticator } = oAuthSignInDto;
    let userInfo: OAuthProfile = null;

    if (authenticator === AUTH_AUTHENTICATOR.FIREBASE) {
      userInfo = await this.firebaseService.verifyIdToken(token);
    } else {
      userInfo = await this.appleService.verifyIdToken(token);
    }

    const userTransformed = await this.transformOAuthData(userInfo);

    let user = await this.usersService.findByEmail(userTransformed.email);

    if (user) {
      if (user.status !== USER_STATUS.ACTIVE) {
        throw new UnauthorizedException('User is inactive');
      }
    } else {
      user = await this.createNewUserFromOAuthProfile(AUTH_PROVIDER.APPLE, userTransformed);
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

  async createNewUserFromOAuthProfile(provider: AUTH_PROVIDER, profile: OAuthProfile) {
    const newUser = await this.usersService.create({
      name: profile.name,
      avatar: profile.picture,
      email: profile.email,
      providerAccountId: profile.sub,
      provider,
      authType: AUTH_TYPE.OAUTH,
      gender: USER_GENDER.OTHER,
      status: USER_STATUS.ACTIVE,
      role: USER_ROLE.USER
    });

    return newUser;
  }

  private async transformOAuthData(oAuthResponse: OAuthProfile) {
    return {
      sub: oAuthResponse.sub,
      email: oAuthResponse.email,
      name: oAuthResponse.name,
      picture: oAuthResponse.picture
    } as OAuthProfile;
  }

  async signOut(refreshToken: string, ipAddress: string, userAgent: string) {
    return this.refreshTokensService.revoke(refreshToken, ipAddress, userAgent);
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
