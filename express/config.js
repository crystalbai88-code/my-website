/* 运行时配置。
 * 本地用 serve.py 时：留空即可（前端走同源 /api/*）。
 * 公开站（GitHub Pages 没有后端）：把下面填成你的 Cloudflare Worker 地址，
 *   例如 window.AI_PROXY_URL = "https://ai-express-qwen.你的子域.workers.dev";
 * 留空时公开站自动跑「离线规则模式」，安全且无需密钥。 */
window.AI_PROXY_URL = "";
