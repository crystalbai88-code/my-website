/* =====================================================================
 * AI 表达课 · 知识库驱动引擎
 * 设计铁律（来自 09_ai_teaching_controller + 13-接入指令）：
 *   - AI 只诊断 / 追问 / 提炼 / 比较 / 反馈，绝不代写完整作文
 *   - 一次只问一个主要问题
 *   - 只引用孩子已经说出的内容（证据板），绝不编造孩子的经历
 *   - 进入下一阶段必须由孩子确认
 *   - 修改一次只改一个维度，孩子自己执行并说明理由
 * 全程规则驱动，无需联网模型即可运行（先建可用版，后接真实模型）
 * ===================================================================== */

const KB = window.KB;
const ENRICH = window.ENRICH;
const SAVE_KEY = "ai-exp-course-v2";   // v2：双语伙伴版（旧 v1 存档结构不兼容）
const CFG_KEY = "ai-exp-settings";

/* ===================================================================== */
/* 双语层 · i18n（中 / EN / 双语对照）                                      */
/* ===================================================================== */
function T(zh, en) {                       // 块级：双语时英文另起一行
  if (CFG.lang === "en") return en || zh;
  if (CFG.lang === "both" && en) return `${zh}<span class="en-line">${en}</span>`;
  return zh;
}
function TI(zh, en) {                      // 行内：双语时用 · 连接（按钮等短文本）
  if (CFG.lang === "en") return en || zh;
  if (CFG.lang === "both" && en) return `${zh} · ${en}`;
  return zh;
}
function buddyName() { return TI(ENRICH.buddy.name.zh, ENRICH.buddy.name.en); }
function pickPraise() { const p = ENRICH.buddy.praise; return p[Math.floor(Math.random() * p.length)]; }

/* ---------- 小羽的声音 · 朗读（Web Speech Synthesis，离线免费） ---------- */
let VOICES = [];
function loadVoices() { try { VOICES = speechSynthesis.getVoices(); } catch (_) {} }
if ("speechSynthesis" in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
function decodeEntities(s) { const d = document.createElement("textarea"); d.innerHTML = String(s || ""); return d.value; }
function stripForSpeech(s) {
  return decodeEntities(String(s || "").replace(/<[^>]+>/g, " "))
    .replace(/[「」『』✨🎓🦉🔍🎈🧠⚖️🧭🎯✏️🔧🌱💭🧺🔬…—]/g, "").trim();
}
function pickVoice(prefix) {
  const vs = VOICES.filter(v => (v.lang || "").toLowerCase().startsWith(prefix));
  return vs.find(v => /xiaoxiao|huihui|tingting|meijia|samantha|karen|female/i.test(v.name)) || vs[0] || null;
}
function speakNow(zh, en) {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const parts = [];
  if (CFG.lang !== "en" && zh) parts.push(["zh", stripForSpeech(zh)]);
  if (CFG.lang !== "zh" && en) parts.push(["en", stripForSpeech(en)]);
  for (const [lg, text] of parts) {
    if (!text) continue;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lg === "zh" ? "zh-CN" : "en-US";
    const v = pickVoice(lg); if (v) u.voice = v;
    u.rate = 0.95; u.pitch = 1.08;            // 慢一点、亮一点，像小羽
    speechSynthesis.speak(u);
  }
}
let lastSpokenKey = null;
function speakOnce(key, zh, en) {            // 新台词出现时自动读一次（开关可关）
  if (lastSpokenKey === key) return;
  lastSpokenKey = key;
  if (CFG.tts) speakNow(zh, en);
}

/* 伙伴气泡（小羽）：自带 🔊 点读按钮 */
let SPEAK_REG = [];
function bubble(zh, en, extra) {
  const i = SPEAK_REG.push({ zh, en }) - 1;
  return `<div class="coach"><div class="avatar">🦉</div>
    <div class="bubble"><span class="buddy-tag">${buddyName()}</span><button class="say-btn" data-i="${i}" title="${TI("读给我听", "Read to me")}">🔊</button>${typeof zh === "string" ? T(zh, en) : ""}${extra || ""}</div></div>`;
}
document.addEventListener("click", e => {
  const b = e.target.closest(".say-btn");
  if (b) { const r = SPEAK_REG[+b.dataset.i]; if (r) speakNow(r.zh, r.en); }
});

/* ===================================================================== */
/* 真实模型设置（浏览器直连 Claude API；离线时自动回退到规则引擎）          */
/* ===================================================================== */
let CFG = { aiMode: false, apiKey: "", model: "", checker: true, lang: "both", tts: true };
let PROXY = { available: false, hasKey: false, provider: "", models: [], defaultModel: "" };
/* 代理地址：本地 serve.py 留空（同源）；公开站在 config.js 里填 Cloudflare Worker 地址 */
const API_BASE = (typeof window !== "undefined" && window.AI_PROXY_URL) ? String(window.AI_PROXY_URL).replace(/\/$/, "") : "";
function loadCfg() { try { Object.assign(CFG, JSON.parse(localStorage.getItem(CFG_KEY)) || {}); } catch (_) {} }
function saveCfg() { localStorage.setItem(CFG_KEY, JSON.stringify(CFG)); }
function proxyReady() { return PROXY.available && PROXY.hasKey; }
function aiEnabled() { return !!(CFG.aiMode && (CFG.apiKey || proxyReady())); }
/* 浏览器直连模式可选的国产模型（千问允许跨域直连） */
const DIRECT_MODELS = [
  { id: "qwen-plus", label: "通义千问 Plus（均衡·推荐）" },
  { id: "qwen-max", label: "通义千问 Max（最强）" },
  { id: "qwen-turbo", label: "通义千问 Turbo（最快最省）" },
];
/* 当前要用的模型 id：代理可用时用代理给的清单，否则用直连清单（默认千问） */
function activeModel() {
  if (PROXY.models.length) {
    return PROXY.models.some(m => m.id === CFG.model) ? CFG.model : PROXY.defaultModel;
  }
  return DIRECT_MODELS.some(m => m.id === CFG.model) ? CFG.model
    : (/^claude/.test(CFG.model) ? CFG.model : "qwen-plus");
}

async function initProxy() {
  try {
    const r = await fetch(API_BASE + "/api/status");
    if (r.ok) {
      const j = await r.json();
      PROXY = { available: !!j.proxy, hasKey: !!j.has_key, provider: j.provider || "", models: j.models || [], defaultModel: j.default_model || "" };
    }
  } catch (_) { /* file:// 或纯静态服务器：无代理 */ }
}

/* ---------- 十二站冒险（写作主线沿用 controller 九阶段；新增暖身/通识/思辨三站） ---------- */
const STAGES = [
  { id: "warmup",     name: "开脑洞",       nameEn: "Warm-Up",        icon: "🎈", kind: "warmup",
    goalZh: "用一个好玩的问题叫醒你的想法（没有对错）", goalEn: "Wake up your ideas with a silly question — no wrong answers" },
  { id: "diagnose",   name: "找到要写的事", nameEn: "Find Your Story", icon: "🔍", kind: "qa",
    candidates: ["D01", "D02"], primary: "D01", goalEn: "Find one small, real moment worth telling" },
  { id: "input",      name: "素材侦探",     nameEn: "Gather Clues",   icon: "🧺", kind: "input",
    goalEn: "Borrow a writer's trick and collect fresh clues" },
  { id: "recall",     name: "唤起回忆",     nameEn: "Rewind",         icon: "💭", kind: "qa",
    candidates: ["D02", "D01"], primary: "D01", goalEn: "Replay the moment like a tiny video" },
  { id: "knowledge",  name: "通识加油站",   nameEn: "Wonder Stop",    icon: "🧠", kind: "knowledge",
    goalZh: "认识一个和你的故事有关的大想法", goalEn: "Meet a big idea connected to your story" },
  { id: "detail",     name: "放大细节",     nameEn: "Zoom In",        icon: "🔬", kind: "qa",
    candidates: ["D04", "D05", "D09", "D03"], primary: "D04", goalEn: "Zoom into actions, senses and thoughts" },
  { id: "debate",     name: "思辨角",       nameEn: "Debate Corner",  icon: "⚖️", kind: "debate",
    goalZh: "和小羽辩一辩——重要的不是赢，是说出理由", goalEn: "Debate with Quill — it's not about winning, it's about reasons" },
  { id: "structure",  name: "理清顺序",     nameEn: "Story Map",      icon: "🧭", kind: "qa",
    candidates: ["D06", "D03"], primary: "D06", goalEn: "Map your story: Beginning → Change → Ending" },
  { id: "point",      name: "确认中心",     nameEn: "Find the Heart", icon: "🎯", kind: "qa",
    candidates: ["D13", "D11", "D05"], primary: "D13", goalEn: "Find the one sentence readers should remember" },
  { id: "draft",      name: "写下初稿",     nameEn: "First Draft",    icon: "✏️", kind: "draft",
    goalEn: "Write your own first draft — every word yours" },
  { id: "revision",   name: "修改打磨",     nameEn: "Polish",         icon: "🔧", kind: "revision",
    goalEn: "Polish one thing at a time, and say why" },
  { id: "reflection", name: "回看成长",     nameEn: "Look Back",      icon: "🌱", kind: "reflection",
    goalEn: "Look back — then teach Quill what YOU learned" },
];

/* ---------- 诊断启发式（源自 03_difficulty_library 的 detection_signals） ---------- */
const VAGUE = ["不知道", "没有", "没什么", "还好", "不记得", "想不出", "忘了", "嗯", "没事", "不晓得", "随便"];
const EMO = ["开心", "高兴", "难过", "伤心", "紧张", "害怕", "激动", "兴奋", "感动", "生气", "愤怒", "失望", "委屈", "幸福", "孤独", "害羞", "尴尬", "无聊"];
const ACTION_RE = /跑|跳|抓|推|拉|喊|叫|走|站|坐|握|拿|踢|笑|哭|看见|听见|转身|举手|低头|发抖|出汗|攥|捏|翻|踩|碰|摸|咬|皱|瞪|挥|扔|抱|抖|颤|愣|咽|喘/;
const SENSE_RE = /声音|颜色|味道|闻到|听到|看到|冷|热|疼|香|响|亮|暗|软|硬/;
const SEQ_RE = /(然后|后来|最后|接着|再然后|之后|跟着)/g;
const FEEL_RE = /(我觉得|我想|我感|我明白|我发现|我喜欢|我不想|原来|没想到|我希望|我决定|犹豫|后悔|担心|舍不得|忍不住|心里|心想|不敢|想到)/;
const ADULT_RE = /(终身难忘|刻骨铭心|意味深长|受益匪浅|感慨万千|流连忘返|栩栩如生|历历在目|恍然大悟|意义非凡|永生难忘|铭记于心)/;
const PREACH_RE = /(明白了一个道理|让我懂得了|告诉我们|这就是.{0,6}道理|我懂得了|的真谛|的意义所在)/;
const PERSON_RE = /(他|她|妈妈|爸爸|老师|同学|朋友|爷爷|奶奶|哥哥|姐姐|弟弟|妹妹)/;
const FLAT_RE = /(很好|很坏|可爱|严厉|善良|很凶|温柔|聪明|懒|勤快)/;
const GHOST_RE = /(帮我写|直接写|你来写|写一篇|全文|替我写|给我答案|你写吧|帮我编|帮我做|你帮我想一篇|你说怎么写就怎么写)/;

function len(s) { return (s || "").trim().replace(/\s/g, "").length; }
function isVague(s) { const t = (s || "").trim(); return VAGUE.includes(t) || VAGUE.some(v => t === v); }
function hasEmo(s) { return EMO.some(e => s.includes(e)); }

/* 从孩子的回答里摘一小段原话，用来"复述"——让离线追问也像在听 */
function echoFrag(ans) {
  const t = (ans || "").trim();
  if (len(t) < 4 || isVague(t)) return "";
  const pieces = t.split(/[，。！？,.!?；;\n]+/).filter(p => p.trim().length >= 3);
  if (!pieces.length) return t.slice(0, 14);
  const best = pieces.reduce((a, b) => (b.trim().length > a.trim().length ? b : a)).trim();
  return best.length > 16 ? best.slice(0, 15) + "…" : best;
}

/* 返回 {code, confidence, reason} 或 null（说明孩子这一轮表达已足够） */
function diagnose(text, candidates) {
  const t = (text || "").trim();
  const detectors = {
    D01: () => (len(t) === 0 || isVague(t)) ? { conf: "high", reason: "暂时没有可写的事" } : null,
    D02: () => (len(t) < 10 || isVague(t)) ? { conf: "high", reason: "回答还太短" } : null,
    D03: () => ((t.match(SEQ_RE) || []).length >= 3) ? { conf: "medium", reason: "像在记流水账" } : null,
    D04: () => (hasEmo(t) && !ACTION_RE.test(t) && !SENSE_RE.test(t)) ? { conf: "high", reason: "只有情绪词，还没有看得见的画面" } : null,
    D05: () => (len(t) >= 16 && !hasEmo(t) && !FEEL_RE.test(t) && !ACTION_RE.test(t) && !SENSE_RE.test(t)) ? { conf: "medium", reason: "事情清楚，但还没有你的感受" } : null,
    D06: () => ((t.match(SEQ_RE) || []).length >= 4 && len(t) > 50) ? { conf: "low", reason: "顺序有点乱" } : null,
    D09: () => (PERSON_RE.test(t) && FLAT_RE.test(t) && !ACTION_RE.test(t)) ? { conf: "medium", reason: "人物只有标签，还没有动作" } : null,
    D11: () => (PREACH_RE.test(t) || ADULT_RE.test(t)) ? { conf: "medium", reason: "结尾有点像喊口号" } : null,
    D13: () => null,
  };
  for (const code of candidates) {
    const d = detectors[code] && detectors[code]();
    if (d && d.conf !== "low") return { code, ...d };
  }
  return null;
}

/* 取某卡点 + 年级可用的策略（来自 04_teaching_strategy_library） */
function strategiesFor(code, grade) {
  return KB.strategies.strategies.filter(
    s => s.difficulty_id === code && s.suitable_grades.includes(grade)
  );
}
function difficulty(code) { return KB.difficulties.difficulties.find(d => d.difficulty_id === code); }
function controllerStage(id) { return KB.controller.stages.find(s => s.id === id); }
function taskById(id) { return KB.tasks.tasks.find(t => t.task_id === id); }
function rubricForGrade(g) { return KB.rubrics.grades.find(r => r.grade === g); }

/* 入门支架选项（D01/D02 连续短答时启用，仍只问一个问题） */
const ENTRY_SCAFFOLDS = [
  { zh: "今天上学路上", en: "On the way to school" }, { zh: "今天的课间", en: "At recess" },
  { zh: "放学回到家", en: "Back home after school" }, { zh: "吃饭的时候", en: "At dinner" },
  { zh: "睡觉前", en: "Before bed" }, { zh: "和同学之间", en: "With classmates" },
];
const DETAIL_ANGLES = [
  { zh: "当时手在做什么", en: "What were your hands doing" }, { zh: "身体有什么反应", en: "What did your body do" },
  { zh: "脑子里冒出什么念头", en: "What popped into your head" }, { zh: "你说了或听到了哪句话", en: "What did you say or hear" },
];

/* ===================================================================== */
/* 真实模型调用（使用知识库 12_ai_prompt_templates 的两段系统提示）         */
/* ===================================================================== */
function fillTemplate(tpl, vars) {
  let t = (tpl || "").replace(/\\n/g, "\n");                 // 还原模板里的换行
  for (const k in vars) t = t.replaceAll(`{{${k}}}`, vars[k] == null ? "" : String(vars[k]));
  return t;
}

const QWEN_DIRECT_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions";

/* 调真实模型，要求返回结构化 JSON。三条路：
   1) 后端代理（密钥在服务器，最安全）；
   2) 浏览器直连「通义千问」（DashScope 允许跨域；key 只在本机浏览器）；
   3) 浏览器直连 Claude（遗留）。 */
async function callClaudeJSON(systemText, userText, schema, maxTokens = 400) {
  const model = activeModel();

  // 1) 后端代理
  if (proxyReady()) {
    const res = await fetch(API_BASE + "/api/claude", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ model, max_tokens: maxTokens,
        output_config: { effort: "low", format: { type: "json_schema", schema } },
        system: systemText, messages: [{ role: "user", content: userText }] }),
    });
    if (!res.ok) throw new Error(`API ${res.status}: ${(await res.text().catch(() => "")).slice(0, 200)}`);
    const data = await res.json();
    return JSON.parse((data.content || []).filter(b => b.type === "text").map(b => b.text).join(""));
  }

  // 2) 浏览器直连 通义千问（OpenAI 兼容；只用你本机填的 key）
  if (/^qwen/.test(model)) {
    const res = await fetch(QWEN_DIRECT_URL, {
      method: "POST",
      headers: { "content-type": "application/json", "authorization": "Bearer " + CFG.apiKey },
      body: JSON.stringify({ model,
        messages: [{ role: "system", content: systemText }, { role: "user", content: userText }],
        max_tokens: maxTokens, temperature: 0.3, response_format: { type: "json_object" } }),
    });
    if (!res.ok) throw new Error(`千问 ${res.status}: ${(await res.text().catch(() => "")).slice(0, 200)}`);
    const data = await res.json();
    return JSON.parse(data?.choices?.[0]?.message?.content || "");
  }

  // 3) 浏览器直连 Claude（遗留）
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": CFG.apiKey,
      "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
    body: JSON.stringify({ model, max_tokens: maxTokens,
      output_config: { effort: "low", format: { type: "json_schema", schema } },
      system: systemText, messages: [{ role: "user", content: userText }] }),
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${(await res.text().catch(() => "")).slice(0, 200)}`);
  const data = await res.json();
  return JSON.parse((data.content || []).filter(b => b.type === "text").map(b => b.text).join(""));
}

const TEACH_SCHEMA = {
  type: "object", additionalProperties: false,
  properties: {
    stage: { type: "string" },
    action: { type: "string" },
    diagnosis_code: { type: ["string", "null"] },
    message_to_child: { type: "string" },
    message_to_child_en: { type: "string" },
    evidence_used: { type: "array", items: { type: "string" } },
    missing_field: { type: ["string", "null"] },
    ready_to_advance: { type: "boolean" },
    safety_flag: { type: "string", enum: ["none", "privacy", "harm", "other"] },
    internal_reason: { type: "string" },
  },
  required: ["stage", "action", "message_to_child", "evidence_used", "ready_to_advance", "safety_flag", "internal_reason"],
};
const CHECK_SCHEMA = {
  type: "object", additionalProperties: false,
  properties: {
    approved: { type: "boolean" },
    violation_codes: { type: "array", items: { type: "string" } },
    safe_message_to_child: { type: ["string", "null"] },
  },
  required: ["approved", "violation_codes"],
};

/* 教学模型：读懂孩子这一句，生成一个真正针对它的追问 */
async function aiTeach(stage, ans) {
  const cs = controllerStage(stage.id);
  const grade = S.grade;
  const candidates = stage.candidates || [];
  const profile = KB.profiles.profiles.find(p => p.profile_id === S.profileId);
  const strat = candidates.flatMap(c => strategiesFor(c, grade)).slice(0, 8)
    .map(s => ({ id: s.strategy_id, diff: s.difficulty_id, prompt: s.prompt, goal: s.teaching_goal }));
  const candDiff = candidates.map(c => ({ code: c, name: difficulty(c).name, signals: difficulty(c).detection_signals, goal: difficulty(c).teaching_goal }));

  const sys = fillTemplate(KB.prompts.runtime_prompts.teaching_model_system.template, {
    grade, stage: stage.id, teaching_goal: cs.goal, diagnosis_code: "见候选",
    student_profile: profile ? profile.name + "（" + profile.ai_style + "）" : "",
    allowed_actions: cs.allowed_actions.join("、"),
    student_answer: ans,
    known_evidence: JSON.stringify(S.evidence.map(e => e.text)),
    missing_field: "由你判断",
    strategy_records: JSON.stringify(strat),
  }) + `\n\n候选卡点（只能从中选一个或返回null）：${JSON.stringify(candDiff)}\n本阶段单轮汉字上限：${cs.output_limit}。\n额外要求：除 message_to_child（中文）外，再给出 message_to_child_en——同一个问题的自然、适龄英文版（像母语者对8-12岁孩子说话，不要逐字直译）。`;

  const user = `孩子刚才说：「${ans}」。请只生成一个适龄追问。`;
  const out = await callClaudeJSON(sys, user, TEACH_SCHEMA);

  if (CFG.checker) {                                  // 第二层质量检查（知识库 quality_checker_system）
    try {
      const chkSys = fillTemplate(KB.prompts.runtime_prompts.quality_checker_system.template, {
        course_state: JSON.stringify({ stage: stage.id, goal: cs.goal, grade, limit: cs.output_limit }),
        known_evidence: JSON.stringify(S.evidence.map(e => e.text)),
        candidate_output: JSON.stringify(out),
      });
      const chk = await callClaudeJSON(chkSys, "请检查上面的候选回复并只输出JSON。", CHECK_SCHEMA, 300);
      if (!chk.approved) out._rejected = chk.violation_codes || ["unapproved"];
    } catch (_) { /* 检查器失败不阻断，沿用教学输出 */ }
  }
  return out;
}

/* ===================================================================== */
/* 状态                                                                   */
/* ===================================================================== */
let S = null;

function freshSession(grade, taskId, profileId) {
  const growth = {};
  ["material", "detail", "sequence", "focus", "feeling", "point", "clarity", "revision"]
    .forEach(d => growth[d] = 1);
  return {
    grade, taskId, profileId,
    sampleId: "S-" + Math.random().toString(36).slice(2, 8).toUpperCase(),  // 随机，不含姓名生日
    stageIndex: 0,
    evidence: [],            // {tag, text}
    stageData: {},           // 每阶段问答记录
    draftTitle: "",
    draftBody: "",
    revisionLog: [],         // {dimension, dimName, before, after, why}
    reflection: [],          // {q, a}
    growth,
    growthBefore: { ...growth },  // rubric_before 快照
    observe: false,          // 教师观察模式
    consent: false,          // 监护人知情同意
    research: { turns: [], approvals: {} },  // 教师后台过程数据
    createdAt: Date.now(),
  };
}

function save() { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); }
function load() {
  try { const r = JSON.parse(localStorage.getItem(SAVE_KEY)); if (r && r.grade) S = r; }
  catch (_) { localStorage.removeItem(SAVE_KEY); }
}
function bump(dim, to) { if (S.growth[dim] < to) { S.growth[dim] = to; } }

/* ===================================================================== */
/* 渲染入口                                                               */
/* ===================================================================== */
const host = document.getElementById("stageHost");
const rail = document.getElementById("stageRail");
const badges = document.getElementById("sessionBadges");
const footer = document.getElementById("footerInner");
let activeTab = "course";

function render() {
  SPEAK_REG = [];                      // 点读注册表随每次渲染重建
  document.querySelectorAll(".tab").forEach(b => b.classList.toggle("active", b.dataset.tab === activeTab));
  document.getElementById("tab-course").classList.toggle("hidden", activeTab !== "course");
  document.getElementById("tab-work").classList.toggle("hidden", activeTab !== "work");
  document.getElementById("tab-parent").classList.toggle("hidden", activeTab !== "parent");
  document.getElementById("tab-teacher").classList.toggle("hidden", activeTab !== "teacher");
  document.body.classList.toggle("observe-on", !!(S && S.observe));

  renderBadges();
  if (activeTab === "course") renderCourse();
  if (activeTab === "work") renderWork();
  if (activeTab === "parent") renderParent();
  if (activeTab === "teacher") renderTeacher();
}

function renderBadges() {
  const langBtns = `<span class="lang-toggle">${[["zh", "中"], ["en", "EN"], ["both", "双语"]]
    .map(([v, l]) => `<button class="lang-btn ${CFG.lang === v ? "on" : ""}" data-lang="${v}">${l}</button>`).join("")}
    <button class="lang-btn tts ${CFG.tts ? "on" : ""}" id="ttsToggle" title="${TI("小羽朗读开/关", "Quill reads aloud on/off")}">${CFG.tts ? "🔊" : "🔇"}</button></span>`;
  if (!S) { badges.innerHTML = langBtns; wireLang(); return; }
  const task = taskById(S.taskId);
  badges.innerHTML = `<span class="badge">${TI(S.grade + "年级", "Grade " + S.grade)}</span>
    <span class="badge accent">${task ? task.title : "—"}</span>
    ${langBtns}`;
  wireLang();
}
function wireLang() {
  document.querySelectorAll(".lang-btn[data-lang]").forEach(b =>
    b.onclick = () => { CFG.lang = b.dataset.lang; saveCfg(); render(); });
  const tts = document.getElementById("ttsToggle");
  if (tts) tts.onclick = () => {
    CFG.tts = !CFG.tts; saveCfg();
    if (!CFG.tts && "speechSynthesis" in window) speechSynthesis.cancel();
    render();
  };
}

/* ---------- 课程主流程 ---------- */
function renderCourse() {
  if (!S) { renderSetup(); rail.innerHTML = ""; footer.innerHTML = ""; return; }
  renderRail();
  const stage = STAGES[S.stageIndex];
  ({ qa: renderQA, input: renderInput, draft: renderDraft,
     revision: renderRevision, reflection: renderReflection,
     warmup: renderWarmup, knowledge: renderKnowledge, debate: renderDebate }[stage.kind])(stage);
}

function renderRail() {
  rail.innerHTML = STAGES.map((s, i) => {
    const cls = i < S.stageIndex ? "done" : i === S.stageIndex ? "active" : "";
    const label = CFG.lang === "en" ? s.nameEn : s.name;
    return `<span class="stage-pill ${cls}" title="${s.name} · ${s.nameEn}">${i < S.stageIndex ? "✓" : s.icon} ${label}</span>`;
  }).join("");
}

/* 站点标题条：第 X 站 + 双语名 + 双语目标 */
function stageHead(stage) {
  const cs = controllerStage(stage.id);
  const goalZh = stage.goalZh || (cs ? cs.goal : "");
  return `
    <div class="eyebrow">${TI(`第 ${S.stageIndex + 1} / ${STAGES.length} 站`, `Stop ${S.stageIndex + 1} of ${STAGES.length}`)} · ${stage.name} · ${stage.nameEn}</div>
    <h2>${stage.icon} ${T(stage.name, stage.nameEn)}</h2>
    <p class="goal">${T(goalZh, stage.goalEn)}</p>`;
}

function footerNav({ canBack = true, canNext = true, nextLabel = null, nextEnabled = true, onNext, extra = "" } = {}) {
  if (!nextLabel) nextLabel = TI("我说完了，下一步", "Done, next stop") + " →";
  footer.innerHTML =
    `${canBack ? '<button class="btn ghost small" id="fBack">← 上一步</button>' : ""}
     ${extra}
     <div class="spacer"></div>
     ${canNext ? `<button class="btn" id="fNext" ${nextEnabled ? "" : "disabled"}>${nextLabel}</button>` : ""}`;
  if (canBack) document.getElementById("fBack").onclick = () => { S.stageIndex = Math.max(0, S.stageIndex - 1); save(); render(); };
  if (canNext) document.getElementById("fNext").onclick = onNext || (() => advance());
}

function advance() {
  if (S.stageIndex < STAGES.length - 1) { S.stageIndex++; save(); render(); window.scrollTo({ top: 0, behavior: "smooth" }); }
}

/* ===================================================================== */
/* 阶段：问答类（diagnose / recall / detail / structure / point）          */
/* ===================================================================== */
function stageData(id) {
  if (!S.stageData[id]) S.stageData[id] = { turns: [], currentQ: null, code: null, pool: [], poolIdx: 0, shortStreak: 0, satisfied: false, curStratId: null, curDiag: null };
  return S.stageData[id];
}

function openerFor(stage) {
  const task = taskById(S.taskId);
  const cs = controllerStage(stage.id);
  switch (stage.id) {
    case "diagnose": {
      // 用任务 + 卡点 D01 的第一条策略当开场
      const st = strategiesFor("D01", S.grade)[0];
      return {
        zh: `我们这次的探险任务是《${task.title}》——${task.task_brief}。${st ? st.prompt : "最近有没有哪一分钟和平常不一样？"}`,
        en: `Our quest this time: "${task.title}". Think of one recent little moment that felt different from usual — what happened?`,
      };
    }
    case "recall":
      return { zh: "你刚才说的那件事，把它当成一段小录像。最开始的那一秒，画面里有谁、在哪里？",
               en: "Play that moment like a tiny video. In the very first second — who is in the picture, and where are you?" };
    case "detail":
      return { zh: "现在我们放大其中最重要的一个瞬间。那一刻，你的手在做什么？",
               en: "Let's zoom into the most important moment. What were your hands doing right then?" };
    case "structure":
      return { zh: "把这件事分成三站：开始 → 中间发生变化 → 结果。先说说『开始』那一站发生了什么？",
               en: "Split your story into three stops: Beginning → Change → Ending. What happened at the Beginning?" };
    case "point":
      return { zh: "如果读你故事的人只能记住一句话，你最想让他们记住哪一句？",
               en: "If readers could remember only ONE sentence of your story, which should it be?" };
    default:
      return { zh: cs ? cs.goal : "我们继续。", en: "Let's keep going." };
  }
}

/* 情绪入口（recall 站）：选一个表情，把心情先抓住 */
const MOOD_EMOJIS = ["😄", "😢", "😨", "😡", "😳", "🤔", "😮", "💪"];

function renderQA(stage) {
  const d = stageData(stage.id);
  if (!d.currentQ) { const o = openerFor(stage); d.currentQ = o.zh; d.currentQEn = o.en; }

  const showScaffold = (stage.id === "diagnose" || stage.id === "recall") && d.shortStreak >= 2 && S.grade <= 4;
  const showAngles = d.code === "D04";
  const showMood = stage.id === "recall" && d.turns.length === 0;     // 情绪表情入口
  const showBuckets = stage.id === "structure" && S.evidence.length >= 2;  // 故事地图分桶

  host.innerHTML = `
    <div class="card">
      ${stageHead(stage)}

      ${d.turns.map(t => `
        ${bubble(escapeHtml(t.q), t.qEn ? escapeHtml(t.qEn) : null)}
        <div class="kid-line"><span class="kid-bubble">${escapeHtml(t.a)}</span></div>`).join("")}

      <div class="coach ${d.refuse ? "refuse" : ""}">
        <div class="avatar">🦉</div>
        <div class="bubble"><span class="buddy-tag">${buddyName()}</span>${T(escapeHtml(d.currentQ), d.currentQEn ? escapeHtml(d.currentQEn) : null)}
          ${d.code ? `<span class="why">${TI("（我在帮你：" + difficulty(d.code).teaching_goal + "）", "")}</span>` : ""}
        </div>
      </div>

      ${showBuckets ? bucketsHtml() : ""}

      ${showMood ? `<div class="chips" id="moodRow">
          <span class="small muted" style="width:100%">${TI("先抓住当时的心情（点一个）：", "First, catch the feeling (tap one):")}</span>
          ${MOOD_EMOJIS.map(e => `<button class="chip ghost mood" data-e="${e}">${e}</button>`).join("")}
        </div>` : ""}
      ${showScaffold ? `<div class="chips" id="scaffold">
          <span class="small muted" style="width:100%">${TI("不知道从哪说起？先选一个时间点：", "Not sure where to start? Pick a time:")}</span>
          ${ENTRY_SCAFFOLDS.map(c => `<button class="chip ghost" data-fill="在${c.zh}，">${TI(c.zh, c.en)}</button>`).join("")}
        </div>` : ""}
      ${showAngles ? `<div class="chips" id="angles">
          <span class="small muted" style="width:100%">${TI("可以从这里说起（任选其一）：", "Try starting from one of these:")}</span>
          ${DETAIL_ANGLES.map(c => `<button class="chip ghost" data-fill="${c.zh}：">${TI(c.zh, c.en)}</button>`).join("")}
        </div>` : ""}

      <div class="answer-box">${answerWidget("qaInput")}</div>
      <div class="actions">
        <button class="btn accent small" id="qaSend" ${d.thinking ? "disabled" : ""}>${d.thinking ? TI("小羽正在想问题…", "Quill is thinking…") : TI("说给小羽听", "Tell Quill")}</button>
        ${d.pool.length > 1 && !d.thinking ? `<button class="btn ghost small" id="qaSwitch">${TI("换种问法", "Ask differently")}</button>` : ""}
        ${aiEnabled() ? '<span class="badge accent" style="align-self:center">🟢 真实AI</span>' : ""}
      </div>
      ${d.guard ? `<div class="guard-banner">${d.guard}</div>` : ""}
      ${!aiEnabled() ? `<p class="small muted offline-hint">💡 ${TI("现在是离线模式，问题来自题库。想让小羽真正听懂每句话，请爸爸妈妈在开始页打开「真实AI」。", "Offline mode: questions come from a library. To let Quill truly understand you, ask a grown-up to switch on Real AI on the start page.")}</p>` : ""}
    </div>
    ${teacherStripHtml(stage)}
    ${evidenceBoard()}
  `;
  speakOnce("qa|" + stage.id + "|" + d.currentQ, d.currentQ, d.currentQEn);

  wireAnswerWidget("qaInput");
  bindEvidenceBoard();
  host.querySelectorAll("#scaffold .chip, #angles .chip").forEach(btn => {
    btn.onclick = () => { const ta = document.getElementById("qaInput"); ta.value = btn.dataset.fill; ta.focus(); };
  });
  host.querySelectorAll("#moodRow .mood").forEach(btn => {
    btn.onclick = () => { const ta = document.getElementById("qaInput"); ta.value = (ta.value || "") + btn.dataset.e; ta.focus(); };
  });
  if (showBuckets) wireBuckets(stage);
  document.getElementById("qaSend").onclick = () => (aiEnabled() ? submitQAAI(stage) : submitQA(stage));
  const sw = document.getElementById("qaSwitch");
  if (sw) sw.onclick = () => { d.poolIdx = (d.poolIdx + 1) % d.pool.length; d.currentQ = d.pool[d.poolIdx].prompt; d.currentQEn = null; d.curStratId = d.pool[d.poolIdx].strategy_id; d.refuse = false; save(); renderQA(stage); };

  if (S.observe) wireTeacherStrip();

  footerNav({
    nextEnabled: d.turns.length > 0,
    nextLabel: S.observe ? TI("教师同意，进入下一站", "Teacher approves, next stop") + " →"
      : (d.satisfied ? TI("做得好，下一站", "Nice! Next stop") + " →" : TI("我说完了，下一站", "Done, next stop") + " →"),
    onNext: () => { if (S.observe) S.research.approvals[stage.id] = true; grantQAGrowth(stage, d); advance(); },
  });
}

/* 故事地图：把证据板上的句子分进 开始/变化/结果 三个桶（点击循环切换） */
function bucketsHtml() {
  if (!S.structMap) S.structMap = {};
  const B = [
    { k: "b", zh: "① 开始", en: "Beginning" }, { k: "m", zh: "② 变化", en: "Change" },
    { k: "e", zh: "③ 结果", en: "Ending" },
  ];
  return `<div class="bucket-box">
    <div class="small muted" style="margin-bottom:6px">${TI("小练习：点你说过的话，把它分进三站（再点可换）", "Mini-game: tap your own lines to sort them into the three stops")}</div>
    ${S.evidence.map((e, i) => {
      const cur = S.structMap[i];
      const bk = B.find(x => x.k === cur);
      return `<button class="bucket-item ${cur ? "tag-" + cur : ""}" data-i="${i}">
        <span class="bk">${bk ? TI(bk.zh, bk.en) : TI("未分类", "unsorted")}</span>${escapeHtml(e.text.slice(0, 40))}${e.text.length > 40 ? "…" : ""}</button>`;
    }).join("")}
  </div>`;
}
function wireBuckets(stage) {
  const order = [undefined, "b", "m", "e"];
  host.querySelectorAll(".bucket-item").forEach(btn => {
    btn.onclick = () => {
      const i = +btn.dataset.i;
      const cur = S.structMap[i];
      const next = order[(order.indexOf(cur) + 1) % order.length];
      if (next) S.structMap[i] = next; else delete S.structMap[i];
      if (Object.keys(S.structMap).length >= 3) bump("sequence", 3);
      save(); renderQA(stage);
    };
  });
}

/* 教师观察条：给最近一轮"追问→回答"打效果标签（数据进研究库，孩子端不出现追问效果词） */
function teacherStripHtml(stage) {
  if (!S.observe) return "";
  const turns = S.research.turns.filter(t => t.stage === stage.id);
  if (!turns.length) return "";
  const t = turns[turns.length - 1];
  const i = S.research.turns.indexOf(t);
  const tags = [["effective", "✅ 引出了内容"], ["partial", "😐 一般"], ["silent", "🤐 沉默/困惑"], ["option_dependent", "🧩 依赖选项"]];
  return `<div class="card teacher-strip">
    <div class="eyebrow">👩‍🏫 教师观察（仅教师可见，不展示给孩子）</div>
    <p class="small muted" style="margin:2px 0 8px">刚才这句追问 ${t.strategy_id ? `<b>${t.strategy_id}</b>` : "（开场白）"}${t.diagnosis_code ? ` · 诊断 ${t.diagnosis_code}` : ""} ｜ 系统自动判读：${({drew_content:"引出内容",silent_or_short:"偏短/沉默",partial:"部分"})[t.auto_outcome]}</p>
    <div class="chips" data-ti="${i}" data-kind="tag">${tags.map(([v, l]) => `<button class="chip ghost small ${t.teacher_tag === v ? "selected" : ""}" data-v="${v}">${l}</button>`).join("")}</div>
    <p class="small muted" style="margin:8px 0 4px">这一轮诊断（${t.diagnosis_code || "无"}）准确吗？</p>
    <div class="chips" data-ti="${i}" data-kind="diag">
      <button class="chip ghost small ${t.diagnosis_ok === true ? "selected" : ""}" data-v="true">诊断准</button>
      <button class="chip ghost small ${t.diagnosis_ok === false ? "selected" : ""}" data-v="false">诊断不准</button>
    </div>
  </div>`;
}
function wireTeacherStrip() {
  document.querySelectorAll(".teacher-strip .chips").forEach(box => {
    const i = +box.dataset.ti, kind = box.dataset.kind;
    box.querySelectorAll(".chip").forEach(b => b.onclick = () => {
      const turn = S.research.turns[i];
      if (kind === "tag") turn.teacher_tag = b.dataset.v;
      else turn.diagnosis_ok = b.dataset.v === "true";
      save(); render();
    });
  });
}

/* 去标识化：抹掉电话/长数字串等可识别信息（姓名等由教师自觉不录入，并有提示） */
function redact(text) {
  return (text || "")
    .replace(/1\d{10}/g, "〔号码已隐去〕")
    .replace(/\d{7,}/g, "〔数字已隐去〕")
    .trim();
}

/* AI 模式：真实模型读懂孩子的回答，生成针对性的下一个追问 */
async function submitQAAI(stage) {
  const d = stageData(stage.id);
  const ta = document.getElementById("qaInput");
  const ans = (ta.value || "").trim();
  d.guard = null; d.refuse = false;

  if (GHOST_RE.test(ans)) {                       // 代写请求由前端直接拦下，不耗 API
    d.refuse = true;
    d.guard = "我不会替你写整段——那样就不是你的表达了。我们把它变小：" +
      (stage.id === "detail" ? "只说一个你做过的动作就行。" : "先说一句你自己看到或听到的就好。");
    save(); renderQA(stage); return;
  }
  if (!ans) { d.guard = TI("先随便说一句也行，哪怕只有几个字。", "Even a few words count — just say anything!"); save(); renderQA(stage); return; }

  d.turns.push({ q: d.currentQ, qEn: d.currentQEn, a: ans });
  addEvidence(stage.name, ans);
  if (len(ans) < 10) d.shortStreak++; else d.shortStreak = 0;
  d.thinking = true; save(); renderQA(stage);

  try {
    const out = await aiTeach(stage, ans);
    d.thinking = false;
    if (out._rejected) {                           // 质检未通过 → 回退到规则引擎的安全追问
      fallbackQuestion(stage, ans);
      d.guard = "（这一句我换种问法）";
    } else {
      d.code = out.diagnosis_code || null;
      d.curDiag = out.diagnosis_code || null;
      d.curStratId = null;                          // 由 AI 生成，非固定策略
      d.pool = [];
      d.currentQ = out.message_to_child;
      d.currentQEn = out.message_to_child_en || null;
      d.satisfied = !!out.ready_to_advance;
      if (out.safety_flag && out.safety_flag !== "none") d.guard = "（已注意安全/隐私，已转回写作任务）";
    }
    S.research.turns.push({
      stage: stage.id, strategy_id: null, diagnosis_code: d.curDiag,
      question: d.currentQ, answer_redacted: redact(ans), answer_len: len(ans),
      auto_outcome: len(ans) >= 12 && !isVague(ans) ? "drew_content" : "partial",
      source: "ai", teacher_tag: null, diagnosis_ok: null,
    });
  } catch (e) {
    d.thinking = false;
    fallbackQuestion(stage, ans);
    d.guard = "（连不上真实模型，已切回离线提问：" + (e.message || "网络错误") + "）";
  }
  if (d.turns.length >= 4) d.satisfied = true;
  save(); renderQA(stage);
}

/* 规则引擎兜底：复用离线诊断挑一个安全追问 */
function fallbackQuestion(stage, ans) {
  const d = stageData(stage.id);
  const dg = diagnose(ans, stage.candidates || []);
  if (dg) {
    d.code = dg.code; d.curDiag = dg.code;
    d.pool = strategiesFor(dg.code, S.grade); d.poolIdx = 0;
    d.curStratId = d.pool.length ? d.pool[0].strategy_id : null;
    const q = d.pool.length ? d.pool[0].prompt : difficulty(dg.code).recommended_strategy;
    const frag = echoFrag(ans);
    d.currentQ = (frag && !/^你说/.test(q)) ? `你说"${frag}"——${q}` : q;
    d.currentQEn = null;
    d.satisfied = false;
  } else {
    d.code = null; d.pool = []; d.curDiag = null; d.curStratId = null;
    d.satisfied = true;
    const aff = pickAffirm(stage, ans);
    d.currentQ = aff.zh; d.currentQEn = aff.en;
  }
}

function submitQA(stage) {
  const d = stageData(stage.id);
  const ta = document.getElementById("qaInput");
  const ans = (ta.value || "").trim();
  d.guard = null; d.refuse = false;

  if (GHOST_RE.test(ans)) {                       // 拒绝代写，缩小为孩子可完成的一步
    d.refuse = true;
    d.guard = "我不会替你写整段——那样就不是你的表达了。我们把它变小：" +
      (stage.id === "detail" ? "只说一个你做过的动作就行。" : "先说一句你自己看到或听到的就好。");
    save(); renderQA(stage); return;
  }
  if (!ans) { d.guard = TI("先随便说一句也行，哪怕只有几个字。", "Even a few words count — just say anything!"); save(); renderQA(stage); return; }

  d.turns.push({ q: d.currentQ, qEn: d.currentQEn, a: ans });
  addEvidence(stage.name, ans);
  if (len(ans) < 10) d.shortStreak++; else d.shortStreak = 0;

  // 教师后台：记录"这句追问 → 孩子的回答"这一对（去标识化）
  S.research.turns.push({
    stage: stage.id,
    strategy_id: d.curStratId,                 // 这个问题来自哪条策略（开场为 null）
    diagnosis_code: d.curDiag,                 // 触发该追问的卡点
    question: d.currentQ,
    answer_redacted: redact(ans),
    answer_len: len(ans),
    auto_outcome: len(ans) >= 12 && !isVague(ans) ? "drew_content"
                  : (isVague(ans) || len(ans) < 6) ? "silent_or_short" : "partial",
    teacher_tag: null,                          // effective / partial / silent / option_dependent
    diagnosis_ok: null,                         // true / false（教师判断）
  });

  const dg = diagnose(ans, stage.candidates || []);
  if (dg) {
    d.code = dg.code;
    d.pool = strategiesFor(dg.code, S.grade);
    d.poolIdx = 0;
    d.curDiag = dg.code;
    d.curStratId = d.pool.length ? d.pool[0].strategy_id : null;  // 下一个问题的来源
    const q = d.pool.length ? d.pool[0].prompt : difficulty(dg.code).recommended_strategy;
    const frag = echoFrag(ans);                   // 先复述孩子的原话，再追问
    d.currentQ = (frag && !/^你说/.test(q)) ? `你说"${frag}"——${q}` : q;
    d.currentQEn = null;                          // 题库追问暂无英文版（AI 模式下有）
    d.satisfied = false;
  } else {
    // 这一轮表达已足够具体
    d.code = null; d.pool = []; d.satisfied = true;
    d.curDiag = null; d.curStratId = null;
    const aff = pickAffirm(stage, ans);
    d.currentQ = aff.zh; d.currentQEn = aff.en;
  }
  // 三轮兜底：不无限追问
  if (d.turns.length >= 3) d.satisfied = true;
  save(); renderQA(stage);
}

function pickAffirm(stage, ans) {
  const p = pickPraise();
  const map = {
    diagnose: { zh: p.zh + " 这件事可以写！我把它记在『小羽听到了什么』里了。", en: p.en + " That's a story worth telling! I've saved it on my board." },
    recall: { zh: p.zh + " 画面有了，我们去放大最重要的瞬间。", en: p.en + " I can see the scene — let's zoom into the biggest moment." },
    detail: { zh: "这个细节我能看见！接下来把顺序理一理。", en: "I can SEE that detail! Next, let's map the order." },
    structure: { zh: "三站连起来了。下一站，找你最想说的那句话。", en: "All three stops connect! Next, find the heart of your story." },
    point: { zh: "你的中心很清楚。准备好写初稿了！", en: "Your heart-sentence is clear. Ready to draft!" },
  };
  return map[stage.id] || { zh: "很好，点下一站继续。", en: "Great — on to the next stop." };
}

function grantQAGrowth(stage, d) {
  const gotDetail = d.turns.some(t => ACTION_RE.test(t.a) || SENSE_RE.test(t.a));
  const gotFeel = d.turns.some(t => FEEL_RE.test(t.a) || hasEmo(t.a));
  switch (stage.id) {
    case "diagnose": bump("material", 2); break;
    case "recall": bump("material", 3); break;
    case "detail": if (gotDetail) bump("detail", 3); if (gotFeel) bump("feeling", 3); break;
    case "structure": bump("sequence", 3); break;
    case "point": bump("point", 3); bump("focus", 3); break;
  }
  save();
}

/* ===================================================================== */
/* 新站点①：开脑洞（warmup）—— 好玩的问题，没有对错，建立表达安全感          */
/* ===================================================================== */
function renderWarmup(stage) {
  const d = stageData("warmup");
  if (!d.w) d.w = ENRICH.warmups[Math.floor(Math.random() * ENRICH.warmups.length)];
  const w = d.w;

  host.innerHTML = `
    <div class="card">
      ${stageHead(stage)}
      ${d.turns.length === 0 ? bubble(escapeHtml(ENRICH.buddy.intro.zh), escapeHtml(ENRICH.buddy.intro.en)) : ""}
      ${bubble(escapeHtml(w.zh), escapeHtml(w.en))}

      ${d.turns.map(t => `
        <div class="kid-line"><span class="kid-bubble">${escapeHtml(t.a)}</span></div>
        ${t.react ? bubble(escapeHtml(t.react.zh), escapeHtml(t.react.en)) : ""}`).join("")}

      ${d.turns.length === 0 ? `
        ${w.chips ? `<div class="chips">${w.chips.map(c => `<button class="chip warm-chip" data-v="${escapeAttr(c.zh)}">${TI(c.zh, c.en)}</button>`).join("")}</div>` : ""}
        <div class="answer-box">${answerWidget("wuInput")}</div>
        <div class="actions">
          <button class="btn accent small" id="wuSend">${TI("告诉小羽", "Tell Quill")}</button>
          <button class="btn ghost small" id="wuSwap">${TI("换个问题", "Different question")}</button>
        </div>` : ""}
    </div>
  `;
  speakOnce("wu|" + (d.turns.length ? "react" : w.id),
    d.turns.length ? d.turns[d.turns.length - 1].react.zh : w.zh,
    d.turns.length ? d.turns[d.turns.length - 1].react.en : w.en);
  if (d.turns.length === 0) {
    wireAnswerWidget("wuInput");
    host.querySelectorAll(".warm-chip").forEach(b => b.onclick = () => {
      const ta = document.getElementById("wuInput");
      ta.value = "我选" + b.dataset.v + "，因为"; ta.focus();
    });
    document.getElementById("wuSwap").onclick = () => { d.w = ENRICH.warmups[Math.floor(Math.random() * ENRICH.warmups.length)]; save(); renderWarmup(stage); };
    document.getElementById("wuSend").onclick = () => {
      const v = val("wuInput"); if (!v) return;
      const p = pickPraise();
      d.turns.push({ a: v, react: { zh: p.zh + " 脑洞开好了，我们出发！", en: p.en + " Brain warmed up — let's go!" } });
      save(); renderWarmup(stage);
    };
  }
  footerNav({
    canBack: false,
    nextLabel: d.turns.length ? TI("出发！", "Let's go!") + " →" : TI("跳过，直接出发", "Skip — let's go") + " →",
    onNext: () => advance(),
  });
}

/* ===================================================================== */
/* 新站点②：通识加油站（knowledge）—— 翻卡 + 想一想 + 小羽也试着答            */
/* ===================================================================== */
function renderKnowledge(stage) {
  const d = stageData("knowledge");
  const card = ENRICH.cardFor(taskById(S.taskId));

  host.innerHTML = `
    <div class="card">
      ${stageHead(stage)}
      ${bubble(
        escapeHtml("写故事的人，脑袋里都装着别的故事。我带了一张和你的题目有关的『奇想卡』——点开看看！"),
        escapeHtml("Storytellers carry other stories in their heads. I brought a Wonder Card connected to your topic — tap to open it!"))}

      <div class="flip-card ${d.flipped ? "flipped" : ""}" id="wonderCard">
        <div class="flip-inner">
          <div class="flip-front">
            <div class="flip-emoji">${card.emoji}</div>
            <div class="flip-title">${T(card.title.zh, card.title.en)}</div>
            <div class="flip-hint">${TI("点我翻开", "Tap to flip")} ✨</div>
          </div>
          <div class="flip-back">
            <div class="flip-story">${T(escapeHtml(card.hook.zh), escapeHtml(card.hook.en))}</div>
          </div>
        </div>
      </div>

      ${d.flipped ? `
        <div class="material" style="margin-top:12px">
          <div class="mtitle">🔬 ${TI("还有这个", "And this")}</div>
          <div class="mtext small">${T(escapeHtml(card.fact.zh), escapeHtml(card.fact.en))}</div>
        </div>
        <div class="quote-box">${T(escapeHtml(card.quote.zh), escapeHtml(card.quote.en))}</div>

        ${bubble(escapeHtml("想一想：" + card.think.zh), escapeHtml("Think: " + card.think.en))}

        ${d.turns.map(t => `
          <div class="kid-line"><span class="kid-bubble">${escapeHtml(t.a)}</span></div>
          ${bubble(escapeHtml(card.buddyTry.zh), escapeHtml(card.buddyTry.en))}`).join("")}

        ${d.turns.length === 0 ? `
          <div class="answer-box">${answerWidget("knInput")}</div>
          <div class="actions"><button class="btn accent small" id="knSend">${TI("说说我的想法", "Share my thought")}</button></div>
        ` : ""}
      ` : ""}
    </div>
  `;
  if (d.flipped) {
    speakOnce("kn|" + (d.turns.length ? "try" : "think") + card.id,
      d.turns.length ? card.buddyTry.zh : "想一想：" + card.think.zh,
      d.turns.length ? card.buddyTry.en : "Think: " + card.think.en);
  }
  document.getElementById("wonderCard").onclick = () => { if (!d.flipped) { d.flipped = true; save(); renderKnowledge(stage); } };
  if (d.flipped && d.turns.length === 0) {
    wireAnswerWidget("knInput");
    document.getElementById("knSend").onclick = () => {
      const v = val("knInput"); if (!v) return;
      d.turns.push({ a: v });
      bump("material", 2); bump("point", 2);
      save(); renderKnowledge(stage);
    };
  }
  footerNav({
    nextEnabled: !!d.flipped,
    nextLabel: TI("加满油，下一站", "Fueled up! Next stop") + " →",
    onNext: () => advance(),
  });
}

/* ===================================================================== */
/* 新站点③：思辨角（debate）—— 立场滑杆 + 小羽永远站对面 + 没有输赢          */
/* ===================================================================== */
function renderDebate(stage) {
  const d = stageData("debate");
  const db = ENRICH.debateFor(taskById(S.taskId));
  if (d.stance == null) d.stance = 50;
  const step = d.step || 0;   // 0=表态 1=小羽反驳后再回应 2=收尾

  host.innerHTML = `
    <div class="card">
      ${stageHead(stage)}
      ${bubble(
        escapeHtml("我从猫头鹰辩论社带来一句话。先别急着同意——想想你站在哪边？"),
        escapeHtml("I brought a claim from the Owl Debate Club. Don't agree too fast — where do YOU stand?"))}

      <div class="claim-box">${T(escapeHtml(db.claim.zh), escapeHtml(db.claim.en))}</div>

      <div class="stance-row">
        <span class="small">${TI("不同意", "Disagree")}</span>
        <input type="range" id="stance" min="0" max="100" value="${d.stance}" ${step >= 2 ? "disabled" : ""}/>
        <span class="small">${TI("同意", "Agree")}</span>
      </div>
      <div class="stance-read" id="stanceRead">${stanceLabel(d.stance)}</div>

      ${d.turns.map((t, i) => `
        <div class="kid-line"><span class="kid-bubble">${escapeHtml(t.a)}</span></div>
        ${t.counter ? bubble(escapeHtml(t.counter.zh), escapeHtml(t.counter.en)) : ""}`).join("")}

      ${step === 0 ? `
        <div class="field-label">${TI("你的理由是什么？（一句就够）", "What's your reason? One line is enough.")}</div>
        <div class="answer-box">${answerWidget("dbInput")}</div>
        <div class="actions"><button class="btn accent small" id="dbSend">${TI("亮出理由", "State my reason")}</button></div>
      ` : ""}
      ${step === 1 ? `
        <div class="field-label">${TI("小羽唱了反调——你怎么回应？（也可以改变立场，拖上面的滑杆）", "Quill pushed back — how do you respond? You may also move the slider.")}</div>
        <div class="answer-box">${answerWidget("dbInput")}</div>
        <div class="actions"><button class="btn accent small" id="dbSend">${TI("我来回应", "My response")}</button></div>
      ` : ""}
      ${step >= 2 ? bubble(
        escapeHtml("你刚才做了一件思考者才会做的事：站在自己的对面看问题。今天不需要改变想法——重要的是，你为想法找到了理由。"),
        escapeHtml("You just did something real thinkers do: looked at your own idea from the other side. You don't have to change your mind today — what matters is you gave it reasons.")) : ""}
    </div>
  `;
  const lastCounter = d.turns.length && d.turns[0].counter ? d.turns[0].counter : null;
  speakOnce("db|" + db.id + "|" + step,
    step === 0 ? db.claim.zh : step === 1 && lastCounter ? lastCounter.zh : "你刚才做了一件思考者才会做的事。",
    step === 0 ? db.claim.en : step === 1 && lastCounter ? lastCounter.en : "You just did something real thinkers do.");
  const slider = document.getElementById("stance");
  slider.oninput = () => { d.stance = +slider.value; document.getElementById("stanceRead").innerHTML = stanceLabel(d.stance); save(); };
  if (step < 2) {
    wireAnswerWidget("dbInput");
    document.getElementById("dbSend").onclick = async () => {
      const v = val("dbInput"); if (!v) return;
      if (step === 0) {
        const counter = d.stance >= 50 ? db.counterYes : db.counterNo;
        d.turns.push({ a: v, counter });
        d.step = 1;
        if (taskById(S.taskId).type === "opinion") addEvidence("思辨", v);
      } else {
        d.turns.push({ a: v });
        d.step = 2;
        bump("point", 3);
      }
      save(); renderDebate(stage);
    };
  }
  footerNav({
    nextEnabled: (d.step || 0) >= 1,
    nextLabel: TI("想清楚了，下一站", "Thought it through! Next") + " →",
    onNext: () => advance(),
  });
}
function stanceLabel(v) {
  const zh = v < 20 ? "强烈不同意" : v < 45 ? "有点不同意" : v <= 55 ? "中间派" : v < 80 ? "有点同意" : "强烈同意";
  const en = v < 20 ? "Strongly disagree" : v < 45 ? "Sort of disagree" : v <= 55 ? "On the fence" : v < 80 ? "Sort of agree" : "Strongly agree";
  return `${v} · ${TI(zh, en)}`;
}

/* ===================================================================== */
/* 阶段：补充素材（input）—— 观察任务 / 微片段                              */
/* ===================================================================== */
function renderInput(stage) {
  const d = stageData("input");
  const cs = controllerStage("input");
  if (!d.pick) {
    // 依年级挑一个观察任务 + 一个示范微片段
    const obs = KB.inputs.observations.filter(o => o.suitable_grades.includes(S.grade));
    const micros = KB.inputs.micro_texts.filter(m => m.suitable_grades.includes(S.grade));
    d.pick = obs[Math.floor(Math.random() * obs.length)];
    d.micro = micros[Math.floor(Math.random() * micros.length)];
  }
  const o = d.pick, m = d.micro;
  host.innerHTML = `
    <div class="card">
      ${stageHead(stage)}
      ${bubble(
        escapeHtml("侦探出动！先看一段别人写的细节当『放大镜』，再去收集你自己的线索。"),
        escapeHtml("Detective time! First borrow a magnifying glass — see how another writer caught a detail — then collect your own clues."))}

      <div class="material">
        <div class="mtitle">📖 ${TI("看别人怎么写细节（示范，不用背）", "How a writer catches details (just look, no memorizing)")}</div>
        <div class="mtext">${escapeHtml(m.text)}</div>
        <div class="mq">${TI("想一想：", "Think: ")}${escapeHtml(m.teaching_question)}</div>
      </div>

      <div class="material">
        <div class="mtitle">🔭 ${TI("观察任务", "Observation mission")}：${escapeHtml(o.title)}</div>
        <div class="mtext">${escapeHtml(o.instruction)}</div>
        <div class="mq">${TI("回来后告诉我：", "Report back: ")}${o.return_fields.map(escapeHtml).join(" / ")}</div>
        <div class="small muted" style="margin-top:6px">${TI("隐私：", "Privacy: ")}${escapeHtml(o.privacy_rule)}</div>
      </div>

      <div class="answer-box">
        <div class="field-label">${TI("你的观察发现：", "Your clue:")}</div>
        ${answerWidget("inInput")}
      </div>
      <div class="actions"><button class="btn accent small" id="inSave">${TI("记下我的发现", "Log my clue")}</button></div>
    </div>
    ${evidenceBoard()}
  `;
  wireAnswerWidget("inInput");
  bindEvidenceBoard();
  document.getElementById("inSave").onclick = () => {
    const v = (document.getElementById("inInput").value || "").trim();
    if (v) { addEvidence("观察发现", v); bump("detail", Math.max(2, S.growth.detail)); save(); }
    render();
  };
  footerNav({ nextLabel: TI("线索够了，下一站", "Clues collected! Next") + " →", onNext: () => advance() });
}

/* ===================================================================== */
/* 阶段：写下初稿（draft）—— 孩子自己写，AI 只给句子开头/提醒                */
/* ===================================================================== */
function renderDraft(stage) {
  const task = taskById(S.taskId);
  if (!S.draftTitle) S.draftTitle = task ? task.title : "我的表达";
  if (!S.draftLang) S.draftLang = "zh";
  const starters = strategiesFor("D10", S.grade).slice(0, 3);
  const EN_STARTERS = ["At that moment, ", "I still remember ", "It all started when "];

  host.innerHTML = `
    <div class="card">
      ${stageHead(stage)}
      ${bubble(
        escapeHtml("到你大显身手的时候了！这里没有「一键生成」——每个字都得是你的。我就在旁边，卡住了看下面的句子开头。"),
        escapeHtml("Your big moment! There's no magic generate button here — every word must be yours. I'll be right beside you; if you get stuck, grab a sentence starter below."))}

      <div class="field-label">${TI("这篇你想用什么语言写？", "Which language will you write in?")}</div>
      <div class="chips" id="dLang">
        ${[["zh", "中文", "Chinese"], ["en", "英文", "English"], ["mix", "中英混搭", "Mix both!"]]
          .map(([v, z, e]) => `<button class="chip ${S.draftLang === v ? "selected" : ""}" data-v="${v}">${TI(z, e)}</button>`).join("")}
      </div>

      ${evidenceMini()}

      <div class="draft-meta"><input type="text" id="dTitle" value="${escapeAttr(S.draftTitle)}" placeholder="${TI("给作品起个题目", "Give it a title")}" /></div>
      <textarea id="dBody" rows="12" placeholder="${TI("从最想说的那一句开始写……", "Start with the sentence you most want to say...")}">${escapeHtml(S.draftBody)}</textarea>
      <div class="wordcount" id="wc"></div>

      <div class="field-label">✏️ ${TI("卡住了？挑一个句子开头（点了会填进去）：", "Stuck? Tap a sentence starter:")}</div>
      <div class="starter-list" id="starters">
        ${(S.draftLang !== "en" ? starters.map(s => `<button class="starter" data-s="${escapeAttr(s.prompt)}">${escapeHtml(s.prompt)}</button>`).join("")
          + `<button class="starter" data-s="那一刻，">那一刻，……</button>` : "")}
        ${(S.draftLang !== "zh" ? EN_STARTERS.map(s => `<button class="starter en-starter" data-s="${escapeAttr(s)}">${escapeHtml(s)}…</button>`).join("") : "")}
      </div>
      <div class="guard-banner" id="dGuard" style="display:none"></div>
    </div>
  `;
  const body = document.getElementById("dBody");
  const title = document.getElementById("dTitle");
  const wc = document.getElementById("wc");
  const updateWc = () => wc.textContent = `${len(body.value)} ${TI("字 · 自动保存中", "chars · autosaved")}`;
  updateWc();
  host.querySelectorAll("#dLang .chip").forEach(b => b.onclick = () => { S.draftLang = b.dataset.v; save(); renderDraft(stage); });
  const onChange = () => {
    if (GHOST_RE.test(body.value)) { /* 不拦截孩子写作内容，仅在请求代写时无效，这里无需处理 */ }
    S.draftBody = body.value; S.draftTitle = title.value.trim() || S.draftTitle;
    if (len(body.value) > 20) bump("clarity", Math.max(2, S.growth.clarity));
    updateWc(); save();
  };
  body.oninput = onChange; title.oninput = onChange;
  document.querySelectorAll("#starters .starter").forEach(b => {
    b.onclick = () => { body.value += (body.value && !body.value.endsWith("\n") ? "\n" : "") + b.dataset.s; body.focus(); onChange(); };
  });
  footerNav({
    nextEnabled: len(S.draftBody) >= 15,
    nextLabel: TI("初稿写好了，去打磨", "Draft done — let's polish") + " →",
    onNext: () => advance(),
  });
}

/* ===================================================================== */
/* 阶段：修改打磨（revision）—— 一次一个维度，孩子自己改                     */
/* ===================================================================== */
const DIMS = [
  { id: "detail", name: "细节", probe: "抽象", hint: "把概括词换成看得见的动作或画面" },
  { id: "feeling", name: "感受", probe: "情绪", hint: "用身体反应或念头代替『我很……』" },
  { id: "sequence", name: "顺序", probe: "结构", hint: "让开始—变化—结果连得上" },
  { id: "focus", name: "重点", probe: "流水账", hint: "放大最重要的一处，压缩其它" },
  { id: "clarity", name: "语言", probe: "成人", hint: "换成你自己平时会说的话" },
  { id: "point", name: "结尾", probe: "结尾", hint: "让结尾回到现场，而不是喊口号" },
];

function recommendDim() {
  const t = S.draftBody;
  if (hasEmo(t) && !ACTION_RE.test(t)) return "feeling";
  if ((t.match(SEQ_RE) || []).length >= 3) return "focus";
  if (ADULT_RE.test(t) || PREACH_RE.test(t)) return "clarity";
  if (!ACTION_RE.test(t) && !SENSE_RE.test(t)) return "detail";
  return "detail";
}

function findCase(probe, grade) {
  const cs = KB.revisions.cases.filter(c => c.suitable_grades.includes(grade));
  return cs.find(c => (c.problem_type || "").includes(probe)) || cs[Math.floor(Math.random() * cs.length)];
}

function renderRevision(stage) {
  const d = stageData("revision");
  if (!d.dim) d.dim = recommendDim();
  const cs = controllerStage("revision");
  const dimObj = DIMS.find(x => x.id === d.dim);
  const demo = findCase(dimObj.probe, S.grade);

  host.innerHTML = `
    <div class="card">
      ${stageHead(stage)}
      ${bubble(
        escapeHtml("好作品都是改出来的——但一次只磨一个地方。我找了个示范给你看，动手的还是你。"),
        escapeHtml("Great writing is rewriting — but we polish ONE thing at a time. I found a demo for you; the hands-on part is all yours."))}

      <div class="field-label">${TI("这一轮我们改：（小羽推荐", "This round we polish: (Quill suggests")} <b>${dimObj.name}</b>${TI("，你也可以换）", ", but you choose)")}</div>
      <div class="dim-grid">
        ${DIMS.map(x => `<button class="dim-card ${x.id === d.dim ? "selected" : ""} ${x.id === recommendDim() ? "reco" : ""}" data-dim="${x.id}">
          <b>${x.name}</b><span>${x.hint}</span></button>`).join("")}
      </div>

      <div class="demo-case">
        <div class="row"><span class="lab">看一个改法示范（不是标准答案）</span></div>
        <div class="row">原句：${escapeHtml(demo.original)}</div>
        <div class="row">老师只问：<b>${escapeHtml(demo.teacher_question)}</b></div>
        <div class="row">孩子补充：${escapeHtml(demo.student_new_evidence)}</div>
        <div class="row">改后：${escapeHtml(demo.revised)}</div>
        <div class="row small muted">${escapeHtml(demo.teaching_point)}</div>
      </div>

      <div class="field-label">① 从你的初稿里，挑出要改的那一句（原句）：</div>
      ${answerWidget("revBefore", "single")}
      <div class="field-label" style="margin-top:10px">② 你改写后的句子：</div>
      ${answerWidget("revAfter", "single")}
      <div class="field-label" style="margin-top:10px">③ 你为什么这样改？（说给 AI 听）</div>
      ${answerWidget("revWhy", "single")}

      <div class="actions"><button class="btn accent small" id="revSave">完成这一处修改</button></div>

      ${S.revisionLog.length ? `<div class="field-label" style="margin-top:18px">你已经自己改过的地方：</div>
        ${S.revisionLog.map(r => `<div class="revlog-item">
          <span class="d">${r.dimName}</span><br>
          <span class="muted">原：</span>${escapeHtml(r.before)}<br>
          <span class="muted">改：</span>${escapeHtml(r.after)}<br>
          <span class="muted">因为：</span>${escapeHtml(r.why)}</div>`).join("")}` : ""}
    </div>
  `;
  wireAnswerWidget("revBefore"); wireAnswerWidget("revAfter"); wireAnswerWidget("revWhy");
  document.querySelectorAll(".dim-card").forEach(b => b.onclick = () => { d.dim = b.dataset.dim; save(); renderRevision(stage); });
  document.getElementById("revSave").onclick = () => {
    const before = val("revBefore"), after = val("revAfter"), why = val("revWhy");
    if (!before || !after) { alert("先填好原句和改写后的句子。"); return; }
    S.revisionLog.push({ dimension: d.dim, dimName: dimObj.name, before, after, why: why || "（还没说原因）" });
    // 把改写同步进初稿
    if (S.draftBody.includes(before)) S.draftBody = S.draftBody.replace(before, after);
    bump("revision", S.revisionLog.length >= 2 ? 4 : 3);
    bump(d.dim === "feeling" ? "feeling" : d.dim, 3);
    save(); renderRevision(stage);
  };
  footerNav({
    nextEnabled: S.revisionLog.length >= 1,
    nextLabel: TI("打磨好了，回望来路", "Polished! Look back") + " →",
    onNext: () => advance(),
  });
}

/* ===================================================================== */
/* 阶段：回看成长（reflection）                                            */
/* ===================================================================== */
function renderReflection(stage) {
  const d = stageData("reflection");
  const qs = [
    { zh: "整篇里，你自己最喜欢哪一句？为什么？", en: "Which line of yours do you like best? Why that one?" },
    { zh: "这次你自己改了哪个地方，让它变得更好？", en: "Which spot did you fix yourself — and how did it get better?" },
    { zh: "最后，反转时刻🎓——今天换你当老师：把你这次学到的一招，教给小羽吧！（我真的会记进羽毛笔记本）", en: "Final twist 🎓 — now YOU are the teacher. Teach Quill ONE trick you learned today. (It really goes into my feather notebook!)" },
  ];
  if (!d.idx) d.idx = 0;

  host.innerHTML = `
    <div class="card">
      ${stageHead(stage)}

      ${S.reflection.map((r, i) => `
        ${bubble(escapeHtml(r.q), r.qEn ? escapeHtml(r.qEn) : null)}
        <div class="kid-line"><span class="kid-bubble">${escapeHtml(r.a)}</span></div>
        ${i === 2 ? bubble(escapeHtml(ENRICH.buddy.taught.zh), escapeHtml(ENRICH.buddy.taught.en)) : ""}`).join("")}

      ${d.idx < qs.length ? `
        ${bubble(escapeHtml(qs[d.idx].zh), escapeHtml(qs[d.idx].en))}
        ${answerWidget("refIn")}
        <div class="actions"><button class="btn accent small" id="refSend">${d.idx === 2 ? TI("教给小羽", "Teach Quill") : TI("说给小羽听", "Tell Quill")}</button></div>
      ` : `<div class="parent-note">🎉 ${T("你完成了一篇完全属于自己的表达——而且把小羽也教会了一招。去『我的作品』看看吧！",
            "You finished a piece that is 100% yours — and you even taught Quill a trick. Go see it in My Work!")}</div>`}
    </div>
    ${growthPanel(false)}
  `;
  speakOnce("ref|" + d.idx,
    d.idx < qs.length ? qs[d.idx].zh : ENRICH.buddy.taught.zh,
    d.idx < qs.length ? qs[d.idx].en : ENRICH.buddy.taught.en);
  if (d.idx < qs.length) {
    wireAnswerWidget("refIn");
    document.getElementById("refSend").onclick = () => {
      const v = val("refIn"); if (!v) return;
      S.reflection.push({ q: qs[d.idx].zh, qEn: qs[d.idx].en, a: v });
      d.idx++; bump("point", Math.max(3, S.growth.point)); bump("revision", Math.max(3, S.growth.revision));
      save(); renderReflection(stage);
    };
  }
  footerNav({
    canNext: d.idx >= qs.length,
    nextLabel: TI("看我的作品", "See my work") + " →",
    onNext: () => { activeTab = "work"; render(); },
  });
}

/* ===================================================================== */
/* 证据板 / 成长面板 / 通用组件                                            */
/* ===================================================================== */
function addEvidence(tag, text) {
  // 只存孩子原话，绝不存 AI 编造内容
  S.evidence.push({ tag, text: text.trim() });
  save();
}
function evidenceBoard() {
  return `<div class="card evidence-panel">
    <h3>👂 ${TI("小羽听到了什么", "What Quill Heard")}</h3>
    <p class="note">${T("这里只放<strong>你自己说过的话</strong>。小羽不会偷偷加内容。记错了，点 × 删掉。",
      "Only <strong>your own words</strong> live here. Quill never sneaks anything in. Tap × to remove a mistake.")}</p>
    <div id="eviList">${S.evidence.length
      ? S.evidence.map((e, i) => `<div class="evi-item"><span class="tag">${escapeHtml(e.tag)}</span><span class="txt">${escapeHtml(e.text)}</span><button class="del" data-i="${i}">×</button></div>`).join("")
      : `<div class="evi-empty">${TI("你说的话会出现在这里。", "Your words will appear here.")}</div>`}</div>
  </div>`;
}
function evidenceMini() {
  if (!S.evidence.length) return "";
  return `<div class="material"><div class="mtitle">👂 你之前说过的（可以用进初稿）</div>
    ${S.evidence.slice(-6).map(e => `<div class="small">· ${escapeHtml(e.text)}</div>`).join("")}</div>`;
}
function bindEvidenceBoard() {
  document.querySelectorAll("#eviList .del").forEach(b =>
    b.onclick = () => { S.evidence.splice(+b.dataset.i, 1); save(); render(); });
}

function growthPanel(forParent) {
  const r = rubricForGrade(S.grade);
  const rows = r.dimensions.map(dim => {
    const lvl = S.growth[dim.dimension_id] || 1;
    const desc = (dim.levels.find(l => l.level === lvl) || {}).descriptor || "";
    return `<div class="growth-row">
      <div class="glab"><span>${dim.name}</span><span>L${lvl} / 4</span></div>
      <div class="bar"><i style="width:${lvl / 4 * 100}%"></i></div>
      <div class="growth-desc">${escapeHtml(desc)}</div>
    </div>`;
  }).join("");
  return `<div class="card">
    <div class="eyebrow">成长量表 · ${S.grade}年级（八维）</div>
    <h2>🌱 这次表达的成长</h2>
    <p class="goal">依据 08_assessment_rubrics。不看字数、不看好词好句，看真实能力。</p>
    ${rows}
    ${forParent ? "" : ""}
  </div>`;
}

/* 输入组件：文字 + 语音（Web Speech API，降级为纯文字） */
function answerWidget(id, mode) {
  const rows = mode === "single" ? 2 : 3;
  return `
    <div class="input-mode" data-for="${id}">
      <button class="mode-btn active" data-mode="text">⌨️ ${TI("打字", "Type")}</button>
      <button class="mode-btn" data-mode="voice">🎤 ${TI("说话", "Speak")}</button>
    </div>
    <textarea id="${id}" rows="${rows}" placeholder="${TI("打字，或点上面的「说话」用语音输入", "Type here, or tap Speak to use your voice")}"></textarea>
    <div class="mic-row hidden" id="${id}-mic">
      <button class="mic-btn" id="${id}-micbtn">🎤 ${TI("点一下开始说", "Tap and talk")}</button>
      <span class="mic-hint" id="${id}-michint"></span>
    </div>`;
}
function wireAnswerWidget(id) {
  const modeBox = document.querySelector(`.input-mode[data-for="${id}"]`);
  if (!modeBox) return;
  const mic = document.getElementById(id + "-mic");
  modeBox.querySelectorAll(".mode-btn").forEach(b => b.onclick = () => {
    modeBox.querySelectorAll(".mode-btn").forEach(x => x.classList.remove("active"));
    b.classList.add("active");
    mic.classList.toggle("hidden", b.dataset.mode !== "voice");
  });
  setupMic(id);
}
function setupMic(id) {
  const btn = document.getElementById(id + "-micbtn");
  const hint = document.getElementById(id + "-michint");
  const ta = document.getElementById(id);
  if (!btn) return;
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { hint.textContent = "这台设备不支持语音，请用打字。"; btn.disabled = true; return; }
  let rec = null, on = false;
  btn.onclick = () => {
    if (on && rec) { rec.stop(); return; }
    rec = new SR(); rec.lang = CFG.lang === "en" ? "en-US" : "zh-CN"; rec.interimResults = true; rec.continuous = true;
    let base = ta.value;
    rec.onstart = () => { on = true; btn.classList.add("live"); btn.textContent = "🔴 正在听…点一下结束"; hint.textContent = "慢慢说，说错没关系。"; };
    rec.onresult = e => { let txt = ""; for (let i = 0; i < e.results.length; i++) txt += e.results[i][0].transcript; ta.value = (base ? base + " " : "") + txt; };
    rec.onerror = () => { hint.textContent = "没听清，可以再试一次或改用打字。"; };
    rec.onend = () => { on = false; btn.classList.remove("live"); btn.textContent = "🎤 再说一次"; };
    rec.start();
  };
}
function val(id) { const e = document.getElementById(id); return e ? (e.value || "").trim() : ""; }

/* ===================================================================== */
/* 选择页（开始一次新表达）                                                */
/* ===================================================================== */
const TASK_TYPES = [
  { type: "real_experience", label: "写真事", labelEn: "True stories" },
  { type: "people_relationships", label: "写人", labelEn: "People" },
  { type: "observation_discovery", label: "观察发现", labelEn: "Observation" },
  { type: "imagination", label: "想象故事", labelEn: "Imagination" },
  { type: "knowledge_explanation", label: "讲明白一件事", labelEn: "Explain it" },
  { type: "opinion", label: "说观点", labelEn: "Opinions" },
];
let setupSel = { grade: 4, type: "real_experience", taskId: null, profileId: "P01" };

function renderSetup() {
  const profileQ = KB.profiles.profiles;
  const tasks = KB.tasks.tasks.filter(t => t.type === setupSel.type && t.suitable_grades.includes(setupSel.grade));
  if (!tasks.find(t => t.task_id === setupSel.taskId)) setupSel.taskId = tasks[0] && tasks[0].task_id;

  host.innerHTML = `
    <div class="card">
      <div class="eyebrow">${TI("开始一次表达探险", "Start an Expression Quest")}</div>
      <h2>${T("把你脑子里的东西，说出来 ✦", "Let the ideas in your head out ✦")}</h2>
      <p class="goal">${T("你的旅伴是小羽🦉——一只爱提问的猫头鹰。它会陪你聊、跟你辩、给你讲世界的奇事——但每一个字都得是你写的。",
        "Your travel buddy is Quill 🦉 — an owl full of questions. It chats with you, debates with you, shares wonders of the world — but every word of the story must be yours.")}</p>

      <div class="field-label">① ${TI("你上几年级？", "What grade are you in?")}</div>
      <div class="opt-row">${[3, 4, 5, 6].map(g => `<button class="chip ${setupSel.grade === g ? "selected" : ""}" data-grade="${g}">${TI(g + "年级", "Grade " + g)}</button>`).join("")}</div>

      <div class="field-label" style="margin-top:14px">② ${TI("这次想写哪一类？", "What kind of piece this time?")}</div>
      <div class="opt-row">${TASK_TYPES.map(t => `<button class="chip ${setupSel.type === t.type ? "selected" : ""}" data-type="${t.type}">${TI(t.label, t.labelEn)}</button>`).join("")}</div>

      <div class="field-label" style="margin-top:14px">③ 挑一个题目（${tasks.length} 个适合 ${setupSel.grade} 年级）</div>
      <div class="setup-grid" id="taskList">
        ${tasks.map(t => `<button class="task-card ${setupSel.taskId === t.task_id ? "selected" : ""}" data-task="${t.task_id}">
          <b>${escapeHtml(t.title)}</b><p>${escapeHtml(t.task_brief)}</p>
          <p class="focus">学习重点：${escapeHtml(t.learning_focus)}</p></button>`).join("")}
      </div>

      <div class="field-label" style="margin-top:14px">④ 你更像哪种表达者？（决定 AI 怎么陪你）</div>
      <div class="opt-row">${profileQ.map(p => `<button class="chip ${setupSel.profileId === p.profile_id ? "selected" : ""}" data-prof="${p.profile_id}">${p.name}</button>`).join("")}</div>
      <p class="small muted" id="profHint" style="margin-top:6px">${profHintText(setupSel.profileId)}</p>

      <div class="actions"><button class="btn" id="startBtn">开始这次表达 →</button></div>
    </div>

    <div class="card">
      <div class="eyebrow">AI 陪练模式</div>
      <h2 style="font-size:1rem">${aiEnabled() ? "🟢 已接入真实模型" : "⚪ 离线规则模式"}</h2>
      <p class="small muted">离线模式用规则引擎提问（够用但较固定）。开启真实模型后，AI 会<strong>真正读懂孩子这一句</strong>再生成针对性的追问；所有护栏（一次一问、不代写、只用孩子原话）不变。</p>

      <label class="toggle-row" style="margin-top:8px"><input type="checkbox" id="aiToggle" ${CFG.aiMode ? "checked" : ""}/>
        <span><b>开启真实模型陪练</b></span></label>

      ${proxyReady() ? `
        <div class="parent-note" style="margin-top:8px">🔒 已通过<strong>后端代理</strong>连接 <strong>${escapeHtml(PROXY.provider || "模型")}</strong>：密钥在服务器（serve.py 读环境变量），浏览器看不到、也不保存。全家/同一台机器多人可安全联网用。</div>
        <div class="opt-row" style="margin-top:8px">
          <select id="aiModel">
            ${PROXY.models.map(m => `<option value="${m.id}" ${activeModel() === m.id ? "selected" : ""}>${escapeHtml(m.label)}</option>`).join("")}
          </select>
        </div>
        <input type="hidden" id="aiKey" value=""/>
      ` : `
        <p class="small muted" style="margin-top:8px">填入<strong>通义千问</strong> API Key，浏览器直接连千问（DashScope 允许跨域）。</p>
        <div class="opt-row" style="margin-top:6px">
          <input type="password" id="aiKey" placeholder="通义千问 API Key（sk-...，阿里云百炼）" value="${escapeAttr(CFG.apiKey)}" style="flex:1;min-width:200px"/>
          <select id="aiModel">
            ${DIRECT_MODELS.map(m => `<option value="${m.id}" ${activeModel() === m.id ? "selected" : ""}>${escapeHtml(m.label)}</option>`).join("")}
          </select>
        </div>
        <details class="key-help">
          <summary>🔑 怎么拿到千问钥匙？（约 2 分钟，新用户有免费额度）</summary>
          <ol class="small">
            <li>打开 <a href="https://bailian.console.aliyun.com/?apiKey=1#/api-key" target="_blank" rel="noopener"><b>阿里云百炼 · API-KEY 管理页</b></a>，用支付宝或淘宝账号登录；</li>
            <li>首次进入会提示<b>开通「百炼大模型服务」</b>——免费开通，新用户通常各模型送一笔免费调用额度；</li>
            <li>点<b>「创建我的 API-KEY」</b>，复制 <code>sk-</code> 开头的那串字符；</li>
            <li>回到这里粘贴 → 点「测试连接」→ 勾选上面的开关，搞定！</li>
          </ol>
          <p class="small muted">建议顺手在百炼控制台给这个 key 设一个消费限额，安心。</p>
        </details>
        <div class="guard-banner" style="margin-top:8px">🔑 key <strong>只存在你自己的浏览器</strong>（localStorage），别人看不到。<br>⚠️ 但<strong>不要把 key 硬写进公开网页源码</strong>——那样所有访客都能看到、盗刷你的额度。公开给多人用请改后端代理（serve.py / Cloudflare）。</div>
      `}

      <label class="toggle-row" style="margin-top:8px"><input type="checkbox" id="aiChecker" ${CFG.checker ? "checked" : ""}/>
        <span>开启双重质量审核（quality_checker，更安全，略慢）</span></label>
      <div class="actions"><button class="btn ghost small" id="aiTest">测试连接</button><span class="small muted" id="aiStatus"></span></div>
    </div>

    <div class="card">
      <div class="eyebrow">这门课不做什么</div>
      <p class="small">✗ 没有「一键生成作文」 ✗ 没有「全文润色」 ✗ 不会把 AI 的文字盖到你的稿子上 ✗ 不靠字数和好词好句打分 ✗ 不保存你的真实姓名、学校、住址。<br>
      <span class="muted">（规则来自知识库 13-接入指令 / 09-控制器）</span></p>
    </div>
  `;
  const syncCfg = () => {
    CFG.aiMode = document.getElementById("aiToggle").checked;
    CFG.apiKey = document.getElementById("aiKey").value.trim();
    CFG.model = document.getElementById("aiModel").value;
    CFG.checker = document.getElementById("aiChecker").checked;
    saveCfg();
  };
  ["aiToggle", "aiKey", "aiModel", "aiChecker"].forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener("change", () => { syncCfg(); if (id === "aiToggle") renderSetup(); });
  });
  document.getElementById("aiTest").onclick = async () => {
    syncCfg(); const st = document.getElementById("aiStatus");
    if (!CFG.apiKey && !proxyReady()) { st.textContent = "请先填入 API Key（或在服务器配置密钥）"; return; }
    st.textContent = "测试中…";
    try {
      await callClaudeJSON("只输出JSON。", "请返回 {\"ok\":true}。", { type: "object", additionalProperties: false, properties: { ok: { type: "boolean" } }, required: ["ok"] }, 50);
      st.textContent = "✅ 连接成功，可以开始了";
    } catch (e) { st.textContent = "❌ " + (e.message || "连接失败"); }
  };
  host.querySelectorAll("[data-grade]").forEach(b => b.onclick = () => { setupSel.grade = +b.dataset.grade; setupSel.taskId = null; renderSetup(); });
  host.querySelectorAll("[data-type]").forEach(b => b.onclick = () => { setupSel.type = b.dataset.type; setupSel.taskId = null; renderSetup(); });
  host.querySelectorAll("[data-task]").forEach(b => b.onclick = () => { setupSel.taskId = b.dataset.task; renderSetup(); });
  host.querySelectorAll("[data-prof]").forEach(b => b.onclick = () => { setupSel.profileId = b.dataset.prof; renderSetup(); });
  document.getElementById("startBtn").onclick = () => {
    S = freshSession(setupSel.grade, setupSel.taskId, setupSel.profileId);
    save(); render();
  };
  footer.innerHTML = "";
}
function profHintText(pid) {
  const p = KB.profiles.profiles.find(x => x.profile_id === pid);
  return p ? `AI 会这样陪你：${p.ai_style}` : "";
}

/* ===================================================================== */
/* 我的作品 / 家长报告                                                     */
/* ===================================================================== */
function renderWork() {
  const wrap = document.getElementById("tab-work");
  if (!S) { wrap.innerHTML = `<div class="card"><p class="muted">还没有作品。去「课程」开始第一次表达吧。</p></div>`; footer.innerHTML = ""; return; }
  wrap.innerHTML = `
    <div class="card">
      <div class="eyebrow">我的作品</div>
      <h2>${escapeHtml(S.draftTitle || "（还没起题目）")}</h2>
      <div class="material"><div class="mtext">${S.draftBody ? escapeHtml(S.draftBody).replace(/\n/g, "<br>") : '<span class="muted">还没写初稿。回到「课程」第 7 步写下来。</span>'}</div></div>
      <div class="actions">
        <button class="btn ghost small" id="goEdit">回去修改</button>
        <button class="btn small" id="dl">下载我的作品</button>
      </div>
    </div>
    ${S.revisionLog.length ? `<div class="card">
      <div class="eyebrow">我自己改过的地方</div>
      ${S.revisionLog.map(r => `<div class="compare">
        <div class="col before"><h4>改之前 · ${r.dimName}</h4>${escapeHtml(r.before)}</div>
        <div class="col after"><h4>改之后</h4>${escapeHtml(r.after)}</div>
      </div><p class="small muted">我为什么这样改：${escapeHtml(r.why)}</p>`).join("")}
    </div>` : ""}
    ${S.reflection.length ? `<div class="card"><div class="eyebrow">我的创作自述</div>
      ${S.reflection.map(r => `<p class="small"><b>${escapeHtml(r.q)}</b><br>${escapeHtml(r.a)}</p>`).join("")}</div>` : ""}
  `;
  document.getElementById("goEdit").onclick = () => { activeTab = "course"; S.stageIndex = 6; save(); render(); };
  document.getElementById("dl").onclick = downloadWork;
  footer.innerHTML = `<button class="btn ghost small" id="newOne">＋ 开始新的一篇</button><div class="spacer"></div>`;
  document.getElementById("newOne").onclick = startNew;
}

function renderParent() {
  const wrap = document.getElementById("tab-parent");
  if (!S) { wrap.innerHTML = `<div class="card"><p class="muted">还没有数据。</p></div>`; footer.innerHTML = ""; return; }
  const r = rubricForGrade(S.grade);
  const turns = Object.values(S.stageData).reduce((n, d) => n + (d.turns ? d.turns.length : 0), 0);
  wrap.innerHTML = `
    <div class="card">
      <div class="eyebrow">家长报告</div>
      <h2>📈 孩子这次表达的成长</h2>
      <p class="goal">这里只展示能力维度，<strong>不展示孩子和 AI 的私密对话全文</strong>（隐私规则来自 13-接入指令）。</p>
      ${r.dimensions.map(dim => {
        const lvl = S.growth[dim.dimension_id] || 1;
        const desc = (dim.levels.find(l => l.level === lvl) || {}).descriptor || "";
        return `<div class="growth-row">
          <div class="glab"><span>${dim.name}</span><span>L${lvl}/4</span></div>
          <div class="bar"><i style="width:${lvl / 4 * 100}%"></i></div>
          <div class="growth-desc">${escapeHtml(desc)}</div></div>`;
      }).join("")}
    </div>
    <div class="card">
      <div class="eyebrow">过程指标（看努力，不看分数）</div>
      <p class="small">· 孩子主动回答了 <b>${turns}</b> 次追问<br>
      · 自己动手修改了 <b>${S.revisionLog.length}</b> 处，并能说出修改理由<br>
      · 「AI 听到了什么」里保留了 <b>${S.evidence.length}</b> 条孩子自己的素材<br>
      · 初稿长度 <b>${len(S.draftBody)}</b> 字（仅供参考，不作为评价）</p>
      <div class="parent-note">建议陪伴方式：请孩子读一段他最喜欢的句子给你听，并问问他「这一句你是怎么想出来的」。比起纠错，先肯定他自己找到的细节。</div>
    </div>
  `;
  footer.innerHTML = "";
}

function downloadWork() {
  let md = `# ${S.draftTitle}\n\n${S.draftBody}\n\n`;
  if (S.revisionLog.length) {
    md += `\n---\n## 我自己改过的地方\n`;
    S.revisionLog.forEach(r => md += `\n- 【${r.dimName}】\n  - 改前：${r.before}\n  - 改后：${r.after}\n  - 为什么：${r.why}\n`);
  }
  if (S.reflection.length) { md += `\n---\n## 我的创作自述\n`; S.reflection.forEach(r => md += `\n**${r.q}**\n${r.a}\n`); }
  const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${S.draftTitle || "我的表达"}.md`;
  a.click();
}

function startNew() {
  if (!confirm("开始新的一篇会清空当前这篇，确定吗？")) return;
  S = null; localStorage.removeItem(SAVE_KEY); activeTab = "course"; setupSel.taskId = null; render();
}

/* ===================================================================== */
/* 教师后台：首轮 20—30 人测试的过程数据（对齐 11_real_child_data_protocol） */
/* ===================================================================== */
const RESEARCH_KEY = "ai-exp-research-v1";
function researchStore() { try { return JSON.parse(localStorage.getItem(RESEARCH_KEY)) || []; } catch (_) { return []; } }
function saveResearchStore(arr) { localStorage.setItem(RESEARCH_KEY, JSON.stringify(arr)); }

const TAG_LABEL = { effective: "引出内容", partial: "一般", silent: "沉默/困惑", option_dependent: "依赖选项" };

function renderTeacher() {
  const wrap = document.getElementById("tab-teacher");
  const store = researchStore();
  if (!S) {
    wrap.innerHTML = `<div class="card"><div class="eyebrow">教师后台</div>
      <p class="muted">还没有进行中的会话。去「课程」开始一次表达后，这里会记录每一句追问的效果。</p></div>
      ${aggregateCard(store)}`;
    wireAggregate(store);
    footer.innerHTML = "";
    return;
  }
  const turns = S.research.turns;
  const tagged = turns.filter(t => t.teacher_tag).length;

  wrap.innerHTML = `
    <div class="card">
      <div class="eyebrow">教师后台 · 本次会话</div>
      <h2>👩‍🏫 首轮测试观察</h2>
      <p class="goal">用于人工验证 AI 的教学动作是否正确（不自动用于模型微调）。样本号 <b>${S.sampleId}</b> · ${S.grade}年级 · ${escapeHtml(taskById(S.taskId)?.title || "")}</p>

      <label class="toggle-row"><input type="checkbox" id="obsToggle" ${S.observe ? "checked" : ""}/>
        <span><b>观察模式</b>：开启后，回到「课程」每答完一句，可给那句追问打效果标签（孩子端看不到）。</span></label>

      <div class="field-label" style="margin-top:12px">逐句追问记录（${tagged}/${turns.length} 已标记）</div>
      ${turns.length ? turns.map((t, i) => `
        <div class="rt-item">
          <div class="rt-head">
            <span class="rt-stage">${STAGES.find(s => s.id === t.stage)?.name || t.stage}</span>
            ${t.strategy_id ? `<span class="rt-sid">${t.strategy_id}</span>` : (t.source === "ai" ? `<span class="rt-sid">AI生成</span>` : `<span class="rt-sid ghost">开场</span>`)}
            ${t.diagnosis_code ? `<span class="rt-diag">${t.diagnosis_code} ${difficulty(t.diagnosis_code)?.name || ""}</span>` : ""}
            <span class="rt-auto">${({drew_content:"自动:引出",silent_or_short:"自动:偏短",partial:"自动:部分"})[t.auto_outcome]}</span>
          </div>
          <div class="rt-q">问：${escapeHtml(t.question)}</div>
          <div class="rt-a">答：${escapeHtml(t.answer_redacted)}（${t.answer_len}字）</div>
          <div class="chips rt-tags" data-i="${i}" data-kind="tag">
            ${Object.entries(TAG_LABEL).map(([v, l]) => `<button class="chip ghost small ${t.teacher_tag === v ? "selected" : ""}" data-v="${v}">${l}</button>`).join("")}
            <span class="rt-sep">诊断</span>
            <button class="chip ghost small ${t.diagnosis_ok === true ? "selected" : ""}" data-kind="diag" data-i="${i}" data-v="true">准</button>
            <button class="chip ghost small ${t.diagnosis_ok === false ? "selected" : ""}" data-kind="diag" data-i="${i}" data-v="false">不准</button>
          </div>
        </div>`).join("") : '<p class="muted small">还没有追问记录。回到课程，让孩子回答几句。</p>'}
    </div>

    <div class="card">
      <div class="eyebrow">把这次会话存入研究库</div>
      <p class="small">将生成一条去标识化记录（对齐 11_real_child_data_protocol 的 record_schema）。
        <strong>不会保存</strong>姓名、学校、住址、电话等可识别信息。</p>
      <label class="toggle-row"><input type="checkbox" id="consentChk" ${S.consent ? "checked" : ""}/>
        <span>已获得<strong>监护人书面/可追溯知情同意</strong>，且已用孩子能懂的语言说明在记录什么、可随时停止。</span></label>
      <div class="opt-row" style="margin-top:8px">
        <label class="small">保留授权
          <select id="retentionSel"><option value="yes">同意保留</option><option value="no">不保留</option></select></label>
        <label class="small">删除期限 <input type="text" id="delDeadline" placeholder="如 2026-12-31" style="width:130px"/></label>
      </div>
      <textarea id="teacherNotes" rows="2" placeholder="教师备注（可选）：真正卡点、为什么此刻这样问、系统最易误判处……" style="margin-top:8px"></textarea>
      <div class="actions">
        <button class="btn small" id="saveRecord">存入研究库</button>
        <button class="btn ghost small" id="exportOne">导出本次 JSON</button>
      </div>
    </div>

    ${aggregateCard(store)}
  `;

  document.getElementById("obsToggle").onclick = e => { S.observe = e.target.checked; save(); render(); };
  wrap.querySelectorAll(".rt-tags .chip").forEach(b => b.onclick = () => {
    const t = S.research.turns[+b.dataset.i];
    if (b.dataset.kind === "diag") t.diagnosis_ok = b.dataset.v === "true";
    else t.teacher_tag = b.dataset.v;
    save(); renderTeacher();
  });
  document.getElementById("consentChk").onclick = e => { S.consent = e.target.checked; save(); };
  document.getElementById("saveRecord").onclick = saveCurrentRecord;
  document.getElementById("exportOne").onclick = () => downloadJson(buildRecord(), `${S.sampleId}.json`);
  wireAggregate(store);

  footer.innerHTML = "";
}

function wireAggregate(store) {
  const all = document.getElementById("exportAll");
  if (all) all.onclick = () => downloadJson(researchStore(), "ai-expression-research.json");
  const csv = document.getElementById("exportCsv");
  if (csv) csv.onclick = () => {
    const blob = new Blob(["﻿" + toCsv(researchStore())], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "ai-expression-research.csv"; a.click();
  };
  const clr = document.getElementById("clearStore");
  if (clr) clr.onclick = () => { if (confirm("确定清空整个研究库？此操作不可恢复。")) { saveResearchStore([]); renderTeacher(); } };
}

function buildRecord() {
  const t = S.research.turns;
  return {
    sample_id: S.sampleId,
    grade: S.grade,
    task_id: S.taskId,
    oral_transcript_redacted: t.map(x => x.answer_redacted).join(" / "),
    first_draft_redacted: redact(S.draftBody),
    teacher_question_ids: t.map(x => x.strategy_id).filter(Boolean),
    student_answers_redacted: t.map(x => x.answer_redacted),
    diagnosis_before: [...new Set(t.map(x => x.diagnosis_code).filter(Boolean))],
    revised_draft_redacted: redact(S.draftBody),
    child_revision_explanation: S.revisionLog.map(r => `[${r.dimName}] ${r.why}`).join("；"),
    teacher_judgment: {
      effective_strategy_ids: t.filter(x => x.teacher_tag === "effective" && x.strategy_id).map(x => x.strategy_id),
      ineffective_strategy_ids: t.filter(x => (x.teacher_tag === "silent" || x.teacher_tag === "option_dependent") && x.strategy_id).map(x => x.strategy_id),
      ready_to_advance: Object.values(S.research.approvals).every(Boolean) && Object.keys(S.research.approvals).length > 0,
      notes: redact((document.getElementById("teacherNotes") || {}).value || ""),
      diagnosis_accuracy: t.filter(x => x.diagnosis_ok !== null).length
        ? t.filter(x => x.diagnosis_ok === true).length / t.filter(x => x.diagnosis_ok !== null).length : null,
    },
    rubric_before: S.growthBefore,
    rubric_after: S.growth,
    retention_permission: (document.getElementById("retentionSel") || {}).value || "yes",
    deletion_deadline: (document.getElementById("delDeadline") || {}).value || "",
    saved_at: new Date().toISOString().slice(0, 10),
  };
}

function saveCurrentRecord() {
  if (!S.consent) { alert("请先勾选「已获得监护人知情同意」。无授权数据不得存储。"); return; }
  const rec = buildRecord();
  const store = researchStore();
  const idx = store.findIndex(r => r.sample_id === rec.sample_id);
  if (idx >= 0) store[idx] = rec; else store.push(rec);
  saveResearchStore(store);
  alert(`已存入研究库（${rec.sample_id}）。共 ${store.length} 条记录。`);
  renderTeacher();
}

function aggregateCard(store) {
  if (!store.length) return `<div class="card"><div class="eyebrow">研究库汇总</div>
    <p class="muted small">还没有已保存的记录。完成并保存几次会话后，这里会汇总哪句追问最能引出内容、哪句最容易让孩子沉默。</p></div>`;

  // 跨会话聚合（需要逐句标签：从已保存记录的 effective/ineffective 列表统计）
  const eff = {}, inf = {};
  store.forEach(r => {
    (r.teacher_judgment.effective_strategy_ids || []).forEach(s => eff[s] = (eff[s] || 0) + 1);
    (r.teacher_judgment.ineffective_strategy_ids || []).forEach(s => inf[s] = (inf[s] || 0) + 1);
  });
  const topEff = Object.entries(eff).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const topInf = Object.entries(inf).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const accs = store.map(r => r.teacher_judgment.diagnosis_accuracy).filter(x => x != null);
  const avgAcc = accs.length ? Math.round(accs.reduce((a, b) => a + b, 0) / accs.length * 100) : null;
  const byGrade = {};
  store.forEach(r => byGrade[r.grade] = (byGrade[r.grade] || 0) + 1);

  const stratLine = (sid) => { const s = KB.strategies.strategies.find(x => x.strategy_id === sid); return s ? escapeHtml(s.prompt) : ""; };

  return `<div class="card">
    <div class="eyebrow">研究库汇总 · 共 ${store.length} 条</div>
    <h2>📊 哪句追问真正有用</h2>
    <p class="small muted">样本分布：${Object.entries(byGrade).map(([g, n]) => `${g}年级 ${n}人`).join(" · ")}${avgAcc != null ? ` ｜ 诊断平均准确率 ${avgAcc}%` : ""}</p>

    <div class="field-label">✅ 最能引出内容的追问</div>
    ${topEff.length ? topEff.map(([s, n]) => `<div class="agg-row"><span class="agg-sid">${s}</span><span class="agg-n">${n}次</span><span class="agg-q">${stratLine(s)}</span></div>`).join("") : '<p class="muted small">还没有被标为「引出内容」的追问。</p>'}

    <div class="field-label" style="margin-top:12px">🤐 最容易让孩子沉默/依赖选项的追问</div>
    ${topInf.length ? topInf.map(([s, n]) => `<div class="agg-row warn"><span class="agg-sid">${s}</span><span class="agg-n">${n}次</span><span class="agg-q">${stratLine(s)}</span></div>`).join("") : '<p class="muted small">暂无。</p>'}

    <div class="actions">
      <button class="btn ghost small" id="exportAll">导出全部 JSON</button>
      <button class="btn ghost small" id="exportCsv">导出 CSV</button>
      <button class="btn ghost small" id="clearStore">清空研究库</button>
    </div>
  </div>`;
}

function downloadJson(obj, name) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json;charset=utf-8" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; a.click();
}
function toCsv(store) {
  const head = ["sample_id", "grade", "task_id", "teacher_question_ids", "diagnosis_before", "effective", "ineffective", "ready_to_advance", "diagnosis_accuracy", "retention_permission", "deletion_deadline"];
  const rows = store.map(r => [r.sample_id, r.grade, r.task_id,
    (r.teacher_question_ids || []).join("|"), (r.diagnosis_before || []).join("|"),
    (r.teacher_judgment.effective_strategy_ids || []).join("|"),
    (r.teacher_judgment.ineffective_strategy_ids || []).join("|"),
    r.teacher_judgment.ready_to_advance, r.teacher_judgment.diagnosis_accuracy ?? "",
    r.retention_permission, r.deletion_deadline].map(x => `"${String(x).replace(/"/g, '""')}"`).join(","));
  return [head.join(","), ...rows].join("\n");
}

/* ---------- 工具 ---------- */
function escapeHtml(s) { return (s || "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
function escapeAttr(s) { return escapeHtml(s).replace(/"/g, "&quot;"); }

/* ---------- 启动 ---------- */
document.getElementById("tabbar").addEventListener("click", e => {
  const b = e.target.closest(".tab"); if (!b) return; activeTab = b.dataset.tab; render();
});
loadCfg();
load();
render();
initProxy().then(() => render());   // 探测后端代理后重渲染，反映「已通过后端代理连接」
