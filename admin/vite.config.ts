import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 9002,
        proxy:{
      '/api':{
        target:'http://localhost:8051/',
        changeOrigin:true,
        rewrite:(path)=>path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [
    vue(),
    monacoEditorPlugin()

  ],

})
