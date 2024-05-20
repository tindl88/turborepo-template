import { ConfigService } from '@nestjs/config';

import { IConfigs } from '@/common/interfaces/configs.interface';

export class MockConfigService implements Partial<ConfigService<IConfigs>> {
  get<T>(_propertyPath: string): T {
    return {} as T;
  }
}
