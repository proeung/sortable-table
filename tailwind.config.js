/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        // Salt palette
        'salt-100': '#FFFFFF',
        'salt-200': '#FBFAFA',
        'salt-300': '#F4F4F3',
        'salt-400': '#EAEAEA',
        'salt-500': '#DCDCDC',
        'salt-600': '#BABABC',
        'salt-700': '#919197',
        'salt-800': '#6C6C72',
        'salt-900': '#525257',
        'salt-1000': '#1C1C1C',
        // Kale palette
        'kale-100': '#F7FCFC',
        'kale-400': '#2BABAD',
        'kale-500': '#0A8080',
        'kale-800': '#005961',
        // Error palette
        'error-100': '#FFF7F5',
        'error-500': '#D5351F',
        'error-800': '#B41D08',
      },
      fontFamily: {
        'sans': [
          'SofiaPro',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif'
        ]
      },
    },
  },
}
