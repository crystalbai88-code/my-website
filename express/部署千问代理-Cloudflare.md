# 让公开站 ai00.tech/express 用上真实千问（Cloudflare Worker 代理）

GitHub Pages 是纯静态、跑不了后端，所以用一个 Cloudflare Worker 来保管 DashScope 密钥。

## 一、部署 Worker（约 5 分钟，免费）
1. 注册/登录 https://dash.cloudflare.com → 左侧 **Workers & Pages** → **Create** → **Create Worker**。
2. 给它起名（如 `ai-express-qwen`）→ **Deploy** 先建一个默认的。
3. 进入这个 Worker → **Edit code**，把本仓库 `express/cloudflare-worker.js` 的全部内容粘贴进去 → **Deploy**。
4. 回到 Worker 的 **Settings → Variables and Secrets** → 添加一个 **Secret**：
   - 名称：`DASHSCOPE_API_KEY`
   - 值：你阿里云百炼/DashScope 的 key（sk-...）
   - 保存并重新 Deploy。
5. 复制这个 Worker 的访问地址，形如：`https://ai-express-qwen.你的子域.workers.dev`

## 二、把地址填进前端
编辑 `express/config.js`：
```js
window.AI_PROXY_URL = "https://ai-express-qwen.你的子域.workers.dev";
```
提交推送后，ai00.tech/express 打开「AI 陪练模式」开启即可用真实千问（密钥在 Worker，浏览器看不到）。
（或者把 Worker 地址发给我，我帮你填好并推送。）

## 三、防刷额度（重要）
- Worker 已限制只接受 ai00.tech 来源的请求，并对单次 max_tokens 封顶。
- 仍**强烈建议**去 DashScope 控制台给这个 key 设“消费限额/每日额度”，作为最后一道防线。
- 如需更强限流，可在 Worker 上加 Cloudflare KV 计数（要的话告诉我）。

## 备选：阿里云函数计算（国产、与 DashScope 同厂、国内更快）
逻辑一样，可移植到阿里云 FC 的 HTTP 触发器。需要的话我给你 FC 版本代码与步骤。
