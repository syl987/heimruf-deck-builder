// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const eslintConfigPrettier = require('eslint-config-prettier');
const eslintPluginDeprecation = require('eslint-plugin-deprecation');
const eslintPluginImport = require('eslint-plugin-import');
const eslintPluginSimplImportSort = require('eslint-plugin-simple-import-sort');
const eslintPluginUnusedImports = require('eslint-plugin-unused-imports');
const eslintPluginNgrx = require('@ngrx/eslint-plugin');
const eslintPluginRegexp = require('eslint-plugin-regexp');
const eslintPluginRxjs = require('eslint-plugin-rxjs');

/* import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginDeprecation from 'eslint-plugin-deprecation';
import * as eslintPluginImport from 'eslint-plugin-import';
import eslintPluginSimplImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import eslintPluginNgrx from '@ngrx/eslint-plugin';
import eslintPluginRegexp from 'eslint-plugin-regexp';
import eslintPluginRxjs from 'eslint-plugin-rxjs'; */

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    /* languageOptions: {
      parserOptions: { project: ['tsconfig.app.json'] },
    }, */
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.strict,
      ...tseslint.configs.stylistic, // new
      ...angular.configs.tsRecommended,
      eslintPluginDeprecation.configs.recommended,
      eslintPluginImport.configs.recommended,
      eslintPluginNgrx.configs['strict-requiring-type-checking'],
      eslintPluginRegexp.configs.recommended,
      eslintPluginRxjs.configs.recommended,
      eslintConfigPrettier,
    ],
    processor: angular.processInlineTemplates,
    plugins: {
      'simple-import-sort': eslintPluginSimplImportSort,
      'unused-imports': eslintPluginUnusedImports,
    },
    rules: {
      // ==== deprecation ====
      'deprecation/deprecation': ['warn'],

      // ==== imports ====
      'import/first': 'warn',
      'import/newline-after-import': 'warn',
      'import/no-duplicates': 'warn',
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      'unused-imports/no-unused-imports': 'warn',

      // ==== regexp ====
      'regexp/sort-character-class-elements': 'warn',

      // ==== rxjs ====
      'rxjs/no-ignored-notifier': 'warn',
      'rxjs/no-implicit-any-catch': 'off', // currently unused
      'rxjs/no-sharereplay': 'off',
      'rxjs/no-unsafe-subject-next': 'warn',

      // ==== @ngrx ====
      '@ngrx/on-function-explicit-return-type': 'off', // recommended override: avoid ugly code by prettier

      // ==== eslint: possible problems ====
      'no-self-compare': 'warn',
      'no-unreachable-loop': 'warn',
      'no-unused-private-class-members': 'warn',

      // ==== eslint: suggestions ====
      'arrow-body-style': 'off', // generic override: conflicts with @ngrx/prefer-effect-callback-in-block-statement
      'curly': 'warn',
      'default-case-last': 'warn',
      'eqeqeq': ['warn', 'always', { null: 'ignore' }],
      'func-style': ['warn', 'declaration', { allowArrowFunctions: true }],
      'grouped-accessor-pairs': ['warn', 'setBeforeGet'],
      'guard-for-in': 'warn',
      'no-bitwise': 'warn',
      'no-caller': 'warn',
      'no-console': 'off', // enable to find unnecessary occurrences
      'no-else-return': 'warn',
      'no-eval': 'warn',
      'no-extend-native': 'warn',
      'no-extra-bind': 'warn',
      'no-extra-label': 'warn',
      'no-iterator': 'warn',
      'no-lone-blocks': 'warn',
      'no-lonely-if': 'warn',
      'no-new-func': 'warn',
      'no-new-object': 'warn',
      'no-new-wrappers': 'warn',
      'no-octal-escape': 'warn',
      'no-proto': 'warn',
      'no-restricted-imports': ['warn', { paths: ['rxjs/operators'], patterns: [] }],
      'no-script-url': 'warn',
      'no-undef-init': 'warn',
      'no-unneeded-ternary': 'warn',
      'no-useless-computed-key': ['warn', { enforceForClassMembers: true }],
      'no-useless-concat': 'warn',
      'no-useless-rename': 'warn',
      'no-useless-return': 'warn',
      'no-warning-comments': ['warn', { terms: ['todo'] }],
      'operator-assignment': 'warn',
      'prefer-arrow-callback': ['warn', { allowUnboundThis: false }],
      'prefer-exponentiation-operator': 'warn',
      'prefer-numeric-literals': 'warn',
      'prefer-object-spread': 'warn',
      'radix': 'warn',
      'spaced-comment': ['warn', 'always', { markers: ['/'], exceptions: ['*'] }],
      'yoda': ['warn', 'never', { exceptRange: true }],

      // ==== @typescript-eslint: supported rules ====
      '@typescript-eslint/consistent-indexed-object-style': ['warn', 'index-signature'],
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/explicit-member-accessibility': ['warn', { accessibility: 'no-public' }],
      '@typescript-eslint/member-ordering': ['error', { default: ['static-field', 'instance-field', 'constructor', 'static-method', 'instance-method'] }],
      '@typescript-eslint/method-signature-style': ['warn', 'method'],
      '@typescript-eslint/no-empty-interface': 'off', // recommended overide: useful with inheritence and libraries
      '@typescript-eslint/no-explicit-any': 'off', // strict override: useful with libraries and generic data
      '@typescript-eslint/no-extraneous-class': 'off', // strict override: support angular annotated empty classes
      '@typescript-eslint/no-invalid-void-type': 'off', // strict override: allow angular void outputs
      '@typescript-eslint/no-non-null-assertion': 'off', // recommended override: useful with angular and specs at times
      '@typescript-eslint/no-useless-constructor': 'off', // strict overide: needed in annotated angular classes
      '@typescript-eslint/parameter-properties': ['warn', { prefer: 'parameter-property', allow: ['readonly', 'protected readonly', 'private readonly'] }],
      '@typescript-eslint/prefer-nullish-coalescing': 'off', // recommended override: sometimes intended
      '@typescript-eslint/prefer-readonly': 'warn',

      // ==== @typescript-eslint: extension rules ====
      'no-invalid-this': 'off',
      '@typescript-eslint/no-invalid-this': 'warn',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { args: 'none', varsIgnorePattern: '^_+$' }], // recommended override: provide special options

      // ==== @angular-eslint: typescript ====
      '@angular-eslint/no-host-metadata-property': 'off', // recommended override: comfortable syntax
      '@angular-eslint/no-inputs-metadata-property': 'off', // recommended override: necessary for extending a component
      '@angular-eslint/no-outputs-metadata-property': 'off', // recommended override: necessary for extending a component
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {
      // ==== @angular-eslint: template ====
      '@angular-eslint/template/eqeqeq': ['warn', { allowNullOrUndefined: true }], // recommended override: provide options
      '@angular-eslint/template/i18n': 'off', // currently unused
      '@angular-eslint/template/no-any': 'warn',
      '@angular-eslint/template/no-duplicate-attributes': 'warn',
      '@angular-eslint/template/no-positive-tabindex': 'warn',
    },
  },
  {
    files: ['scripts/**/*.js'],
    extends: [eslint.configs.recommended, eslintConfigPrettier],
  },
);
