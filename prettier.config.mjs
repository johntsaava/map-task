export default {
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  singleQuote: true,
  jsxSingleQuote: true,
  printWidth: 100,
  importOrder: ['react', '<THIRD_PARTY_MODULES>', '^~/(.*)$', '^[./]', '(.*).css$'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
