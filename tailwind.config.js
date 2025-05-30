/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '0px',
      xsS: '300px',
      xsM: '410px',
      xsL: '470px',
      sm: '600px',
      smXS: '642px',
      smS: '681px',
      smM: '746px',
      smL: '780px',
      md: '960px', // > iPad gen 9 vertical (810x1080)
      mdS: '1045px',
      mdM: '1120px',
      mdL: '1230px',
      lg: '1281px',
      lgS: '1350px',
      lgM: '1440px',
      lgL: '1600px',
      xl: '1920px',
    },
    fontFamily: {
      sans: ['Nunito', 'sans-serif'],
    },
    extend: {
      boxShadow: {
        custom: '0px 0px 8px 0px rgba(0, 0, 0, 0.15)',
      },
      colors: {
        primaryColor: '#003087',
        secondaryColor: '#13C296',
        greenLight6: '#DAF8E6',
        greenDark: '#1A8245',
        tableHeadColor: '#E6F0FA',
        blueLight5: '#E1E8FF',
        blueDark: '#1C3FB7',
        dark8: '#E5E7EB',
        dark3: '#374151',
        redDark: '#E10E0E',
        primaryTextColor: '#637381',
        stroke: '#DFE4EA',
        gray: '#F9FAFB',
        primary: {
          DEFAULT: 'var(--primary-color)',
          light: 'var(--primary-color-light)',
          bold: 'var(--primary-color-bold)',
          gray: 'var(--primary-gray-color)',
        },
        paragraph: {
          DEFAULT: 'var(--paragraph-color)',
          light: 'var(--paragraph-light-color)',
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
