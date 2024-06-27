const { resolve } = require('path');

const project = resolve(__dirname, 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/react-native.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: { project },
  settings: {
    'import/resolver': {
      typescript: { project }
    }
  },
  ignorePatterns: ['prettier.config.js'],
  rules: {
    'no-redeclare': 'off'
  }
};
