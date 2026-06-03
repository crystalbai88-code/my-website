// AI世界文明实验室 · 应用逻辑 (merged v2 + existing)

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
  // 🕸 新版：渲染知识网络替代时间轴
  renderMainKnowledgeNetwork();
}

// ════════════════════════════════════════════════════
// 🕸 主知识网络 · Main Knowledge Network (Level 0)
// 双轴布局：X = 时间，Y = 主题
// ════════════════════════════════════════════════════
function renderMainKnowledgeNetwork() {
  const container = document.getElementById('mainNetworkContainer');
  if (!container) return;

  const N = MAIN_NETWORK;
  const W = 1420, H = 580;

  // 主题分层背景条带
  const themeBands = N.themes.map(t => `
    <rect x="40" y="${t.y - 50}" width="${W - 80}" height="100"
          fill="${t.color}" fill-opacity="0.04"/>
    <text x="60" y="${t.y - 28}" font-size="11" font-weight="700"
          fill="${t.color}" opacity="0.55" font-family="STSong,serif"
          letter-spacing="2">${t.icon} ${t.label}</text>
  `).join('');

  // X 轴时间刻度
  const timeAxis = N.time_axis.map(t => `
    <line x1="${t.x}" y1="${H - 38}" x2="${t.x}" y2="${H - 30}"
          stroke="rgba(160,100,30,.3)" stroke-width="1"/>
    <text x="${t.x}" y="${H - 14}" text-anchor="middle"
          font-size="10" fill="#7a4830" font-family="STSong,serif">${t.label}</text>
  `).join('');
  const axisLine = `<line x1="40" y1="${H - 38}" x2="${W - 40}" y2="${H - 38}"
    stroke="rgba(160,100,30,.4)" stroke-width="1.2"/>`;

  // 节点查找表
  const byId = {};
  N.nodes.forEach(n => {
    const theme = N.themes.find(t => t.id === n.theme);
    byId[n.id] = { ...n, y: theme.y, color: theme.color };
  });

  // 边 (按 type 不同样式)
  const edgeStyle = (t) => {
    if (t === 'time') return { stroke: '#c86820', width: 2,   dash: '0',   op: 0.6 };
    if (t === 'capstone') return { stroke: '#8a5a90', width: 1.2, dash: '2,5', op: 0.35 };
    return { stroke: '#8a5a90', width: 1.5, dash: '5,4', op: 0.55 };
  };
  const edges = N.edges.map(e => {
    const a = byId[e.from], b = byId[e.to];
    if (!a || !b) return '';
    const s = edgeStyle(e.type);
    // 弧线连接，更优雅
    const dx = b.x - a.x;
    const mid_x = (a.x + b.x) / 2;
    const mid_y = Math.min(a.y, b.y) - Math.abs(dx) * 0.08 - 10;
    // 同主题（同y）画直线，跨主题画弧
    const path = (a.y === b.y)
      ? `M ${a.x},${a.y} L ${b.x},${b.y}`
      : `M ${a.x},${a.y} Q ${mid_x},${mid_y} ${b.x},${b.y}`;
    return `<path d="${path}" fill="none"
      stroke="${s.stroke}" stroke-width="${s.width}"
      stroke-opacity="${s.op}" stroke-dasharray="${s.dash}" stroke-linecap="round"/>`;
  }).join('');

  // 节点
  const completed = state.completed || [];
  const nodes = N.nodes.map(n => {
    const node = byId[n.id];
    const done = completed.includes(n.id);
    return `
      <g class="mn-node ${done ? 'done' : ''}" data-id="${n.id}" style="cursor:pointer">
        <circle cx="${node.x}" cy="${node.y}" r="32"
                fill="white" stroke="${node.color}" stroke-width="${done ? 3 : 2.5}"
                filter="drop-shadow(0 3px 8px rgba(60,30,5,.22))"/>
        <circle cx="${node.x}" cy="${node.y}" r="28"
                fill="${node.color}" fill-opacity="${done ? 0.2 : 0.08}"/>
        <text x="${node.x}" y="${node.y - 4}" text-anchor="middle"
              font-size="20" pointer-events="none">${n.emoji}</text>
        <text x="${node.x}" y="${node.y + 14}" text-anchor="middle"
              font-size="9" fill="${node.color}" font-weight="700"
              font-family="STSong,serif" pointer-events="none">${n.id}</text>
        ${done ? `<circle cx="${node.x + 22}" cy="${node.y - 22}" r="9" fill="#4a8030"/>
                  <text x="${node.x + 22}" y="${node.y - 18}" text-anchor="middle"
                        font-size="11" fill="white" pointer-events="none">✓</text>` : ''}
        <!-- 节点下方标题 -->
        <text x="${node.x}" y="${node.y + 50}" text-anchor="middle"
              font-size="11" font-weight="700" fill="#2c1a08"
              font-family="STSong,serif" pointer-events="none">${n.label}</text>
        <text x="${node.x}" y="${node.y + 63}" text-anchor="middle"
              font-size="9" fill="#7a4830" pointer-events="none">${n.time}</text>
      </g>
    `;
  }).join('');

  // 双轴标签
  const axisLabels = `
    <text x="${W/2}" y="${H-2}" text-anchor="middle" font-size="11"
          fill="#5a3a18" font-weight="700" font-family="STSong,serif" opacity="0.6"
          letter-spacing="3">← 时 间 →</text>
    <text x="22" y="${H/2}" transform="rotate(-90, 22, ${H/2})" text-anchor="middle"
          font-size="11" fill="#5a3a18" font-weight="700" font-family="STSong,serif"
          opacity="0.6" letter-spacing="3">← 主 题 →</text>`;

  container.innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" class="mn-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id="mn-grid" width="80" height="120" patternUnits="userSpaceOnUse">
          <path d="M 80 0 L 0 0 0 120" fill="none" stroke="rgba(160,100,30,.06)" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#mn-grid)"/>
      ${themeBands}
      ${axisLine}
      ${timeAxis}
      ${axisLabels}
      ${edges}
      ${nodes}
    </svg>
  `;

  // 节点点击 → 进入对应课程
  container.querySelectorAll('.mn-node').forEach(g => {
    g.addEventListener('click', () => {
      const id = g.getAttribute('data-id');
      enterLesson(id);
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
  // 史前文明单元：P01 跳转到 8 时代总览
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
function selectChar(gender) {
  state.characterGender = gender || 'boy';
  localStorage.setItem('civ_character', state.characterGender);
  const boy  = document.getElementById('char-boy');
  const girl = document.getElementById('char-girl');
  if (boy)  boy.style.display  = state.characterGender === 'girl' ? 'none' : 'block';
  if (girl) girl.style.display = state.characterGender === 'girl' ? 'block' : 'none';
  document.querySelectorAll('.char-sel-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.g === state.characterGender);
  });
}

function loadCharacterPref() {
  const saved = localStorage.getItem('civ_character') || 'boy';
  selectChar(saved);
}

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
  $('#preEraBackBtn').onclick = () => showPreOverview();
  logHistory('lesson_view', `史前探索：${period.time} · ${period.title}`);
}

function renderPreEra(p) {
  // Topbar
  $('#preEraTopInfo').innerHTML = `<span class="pre-era-top-icon">${p.icon}</span><div><strong>${p.title}</strong><span>${p.time}</span></div>`;

  // Layer pills — scroll within pre-era body
  $('#preLayerPills').innerHTML = PREHISTORIC.LAYERS.map(l =>
    `<button class="pre-layer-pill" onclick="scrollToPreLayer('pre-${l.id}')">${l.icon} ${l.label}</button>`
  ).join('');

  // Body: render all layers (+ scenario if available)
  const body = $('#preEraBody');
  body.innerHTML = [
    renderKnowledgeNetworkLayer(p),  // 🕸 知识网络（最先）
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
      addPreAIMsg(body.querySelector('#preAIMsgs'), 'ai', `你好！我是史前探索助手 🌍<br>我了解<strong>${p.time}·${p.title}</strong>的所有内容。<br>试试问我：<em>${p.ai.suggested_questions[0]}</em>`);
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
  return `<section class="pre-layer" id="pre-ai">
    <div class="pl-header"><span class="pl-icon">🤖</span><div><h3>AI互动</h3><p class="pl-sub">向AI提问、质检、探索</p></div></div>
    <div class="pre-ai-panel">
      <div class="chat-messages" id="preAIMsgs" style="max-height:300px;overflow-y:auto"></div>
      <div class="chat-suggestions" id="preAISuggestions">${chips}</div>
      <div class="chat-input-row">
        <textarea id="preAIInput" placeholder="问关于${p.title}的任何问题…" rows="2"></textarea>
        <button id="preAISend" class="primary-button">发送</button>
      </div>
      ${ai.check_prompt ? `<div class="pre-ai-check"><strong>质检提示：</strong>${ai.check_prompt}</div>` : ''}
    </div>
  </section>`;
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

  const thinkId = 'prethink-' + Date.now();
  addPreAIMsg(msgsEl, 'ai', '<em>正在思考…</em>', thinkId);

  let resp;
  if (state.apiKey) {
    resp = await callPreClaudeAPI(text, p);
  } else {
    resp = getPreKBResponse(text, p);
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

async function callPreClaudeAPI(msg, p) {
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
        max_tokens: 500,
        system: p.ai.system_context + '\n\n注意事项：' + (p.ai.guardrails || []).join('；'),
        messages: [{ role: 'user', content: msg }],
      }),
    });
    const data = await res.json();
    return data.content[0].text.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
  } catch (e) {
    return `<p>API连接失败，知识库模式：</p><p>${getPreKBResponse(msg, p)}</p>`;
  }
}

function getPreKBResponse(q, p) {
  const lower = q.toLowerCase();
  for (const ev of p.evidence) {
    if (lower.includes(ev.name.slice(0, 3)) || ev.name.toLowerCase().split(/\s+/).some(w => lower.includes(w) && w.length > 1))
      return `<p><strong>${ev.name}</strong></p><p>${ev.description}</p><p><em>能告诉我们：</em>${ev.tells}</p>`;
  }
  for (const t of p.themes) {
    if (lower.includes(t.title.slice(0, 3)) || t.content.some(c => c.slice(0, 8).toLowerCase().split('').some(ch => lower.includes(ch))))
      return `<p><strong>${t.title}</strong></p><p>${t.summary}</p><ul>${t.content.map(c => `<li>${c}</li>`).join('')}</ul>`;
  }
  for (const r of p.regions) {
    if (lower.includes(r.name.split('·')[0].slice(0, 3)))
      return `<p><strong>${r.name}</strong></p><p>${r.description}</p>`;
  }
  if (lower.includes('故事') || lower.includes('当时') || lower.includes('那时'))
    return `<p><strong>${p.story.title}</strong></p><p>${p.story.paragraphs[0]}</p><p>💡 ${p.story.key_insight}</p>`;
  return `<p>关于「${p.time}·${p.title}」，可以问我：</p><ul>${p.ai.suggested_questions.map(q => `<li>「${q}」</li>`).join('')}</ul>`;
}

// ── BOOT ──────────────────────────────────────────
init();
