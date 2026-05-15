import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Vite configuration — build tool setup
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // @ দিয়ে src ফোল্ডার access করা যাবে
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    // Code splitting এর জন্য chunk size limit
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Vendor libraries আলাদা chunk এ রাখা হচ্ছে
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          charts: ['recharts'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
