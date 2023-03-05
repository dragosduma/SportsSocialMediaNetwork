module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./chat/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        socialBg: '#F5F7FB',
        socialBlue: '#218DFA'
      },
      backgroundImage: theme => ({
        'image': "url('/login-photo.png')"
      })
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar')],
}