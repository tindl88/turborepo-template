import { NestExpressApplication } from '@nestjs/platform-express';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { hashPassword } from '@/common/utils/password.util';

import { AuthModule } from '@/modules/auth/auth.module';
import { Post } from '@/modules/posts/entities/post.entity';
import { PostsModule } from '@/modules/posts/posts.module';
import { RefreshToken } from '@/modules/refresh-tokens/entities/refresh-token.entity';
import { USER_ROLE, USER_STATUS } from '@/modules/users/constants/user.constant';
import {
  USER_PREFERENCE_COLOR_SCHEME,
  USER_PREFERENCE_LANGUAGE
} from '@/modules/users/constants/user-preference.constant';
import { UserPreference } from '@/modules/users/entities/user-preference.entity';
import { UsersService } from '@/modules/users/users.service';

import { login, logout } from './utils/auth.util';
import { setupTestingModules } from './utils/setup.util';

describe('AuthController (e2e)', () => {
  let myApp: NestExpressApplication;
  let usersService: UsersService;
  let postRepository: Repository<Post>;
  let refreshTokenRepository: Repository<RefreshToken>;

  beforeAll(async () => {
    const { app, moduleFixture } = await setupTestingModules([AuthModule, PostsModule]);

    myApp = app;

    usersService = moduleFixture.get(UsersService);

    // Get relations
    postRepository = moduleFixture.get(getRepositoryToken(Post));
    refreshTokenRepository = moduleFixture.get(getRepositoryToken(RefreshToken));

    // Find user
    const user = await usersService.findByEmail(process.env.AP_USER_EMAIL);

    // Remove relations and user if exists
    if (user) {
      const posts = await postRepository.findBy({ creator: { email: process.env.AP_USER_EMAIL } });
      const refreshTokens = await refreshTokenRepository.findBy({ user: { email: process.env.AP_USER_EMAIL } });

      await postRepository.remove(posts);
      await refreshTokenRepository.remove(refreshTokens);
      await user.remove();
    }

    // Create new user
    const userPreference = new UserPreference();

    await usersService.create({
      email: process.env.AP_USER_EMAIL,
      password: hashPassword(process.env.AP_USER_PASSWORD),
      name: 'test',
      role: USER_ROLE.SUPER_ADMIN,
      status: USER_STATUS.ACTIVE,
      preference: userPreference
    });
  });

  afterAll(async () => {
    myApp.close();
  });

  describe('#login [POST]', () => {
    it('returns returns 400 - Bad Request if credentials is invalid', async () => {
      const response = await login(myApp, { email: '', password: '' });

      expect(response.body).toMatchObject({
        statusCode: 400,
        error: 'Bad Request',
        message: [
          'email must be an email',
          'email should not be empty',
          'password has to be at between 6 and 50 chars',
          'password should not be empty'
        ]
      });
    });

    it('should not returns user if credentials are incorrect', async () => {
      const response = await login(myApp, { email: 'dummy@email.com', password: 'dummypassword' });

      expect(response.body).toMatchObject({ statusCode: 401, error: 'Unauthorized', message: 'User not found' });
    });

    it('should returns user if credentials are correct', async () => {
      const response = await login(myApp, { email: process.env.AP_USER_EMAIL, password: process.env.AP_USER_PASSWORD });

      expect(response.body).toMatchObject({ statusCode: 200, message: 'Login successfully' });
      expect(response.body.data.user).toMatchObject({
        email: process.env.AP_USER_EMAIL,
        role: USER_ROLE.SUPER_ADMIN,
        name: 'test',
        avatar: null,
        accessToken: expect.any(String)
      });
      expect(response.body.data.user.preference).toMatchObject({
        language: USER_PREFERENCE_LANGUAGE.UNITED_STATES,
        theme: USER_PREFERENCE_COLOR_SCHEME.DARK
      });
    });
  });

  describe('#logout [POST]', () => {
    it('should returns 400 - Bad Request if token is empty', async () => {
      const response = await logout(myApp, { token: '' });

      expect(response.body).toMatchObject({
        statusCode: 400,
        error: 'Bad Request',
        message: ['token should not be empty']
      });
    });

    it('should return 404 - Not Found if token is incorrect', async () => {
      const response = await logout(myApp, { token: 'wrongtoken' });

      expect(response.body).toMatchObject({
        statusCode: 404,
        error: 'Not Found',
        message: 'Refresh token not found'
      });
    });

    it('should return 200 - Success if token is correct', async () => {
      const loginResponse = await login(myApp, {
        email: process.env.AP_USER_EMAIL,
        password: process.env.AP_USER_PASSWORD
      });

      const refreshTokenNode = loginResponse.headers['set-cookie']?.filter((x: string) => x.includes('refreshToken='));
      const refreshToken = refreshTokenNode?.[0].split('=')[1].split(';')[0];

      const response = await logout(myApp, { token: refreshToken });

      expect(response.body).toMatchObject({ statusCode: 200, message: 'Logout successfully' });
      expect(response.body.data).toMatchObject({
        status: 'success'
      });
    });
  });
});
