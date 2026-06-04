// AI世界文明实验室 · 应用逻辑 (merged v2 + existing)

// 🔒 样板演示模式 — 只解锁这些课程，其余显示锁
// 等准备好内容后，把更多 lesson id 加进数组即可
const DEMO_UNLOCKED_LESSONS = ['PH01'];

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];

// ── 应用状态 ──────────────────────────────────────
let state = {
  // navigation
  currentScreen: 's-home',         // 's-home' | 's-lesson' | 's-summary'
  activeLessonId: 'L01',
  currentMapData: null,             // current MAP_DATA entry
  currentCiv: null,
  currentEvent: null,
  // progress (stored in localStorage)
  completed: [],
  learned: {},
  // drawing
  drawingTool: 'pencil',
  drawingColor: '#d4a853',
  brushSize: 4,
  isDrawing: false,
  lastX: 0,
  lastY: 0,
  stampMode: null,
  // settings
  speechRate: 0.95,
  apiKey: '',
  activeRegionId: null,
};

function getLessonData() {
  return LESSONS_DATA[state.activeLessonId];
}
function getMapData() {
  return MAP_DATA.find((l) => l.id === state.activeLessonId) || null;
}

// ── 工具函数 ─────────────────────────────────────
function esc(str) {
  return (str || '').replace(/'/g, '').replace(/"/g, '');
}

// ── 维基百科链接生成器 ─────────────────────────────
// 从名称中提取可搜索的关键词（去掉地名前缀、英文注释等）
function wikiQuery(term) {
  return term
    .split('·').pop()          // 取 · 后面部分（如"摩洛哥·杰贝尔" → "杰贝尔"）
    .split('（')[0]             // 去掉括号注释
    .split('（')[0]
    .split('/')[0]
    .replace(/\s+[A-Za-z].*/,'') // 去掉英文后缀（如 "Jebel Irhoud"）
    .trim();
}

// 🖼 通用图片渲染器：当数据节点有 image 字段时，渲染为图片为主的卡片
// 用法：在数据里加 image: 'images/xxx.png'，自动替换文字
function renderHeroImage(image, alt, caption) {
  if (!image) return '';
  return `<div class="hero-image-block">
    <img class="hero-image" src="${image}" alt="${alt || ''}" loading="lazy"/>
    ${caption ? `<p class="hero-image-caption">${caption}</p>` : ''}
  </div>`;
}

// 生成中英文维基百科链接按钮组
function wikiBtn(term, wikiEnSlug) {
  const q = wikiQuery(term);
  const zhUrl = `https://zh.wikipedia.org/w/index.php?search=${encodeURIComponent(q)}`;
  const enUrl = wikiEnSlug
    ? `https://en.wikipedia.org/wiki/${wikiEnSlug}`
    : `https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(term.split('·').join(' '))}`;
  return `<span class="wiki-btns">
    <a href="${zhUrl}" target="_blank" rel="noreferrer noopener" class="wiki-btn zh">📖 中文维基</a>
    <a href="${enUrl}" target="_blank" rel="noreferrer noopener" class="wiki-btn en">🔗 EN</a>
  </span>`;
}

// ── 存储 ─────────────────────────────────────────
function loadPersisted() {
  try { state.completed = JSON.parse(localStorage.getItem('civ_completed') || '[]'); } catch { state.completed = []; }
  try { state.learned = JSON.parse(localStorage.getItem('civ_learned') || '{}'); } catch { state.learned = {}; }
  state.apiKey = localStorage.getItem('civ_api_key') || '';
  state.aiProvider = localStorage.getItem('civ_ai_provider') || 'qwen';
  state.aiModel = localStorage.getItem('civ_ai_model') || 'qwen-turbo';
  state.speechRate = parseFloat(localStorage.getItem('civ_speech_rate') || '0.95');
}
function savePersisted() {
  localStorage.setItem('civ_completed', JSON.stringify(state.completed));
  localStorage.setItem('civ_learned', JSON.stringify(state.learned));
}
function getSavedProgress() {
  try { return JSON.parse(localStorage.getItem('civ_progress') || '{"completed":[]}'); } catch { return { completed: [] }; }
}
function saveProgress(data) { localStorage.setItem('civ_progress', JSON.stringify(data)); }
function markLessonComplete(id) {
  const saved = getSavedProgress();
  if (!saved.completed.includes(id)) { saved.completed.push(id); saveProgress(saved); }
  if (!state.completed.includes(id)) { state.completed.push(id); savePersisted(); }
}

// ── 初始化 ────────────────────────────────────────
function init() {
  loadPersisted();
  loadSettings();
  // 🧠 初始化统一知识库（内部 + 外部 Wiki 缓存）
  if (typeof KB !== 'undefined') {
    KB.init();
    window.KB = KB; // 暴露给控制台调试
  }
  createStars();
  renderHomeTimeline();
  loadCharacterPref();
  bindLessonTopbar();
  bindLessonTabBar();
  bindSearch();
  bindVoice();
  bindSettings();
  bindChatEvents();
  initDrawingCanvas();
  renderHistoryStats();
  logHistory('app_open', '打开了AI世界文明实验室');
  // 注入全局浮动 AI 助手
  injectFloatingAI();
}

// ════════════════════════════════════════════════════════════════
// 🤖 全局浮动 AI 助手（任何页面都能呼出）
// ════════════════════════════════════════════════════════════════
function injectFloatingAI() {
  if (document.getElementById('aiFloatFab')) return; // 防止重复
  // 浮动按钮 (FAB)
  const fab = document.createElement('button');
  fab.id = 'aiFloatFab';
  fab.className = 'ai-float-fab';
  fab.title = '问 AI 助手';
  fab.innerHTML = `<span class="ai-fab-icon">🤖</span><span class="ai-fab-pulse"></span>`;
  fab.onclick = () => toggleAIFloat();
  document.body.appendChild(fab);

  // 浮动窗口
  const panel = document.createElement('div');
  panel.id = 'aiFloatPanel';
  panel.className = 'ai-float-panel hidden';
  panel.innerHTML = `
    <div class="aifp-header">
      <div class="aifp-title">
        <span class="aifp-avatar">🤖</span>
        <div>
          <strong>AI 文明助手</strong>
          <small id="aifpStatus">未连接</small>
        </div>
      </div>
      <div class="aifp-actions">
        <button class="aifp-settings" onclick="showAIKeySetup()" title="切换/接入 AI">⚙</button>
        <button class="aifp-min" onclick="toggleAIFloat()" title="最小化">－</button>
      </div>
    </div>
    <div class="aifp-msgs" id="aifpMsgs"></div>
    <div class="aifp-suggest" id="aifpSuggest"></div>
    <div class="aifp-input-row">
      <textarea id="aifpInput" rows="2" placeholder="问任何关于人类/文明/历史的问题…"></textarea>
      <button id="aifpSend" class="aifp-send">发送</button>
    </div>
    <div class="aifp-foot">
      💡 我会先查课程深度知识库 (272 条 A 级来源) + 维基百科，再回答
    </div>
  `;
  document.body.appendChild(panel);

  // 拖动手柄 (header)
  enableDrag(panel, panel.querySelector('.aifp-header'));

  // 绑定发送
  panel.querySelector('#aifpSend').onclick = sendFloatingAIMsg;
  panel.querySelector('#aifpInput').onkeydown = e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendFloatingAIMsg(); }
  };

  refreshFloatingAIStatus();
}

function toggleAIFloat() {
  const panel = document.getElementById('aiFloatPanel');
  const fab = document.getElementById('aiFloatFab');
  if (!panel) return;
  const isHidden = panel.classList.contains('hidden');
  panel.classList.toggle('hidden');
  fab.classList.toggle('active', isHidden);
  if (isHidden) {
    refreshFloatingAIStatus();
    // 首次打开发个欢迎语
    const msgs = document.getElementById('aifpMsgs');
    if (msgs && !msgs.dataset.welcomed) {
      const uName = (getUserProfile()||{}).nickname || '朋友';
      addFloatingAIMsg('ai', `${uName}你好 🌍 我是 AI 文明助手。你正在看的页面我都了解，可以问我任何关于人类、史前、文明、历史的问题！`);
      // 提示几个示例
      const sug = document.getElementById('aifpSuggest');
      sug.innerHTML = [
        '为什么说 Lucy 重要？',
        '智人和黑猩猩是什么关系？',
        '人类为什么要走出非洲？',
        '阿婆为什么能带路？',
      ].map(q => `<button class="aifp-sug-btn">${q}</button>`).join('');
      sug.querySelectorAll('button').forEach(b => {
        b.onclick = () => {
          document.getElementById('aifpInput').value = b.textContent;
          sendFloatingAIMsg();
        };
      });
      msgs.dataset.welcomed = '1';
    }
    setTimeout(() => document.getElementById('aifpInput')?.focus(), 200);
  }
}

function refreshFloatingAIStatus() {
  const s = document.getElementById('aifpStatus');
  if (!s) return;
  const hasKey = !!(state.apiKey && state.apiKey.startsWith('sk-'));
  if (!hasKey) {
    s.innerHTML = '<span style="color:#c84820">⚠ 未连接 · 点 ⚙ 接入免费千问</span>';
    return;
  }
  const provider = state.aiProvider || 'qwen';
  const name = provider === 'qwen' ? '通义千问' : 'Claude';
  s.innerHTML = `<span style="color:#2a8038">🟢 ${name} · ${state.aiModel || ''}</span>`;
}

function addFloatingAIMsg(role, html) {
  const msgs = document.getElementById('aifpMsgs');
  if (!msgs) return;
  const div = document.createElement('div');
  div.className = 'aifp-msg ' + role;
  div.innerHTML = `<div class="aifp-msg-avatar">${role === 'ai' ? '🤖' : '👤'}</div>
    <div class="aifp-msg-bubble">${html}</div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

async function sendFloatingAIMsg() {
  const inp = document.getElementById('aifpInput');
  const text = (inp.value || '').trim();
  if (!text) return;
  inp.value = '';
  addFloatingAIMsg('user', text);

  // 根据当前页面推断上下文 period
  let p = PREHISTORIC.periods.find(x => x.id === activePreEraId)
       || PREHISTORIC.periods[0]; // 默认 PH01

  addFloatingAIMsg('ai', '<em>⏳ 思考中…</em>');
  const msgs = document.getElementById('aifpMsgs');
  const tempMsg = msgs.lastElementChild;

  try {
    let resp;
    if (state.apiKey && state.apiKey.startsWith('sk-')) {
      resp = await callPreClaudeAPI(text, p);
    } else {
      resp = await getPreKBResponse(text, p);
    }
    tempMsg.querySelector('.aifp-msg-bubble').innerHTML = resp;
    msgs.scrollTop = msgs.scrollHeight;
  } catch (e) {
    tempMsg.querySelector('.aifp-msg-bubble').innerHTML = '⚠ 出错：' + e.message;
  }
}

// 通用拖动 (从 header 处拖动整个 panel)
function enableDrag(panel, handle) {
  let startX, startY, origX, origY, dragging = false;
  handle.addEventListener('mousedown', (e) => {
    if (e.target.closest('button')) return; // 不要拦截按钮
    dragging = true;
    startX = e.clientX; startY = e.clientY;
    const r = panel.getBoundingClientRect();
    origX = r.left; origY = r.top;
    panel.style.transition = 'none';
    document.body.style.userSelect = 'none';
  });
  document.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - startX, dy = e.clientY - startY;
    panel.style.left = (origX + dx) + 'px';
    panel.style.top = (origY + dy) + 'px';
    panel.style.right = 'auto';
    panel.style.bottom = 'auto';
  });
  document.addEventListener('mouseup', () => {
    dragging = false;
    panel.style.transition = '';
    document.body.style.userSelect = '';
  });
}

// ── 星空 ─────────────────────────────────────────
function createStars() {
  const c = $('#stars');
  for (let i = 0; i < 120; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    s.style.cssText = `width:${Math.random() * 2.5 + .5}px;height:${Math.random() * 2.5 + .5}px;`
      + `left:${Math.random() * 100}%;top:${Math.random() * 100}%;`
      + `--d:${Math.random() * 4 + 2}s;animation-delay:${Math.random() * 5}s;opacity:${Math.random() * .5 + .1}`;
    c.appendChild(s);
  }
}

// ── 屏幕切换 ──────────────────────────────────────
function showScreen(id) {
  $$('.screen').forEach((s) => s.classList.toggle('hidden', s.id !== id));
  state.currentScreen = id;
}

// ════════════════════════════════════════════════
// HOME TIMELINE
// ════════════════════════════════════════════════
function renderHomeTimeline() {
  // 🆕 两级导航：默认显示 7 个 stage 大卡片；点进去看子节点
  if (homeViewState.mode === 'stage') {
    renderStageDetail(homeViewState.stageId);
  } else {
    renderStageCards();
  }
}

// 视图状态：'home' 显示 7 卡片，'stage' 显示某 stage 的子节点
let homeViewState = { mode: 'home', stageId: null };

// ════════════════════════════════════════════════════
// Home Level 0：7 个 STAGE 大卡片
// ════════════════════════════════════════════════════
function renderStageCards() {
  const container = document.getElementById('mainNetworkContainer');
  if (!container) return;
  const N = MAIN_NETWORK;

  container.innerHTML = `
    <div class="stage-cards-intro">
      <p>🌍 七个文明阶段 · 从 30 万年前到 AI 时代</p>
      <p class="intro-sub">点击任意阶段卡片，深入了解这个时期的关键课程</p>
    </div>
    <div class="stage-cards-grid">
      ${N.stages.map((stage, i) => {
        const nodes = N.nodes.filter(n => n.stage === stage.id);
        const linkedCount = nodes.filter(n => n.linked_lesson).length;
        const total = nodes.length;
        const completed = (state.completed || []).filter(c =>
          nodes.some(n => n.linked_lesson === c)).length;
        const isComing = stage.status === 'coming_soon';
        return `
          <button class="stage-card ${isComing ? 'coming-soon' : ''}"
                  style="--stage-color:${stage.color}"
                  data-stage="${stage.id}">
            <div class="stage-card-num">阶段 ${i}</div>
            <div class="stage-card-icon">${stage.icon}</div>
            <h3 class="stage-card-title">${stage.title}</h3>
            <p class="stage-card-time">${stage.time_range}</p>
            <p class="stage-card-question">「${stage.core_question}」</p>
            <div class="stage-card-stats">
              <span class="stage-card-count">📚 ${total} 个知识点</span>
              ${linkedCount > 0 ? `<span class="stage-card-ready">${linkedCount} 已开放${completed > 0 ? ` · ${completed} 已学` : ''}</span>` : ''}
              ${isComing ? '<span class="stage-card-badge">⏳ 即将上线</span>' : ''}
            </div>
            <div class="stage-card-cta">${isComing ? '敬请期待' : '进入探索 →'}</div>
          </button>`;
      }).join('')}
    </div>
  `;

  container.querySelectorAll('.stage-card').forEach(btn => {
    btn.addEventListener('click', () => {
      const sid = btn.getAttribute('data-stage');
      enterStage(sid);
    });
  });
}

// ════════════════════════════════════════════════════
// Home Level 1：某 stage 的子节点详情页
// ════════════════════════════════════════════════════
function enterStage(stageId) {
  const stage = MAIN_NETWORK.stages.find(s => s.id === stageId);
  if (!stage) return;
  homeViewState = { mode: 'stage', stageId };
  renderStageDetail(stageId);
  document.getElementById('s-home').scrollTo({ top: 0, behavior: 'smooth' });
}

function backToStageHome() {
  homeViewState = { mode: 'home', stageId: null };
  renderStageCards();
  document.getElementById('s-home').scrollTo({ top: 0, behavior: 'smooth' });
}

function renderStageDetail(stageId) {
  const container = document.getElementById('mainNetworkContainer');
  if (!container) return;
  const stage = MAIN_NETWORK.stages.find(s => s.id === stageId);
  const nodes = MAIN_NETWORK.nodes.filter(n => n.stage === stageId);
  if (!stage) return;

  const completed = state.completed || [];
  container.innerHTML = `
    <div class="stage-detail-header" style="--stage-color:${stage.color}">
      <button class="stage-back-btn" onclick="backToStageHome()">← 返回七个阶段</button>
      <div class="stage-detail-title">
        <span class="stage-detail-icon">${stage.icon}</span>
        <div>
          <h2>${stage.title}</h2>
          <p class="stage-detail-meta">${stage.time_range}　·　${stage.core_question}</p>
        </div>
      </div>
    </div>

    <div class="stage-detail-grid">
      ${nodes.map((n, i) => {
        const isLinked = !!n.linked_lesson;
        const isComing = n.status === 'coming_soon' || stage.status === 'coming_soon';
        // 🔒 样板演示模式：只解锁白名单课程
        const demoLocked = isLinked && !DEMO_UNLOCKED_LESSONS.includes(n.linked_lesson);
        const done = isLinked && completed.includes(n.linked_lesson);
        const cls = ['lesson-card',
          isComing ? 'coming-soon' : '',
          isLinked && !demoLocked ? 'linked' : '',
          done ? 'done' : '',
          demoLocked ? 'demo-locked' : '',
        ].filter(Boolean).join(' ');
        return `
          <button class="${cls}" style="--stage-color:${stage.color}"
                  data-linked="${demoLocked ? '' : (n.linked_lesson || '')}" data-id="${n.id}">
            <div class="lesson-card-num">${String(i + 1).padStart(2, '0')}</div>
            <div class="lesson-card-icon">${demoLocked ? '🔒' : n.emoji}</div>
            <h4 class="lesson-card-title">${n.label}</h4>
            <p class="lesson-card-time">${n.time}</p>
            <div class="lesson-card-status">
              ${done ? '✓ 已学过' : (demoLocked ? '🔒 即将上线' : (isLinked ? '▸ 点击进入' : (isComing ? '⏳ 敬请期待' : '📖 资料填充中')))}
            </div>
          </button>`;
      }).join('')}
    </div>
  `;

  container.querySelectorAll('.lesson-card').forEach(btn => {
    btn.addEventListener('click', () => {
      const linked = btn.getAttribute('data-linked');
      if (linked) enterLesson(linked);
    });
  });
}

// ════════════════════════════════════════════════════
// 🕸 主知识网络 · Main Knowledge Network (Level 0)
// 双轴布局：X = 时间，Y = 主题
// ════════════════════════════════════════════════════
function renderMainKnowledgeNetwork() {
  const container = document.getElementById('mainNetworkContainer');
  if (!container) return;

  const N = MAIN_NETWORK;
  const W = 1820, H = 1380;

  // ── 7 个 STAGE 横向带（每行 180px 高，背景 + 简洁标签）──
  const stageBands = N.stages.map(s => `
    <rect x="40" y="${s.y - 85}" width="${W - 80}" height="170"
          fill="${s.color}" fill-opacity="${s.status === 'coming_soon' ? 0.025 : 0.05}"/>
    <text x="60" y="${s.y - 50}" font-size="16" font-weight="700"
          fill="${s.color}" opacity="${s.status === 'coming_soon' ? 0.45 : 0.7}"
          font-family="STSong,serif" letter-spacing="2">
      ${s.icon} ${s.title}${s.status === 'coming_soon' ? ' · 即将上线' : ''}
    </text>
    <text x="60" y="${s.y - 30}" font-size="12" fill="#7a4830"
          opacity="${s.status === 'coming_soon' ? 0.45 : 0.6}"
          font-family="STSong,serif">${s.time_range}</text>
    <text x="60" y="${s.y - 12}" font-size="11" fill="#5c4e38"
          opacity="${s.status === 'coming_soon' ? 0.45 : 0.55}"
          font-style="italic" font-family="STSong,serif">${s.core_question}</text>
  `).join('');

  // ── X 轴时间刻度：每个 stage 内时间从左到右 ──
  // 仅画一条底部辅助线，不再标全局时间刻度（避免误导）
  const timeAxis = '';
  const axisLine = '';

  // ── 节点查找表（按 id）──
  const byId = {};
  N.nodes.forEach(n => {
    const stage = N.stages.find(s => s.id === n.stage);
    if (!stage) return;
    byId[n.id] = { ...n, y: stage.y, stageColor: stage.color, stageStatus: stage.status };
  });

  // ── 边样式 ──
  const edgeStyle = (t) => {
    if (t === 'time')    return { stroke:'#c86820', width:2.5, dash:'0',   op:0.5 };
    if (t === 'concept') return { stroke:'#8a5a90', width:1.8, dash:'6,5', op:0.4 };
    return { stroke:'#a07840', width:1.5, dash:'4,5', op:0.3 };
  };
  // 边渲染（树形布局：所有 edges；普通：仅 same-stage time）
  const edges = (kn.edges || []).map(e => {
    const a = byId[e.from], b = byId[e.to];
    if (!a || !b) return '';
    if (!isTree && (a.y !== b.y || e.type !== 'time')) return '';
    const s = edgeStyle(e.type);
    // 边的可见性：两端节点都已 revealed 才显示
    const isRevealed = revealed.has(e.from) && revealed.has(e.to);
    const cls = `kg-edge ${isRevealed ? '' : 'hidden-edge'}`;
    return `<path class="${cls}"
      d="M ${a.x},${a.y} L ${b.x},${b.y}"
      fill="none" stroke="${s.stroke}" stroke-width="${s.width}"
      stroke-opacity="${s.op}" stroke-dasharray="${s.dash}" stroke-linecap="round"/>`;
  }).join('');

  // ── 节点渲染 ──
  const completed = state.completed || [];
  const nodes = N.nodes.map(n => {
    const node = byId[n.id];
    if (!node) return '';
    const isComingSoon = n.status === 'coming_soon' || node.stageStatus === 'coming_soon';
    const isLinked = !!n.linked_lesson;
    const done = isLinked && completed.includes(n.linked_lesson);
    const opacity = isComingSoon ? 0.55 : 1;
    const cls = [
      'mn-node',
      isComingSoon ? 'coming-soon' : '',
      isLinked ? 'linked' : '',
      done ? 'done' : '',
    ].filter(Boolean).join(' ');
    const cursor = isLinked ? 'pointer' : 'default';
    return `
      <g class="${cls}" data-id="${n.id}" data-linked="${n.linked_lesson || ''}"
         style="cursor:${cursor};opacity:${opacity}">
        <circle cx="${node.x}" cy="${node.y}" r="32"
                fill="white" stroke="${node.stageColor}" stroke-width="${done ? 3.5 : 2.5}"
                stroke-dasharray="${isComingSoon ? '4,4' : '0'}"
                filter="drop-shadow(0 3px 8px rgba(60,30,5,.22))"/>
        <circle cx="${node.x}" cy="${node.y}" r="28"
                fill="${node.stageColor}" fill-opacity="${done ? 0.22 : (isLinked ? 0.12 : 0.07)}"/>
        <text x="${node.x}" y="${node.y + 8}" text-anchor="middle"
              font-size="28" pointer-events="none">${n.emoji}</text>
        ${done ? `<circle cx="${node.x + 24}" cy="${node.y - 24}" r="10" fill="#4a8030"/>
                  <text x="${node.x + 24}" y="${node.y - 20}" text-anchor="middle"
                        font-size="12" fill="white" pointer-events="none">✓</text>` : ''}
        ${isLinked && !done ? `<circle cx="${node.x + 24}" cy="${node.y - 24}" r="9" fill="${node.stageColor}"/>
                  <text x="${node.x + 24}" y="${node.y - 20}" text-anchor="middle"
                        font-size="12" fill="white" font-weight="700" pointer-events="none">▸</text>` : ''}
        <!-- 标签 -->
        <text x="${node.x}" y="${node.y + 52}" text-anchor="middle"
              font-size="14" font-weight="700" fill="#2c1a08"
              font-family="STSong,serif" pointer-events="none">${n.label}</text>
        <text x="${node.x}" y="${node.y + 68}" text-anchor="middle"
              font-size="11" fill="#7a4830" pointer-events="none">${n.time}</text>
      </g>
    `;
  }).join('');

  // ── 双轴标签（左侧纵向标签） ──
  const axisLabels = `
    <text x="20" y="${H/2}" transform="rotate(-90, 20, ${H/2})" text-anchor="middle"
          font-size="13" fill="#5a3a18" font-weight="700" font-family="STSong,serif"
          opacity="0.6" letter-spacing="4">← 7 个 文 明 阶 段 ·  时 间 顺 序 →</text>`;

  container.innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" class="mn-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id="mn-grid" width="100" height="150" patternUnits="userSpaceOnUse">
          <path d="M 100 0 L 0 0 0 150" fill="none" stroke="rgba(160,100,30,.05)" stroke-width="1"/>
        </pattern>
        <marker id="mn-arrow" viewBox="0 0 10 10" refX="9" refY="5"
                markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#c86820" opacity="0.5"/>
        </marker>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#mn-grid)"/>
      ${stageBands}
      ${axisLine}
      ${timeAxis}
      ${axisLabels}
      ${edges}
      ${nodes}
    </svg>
  `;

  // ── 节点点击：保留原版交互 — linked → 进入课程；其他节点不响应 ──
  container.querySelectorAll('.mn-node').forEach(g => {
    g.addEventListener('click', () => {
      const linked = g.getAttribute('data-linked');
      // 只有 linked 节点才有点击效果（保留原版「点击进入课程」的简洁交互）
      if (linked) enterLesson(linked);
    });
    g.addEventListener('mouseenter', () => {
      g.classList.add('hover');
      highlightRelatedNodes(g.getAttribute('data-id'), true);
    });
    g.addEventListener('mouseleave', () => {
      g.classList.remove('hover');
      highlightRelatedNodes(g.getAttribute('data-id'), false);
    });
  });
}

function highlightRelatedNodes(nodeId, on) {
  const related = new Set([nodeId]);
  MAIN_NETWORK.edges.forEach(e => {
    if (e.from === nodeId) related.add(e.to);
    if (e.to === nodeId) related.add(e.from);
  });
  document.querySelectorAll('.mn-node').forEach(g => {
    const id = g.getAttribute('data-id');
    if (on && !related.has(id)) {
      g.classList.add('dimmed');
    } else {
      g.classList.remove('dimmed');
    }
  });
}

function positionFigure() {/* deprecated, kept for safety */}

function positionFigure() {
  const wrap = $('#tlWrap');
  const dots = $$('.tl-dot-wrap');
  if (!dots.length) return;
  const fig = $('#tl-figure');
  let idx = state.completed.length;
  if (idx >= dots.length) idx = dots.length - 1;
  const dot = dots[idx];
  const wRect = wrap.getBoundingClientRect();
  const dRect = dot.getBoundingClientRect();
  const leftPx = dRect.left + dRect.width / 2 - wRect.left - 16;
  fig.style.left = leftPx + 'px';
}

// ════════════════════════════════════════════════
// ENTER LESSON
// ════════════════════════════════════════════════
function enterLesson(id) {
  // 🆕 PH## ID 直接进入对应史前知识网络（跳过冗余的总览层）
  if (/^PH\d+$/.test(id)) {
    enterPreEra(id);
    return;
  }
  // 兼容：旧的 P01 入口仍跳转到 8 时代总览
  if (id === 'P01') {
    showPreOverview();
    return;
  }

  state.activeLessonId = id;
  state.currentCiv = null;
  state.currentEvent = null;

  const mapEntry = MAP_DATA.find((l) => l.id === id);
  const lessonEntry = LESSONS_DATA[id];
  state.currentMapData = mapEntry;

  // Update topbar labels
  $('#lessonTimeChip').textContent = mapEntry ? mapEntry.time : (lessonEntry ? lessonEntry.time : '');
  $('#lessonTitleLabel').textContent = mapEntry ? mapEntry.title : (lessonEntry ? lessonEntry.title : '');

  // Update AI chat context
  const idx = TIMELINE.findIndex((t) => t.id === id);
  const label = `第${idx + 1}课 · ${lessonEntry ? lessonEntry.time : ''}`;
  $('#chatLessonChip').textContent = label;
  if (lessonEntry) {
    $('#taskTimeChip').textContent = lessonEntry.time;
    updateChatSuggestions(lessonEntry);
    renderTaskForm(lessonEntry);
  }

  // Apply era colors to map background
  if (mapEntry) {
    applyEraColors(id);
    renderCivMarkers(mapEntry);
    showPanelNoCiv();
  }

  showScreen('s-lesson');
  // Switch to map tab by default
  switchLessonTab('map');

  logHistory('lesson_view', `查看了课程：${mapEntry ? mapEntry.time : ''} · ${mapEntry ? mapEntry.title : ''}`);
}

function applyEraColors(id) {
  const c = ERA_COLORS[id] || ERA_COLORS.L01;
  const root = document.documentElement;
  root.style.setProperty('--era-land', c.land);
  root.style.setProperty('--era-water', c.water);
  root.style.setProperty('--era-sky', c.sky);

  $('#ocean').setAttribute('fill', c.water);
  const continents = $('#continents');
  if (continents) {
    const sat = c.sat != null ? c.sat : 0.8;
    continents.style.filter = `saturate(${sat}) brightness(${0.85 + sat * 0.2})`;
  }

  // P01 special: highlight Africa, dim other continents
  const africaEl = $('#africa');
  const asiaEl = $('#asia');
  const naEl = $('#north-america');
  const saEl = $('#south-america');
  const euEl = $('#europe');
  const auEl = $('#australia');
  if (id === 'P01') {
    // Africa glows warm — this is where the story begins
    if (africaEl) africaEl.style.filter = 'saturate(1.4) brightness(1.15)';
    // Other continents dimmed — humanity hasn't reached them yet
    [asiaEl, naEl, saEl, euEl, auEl].forEach(el => {
      if (el) el.style.filter = 'saturate(0.3) brightness(0.7) opacity(0.65)';
    });
  } else {
    // Reset all continent special filters for other lessons
    [africaEl, asiaEl, naEl, saEl, euEl, auEl].forEach(el => {
      if (el) el.style.filter = '';
    });
  }

  $('#s-lesson').style.background = `linear-gradient(180deg, ${c.sky} 0%, ${adjustColor(c.sky, .04)} 100%)`;
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}
function adjustColor(hex, amt) {
  const { r, g, b } = hexToRgb(hex);
  const adj = Math.round(amt * 255);
  const clamp = (v) => Math.max(0, Math.min(255, v));
  return `rgb(${clamp(r + adj)},${clamp(g + adj)},${clamp(b + adj)})`;
}

// ── Civ markers on SVG ────────────────────────────
function renderCivMarkers(mapEntry) {
  const g = $('#civ-markers');
  g.innerHTML = '';
  if (!mapEntry || !mapEntry.civs) return;

  mapEntry.civs.forEach((civ) => {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.classList.add('civ-marker');
    group.setAttribute('data-id', civ.id);
    group.setAttribute('transform', `translate(${civ.x},${civ.y})`);
    group.addEventListener('click', () => selectCiv(civ.id));

    const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    glow.classList.add('civ-glow');
    glow.setAttribute('r', civ.radius * 2);
    glow.setAttribute('fill', civ.color + '40');
    glow.style.filter = 'url(#glow)';
    group.appendChild(glow);

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('r', civ.radius);
    circle.setAttribute('fill', civ.color + 'cc');
    circle.setAttribute('stroke', civ.color);
    circle.setAttribute('stroke-width', '2');
    group.appendChild(circle);

    // Stick figure
    const personG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const scale = civ.radius / 22;
    personG.setAttribute('transform', `scale(${scale})`);
    personG.innerHTML = `
      <circle cx="0" cy="-10" r="5" fill="rgba(255,255,255,.85)"/>
      <line x1="0" y1="-5" x2="0" y2="4" stroke="rgba(255,255,255,.85)" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="-5" y1="-2" x2="5" y2="-2" stroke="rgba(255,255,255,.85)" stroke-width="2" stroke-linecap="round"/>
      <line x1="0" y1="4" x2="-4" y2="12" stroke="rgba(255,255,255,.85)" stroke-width="2" stroke-linecap="round"/>
      <line x1="0" y1="4" x2="4" y2="12" stroke="rgba(255,255,255,.85)" stroke-width="2" stroke-linecap="round"/>`;
    group.appendChild(personG);

    // Label
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.classList.add('civ-label');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('x', '0');
    text.setAttribute('y', civ.radius + 16);
    text.setAttribute('fill', '#2c1a08');
    text.setAttribute('font-size', '12');
    text.setAttribute('font-family', 'PingFang SC,sans-serif');
    text.textContent = civ.name;
    group.appendChild(text);

    // Done badge
    const civLearned = state.learned[mapEntry.id]?.[civ.id] || [];
    if (civLearned.length >= civ.events.length) {
      const badge = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      badge.setAttribute('x', civ.radius); badge.setAttribute('y', -civ.radius);
      badge.setAttribute('font-size', '14'); badge.textContent = '✓';
      group.appendChild(badge);
    }

    g.appendChild(group);
  });
}

// Update a single civ marker's ✓ badge without re-rendering all markers
function updateCivBadge(mapEntry, civId) {
  const civ = mapEntry.civs.find(c => c.id === civId);
  if (!civ) return;
  const group = document.querySelector(`.civ-marker[data-id="${civId}"]`);
  if (!group) return;
  const civLearned = state.learned[mapEntry.id]?.[civ.id] || [];
  const hasBadge = group.querySelector('.civ-check-badge');
  if (civLearned.length >= civ.events.length && !hasBadge) {
    const badge = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    badge.classList.add('civ-check-badge');
    badge.setAttribute('x', civ.radius); badge.setAttribute('y', -civ.radius);
    badge.setAttribute('font-size', '14'); badge.setAttribute('fill', '#4ed080');
    badge.textContent = '✓';
    group.appendChild(badge);
  }
}

function selectCiv(civId) {
  const mapEntry = state.currentMapData;
  if (!mapEntry) return;
  const civ = mapEntry.civs.find((c) => c.id === civId);
  if (!civ) return;
  state.currentCiv = civ;

  $$('.civ-marker').forEach((m) => m.classList.toggle('selected', m.dataset.id === civId));
  $('#panelNoCiv').style.display = 'none';
  const content = $('#panelCivContent');
  content.style.display = 'flex';

  $('#panelEra').textContent = civ.era;
  $('#panelCivName').innerHTML = `${civ.name} ${wikiBtn(civ.name, civ.wiki_en)}`;
  $('#panelCivDesc').textContent = civ.desc;

  $('#panelPeople').innerHTML = (civ.people || []).map((p) =>
    `<div class="person-chip">
       <span class="person-icon">${p.icon}</span>
       <span><strong>${p.label}</strong> · ${p.note}</span>
       ${wikiBtn(p.label)}
     </div>`
  ).join('');

  const learned = state.learned[mapEntry.id]?.[civ.id] || [];
  $('#panelEvents').innerHTML = civ.events.map((ev) => {
    const isLearned = learned.includes(ev.id);
    return `
      <div class="event-card ${isLearned ? 'learned' : ''}" onclick="openEvent('${ev.id}')">
        <div class="event-year">${ev.emoji} ${ev.year}</div>
        <div class="event-title">${ev.title}</div>
        <div class="event-brief">${ev.body.substring(0, 60)}…</div>
        <div class="event-check">✓</div>
      </div>`;
  }).join('');

  checkCompleteButton();
  logHistory('map_click', `点击地图：${civ.name}`);
}

function showPanelNoCiv() {
  $('#panelNoCiv').style.display = 'flex';
  $('#panelCivContent').style.display = 'none';
  $('#mapCompleteBtn').classList.remove('visible');
}

function checkCompleteButton() {
  const mapEntry = state.currentMapData;
  if (!mapEntry) return;
  const totalEvents = mapEntry.civs.reduce((s, c) => s + c.events.length, 0);
  const learnedEvents = mapEntry.civs.reduce((s, c) => s + (state.learned[mapEntry.id]?.[c.id] || []).length, 0);
  if (learnedEvents >= Math.ceil(totalEvents * 0.5)) {
    $('#mapCompleteBtn').classList.add('visible');
  }
}

// ── Event overlay ─────────────────────────────────
function openEvent(eventId) {
  const mapEntry = state.currentMapData;
  const civ = state.currentCiv;
  if (!mapEntry || !civ) return;
  const ev = civ.events.find((e) => e.id === eventId);
  if (!ev) return;
  state.currentEvent = ev;

  $('#evModalTag').textContent = civ.name + ' · ' + mapEntry.time;
  $('#evModalTitle').innerHTML = `${ev.emoji} ${ev.title} ${wikiBtn(ev.title, ev.wiki_en)}`;
  $('#evModalYear').textContent = ev.year;
  $('#evModalBody').textContent = ev.body;
  $('#evModalInsight').textContent = ev.insight;

  const learned = (state.learned[mapEntry.id]?.[civ.id] || []).includes(ev.id);
  const btn = $('#evLearnBtn');
  btn.textContent = learned ? '✓ 已学习' : '✓ 已学习，继续探索';
  btn.className = 'event-learn-btn' + (learned ? ' learned' : '');

  $('#event-overlay').classList.add('open');
}

function closeEvent() {
  $('#event-overlay').classList.remove('open');
}

function markEventLearned() {
  const mapEntry = state.currentMapData;
  const civ = state.currentCiv;
  const ev = state.currentEvent;
  if (!mapEntry || !civ || !ev) return;

  if (!state.learned[mapEntry.id]) state.learned[mapEntry.id] = {};
  if (!state.learned[mapEntry.id][civ.id]) state.learned[mapEntry.id][civ.id] = [];
  if (!state.learned[mapEntry.id][civ.id].includes(ev.id)) {
    state.learned[mapEntry.id][civ.id].push(ev.id);
    savePersisted();
  }
  closeEvent();
  selectCiv(civ.id);
  // Update only this civ's checkmark badge — no full re-render to avoid flash
  updateCivBadge(mapEntry, civ.id);
  checkCompleteButton();
  logHistory('map_click', `学习了事件：${ev.title}`);
}

// ── Knowledge card (summary) ──────────────────────
function showSummary() {
  const mapEntry = state.currentMapData;
  if (!mapEntry) return;
  const tk = mapEntry.takeaway;

  $('#sumIcon').textContent = mapEntry.icon;
  $('#sumTitle').textContent = tk.title;
  $('#sumQuote').textContent = '「' + tk.quote + '」';
  $('#sumPoints').innerHTML = tk.points.map((p, i) =>
    `<div class="summary-point">
      <div class="summary-point-num">${i + 1}</div>
      <p>${p}</p>
    </div>`
  ).join('');
  $('#sumCivs').innerHTML = mapEntry.civs.map((c) =>
    `<div class="summary-civ-tag" style="border-color:${c.color}60;color:${c.color}">
      ${c.name} ${wikiBtn(c.name, c.wiki_en)}
    </div>`
  ).join('');

  showScreen('s-summary');
}

function completeLesson() {
  const id = state.activeLessonId;
  markLessonComplete(id);
  showScreen('s-home');
  setTimeout(() => renderHomeTimeline(), 100);
}

function backToLesson() {
  showScreen('s-lesson');
}

// ════════════════════════════════════════════════
// LESSON TOPBAR
// ════════════════════════════════════════════════
function bindLessonTopbar() {
  $('#backBtn').addEventListener('click', () => {
    showScreen('s-home');
  });
}

// ════════════════════════════════════════════════
// LESSON TAB BAR
// ════════════════════════════════════════════════
function bindLessonTabBar() {
  $$('.ltab').forEach((tab) => {
    tab.addEventListener('click', () => switchLessonTab(tab.dataset.tab));
  });
}

function switchLessonTab(tabId) {
  $$('.ltab').forEach((t) => t.classList.toggle('active', t.dataset.tab === tabId));
  $$('.ltab-content').forEach((c) => c.classList.add('hidden'));
  const el = $(`#ltab-${tabId}`);
  if (el) el.classList.remove('hidden');
  if (tabId === 'history') renderHistoryTimeline();
}

// ════════════════════════════════════════════════
// SEARCH
// ════════════════════════════════════════════════
function bindSearch() {
  $('#searchButton').addEventListener('click', () => runSearch($('#searchInput').value));
  $('#searchInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') runSearch(e.currentTarget.value);
  });
  $('#closeSearch').addEventListener('click', () => {
    $('#searchOverlay').classList.add('hidden');
  });
}

function runSearch(query) {
  const q = query.trim().toLowerCase();
  if (!q) return;
  const rows = [];

  KNOWLEDGE_BASE.forEach((kb) => {
    if (`${kb.title} ${kb.content} ${kb.keywords.join(' ')}`.toLowerCase().includes(q)) {
      rows.push({ type: kb.category, title: kb.title, text: kb.content.slice(0, 120) + '…', lesson: kb.lesson });
    }
  });

  Object.values(LESSONS_DATA).forEach((lesson) => {
    lesson.mapPoints.forEach((pt) => {
      if (`${pt.name} ${pt.child} ${pt.fact} ${pt.keywords.join(' ')}`.toLowerCase().includes(q)) {
        rows.push({ type: '地图地点', title: pt.name, text: pt.child, lesson: lesson.id });
      }
    });
    lesson.concepts.forEach((c) => {
      if (`${c.name} ${c.text}`.toLowerCase().includes(q)) {
        rows.push({ type: '核心概念', title: c.name, text: c.text, lesson: lesson.id });
      }
    });
    lesson.regions.forEach((r) => {
      if (`${r.name} ${r.title} ${r.summary}`.toLowerCase().includes(q)) {
        rows.push({ type: '文明讲解', title: r.title, text: r.summary.slice(0, 100) + '…', lesson: lesson.id });
      }
    });
  });

  const seen = new Set();
  const unique = rows.filter((r) => { const k = r.title; if (seen.has(k)) return false; seen.add(k); return true; });

  const lessonLabel = { L01: '第1课', L02: '第2课', L03: '第3课', L04: '第4课', L05: '第5课', L06: '第6课', L07: '第7课', L08: '第8课', L09: '第9课', L10: '第10课', L11: '第11课', L12: '第12课' };

  $('#searchResults').innerHTML = unique.length
    ? unique.map((r) => `
        <div class="result-item">
          <div class="result-meta">
            <span class="result-type">${r.type}</span>
            ${r.lesson ? `<span class="result-lesson">${lessonLabel[r.lesson] || r.lesson}</span>` : ''}
          </div>
          <div class="result-title-row">
            <strong>${r.title}</strong>
            ${wikiBtn(r.title)}
          </div>
          <p>${r.text}</p>
        </div>`).join('')
    : `<p class="empty-state">知识库里暂时没有找到"${query}"。试试：尼罗河、苏美尔、甲骨文、青铜、崩溃。</p>`;

  $('#searchOverlay').classList.remove('hidden');
  logHistory('search', `搜索了：${query}`);
}

// ════════════════════════════════════════════════
// VOICE
// ════════════════════════════════════════════════
function bindVoice() {
  $('#readButton').addEventListener('click', () => {
    const lesson = getLessonData();
    if (lesson) speakText(`${lesson.time}。${lesson.title}。${lesson.question}。${lesson.snapshot}`);
  });
  $('#voiceButton').addEventListener('click', startVoiceInput);
}

function speakText(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'zh-CN';
  utt.rate = state.speechRate;
  window.speechSynthesis.speak(utt);
}

function startVoiceInput() {
  const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Rec) return;
  const rec = new Rec();
  rec.lang = 'zh-CN';
  rec.interimResults = false;
  rec.start();
  rec.onresult = (e) => {
    const text = e.results[0][0].transcript;
    handleVoiceCommand(text);
  };
}

function handleVoiceCommand(text) {
  const t = text.replace(/[，。！？\s]/g, '');
  const keyword = t.replace(/搜索|查找|朗读/g, '').trim();
  $('#searchInput').value = keyword || t;
  runSearch(keyword || t);
}

// ════════════════════════════════════════════════
// SETTINGS
// ════════════════════════════════════════════════
function openSettings() {
  $('#settingsModal').classList.remove('hidden');
}

function bindSettings() {
  $('#settingsBtn').addEventListener('click', openSettings);
  $('#closeSettings').addEventListener('click', () => $('#settingsModal').classList.add('hidden'));
  $('#saveSettings').addEventListener('click', () => {
    state.apiKey = $('#apiKeyInput').value.trim();
    state.speechRate = parseFloat($('#speechRate').value);
    localStorage.setItem('civ_api_key', state.apiKey);
    localStorage.setItem('civ_speech_rate', state.speechRate);
    if (state.apiKey) {
      $('#apiHint').innerHTML = '<span>✅ 已启用Claude AI对话模式。</span>';
    }
    $('#settingsModal').classList.add('hidden');
  });
  $('#speechRate').addEventListener('input', (e) => {
    $('#speechRateLabel').textContent = `${e.target.value}×`;
  });
}

function loadSettings() {
  state.apiKey = localStorage.getItem('civ_api_key') || '';
  state.aiProvider = localStorage.getItem('civ_ai_provider') || 'qwen';
  state.aiModel = localStorage.getItem('civ_ai_model') || 'qwen-turbo';
  state.speechRate = parseFloat(localStorage.getItem('civ_speech_rate') || '0.95');
  if (state.apiKey) {
    $('#apiKeyInput').value = state.apiKey;
    $('#apiHint').innerHTML = '<span>✅ 已启用Claude AI对话模式。</span>';
  }
  $('#speechRate').value = state.speechRate;
  $('#speechRateLabel').textContent = `${state.speechRate}×`;
}

// ════════════════════════════════════════════════
// AI CHAT
// ════════════════════════════════════════════════
function updateChatSuggestions(lesson) {
  const suggestions = {
    L01: ['为什么河流对文明那么重要？', '楔形文字是什么？', '神庙有什么用？', '因果链怎么理解？'],
    L02: ['建造金字塔需要多少人？', '苏美尔城邦是怎么运转的？', '为什么要建巨大建筑？', '印度河城市有什么特别？'],
    L03: ['青铜技术怎么改变了战争？', '甲骨文是怎么用的？', '赫梯人有多强？', '为什么商朝那么重要？'],
    L04: ['青铜时代为什么会崩溃？', '哪些文明活下来了？', '贸易断裂怎么影响文明？', '崩溃后出现了什么？'],
    L05: ['轴心时代是什么？', '孔子和苏格拉底有什么共同点？', '佛教怎么诞生的？', '什么是民主？'],
    L06: ['秦始皇怎么统一六国？', '罗马共和国和帝国有什么区别？', '帝国怎么管理那么多地方？'],
    L07: ['丝绸之路有多长？', '谁是粟特商人？', '丝绸之路传播了什么？', '印度洋贸易怎么运作？'],
    L08: ['为什么罗马会衰落？', '基督教怎么传播的？', '三国时代是什么？', '帝国危机有哪些原因？'],
    L09: ['伊斯兰文明怎么兴起的？', '唐朝有多开放？', '拜占庭是什么？', '宗教怎么组织社会？'],
    L10: ['巴格达智慧宫是什么？', '花拉子密发明了什么？', '唐朝黄金时代为什么会结束？'],
    L11: ['宋朝有什么发明？', '公元1000年世界有几个大文明？', '欧洲封建制度是什么？'],
    L12: ['如何创造一个原创文明？', '文明需要哪些基本要素？', '4000年文明史的核心是什么？'],
  };
  const chips = suggestions[lesson.id] || suggestions.L01;
  $('#chatSuggestions').innerHTML = chips.map((s) =>
    `<button class="suggestion-chip" onclick="sendSuggestion(this)">${s}</button>`
  ).join('');
}

function sendSuggestion(btn) {
  $('#chatInput').value = btn.textContent;
  sendChatMessage();
}

function bindChatEvents() {
  $('#chatSendBtn').addEventListener('click', sendChatMessage);
  $('#chatInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChatMessage(); }
  });
}

async function sendChatMessage() {
  const input = $('#chatInput').value.trim();
  if (!input) return;
  addChatMessage('user', input);
  $('#chatInput').value = '';
  logHistory('chat', `AI对话：${input}`);

  const thinkId = 'think-' + Date.now();
  addChatMessage('ai', '<em>正在思考…</em>', thinkId);

  let response;
  if (state.apiKey) {
    response = await callClaudeAPI(input);
  } else {
    response = await getKBResponse(input);
  }

  const thinkEl = document.getElementById(thinkId);
  if (thinkEl) thinkEl.closest('.chat-message').remove();
  addChatMessage('ai', response);
}

function addChatMessage(role, html, id) {
  const div = document.createElement('div');
  div.className = `chat-message ${role}`;
  if (id) div.id = id;
  div.innerHTML = `
    <div class="message-avatar">${role === 'ai' ? 'AI' : '你'}</div>
    <div class="message-bubble">${typeof html === 'string' && html.startsWith('<') ? html : `<p>${html}</p>`}</div>
  `;
  const msgs = $('#chatMessages');
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

async function callClaudeAPI(userMessage) {
  const lesson = getLessonData();
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': state.apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 600,
        system: lesson ? lesson.aiTask.systemPrompt : '你是AI世界文明实验室助手。',
        messages: [{ role: 'user', content: userMessage }],
      }),
    });
    if (!res.ok) throw new Error(`API错误：${res.status}`);
    const data = await res.json();
    const text = data.content[0].text;
    return text.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
  } catch (e) {
    return `<p>API连接失败（${e.message}）。切换回知识库模式回答：</p><p>${await getKBResponse(userMessage)}</p>`;
  }
}

async function getKBResponse(question) {
  const q = question.toLowerCase();
  const lesson = getLessonData();

  const modernTerms = ['汽车', '电灯', '手机', '飞机', '枪', '炸弹', '电脑', '互联网', '火药', '印刷机', '铁路', '蒸汽机'];
  const found = modernTerms.filter((t) => q.includes(t));
  if (found.length > 0 && lesson) {
    return `<p>⚠️ <strong>时代检查！</strong></p><p>你提到了"${found.join('、')}"，但这些在${lesson.time}前后还没有出现。</p><p>提示：这个时代有${lesson.chain.slice(0, 4).join('、')}，但还没有后来的技术。</p>`;
  }

  const kbMatches = KNOWLEDGE_BASE.filter((kb) =>
    `${kb.title} ${kb.content} ${kb.keywords.join(' ')}`.toLowerCase().split(/\s+/).some((w) => q.includes(w) && w.length > 1)
  );
  if (kbMatches.length > 0) {
    const match = kbMatches[0];
    return `<p><strong>${match.title}</strong></p><p>${match.content}</p>${kbMatches.length > 1 ? `<p>相关：${kbMatches.slice(1, 3).map((m) => `<em>${m.title}</em>`).join('、')}。可以继续追问！</p>` : ''}`;
  }

  if (lesson) {
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
    if (q.includes('因果') || q.includes('文明形成') || q.includes('怎么来的')) {
      return `<p><strong>文明形成的因果链：</strong></p><p>${lesson.chain.join(' → ')}</p>`;
    }
    return `<p>这是个好问题！在${lesson.time}前后，${lesson.snapshot.slice(0, 80)}…</p><p>你可以试试搜索更具体的词，比如：${lesson.concepts.slice(0, 3).map((c) => `"${c.name}"`).join('、')}。</p>`;
  }

  return '<p>请先选择一节课，我就能回答更准确的问题了。</p>';
}

// ════════════════════════════════════════════════
// TASK FORM (create tab)
// ════════════════════════════════════════════════
function renderTaskForm(lesson) {
  const task = lesson.aiTask;
  $('#taskTitle').textContent = task.title;
  $('#taskTimeChip').textContent = lesson.time;

  $('#taskBrief').innerHTML = `
    <p class="task-background">${task.background}</p>
    <div class="task-rules">
      <div><strong>必须包含</strong><ul>${task.mustInclude.map((i) => `<li>${i}</li>`).join('')}</ul></div>
      <div><strong>不能出现</strong><ul>${task.forbidden.map((i) => `<li>${i}</li>`).join('')}</ul></div>
    </div>`;

  $('#taskFields').innerHTML = task.fields.map((field) => {
    if (field.type === 'select') {
      return `<label>${field.label}<select name="${field.name}">${field.options.map((o) => `<option>${o}</option>`).join('')}</select></label>`;
    }
    return `<label>${field.label}<input name="${field.name}" placeholder="${field.placeholder}" /></label>`;
  }).join('');

  $('#artifactOutput').innerHTML = '<p class="empty-state">填写表单后，这里会生成你的文明方案。</p>';

  $('#taskForm').onsubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const html = task.generateArtifact(data);
    $('#artifactOutput').innerHTML = html;
    markLessonComplete(lesson.id);
    speakText(`你的${task.title}已经完成，太棒了！`);
    logHistory('task_complete', `完成了创作任务：${task.title}（${lesson.time}）`);
  };

  $('#checkArtifact').onclick = () => {
    const output = $('#artifactOutput').textContent;
    if (!output || output.includes('填写表单')) {
      $('#artifactOutput').innerHTML = "<p class='empty-state'>请先生成方案，再进行历史质检。</p>";
      return;
    }
    const errors = task.commonErrors;
    $('#artifactOutput').insertAdjacentHTML('beforeend', `
      <div class="quality-check">
        <strong>历史质检结果</strong>
        <ul>
          <li>✓ 方案已生成，请对照以下常见错误自查：</li>
          ${errors.map((e) => `<li>⚠ 注意：${e}</li>`).join('')}
          <li>✓ 检查你的方案：历史事实和你的创造是否已分开标注？</li>
        </ul>
      </div>`);
  };
}

// ════════════════════════════════════════════════
// DRAWING CANVAS
// ════════════════════════════════════════════════
function initDrawingCanvas() {
  const canvas = $('#drawingCanvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#140e06';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  $$('.draw-tool').forEach((btn) => {
    btn.addEventListener('click', () => {
      $$('.draw-tool').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.drawingTool = btn.dataset.tool;
      state.stampMode = null;
    });
  });

  $$('.color-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      $$('.color-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.drawingColor = btn.dataset.color;
      state.stampMode = null;
    });
  });

  $$('.stamp-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      $$('.stamp-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.stampMode = btn.dataset.stamp;
    });
  });

  $('#brushSize').addEventListener('input', (e) => { state.brushSize = parseInt(e.target.value); });

  canvas.addEventListener('mousedown', (e) => {
    if (state.stampMode) { placeStamp(ctx, e, canvas); return; }
    state.isDrawing = true;
    const { x, y } = getCanvasPos(e, canvas);
    state.lastX = x; state.lastY = y;
  });
  canvas.addEventListener('mousemove', (e) => {
    if (!state.isDrawing) return;
    const { x, y } = getCanvasPos(e, canvas);
    drawStroke(ctx, state.lastX, state.lastY, x, y);
    state.lastX = x; state.lastY = y;
  });
  canvas.addEventListener('mouseup', () => { state.isDrawing = false; });
  canvas.addEventListener('mouseleave', () => { state.isDrawing = false; });

  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (state.stampMode) { placeStamp(ctx, e.touches[0], canvas); return; }
    state.isDrawing = true;
    const { x, y } = getCanvasPos(e.touches[0], canvas);
    state.lastX = x; state.lastY = y;
  }, { passive: false });
  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (!state.isDrawing) return;
    const { x, y } = getCanvasPos(e.touches[0], canvas);
    drawStroke(ctx, state.lastX, state.lastY, x, y);
    state.lastX = x; state.lastY = y;
  }, { passive: false });
  canvas.addEventListener('touchend', () => { state.isDrawing = false; });

  $('#clearCanvas').addEventListener('click', () => {
    ctx.fillStyle = '#140e06';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });
  $('#saveDrawing').addEventListener('click', () => saveDrawing(canvas));
  $('#downloadDrawing').addEventListener('click', () => {
    const a = document.createElement('a');
    a.download = `文明绘图-${getLessonData() ? getLessonData().time : '未知时代'}.png`;
    a.href = canvas.toDataURL();
    a.click();
  });

  renderSavedDrawings();
}

function getCanvasPos(e, canvas) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (e.clientX - rect.left) * (canvas.width / rect.width),
    y: (e.clientY - rect.top) * (canvas.height / rect.height),
  };
}

function drawStroke(ctx, x0, y0, x1, y1) {
  ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1);
  ctx.strokeStyle = state.drawingTool === 'eraser' ? '#140e06' : state.drawingColor;
  ctx.lineWidth = state.drawingTool === 'brush' ? state.brushSize * 2.5 : state.drawingTool === 'eraser' ? state.brushSize * 3 : state.brushSize;
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.globalAlpha = state.drawingTool === 'brush' ? 0.6 : 1;
  ctx.stroke(); ctx.globalAlpha = 1;
}

const STAMPS = { temple: '🏛', river: '〰', farm: '🌾', house: '🏠', grain: '🛖', wall: '⛩', scroll: '📜' };

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
  const lesson = getLessonData();
  const entry = {
    id: Date.now(),
    lesson: state.activeLessonId,
    time: lesson ? lesson.time : '未知',
    dataUrl: canvas.toDataURL('image/jpeg', 0.7),
    savedAt: new Date().toLocaleString('zh-CN'),
  };
  drawings.unshift(entry);
  localStorage.setItem('civ_drawings', JSON.stringify(drawings.slice(0, 10)));
  renderSavedDrawings();
  logHistory('drawing_save', `保存了绘图：${entry.time}`);
}

function getSavedDrawings() {
  try { return JSON.parse(localStorage.getItem('civ_drawings') || '[]'); } catch { return []; }
}

function renderSavedDrawings() {
  const drawings = getSavedDrawings();
  if (!drawings.length) { $('#savedDrawings').innerHTML = ''; return; }
  $('#savedDrawings').innerHTML = `
    <p class="eyebrow" style="margin:12px 0 8px">已保存的图稿（${drawings.length}）</p>
    <div class="drawings-grid">
      ${drawings.map((d) => `
        <div class="drawing-thumb">
          <img src="${d.dataUrl}" alt="绘图" />
          <span>${d.time}</span>
        </div>`).join('')}
    </div>`;
}

// ════════════════════════════════════════════════
// HISTORY
// ════════════════════════════════════════════════
function logHistory(type, text) {
  const logs = getHistory();
  logs.unshift({ type, text, ts: new Date().toLocaleString('zh-CN') });
  localStorage.setItem('civ_history', JSON.stringify(logs.slice(0, 200)));
}

function getHistory() {
  try { return JSON.parse(localStorage.getItem('civ_history') || '[]'); } catch { return []; }
}

function renderHistoryStats() {
  const logs = getHistory();
  const stats = [
    { label: '学习记录', value: logs.length },
    { label: '已完成课程', value: state.completed.length },
    { label: 'AI对话次数', value: logs.filter((l) => l.type === 'chat').length },
    { label: '保存图稿', value: getSavedDrawings().length },
  ];
  $('#historyStats').innerHTML = stats.map((s) =>
    `<div class="stat-card"><strong>${s.value}</strong><span>${s.label}</span></div>`
  ).join('');
}

function renderHistoryTimeline() {
  renderHistoryStats();
  const logs = getHistory();
  if (!logs.length) {
    $('#historyTimeline').innerHTML = '<p class="empty-state">开始探索课程，你的学习轨迹会记录在这里。</p>';
    return;
  }
  const typeIcon = { lesson_view: '📚', map_click: '📍', search: '🔍', chat: '💬', task_complete: '🏆', drawing_save: '🎨', app_open: '🌍' };
  const typeLabel = { lesson_view: '浏览课程', map_click: '地图探索', search: '知识搜索', chat: 'AI对话', task_complete: '完成任务', drawing_save: '保存绘图', app_open: '开始学习' };
  $('#historyTimeline').innerHTML = logs.map((log) => `
    <div class="history-item">
      <div class="history-icon">${typeIcon[log.type] || '📝'}</div>
      <div class="history-body">
        <span class="history-type">${typeLabel[log.type] || log.type}</span>
        <p class="history-text">${log.text}</p>
        <span class="history-ts">${log.ts}</span>
      </div>
    </div>`).join('');

  $('#clearHistory').onclick = () => {
    if (confirm('确认清除所有学习记录？')) {
      localStorage.removeItem('civ_history');
      renderHistoryTimeline();
    }
  };
}

// ════════════════════════════════════════════════
// KEYBOARD & GLOBAL EVENTS
// ════════════════════════════════════════════════
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeEvent();
});
$('#event-overlay').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeEvent();
});
window.addEventListener('resize', () => positionFigure());

// ════════════════════════════════════════════════
// 史前文明系统
// ════════════════════════════════════════════════

let activePreEraId = null;
let preAiHistory = {}; // era id → chat messages array

// ── 角色性别选择 Character Gender Selection ──────────
// 角色选择功能已移除（无实际功能链接）
function loadCharacterPref() { /* no-op */ }

function scrollToPreLayer(id) {
  const body = document.getElementById('preEraBody');
  const target = document.getElementById(id);
  if (!body || !target) return;
  // 在手风琴模式下，先展开
  if (target.classList.contains('accordion-section')) {
    expandAccordionSection(target);
  }
  // 等动画启动后再滚
  setTimeout(() => {
    body.scrollTo({ top: target.offsetTop - 10, behavior: 'smooth' });
  }, 80);
}

// ══════════════════════════════════════════════
// 🎵 手风琴：每层只剩标题，点击展开内容
// ══════════════════════════════════════════════
function initAccordion(body) {
  const sections = body.querySelectorAll('.pre-layer');
  sections.forEach((sec, i) => {
    const header = sec.querySelector('.pl-header');
    if (!header) return;

    // 把 .pl-header 之后的所有内容包进 .pl-body 容器
    const allChildren = Array.from(sec.children);
    const headerIdx = allChildren.indexOf(header);
    const bodyEls = allChildren.slice(headerIdx + 1);
    if (bodyEls.length > 0) {
      const bodyDiv = document.createElement('div');
      bodyDiv.className = 'pl-body';
      bodyEls.forEach(el => bodyDiv.appendChild(el));
      sec.appendChild(bodyDiv);
    }

    // 给 header 加箭头指示
    if (!header.querySelector('.accordion-arrow')) {
      const arrow = document.createElement('span');
      arrow.className = 'accordion-arrow';
      arrow.textContent = '▼';
      header.appendChild(arrow);
    }

    sec.classList.add('accordion-section');
    // 默认：第一个展开，其他折叠
    if (i === 0) sec.classList.add('expanded');
    else sec.classList.add('collapsed');

    // header 整行可点击
    header.style.cursor = 'pointer';
    header.addEventListener('click', (e) => {
      // 防止点击 header 内的按钮误触发
      if (e.target.closest('a, button')) return;
      toggleAccordionSection(sec);
    });
  });
}

function toggleAccordionSection(section) {
  if (section.classList.contains('expanded')) {
    // 当前展开 → 收起
    section.classList.remove('expanded');
    section.classList.add('collapsed');
    return;
  }
  expandAccordionSection(section);
}

function expandAccordionSection(section) {
  // 收起所有其他
  const allSections = section.parentElement.querySelectorAll('.pre-layer.accordion-section');
  allSections.forEach(s => {
    if (s !== section) {
      s.classList.remove('expanded');
      s.classList.add('collapsed');
    }
  });
  // 展开自己
  section.classList.remove('collapsed');
  section.classList.add('expanded');
}

// ── Screen 4: 史前总览 ────────────────────────────
function showPreOverview() {
  showScreen('s-pre-overview');
  $('#preIntroText').textContent = PREHISTORIC.unit.intro;
  renderPreEraGrid();
  $('#preHomeBtn').onclick = () => showScreen('s-home');
  logHistory('lesson_view', '进入史前文明单元总览');
}

function renderPreEraGrid() {
  const grid = $('#preEraGrid');
  grid.innerHTML = PREHISTORIC.periods.map((p, i) => `
    <div class="pre-era-card" onclick="enterPreEra('${p.id}')" style="--pcolor:${p.color}">
      <div class="pec-num">时代 ${i+1}/8</div>
      <div class="pec-icon">${p.icon}</div>
      <div class="pec-time">${p.time}</div>
      <h3 class="pec-title">${p.title}</h3>
      <p class="pec-snap">${p.snapshot.slice(0,80)}…</p>
      <div class="pec-bar"><div class="pec-bar-fill" style="width:${p.timeline.position_pct}%"></div></div>
      <div class="pec-cta">9层深探 →</div>
    </div>`).join('');
}

// ── Screen 5: 史前时代 9层 ────────────────────────
function enterPreEra(id) {
  activePreEraId = id;
  const period = PREHISTORIC.periods.find(p => p.id === id);
  if (!period) return;
  showScreen('s-pre-era');
  renderPreEra(period);
  $('#preEraBackBtn').onclick = () => {
    // 直接返回到首页的「史前文明阶段详情」（保持用户在阶段卡片视图）
    homeViewState = { mode: 'stage', stageId: 'STAGE_00' };
    showScreen('s-home');
    renderStageDetail('STAGE_00');
  };
  logHistory('lesson_view', `史前探索：${period.time} · ${period.title}`);
  // 刷新闯关进度卡片（timeline 自动标记完成）
  setTimeout(() => refreshAutoAdvanceCard(), 100);
}

function renderPreEra(p) {
  // Topbar
  $('#preEraTopInfo').innerHTML = `<span class="pre-era-top-icon">${p.icon}</span><div><strong>${p.title}</strong><span>${p.time}</span></div>`;

  // 🆕 Phase B：如果有完整知识网络，使用图谱模式（替代手风琴）
  if (p.knowledge_network && p.knowledge_network.hub && p.knowledge_network.hub.detail) {
    return renderPreEraGraphMode(p);
  }

  // 兜底：旧版手风琴布局
  // Layer pills
  $('#preLayerPills').innerHTML = PREHISTORIC.LAYERS.map(l =>
    `<button class="pre-layer-pill" onclick="scrollToPreLayer('pre-${l.id}')">${l.icon} ${l.label}</button>`
  ).join('');

  const body = $('#preEraBody');
  body.innerHTML = [
    renderKnowledgeNetworkLayer(p),
    renderScenarioLayer(p),
    renderPreLayer1(p),
    renderPreLayer2(p),
    renderPreLayer3(p),
    renderPreLayer4(p),
    renderPreLayer5(p),
    renderPreLayer6(p),
    renderPreLayer7(p),
    renderPreLayer8(p),
    renderPreLayer9(p),
  ].join('');

  // Bind scenario interactions
  if (p.scenario) bindScenarioInteractions(p);
  if (p.knowledge_network) bindKnowledgeNetwork(p);

  // 🎵 手风琴模式：每层默认折叠，点击标题展开
  initAccordion(body);

  // Bind region tabs
  const rtabs = body.querySelectorAll('.preg-tab');
  rtabs.forEach(tab => {
    tab.onclick = () => {
      rtabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const rid = tab.dataset.rid;
      const region = p.regions.find(r => r.id === rid);
      if (region) renderPreRegionDetail(region, body.querySelector('#preRegionDetail'));
    };
  });
  if (p.regions[0]) renderPreRegionDetail(p.regions[0], body.querySelector('#preRegionDetail'));

  // Bind AI
  const aiSend = body.querySelector('#preAISend');
  const aiInp = body.querySelector('#preAIInput');
  if (aiSend && aiInp) {
    aiSend.onclick = () => sendPreAIMsg(p, aiInp, body.querySelector('#preAIMsgs'));
    aiInp.onkeydown = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendPreAIMsg(p, aiInp, body.querySelector('#preAIMsgs')); } };
    // suggestion chips
    body.querySelectorAll('#preAISuggestions .suggestion-chip').forEach(btn => {
      btn.onclick = () => { aiInp.value = btn.textContent; sendPreAIMsg(p, aiInp, body.querySelector('#preAIMsgs')); };
    });
    // init welcome
    if (!preAiHistory[p.id]) {
      preAiHistory[p.id] = [];
      const userName = (getUserProfile()||{}).nickname || '朋友';
      addPreAIMsg(body.querySelector('#preAIMsgs'), 'ai', `${userName}你好！我是史前探索助手 🌍<br>我会从维基百科帮${userName}查阅关于<strong>${p.time}·${p.title}</strong>的内容。<br>${userName}可以问我：<em>${p.ai.suggested_questions[0]}</em>`);
    } else {
      const msgsEl = body.querySelector('#preAIMsgs');
      preAiHistory[p.id].forEach(m => addPreAIMsg(msgsEl, m.role, m.html));
    }
  }

  // Bind notes
  const noteSave = body.querySelector('#preNoteSave');
  if (noteSave) {
    noteSave.onclick = () => {
      const note = body.querySelector('#preNotepad').value.trim();
      if (!note) return;
      logHistory('pre_note', `史前笔记(${p.time})：${note.slice(0,40)}`);
      noteSave.textContent = '✓ 已保存';
      setTimeout(() => { noteSave.textContent = '保存笔记'; }, 1800);
    };
  }

  body.scrollTo(0, 0);
}

// ══════════════════════════════════════════════
// 🕸 Phase B · L1 课程图谱模式
// 整页就是一张知识网络，点节点 → 详情卡 → 详情内有节点链接 → 继续探索
// ══════════════════════════════════════════════
function renderPreEraGraphMode(p) {
  const kn = p.knowledge_network;

  // Hide accordion layer pills
  $('#preLayerPills').innerHTML = '';

  // 🆕 图片底板模式
  if (kn.layout === 'image_overlay' && kn.image && kn.hotspots) {
    return renderImageOverlayMode(p);
  }

  const body = $('#preEraBody');
  body.innerHTML = `
    <div class="kg-page">
      <div class="kg-graph-pane" id="kgGraphPane">
        ${renderPlayArea(p, kn)}
        ${renderGraphSvg(p, kn)}
      </div>
      <div class="kg-detail-pane" id="kgDetailPane">
        ${renderHubDetailCard(kn, p)}
      </div>
    </div>
  `;

  bindGraphPage(p);
  body.scrollTo(0, 0);
}

// 🎮 互动·娱乐区（独立于主课程网络）
function renderPlayArea(p, kn) {
  const plays = kn.play_nodes || [];
  if (plays.length === 0) return '';
  const cards = plays.map(n => `
    <button class="kg-play-card" data-nid="${n.id}" style="--play-color:${n.color}">
      <span class="kg-play-icon">${n.icon}</span>
      <div class="kg-play-text">
        <strong>${n.label}</strong>
        <span>${n.sub}</span>
      </div>
    </button>`).join('');
  return `<div class="kg-play-area">
    <div class="kg-play-header">
      <span class="kg-play-tag">🎮 互动 · 娱乐</span>
      <span class="kg-play-note">不属于课程主线，可随时来玩</span>
    </div>
    <div class="kg-play-row">${cards}</div>
  </div>`;
}

// 构造完整节点列表 — 优先使用显式 x,y；兜底用 angle/ring 计算
// ══════════════════════════════════════════════════════
// 🖼 图片底板 + 热点泡泡模式 (Image Overlay Layout)
// ══════════════════════════════════════════════════════
function renderImageOverlayMode(p) {
  const kn = p.knowledge_network;
  const hotspots = kn.hotspots || [];

  // 渲染热点泡泡 + SVG 连接线
  const bubbles = hotspots.map((h, i) => `
    <button class="img-hotspot" data-nid="${h.id}"
            style="left:${h.pos_x}%;top:${h.pos_y}%;--delay:${i * 0.15}s">
      <span class="img-hotspot-pulse"></span>
      <span class="img-hotspot-num">${i + 1}</span>
      <span class="img-hotspot-label">${h.icon} ${h.label}</span>
    </button>`).join('');

  // 按时间顺序的连接线（SVG 上）
  const connections = hotspots.length > 1
    ? hotspots.slice(0, -1).map((h, i) => {
        const next = hotspots[i + 1];
        return `<line x1="${h.pos_x}%" y1="${h.pos_y}%" x2="${next.pos_x}%" y2="${next.pos_y}%"
          stroke="#c84820" stroke-width="2" stroke-dasharray="5,5" stroke-opacity="0.5"
          stroke-linecap="round"/>`;
      }).join('')
    : '';

  const body = $('#preEraBody');
  body.innerHTML = `
    <div class="img-overlay-page">

      <!-- 顶部工具栏 -->
      <div class="img-overlay-toolbar">
        <span class="img-overlay-title">🌳 人类起源完整时间轴</span>
        <span class="img-overlay-hint">点击图上 ① ~ ⑦ 任意泡泡，深入了解每个时代</span>
        <div class="img-overlay-actions">
          <button class="img-tool-chip" onclick="showImageOverlayPlay('hub')">📜 总览</button>
          <button class="img-tool-chip" onclick="showFullscreenMap()">🗺 地图</button>
          <button class="img-tool-chip" onclick="showImageOverlayPlay('scenario')">🎮 时光机</button>
          <button class="img-tool-chip" onclick="showImageOverlayPlay('story')">📖 故事</button>
          <button class="img-tool-chip" onclick="showImageOverlayPlay('ai')">🤖 问 AI</button>
          <span class="img-tool-sep">|</span>
          <button class="img-tool-chip img-tool-nav" onclick="goToPrevLesson()" title="上一课">◀</button>
          <button class="img-tool-chip img-tool-nav img-tool-next" onclick="goToNextLesson()" title="下一课">下一课 ▶</button>
        </div>
      </div>

      <!-- 大图 + 热点叠层（图与泡泡同处一个 stage 容器，坐标对齐） -->
      <div class="img-overlay-canvas" id="imgOverlayCanvas">
        <div class="img-overlay-stage">
          <img class="img-overlay-bg" src="${kn.image}" alt="${p.title}"/>
          <svg class="img-overlay-svg" preserveAspectRatio="none">
            ${connections}
          </svg>
          ${bubbles}
        </div>
      </div>

      <!-- 浮动详情卡（点击泡泡后弹出） -->
      <div class="img-overlay-detail hidden" id="imgOverlayDetail"></div>

      <!-- 🗺 全屏迁徙地图 modal（点击工具栏 🗺 地图 弹出）-->
      <div class="fullscreen-map-modal hidden" id="fullscreenMapModal"></div>

    </div>
  `;

  // 绑定泡泡点击
  body.querySelectorAll('.img-hotspot').forEach(btn => {
    btn.addEventListener('click', () => {
      showImageOverlayDetail(btn.getAttribute('data-nid'));
    });
  });

  // ESC 关闭详情
  document.addEventListener('keydown', escCloseDetail);

  body.scrollTo(0, 0);
}

function escCloseDetail(e) {
  if (e.key === 'Escape') {
    const det = document.getElementById('imgOverlayDetail');
    if (det) det.classList.add('hidden');
  }
}

// 显示某个热点的详情卡
function showImageOverlayDetail(nodeId) {
  const p = PREHISTORIC.periods.find(x => x.id === activePreEraId);
  if (!p) return;
  const kn = p.knowledge_network;

  // 高亮当前泡泡
  document.querySelectorAll('.img-hotspot').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-nid') === nodeId);
  });

  let html;
  let hotspotIndex = -1;
  if (nodeId === 'hub') {
    html = renderHubDetailCard(kn, p);
  } else {
    // 从 hotspots 中找节点（用 hotspot 的 meta + 旧 nodes 的 detail）
    const hotspot = (kn.hotspots || []).find(h => h.id === nodeId);
    hotspotIndex = (kn.hotspots || []).findIndex(h => h.id === nodeId);
    const fullNode = (kn.nodes || []).find(n => n.id === nodeId) || hotspot;
    if (!fullNode) return;
    const node = { ...fullNode, ...(hotspot || {}), color: '#c84820' };
    html = renderConceptDetailCard(node, kn, p);
  }

  const det = document.getElementById('imgOverlayDetail');
  det.innerHTML = `
    <button class="img-detail-close" onclick="document.getElementById('imgOverlayDetail').classList.add('hidden')">✕</button>
    ${html}
  `;
  det.classList.remove('hidden');

  // 🔄 自动滚动：如果详情卡不在视口内（点了下面的泡泡），把它滚到可视范围
  requestAnimationFrame(() => {
    const rect = det.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.top < 0 || rect.top > vh * 0.6 || rect.bottom > vh) {
      // 滚到让详情卡顶部在视口 80px 处
      const scrollContainer = det.closest('.screen, .pre-era-body, body') || document.scrollingElement;
      const detTopAbs = rect.top + scrollContainer.scrollTop;
      scrollContainer.scrollTo({ top: detTopAbs - 100, behavior: 'smooth' });
    }
  });

  // 绑定相关节点 chip
  det.querySelectorAll('.kg-related-chip').forEach(btn => {
    btn.onclick = () => showImageOverlayDetail(btn.getAttribute('data-goto'));
  });

  // 追踪用户兴趣
  if (typeof trackUserQuestion === 'function') {
    const hotspot = (kn.hotspots || []).find(h => h.id === nodeId);
    trackUserQuestion('查看：' + (hotspot ? hotspot.label : nodeId), p.id);
  }

  // 🎯 自动推进：点击最后一个泡泡（⑦）→ 3 秒后自动打开地图
  const total = (kn.hotspots || []).length;
  if (hotspotIndex === total - 1 && total > 0) {
    showAutoAdvanceHint('看完最后一个时代了 · 3 秒后自动打开 🗺 迁徙地图', () => {
      document.getElementById('imgOverlayDetail')?.classList.add('hidden');
      showFullscreenMap();
    });
  }
}

// 在屏幕底部短暂显示一个 toast，3 秒后执行回调；可手动取消
let _autoAdvanceTimer = null;
function showAutoAdvanceHint(text, onFire, delayMs = 3000) {
  clearTimeout(_autoAdvanceTimer);
  let toast = document.getElementById('autoAdvanceToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'autoAdvanceToast';
    toast.className = 'auto-advance-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <span class="aat-text">${text}</span>
    <button class="aat-go" onclick="fireAutoAdvanceNow()">立即进入</button>
    <button class="aat-cancel" onclick="cancelAutoAdvance()">取消</button>
  `;
  toast.classList.add('visible');
  window._aaCallback = onFire;
  _autoAdvanceTimer = setTimeout(() => {
    toast.classList.remove('visible');
    if (window._aaCallback) { window._aaCallback(); window._aaCallback = null; }
  }, delayMs);
}
function fireAutoAdvanceNow() {
  clearTimeout(_autoAdvanceTimer);
  document.getElementById('autoAdvanceToast')?.classList.remove('visible');
  if (window._aaCallback) { window._aaCallback(); window._aaCallback = null; }
}
function cancelAutoAdvance() {
  clearTimeout(_autoAdvanceTimer);
  document.getElementById('autoAdvanceToast')?.classList.remove('visible');
  window._aaCallback = null;
}

// ════════════════════════════════════════════════════════════════
// 🗿 化石点深度知识库（每个点的策展式内容，避免给小孩看维基百科原文）
// 数据来源：A 级（Smithsonian / Nature / Cleveland Museum / 论文）
// ════════════════════════════════════════════════════════════════
const FOSSIL_KNOWLEDGE = {
  sahel: {
    full_name: 'Sahelanthropus tchadensis · 萨赫勒人乍得种',
    nickname: 'Toumaï（图迈，乍得语意为"生命的希望"）',
    discovered: '2001 年，乍得 Djurab 沙漠，由 Michel Brunet 团队',
    age: '约 700–600 万年前',
    location: '乍得（中非）',
    what_we_have: '一个几乎完整的颅骨 (TM 266-01-060-1)、5 块下颌骨碎片、若干牙齿',
    why_important: [
      '目前已知最早可能属于人类系谱的化石之一',
      '位于非洲中部，而不是东非——挑战"东非摇篮"单一假说',
      '颅底显示枕骨大孔位置可能已经偏前，暗示双足行走的可能',
    ],
    body: '700 万年前，人类祖先和黑猩猩祖先刚刚分开不久。这个时期的化石极度稀少。Toumaï 是这个关键时间窗的少数证据。但因为只有颅骨没有下半身，是否已经直立行走仍有争议。',
    misconceptions: [
      '❌ 不要说 Toumaï 是"人类"——它可能是人类和黑猩猩共同祖先附近的物种',
      '❌ 不要说"它会走路"——证据有限，学界仍在争论',
    ],
    sources: [
      'Brunet et al. (2002). A new hominid from the Upper Miocene of Chad. Nature 418.',
      'Smithsonian Human Origins · Sahelanthropus',
    ],
  },
  orrorin: {
    full_name: 'Orrorin tugenensis · 千禧人',
    nickname: 'Millennium Man（千禧人，因 2000 年发现而得名）',
    discovered: '2000 年，肯尼亚 Tugen Hills，Senut & Pickford 团队',
    age: '约 610–580 万年前',
    location: '肯尼亚（东非）',
    what_we_have: '13 块化石：股骨片段、上臂骨、手指骨、牙齿',
    why_important: [
      '股骨形态显示"已经能习惯性双足行走"',
      '牙齿小而厚珐琅质——更像后来的人类，而不像猿类',
      '比 Lucy 早 300 万年，可能改写双足直立的起源时间',
    ],
    body: '股骨是判断"走不走路"的关键骨头。Orrorin 的股骨颈短而粗，受力方向显示它会用两条腿走路。这是目前最早能直立行走的人类祖先化石证据之一。',
    misconceptions: [
      '❌ 不要说"千禧人发明了直立行走"——直立行走是逐渐演化的，不是单一发明',
    ],
    sources: [
      'Senut, Pickford et al. (2001). First hominid from the Miocene. C.R. Acad. Sci. 332.',
      'Richmond & Jungers (2008). Orrorin tugenensis femoral morphology. Science 319.',
    ],
  },
  ardi: {
    full_name: 'Ardipithecus ramidus · 始祖地猿',
    nickname: 'Ardi（阿尔迪，阿法语意为"地面"）',
    discovered: '1994 年开始发掘，2009 年正式发表。埃塞俄比亚 Afar 地区，Tim White 团队',
    age: '约 440 万年前',
    location: '埃塞俄比亚（东非阿法洼地）',
    what_we_have: '110 多块化石，包括相当完整的女性骨架 ARA-VP-6/500（约 50% 完整度）',
    why_important: [
      '能直立行走，但也保留爬树能力——是"过渡形态"',
      '牙齿、骨盆、脚趾都和今天的黑猩猩很不一样，说明黑猩猩并不代表"原始状态"',
      '生活在森林环境，挑战了"草原驱动直立"的传统假说',
    ],
    body: 'Ardi 改变了我们对早期人类祖先的理解。她没有像黑猩猩那样长长的犬齿，骨盆已经适应双足，但拇趾仍然是分开的（能抓树枝）。她证明"直立行走"和"丛林生活"可以共存。',
    misconceptions: [
      '❌ 不要说"Ardi 是 Lucy 的祖母"——她们之间相隔 100 多万年',
      '❌ 不要说"现代黑猩猩长这样就是原始的人类"——黑猩猩自己也演化了 600 万年',
    ],
    sources: [
      'White et al. (2009). Ardipithecus ramidus and the Paleobiology of Early Hominids. Science 326 (Special Issue).',
      'Lovejoy (2009). Reexamining Human Origins. Science.',
    ],
  },
  lucy: {
    full_name: 'Australopithecus afarensis · 阿法南方古猿',
    nickname: 'Lucy（露西，编号 AL 288-1，1974 年发现时听 Beatles 的"Lucy in the Sky with Diamonds"得名）',
    discovered: '1974 年 11 月 24 日，埃塞俄比亚 Hadar，Donald Johanson & Tom Gray 发现',
    age: '约 318 万年前',
    location: '埃塞俄比亚 Hadar（东非阿法洼地）',
    what_we_have: '47 块骨头碎片，约 40% 完整骨架——是当时最完整的早期人类化石',
    why_important: [
      '骨盆和股骨证明她**完全双足直立**',
      '脑容量约 380-430 cc，与黑猩猩相当——证明"先直立，后脑大"',
      '身高约 1.05 米，体重约 28 公斤，可能是年轻女性',
      '1976 年坦桑尼亚 Laetoli 发现 360 万年前的同种脚印，进一步证实直立',
    ],
    body: 'Lucy 是人类古生物学史上最有名的化石。她颠覆了一个旧观念：人类不是先有大脑袋，再学会走路；而是先走路，再过了 200 多万年大脑才开始变大。她让我们知道：使用双手做事、用工具，比"聪明"更早出现。',
    misconceptions: [
      '❌ Lucy 不是"第一个人"——她是南方古猿，不是 Homo 属',
      '❌ Lucy 不是"我们直接的祖先"——她可能是直系祖先的近亲，证据未定',
      '❌ Lucy 不是孤独一人——同地点出土多个个体（"第一家庭"AL 333）',
    ],
    sources: [
      'Johanson & Edey (1981). Lucy: The Beginnings of Humankind. Simon & Schuster.',
      'Cleveland Museum of Natural History · Lucy 馆藏',
      'Kimbel & Delezene (2009). "Lucy" redux. Yearbook of Physical Anthropology 52.',
    ],
  },
  olduvai: {
    full_name: 'Olduvai Gorge · 奥杜瓦伊峡谷（早期 Homo + Oldowan 石器）',
    nickname: '"人类的摇篮"（被联合国教科文组织列为世界遗产）',
    discovered: '1959 年 Mary Leakey 发现 Zinjanthropus；1960 年发现 Homo habilis 化石',
    age: '约 200–180 万年前（最古老地层 OH 24 约 180 万年）',
    location: '坦桑尼亚北部（东非）',
    what_we_have: 'Homo habilis (OH 7, OH 24)、Paranthropus boisei (OH 5 "Zinj")、世界最早成体系石器组合 (Oldowan 工业)',
    why_important: [
      '世界上**最早**的成体系石器（Oldowan）出土地之一',
      'Homo habilis（"能人"）首次被识别——属名 Homo 的起点',
      '同一地层同时出土多种古人类，说明当时不止一种"人"在地球上',
      '为"非洲是人类摇篮"理论提供决定性证据',
    ],
    body: '奥杜瓦伊峡谷有完整的 200 万年地层序列，像一本翻开的史前书。Mary Leakey 用 30 年时间发掘，证明非洲东部就是早期人类的核心舞台。Oldowan 石器（用一块石头敲另一块，得到锋利边缘）是人类技术的"第一页"。',
    misconceptions: [
      '❌ Zinjanthropus（"Zinj"）不是 Homo——是 Paranthropus，旁支',
      '❌ Oldowan 石器虽简单，但需要规划——不是"随便打个石头"',
    ],
    sources: [
      'Leakey, M.D. (1971). Olduvai Gorge: Excavations in Beds I and II. Cambridge.',
      'UNESCO World Heritage · Ngorongoro Conservation Area (含 Olduvai)',
      'Plummer (2004). Flaked stones and old bones. Yearbook of Physical Anthropology 47.',
    ],
  },
  turkana: {
    full_name: 'Lake Turkana 化石区 · Homo erectus (Turkana Boy)',
    nickname: 'Turkana Boy（图尔卡纳男孩，编号 KNM-WT 15000）',
    discovered: '1984 年 Kamoya Kimeu 在肯尼亚 Nariokotome 发现',
    age: '约 160 万年前',
    location: '肯尼亚图尔卡纳湖西岸（东非）',
    what_we_have: 'Homo erectus 青少年男性骨架，约 90% 完整——史上最完整的早期 Homo 化石之一',
    why_important: [
      '身高已接近现代人（推测成人 ~1.85 米），骨架比例现代化',
      '脑容量 ~880 cc，远大于 Lucy，但仍小于现代人 (~1400 cc)',
      'Homo erectus 是**第一个走出非洲**的人类祖先，扩散到欧亚',
      '出土处同地层有 Acheulean 石器（手斧）——技术大跃迁',
    ],
    body: '图尔卡纳男孩去世时大约 8-12 岁，但身高已超过 1.5 米。Homo erectus 是史前史上的"超级旅行者"——他们从非洲走到了今天的格鲁吉亚、印尼爪哇、中国周口店。他们已经会用火（约 100 万年前的 Wonderwerk 洞证据）。',
    misconceptions: [
      '❌ Turkana Boy 不是"成年人"——他是青少年',
      '❌ Homo erectus 不是"原始智人"——他们是独立物种，在地球上存在 200 万年（比智人长得多）',
    ],
    sources: [
      'Walker & Leakey (1993). The Nariokotome Homo erectus Skeleton. Harvard University Press.',
      'Smithsonian Human Origins · Turkana Boy',
      'Anton (2003). Natural history of Homo erectus. Yearbook of Physical Anthropology 46.',
    ],
  },
  jebel: {
    full_name: 'Jebel Irhoud · 摩洛哥智人 (Homo sapiens)',
    nickname: '"最古老的智人"（2017 年改写教科书的发现）',
    discovered: '1961 年首次发现，2017 年由 Jean-Jacques Hublin 团队重新测年并发表 Nature',
    age: '约 315,000 年前（315 ± 34 ka）',
    location: '摩洛哥 Jebel Irhoud（北非）',
    what_we_have: '至少 5 个个体的颅骨、下颌、四肢化石；同地层 Levallois 石器、烧过的动物骨头（用火证据）',
    why_important: [
      '将智人起源推前 10 万年（之前认为最早是 Omo Kibish 约 195 ka）',
      '位于北非，而不是东非——支持"泛非洲起源"模型',
      '面部已经"现代"（扁平、有下巴雏形），但颅腔仍较长（不完全圆）',
      '证明智人是在整个非洲不同区域共同演化，不是单一群体突变',
    ],
    body: 'Jebel Irhoud 1 颅骨改变了人类起源叙事。2017 年之前，大多数教科书写"智人 20 万年前出现在东非"。这个发现说：30 万年前在北非，已经有了"几乎是我们"的人。同地层有用火痕迹、有 Levallois 技术（需要预先规划的石器制法）。',
    misconceptions: [
      '❌ Jebel Irhoud 不是"完全的现代人"——颅腔形状仍是过渡形态',
      '❌ 不要说"智人 30 万年前突然出现"——是逐渐演化的最早化石证据',
    ],
    sources: [
      'Hublin et al. (2017). New fossils from Jebel Irhoud, Morocco, and the pan-African origin of Homo sapiens. Nature 546:289-292.',
      'Richter et al. (2017). The age of the hominin fossils from Jebel Irhoud, Morocco. Nature 546.',
      'Smithsonian Human Origins · Jebel Irhoud',
    ],
  },
  omo: {
    full_name: 'Omo Kibish · 早期智人',
    nickname: 'Omo I 与 Omo II（编号化石）',
    discovered: '1967 年 Richard Leakey 团队发现，2005 年与 2022 年重新测年',
    age: '约 233,000 年前（2022 年最新研究）',
    location: '埃塞俄比亚 Omo Kibish（东非）',
    what_we_have: 'Omo I 颅骨与部分骨骼（解剖学上更"现代"）、Omo II 颅骨（较原始）——同地层但形态不同',
    why_important: [
      '此前被认为是最早智人（195 ka），2022 年新测年推至 233 ka',
      'Omo I 颅腔已经接近现代圆球形，是真正的"解剖学现代人"',
      '与 Jebel Irhoud 一起，证明智人在 30 万-20 万年间分布于非洲多地',
    ],
    body: 'Omo 化石位于火山灰沉积层中，用钾-氩定年和氩-氩定年可以精确测年。2022 年 Vidal 等人通过新的火山灰对比，把年代推到约 23 万年前。Omo I 头骨比 Jebel Irhoud 更"现代"，说明智人形态在 23 万年前已基本完成。',
    misconceptions: [
      '❌ Omo I 和 Omo II 不是同一物种——形态差异显著，可能 II 是更早期形态',
    ],
    sources: [
      'McDougall, Brown, Fleagle (2005). Stratigraphic placement and age of modern humans from Kibish, Ethiopia. Nature 433.',
      'Vidal et al. (2022). Age of the oldest known Homo sapiens from eastern Africa. Nature 601.',
      'Smithsonian Human Origins · Omo Kibish',
    ],
  },
};

// 🪟 通用全屏 modal 渲染器（所有工具栏按钮统一使用）
function showFullscreenContent({ icon, title, subtitle, html, sidebarHtml, stepKey }) {
  let modal = document.getElementById('fullscreenContentModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'fullscreenContentModal';
    modal.className = 'fullscreen-content-modal hidden';
    document.body.appendChild(modal);
  }
  // 自动推进：根据当前 stepKey 推算下一步
  const nextMap = { map: 'story', story: 'scenario', scenario: 'next', hub: 'map', ai: 'next', evolution_map: 'story' };
  const nextStep = stepKey ? nextMap[stepKey] : null;
  const nextLabels = { map: '🗺 地图', story: '📖 故事', scenario: '🎮 时光机', next: '→ 下一课' };
  const nextBtn = nextStep ? (nextStep === 'next'
    ? `<button class="fs-next-btn fs-next-lesson" onclick="goToNextLesson()">${nextLabels.next}</button>`
    : `<button class="fs-next-btn" onclick="advanceToNextStep('${nextStep}')">继续 → ${nextLabels[nextStep]}</button>`)
    : '';

  modal.innerHTML = `
    <div class="fs-content-header">
      <div class="fs-content-title">
        <span class="fs-content-icon">${icon}</span>
        <div>
          <h2>${title}</h2>
          <p>${subtitle || ''}</p>
        </div>
      </div>
      <div class="fs-content-header-actions">
        ${nextBtn}
        <button class="fs-content-close" onclick="closeFullscreenAndMaybeAdvance('${stepKey || ''}')">✕ 关闭</button>
      </div>
    </div>
    <div class="fs-content-body ${sidebarHtml ? 'has-sidebar' : ''}">
      <div class="fs-content-main">${html}</div>
      ${sidebarHtml ? `<div class="fs-content-sidebar">${sidebarHtml}</div>` : ''}
    </div>
  `;
  modal.classList.remove('hidden');
  // 标记进度
  if (stepKey) markStepCompleted(stepKey);
}

// ════════════════════════════════════════════════════════════════
// 🎯 自动推进 / 闯关进度
// ════════════════════════════════════════════════════════════════
function markStepCompleted(step) {
  const p = PREHISTORIC.periods.find(x => x.id === activePreEraId);
  if (!p) return;
  const key = 'civ_steps_' + p.id;
  let steps = {};
  try { steps = JSON.parse(localStorage.getItem(key) || '{}'); } catch {}
  steps[step] = Date.now();
  localStorage.setItem(key, JSON.stringify(steps));
  // 更新进度条 UI
  refreshAutoAdvanceCard();
}

function refreshAutoAdvanceCard() {
  const card = document.getElementById('autoAdvanceCard');
  if (!card) return;
  const p = PREHISTORIC.periods.find(x => x.id === activePreEraId);
  if (!p) return;
  let steps = {};
  try { steps = JSON.parse(localStorage.getItem('civ_steps_' + p.id) || '{}'); } catch {}
  // timeline 看到就算完成（自动标）
  steps.timeline = steps.timeline || Date.now();
  localStorage.setItem('civ_steps_' + p.id, JSON.stringify(steps));

  card.querySelectorAll('.aac-step').forEach(s => {
    const step = s.getAttribute('data-step');
    s.classList.toggle('done', !!steps[step]);
  });
  // 决定下一步按钮文案
  const order = ['timeline','map','story','scenario'];
  let nextStep = null;
  for (const st of order) { if (!steps[st]) { nextStep = st; break; } }
  if (!nextStep) nextStep = 'next';
  const btn = card.querySelector('.aac-next');
  const skipBtn = card.querySelector('.aac-skip');
  // 显示下一课信息
  const periods = PREHISTORIC.periods;
  const idx = periods.findIndex(x => x.id === activePreEraId);
  const nextLesson = (idx >= 0 && idx + 1 < periods.length) ? periods[idx + 1] : null;
  const nextLessonLabel = nextLesson ? `${nextLesson.title}（${nextLesson.time}）` : '完成全部课程 🎉';

  if (btn) {
    if (nextStep === 'next') {
      // 全部完成 — 大按钮 + 显示具体下一课名 + 隐藏跳过按钮
      btn.innerHTML = `🎉 本节全部完成 · 进入下一课<br><span class="aac-next-sub">${nextLessonLabel}</span>`;
      btn.onclick = () => goToNextLesson();
      btn.classList.add('aac-done');
      if (skipBtn) skipBtn.style.display = 'none';
    } else {
      const labels = { map: '🗺 地图', story: '📖 故事', scenario: '🎮 时光机' };
      btn.textContent = `下一步 → ${labels[nextStep]}`;
      btn.onclick = () => advanceToNextStep(nextStep);
      btn.classList.remove('aac-done');
      // 跳过按钮显示具体下一课
      if (skipBtn) {
        skipBtn.style.display = '';
        skipBtn.textContent = nextLesson ? `跳过 → ${nextLesson.title}` : '完成本节';
      }
    }
  }
}

function advanceToNextStep(step) {
  if (step === 'map') showFullscreenMap();
  else if (step === 'story') showImageOverlayPlay('story');
  else if (step === 'scenario') showImageOverlayPlay('scenario');
  else if (step === 'next') goToNextLesson();
}

function closeFullscreenAndMaybeAdvance(stepKey) {
  const modal = document.getElementById('fullscreenContentModal');
  modal?.classList.add('hidden');
  refreshAutoAdvanceCard();
}

function goToNextLesson() {
  // 关闭所有 modal
  document.getElementById('fullscreenContentModal')?.classList.add('hidden');
  document.getElementById('fullscreenMapModal')?.classList.add('hidden');
  const periods = PREHISTORIC.periods;
  const idx = periods.findIndex(x => x.id === activePreEraId);
  if (idx < 0) return;
  // 找下一个解锁的课
  for (let i = idx + 1; i < periods.length; i++) {
    if (DEMO_UNLOCKED_LESSONS.includes(periods[i].id)) {
      enterPreEra(periods[i].id);
      return;
    }
  }
  // 没有更多解锁课程
  alert('🎉 这是当前样板版本最后一课！\n更多内容正在准备中，敬请期待。');
}

function goToPrevLesson() {
  document.getElementById('fullscreenContentModal')?.classList.add('hidden');
  document.getElementById('fullscreenMapModal')?.classList.add('hidden');
  const periods = PREHISTORIC.periods;
  const idx = periods.findIndex(x => x.id === activePreEraId);
  if (idx > 0) enterPreEra(periods[idx - 1].id);
}

function closeMapAndAdvance(justClose) {
  document.getElementById('fullscreenMapModal')?.classList.add('hidden');
  refreshAutoAdvanceCard();
  if (!justClose) {
    setTimeout(() => showImageOverlayPlay('story'), 250);
  }
}

// 渲染单个化石点的策展式深度内容
function renderFossilDetail(fossilId) {
  const k = FOSSIL_KNOWLEDGE[fossilId];
  if (!k) return '<p class="fs-empty">这个化石点的深度知识正在整理中。</p>';
  return `
    <div class="fossil-detail">
      <div class="fd-head">
        <h3 class="fd-name">${k.full_name}</h3>
        <p class="fd-nick">${k.nickname}</p>
      </div>
      <div class="fd-meta-grid">
        <div class="fd-meta"><span class="fd-meta-label">🕰 年代</span><span class="fd-meta-val">${k.age}</span></div>
        <div class="fd-meta"><span class="fd-meta-label">📍 地点</span><span class="fd-meta-val">${k.location}</span></div>
        <div class="fd-meta"><span class="fd-meta-label">🔬 发现</span><span class="fd-meta-val">${k.discovered}</span></div>
        <div class="fd-meta"><span class="fd-meta-label">🦴 我们有什么</span><span class="fd-meta-val">${k.what_we_have}</span></div>
      </div>
      <div class="fd-section">
        <h4>📖 这个化石告诉我们什么</h4>
        <p>${k.body}</p>
      </div>
      <div class="fd-section">
        <h4>⭐ 为什么重要</h4>
        <ul class="fd-list">
          ${k.why_important.map(p => `<li>${p}</li>`).join('')}
        </ul>
      </div>
      ${k.misconceptions ? `
      <div class="fd-section fd-misconceptions">
        <h4>⚠️ 常见误解</h4>
        <ul class="fd-list">
          ${k.misconceptions.map(m => `<li>${m}</li>`).join('')}
        </ul>
      </div>` : ''}
      <div class="fd-section fd-sources">
        <h4>📚 资料来源（A 级 · 博物馆与学术文献）</h4>
        <ul class="fd-list">
          ${k.sources.map(s => `<li>${s}</li>`).join('')}
        </ul>
      </div>
    </div>`;
}

// 🗺 全屏迁徙地图（点击工具栏 🗺 地图 触发）
function showFullscreenMap() {
  const p = PREHISTORIC.periods.find(x => x.id === activePreEraId);
  if (!p || !p.map || !p.map.evolution_path) return;
  const evo = p.map.evolution_path;

  // 按时间从早到晚生成大化石点（半径更大、字号更大）
  const pathD = evo.map((pt, i) => (i === 0 ? `M ${pt.x},${pt.y}` : `L ${pt.x},${pt.y}`)).join(' ');
  const labelOffset = {
    l:  { x: -22, y:   0, anchor: 'end' },
    r:  { x:  22, y:   0, anchor: 'start' },
    t:  { x:   0, y: -28, anchor: 'middle' },
    b:  { x:   0, y:  32, anchor: 'middle' },
    tl: { x: -18, y: -22, anchor: 'end' },
    tr: { x:  18, y: -22, anchor: 'start' },
    bl: { x: -18, y:  24, anchor: 'end' },
    br: { x:  18, y:  24, anchor: 'start' },
  };
  const dots = evo.map((pt, i) => {
    const off = labelOffset[pt.label_dir || 'r'];
    const lblX = pt.x + off.x;
    const lblY = pt.y + off.y;
    return `
      <g class="fs-evo-pt" data-id="${pt.id}">
        <line x1="${pt.x}" y1="${pt.y}" x2="${lblX}" y2="${lblY}"
              stroke="#c84820" stroke-width="0.8" opacity="0.5"/>
        <circle cx="${pt.x}" cy="${pt.y}" r="16" fill="white" stroke="#c84820" stroke-width="3.5"
                filter="drop-shadow(0 3px 6px rgba(200,72,32,.5))"/>
        <text x="${pt.x}" y="${pt.y+6}" text-anchor="middle"
              font-size="18" font-weight="800" fill="#c84820"
              font-family="serif">${i+1}</text>
        <text x="${lblX}" y="${lblY-4}" text-anchor="${off.anchor}"
              font-size="13" fill="#3a1a08" font-weight="700"
              font-family="STSong,serif">${pt.time}</text>
        <text x="${lblX}" y="${lblY+10}" text-anchor="${off.anchor}"
              font-size="12" fill="#5a3a1a" font-weight="600"
              font-family="STSong,serif">${pt.name}</text>
        <text x="${lblX}" y="${lblY+24}" text-anchor="${off.anchor}"
              font-size="10" fill="#7a5530" font-style="italic">${pt.species}</text>
      </g>`;
  }).join('');

  const africaShape = `<path d="M 195,80 L 270,75 Q 320,72 360,90 L 410,110 Q 440,140 425,180 L 415,210 Q 420,235 405,260 L 395,290 Q 405,320 385,355 L 360,400 Q 340,440 305,470 L 270,490 Q 240,495 215,475 L 195,440 Q 175,400 165,355 L 155,310 Q 145,275 155,235 L 165,195 Q 175,135 195,80 Z"
    fill="#e8c890" stroke="#a06840" stroke-width="2.5" stroke-linejoin="round"/>`;
  const arabia = `<path d="M 410,140 Q 440,135 460,150 Q 470,170 458,190 Q 440,205 420,195 L 410,180 Z"
    fill="#e8c890" stroke="#a06840" stroke-width="2" opacity="0.85"/>`;
  const labels = `
    <text x="80" y="110" font-size="16" fill="#3a6aaa" opacity="0.55" font-style="italic" letter-spacing="3">大 西 洋</text>
    <text x="500" y="400" font-size="16" fill="#3a6aaa" opacity="0.55" font-style="italic" letter-spacing="3">印 度 洋</text>
    <text x="490" y="100" font-size="13" fill="#3a6aaa" opacity="0.55" font-style="italic">地中海</text>
    <text x="285" y="170" font-size="12" fill="#7a5530" opacity="0.65" letter-spacing="2">撒 哈 拉 沙 漠</text>
    <text x="375" y="320" font-size="11" fill="#7a5530" opacity="0.7" letter-spacing="2">东 非 大 裂 谷</text>
    <text x="200" y="60" font-size="20" fill="#5a3a18" opacity="0.9" font-weight="800"
          font-family="STSong,serif" letter-spacing="10">非　洲</text>`;

  // 路径线（红色虚线，串联 1→2→3→...→8）
  const pathLine = `<path d="${pathD}" fill="none" stroke="#c84820" stroke-width="3"
    stroke-dasharray="8,5" stroke-linecap="round" opacity="0.8"/>`;

  // 右侧时间表（按时间从早到晚）
  const listRows = evo.map((pt, i) => `
    <div class="fs-evo-row" data-id="${pt.id}">
      <div class="fs-evo-num">${i+1}</div>
      <div class="fs-evo-meta">
        <div class="fs-evo-time">${pt.time}</div>
        <div class="fs-evo-name">${pt.name}</div>
        <div class="fs-evo-species">${pt.species}</div>
      </div>
      ${pt.wiki ? `<a class="fs-evo-wiki" target="_blank" rel="noreferrer"
        href="https://en.wikipedia.org/wiki/${pt.wiki}">📖</a>` : ''}
    </div>`).join('');

  const modal = document.getElementById('fullscreenMapModal');
  modal.innerHTML = `
    <div class="fs-map-header">
      <div class="fs-map-title">
        <span class="fs-map-icon">🗺</span>
        <div>
          <h2>人类起源迁徙地图</h2>
          <p>${p.map.overlay_note || '8 个化石点 · 从 700 万年前到 20 万年前 · 点击任意编号查看深度知识'}</p>
        </div>
      </div>
      <div class="fs-map-header-actions">
        <button class="fs-next-btn" onclick="closeMapAndAdvance()">继续 → 📖 故事</button>
        <button class="fs-map-close" onclick="closeMapAndAdvance(true)">✕ 关闭</button>
      </div>
    </div>
    <div class="fs-map-body">
      <div class="fs-map-canvas">
        <svg viewBox="0 0 600 540" preserveAspectRatio="xMidYMid meet">
          <rect width="600" height="540" fill="#a8c8e0"/>
          ${africaShape}
          ${arabia}
          ${labels}
          ${pathLine}
          ${dots}
        </svg>
      </div>
      <div class="fs-map-side" id="fsMapSide">
        <div class="fs-map-side-title">🦴 演化迁徙路径 · 按时间排序</div>
        <div class="fs-map-side-hint">点击 ① 至 ⑧ 任意编号查看深度知识；红线 1→2→...→${evo.length} 由最古老到最年轻</div>
        ${listRows}
      </div>
    </div>
    <!-- 化石点深度知识面板（点击编号弹出） -->
    <div class="fs-fossil-panel hidden" id="fsFossilPanel">
      <button class="fs-fossil-back" onclick="document.getElementById('fsFossilPanel').classList.add('hidden')">← 返回地图列表</button>
      <div class="fs-fossil-body" id="fsFossilBody"></div>
    </div>
  `;
  modal.classList.remove('hidden');
  markStepCompleted('map');

  // 绑定 SVG 上的圆点点击
  modal.querySelectorAll('.fs-evo-pt').forEach(g => {
    g.style.cursor = 'pointer';
    g.addEventListener('click', () => openFossilPanel(g.getAttribute('data-id')));
  });
  // 绑定右侧列表行点击
  modal.querySelectorAll('.fs-evo-row').forEach(row => {
    row.style.cursor = 'pointer';
    row.addEventListener('click', (e) => {
      if (e.target.closest('.fs-evo-wiki')) return; // wiki 链接不拦截
      openFossilPanel(row.getAttribute('data-id'));
    });
  });
}

// 打开化石点深度知识面板
function openFossilPanel(fossilId) {
  const panel = document.getElementById('fsFossilPanel');
  const body = document.getElementById('fsFossilBody');
  if (!panel || !body) return;
  body.innerHTML = renderFossilDetail(fossilId);
  panel.classList.remove('hidden');
  body.scrollTop = 0;
}

// 显示富内容（总览/时光机/故事/AI）— 全部使用全屏 modal
function showImageOverlayPlay(special) {
  const p = PREHISTORIC.periods.find(x => x.id === activePreEraId);
  if (!p) return;
  const kn = p.knowledge_network;

  let richHtml = '', icon = '📜', title = '', subtitle = '';
  if (special === 'scenario') {
    richHtml = renderScenarioLayer(p).replace(/<section[^>]*>|<\/section>/g, '');
    icon = '🎮'; title = '时光机'; subtitle = '你是 30 万年前的智人 · 通过 4 个决定体验早期智人的生存挑战';
  } else if (special === 'story') {
    richHtml = renderPreLayer6(p).replace(/<section[^>]*>|<\/section>/g, '');
    icon = '📖'; title = '故事讲解'; subtitle = '通过具体故事场景理解智人当时的生活';
  } else if (special === 'ai') {
    richHtml = renderPreLayer8(p).replace(/<section[^>]*>|<\/section>/g, '');
    icon = '🤖'; title = '与 AI 导师对话'; subtitle = `${p.title} · 问任何问题，AI 会优先从课程知识库回答`;
  } else if (special === 'evolution_map') {
    richHtml = renderPreLayer2(p).replace(/<section[^>]*>|<\/section>/g, '');
    icon = '🗺'; title = '人类起源地图'; subtitle = '非洲 8 个化石点 · 演化迁徙路径';
  } else if (special === 'hub') {
    const hub = kn.hub || {};
    const d = hub.detail || {};
    richHtml = `
      <div class="overview-card">
        <h3>${d.title || hub.label || '本节总览'}</h3>
        <p class="overview-body">${d.body || ''}</p>
      </div>`;
    icon = '📜'; title = '本节总览'; subtitle = p.title;
  }

  showFullscreenContent({ icon, title, subtitle, html: richHtml, stepKey: special });

  // 绑定富内容交互（在 modal 内查找元素）
  const modal = document.getElementById('fullscreenContentModal');
  if (special === 'scenario') bindScenarioInteractions(p);
  if (special === 'ai') {
    const aiInp = modal.querySelector('#preAIInput');
    const aiSend = modal.querySelector('#preAISend');
    if (aiSend && aiInp) {
      aiSend.onclick = () => sendPreAIMsg(p, aiInp, modal.querySelector('#preAIMsgs'));
      aiInp.onkeydown = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendPreAIMsg(p, aiInp, modal.querySelector('#preAIMsgs')); } };
      modal.querySelectorAll('.suggestion-chip').forEach(b => {
        b.onclick = () => { aiInp.value = b.textContent; sendPreAIMsg(p, aiInp, modal.querySelector('#preAIMsgs')); };
      });
      if (!preAiHistory[p.id]) {
        preAiHistory[p.id] = [];
        const uName = (getUserProfile()||{}).nickname || '朋友';
        addPreAIMsg(modal.querySelector('#preAIMsgs'), 'ai', `${uName}你好！我会从课程知识库 + 维基百科帮${uName}回答关于<strong>${p.title}</strong>的问题。`);
      } else {
        const msgsEl = modal.querySelector('#preAIMsgs');
        preAiHistory[p.id].forEach(m => addPreAIMsg(msgsEl, m.role, m.html));
      }
    }
  }
}

function computeGraphNodes(kn) {
  const out = [];
  // Hub
  const hubX = kn.hub.x != null ? kn.hub.x : 400;
  const hubY = kn.hub.y != null ? kn.hub.y : 360;
  out.push({ ...kn.hub, x: hubX, y: hubY, isHub: true });

  // 兜底圆形布局参数（向后兼容老数据）
  const cx = 400, cy = 360, R1 = 175, R2 = 305;
  kn.nodes.forEach(n => {
    let x, y;
    if (n.x != null && n.y != null) { x = n.x; y = n.y; }
    else {
      const r = n.ring === 2 ? R2 : R1;
      const rad = (n.angle * Math.PI) / 180;
      x = cx + r * Math.cos(rad); y = cy + r * Math.sin(rad);
    }
    out.push({ ...n, x, y });
  });
  return out;
}

// 绘制 SVG 图谱（支持树形 + 圆形布局）
function renderGraphSvg(p, kn) {
  const allNodes = computeGraphNodes(kn);
  const byId = {};
  allNodes.forEach(n => byId[n.id] = n);
  byId.hub = allNodes[0];

  const isTree = kn.layout === 'tree';
  const viewBox = kn.viewBox || (isTree ? '0 0 900 1100' : '0 0 800 720');

  // 🆕 渐进式显现：初始只显示 hub，点击后逐个揭开邻居
  const revealKey = 'civ_revealed_' + p.id;
  if (!window._revealedNodes) window._revealedNodes = {};
  if (!window._revealedNodes[p.id]) {
    try { window._revealedNodes[p.id] = new Set(JSON.parse(localStorage.getItem(revealKey) || '["hub"]')); }
    catch { window._revealedNodes[p.id] = new Set(['hub']); }
  }
  const revealed = window._revealedNodes[p.id];

  const edgeStyle = (t) => {
    if (t === 'time')    return { c:'#c84820', w:3,   d:'0',   o:0.7 };
    if (t === 'place')   return { c:'#3a7868', w:2,   d:'6,5', o:0.55 };
    if (t === 'concept') return { c:'#8a5a90', w:2,   d:'6,5', o:0.55 };
    return { c:'#a07840', w:1.5, d:'3,6', o:0.4 };
  };

  // 边
  const edges = kn.edges.map(e => {
    const a = byId[e.from], b = byId[e.to];
    if (!a || !b) return '';
    const s = edgeStyle(e.type);
    return `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"
      stroke="${s.c}" stroke-width="${s.w}" stroke-opacity="${s.o}"
      stroke-dasharray="${s.d}" stroke-linecap="round"/>`;
  }).join('');

  // 节点 — 字号更大、半径更大
  const nodes = allNodes.map(n => {
    if (n.isHub) {
      // 树形布局：hub 作为顶部装饰，胶囊形（字号放大）
      if (isTree) {
        return `<g class="kg-node hub" data-nid="${n.id}" style="cursor:pointer">
          <rect x="${n.x-160}" y="${n.y-38}" width="320" height="76" rx="38"
                fill="url(#kg-hub-grad)" stroke="${n.color}" stroke-width="3.5"
                filter="drop-shadow(0 5px 14px rgba(184,48,24,.32))"/>
          <text x="${n.x-110}" y="${n.y+10}" text-anchor="middle" font-size="36" pointer-events="none">${n.icon}</text>
          <text x="${n.x+25}" y="${n.y-2}" text-anchor="middle" font-size="22" font-weight="800"
                fill="${n.color}" font-family="STSong,serif" pointer-events="none">${n.label}</text>
          <text x="${n.x+25}" y="${n.y+22}" text-anchor="middle" font-size="15"
                fill="#7a4830" opacity=".8" pointer-events="none">${n.sub}</text>
        </g>`;
      }
      // 圆形布局：原 hub 圆
      return `<g class="kg-node hub" data-nid="${n.id}" style="cursor:pointer">
        <circle cx="${n.x}" cy="${n.y}" r="68"
                fill="url(#kg-hub-grad)" stroke="${n.color}" stroke-width="3"
                filter="drop-shadow(0 4px 14px rgba(184,48,24,.35))"/>
        <text x="${n.x}" y="${n.y-14}" text-anchor="middle" font-size="32" pointer-events="none">${n.icon}</text>
        <text x="${n.x}" y="${n.y+12}" text-anchor="middle" font-size="16" font-weight="800"
              fill="${n.color}" font-family="STSong,serif" pointer-events="none">${n.label}</text>
        <text x="${n.x}" y="${n.y+30}" text-anchor="middle" font-size="11"
              fill="#7a4830" opacity=".75" pointer-events="none">${n.sub}</text>
      </g>`;
    }
    // 普通节点 — 字号更大；根据 reveal 状态决定可见性
    const isFeature = n.special != null;
    const r = isFeature ? 64 : 72;       // 半径再 +10%
    const isRevealed = revealed.has(n.id);
    // 判断这个节点是否「下一个可揭开的」（连接到已揭开节点的边）
    const isNext = !isRevealed && (kn.edges || []).some(e =>
      (e.from === n.id && revealed.has(e.to)) ||
      (e.to === n.id && revealed.has(e.from))
    );
    const cls = [
      isFeature ? 'kg-node feature' : 'kg-node concept',
      !isRevealed && !isNext ? 'hidden-node' : '',
      isNext ? 'has-next revealing' : '',
    ].filter(Boolean).join(' ');
    return `<g class="${cls}" data-nid="${n.id}" style="cursor:pointer">
      <circle cx="${n.x}" cy="${n.y}" r="${r}"
              fill="white" stroke="${n.color}" stroke-width="${isNext ? 5 : 4}"
              filter="drop-shadow(0 5px 14px rgba(60,30,5,.3))"/>
      <circle cx="${n.x}" cy="${n.y}" r="${r-4}"
              fill="${n.color}" fill-opacity="${isNext ? 0.2 : 0.13}"/>
      <text x="${n.x}" y="${n.y-16}" text-anchor="middle" font-size="40" pointer-events="none">${n.icon}</text>
      <text x="${n.x}" y="${n.y+16}" text-anchor="middle" font-size="20" font-weight="700"
            fill="#2c1a08" font-family="STSong,serif" pointer-events="none">${n.label}</text>
      <text x="${n.x}" y="${n.y+38}" text-anchor="middle" font-size="15"
            fill="#7a4830" opacity=".85" pointer-events="none">${n.sub || ''}</text>
      ${isNext ? `<text x="${n.x}" y="${n.y - r - 18}" text-anchor="middle" font-size="14" class="kg-next-hint" pointer-events="none">👆 点我继续</text>` : ''}
    </g>`;
  }).join('');

  // 树形布局时：在背景画一棵大树（trunk + leaves）
  const treeSilhouette = isTree ? `
    <defs>
      <linearGradient id="kg-trunk-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#8a5530" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#5a3818" stop-opacity="0.4"/>
      </linearGradient>
      <radialGradient id="kg-leaves-grad" cx="50%" cy="50%">
        <stop offset="0%" stop-color="#6a8c30" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#3a5a18" stop-opacity="0.05"/>
      </radialGradient>
    </defs>
    <!-- 树冠（淡绿色椭圆） -->
    <ellipse cx="500" cy="100" rx="240" ry="55" class="kg-tree-leaves"/>
    <!-- 主树干（自上而下波浪曲线） -->
    <path d="M 480,80 Q 470,300 478,500 Q 490,700 482,900 Q 480,1000 470,1100"
          stroke="url(#kg-trunk-grad)" stroke-width="32"
          fill="none" stroke-linecap="round"/>
    <!-- 分支（伸向右侧 content 节点）-->
    <path d="M 478,200 Q 600,210 750,250"
          stroke="url(#kg-trunk-grad)" stroke-width="8"
          fill="none" stroke-linecap="round" opacity="0.5"/>
    <path d="M 480,490 Q 620,500 750,580"
          stroke="url(#kg-trunk-grad)" stroke-width="8"
          fill="none" stroke-linecap="round" opacity="0.5"/>
    <path d="M 480,750 Q 620,750 750,780"
          stroke="url(#kg-trunk-grad)" stroke-width="8"
          fill="none" stroke-linecap="round" opacity="0.5"/>
    <path d="M 470,920 Q 600,930 750,970"
          stroke="url(#kg-trunk-grad)" stroke-width="8"
          fill="none" stroke-linecap="round" opacity="0.5"/>
    <!-- 底部根（分到 africa / coop）-->
    <path d="M 470,1050 Q 380,1090 280,1170"
          stroke="url(#kg-trunk-grad)" stroke-width="10"
          fill="none" stroke-linecap="round" opacity="0.5"/>
    <path d="M 490,1050 Q 600,1090 700,1170"
          stroke="url(#kg-trunk-grad)" stroke-width="10"
          fill="none" stroke-linecap="round" opacity="0.5"/>
  ` : '';

  return `<svg class="kg-svg ${isTree ? 'kg-tree' : ''}" viewBox="${viewBox}" preserveAspectRatio="xMidYMid meet">
    <defs>
      <radialGradient id="kg-hub-grad" cx="50%" cy="40%">
        <stop offset="0%" stop-color="#fdf5e0"/>
        <stop offset="100%" stop-color="#f5e2c0"/>
      </radialGradient>
    </defs>
    ${treeSilhouette}
    ${edges}${nodes}
  </svg>
  <div class="kg-legend">
    <span><i class="mn-leg-line" style="background:#c84820"></i>时间脉络</span>
    <span><i class="mn-leg-line dashed" style="background:#3a7868"></i>地点关联</span>
    <span><i class="mn-leg-line dashed" style="background:#8a5a90"></i>概念关联</span>
    <span><i class="mn-leg-line dashed" style="background:#a07840"></i>内容分支</span>
    <button class="kg-reset-btn" onclick="resetGraphReveal('${p.id}')">🔄 重新探索</button>
  </div>`;
}

// 重置某个 PH 的揭示进度
function resetGraphReveal(periodId) {
  if (!confirm('确定要重置探索进度，从头开始吗？')) return;
  localStorage.removeItem('civ_revealed_' + periodId);
  if (window._revealedNodes) delete window._revealedNodes[periodId];
  // 重新进入这个 era
  const p = PREHISTORIC.periods.find(x => x.id === periodId);
  if (p) enterPreEra(periodId);
}

// 中心 hub 的详情卡（默认显示）
function renderHubDetailCard(kn, p) {
  const d = kn.hub.detail || {};
  const related = (d.related || []).map(rid => {
    const n = kn.nodes.find(x => x.id === rid) || (rid === 'hub' ? kn.hub : null);
    if (!n) return '';
    return `<button class="kg-related-chip" data-goto="${rid}">${n.icon} ${n.label}</button>`;
  }).join('');
  return `
    <div class="kg-detail-card kg-detail-hub" style="border-left-color:${kn.hub.color}">
      <div class="kg-detail-head">
        <span class="kg-detail-icon" style="background:${kn.hub.color}20;color:${kn.hub.color}">${kn.hub.icon}</span>
        <div>
          <h4>${d.title || kn.hub.label}</h4>
          <p class="kg-detail-sub">${kn.hub.sub}</p>
        </div>
      </div>
      <p class="kg-detail-body">${d.body || ''}</p>
      ${kn.intro ? `<div class="kg-detail-tip">💡 ${kn.intro}</div>` : ''}
      ${related ? `<div class="kg-related"><strong>从这里开始 →</strong><div class="kg-related-row">${related}</div></div>` : ''}
    </div>`;
}

// 普通概念节点的详情卡
function renderConceptDetailCard(node, kn, p) {
  const d = node.detail || {};
  const related = (d.related || []).map(rid => {
    const n = kn.nodes.find(x => x.id === rid) || (rid === 'hub' ? kn.hub : null);
    if (!n) return '';
    return `<button class="kg-related-chip" data-goto="${rid}">${n.icon} ${n.label}</button>`;
  }).join('');

  const zhUrl = d.wiki_zh ? `https://zh.wikipedia.org/w/index.php?search=${encodeURIComponent(d.wiki_zh)}` : '';
  const enUrl = d.wiki_en ? `https://en.wikipedia.org/wiki/${d.wiki_en}` : '';

  return `
    <div class="kg-detail-card" style="border-left-color:${node.color}">
      <div class="kg-detail-head">
        <span class="kg-detail-icon" style="background:${node.color}20;color:${node.color}">${node.icon}</span>
        <div>
          <h4>${d.title || node.label}</h4>
          <p class="kg-detail-sub">${node.label} · ${node.sub}</p>
        </div>
      </div>
      <p class="kg-detail-body">${d.body || ''}</p>
      <div class="kg-detail-wikis">
        ${zhUrl ? `<a class="wiki-btn zh" target="_blank" rel="noreferrer" href="${zhUrl}">📖 中文维基</a>` : ''}
        ${enUrl ? `<a class="wiki-btn en" target="_blank" rel="noreferrer" href="${enUrl}">🔗 EN</a>` : ''}
      </div>
      ${related ? `<div class="kg-related"><strong>🔗 相关节点</strong><div class="kg-related-row">${related}</div></div>` : ''}
    </div>`;
}

// 富内容节点详情卡 — 根据 special 字段分发
function renderFeatureDetailCard(node, kn, p) {
  let richHtml = '';
  if (node.special === 'scenario') {
    richHtml = `<div class="kg-feat-mount" id="kgScenarioMount">${renderScenarioLayer(p).replace(/<section[^>]*>|<\/section>/g, '')}</div>`;
  } else if (node.special === 'timeline_image') {
    richHtml = renderPreLayer1(p).replace(/<section[^>]*>|<\/section>/g, '');
  } else if (node.special === 'evolution_map') {
    richHtml = renderPreLayer2(p).replace(/<section[^>]*>|<\/section>/g, '');
  } else if (node.special === 'story') {
    richHtml = renderPreLayer6(p).replace(/<section[^>]*>|<\/section>/g, '');
  } else if (node.special === 'evidence') {
    richHtml = renderPreLayer5(p).replace(/<section[^>]*>|<\/section>/g, '');
  } else if (node.special === 'ai') {
    richHtml = renderPreLayer8(p).replace(/<section[^>]*>|<\/section>/g, '');
  }

  const d = node.detail || {};
  const related = (d.related || []).map(rid => {
    const n = kn.nodes.find(x => x.id === rid) || (rid === 'hub' ? kn.hub : null);
    if (!n) return '';
    return `<button class="kg-related-chip" data-goto="${rid}">${n.icon} ${n.label}</button>`;
  }).join('');

  return `
    <div class="kg-detail-card kg-detail-rich" style="border-left-color:${node.color}">
      <div class="kg-detail-head">
        <span class="kg-detail-icon" style="background:${node.color}20;color:${node.color}">${node.icon}</span>
        <div>
          <h4>${d.title || node.label}</h4>
          <p class="kg-detail-sub">${d.body || node.sub}</p>
        </div>
      </div>
      <div class="kg-feat-content">${richHtml}</div>
      ${related ? `<div class="kg-related"><strong>🔗 相关节点</strong><div class="kg-related-row">${related}</div></div>` : ''}
    </div>`;
}

// 绑定图谱页交互
function bindGraphPage(p) {
  const kn = p.knowledge_network;

  function focusNode(nodeId) {
    // 🌳 渐进显现：把这个节点加入 revealed，下一次渲染时它的邻居自动变成 "下一个可点"
    if (!window._revealedNodes) window._revealedNodes = {};
    const set = window._revealedNodes[p.id] || new Set(['hub']);
    const wasNew = !set.has(nodeId);
    set.add(nodeId);
    window._revealedNodes[p.id] = set;
    localStorage.setItem('civ_revealed_' + p.id, JSON.stringify([...set]));

    // 如果点的是「新揭开」的节点，重渲染网络以显示新邻居
    if (wasNew) {
      const graphPane = document.getElementById('kgGraphPane');
      if (graphPane) {
        // 保留 play area，只替换 svg + legend
        const playHtml = graphPane.querySelector('.kg-play-area')?.outerHTML || '';
        graphPane.innerHTML = playHtml + renderGraphSvg(p, kn);
        // 重新绑定 SVG 节点点击
        document.querySelectorAll('.kg-node').forEach(g => {
          g.addEventListener('click', () => focusNode(g.getAttribute('data-nid')));
        });
        document.querySelectorAll('.kg-play-card').forEach(btn => {
          btn.addEventListener('click', () => focusNode(btn.getAttribute('data-nid')));
        });
      }
    }

    // 1. 高亮 SVG 中的节点
    document.querySelectorAll('.kg-node').forEach(g => {
      g.classList.toggle('active', g.getAttribute('data-nid') === nodeId);
    });

    // 2. 找到节点 + 渲染详情（包括 nodes 和 play_nodes）
    let node;
    let html;
    if (nodeId === 'hub') {
      html = renderHubDetailCard(kn, p);
    } else {
      node = kn.nodes.find(n => n.id === nodeId) ||
             (kn.play_nodes || []).find(n => n.id === nodeId);
      if (!node) return;
      html = node.special
        ? renderFeatureDetailCard(node, kn, p)
        : renderConceptDetailCard(node, kn, p);
    }

    const pane = document.getElementById('kgDetailPane');
    pane.innerHTML = html;

    // 3. 绑定详情卡里的「相关节点」chip
    pane.querySelectorAll('.kg-related-chip').forEach(btn => {
      btn.onclick = () => focusNode(btn.getAttribute('data-goto'));
    });

    // 4. 如果是富内容节点，绑定相应交互
    if (node && node.special === 'scenario') {
      bindScenarioInteractions(p);
    } else if (node && node.special === 'ai') {
      const aiInp = pane.querySelector('#preAIInput');
      const aiSend = pane.querySelector('#preAISend');
      if (aiSend && aiInp) {
        aiSend.onclick = () => sendPreAIMsg(p, aiInp, pane.querySelector('#preAIMsgs'));
        aiInp.onkeydown = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendPreAIMsg(p, aiInp, pane.querySelector('#preAIMsgs')); } };
        pane.querySelectorAll('.suggestion-chip').forEach(b => {
          b.onclick = () => { aiInp.value = b.textContent; sendPreAIMsg(p, aiInp, pane.querySelector('#preAIMsgs')); };
        });
        if (!preAiHistory[p.id]) {
          preAiHistory[p.id] = [];
          const userName2 = (getUserProfile()||{}).nickname || '朋友';
          addPreAIMsg(pane.querySelector('#preAIMsgs'), 'ai', `${userName2}你好！${userName2}可以问我任何关于 <strong>${p.title}</strong> 的问题，我会帮${userName2}查阅维基百科。`);
        } else {
          const msgsEl = pane.querySelector('#preAIMsgs');
          preAiHistory[p.id].forEach(m => addPreAIMsg(msgsEl, m.role, m.html));
        }
      }
    }

    // 5. 滚动到详情
    pane.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // 节点点击 = 聚焦
  document.querySelectorAll('.kg-node').forEach(g => {
    g.addEventListener('click', () => focusNode(g.getAttribute('data-nid')));
  });

  // 互动·娱乐节点点击
  document.querySelectorAll('.kg-play-card').forEach(btn => {
    btn.addEventListener('click', () => focusNode(btn.getAttribute('data-nid')));
  });

  // 🆕 初始绑定详情卡里的「相关节点」chip（之前缺失，导致初次点击无效）
  document.querySelectorAll('#kgDetailPane .kg-related-chip').forEach(btn => {
    btn.onclick = () => focusNode(btn.getAttribute('data-goto'));
  });

  // 暴露给全局，供详情卡内的相关 chip 调用
  window.focusGraphNode = focusNode;
}

function renderPreLayer1(p) {
  const tl = p.timeline;
  const pcts = PREHISTORIC.periods.map(ep => ({ id: ep.id, pct: ep.timeline.position_pct, icon: ep.icon, title: ep.title }));
  const bars = pcts.map(ep => {
    const w = ep.id === p.id ? 14 : 7;
    return `<div class="ptl-seg ${ep.id === p.id ? 'active' : ''}" style="flex:${w};background:${PREHISTORIC.periods.find(x=>x.id===ep.id).color}${ep.id===p.id?'':'66'}" title="${ep.title}">${ep.id === p.id ? ep.icon : ''}</div>`;
  }).join('');

  // 🖼 IMAGE-FIRST MODE — if timeline has an image, render it as hero instead of text cards
  let evoSection = '';
  if (tl.image) {
    // 大图模式：一张图 + 维基快链
    const quickLinks = (tl.wiki_quick_links || []).map(l => {
      const enUrl = l.term ? `https://en.wikipedia.org/wiki/${l.term}` : `https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(l.label)}`;
      const zhUrl = `https://zh.wikipedia.org/w/index.php?search=${encodeURIComponent(l.label)}`;
      return `<a class="wiki-quick-chip" target="_blank" rel="noreferrer" href="${zhUrl}">📖 ${l.label}</a>`;
    }).join('');
    evoSection = `
      <div class="image-hero-section">
        <div class="image-hero-head">
          <span class="evo-icon">🌳</span>
          <strong>人类起源完整时间轴</strong>
        </div>
        <div class="image-hero-wrap">
          <img class="image-hero-img" src="${tl.image}" alt="${tl.image_alt || ''}" loading="lazy"/>
        </div>
        ${quickLinks ? `
          <div class="wiki-quick-row">
            <span class="wiki-quick-label">📖 想深入了解？点击查看维基百科：</span>
            <div class="wiki-quick-chips">${quickLinks}</div>
          </div>` : ''}
      </div>`;
  } else if (tl.evolution_timeline) {
    // 文字模式（兜底）—— 当没有图时，仍用原来的卡片
    evoSection = `
      <div class="evo-timeline-wrap">
        <div class="evo-timeline-title">
          <span class="evo-icon">🌳</span>
          <strong>人类起源完整时间轴</strong>
          <span class="pl-sub" style="font-size:11px;margin-left:8px">从700万年前到现代人类出现</span>
        </div>
        ${tl.teacher_note ? `<div class="evo-teacher-note">📝 ${tl.teacher_note}</div>` : ''}
        <div class="evo-events">
          ${tl.evolution_timeline.map((ev, i) => `
            <div class="evo-event ${ev.confidence === 'confirmed' ? 'confirmed' : 'cautious'}">
              <div class="evo-event-dot"></div>
              <div class="evo-event-body">
                <div class="evo-event-time">${ev.time}</div>
                <div class="evo-event-title-row">
                  <strong>${ev.title}</strong>
                  ${wikiBtn(ev.title, ev.wiki_en)}
                </div>
                <p class="evo-event-body-text">${ev.body}</p>
                ${ev.misconception ? `<div class="evo-misconception">${ev.misconception}</div>` : ''}
              </div>
            </div>`).join('')}
        </div>
        ${tl.misconceptions ? `
          <div class="evo-misconceptions-box">
            <strong>🚫 常见误解（不能这样说）</strong>
            <ul>${tl.misconceptions.map(m=>`<li>${m}</li>`).join('')}</ul>
          </div>` : ''}
      </div>`;
  }

  return `<section class="pre-layer" id="pre-timeline">
    <div class="pl-header"><span class="pl-icon">⏳</span><div><h3>时间定位</h3><p class="pl-sub">30万年全程 · 当前时代的位置</p></div></div>
    <div class="ptl-bar">${bars}</div>
    <div class="ptl-range"><span>30万年前</span><span>→ 文明史</span></div>
    <div class="ptl-cards">
      <div class="ptlc before"><p class="pl-sub">之前</p><p>${tl.before}</p></div>
      <div class="ptlc now" style="border-color:${p.color}"><p class="pl-sub">当前</p><strong>${p.time} · ${p.title}</strong><p>${tl.context}</p></div>
      <div class="ptlc after"><p class="pl-sub">之后</p><p>${tl.after}</p></div>
    </div>
    <div class="ptl-scale">⏱ ${tl.scale_note}</div>
    ${evoSection}
  </section>`;
}

// ══════════════════════════════════════════════
// 🎮 时光机角色扮演 Time-Machine Scenario
// ══════════════════════════════════════════════
// ══════════════════════════════════════════════
// 🕸 知识网络 Knowledge Network — 最先展示，节点点击展开
// ══════════════════════════════════════════════
function renderKnowledgeNetworkLayer(p) {
  if (!p.knowledge_network) return '';
  const kn = p.knowledge_network;

  // 计算每个外圈节点的坐标（SVG viewBox 0 0 800 560）
  const cx = 400, cy = 280;
  const R = 200; // 外圈节点到中心的距离
  const nodes = kn.nodes.map(n => {
    const rad = (n.angle * Math.PI) / 180;
    return {
      ...n,
      x: cx + R * Math.cos(rad),
      y: cy + R * Math.sin(rad),
    };
  });
  const byId = {};
  nodes.forEach(n => byId[n.id] = n);
  byId.hub = { id: 'hub', x: cx, y: cy, ...kn.hub };

  // 边的渲染：根据 type 用不同颜色
  const edgeColor = (t) => t === 'time' ? '#c84820' : (t === 'place' ? '#3a7868' : '#8a5a90');
  const edges = kn.edges.map(e => {
    const a = byId[e.from], b = byId[e.to];
    if (!a || !b) return '';
    return `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"
      stroke="${edgeColor(e.type)}" stroke-width="1.5"
      stroke-opacity="0.35" stroke-dasharray="${e.type === 'time' ? '0' : '5,4'}"/>`;
  }).join('');

  // 外圈节点
  const outerNodes = nodes.map(n => `
    <g class="kn-node" data-nid="${n.id}" style="cursor:pointer">
      <circle cx="${n.x}" cy="${n.y}" r="46"
              fill="white" stroke="${n.color}" stroke-width="3"
              filter="drop-shadow(0 3px 8px rgba(60,30,5,.25))"/>
      <circle cx="${n.x}" cy="${n.y}" r="42"
              fill="${n.color}" fill-opacity="0.1"/>
      <text x="${n.x}" y="${n.y - 8}" text-anchor="middle"
            font-size="22" pointer-events="none">${n.icon}</text>
      <text x="${n.x}" y="${n.y + 14}" text-anchor="middle"
            font-size="11" fill="#2c1a08" font-weight="700"
            font-family="STSong,'Noto Serif SC',serif" pointer-events="none">${n.label}</text>
      <text x="${n.x}" y="${n.y + 27}" text-anchor="middle"
            font-size="9" fill="#7a4830" opacity="0.75" pointer-events="none">${n.sub}</text>
    </g>`).join('');

  // 中心节点
  const hub = kn.hub;
  const hubSvg = `
    <g class="kn-hub">
      <circle cx="${cx}" cy="${cy}" r="68"
              fill="url(#kn-hub-grad)" stroke="${hub.color}" stroke-width="3"
              filter="drop-shadow(0 4px 12px rgba(184,48,24,.35))"/>
      <text x="${cx}" y="${cy - 14}" text-anchor="middle"
            font-size="34" pointer-events="none">${hub.icon}</text>
      <text x="${cx}" y="${cy + 14}" text-anchor="middle"
            font-size="15" fill="${hub.color}" font-weight="800"
            font-family="STSong,'Noto Serif SC',serif" pointer-events="none">${hub.label}</text>
      <text x="${cx}" y="${cy + 32}" text-anchor="middle"
            font-size="10" fill="#7a4830" opacity="0.8" pointer-events="none">${hub.sub}</text>
    </g>`;

  return `<section class="pre-layer kn-layer" id="pre-network">
    <div class="pl-header"><span class="pl-icon">🕸</span><div><h3>知识网络</h3><p class="pl-sub">${kn.intro}</p></div></div>

    <div class="kn-canvas-wrap">
      <svg class="kn-svg" viewBox="0 0 800 560" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="kn-hub-grad" cx="50%" cy="40%">
            <stop offset="0%" stop-color="#fdf5e0"/>
            <stop offset="100%" stop-color="#f5e2c0"/>
          </radialGradient>
        </defs>
        <!-- 边 -->
        ${edges}
        <!-- 中心 -->
        ${hubSvg}
        <!-- 外圈节点 -->
        ${outerNodes}
      </svg>

      <!-- 图例 -->
      <div class="kn-legend">
        <span><i class="kn-leg-line" style="background:#c84820"></i>演化时序</span>
        <span><i class="kn-leg-line dashed" style="background:#3a7868"></i>地点关联</span>
        <span><i class="kn-leg-line dashed" style="background:#8a5a90"></i>概念关联</span>
      </div>
    </div>

    <!-- 节点详情面板（点击节点后显示） -->
    <div class="kn-detail-panel" id="knDetailPanel">
      <div class="kn-detail-placeholder">
        <span class="kn-placeholder-icon">👆</span>
        <p>点击上方任意圆圈，了解它的含义</p>
      </div>
    </div>
  </section>`;
}

function bindKnowledgeNetwork(p) {
  const kn = p.knowledge_network;
  if (!kn) return;
  const nodeMap = {};
  kn.nodes.forEach(n => nodeMap[n.id] = n);

  document.querySelectorAll('.kn-node').forEach(g => {
    g.addEventListener('click', () => {
      // 高亮当前节点
      document.querySelectorAll('.kn-node').forEach(x => x.classList.remove('selected'));
      g.classList.add('selected');

      const nid = g.getAttribute('data-nid');
      const n = nodeMap[nid];
      if (!n) return;
      const d = n.detail;

      const panel = document.getElementById('knDetailPanel');
      panel.innerHTML = `
        <div class="kn-detail-card" style="border-left-color:${n.color}">
          <div class="kn-detail-head">
            <span class="kn-detail-icon" style="background:${n.color}20;color:${n.color}">${n.icon}</span>
            <div>
              <h4>${d.title}</h4>
              <p class="kn-detail-sub">${n.label} · ${n.sub}</p>
            </div>
          </div>
          <p class="kn-detail-body">${d.body}</p>
          <div class="kn-detail-actions">
            ${d.wiki_zh ? `<a class="wiki-btn zh" target="_blank" rel="noreferrer"
              href="https://zh.wikipedia.org/w/index.php?search=${encodeURIComponent(d.wiki_zh)}">📖 中文维基</a>` : ''}
            ${d.wiki_en ? `<a class="wiki-btn en" target="_blank" rel="noreferrer"
              href="https://en.wikipedia.org/wiki/${d.wiki_en}">🔗 EN</a>` : ''}
            ${(d.related_layers || []).map(lid => {
              const layerLabel = (PREHISTORIC.LAYERS.find(l => 'pre-' + l.id === lid) || {}).label || '相关层';
              const layerIcon  = (PREHISTORIC.LAYERS.find(l => 'pre-' + l.id === lid) || {}).icon  || '';
              return `<button class="kn-jump-btn" onclick="scrollToPreLayer('${lid}')">${layerIcon} 跳转到「${layerLabel}」 →</button>`;
            }).join('')}
          </div>
        </div>`;

      // 平滑滚动到详情面板
      panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
}

function renderScenarioLayer(p) {
  if (!p.scenario) return '';
  const s = p.scenario;
  return `<section class="pre-layer scenario-layer" id="pre-scenario">
    <div class="pl-header"><span class="pl-icon">🎮</span><div><h3>时光机 · 角色扮演</h3><p class="pl-sub">${s.subtitle}</p></div></div>

    <div class="scenario-container" id="scenarioContainer">
      <!-- 开场 -->
      <div class="scenario-intro" id="scenarioIntro">
        <div class="scenario-cover">
          <div class="scenario-cover-emoji">🦴</div>
          <h4>${s.title}</h4>
          <p class="scenario-intro-text">${s.intro}</p>
          <div class="scenario-stat-preview">
            <span>💛 生存值</span>
            <div class="scenario-bar"><div class="scenario-bar-fill" style="width:${s.start_survival}%"></div></div>
            <span class="scenario-stat-num">${s.start_survival}/100</span>
          </div>
          <button class="scenario-start-btn" data-pid="${p.id}">🎬 开始穿越</button>
        </div>
      </div>

      <!-- 场景容器 -->
      <div class="scenario-play" id="scenarioPlay" style="display:none">
        <div class="scenario-topbar">
          <div class="scenario-progress" id="scenarioProgress"></div>
          <div class="scenario-stat">
            <span>💛 生存值</span>
            <div class="scenario-bar"><div class="scenario-bar-fill" id="scenarioStatFill"></div></div>
            <span class="scenario-stat-num" id="scenarioStatNum"></span>
          </div>
        </div>
        <div class="scenario-scene" id="scenarioScene"></div>
      </div>

      <!-- 结局容器 -->
      <div class="scenario-ending" id="scenarioEnding" style="display:none"></div>
    </div>
  </section>`;
}

// Scenario state (per era)
let scenarioState = {};

function bindScenarioInteractions(p) {
  const startBtn = document.querySelector('.scenario-start-btn[data-pid="' + p.id + '"]');
  if (!startBtn) return;
  startBtn.onclick = () => beginScenario(p);
}

function beginScenario(p) {
  const s = p.scenario;
  scenarioState[p.id] = {
    sceneIdx: 0,
    survival: s.start_survival,
    history: [],
  };
  document.getElementById('scenarioIntro').style.display = 'none';
  document.getElementById('scenarioPlay').style.display = 'block';
  document.getElementById('scenarioEnding').style.display = 'none';
  renderScenarioScene(p);
}

function renderScenarioScene(p) {
  const s = p.scenario;
  const st = scenarioState[p.id];
  const scene = s.scenes[st.sceneIdx];
  if (!scene) { showScenarioEnding(p); return; }

  // Update topbar progress + stat
  const progEl = document.getElementById('scenarioProgress');
  progEl.innerHTML = s.scenes.map((sc, i) =>
    `<div class="scenario-prog-dot ${i < st.sceneIdx ? 'done' : ''} ${i === st.sceneIdx ? 'active' : ''}"></div>`
  ).join('<div class="scenario-prog-line"></div>');
  updateScenarioStat(p);

  const sceneEl = document.getElementById('scenarioScene');
  sceneEl.innerHTML = `
    <div class="scenario-card scenario-card-enter">
      <div class="scenario-scene-head">
        <span class="scenario-scene-emoji">${scene.emoji}</span>
        <h4>${scene.title}</h4>
      </div>
      <p class="scenario-situation">${scene.situation}</p>
      <div class="scenario-choices">
        ${scene.choices.map((c, i) => `
          <button class="scenario-choice-btn" data-idx="${i}">
            <span class="scenario-choice-text">${c.text}</span>
            <span class="scenario-choice-arrow">→</span>
          </button>`).join('')}
      </div>
    </div>`;

  // bind choices
  sceneEl.querySelectorAll('.scenario-choice-btn').forEach((btn, i) => {
    btn.onclick = () => makeChoice(p, i);
  });
  sceneEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function makeChoice(p, choiceIdx) {
  const s = p.scenario;
  const st = scenarioState[p.id];
  const scene = s.scenes[st.sceneIdx];
  const choice = scene.choices[choiceIdx];

  // Apply effect
  st.survival = Math.max(0, Math.min(s.max_survival, st.survival + choice.effect));
  st.history.push({ sceneIdx: st.sceneIdx, choice: choice.text, effect: choice.effect });

  // Show outcome card
  const sceneEl = document.getElementById('scenarioScene');
  const effectClass = choice.effect > 0 ? 'positive' : (choice.effect < 0 ? 'negative' : 'neutral');
  const effectIcon = choice.effect > 0 ? '+' : '';
  sceneEl.innerHTML = `
    <div class="scenario-card scenario-outcome-card">
      <div class="scenario-outcome-head">
        <span class="scenario-outcome-emoji">${scene.emoji}</span>
        <span class="scenario-effect-badge ${effectClass}">${effectIcon}${choice.effect}</span>
      </div>
      <p class="scenario-outcome-text">${choice.outcome}</p>
      <div class="scenario-fact-box">
        <strong>💡 真实历史</strong>
        <p>${choice.fact}</p>
        ${choice.wiki_term ? `<div class="scenario-wiki-row">想深入了解？${wikiBtn(choice.wiki_term)}</div>` : ''}
      </div>
      <button class="scenario-next-btn">下一个场景 →</button>
    </div>`;
  updateScenarioStat(p);

  sceneEl.querySelector('.scenario-next-btn').onclick = () => {
    st.sceneIdx++;
    if (st.sceneIdx >= s.scenes.length) {
      showScenarioEnding(p);
    } else {
      renderScenarioScene(p);
    }
  };
}

function updateScenarioStat(p) {
  const st = scenarioState[p.id];
  const max = p.scenario.max_survival;
  const fillEl = document.getElementById('scenarioStatFill');
  const numEl  = document.getElementById('scenarioStatNum');
  if (fillEl) fillEl.style.width = (st.survival / max * 100) + '%';
  if (numEl)  numEl.textContent  = st.survival + '/' + max;
}

function showScenarioEnding(p) {
  const s = p.scenario;
  const st = scenarioState[p.id];
  // pick the highest-min ending the survival meets
  const sortedEndings = [...s.endings].sort((a, b) => b.min - a.min);
  const ending = sortedEndings.find(e => st.survival >= e.min) || s.endings[s.endings.length - 1];

  document.getElementById('scenarioPlay').style.display = 'none';
  const endEl = document.getElementById('scenarioEnding');
  endEl.style.display = 'block';
  endEl.innerHTML = `
    <div class="scenario-card scenario-card-ending">
      <div class="scenario-ending-emoji">${ending.emoji}</div>
      <h3>${ending.title}</h3>
      <p class="scenario-ending-body">${ending.body}</p>
      <div class="scenario-stat scenario-stat-final">
        <span>最终生存值</span>
        <div class="scenario-bar"><div class="scenario-bar-fill" style="width:${st.survival}%"></div></div>
        <span class="scenario-stat-num">${st.survival}/100</span>
      </div>
      <div class="scenario-ending-actions">
        <button class="primary-button" onclick="beginScenario(PREHISTORIC.periods.find(x=>x.id==='${p.id}'))">🔄 再玩一次</button>
        <button class="secondary-button" onclick="document.getElementById('pre-timeline').scrollIntoView({behavior:'smooth'})">继续学习 ↓</button>
      </div>
    </div>`;
  endEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  logHistory('lesson_view', `完成时光机：${p.title} · 生存值 ${st.survival}`);
}

function renderPreLayer2(p) {
  const evo = p.map.evolution_path || [];
  let evoSvg = '';
  if (evo.length > 0) {
    // 红色虚线串联所有点（按时间顺序）
    const pathD = evo.map((pt, i) => (i === 0 ? `M ${pt.x},${pt.y}` : `L ${pt.x},${pt.y}`)).join(' ');
    const pathLine = `<path d="${pathD}" fill="none" stroke="#c84820" stroke-width="2"
      stroke-dasharray="5,3" stroke-linecap="round" opacity="0.7"/>`;

    // 化石点 + 编号 + 时间标签（按 label_dir 方位摆放，避免重叠）
    const labelOffset = {
      l:  { x: -14, y:   0, anchor: 'end',    rectDx: -88, rectDy: -7 },
      r:  { x:  14, y:   0, anchor: 'start',  rectDx:  -2, rectDy: -7 },
      t:  { x:   0, y: -18, anchor: 'middle', rectDx: -42, rectDy: -7 },
      b:  { x:   0, y:  20, anchor: 'middle', rectDx: -42, rectDy: -7 },
      tl: { x: -12, y: -14, anchor: 'end',    rectDx: -88, rectDy: -7 },
      tr: { x:  12, y: -14, anchor: 'start',  rectDx:  -2, rectDy: -7 },
      bl: { x: -12, y:  16, anchor: 'end',    rectDx: -88, rectDy: -7 },
      br: { x:  12, y:  16, anchor: 'start',  rectDx:  -2, rectDy: -7 },
    };
    const dots = evo.map((pt, i) => {
      const off = labelOffset[pt.label_dir || 'r'];
      const lblX = pt.x + off.x;
      const lblY = pt.y + off.y;
      return `
        <g class="evo-map-pt" data-id="${pt.id}" style="cursor:pointer">
          <line x1="${pt.x}" y1="${pt.y}" x2="${lblX}" y2="${lblY+3}"
                stroke="#c84820" stroke-width="0.6" opacity="0.4"/>
          <circle cx="${pt.x}" cy="${pt.y}" r="9" fill="white" stroke="#c84820" stroke-width="2.5"
                  filter="drop-shadow(0 2px 4px rgba(200,72,32,.5))"/>
          <text x="${pt.x}" y="${pt.y+3.5}" text-anchor="middle"
                font-size="11" font-weight="700" fill="#c84820"
                font-family="serif" pointer-events="none">${i+1}</text>
          <rect x="${lblX + off.rectDx}" y="${lblY + off.rectDy}" width="88" height="14" rx="3"
                fill="rgba(255,248,228,0.95)" stroke="#c84820" stroke-width=".5" pointer-events="none"/>
          <text x="${lblX}" y="${lblY+3}" text-anchor="${off.anchor}"
                font-size="9" fill="#3a1a08" font-weight="700"
                font-family="STSong,serif" pointer-events="none">${pt.time}</text>
        </g>`;
    }).join('');
    evoSvg = pathLine + dots;
  }

  // 演化路径列表
  const evoList = evo.map((pt, i) => `
    <div class="evo-map-list-item" data-id="${pt.id}">
      <div class="evo-map-num" style="background:#c84820">${i+1}</div>
      <div class="evo-map-info">
        <div class="evo-map-time">${pt.time}</div>
        <div class="evo-map-name">${pt.name}</div>
        <div class="evo-map-species">${pt.species}</div>
      </div>
      ${pt.wiki ? `<a class="wiki-btn zh" target="_blank" rel="noreferrer"
        href="https://en.wikipedia.org/wiki/${pt.wiki}">📖 维基</a>` : ''}
    </div>`).join('');

  // 简化的非洲大陆 SVG 路径（viewBox 600x540）
  const africaShape = `
    <path d="M 195,80 L 270,75 Q 320,72 360,90 L 410,110 Q 440,140 425,180 L 415,210 Q 420,235 405,260 L 395,290 Q 405,320 385,355 L 360,400 Q 340,440 305,470 L 270,490 Q 240,495 215,475 L 195,440 Q 175,400 165,355 L 155,310 Q 145,275 155,235 L 165,195 Q 175,135 195,80 Z"
      fill="#e8c890" stroke="#a06840" stroke-width="2"
      stroke-linejoin="round"/>`;
  // 阿拉伯半岛小块
  const arabia = `
    <path d="M 410,140 Q 440,135 460,150 Q 470,170 458,190 Q 440,205 420,195 L 410,180 Z"
      fill="#e8c890" stroke="#a06840" stroke-width="1.5" opacity="0.7"/>`;
  // 海洋 + 大洲标签
  const labels = `
    <text x="80" y="110" font-size="11" fill="#3a6aaa" opacity="0.55" font-style="italic" letter-spacing="2">大 西 洋</text>
    <text x="500" y="400" font-size="11" fill="#3a6aaa" opacity="0.55" font-style="italic" letter-spacing="2">印度洋</text>
    <text x="495" y="100" font-size="10" fill="#3a6aaa" opacity="0.5" font-style="italic">地中海</text>
    <text x="290" y="170" font-size="9" fill="#7a5530" opacity="0.6" letter-spacing="1">撒哈拉沙漠</text>
    <text x="380" y="320" font-size="9" fill="#7a5530" opacity="0.65" letter-spacing="1">东非大裂谷</text>
    <text x="195" y="60" font-size="13" fill="#5a3a18" opacity="0.85" font-weight="700"
          font-family="STSong,serif" letter-spacing="6">非　洲</text>`;

  return `<section class="pre-layer" id="pre-map">
    <div class="pl-header"><span class="pl-icon">🗺</span><div><h3>世界地图 · 人类起源地图</h3><p class="pl-sub">${p.map.overlay_note}</p></div></div>
    <div class="pre-map-wrap">
      <div class="pre-svg-map-box">
        <svg viewBox="0 0 600 540" class="pre-svg-map" preserveAspectRatio="xMidYMid meet">
          <!-- 海洋 -->
          <rect width="600" height="540" fill="#a8c8e0" rx="8"/>
          <!-- 非洲大陆 -->
          ${africaShape}
          ${arabia}
          ${labels}
          <!-- 演化路径 + 化石点 -->
          ${evoSvg}
        </svg>
      </div>
      ${evoList ? `
        <div class="evo-map-list">
          <div class="evo-map-list-title">🦴 演化路径 · 按时间排序（点击地图编号可对应）</div>
          ${evoList}
        </div>` : ''}
    </div>
  </section>`;
}

function renderPreLayer3(p) {
  const tabs = p.regions.map((r, i) =>
    `<button class="preg-tab ${i===0?'active':''}" data-rid="${r.id}">${r.icon||'🌍'} ${r.name}</button>`
  ).join('');
  return `<section class="pre-layer" id="pre-region">
    <div class="pl-header"><span class="pl-icon">🏔</span><div><h3>文明区域</h3><p class="pl-sub">这个时代各地区的状态</p></div></div>
    <div class="preg-tabs">${tabs}</div>
    <div class="preg-detail" id="preRegionDetail"></div>
  </section>`;
}

function renderPreRegionDetail(r, el) {
  if (!el) return;
  el.innerHTML = `
    <div class="preg-title-row">
      <h4>${r.name}</h4>
      ${wikiBtn(r.name, r.wiki_en)}
    </div>
    <p class="preg-desc">${r.description}</p>
    <div class="preg-grid">
      ${r.environment ? `<div><strong>环境</strong><span>${r.environment}</span></div>` : ''}
      ${r.population ? `<div><strong>人口</strong><span>${r.population}</span></div>` : ''}
      ${r.lifestyle  ? `<div><strong>生活方式</strong><span>${r.lifestyle}</span></div>` : ''}
      ${r.challenge  ? `<div><strong>主要挑战</strong><span>${r.challenge}</span></div>` : ''}
    </div>
    <button class="sl-btn" onclick="speakText('${esc(r.name + '。' + r.description)}')">🔊 朗读</button>`;
}

function renderPreLayer4(p) {
  // 🖼 图片优先：如果有 themes_image，用图替代所有文字主题
  if (p.themes_image) {
    return `<section class="pre-layer" id="pre-theme">
      <div class="pl-header"><span class="pl-icon">💡</span><div><h3>知识主题</h3><p class="pl-sub">这个时代的核心问题与知识</p></div></div>
      ${renderHeroImage(p.themes_image, '知识主题图', p.themes_image_caption)}
    </section>`;
  }
  const cards = p.themes.map(t => `
    <div class="pth-card">
      ${t.image ? `<img class="pth-image" src="${t.image}" alt="${t.title}" loading="lazy"/>` : `<div class="pth-icon">${t.icon}</div>`}
      <div class="pth-title-row"><h4>${t.title}</h4>${wikiBtn(t.title)}</div>
      ${!t.image ? `<p class="pth-sum">${t.summary}</p>
        <ul>${t.content.map(c=>`<li>${c}</li>`).join('')}</ul>` : `<p class="pth-sum">${t.summary}</p>`}
      ${t.caution ? `<div class="pth-caution">⚠ ${t.caution}</div>` : ''}
    </div>`).join('');
  return `<section class="pre-layer" id="pre-theme">
    <div class="pl-header"><span class="pl-icon">💡</span><div><h3>知识主题</h3><p class="pl-sub">这个时代的核心问题与知识</p></div></div>
    <div class="pth-grid">${cards}</div>
  </section>`;
}

function renderPreLayer5(p) {
  // 🖼 图片优先：整层用一张图替代
  if (p.evidence_image) {
    return `<section class="pre-layer" id="pre-evidence">
      <div class="pl-header"><span class="pl-icon">🔍</span><div><h3>证据物</h3><p class="pl-sub">我们怎么知道这些历史</p></div></div>
      ${renderHeroImage(p.evidence_image, '证据物图', p.evidence_image_caption)}
    </section>`;
  }
  const items = p.evidence.map(ev => `
    <div class="pev-card">
      ${ev.image ? `<img class="pev-image" src="${ev.image}" alt="${ev.name}" loading="lazy"/>` : `<div class="pev-emoji">${ev.emoji}</div>`}
      <div class="pev-body">
        <div class="pev-title-row">
          <h4>${ev.name}</h4>
          ${wikiBtn(ev.name, ev.wiki_en)}
        </div>
        <p>${ev.description}</p>
        <div class="pev-qa">
          <div><strong>能告诉我们</strong><span>${ev.tells}</span></div>
          <div><strong>不能告诉我们</strong><span>${ev.cannot_tell}</span></div>
        </div>
        ${ev.question ? `<div class="pev-q">💬 ${ev.question}</div>` : ''}
      </div>
    </div>`).join('');
  return `<section class="pre-layer" id="pre-evidence">
    <div class="pl-header"><span class="pl-icon">🔍</span><div><h3>证据物</h3><p class="pl-sub">我们怎么知道这些历史</p></div></div>
    <div class="pev-list">${items}</div>
  </section>`;
}

function renderPreLayer6(p) {
  const s = p.story;
  // 🎬 仅 PH01 配视频 — 一个完整的迁徙故事：
  // 河边生活 → 水源枯竭 → 群体讨论 → 阿婆带路 → 走向远方
  const videos = p.id === 'PH01' ? [
    { src: 'videos/ph01-2.mp4', title: '🌊 河边的生活',     caption: '族群依水而居——水、鱼、植物、野兽都靠这条河。这是文明前夜的日常。' },
    { src: 'videos/ph01-4.mp4', title: '🏜 水源枯竭',       caption: '河变浅，鱼变少，植物枯萎。族群面临生存危机——必须做决定。' },
    { src: 'videos/ph01-3.mp4', title: '🔥 围火讨论 · 准备迁徙', caption: '夜晚围着火，大家激烈讨论：要不要走？往哪里走？谁带路？这是最早的集体决策。' },
    { src: 'videos/ph01-1.mp4', title: '👵 阿婆带路',       caption: '部族里最年长的女性记得几十年前找到过另一片水源——她的记忆，就是部落的"地图"。' },
    { src: 'videos/ph01-5.mp4', title: '🌍 走向远方',       caption: '族群跟随阿婆离开旧河岸，向远方迁徙。几万年后，他们的后代将走遍世界。' },
  ] : [];

  const videoHtml = videos.length > 0 ? `
    <div class="pst-video-section">
      <div class="pst-video-title">
        <span>🎬 视觉化：30 万年前的世界</span>
        <span class="pst-video-hint">点击任意视频播放</span>
      </div>
      <div class="pst-video-grid">
        ${videos.map((v, i) => `
          <div class="pst-video-card">
            <div class="pst-video-wrap">
              <video class="pst-video" src="${v.src}" preload="metadata" playsinline controls></video>
              <div class="pst-video-mask"></div>
            </div>
            <div class="pst-video-meta">
              <div class="pst-video-name">${i+1}. ${v.title}</div>
              <div class="pst-video-cap">${v.caption}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>` : '';

  return `<section class="pre-layer" id="pre-story">
    <div class="pl-header"><span class="pl-icon">📖</span><div><h3>故事讲解</h3><p class="pl-sub">${s.title} · ${s.setting}</p></div></div>
    <div class="pst-card">
      ${s.image ? `<img class="pst-image" src="${s.image}" alt="${s.title}" loading="lazy"/>` : ''}
      <h4>${s.title}</h4>
      <p class="pst-setting">${s.setting}</p>
      ${s.paragraphs.map(para => `<p class="pst-para">${para}</p>`).join('')}
      <div class="pst-insight">💡 ${s.key_insight}</div>
      <div class="pst-q">🗣 ${s.discussion_question}</div>
      <button class="sl-btn" onclick="speakText('${esc(s.paragraphs.join(' '))}')">🔊 朗读故事</button>
      ${videoHtml}
    </div>
  </section>`;
}

function renderPreLayer7(p) {
  const cmps = p.comparisons || [];
  const cards = cmps.map(c => `
    <div class="pcmp-wrap">
      <h4>${c.title}</h4>
      <p class="pl-sub">${c.dimension}</p>
      <div class="pcmp-grid">
        <div class="pcmp-side left">
          <div class="pcmp-icon">${c.left.icon||''}</div>
          <strong>${c.left.name}</strong>
          <p>${c.left.description}</p>
        </div>
        <div class="pcmp-vs">VS</div>
        <div class="pcmp-side right">
          <div class="pcmp-icon">${c.right.icon||''}</div>
          <strong>${c.right.name}</strong>
          <p>${c.right.description}</p>
        </div>
      </div>
      <div class="pcmp-insight">💡 ${c.insight}</div>
    </div>`).join('');

  const idx = PREHISTORIC.periods.findIndex(ep => ep.id === p.id);
  const prev = PREHISTORIC.periods[idx - 1];
  const next = PREHISTORIC.periods[idx + 1];
  const nav = `<div class="pcmp-nav">
    ${prev ? `<button class="sl-btn" onclick="enterPreEra('${prev.id}')">← ${prev.icon} ${prev.title}</button>` : '<span></span>'}
    ${next ? `<button class="sl-btn" onclick="enterPreEra('${next.id}')">${next.icon} ${next.title} →</button>` : `<button class="sl-btn" onclick="enterLesson('L01')">→ 进入文明史 L01</button>`}
  </div>`;

  return `<section class="pre-layer" id="pre-compare">
    <div class="pl-header"><span class="pl-icon">⚖</span><div><h3>对比关系</h3><p class="pl-sub">与前后时代的关键差异</p></div></div>
    ${cards || '<p class="pre-empty">即将补充对比内容</p>'}
    ${nav}
  </section>`;
}

function renderPreLayer8(p) {
  const ai = p.ai;
  const chips = ai.suggested_questions.map(q =>
    `<button class="suggestion-chip">${q}</button>`).join('');
  const hasKey = !!(state.apiKey && state.apiKey.startsWith('sk-'));
  const provider = state.aiProvider || 'qwen';
  const providerName = provider === 'qwen' ? '通义千问' : 'Claude';
  const providerIcon = provider === 'qwen' ? '🟢' : '🔵';
  const modelName = state.aiModel || (provider === 'qwen' ? 'qwen-turbo' : 'claude-haiku-4-5');
  const statusBanner = hasKey
    ? `<div class="ai-status-banner ai-status-on">
         <span class="ai-status-dot"></span>
         <strong>${providerIcon} ${providerName} 已连接</strong>
         <span class="ai-status-model">${modelName}</span>
         <button class="ai-status-action" onclick="showAIKeySetup()">更换 / 切换</button>
       </div>`
    : `<div class="ai-status-banner ai-status-off">
         <span class="ai-status-dot"></span>
         <strong>⚠ 当前是知识库模式</strong>
         <span class="ai-status-hint">只会展示资料，不会真正对话。推荐接入<strong>免费的通义千问</strong> →</span>
         <button class="ai-status-action ai-status-cta" onclick="showAIKeySetup()">🔑 免费接入 AI</button>
       </div>`;
  return `<section class="pre-layer" id="pre-ai">
    <div class="pl-header"><span class="pl-icon">🤖</span><div><h3>AI互动</h3><p class="pl-sub">向AI提问、质检、探索</p></div></div>
    <div class="pre-ai-panel pre-ai-panel-large">
      ${statusBanner}
      <div class="chat-messages chat-messages-large" id="preAIMsgs"></div>
      <div class="chat-suggestions chat-suggestions-large" id="preAISuggestions">${chips}</div>
      <div class="chat-input-row chat-input-row-large">
        <textarea id="preAIInput" placeholder="问关于${p.title}的任何问题…" rows="3"></textarea>
        <button id="preAISend" class="primary-button">发送</button>
      </div>
      ${ai.check_prompt ? `<div class="pre-ai-check"><strong>💡 质检提示：</strong>${ai.check_prompt}</div>` : ''}
    </div>
  </section>`;
}

// 弹出 API Key 设置面板（默认推荐免费的千问 Qwen，也支持 Claude）
function showAIKeySetup() {
  const existing = document.getElementById('aiKeySetupOverlay');
  if (existing) existing.remove();
  const currentProvider = state.aiProvider || 'qwen';
  const currentKey = state.apiKey || '';
  const ov = document.createElement('div');
  ov.id = 'aiKeySetupOverlay';
  ov.className = 'ai-key-setup-overlay';
  ov.innerHTML = `
    <div class="ai-key-setup-modal">
      <button class="ai-key-close" onclick="document.getElementById('aiKeySetupOverlay').remove()">✕</button>
      <div class="ai-key-head">
        <span class="ai-key-icon">🔑</span>
        <h3>接入 AI · 让对话真正"活"起来</h3>
      </div>
      <div class="ai-key-body">
        <p class="ai-key-tip">选择一个 AI 提供商。<strong>推荐千问（免费额度大）</strong>，也支持 Claude（按量付费）。</p>

        <div class="ai-provider-tabs">
          <button class="ai-provider-tab ${currentProvider==='qwen'?'active':''}" data-provider="qwen" onclick="switchAIProviderTab('qwen')">
            🟢 通义千问（免费推荐）
          </button>
          <button class="ai-provider-tab ${currentProvider==='claude'?'active':''}" data-provider="claude" onclick="switchAIProviderTab('claude')">
            🔵 Claude（付费 · 更深）
          </button>
        </div>

        <!-- 千问 Qwen 面板 -->
        <div class="ai-provider-pane ${currentProvider==='qwen'?'active':'hidden'}" data-pane="qwen">
          <p><strong>为什么推荐千问？</strong></p>
          <ul>
            <li>阿里云通义千问，<strong>每月有免费 token 额度</strong>（qwen-turbo / qwen-plus 等模型）</li>
            <li>中文表现优秀，特别适合中小学历史/语文场景</li>
            <li>免费就能跑——不用绑信用卡也能开始</li>
          </ul>
          <p><strong>如何获取 API Key（约 3 分钟）：</strong></p>
          <ol>
            <li>访问 <a href="https://bailian.console.aliyun.com/" target="_blank" rel="noreferrer">bailian.console.aliyun.com</a>（阿里云百炼控制台），用支付宝/淘宝账号即可登录</li>
            <li>左侧菜单 → <em>API-KEY 管理</em> → 创建 API Key，复制以 <code>sk-…</code> 开头的字符串</li>
            <li>首次使用需在控制台"模型广场"激活 <em>qwen-turbo</em> 等免费模型</li>
          </ol>
          <p class="ai-key-cost-note">💰 免费额度：qwen-turbo 等模型每月百万 token 免费；超出后按量计费极便宜（人民币计价）</p>
          <p class="ai-key-privacy">🔒 Key 只保存在本地浏览器 localStorage，不会上传到任何服务器。</p>
          <label class="ai-key-input-label">
            <span>粘贴你的千问 API Key</span>
            <input type="password" id="aiKeyInputQwen" placeholder="sk-…（阿里云百炼控制台获取）" value="${currentProvider==='qwen' ? currentKey : ''}"/>
          </label>
          <label class="ai-key-input-label">
            <span>模型（默认 qwen-turbo，免费额度最大）</span>
            <select id="aiModelQwen">
              <option value="qwen-turbo" ${(state.aiModel==='qwen-turbo'||!state.aiModel)?'selected':''}>qwen-turbo（最快 · 免费额度最大）</option>
              <option value="qwen-plus" ${state.aiModel==='qwen-plus'?'selected':''}>qwen-plus（平衡 · 推荐）</option>
              <option value="qwen-max" ${state.aiModel==='qwen-max'?'selected':''}>qwen-max（最强 · 限额较小）</option>
              <option value="qwen3-32b-instruct" ${state.aiModel==='qwen3-32b-instruct'?'selected':''}>qwen3-32b-instruct（最新开源版）</option>
            </select>
          </label>
          <div class="ai-key-actions">
            <button class="primary-button" onclick="saveAIKeyInline('qwen')">保存并测试连接</button>
            <button class="secondary-button" onclick="document.getElementById('aiKeySetupOverlay').remove()">取消</button>
          </div>
        </div>

        <!-- Claude 面板 -->
        <div class="ai-provider-pane ${currentProvider==='claude'?'active':'hidden'}" data-pane="claude">
          <p><strong>Claude（Anthropic）特点：</strong></p>
          <ul>
            <li>推理深度强、错误率低、安全性高</li>
            <li>按量计费（无免费额度，但 haiku 极便宜）</li>
            <li>需要海外信用卡注册</li>
          </ul>
          <p><strong>如何获取（约 2 分钟）：</strong></p>
          <ol>
            <li>访问 <a href="https://console.anthropic.com/" target="_blank" rel="noreferrer">console.anthropic.com</a> 注册</li>
            <li><em>Settings → API Keys → Create Key</em>，复制 <code>sk-ant-…</code></li>
          </ol>
          <p class="ai-key-cost-note">💰 claude-haiku-4-5 约 $0.001–0.005 USD/次（一杯咖啡千次对话）</p>
          <label class="ai-key-input-label">
            <span>粘贴你的 Anthropic API Key</span>
            <input type="password" id="aiKeyInputClaude" placeholder="sk-ant-api03-…" value="${currentProvider==='claude' ? currentKey : ''}"/>
          </label>
          <div class="ai-key-actions">
            <button class="primary-button" onclick="saveAIKeyInline('claude')">保存并测试连接</button>
            <button class="secondary-button" onclick="document.getElementById('aiKeySetupOverlay').remove()">取消</button>
          </div>
        </div>

        <div id="aiKeyTestResult" class="ai-key-test"></div>
      </div>
    </div>`;
  document.body.appendChild(ov);
}

function switchAIProviderTab(provider) {
  document.querySelectorAll('.ai-provider-tab').forEach(b =>
    b.classList.toggle('active', b.getAttribute('data-provider') === provider));
  document.querySelectorAll('.ai-provider-pane').forEach(p => {
    const active = p.getAttribute('data-pane') === provider;
    p.classList.toggle('active', active);
    p.classList.toggle('hidden', !active);
  });
}

async function saveAIKeyInline(provider) {
  const result = document.getElementById('aiKeyTestResult');
  let key, model, endpoint, headers, body, parseReply;

  if (provider === 'qwen') {
    key = (document.getElementById('aiKeyInputQwen').value || '').trim();
    model = document.getElementById('aiModelQwen').value || 'qwen-turbo';
    if (!key.startsWith('sk-')) {
      result.innerHTML = '<span class="ai-key-err">❌ 千问 Key 应以 sk- 开头（阿里云百炼控制台获取）</span>';
      return;
    }
    endpoint = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';
    headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key };
    body = JSON.stringify({
      model,
      max_tokens: 32,
      messages: [{ role: 'user', content: '回复"OK"两个字。' }],
    });
    parseReply = d => d.choices?.[0]?.message?.content || '(空)';
  } else if (provider === 'claude') {
    key = (document.getElementById('aiKeyInputClaude').value || '').trim();
    model = 'claude-haiku-4-5-20251001';
    if (!key.startsWith('sk-ant')) {
      result.innerHTML = '<span class="ai-key-err">❌ Claude Key 应以 sk-ant 开头</span>';
      return;
    }
    endpoint = 'https://api.anthropic.com/v1/messages';
    headers = {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    };
    body = JSON.stringify({
      model, max_tokens: 32,
      messages: [{ role: 'user', content: '回复"OK"两个字。' }],
    });
    parseReply = d => d.content?.[0]?.text || '(空)';
  }

  result.innerHTML = '⏳ 正在测试连接 ' + (provider === 'qwen' ? '通义千问' : 'Claude') + '…';

  try {
    const res = await fetch(endpoint, { method: 'POST', headers, body });
    if (!res.ok) {
      const errBody = await res.text();
      throw new Error(`HTTP ${res.status} · ${errBody.slice(0, 300)}`);
    }
    const data = await res.json();
    const reply = parseReply(data);
    // 保存
    state.apiKey = key;
    state.aiProvider = provider;
    state.aiModel = model;
    localStorage.setItem('civ_api_key', key);
    localStorage.setItem('civ_ai_provider', provider);
    localStorage.setItem('civ_ai_model', model);
    result.innerHTML = `<span class="ai-key-ok">✓ 连接成功！${provider === 'qwen' ? '千问' : 'Claude'} 回复：${reply.slice(0, 50)}</span>
      <p style="margin-top:8px">关闭此窗口后即可开始真正的 AI 对话。</p>`;
    setTimeout(() => {
      const p = PREHISTORIC.periods.find(x => x.id === activePreEraId);
      const modal = document.getElementById('fullscreenContentModal');
      if (p && modal && !modal.classList.contains('hidden')) {
        document.getElementById('aiKeySetupOverlay')?.remove();
        showImageOverlayPlay('ai');
      }
    }, 1500);
  } catch (e) {
    result.innerHTML = `<span class="ai-key-err">❌ 连接失败：${e.message}<br>
      请检查：1) Key 是否正确；2) ${provider === 'qwen' ? '是否激活了对应模型（控制台模型广场）' : '网络能否访问 api.anthropic.com'}；3) 是否有 CORS 阻拦</span>`;
  }
}

function renderPreLayer9(p) {
  const art = p.artifact;
  const fields = art.fields.map(f => `
    <label>${f.label}${f.required ? ' <span class="req">*</span>' : ''}
      <textarea placeholder="${f.placeholder}" rows="2" data-fid="${f.id}"></textarea>
    </label>`).join('');
  return `<section class="pre-layer" id="pre-works">
    <div class="pl-header"><span class="pl-icon">✏</span><div><h3>作品 / 笔记</h3><p class="pl-sub">${art.title}</p></div></div>
    <div class="pre-works-layout">
      <div class="pre-works-task">
        <h4>${art.title}</h4>
        <p class="pre-task-inst">${art.instructions}</p>
        <div class="pre-task-fields">${fields}</div>
        ${art.fact_vs_fiction ? `<div class="pre-fvf">✅ 完成后请标注：哪些内容基于历史事实，哪些是你的想象？</div>` : ''}
      </div>
      <div class="pre-notepad-box">
        <p class="pl-sub">我的探索笔记</p>
        <textarea id="preNotepad" class="pre-notepad" rows="12" placeholder="写下你的发现、问题、想象…"></textarea>
        <div style="display:flex;gap:8px;margin-top:8px">
          <button id="preNoteSave" class="primary-button">保存笔记</button>
          <button class="secondary-button" onclick="speakText(document.getElementById('preNotepad').value)">🔊 朗读</button>
        </div>
      </div>
    </div>
  </section>`;
}

// ── 史前 AI 对话 ──────────────────────────────────
async function sendPreAIMsg(p, inputEl, msgsEl) {
  const text = inputEl.value.trim();
  if (!text) return;
  inputEl.value = '';
  addPreAIMsg(msgsEl, 'user', text);
  preAiHistory[p.id] = preAiHistory[p.id] || [];
  preAiHistory[p.id].push({ role: 'user', html: text });
  logHistory('chat', `史前AI(${p.time})：${text}`);
  trackUserQuestion(text, p.id + ' · ' + p.title);  // 🆕 学习画像追踪

  const thinkId = 'prethink-' + Date.now();
  addPreAIMsg(msgsEl, 'ai', '<em>正在思考…</em>', thinkId);

  let resp;
  if (state.apiKey) {
    resp = await callPreClaudeAPI(text, p);
  } else {
    resp = await getPreKBResponse(text, p);
  }

  document.getElementById(thinkId)?.closest('.chat-message')?.remove();
  addPreAIMsg(msgsEl, 'ai', resp);
  preAiHistory[p.id].push({ role: 'ai', html: resp });
}

function addPreAIMsg(msgsEl, role, html, id) {
  if (!msgsEl) return;
  const div = document.createElement('div');
  div.className = `chat-message ${role}`;
  if (id) div.id = id;
  div.innerHTML = `<div class="message-avatar">${role === 'ai' ? 'AI' : '你'}</div><div class="message-bubble">${html.includes('<') ? html : `<p>${html}</p>`}</div>`;
  msgsEl.appendChild(div);
  msgsEl.scrollTop = msgsEl.scrollHeight;
}

// ══════════════════════════════════════════════════════
// 📖 维基百科作为权威知识源 · Wikipedia as Source of Truth
// ══════════════════════════════════════════════════════

// 缓存维基百科摘要（避免重复请求）
const wikiCache = {};

// 通过 Wikipedia REST API 拉取词条摘要（CORS 友好，无需后端）
// 🆕 用 Wikipedia 全文搜索 API 找到与问题最相关的词条
// 策略：清洗问题 → 尝试多个 query 组合 → 取首个有结果的
async function searchWikiByQuestion(question, lang = 'zh', limit = 4) {
  if (!question || question.length < 1) return [];

  // 中文不能用 \b 词边界，直接字符串替换去常见疑问词/停用词/填充词
  const stopwords = [
    '请问','帮我','告诉我','我想知道','想问','能否','可以','请',
    '为什么','什么时候','什么意思','什么叫','什么是','是什么','什么样','什么',
    '哪里','哪个','哪些','哪一','哪',
    '谁是','谁',
    '怎么样','怎么','怎样','如何','为何',
    '多少','几个','几年','多久',
    '是不是','有没有','是吗','对吗',
    '啊','呢','吗','了','的','吧','哦',
    '一下','一点','一些','一直','一种','一样',
    // 程度副词 / 填充词
    '这么','那么','这样','那样','这种','那种',
    '很','非常','特别','比较','更','最','极',
    '可能','应该','大概','大约','一定','也许',
    '我','你','他','她','它','我们','你们','他们',
    '在','是','有','和','与','或','跟','给','把','被','让','使','对',
  ];
  let cleaned = (question || '').replace(/[？?。.，,！!~～「」""''《》、；;：:、]/g, ' ');
  stopwords.forEach(w => { cleaned = cleaned.split(w).join(' '); });
  cleaned = cleaned.replace(/\s+/g, ' ').trim();

  // 提取关键 token（英文专有名词 + 中文 2-3 字词）
  const englishTokens = cleaned.match(/[A-Za-z][A-Za-z\s]{2,}/g) || [];
  const chineseTokens = cleaned.match(/[一-龥]{2,3}/g) || [];

  // 多个候选 query 策略，按精确度排序尝试
  const candidates = [];
  // 1. 英文专有名词 + 1-2 个中文关键词（最精确）
  if (englishTokens.length > 0 && chineseTokens.length > 0) {
    candidates.push((englishTokens[0] + ' ' + chineseTokens.slice(0, 2).join(' ')).trim());
  }
  // 2. 只用英文专有名词
  if (englishTokens.length > 0) {
    candidates.push(englishTokens.join(' ').trim());
  }
  // 3. 用前 2 个中文 token
  if (chineseTokens.length > 0) {
    candidates.push(chineseTokens.slice(0, 2).join(' '));
  }
  // 4. 完整清洗后的字符串作为兜底
  if (cleaned && !candidates.includes(cleaned)) candidates.push(cleaned);
  // 5. 单个最长中文 token（最宽泛）
  if (chineseTokens.length > 0) {
    const longest = chineseTokens.reduce((a, b) => a.length >= b.length ? a : b);
    if (!candidates.includes(longest)) candidates.push(longest);
  }

  // 尝试每个 query，找到第一个有结果的
  for (const q of candidates) {
    if (!q || q.length < 2) continue;
    try {
      const url = `https://${lang}.wikipedia.org/w/rest.php/v1/search/page?q=${encodeURIComponent(q)}&limit=${limit}`;
      const res = await fetch(url);
      if (!res.ok) continue;
      const data = await res.json();
      if (data.pages && data.pages.length > 0) {
        console.log('[WikiSearch] hit with query:', JSON.stringify(q), '→', data.pages.length, 'results');
        return data.pages.map(p => ({
          title: p.title,
          key: p.key,
          excerpt: (p.excerpt || '').replace(/<[^>]+>/g, ''),
          thumbnail: p.thumbnail?.url ? (p.thumbnail.url.startsWith('//') ? 'https:' + p.thumbnail.url : p.thumbnail.url) : null,
        }));
      }
    } catch (e) {
      console.warn('[WikiSearch]', q, e);
    }
  }
  return [];
}

async function fetchWikiSummary(topic, lang = 'zh') {
  const cacheKey = `${lang}:${topic}`;
  if (wikiCache[cacheKey]) return wikiCache[cacheKey];
  try {
    const url = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`;
    const res = await fetch(url);
    if (!res.ok) {
      // Try alternative: search API to find correct title
      const searchUrl = `https://${lang}.wikipedia.org/w/rest.php/v1/search/title?q=${encodeURIComponent(topic)}&limit=1`;
      const sr = await fetch(searchUrl);
      if (!sr.ok) { wikiCache[cacheKey] = null; return null; }
      const sd = await sr.json();
      if (!sd.pages || !sd.pages.length) { wikiCache[cacheKey] = null; return null; }
      // Refetch with correct title
      const correctTitle = sd.pages[0].key;
      const url2 = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(correctTitle)}`;
      const r2 = await fetch(url2);
      if (!r2.ok) { wikiCache[cacheKey] = null; return null; }
      const d = await r2.json();
      const out = {
        title: d.title, extract: d.extract,
        url: d.content_urls?.desktop?.page || `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(d.title)}`,
        thumbnail: d.thumbnail?.source,
      };
      wikiCache[cacheKey] = out;
      return out;
    }
    const data = await res.json();
    const out = {
      title: data.title, extract: data.extract,
      url: data.content_urls?.desktop?.page || `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(data.title)}`,
      thumbnail: data.thumbnail?.source,
    };
    wikiCache[cacheKey] = out;
    return out;
  } catch (e) {
    console.warn('[Wiki]', topic, e);
    return null;
  }
}

// 从用户问题 + 课程主题 提取最相关的维基词条名
function pickWikiTopics(question, p) {
  // 优先使用课程数据里定义的 wiki_topics；否则用 era 标题
  const baseTopics = (p.ai && p.ai.wiki_topics) || [p.title];
  // 简单关键词匹配：把 question 中出现的概念也加进来
  // 注意：必须用中文维基百科的准确条目名（避免搜索误命中同名乐队/电影等）
  const candidateMap = {
    'lucy': '阿法南方古猿', '露西': '阿法南方古猿', '南方古猿': '阿法南方古猿',
    '智人': '智人', 'homo sapiens': '智人', 'sapiens': '智人',
    '直立人': '直立人', 'erectus': '直立人',
    '直立行走': '双足步行', '双足': '双足步行',
    '工具': '石器', '石器': '石器',
    '火': '用火',
    '非洲': '走出非洲假说', '迁徙': '人类迁徙', '走出': '走出非洲假说',
    '洞穴': '洞穴壁画', '壁画': '洞穴壁画', '艺术': '洞穴壁画',
    '农业': '农业革命', '种地': '农业革命', '驯化': '驯化',
    '村落': '加泰土丘', '定居': '加泰土丘', '耶利哥': '杰里科',
    '城市': '乌鲁克',
    '楔形': '楔形文字', '文字': '文字',
    '埃及': '古埃及', '法老': '法老', '金字塔': '吉萨金字塔',
    '两河': '美索不达米亚', '苏美尔': '苏美尔', '美索不达米亚': '美索不达米亚',
    '青铜': '青铜时代', '青铜时代': '青铜时代',
    '孔子': '孔子', '佛陀': '釋迦牟尼', '苏格拉底': '苏格拉底',
    '罗马': '罗马帝国', '丝绸': '丝绸之路', '丝路': '丝绸之路',
    '哥贝克力': '哥贝克力石阵', '良渚': '良渚文化',
    '冰河': '末次冰期', '冰期': '末次冰期', '猛犸': '猛犸象',
  };
  const extra = [];
  const lower = question.toLowerCase();
  Object.entries(candidateMap).forEach(([kw, topic]) => {
    if (lower.includes(kw.toLowerCase()) && !baseTopics.includes(topic)) {
      extra.push(topic);
    }
  });
  return [...extra, ...baseTopics].slice(0, 3); // 最多 3 个，避免 prompt 过长
}

// 用 Claude API + 维基百科上下文回答
// 🆕 统一的 wiki 词条收集流程：
// 1. 先用 question 全文搜索 Wikipedia（中文 → 英文）找最相关的 3 个词条
// 2. 拉取这些词条的完整摘要
// 3. 若没结果，再用 era 的默认 wiki_topics 兜底
async function gatherWikiContext(question, p, maxArticles = 3) {
  const out = [];
  const seenTitles = new Set();

  // Step 1: 先用问题搜索中文维基
  let hits = await searchWikiByQuestion(question, 'zh', maxArticles);
  // 中文没结果再搜英文
  if (hits.length === 0) {
    hits = await searchWikiByQuestion(question, 'en', maxArticles);
  }

  for (const hit of hits.slice(0, maxArticles)) {
    if (seenTitles.has(hit.title)) continue;
    seenTitles.add(hit.title);
    // 拉完整摘要
    let r = await fetchWikiSummary(hit.key || hit.title, 'zh');
    if (!r) r = await fetchWikiSummary(hit.key || hit.title, 'en');
    if (r) out.push(r);
  }

  // Step 2: 如果搜索完全没结果，用 era 默认 wiki_topics 兜底
  if (out.length === 0) {
    const fallbackTopics = (p.ai && p.ai.wiki_topics) || [p.title];
    for (const topic of fallbackTopics.slice(0, 2)) {
      let r = await fetchWikiSummary(topic, 'zh');
      if (!r) r = await fetchWikiSummary(topic, 'en');
      if (r && !seenTitles.has(r.title)) {
        seenTitles.add(r.title);
        out.push(r);
      }
    }
  }

  return out;
}

async function callPreClaudeAPI(msg, p) {
  // 🧠 用统一知识库检索（内部课程内容 + 外部维基百科）
  const kbResult = KB && KB.search
    ? await KB.search(msg, { era: p.id })
    : { internal: [], external: await gatherWikiContext(msg, p, 3) };

  const internalContext = kbResult.internal.length > 0
    ? kbResult.internal.map(e =>
        `[内部·${e.type}·${e.source_label}] 《${e.title}》\n${e.body.slice(0, 300)}`
      ).join('\n\n')
    : '';
  const externalContext = kbResult.external.length > 0
    ? kbResult.external.map(r =>
        `[维基百科]《${r.title}》\n${r.body}\n来源：${r.url}`
      ).join('\n\n---\n\n')
    : '';

  const fullContext = [internalContext, externalContext].filter(Boolean).join('\n\n═══\n\n')
    || '（知识库未找到相关内容，请告诉用户暂时无法查到准确信息，建议换个问法）';

  const userProfile = getUserProfile() || {};
  const userName = userProfile.nickname || '朋友';
  const userAge = userProfile.age || 10;

  const systemPrompt = `我是 AI 世界文明实验室的史前历史助手，正在和 ${userAge} 岁的 ${userName} 对话。

# 我的回答方式
- 我用第一人称「我」回答，称呼对方为「${userName}」
- 我用 ${userAge} 岁能理解的中文（不用专业术语，多用比喻和故事）
- 我的回答控制在 100-200 字，简洁不啰嗦
- 我严格围绕 ${userName} 实际问的问题作答，不答非所问

# 知识来源规则（重要）
我的回答必须严格基于下方"知识库参考资料"。资料分两类：
- [内部] 课程本身的内容（${userName} 已在课程中接触过）
- [维基百科] 外部权威资料（根据 ${userName} 问题动态检索）

如果资料里有内容 → 整合回答 + 末尾标注「💡 课程提到」或「📖 维基百科」来源
如果资料里没提到 → 直接说"知识库里暂时没找到具体答案"，绝不编造

# 知识库参考资料（针对本次问题动态检索）
${fullContext}

# 当前课程背景
${p.title} · ${p.time}`;

  try {
    const provider = state.aiProvider || 'qwen';
    let text;
    if (provider === 'qwen') {
      const model = state.aiModel || 'qwen-turbo';
      const res = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + state.apiKey },
        body: JSON.stringify({
          model,
          max_tokens: 800,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: msg },
          ],
        }),
      });
      if (!res.ok) throw new Error('Qwen API ' + res.status + ' · ' + (await res.text()).slice(0,200));
      const data = await res.json();
      text = (data.choices?.[0]?.message?.content || '').replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
    } else {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': state.apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 600,
          system: systemPrompt,
          messages: [{ role: 'user', content: msg }],
        }),
      });
      if (!res.ok) throw new Error('Claude API ' + res.status);
      const data = await res.json();
      text = data.content[0].text.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
    }

    // 显示知识来源
    const internalChips = kbResult.internal.map(e =>
      `<span class="kb-chip internal" title="${esc(e.source_label)}">💡 ${e.title}</span>`
    ).join(' ');
    const externalChips = kbResult.external.map(r =>
      `<a href="${r.url}" target="_blank" rel="noreferrer" class="kb-chip external">📖 ${r.title}</a>`
    ).join(' ');

    return `<p>${text}</p>
      <div class="ai-kb-sources">
        <strong>🧠 知识来源：</strong>
        ${internalChips ? `<div class="kb-src-row"><span class="kb-src-label">课程</span>${internalChips}</div>` : ''}
        ${externalChips ? `<div class="kb-src-row"><span class="kb-src-label">维基</span>${externalChips}</div>` : ''}
      </div>`;
  } catch (e) {
    return `<p>⚠ AI 连接失败（${e.message}），降级显示知识库原文：</p>${await getPreKBResponse(msg, p)}`;
  }
}

// 无 API Key 时，直接展示根据问题搜索到的知识库内容（内部 + 维基）
async function getPreKBResponse(q, p) {
  const kbResult = KB && KB.search
    ? await KB.search(q, { era: p.id })
    : { internal: [], external: await gatherWikiContext(q, p, 3) };

  if (kbResult.internal.length === 0 && kbResult.external.length === 0) {
    return `<p>🔍 知识库里没找到关于「${q}」的内容。</p>
            <p>试试换种问法，或参考这些建议问题：</p>
            <ul>${(p.ai.suggested_questions || []).map(qq => `<li>「${qq}」</li>`).join('')}</ul>`;
  }

  let html = '';
  if (kbResult.internal.length > 0) {
    html += '<p><strong>💡 课程内部知识：</strong></p>';
    html += kbResult.internal.map(e => `
      <div class="kb-internal-card">
        <div class="kb-card-meta">${e.type} · ${e.source_label}</div>
        <h5>${e.title}</h5>
        <p>${e.body.slice(0, 240)}${e.body.length > 240 ? '…' : ''}</p>
      </div>`).join('');
  }
  if (kbResult.external.length > 0) {
    html += '<p><strong>📖 维基百科外部知识：</strong></p>';
    html += kbResult.external.map(r => `
      <div class="wiki-card">
        ${r.thumbnail ? `<img src="${r.thumbnail}" class="wiki-card-img" alt=""/>` : ''}
        <div class="wiki-card-body">
          <h5>📖 ${r.title} <span class="wiki-card-src">维基百科</span></h5>
          <p>${r.body}</p>
          <a href="${r.url}" target="_blank" rel="noreferrer" class="wiki-btn zh">查看完整词条 →</a>
        </div>
      </div>`).join('');
  }
  return html + '<p class="kb-note">💡 想要 AI 用 10-12 岁能懂的话解读？请在设置中添加 Claude API Key。</p>';
}

// ══════════════════════════════════════════════════════
// 👤 用户档案 · 学习画像追踪
// ══════════════════════════════════════════════════════

function getUserProfile() {
  try { return JSON.parse(localStorage.getItem('civ_user_profile') || 'null'); }
  catch { return null; }
}
function saveUserProfile(p) { localStorage.setItem('civ_user_profile', JSON.stringify(p)); }

function getUserActivity() {
  try { return JSON.parse(localStorage.getItem('civ_user_activity') || '{}'); }
  catch { return {}; }
}
function saveUserActivity(a) { localStorage.setItem('civ_user_activity', JSON.stringify(a)); }

function trackUserQuestion(question, era) {
  const a = getUserActivity();
  if (!a.questions) a.questions = [];
  a.questions.unshift({
    q: question.slice(0, 100),
    era: era || '',
    time: Date.now(),
  });
  a.questions = a.questions.slice(0, 200);
  // 统计关键词出现频率（粗略反映兴趣倾向）
  if (!a.keywords) a.keywords = {};
  const themes = {
    人物: ['谁','是谁','Lucy','孔子','佛陀','秦','罗马人','法老'],
    战争: ['战','打','征服','武器','军队','帝国'],
    文化: ['艺术','画','音乐','宗教','信仰','哲学','思想'],
    科技: ['工具','发明','技术','武器','船','农具'],
    生活: ['吃','住','穿','日常','一天','生活','家'],
    探索: ['迁徙','发现','航海','旅行','远方','地图'],
  };
  Object.entries(themes).forEach(([k, words]) => {
    if (words.some(w => question.includes(w))) {
      a.keywords[k] = (a.keywords[k] || 0) + 1;
    }
  });
  saveUserActivity(a);
}

function bindRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const interests = [...form.querySelectorAll('[name="interest"]:checked')].map(i => i.value);
    const profile = {
      nickname: fd.get('nickname').trim(),
      age: parseInt(fd.get('age')) || 10,
      gender: fd.get('gender') || 'other',
      grade: fd.get('grade') || '',
      interests,
      registered_at: Date.now(),
    };
    saveUserProfile(profile);
    document.getElementById('registerOverlay').classList.add('hidden');
    renderUserBadge();
  });
}

function renderUserBadge() {
  const p = getUserProfile();
  const badge = document.getElementById('userBadge');
  if (!p) { badge.classList.add('hidden'); return; }
  const avatar = p.gender === 'boy' ? '👦' : (p.gender === 'girl' ? '👧' : '🧑');
  document.getElementById('userAvatar').textContent = avatar;
  document.getElementById('userNickname').textContent = p.nickname;
  badge.classList.remove('hidden');
}

function showUserProfile() {
  const p = getUserProfile();
  const a = getUserActivity();
  if (!p) return;
  const totalQ = (a.questions || []).length;
  const kws = a.keywords || {};
  const sorted = Object.entries(kws).sort((x,y) => y[1] - x[1]);
  const top = sorted[0];
  const learningStyle = top ? (
    top[0] === '人物' ? '📖 你对历史人物特别感兴趣 — 喜欢通过故事和人物理解时代' :
    top[0] === '战争' ? '⚔️ 你关注战争与帝国 — 善于从冲突中看清历史动力' :
    top[0] === '文化' ? '🎨 你偏爱艺术与文化 — 喜欢通过创造看人类精神' :
    top[0] === '科技' ? '🔬 你着迷于科技与发明 — 喜欢看人类如何解决问题' :
    top[0] === '生活' ? '🏘 你关心普通人的日常 — 从生活细节理解大历史' :
    top[0] === '探索' ? '🗺 你喜欢探险与发现 — 跟着先人脚步走遍世界' :
    '🌟 你的学习方式独一无二'
  ) : '🌱 多问几个问题，AI 就能为你画出学习画像';

  const top3Recent = (a.questions || []).slice(0, 5);
  const body = document.getElementById('profileBody');
  body.innerHTML = `
    <div class="profile-section">
      <h3>👤 基本信息</h3>
      <div class="profile-info-row">
        <span><strong>昵称：</strong>${p.nickname}</span>
        <span><strong>年龄：</strong>${p.age} 岁</span>
        ${p.grade ? `<span><strong>年级：</strong>${p.grade}</span>` : ''}
      </div>
      ${p.interests.length ? `<div class="profile-tags">${p.interests.map(i => `<span class="profile-tag">${i}</span>`).join('')}</div>` : ''}
    </div>

    <div class="profile-section">
      <h3>🎯 我的学习方式</h3>
      <div class="profile-style-card">${learningStyle}</div>
      ${sorted.length ? `
      <div class="profile-stats-grid">
        ${sorted.map(([k, n]) => `
          <div class="profile-stat">
            <div class="profile-stat-key">${k}</div>
            <div class="profile-stat-bar"><div class="profile-stat-fill" style="width:${Math.min(100, n*20)}%"></div></div>
            <div class="profile-stat-num">${n} 次</div>
          </div>`).join('')}
      </div>` : '<p class="profile-empty">还没有提问记录哦，多和 AI 聊聊就能看到画像啦。</p>'}
    </div>

    <div class="profile-section">
      <h3>💬 最近问的问题（${totalQ} 个）</h3>
      ${top3Recent.length ? `
        <ul class="profile-q-list">
          ${top3Recent.map(q => `<li><span class="profile-q-time">${new Date(q.time).toLocaleString('zh-CN', {month:'short', day:'numeric', hour:'2-digit', minute:'2-digit'})}</span> ${q.q}</li>`).join('')}
        </ul>` : '<p class="profile-empty">还没有问过问题。打开任意课程，点 AI 互动开始提问吧。</p>'}
    </div>

    <div class="profile-section">
      <button class="profile-clear" onclick="if(confirm('确定要清空我的所有数据并重新注册吗？')){localStorage.removeItem('civ_user_profile');localStorage.removeItem('civ_user_activity');location.reload();}">🗑 清空数据，重新注册</button>
    </div>
  `;
  document.getElementById('profileOverlay').classList.remove('hidden');
}

function hideUserProfile() {
  document.getElementById('profileOverlay').classList.add('hidden');
}

function checkRegistration() {
  const p = getUserProfile();
  if (!p) {
    document.getElementById('registerOverlay').classList.remove('hidden');
  } else {
    renderUserBadge();
  }
}

// ── BOOT ──────────────────────────────────────────
init();
bindRegisterForm();
checkRegistration();
