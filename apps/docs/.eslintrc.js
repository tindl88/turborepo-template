const { resolve } = require('path');

const project = resolve(__dirname, 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/next.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project
      }
    }
  },
  ignorePatterns: [
    // Ignore dotfiles
    '.*.js',
    'node_modules/',
    'i18n.ts',
    'tailwind.config.ts',
    'vitest.config.ts',
    'playwright.config.ts',
    'next.config.js',
    'prettier.config.js',
    'postcss.config.js'
  ]
};
