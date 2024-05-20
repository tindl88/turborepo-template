const { resolve } = require('path');

const project = resolve(__dirname, 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/node.js'],
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
    'dist/'
  ]
};
