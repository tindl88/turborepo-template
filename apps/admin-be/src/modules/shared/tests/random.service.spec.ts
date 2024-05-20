import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { MockConfigService } from '@mocks/config.service.mock';

import { RandomService } from '../random.service';

describe('RandomService', () => {
  let randomService: RandomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RandomService,
        {
          provide: ConfigService,
          useClass: MockConfigService
        }
      ]
    }).compile();

    randomService = module.get<RandomService>(RandomService);
  });

  it('should be defined', () => {
    expect(randomService).toBeDefined();
  });

  describe('generateCharacter', () => {
    it('should generate a string of the specified length when character set is not empty', () => {
      const characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const length = 10;

      const result = randomService.generateCharacter(characterSet, length);

      expect(result.length).toBe(length);
    });
  });
});
