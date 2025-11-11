import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import react from 'eslint-plugin-react'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tseslint from 'typescript-eslint'

export default [
  // Ignorar pastas comuns
  {
    ignores: ['dist', 'node_modules', 'coverage'],
  },

  // Configurações base
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: ['src/**/*.{ts,tsx}', 'vite.config.ts'],
  })),

  // ==== 1) Código do app (src) ====
  {
    files: ['src/**/*.{ts,tsx}'],

    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.app.json'],
      },
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort,
    },

    settings: {
      react: { version: 'detect' },
    },

    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...reactRefresh.configs.vite.rules,
      'react/react-in-jsx-scope': 'off', // Desabilita a regra de que o React deve ser importado explicitamente

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',

      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },

  // ==== 2) Arquivos Node (vite.config.ts) ====
  {
    files: ['vite.config.ts'],

    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.node,
      parserOptions: {
        project: ['./tsconfig.node.json'],
      },
    },

    plugins: {
      'simple-import-sort': simpleImportSort,
    },

    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
]
