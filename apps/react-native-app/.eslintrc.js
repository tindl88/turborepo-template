const { resolve } = require('path');

const project = resolve(__dirname, 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/react-native.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: { project },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {
        project
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    },
    react: {
      version: 'detect'
    }
  },
  ignorePatterns: [
    'cli',
    'index.js',
    '.eslintrc.js',
    'nativewind-env.d.ts',
    'babel.config.js',
    'metro.config.js',
    'prettier.config.js',
    'react-native.config.js',
    'jest.config.ts',
    'tailwind.config.js',
    'vitest.config.ts'
  ]
};
