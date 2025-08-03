import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// 从环境变量读取API地址，默认为本地服务
const apiUrl = process.env.VITE_API_URL || 'http://127.0.0.1:8051';

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
          target: apiUrl,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/bigProxy/, '')
        }
      }
  }
})
