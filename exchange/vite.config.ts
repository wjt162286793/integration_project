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
    port: 9001,
    proxy:{
      '/exchangeApi':{
        target:'http://localhost:3000/',
        changeOrigin:true,
        rewrite:(path)=>path.replace(/^\/exchangeApi/, '')
      }
    }
  }
})
