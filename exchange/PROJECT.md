# exchange（交易所子应用）说明

## 项目定位

交易所子应用是一个可独立运行的前端（类似 OKX 的演示版），也可被主应用（main）以微前端方式嵌入运行。包含行情/K 线、下单/支付演示、以及内置 AI 助手示例页面等功能。

## 技术栈

- React 18 + React Router
- Ant Design
- Vite
- 图表：lightweight-charts、echarts
- Web3：ethers（可选，以太坊 RPC 走代理）

## 本地启动

1. 安装依赖：在 `integration_project/exchange` 执行 `npm i`
2. 启动开发：`npm run dev`
   - 默认端口：`http://localhost:9001`
3. 远程联调：`npm run start`（使用 `.env.remote`）

## 环境变量

文件参考：

- [.env.development](file:///d:/%E4%BB%93%E5%BA%93/integration_project/exchange/.env.development)
- [.env.remote](file:///d:/%E4%BB%93%E5%BA%93/integration_project/exchange/.env.remote)

关键变量：

- VITE_API_URL：后端服务地址（dev 下代理 `/exchangeApi` → VITE_API_URL）
- VITE_WS_URL：WebSocket 基地址（代码会拼接 `/pay`）
- VITE_ETH_RPC_URL：以太坊 RPC（dev 下代理 `/ethRpc` → VITE_ETH_RPC_URL）

## 请求代理（开发态）

配置实现：[vite.config.ts](file:///d:/%E4%BB%93%E5%BA%93/integration_project/exchange/vite.config.ts)

- /exchangeApi → VITE_API_URL（自动去掉前缀）
- /ethRpc → VITE_ETH_RPC_URL（自动去掉前缀）
- /ws → VITE_WS_URL（WebSocket 代理，自动去掉前缀）

说明：业务代码也可以直接使用 VITE_API_URL/VITE_WS_URL 进行直连；如需避免跨域，可把 VITE_WS_URL 配成 `ws://localhost:9001/ws`（remote 场景配成 `ws://<host>:8084`）。

## 统一认证（登录/鉴权）

- token 存储：localStorage 的 `intergration_token`
- 请求头：`Authorization: Bearer <token>`
- 无权限/过期：后端返回 `7001/7002/7006` 时前端会清 token 并提示重新登录

相关实现：

- [src/utils/request.ts](file:///d:/%E4%BB%93%E5%BA%93/integration_project/exchange/src/utils/request.ts)
- [src/pages/home/index.tsx](file:///d:/%E4%BB%93%E5%BA%93/integration_project/exchange/src/pages/home/index.tsx)

## 支付演示（WebSocket /pay）

页面逻辑示例：[payMethod.tsx](file:///d:/%E4%BB%93%E5%BA%93/integration_project/exchange/src/pages/buyCoin/fast/payMethod.tsx)

- 前端连接：`new WebSocket(\`\${VITE_WS_URL}/pay\`)`
- 连接后发送 `pay_id`，服务端轮询 pay_table 状态并在 success 时推送结果

## 被主应用嵌入运行

当作为微前端被 main 加载时：

- 子应用资源由 main 根据 `VITE_EXCHANGE_URL` 拉取
- 子应用内的 API 请求会被 main 重写到 `/exchange-sub-api`，再由 main 的 dev proxy / 生产 Nginx 转发

## 构建与部署

1. 构建：`npm run build`
2. 部署 dist 到 Nginx 静态目录（通常 listen 8084）
3. Nginx 需要额外支持：
   - `/exchangeApi` 反代到后端 8051（或直接 `/exchange/*` 反代）
   - `/pay` WebSocket Upgrade 转发到后端 8051

端口与 Nginx 示例参考：[DEPLOYMENT_PORTS.md](file:///d:/%E4%BB%93%E5%BA%93/integration_project/DEPLOYMENT_PORTS.md)

## AI 助手页面

实现说明文档：[AI_ASSISTANT.md](file:///d:/%E4%BB%93%E5%BA%93/integration_project/exchange/AI_ASSISTANT.md)
