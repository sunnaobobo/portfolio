import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import eslintConfigPrettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...nextVitals,
  ...nextTypescript,
  {
    ignores: [
      '.next/**',
      '.turbo/**',
      'dist/**',
      'node_modules/**',
      'src/generated/**',
      'next-env.d.ts',
      '**/*.js',
      '**/*.mjs',
      '**/*.jsx',
    ],
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'simple-import-sort/exports': 'warn',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            ['^@?\\w', '^\\u0000'],
            ['^@/components', '^@/providers'],
            ['^@/hooks'],
            ['^@/utils', '^@/helpers', '^@/lib'],
            ['^@/'],
            ['^\\.'],
            ['^.*\\u0000$', '^@/types'],
            ['^.+\\.s?css$'],
            ['^'],
          ],
        },
      ],
    },
  },
  eslintConfigPrettier,
];

export default config;
