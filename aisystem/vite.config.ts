import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd());

  return {
    server: {
      port: 9004,
      proxy:{
        '/aisysApi':{
          target: env.VITE_API_URL || 'http://localhost:8051',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/aisysApi/, '')
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      },
    },
    plugins: [vue()],
  }
})
