const { resolve } = require('path');

const project = resolve(__dirname, 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/next.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: { project },
  settings: {
    'import/resolver': {
      typescript: { project }
    },
    react: {
      version: 'detect'
    }
  },
  ignorePatterns: [
    'next.config.mjs',
    'playwright.config.ts',
    'postcss.config.mjs',
    'prettier.config.js',
    'tailwind.config.ts',
    'vitest.config.ts'
  ]
};
