// Make sure this file is using ESM syntax
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    port: 5173
  },
  // Add base path if deploying to a subdirectory
  // base: './',

})


