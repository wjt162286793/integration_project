import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
  server:{
    port: 9003,
      proxy:{
        '/bigProxy':{
          target: 'http://127.0.0.1:8051',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/bigProxy/, '')
        }
      }
  }
})
