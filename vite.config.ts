import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ No tailwindcss() import here!
export default defineConfig({
  plugins: [react()],
})
