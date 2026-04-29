import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd());
  const apiTarget = env.VITE_API_URL || 'http://localhost:8051';
  const exchangeTarget = env.VITE_EXCHANGE_URL || 'http://localhost:9001';
  const bigdataTarget = env.VITE_BIGDATA_URL || 'http://localhost:9003';
  const aisystemTarget = env.VITE_AISYSTEM_URL || 'http://localhost:9004';

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 9000,
      proxy: {
        '/mainapi': {
          target: apiTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/mainapi/, '')
        },
        '/exchange-sub-api': {
          target: exchangeTarget, // 子应用地址（本地默认9001）
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/exchange-sub-api/, ''),
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS'
          }
        },
        '/bigdata-sub-api': {
          target: bigdataTarget, // 子应用地址（本地默认9003）
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/bigdata-sub-api/, ''),
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS'
          }
        },
        '/aisystem-sub-api': {
          target: aisystemTarget, // 子应用地址（本地默认9004）
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/aisystem-sub-api/, ''),
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS'
          }
        },

      }
    },
    plugins: [vue()],
  }
})
