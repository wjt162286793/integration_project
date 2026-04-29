# AI 助手（最小可用版）

本文档描述：如何在本项目中跑起来一个“主要解决用户问题”的 AI 助手，以及它的实现思路。

## 目标

- 用户在页面里提问：支付/订单/行情接口怎么用、订单为什么卡住等
- 助手优先用知识库回答
- 必要时调用工具查询数据（订单、K线、ticker）再回答

## 架构概览（你需要看懂的 3 件事）

1. RAG（检索增强）：从本地知识库里找“相关资料片段”
2. LLM（大模型）：把“问题 + 资料片段 + 约束”组合成答案
3. Tools（工具调用）：当需要查数据时，调用后端函数/SQL 查询再解释

## 后端（express-server-wjt）

### 路由

- 新增：`POST /assistant/chat`
- 入口文件：`express-server-wjt/routes/assistant/index.js`

### 知识库

- 目录：`express-server-wjt/routes/assistant/kb`
- 当前文件：`exchange_faq.md`
- 实现方式：按 `##` 标题切分为多个 chunk，然后用简单关键词匹配召回 topK

你可以继续新增更多 md，比如：

- `payments.md`：支付失败排查
- `trading.md`：交易页面使用说明
- `faq.md`：常见问题

### 工具（Tools）

当前内置工具：

- `get_order`：按订单ID查 pay_table
- `get_order_history`：查最近 50 条订单
- `get_kline`：查 K 线（exchange_kline）
- `get_ticker`：根据 K 线聚合 ticker

设计原则：

- 默认只做只读工具
- 写操作（取消订单、重试支付）必须加二次确认与权限控制

### 配置大模型

后端通过环境变量配置，不在代码中写密钥：

- `AI_API_KEY`：大模型 API Key（必填才会启用大模型生成）
- `AI_BASE_URL`：OpenAI 兼容地址（默认 https://api.deepseek.com/v1）
- `AI_MODEL`：模型名（默认 deepseek-chat）

如果没配 `AI_API_KEY`：

- `/assistant/chat` 仍会返回结果（基于知识库的 fallback），但不会调用大模型生成更自然的回答

## 前端（exchange）

### 页面入口

- 新增菜单：AI助手
- 页面路径：`/home/assistant`
- 文件：`src/pages/assistant/index.tsx`

### API

- `assistantChatApi`
- 文件：`src/api/index.ts`
- 请求：`POST /assistant/chat`，参数 `{ message, session_id }`

## 你后续要学习/掌握什么（按顺序）

1. Prompt 结构：角色/目标/约束/证据
2. RAG：切片、召回、引用来源
3. Tools：接口 schema、参数校验、权限控制
4. 安全：敏感信息脱敏、提示词注入防护、审计日志

## 自测用例

你可以在 AI 助手页面问：

- “订单状态 created/pending/success/cancel 分别是什么意思？”
- “我下单后二维码不出来怎么办？”
- “帮我查一下订单 22b23d4f-c221-4b99-9f4f-dd64d7a192f1 的状态”
- “BTCUSDT 15m 的行情怎么拿？”

