// Make sure this file is using ESM syntax
// Make sure this file is using ESM syntax
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Uncomment and set this to '/' for root deployment
  base: '/',
  server: {
    open: true,
    port: 5173
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
    sourcemap: false
  }
})


