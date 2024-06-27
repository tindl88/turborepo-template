import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  preset: 'react-native',
  verbose: true,
  rootDir: '.',
  testTimeout: 30000,
  setupFiles: ['./__tests__/unit/setup/jest/index.ts'],
  setupFilesAfterEnv: ['<rootDir>/__tests__/unit/setup/jest/after-env.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@tests/(.*)$': '<rootDir>/__tests__/$1',
    '^@mocks/(.*)$': '<rootDir>/__mocks__/$1',
    '^~shared-universal/(.*)$': '<rootDir>/../../packages/shared-universal/$1',
    '^~react-native-design-system/(.*)$': '<rootDir>/../../packages/react-native-design-system/$1',
    '^~react-native-ui-core/(.*)$': '<rootDir>/../../packages/react-native-ui-core/$1'
  },
  testMatch: ['<rootDir>/src/**/*.(test|spec).{ts,tsx}', '<rootDir>/__tests__/**/*.(test|spec).{ts,tsx}'],
  collectCoverageFrom: ['<rootDir>/src/**/*.(t|j)s', '!<rootDir>/src/**/docs/*'],
  coverageDirectory: './unit-coverage',
  coverageReporters: ['lcov']
};

export default jestConfig;
