# 部署端口与反代配置（腾讯云）

## 端口规划（推荐与当前仓库 Nginx 模板一致）

- 后端（express-server-wjt）
  - `8051`：HTTP API + WebSocket（/pay）统一端口
- 前端静态站点（Nginx listen）
  - `8086`：main（主应用/基座）
  - `8084`：exchange（交易所子应用）
  - `8083`：bigdata（大数据子应用）
  - `8085`：aisystem（AI 子应用）
- 可选
  - `8545`：以太坊 RPC（仅 exchange 用到时需要）

说明：历史上 exchange 的 WebSocket 可能单独占用 `8050`；目前后端已将 WebSocket 挂载到 `8051` 的 `/pay`，若你确认线上也按此版本部署，可关闭 `8050` 放行。

## .env.remote 对齐

### main（基座）

文件：[main/.env.remote](file:///d:/%E4%BB%93%E5%BA%93/integration_project/main/.env.remote)

- VITE_API_URL → `http://<服务器IP>:8051`
- VITE_EXCHANGE_URL → `http://<服务器IP>:8084`
- VITE_BIGDATA_URL → `http://<服务器IP>:8083`
- VITE_AISYSTEM_URL → `http://<服务器IP>:8085`

### exchange（交易所）

文件：[exchange/.env.remote](file:///d:/%E4%BB%93%E5%BA%93/integration_project/exchange/.env.remote)

- VITE_API_URL → `http://<服务器IP>:8051/`
- VITE_WS_URL → `ws://<服务器IP>:8084`（前端会自动拼接 `/pay`，即 `ws://<服务器IP>:8084/pay`）

### bigdata / aisystem

- [bigdata/.env.remote](file:///d:/%E4%BB%93%E5%BA%93/integration_project/bigdata/.env.remote)
- [aisystem/.env.remote](file:///d:/%E4%BB%93%E5%BA%93/integration_project/aisystem/.env.remote)

统一：VITE_API_URL → `http://<服务器IP>:8051`

## 后端部署（express-server-wjt）

- 启动端口：通过 `PORT=8051`（默认就是 8051）
- MySQL：建议用环境变量配置（MYSQL_HOST/MYSQL_USER/MYSQL_PASSWORD/MYSQL_DATABASE）
- 初始化表：执行 [init_all.sql](file:///d:/%E4%BB%93%E5%BA%93/express-server-wjt/sql/init_all.sql)

## Nginx 关键片段

### 1) 统一后端 API（8051）

各站点需要把 API 前缀反代到后端，例如：

- main：`/mainapi/` → `http://127.0.0.1:8051/`
- 子应用（示例）：`/exchangeApi/` → `http://127.0.0.1:8051/`

你仓库里已有参考模板：

- main：[main.txt](file:///d:/%E4%BB%93%E5%BA%93/integration_project/main.txt)
- exchange：[nginx/exchange](file:///d:/%E4%BB%93%E5%BA%93/nginx/exchange)

### 2) WebSocket（/pay）必须开启 Upgrade

建议放在 exchange 的 server 里（listen 8084），让前端用同源端口连接：

```nginx
location /pay {
  proxy_pass http://127.0.0.1:8051;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection "upgrade";
  proxy_set_header Host $host;
}
```

对应仓库已更新的模板：[nginx/exchange](file:///d:/%E4%BB%93%E5%BA%93/nginx/exchange)

## 验证清单

- 访问 `http://<服务器IP>:8086` 能进入主应用并加载各子应用
- 访问 `http://<服务器IP>:8084` 可单独打开交易所子应用
- 登录后接口请求都带 `Authorization: Bearer <token>`（token 存储 key：intergration_token）
- 支付页能连上 `ws://<服务器IP>:8084/pay`，并在支付成功后收到推送
