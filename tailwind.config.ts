import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./components/**/*.{vue,js,ts}', './pages/**/*.vue'],
  theme: {
    extend: {
      colors: {
        iguanaGreen: '#85d296',
        desertSand: '#f4e4c1',
        geckoOrange: '#fdae61',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

export default config;
