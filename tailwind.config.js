/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // ⭐ This is the key setting for dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Optional: Custom colors for your brand
      colors: {
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626', // Your red brand color
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        // Optional: Custom dark mode colors
        dark: {
          bg: '#111827',      // Main dark background
          card: '#1f2937',    // Card background
          border: '#374151',  // Border color
          text: '#f9fafb',    // Text color
        }
      },
    },
  },
  plugins: [],
}