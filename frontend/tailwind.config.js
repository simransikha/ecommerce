import { tailwindConfig } from '@storefront-ui/react/tailwind-config';

module.exports = {
  content: ['./index.html',"./src/**/*.{html,js}",'./node_modules/@storefront-ui/react/**/*.{js,mjs}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
