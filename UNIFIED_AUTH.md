# 统一登录认证说明

这次统一认证覆盖：

- 主应用 `main`
- 子应用 `exchange`
- 子应用 `bigdata`
- 子应用 `aisystem`
- 后端 `express-server-wjt`

## 目标

- 只保留一套登录入口
- 只保留一个 token 存储键：`intergration_token`
- 所有前端请求统一使用 `Authorization: Bearer <token>`
- 后端统一校验 token
- 密码不再明文保存，改为加盐哈希

## 后端实现

### 认证入口

- 新增统一认证路由：`/auth`
- 文件：`express-server-wjt/routes/auth/index.js`

接口：

- `POST /auth/login`
- `GET /auth/userInfo`
- `POST /auth/logout`

### 加密方式

文件：`express-server-wjt/utils/auth.js`

- 密码哈希：`pbkdf2 + sha512`
- token 签名：`HMAC-SHA256`
- token 内容：用户ID、账号、签发时间、过期时间

说明：

- 当前不是 JWT 库实现，但思路一致，属于“签名 token”
- 优点是依赖少、可控、足够满足当前项目

### 权限控制

后端根据 `app_rule_list` 控制用户能访问哪些子系统：

- `exchange`
- `bigdata`
- `aisystem`

例如：

- `exchange` 路由要求用户具备 `exchange` 权限
- `bigdata` 路由要求用户具备 `bigdata` 权限
- `aisys` 路由要求用户具备 `aisystem` 权限

## 数据库

初始化 SQL：

- `express-server-wjt/sql/integration_auth.sql`

表：

- `integration_users`

字段说明：

- `account`：登录账号
- `display_name`：展示名称
- `password_salt`：密码盐
- `password_hash`：密码哈希
- `app_rule_list`：可访问系统列表
- `status`：是否启用

默认初始化账号：

- `admin / admin`
- `tenement / tenement`

## 前端接入规则

### 主应用 main

- 登录改为调用 `/auth/login`
- 用户信息改为 `/auth/userInfo`
- 路由守卫统一检查 `intergration_token`
- 未登录或 token 失效时跳转 `/login`

### 子应用 exchange

- 保留原有 `/exchange/login` 接口兼容旧页面
- 实际后端已接入统一认证逻辑
- token 统一读取 `intergration_token`

### 子应用 bigdata

- 独立登录页改为真实调用 `/auth/login`
- 删除原来本地写死 `bigdata_token=123456` 的假登录方案

### 子应用 aisystem

- SSE 请求增加 `Authorization` 请求头
- 请求工具统一读取 `intergration_token`

## 你需要执行的步骤

1. 在 MySQL 执行 `express-server-wjt/sql/integration_auth.sql`
2. 重启后端 `express-server-wjt`
3. 重启前端主应用与相关子应用

## 验证步骤

1. 打开主应用登录页
2. 使用 `admin / admin` 登录
3. 进入 `exchange`、`bigdata`、`aisystem`
4. 检查接口请求头是否带 `Authorization: Bearer xxx`
5. 检查直接访问受保护接口时，未登录返回 `7001`

## 后续建议

- 把 `AUTH_TOKEN_SECRET` 放到环境变量，不要使用默认值
- 后续如果要支持“踢下线 / 强制失效 / 刷新token”，可以再增加 refresh token 机制
- 如果你未来接第三方登录，可以保留这套 `/auth/userInfo + 中间件`，只替换 `/auth/login`
