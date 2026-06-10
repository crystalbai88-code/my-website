/* AI 表达课 · 通义千问代理（Cloudflare Worker）
 * 部署后把它的地址填进 express/config.js 的 window.AI_PROXY_URL。
 * 密钥作为 Worker Secret 配置：变量名 DASHSCOPE_API_KEY（阿里云百炼/DashScope 的 key）。
 *
 * 安全：只允许下面 ALLOW_ORIGINS 的网站调用（防别人盗刷你的额度）；
 *       并把单次 max_tokens 封顶。强烈建议同时在 DashScope 控制台给该 key 设“消费限额”。
 */
const ALLOW_ORIGINS = [
  "https://ai00.tech",
  "https://www.ai00.tech",
  "http://localhost:3404",
];
const QWEN_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions";
const MODELS = [
  { id: "qwen-plus", label: "通义千问 Plus（均衡·推荐）" },
  { id: "qwen-max", label: "通义千问 Max（最强）" },
  { id: "qwen-turbo", label: "通义千问 Turbo（最快最省）" },
];
const DEFAULT_MODEL = "qwen-plus";
const MAX_TOKENS_CAP = 800;

function corsHeaders(origin) {
  const ok = ALLOW_ORIGINS.includes(origin);
  return {
    "Access-Control-Allow-Origin": ok ? origin : ALLOW_ORIGINS[0],
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "content-type",
    "Vary": "Origin",
  };
}
function json(obj, status, h) {
  return new Response(JSON.stringify(obj), { status, headers: { ...h, "content-type": "application/json; charset=utf-8" } });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";
    const h = corsHeaders(origin);

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: h });
    if (origin && !ALLOW_ORIGINS.includes(origin)) return json({ error: "origin not allowed" }, 403, h);

    if (url.pathname === "/api/status" && request.method === "GET") {
      return json({ proxy: true, has_key: !!env.DASHSCOPE_API_KEY, provider: "通义千问", models: MODELS, default_model: DEFAULT_MODEL }, 200, h);
    }

    if (url.pathname === "/api/claude" && request.method === "POST") {
      if (!env.DASHSCOPE_API_KEY) return json({ error: "服务器未配置 DASHSCOPE_API_KEY" }, 503, h);
      let body;
      try { body = await request.json(); } catch { return json({ error: "bad json" }, 400, h); }

      let model = body.model || DEFAULT_MODEL;
      if (!String(model).startsWith("qwen")) model = DEFAULT_MODEL;
      const messages = [];
      if (body.system) messages.push({ role: "system", content: body.system });
      for (const m of body.messages || []) {
        let c = m.content;
        if (Array.isArray(c)) c = c.map(b => (b && b.text) || "").join("");
        messages.push({ role: m.role || "user", content: c });
      }
      const payload = {
        model, messages,
        max_tokens: Math.min(body.max_tokens || 400, MAX_TOKENS_CAP),
        temperature: 0.3,
        response_format: { type: "json_object" },
      };
      const r = await fetch(QWEN_URL, {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${env.DASHSCOPE_API_KEY}` },
        body: JSON.stringify(payload),
      });
      if (!r.ok) {
        const t = await r.text();
        return new Response(t, { status: r.status, headers: { ...h, "content-type": "application/json; charset=utf-8" } });
      }
      const data = await r.json();
      const text = data?.choices?.[0]?.message?.content || "";
      return json({ content: [{ type: "text", text }], usage: data.usage || {} }, 200, h);
    }

    return json({ error: "not found" }, 404, h);
  },
};
