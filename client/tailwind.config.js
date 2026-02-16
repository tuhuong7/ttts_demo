/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // University Brand Colors - Flat Design Palette
        primary: {
          DEFAULT: '#004a99',  // Deep University Blue
          dark: '#003366',     // Darker Blue
          light: '#0066cc',    // Lighter Blue
        },
        accent: {
          DEFAULT: '#004a99',
        },
        // Neutral Grays
        background: {
          DEFAULT: '#ffffff',
          light: '#f8f9fa',    // Very light gray for sections
          gray: '#f5f5f5',     // Slightly darker gray
        },
      },
      // FLAT DESIGN SYSTEM - NO BORDER RADIUS
      borderRadius: {
        'none': '0',
        'DEFAULT': '0',
        'sm': '0',
        'md': '0',
        'lg': '0',
        'xl': '0',
        '2xl': '0',
        '3xl': '0',
        'full': '0',  // Even "full" is 0 for strict flat design
      },
      // FLAT DESIGN SYSTEM - NO BOX SHADOW
      boxShadow: {
        'none': 'none',
        'DEFAULT': 'none',
        'sm': 'none',
        'md': 'none',
        'lg': 'none',
        'xl': 'none',
        '2xl': 'none',
        'inner': 'none',
      },
      // Typography
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
      },
      // Spacing for consistent layout
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
