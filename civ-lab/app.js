// AI世界文明实验室 · 应用逻辑

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];

// ── 应用状态 ──────────────────────────────────────
let state = {
  activeLessonId: "L01",
  activeRegionId: null,
  drawingTool: "pencil",
  drawingColor: "#d4a853",
  brushSize: 4,
  isDrawing: false,
  lastX: 0,
  lastY: 0,
  stampMode: null,
  speechRate: 0.95,
  apiKey: "",
};

function getLesson() {
  return LESSONS_DATA[state.activeLessonId];
}

// ── 初始化 ────────────────────────────────────────
function init() {
  loadSettings();
  renderTimeline();
  switchLesson("L01");
  bindTabBar();
  bindSearch();
  bindVoice();
  bindSettings();
  initDrawingCanvas();
  renderHistoryStats();
  logHistory("app_open", "打开了AI世界文明实验室");
}

// ── 时间轴（侧边栏）─────────────────────────────
function renderTimeline() {
  const saved = getSavedProgress();
  $("#timeline").innerHTML = TIMELINE.map((item) => {
    const done = saved.completed.includes(item.id);
    const active = item.id === state.activeLessonId;
    const locked = item.status === "locked" && !done && !LESSONS_DATA[item.id];
    return `
      <button class="timeline-item ${active ? "active" : ""} ${done ? "done" : ""} ${locked ? "locked" : ""}"
        data-id="${item.id}" ${locked ? "disabled" : ""}>
        <span class="tl-time">${item.time}</span>
        <strong class="tl-title">${item.title}</strong>
        ${done ? '<span class="tl-check">✓</span>' : ""}
      </button>`;
  }).join("");

  $$(".timeline-item:not([disabled])").forEach((btn) => {
    btn.addEventListener("click", () => switchLesson(btn.dataset.id));
  });
}

function renderPassport() {
  const saved = getSavedProgress();
  const total = TIMELINE.length;
  const earned = saved.completed.length;
  $("#passportCount").textContent = `${earned}/${total}`;
  $("#passport").innerHTML = TIMELINE.map((item) => {
    const done = saved.completed.includes(item.id);
    return `<div class="stamp ${done ? "earned" : ""}"><span>${item.badge}</span></div>`;
  }).join("");
}

// ── 切换课程 ──────────────────────────────────────
function switchLesson(id) {
  if (!LESSONS_DATA[id]) return;
  state.activeLessonId = id;
  state.activeRegionId = null;

  const lesson = getLesson();
  renderTimeline();
  renderLesson(lesson);
  renderMap(lesson);
  renderRegions(lesson);
  renderChain(lesson);
  renderChanges(lesson);
  renderSources(lesson);
  renderTaskForm(lesson);
  updateChatContext(lesson);
  updateChatSuggestions(lesson);

  logHistory("lesson_view", `查看了课程：${lesson.time} · ${lesson.title}`);
}

function renderLesson(lesson) {
  const idx = TIMELINE.findIndex((t) => t.id === lesson.id);
  $("#lessonEyebrow").textContent = `第${idx + 1}课 · ${lesson.time}`;
  $("#lessonTitle").textContent = lesson.title;
  $("#timeAnchor").textContent = lesson.time;
  $("#coreQuestion").textContent = lesson.question;
  $("#worldSnapshot").textContent = lesson.snapshot;
  $("#takeaway").textContent = `核心收获：${lesson.takeaway}`;
  $("#taskTimeChip").textContent = lesson.time;
  $("#chatLessonChip").textContent = `第${idx + 1}课 · ${lesson.time}`;
}

// ── 世界地图 ──────────────────────────────────────
function renderMap(lesson) {
  const map = $("#worldMap");
  $$(".map-point", map).forEach((el) => el.remove());

  lesson.mapPoints.forEach((point, i) => {
    const btn = document.createElement("button");
    btn.className = `map-point ${point.status}`;
    btn.style.left = `${point.x}%`;
    btn.style.top = `${point.y}%`;
    btn.style.animationDelay = `${i * 80}ms`;
    btn.dataset.id = point.id;
    btn.innerHTML = `<span>${point.name}</span>`;
    btn.addEventListener("click", () => showPlace(point));
    map.appendChild(btn);
  });
}

function showPlace(point) {
  const confidenceLabel = { confirmed: "史实确认", cautious: "谨慎表达", provisional: "待考" };
  $("#placeCard").innerHTML = `
    <p class="eyebrow">${point.type} · ${confidenceLabel[point.confidence] || point.confidence}</p>
    <h4>${point.name}</h4>
    <p>${point.child}</p>
    <div class="fact-box">
      <strong>事实底板</strong>
      <span>${point.fact}</span>
    </div>
    <div class="tag-row">${point.keywords.map((k) => `<span class="tag">${k}</span>`).join("")}</div>
    <div class="material-list">
      <strong>可创作素材</strong>
      <p>${point.material.join("、")}</p>
    </div>
    <button class="secondary-button small" onclick="speakText('${esc(point.name)}。${esc(point.child)}')">🔊 朗读</button>
  `;
  $$(".map-point").forEach((el) => el.classList.toggle("selected", el.dataset.id === point.id));
  logHistory("map_click", `点击地图：${point.name}`);
}

// ── 文明同步观察 ──────────────────────────────────
function renderRegions(lesson) {
  if (!lesson.regions || !lesson.regions.length) {
    $("#regionTabs").innerHTML = "";
    $("#regionDetail").innerHTML = "";
    return;
  }
  state.activeRegionId = lesson.regions[0].id;

  $("#regionTabs").innerHTML = lesson.regions.map((r) =>
    `<button class="region-tab ${r.id === state.activeRegionId ? "active" : ""}" data-id="${r.id}">${r.name}</button>`
  ).join("");

  $$(".region-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.activeRegionId = btn.dataset.id;
      $$(".region-tab").forEach((b) => b.classList.toggle("active", b.dataset.id === state.activeRegionId));
      const region = lesson.regions.find((r) => r.id === state.activeRegionId);
      renderRegionDetail(region);
    });
  });

  renderRegionDetail(lesson.regions[0]);
}

function renderRegionDetail(region) {
  $("#regionDetail").innerHTML = `
    <h4>${region.title}</h4>
    <p>${region.summary}</p>
    <div class="detail-columns">
      <div>
        <strong>确认/谨慎事实</strong>
        <ul>${region.facts.map((f) => `<li>${f}</li>`).join("")}</ul>
      </div>
      <div>
        <strong>不能误讲</strong>
        <ul>${region.avoid.map((a) => `<li>${a}</li>`).join("")}</ul>
      </div>
    </div>
    <button class="secondary-button small" onclick="speakText('${esc(region.title)}。${esc(region.summary)}')">🔊 朗读</button>
  `;
}

// ── 因果链 + 概念 ────────────────────────────────
function renderChain(lesson) {
  $("#causalChain").innerHTML = lesson.chain.map((item, i) =>
    `<div class="chain-step"><span class="chain-num">${i + 1}</span><span class="chain-text">${item}</span>${i < lesson.chain.length - 1 ? '<span class="chain-arrow">→</span>' : ""}</div>`
  ).join("");

  $("#conceptList").innerHTML = lesson.concepts.map((c) =>
    `<div class="concept-item">
      <strong>${c.name}</strong>
      <p>${c.text}</p>
    </div>`
  ).join("");
}

// ── 时代变化 ──────────────────────────────────────
function renderChanges(lesson) {
  $("#changeList").innerHTML = lesson.changes.map((ch) =>
    `<div class="change-item">
      <span class="change-time">${ch.time}</span>
      <p class="change-text">${ch.text}</p>
    </div>`
  ).join("");
}

// ── 资料来源 ──────────────────────────────────────
function renderSources(lesson) {
  $("#sourcesList").innerHTML = lesson.sources.map((s) =>
    `<a href="${s.url}" target="_blank" rel="noreferrer" class="source-link">${s.label}</a>`
  ).join("");
}

// ── 搜索 ─────────────────────────────────────────
function bindSearch() {
  $("#searchButton").addEventListener("click", () => runSearch($("#searchInput").value));
  $("#searchInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") runSearch(e.currentTarget.value);
  });
  $("#closeSearch").addEventListener("click", () => {
    $("#searchOverlay").classList.add("hidden");
  });
}

function runSearch(query) {
  const q = query.trim().toLowerCase();
  if (!q) return;

  const rows = [];

  // 搜索知识库
  KNOWLEDGE_BASE.forEach((kb) => {
    if (`${kb.title} ${kb.content} ${kb.keywords.join(" ")}`.toLowerCase().includes(q)) {
      rows.push({ type: kb.category, title: kb.title, text: kb.content.slice(0, 120) + "…", lesson: kb.lesson });
    }
  });

  // 搜索当前课程地图点
  Object.values(LESSONS_DATA).forEach((lesson) => {
    lesson.mapPoints.forEach((pt) => {
      if (`${pt.name} ${pt.child} ${pt.fact} ${pt.keywords.join(" ")}`.toLowerCase().includes(q)) {
        rows.push({ type: "地图地点", title: pt.name, text: pt.child, lesson: lesson.id });
      }
    });
    lesson.concepts.forEach((c) => {
      if (`${c.name} ${c.text}`.toLowerCase().includes(q)) {
        rows.push({ type: "核心概念", title: c.name, text: c.text, lesson: lesson.id });
      }
    });
    lesson.regions.forEach((r) => {
      if (`${r.name} ${r.title} ${r.summary}`.toLowerCase().includes(q)) {
        rows.push({ type: "文明讲解", title: r.title, text: r.summary.slice(0, 100) + "…", lesson: lesson.id });
      }
    });
  });

  // 去重
  const seen = new Set();
  const unique = rows.filter((r) => { const k = r.title; if (seen.has(k)) return false; seen.add(k); return true; });

  const lessonLabel = { L01: "第1课", L02: "第2课", L03: "第3课", L04: "第4课" };

  $("#searchResults").innerHTML = unique.length
    ? unique.map((r) => `
        <div class="result-item">
          <div class="result-meta"><span class="result-type">${r.type}</span>${r.lesson ? `<span class="result-lesson">${lessonLabel[r.lesson] || r.lesson}</span>` : ""}</div>
          <strong>${r.title}</strong>
          <p>${r.text}</p>
        </div>`).join("")
    : `<p class="empty-state">知识库里暂时没有找到"${query}"。试试：尼罗河、苏美尔、甲骨文、青铜、崩溃。</p>`;

  $("#searchOverlay").classList.remove("hidden");
  logHistory("search", `搜索了：${query}`);
}

// ── 语音 ─────────────────────────────────────────
function bindVoice() {
  $("#readButton").addEventListener("click", () => {
    const lesson = getLesson();
    speakText(`${lesson.time}。${lesson.title}。${lesson.question}。${lesson.snapshot}`);
  });
  $("#voiceButton").addEventListener("click", startVoiceInput);
}

function speakText(text) {
  if (!("speechSynthesis" in window)) {
    updateVoiceStatus("当前浏览器不支持朗读功能。");
    return;
  }
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = "zh-CN";
  utt.rate = state.speechRate;
  utt.onend = () => updateVoiceStatus("朗读完成。");
  window.speechSynthesis.speak(utt);
  updateVoiceStatus(`正在朗读：${text.slice(0, 30)}…`);
}

function updateVoiceStatus(msg) {
  $("#voiceStatus").innerHTML = `<p class="eyebrow">语音互动</p><strong>${msg}</strong>`;
}

function startVoiceInput() {
  const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Rec) {
    updateVoiceStatus("当前浏览器不支持语音识别，请用搜索框。");
    return;
  }
  const rec = new Rec();
  rec.lang = "zh-CN";
  rec.interimResults = false;
  updateVoiceStatus("正在聆听…请说「搜索尼罗河」或「朗读两河流域」");
  rec.start();
  rec.onresult = (e) => {
    const text = e.results[0][0].transcript;
    updateVoiceStatus(`识别：${text}`);
    handleVoiceCommand(text);
  };
  rec.onerror = () => updateVoiceStatus("识别失败，请再试一次。");
}

function handleVoiceCommand(text) {
  const t = text.replace(/[，。！？\s]/g, "");
  if (t.includes("朗读")) {
    const lesson = getLesson();
    const region = lesson.regions.find((r) => t.includes(r.name));
    if (region) { speakText(`${region.title}。${region.summary}`); return; }
  }
  const keyword = t.replace(/搜索|查找|朗读/g, "").trim();
  $("#searchInput").value = keyword || t;
  runSearch(keyword || t);
}

function esc(str) {
  return (str || "").replace(/'/g, "").replace(/"/g, "");
}

// ── 标签栏 ────────────────────────────────────────
function bindTabBar() {
  $$(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const id = tab.dataset.tab;
      $$(".tab").forEach((t) => t.classList.remove("active"));
      $$(".tab-content").forEach((c) => c.classList.add("hidden"));
      tab.classList.add("active");
      $(`#tab-${id}`).classList.remove("hidden");
      if (id === "history") renderHistoryTimeline();
    });
  });

  $("#startExplore").addEventListener("click", () => $("#mapSection").scrollIntoView({ behavior: "smooth" }));
  $("#goCreate").addEventListener("click", () => {
    $$(".tab").forEach((t) => t.classList.remove("active"));
    $$(".tab-content").forEach((c) => c.classList.add("hidden"));
    $('[data-tab="create"]').classList.add("active");
    $("#tab-create").classList.remove("hidden");
  });
}

// ── 创作任务表单 ──────────────────────────────────
function renderTaskForm(lesson) {
  const task = lesson.aiTask;
  $("#taskTitle").textContent = task.title;
  $("#taskTimeChip").textContent = lesson.time;

  $("#taskBrief").innerHTML = `
    <p class="task-background">${task.background}</p>
    <div class="task-rules">
      <div><strong>必须包含</strong><ul>${task.mustInclude.map((i) => `<li>${i}</li>`).join("")}</ul></div>
      <div><strong>不能出现</strong><ul>${task.forbidden.map((i) => `<li>${i}</li>`).join("")}</ul></div>
    </div>`;

  $("#taskFields").innerHTML = task.fields.map((field) => {
    if (field.type === "select") {
      return `<label>${field.label}<select name="${field.name}">${field.options.map((o) => `<option>${o}</option>`).join("")}</select></label>`;
    }
    return `<label>${field.label}<input name="${field.name}" placeholder="${field.placeholder}" /></label>`;
  }).join("");

  $("#artifactOutput").innerHTML = `<p class="empty-state">填写表单后，这里会生成你的文明方案。</p>`;

  $("#taskForm").onsubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const html = task.generateArtifact(data);
    $("#artifactOutput").innerHTML = html;
    markLessonComplete(lesson.id);
    renderTimeline();
    renderPassport();
    speakText(`你的${task.title}已经完成，太棒了！`);
    logHistory("task_complete", `完成了创作任务：${task.title}（${lesson.time}）`);
  };

  $("#checkArtifact").onclick = () => {
    const output = $("#artifactOutput").textContent;
    if (!output || output.includes("填写表单")) {
      $("#artifactOutput").innerHTML = "<p class='empty-state'>请先生成方案，再进行历史质检。</p>";
      return;
    }
    const errors = task.commonErrors;
    $("#artifactOutput").insertAdjacentHTML("beforeend", `
      <div class="quality-check">
        <strong>历史质检结果</strong>
        <ul>
          <li>✓ 方案已生成，请对照以下常见错误自查：</li>
          ${errors.map((e) => `<li>⚠ 注意：${e}</li>`).join("")}
          <li>✓ 检查你的方案：历史事实和你的创造是否已分开标注？</li>
        </ul>
      </div>`);
  };
}

function markLessonComplete(id) {
  const saved = getSavedProgress();
  if (!saved.completed.includes(id)) {
    saved.completed.push(id);
    saveProgress(saved);
  }
}

// ── AI对话 ────────────────────────────────────────
function updateChatContext(lesson) {
  const idx = TIMELINE.findIndex((t) => t.id === lesson.id);
  $("#chatLessonChip").textContent = `第${idx + 1}课 · ${lesson.time}`;
}

function updateChatSuggestions(lesson) {
  const suggestions = {
    L01: ["为什么河流对文明那么重要？", "楔形文字是什么？", "神庙有什么用？", "因果链怎么理解？"],
    L02: ["建造金字塔需要多少人？", "苏美尔城邦是怎么运转的？", "为什么要建巨大建筑？", "印度河城市有什么特别？"],
    L03: ["青铜技术怎么改变了战争？", "甲骨文是怎么用的？", "赫梯人有多强？", "为什么商朝那么重要？"],
    L04: ["青铜时代为什么会崩溃？", "哪些文明活下来了？", "贸易断裂怎么影响文明？", "崩溃后出现了什么？"],
  };
  const chips = suggestions[lesson.id] || suggestions.L01;
  $("#chatSuggestions").innerHTML = chips.map((s) =>
    `<button class="suggestion-chip" onclick="sendSuggestion(this)">${s}</button>`
  ).join("");
}

function sendSuggestion(btn) {
  $("#chatInput").value = btn.textContent;
  sendChatMessage();
}

function bindChatEvents() {
  $("#chatSendBtn").addEventListener("click", sendChatMessage);
  $("#chatInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendChatMessage(); }
  });
}

async function sendChatMessage() {
  const input = $("#chatInput").value.trim();
  if (!input) return;

  addChatMessage("user", input);
  $("#chatInput").value = "";
  logHistory("chat", `AI对话：${input}`);

  // 显示"思考中"
  const thinkId = "think-" + Date.now();
  addChatMessage("ai", "<em>正在思考…</em>", thinkId);

  let response;
  if (state.apiKey) {
    response = await callClaudeAPI(input);
  } else {
    response = await getKBResponse(input);
  }

  const thinkEl = document.getElementById(thinkId);
  if (thinkEl) thinkEl.closest(".chat-message").remove();
  addChatMessage("ai", response);
}

function addChatMessage(role, html, id) {
  const div = document.createElement("div");
  div.className = `chat-message ${role}`;
  if (id) div.id = id;
  div.innerHTML = `
    <div class="message-avatar">${role === "ai" ? "AI" : "你"}</div>
    <div class="message-bubble">${typeof html === "string" && html.startsWith("<") ? html : `<p>${html}</p>`}</div>
  `;
  const msgs = $("#chatMessages");
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

async function callClaudeAPI(userMessage) {
  const lesson = getLesson();
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": state.apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 600,
        system: lesson.aiTask.systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      }),
    });
    if (!res.ok) throw new Error(`API错误：${res.status}`);
    const data = await res.json();
    const text = data.content[0].text;
    return text.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br>");
  } catch (e) {
    console.error(e);
    return `<p>API连接失败（${e.message}）。切换回知识库模式回答：</p><p>${await getKBResponse(userMessage)}</p>`;
  }
}

async function getKBResponse(question) {
  const q = question.toLowerCase();
  const lesson = getLesson();

  // 时代错误检测
  const modernTerms = ["汽车", "电灯", "手机", "飞机", "枪", "炸弹", "电脑", "互联网", "火药", "印刷机", "铁路", "蒸汽机"];
  const found = modernTerms.filter((t) => q.includes(t));
  if (found.length > 0) {
    return `<p>⚠️ <strong>时代检查！</strong></p><p>你提到了"${found.join("、")}"，但这些在${lesson.time}前后还没有出现。</p><p>提示：这个时代有${lesson.chain.slice(0, 4).join("、")}，但还没有后来的技术。继续你的创作，把现代词汇换成时代合适的内容吧！</p>`;
  }

  // 搜索知识库
  const kbMatches = KNOWLEDGE_BASE.filter((kb) =>
    `${kb.title} ${kb.content} ${kb.keywords.join(" ")}`.toLowerCase().split(/\s+/).some((w) => q.includes(w) && w.length > 1)
  );
  if (kbMatches.length > 0) {
    const match = kbMatches[0];
    return `<p><strong>${match.title}</strong></p><p>${match.content}</p>${kbMatches.length > 1 ? `<p>相关：${kbMatches.slice(1, 3).map((m) => `<em>${m.title}</em>`).join("、")}。可以继续追问！</p>` : ""}`;
  }

  // 搜索当前课程内容
  for (const concept of lesson.concepts) {
    if (q.includes(concept.name.toLowerCase()) || concept.name.toLowerCase().includes(q.slice(0, 4))) {
      return `<p><strong>${concept.name}</strong></p><p>${concept.text}</p><p>这是${lesson.time}学习的核心概念之一。</p>`;
    }
  }
  for (const region of lesson.regions) {
    if (q.includes(region.name) || region.name.includes(q.slice(0, 2))) {
      return `<p><strong>${region.title}</strong></p><p>${region.summary}</p>`;
    }
  }
  for (const point of lesson.mapPoints) {
    const blob = `${point.name} ${point.keywords.join(" ")}`.toLowerCase();
    if (blob.split(/\s+/).some((w) => q.includes(w) && w.length > 1)) {
      return `<p><strong>${point.name}</strong></p><p>${point.child}</p><p><em>事实底板：</em>${point.fact}</p>`;
    }
  }

  // 因果链问题
  if (q.includes("因果") || q.includes("文明形成") || q.includes("怎么来的")) {
    return `<p><strong>文明形成的因果链：</strong></p><p>${lesson.chain.join(" → ")}</p><p>每一步都为下一步创造条件。${lesson.chain[0]}带来了食物，食物剩余了才有分工，分工出现了才需要城市和管理。</p>`;
  }

  // 通用回答
  return `<p>这是个好问题！在${lesson.time}前后，${lesson.snapshot.slice(0, 80)}…</p><p>你可以试试搜索更具体的词，比如：${lesson.concepts.slice(0, 3).map((c) => `"${c.name}"`).join("、")}。</p>`;
}

function openSettings() {
  $("#settingsModal").classList.remove("hidden");
}

// ── 设置 ─────────────────────────────────────────
function bindSettings() {
  $("#settingsBtn").addEventListener("click", openSettings);
  $("#closeSettings").addEventListener("click", () => $("#settingsModal").classList.add("hidden"));
  $("#saveSettings").addEventListener("click", () => {
    state.apiKey = $("#apiKeyInput").value.trim();
    state.speechRate = parseFloat($("#speechRate").value);
    localStorage.setItem("civ_api_key", state.apiKey);
    localStorage.setItem("civ_speech_rate", state.speechRate);
    if (state.apiKey) {
      $("#apiHint").innerHTML = `<span>✅ 已启用Claude AI对话模式。</span>`;
    }
    $("#settingsModal").classList.add("hidden");
  });
  $("#speechRate").addEventListener("input", (e) => {
    $("#speechRateLabel").textContent = `${e.target.value}×`;
  });
}

function loadSettings() {
  state.apiKey = localStorage.getItem("civ_api_key") || "";
  state.speechRate = parseFloat(localStorage.getItem("civ_speech_rate") || "0.95");
  if (state.apiKey) {
    $("#apiKeyInput").value = state.apiKey;
    $("#apiHint").innerHTML = `<span>✅ 已启用Claude AI对话模式。</span>`;
  }
  $("#speechRate").value = state.speechRate;
  $("#speechRateLabel").textContent = `${state.speechRate}×`;
  bindChatEvents();
}

// ── 绘图画布 ──────────────────────────────────────
function initDrawingCanvas() {
  const canvas = $("#drawingCanvas");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#1e1a14";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 工具选择
  $$(".draw-tool").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$(".draw-tool").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      state.drawingTool = btn.dataset.tool;
      state.stampMode = null;
    });
  });

  // 颜色选择
  $$(".color-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$(".color-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      state.drawingColor = btn.dataset.color;
      state.stampMode = null;
    });
  });

  // 印章
  $$(".stamp-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$(".stamp-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      state.stampMode = btn.dataset.stamp;
    });
  });

  // 笔触大小
  $("#brushSize").addEventListener("input", (e) => {
    state.brushSize = parseInt(e.target.value);
  });

  // 鼠标绘制
  canvas.addEventListener("mousedown", (e) => {
    if (state.stampMode) {
      placeStamp(ctx, e, canvas);
      return;
    }
    state.isDrawing = true;
    const { x, y } = getCanvasPos(e, canvas);
    state.lastX = x;
    state.lastY = y;
  });
  canvas.addEventListener("mousemove", (e) => {
    if (!state.isDrawing) return;
    const { x, y } = getCanvasPos(e, canvas);
    drawStroke(ctx, state.lastX, state.lastY, x, y);
    state.lastX = x;
    state.lastY = y;
  });
  canvas.addEventListener("mouseup", () => { state.isDrawing = false; });
  canvas.addEventListener("mouseleave", () => { state.isDrawing = false; });

  // 触屏支持
  canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    if (state.stampMode) { placeStamp(ctx, e.touches[0], canvas); return; }
    state.isDrawing = true;
    const { x, y } = getCanvasPos(e.touches[0], canvas);
    state.lastX = x; state.lastY = y;
  }, { passive: false });
  canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    if (!state.isDrawing) return;
    const { x, y } = getCanvasPos(e.touches[0], canvas);
    drawStroke(ctx, state.lastX, state.lastY, x, y);
    state.lastX = x; state.lastY = y;
  }, { passive: false });
  canvas.addEventListener("touchend", () => { state.isDrawing = false; });

  // 操作按钮
  $("#clearCanvas").addEventListener("click", () => {
    ctx.fillStyle = "#1e1a14";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });
  $("#saveDrawing").addEventListener("click", () => saveDrawing(canvas));
  $("#downloadDrawing").addEventListener("click", () => {
    const a = document.createElement("a");
    a.download = `文明绘图-${getLesson().time}.png`;
    a.href = canvas.toDataURL();
    a.click();
  });

  renderSavedDrawings();
}

function getCanvasPos(e, canvas) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY,
  };
}

function drawStroke(ctx, x0, y0, x1, y1) {
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.strokeStyle = state.drawingTool === "eraser" ? "#1e1a14" : state.drawingColor;
  ctx.lineWidth = state.drawingTool === "brush" ? state.brushSize * 2.5 : state.drawingTool === "eraser" ? state.brushSize * 3 : state.brushSize;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.globalAlpha = state.drawingTool === "brush" ? 0.6 : 1;
  ctx.stroke();
  ctx.globalAlpha = 1;
}

const STAMPS = {
  temple: "🏛", river: "〰", farm: "🌾", house: "🏠",
  grain: "🛖", wall: "⛩", scroll: "📜",
};

function placeStamp(ctx, e, canvas) {
  const { x, y } = getCanvasPos(e, canvas);
  const emoji = STAMPS[state.stampMode] || state.stampMode;
  ctx.font = `${state.brushSize * 3 + 16}px serif`;
  ctx.globalAlpha = 0.9;
  ctx.fillText(emoji, x - 10, y + 10);
  ctx.globalAlpha = 1;
}

function saveDrawing(canvas) {
  const drawings = getSavedDrawings();
  const entry = {
    id: Date.now(),
    lesson: state.activeLessonId,
    time: getLesson().time,
    dataUrl: canvas.toDataURL("image/jpeg", 0.7),
    savedAt: new Date().toLocaleString("zh-CN"),
  };
  drawings.unshift(entry);
  localStorage.setItem("civ_drawings", JSON.stringify(drawings.slice(0, 10)));
  renderSavedDrawings();
  logHistory("drawing_save", `保存了绘图：${entry.time}`);
}

function getSavedDrawings() {
  try { return JSON.parse(localStorage.getItem("civ_drawings") || "[]"); } catch { return []; }
}

function renderSavedDrawings() {
  const drawings = getSavedDrawings();
  if (!drawings.length) { $("#savedDrawings").innerHTML = ""; return; }
  $("#savedDrawings").innerHTML = `
    <p class="eyebrow" style="margin:12px 0 8px">已保存的图稿（${drawings.length}）</p>
    <div class="drawings-grid">
      ${drawings.map((d) => `
        <div class="drawing-thumb">
          <img src="${d.dataUrl}" alt="绘图" />
          <span>${d.time}</span>
        </div>`).join("")}
    </div>`;
}

// ── 历史轨迹 ──────────────────────────────────────
function logHistory(type, text) {
  const logs = getHistory();
  logs.unshift({ type, text, ts: new Date().toLocaleString("zh-CN") });
  localStorage.setItem("civ_history", JSON.stringify(logs.slice(0, 200)));
}

function getHistory() {
  try { return JSON.parse(localStorage.getItem("civ_history") || "[]"); } catch { return []; }
}

function renderHistoryStats() {
  const logs = getHistory();
  const saved = getSavedProgress();
  const stats = [
    { label: "学习记录", value: logs.length },
    { label: "已完成课程", value: saved.completed.length },
    { label: "AI对话次数", value: logs.filter((l) => l.type === "chat").length },
    { label: "保存图稿", value: getSavedDrawings().length },
  ];
  $("#historyStats").innerHTML = stats.map((s) =>
    `<div class="stat-card"><strong>${s.value}</strong><span>${s.label}</span></div>`
  ).join("");
}

function renderHistoryTimeline() {
  renderHistoryStats();
  const logs = getHistory();
  if (!logs.length) {
    $("#historyTimeline").innerHTML = `<p class="empty-state">开始探索课程，你的学习轨迹会记录在这里。</p>`;
    return;
  }
  const typeIcon = { lesson_view: "📚", map_click: "📍", search: "🔍", chat: "💬", task_complete: "🏆", drawing_save: "🎨", app_open: "🌍" };
  const typeLabel = { lesson_view: "浏览课程", map_click: "地图探索", search: "知识搜索", chat: "AI对话", task_complete: "完成任务", drawing_save: "保存绘图", app_open: "开始学习" };
  $("#historyTimeline").innerHTML = logs.map((log) => `
    <div class="history-item">
      <div class="history-icon">${typeIcon[log.type] || "📝"}</div>
      <div class="history-body">
        <span class="history-type">${typeLabel[log.type] || log.type}</span>
        <p class="history-text">${log.text}</p>
        <span class="history-ts">${log.ts}</span>
      </div>
    </div>`).join("");

  $("#clearHistory").onclick = () => {
    if (confirm("确认清除所有学习记录？")) {
      localStorage.removeItem("civ_history");
      renderHistoryTimeline();
    }
  };
}

// ── 进度存储 ──────────────────────────────────────
function getSavedProgress() {
  try { return JSON.parse(localStorage.getItem("civ_progress") || '{"completed":[]}'); } catch { return { completed: [] }; }
}

function saveProgress(data) {
  localStorage.setItem("civ_progress", JSON.stringify(data));
}

// ── 启动 ──────────────────────────────────────────
init();
renderPassport();
