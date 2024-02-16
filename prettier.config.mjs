/** @type {import('prettier').Config} */
const prettierConfig = {
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  printWidth: 100,
  quoteProps: 'as-needed',
  bracketSpacing: true,
  arrowParens: 'always',

  importOrder: [
    '^react$',
    '^next(/.*)?$',
    '^lib/(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^~/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,

  plugins: ['@trivago/prettier-plugin-sort-imports'],
};

export default prettierConfig;
