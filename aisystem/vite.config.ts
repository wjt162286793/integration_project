import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

export default defineConfig({
  server: {
    port: 9004,
            proxy:{
      '/aisysApi':{
        target:'http://localhost:3030/',
        changeOrigin:true,
        rewrite:(path)=>path.replace(/^\/aisysApi/, '')
      }
    }
  },
    resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
  plugins: [vue()],
})
