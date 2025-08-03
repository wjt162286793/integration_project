import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      },
    },
    server:{// 开发环境服务器配置
      port: 9001,
      proxy:{
        '/exchangeApi':{
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/exchangeApi/, '')
        },
        '/ws':{
          target: env.VITE_WS_URL,
          changeOrigin: true,
          ws:true,
          rewrite: (path) => path.replace(/^\/ws/, '')
        },
        // 添加以太坊RPC代理
        '/ethRpc':{
          target: env.VITE_ETH_RPC_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/ethRpc/, '')
        }
      }
    },
    // 添加生产环境构建配置
    build: {
      // 确保环境变量被正确注入
      rollupOptions: {
        // 其他配置...
      }
    }
  }
})
