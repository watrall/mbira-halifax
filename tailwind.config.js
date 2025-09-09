// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00697A', // Updated theme color from PRD
        secondary: '#1E88E5', // Blue
        background: '#F8F9FA', // Light neutral
      },
      borderRadius: {
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        card: '0 4px 20px rgba(0,0,0,0.1)',
        sheet: '0 -4px 20px rgba(0,0,0,0.15)',
      }
    },
  },
  plugins: [],
}