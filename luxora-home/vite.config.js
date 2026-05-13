import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor':   ['react', 'react-dom', 'react-router-dom'],
          'motion':         ['framer-motion'],
          'firebase':       ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          'ui':             ['zustand', '@tanstack/react-query'],
        }
      }
    }
  }
})
