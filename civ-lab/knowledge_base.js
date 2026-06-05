// ════════════════════════════════════════════════════════════════
// 🧠 AI 世界文明实验室 · 统一知识库 (Knowledge Base)
// 内部知识 (课程内容) + 外部知识 (Wikipedia) → 统一检索 → AI 对话
// ════════════════════════════════════════════════════════════════

const KB = {
  // 内部条目（从课程数据索引而来）
  internal: [],

  // 外部条目（Wikipedia 等外部抓取的内容，持久化到 localStorage）
  external: {},

  // 检索历史 / 用户查询记录
  searchHistory: [],

  // ── 初始化：从课程数据索引所有内容 ──
  init() {
    this.internal = [];

    // 1. 索引 PREHISTORIC.periods 中的所有内容
    if (typeof PREHISTORIC !== 'undefined') {
      PREHISTORIC.periods.forEach(p => {
        // 时代本身
        this.addInternal({
          id: 'era:' + p.id,
          type: 'era',
          source_id: p.id,
          source_label: `${p.time} · ${p.title}`,
          era: p.id,
          title: p.title,
          body: p.snapshot || '',
          keywords: [p.title, p.time, ...(p.themes || []).map(t => t.title)],
        });

        // 知识主题
        (p.themes || []).forEach(t => {
          this.addInternal({
            id: `theme:${p.id}:${t.id || t.title}`,
            type: 'theme',
            source_id: p.id, source_label: `${p.title} · 知识主题`,
            era: p.id,
            title: t.title,
            body: t.summary + (t.content ? '\n' + t.content.join('\n') : ''),
            keywords: [t.title, t.summary],
          });
        });

        // 证据物
        (p.evidence || []).forEach(ev => {
          this.addInternal({
            id: `evidence:${p.id}:${ev.id || ev.name}`,
            type: 'evidence',
            source_id: p.id, source_label: `${p.title} · 证据物`,
            era: p.id,
            title: ev.name,
            body: ev.description + (ev.tells ? '\n能告诉我们：' + ev.tells : ''),
            keywords: [ev.name, ev.location || ''],
          });
        });

        // 文明区域
        (p.regions || []).forEach(r => {
          this.addInternal({
            id: `region:${p.id}:${r.id || r.name}`,
            type: 'region',
            source_id: p.id, source_label: `${p.title} · 文明区域`,
            era: p.id,
            title: r.name,
            body: r.description,
            keywords: [r.name],
          });
        });

        // 故事
        if (p.story) {
          this.addInternal({
            id: `story:${p.id}`,
            type: 'story',
            source_id: p.id, source_label: `${p.title} · 故事`,
            era: p.id,
            title: p.story.title,
            body: (p.story.paragraphs || []).join('\n') +
                  (p.story.key_insight ? '\n关键启示：' + p.story.key_insight : ''),
            keywords: [p.story.title, p.story.setting],
          });
        }

        // 演化时间轴上的节点
        if (p.timeline && p.timeline.evolution_timeline) {
          p.timeline.evolution_timeline.forEach(ev => {
            this.addInternal({
              id: `evo:${p.id}:${ev.title}`,
              type: 'evolution',
              source_id: p.id, source_label: `${p.title} · 演化节点`,
              era: p.id,
              title: ev.title,
              body: `${ev.time} · ${ev.body || ''}`,
              keywords: [ev.title, ev.wiki_zh, ev.wiki_en, ev.time].filter(Boolean),
              wiki_zh: ev.wiki_zh,
              wiki_en: ev.wiki_en,
            });
          });
        }

        // 知识网络节点
        if (p.knowledge_network && p.knowledge_network.nodes) {
          p.knowledge_network.nodes.forEach(n => {
            if (n.detail) {
              this.addInternal({
                id: `node:${p.id}:${n.id}`,
                type: 'concept',
                source_id: p.id, source_label: `${p.title} · 知识网络`,
                era: p.id,
                title: n.detail.title || n.label,
                body: n.detail.body || '',
                keywords: [n.label, n.sub, n.detail.wiki_zh, n.detail.wiki_en].filter(Boolean),
                wiki_zh: n.detail.wiki_zh,
                wiki_en: n.detail.wiki_en,
              });
            }
          });
        }

        // 地图遗址点
        if (p.map && p.map.evolution_path) {
          p.map.evolution_path.forEach(pt => {
            this.addInternal({
              id: `site:${p.id}:${pt.id}`,
              type: 'site',
              source_id: p.id, source_label: `${p.title} · 化石遗址`,
              era: p.id,
              title: pt.name,
              body: `${pt.time} · ${pt.species}`,
              keywords: [pt.name, pt.species, pt.time, pt.wiki].filter(Boolean),
              wiki_en: pt.wiki,
            });
          });
        }
      });
    }

    // 2. 索引 LESSONS_DATA (L01-L12)
    if (typeof LESSONS_DATA !== 'undefined') {
      Object.values(LESSONS_DATA).forEach(L => {
        this.addInternal({
          id: 'lesson:' + L.id,
          type: 'lesson',
          source_id: L.id, source_label: `第${L.id} 课 · ${L.time}`,
          era: L.id,
          title: L.title,
          body: (L.takeaway || '') + (L.snapshot ? '\n' + L.snapshot : ''),
          keywords: [L.title, L.time, ...(L.concepts || []).map(c => c.name)],
        });
        (L.concepts || []).forEach(c => {
          this.addInternal({
            id: `concept:${L.id}:${c.name}`,
            type: 'concept',
            source_id: L.id, source_label: `第${L.id} 课 · 核心概念`,
            era: L.id,
            title: c.name,
            body: c.text,
            keywords: [c.name],
          });
        });
        (L.mapPoints || []).forEach(pt => {
          this.addInternal({
            id: `mappoint:${L.id}:${pt.id}`,
            type: 'mappoint',
            source_id: L.id, source_label: `第${L.id} 课 · 地图地点`,
            era: L.id,
            title: pt.name,
            body: pt.child + (pt.fact ? '\n事实底板：' + pt.fact : ''),
            keywords: [pt.name, ...(pt.keywords || [])],
          });
        });
        (L.regions || []).forEach(r => {
          this.addInternal({
            id: `region:${L.id}:${r.id || r.name}`,
            type: 'region',
            source_id: L.id, source_label: `第${L.id} 课 · 文明`,
            era: L.id,
            title: r.title || r.name,
            body: r.summary || r.description || '',
            keywords: [r.name, r.title],
          });
        });
      });
    }

    // 3. 索引 KNOWLEDGE_BASE 中预设知识
    if (typeof KNOWLEDGE_BASE !== 'undefined') {
      KNOWLEDGE_BASE.forEach(kb => {
        this.addInternal({
          id: 'kb:' + (kb.id || kb.title),
          type: 'knowledge',
          source_id: kb.lesson || '', source_label: kb.category || '知识库',
          era: kb.lesson || '',
          title: kb.title,
          body: kb.content,
          keywords: kb.keywords || [],
        });
      });
    }

    // 4. 索引 PREHISTORIC_KB_INDEX (P01-P10) + EARLY_CIV_KB_INDEX (E01-E10) 深度知识库
    const deepIndices = [
      ...(typeof PREHISTORIC_KB_INDEX !== 'undefined' ? PREHISTORIC_KB_INDEX : []),
      ...(typeof EARLY_CIV_KB_INDEX !== 'undefined' ? EARLY_CIV_KB_INDEX : []),
    ];
    deepIndices.forEach((e, i) => {
      this.addInternal({
        id: 'kb:' + e.node_id + ':' + e.type + ':' + i,
        type: 'deep_' + e.type,
        source_id: e.node_id,
        source_label: e.source ? `${e.source_tier || ''}级 · ${e.source}` : (e.node_id + ' · 深度知识'),
        era: e.era_hint || e.node_id,
        title: e.title,
        body: e.body || '',
        keywords: e.keywords || [],
        source_tier: e.source_tier,
        deep: true,
      });
    });

    // 5. 加载外部缓存
    try { this.external = JSON.parse(localStorage.getItem('civ_kb_external') || '{}'); }
    catch { this.external = {}; }

    console.log('[KB] indexed', this.internal.length, 'internal entries,',
      Object.keys(this.external).length, 'external entries');
  },

  addInternal(entry) {
    if (!entry.title) return;
    entry.title = String(entry.title).trim();
    entry.body = String(entry.body || '').trim();
    entry.keywords = (entry.keywords || []).filter(Boolean).map(String);
    this.internal.push(entry);
  },

  // ── 内部检索：根据 query 找到最相关的 N 条内部条目 ──
  searchInternal(query, opts = {}) {
    const limit = opts.limit || 5;
    const eraFilter = opts.era; // 优先匹配当前时代
    const q = String(query || '').toLowerCase().trim();
    if (!q) return [];

    // 简单关键词得分：title 命中 +5，body 命中 +2，keyword 命中 +3
    const tokens = q.split(/[\s,，。、？?！!.]+/).filter(t => t.length >= 1);
    const scored = this.internal.map(e => {
      let score = 0;
      const titleL = e.title.toLowerCase();
      const bodyL = e.body.toLowerCase();
      const kwL = e.keywords.map(k => k.toLowerCase()).join(' ');

      tokens.forEach(t => {
        if (titleL.includes(t)) score += 6;
        if (bodyL.includes(t)) score += 2;
        if (kwL.includes(t)) score += 3;
        if (titleL === t) score += 10;
      });

      // 整句匹配额外加分
      if (titleL.includes(q)) score += 8;
      if (bodyL.includes(q)) score += 4;

      // 时代匹配加权
      if (eraFilter && e.era === eraFilter) score += 4;

      return { entry: e, score };
    }).filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(x => x.entry);

    return scored;
  },

  // ── 外部检索：调用 Wikipedia (中→英 fallback)，缓存到 localStorage ──
  async searchExternal(query, opts = {}) {
    const cacheKey = 'q:' + query;
    if (this.external[cacheKey] && Date.now() - (this.external[cacheKey]._ts || 0) < 7 * 86400000) {
      return this.external[cacheKey].results || [];
    }

    // 使用全局 searchWikiByQuestion（如已加载）
    let hits = [];
    if (typeof searchWikiByQuestion === 'function') {
      hits = await searchWikiByQuestion(query, 'zh', 4);
      if (hits.length === 0) hits = await searchWikiByQuestion(query, 'en', 4);
    }

    // 拉详细摘要
    const detailed = [];
    for (const hit of hits.slice(0, opts.limit || 3)) {
      let summary = null;
      if (typeof fetchWikiSummary === 'function') {
        summary = await fetchWikiSummary(hit.key || hit.title, 'zh');
        if (!summary) summary = await fetchWikiSummary(hit.key || hit.title, 'en');
      }
      if (summary) {
        detailed.push({
          source: 'wikipedia',
          title: summary.title,
          body: summary.extract,
          url: summary.url,
          thumbnail: summary.thumbnail,
        });
      }
    }

    // 缓存
    this.external[cacheKey] = { results: detailed, _ts: Date.now() };
    try { localStorage.setItem('civ_kb_external', JSON.stringify(this.external)); }
    catch (e) { /* localStorage 满了就忽略 */ }

    return detailed;
  },

  // ── 统一检索：内部 + 外部 ──
  async search(query, opts = {}) {
    this.searchHistory.unshift({ q: query, t: Date.now() });
    this.searchHistory = this.searchHistory.slice(0, 50);

    const internal = this.searchInternal(query, { limit: 4, era: opts.era });
    const external = await this.searchExternal(query, { limit: 3 });

    return { query, internal, external };
  },

  // ── 统计 ──
  stats() {
    const byType = {};
    this.internal.forEach(e => { byType[e.type] = (byType[e.type] || 0) + 1; });
    return {
      total_internal: this.internal.length,
      by_type: byType,
      external_cached: Object.keys(this.external).length,
      search_history_count: this.searchHistory.length,
    };
  },

  // ── 清理缓存 ──
  clearExternalCache() {
    this.external = {};
    localStorage.removeItem('civ_kb_external');
  },
};
