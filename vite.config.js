import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' permite publicar el sitio en una subruta (GitHub Pages)
export default defineConfig({
  base: './',
  plugins: [react()],
})
