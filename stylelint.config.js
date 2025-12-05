// @ts-check

/**
 * @see https://github.com/stylelint/stylelint/blob/main/docs/user-guide/configure.md
 *
 * @type {import('stylelint').Config}
 */
const config = {
  extends: [
    'stylelint-config-recommended-scss', // also extends: recommended
    'stylelint-config-clean-order',
    'stylelint-config-prettier-scss',
  ],
  ignoreFiles: ['./src/styles/bootstrap/**.*'],
  rules: {
    'selector-pseudo-element-no-unknown': [true, { ignorePseudoElements: ['ng-deep'] }], // recommended override: support angular elements
    'no-invalid-position-declaration': null, // recommended override: conflicts with media query nesting
  },
};

module.exports = config;
