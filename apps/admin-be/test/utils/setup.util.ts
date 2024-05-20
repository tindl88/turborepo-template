import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';

import { Application } from '@/setup-server';

import { BaseModule } from '@/modules/base/base.module';

export const setupTestingModules = async extraModules => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [BaseModule, ...extraModules]
  }).compile();

  const app = moduleFixture.createNestApplication<NestExpressApplication>(new ExpressAdapter(), {
    bufferLogs: true
  });

  const appSetup = new Application(app);

  await appSetup.setupGlobals();

  await app.init();

  return {
    app,
    moduleFixture
  };
};
