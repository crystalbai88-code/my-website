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
  const dotsEl = $('#tlDots');
  dotsEl.innerHTML = MAP_DATA.map((lesson, i) => {
    const done = state.completed.includes(lesson.id);
    const active = !done && (i === 0 || state.completed.includes(MAP_DATA[i - 1]?.id));
    const cls = done ? 'done' : active ? 'active' : '';
    return `
      <div class="tl-dot-wrap ${active ? 'active-lesson' : ''}" onclick="enterLesson('${lesson.id}')" data-id="${lesson.id}">
        <div class="tl-label-time">${lesson.time}</div>
        <div class="tl-dot ${cls}" id="dot-${lesson.id}"></div>
        <div class="tl-label-title">${lesson.icon} ${lesson.title}</div>
      </div>`;
  }).join('');

  const pct = state.completed.length / MAP_DATA.length * 100;
  $('#tlLineFill').style.width = Math.max(0, pct) + '%';
  positionFigure();
}

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

  // Only change the ocean — terrain paths keep their individual colors
  // Apply a CSS hue-shift filter to the whole continent group for era tint
  $('#ocean').setAttribute('fill', c.water);
  const continents = $('#continents');
  if (continents) {
    // Subtle saturation shift based on era — older = less saturated
    const sat = c.sat != null ? c.sat : 0.8;
    continents.style.filter = `saturate(${sat}) brightness(${0.85 + sat * 0.2})`;
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
  $('#panelCivName').textContent = civ.name;
  $('#panelCivDesc').textContent = civ.desc;

  $('#panelPeople').innerHTML = (civ.people || []).map((p) =>
    `<div class="person-chip"><span class="person-icon">${p.icon}</span><span><strong>${p.label}</strong> · ${p.note}</span></div>`
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
  $('#evModalTitle').textContent = ev.emoji + ' ' + ev.title;
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
    `<div class="summary-civ-tag" style="border-color:${c.color}60;color:${c.color}">${c.name}</div>`
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
          <div class="result-meta"><span class="result-type">${r.type}</span>${r.lesson ? `<span class="result-lesson">${lessonLabel[r.lesson] || r.lesson}</span>` : ''}</div>
          <strong>${r.title}</strong>
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

// ── BOOT ──────────────────────────────────────────
init();
