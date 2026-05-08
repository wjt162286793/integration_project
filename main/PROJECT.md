# main（微前端主应用/基座）说明

## 项目定位

主应用负责：

- 统一登录与鉴权（对接后端 /auth，统一使用 Bearer token）
- 作为微前端基座加载各子应用（Wujie）
- 在开发环境下提供子应用反向代理，保证子应用既可“嵌入运行”也可“单独运行”

## 技术栈

- Vue 3 + Vue Router + Pinia
- Element Plus
- Vite
- wujie-vue3（微前端）

## 本地启动

1. 安装依赖：在 `integration_project/main` 执行 `npm i`
2. 启动开发模式（本地联调）：`npm run dev`
   - 默认端口：`http://localhost:9000`
3. 远程联调（连接远程后端/子应用）：`npm run start`（使用 `.env.remote`）

## 环境变量

文件参考：[.env.remote](file:///d:/%E4%BB%93%E5%BA%93/integration_project/main/.env.remote)

- VITE_PORT：本地 dev server 端口（remote 模式下可用）
- VITE_API_URL：后端服务地址（默认 http://localhost:8051）
- VITE_EXCHANGE_URL：交易所子应用地址（默认 http://localhost:9001）
- VITE_BIGDATA_URL：大数据子应用地址（默认 http://localhost:9003）
- VITE_AISYSTEM_URL：AI 子应用地址（默认 http://localhost:9004）

## 开发代理（关键）

配置实现：[vite.config.ts](file:///d:/%E4%BB%93%E5%BA%93/integration_project/main/vite.config.ts)

- /mainapi → 后端（VITE_API_URL）
- /exchange-sub-api → 子应用 exchange（VITE_EXCHANGE_URL）
- /bigdata-sub-api → 子应用 bigdata（VITE_BIGDATA_URL）
- /aisystem-sub-api → 子应用 aisystem（VITE_AISYSTEM_URL）

说明：主应用页面里会把“子应用内发起的请求”拦截并重写为上述前缀，从而让子应用在嵌入模式下无需关心后端地址与跨域细节。

## 统一认证（前端约定）

- token 存储：localStorage 的 `intergration_token`
- 请求头：`Authorization: Bearer <token>`
- 未登录/无权限：后端返回 code `7001/7002/7006` 时前端会清理 token 并跳转登录页

实现参考：

- [request.ts](file:///d:/%E4%BB%93%E5%BA%93/integration_project/main/src/utils/request.ts)
- [api/index.ts](file:///d:/%E4%BB%93%E5%BA%93/integration_project/main/src/api/index.ts)
- [router/index.ts](file:///d:/%E4%BB%93%E5%BA%93/integration_project/main/src/router/index.ts)

## 子应用接入方式（Wujie）

主应用会通过配置的子应用 URL（VITE_EXCHANGE_URL 等）加载子应用资源，并在运行时进行请求重写/代理。

对应页面：

- [exchange.vue](file:///d:/%E4%BB%93%E5%BA%93/integration_project/main/src/pages/exchange.vue)
- [bigdata.vue](file:///d:/%E4%BB%93%E5%BA%93/integration_project/main/src/pages/bigdata.vue)
- [aisystem.vue](file:///d:/%E4%BB%93%E5%BA%93/integration_project/main/src/pages/aisystem.vue)

## 构建与部署（生产）

1. 构建：`npm run build`
2. 将 dist 部署到 Nginx 静态目录
3. 配置 Nginx 反代：
   - 静态：try_files 回落到 /index.html（History Router）
   - API：/mainapi、/exchange-sub-api、/bigdata-sub-api、/aisystem-sub-api 反代到后端/子应用

端口规划与 Nginx 示例参考：[DEPLOYMENT_PORTS.md](file:///d:/%E4%BB%93%E5%BA%93/integration_project/DEPLOYMENT_PORTS.md)
