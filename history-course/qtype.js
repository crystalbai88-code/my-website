// AI 学历史学习强化课 · 题型引擎
// 输入一张多维知识卡 + 全部卡(取干扰项)→ 输出一道中考型选择题。
// 题型:识记·人物 / 识记·内容 / 因果·意义 / 时空·定位 / 材料·史料实证 / 易错·辨析
(function(){
  function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  function opts(correct, pool){
    const ds=[...new Set(pool.filter(x=>x&&x!==correct))];
    return shuffle([correct, ...shuffle(ds).slice(0,3)]);
  }
  const GENS = [
    // 识记·人物 → 事件
    (c,all)=> c.who ? {type:'识记·人物', q:`下列哪一项与【${c.who}】直接相关?`,
        correct:c.n, options:opts(c.n, all.map(x=>x.n)), explain:`${c.who} ➜ ${c.n}。${c.why||c.what||''}`} : null,
    // 识记·内容
    (c,all)=> c.what ? {type:'识记·内容', q:`「${c.n}」的主要内容是?`,
        correct:c.what, options:opts(c.what, all.map(x=>x.what).filter(Boolean)), explain:`${c.n}:${c.what}`} : null,
    // 因果·意义(中考高频)
    (c,all)=> c.why ? {type:'因果·意义', q:`「${c.n}」最主要的历史意义是?`,
        correct:c.why, options:opts(c.why, all.map(x=>x.why).filter(Boolean)), explain:`${c.n} ➜ ${c.why}`} : null,
    // 时空·定位
    (c,all)=> c.dyn ? {type:'时空·定位', q:`「${c.n}」发生在哪一时期(政权)?`,
        correct:c.dyn, options:opts(c.dyn, all.map(x=>x.dyn).filter(Boolean)), explain:`${c.n} —— ${c.dyn}${c.when?'（'+c.when+'）':''}`} : null,
    // 材料·史料实证
    (c,all)=> c.src ? (function(){const p=c.src.split('|'); return {type:'材料·史料实证',
        q:`阅读材料:「${p[0]}」<br>这则材料反映的是?`, correct:c.n, options:opts(c.n, all.map(x=>x.n)),
        explain:`出自${p[1]||'史料'}。反映的是「${c.n}」。${c.why||''}`};})() : null,
    // 易错·辨析(否定型的正面版:考辨析点)
    (c,all)=> c.trap ? {type:'易错·辨析', q:`关于「${c.n}」,下列说法正确的是?`,
        correct:c.trap, options:opts(c.trap, all.map(x=>x.trap).filter(Boolean)), explain:`易错点:${c.trap}`} : null,
  ];
  function gen(card, all){
    const cand = GENS.map(g=>g(card,all)).filter(q=>q && q.options.length>=2);
    if(!cand.length) return null;
    return cand[Math.floor(Math.random()*cand.length)];
  }
  // 一组题:尽量题型多样、卡片不重复
  function session(all, n){
    const cards=shuffle(all); const out=[]; let i=0, guard=0;
    while(out.length<n && guard<n*5){
      const c=cards[i%cards.length]; i++; guard++;
      const q=gen(c,all);
      if(q){ q.card=c.id; out.push(q); }
    }
    return out;
  }
  const API={gen,session,GENS};
  if(typeof window!=='undefined') window.QTYPE=API;
  if(typeof module!=='undefined') module.exports=API;
})();
