# aisystem（AI 子应用）说明

## 项目定位

aisystem 子应用提供 AI 对话/助手能力（前端 SSE 流式展示），可独立运行，也可被主应用（main）以微前端方式嵌入运行。

## 技术栈

- Vue 3 + Vue Router + Pinia
- Element Plus
- Markdown 渲染：markdown-it + highlight.js
- SSE：event-source-polyfill（兼容性兜底）
- Vite

## 本地启动

1. 安装依赖：在 `integration_project/aisystem` 执行 `npm i`
2. 启动开发：`npm run dev`
3. 远程联调：`npm run start`（使用 `.env.remote`）

## 环境变量

文件参考：[.env.remote](file:///d:/%E4%BB%93%E5%BA%93/integration_project/aisystem/.env.remote)

- VITE_API_URL：后端服务地址（默认 http://localhost:8051）

## 统一认证（登录/鉴权）

- token 存储：localStorage 的 `intergration_token`
- 请求头：`Authorization: Bearer <token>`
- 后端鉴权会校验用户是否具有 `aisystem` 权限（app_rule_list）

相关实现：

- [src/utils/request.ts](file:///d:/%E4%BB%93%E5%BA%93/integration_project/aisystem/src/utils/request.ts)
- SSE 请求示例：[chatCom.vue](file:///d:/%E4%BB%93%E5%BA%93/integration_project/aisystem/src/pages/chatCom.vue)

## 对接后端 AI

后端（express-server-wjt）需要配置：

- AI_API_KEY（未配置时 SSE 会返回 error）
- AI_BASE_URL（OpenAI 兼容 baseUrl）
- AI_MODEL（模型名）

详见后端说明：[SERVICE.md](file:///d:/%E4%BB%93%E5%BA%93/express-server-wjt/SERVICE.md)

## 被主应用嵌入运行

当作为微前端被 main 加载时：

- 子应用资源由 main 根据 `VITE_AISYSTEM_URL` 拉取
- 子应用 API 请求会被 main 重写到 `/aisystem-sub-api`，再由 main 的 dev proxy / 生产 Nginx 转发

## 构建与部署

1. 构建：`npm run build`
2. 部署 dist 到 Nginx 静态目录（通常 listen 8085）
3. 配置 Nginx：try_files 回落到 /index.html，并把 API 前缀转发到后端 8051

端口与 Nginx 示例参考：[DEPLOYMENT_PORTS.md](file:///d:/%E4%BB%93%E5%BA%93/integration_project/DEPLOYMENT_PORTS.md)
