import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'CallExpression[callee.property.name="parse"][arguments.length=1]',
          message: 'Direct usage of schema.parse() is not allowed. Use ZodService.parse(schema, data) instead.',
        },
        {
          selector: 'CallExpression[callee.property.name="safeParse"][arguments.length=1]',
          message: 'Direct usage of schema.safeParse() is not allowed. Use ZodService.safeParse(schema, data) instead.',
        },
        {
          selector: 'CallExpression[callee.object.name="z"][callee.property.name="parse"]',
          message: 'Direct usage of z.parse() is not allowed. Use ZodService.parse() instead.',
        },
        {
          selector: 'CallExpression[callee.object.name="z"][callee.property.name="safeParse"]',
          message: 'Direct usage of z.safeParse() is not allowed. Use ZodService.safeParse() instead.',
        },
      ],
    },
  },
  {
    // Allow parse and safeParse in internal service files
    files: ['**/zod-service.ts', '**/zod-logger.ts'],
    rules: {
      'no-restricted-syntax': 'off',
    },
  },
])
