// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Certifique-se que o caminho está correto
  ],
  theme: {
    extend: {
      fontFamily: {
        // 'nome-da-classe': ['Nome da Fonte', 'fallback']
        'jura': ['Jura', 'sans-serif'],
      },
    },
  },
  plugins: [],
}