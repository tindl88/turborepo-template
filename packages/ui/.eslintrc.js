/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/react-internal.js'],
  parser: '@typescript-eslint/parser',
  ignorePatterns: [
    // Ignore dotfiles
    '.*.js',
    'node_modules/',
    'src/components/',
    'postcss.config.js',
    'tailwind.config.ts'
  ],
  rules: {
    'no-redeclare': 'off'
  }
};
