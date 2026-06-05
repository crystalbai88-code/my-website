// ════════════════════════════════════════════════════════════════
// 🏛 早期文明 · Stage 1 数据层 (前 3000 - 前 1000)
// 10 节点 E01-E10，自动从 EARLY_CIV_KB 派生内容
// ════════════════════════════════════════════════════════════════

const EARLY_CIVILIZATIONS = {
  unit: {
    title: '早期文明探索',
    subtitle: '从两河流域到青铜崩溃',
    range: '约 5500 年前 — 约 3000 年前',
    intro: '从苏美尔人发明城市和文字开始，到 1177 BCE 青铜时代的大崩溃。这 5500 年里，人类做了所有"第一次"——第一座城市、第一种文字、第一部法律、第一个帝国。'
  },

  periods: [
    // 占位 - 动态从 EARLY_CIV_KB 生成（见下方 buildPeriods 函数）
  ]
};

// 从 EARLY_CIV_KB 自动构建 period 对象 (与 PREHISTORIC.periods 同结构)
function buildEarlyCivPeriods() {
  if (typeof EARLY_CIV_KB === 'undefined') {
    console.warn('[early_civ] EARLY_CIV_KB 未加载');
    return [];
  }

  // 每节点的视觉配置
  const visualConfig = {
    E01_sumer_first_civilization: { id:'E01', icon:'📜', color:'#c86820', emoji:'🏛', short:'苏美尔', time:'前3500-前2350' },
    E02_egypt_old_kingdom:        { id:'E02', icon:'🔺', color:'#e8a040', emoji:'🌅', short:'古埃及·古王国', time:'前3100-前2200' },
    E03_indus_valley:             { id:'E03', icon:'🧱', color:'#a08850', emoji:'🧱', short:'印度河文明', time:'前2600-前1900' },
    E04_akkadian_empire:          { id:'E04', icon:'👑', color:'#b04830', emoji:'⚔️', short:'阿卡德帝国', time:'前2334-前2154' },
    E05_old_babylonian_hammurabi: { id:'E05', icon:'⚖', color:'#8a4090', emoji:'📜', short:'古巴比伦', time:'前1894-前1595' },
    E06_egypt_new_kingdom:        { id:'E06', icon:'👁', color:'#d4a020', emoji:'🎭', short:'古埃及·新王国', time:'前1550-前1070' },
    E07_shang_dynasty_china:      { id:'E07', icon:'⚱️', color:'#a02030', emoji:'⚱️', short:'商朝青铜', time:'前1600-前1046' },
    E08_minoan_mycenaean:         { id:'E08', icon:'🐂', color:'#2080a0', emoji:'🐂', short:'米诺斯+迈锡尼', time:'前2000-前1100' },
    E09_hittite_empire:           { id:'E09', icon:'🛡', color:'#506890', emoji:'🛡', short:'赫梯帝国', time:'前1600-前1180' },
    E10_bronze_age_collapse:      { id:'E10', icon:'💥', color:'#7a2818', emoji:'💥', short:'青铜崩溃', time:'前1200-前1150' },
  };

  return EARLY_CIV_KB.map(kb => {
    const cfg = visualConfig[kb.node_id] || { id: kb.node_id, icon:'📜', color:'#888', emoji:'🏛', short:kb.title, time:kb.time_range };

    // 将 KB 的 fact_base 转为时间轴主图的 hotspots
    // 取前 11 条最重要的内容 (优先 evidence_objects 然后 key_events 然后 fact_base)
    const allItems = [
      ...(kb.evidence_objects || []).slice(0, 4).map((e, i) => ({
        id: `${cfg.id}_ev_${i}`,
        label: e.name.split('(')[0].trim().slice(0, 10),
        sub: e.date,
        title: e.name,
        body: `${e.tells_us}<br><br><strong>📍 馆藏</strong>: ${e.held_at}<br><strong>📚 来源</strong>: ${e.source}`,
        type: 'evidence'
      })),
      ...(kb.key_people_or_groups || []).slice(0, 4).map((p, i) => ({
        id: `${cfg.id}_p_${i}`,
        label: p.name.split('(')[0].trim().slice(0, 10),
        sub: p.role,
        title: p.name,
        body: p.contribution,
        type: 'person'
      })),
      ...(kb.fact_base || []).slice(0, 4).map((f, i) => ({
        id: `${cfg.id}_f_${i}`,
        label: `事实 ${i+1}`,
        sub: f.source_tier + '级',
        title: '关键事实',
        body: `${f.fact}<br><br><strong>📚 来源</strong>: ${f.source}`,
        type: 'fact'
      })),
    ].slice(0, 11);

    // 11 个 hotspot 均匀分布（暂时网格布局，等用户给主图后再精确定位）
    const cols = 4, rows = 3;
    const hotspots = allItems.map((item, i) => {
      const col = i % cols, row = Math.floor(i / cols);
      return {
        id: item.id,
        pos_x: 15 + col * 25,
        pos_y: 18 + row * 28,
        icon: item.type === 'evidence' ? '🏺' : (item.type === 'person' ? '👤' : '💡'),
        label: item.label,
        sub: item.sub,
        detail: { title: item.title, body: item.body }
      };
    });

    // map.evolution_path 从 KB.map_points 派生
    const mapPath = (kb.map_points || []).slice(0, 8).map((m, i) => {
      // 将经纬度转换为 600x540 viewBox 的近似 x,y (经度 25-90 → x 80-520, 纬度 10-45 → y 460-80)
      const lat = m.coords[0], lon = m.coords[1];
      const x = Math.round(80 + (lon - 25) * (440 / 65));
      const y = Math.round(460 - (lat - 10) * (380 / 35));
      return {
        id: m.id,
        name: m.name.split('(')[0].trim(),
        x: Math.max(40, Math.min(560, x)),
        y: Math.max(60, Math.min(480, y)),
        time: kb.time_range.split('-')[0],
        species: m.significance,
        label_dir: i % 2 === 0 ? 'r' : 'l',
        wiki: m.id
      };
    });

    // 故事 (从 KB 的 child_explanation + civilization_connection 拼装)
    const childParas = (kb.child_explanation || []).map(c => c.text);
    const story = {
      title: kb.title + ' · 一个孩子能懂的故事',
      setting: cfg.time + ' · ' + (kb.map_points?.[0]?.country || ''),
      paragraphs: childParas.length ? childParas : [`${kb.title}是 ${cfg.time} 之间的一段重要历史。${kb.core_question}`],
      key_insight: (kb.civilization_connection?.[0]?.claim) || kb.core_question,
      discussion_question: kb.ai_tasks?.[0]?.prompt?.slice(0, 80) || '这段历史让你想到什么？'
    };

    // 时光机基础剧本 (4 个场景从 KB 派生)
    const scenario = {
      title: `穿越到 ${cfg.time}`,
      subtitle: kb.core_question,
      intro: `你穿越到 ${kb.title} 时期。这是一个 ${cfg.time} 的世界。${(kb.fact_base?.[0]?.fact || '').slice(0, 100)}`,
      start_survival: 60,
      max_survival: 100,
      scenes: [
        {
          id: 1, emoji: '🌅', title: '初到此地',
          situation: `你刚到 ${cfg.short}。你看到了什么？应该先做什么？`,
          choices: [
            { text: '观察周围环境，搞清楚自己在哪', effect: 10, outcome: '你看清了地势和人群的活动。这是个明智的开始。', fact: kb.fact_base?.[0]?.fact?.slice(0, 100) || '' },
            { text: '直接找当地人交流', effect: -5, outcome: '语言不通，对方警惕地远远看着你。', fact: '古代陌生人警惕度极高，先观察再接触是常识。' },
            { text: '找一个高处躲起来', effect: 0, outcome: '你躲了起来，没人发现你，但也错过了了解世界的机会。', fact: '过度谨慎也是一种代价。' }
          ]
        },
        {
          id: 2, emoji: '🤝', title: '与当地人接触',
          situation: `你遇到了 ${cfg.short} 的一个商人。他想知道你是谁。`,
          choices: [
            { text: '编一个合理的身份故事', effect: 15, outcome: '他相信了你，邀请你共进晚餐。你学到了很多当地知识。', fact: kb.fact_base?.[1]?.fact?.slice(0, 100) || '' },
            { text: '说真话——你是从未来来的', effect: -20, outcome: '他认为你是疯子或巫师，叫来卫兵。', fact: '古代社会对"异常"高度警惕，巫术是死罪。' },
            { text: '默不作声转身离开', effect: -5, outcome: '失去一个可能的盟友。', fact: '古代社会建立信任靠互动。' }
          ]
        },
        {
          id: 3, emoji: '⚠️', title: '关键决定',
          situation: (kb.ai_tasks?.[0]?.prompt || '一个重大选择摆在你面前').slice(0, 150),
          choices: [
            { text: '按当地传统/法律行事', effect: 12, outcome: '你的选择被社区认可。', fact: (kb.civilization_connection?.[0]?.claim || '').slice(0, 100) },
            { text: '用你从未来学到的方法解决', effect: -10, outcome: '解决了问题，但被人认为是异类。', fact: '历史人物的"先进想法"经常先被排斥。' },
            { text: '请教当地长老', effect: 8, outcome: '长老给了你古老智慧。', fact: '口传知识是文字之前的主要传承方式。' }
          ]
        },
        {
          id: 4, emoji: '🌍', title: '留下还是离开',
          situation: '你在这里学到了很多。是回到现代，还是留下继续生活？',
          choices: [
            { text: '回到现代，把所学告诉世人', effect: 15, outcome: '你把 ' + cfg.short + ' 的故事讲给了更多人。这就是历史的传承。', fact: '我们能学到这段历史，全靠考古学家+学者一代代传承。' },
            { text: '留在此时此地，融入这里的生活', effect: 5, outcome: '你成为了 ' + cfg.short + ' 的一员，过完了普通人的一生。', fact: '历史上 99% 的人都是无名的普通人——但每一个都重要。' },
            { text: '尝试去更早或更晚的时代', effect: 0, outcome: '你继续穿越...', fact: '时间是一条河，每一段都连着上下游。' }
          ]
        }
      ]
    };

    return {
      id: cfg.id,
      time: cfg.time,
      title: cfg.short,
      icon: cfg.icon,
      color: cfg.color,
      snapshot: kb.core_question + ' ' + (kb.fact_base?.[0]?.fact?.slice(0, 100) || ''),

      // 时间轴主图（占位，等用户给真图）
      timeline: {
        position_pct: 50,
        context: `${kb.title} 处于 ${cfg.time} 这个时间窗口。`,
        before: '在此之前是史前文明阶段——农业、村落、最早的城市萌芽。',
        after: '在此之后是古典思想与帝国时代——希腊、罗马、孔子。',
        scale_note: '这段历史距今约 3000-5500 年。',
        teacher_note: kb.core_question,
        image: 'images/early-civ-placeholder.jpg', // 待用户提供
        image_alt: kb.title + '时间轴',
        wiki_quick_links: []
      },

      knowledge_network: {
        layout: 'image_overlay',
        image: 'images/early-civ-placeholder.jpg', // 待用户提供
        viewBox: '0 0 1000 1280',
        intro: '点击图上 ① ~ ⑪ 任意泡泡，深入了解每个知识点',
        hotspots,
        hub: {
          id: 'hub', label: cfg.short, sub: cfg.time, icon: cfg.icon, color: cfg.color,
          x: 500, y: 60,
          detail: {
            title: kb.title,
            body: kb.core_question + '<br><br>' + (kb.fact_base?.[0]?.fact || ''),
            related: hotspots.slice(0, 4).map(h => h.id)
          }
        },
        nodes: hotspots.map(h => ({
          id: h.id, label: h.label, sub: h.sub,
          icon: h.icon, color: cfg.color,
          detail: h.detail
        })),
        edges: []
      },

      map: {
        overlay_note: `${kb.title} 的关键遗址 (${mapPath.length} 个)`,
        evolution_path: mapPath
      },

      regions: (kb.map_points || []).slice(0, 3).map(m => ({
        id: m.id,
        name: m.name.split('(')[0].trim(),
        icon: '📍',
        description: m.significance,
        environment: m.country,
        population: '考古遗址',
        lifestyle: m.significance,
        challenge: '气候、贸易、政治变化'
      })),

      themes: (kb.civilization_connection || []).slice(0, 2).map((c, i) => ({
        id: `theme_${i}`,
        title: c.claim.slice(0, 30),
        icon: '💡',
        summary: c.claim,
        content: [c.reasoning],
        caution: '历史叙事总是简化的，真实情况更复杂。'
      })),

      story,

      scenario,

      ai: {
        suggested_questions: [
          kb.core_question,
          ...(kb.ai_tasks || []).slice(0, 3).map(t => t.prompt.slice(0, 50))
        ].filter(Boolean).slice(0, 4),
        check_prompt: '检查我对 ' + kb.title + ' 的理解：哪里不准确？'
      },

      artifact: {
        title: '我的 ' + cfg.short + ' 笔记',
        instructions: `根据你学到的 ${kb.title} 内容，写下你最有感触的 3 件事。`,
        fields: [
          { id: 'fact', label: '让我惊讶的一个事实', placeholder: '...', required: true },
          { id: 'person', label: '让我印象最深的人', placeholder: '...', required: false },
          { id: 'connection', label: '这段历史和今天有什么联系？', placeholder: '...', required: true }
        ],
        fact_vs_fiction: true,
        output_name: kb.title + ' 笔记'
      },

      // 保存原始 KB 引用（让 AI 检索时能用上）
      _kb_ref: kb.node_id
    };
  });
}

// 初始化
if (typeof window !== 'undefined') {
  // 等 KB 加载后再构建
  window.EARLY_CIVILIZATIONS = EARLY_CIVILIZATIONS;
  const tryBuild = () => {
    if (typeof EARLY_CIV_KB !== 'undefined') {
      EARLY_CIVILIZATIONS.periods = buildEarlyCivPeriods();
      console.log('[EARLY_CIVILIZATIONS] built', EARLY_CIVILIZATIONS.periods.length, 'periods');
    } else {
      setTimeout(tryBuild, 50);
    }
  };
  tryBuild();
}
