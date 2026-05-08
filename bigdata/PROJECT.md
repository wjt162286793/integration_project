# bigdata（大数据/大屏子应用）说明

## 项目定位

bigdata 子应用提供大屏可视化、图表数据展示、流程/组织建模、文件上传等能力。该应用可独立运行，也可被主应用（main）以微前端方式嵌入运行。

## 技术栈

- React 18 + React Router
- Ant Design
- Vite
- 图表：echarts、bizcharts、@antv/g2
- 建模：@antv/x6 生态
- 上传：Uppy（与后端 tus 配合）

## 本地启动

1. 安装依赖：在 `integration_project/bigdata` 执行 `npm i`
2. 启动开发：`npm run dev`
3. 远程联调：`npm run start`（使用 `.env.remote`）

## 环境变量

文件参考：[.env.remote](file:///d:/%E4%BB%93%E5%BA%93/integration_project/bigdata/.env.remote)

- VITE_API_URL：后端服务地址（默认 http://localhost:8051）

## 统一认证（登录/鉴权）

- token 存储：localStorage 的 `intergration_token`
- 登录：调用后端 `POST /auth/login`，携带 `appName: 'bigdata'`
- 访问接口：`Authorization: Bearer <token>`

相关实现（示例）：

- [src/utils/request.ts](file:///d:/%E4%BB%93%E5%BA%93/integration_project/bigdata/src/utils/request.ts)
- [src/api/index.ts](file:///d:/%E4%BB%93%E5%BA%93/integration_project/bigdata/src/api/index.ts)

## 依赖的后端模块/表

- 后端路由：`/bigdata/*`、`/fileMode/*`
- SQL 初始化：推荐执行后端的 [init_all.sql](file:///d:/%E4%BB%93%E5%BA%93/express-server-wjt/sql/init_all.sql)
  - chart_*（大屏图表）
  - flow_chart_table/org_chart_table（流程/组织建模）
  - file_table（文件管理）

## 被主应用嵌入运行

当作为微前端被 main 加载时：

- 子应用资源由 main 根据 `VITE_BIGDATA_URL` 拉取
- 子应用 API 请求会被 main 重写到 `/bigdata-sub-api`，再由 main 的 dev proxy / 生产 Nginx 转发

## 构建与部署

1. 构建：`npm run build`
2. 部署 dist 到 Nginx 静态目录（通常 listen 8083）
3. Nginx 对应 API 反代到后端 8051（并保留 try_files 回落到 index.html）

端口与 Nginx 示例参考：[DEPLOYMENT_PORTS.md](file:///d:/%E4%BB%93%E5%BA%93/integration_project/DEPLOYMENT_PORTS.md)
