// @ts-check

/** @type {import('prettier').Config} */
export default {
  plugins: ['prettier-plugin-astro'],
  singleQuote: true,
  printWidth: 100,
  proseWrap: 'preserve',
  overrides: [
    {
      files: '*.astro',
      options: { parser: 'astro' },
    },
  ],
};
