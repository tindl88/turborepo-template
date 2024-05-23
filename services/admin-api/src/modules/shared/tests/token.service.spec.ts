import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { MockConfigService } from '@mocks/config.service.mock';

import { IConfigs } from '@/common/interfaces/configs.interface';

import { USER_ROLE } from '@/modules/users/constants/user.constant';
import { User } from '@/modules/users/entities/user.entity';

import { TokenService } from '../token.service';

describe('TokenService', () => {
  let tokenService: TokenService;
  let configService: ConfigService<IConfigs>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        {
          provide: ConfigService,
          useClass: MockConfigService
        }
      ]
    }).compile();

    tokenService = module.get<TokenService>(TokenService);
    configService = module.get<ConfigService<IConfigs>>(ConfigService);
  });

  it('should be defined', () => {
    expect(tokenService).toBeDefined();
  });

  describe('createAccessToken', () => {
    it('should create an access token for the given user', async () => {
      jest.spyOn(configService, 'get').mockReturnValue({
        jwtSecretKey: 'mockSecretKey',
        jwtExpiresIn: '3600s'
      });

      const mockUser = { id: '1', name: 'Test User', email: 'test@example.com', role: USER_ROLE.SUPER_ADMIN } as User;

      const accessToken = await tokenService.createAccessToken(mockUser);

      expect(accessToken).not.toBeNull();
    });
  });

  describe('createRefreshToken', () => {
    it('should create a refresh token for the given user', async () => {
      jest
        .spyOn(configService, 'get')
        .mockReturnValue({ jwtRefreshSecretKey: 'mockRefreshSecretKey', jwtRefreshExpiresIn: '7200s' });

      const mockUser = { id: '1', name: 'Test User', email: 'test@example.com', role: USER_ROLE.SUPER_ADMIN } as User;

      const refreshToken = await tokenService.createRefreshToken(mockUser);

      expect(refreshToken).not.toBeNull();
    });
  });
});
