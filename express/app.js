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
const SAVE_KEY = "ai-exp-course-v1";
const CFG_KEY = "ai-exp-settings";

/* ===================================================================== */
/* 真实模型设置（浏览器直连 Claude API；离线时自动回退到规则引擎）          */
/* ===================================================================== */
let CFG = { aiMode: false, apiKey: "", model: "", checker: true };
let PROXY = { available: false, hasKey: false, provider: "", models: [], defaultModel: "" };
/* 代理地址：本地 serve.py 留空（同源）；公开站在 config.js 里填 Cloudflare Worker 地址 */
const API_BASE = (typeof window !== "undefined" && window.AI_PROXY_URL) ? String(window.AI_PROXY_URL).replace(/\/$/, "") : "";
function loadCfg() { try { Object.assign(CFG, JSON.parse(localStorage.getItem(CFG_KEY)) || {}); } catch (_) {} }
function saveCfg() { localStorage.setItem(CFG_KEY, JSON.stringify(CFG)); }
function proxyReady() { return PROXY.available && PROXY.hasKey; }
function aiEnabled() { return !!(CFG.aiMode && (CFG.apiKey || proxyReady())); }
/* 当前要发给后端的模型 id：代理可用时用代理给的模型清单 */
function activeModel() {
  if (PROXY.models.length) {
    return PROXY.models.some(m => m.id === CFG.model) ? CFG.model : PROXY.defaultModel;
  }
  return CFG.model || "claude-opus-4-8";
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

/* ---------- 九阶段（与 controller 对齐） ---------- */
const STAGES = [
  { id: "diagnose",   name: "找到要写的事", icon: "🔍", kind: "qa",
    candidates: ["D01", "D02"], primary: "D01" },
  { id: "input",      name: "补充素材",     icon: "🧺", kind: "input" },
  { id: "recall",     name: "唤起回忆",     icon: "💭", kind: "qa",
    candidates: ["D02", "D01"], primary: "D01" },
  { id: "detail",     name: "放大细节",     icon: "🔬", kind: "qa",
    candidates: ["D04", "D05", "D09", "D03"], primary: "D04" },
  { id: "structure",  name: "理清顺序",     icon: "🧭", kind: "qa",
    candidates: ["D06", "D03"], primary: "D06" },
  { id: "point",      name: "确认中心",     icon: "🎯", kind: "qa",
    candidates: ["D13", "D11", "D05"], primary: "D13" },
  { id: "draft",      name: "写下初稿",     icon: "✏️", kind: "draft" },
  { id: "revision",   name: "修改打磨",     icon: "🔧", kind: "revision" },
  { id: "reflection", name: "回看成长",     icon: "🌱", kind: "reflection" },
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
const ENTRY_SCAFFOLDS = ["今天上学路上", "今天的课间", "放学回到家", "吃饭的时候", "睡觉前", "和同学之间"];
const DETAIL_ANGLES = ["当时手在做什么", "身体有什么反应", "脑子里冒出什么念头", "你说了或听到了哪句话"];

/* ===================================================================== */
/* 真实模型调用（使用知识库 12_ai_prompt_templates 的两段系统提示）         */
/* ===================================================================== */
function fillTemplate(tpl, vars) {
  let t = (tpl || "").replace(/\\n/g, "\n");                 // 还原模板里的换行
  for (const k in vars) t = t.replaceAll(`{{${k}}}`, vars[k] == null ? "" : String(vars[k]));
  return t;
}

/* 调 Claude Messages API：优先走 serve.py 后端代理（密钥在服务器），
   否则浏览器直连（用本机填的 key）。两条路都要求返回结构化 JSON。 */
async function callClaudeJSON(systemText, userText, schema, maxTokens = 400) {
  const useProxy = proxyReady();
  const url = useProxy ? (API_BASE + "/api/claude") : "https://api.anthropic.com/v1/messages";
  const headers = useProxy
    ? { "content-type": "application/json" }
    : {
        "content-type": "application/json",
        "x-api-key": CFG.apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      };
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: activeModel(),
      max_tokens: maxTokens,
      output_config: { effort: "low", format: { type: "json_schema", schema } },
      system: systemText,
      messages: [{ role: "user", content: userText }],
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${detail.slice(0, 200)}`);
  }
  const data = await res.json();
  const text = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("");
  return JSON.parse(text);
}

const TEACH_SCHEMA = {
  type: "object", additionalProperties: false,
  properties: {
    stage: { type: "string" },
    action: { type: "string" },
    diagnosis_code: { type: ["string", "null"] },
    message_to_child: { type: "string" },
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
  }) + `\n\n候选卡点（只能从中选一个或返回null）：${JSON.stringify(candDiff)}\n本阶段单轮汉字上限：${cs.output_limit}。`;

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
  if (!S) { badges.innerHTML = ""; return; }
  const task = taskById(S.taskId);
  const prof = KB.profiles.profiles.find(p => p.profile_id === S.profileId);
  badges.innerHTML = `<span class="badge">${S.grade}年级</span>
    <span class="badge accent">${task ? task.title : "—"}</span>
    <span class="badge">${prof ? prof.name : ""}</span>`;
}

/* ---------- 课程主流程 ---------- */
function renderCourse() {
  if (!S) { renderSetup(); rail.innerHTML = ""; footer.innerHTML = ""; return; }
  renderRail();
  const stage = STAGES[S.stageIndex];
  ({ qa: renderQA, input: renderInput, draft: renderDraft,
     revision: renderRevision, reflection: renderReflection }[stage.kind])(stage);
}

function renderRail() {
  rail.innerHTML = STAGES.map((s, i) => {
    const cls = i < S.stageIndex ? "done" : i === S.stageIndex ? "active" : "";
    return `<span class="stage-pill ${cls}">${s.icon} ${s.name}</span>`;
  }).join("");
}

function footerNav({ canBack = true, canNext = true, nextLabel = "我说完了，下一步 →", nextEnabled = true, onNext, extra = "" } = {}) {
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
      return `我们这次想写《${task.title}》——${task.task_brief}。${st ? st.prompt : "最近有没有哪一分钟和平常不一样？"}`;
    }
    case "recall":
      return "你刚才说的那件事，把它当成一段小录像。最开始的那一秒，画面里有谁、在哪里？";
    case "detail":
      return "现在我们放大其中最重要的一个瞬间。那一刻，你做了什么动作？";
    case "structure":
      return "把这件事分成三站：开始 → 中间发生变化 → 结果。先说说『开始』那一站发生了什么？";
    case "point":
      return "如果只能让别人记住一句话，你最想让他们记住的是什么？";
    default:
      return cs ? cs.goal : "我们继续。";
  }
}

function renderQA(stage) {
  const d = stageData(stage.id);
  const cs = controllerStage(stage.id);
  if (!d.currentQ) d.currentQ = openerFor(stage);

  const showScaffold = (stage.id === "diagnose" || stage.id === "recall") && d.shortStreak >= 2 && S.grade <= 4;
  const showAngles = d.code === "D04";

  host.innerHTML = `
    <div class="card">
      <div class="eyebrow">第 ${S.stageIndex + 1} / 9 步 · ${stage.name}</div>
      <h2>${stage.icon} ${stage.name}</h2>
      <p class="goal">这一步的目标：${cs.goal}（AI 只问，不替你写）</p>

      ${d.turns.map(t => `
        <div class="coach"><div class="avatar">🦉</div><div class="bubble">${escapeHtml(t.q)}</div></div>
        <div style="text-align:right;margin:-8px 0 14px;">
          <span style="display:inline-block;background:var(--accent-soft);color:#b5611f;padding:8px 14px;border-radius:16px 4px 16px 16px;font-size:.95rem;max-width:80%;">${escapeHtml(t.a)}</span>
        </div>`).join("")}

      <div class="coach ${d.refuse ? "refuse" : ""}">
        <div class="avatar">🦉</div>
        <div class="bubble">${escapeHtml(d.currentQ)}
          ${d.code ? `<span class="why">（我在帮你：${difficulty(d.code).teaching_goal}）</span>` : ""}
        </div>
      </div>

      ${showScaffold ? `<div class="chips" id="scaffold">
          <span class="small muted" style="width:100%">不知道从哪说起？先选一个时间点：</span>
          ${ENTRY_SCAFFOLDS.map(c => `<button class="chip ghost" data-fill="在${c}，">${c}</button>`).join("")}
        </div>` : ""}
      ${showAngles ? `<div class="chips" id="angles">
          <span class="small muted" style="width:100%">可以从这里说起（任选其一）：</span>
          ${DETAIL_ANGLES.map(c => `<button class="chip ghost" data-fill="">${c}</button>`).join("")}
        </div>` : ""}

      <div class="answer-box">${answerWidget("qaInput")}</div>
      <div class="actions">
        <button class="btn accent small" id="qaSend" ${d.thinking ? "disabled" : ""}>${d.thinking ? "AI 正在想一个问题…" : "说给 AI 听"}</button>
        ${d.pool.length > 1 && !d.thinking ? `<button class="btn ghost small" id="qaSwitch">换种问法</button>` : ""}
        ${aiEnabled() ? '<span class="badge accent" style="align-self:center">🟢 真实AI</span>' : ""}
      </div>
      ${d.guard ? `<div class="guard-banner">${d.guard}</div>` : ""}
    </div>
    ${teacherStripHtml(stage)}
    ${evidenceBoard()}
  `;

  wireAnswerWidget("qaInput");
  bindEvidenceBoard();
  host.querySelectorAll("#scaffold .chip, #angles .chip").forEach(btn => {
    btn.onclick = () => { const ta = document.getElementById("qaInput"); ta.value = btn.dataset.fill + (btn.dataset.fill ? "" : btn.textContent + "："); ta.focus(); };
  });
  document.getElementById("qaSend").onclick = () => (aiEnabled() ? submitQAAI(stage) : submitQA(stage));
  const sw = document.getElementById("qaSwitch");
  if (sw) sw.onclick = () => { d.poolIdx = (d.poolIdx + 1) % d.pool.length; d.currentQ = d.pool[d.poolIdx].prompt; d.curStratId = d.pool[d.poolIdx].strategy_id; d.refuse = false; save(); renderQA(stage); };

  if (S.observe) wireTeacherStrip();

  footerNav({
    nextEnabled: d.turns.length > 0,
    nextLabel: S.observe ? "教师同意，进入下一阶段 →" : (d.satisfied ? "做得好，下一步 →" : "我说完了，下一步 →"),
    onNext: () => { if (S.observe) S.research.approvals[stage.id] = true; grantQAGrowth(stage, d); advance(); },
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
  if (!ans) { d.guard = "先随便说一句也行，哪怕只有几个字。"; save(); renderQA(stage); return; }

  d.turns.push({ q: d.currentQ, a: ans });
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
    d.currentQ = d.pool.length ? d.pool[0].prompt : difficulty(dg.code).recommended_strategy;
    d.satisfied = false;
  } else {
    d.code = null; d.pool = []; d.curDiag = null; d.curStratId = null;
    d.satisfied = true; d.currentQ = pickAffirm(stage, ans);
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
  if (!ans) { d.guard = "先随便说一句也行，哪怕只有几个字。"; save(); renderQA(stage); return; }

  d.turns.push({ q: d.currentQ, a: ans });
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
    d.currentQ = d.pool.length ? d.pool[0].prompt : difficulty(dg.code).recommended_strategy;
    d.satisfied = false;
  } else {
    // 这一轮表达已足够具体
    d.code = null; d.pool = []; d.satisfied = true;
    d.curDiag = null; d.curStratId = null;
    d.currentQ = pickAffirm(stage, ans);
  }
  // 三轮兜底：不无限追问
  if (d.turns.length >= 3) d.satisfied = true;
  save(); renderQA(stage);
}

function pickAffirm(stage, ans) {
  const map = {
    diagnose: "好，这件事可以写！我已经把它记在『AI 听到了什么』里。点下一步，我们去补点素材。",
    recall: "画面有了。继续——点下一步，我们去放大最重要的瞬间。",
    detail: "这个细节很具体，别人能看见。点下一步，我们把顺序理一理。",
    structure: "三站清楚了。点下一步，我们确认你最想表达的中心。",
    point: "你的中心很清楚。点下一步，开始写你自己的初稿。",
  };
  return map[stage.id] || "很好，点下一步继续。";
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
      <div class="eyebrow">第 2 / 9 步 · 补充素材</div>
      <h2>${stage.icon} 补充素材</h2>
      <p class="goal">目标：${cs.goal}。先看一段示范，再做一个小观察，把新发现说给 AI。</p>

      <div class="material">
        <div class="mtitle">📖 看别人怎么写细节（示范，不用背）</div>
        <div class="mtext">${escapeHtml(m.text)}</div>
        <div class="mq">想一想：${escapeHtml(m.teaching_question)}</div>
      </div>

      <div class="material">
        <div class="mtitle">🔭 观察任务：${escapeHtml(o.title)}</div>
        <div class="mtext">${escapeHtml(o.instruction)}</div>
        <div class="mq">回来后告诉我：${o.return_fields.map(escapeHtml).join(" / ")}</div>
        <div class="small muted" style="margin-top:6px">隐私：${escapeHtml(o.privacy_rule)}</div>
      </div>

      <div class="answer-box">
        <div class="field-label">你的观察发现：</div>
        ${answerWidget("inInput")}
      </div>
      <div class="actions"><button class="btn accent small" id="inSave">记下我的发现</button></div>
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
  footerNav({ nextLabel: "素材够了，下一步 →", onNext: () => advance() });
}

/* ===================================================================== */
/* 阶段：写下初稿（draft）—— 孩子自己写，AI 只给句子开头/提醒                */
/* ===================================================================== */
function renderDraft(stage) {
  const cs = controllerStage("draft");
  const task = taskById(S.taskId);
  if (!S.draftTitle) S.draftTitle = task ? task.title : "我的表达";
  const starters = strategiesFor("D10", S.grade).slice(0, 4);

  host.innerHTML = `
    <div class="card">
      <div class="eyebrow">第 7 / 9 步 · 写下初稿</div>
      <h2>${stage.icon} 写下你自己的初稿</h2>
      <p class="goal">目标：${cs.goal}。这里没有「一键生成」按钮——文字必须是你写的。卡住时，看看下面的句子开头。</p>

      ${evidenceMini()}

      <div class="draft-meta"><input type="text" id="dTitle" value="${escapeAttr(S.draftTitle)}" placeholder="给作品起个题目" /></div>
      <textarea id="dBody" rows="12" placeholder="从最想说的那一句开始写……">${escapeHtml(S.draftBody)}</textarea>
      <div class="wordcount" id="wc"></div>

      <div class="field-label">✏️ 卡住了？挑一个句子开头（点了会填进去）：</div>
      <div class="starter-list" id="starters">
        ${starters.map(s => `<button class="starter" data-s="${escapeAttr(s.prompt)}">${escapeHtml(s.prompt)}</button>`).join("")}
        <button class="starter" data-s="那一刻，">那一刻，……</button>
        <button class="starter" data-s="我记得，">我记得，……</button>
      </div>
      <div class="guard-banner" id="dGuard" style="display:none"></div>
    </div>
  `;
  const body = document.getElementById("dBody");
  const title = document.getElementById("dTitle");
  const wc = document.getElementById("wc");
  const updateWc = () => wc.textContent = `${len(body.value)} 字 · 自动保存中`;
  updateWc();
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
    nextLabel: "初稿写好了，去修改 →",
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
      <div class="eyebrow">第 8 / 9 步 · 修改打磨</div>
      <h2>${stage.icon} 一次只改一个地方</h2>
      <p class="goal">目标：${cs.goal}。AI 帮你找问题、做示范，但改写由你来，并说出你为什么这么改。</p>

      <div class="field-label">这一轮我们改：（AI 推荐 <b>${dimObj.name}</b>，你也可以换）</div>
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
    nextLabel: "改得差不多了，回看成长 →",
    onNext: () => advance(),
  });
}

/* ===================================================================== */
/* 阶段：回看成长（reflection）                                            */
/* ===================================================================== */
function renderReflection(stage) {
  const d = stageData("reflection");
  const cs = controllerStage("reflection");
  const qs = [
    "整篇里，你自己最喜欢哪一句？为什么？",
    "这次你自己改了哪个地方，让它变得更好？",
  ];
  if (!d.idx) d.idx = 0;

  host.innerHTML = `
    <div class="card">
      <div class="eyebrow">第 9 / 9 步 · 回看成长</div>
      <h2>${stage.icon} 你自己说说这次的创作</h2>
      <p class="goal">目标：${cs.goal}。说出你的决定，比作文分数更重要。</p>

      ${S.reflection.map(r => `<div class="coach"><div class="avatar">🦉</div><div class="bubble">${escapeHtml(r.q)}</div></div>
        <div style="text-align:right;margin:-8px 0 14px;"><span style="display:inline-block;background:var(--accent-soft);color:#b5611f;padding:8px 14px;border-radius:16px 4px 16px 16px;max-width:80%;">${escapeHtml(r.a)}</span></div>`).join("")}

      ${d.idx < qs.length ? `
        <div class="coach"><div class="avatar">🦉</div><div class="bubble">${qs[d.idx]}</div></div>
        ${answerWidget("refIn")}
        <div class="actions"><button class="btn accent small" id="refSend">说给 AI 听</button></div>
      ` : `<div class="parent-note">🎉 你完成了一篇完全属于自己的表达。去『我的作品』看看，或在『家长报告』里看你这次的成长。</div>`}
    </div>
    ${growthPanel(false)}
  `;
  if (d.idx < qs.length) {
    wireAnswerWidget("refIn");
    document.getElementById("refSend").onclick = () => {
      const v = val("refIn"); if (!v) return;
      S.reflection.push({ q: qs[d.idx], a: v });
      d.idx++; bump("point", Math.max(3, S.growth.point)); bump("revision", Math.max(3, S.growth.revision));
      save(); renderReflection(stage);
    };
  }
  footerNav({
    canNext: d.idx >= qs.length,
    nextLabel: "看我的作品 →",
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
    <h3>👂 AI 听到了什么</h3>
    <p class="note">这里只放<strong>你自己说过的话</strong>。AI 不会偷偷加内容。提炼错了，点 × 删掉。</p>
    <div id="eviList">${S.evidence.length
      ? S.evidence.map((e, i) => `<div class="evi-item"><span class="tag">${escapeHtml(e.tag)}</span><span class="txt">${escapeHtml(e.text)}</span><button class="del" data-i="${i}">×</button></div>`).join("")
      : '<div class="evi-empty">你说的话会出现在这里。</div>'}</div>
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
      <button class="mode-btn active" data-mode="text">⌨️ 打字</button>
      <button class="mode-btn" data-mode="voice">🎤 说话</button>
    </div>
    <textarea id="${id}" rows="${rows}" placeholder="打字，或点上面的「说话」用语音输入"></textarea>
    <div class="mic-row hidden" id="${id}-mic">
      <button class="mic-btn" id="${id}-micbtn">🎤 按住说 / 点一下开始</button>
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
    rec = new SR(); rec.lang = "zh-CN"; rec.interimResults = true; rec.continuous = true;
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
  { type: "real_experience", label: "写真事" },
  { type: "people_relationships", label: "写人" },
  { type: "observation_discovery", label: "观察发现" },
  { type: "imagination", label: "想象故事" },
  { type: "knowledge_explanation", label: "讲明白一件事" },
  { type: "opinion", label: "说观点" },
];
let setupSel = { grade: 4, type: "real_experience", taskId: null, profileId: "P01" };

function renderSetup() {
  const profileQ = KB.profiles.profiles;
  const tasks = KB.tasks.tasks.filter(t => t.type === setupSel.type && t.suitable_grades.includes(setupSel.grade));
  if (!tasks.find(t => t.task_id === setupSel.taskId)) setupSel.taskId = tasks[0] && tasks[0].task_id;

  host.innerHTML = `
    <div class="card">
      <div class="eyebrow">开始一次表达</div>
      <h2>把你脑子里的东西，说出来 ✦</h2>
      <p class="goal">这门课的 AI 是你的<strong>陪练</strong>：它会一个一个地问你，帮你把想说的说清楚——但每一个字都得是你写的。</p>

      <div class="field-label">① 你上几年级？</div>
      <div class="opt-row">${[3, 4, 5, 6].map(g => `<button class="chip ${setupSel.grade === g ? "selected" : ""}" data-grade="${g}">${g}年级</button>`).join("")}</div>

      <div class="field-label" style="margin-top:14px">② 这次想写哪一类？</div>
      <div class="opt-row">${TASK_TYPES.map(t => `<button class="chip ${setupSel.type === t.type ? "selected" : ""}" data-type="${t.type}">${t.label}</button>`).join("")}</div>

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
        ${PROXY.available ? `<div class="guard-banner" style="margin-top:8px">检测到后端（厂商：${escapeHtml(PROXY.provider || "?")}），但服务器未配置密钥。更安全的用法：停止服务后运行 <code>export DASHSCOPE_API_KEY=sk-...</code> 再 <code>python3 serve.py</code>，密钥就不进浏览器了。</div>` : ""}
        <div class="opt-row" style="margin-top:8px">
          <input type="password" id="aiKey" placeholder="临时填 Claude Key（sk-ant-...，仅本机直连）" value="${escapeAttr(CFG.apiKey)}" style="flex:1;min-width:200px"/>
          <select id="aiModel">
            <option value="claude-opus-4-8" ${CFG.model === "claude-opus-4-8" ? "selected" : ""}>Opus 4.8（最强）</option>
            <option value="claude-sonnet-4-6" ${CFG.model === "claude-sonnet-4-6" ? "selected" : ""}>Sonnet 4.6（快/省）</option>
            <option value="claude-haiku-4-5" ${CFG.model === "claude-haiku-4-5" ? "selected" : ""}>Haiku 4.5（最快）</option>
          </select>
        </div>
        <div class="guard-banner" style="margin-top:8px">⚠️ 直连模式仅支持 Claude 且密钥存在本机浏览器，仅供本地试用。<strong>推荐用后端代理接通义千问</strong>：<code>export DASHSCOPE_API_KEY=sk-... && python3 serve.py</code>。</div>
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
