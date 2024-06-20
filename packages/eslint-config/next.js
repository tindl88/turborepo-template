const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
    require.resolve('@vercel/style-guide/eslint/next'),
    'eslint-config-turbo'
  ],
  plugins: ['only-warn', '@typescript-eslint', 'simple-import-sort', 'import'],
  globals: {
    React: true,
    JSX: true
  },
  env: {
    node: true,
    browser: true
  },
  settings: {
    'import/resolver': {
      typescript: {
        project
      }
    },
    react: {
      version: 'detect'
    }
  },
  ignorePatterns: [
    // Ignore dotfiles
    '.*.js',
    'node_modules/'
  ],
  overrides: [{ files: ['*.js?(x)', '*.ts?(x)'] }],
  rules: {
    'no-console': 'error',
    'prefer-const': 'error',
    curly: 'off',
    'comma-dangle': [
      'error',
      { arrays: 'never', objects: 'never', imports: 'never', exports: 'never', functions: 'never' }
    ],
    'no-unused-vars': 'off',
    'no-case-declarations': 'off',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      { blankLine: 'always', prev: 'directive', next: '*' },
      { blankLine: 'any', prev: 'directive', next: 'directive' }
    ],
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        types: ['boolean'],
        format: ['PascalCase'],
        prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
        filter: {
          // NextJs|Next-Intl
          regex: '^(dynamicParams|revalidate|localeDetection)$',
          match: false
        }
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: { regex: '^I[A-Z]', match: true },
        filter: { regex: '^(ProcessEnv|Window)$', match: false }
      },
      { selector: 'class', format: ['PascalCase'] },
      { selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'allow' },
      { selector: 'memberLike', modifiers: ['private'], format: ['camelCase'], leadingUnderscore: 'allow' },
      { selector: 'typeLike', format: ['PascalCase', 'UPPER_CASE'] }
    ],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/named': 'off',
    'import/no-duplicates': 'error',
    'import/no-unresolved': 'error',
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off',
    'import/no-unused-modules': ['off', { unusedExports: true }],
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // `react` first, `next` second, then packages starting with a character
          ['^react$', '^next', '^[a-z]', '^@', '^@/libs', '^~ui', '^~shared-client'],
          ['^@/navigation'],
          ['^@/interfaces', '^\\.\\./interfaces'],
          ['^@/constants', '^\\.\\./constants'],
          ['^@/hooks', '^\\.\\./hooks'],
          ['^@/components', '^\\.\\./components'],
          ['^@/modules'],
          ['^@/utils', '^\\.\\./utils'],
          ['^@/http'],
          ['^@/stores'],
          ['^@/locales'],
          ['^@/assets'],
          ['^@mocks', '^@tests'],
          // Packages starting with `~`
          ['^~'],
          // Imports starting with `../`
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Imports starting with `./`
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports
          ['^.+\\.s?css$'],
          // Side effect imports
          ['^\\u0000']
        ]
      }
    ],
    'react-hooks/exhaustive-deps': 'off',
    'react/prop-types': 'off',
    'react/jsx-sort-props': [
      'warn',
      {
        callbacksLast: true,
        shorthandFirst: true,
        ignoreCase: true,
        reservedFirst: true,
        noSortAlphabetically: true
      }
    ]
  }
};
