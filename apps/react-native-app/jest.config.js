/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'react-native',
  verbose: true,
  rootDir: './',
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup/jest-setup.ts'],
  testMatch: ['<rootDir>/src/**/*.(test|spec).?(c|m)[jt]s?(x)', '<rootDir>/__tests__/**/*.(test|spec).?(c|m)[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {'^@/(.*)$': '<rootDir>/src/$1'},
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // transform: {
  //   '^.+\\.jsx$': 'babel-jest',
  //   '^.+\\.tsx?$': ['ts-jest', {tsconfig: 'tsconfig.spec.json'}]
  // },
  transformIgnorePatterns: ['node_modules/(?!(@react-native|react-native|react-native-code-push)/)']
};
