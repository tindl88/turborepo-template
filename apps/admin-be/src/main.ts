import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';

import { IConfigs } from './common/interfaces/configs.interface';
import { AppModule } from './modules/app/app.module';
import { Application } from './setup-server';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(), { bufferLogs: true });
  const configService = app.get(ConfigService);
  const { port } = configService.get<IConfigs['app']>('app');

  const appSetup = new Application(app);

  await appSetup.setupGlobals();

  await appSetup.setupDocument();

  await app.listen(port, '0.0.0.0');

  const logger = await appSetup.setupLogger();

  await appSetup.setupProcess(logger);
}

bootstrap();
