// gen_feed.js — 生成「故事卡片流」统一数据 feed_data.js
// 把 事件/人物/证据/因果链/多角度/此时世界 融成一条按年份排列的卡片流。
const fs=require('fs');

function loadVars(file, names){
  let s=fs.readFileSync(file,'utf8').replace(/if ?\(typeof window[\s\S]*/,'');
  const body=s+'\n;return {'+names.map(n=>`${n}:(typeof ${n}!=="undefined"?${n}:undefined)`).join(',')+'};';
  return (new Function(body))();
}

// 年份解析:"前551" "1643" "公元前 334" "13 世纪" "~前1250" "1955—"
function parseY(str){
  if(str===0) return 0;
  if(!str && str!==0) return null;
  let t=String(str).replace(/[~约\s公元]/g,'').replace(/[–—-].*$/,'').trim();
  const bce=/前|BCE|BC/i.test(String(str)) && !/公元[^前]/.test(String(str));
  const cen=String(str).match(/(\d+)\s*世纪/);
  if(cen){ let n=(parseInt(cen[1])-1)*100+50; return (/前/.test(String(str)))?-n:n; }
  const m=t.match(/(\d+)/);
  if(!m) return null;
  let y=parseInt(m[1]);
  return bce?-y:y;
}
function eraLabel(y){
  if(y==null) return '';
  return y<0 ? `公元前 ${-y}` : `公元 ${y}`;
}

const mw=loadVars('meanwhile_data.js',['WORLD_EVENTS','WORLD_PEOPLE','WORLD_CIVS']);
const ev=loadVars('evidence_data.js',['EVIDENCE']);
const ca=loadVars('causality_data.js',['CAUSAL_CHAINS']);
const pe=loadVars('perspectives_data.js',['PERSPECTIVES']);

// civ icon / region map
const CIV_ICON={}, CIV_REGION={};
mw.WORLD_CIVS.forEach(c=>{ CIV_ICON[c.id]=c.icon; CIV_REGION[c.id]=c.region; });

// 人物:合并各章 people + rich
const ROLE_ICON={ruler:'👑',general:'⚔️',thinker:'📜',religious:'✝️',scientist:'🔬',artist:'🎨',explorer:'🧭',reformer:'⚙️',other:'🔹'};
const PMAP={};
const chapters=['classical','medieval','global','modern','contemporary'];
for(const ch of chapters){
  let cp;
  try{ cp=loadVars(ch+'_people.js',['CLASSICAL_PEOPLE']).CLASSICAL_PEOPLE; }catch(e){ console.error('people load fail',ch,e.message); continue; }
  cp.forEach(p=>{ PMAP[p.id]={id:p.id,name:p.n,eng:p.e,role:p.r,dates:p.d,bio:p.b,rel:p.rel||[],chapter:ch}; });
  try{
    const PR=loadVars(ch+'_people_deep.js',['PERSON_RICH']).PERSON_RICH;
    if(PR) for(const id in PR){ if(PMAP[id]){ PMAP[id].rich=PR[id].biography; PMAP[id].legacy=PR[id].legacy; PMAP[id].ach=PR[id].achievements_detail; } }
  }catch(e){ /* no deep file */ }
}
// 人物年份/区域 来自 meanwhile WORLD_PEOPLE
const WP={}; mw.WORLD_PEOPLE.forEach(p=>WP[p.id]={year:p.year,region:p.region});

// 事件按年索引(用于"此时世界"和"同期")
const eventsByYear=mw.WORLD_EVENTS.slice().sort((a,b)=>a.year-b.year);
function sameEra(year,region,excludeId){
  return eventsByYear.filter(e=>e.id!==excludeId && Math.abs(e.year-year)<=30 && e.region!==region).slice(0,4)
    .map(e=>({title:e.title,region:e.region,one:e.one}));
}
// 证据按 eventId
const evByEvent={}; ev.EVIDENCE.forEach(x=>{ (evByEvent[x.eventId]=evByEvent[x.eventId]||[]).push(x); });

const cards=[];

// 1) 事件卡 (227)
mw.WORLD_EVENTS.forEach(e=>{
  cards.push({t:'event',id:e.id,y:e.year,era:eraLabel(e.year),region:e.region,icon:CIV_ICON[e.civ]||'📜',
    title:e.title,sub:e.civName,one:e.one,
    deep:{civName:e.civName,region:e.region,one:e.one,
      same:sameEra(e.year,e.region,e.id),
      evidence:(evByEvent[e.id]||[]).slice(0,3).map(x=>({artifact:x.artifact,what:x.what,held:x.held}))}});
});

// 2) 人物卡 (有简介者)
Object.values(PMAP).forEach(p=>{
  const y=WP[p.id]?WP[p.id].year:parseY(p.dates);
  const region=WP[p.id]?WP[p.id].region:'';
  const rels=(p.rel||[]).map(r=>({name:(PMAP[r.i]&&PMAP[r.i].name)||r.i,t:r.t})).filter(r=>r.name);
  cards.push({t:'person',id:p.id,y:y,era:p.dates||eraLabel(y),region,icon:ROLE_ICON[p.role]||'🔹',
    title:p.name,sub:p.eng||'',one:p.bio||'',
    deep:{dates:p.dates,role:p.role,bio:p.rich||p.bio||'',legacy:p.legacy||'',
      ach:(p.ach||[]).map(a=>({name:a.name,detail:a.detail})),
      rels:rels.slice(0,8)}});
});

// 3) 证据卡 — 每个事件取最有代表性的一件,避免证据刷屏
const evSeen=new Set();
ev.EVIDENCE.filter(x=>{ if(evSeen.has(x.eventId))return false; evSeen.add(x.eventId); return true; }).forEach((x,i)=>{
  const evt=mw.WORLD_EVENTS.find(e=>e.id===x.eventId);
  const y=evt?evt.year:(x.chapter==='early'?-2000:x.chapter==='classical'?-300:x.chapter==='medieval'?900:x.chapter==='global'?1600:x.chapter==='modern'?1850:1980);
  cards.push({t:'evidence',id:'ev_'+i,y:y,era:eraLabel(y),region:x.region,icon:'🏺',
    title:x.artifact,sub:x.civName,one:x.what,
    deep:{what:x.what,held:x.held,eventTitle:x.eventTitle,civName:x.civName}});
});

// 4) 因果链卡 (8)
ca.CAUSAL_CHAINS.forEach(c=>{
  const y=parseY((c.nodes[0]||{}).year)||-3000;
  cards.push({t:'chain',id:c.id,y:y,era:c.theme||'',region:'',icon:c.emoji||'🔗',
    title:c.title,sub:c.theme||'因果链',one:(c.nodes[0]?c.nodes[0].label:'')+' → … → '+(c.nodes[c.nodes.length-1]?c.nodes[c.nodes.length-1].label:''),
    deep:{theme:c.theme,nodes:c.nodes.map(n=>({label:n.label,kind:n.kind,year:n.year,desc:n.desc}))}});
});

// 5) 多角度卡
pe.PERSPECTIVES.forEach(p=>{
  const y=parseY(p.era);
  cards.push({t:'perspective',id:p.id,y:y,era:p.era||'',region:'',icon:p.emoji||'🗣️',
    title:p.title,sub:'多角度看历史',one:p.fact,
    deep:{fact:p.fact,voices:p.voices,reflection:p.reflection}});
});

// 6) 此时世界 卡 — 选若干里程碑年份
const milestones=[-3000,-1750,-1000,-500,-221,1,500,800,1206,1492,1776,1900,1945,1969,2008];
milestones.forEach(yr=>{
  const window=mw.WORLD_EVENTS.filter(e=>Math.abs(e.year-yr)<=60);
  if(window.length<2) return;
  const byReg={};
  window.forEach(e=>{ (byReg[e.region]=byReg[e.region]||[]).push(e.title); });
  const regions=Object.keys(byReg).map(r=>({region:r,items:byReg[r].slice(0,3)}));
  cards.push({t:'meanwhile',id:'mw_'+yr,y:yr,era:eraLabel(yr),region:'全球',icon:'🌍',
    title:`此时此刻 · ${eraLabel(yr)}`,sub:'世界各地正在发生',one:`公元${yr<0?'前'+(-yr):yr}年前后,世界各地同时发生着什么?`,
    deep:{year:yr,regions}});
});

// 排序:按年份升序(同年保持插入顺序→类型自然交错)
cards.forEach((c,i)=>{ if(c.y==null) c.y=0; c._i=i; });
cards.sort((a,b)=> a.y-b.y || a._i-b._i );
cards.forEach(c=>delete c._i);

// 开场卡
cards.unshift({t:'intro',id:'intro',y:-99999,era:'',region:'',icon:'🌌',
  title:'人类文明之河',sub:'从第一座城市,到人工智能',
  one:'上滑,顺着时间长河漂流;看到感兴趣的,轻点深入。人物、事件、文物、因果、不同的声音……都在这条河里。',
  deep:{}});

const out='// 自动生成 (gen_feed.js) — 故事卡片流统一数据。请勿手改,改 gen_feed.js 后重跑。\n'
  +'const FEED='+JSON.stringify(cards)+';\n'
  +'if(typeof window!=="undefined") window.FEED=FEED;\n';
fs.writeFileSync('feed_data.js',out);

// 统计
const byType={}; cards.forEach(c=>byType[c.t]=(byType[c.t]||0)+1);
console.log('FEED 卡片总数:',cards.length);
console.log('类型分布:',JSON.stringify(byType));
console.log('文件大小:',(out.length/1024).toFixed(0)+'KB');
