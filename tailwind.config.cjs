/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: 'rgba(255, 255, 255, 0.08)',
        glassDark: 'rgba(255, 255, 255, 0.04)',
      },
      backgroundColor: {
        glass: 'rgba(255, 255, 255, 0.08)',
        glassDark: 'rgba(255, 255, 255, 0.04)',
      },
      boxShadow: {
        glow: '0 0 20px rgba(37,99,235,0.3)',
        innerGlow: 'inset 0 0 10px rgba(37,99,235,0.2)',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
      backgroundImage: {
        'starscape': "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      transitionDuration: {
        250: '250ms',
      },
      dropShadow: {
        glow: '0 0 10px rgba(56,189,248,0.45)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
