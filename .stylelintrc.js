const properties = require('known-css-properties').all

module.exports = {
  processors: ['stylelint-processor-styled-components'],
  plugins: ['stylelint-declaration-use-variable', 'stylelint-order'],
  extends: ['stylelint-config-standard', 'stylelint-config-styled-components'],
  syntax: 'scss',
  rules: {
    'sh-waqar/declaration-use-variable': [
      [
        'color',
        'border-color',
        'background-color',
        'font-size',
        'font-weight',
        'z-index',
        'border-radius',
        'shadow',
        {
          ignoreValues: ['0', 'auto', 'transparent'],
        },
      ],
    ],
    'order/properties-order': [
      ['-styled-mixin0', ...properties],
      { unspecified: 'ignore' },
    ],
    'block-no-empty': null,
    'comment-empty-line-before': null,
    'declaration-colon-newline-after': null,
    'declaration-no-important': true,
    'selector-list-comma-newline-after': 'always-multi-line',
    'value-list-comma-newline-after': null,
    'value-list-max-empty-lines': null,
  },
}
