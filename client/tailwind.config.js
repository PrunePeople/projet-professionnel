module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': 'var(--primary-color)',
        'secondary': 'var(--secondary-color)',
        'tertiary': 'var(--tertiary-color)',
        'validate': 'var(--validate-color)',
        'error': 'var(--error-color)',
      },
    },
  },
  plugins: [],
}
