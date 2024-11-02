/** @type {import('postcss-load-config').Config} */

import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  },
};

export default config;


/*import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    tailwindcss(),
    autoprefixer(),
  ],
};
*/
