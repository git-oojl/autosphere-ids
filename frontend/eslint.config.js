import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'build/**'],
  },

  // 1. Base JS & Vue recommended configs
  js.configs.recommended,
  ...vue.configs['flat/recommended'],

  // 2. Global language options (Apply browser globals to all files)
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  // 3. Vue-specific overrides
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },

  // 4. JS-specific overrides
  {
    files: ['**/*.js'],
    rules: {
      'no-unused-vars': ['warn'],
    },
  },
  prettier,
];
