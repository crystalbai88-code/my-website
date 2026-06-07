// 轻量双语 · 语言状态 + UI 词典(localStorage)
window.I18N=(function(){
  const KEY='civlab_lang';
  let lang=localStorage.getItem(KEY)||'zh';
  const DICT={
    intro_stages:{zh:'🌍 六大文明阶段 · 从早期文明到 AI 时代',en:'🌍 Six Ages of Civilization · from the first cities to the age of AI'},
    intro_sub:{zh:'点击任意阶段卡片，深入了解这个时期的关键课程',en:'Tap any stage to explore its key lessons'},
    interactions:{zh:'🧩 8 个互动探索 · 训练时间观 · 空间观 · 因果观 · 比较 · 证据 · 多角度思维',en:'🧩 8 interactive explorations · time · space · causality · comparison · evidence · perspective'},
    family:{zh:'👨‍👩‍👧 家长 / 教师入口',en:'👨‍👩‍👧 For Parents / Teachers'},
    coming:{zh:'即将上线',en:'Coming soon'},
    f_meanwhile:{zh:'🌍 此时世界',en:'🌍 Meanwhile'},
    f_causality:{zh:'🔗 历史因果链',en:'🔗 Causal Chains'},
    f_compare:{zh:'⚖️ 文明对比',en:'⚖️ Compare Civilizations'},
    f_evidence:{zh:'🔍 证据侦探',en:'🔍 Evidence Detective'},
    f_roleplay:{zh:'🎭 角色体验',en:'🎭 Role-play'},
    f_route:{zh:'🗺️ 路线旅行',en:'🗺️ Journeys'},
    f_perspectives:{zh:'🗣️ 多角度看历史',en:'🗣️ Many Voices'},
    f_profile:{zh:'🧭 我的思维画像',en:'🧭 My Thinking Profile'},
  };
  function T(k){const e=DICT[k];return e?(e[lang]||e.zh):k;}
  return {get(){return lang;}, set(l){lang=l;localStorage.setItem(KEY,l);}, toggle(){this.set(lang==='zh'?'en':'zh');}, T, DICT};
})();
