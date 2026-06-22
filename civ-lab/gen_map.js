// gen_map.js — 生成世界历史地图数据 map_data.js
// MAP_CIVS: 文明(含经纬度坐标+起止)  ·  CIV_EVENTS: 每个文明的全部事件(含深度)
const fs=require('fs');
function loadVars(file, names){
  let s=fs.readFileSync(file,'utf8').replace(/if ?\(typeof window[\s\S]*/,'');
  return (new Function(s+'\n;return {'+names.map(n=>`${n}:(typeof ${n}!=="undefined"?${n}:undefined)`).join(',')+'};'))();
}
const mw=loadVars('meanwhile_data.js',['WORLD_CIVS','WORLD_EVENTS']);
const ev=loadVars('evidence_data.js',['EVIDENCE']);

// 文明地理坐标 [lat,lng] — 以代表性都城/中心估算
const LL={
  shang:[36.1,114.3],xizhou:[34.3,108.9],chunqiu:[34.6,112.4],zhanguo:[34.6,112.4],qin:[34.3,108.7],
  xihan:[34.3,108.9],donghan:[34.6,112.4],tang:[34.3,108.9],song:[34.8,114.3],mongol:[39.9,116.4],
  heian:[35.0,135.8],shogunate:[35.3,139.5],china:[39.9,116.4],japan:[35.7,139.7],meiji:[35.7,139.7],
  indus:[27.3,68.1],magadha:[25.6,85.1],maurya:[25.6,85.1],gupta:[25.6,85.1],chola:[10.8,79.1],delhi_sultanate:[28.6,77.2],
  sumer:[31.0,46.1],akkad:[33.1,44.1],babylon:[32.5,44.4],hittite:[40.0,34.6],assyria:[36.4,43.2],
  neobabylon:[32.5,44.4],achaemenid:[29.9,52.9],phoenicia:[33.3,35.2],israel:[31.8,35.2],
  islam_rise:[24.5,39.6],abbasid:[33.3,44.4],ottoman:[41.0,29.0],
  minoan:[35.3,25.1],mycenae:[37.7,22.8],greece_archaic:[38.0,23.7],greece_classical:[38.0,23.7],
  macedon:[40.8,22.5],hellenistic:[31.2,29.9],roman_republic:[41.9,12.5],roman_empire:[41.9,12.5],
  christianity:[31.8,35.2],byzantine:[41.0,29.0],kievan_rus:[50.45,30.5],vikings:[60.0,10.0],
  franks:[50.8,6.1],medieval_europe:[48.85,2.35],crusades:[31.8,35.2],
  exploration:[38.7,-9.1],spain:[40.4,-3.7],dutch:[52.37,4.9],britain:[51.5,-0.12],france:[48.85,2.35],
  reform:[51.87,12.65],science:[51.5,-0.12],industrial:[53.48,-2.24],french_rev:[48.85,2.35],
  unification:[52.52,13.4],imperialism:[51.5,-0.12],
  egypt_old:[29.85,31.25],egypt_mid:[25.7,32.6],egypt_new:[25.7,32.6],mali:[16.77,-3.0],great_zimbabwe:[-20.27,30.93],
  maya:[17.2,-89.6],aztec:[19.43,-99.13],inca:[-13.5,-71.97],khmer:[13.41,103.87],srivijaya:[-2.99,104.76],
  ww1:[49.5,5.0],ww2:[52.0,13.0],un:[40.7,-74.0],coldwar:[52.5,13.4],globalization:[1.35,103.8],
  internet:[37.4,-122.1],ai:[37.77,-122.4],climate:[64.1,-21.9],space:[28.4,-80.6],
};
const REGION_LL={"东亚":[34,110],"南亚":[22,78],"西亚·中东":[33,44],"欧洲":[48,10],"非洲":[5,20],"美洲":[10,-80],"东南亚":[5,105],"全球":[25,0]};

const evByEvent={}; ev.EVIDENCE.forEach(x=>{ (evByEvent[x.eventId]=evByEvent[x.eventId]||[]).push(x); });
const allByYear=mw.WORLD_EVENTS.slice().sort((a,b)=>a.year-b.year);
function sameEra(year,region,excludeId){
  return allByYear.filter(e=>e.id!==excludeId&&Math.abs(e.year-year)<=40&&e.region!==region).slice(0,4)
    .map(e=>({title:e.title,region:e.region,one:e.one}));
}

const CIV_EVENTS={};
mw.WORLD_EVENTS.forEach(e=>{
  (CIV_EVENTS[e.civ]=CIV_EVENTS[e.civ]||[]).push({
    id:e.id,year:e.year,title:e.title,one:e.one,
    deep:{evidence:(evByEvent[e.id]||[]).slice(0,4).map(x=>({artifact:x.artifact,what:x.what,held:x.held})),
      same:sameEra(e.year,e.region,e.id)}
  });
});
// ── 合并知识库补充事件 (kb_events.js) ──
const REGION_OF={}; mw.WORLD_CIVS.forEach(c=>REGION_OF[c.id]=c.region);
try{
  const {KB_EVENTS}=loadVars('kb_events.js',['KB_EVENTS']);
  let added=0;
  if(KB_EVENTS) for(const cid in KB_EVENTS){
    const arr=CIV_EVENTS[cid]=CIV_EVENTS[cid]||[];
    const seen=new Set(arr.map(e=>e.title));
    KB_EVENTS[cid].forEach((e,i)=>{
      if(seen.has(e.title))return; seen.add(e.title);
      arr.push({id:cid+'_kb'+i,year:e.year,title:e.title,one:e.one,
        deep:{detail:e.detail||'',evidence:e.evidence||[],same:sameEra(e.year,REGION_OF[cid]||'',null)}});
      added++;
    });
  }
  console.log('知识库补充事件:+'+added);
}catch(e){ console.error('kb_events 合并失败:',e.message); }

Object.values(CIV_EVENTS).forEach(arr=>arr.sort((a,b)=>a.year-b.year));

// ── 文明档案 (kb_civ.js) ──
let CIV_INFO={};
try{ const r=loadVars('kb_civ.js',['CIV_INFO']); if(r.CIV_INFO) Object.assign(CIV_INFO,r.CIV_INFO); }
catch(e){ console.error('kb_civ 读取失败:',e.message); }
try{ const r2=loadVars('kb_civ2.js',['CIV_INFO2']); if(r2.CIV_INFO2) Object.assign(CIV_INFO,r2.CIV_INFO2); }
catch(e){ console.error('kb_civ2 读取失败:',e.message); }
console.log('文明档案:',Object.keys(CIV_INFO).length+'国');

const MAP_CIVS=mw.WORLD_CIVS.map(c=>{
  const ll=LL[c.id]||REGION_LL[c.region]||[20,0];
  return {id:c.id,name:c.name,icon:c.icon,region:c.region,s:c.s,e:c.e,chapter:c.chapter,
    lat:ll[0],lng:ll[1],nev:(CIV_EVENTS[c.id]||[]).length};
});

const out='// 自动生成 (gen_map.js) — 世界历史地图数据。改 gen_map.js 后重跑。\n'
  +'const MAP_CIVS='+JSON.stringify(MAP_CIVS)+';\n'
  +'const CIV_EVENTS='+JSON.stringify(CIV_EVENTS)+';\n'
  +'const CIV_INFO='+JSON.stringify(CIV_INFO)+';\n'
  +'if(typeof window!=="undefined"){window.MAP_CIVS=MAP_CIVS;window.CIV_EVENTS=CIV_EVENTS;window.CIV_INFO=CIV_INFO;}\n';
fs.writeFileSync('map_data.js',out);
console.log('MAP_CIVS:',MAP_CIVS.length,' 有事件文明:',Object.keys(CIV_EVENTS).length,' size:',(out.length/1024).toFixed(0)+'KB');
console.log('无坐标(用区域兜底):',mw.WORLD_CIVS.filter(c=>!LL[c.id]).map(c=>c.id).join(',')||'无');
