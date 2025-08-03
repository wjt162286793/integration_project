import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd());

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 9000,
      proxy:{
        '/mainapi':{
          target: env.VITE_API_URL || 'http://localhost:8051',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/mainapi/, '')
        }
      }
    },
    plugins: [vue()],
  }
})
