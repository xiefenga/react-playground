import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

import stylistic from '@stylistic/eslint-plugin'


export default tseslint.config({
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ['**/*.{ts,tsx}'],
  ignores: ['dist'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    '@stylistic': stylistic ,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@stylistic/indent': ['error', 2],
    '@stylistic/quotes': ['error', 'single'],
    '@stylistic/jsx-wrap-multilines': ['error', {
      'declaration':'parens-new-line',
      'return': "parens-new-line",
      'arrow': "parens-new-line",
      'condition': "parens-new-line",
      'logical': "parens-new-line",
      'prop': "parens-new-line",
      'propertyValue': "parens-new-line",
      'assignment': "parens-new-line",
    }]
  },
})
