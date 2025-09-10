// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary color from Halifax MVP PRD
        primary: '#00697A', // Deep Teal
        // Derived/Selected complementary colors based on prompt inspiration
        secondary: '#049DC1', // Brighter Blue
        accent: '#0094BC', // Another Blue (from prompt palette)
        background: '#E8F4F7', // Light Teal/Blue
        surface: '#FFFFFF', // White surface
        textPrimary: '#0D474E', // Darker Teal
        textSecondary: '#484A50', // Dark Gray
        // Overlay for polygons (semi-transparent primary)
        overlayPolygon: 'rgba(0, 105, 122, 0.3)', // #00697A with 30% opacity
        // Status/Error colors (basic)
        error: '#B00020',
        success: '#4CAF50',
      },
      borderRadius: {
        // Using 8pt grid: 4px, 8px, 16px
        sm: '0.25rem', // 4px
        DEFAULT: '0.5rem', // 8px
        lg: '1rem', // 16px
        xl: '1.5rem', // 24px (for large cards/sheets)
        '2xl': '2rem', // 32px (for hero sections)
        '3xl': '2.5rem', // 40px
      },
      boxShadow: {
        // Defined shadows based on prompt
        low: '0 1px 3px rgba(0,0,0,0.1)',
        DEFAULT: '0 4px 6px rgba(0,0,0,0.1)', // Alias for 'card'
        card: '0 4px 6px rgba(0,0,0,0.1)',
        sheet: '0 -4px 20px rgba(0,0,0,0.15)',
        high: '0 10px 20px rgba(0,0,0,0.15)',
        fab: '0 6px 10px rgba(0,0,0,0.15)',
      },
      fontFamily: {
        // Using Google Fonts as suggested
        sans: ['Roboto', 'system-ui', 'sans-serif'], // Body
        heading: ['Inter', 'system-ui', 'sans-serif'], // Headings
      },
      fontSize: {
        // Defined sizes from prompt
        xs: ['0.75rem', { lineHeight: '1rem' }], // 12px
        sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
        base: ['1rem', { lineHeight: '1.5rem' }], // 16px
        lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
        xl: ['1.25rem', { lineHeight: '1.75rem' }], // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }], // 24px
        '3xl': ['2rem', { lineHeight: '2.5rem' }], // 32px
      },
      spacing: {
        // Using 8pt grid for spacing
        '0': '0px',
        '1': '0.25rem', // 4px
        '2': '0.5rem', // 8px
        '3': '0.75rem', // 12px
        '4': '1rem', // 16px
        '5': '1.25rem', // 20px
        '6': '1.5rem', // 24px
        '8': '2rem', // 32px
        '10': '2.5rem', // 40px
        '12': '3rem', // 48px
        '16': '4rem', // 64px
        '20': '5rem', // 80px
        '24': '6rem', // 96px
        '32': '8rem', // 128px
        '40': '10rem', // 160px
        '48': '12rem', // 192px
        '56': '14rem', // 224px
        '64': '16rem', // 256px
      },
    },
  },
  plugins: [],
}