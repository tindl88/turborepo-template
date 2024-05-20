import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  rootDir: '.',
  testTimeout: 30000,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@tests/(.*)$': '<rootDir>/__tests__/$1',
    '^@mocks/(.*)$': '<rootDir>/__mocks__/$1'
  },
  testMatch: ['<rootDir>/src/**/*.(test|spec).ts'],
  transform: { '^.+\\.(t|j)s$': 'ts-jest' },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(t|j)s',
    '!<rootDir>/**/*.module.ts',
    '!<rootDir>/src/database/**/*',
    '!<rootDir>/src/**/docs/*',
    '!<rootDir>/src/**/dto/*'
  ],
  coverageDirectory: './unit-coverage',
  coverageReporters: ['lcov']
};

export default jestConfig;
